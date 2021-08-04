<template>
	<v-card justify="between" align="center" color="grey lighten-3 py-4">
		<v-form
			ref="form"
			justify="between"
			align="center"
			v-model="valid"
			lazy-validation
		>
			<v-container>
				<v-row dense>
					<!-- ID -->
					<v-col
						v-if="hasData(getLineItem.id)"
						cols="12"
						sm="12"
						md="6"
						lg="4"
					>
						<CardTextField
							v-model="getLineItem.id"
							hint="ID"
							reference="id"
							label="ID"
							placeholder="ID"
							:required="true"
							:disabled="true"
						></CardTextField>
					</v-col>

					<!-- Campaign: campaign_id -->
					<v-col cols="12" sm="12" md="6" lg="4">
						<CardAutocomplete
							v-model="getLineItem.campaign_id"
							:rules="[getRules.isRequired]"
							:items="resources.campaigns"
							item_text="value"
							item_value="id"
							hint="Campaing"
							reference="campaign_id"
							placeholder="Select Campaing"
							label="Campaing"
							:class="{ disabled: isEdit }"
							:required="true"
							:disabled="isEdit"
							:error_messages="getError('campaign_id')"
							@focus="
								fetchResource(
									'campaign_id',
									getLineItem.campaign_id
								)
							"
						></CardAutocomplete>
					</v-col>

					<!-- Advertiser: advertiser_id  -->
					<v-col cols="12" sm="12" md="6" lg="4">
						<CardAutocomplete
							v-model="getLineItem.advertiser_id"
							:rules="[getRules.isRequired]"
							:items="resources.advertisers"
							item_text="value"
							item_value="id"
							hint="Advertiser"
							reference="advertiser_id"
							placeholder="Select Advertiser"
							label="Advertiser"
							:required="true"
							:disabled="true"
							:error_messages="getError('advertiser_id')"
						></CardAutocomplete>
					</v-col>

					<!-- Name -->
					<v-col cols="12" sm="12" md="6" lg="4">
						<CardTextField
							v-model="getLineItem.name"
							hint="Name"
							reference="name"
							:rules="[getRules.isRequired]"
							label="Name"
							placeholder="Add Name"
							:required="true"
							:error_messages="getError('name')"
						></CardTextField>
					</v-col>
				</v-row>

				<v-row dense>
					<!-- Line Type -->
					<v-col cols="12" sm="12" md="6" lg="4">
						<CardAutocomplete
							v-model="getLineItem.line_item_type_id"
							:rules="[getRules.isRequired]"
							:items="resources.line_item_types"
							item_text="value"
							item_value="id"
							hint="Line Item type"
							reference="line_item_type_id"
							placeholder="Select Line Item type"
							label="Line Item type"
							:required="true"
							:error_messages="getError('line_item_type_id')"
							@focus="fetchResource('line_item_type_id')"
							@change="handleChange($event, 'line_item_type_id')"
						></CardAutocomplete>
					</v-col>

					<!-- Alternative ID -->
					<v-col cols="12" sm="12" md="6" lg="4">
						<CardTextField
							v-model="getLineItem.alternative_id"
							hint="Alternative ID"
							reference="alternative_id"
							label="Alternative ID"
							placeholder="Alternative ID"
						></CardTextField>
					</v-col>

					<!-- Creative Weighting Method  -->
					<v-col cols="12" sm="12" md="6" lg="4">
						<CardAutocomplete
							v-model="getLineItem.creative_method_id"
							:rules="[getRules.isRequired]"
							:items="resources.creative_weighting_methods"
							item_text="value"
							item_value="id"
							hint="Creative Weighting Method"
							reference="creative_method_id"
							placeholder="Select Creative Weighting Method"
							label="Creative Weighting Method"
							:disabled="isEdit"
							@focus="fetchResource('creative_method_id')"
						></CardAutocomplete>
					</v-col>
				</v-row>

				<v-row v-if="isEdit">
					<!-- active -->
					<v-col
						class="pe-lg-16 pa-0"
						cols="12"
						sm="12"
						md="12"
						lg="12"
					>
						<CardSwitch
							v-model="getLineItem.active"
							reference="active"
							label="Active"
							color="success"
						></CardSwitch>
					</v-col>
				</v-row>

				<!-- Duration -->
				<v-row dense>
					<v-col cols="12" sm="12" md="12" lg="12">
						<v-card
							class="
								grey
								lighten-3
								d-flex
								justify-start
								align-center
								mt-4
							"
							elevation="0"
							flat
							tile
						>
							<v-card-title class="px-2">
								Duration Line
							</v-card-title>
							<v-divider class="mt-3"></v-divider>
						</v-card>
					</v-col>

					<!-- Start Date -->
					<v-col cols="12" sm="12" md="6" lg="4">
						<v-card
							elevation="0"
							class="pa-2"
							outlined
							tile
							color="rgb(0, 0, 0, 0.0)"
						>
							<DatePicker
								label="Start Date"
								v-model="getLineItem.start_date"
								elevation="15"
								:min_date="getMinDate"
								:max_date="getMaxDate"
								:rules="[
									getRules.isRequired,
									getRules.isAfterToday,
								]"
								:required="true"
								:error_messages="getError('start_date')"
							></DatePicker>
						</v-card>
					</v-col>

					<!-- End Date -->
					<v-col cols="12" sm="12" md="6" lg="4">
						<v-card
							elevation="0"
							class="pa-2"
							outlined
							tile
							color="rgb(0, 0, 0, 0.0)"
						>
							<DatePicker
								label="End Date"
								v-model="getLineItem.end_date"
								:min_date="getMinDate"
								:max_date="getMaxDate"
								:rules="[
									getRules.isRequired,
									getRules.isAfterCompare(
										getLineItem.end_date,
										getLineItem.start_date
									),
								]"
								:is_end="true"
								:required="true"
								:error_messages="getError('end_date')"
							></DatePicker>
						</v-card>
					</v-col>

					<!-- Campaign Duration  -->
					<v-col cols="12" sm="12" md="6" lg="4">
						<CardTextField
							v-model="getLineItem.line_duration"
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
							class="
								grey
								lighten-3
								d-flex
								justify-start
								align-center
								mt-4
							"
							elevation="0"
							flat
							tile
						>
							<v-card-title class="px-2"> Budget </v-card-title>
							<v-divider class="mt-3"></v-divider>
						</v-card>
					</v-col>

					<!-- Budget Type -->
					<v-col
						v-if="resources.fields.budget_type_id.show"
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
							<v-layout>
								<v-label class="v-label theme--light">
									Budget Type
									<span class="red--text">
										<strong>*</strong>
									</span>
								</v-label>
							</v-layout>
							<v-layout>
								<RadioButton
									:items="resources.budget_types"
									:model_data="getLineItem.budget_type_id"
									:row="true"
									:rules="[getRules.isRequired]"
									color="secondary"
									:disabled="
										resources.fields.budget_type_id.disabled
									"
									@change="
										handleChange($event, 'budget_type_id')
									"
								></RadioButton>
							</v-layout>
						</v-card>
					</v-col>

					<!-- Total Budget*  -->
					<v-col
						v-if="resources.fields.budget.show"
						cols="12"
						sm="12"
						md="6"
						lg="4"
					>
						<CardTextField
							v-model="getLineItem.budget"
							:rules="[
								getRules.isRequired,
								resources.selected_campaign
									? getRules.isMax(
											getLineItem.budget,
											resources.selected_campaign.budget
									  )
									: true,
							]"
							:hint="resources.budget_display"
							reference="budget"
							:label="resources.budget_display"
							:placeholder="resources.budget_display"
							:required="resources.fields.budget.required"
							:disabled="resources.fields.budget.disabled"
							:class="{
								disabled: resources.fields.budget.disabled,
							}"
						></CardTextField>
					</v-col>
				</v-row>

				<!-- Bidding -->
				<v-row dense>
					<v-col cols="12" sm="12" md="12" lg="12">
						<v-card
							class="
								grey
								lighten-3
								d-flex
								justify-start
								align-center
								mt-4
							"
							elevation="0"
							flat
							tile
						>
							<v-card-title class="px-2"> Bidding </v-card-title>
							<v-divider class="mt-3"></v-divider>
						</v-card>
					</v-col>

					<!-- Bid Strategy -->
					<v-col
						v-if="resources.fields.bid_strategy_id.show"
						cols="4"
						sm="4"
						md="4"
						lg="4"
						class="pl-4"
					>
						<v-card
							elevation="0"
							class="pa-2"
							outlined
							tile
							color="rgb(0, 0, 0, 0.0)"
						>
							<v-layout class="mt-2">
								<v-label class="v-label theme--light">
									Bid Strategy
									<span class="red--text">
										<strong>*</strong>
									</span>
								</v-label>
							</v-layout>
							<v-layout>
								<RadioButton
									:items="resources.bid_strategies"
									:model_data="getLineItem.bid_strategy_id"
									:row="true"
									:rules="[getRules.isRequired]"
									color="secondary"
									@change="
										handleChange($event, 'bid_strategy_id')
									"
								></RadioButton>
							</v-layout>
						</v-card>
					</v-col>

					<!-- Fix CPM -->
					<v-col
						cols="4"
						sm="4"
						md="4"
						lg="4"
						v-if="resources.fields.fix_cpm.show"
					>
						<CardTextField
							v-model="getLineItem.fix_cpm"
							:rules="[getRules.isRequired]"
							hint="Fix CPM"
							reference="fix_cpm"
							label="Fix CPM"
							placeholder="Fix CPM"
							:required="resources.fields.fix_cpm.required"
							:disabled="resources.fields.fix_cpm.disabled"
							:class="{
								disabled: resources.fields.fix_cpm.disabled,
							}"
							:error_messages="getError('fix_cpm')"
						></CardTextField>
					</v-col>

					<!-- Bidding Shading -->
					<v-col
						cols="12"
						sm="12"
						md="6"
						lg="4"
						v-if="resources.fields.bid_shading_id.show"
					>
						<CardAutocomplete
							v-model="getLineItem.bid_shading_id"
							:items="resources.bidding_shadings"
							item_text="value"
							item_value="id"
							hint="Bidding Shading"
							reference="bid_shading_id"
							placeholder="Select Bidding Shading"
							label="Bidding Shading"
							:error_messages="getError('bid_shading_id')"
							@focus="fetchResource('bid_shading_id')"
						></CardAutocomplete>
					</v-col>
				</v-row>

				<!-- optimization -->
				<!-- Solo si Bid Strategy = YES -->
				<v-row dense>
					<v-col
						v-if="resources.fields.strategy_id.show"
						cols="12"
						sm="12"
						md="12"
						lg="12"
					>
						<v-card
							class="
								grey
								lighten-3
								d-flex
								justify-start
								align-center
								mt-4
							"
							elevation="0"
							flat
							tile
						>
							<v-card-title class="px-2">
								Optimization
							</v-card-title>
							<v-divider class="mt-3"></v-divider>
						</v-card>
					</v-col>

					<!-- Optimization Strategy -->
					<v-col
						v-if="resources.fields.strategy_id.show"
						cols="12"
						sm="12"
						md="6"
						lg="4"
					>
						<CardAutocomplete
							v-model="getLineItem.strategy_id"
							:rules="[getRules.isRequired]"
							:items="resources.strategies_filtered"
							item_text="value"
							item_value="id"
							hint="Strategy"
							reference="strategy_id"
							placeholder="Select Strategy"
							label="Strategy"
							:required="true"
							:error_messages="getError('strategy_id')"
							@focus="fetchResource('strategy_id')"
						></CardAutocomplete>
					</v-col>

					<!-- CPM Bid -->
					<v-col
						cols="12"
						sm="12"
						md="6"
						lg="2"
						v-if="resources.fields.cpm_bid.show"
					>
						<CardTextField
							v-model="getLineItem.cpm_bid"
							:rules="[
								getRules.isRequired,
								getRules.isMax(getLineItem.cpm_bid, 25000),
							]"
							hint="CPM Bid"
							reference="cpm_bid"
							label="CPM Bid"
							placeholder="CPM Bid"
							:required="resources.fields.cpm_bid.required"
							:disabled="resources.fields.cpm_bid.disabled"
						></CardTextField>
					</v-col>

					<!-- Target eCPC -->
					<v-col
						v-if="resources.fields.target_ecpc.show"
						cols="12"
						sm="12"
						md="6"
						lg="2"
					>
						<CardTextField
							v-model="getLineItem.target_ecpc"
							hint="Target eCPC"
							reference="target_ecpc"
							label="Target eCPC"
							placeholder="Target eCPC"
							class="disabled"
							:required="resources.fields.target_ecpc.required"
							:disabled="resources.fields.target_ecpc.disabled"
						></CardTextField>
					</v-col>

					<!-- Target eCPM -->
					<v-col
						v-if="resources.fields.target_ecpm.show"
						cols="12"
						sm="12"
						md="6"
						lg="2"
					>
						<CardTextField
							v-model="getLineItem.target_ecpm"
							hint="Target eCPM"
							reference="target_ecpm"
							label="Target eCPM"
							placeholder="Target eCPM"
							class="disabled"
							:required="resources.fields.target_ecpm.required"
							:disabled="resources.fields.target_ecpm.disabled"
						></CardTextField>
					</v-col>

					<!-- Target CTR -->
					<v-col
						v-if="resources.fields.target_ctr.show"
						cols="12"
						sm="12"
						md="6"
						lg="2"
					>
						<CardTextField
							v-model="getLineItem.target_ctr"
							hint="Target CTR"
							reference="target_ctr"
							label="Target CTR"
							placeholder="Target CTR"
							:rules="[
								getRules.isRequired,
								getRules.isMin(getLineItem.target_ctr, 0),
								getRules.isMax(getLineItem.target_ctr, 1),
							]"
							:required="resources.fields.target_ctr.required"
						></CardTextField>
					</v-col>

					<!-- Target eCPCV -->
					<!-- <v-col
						v-if="resources.fields.target_ecpcv.show"
						cols="12"
						sm="12"
						md="6"
						lg="2"
					>
						<CardTextField
							v-model="getLineItem.target_ecpcv"
							hint="Target eCPCV"
							reference="target_ecpcv"
							label="Target eCPCV"
							placeholder="Target eCPCV"
							class="disabled"
							:required="resources.fields.target_ecpcv.required"
							:disabled="resources.fields.target_ecpcv.disabled"
						></CardTextField>
					</v-col> -->

					<!-- Target CPCV -->
					<!-- <v-col
						v-if="resources.fields.target_cpcv.show"
						cols="12"
						sm="12"
						md="6"
						lg="2"
					>
						<CardTextField
							v-model="getLineItem.target_cpcv"
							hint="Target CPCV"
							reference="target_cpcv"
							label="Target CPCV"
							placeholder="Target CPCV"
						></CardTextField>
					</v-col> -->

					<!-- Target VCR -->
					<v-col
						v-if="resources.fields.target_vcr.show"
						cols="12"
						sm="12"
						md="6"
						lg="2"
					>
						<CardTextField
							v-model="getLineItem.target_vcr"
							hint="Target VCR"
							reference="target_vcr"
							label="Target VCR"
							placeholder="Target VCR"
						></CardTextField>
					</v-col>
				</v-row>

				<!-- Pacing -->
				<v-row v-if="resources.fields.line_pacing_id.show" dense>
					<v-col cols="12" sm="12" md="12" lg="12">
						<v-card
							class="
								grey
								lighten-3
								d-flex
								justify-start
								align-center
								mt-4
							"
							elevation="0"
							flat
							tile
						>
							<v-card-title class="px-2">Pacing</v-card-title>
							<v-divider class="mt-3"></v-divider>
						</v-card>
					</v-col>

					<!-- Line Pacing -->
					<v-col cols="12" sm="12" md="6" lg="4">
						<CardAutocomplete
							v-model="getLineItem.line_pacing_id"
							:rules="[getRules.isRequired]"
							:items="resources.line_pacings"
							item_text="value"
							item_value="id"
							hint="Line Pacing"
							reference="line_pacing_id"
							placeholder="Select Line Pacing"
							label="Line Pacing"
							:required="resources.fields.line_pacing_id.required"
							:disabled="resources.fields.line_pacing_id.disabled"
							:error_messages="getError('line_pacing_id')"
							@focus="fetchResource('line_pacing_id')"
						></CardAutocomplete>
					</v-col>

					<!-- Daily Budget -->
					<v-col
						v-if="resources.fields.daily_budget.show"
						cols="12"
						sm="12"
						md="6"
						lg="4"
					>
						<CardTextField
							v-model="getLineItem.daily_budget"
							:rules="[
								resources.fields.daily_budget.required
									? getRules.isRequired
									: true,
								calcSuggested > 0
									? getRules.isMin(
											getLineItem.daily_budget,
											calcSuggested
									  )
									: true,
							]"
							:hint="getError('daily_budget')"
							reference="daily_budget"
							label="Daily Budget"
							placeholder="Daily Budget"
							class="p-prefix disabled"
							:suffix="getSuggested"
							:persistent-hint="hasError('daily_budget')"
							:required="resources.fields.daily_budget.required"
							:disabled="resources.fields.daily_budget.disabled"
							:error_messages="getError('daily_budget')"
						></CardTextField>
					</v-col>

					<!-- Daily Budget Suggested -->
					<v-col
						v-if="resources.fields.daily_budget.show"
						cols="12"
						sm="12"
						md="6"
						lg="4"
					>
						<CardTextField
							v-model.number="getSuggested"
							:hint="getError('daily_budget_suggested')"
							reference="daily_budget_suggested"
							placeholder="Daily Budget Suggested"
							label="Daily Budget Suggested"
							class="p-prefix disabled"
							:persistent-hint="
								hasError('daily_budget_suggested')
							"
							:disabled="true"
						></CardTextField>
					</v-col>
				</v-row>

				<!-- Frecuency -->
				<v-row dense>
					<v-col cols="12" sm="12" md="12" lg="12">
						<v-card
							class="
								grey
								lighten-3
								d-flex
								justify-start
								align-center
								mt-4
							"
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
								Frecuency Cap
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
					v-for="(frequency_cap, index) in getLineItem.frequency_caps"
					:key="index"
				>
					<!-- impressions -->
					<v-col cols="12" sm="12" md="4" lg="3">
						<CardTextField
							v-model="frequency_cap.impressions"
							:rules="[getRules.isRequired]"
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
							:rules="[getRules.isRequired]"
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
							:rules="[getRules.isRequired]"
							hint="Unit Time"
							:items="resources.unit_times"
							:reference="`unit_time_id_${frequency_cap.unit_time_id}`"
							item-text="value"
							item-value="id"
							label="Unit Time"
							placeholder="Unit Time"
							:required="true"
							@focus="fetchResource('unit_time_id')"
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
									@click="handleSubmit"
								>
									{{ $t("save") }}
								</v-btn>
								<v-btn
									rounded
									color="secondary"
									class="ma-2 px-8"
									@click="handleSubmitAndContinue"
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
import { isUndefined, isNull, isEmpty } from "lodash";
import DatePicker from "../../../../components/Content/DatePicker.vue";
import { LineItemDataCreate } from "../../../../interfaces/line_item";
import CardTextField from "../../../../components/Content/CardTextField.vue";
import CardAutocomplete from "../../../../components/Content/CardAutocomplete.vue";
import CardSwitch from "../../../../components/Content/CardSwitch.vue";
import RadioButton from "../../../../components/Content/RadioButton.vue";
import { getError } from "../../../../utils/resolveObjectArray";
import {
	isRequired,
	isAfterToday,
	isAfterCompare,
	isMin,
	isMax,
} from "../../../../services/rule-services";

