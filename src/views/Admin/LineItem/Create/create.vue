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
							<v-card
								justify="between"
								align="center"
								color="grey lighten-3 py-4"
							>
								<v-form
									ref="form"
									justify="center"
									align="center"
									v-model="valid"
									lazy-validation
								>
									<v-container>
										<v-row no-gutters>
											<!-- Campaing -->
											<v-col
												cols="12"
												sm="12"
												md="4"
												lg="4"
											>
												<v-card
													elevation="0"
													class="pa-2"
													outlined
													tile
													color="rgb(0, 0, 0, 0.0)"
												>
													<v-text-field
														v-model="campaing"
														:rules="campaingRules"
														hint="Campaing Example"
														ref="campaing_id"
														placeholder="Campaing Example"
														label="Campaing Example*"
														class="label-fixed"
														counter="255"
													></v-text-field>
												</v-card>
											</v-col>

											<!-- Advertiser -->
											<v-col
												cols="12"
												sm="12"
												md="4"
												lg="4"
											>
												<v-card
													elevation="0"
													class="pa-2"
													outlined
													tile
													color="rgb(0, 0, 0, 0.0)"
												>
													<v-autocomplete
														class="label-fixed"
														v-model="advertiser"
														:rules="advertiserRules"
														:hint="`Advertiser`"
														:items="getAdvertisers"
														ref="advertiser_id"
														item-text="name"
														item-value="id"
														label="Advertiser Example*"
														placeholder="Advertiser Example"
													></v-autocomplete>
												</v-card>
											</v-col>

											<!-- Name -->
											<v-col
												cols="12"
												sm="12"
												md="4"
												lg="4"
											>
												<v-card
													elevation="0"
													class="pa-2"
													outlined
													tile
													color="rgb(0, 0, 0, 0.0)"
												>
													<v-tooltip
														color="#3A4972"
														max-width="221px"
														v-model="
															show_tooltip_name
														"
														right
													>
														<template
															v-slot:activator="{}"
														>
															<v-text-field
																v-model="name"
																ref="name"
																:rules="
																	nameRules
																"
																hint="Name"
																placeholder="Add Name"
																label="Name*"
																class="
																	label-fixed
																"
																counter="255"
															></v-text-field>
														</template>
													</v-tooltip>
												</v-card>
											</v-col>
										</v-row>

										<v-row no-gutters>
											<!-- Line Type -->
											<v-col
												cols="12"
												sm="12"
												md="4"
												lg="4"
											>
												<v-card
													elevation="0"
													class="pa-2"
													outlined
													tile
													color="rgb(0, 0, 0, 0.0)"
												>
													<v-autocomplete
														class="label-fixed"
														v-model="line_type_id"
														:rules="lineTypeRules"
														:hint="`Line Type`"
														:items="getLineTypes"
														ref="line_type_id"
														item-text="name"
														item-value="id"
														label="Line Type*"
														placeholder="Line Type"
													></v-autocomplete>
												</v-card>
											</v-col>

											<!-- Alternative Id -->
											<v-col
												cols="12"
												sm="12"
												md="4"
												lg="4"
											>
												<v-card
													elevation="0"
													class="pa-2"
													outlined
													tile
													color="rgb(0, 0, 0, 0.0)"
												>
													<v-tooltip
														color="#3A4972"
														max-width="221px"
														v-model="
															show_tooltip_alternative_id
														"
														right
													>
														<template
															v-slot:activator="{}"
														>
															<v-text-field
																v-model="
																	alternative_id
																"
																ref="alternative_id"
																:rules="
																	alternativeIdRules
																"
																hint="Alternative Id"
																placeholder="Alternative Id"
																label="Alternative Id*"
																class="
																	label-fixed
																"
																counter="255"
															></v-text-field>
														</template>
													</v-tooltip>
												</v-card>
											</v-col>

											<!-- Advertiser -->
											<v-col
												cols="12"
												sm="12"
												md="4"
												lg="4"
											>
												<v-card
													elevation="0"
													class="pa-2"
													outlined
													tile
													color="rgb(0, 0, 0, 0.0)"
												>
													<v-autocomplete
														class="label-fixed"
														v-model="
															creative_weighting_method_id
														"
														:rules="
															creativeWeightingMethodRules
														"
														:hint="`Creative Weighting Method`"
														:items="
															getCreativeWeightingMethods
														"
														ref="creative_weighting_method_id"
														item-text="name"
														item-value="id"
														label="Creative Weighting Method*"
														placeholder="Creative Weighting Method"
													></v-autocomplete>
												</v-card>
											</v-col>
										</v-row>

										<!-- Duration -->
										<v-row>
											<label>Duration</label>
											<v-divider class="ma-4"></v-divider>
										</v-row>

										<v-row
											no-gutters
											align="center"
											justify="center"
										>
											<!-- Start Date -->
											<v-col
												cols="12"
												sm="12"
												md="4"
												lg="4"
											>
												<v-menu
													v-model="menuStartDate"
													:close-on-content-click="
														false
													"
													:nudge-right="40"
													transition="scale-transition"
													offset-y
													min-width="auto"
												>
													<template
														v-slot:activator="{
															on,
															attrs,
														}"
													>
														<v-text-field
															v-model="startDate"
															label="Start Date"
															prepend-icon="mdi-calendar"
															readonly
															v-bind="attrs"
															v-on="on"
														></v-text-field>
													</template>
													<v-date-picker
														v-model="
															startDateSearch
														"
														@input="
															menuStartDate = false
														"
													></v-date-picker>
												</v-menu>
											</v-col>

											<!-- End Date -->
											<v-col
												cols="12"
												sm="12"
												md="4"
												lg="4"
											>
												<v-menu
													v-model="menuEndDate"
													:close-on-content-click="
														false
													"
													:nudge-right="40"
													transition="scale-transition"
													offset-y
													min-width="auto"
												>
													<template
														v-slot:activator="{
															on,
															attrs,
														}"
													>
														<v-text-field
															v-model="endDate"
															label="End Date"
															prepend-icon="mdi-calendar"
															readonly
															v-bind="attrs"
															v-on="on"
														></v-text-field>
													</template>
													<v-date-picker
														v-model="endDateSearch"
														@input="
															menuEndDate = false
														"
													></v-date-picker>
												</v-menu>
											</v-col>

											<!-- Line Duration -->
											<v-col
												cols="12"
												sm="12"
												md="4"
												lg="4"
											>
												<v-card
													elevation="0"
													class="pa-2"
													outlined
													tile
													color="rgb(0, 0, 0, 0.0)"
												>
													<v-tooltip
														color="#3A4972"
														max-width="221px"
														v-model="
															show_tooltip_line_duration
														"
														right
													>
														<template
															v-slot:activator="{}"
														>
															<v-text-field
																v-model="
																	lineDuration
																"
																ref="lineDuration"
																:rules="
																	lineDurationRules
																"
																hint="Line Duration"
																placeholder="Line Duration"
																label="Line Duration*"
																class="
																	label-fixed
																"
																counter="255"
															></v-text-field>
														</template>
													</v-tooltip>
												</v-card>
											</v-col>
										</v-row>

										<!-- Budget -->
										<v-row>
											<label>Budget</label>
											<v-divider class="ma-4"></v-divider>
										</v-row>

										<v-row
											no-gutters
											align="center"
											justify="center"
										>
											<!-- Budget Type -->
											<v-col
												cols="12"
												sm="12"
												md="4"
												lg="4"
											>
                                            <v-card
													elevation="0"
													class="pa-2"
													outlined
													tile
													color="rgb(0, 0, 0, 0.0)"
												>
													<v-autocomplete
														class="label-fixed"
														:rules="
															budgetTypeRules
														"
														:hint="`Budget Type`"
														:items="
															budgetType
														"
														ref="budget_type_id"
														item-text="name"
														item-value="id"
														label="Budget Type*"
														placeholder="Budget Type"
													></v-autocomplete>
												</v-card>
											</v-col>

											<!-- Total Impressions -->
											<v-col
												cols="12"
												sm="12"
												md="4"
												lg="4"
											>
												<v-card
													elevation="0"
													class="pa-2"
													outlined
													tile
													color="rgb(0, 0, 0, 0.0)"
												>
													<v-tooltip
														color="#3A4972"
														max-width="221px"
														v-model="
															show_tooltip_total_impressions
														"
														right
													>
														<template
															v-slot:activator="{}"
														>
															<v-text-field
																v-model="
																	totalImpressions
																"
																ref="totalImpressions"
																:rules="
																	totalImpressionsRules
																"
																hint="Total Impressions"
																placeholder="Total Impressions"
																label="Total Impressions*"
																class="
																	label-fixed
																"
																counter="255"
															></v-text-field>
														</template>
													</v-tooltip>
												</v-card>
											</v-col>
										</v-row>

										<!-- Bidding -->
										<v-row>
											<label>Bidding</label>
											<v-divider class="ma-4"></v-divider>
										</v-row>

										<v-row
											no-gutters
											align="center"
											justify="center"
										>
											<!-- Bid Strategy -->
											<v-col
												cols="12"
												sm="12"
												md="4"
												lg="4"
											>
												<v-row>
													<v-col
														cols="6"
														sm="6"
														md="6"
														lg="6"
													>
														<v-checkbox
															v-model="
																bidStrategy
															"
															label="Fix"
														></v-checkbox>
													</v-col>
													<v-col
														cols="6"
														sm="6"
														md="6"
														lg="6"
													>
														<v-checkbox
															v-model="
																bidStrategy
															"
															label="Automated"
														></v-checkbox>
													</v-col>
												</v-row>
											</v-col>

											<!-- Fix CPM -->
											<v-col
												cols="12"
												sm="12"
												md="4"
												lg="4"
											>
												<v-card
													elevation="0"
													class="pa-2"
													outlined
													tile
													color="rgb(0, 0, 0, 0.0)"
												>
													<v-tooltip
														color="#3A4972"
														max-width="221px"
														v-model="
															show_tooltip_fix_cpm
														"
														right
													>
														<template
															v-slot:activator="{}"
														>
															<v-text-field
																v-model="fixCPM"
																ref="fixCPM"
																:rules="
																	fixCPMRules
																"
																hint="Fix CPM"
																placeholder="Fix CPM"
																label="Fix CPM*"
																class="
																	label-fixed
																"
																counter="255"
															></v-text-field>
														</template>
													</v-tooltip>
												</v-card>
											</v-col>

											<!-- Bidding Shading -->
											<v-col
												cols="12"
												sm="12"
												md="4"
												lg="4"
											>
												<v-row>
													<v-col
														cols="6"
														sm="6"
														md="6"
														lg="6"
													>
														<v-checkbox
															v-model="
																biddingShading
															"
															label="Yes"
														></v-checkbox>
													</v-col>
													<v-col
														cols="6"
														sm="6"
														md="6"
														lg="6"
													>
														<v-checkbox
															v-model="
																biddingShading
															"
															label="No"
														></v-checkbox>
													</v-col>
												</v-row>
											</v-col>
										</v-row>

										<!-- Optimization -->
										<v-row>
											<label>Optimization</label>
											<v-divider class="ma-4"></v-divider>
										</v-row>

										<v-row
											no-gutters
											align="center"
											justify="center"
										>
											<!-- Strategy -->
											<v-col
												cols="12"
												sm="12"
												md="4"
												lg="4"
											>
												<v-card
													elevation="0"
													class="pa-2"
													outlined
													tile
													color="rgb(0, 0, 0, 0.0)"
												>
													<v-autocomplete
														class="label-fixed"
														v-model="strategy_id"
														:rules="strategyRules"
														:hint="`Strategy`"
														:items="getStrategies"
														ref="strategy_id"
														item-text="name"
														item-value="id"
														label="Strategy*"
														placeholder="Strategy"
													></v-autocomplete>
												</v-card>
											</v-col>

											<!-- CPM BID -->
											<v-col
												cols="12"
												sm="12"
												md="4"
												lg="4"
											>
												<v-card
													elevation="0"
													class="pa-2"
													outlined
													tile
													color="rgb(0, 0, 0, 0.0)"
												>
													<v-tooltip
														color="#3A4972"
														max-width="221px"
														v-model="
															show_tooltip_CPM_BID
														"
														right
													>
														<template
															v-slot:activator="{}"
														>
															<v-text-field
																v-model="
																	cpm_bid
																"
																ref="cpm_bid"
																:rules="
																	cpmbidRules
																"
																hint="CPM BID"
																placeholder="CPM BID"
																label="CPM BID*"
																class="
																	label-fixed
																"
																counter="255"
															></v-text-field>
														</template>
													</v-tooltip>
												</v-card>
											</v-col>
										</v-row>

										<!-- Pacing -->
										<v-row>
											<label>Pacing</label>
											<v-divider class="ma-4"></v-divider>
										</v-row>

										<v-row no-gutters>
											<!-- Line -->
											<v-col
												cols="12"
												sm="12"
												md="4"
												lg="4"
											>
												<v-card
													elevation="0"
													class="pa-2"
													outlined
													tile
													color="rgb(0, 0, 0, 0.0)"
												>
													<v-autocomplete
														class="label-fixed"
														v-model="line_id"
														:rules="lineRules"
														:hint="`Line`"
														:items="getLines"
														ref="line_id"
														item-text="name"
														item-value="id"
														label="Line*"
														placeholder="Line"
													></v-autocomplete>
												</v-card>
											</v-col>

											<!-- Daily Budget -->
											<v-col
												cols="12"
												sm="12"
												md="4"
												lg="4"
											>
												<v-card
													elevation="0"
													class="pa-2"
													outlined
													tile
													color="rgb(0, 0, 0, 0.0)"
												>
													<v-tooltip
														color="#3A4972"
														max-width="221px"
														v-model="
															show_tooltip_daily_budget
														"
														right
													>
														<template
															v-slot:activator="{}"
														>
															<v-text-field
																v-model="
																	dailyBudget
																"
																ref="dailyBudget"
																:rules="
																	dailyBudgetRules
																"
																hint="Daily Budget"
																placeholder="Daily Budget"
																label="Daily Budget*"
																class="
																	label-fixed
																"
																counter="255"
															></v-text-field>
														</template>
													</v-tooltip>
												</v-card>
											</v-col>

											<!-- Daily Budget Suggested -->
											<v-col
												cols="12"
												sm="12"
												md="4"
												lg="4"
											>
												<v-card
													elevation="0"
													class="pa-2"
													outlined
													tile
													color="rgb(0, 0, 0, 0.0)"
												>
													<v-tooltip
														color="#3A4972"
														max-width="221px"
														v-model="
															show_tooltip_daily_budget_suggested
														"
														right
													>
														<template
															v-slot:activator="{}"
														>
															<v-text-field
																v-model="
																	dailyBudgetSuggested
																"
																ref="dailyBudgetSuggested"
																:rules="
																	dailyBudgetSuggestedRules
																"
																hint="Daily Budget Suggested"
																placeholder="Daily Budget Suggested"
																label="Daily Budget Suggested*"
																class="
																	label-fixed
																"
																counter="255"
															></v-text-field>
														</template>
													</v-tooltip>
												</v-card>
											</v-col>
										</v-row>

										<!-- Frecuency -->
										<v-row>
											<label>Frecuency</label>
											<v-divider class="ma-4"></v-divider>
										</v-row>

										<v-row no-gutters>
											<!-- Frecuency Cup -->
											<v-col
												cols="12"
												sm="12"
												md="12"
												lg="12"
											>
												<v-card-actions>
													<v-btn
														color="secondary"
														elevation="0"
														medium
														raised
														rounded
														text
														icon
													>
														<v-icon
															small
															class="
																secondary--text
															"
														>
															mdi-plus-thick
														</v-icon>
														{{
															$t("add frecuency")
														}}
													</v-btn>
												</v-card-actions>
											</v-col>
										</v-row>

										<v-divider class="ma-4"></v-divider>

										<v-row
											no-gutters
											align="center"
											justify="center"
										>
											<v-col
												cols="12"
												sm="12"
												md="8"
												lg="9"
											>
												<v-card
													elevation="0"
													class="pa-2"
													outlined
													tile
													color="rgb(0, 0, 0, 0.0)"
												>
													<v-card-text
														align="start"
														class="
															secondary--text
															info-message
														"
													>
														* Mandatory fields
													</v-card-text>
												</v-card>
											</v-col>

											<v-col
												cols="12"
												sm="12"
												md="8"
												lg="3"
											>
												<v-card
													elevation="0"
													class="pa-2"
													outlined
													tile
													color="rgb(0, 0, 0, 0.0)"
												>
													<v-row
														align="center"
														justify="center"
													>
														<v-btn
															rounded
															color="secondary"
															class="mx-2 px-8"
															@click="
																handleSubmit
															"
														>
															{{ $t("save") }}
														</v-btn>
														<v-btn
															rounded
															color="secondary"
															class="mx-2 px-8"
															@click="
																handleCancel
															"
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
						</v-layout>
					</v-tab-item>
				</v-tabs-items>
			</v-container>
		</v-layout>
	</v-layout>
