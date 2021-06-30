<template>
	<v-layout class="d-block ma-0 pa-0">
		<Alertize @return-alertize="redirectTo"></Alertize>
		<v-layout class="d-block ma-0 pa-0 white">
			<v-container class="my-0 py-0">
				<CreateTabs
					:current_tab="currentTab"
					:items="items"
					@update-selected-tab-index="updateSelectedTabIndex"
				></CreateTabs>
			</v-container>
		</v-layout>
		<v-layout class="d-block ma-0 pa-0">
			<v-container class="my-0 py-0">
				<v-tabs-items v-model="currentTab">
					<v-tab-item v-for="item in items" :key="item">
						<v-layout
							v-if="currentTabSelected(item, 'Overview')"
							column
						>
							<Overview
								:campaigns="getCampaigns"
								:biddingShadings="getBiddingShadings"
								:advertisers="getAdvertisers"
								:lineItemTypes="getLineItemTypes"
								:lineItem="lineItem"
								:campaigns_pacing="getCampaignsPacing"
								:budget_types="getBudgetTypes"
								:optimization_strategies="getOptimizationStrategies"
								:strategies="getStrategies"
								:unit_times="getUnitTimes"
								:creativeWeightingMethods="getCreativeWeightingMethods"
								:bidStrategies="getBidStrategies"
								:linesPacing="getLinesPacing"
								@update-model="updateModelOverview"
								@init-frequency-caps="dispatchUnitTimes()"
								@create-LineItem="handleSubmit"
								:errors="getErrors"
							></Overview>
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
	import Vue from "vue";
	import {
		AdvertiserFilters,
		AdvertiserOptions,
	} from "../../../../interfaces/advertiser";
	import {
		CampaingFilters,
		CampaingOptions
	} from "../../../../interfaces/campaign";
	import { initLineItem } from "../../../../utils/initData";
	import Alertize from "../../../../components/Alertize.vue";
	import { isEmpty } from "lodash";
	
import { LineItemDataCreate } from "@/interfaces/line_item";

	export default Vue.extend({
		name: "Create",
		props: {},
		components: { CreateTabs, Overview, Alertize },
		data: () => ({
			title: "Create",
			currentTab: 0,
			items: ["Overview", "Targeting", "Modifiers / Models", "Creatives"],
			lineItem: initLineItem(),
		}),
		created() {},
		async mounted() {
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
		computed: {
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
		},
		methods: {
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
			updateSelectedTabIndex(index: number) {
				this.currentTab = index;
			},
			currentTabSelected(item: String, selected: String) {
				return item === selected;
			},
			updateModelOverview(model: any) {
				this.campaign = model;
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
				return this.$store.dispatch("custom_list/getCreativeWeightingMethods", {
					root: true,
				});
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

			async handleSubmit(data: { lineItem: LineItemDataCreate }) {
				try {
					this.setLoading(true);
					await this.create(data.lineItem);
					this.setLoading(false);
				} catch (error) {
					console.error("handleSubmit", { error: error });
					this.setLoading(false);
				}
			},

			async create(lineItem: LineItemDataCreate) {
				return this.$store.dispatch("line_item/create", lineItem, {
					root: true,
				});
			},

			setLoading(_loading: Boolean) {
				this.$store.state.proccess.loading = _loading;
			},
		},
		watch: {},
	});
</script>