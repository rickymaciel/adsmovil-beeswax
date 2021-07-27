<template>
	<v-card justify="between" align="center" color="grey lighten-3 py-4">
		<v-form ref="form" justify="between" align="center" v-model="valid" lazy-validation>
			<v-container>
				
				<v-row dense>
					<!-- Name: name ✔-->
					<v-col cols="12" sm="12" md="6">
						<CardTextField
							v-model="campaign.name"
							:rules="[getRules.isRequired]"
							:hint="$t('campaign.fields.name')"
							reference="name"
							:placeholder="$t('campaign.fields.name')"
							:label="$t('campaign.fields.name')"
							:required="true"
						></CardTextField>
					</v-col>

					<!-- Advertiser: advertiser_id ✔ -->
					<v-col cols="12" sm="12" md="6">
						<CardAutocomplete
							v-model="campaign.advertiser_id"
							:rules="[getRules.isRequired]"
							:items="getAdvertisers"
							item_text="value"
							item_value="id"
							:hint="$t('campaign.fields.advertiser')"
							reference="advertiser_id"
							:placeholder="$t('campaign.fields.advertiser')"
							:label="$t('campaign.fields.advertiser')"
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
					<v-col cols="12" sm="12" md="6">
						<CardAutocomplete
							v-model="campaign.trafficker_id"
							:rules="[getRules.isRequired]"
							:items="traffickers"
							item_text="value"
							item_value="id"
							:hint="$t('campaign.fields.trafficker')"
							reference="trafficker_id"
							:placeholder="$t('campaign.fields.trafficker')"
							:label="$t('campaign.fields.trafficker')"
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
				
				<!-- General -->
				<v-row dense>

					<!-- Solo mostrar dato de la cuenta: Currency ✔ -->
					<v-col cols="12" sm="12" md="6">
						<CardTextField
							v-model="getCurrency"
							reference="currency"
							:hint="$t('campaign.fields.currency')"
							:placeholder="$t('campaign.fields.currency')"
							:label="$t('campaign.fields.currency')"
							:required="false"
							:disabled="true"
						></CardTextField>
					</v-col>

					<!-- Solo mostrar dato de la cuenta: Timezone ✔ -->
					<v-col cols="12" sm="12" md="6">
						<CardTextField
							v-model="getTimezone"
							reference="timezone"
							:hint="$t('campaign.fields.timezone')"
							:placeholder="$t('campaign.fields.timezone')"
							:label="$t('campaign.fields.timezone')"
							:required="false"
							:disabled="true"
						></CardTextField>
					</v-col>

					<!-- Alternative ID ✔ -->
					<v-col cols="12" sm="12" md="6">
						<CardTextField
							v-model="campaign.alternative_id"
							reference="AlternativeID"
							:hint="$t('campaign.fields.alternative_id')"
							:placeholder="$t('campaign.fields.alternative_id')"
							:label="$t('campaign.fields.alternative_id')"
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
							<v-card-title class="px-2">{{ $t('campaign.labels.duration') }}</v-card-title>
							<v-divider class="mt-3"></v-divider>
						</v-card>
					</v-col>

					<!-- Start Date -->
					<v-col cols="12" sm="12" md="4">
						<v-card
							elevation="0"
							class="pa-2"
							outlined
							tile
							color="rgb(0, 0, 0, 0.0)"
						>
							<DatePicker
								:label="$t('campaign.fields.start_date')"
								v-model="campaign.start_date"
								:min_date="getMinStartDate"
								:rules="[getRules.isRequired]"
								:required="true"
							></DatePicker>
						</v-card>
					</v-col>

					<!-- End Date -->
					<v-col cols="12" sm="12" md="4">
						<v-card
							elevation="0"
							class="pa-2"
							outlined
							tile
							color="rgb(0, 0, 0, 0.0)"
						>
							<DatePicker
								:label="$t('campaign.fields.end_date')"
								v-model="campaign.end_date"
								:min_date="getMinEndDate"
								:rules="[getRules.isRequired]"
								:is_end="true"
								:required="true"
							></DatePicker>
						</v-card>
					</v-col>

					<v-col cols="12" sm="12" md="4" class="pt-3">
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
							<v-card-title class="px-2">{{ $t('campaign.labels.budget') }}</v-card-title>
							<v-divider class="mt-3"></v-divider>
						</v-card>
					</v-col>

					<!-- Budget Type* ✔ -->
					<v-col cols="12" sm="12" md="6">
						<v-card elevation="0" class="pa-2" outlined tile color="rgb(0, 0, 0, 0.0)">
							<v-layout>
								<v-label class="v-label theme--light">
									{{ $t('campaign.fields.budget_type') }}
									<span class="red--text"><strong>*</strong></span>
								</v-label>
							</v-layout>
							<v-layout>
								<v-radio-group
									v-model.number="campaign.budget_type_id"
									v-numeric
									:rules="[getRules.required]"
									row
									:disabled="isEdit"
								>
									<v-radio
										v-for="budget_type in getBudgetTypes"
										:key="budget_type.id"
										:label="budget_type.value"
										:value="budget_type.id"
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
									Automatic Allocation
									<span class="red--text"
										><strong>*</strong></span
									>
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
	import { isEmpty, isUndefined } from "lodash";
	import { isRequired, isNumber } from "../../../services/rule-services";
	import DatePicker from "../../../components/Content/DatePicker.vue";
	import CardTextField from "../../../components/Content/CardTextField.vue";
	import CardAutocomplete from "../../../components/Content/CardAutocomplete.vue";
