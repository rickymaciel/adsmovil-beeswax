<template>
	<v-card elevation="0" class="pa-2" outlined tile color="rgb(0, 0, 0, 0.0)">
		<!-- <p>openDate:{{ openDate }}</p>
		<p>openTime:{{ openTime }}</p> -->
		<v-dialog
			:ref="model_date"
			v-model="openDate"
			:return-value.sync="openDate"
			persistent
			:width="width"
		>
			<template v-slot:activator="{ on, attrs }">
				<v-text-field
					v-model="dateTime"
					:label="label_date"
					class="label-fixed"
					:hint="date_format"
					prepend-icon="mdi-calendar"
					readonly
					:disabled="disabled"
					v-bind="attrs"
					v-on="on"
					@click="openOpenDate"
					:rules="getRules"
				></v-text-field>
			</template>
			<v-date-picker
				v-model="dataDate"
				:min="min_date"
				:date-format="date_format"
				scrollable
				:first-day-of-week="0"
				locale="es"
				header-color="secondary"
				><v-spacer></v-spacer>

				<v-btn text color="danger" @click="closeDate"> CANCELAR </v-btn>
				<v-btn
					text
					color="success"
					:disabled="!dataDate"
					@click="onSelectedDate(model_date, dataDate)"
				>
					CONFIRMAR FECHA
				</v-btn>
			</v-date-picker>
		</v-dialog>
		<v-dialog
			:ref="model_time"
			v-model="openTime"
			:return-value.sync="openTime"
			color="secondary"
			persistent
			:width="width"
		>
			<v-time-picker
				v-model="dataTime"
				full-width
				scrollable
				use-seconds
				format="24hr"
				header-color="secondary"
			>
				<v-spacer></v-spacer>

				<v-btn text color="primary" @click="closeTime">
					CANCELAR
				</v-btn>
				<v-btn
					:disabled="!dataTime"
					text
					color="success"
					@click="onSelectedTime(model_time, dataTime)"
				>
					CONFIRMAR HORA
				</v-btn>
			</v-time-picker>
		</v-dialog>
	</v-card>
</template>

<script lang="ts">
	import Vue from "vue";

	export default Vue.extend({
		name: "v-datetime-picker",
		props: {
			open_date: {
				type: Boolean,
				default: false,
			},
			open_time: {
				type: Boolean,
				default: false,
			},
			model_date: {
				type: String,
			},
			model_time: {
				type: String,
			},
			date: {
				type: String,
				default: "",
			},
			time: {
				type: String,
				default: "",
			},
			width: {
				type: String,
				default: "360px",
			},
			date_format: {
				type: String,
				default: "YYYY-MM-DD HH:mm:ss",
			},
			label_date: {
				type: String,
				default: "Date*",
			},
			label_time: {
				type: String,
				default: "Time*",
			},
			min_date: {
				type: String,
				default: "",
			},
			disabled: {
				type: Boolean,
				default: false,
			},
			validate: {
				type: Boolean,
				default: true,
			},
		},
		mounted() {},
		computed: {
			getRules() {
				return [
					(v: any) =>
						this.validate
							? Boolean(v) || this.$t("fieldRequired")
							: true,
				];
			},
			dateTime() {
				if (!this.date) return "";
				return `${this.date} ${this.time || ""}`;
			},
			dataDate: {
				set(val) {
					this.$emit("date", val);
				},
				get() {
					return this.date;
				},
			},
			dataTime: {
				set(val) {
					this.$emit("time", val);
				},
				get() {
					return this.time;
				},
			},
			openDate: {
				set(val) {
					//(this as any).$emit("set-open-date", val);
				},
				get() {
					return this.open_date;
				},
			},
			openTime: {
				set(val) {
					(this as any).$emit("open-time", val);
				},
				get() {
					return this.open_time;
				},
			},
		},
		methods: {
			closeDate() {
				if (
					!Boolean((this as any).dataDate) ||
					!Boolean((this as any).dataTime)
				) {
					this.$emit("reset-date");
				}

				this.$emit("close-date");
			},
			closeTime() {
				this.$emit("close-time");
			},
			onSelectedDate(model_date: string, date: any) {
				(this as any).$emit("selected-date", date);
				(this as any).$refs[model_date].save(date);
				(this as any).onSelectedTime((this as any).model_time, "00:00:00");
			},
			onSelectedTime(model_time: string, time: any) {
				(this as any).$emit("selected-time", {
					model_time: model_time,
					time: time,
				});
				(this as any).$refs[model_time].save(time);
			},
			openOpenDate() {
				(this as any).$emit("set-open-date", (this as any).model_date);
			},
			openOpenStartTime() {
				(this as any).$emit("set-open-time", (this as any).model_time);
			},
		},
		watch: {},
	});
</script>
