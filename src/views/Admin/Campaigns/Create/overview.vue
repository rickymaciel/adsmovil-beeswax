<template>
	<v-card justify="between" align="center" color="grey lighten-3 py-4">
		{{ initEdit }}
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
								v-model="campaign.name"
								:rules="nameRules"
								hint="Name"
								ref="name"
								placeholder="Name"
								label="Name*"
								class="label-fixed"
								counter="255"
							></v-text-field>
						</v-card>
					</v-col>

					<!-- Advertiser: advertiser_id ✔ -->
					<v-col cols="12" sm="12" md="6" lg="4">
						<v-card
							elevation="0"
							class="pa-2"
							outlined
							tile
							color="rgb(0, 0, 0, 0.0)"
						>
							<v-autocomplete
								class="label-fixed"
								:class="{ disabled: isEdit }"
								v-model.number="campaign.advertiser_id"
								v-numeric
								:rules="getRules.required"
								:hint="`Advertiser`"
								:items="getAdvertisers"
								ref="advertiser_id"
								item-text="value"
								item-value="id"
								label="Advertiser*"
								placeholder="Advertiser"
								:disabled="isEdit"
							></v-autocomplete>
						</v-card>
					</v-col>

					<!-- Owner: trafficker_id ✔ -->
					<v-col cols="12" sm="12" md="6" lg="4">
						<v-card
							elevation="0"
							class="pa-2"
							outlined
							tile
							color="rgb(0, 0, 0, 0.0)"
						>
							<v-autocomplete
								class="label-fixed"
								v-model.number="campaign.trafficker_id"
								v-numeric
								:rules="getRules.required"
								:hint="`Owner`"
								:items="owners"
								ref="trafficker_id"
								item-text="value"
								item-value="id"
								label="Owner*"
								placeholder="Owner"
							></v-autocomplete>
						</v-card>
					</v-col>
				</v-row>

				<v-row dense>
					<!-- Solo mostrar dato de la cuenta: Currency ✔ -->
					<v-col cols="12" sm="12" md="6" lg="4">
						<v-card
							elevation="0"
							class="pa-2"
							outlined
							tile
							color="rgb(0, 0, 0, 0.0)"
						>
							<v-text-field
								v-model="getCurrency"
								hint="Currency"
								ref="currency"
								placeholder="Currency"
								label="Currency"
								class="label-fixed disabled"
								disabled
							></v-text-field>
						</v-card>
					</v-col>

					<!-- Solo mostrar dato de la cuenta: Timezone ✔ -->
					<v-col cols="12" sm="12" md="6" lg="4">
						<v-card
							elevation="0"
							class="pa-2"
							outlined
							tile
							color="rgb(0, 0, 0, 0.0)"
						>
							<v-text-field
								v-model="getTimezone"
								hint="Timezone"
								ref="timezone"
								placeholder="Timezone"
								label="Timezone"
								class="label-fixed disabled"
								disabled
							></v-text-field>
						</v-card>
					</v-col>

					<!-- Alternative ID ✔ -->
					<v-col cols="12" sm="12" md="6" lg="4">
						<v-card
							elevation="0"
							class="pa-2"
							outlined
							tile
							color="rgb(0, 0, 0, 0.0)"
						>
							<v-text-field
								v-model="campaign.alternative_id"
								hint="Alternative ID"
								ref="AlternativeID"
								placeholder="Alternative ID"
								label="Alternative ID"
								class="label-fixed"
							></v-text-field>
						</v-card>
					</v-col>
				</v-row>

				<!-- Duration -->
				<v-row dense>
					<v-col cols="12" sm="12" md="12" lg="12">
						<v-card
							class="grey lighten-3 d-flex justify-start align-center mt-4"
							elevation="0"
							flat
							tile
						>
							<v-card-title class="px-2">Duration</v-card-title>
							<v-divider class="mt-3"></v-divider>
						</v-card>
					</v-col>

					<!-- Start Date* ✔ -->
					<v-col cols="12" sm="12" md="6" lg="4">
						<DateTimePicker
							:date="campaign.start_date"
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

					<!-- End Date* ✔ -->
					<v-col cols="12" sm="12" md="6" lg="4">
						<DateTimePicker
							:date="campaign.end_date"
							:time="end_time"
							label_date="End Date*"
							label_time="End Time*"
							:min_date="startDateTime"
							model_date="end_date"
							model_time="end_time"
							:open_date="openEndDate"
							:open_time="openEndTime"
							type_validate_date="must-after"
							@date="endDateUpdate"
							@time="endTimeUpdate"
							@close-date="closeOpenEndDate"
							@close-time="closeOpenEndTime"
							@selected-date="selectedEndDate"
							@selected-time="selectedEndTime"
							@set-open-date="setOpenDate"
							@reset-date="resetStartDate"
						></DateTimePicker>
					</v-col>

					<!-- Campaign Duration* Calculo en dias entre el inicio y fin de campaña ✔ -->
					<v-col cols="12" sm="12" md="6" lg="4">
						<v-card
							elevation="0"
							class="pa-2"
							outlined
							tile
							color="rgb(0, 0, 0, 0.0)"
						>
							<v-text-field
								v-model.number="campaign_duration"
								v-numeric
								:rules="getRules.number"
								hint="Campaign Duration"
								ref="campaign_duration"
								placeholder="Campaign Duration"
								label="Campaign Duration*"
								class="label-fixed disabled"
								disabled
							></v-text-field>
						</v-card>
					</v-col>
				</v-row>

				<!-- Budget -->
				<v-row dense>
					<v-col cols="12" sm="12" md="12" lg="12">
						<v-card
							class="grey lighten-3 d-flex justify-start align-center mt-4"
							elevation="0"
							flat
							tile
						>
							<v-card-title class="px-2">Budget</v-card-title>
							<v-divider class="mt-3"></v-divider>
						</v-card>
					</v-col>

					<!-- Budget Type* ✔ -->
					<v-col cols="12" sm="12" md="6" lg="4">
						<v-card
							elevation="0"
							class="pa-2"
							outlined
							tile
							color="rgb(0, 0, 0, 0.0)"
						>
							<v-layout>
								<v-label class="v-label theme--light">
									Budget Type*
								</v-label>
							</v-layout>
							<v-layout>
								<v-radio-group
									v-model.number="campaign.budget_type_id"
									v-numeric
									:rules="getRules.required"
									row
									:disabled="isEdit"
								>
									<v-radio
										v-for="budgetType in getBudgetType"
										:key="budgetType.id"
										:label="budgetType.value"
										:value="budgetType.id"
										color="secondary"
									></v-radio>
								</v-radio-group>
							</v-layout>
						</v-card>
					</v-col>

					<!-- Total Impressions* ✔  -->
					<v-col cols="12" sm="12" md="6" lg="4">
						<v-card
							elevation="0"
							class="pa-2"
							outlined
							tile
							color="rgb(0, 0, 0, 0.0)"
						>
							<v-text-field
								v-model.number="campaign.budget"
								v-numeric
								type="text"
								:rules="getRules.required"
								:hint="getBudgetText"
								ref="budget"
								:label="getBudgetText"
								:placeholder="getBudgetText"
								class="label-fixed"
								:disabled="!getBudgetText"
							></v-text-field>
						</v-card>
					</v-col>

					<!-- Automatic Allocation* ✔ -->
					<v-col cols="12" sm="12" md="6" lg="4">
						<v-card
							elevation="0"
							class="pa-2"
							outlined
							tile
							color="rgb(0, 0, 0, 0.0)"
						>
							<v-layout>
								<v-label class="v-label theme--light">
									Automatic Allocation*
								</v-label>
							</v-layout>
							<v-layout>
								<v-radio-group
									v-numeric
									row
									v-model.number="
										campaign.automatic_allocation
									"
								>
									<v-radio
										color="secondary"
										v-for="n in getAllocationData"
										:key="n.key"
										:label="n.value"
										:value="n.key"
									></v-radio>
								</v-radio-group>
							</v-layout>
						</v-card>
					</v-col>
				</v-row>

				<!-- Pacing -->
				<v-row dense v-if="campaign.automatic_allocation">
					<v-col cols="12" sm="12" md="12" lg="12">
						<v-card
							class="grey lighten-3 d-flex justify-start align-center mt-4"
							elevation="0"
							flat
							tile
						>
							<v-card-title class="px-2">Pacing</v-card-title>
							<v-divider class="mt-3"></v-divider>
						</v-card>
					</v-col>

					<!-- Optimization Strategy* ✔ -->
					<v-col cols="12" sm="12" md="6" lg="4">
						<v-card
							elevation="0"
							class="pa-2"
							outlined
							tile
							color="rgb(0, 0, 0, 0.0)"
						>
							<v-layout>
								<v-label class="v-label theme--light">
									Optimization Strategy*
								</v-label>
							</v-layout>
							<v-layout>
								<v-radio-group
									v-model.number="
										campaign.optimization_strategy_id
									"
									v-numeric
									:rules="getRules.required"
									row
									:disabled="
										isEdit && isOptimizationStrategyById
									"
								>
									<v-radio
										v-for="element in getOptimizationStrategies"
										:key="element.id"
										:label="element.value"
										:value="element.id"
										color="secondary"
									></v-radio>
								</v-radio-group>
							</v-layout>
						</v-card>
					</v-col>

					<!-- Campaign Pacing* -->
					<v-col cols="12" sm="12" md="6" lg="4">
						<v-card
							elevation="0"
							class="pa-2"
							outlined
							tile
							color="rgb(0, 0, 0, 0.0)"
						>
							<v-autocomplete
								class="label-fixed"
								v-model.number="campaign.campaign_pacing_id"
								v-numeric
								:rules="getRules.required"
								:hint="`Campaign Pacing`"
								:items="getCampaignsPacing"
								ref="campaign_pacing_id"
								item-text="value"
								item-value="id"
								label="Campaign Pacing*"
								placeholder="Campaign Pacing"
							></v-autocomplete>
						</v-card>
					</v-col>

					<!-- Daily Budget* -->
					<v-col
						cols="12"
						sm="12"
						md="6"
						lg="4"
						v-if="showDailyBudget"
					>
						<v-card
							elevation="0"
							class="pa-2"
							outlined
							tile
							color="rgb(0, 0, 0, 0.0)"
						>
							<v-text-field
								v-model.number="campaign.daily_budget"
								v-numeric
								:rules="getRules.daily_budget"
								:hint="getError('daily_budget')"
								ref="daily_budget"
								placeholder="Daily Budget"
								label="Daily Budget"
								class="label-fixed p-prefix"
								:suffix="getSuggested"
								:persistent-hint="hasError('daily_budget')"
							>
							</v-text-field>
						</v-card>
					</v-col>
				</v-row>

				<!-- Objective -->
				<v-row dense>
					<v-col cols="12" sm="12" md="12" lg="12">
						<v-card
							class="grey lighten-3 d-flex justify-start align-center mt-4"
							elevation="0"
							flat
							tile
						>
							<v-card-title class="px-2">Objective</v-card-title>
							<v-divider class="mt-3"></v-divider>
						</v-card>
					</v-col>

					<!-- KPI Campaign* -->
					<v-col cols="12" sm="12" md="6" lg="4">
						<v-card
							elevation="0"
							class="pa-2"
							outlined
							tile
							color="rgb(0, 0, 0, 0.0)"
						>
							<v-autocomplete
								class="label-fixed"
								v-model.number="campaign.kpi_campaign_id"
								v-numeric
								:rules="getRules.required"
								:hint="`KPI Campaign`"
								:items="getKpiCampaigns"
								ref="kpi_campaign_id"
								item-text="value"
								item-value="id"
								label="KPI Campaign*"
								placeholder="KPI Campaign"
							></v-autocomplete>
						</v-card>
					</v-col>

					<!-- kpi Objective* -->
					<v-col cols="12" sm="12" md="6" lg="4">
						<v-card
							elevation="0"
							class="pa-2"
							outlined
							tile
							color="rgb(0, 0, 0, 0.0)"
						>
							<v-text-field
								v-model.number="campaign.kpi_objective"
								v-numeric
								:rules="getRules.required"
								:hint="getKpiObjectiveLabel"
								ref="kpi_objective"
								:placeholder="getKpiObjectiveLabel"
								:label="getKpiObjectiveLabel"
								class="label-fixed"
							></v-text-field>
						</v-card>
					</v-col>
				</v-row>

				<!-- Strategy -->
				<v-row dense>
					<v-col cols="12" sm="12" md="12" lg="12">
						<v-card
							class="grey lighten-3 d-flex justify-start align-center mt-4"
							elevation="0"
							flat
							tile
						>
							<v-card-title class="px-2">Strategy</v-card-title>
							<v-divider class="mt-3"></v-divider>
						</v-card>
					</v-col>

					<!-- Biding Strategy* -->
					<v-col cols="12" sm="12" md="6" lg="4">
						<v-card
							elevation="0"
							class="pa-2"
							outlined
							tile
							color="rgb(0, 0, 0, 0.0)"
						>
							<v-autocomplete
								class="label-fixed"
								v-model.number="campaign.strategy_id"
								v-numeric
								:rules="getRules.required"
								:hint="`Biding Strategy`"
								:items="getStrategies"
								ref="strategy_id"
								item-text="value"
								item-value="id"
								label="Biding Strategy*"
								placeholder="Biding Strategy"
							></v-autocomplete>
						</v-card>
					</v-col>

					<!-- Bid CPM* -->
					<v-col cols="12" sm="12" md="6" lg="2">
						<v-card
							elevation="0"
							class="pa-2"
							outlined
							tile
							color="rgb(0, 0, 0, 0.0)"
						>
							<v-text-field
								v-model.number="campaign.cpm_bid"
								v-numeric
								:rules="getRules.cpm_bid"
								hint="Bid CPM"
								ref="cpm_bid"
								placeholder="Bid CPM"
								label="Bid CPM"
								class="label-fixed"
								max="25000"
							></v-text-field>
						</v-card>
					</v-col>

					<!-- Expected* -->
					<v-col
						v-if="showExpectedLabel"
						cols="12"
						sm="12"
						md="6"
						lg="2"
					>
						<v-card
							elevation="0"
							class="pa-2"
							outlined
							tile
							color="rgb(0, 0, 0, 0.0)"
						>
							<v-text-field
								:hint="getExpectedLabel"
								:placeholder="getExpectedLabel"
								:label="getExpectedLabel"
								class="label-fixed"
								:value="getExpectedValue"
							></v-text-field>
						</v-card>
					</v-col>

					<!-- Target eCPCV* -->
					<v-col
						v-if="show_target_ecpc"
						cols="12"
						sm="12"
						md="6"
						lg="2"
					>
						<v-card
							elevation="0"
							class="pa-2"
							outlined
							tile
							color="rgb(0, 0, 0, 0.0)"
						>
							<v-text-field
								v-model="campaign.target_ecpc"
								:rules="getRules.target_ecpc"
								hint="Target eCPCV"
								ref="target_ecpc"
								placeholder="Target eCPCV"
								label="Target eCPCV"
								class="label-fixed"
							></v-text-field>
						</v-card>
					</v-col>

					<!-- Target CTR* -->
					<v-col
						v-if="show_target_ctr"
						cols="12"
						sm="12"
						md="6"
						lg="2"
					>
						<v-card
							elevation="0"
							class="pa-2"
							outlined
							tile
							color="rgb(0, 0, 0, 0.0)"
						>
							<v-text-field
								v-model="campaign.target_ctr"
								:rules="getRules.target_ctr"
								hint="Target CTR"
								ref="target_ctr"
								placeholder="Target CTR"
								label="Target CTR"
								class="label-fixed"
							></v-text-field>
						</v-card>
					</v-col>

					<!-- Target VCR* -->
					<v-col
						v-if="show_target_vcr"
						cols="12"
						sm="12"
						md="6"
						lg="2"
					>
						<v-card
							elevation="0"
							class="pa-2"
							outlined
							tile
							color="rgb(0, 0, 0, 0.0)"
						>
							<v-text-field
								v-model="campaign.target_vcr"
								:rules="getRules.target_vcr"
								hint="Target VCR"
								ref="target_vcr"
								placeholder="Target VCR"
								label="Target VCR"
								class="label-fixed"
							></v-text-field>
						</v-card>
					</v-col>
				</v-row>

				<!-- Frecuency -->
				<v-row dense>
					<v-col cols="12" sm="12" md="12" lg="12">
						<v-card
							class="grey lighten-3 d-flex justify-start align-center mt-4"
							elevation="0"
							flat
							tile
						>
							<v-card-title class="px-2">Frecuency</v-card-title>
							<v-divider class="mt-3"></v-divider>
						</v-card>
					</v-col>
				</v-row>

				<!-- Frecuency Cup* -->
				<v-col cols="12" sm="12" md="6" lg="4">
					<v-card
						elevation="0"
						class="pa-2"
						outlined
						tile
						color="rgb(0, 0, 0, 0.0)"
					>
						<v-layout>
							<v-label class="v-label theme--light">
								Frecuency Cup*
							</v-label>
						</v-layout>
						<v-layout class="mt-3">
							<v-btn
								color="secondary"
								outlined
								rounded
								@click="addRowFrecuency()"
							>
								<v-icon left color="secondary">
									mdi-plus
								</v-icon>
								Add Frecuency
							</v-btn>
						</v-layout>
					</v-card>
				</v-col>

				<v-row
					align="center"
					justify="space-between"
					dense
					v-for="(frequency_cap, index) in campaign.frequency_caps"
					:key="index"
				>
					<!-- impressions -->
					<v-col cols="12" sm="12" md="4" lg="3">
						<v-card
							elevation="0"
							class="pa-2"
							outlined
							tile
							color="rgb(0, 0, 0, 0.0)"
						>
							<v-text-field
								v-model="frequency_cap.impressions"
								:rules="getRules.required"
								hint="Impressions"
								ref="Impressions"
								placeholder="Impressions"
								label="Impressions*"
								class="label-fixed"
							></v-text-field>
						</v-card>
					</v-col>

					<!-- every_time -->
					<v-col cols="12" sm="12" md="4" lg="3">
						<v-card
							elevation="0"
							class="pa-2"
							outlined
							tile
							color="rgb(0, 0, 0, 0.0)"
						>
							<v-text-field
								v-model="frequency_cap.every_time"
								:rules="getRules.required"
								hint="Every Time"
								ref="every_time"
								placeholder="Every Time"
								label="Every Time*"
								class="label-fixed"
							></v-text-field>
						</v-card>
					</v-col>

					<!-- unit_time_id -->
					<v-col cols="12" sm="12" md="4" lg="3">
						<v-card
							elevation="0"
							class="pa-2"
							outlined
							tile
							color="rgb(0, 0, 0, 0.0)"
						>
							<v-autocomplete
								class="label-fixed"
								v-model="frequency_cap.unit_time_id"
								:rules="getRules.required"
								:hint="`Unit Time`"
								:items="getUnitTimes"
								:ref="`unit_time_id_${frequency_cap.unit_time_id}`"
								item-text="value"
								item-value="id"
								label="Unit Time*"
								placeholder="Unit Time"
							></v-autocomplete>
						</v-card>
					</v-col>

					<!-- unit_time_id -->
					<v-col cols="12" sm="12" md="4" lg="1">
						<v-btn
							color="red"
							elevation="1"
							icon
							@click="deleteRowFrecuency(index)"
						>
							<v-icon dark> mdi-delete </v-icon>
						</v-btn>
					</v-col>
				</v-row>

				<v-divider class="my-4"></v-divider>

				<v-row no-gutters align="center" justify="center">
					<v-col cols="12" sm="4" md="4" lg="6">
						<v-card
							elevation="0"
							class="pa-2"
							outlined
							tile
							color="rgb(0, 0, 0, 0.0)"
						>
							<v-card-text
								align="start"
								class="secondary--text info-message"
							>
								* Mandatory fields
							</v-card-text>
						</v-card>
					</v-col>

					<v-col cols="12" sm="8" md="8" lg="6">
						<v-card
							elevation="0"
							class="pa-2"
							outlined
							tile
							color="rgb(0, 0, 0, 0.0)"
						>
							<v-row align="center" justify="center">
								<v-btn
									rounded
									color="secondary"
									class="ma-2 px-8"
									@click="handleSubmit"
								>
									{{ $t("save") }}
								</v-btn>
								<v-btn
									rounded
									color="secondary"
									class="ma-2 px-8"
								>
									{{ $t("save-continue") }}
								</v-btn>
								<v-btn
									rounded
									color="secondary"
									class="ma-2 px-8"
									@click="handleCancel"
								>
									{{ $t("cancel") }}
								</v-btn>
							</v-row>
						</v-card>
					</v-col>
				</v-row>
			</v-container>
		</v-form>
	</v-card>
