<template>
	<v-layout class="d-block ma-0 pa-0">
		<Alertize @return-alertize="redirectTo"></Alertize>
		<v-layout class="d-block ma-0 pa-0 white">
			<v-container class="my-0 py-0">
				<CreateTabs
					:current_tab="currentTab"
					:items="getItems"
					custom_class="v-tab--secondary"
					@update-selected-tab-index="updateSelectedTabIndex"
				></CreateTabs>
			</v-container>
		</v-layout>
		<v-layout class="d-block ma-0 pa-0">
			<v-container class="my-0 py-8">
				<v-tabs-items v-model="currentTab">
					<v-tab-item v-for="(item, index) in getItems" :key="index">
						<!-- Overview -->
						<v-layout v-if="isCurrentTabSelected(item, 0)" column>
							<Overview
								:campaigns="getCampaigns"
								:biddingShadings="getBiddingShadings"
								:advertisers="getAdvertisers"
								:lineItemTypes="getLineItemTypes"
								:line_item="getLineItem"
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
								@update-line-item="setLineItem"
								:errors="getErrors"
							></Overview>
						</v-layout>

						<!-- Targeting -->
						<v-layout
							color="transparent"
							v-if="isCurrentTabSelected(item, 1)"
							column
						>
							<v-container class="grey lighten-3">
								<!-- Tabs targeting -->
								<v-row>
									<v-col cols="12" lg="2" md="3">
										<NavTargeting
											:current_tab="currentTabTargeting"
											@update-selected-tab-index="
												updateSelectedTabTargetingIndex
											"
										></NavTargeting>
									</v-col>
									<v-col cols="12" lg="10" md="9">
										<v-card
											width="100%"
											class="mx-auto rounded-lg"
											justify="between"
											align="center"
											color="transparent"
											elevation="2"
											tile
											flat
										>
											<AppSite
												v-if="currentTabTargeting === 0"
												:data_variables="
													data_variables.app_site
												"
												:app_site="targeting.app_site"
												@add-item="addItem"
												@add-item-unique="addItemUnique"
												@remove-item="removeItem"
												@remove-item-unique="
													removeItemUnique
												"
												@clear-app-site="clearHandler"
												@update-data-var="
													updateDataVariables
												"
												@add-comma="addCommaHandler"
												@update-item-unique="
													updateItemUnique
												"
											></AppSite>

											<Content
												v-if="currentTabTargeting === 1"
												:content="targeting.content"
											></Content>

											<Environment
												v-if="currentTabTargeting === 2"
												:environment="
													targeting.environment
												"
											></Environment>

											<Exchange
												v-if="currentTabTargeting === 3"
												:data_variables="
													data_variables.exchange
												"
												:exchange="targeting.exchange"
												@add-item="addItem"
												@add-item-unique="addItemUnique"
												@remove-item="removeItem"
												@remove-item-unique="
													removeItemUnique
												"
												@clear-app-site="clearHandler"
												@update-data-var="
													updateDataVariables
												"
												@add-comma="addCommaHandler"
												@update-item-unique="
													updateItemUnique
												"
											></Exchange>

											<Geo
												v-if="currentTabTargeting === 4"
												:data_variables="
													data_variables.geo
												"
												:geo="targeting.geo"
												@add-item="addItem"
												@add-item-unique="addItemUnique"
												@remove-item="removeItem"
												@remove-item-unique="
													removeItemUnique
												"
												@clear-app-site="clearHandler"
												@update-data-var="
													updateDataVariables
												"
												@add-comma="addCommaHandler"
												@update-item-unique="
													updateItemUnique
												"
											></Geo>
										</v-card>
									</v-col>
								</v-row>

								<!-- Actions targeting -->
								<v-row
									no-gutters
									class="mt-4"
									dense
									align="center"
									justify="start"
								>
									<v-col
										class="pe-lg-16 pa-0"
										cols="12"
										sm="4"
										md="4"
										lg="6"
									>
									</v-col>

									<v-col
										class="pe-lg-16 pa-0"
										cols="12"
										sm="8"
										md="8"
										lg="6"
									>
										<v-card
											elevation="0"
											class="pa-2"
											outlined
											tile
											color="rgb(0, 0, 0, 0.0)"
										>
											<v-row align="center" justify="end">
												<v-btn
													rounded
													color="secondary"
													class="ma-2 px-8"
												>
													{{ $t("save") }}
												</v-btn>
												<v-btn
													rounded
													color="secondary"
													class="ma-2 px-8"
													@click="
														handleTargetingSubmit
													"
												>
													{{ $t("save-continue") }}
												</v-btn>
												<v-btn
													rounded
													color="secondary"
													class="ma-2 px-8"
												>
													{{ $t("cancel") }}
												</v-btn>
											</v-row>
										</v-card>
									</v-col>
								</v-row>
							</v-container>
						</v-layout>

						<!-- Creatives -->
						<v-layout v-if="isCurrentTabSelected(item, 3)" column>
							<AssociatedCreativesForm
								@line-item-activate="handleActivate"
								@cancel="handleCancel"
								:line_item="getLineItem"
							></AssociatedCreativesForm>
						</v-layout>
					</v-tab-item>
				</v-tabs-items>
			</v-container>
		</v-layout>
	</v-layout>
