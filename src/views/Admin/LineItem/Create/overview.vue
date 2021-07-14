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
				<v-row dense>
					<!-- Campaign: campaign_id -->
					<v-col cols="12" sm="12" md="6" lg="4">
						<CardAutocomplete
							v-model="entity.campaing_id"
							v-numeric
							:rules="getRules.required"
							:items="getCampaings"
							item_text="value"
							item_value="id"
							hint="Campaing"
							reference="campaing_id"
							placeholder="Select Campaing"
							label="Campaing"
							:chips="true"
							:deletable_chips="true"
							:multiple="false"
							:small_chips="true"
							:dense="false"
							:required="true"
							:class="{ disabled: isEdit }"
							:disabled="isEdit"
							@change="onChangeCampaing"
						></CardAutocomplete>
					</v-col>

					<!-- Advertiser: advertiser_id -->
					<v-col cols="12" sm="12" md="6" lg="4">
						<CardAutocomplete
							v-model="entity.advertiser_id"
							v-numeric
							:rules="getRules.required"
							:items="getAdvertisers"
							item_text="value"
							item_value="id"
							hint="Advertiser"
							reference="advertiser_id"
							placeholder="Select Advertiser"
							label="Advertiser"
							:chips="true"
							:deletable_chips="true"
							:multiple="false"
							:small_chips="true"
							:dense="false"
							:required="true"
							:class="{ disabled: isEdit }"
							:disabled="isEdit"
						></CardAutocomplete>
					</v-col>

					<!-- Name -->
					<v-col cols="12" sm="12" md="6" lg="4">
						<CardTextField
							v-model="entity.name"
							hint="Name"
							reference="name"
							:rules="getRules.required"
							label="Name"
							placeholder="Add Name"
							:required="true"
						></CardTextField>
					</v-col>
				</v-row>

				<v-row dense>
					<!-- Line Type -->
					<v-col cols="12" sm="12" md="6" lg="4">
						<CardAutocomplete
							v-model="entity.line_item_type_id"
							v-numeric
							:rules="getRules.required"
							:items="getLineTypes"
							item_text="value"
							item_value="id"
							hint="Line type"
							reference="line_item_type_id"
							placeholder="Select Line type"
							label="Line type"
							:chips="true"
							:deletable_chips="true"
							:multiple="false"
							:small_chips="true"
							:dense="false"
							:required="true"
							:class="{ disabled: isEdit }"
							:disabled="isEdit"
						></CardAutocomplete>
					</v-col>

					<!-- Alternative ID -->
					<v-col cols="12" sm="12" md="6" lg="4">
						<CardTextField
							v-model="entity.alternative_id"
							hint="Alternative ID"
							reference="alternative_id"
							label="Alternative ID"
							placeholder="Alternative ID"
							:required="false"
						></CardTextField>
					</v-col>

					<!-- Creative Weighting Method  -->
					<v-col cols="12" sm="12" md="6" lg="4">
						<CardAutocomplete
							v-model="entity.creative_method_id"
							v-numeric
							:rules="getRules.required"
							:items="getCreativeWeightingMethods"
							item_text="value"
							item_value="id"
							hint="Creative Weighting Method"
							reference="creative_method_id"
							placeholder="Select Creative Weighting Method"
							label="Creative Weighting Method"
							:chips="true"
							:deletable_chips="true"
							:multiple="false"
							:small_chips="true"
							:dense="false"
							:required="true"
							:class="{ disabled: isEdit }"
							:disabled="isEdit"
						></CardAutocomplete>
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
								label="Start Date*"
								v-model="entity.start_date"
								:min_date="getMinDate"
								:max_date="getMaxDate"
								:rules="startDateRules"
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
								label="End Date*"
								v-model="entity.end_date"
								:min_date="getMinDate"
								:max_date="getMaxDate"
								:rules="endDateRules"
								:is_end="true"
							></DatePicker>
						</v-card>
					</v-col>

					<!-- Campaign Duration  -->
					<v-col cols="12" sm="12" md="6" lg="4">
						<CardTextField
							v-model="entity.line_duration"
							hint="Line Duration"
							reference="line_duration"
							label="Line Duration"
							placeholder="Line Duration"
							:required="true"
							:disabled="true"
							class="disabled"
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

					<!-- Budget Type -->
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
									v-model.number="entity.budget_type_id"
									v-numeric
									:rules="getRules.required"
									row
									:disabled="!getBudgetTypeStatus"
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

					<!-- Total Budget*  -->
					<v-col cols="12" sm="12" md="6" lg="4">
						<CardTextField
							v-model="entity.budget"
							:rules="getRules.budget"
							:hint="getBudgetText"
							reference="budget"
							:label="getBudgetText"
							:placeholder="getBudgetText"
							:required="true"
							:disabled="!getBudgetContentStatus"
							:class="{ disabled: !getBudgetContentStatus }"
						></CardTextField>
					</v-col>
				</v-row>

				<!-- Bidding -->
				<v-row dense>
					<v-col cols="12" sm="12" md="12" lg="12">
						<v-card
							class="grey lighten-3 d-flex justify-start align-center mt-4"
							elevation="0"
							flat
							tile
						>
							<v-card-title class="px-2">Bidding</v-card-title>
							<v-divider class="mt-3"></v-divider>
						</v-card>
					</v-col>

					<!-- Bid Strategy -->
					<v-col cols="4" sm="4" md="4" lg="4" class="pl-4">
						<v-card
							elevation="0"
							class="pa-2"
							outlined
							tile
							color="rgb(0, 0, 0, 0.0)"
						>
							<v-layout class="mt-2">
								<v-label class="v-label theme--light">
									Bid Strategy <span class="red--text"><strong>*</strong></span>
								</v-label>
							</v-layout>
							<v-layout>
								<v-radio-group
									v-model="entity.bid_strategy_id"
									row
									:rules="getRules.required"
								>
									<v-radio
										v-for="bidType in getBidStrategies"
										:key="bidType.id"
										:label="bidType.value"
										:value="bidType.id"
										color="secondary"
									></v-radio>
								</v-radio-group>
							</v-layout>
						</v-card>
					</v-col>

					<!-- Fix CPM -->
					<v-col cols="4" sm="4" md="4" lg="4" v-if="can_edit_fix_cpm">
						<CardTextField
							v-model="entity.fix_cpm"
							:rules="getRules.cpm_bid"
							hint="Fix CPM"
							reference="fix_cpm"
							label="Fix CPM"
							placeholder="Fix CPM"
							:required="true"
							:disabled="!can_edit_fix_cpm"
							:class="{ disabled: !can_edit_fix_cpm }"
						></CardTextField>
					</v-col>

					<!-- Bidding Shading -->
					<v-col cols="12" sm="12" md="6" lg="4">
						<CardAutocomplete
							v-model="entity.bid_shading_id"
							v-numeric
							:items="getBiddingShadings"
							item_text="value"
							item_value="id"
							hint="Bidding Shading"
							reference="bid_shading_id"
							placeholder="Select Bidding Shading"
							label="Bidding Shading"
							:chips="true"
							:deletable_chips="true"
							:multiple="false"
							:small_chips="true"
							:dense="false"
							:required="false"
						></CardAutocomplete>
					</v-col>
				</v-row>

				<!-- optimization -->
				<!-- Solo si Bid Strategy = YES -->
				<v-row dense v-if="getCanShowOptimizationStrategy">
					<v-col cols="12" sm="12" md="12" lg="12">
						<v-card
							class="grey lighten-3 d-flex justify-start align-center mt-4"
							elevation="0"
							flat
							tile
						>
							<v-card-title class="px-2">Optimization</v-card-title>
							<v-divider class="mt-3"></v-divider>
						</v-card>
					</v-col>

					<!-- Optimization Strategy -->
					<v-col cols="12" sm="12" md="6" lg="4">
						<CardAutocomplete
							v-model="entity.strategy_id"
							v-numeric
							:rules="getRules.required"
							:items="getStrategies"
							item_text="value"
							item_value="id"
							hint="Strategy"
							reference="strategy_id"
							placeholder="Select Strategy"
							label="Strategy"
							:chips="true"
							:deletable_chips="true"
							:multiple="false"
							:small_chips="true"
							:dense="false"
							:required="true"
							@change="onChangeOptimizationStrategy"
						></CardAutocomplete>
					</v-col>

					<!-- CPM Bid -->
					<v-col cols="12" sm="12" md="6" lg="2">
						<CardTextField
							v-model="entity.cpm_bid"
							:rules="getRules.cpm_bid"
							hint="CPM Bid"
							reference="cpm_bid"
							label="CPM Bid"
							placeholder="CPM Bid"
							:required="true"
						></CardTextField>
					</v-col>

					<!-- Target eCPC -->
					<v-col v-if="show_target_ecpc" cols="12" sm="12" md="6" lg="2">
						<CardTextField
							v-model="entity.target_ecpc"
							hint="Target eCPC"
							reference="target_ecpc"
							label="Target eCPC"
							placeholder="Target eCPC"
							:required="false"
							class="disabled"
							:disabled="true"
						></CardTextField>
					</v-col>

					<!-- Target eCPM -->
					<v-col v-if="show_target_ecpm" cols="12" sm="12" md="6" lg="2">
						<CardTextField
							v-model="entity.target_ecpm"
							hint="Target eCPM"
							reference="target_ecpm"
							label="Target eCPM"
							placeholder="Target eCPM"
							:required="false"
							class="disabled"
							:disabled="true"
						></CardTextField>
					</v-col>

					<!-- Target CTR -->
					<v-col v-if="show_target_ctr" cols="12" sm="12" md="6" lg="2">
						<CardTextField
							v-model="entity.target_ctr"
							hint="Target CTR"
							reference="target_ctr"
							label="Target CTR"
							placeholder="Target CTR"
							:required="false"
							:rules="getRules.target_ctr"
						></CardTextField>
					</v-col>

					<!-- Target eCPCV -->
					<v-col v-if="show_target_ecpcv" cols="12" sm="12" md="6" lg="2">
						<CardTextField
							v-model="entity.target_ecpcv"
							hint="Target eCPCV"
							reference="target_ecpcv"
							label="Target eCPCV"
							placeholder="Target eCPCV"
							:required="false"
							class="disabled"
							:disabled="true"
						></CardTextField>
					</v-col>

					<!-- Target CPCV -->
					<v-col v-if="show_target_cpcv" cols="12" sm="12" md="6" lg="2">
						<CardTextField
							v-model="entity.target_cpcv"
							hint="Target CPCV"
							reference="target_cpcv"
							label="Target CPCV"
							placeholder="Target CPCV"
							:required="false"
						></CardTextField>
					</v-col>

					<!-- Target VCR -->
					<v-col v-if="show_target_vcr" cols="12" sm="12" md="6" lg="2">
						<CardTextField
							v-model="entity.target_vcr"
							hint="Target VCR"
							reference="target_vcr"
							label="Target VCR"
							placeholder="Target VCR"
							:required="false"
						></CardTextField>
					</v-col>

				</v-row>

				<!-- Pacing -->
				<v-row dense v-if="!isAutomaticAllocation">
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

					<!-- Line Pacing -->
					<v-col cols="12" sm="12" md="6" lg="4" v-if="showCampaignPacing">
						<CardAutocomplete
							v-model="entity.line_pacing_id"
							v-numeric
							:rules="getRules.required"
							:items="getLinesPacing"
							item_text="value"
							item_value="id"
							hint="Line Pacing"
							reference="line_pacing_id"
							placeholder="Select Line Pacing"
							label="Line Pacing"
							:chips="true"
							:deletable_chips="true"
							:multiple="false"
							:small_chips="true"
							:dense="false"
							:required="true"
						></CardAutocomplete>
					</v-col>

					<!-- Daily Budget -->
					<v-col cols="12" sm="12" md="6" lg="4">
						<CardTextField
							v-model="entity.daily_budget"
							v-numeric
							:rules="getRules.daily_budget"
							:hint="getError('daily_budget')"
							reference="daily_budget"
							label="Daily Budget"
							placeholder="Daily Budget"
							:required="false"
							class="p-prefix"
							:suffix="getSuggested"
							:persistent-hint="hasError('daily_budget')"
							:disabled="!can_edit_daily_budget"
							:class="{ disabled: !can_edit_daily_budget }"
						></CardTextField>
					</v-col>

					<!-- Daily Budget Suggested -->
					<v-col cols="12" sm="12" md="6" lg="4">
						<CardTextField
							v-model.number="entity.daily_budget_suggested"
							v-numeric
							:hint="getError('daily_budget_suggested')"
							reference="daily_budget_suggested"
							placeholder="Daily Budget Suggested"
							label="Daily Budget Suggested"
							class="p-prefix disabled"
							:suffix="getSuggested"
							:persistent-hint="hasError('daily_budget_suggested')"
							:disabled="true"
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

				<!-- Frecuency Cup -->
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
					v-for="(frequency_cap, index) in entity.frequency_caps"
					:key="index"
				>
					<!-- impressions -->
					<v-col cols="12" sm="12" md="4" lg="3">
						<CardTextField
							v-model="frequency_cap.impressions"
							:rules="getRules.required"
							hint="Impressions"
							reference="impressions"
							placeholder="Impressions"
							label="Impressions"
							:required="true"
						></CardTextField>
					</v-col>

					<!-- every_time -->
					<v-col cols="12" sm="12" md="4" lg="3">
						<CardTextField
							v-model="frequency_cap.every_time"
							:rules="getRules.required"
							hint="Every Time"
							reference="every_time"
							placeholder="Every Time"
							label="Every Time"
							:required="true"
						></CardTextField>
					</v-col>

					<!-- unit_time_id -->
					<v-col cols="12" sm="12" md="4" lg="3">
						<CardAutocomplete
							v-model="frequency_cap.unit_time_id"
							:rules="getRules.required"
							hint="Unit Time"
							:items="getUnitTimes"
							:reference="`unit_time_id_${frequency_cap.unit_time_id}`"
							item-text="value"
							item-value="id"
							label="Unit Time"
							placeholder="Unit Time"
							v-numeric
							:chips="true"
							:deletable_chips="true"
							:multiple="false"
							:small_chips="true"
							:dense="false"
							:required="true"
						></CardAutocomplete>
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
									@click="handleSave"
								>
									{{ $t("save") }}
								</v-btn>
								<v-btn
									rounded
									color="secondary"
									class="ma-2 px-8"
									@click="handleSaveAndContinue"
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
	import { LineItemDataCreate } from "../../../../interfaces/line_item";
	import { CampaingList, CampaignDataCreate, CampaingDataUpdate } from '@/interfaces/campaign';
	import { LineTypeList } from "@/interfaces/line_type";
	import { CreativeWeightingMethodList } from "@/interfaces/creativeWeightingMethod";
	import { initLineItem } from "../../../../utils/initData";
	import CardTextField from "../../../../components/Content/CardTextField.vue";
	import CardAutocomplete from "../../../../components/Content/CardAutocomplete.vue";
	import CardSwitch from "../../../../components/Content/CardSwitch.vue";

	const BY_CAMPAIGN = "By Campaign";
	const DAILY = "Daily";
	const IMPRESSIONS = "Impressions";
	const SPEND = "Spend";
	const IMPRESSION = "Impression";
	const LINE_TYPE_BY_VIDEO = "Video";

	// Configs to Optimization Strategy
	const OPTIMIZED_CPM = "Optimized CPM";
	const OPTIMIZED_CPC = "Optimized CPC";
	const OPTIMIZED_VCR = "Optimized VCR";

	const OPTIMIZATION_BY_LINE = "By Line";
	const OPTIMIZATION_BY_CAMPAIGN = "By Campaign";

	// Configs to Bid Strategy
	const BID_STRATEGY_FIXED = "Fix";
	const BID_STRATEGY_AUTOMATED = "Automated";

	// Configs to Date
	const DEFAULT_DATE_TIME_FORMAT = "YYYY-MM-DD HH:mm:ss";
	const DEFAULT_START_TIME = "00:00:00";
	const DEFAULT_END_TIME = "00:59:59";

	export default Vue.extend({
		name: "Overview",
		props: {
			campaigns: {
				type: Array,
				required: true,
			},
			biddingShadings: {
				type: Array,
				required: true,
			},
			advertisers: {
				type: Array,
				required: true,
			},
			lineItemTypes: {
				type: Array,
				required: true,
			},
			lineItem: {
				type: Object,
				default: function () {
					return { frequency_caps: [] };
				},
			},
			campaigns_pacing: {
				type: Array,
				required: true,
			},
			budget_types: {
				type: Array,
				required: true,
			},
			optimization_strategies: {
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
			creativeWeightingMethods: {
				type: Array,
				required: true,
			},
			bidStrategies: {
				type: Array,
				required: true,
			},
			linesPacing: {
				type: Array,
				required: true,
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
			CardTextField,
			CardAutocomplete,
			CardSwitch,
			DatePicker,
		},
		data: () => ({
			title: "Overview",
			valid: false,
			expected_show: false,
			expected_value: undefined,
			expected_label: "",
			showDailyBudget: true,
			show_target_ecpc: false,
			show_target_ctr: false,
			show_target_ecpcv: false,
			show_target_cpcv: false,
			show_target_ecpm: false,
			show_target_vcr: false,
			
			budgetText: "Total",

			// Date
			today: "",
			openStartDate: false,
			openStartTime: false,
			openEndDate: false,
			openEndTime: false,
			start_date: "",
			end_date: "",
			start_time: DEFAULT_START_TIME,
			end_time: DEFAULT_END_TIME,
			min_date: "",
			max_date: "",

			// Data
			entity: initLineItem(),
			campaign: {} as CampaignDataCreate,

			// Controll Enable
			can_edit_budget_type: true,
			can_edit_budget_content: true,
			can_edit_bidding_shading: false,
			can_edit_fix_cpm: true,
			max_budget_content: null,
			can_edit_daily_budget: false,
		}),
		created() {},
		mounted() {
			this.today = this.getDateTodayString();
			this.min_date = this.getDateTodayString();
			this.max_date = this.getDateTodayString();
			
			setTimeout(() => {
				if (
					!isUndefined(this.entity.frequency_caps) &&
					!this.entity.frequency_caps.length
				) {
					this.addRowFrecuency();
				}
			}, 1000);
		},
		computed: {
			getMinDate() {
				if( this.campaign?.start_date ){
					return this.moment(this.campaign.start_date).format(
						DEFAULT_DATE_TIME_FORMAT
					);
				}
				return this.moment().format(DEFAULT_DATE_TIME_FORMAT);
			},

			getMaxDate() {
				return this.campaign?.end_date ? this.moment(this.campaign?.end_date).format(DEFAULT_DATE_TIME_FORMAT) : "";
			},

			isEdit() {
				return this.is_edit;
			},

			/**
			 * STRING RULES
			 */

			getBudgetText() {
				this.budgetText = "Total";
				if (isUndefined(this.entity.budget_type_id)) {
					return this.budgetText;
				};
				const result = find(this.getBudgetType, {
					id: this.entity.budget_type_id,
				});
				if( result ){
					this.budgetText = `Total ${result.value}`;
				}else{
					this.budgetText = "Total";
				}
				return this.budgetText;
			},

			getBudgetTypeStatus() {
				return this.can_edit_budget_type;
			},

			getBudgetContentStatus() {
				return this.can_edit_budget_content;
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
					target_ctr: [
						(v: any) => Boolean(v) || true,
						(v: number) => v >= 0 || this.$t("min", { min: 0 }),
						(v: number) => v <= 1 || this.$t("max", { max: 1 }),
					],
					target_cpcv: [
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
					budget: [
						(v: any) => Boolean(this.campaign?.budget) || this.$t("require-campaign"),
						(v: any) => Boolean(v) || this.$t("fieldRequired"),
						(v: any) =>
							v <= this.campaign?.budget ||
							this.$t("max", {
								max: this.campaign?.budget,
							}),
						
					],
				};
			},
			calcSuggested() {
				return Math.round(this.entity.budget / this.entity.line_duration);
			},
			getSuggested() {
				if (
					!this.showDailyBudget ||
					!this.entity.budget ||
					!this.entity.line_duration
				)
					return "";
				return `Suggested ${this.calcSuggested}`;
			},

			/**
			 * Check
			 */

			initEdit() {
				if (
					!this.isEdit &&
					!isUndefined(this.entity) &&
					Object.entries(this.entity).length
				)
					return;
				if (
					!isUndefined(this.entity.frequency_caps) &&
					this.entity.frequency_caps.length
				) {
					this.$emit("init-frequency-caps");
				}
				this.getCalculateDuration();
			},

			isSelectedAutomaticAllocation() {
				return [0, 1].includes(this.campaign?.automatic_allocation);
			},

			isAutomaticAllocation() {
				return Boolean(this.campaign?.automatic_allocation === 1);
			},

			isBudgetTypeImpressions() {
				return this.checkSelectedIDByName(
					this.getBudgetType,
					IMPRESSIONS,
					this.entity.budget_type_id
				);
			},

			isBudgetTypeSpend() {
				return this.checkSelectedIDByName(
					this.getBudgetType,
					SPEND,
					this.entity.budget_type_id
				);
			},

			isOptimizationStrategyById() {
				return this.checkSelectedIDByName(
					this.getOptimizationStrategies,
					BY_CAMPAIGN,
					this.entity.optimization_strategy_id
				);
			},

			isCampaignPacingById() {
				return this.checkSelectedIDByName(
					this.getLinesPacing,
					DAILY,
					this.entity.line_pacing_id
				);
			},

			/**
			 * DATE RULES
			 */
			startDateRules() {
				return [
					//(v: any) => this.calculateDuration(this.moment(this.entity.start_date), this.moment(this.entity.end_date)) > 0 || this.$t("must-after-end"),
					(v: string) =>
						(!isUndefined(v) && !isNull(v) && !isEmpty(v)) ||
						this.$t("fieldRequired"),
				];
			},
			endDateRules() {
				return [
					//(v: any) => this.calculateDuration(this.moment(this.entity.start_date), this.moment(this.entity.end_date)) < 0 || this.$t("must-after-start"),
					(v: string) =>
						(!isUndefined(v) && !isNull(v) && !isEmpty(v)) ||
						this.$t("fieldRequired"),
				];
			},

			/**
			 * GET
			 */
			getCampaings(): CampaingList[] {
				return this.campaigns;
			},

			getBiddingShadings(): [] {
				return this.biddingShadings;
			},

			getAdvertisers(): AdvertiserList[] {
				return this.advertisers;
			},

			getLineTypes(): LineTypeList[] {
				return this.lineItemTypes;
			},

			getCreativeWeightingMethods(): CreativeWeightingMethodList[] {
				return this.creativeWeightingMethods;
			},

			getBudgetType() {
				return this.budget_types;
			},

			getOptimizationStrategies() {
				return this.optimization_strategies;
			},

			getStrategies() {
				if( this.entity.line_item_type_id == null ){return this.strategies;}
				let result = this.checkSelectedIDByName(this.getLineTypes,LINE_TYPE_BY_VIDEO,this.entity.line_item_type_id);
				if( !result ){
					return this.strategies;
				}else{
					this.entity.strategy_id = null;
					return this.strategies.filter(e => {return e.value !== OPTIMIZED_VCR});
				}
			},

			getUnitTimes() {
				return this.unit_times;
			},

			getBidStrategies() {
				return this.bidStrategies;
			},

			getLinesPacing() {
				return this.linesPacing;
			},

			getCanShowOptimizationStrategy(){
				//Bid strategy = Automated
				const result = find(this.getBidStrategies, {
					id: this.entity.bid_strategy_id,
				});
				if( result ){
					if( result.value.toUpperCase() == BID_STRATEGY_AUTOMATED.toUpperCase() ){
						return true;
					}
				}
				return false;
			},

			showCampaignPacing() {
				return (
					this.isAutomaticAllocation && this.isOptimizationStrategyById
				);
			},
		},
		methods: {
			setBudgetText() : string {
				if (isUndefined(this.entity.budget_type_id)) {
					this.budgetText = "Total";
					return this.budgetText;
				};
				const result = find(this.getBudgetType, {
					id: this.entity.budget_type_id,
				});
				if( result ){
					this.budgetText = `Total ${result.value}*`;
				}else{
					this.budgetText = "Total*";
				}
				return this.budgetText;
			},

			getDateTodayString(){
				return  new Date().toISOString().substr(0, 10);
			},

			getError(index: string | number) {
				if (!this.hasError(index)) return "";
				return first(this.errors[index]);
			},

			hasError(index: string | number) {
				return this.errors.hasOwnProperty(index);
			},

			/**
			 * Permite cambiar uno de estos modelos de vista para los campos relacionados con Optimization Strategy: show_ecpc, show_ctr, show_ecpcv, show_cpcv
			 * @param {boolean} show_ecpc Habilita campo eCPC
			 * @param {boolean} show_ctr Habilita campo CTR
			 * @param {boolean} show_ecpcv Habilita campo eCPCV
			 * @param {boolean} show_cpcv Habilita campo CPCV
			 * @param {boolean} show_ecpm Habilita campo eCPM
			 * @param {boolean} show_vcr Habilita campo VCR
			 * @returns {integer} el codigo de retorno 0
			 */
			setTargets(
				show_ecpc: boolean = false,
				show_ctr: boolean = false,
				show_ecpcv: boolean = false,
				show_cpcv: boolean = false,
				show_ecpm: boolean = false,
				show_vcr: boolean = false,
			) {
				this.show_target_ecpc = show_ecpc;
				this.show_target_ctr = show_ctr;
				this.show_target_ecpcv = show_ecpcv;
				this.show_target_cpcv = show_cpcv;
				this.show_target_ecpm = show_ecpm;
				this.show_target_vcr = show_vcr;
			},

			/**
			 * Strategy by type
			 */
			isStrategyByType(type: String) {
				return this.checkSelectedIDByName(
					this.getStrategies,
					type,
					this.entity.strategy_id
				);
			},

			/**
			 * Optimization Strategy by type
			 */
			isOptimizationStrategyByType(type: String) {
				return this.checkSelectedIDByName(
					this.getOptimizationStrategies,
					type,
					this.entity.optimization_strategy_id
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
				this.$router.push({ name: "LineItemsIndex" });
			},

			async handleSave() {
				try {
					if (!(await this.validate())) return;
					let entity = this.prepareDataCreate();
					const emit = this.isEdit
						? "update-lineItem"
						: "create-LineItem";
					this.$emit(emit, {
						lineItem: entity,
					});
				} catch (error) {
					console.error("handleSave", { error: error });
				}
			},

			async handleSaveAndContinue() {
				try {
					if (!(await this.validate())) return;
					const emit = this.isEdit
						? "update-lineItem"
						: "create-LineItem";
					this.$emit(emit, {
						lineItem: this.prepareDataCreate(),
					});
				} catch (error) {
					console.error("handleSaveAndContinue", { error: error });
				}
			},

			async dispatchGetCampaignById(id: number) {
				return this.$store.dispatch("campaign/getById", id, {
					root: true,
				});
			},

			prepareDataCreate() {
				return {
					id: this.isEdit ? Number(this.entity.id) : undefined,
					advertiser_id: Number(this.entity?.advertiser_id) !== NaN ? Number(this.entity.advertiser_id) : null,
					campaign_id: Number(this.entity?.campaign_id) !== NaN ? Number(this.entity.campaign_id) : null,
					name: String(this.entity.name),
					budget: Number(this.entity?.budget) !== NaN ? Number(this.entity.budget) : null,
					daily_budget: Number(this.entity?.daily_budget) !== NaN ? Number(this.entity.daily_budget) : null,
					start_date: this.moment(this.entity.start_date).format(DEFAULT_DATE_TIME_FORMAT),
					end_date: this.moment(this.entity.end_date).format(DEFAULT_DATE_TIME_FORMAT),
					active: this.entity?.active,
					alternative_id: String(this.entity.alternative_id),
					bid_strategy_id: Number(this.entity?.bid_strategy_id) !== NaN ? Number(this.entity.bid_strategy_id) : null,
					strategy_id: Number(this.entity?.strategy_id) !== NaN ? Number(this.entity.strategy_id) : null,
					line_pacing_id: Number(this.entity?.line_pacing_id) !== NaN ? Number(this.entity.line_pacing_id) : null,
					line_item_type_id: Number(this.entity?.line_item_type_id) !== NaN ? Number(this.entity.line_item_type_id) : null,
					bid_shading_id: Number(this.entity?.bid_shading_id) !== NaN ? Number(this.entity.bid_shading_id) : null,
					creative_method_id: Number(this.entity?.creative_method_id) !== NaN ? Number(this.entity.creative_method_id) : null,
					fix_cpm: Number(this.entity?.fix_cpm) !== NaN ? Number(this.entity.fix_cpm) : null,
					cpm_bid: Number(this.entity?.cpm_bid) !== NaN ? Number(this.entity.cpm_bid) : null,
					//target_ecpm: Number(this.entity?.target_ecpm) !== NaN ? Number(this.entity?.target_ecpm) : null,
					target_ecpc: Number(this.entity?.target_ecpc) !== NaN ? Number(this.entity?.target_ecpc) : null,
					//target_ecpcv: Number(this.entity?.target_ecpcv) ? Number(this.entity?.target_ecpcv) : null,
					target_ctr: Number(this.entity?.target_ctr) !== NaN ? Number(this.entity?.target_ctr) : null,
					target_vcr: Number(this.entity?.target_vcr) !== NaN ? Number(this.entity?.target_vcr) : null,
					frequency_caps: this.entity.frequency_caps,
				} as LineItemDataCreate;
			},

			getCalculateDuration() {
				if (!this.isValidDates()) return;
				const startDate = this.moment(this.entity.start_date);
				const endDate = this.moment(this.entity.end_date);
				let days = this.calculateDuration(startDate,endDate);
				if ( days < 0 ) {
					this.entity.end_date = "";
					this.entity.line_duration = undefined;
					return;
				}

				this.entity.line_duration = days;
			},

			calculateDuration(start: any, end: any){
				if( !(start.isValid() && end.isValid()) ){
					return -1;
				}
				const diff = end.diff(start, "days");
				const duration = this.moment.duration(end.diff(start));
				return Math.ceil(duration.asDays());
			},

			isValidDates() {
				const startDate = this.moment(this.entity.start_date);
				const endDate = this.moment(this.entity.end_date);
				return startDate.isValid() && endDate.isValid();
			},

			addRowFrecuency() {
				if (isUndefined(this.entity.frequency_caps)) return;
				this.$emit("init-frequency-caps");
				this.entity.frequency_caps.push({
					impressions: undefined,
					every_time: undefined,
					unit_time_id: undefined,
				});
			},

			deleteRowFrecuency(index: number) {
				if (this.entity.frequency_caps.length === 0) return;
				this.entity.frequency_caps.splice(index, 1);
			},

			async onChangeCampaing(id_campaign: any){
				this.setLoading(true);
				let result = await this.dispatchGetCampaignById(id_campaign);
				this.setLoading(false);
				if( result ){
					this.campaign = result;
					this.mappingCampaignToLineItem(this.campaign);
				}
			},

			setLoading(_loading: Boolean) {
				this.$store.state.proccess.loading = _loading;
			},

			mappingCampaignToLineItem(campaign: CampaingDataUpdate){
				if( !campaign ){return false;}
				// Proceso de mapeo inicializado
				//this.entity.name = campaign.name != null ? String(campaign?.name) : null;
				this.entity.advertiser_id = campaign?.advertiser_id != null ? Number(campaign.advertiser_id) : null;
				this.entity.alternative_id = campaign?.alternative_id != null ? String(campaign.alternative_id) : "";
				this.entity.campaign_id = campaign?.id != null ? Number(campaign.id) : null;

				this.entity.start_date = campaign?.start_date != null ? campaign.start_date : "";
				this.start_date = this.entity.start_date;
				this.entity.end_date = campaign?.end_date != null ? campaign.end_date : "";
				this.end_date = this.entity.end_date;
				
				// Calcular la duración de Line Item
				const startDate = this.moment(this.entity.start_date);
				const endDate = this.moment(this.entity.end_date);
				let days = this.calculateDuration(startDate,endDate);
				if ( days > 0 ) {
					this.entity.line_duration = days;
				}

				this.entity.budget_type_id = campaign?.budget_type_id != null ? Number(campaign.budget_type_id) : null;
				this.setBudgetText();

				// SOLO SI Automatic Allocation = YES (1)
				if( campaign?.automatic_allocation == 1 && campaign?.optimization_strategy_id ){
					this.entity.optimization_strategy_id = campaign.optimization_strategy_id;
				}
				
				// SOLO SI Automatic Allocation = YES (1) & Optimizarion Strategy = By Campaign
				if( campaign?.automatic_allocation == 1 && this.isOptimizationStrategyByType(OPTIMIZATION_BY_CAMPAIGN) ){
					this.entity.line_pacing_id = campaign?.campaign_pacing_id ? campaign.campaign_pacing_id : null;
				}
				
				// SOLO SI Automatic Allocation = YES (1) & Optimization Strategy=By Camping & Campaing Pacing = Daily
				if( campaign?.automatic_allocation == 1 && this.isOptimizationStrategyByType(OPTIMIZATION_BY_CAMPAIGN) && this.checkSelectedIDByName(this.getLinesPacing,DAILY,this.entity.line_pacing_id) ){
					this.entity.daily_budget = campaign?.daily_budget != null ? Number(campaign.daily_budget) : null;
				}
				
				// SOLO SI Automatic Allocation = YES (1) & Optimizarion Strategy = By Campaign
				if( campaign?.automatic_allocation == 1 && this.isOptimizationStrategyByType(OPTIMIZATION_BY_CAMPAIGN) ){
					this.entity.strategy_id = campaign?.strategy_id != null ?Number(campaign.strategy_id) : null;
				}
				
				// Budget Type = Spend & Optimization Stategy = By campaing & Automatica Allocation= YES && Strategy = Any
				if( this.checkSelectedIDByName(this.getBudgetType,SPEND,this.entity.budget_type_id) && this.isOptimizationStrategyByType(OPTIMIZATION_BY_CAMPAIGN) && campaign?.automatic_allocation == 1 ){
					this.entity.cpm_bid = campaign.cpm_bid != null ? Number(campaign.cpm_bid) : null;
				}

				this.entity.budget = campaign?.budget != null ? Number(campaign.budget) : null;
				// Se calculan los eCPM, eCPC y eCPCV para mostrarlos en el layout
				// Budget Type = Spend & Optimization Stategy = By campaing & Automatica Allocation= YES && Strategy = Any
				if( this.checkSelectedIDByName(this.getBudgetType,SPEND,this.entity.budget_type_id) && this.isOptimizationStrategyByType(OPTIMIZATION_BY_CAMPAIGN) && campaign?.automatic_allocation == 1 ){
					let total = this.entity?.budget ? Number(this.entity.budget) : null;
					let kpi_objective = campaign?.kpi_objective ? Number(campaign.kpi_objective) : null ;
					if( kpi_objective !== null && total !== null ){
						this.entity.target_ecpm = (total/kpi_objective/1000)?.toFixed(2);
						this.entity.target_ecpcv = (total/kpi_objective)?.toFixed(2);
					}
				}
				this.onChangeOptimizationStrategy();
				this.entity.target_ecpc = campaign.target_ecpc != null ? Number(campaign.target_ecpc) : null;
				this.entity.target_ctr = campaign.target_ctr != null ? Number(campaign.target_ctr) : null;
				
				// Optimization Strategy = By Campaing
				/*
					Budget TOTAL=> Se copia de campaña y se puede editar debe ser menor a campaña y en Automatic Allocation=YES
					Optimization Strategy=>  Se copia de campaña y se puede editar.
					CPM bid, Target eCPC,Target CTR,Target eCPCV, Target VCR =>  Se copia de campaña y se puede editar.
				*/
				if( this.isOptimizationStrategyByType(OPTIMIZATION_BY_CAMPAIGN) ){
					// Start Date, End Date => Se pueden editar pero deben estar dentro del margen de la campaña.
					this.min_date = campaign.start_date != null ? campaign.start_date.substr(0, 10) : null;
					this.max_date = campaign.end_date != null ? campaign.end_date.substr(0, 10) : null;
					// Budget TYPE => no se puede editar
					this.can_edit_budget_type = false;
				}

				// SOLO SI Automatic Allocation = YES (1) & Optimizarion Strategy = By Campaign
				if( campaign?.automatic_allocation == 1 && this.isOptimizationStrategyByType(OPTIMIZATION_BY_CAMPAIGN) ){
					this.can_edit_budget_content = false;
				}

				// SOLO SI Automatic Allocation = YES (1) & Optimizarion Strategy = By Line
				if( campaign?.automatic_allocation == 1 && this.isOptimizationStrategyByType(OPTIMIZATION_BY_LINE) ){
					this.can_edit_budget_content = true;
					this.max_budget_content = campaign?.budget != null ? Number(campaign.budget) : null;
				}

				// SOLO SI Automatic Allocation = YES (1) & Optimizarion Strategy = By Campaign
				if( campaign?.automatic_allocation == 1 && this.isOptimizationStrategyByType(OPTIMIZATION_BY_CAMPAIGN) ){
					this.entity.line_pacing_id = campaign?.campaign_pacing_id != null ?Number(campaign.campaign_pacing_id) : null;
				}

				return true;
			},

			async onChangeOptimizationStrategy() {
				//this.setTargets();
				this.entity.target_ecpm = undefined;
				this.entity.target_ecpc = undefined;
				this.entity.target_ctr = undefined;
				this.entity.target_ecpcv = undefined;
				this.entity.target_cpcv = undefined;
				let total = this.entity?.budget ? Number(this.entity.budget) : null;
				let kpi_objective = this.campaign?.kpi_objective ? Number(this.campaign.kpi_objective) : null ;
				
				/**
				 * is Bid Strategy = Automated
				 * is Strategy = Optimized CPM
				 */
				if ( this.isStrategyByType(OPTIMIZED_CPM) ){
					this.setTargets(false, false, false, false, true, false);
					if( kpi_objective !== null && total !== null ){
						this.entity.target_ecpm = (total/kpi_objective/1000)?.toFixed(2);
					}else{this.entity.target_ecpm = undefined}
					return;
				}

				/**
				 * is Bid Strategy = Automated
				 * is Strategy = Optimized CPC
				 */
				if ( this.isStrategyByType(OPTIMIZED_CPC) ) {
					this.setTargets(true, true, false, false, false, false);
					if( kpi_objective !== null && total !== null ){
						this.entity.target_ecpc = (total/kpi_objective)?.toFixed(2);
					}else{this.entity.target_ecpc = undefined}
					return;
				}

				/**
				 * is Bid Strategy = Automated
				 * is OPTIMIZED_VCR
				 */
				if (this.isStrategyByType(OPTIMIZED_VCR)) {
					this.setTargets(false, false, true, false, false, true);
					if( kpi_objective !== null && total !== null ){
						this.entity.target_ecpcv = (total/kpi_objective)?.toFixed(2);
					}else{this.entity.target_ecpcv = undefined}
					return;
				}
			},
		},
		watch:{
			"entity.bid_strategy_id"(val, old){
				const result = find(this.getBidStrategies, {
					id: this.entity.bid_strategy_id,
				});
				if( result ){
					if( result.value.toUpperCase() == BID_STRATEGY_FIXED.toUpperCase() ){
						this.can_edit_fix_cpm = true;
						this.can_edit_bidding_shading = false;
					}else{
						this.can_edit_fix_cpm = false;
						this.can_edit_bidding_shading = true;
						this.entity.fix_cpm = null;
					}
				}
			},
			
			"entity.line_pacing_id"(val, old){
				let founded = this.checkSelectedIDByName(
					this.getLinesPacing,
					DAILY,
					this.entity.line_pacing_id
				);
				if( founded ){
					this.can_edit_daily_budget = true;
					this.entity.daily_budget = null;
					if( this.entity.budget && this.entity.line_duration ){
						this.entity.daily_budget_suggested = (this.entity.budget / this.entity.line_duration)?.toFixed(2);
					}
				}else{
					this.can_edit_daily_budget = false;
					this.entity.daily_budget = null;
					this.entity.daily_budget_suggested = null;
				}
			},

			"entity.start_date"(val, old){
				this.getCalculateDuration()
			},

			"entity.end_date"(val, old){
				this.getCalculateDuration()
			},
		}
	});
</script>