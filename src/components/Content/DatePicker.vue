<template>
	<v-dialog v-model="display" :width="dialogWidth">
		<template v-slot:activator="{ on }">
			<v-text-field
				class="label-fixed v-inner"
				v-bind="textFieldProps"
				:disabled="disabled"
				:loading="loading"
				:value="formattedDatetime"
				:hint="dateTimeFormat"
				v-on="on"
				readonly
				:rules="rules"
				:error-messages="error_messages"
			>
				<template v-slot:progress>
					<slot name="progress">
						<v-progress-linear
							color="primary"
							indeterminate
							absolute
							height="2"
						></v-progress-linear>
					</slot>
				</template>
				<template #label>
					{{ label }}
					<span class="red--text" v-if="required">
						<strong>*</strong>
					</span>
				</template>
			</v-text-field>
		</template>

		<v-card>
			<v-card-text class="px-0 py-0">
				<v-tabs fixed-tabs v-model="activeTab">
					<v-tab key="calendar">
						<slot name="dateIcon">
							<v-icon>mdi-calendar</v-icon>
						</slot>
					</v-tab>
					<v-tab key="timer" :disabled="dateSelected">
						<slot name="timeIcon">
							<v-icon>mdi-calendar-clock</v-icon>
						</slot>
					</v-tab>
					<v-tab-item key="calendar">
						<v-date-picker
							v-model="date"
							v-bind="datePickerProps"
							@input="showTimePicker"
							full-width
							:first-day-of-week="0"
							locale="es"
							:min="min_date"
							:max="max_date"
						></v-date-picker>
					</v-tab-item>
					<v-tab-item key="timer">
						<div
							class="
								v-picker v-card
								v-picker--time
								v-time-picker-custom
								v-picker--full-width
								theme--light
							"
						>
							<div class="v-picker__title secondary">
								<div class="v-time-picker-title">
									<div class="v-time-picker-title__time">
										<div
											class="
												v-picker__title__btn
												v-picker__title__btn--active
											"
										>
											{{ hours }}
										</div>
										<span>:</span>
										<div
											class="
												v-picker__title__btn
												v-picker__title__btn--active
											"
										>
											{{ minutes }}
										</div>
										<span>:</span>
										<div
											class="
												v-picker__title__btn
												v-picker__title__btn--active
											"
										>
											{{ seconds }}
										</div>
									</div>
								</div>
							</div>
						</div>
						<v-container class="my-4" fluid>
							<v-row align="center" justify="center">
								<v-col cols="12" sm="4">
									<v-autocomplete
										v-model="hours"
										:items="hoursData"
										label="Hour"
										class="label-fixed"
									></v-autocomplete>
								</v-col>
								<v-col cols="12" sm="4">
									<v-autocomplete
										v-model="minutes"
										class="label-fixed"
										:items="minSecData"
										menu-props="auto"
										label="Minutes"
									></v-autocomplete>
								</v-col>
								<v-col cols="12" sm="4">
									<v-autocomplete
										v-model="seconds"
										class="label-fixed"
										:items="minSecData"
										menu-props="auto"
										label="Seconds"
									></v-autocomplete>
								</v-col>
							</v-row>
						</v-container>
					</v-tab-item>
				</v-tabs>
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<slot name="actions" :parent="this">
					<v-btn color="dark" text @click.native="cancelHandler">
						{{ clearText }}
					</v-btn>
					<v-btn
						:disabled="!date"
						color="green darken-1"
						text
						@click="okHandler"
					>
						{{ okText }}
					</v-btn>
				</slot>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
import { format, parse } from "date-fns";
import { range } from "lodash";

const DEFAULT_DATE = "";
const DEFAULT_TIME = "00:00:00";
const DEFAULT_TIME_END = "23:59:59";
const DEFAULT_DATE_FORMAT = "yyyy-MM-dd";
const DEFAULT_TIME_FORMAT = "HH:mm:ss";
const DEFAULT_DIALOG_WIDTH = 360;
const DEFAULT_CLEAR_TEXT = "CLEAR";
const DEFAULT_OK_TEXT = "OK";

