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
						<CardTextField
							v-model="campaign.name"
							:rules="nameRules"
							hint="Name"
							reference="name"
							placeholder="Name"
							label="Name"
							:required="true"
						></CardTextField>
					</v-col>

					<!-- Advertiser: advertiser_id ✔ -->
					<v-col cols="12" sm="12" md="6" lg="4">
						<CardAutocomplete
							v-model="campaign.advertiser_id"
							:rules="getRules.required"
							:items="getAdvertisers"
							item_text="value"
							item_value="id"
							hint="Advertiser"
							reference="advertiser_id"
							placeholder="Advertiser"
							label="Advertiser"
							:chips="true"
							:deletable_chips="true"
							:multiple="false"
							:small_chips="true"
							:dense="false"
							:required="true"
							:disabled="isEdit"
						></CardAutocomplete>
					</v-col>

					<!-- Owner: trafficker_id ✔ -->
					<v-col cols="12" sm="12" md="6" lg="4">
						<CardAutocomplete
							v-model="campaign.trafficker_id"
							:rules="getRules.required"
							:items="owners"
							item_text="value"
							item_value="id"
							hint="Owner"
							reference="trafficker_id"
							placeholder="Owner"
							label="Owner"
							:chips="true"
							:deletable_chips="true"
							:multiple="false"
							:small_chips="true"
							:dense="false"
							:required="true"
							:disabled="isEdit"
						></CardAutocomplete>
					</v-col>
				</v-row>

				<v-row dense>
					<!-- Solo mostrar dato de la cuenta: Currency ✔ -->
					<v-col cols="12" sm="12" md="6" lg="4">
						<CardTextField
							v-model="getCurrency"
							hint="Currency"
							reference="currency"
							placeholder="Currency"
							label="Currency"
							:required="false"
							:disabled="true"
						></CardTextField>
					</v-col>

					<!-- Solo mostrar dato de la cuenta: Timezone ✔ -->
					<v-col cols="12" sm="12" md="6" lg="4">
						<CardTextField
							v-model="getTimezone"
							hint="Timezone"
							reference="timezone"
							placeholder="Timezone"
							label="Timezone"
							:required="false"
							:disabled="true"
						></CardTextField>
					</v-col>

					<!-- Alternative ID ✔ -->
					<v-col cols="12" sm="12" md="6" lg="4">
						<CardTextField
							v-model="campaign.alternative_id"
							hint="Alternative ID"
							reference="AlternativeID"
							placeholder="Alternative ID"
							label="Alternative ID"
						></CardTextField>
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

					<!-- Start Date -->
					<v-col
						cols="12"
						sm="12"
						md="6"
						lg="4"
					>
						<v-card
							elevation="0"
							class="pa-2"
							outlined
							tile
							color="rgb(0, 0, 0, 0.0)"
						>
							<DatePicker
								label="Start Date"
								v-model="campaign.start_date"
								:min_date="getMinDate"
								:rules="startDateRules"
								:required="true"
							></DatePicker>
						</v-card>
					</v-col>

					<!-- End Date -->
					<v-col
						cols="12"
						sm="12"
						md="6"
						lg="4"
					>
						<v-card
							elevation="0"
							class="pa-2"
							outlined
							tile
							color="rgb(0, 0, 0, 0.0)"
						>
							<DatePicker
								label="End Date"
								v-model="campaign.end_date"
								:min_date="getMinDate"
								:rules="endDateRules"
								:is_end="true"
								:required="true"
							></DatePicker>
						</v-card>
					</v-col>

					<!-- Campaign Duration* Calculo en dias entre el inicio y fin de campaña ✔ -->
					<v-col cols="12" sm="12" md="6" lg="4">
						<CardTextField
							v-model="campaign_duration"
							hint="Campaign Duration"
							reference="campaign_duration"
							placeholder="Campaign Duration"
							label="Campaign Duration"
							:disabled="true"
						></CardTextField>
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
									Budget Type <span class="red--text"><strong>*</strong></span>
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
						<CardTextField
							v-model.number="campaign.budget"
							v-numeric
							:rules="getRules.required"
							:hint="getBudgetText"
							ref="budget"
							:label="getBudgetText"
							:placeholder="getBudgetText"
							:disabled="!getBudgetText"
							:required="true"
						></CardTextField>
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
									Automatic Allocation <span class="red--text"><strong>*</strong></span>
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
									Optimization Strategy <span class="red--text"><strong>*</strong></span>
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
					<v-col cols="12" sm="12" md="6" lg="4" v-if="showCampaignPacing">
						<CardAutocomplete
							v-model="campaign.campaign_pacing_id"
							v-numeric
							:rules="getRules.required"
							:items="getCampaignsPacing"
							item_text="value"
							item_value="id"
							hint="Campaign Pacing"
							reference="campaign_pacing_id"
							placeholder="Campaign Pacing"
							label="Campaign Pacing"
							:chips="true"
							:deletable_chips="true"
							:multiple="false"
							:small_chips="true"
							:dense="false"
							:required="true"
						></CardAutocomplete>
					</v-col>

					<!-- Daily Budget* -->
					<v-col
						cols="12"
						sm="12"
						md="6"
						lg="4"
						v-if="showDailyBudget"
					>
						<CardTextField
							v-model.number="campaign.daily_budget"
							v-numeric
							:rules="getRules.daily_budget"
							:hint="getError('daily_budget')"
							ref="daily_budget"
							label = "Daily Budget"
							placeholder = "Daily Budget"
							:suffix="getSuggested"
							:persistent-hint="hasError('daily_budget')"
							:required="true"
						></CardTextField>
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
						<CardAutocomplete
							v-model="campaign.kpi_campaign_id"
							v-numeric
							:rules="getRules.required"
							:items="getKpiCampaigns"
							item_text="value"
							item_value="id"
							hint="KPI Campaign"
							reference="kpi_campaign_id"
							placeholder="KPI Campaign"
							label="KPI Campaign"
							:chips="true"
							:deletable_chips="true"
							:multiple="false"
							:small_chips="true"
							:dense="false"
							:required="true"
						></CardAutocomplete>
					</v-col>

					<!-- kpi Objective* -->
					<v-col cols="12" sm="12" md="6" lg="4">
						<CardTextField
							v-model.number="campaign.kpi_objective"
							v-numeric
							:rules="getRules.required"
							:hint="getKpiObjectiveLabel"
							ref="kpi_objective"
							:label = "getKpiObjectiveLabel"
							:placeholder = "getKpiObjectiveLabel"
							:required="true"
						></CardTextField>
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
					<v-col cols="12" sm="12" md="6" lg="4" v-if="isOptimizationStrategyById">
						<CardAutocomplete
							v-model="campaign.strategy_id"
							v-numeric
							:rules="getRules.required"
							:items="getStrategies"
							item_text="value"
							item_value="id"
							hint="Biding Strategy"
							reference="strategy_id"
							placeholder="Biding Strategy"
							label="Biding Strategy"
							:chips="true"
							:deletable_chips="true"
							:multiple="false"
							:small_chips="true"
							:dense="false"
							:required="true"
						></CardAutocomplete>
					</v-col>

					<!-- Bid CPM* -->
					<v-col cols="12" sm="12" md="6" lg="2">
						<CardTextField
							v-model.number="campaign.cpm_bid"
							v-numeric
							:rules="getRules.cpm_bid"
							hint="Bid CPM"
							ref="cpm_bid"
							label = "Bid CPM"
							placeholder = "Bid CPM"
							:required="true"
						></CardTextField>
					</v-col>

					<!-- Expected* -->
					<v-col
						v-if="showExpectedLabel"
						cols="12"
						sm="12"
						md="6"
						lg="2"
					>
						<CardTextField
							v-model.number="campaign.cpm_bid"
							v-numeric
							:rules="getRules.cpm_bid"
							:hint="getExpectedLabel"
							ref="cpm_bid"
							:label = "getExpectedLabel"
							:placeholder = "getExpectedLabel"
							:required="true"
							:valueText="getExpectedValue"
						></CardTextField>
					</v-col>

					<!-- Target eCPCV* -->
					<v-col
						v-if="show_target_ecpc"
						cols="12"
						sm="12"
						md="6"
						lg="2"
					>
						<CardTextField
							v-model.number="campaign.target_ecpc"
							v-numeric
							:rules="getRules.target_ecpc"
							hint="Target eCPCV"
							ref="target_ecpc"
							label = "Target eCPCV"
							placeholder = "Target eCPCV"
							:required="true"
						></CardTextField>
					</v-col>

					<!-- Target CTR* -->
					<v-col
						v-if="show_target_ctr"
						cols="12"
						sm="12"
						md="6"
						lg="2"
					>
						<CardTextField
							v-model.number="campaign.target_ctr"
							v-numeric
							:rules="getRules.target_ctr"
							hint="Target CTR"
							ref="target_ctr"
							label = "Target CTR"
							placeholder = "Target CTR"
							:required="true"
						></CardTextField>
					</v-col>

					<!-- Target VCR* -->
					<v-col
						v-if="show_target_vcr"
						cols="12"
						sm="12"
						md="6"
						lg="2"
					>
						<CardTextField
							v-model.number="campaign.target_vcr"
							v-numeric
							:rules="getRules.target_vcr"
							hint="Target VCR"
							ref="target_vcr"
							label = "Target VCR"
							placeholder = "Target VCR"
							:required="true"
						></CardTextField>
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
								Frecuency Cup <span class="red--text"><strong>*</strong></span>
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
							<CardTextField
								v-model="frequency_cap.impressions"
								:rules="getRules.required"
								hint="Impressions"
								ref="Impressions"
								label = "Impressions"
								placeholder = "Impressions"
								:required="true"
							></CardTextField>
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
							<CardTextField
								v-model="frequency_cap.every_time"
								:rules="getRules.required"
								hint="Every Time"
								ref="every_time"
								label = "Every Time"
								placeholder = "Every Time"
								:required="true"
							></CardTextField>
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
							<CardAutocomplete
								v-model="frequency_cap.unit_time_id"
								v-numeric
								:rules="getRules.required"
								:items="getUnitTimes"
								item_text="value"
								item_value="id"
								hint="Unit Time"
								:reference="`unit_time_id_${frequency_cap.unit_time_id}`"
								placeholder="Unit Time"
								label="Unit Time"
								:chips="true"
								:deletable_chips="true"
								:multiple="false"
								:small_chips="true"
								:dense="false"
								:required="true"
							></CardAutocomplete>
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
	import DatePicker from "../../../../components/Content/DatePicker.vue";
	import { CampaignDataCreate } from "../../../../interfaces/campaign";
	import CardTextField from "../../../../components/Content/CardTextField.vue";
	import CardAutocomplete from "../../../../components/Content/CardAutocomplete.vue";

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

	// Configs to Date
	const DEFAULT_DATE_TIME_FORMAT = "YYYY-MM-DD HH:mm:ss";
	const DEFAULT_START_TIME = "00:00:00";
	const DEFAULT_END_TIME = "00:59:59";

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
				default: function () {
					return { frequency_caps: [] };
				},
			},
			account: {
				type: Object,
				default: function () {
					return {};
				},
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
		components: {
			DatePicker,
			CardTextField,
			CardAutocomplete,
		},
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
				if (
					!isUndefined(this.campaign.frequency_caps) &&
					!this.campaign.frequency_caps.length
				) {
					this.addRowFrecuency();
				}
			}, 1000);
		},
		computed: {
			getMinDate() {
				return this.moment().format(DEFAULT_DATE_TIME_FORMAT);
			},

			isEdit() {
				return this.is_edit;
			},

			/**
			 * STRING RULES
			 */

			getBudgetText() {
				if (isUndefined(this.campaign.budget_type_id)) return "Total";
				const result = find(this.getBudgetType, {
					id: this.campaign.budget_type_id,
				});
				return result ? `Total ${result.value}` : "Total";
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
				if (
					!this.isEdit &&
					!isUndefined(this.campaign) &&
					Object.entries(this.campaign).length
				)
					return;
				if (
					!isUndefined(this.campaign.frequency_caps) &&
					this.campaign.frequency_caps.length
				) {
					this.$emit("init-frequency-caps");
				}
				this.calculateDuration();
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
					let value = (this.campaign.budget / (this.campaign.kpi_objective / 1000));
					if( !isNaN(value) && value !== Infinity ){
						this.expected_value = (value).toFixed(2);
					}else{this.expected_value = undefined}
				}

				/**
				 * is OPTIMIZED_CPC
				 */
				if (this.isStrategyByType(OPTIMIZED_CPC)) {
					this.expected_show = true;
					this.setTargets(true, true, false);

					this.expected_label = "eCPC";
					let value = (this.campaign.budget / this.campaign.kpi_objective);
					if( !isNaN(value) && value !== Infinity ){
						this.expected_value = (value).toFixed(2);
					}else{this.expected_value = undefined}
				}

				/**
				 * is OPTIMIZED_VCR
				 */
				if (this.isStrategyByType(OPTIMIZED_VCR)) {
					this.expected_show = true;
					this.setTargets(false, false, true);

					this.expected_label = "eCPCV";
					let value = (this.campaign.budget / this.campaign.kpi_objective);
					
					if( !isNaN(value) && value !== Infinity){
						this.expected_value = (value).toFixed(2);
					}else{this.expected_value = undefined}
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
					start_date: this.moment(this.campaign.start_date).format(DEFAULT_DATE_TIME_FORMAT),
					end_date: this.moment(this.campaign.end_date).format(DEFAULT_DATE_TIME_FORMAT),
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

			isValidDates() {
				const startDate = this.moment(this.campaign.start_date);
				const endDate = this.moment(this.campaign.end_date);
				return startDate.isValid() && endDate.isValid();
			},

			addRowFrecuency() {
				if (isUndefined(this.campaign.frequency_caps)) return;
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

			getCalculateDuration() {
				if (!this.isValidDates()) return;
				
				const startDate = this.moment(this.campaign.start_date);
				const endDate = this.moment(this.campaign.end_date);
				
				let days = this.calculateDuration(startDate,endDate);
				
				if ( days < 0 ) {
					this.campaign.end_date = "";
					this.campaign_duration = undefined;
					return;
				}

				this.campaign_duration = days;
			},

			calculateDuration(start: any, end: any){
				if( !(start.isValid() && end.isValid()) ){
					return -1;
				}
				const diff = end.diff(start, "days");
				const duration = this.moment.duration(end.diff(start));
				return Math.ceil(duration.asDays());
			},

		},
		watch:{
			"campaign.start_date"(val, old){
				this.getCalculateDuration()
			},

			"campaign.end_date"(val, old){
				this.getCalculateDuration()
			},
		}
	});
</script>