</template>

<script lang="ts">
	import Vue from "vue";
	import {
		isUndefined,
		isNull,
		isEmpty,
		isNaN,
		find,
		isNumber,
		first,
	} from "lodash";
	import { AdvertiserList } from "../../../../interfaces/advertiser";
	import DateTimePicker from "../../../../components/Content/DateTimePicker.vue";
	import { CampaignDataCreate } from "../../../../interfaces/campaign";

	const BY_CAMPAIGN = "By Campaign";
	const DAILY = "Daily";
	const IMPRESSIONS = "Impressions";
	const SPEND = "Spend";
	const IMPRESSION = "Impression";
	const CLICKS = "Clicks";
	const COMPLETED_VIDEO = "Completed Video";
	const OPTIMIZED_CPM = "Optimized CPM";
	const OPTIMIZED_CPC = "Optimized CPC";
	const OPTIMIZED_VCR = "Optimized VCR";

	export default Vue.extend({
		name: "Overview",
		props: {
			owners: {
				type: Array,
				default: function () {
					return [];
				},
			},
			campaign: {
				type: Object,
				required: true,
			},
			account: {
				type: Object,
				required: true,
			},
			budget_types: {
				type: Array,
				required: true,
			},
			advertisers: {
				type: Array,
				required: true,
			},
			campaigns_pacing: {
				type: Array,
				required: true,
			},
			optimization_strategies: {
				type: Array,
				required: true,
			},
			kpi_campaigns: {
				type: Array,
				required: true,
			},
			strategies: {
				type: Array,
				required: true,
			},
			unit_times: {
				type: Array,
				required: true,
			},
			start_time: {
				type: String,
				default: "00:00:00",
			},
			end_time: {
				type: String,
				default: "00:59:59",
			},
			is_edit: {
				type: Boolean,
				default: false,
			},
			errors: {
				type: Object,
				default: function () {
					return {};
				},
			},
		},
		components: { DateTimePicker },
		data: () => ({
			title: "Overview",
			valid: false,
			today: new Date().toISOString().substr(0, 10),
			openStartDate: false,
			openStartTime: false,
			openEndDate: false,
			openEndTime: false,
			expected_show: false,
			expected_value: undefined,
			expected_label: "",
			campaign_duration: undefined,
			show_target_ecpc: false,
			show_target_ctr: false,
			show_target_vcr: false,
		}),
		created() {},
		mounted() {
			setTimeout(() => {
				if (!this.campaign.frequency_caps.length) {
					this.addRowFrecuency();
				}
			}, 1000);
		},
		computed: {
			isEdit() {
				return this.is_edit;
			},
			startDateTime() {
				if (!this.campaign.start_date) return "";
				return `${this.campaign.start_date} ${this.start_time || ""}`;
			},

			/**
			 * STRING RULES
			 */

			getBudgetText() {
				if (isUndefined(this.campaign.budget_type_id)) return "Total";
				const result = find(this.getBudgetType, {
					id: this.campaign.budget_type_id,
				});
				return result ? `Total ${result.value}*` : "Total*";
			},

			getRules() {
				return {
					required: [(v: any) => Boolean(v) || this.$t("fieldRequired")],
					number: [(v: number) => !isNaN(v) || this.$t("fieldRequired")],
					cpm_bid: [
						(v: any) => Boolean(v) || this.$t("fieldRequired"),
						(v: number) => v > 0 || this.$t("min", { min: 0 }),
						(v: number) => v <= 25000 || this.$t("max", { max: 25000 }),
					],
					target_ecpc: [
						(v: any) => Boolean(v) || true,
						(v: number) => v > 0 || this.$t("min", { min: 0 }),
						(v: number) => v <= 10000 || this.$t("max", { max: 10000 }),
					],
					target_ctr: [
						(v: any) => Boolean(v) || true,
						(v: number) => v >= 0 || this.$t("min", { min: 0 }),
						(v: number) => v <= 1 || this.$t("max", { max: 1 }),
					],
					target_vcr: [
						(v: any) => Boolean(v) || true,
						(v: number) => v >= 0 || this.$t("min", { min: 0 }),
						(v: number) => v <= 1 || this.$t("max", { max: 1 }),
					],
					daily_budget: [
						(v: any) => Boolean(v) || this.$t("fieldRequired"),
						(v: any) =>
							v >= this.calcSuggested ||
							this.$t("greaterOrEqual", {
								value: this.calcSuggested,
							}),
					],
				};
			},
			nameRules() {
				return [
					(v: string) =>
						(!isUndefined(v) && !isNull(v) && !isEmpty(v)) ||
						this.$t("fieldRequired"),
					(v: string) =>
						(v && v.length <= 255) ||
						this.$t("maxLength", { max: 255 }),
					(v: string) =>
						(v && v.length >= 2) || this.$t("minLength", { min: 2 }),
				];
			},

			calcSuggested() {
				return Math.round(this.campaign.budget / this.campaign_duration);
			},

			getSuggested() {
				if (
					!this.showDailyBudget ||
					!this.campaign.budget ||
					!this.campaign_duration
				)
					return "";
				return `Suggested ${this.calcSuggested}`;
			},

			getKpiObjectiveLabel() {
				let label = "Objective";

				if (!this.isSelectedAutomaticAllocation) return label;

				if (this.isKpiCampaignImpression) {
					label = "Impression Objective";
				}
				if (this.isKpiCampaignClicks) {
					label = "Clicks Objective";
				}
				if (this.isKpiCampaignCompletedVideo) {
					label = "Videos Objective";
				}

				return label;
			},

			getAllocationData() {
				return [
					{
						kay: 0,
						value: "No",
					},
					{
						kay: 1,
						value: "Yes",
					},
				];
			},

			/**
			 * Check
			 */

			initEdit() {
				if (!this.isEdit) return;
				if (this.campaign.frequency_caps.length) {
					this.$emit("init-frequency-caps");
				}
				this.calcCampaignDuration();
			},

			showCampaignPacing() {
				return (
					this.isAutomaticAllocation && this.isOptimizationStrategyById
				);
			},

			showDailyBudget() {
				return this.isCampaignPacingById;
			},

			isSelectedAutomaticAllocation() {
				return [0, 1].includes(this.campaign.automatic_allocation);
			},

			isAutomaticAllocation() {
				return Boolean(this.campaign.automatic_allocation === 1);
			},

			isBudgetTypeImpressions() {
				return this.checkSelectedIDByName(
					this.getBudgetType,
					IMPRESSIONS,
					this.campaign.budget_type_id
				);
			},

			isBudgetTypeSpend() {
				return this.checkSelectedIDByName(
					this.getBudgetType,
					SPEND,
					this.campaign.budget_type_id
				);
			},

			isKpiCampaignImpression() {
				return this.checkSelectedIDByName(
					this.getKpiCampaigns,
					IMPRESSION.toLowerCase(),
					this.campaign.kpi_campaign_id
				);
			},

			isKpiCampaignClicks() {
				return this.checkSelectedIDByName(
					this.getKpiCampaigns,
					CLICKS.toLowerCase(),
					this.campaign.kpi_campaign_id
				);
			},

			isKpiCampaignCompletedVideo() {
				return this.checkSelectedIDByName(
					this.getKpiCampaigns,
					COMPLETED_VIDEO.toLowerCase(),
					this.campaign.kpi_campaign_id
				);
			},

			isOptimizationStrategyById() {
				return this.checkSelectedIDByName(
					this.getOptimizationStrategies,
					BY_CAMPAIGN,
					this.campaign.optimization_strategy_id
				);
			},

			isCampaignPacingById() {
				return this.checkSelectedIDByName(
					this.getCampaignsPacing,
					DAILY,
					this.campaign.campaign_pacing_id
				);
			},

			showExpectedLabel() {
				this.setTargets();

				/**
				 * is automatic_allocation === 1
				 * is budget type === spend
				 * is BY_CAMPAIGN
				 */

				if (
					!this.isAutomaticAllocation &&
					!this.isBudgetTypeSpend &&
					!this.isOptimizationStrategyByType(BY_CAMPAIGN) &&
					(!this.isValidNumber(this.campaign.budget) ||
						!this.isValidNumber(this.campaign.kpi_objective))
				) {
					return false;
				}

				/**
				 * is OPTIMIZED_CPM
				 */
				if (this.isStrategyByType(OPTIMIZED_CPM)) {
					this.expected_show = true;
					this.setTargets(false, false, false);

					this.expected_label = "eCPM";
					this.expected_value = (
						this.campaign.budget /
						(this.campaign.kpi_objective / 1000)
					).toFixed(2);
				}

				/**
				 * is OPTIMIZED_CPC
				 */
				if (this.isStrategyByType(OPTIMIZED_CPC)) {
					this.expected_show = true;
					this.setTargets(true, true, false);

					this.expected_label = "eCPC";
					this.expected_value = (
						this.campaign.budget / this.campaign.kpi_objective
					).toFixed(2);
				}

				/**
				 * is OPTIMIZED_VCR
				 */
				if (this.isStrategyByType(OPTIMIZED_VCR)) {
					this.expected_show = true;
					this.setTargets(false, false, true);

					this.expected_label = "eCPCV";
					this.expected_value = (
						this.campaign.budget / this.campaign.kpi_objective
					).toFixed(2);
				}

				return this.expected_show;
			},

			getExpectedValue() {
				return this.expected_value;
			},

			getExpectedLabel() {
				return this.expected_label;
			},

			/**
			 * DATE RULES
			 */
			startDateRules() {
				return [
					(v: string) =>
						(!isUndefined(v) && !isNull(v) && !isEmpty(v)) ||
						this.$t("fieldRequired"),
				];
			},
			endDateRules() {
				return [
					(v: string) =>
						(!isUndefined(v) && !isNull(v) && !isEmpty(v)) ||
						this.$t("fieldRequired"),
				];
			},

			/**
			 * GET
			 */
			getCurrency() {
				return !isUndefined(this.account.currency) &&
					!isEmpty(this.account.currency)
					? `${this.account.currency.key} (${this.account.currency.glyph})`
					: "N/A";
			},
			getTimezone() {
				return !isUndefined(this.account.timezone) &&
					!isEmpty(this.account.timezone)
					? `${this.account.timezone.name}`
					: "N/A";
			},

			getAdvertisers(): AdvertiserList[] {
				return this.advertisers;
			},

			getBudgetType() {
				return this.budget_types;
			},

			getCampaignsPacing() {
				return this.campaigns_pacing;
			},

			getOptimizationStrategies() {
				return this.optimization_strategies;
			},

			getKpiCampaigns() {
				return this.kpi_campaigns;
			},

			getStrategies() {
				return this.strategies;
			},

			getUnitTimes() {
				return this.unit_times;
			},
		},
		methods: {
			getError(index: string | number) {
				if (!this.hasError(index)) return "";
				return first(this.errors[index]);
			},

			hasError(index: string | number) {
				return this.errors.hasOwnProperty(index);
			},

			/**
			 * targets: show_ecpc, show_ctr, show_vcr
			 */
			setTargets(
				show_ecpc: boolean = false,
				show_ctr: boolean = false,
				show_vcr: boolean = false
			) {
				this.show_target_ecpc = show_ecpc;
				this.show_target_ctr = show_ctr;
				this.show_target_vcr = show_vcr;
			},

			/**
			 * Strategy by type
			 */
			isStrategyByType(type: String) {
				return this.checkSelectedIDByName(
					this.getStrategies,
					type,
					this.campaign.strategy_id
				);
			},

			/**
			 * Optimization Strategy by type
			 */
			isOptimizationStrategyByType(type: String) {
				return this.checkSelectedIDByName(
					this.getOptimizationStrategies,
					type,
					this.campaign.optimization_strategy_id
				);
			},

			isValidNumber(num: Number) {
				return !isNaN(num) && isNumber(num);
			},

			checkSelectedIDByName(data: any, value: String, id: Number) {
				const result = find(data, { value: value });
				return result && result.id === id;
			},
			async validate() {
				let form = this.$refs.form;
				const valid = await form.validate();
				return await valid;
			},
			handleCancel() {
				this.$router.push({ name: "CampaignsIndex" });
			},

			async handleSubmit() {
				try {
					if (!(await this.validate())) return;
					const emit = this.isEdit
						? "update-campaign"
						: "create-campaign";
					this.$emit(emit, {
						campaign: this.prepareDataCreate(),
					});
				} catch (error) {
					console.error("handleSubmit", { error: error });
				}
			},

			prepareDataCreate() {
				return {
					id: this.isEdit ? Number(this.campaign.id) : undefined,
					name: String(this.campaign.name),
					advertiser_id: Number(this.campaign.advertiser_id),
					budget: Number(this.campaign.budget),
					start_date: `${this.campaign.start_date} ${this.start_time}`,
					end_date: `${this.campaign.end_date} ${this.end_time}`,
					frequency_caps: this.campaign.frequency_caps,
					alternative_id: String(this.campaign.alternative_id),
					active: 1,
					trafficker_id: Number(this.campaign.trafficker_id),
					budget_type_id: Number(this.campaign.budget_type_id),
					automatic_allocation: Number(
						this.campaign.automatic_allocation
					),
					kpi_campaign_id: Number(this.campaign.kpi_campaign_id),
					kpi_objective: Number(this.campaign.kpi_objective),
					optimization_strategy_id: Number(
						this.campaign.optimization_strategy_id
					),
					strategy_id: Number(this.campaign.strategy_id),
					campaign_pacing_id: Number(this.campaign.campaign_pacing_id),
					daily_budget: Number(this.campaign.daily_budget),
					cpm_bid: Number(this.campaign.cpm_bid),
					target_ecpc: Number(this.campaign.target_ecpc),
					target_ctr: Number(this.campaign.target_ctr),
					target_vcr: Number(this.campaign.target_vcr),
				} as CampaignDataCreate;
			},

			calcCampaignDuration() {
				const startDate = this.moment(
					`${this.campaign.start_date} ${this.start_time}`
				);
				const endDate = this.moment(
					`${this.campaign.end_date} ${this.end_time}`
				);

				if (!this.isValidDates()) return;

				const diff = endDate.diff(startDate, "days");

				const duration = this.moment.duration(endDate.diff(startDate));

				var days = duration.asDays();

				if (days < 0) {
					this.campaign.end_date = "";
					this.campaign_duration = undefined;
					return;
				}

				this.campaign_duration = Math.ceil(days);
			},
			isValidDates() {
				const startDate = this.moment(
					`${this.campaign.start_date} ${this.start_time}`
				);
				const endDate = this.moment(
					`${this.campaign.end_date} ${this.end_time}`
				);
				return startDate.isValid() && endDate.isValid();
			},
			onSelectedDate(input: string, date: any) {
				this.campaign[input] = date;
				this.$refs[input].save(date);
				this.calcCampaignDuration();
				switch (input) {
					case "start_date":
						this.openStartTime = true;

						break;

					default:
						break;
				}
			},
			onSelectedTime(input: string, time: any) {
				this.campaign[input] = time;
				this.$refs[input].save(time);
				this.calcCampaignDuration();
			},

			/**
			 * Start
			 */
			selectedStartDate(data: any) {
				this.closeOpenStartDate();
				this.openOpenStartTime();
				this.calcCampaignDuration();
			},
			selectedStartTime(data: any) {
				this.closeOpenStartDate();
				this.closeOpenStartTime();
				this.calcCampaignDuration();
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
				this.campaign.start_date = data;
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

			/**
			 * End
			 */
			selectedEndDate(data: any) {
				this.closeOpenEndDate();
				this.openEndTime = true;
				this.calcCampaignDuration();
			},
			selectedEndTime(data: any) {
				this.closeOpenEndDate();
				this.closeOpenEndTime();
				this.calcCampaignDuration();
			},
			closeOpenEndDate() {
				this.openEndDate = false;
			},
			closeOpenEndTime() {
				this.openEndTime = false;
			},
			endDateUpdate(data: any) {
				this.campaign.end_date = data;
			},
			endTimeUpdate(data: any) {
				this.end_time = data;
			},
			addRowFrecuency() {
				this.$emit("init-frequency-caps");
				this.campaign.frequency_caps.push({
					impressions: undefined,
					every_time: undefined,
					unit_time_id: undefined,
				});
			},
			deleteRowFrecuency(index: number) {
				if (this.campaign.frequency_caps.length === 1) return;
				this.campaign.frequency_caps.splice(index, 1);
			},
		},
	});
</script>