</template>

<script lang="ts">
import CreateTabs from "./createTabs.vue";
import Overview from "./overview.vue";
import NavTargeting from "../targetings/targetingNav.vue";
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
	getTargetingIDByValue,
} from "../../../../utils/initData";
import Alertize from "../../../../components/Alertize.vue";
import { isArray, isEmpty, isNull, isString, isUndefined, trim } from "lodash";
import { LineItemDataCreate } from "../../../../interfaces/line_item";
import CardTextField from "../../../../components/Content/CardTextField.vue";
import AppSite from "../targetings/appSite.vue";
import Content from "../targetings/content.vue";
import Environment from "../targetings/environment.vue";
import Geo from "../targetings/geo.vue";
import Exchange from "../targetings/exchange.vue";
import { prepareTargetingDataCreate } from "../../../../utils/resolveObjectArray";
import AssociatedCreativesForm from "../creatives/associatedCreatives.vue";

export default Vue.extend({
	name: "Create",
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
		AssociatedCreativesForm,
	},
	data: () => ({
		title: "Create",
		currentTab: 0,
		currentTabTargeting: 0,
		items: [],

		// Line Item Data
		line_item: null,

		// Targeting Data
		targeting: initTargeting(),

		targeting_expressions: null,

		//Aux App Site
		data_variables: initDataVariables(),
	}),
	created() {
		// init for test
		//this.setLineItem(initHardCoreLineItem());

		this.setLineItem(initLineItem());

		this.items = [];

		this.updateSelectedTabIndex();

		// TODO revisar targeting keys -> cambiar datos hardcodeados a dinamico desde api !this.hasTargetingExpressions

		// setTimeout(async () => {
		// 	const t = await this.dispatchTargetingKeys();
		// 	console.log("dispatchTargetingKeys", { t });
		// }, 500);
	},
	mounted() {},
	computed: {
		getItems() {
			this.updateItems;
			return this.items;
		},
		updateItems() {
			this.items = [
				{ key: 0, tab: "Overview", disabled: false },
				{ key: 1, tab: "Targeting", disabled: !this.isCreatedLineItem },
				{ key: 2, tab: "Modifiers / Models", disabled: true },
				{
					key: 3,
					tab: "Creatives",
					disabled: !this.hasTargetingExpressions,
				},
			];
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
			return this.line_item;
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
		isCreatedLineItem() {
			return this.hasData(this.getLineItem.id);
		},
		hasAssociatedCreatives() {
			return (
				this.hasData(this.getLineItem.creative_associations) &&
				!isEmpty(this.getLineItem.creative_associations)
			);
		},
		getAssociatedCreatives(): Array<any> {
			return this.getLineItem.creative_associations;
		},
		hasTargetingExpressions() {
			return (
				this.hasData(this.targeting_expressions) &&
				!isEmpty(this.targeting_expressions)
			);
		},
		getTargetingExpressions() {
			return this.targeting_expressions;
		},
	},
	methods: {
		setLineItem(lineItem: any) {
			console.log("setLineItem", { lineItem });
			this.line_item = lineItem;
		},
		hasData(attr: any) {
			return !isUndefined(attr) && !isNull(attr);
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

		async dispatchTargetingKeys() {
			return this.$store.dispatch("targeting/getTargetingKeys");
		},

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
				this.setLoading(false);
				this.$router.push({ name: "lineItemList" });
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

				const result = await this.createOverview(data.lineItem);

				console.log("create::handleSubmitAndContinueOverview", {
					result,
				});

				this.setLineItem(result);

				this.updateSelectedTabIndex(1);

				this.setLoading(false);
			} catch (error) {
				console.error("create::handleSubmitAndContinueOverview", {
					error: error,
				});
				this.setLoading(false);
			}
		},

		async handleTargetingSubmit() {
			try {
				this.setLoading(true);

				const targeting_create_data = {
					line_item_id: this.getLineItem.id,
					active: true,
					targeting_terms: prepareTargetingDataCreate(
						this.targeting
					) as Array<Term>,
				} as TargetingDataCreate;

				this.targeting_expressions = await this.createTargeting(
					targeting_create_data
				);

				console.log("create::handleTargetingSubmit", {
					targeting_create_data,
					targeting_expressions: this.targeting_expressions,
				});

				this.updateSelectedTabIndex(3);

				this.setLoading(false);
			} catch (error) {
				console.error("handleSubmit", { error: error });
				this.setLoading(false);
			}
		},

		async handleActivate() {
			try {
				this.setLoading(true);

				const response = await this.activate(this.getLineItem.id);
				console.log("handleActivate", { response });

				this.setLoading(false);
			} catch (error) {
				console.error("handleActivate", { error: error });
				this.setLoading(false);
			}
		},

		async createOverview(lineItem: LineItemDataCreate) {
			return this.$store.dispatch("line_item/create", lineItem);
		},

		async createTargeting(targeting: TargetingDataCreate) {
			return this.$store.dispatch("targeting/create", targeting);
		},

		async activate(id: number) {
			return this.$store.dispatch("line_item/activate", id);
		},

		// async dispatchShowLineItem(id: any) {
		// 	console.log("--- dispatchShowLineItem(id)", id);
		// 	return await this.$store.dispatch("line_item/show", id, {
		// 		root: true,
		// 	});
		// },

		setLoading(_loading: Boolean) {
			this.$store.state.proccess.loading = _loading;
		},

		/**
		 * HANDLERS
		 */

		updateSelectedTabIndex(index: number = 0) {
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
				targeting_key_id:
					getTargetingIDByValue()[params.tab][params.key],
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
								getTargetingIDByValue()[params.tab][params.key],
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
							getTargetingIDByValue()[params.tab][params.key],
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
						getTargetingIDByValue()[params.tab][params.key]
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
			this.data_variables[params.tab][params.key] = params.data;
		},

		addCommaHandler(params: {
			tab: string | number;
			key: string | number;
		}) {
			this.targeting[params.tab][params.key].value =
				this.targeting[params.tab][params.key].value.concat(",");
		},
	},
	watch: {
		async currentTab(val, old) {
			if (val === 0) {
				await this.loadResources();
			}

			// this.items.filter((i: { key: number; disabled: boolean }) => {
			// 	if (i.key === 1) {
			// 		i.disabled = !Boolean(this.getLineItem.id);
			// 	}
			// 	return i;
			// });
		},
	},
});
</script>