import notificationService from "@/services/notification-service";
import { Notification } from "@/interfaces/proccess";
	
	// Configs for Date
	const DEFAULT_DATE_TIME_FORMAT = "YYYY-MM-DD HH:mm:ss";

	export default Vue.extend({
		name: "Overview",
		props: {
			traffickers: { type: Array, default: () => ([]) },
			campaign: { type: Object, default: () => ({frequency_caps:[]}) },
			account: { type: Object, default: () =>({}) },
			budget_types: { type: Array, required: true },
			advertisers: { type: Array, required: true },
			campaigns_pacing: { type: Array, required: true },
			optimization_strategies: { type: Array, required: true },
			kpi_campaigns: { type: Array, required: true },
			strategies: { type: Array, required: true },
			unit_times: { type: Array, required: true },
			start_time: { type: String, default: "00:00:00" },
			end_time: { type: String, default: "00:59:59" },
			is_edit: { type: Boolean, default: false },
			errors: { type: Object, default: () => ({}) },
		},
		components: { DatePicker, CardTextField, CardAutocomplete },
		data: () => ({
			title: "Overview",
			valid: false,
			campaign_duration: undefined
			// today: new Date().toISOString().substr(0, 10),
			// openStartDate: false,
			// openStartTime: false,
			// openEndDate: false,
			// openEndTime: false,
			// expected_show: false,
			// expected_value: undefined,
			// expected_label: "",
			// campaign_duration: undefined,
			// show_target_ecpc: false,
			// show_target_ctr: false,
			// show_target_vcr: false,
		}),
		created() {},
		mounted() {},
		computed: {
			
			isEdit() { return this.is_edit },

			getRules() {
				return {
					isRequired,
					isNumber,
				};				
			},

			getCurrency() {
				return !isUndefined(this.account.currency) && !isEmpty(this.account.currency)
					? `${this.account.currency.key} (${this.account.currency.glyph})`
					: "N/A";
			},

			getTimezone() {
				return !isUndefined(this.account.timezone) && !isEmpty(this.account.timezone)
					? `${this.account.timezone.name}`
					: "N/A";
			},

			getAdvertisers(): [] {
				return this.advertisers;
			},

			getMinStartDate() {
				return this.moment().format(DEFAULT_DATE_TIME_FORMAT);
			},

			getMinEndDate() {
				if(!!this.campaign.start_date) {
					return this.moment(this.campaign.start_date).format(DEFAULT_DATE_TIME_FORMAT);
				}
				else {
					return this.moment().format(DEFAULT_DATE_TIME_FORMAT);
				}				
			},

			getBudgetTypes() {
				return this.budget_types;
			}

		},
		methods: {
			handleCancel() {
				this.$router.push({ name: "CampaignsIndex" });
			},

			async handleSubmit() {
				try {
					if (!(await this.validate())) return;
					const emit = this.isEdit ? "update-campaign" : "create-campaign";
					this.$emit(emit, { campaign: this.prepareDataCreate() });
				} catch (error) {
					console.error("handleSubmit", { error: error });
				}
			},

			prepareDataCreate() {
				// return {
				// 	id: this.isEdit ? Number(this.campaign.id) : undefined,
				// 	name: String(this.campaign.name),
				// 	advertiser_id: Number(this.campaign.advertiser_id),
				// 	budget: Number(this.campaign.budget),
				// 	start_date: this.moment(this.campaign.start_date).format(DEFAULT_DATE_TIME_FORMAT),
				// 	end_date: this.moment(this.campaign.end_date).format(DEFAULT_DATE_TIME_FORMAT),
				// 	frequency_caps: this.campaign.frequency_caps,
				// 	alternative_id: this.campaign.alternative_id,
				// 	active: 1,
				// 	trafficker_id: Number(this.campaign.trafficker_id),
				// 	budget_type_id: Number(this.campaign.budget_type_id),
				// 	automatic_allocation: Number(this.campaign.automatic_allocation),
				// 	kpi_campaign_id: Number(this.campaign.kpi_campaign_id),
				// 	kpi_objective: Number(this.campaign.kpi_objective),
				// 	optimization_strategy_id: Number(this.campaign.optimization_strategy_id),
				// 	strategy_id: Number(this.campaign.strategy_id),
				// 	campaign_pacing_id: Number(this.campaign.campaign_pacing_id),
				// 	daily_budget: Number(this.campaign.daily_budget),
				// 	cpm_bid: this.campaign.cpm_bid ? Number(this.campaign.cpm_bid) : null,
				// 	target_ecpc: Number(this.campaign.target_ecpc),
				// 	target_ctr: Number(this.campaign.target_ctr),
				// 	target_vcr: Number(this.campaign.target_vcr),
				// } as CampaignDataCreate;
			},
		
			getDuration() {
				
				const start_date = this.moment(this.campaign.start_date);
				const end_date = this.moment(this.campaign.end_date);
				
				if (
					!!!start_date || 
					!!!end_date || 
					!start_date.isValid() || 
					!end_date.isValid()
				) return undefined;

				const duration = this.moment.duration(end_date.diff(start_date));

				let days = Math.ceil(duration.asDays());

				if (days < 0) {
					this.campaign_duration = undefined;
					return days;
				}

				this.campaign_duration = days;

				return days;
			},

			checkDuration(duration) {
				if(isUndefined(duration) || duration > 0) return;
				
				notificationService.CreateNotification({
					title: "Error",
					message: "Rango invalido",
					btn_text: "Continuar"
				} as Notification).then(notification => {
					this.$store.dispatch("proccess/setNotification", notification, { root: true })
				})
				
			}

		},
		watch: {
			"campaign.start_date"(val, old) {
				const duration = this.getDuration();
				this.checkDuration(duration);
			},

			"campaign.end_date"(val, old) {
				const duration = this.getDuration();
				this.checkDuration(duration);
			},
		},
	});
</script>
