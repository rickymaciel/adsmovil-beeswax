<template>
	<v-layout class="d-block ma-0 pa-0">
		<Alertize @return-alertize="redirectTo"></Alertize>
		<v-layout class="d-block ma-0 pa-0 white">
			<v-container class="my-0 py-0">
				<CreateTabs
					:current_tab="currentTab"
					:items="items"
					custom_class="v-tab--secondary"
					@update-selected-tab-index="updateSelectedTabIndex"
				></CreateTabs>
			</v-container>
		</v-layout>
		<v-layout class="d-block ma-0 pa-0">
			<v-container class="my-0 py-8">
				<v-tabs-items v-model="currentTab">
					<v-tab-item v-for="(item, index) in items" :key="index">
						<!-- Overview -->
						<v-layout
							color="transparent"
							v-if="isCurrentTabSelected(item, 0)"
							column
						>
							<!-- <Overview
								v-if="lineItem"
								:campaigns="getCampaigns"
								:biddingShadings="getBiddingShadings"
								:advertisers="getAdvertisers"
								:lineItemTypes="getLineItemTypes"
								:line_item="lineItem"
								:campaigns_pacing="getCampaignsPacing"
								:budget_types="getBudgetTypes"
								:optimization_strategies="
									getOptimizationStrategies
								"
								:strategies="getStrategies"
								:unit_times="getUnitTimes"
								:creativeWeightingMethods="
									getCreativeWeightingMethods
								"
								:bidStrategies="getBidStrategies"
								:linesPacing="getLinesPacing"
								@update-model="updateModelOverview"
								@init-frequency-caps="dispatchUnitTimes()"
								@create-overview="handleSubmitOverview"
								@update-overview="handleSubmitOverview"
								@create-overview-continue="
									handleSubmitAndContinueOverview
								"
								@update-overview-continue="
									handleSubmitAndContinueOverview
								"
								@handle-cancel="handleCancel"
								:errors="getErrors"
								:is_edit="isEdit"
							></Overview> -->
						</v-layout>

						<!-- Targeting -->
					</v-tab-item>
				</v-tabs-items>
			</v-container>
		</v-layout>
	</v-layout>
</template>

<script lang="ts">
import CreateTabs from "../Create/createTabs.vue";
import Overview from "../Create/overview.vue";
import NavTargeting from "../targetings/tab_contents/targetingNav.vue";
import Vue from "vue";
import {
	AdvertiserFilters,
	AdvertiserOptions,
} from "../../../../interfaces/advertiser";
import {
	CampaingFilters,
	CampaingOptions,
} from "../../../../interfaces/campaign";

import { TargetingDataCreate, Term } from "../../../../interfaces/targeting";

import {
	initLineItem,
	initHardCoreLineItem,
	initTargeting,
	initDataVariables,
} from "../../../../utils/initData";
import Alertize from "../../../../components/Alertize.vue";
import {
	isArray,
	isEmpty,
	isString,
	isUndefined,
	last,
	toNumber,
	trim,
} from "lodash";
import { LineItemDataCreate } from "../../../../interfaces/line_item";
import CardTextField from "../../../../components/Content/CardTextField.vue";
import AppSite from "../targetings/appSite.vue";
import Content from "../targetings/content.vue";
import Environment from "../targetings/environment.vue";
import Geo from "../targetings/geo.vue";
import Exchange from "../targetings/exchange.vue";
import { prepareTargetingDataCreate } from "../../../../utils/resolveObjectArray";