</template>

<script lang="ts">
	import Vue from "vue";
	import Alertize from "./../../../../components/Alertize.vue";
	import CreateTabs from "../../Campaigns/Create/createTabs.vue";

	export default Vue.extend({
		name: "LineItemCreate",
		props: {},
		components: { Alertize, CreateTabs },
		data: () => ({
			title: "Create",
			currentTab: 0,
			items: ["Overview", "Targeting", "Creatives"],

			lineItem: {},
			valid: false,
			startDate: "",
			endDate: "",
			lineDuration: "",
			campaing: "",
			totalImpressions: "",
			fixCPM: "",
			cpm_bid: "",
			dailyBudget: "",
			dailyBudgetSuggested: "",
			advertiser: "",
			name: "",
			campaing_id: undefined,
			advertiser_id: undefined,
			line_type_id: undefined,
			strategy_id: undefined,
			alternative_id: undefined,
			line_id: undefined,
			creative_weighting_method_id: undefined,
			bidStrategy: undefined,
			biddingShading: undefined,

			// Show Tooltips
			show_tooltip_alternative_id: false,
			show_tooltip_line_duration: false,
			show_tooltip_budget_type: false,
			show_tooltip_total_impressions: false,
			show_tooltip_fix_cpm: false,
			show_tooltip_CPM_BID: false,
			show_tooltip_daily_budget: false,
			show_tooltip_daily_budget_suggested: false,
			show_tooltip_name: false,

			//Menúes
			menuStartDate: false,
			startDateSearch: "",
			menuEndDate: false,
			endDateSearch: "",
		}),
		created() {
			(this.startDate = this.moment(new Date()).local().format("YYYY-MM-DD")),
				(this.endDate = this.moment()
					.add(30, "days")
					.local()
					.format("YYYY-MM-DD")),
				(this.startDateSearch = this.moment(new Date())
					.local()
					.format("YYYY-MM-DD")),
				(this.endDateSearch = this.moment(new Date())
					.local()
					.format("YYYY-MM-DD"));
		},
		async mounted() {
			/*this.setLoading(true);
					const result = await this.dispatchCategories();
					this.setLoading(false);*/
		},
		computed: {
			// Get Alll Entities
			getEntities(): [] {
				//return this.$store.state.advertiser.categories;
				return [];
			},
			getEntity(): any {
				return this.lineItem;
			},
			getAdvertisers(): any {
				return [
					{ name: "Advertiser Exaple 1", id: 1 },
					{ name: "Advertiser Exaple 2", id: 2 },
					{ name: "Advertiser Exaple 3", id: 3 },
				];
			},
			getLineTypes(): any {
				return [
					{ name: "Line Type 1", id: 1 },
					{ name: "Line Type 2", id: 2 },
					{ name: "Line Type 3", id: 3 },
				];
			},
			getCreativeWeightingMethods(): any {
				return [
					{ name: "Creative Weighting Method 1", id: 1 },
					{ name: "Creative Weighting Method 2", id: 2 },
					{ name: "Creative Weighting Method 3", id: 3 },
				];
			},
			getStrategy(): any {
				return [
					{ name: "Strategy 1", id: 1 },
					{ name: "Strategy 2", id: 2 },
					{ name: "Strategy 3", id: 3 },
				];
			},
			getLines(): any {
				return [
					{ name: "Strategy 1", id: 1 },
					{ name: "Strategy 2", id: 2 },
					{ name: "Strategy 3", id: 3 },
				];
			},
			budgetType(): any {
				return {
					name: "Budget Type",
					id: 1,
				};
			},
			getStrategies(): any {
				return [
					{ name: "Strategy 1", id: 1 },
					{ name: "Strategy 2", id: 3 },
					{ name: "Strategy 3", id: 3 },
				];
			},

			// Rules
			campaingRules() {
				return [];
			},
			advertiserRules() {
				return [];
			},
			lineTypeRules() {
				return [];
			},
			creativeWeightingMethodRules() {
				return [];
			},
			strategyRules() {
				return [];
			},
			lineRules() {
				return [];
			},
			nameRules() {
				return [];
			},
			alternativeIdRules() {
				return [];
			},
			lineDurationRules() {
				return [];
			},
			budgetTypeRules() {
				return [];
			},
			totalImpressionsRules() {
				return [];
			},
			fixCPMRules() {
				return [];
			},
			cpmbidRules() {
				return [];
			},
			dailyBudgetRules() {
				return [];
			},
			dailyBudgetSuggestedRules() {
				return [];
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

			async validate() {
				/*let form = this.$refs.form;
						const valid = await form.validate();
						console.log("validate", {
							form: form,
							validate: valid,
							advertiser: this.advertiser,
						});
						return await valid;*/
			},
			async handleSubmit() {
				/*if (!(await this.validate())) return;
						this.setLoading(true);
						const result = await this.dispatchAdvertiser();
						console.log("handleSubmit", { result: result });

						if (isUndefined(result) || isNull(result) || isEmpty(result)) {
							this.setNotification({
								title: this.$t("title-failed"),
								message: this.$t("failed"),
								type: MessageTypes.ERROR,
							});
						} else {
							this.setNotification({
								title: this.$t("title-success"),
								message: this.$t("success"),
								type: MessageTypes.SUCCESS,
							});
							setTimeout(() => {
								this.redirectTo;
							}, 2000);
						}

						this.setLoading(false);*/
			},
			setLoading(_loading: Boolean) {
				this.$store.state.proccess.loading = _loading;
			},
			handleCancel() {
				this.$router.push({ name: "LineItemList" });
			},
			async dispatchEntities() {
				/*return this.$store.dispatch("advertiser/getCategories", {
							root: true,
						});*/
			},
			async dispatchEntity() {
				/*this.lineItem = {
							name: this.name,
							category_id: this.category_id,
							domain: this.domain,
							app_bundle: this.app_bundle,
							active: this.active,
						} as any;
						console.log("dispatchEntity", { advertiser: this.advertiser });
						return this.$store.dispatch(
							"lineItem/createLineItem",
							this.lineItem,
							{
								root: true,
							}
						);*/
			},
		},
	});
</script>