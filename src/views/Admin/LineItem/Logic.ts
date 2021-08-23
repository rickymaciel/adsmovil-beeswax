import CreateTabs from "@/views/Admin/Commons/Tabs.vue";
import Overview from "@/views/Admin/LineItem/Dependencies/Forms/Overview.vue";
import NavTargeting from "@/views/Admin/LineItem/Dependencies/Targetings/tab_contents/targetingNav.vue";
import Vue from "vue";
import { CampaingFilters, CampaingOptions } from "@/interfaces/campaign";

import { TargetingDataCreate, Term } from "@/interfaces/targeting";

import {
	initLineItem,
	initTargeting,
	initDataVariables,
	getTargetingIDByValue,
	//initHardCoreLineItem,
	getLineItemResources
} from "@/utils/initData";
import Alertize from "@/components/Alertize.vue";
import {
	find,
	isArray,
	isEmpty,
	isNull,
	isString,
	isUndefined,
	trim,
	filter
} from "lodash";
import { LineItemDataCreate, LineItemDataUpdate } from "@/interfaces/line_item";
import CardTextField from "@/components/Content/CardTextField.vue";
import AppSite from "@/views/Admin/LineItem/Dependencies/Targetings/appSite.vue";
import Content from "@/views/Admin/LineItem/Dependencies/Targetings/content.vue";
import Environment from "@/views/Admin/LineItem/Dependencies/Targetings/environment.vue";
import Geo from "@/views/Admin/LineItem/Dependencies/Targetings/geo.vue";
import Platform from "@/views/Admin/LineItem/Dependencies/Targetings/platform.vue";
import Exchange from "@/views/Admin/LineItem/Dependencies/Targetings/exchange.vue";
import Time from "@/views/Admin/LineItem/Dependencies/Targetings/time.vue";
import { prepareTargetingDataCreate } from "@/utils/resolveObjectArray";
import AssociatedCreativesForm from "@/views/Admin/LineItem/Dependencies/Creatives/AssociatedCreatives.vue";
import SkeletonLineItem from "@/views/Admin/LineItem/Dependencies/Forms/Skeleton.vue";

// Configs Optimization Strategy
// const OPTIMIZATION_BY_LINE = "By Line";
const OPTIMIZATION_BY_CAMPAIGN = "By Campaign";

// Configs Bid Strategy
const BID_STRATEGY_FIXED = "Fix";
const BID_STRATEGY_AUTOMATED = "Automated";

// Configs Budget Type
// const BUDGET_TYPE_IMPRESSIONS = "Impressions";
const BUDGET_TYPE_SPEND = "Spend";

// Configs to Optimization Strategy
const OPTIMIZED_CPM = "Optimized CPM";
const OPTIMIZED_CPC = "Optimized CPC";
const OPTIMIZED_VCR = "Optimized VCR";

// Configs Line Item Type
const LINE_ITEM_TYPE_VIDEO = "Video";

// Configs Line Pacing
const LINE_PACING_DAILY = "Daily";
// const LINE_PACING_ASAP = "ASAP";
// const LINE_PACING_LIFETIME = "Lifetime";

// Configs Targeting Predicates
const EXCLUDED = "None";
const INCLUDED = "All";