export default Vue.extend({
	name: "Edit",
	props: {},
	components: {
		CreateTabs,
		Overview,
		Alertize,
		NavTargeting,
		CardTextField,
		AppSite,
		Content,
		Environment,
		Geo,
		Exchange,
	},
	data: () => ({
		title: "EditLineItem",
		currentTab: 0,
		currentTabTargeting: 0,
		items: [],
		lineItem: null,
		targeting: null,

		//Aux App Site
		data_variables: initDataVariables(),
	}),
	async created() {
		this.items = [
			{ key: 0, tab: "Overview", disabled: false },
			{ key: 1, tab: "Targeting", disabled: true }, // !this.isCreatedLineItem
			{ key: 2, tab: "Modifiers / Models", disabled: true },
			{ key: 3, tab: "Creatives", disabled: true },
		];

		await this.handleShow();
		this.lineItem = this.getParsedData();
	},
	async mounted() {
		if (this.currentTab === 0) {
			await this.loadResources();
		}
		this.items.filter((i: { key: number; disabled: boolean }) => {
			if (i.key === 1) {
				i.disabled = !Boolean(this.lineItem.id);
			}
			return i;
		});
	},
	computed: {
		getCampaign() {
			return this.$store.state.line_item.lineItem;
		},
		getId() {
			let pathArray: String[] = this.$route.path.split("/");
			const lastItem = last(pathArray);
			return !isNaN(toNumber(lastItem)) ? toNumber(lastItem) : NaN;
		},
		isEdit() {
			return !isNaN(Number(this.getId));
		},
		getCampaigns() {
			return this.$store.state.campaign.campaigns_list;
		},
		getBiddingShadings() {
			return this.$store.state.custom_list.bidding_shadings_list;
		},
		getAdvertisers() {
			return this.$store.state.advertiser.advertisers_list;
		},
		getLineItemTypes() {
			return this.$store.state.custom_list.line_item_types;
		},
		getLineItem() {
			return this.$store.state.line_item.lineItem;
		},
		getBudgetTypes() {
			return this.$store.state.custom_list.budget_types;
		},
		getCampaignsPacing() {
			return this.$store.state.custom_list.campaigns_pacing;
		},
		getOptimizationStrategies() {
			return this.$store.state.custom_list.optimization_strategies;
		},
		getStrategies() {
			return this.$store.state.custom_list.strategies;
		},
		getUnitTimes() {
			return this.$store.state.custom_list.unit_times;
		},
		getCreativeWeightingMethods() {
			return this.$store.state.custom_list.creative_weighting_methods;
		},
		getBidStrategies() {
			return this.$store.state.custom_list.bid_strategy_list;
		},
		getLinesPacing() {
			return this.$store.state.custom_list.lines_pacing_list;
		},
		getErrors() {
			return this.$store.state.proccess.errors;
		},
		hasErrors() {
			return Object.keys(this.$store.state.proccess.errors).length > 0;
		},
		getPrepareTargetingDataCreate() {
			return prepareTargetingDataCreate(this.targeting);
		},
	},
	methods: {
		getParsedData() {
			let entity = this.getLineItem;

			entity.automatic_allocation = entity.automatic_allocation ? 1 : 0;

			this.start_time = this.formatDate(
				entity.start_date,
				this.time_format
			);
			this.end_time = this.formatDate(entity.end_date, this.time_format);

			/*entity.start_date = this.formatDate(
													entity.start_date,
													this.date_format
												);
												entity.end_date = this.formatDate(
													entity.end_date,
													this.date_format
												);*/

			return entity;
		},

		formatDate(date: String, format: String) {
			return this.moment(date).format(format);
		},

		async loadResources() {
			this.setLoading(true);
			await this.dispatchCampaigns();
			await this.dispatchAdvertisers();
			await this.dispatchTypes();
			await this.dispatchBudgetTypes();
			await this.dispatchCampaignPacing();
			await this.dispatchOptimizationStrategies();
			await this.dispatchStrategies();
			await this.dispatchUnitTimes();
			await this.dispatchCreativeWeightingMethods();
			await this.dispatchBidStrategies();
			await this.dispatchLinesPacing();
			await this.dispatchBiddingShadings();
			this.setLoading(false);
		},
		redirectTo() {
			this.setNotification({ title: "", message: "", type: "" });
			this.$router.push({ name: "LineItemList" });
		},
		setNotification(notification: Notification) {
			return this.$store.dispatch(
				"proccess/setNotification",
				notification,
				{ root: true }
			);
		},
		isCurrentTabSelected(item: { key: number }, index: number): Boolean {
			return item.key === index;
		},

		/**
		 * GET
		 */
		async dispatchCampaigns() {
			return this.$store.dispatch("campaign/list", {
				filters: {} as CampaingFilters,
				options: { sort: "name", order: "asc" } as CampaingOptions,
			});
		},

		async dispatchAdvertisers() {
			return this.$store.dispatch("advertiser/list", {
				filters: {} as AdvertiserFilters,
				options: { sort: "name", order: "asc" } as AdvertiserOptions,
			});
		},

		async dispatchTypes() {
			return this.$store.dispatch("custom_list/getLineItemTypes", {
				filters: {} as any,
				options: { sort: "name", order: "asc" } as any,
			});
		},

		async dispatchCampaignPacing() {
			return this.$store.dispatch("custom_list/getCampaignPacing", {
				root: true,
			});
		},

		async dispatchBudgetTypes() {
			return this.$store.dispatch("custom_list/getBudgetTypes", {
				root: true,
			});
		},

		async dispatchOptimizationStrategies() {
			return this.$store.dispatch(
				"custom_list/getOptimizationStrategies",
				{
					root: true,
				}
			);
		},

		async dispatchStrategies() {
			return this.$store.dispatch("custom_list/getStrategies", {
				root: true,
			});
		},

		async dispatchUnitTimes() {
			if (!isEmpty(this.getUnitTimes)) return;
			return this.$store.dispatch("custom_list/getUnitTimes", {
				root: true,
			});
		},

		async dispatchCreativeWeightingMethods() {
			if (!isEmpty(this.getCreativeWeightingMethods)) return;
			return this.$store.dispatch(
				"custom_list/getCreativeWeightingMethods",
				{
					root: true,
				}
			);
		},

		async dispatchBidStrategies() {
			if (!isEmpty(this.dispatchBidStrategies)) return;
			return this.$store.dispatch("custom_list/getBidStrategies", {
				root: true,
			});
		},

		async dispatchLinesPacing() {
			if (!isEmpty(this.dispatchLinesPacing)) return;
			return this.$store.dispatch("custom_list/getLinesPacing", {
				root: true,
			});
		},

		async dispatchBiddingShadings() {
			if (!isEmpty(this.dispatchBiddingShadings)) return;
			return this.$store.dispatch("custom_list/getBiddingShadings", {
				root: true,
			});
		},

		async show(id: number) {
			return this.$store.dispatch("line_item/show", id, {
				root: true,
			});
		},

		async handleShow() {
			try {
				this.setLoading(true);
				await this.show(this.getId);
				this.setLoading(false);
			} catch (error) {
				console.error("handleShow", { error: error });
				this.setLoading(false);
			}
		},

		async handleCancel() {
			try {
				this.$router.push({ name: "lineItemList" });
			} catch (error) {
				console.error("handleCancel", { error: error });
				this.setLoading(false);
			}
		},

		async handleSubmitOverview(data: { lineItem: LineItemDataCreate }) {
			try {
				this.setLoading(true);
				await this.createOverview(data.lineItem);
				this.$router.push({ name: "lineItemList" });
				this.setLoading(false);
			} catch (error) {
				console.error("handleSubmitOverview", { error: error });
				this.setLoading(false);
			}
		},

		async handleSubmitAndContinueOverview(data: {
			lineItem: LineItemDataCreate;
		}) {
			try {
				this.setLoading(true);
				await this.createOverview(data.lineItem);
				this.setLoading(false);
			} catch (error) {
				console.error("handleSubmitAndContinueOverview", {
					error: error,
				});
				this.setLoading(false);
			}
		},

		async handleTargetingSubmit() {
			try {
				this.setLoading(true);
				const targeting_create_data = {
					line_item_id: this.lineItem.id,
					active: true,
					targeting_terms: prepareTargetingDataCreate(
						this.targeting
					) as Array<Term>,
				} as TargetingDataCreate;
				await this.createTargeting(targeting_create_data);
				this.setLoading(false);
			} catch (error) {
				console.error("handleSubmit", { error: error });
				this.setLoading(false);
			}
		},

		async createOverview(lineItem: LineItemDataCreate) {
			return this.$store.dispatch("line_item/create", lineItem);
		},

		async createTargeting(targeting: TargetingDataCreate) {
			return this.$store.dispatch("targeting/create", targeting);
		},

		setLoading(_loading: Boolean) {
			this.$store.state.proccess.loading = _loading;
		},

		/**
		 * Targeting keys
		 */
		getTargetingIDByValue() {
			return {
				app_bundle_list: 1,
				app_id_list: 2,
				app_name: 3,
				deal_id: 4,
				deal_id_list: 5,
				domain_list: 6,
				placement_list: 7,
				publisher_id: 8,
				publisher_id_list: 9,
				site: 10,
				site_list: 11,
			};
		},

		/**
		 * HANDLERS
		 */

		updateSelectedTabIndex(index: number) {
			this.currentTab = index;
			if (this.currentTab === 0) {
				this.loadResources();
			}
		},

		updateSelectedTabTargetingIndex(index: number) {
			this.currentTabTargeting = index;
		},

		updateModelOverview(model: any) {
			this.campaign = model;
		},

		/**
		 * Add item
		 */
		addItem(params: {
			tab: string | number;
			key: string | number;
			value: any;
		}) {
			this.targeting[params.tab][params.key].targeting_terms.push({
				value: params.value,
				targeting_key_id: this.getTargetingIDByValue()[params.key],
				targeting_predicate_id: 1823,
			});
		},

		/**
		 * Add item unique
		 */
		addItemUnique(params: {
			tab: string | number;
			key: string | number;
			value: any;
			reset: Boolean | undefined;
		}) {
			if (!isEmpty(trim(params.value))) {
				if (
					!isEmpty(
						this.targeting[params.tab][params.key].targeting_terms
					)
				) {
					if (
						!this.targeting[params.tab][
							params.key
						].targeting_terms[0].value.includes(trim(params.value))
					) {
						this.targeting[params.tab][
							params.key
						].targeting_terms[0].value.push(trim(params.value));
					}
				} else {
					this.targeting[params.tab][params.key].targeting_terms.push(
						{
							value: [trim(params.value)],
							targeting_key_id:
								this.getTargetingIDByValue()[params.key],
							targeting_predicate_id: 1823,
						}
					);
				}
			}

			if (!isUndefined(params.reset) && Boolean(params.reset)) {
				this.targeting[params.tab][params.key].value = "";
			}
		},

		updateItemUnique(params: {
			tab: string | number;
			key: string | number;
			items: Array<string>;
		}) {
			let terms: Array<any> = [];

			params.items.forEach((item) => {
				if (isEmpty(trim(item))) return;
				if (isEmpty(terms)) {
					terms.push({
						value: [trim(item)],
						targeting_key_id:
							this.getTargetingIDByValue()[params.key],
						targeting_predicate_id: 1823,
					});
				} else {
					if (!terms[0].value.includes(trim(item))) {
						terms[0].value.push(trim(item));
					}
				}
			});

			this.targeting[params.tab][params.key].targeting_terms = terms;
		},

		/**
		 * Remove item unique
		 */
		removeItemUnique(params: {
			tab: string | number;
			key: string | number;
			value: any;
		}) {
			/**
			 * Targeting Terms by {{key}}
			 */
			if (
				!isEmpty(this.targeting[params.tab][params.key].targeting_terms)
			) {
				const targetingTerm =
					this.targeting[params.tab][params.key].targeting_terms[0];

				if (isEmpty(targetingTerm.value)) return;

				const index = targetingTerm.value.findIndex(
					(v: any) => v === params.value
				);

				if (index > -1) {
					this.targeting[params.tab][
						params.key
					].targeting_terms[0].value.splice(index, 1);

					if (
						isEmpty(
							this.targeting[params.tab][params.key]
								.targeting_terms[0].value
						)
					) {
						this.targeting[params.tab][params.key].targeting_terms =
							[];
					}
				}
			}

			/**
			 * targeting.{tab}.{app_bundle_list}.value
			 */

			if (!this.targeting[params.tab][params.key].value) return;

			if (isString(this.targeting[params.tab][params.key].value)) {
				const separator = ",";

				let splitted = String(
					this.targeting[params.tab][params.key].value
				).split(separator);

				const index = splitted.indexOf(params.value);

				if (index > -1) {
					splitted.splice(index, 1);

					this.targeting[params.tab][params.key].value =
						splitted.join(separator);
				}
			}

			if (isArray(this.targeting[params.tab][params.key].value)) {
				const _index = this.targeting[params.tab][
					params.key
				].value.findIndex((v: Number) => v === params.value);

				if (_index > -1) {
					this.targeting[params.tab][params.key].value.splice(
						_index,
						1
					);
				}
			}
		},

		/**
		 * Remove item
		 */
		removeItem(params: {
			tab: string | number;
			key: string | number;
			value: any;
		}) {
			/**
			 * Targeting Terms by {{key}}
			 */
			const index = this.targeting[params.tab][params.key].targeting_terms
				.filter(
					(t: any) =>
						t.targeting_key_id ===
						this.getTargetingIDByValue()[params.key]
				)
				.findIndex((t: { value: any }) => t.value === params.value);

			if (index > -1) {
				this.targeting[params.tab][params.key].targeting_terms.splice(
					index,
					1
				);
			}

			/**
			 * targeting.app_site.app_bundle_list.value
			 */
			const _index = this.targeting[params.tab][
				params.key
			].value.findIndex((v: Number) => v === params.value);

			if (_index > -1) {
				this.targeting[params.tab][params.key].value.splice(_index, 1);
			}
		},

		/**
		 * Clear All items
		 */
		clearHandler(params: { key: string | number; tab: string | number }) {
			this.targeting[params.tab][params.key].value = [];
			this.targeting[params.tab][params.key].targeting_terms = [];
		},

		/**
		 * Update variables auxiliares
		 */
		updateDataVariables(params: any) {
			this.data_variables[params.key] = params.data;
		},

		addCommaHandler(params: {
			tab: string | number;
			key: string | number;
		}) {
			this.targeting[params.tab][params.key].value =
				this.targeting[params.tab][params.key].value.concat(",");
		},
	},
	watch: {},
});
</script>