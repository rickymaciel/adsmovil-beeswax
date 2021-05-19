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
								:account="getAccount"
								:advertisers="getAdvertisers"
								:campaign="campaign"
								:campaigns_pacing="getCampaignsPacing"
								:budget_types="getBudgetTypes"
								:optimization_strategies="
									getOptimizationStrategies
								"
								:kpi_campaigns="getKpiCampaigns"
								:strategies="getStrategies"
								:unit_times="getUnitTimes"
								:owners="getUsers"
								@update-model="updateModelOverview"
								@init-frequency-caps="dispatchUnitTimes()"
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
	import { initCampaign } from "../../../../utils/initData";
	import Alertize from "../../../../components/Alertize.vue";
	import { isEmpty } from "lodash";

	export default Vue.extend({
		name: "Create",
		props: {},
		components: { CreateTabs, Overview, Alertize },
		data: () => ({
			title: "Create",
			currentTab: 0,
			// items: ["Overview", "Modifiers / Models", "Events", "Experiments"],
			items: ["Overview", "Modifiers / Models"],
			account: {
				currency: {
					name: "USD",
				},
				timezone: {
					name: "UTC",
				},
			},
			campaign: initCampaign(),
		}),
		created() {},
		async mounted() {
			await this.dispatchAccount();
			await this.dispatchBudgetTypes();
			await this.dispatchAdvertisers();
			await this.dispatchKpiCampaigns();
			await this.dispatchStrategies();
			await this.dispatchUsers();
		},
		computed: {
			getAccount() {
				return this.$store.state.account.account;
			},
			getBudgetTypes() {
				return this.$store.state.custom_list.budget_types;
			},
			getAdvertisers() {
				return this.$store.state.advertiser.advertisers_list;
			},
			getCampaignsPacing() {
				return this.$store.state.custom_list.campaigns_pacing;
			},
			getOptimizationStrategies() {
				return this.$store.state.custom_list.optimization_strategies;
			},
			getKpiCampaigns() {
				return this.$store.state.custom_list.kpi_campaigns;
			},
			getStrategies() {
				return this.$store.state.custom_list.strategies;
			},
			getUnitTimes() {
				return this.$store.state.custom_list.unit_times;
			},
			getUsers() {
				return this.$store.state.users.users;
			},
		},
		methods: {
			redirectTo() {
				this.setNotification({ title: "", message: "", type: "" });
				this.$router.push({ name: "AdvertisersList" });
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
			async dispatchAdvertisers() {
				return this.$store.dispatch("advertiser/list", {
					filters: {} as AdvertiserFilters,
					options: { sort: "name", order: "asc" } as AdvertiserOptions,
				});
			},

			async dispatchAccount() {
				return this.$store.dispatch("account/getAccount", {
					root: true,
				});
			},

			async dispatchBudgetTypes() {
				return this.$store.dispatch("custom_list/getBudgetTypes", {
					root: true,
				});
			},

			async dispatchCampaignPacing() {
				return this.$store.dispatch("custom_list/getCampaignPacing", {
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

			async dispatchKpiCampaigns() {
				return this.$store.dispatch("custom_list/getKpiCampaigns", {
					root: true,
				});
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

			async dispatchUsers() {
				return this.$store.dispatch(
					"users/getUsers",
					{
						filters: undefined,
						options: {},
					},
					{
						root: true,
					}
				);
			},
		},

		watch: {
			"campaign.automatic_allocation": function (data) {
				if (data === 1) {
					this.dispatchCampaignPacing();
					this.dispatchOptimizationStrategies();
				}
			},
		},
	});
</script>