export default Vue.extend({
	name: "EditLineItem",
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
		Time,
		Platform,
		AssociatedCreativesForm,
		SkeletonLineItem
	},
	data: () => ({
		title: "EditLineItem",
		currentTab: 0,
		currentTabTargeting: 0,
		items: [],

		//Aux App Site
		data_variables: initDataVariables(),

		targeting_predicates: [],

		// Line Item Data
		//line_item: initHardCoreLineItem(),
		line_item: {},

		// Targeting Data
		targeting: initTargeting(),

		targeting_expressions: null,

		resources: getLineItemResources()
	}),
	created() {
		this.$nextTick(async () => {
			this.setLoading(true);
			this.line_item = this.hasID
				? await this.getLineItemByID(this.getID)
				: initLineItem();
			this.targeting_predicates = await this.dispatchTargetingPredicates();
			this.loadInitResources();
			this.updateSelectedTabIndex();
			this.setLoading(false);
		});
	},
	mounted() {

	},
	computed: {
		getID(): Number {
			return this.$route.params.id || 0;
		},
		hasID() {
			return this.$route.params.id > 0;
		},
		isLoading() {
			return this.$store.state.proccess.loading;
		},
		getLineItem() {
			return this.line_item;
		},
		getItems() {
			return this.updateItems;
		},
		updateItems() {
			this.items = [
				{
					key: 0,
					tab: "Overview",
					disabled: false
				},
				{
					key: 1,
					tab: "Targeting",
					//disabled: false,
					disabled: !this.isCreatedLineItem
				},
				{
					key: 2,
					tab: "Modifiers / Models",
					//disabled: false,
					disabled: !this.isCreatedLineItem
				},
				{
					key: 3,
					tab: "Creatives",
					//disabled: false,// TODO comentar esto
					disabled: !this.isCreatedLineItem
				}
			];
			return this.items;
		},

		/**
		 * End Resources
		 */

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
			return this.hasData(this.line_item.id);
		},
		hasAssociatedCreatives() {
			return (
				this.hasData(this.line_item.creative_associations) &&
				!isEmpty(this.line_item.creative_associations)
			);
		},
		getAssociatedCreatives(): Array<any> {
			return this.line_item.creative_associations;
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

		/**
		 *
		 */

		getSelectedCampaign() {
			return this.resources.selected_campaign;
		},

		isAutomaticAllocation(): Boolean {
			return Boolean(this.getSelectedCampaign?.automatic_allocation);
		},

		getPredicateIds() {
			return {
				INCLUDED: this.isIncluded,
				EXCLUDED: this.isExcluded
			};
		},

		isExcluded() {
			const result = find(this.targeting_predicates, {
				value: EXCLUDED
			});

			return result?.id;
		},

		isIncluded() {
			const result = find(this.targeting_predicates, {
				value: INCLUDED
			});

			return result?.id;
		},

		updateBudgetDisplay() {
			const result = find(this.resources.budget_types, {
				id: this.line_item.budget_type_id
			});

			this.resources.budget_display = `Total ${result?.value || ""}`;
		},

		async updateStrategies() {
			const strategies = this.resources.strategies;

			const isVideo: Boolean = await this.isLineItemType(
				LINE_ITEM_TYPE_VIDEO
			);

			if (isVideo) {
				this.resources.strategies_filtered = filter(
					strategies,
					function(s) {
						return (
							String(s.value).toLowerCase() !=
							OPTIMIZED_VCR.toLowerCase()
						);
					}
				);
			} else {
				this.resources.strategies_filtered = strategies;
			}

			return this.resources.strategies_filtered;
		}
	},
	methods: {
		async getLineItemByID(id: number) {
			return await this.$store.dispatch("line_item/show", id);
		},
		/**
		 * Aplica cambios en los datos obtenidos desde la campaña
		 */
		async applyCampaignSelectedToLineItem(from_campaign: Boolean = false) {
			const campaign = this.resources.selected_campaign;
			const optimization_strategy = campaign?.optimization_strategy;
			const isByCampaign: Boolean =
				optimization_strategy?.description === OPTIMIZATION_BY_CAMPAIGN;
			const isAutomated: Boolean = await this.isBidStrategy(
				BID_STRATEGY_AUTOMATED
			);
			const isFix: Boolean = await this.isBidStrategy(BID_STRATEGY_FIXED);

			if (from_campaign) {
				// advertiser_id
				this.resources.advertisers = [
					{
						id: campaign?.advertiser.id,
						value: campaign?.advertiser.name
					}
				];
				this.setField("advertiser_id", {
					show: true,
					required: true,
					disabled: false,
					value: campaign?.advertiser_id
				});

				// strategy_id
				this.setField("strategy_id", {
					show: isAutomated,
					required: isAutomated,
					disabled: false,
					value: campaign?.strategy_id
				});

				// budget_type_id
				this.setField("budget_type_id", {
					show: true,
					required: true,
					disabled: isByCampaign,
					value: campaign?.budget_type_id
				});
			}

			if (isAutomated) {
				if (isEmpty(this.resources.strategies)) {
					this.resources.strategies = await this.dispatchStrategies();
				}
			}

			// budget
			this.setField("budget", {
				show: true,
				required: true,
				disabled:
					this.getSelectedCampaign &&
					this.isAutomaticAllocation &&
					isByCampaign,
				value: campaign?.budget
			});

			const isSpend: Boolean = await this.isBudgetType(BUDGET_TYPE_SPEND);

			// cpm_bid
			this.setField("cpm_bid", {
				show: isAutomated && isSpend,
				required: isAutomated && isSpend,
				disabled: !(isAutomated && isSpend),
				value:
					this.getSelectedCampaign &&
					this.isAutomaticAllocation &&
					isByCampaign
						? campaign?.cpm_bid
						: null
			});

			// fix_cpm
			this.setField("fix_cpm", {
				show: isFix,
				required: isFix,
				disabled: !isFix
			});

			const isOptimizedCPC: Boolean = await this.isStrategy(
				OPTIMIZED_CPC
			);

			const isOptimizedCPM: Boolean = await this.isStrategy(
				OPTIMIZED_CPM
			);

			const isOptimizedVCR: Boolean = await this.isStrategy(
				OPTIMIZED_VCR
			);

			// bid_shading_id
			this.setField("bid_shading_id", {
				show: (isOptimizedVCR || isOptimizedCPM) && isFix,
				required: (isOptimizedVCR || isOptimizedCPM) && isFix,
				disabled: !((isOptimizedVCR || isOptimizedCPM) && isFix),
				value: undefined
			});

			// target_ecpc
			this.setField("target_ecpc", {
				show: isOptimizedCPC && isAutomated && isSpend,
				required: false,
				disabled: !(isOptimizedCPC && isAutomated && isSpend),
				value:
					this.getSelectedCampaign &&
					this.isAutomaticAllocation &&
					isByCampaign &&
					isOptimizedCPC
						? campaign?.target_ecpc
						: undefined
			});

			// target_ctr
			this.setField("target_ctr", {
				show: isOptimizedCPC && isAutomated && isSpend,
				required: false,
				disabled: !(isOptimizedCPC && isAutomated && isSpend),
				value:
					this.getSelectedCampaign &&
					this.isAutomaticAllocation &&
					isByCampaign &&
					isOptimizedCPC
						? campaign?.target_ctr
						: undefined
			});

			// target_vcr
			this.setField("target_vcr", {
				show: isOptimizedVCR && isAutomated,
				required: false,
				disabled: !(isOptimizedVCR && isAutomated),
				value: isOptimizedVCR ? campaign?.target_vcr : undefined
			});

			// line_pacing_id
			this.setField("line_pacing_id", {
				show: this.getSelectedCampaign && !this.isAutomaticAllocation,
				required: true,
				disabled: false,
				value:
					this.getSelectedCampaign &&
					this.isAutomaticAllocation &&
					isByCampaign
						? campaign?.campaign_pacing_id
						: undefined
			});

			const isPacingDaily: Boolean = await this.isLinePacing(
				LINE_PACING_DAILY
			);

			// daily_budget
			this.setField("daily_budget", {
				show: true,
				required: !this.isAutomaticAllocation && isPacingDaily,
				disabled: !isPacingDaily,
				value:
					this.getSelectedCampaign &&
					this.isAutomaticAllocation &&
					isByCampaign
						? campaign?.daily_budget
						: undefined
			});

			// daily_budget_suggested
			this.setField("daily_budget_suggested", {
				show: isPacingDaily,
				required: false,
				disabled: true,
				value: undefined
			});

			// update strategies filtered
			this.updateStrategies;

			this.updateBudgetDisplay;
		},

		async isOptimizationStrategy(key: any): Promise<Boolean> {
			if (isEmpty(this.resources.optimization_strategies)) {
				this.resources.optimization_strategies = await this.dispatchOptimizationStrategies();
			}

			return (
				find(this.resources.optimization_strategies, { value: key })
					?.id ===
				this.resources.selected_campaign?.optimization_strategy_id
			);
		},

		async isBidStrategy(key: string): Promise<Boolean> {
			if (isEmpty(this.resources.bid_strategies)) {
				this.resources.bid_strategies = await this.dispatchBidStrategies();
			}

			const bid_strategy = find(this.resources.bid_strategies, {
				value: key
			});

			return bid_strategy?.id === this.line_item.bid_strategy_id;
		},

		async isBudgetType(key: string): Promise<Boolean> {
			if (isEmpty(this.resources.budget_types)) {
				this.resources.budget_types = await this.dispatchBudgetTypes();
			}

			const budget_type = find(this.resources.budget_types, {
				value: key
			});

			return budget_type?.id === this.line_item.budget_type_id;
		},

		async isLineItemType(key: string): Promise<Boolean> {
			if (isEmpty(this.resources.line_item_types)) {
				this.resources.line_item_types = await this.dispatchTypes();
			}

			const line_item_type = find(this.resources.line_item_types, {
				value: key
			});

			return line_item_type?.id === this.line_item.line_item_type_id;
		},

		async isStrategy(key: string): Promise<Boolean> {
			if (isEmpty(this.resources.strategies)) {
				this.resources.strategies = await this.dispatchStrategies();
			}

			const strategy = find(this.resources.strategies, {
				value: key
			});

			return strategy?.id === this.line_item.strategy_id;
		},

		async isLinePacing(key: string): Promise<Boolean> {
			if (isEmpty(this.resources.line_pacings)) {
				this.resources.line_pacings = await this.dispatchLinesPacing();
			}

			const line_pacing = find(this.resources.line_pacings, {
				value: key
			});

			return line_pacing?.id === this.line_item.line_pacing_id;
		},

		setLineItem(lineItem: any) {
			this.line_item = lineItem;
		},

		setSelectedCampaign(campaign: { advertiser: { id: any; name: any; }; }) {
			this.resources.selected_campaign = campaign;

			this.resources.advertisers = [
				{
					id: campaign?.advertiser.id,
					value: campaign?.advertiser.name
				}
			];
		},

		hasData(attr: any) {
			return !isUndefined(attr) && !isNull(attr);
		},

		isValidDates() {
			const startDate = this.moment(this.line_item.start_date);
			const endDate = this.moment(this.line_item.end_date);
			return startDate.isValid() && endDate.isValid();
		},

		getCalculateDuration() {
			if (!this.isValidDates()) return undefined;
			const startDate = this.moment(this.line_item.start_date);
			const endDate = this.moment(this.line_item.end_date);
			let days = this.calculateDuration(startDate, endDate);

			if (days < 0) {
				this.line_item.line_duration = undefined;
				return undefined;
			}

			this.line_item.line_duration = days;

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

		async fetchResource(params: { resource: string }) {
			this.setLoadingField(true);

			switch (params.resource) {
				case "campaign_id":
					if(!this.hasID) {
						if (isEmpty(this.resources.campaigns)) {
							this.resources.campaigns = await this.dispatchCampaigns();
						}
					}
					break;

				case "line_item_type_id":
					if (isEmpty(this.resources.line_item_types)) {
						this.resources.line_item_types = await this.dispatchTypes();
					}
					break;

				case "creative_method_id":
					if (isEmpty(this.resources.creative_weighting_methods)) {
						this.resources.creative_weighting_methods = await this.dispatchCreativeWeightingMethods();
					}
					break;

				case "line_pacing_id":
					if (isEmpty(this.resources.line_pacings)) {
						this.resources.line_pacings = await this.dispatchLinesPacing();
					}
					break;

				case "bid_shading_id":
					if (isEmpty(this.resources.bidding_shadings)) {
						this.resources.bidding_shadings = await this.dispatchBiddingShadings();
					}
					break;

				case "strategy_id":
					if (isEmpty(this.resources.strategies)) {
						this.resources.strategies = await this.dispatchStrategies();
					}

					// update strategies filtered
					this.updateStrategies;
					break;

				case "unit_time_id":
					if (isEmpty(this.resources.unit_times)) {
						this.resources.unit_times = await this.dispatchUnitTimes();
					}
					break;
			}
			this.setLoadingField(false);
		},

		async handleChange(params: { key: string | number; value: any }) {
			if(this.isLoading) return;
			this.setLoadingField(true);

			if (!isUndefined(params.value)) {
				this.line_item[params.key] = params.value;
			}

			switch (params.key) {
				case "line_duration":
					this.line_item[params.key] = params.value = this.getCalculateDuration();
					break;

				case "line_item_type_id":
					this.updateStrategies;
					break;

				case "bid_strategy_id":
					break;

				case "campaign_id":
					this.resources.selected_campaign = await this.dispatchGetCampaignById(
						Number(params.value)
					);
					break;

				case "strategy_id":
					break;

				case "bid_shading_id":
					break;

				case "budget_type_id":
					break;

				case "line_pacing_id":
					break;
			}

			await this.applyCampaignSelectedToLineItem(
				params.key === "campaign_id"
			);

			this.setLoadingField(false);
		},

		async loadInitResources() {

			if (isEmpty(this.resources.budget_types)) {
				this.resources.budget_types = await this.dispatchBudgetTypes();
			}

			if (isEmpty(this.resources.bid_strategies)) {
				this.resources.bid_strategies = await this.dispatchBidStrategies();
			}

			if (this.hasID) {

				this.setSelectedCampaign(this.line_item?.campaign);

				this.resources.campaigns = [{id: this.line_item?.campaign_id, value: this.line_item?.campaign.name}];

				if (this.line_item?.creative_method_id) {
					this.resources.creative_weighting_methods = await this.dispatchCreativeWeightingMethods();
				}

				if(!isEmpty(this.line_item?.frequency_caps)) {
					this.resources.unit_times = await this.dispatchUnitTimes();
				}

				if(this.line_item?.line_item_type_id) {
					this.resources.line_item_types = await this.dispatchTypes();
				}

				await this.getTargetingsByID(this.getID);

				this.handleChange({ key: "line_duration", value: undefined });

			}
		},
		redirectTo() {
			this.setNotification({ title: "", message: "", type: "" });
			this.$router.push({ name: "LineItemList" });
		},
		setNotification(notification: Notification) {
			return this.$store.dispatch(
				"proccess/setNotification",
				notification,
				{
					root: true
				}
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

		async dispatchTargetingPredicates() {
			return this.$store.dispatch("targeting/getTargetingPredicates");
		},

		async dispatchCampaigns() {
			return this.$store.dispatch("campaign/list", {
				filters: {} as CampaingFilters,
				options: { sort: "name", order: "asc" } as CampaingOptions
			});
		},

		async dispatchTypes() {
			return this.$store.dispatch("custom_list/getLineItemTypes", {
				filters: {} as any,
				options: { sort: "name", order: "asc" } as any
			});
		},

		async dispatchCampaignPacing() {
			return this.$store.dispatch("custom_list/getCampaignPacing", {
				root: true
			});
		},

		async dispatchBudgetTypes() {
			return this.$store.dispatch("custom_list/getBudgetTypes", {
				root: true
			});
		},

		async dispatchOptimizationStrategies() {
			return this.$store.dispatch(
				"custom_list/getOptimizationStrategies",
				{
					root: true
				}
			);
		},

		async dispatchStrategies() {
			return this.$store.dispatch("custom_list/getStrategies", {
				root: true
			});
		},

		async addFrecuencyCaps() {
			if (this.line_item.frequency_caps.length >= 3) return;
			this.line_item.frequency_caps.push({
				impressions: undefined,
				every_time: undefined,
				unit_time_id: undefined
			});
		},

		async dispatchUnitTimes() {
			return this.$store.dispatch("custom_list/getUnitTimes");
		},

		async dispatchCreativeWeightingMethods() {
			return this.$store.dispatch(
				"custom_list/getCreativeWeightingMethods",
				{
					root: true
				}
			);
		},

		async dispatchBidStrategies() {
			return this.$store.dispatch("custom_list/getBidStrategies", {
				root: true
			});
		},

		async dispatchLinesPacing() {
			if (!isEmpty(this.resources.line_pacings)) return;
			return this.$store.dispatch("custom_list/getLinesPacing", {
				root: true
			});
		},

		async dispatchBiddingShadings() {
			if (!isEmpty(this.resources.bidding_shadings)) return;
			return this.$store.dispatch("custom_list/getBiddingShadings", {
				root: true
			});
		},

		async dispatchGetCampaignById(id: number) {
			return this.$store.dispatch("campaign/getById", id);
		},

		async getTargetingsByID(id: number) {
			return this.$store.dispatch("line_item/getTargetingsByID", id);
		},

		async handleCancel() {
			try {
				this.$router.push({ name: "LineItemList" });
			} catch (error) {
				console.error("handleCancel", { error: error });
				this.setLoading(false);
			}
		},

		async handleSubmit(params: { method: string, continue: Boolean, data: any }) {
			try {

				this.setLoading(true);

				switch (params.method) {
					case 'create':
						const created = await this.createLineItem(params);
						if(created && params.continue) {
							this.setLineItem(created);
							this.updateSelectedTabIndex(1);
						}
						break;

					case 'update':
						const updated = await this.updateLineItem({id: this.getID, continue: params.continue, data: params.data});
						if(updated && params.continue) {
							this.setLineItem(updated);
							this.updateSelectedTabIndex(1);
						}
						break;
				}

				this.setLoading(false);

			} catch (error) {
				console.error("handleSubmit", { error: error });
				this.setLoading(false);
			}
		},

		async handleTargetingSubmit() {
			try {
				this.setLoading(true);

				const targeting_create_data = {
					line_item_id: this.line_item.id,
					active: true,
					targeting_terms: prepareTargetingDataCreate(
						this.targeting
					) as Array<Term>
				} as TargetingDataCreate;

				this.targeting_expressions = await this.createTargeting(
					targeting_create_data
				);

				this.updateSelectedTabIndex(3);

				this.setLoading(false);
			} catch (error) {
				console.error("handleSubmit", { error: error });
				this.setLoading(false);
			}
		},

		handleClear(key: any) {
			switch (key) {
				case "clear-relations":
					this.line_item.start_date = null;
					this.line_item.end_date = null;
					this.line_item.line_duration = null;
					this.resources.selected_campaign = null;

					// advertiser_id
					this.setField("advertiser_id", {
						show: true,
						required: true,
						disabled: true,
						value: null
					});

					// budget_type_id
					this.setField("budget_type_id", {
						show: true,
						required: true,
						disabled: false,
						value: null
					});

					// budget
					this.setField("budget", {
						show: true,
						required: true,
						disabled: false,
						value: null
					});

					// line_pacing_id
					this.setField("line_pacing_id", {
						show: false,
						required: false,
						disabled: true,
						value: null
					});

					// strategy_id
					this.setField("strategy_id", {
						show: false,
						required: false,
						disabled: true,
						value: null
					});

					// bid_strategy_id
					this.setField("bid_strategy_id", {
						show: true,
						required: true,
						disabled: true,
						value: null
					});

					// daily_budget
					this.setField("daily_budget", {
						show: false,
						required: false,
						disabled: true,
						value: null
					});

					// cpm_bid
					this.setField("cpm_bid", {
						show: false,
						required: false,
						disabled: true,
						value: null
					});

					this.updateBudgetDisplay;

					break;

				default:
					break;
			}
		},

		async handleActivate() {
			try {
				this.setLoading(true);

				const response = await this.activate(this.line_item.id);

				this.setLoading(false);
			} catch (error) {
				console.error("handleActivate", { error: error });
				this.setLoading(false);
			}
		},
		async createLineItem(params: {method: string, continue: Boolean, data: LineItemDataCreate}) {
			return this.$store.dispatch("line_item/create", params);
		},
		async updateLineItem(params: {method: string, continue: Boolean, data: LineItemDataUpdate}) {
			return this.$store.dispatch("line_item/update", params);
		},

		async activate(id: number) {
			return this.$store.dispatch("line_item/activate", id);
		},

		async createTargeting(targeting: TargetingDataCreate) {
			return this.$store.dispatch("targeting/create", targeting);
		},

		setLoading(_loading: Boolean) {
			this.$store.state.proccess.loading = _loading;
		},

		setLoadingField(_loading: Boolean) {
			this.$store.state.proccess.loading_field = _loading;
		},

		/**
		 * key
		 * element: required?, show?, disabled?, value
		 */
		setField(
			key: string,
			element: { required: any; show: any; disabled: any; value: any }
		) {
			this.resources.fields[key] = {
				required: element.required,
				show: element.show,
				disabled: element.disabled
			};
			if (!isUndefined(element.value)) {
				this.line_item[key] = element.value;
			}
		},

		/**
		 * HANDLERS
		 */

		updateSelectedTabIndex(index: number = 0) {
			this.currentTab = index;
		},

		updateSelectedTabTargetingIndex(index: number) {
			this.currentTabTargeting = index;
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
				targeting_key_id: getTargetingIDByValue()[params.tab][
					params.key
				],
				targeting_predicate_id: this.isIncluded
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
							targeting_key_id: getTargetingIDByValue()[
								params.tab
							][params.key],
							targeting_predicate_id: this.isIncluded
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

			params.items.forEach(item => {
				if (isEmpty(trim(item))) return;
				if (isEmpty(terms)) {
					terms.push({
						value: [trim(item)],
						targeting_key_id: getTargetingIDByValue()[params.tab][
							params.key
						],
						targeting_predicate_id: this.isIncluded
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
				const targetingTerm = this.targeting[params.tab][params.key]
					.targeting_terms[0];

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
						this.targeting[params.tab][
							params.key
						].targeting_terms = [];
					}
				}
			}

			/**
			 * targeting.{tab}.{key}.value
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

					this.targeting[params.tab][
						params.key
					].value = splitted.join(separator);
				}
			}

			if (isArray(this.targeting[params.tab][params.key].value)) {
				const _index = this.targeting[params.tab][
					params.key
				].value.findIndex((v: any) => v == params.value);

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
			this.targeting[params.tab][params.key].value = this.targeting[
				params.tab
			][params.key].value.concat(",");
		},

		/**
		 * Update Selected Number Range
		 */
		updateSelectedChecked(params: { tab: any; key: any; value: any }) {
			const finded = find(
				this.targeting[params.tab][params.key].targeting_terms,
				{
					value: params.value
				}
			);

			if (!isEmpty(finded)) {
				this.targeting[params.tab][params.key].targeting_terms = filter(
					this.targeting[params.tab][params.key].targeting_terms,
					function(s) {
						return s.value !== params.value;
					}
				);
			} else {
				this.targeting[params.tab][params.key].targeting_terms.push({
					value: params.value,
					targeting_key_id: this.targeting[params.tab][params.key]
						.targeting_key_id,
					targeting_predicate_id: this.getPredicateIds.INCLUDED
				});
			}
		},

		updateSelectedPredicate(params: { tab: any; key: any; value: any }) {
			this.targeting[params.tab][params.key].targeting_terms.forEach(
				(t: { targeting_predicate_id: any }) => {
					t.targeting_predicate_id = params.value;
				}
			);
		}
	},
	watch: {}
});