// Configs to Date
const DEFAULT_DATE_TIME_FORMAT = "YYYY-MM-DD HH:mm:ss";

export default Vue.extend({
	name: "Overview",

	props: {
		line_item: {
			type: Object,
			default: function () {
				return {};
			},
		},
		resources: {
			type: Object,
			required: true,
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
		RadioButton,
	},

	data: () => ({
		title: "OverviewLineItem",
		valid: false,
	}),

	created() {},

	mounted() {
		this.today = this.getDateTodayString();
		this.min_date = this.getDateTodayString();
		this.max_date = this.getDateTodayString();
	},

	computed: {
		getRules() {
			return {
				isRequired,
				isAfterToday,
				isAfterCompare,
				isMin,
				isMax,
				budget: [
					isRequired,
					isMax(
						this.getLineItem.budget,
						this.resources.selected_campaign?.budget
					),
				],
			};
		},

		getLineItem: {
			set(val: any) {},
			get() {
				return this.line_item;
			},
		},

		getToday() {
			return this.moment().format(DEFAULT_DATE_TIME_FORMAT);
		},

		getMinDate() {
			if (isNull(this.resources.selected_campaign)) this.getToday;

			return this.moment(
				this.resources.selected_campaign?.start_date
			).format(DEFAULT_DATE_TIME_FORMAT);
		},

		getMaxDate() {
			if (isNull(this.resources.selected_campaign)) return "";

			return this.moment(
				this.resources.selected_campaign?.end_date
			).format(DEFAULT_DATE_TIME_FORMAT);
		},

		isEdit() {
			return this.hasData(this.getLineItem.id);
		},

		/**
		 * STRING RULES
		 */

		calcSuggested() {
			if (
				isNaN(
					Number(this.resources.selected_campaign?.budget_remaining)
				) ||
				isNaN(Number(this.getLineItem.line_duration))
			)
				return null;
			const calc = Math.round(
				Number(this.resources.selected_campaign?.budget_remaining) /
					Number(this.getLineItem.line_duration)
			);
			return isFinite(calc) && !isNaN(calc) ? calc : null;
		},

		getSuggested() {
			return isNull(this.calcSuggested)
				? null
				: `Suggested ${this.calcSuggested}`;
		},

		getErrors() {
			return this.$store.state.proccess.errors;
		},
	},
	methods: {
		hasData(attr: any) {
			return !isUndefined(attr) && !isNull(attr) && isEmpty(attr);
		},

		getDateTodayString() {
			return new Date().toISOString().substr(0, 10);
		},

		getError(index: any) {
			return getError(this.getErrors, index);
		},

		hasError(index: string | number) {
			return this.errors.hasOwnProperty(index);
		},

		async validate() {
			let form = this.$refs.form;
			const valid = await form.validate();
			return await valid;
		},

		handleChange(event: any, key: any) {
			this.$emit("change", { key: key, value: event });
		},

		handleCancel() {
			try {
				this.$emit("handle-cancel");
			} catch (error) {
				console.error("handleCancel", { error: error });
			}
		},

		async handleSubmit() {
			try {
				if (!(await this.validate())) return;
				let getLineItem = this.prepareDataCreate();
				const emit = this.isEdit
					? "update-overview"
					: "create-overview";
				this.$emit(emit, {
					lineItem: getLineItem,
				});
			} catch (error) {
				console.error("handleSubmit", { error: error });
			}
		},

		async handleSubmitAndContinue() {
			try {
				if (!(await this.validate())) return;
				const emit = this.isEdit
					? "update-overview-continue"
					: "create-overview-continue";
				this.$emit(emit, {
					lineItem: this.prepareDataCreate(),
				});
			} catch (error) {
				console.error("handleSubmitAndContinue", { error: error });
			}
		},

		prepareDataCreate() {
			return {
				id: this.isEdit ? this.getLineItem.id : undefined,
				advertiser_id: this.getLineItem?.advertiser_id,
				campaign_id: this.getLineItem?.campaign_id,
				name: String(this.getLineItem.name),
				budget: this.getLineItem?.budget,
				daily_budget: this.getLineItem?.daily_budget,
				start_date: this.moment(this.getLineItem.start_date).format(
					DEFAULT_DATE_TIME_FORMAT
				),
				end_date: this.moment(this.getLineItem.end_date).format(
					DEFAULT_DATE_TIME_FORMAT
				),
				active: this.getLineItem?.active,
				alternative_id: this.getLineItem.alternative_id,
				bid_strategy_id: this.getLineItem?.bid_strategy_id,
				strategy_id: this.getLineItem?.strategy_id,
				line_pacing_id: this.getLineItem.line_pacing_id,
				line_item_type_id: this.getLineItem?.line_item_type_id,
				bid_shading_id: this.getLineItem.bid_shading_id,
				creative_method_id: this.getLineItem.creative_method_id,
				fix_cpm: this.getLineItem?.fix_cpm,
				cpm_bid: this.getLineItem?.cpm_bid,
				//target_ecpm: Number(this.getLineItem?.target_ecpm) !== NaN ? Number(this.getLineItem?.target_ecpm) : null,
				target_ecpc: this.getLineItem?.target_ecpc,
				//target_ecpcv: Number(this.getLineItem?.target_ecpcv) ? Number(this.getLineItem?.target_ecpcv) : null,
				target_ctr: this.getLineItem?.target_ctr,
				target_vcr: this.getLineItem?.target_vcr,
				frequency_caps: this.getLineItem.frequency_caps,
			} as LineItemDataCreate;
		},

		getCalculateDuration() {
			if (!this.isValidDates()) return undefined;
			const startDate = this.moment(this.getLineItem.start_date);
			const endDate = this.moment(this.getLineItem.end_date);
			let days = this.calculateDuration(startDate, endDate);

			if (days < 0) {
				this.getLineItem.end_date = "";
				this.getLineItem.line_duration = undefined;
				return undefined;
			}

			return days;
		},

		calculateDuration(start: any, end: any) {
			if (!(start.isValid() && end.isValid())) {
				return -1;
			}
			//const diff = end.diff(start, "days");
			const duration = this.moment.duration(end.diff(start));
			return Math.ceil(duration.asDays());
		},

		isValidDates() {
			const startDate = this.moment(this.getLineItem.start_date);
			const endDate = this.moment(this.getLineItem.end_date);
			return startDate.isValid() && endDate.isValid();
		},

		addRowFrecuency() {
			this.$emit("init-frequency-caps");
		},

		deleteRowFrecuency(index: number) {
			if (this.getLineItem.frequency_caps.length === 0) return;
			this.getLineItem.frequency_caps.splice(index, 1);
		},

		setLoading(_loading: Boolean) {
			this.$store.state.proccess.loading = _loading;
		},

		//Clear Fields
		clearFieldCampaing() {
			this.$emit("clear", "clear-relations");
		},

		// fetching
		async fetchResource(key: any, value?: any) {
			this.$emit(`fetch-resource`, { resource: key, value: value });
		},
	},
	watch: {
		async "getLineItem.campaign_id"(val, old) {
			if (isNull(val)) {
				this.$emit("clear", "clear-relations");
			} else {
				this.fetchResource("campaign_id", this.getLineItem.campaign_id);

				this.$emit("change", { key: "campaign_id", value: val });
			}
		},

		"getLineItem.line_item_type_id"(val, old) {
			this.$emit("change", { key: "line_item_type_id", value: val });
		},

		"getLineItem.strategy_id"(val, old) {
			this.$emit("change", { key: "strategy_id", value: val });
		},

		"getLineItem.bid_shading_id"(val, old) {
			this.$emit("change", { key: "bid_shading_id", value: val });
		},

		"getLineItem.budget_type_id"(val, old) {
			this.$emit("change", { key: "budget_type_id", value: val });
		},

		"getLineItem.line_pacing_id"(val, old) {
			this.$emit("change", { key: "line_pacing_id", value: val });
		},

		"getLineItem.start_date"(val, old) {
			const days = this.getCalculateDuration();
			this.$emit("change", { key: "line_duration", value: days });
		},

		"getLineItem.end_date"(val, old) {
			const days = this.getCalculateDuration();
			this.$emit("change", { key: "line_duration", value: days });
		},
	},
});
</script>