<template>
	<v-card justify="between" align="center" color="grey lighten-3 py-4 my-4">
		<v-card>
			<v-card-text>
				{{ creative }}
			</v-card-text>
		</v-card>
		<v-form
			ref="form"
			justify="between"
			align="center"
			v-model="valid"
			lazy-validation
		>
			<v-container>
				<!-- <v-card>account: {{ account }}</v-card> -->
				<v-row dense>
					<!-- Name: name ✔-->
					<v-col cols="12" sm="12" md="6" lg="4">
						<v-card
							elevation="0"
							class="pa-2"
							outlined
							tile
							color="rgb(0, 0, 0, 0.0)"
						>
							<v-text-field
								v-model="creative.name"
								:rules="[
									getRules.isRequired,
									getRules.isMinLength,
									getRules.isMaxLength,
								]"
								hint="Creative Name"
								ref="name"
								placeholder="Creative Name"
								label="Creative Name*"
								class="label-fixed"
								counter="255"
							></v-text-field>
						</v-card>
					</v-col>

					<!-- Start Date ✔-->
					<v-col cols="12" sm="12" md="6" lg="4">
						<DateTimePicker
							:date="creative.start_date"
							:time="start_time"
							label_date="Start Date*"
							label_time="Start Time*"
							:min_date="today"
							model_date="start_date"
							model_time="start_time"
							:open_date="openStartDate"
							:open_time="openStartTime"
							type_validate_date="min-todate"
							@date="startDateUpdate"
							@time="startTimeUpdate"
							@close-date="closeOpenStartDate"
							@close-time="closeOpenStartTime"
							@selected-date="selectedStartDate"
							@selected-time="selectedStartTime"
							@set-open-date="setOpenDate"
							@reset-date="resetStartDate"
						></DateTimePicker>
					</v-col>
				</v-row>
			</v-container>
		</v-form>
	</v-card>
</template>

<script lang="ts">
	import Vue from "vue";
	import {
		isRequired,
		isNumber,
		isDomain,
		isMinLength,
		isMaxLength,
	} from "../../../../services/rule-services";
	import DateTimePicker from "../../../../components/Content/DateTimePicker.vue";

	export default Vue.extend({
		name: "Overview",
		props: {
			creative: {
				type: Object,
				default: function () {
					return {};
				},
			},
			start_time: {
				type: String,
				default: "00:00:00",
			},
			end_time: {
				type: String,
				default: "00:59:59",
			},
		},
		components: { DateTimePicker },
		data: () => ({
			valid: false,
			today: new Date().toISOString().substr(0, 10),
			openStartDate: false,
			openStartTime: false,
		}),
		created() {},
		mounted() {},
		computed: {
			getRules() {
				return {
					isRequired,
					isNumber,
					isDomain,
					isMinLength,
					isMaxLength,
				};
			},
		},
		methods: {
			/**
			 * Start
			 */
			selectedStartDate(data: any) {
				this.closeOpenStartDate();
				this.openOpenStartTime();
			},
			selectedStartTime(data: any) {
				this.closeOpenStartDate();
				this.closeOpenStartTime();
			},
			closeOpenStartDate() {
				this.openStartDate = false;
			},
			closeOpenStartTime() {
				this.openStartTime = false;
			},
			openOpenStartTime() {
				this.openStartTime = true;
			},
			startDateUpdate(data: any) {
				this.creative.start_date = data;
			},
			startTimeUpdate(data: any) {
				this.start_time = data;
			},
			setOpenDate(data: any) {
				switch (data) {
					case "start_date":
						this.openStartDate = true;

						break;

					case "end_date":
						this.openEndDate = true;

						break;

					default:
						break;
				}
			},
			resetStartDate() {
				this.campaign.start_date = "";
			},
		},
	});
</script>