export default {
	name: "v-datetime-picker",
	model: {
		prop: "datetime",
		event: "input",
	},
	props: {
		datetime: { type: [Date, String], default: null },
		disabled: { type: Boolean, default: false },
		loading: { type: Boolean, default: false },
		label: { type: String, default: "Label" },
		dialogWidth: { type: Number, default: DEFAULT_DIALOG_WIDTH },
		dateFormat: { type: String, default: DEFAULT_DATE_FORMAT },
		timeFormat: { type: String, default: DEFAULT_TIME_FORMAT },
		clearText: { type: String, default: DEFAULT_CLEAR_TEXT },
		okText: { type: String, default: DEFAULT_OK_TEXT },
		textFieldProps: {
			type: Object,
			default: () => ({ prependInnerIcon: "mdi-calendar" }),
		},
		datePickerProps: {
			type: Object,
			default: () => ({ headerColor: "secondary" }),
		},
		timePickerProps: {
			type: Object,
			default: () => ({
				useSeconds: true,
				ampmInTitle: true,
				format: "24hr",
				headerColor: "secondary",
			}),
		},
		min_date: { type: String, default: "" },
		max_date: { type: String, default: "" },
		is_end: { type: Boolean, default: false },
		rules: { type: Array, default: () => [] },
		required: { type: Boolean, default: false }, 
		error_messages: { 
			type: Array,
				default: function () {
					return [];
			},
		},
	},
	data() {
		return {
			display: false,
			activeTab: 0,
			date: DEFAULT_DATE,
			time: DEFAULT_TIME,
			hours: "00",
			minutes: "00",
			seconds: "00",
			hoursData: range(0, 24),
			minSecData: range(0, 60),
		};
	},
	async mounted() {
		await this.init();
		await this.initTime();
	},
	computed: {
		dateTimeFormat() {
			return this.dateFormat + " " + this.timeFormat;
		},
		defaultDateTimeFormat() {
			return DEFAULT_DATE_FORMAT + " " + DEFAULT_TIME_FORMAT;
		},
		formattedDatetime() {
			return this.selectedDatetime
				? format(this.selectedDatetime, this.dateTimeFormat)
				: "";
		},
		selectedDatetime() {
			if (this.date && this.time) {
				let datetimeString = this.date + " " + this.time;
				if (this.time.length === 5) {
					datetimeString += ":00";
				}
				return parse(
					datetimeString,
					this.defaultDateTimeFormat,
					new Date()
				);
			} else {
				return null;
			}
		},
		dateSelected() {
			return !this.date;
		},
	},
	methods: {
		async initTime() {
			this.hoursData = await this.parsedItems(this.hoursData);
			this.minSecData = await this.parsedItems(this.minSecData);
			this.time = this.is_end ? DEFAULT_TIME_END : DEFAULT_TIME;
			this.hours = this.is_end ? "23" : "00";
			this.minutes = this.is_end ? "59" : "00";
			this.seconds = this.is_end ? "59" : "00";
		},
		async parsedItems(data) {
			return data.map((item) => {
				item =
					item.toString().length < 2
						? `0${item.toString()}`
						: item.toString();
				return item;
			});
		},
		async init() {
			if (!this.datetime) {
				this.date = null;
				this.time = null;
				return;
			}

			let initDateTime;
			if (this.datetime instanceof Date) {
				initDateTime = this.datetime;
			} else if (
				typeof this.datetime === "string" ||
				this.datetime instanceof String
			) {
				// see https://stackoverflow.com/a/9436948
				initDateTime = parse(
					this.datetime,
					this.dateTimeFormat,
					new Date()
				);
			}

			this.date = format(initDateTime, DEFAULT_DATE_FORMAT);
			this.time = format(initDateTime, DEFAULT_TIME_FORMAT);
		},
		okHandler() {
			this.resetPicker();
			this.time = `${this.hours}:${this.minutes}:${this.seconds}`;
			this.$emit("input", this.selectedDatetime);
		},
		cancelHandler() {
			this.resetPicker();
			this.date = DEFAULT_DATE;
			this.time = DEFAULT_TIME;
			this.$emit("input", null);
		},
		resetPicker() {
			this.display = false;
			this.activeTab = 0;
			if (this.$refs.timer) {
				this.$refs.timer.selectingHour = true;
			}
		},
		showTimePicker() {
			this.activeTab = 1;
		},
	},
	watch: {
		datetime: function () {
			this.init();
		},
	},
};
</script>

<style lang="scss" scoped>
.v-picker {
	border-radius: 0;
}
.v-time-picker-title__time .v-picker__title__btn,
.v-time-picker-title__time span {
	align-items: center;
	align-self: center;
	display: inline-flex;
	height: 70px;
	font-size: 4rem;
	justify-content: center;
}
</style>