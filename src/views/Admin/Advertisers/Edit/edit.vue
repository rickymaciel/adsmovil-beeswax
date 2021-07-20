<template>
	<v-container class="my-0">
		<Alertize></Alertize>
		<v-layout column>
			<v-form
				ref="form"
				justify="center"
				align="center"
				v-model="valid"
				lazy-validation
				@submit.prevent="handleSubmit"
			>
				<v-container>
					<v-row no-gutters>
						<!-- Advertiser ID -->
						<v-col cols="12" sm="12" md="6">
							<v-card
								elevation="0"
								class="pa-2"
								outlined
								tile
								color="rgb(0, 0, 0, 0.0)"
							>
								<v-text-field
									v-model="id"
									:rules="[
										getRules.isNumber,
										getRules.isRequired,
									]"
									ref="name"
									:hint="$t('advertisers.fields.id')"
									:placeholder="$t('advertisers.fields.id')"
									:label="$t('advertisers.fields.id')+'*'"
									class="label-fixed disabled"
								></v-text-field>
							</v-card>
						</v-col>
					</v-row>

					<v-row no-gutters>
						<!-- Advertiser Name -->
						<v-col cols="12" sm="12" md="6">
							<v-card
								elevation="0"
								class="pa-2"
								outlined
								tile
								color="rgb(0, 0, 0, 0.0)"
							>
								<v-text-field
									v-model="name"
									:rules="[
										getRules.isRequired,
										getRules.isMinLength,
										getRules.isMaxLength,
									]"
									ref="name"
									:hint="$t('advertisers.fields.name')"
									:placeholder="$t('advertisers.fields.name')"
									:label="$t('advertisers.fields.name')+'*'"
									class="label-fixed"
									counter="255"
								></v-text-field>
							</v-card>
						</v-col>

						<!-- Advertiser Category -->
						<v-col cols="12" sm="12" md="6">
							<v-card
								elevation="0"
								class="pa-2"
								outlined
								tile
								color="rgb(0, 0, 0, 0.0)"
							>
								<v-autocomplete
									class="label-fixed"
									v-model="category_id"
									:rules="[
										getRules.isRequired,
										getRules.isNumber,
									]"
									:hint="`Advertiser Category`"
									:items="getCategories"
									ref="category_id"
									item-text="name"
									item-value="id"
									:label="$t('advertisers.fields.category')"
									:placeholder="$t('advertisers.fields.category')"
								></v-autocomplete>
							</v-card>
						</v-col>

						<!-- Advertiser Domain -->
						<v-col cols="12" sm="12" md="6">
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
									v-model="show_tooltip_domain"
									right
								>
									<template v-slot:activator="{}">
										<v-text-field
											v-model="domain"
											ref="domain"
											:rules="[
												getRules.isRequired,
												getRules.isDomain,
											]"
											:hint="$t('advertisers.fields.domain')"
											:placeholder="$t('advertisers.fields.domain')"
											:label="$t('advertisers.fields.domain')+'*'"
											class="label-fixed"
											append-outer-icon="mdi-help-circle-outline"
											@click:append-outer="
												toggleTooltipDomain()
											"
										></v-text-field>
									</template>
									<span>
										{{ $t("advertisers.labels.domainTooltip") }}
									</span>
								</v-tooltip>
							</v-card>
						</v-col>

						<!-- Advertiser App Bundle -->
						<v-col cols="12" sm="12" md="6">
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
									v-model="show_tooltip_app_bundle"
									right
								>
									<template v-slot:activator="{}">
										<v-text-field
											v-model="app_bundle"
											ref="app_bundle"
											:hint="$t('advertisers.fields.appBundle')"
											:placeholder="$t('advertisers.fields.appBundle')"
											:label="$t('advertisers.fields.appBundle')"
											class="label-fixed"
											counter="255"
											append-outer-icon="mdi-help-circle-outline"
											@click:append-outer="
												toggleTooltipAppBundle()
											"
										></v-text-field>
									</template>
									<span>
										{{ $t("advertisers.labels.appBundleTooltip") }}
									</span>
								</v-tooltip>
							</v-card>
						</v-col>

						<!-- Status -->
						<v-col cols="12" sm="12" md="6">
							<v-card
								elevation="0"
								outlined
								tile
								color="rgb(0, 0, 0, 0.0)"
							>
								<v-switch
									color="success"
									class="v-input--reverse--column"
									inset
									flat
									hide-details
									v-model="active"
									:label="`${active ? $t('common.fields.active') : $t('common.fields.inactive')}`"
									@change="toggleStatus"
								>
								</v-switch>
							</v-card>
						</v-col>
					</v-row>
					<v-divider class="ma-4"></v-divider>
					<v-row no-gutters align="center" justify="center">
						<v-col cols="12" sm="12" md="6">
							<v-card
								elevation="0"
								class="pa-2"
								outlined
								tile
								color="rgb(0, 0, 0, 0.0)"
							>
								<v-card-text align="start" class="secondary--text info-message">
									{{ $t('common.labels.mandatory') }}
								</v-card-text>
							</v-card>
						</v-col>

						<v-col cols="12" sm="12" md="6">
							<v-card
								elevation="0"
								class="pa-2"
								outlined
								tile
								color="rgb(0, 0, 0, 0.0)"
							>
								<v-row align="end" justify="end">
									<v-btn
										type="submit"
										rounded
										color="secondary"
										class="mx-2 px-8"
									>
										{{ $t("common.actions.save") }}
									</v-btn>
									<v-btn
										type="button"
										rounded
										color="secondary"
										class="mx-2 px-8"
										@click="redirectTo"
									>
										{{ $t("common.actions.cancel") }}
									</v-btn>
								</v-row>
							</v-card>
						</v-col>
					</v-row>
				</v-container>
			</v-form>
		</v-layout>
	</v-container>
</template>

<script lang="ts">
	import Vue from "vue";
	import {
		Advertiser,
		AdvertiserDataCreate,
		AdvertiserDataUpdate,
		Category,
	} from "../../../../interfaces/advertiser";
	import { isNaN, last, toNumber } from "lodash";

	import Alertize from "../../../../components/Alertize.vue";
	import { Notification } from "../../../../interfaces/proccess";

	import {
		isRequired,
		isNumber,
		isDomain,
		isMinLength,
		isMaxLength,
	} from "../../../../services/rule-services";

	export default Vue.extend({
		name: "AdvertiserCreate",
		props: {},
		components: { Alertize },
		data: () => ({
			title: "Create",
			advertiser: {} as AdvertiserDataCreate,
			valid: false,
			loading: false,
			message: "",
			type: "info",
			show_tooltip_app_bundle: false,
			show_tooltip_domain: false,

			id: undefined,
			name: "",
			category_id: undefined,
			domain: "",
			app_bundle: "",
			active: true,
		}),
		created() {},
		async mounted() {
			try {
				this.setLoading(true);
				await this.dispatchCategories();
				this.getId;
				this.advertiser = await this.dispatchShowAdvertiser();
				this.id = this.advertiser.id;
				this.name = this.advertiser.name;
				this.category_id = this.advertiser.category_id;
				this.domain = this.advertiser.domain || "https://";
				this.app_bundle = this.advertiser.app_bundle;
				this.active = this.advertiser.active;
				this.setLoading(false);
			} catch (error) {
				this.setLoading(false);
				console.log("mounted", { error: error });
			}
			this.$refs.form.resetValidation();
		},
		computed: {
			getId() {
				let pathArray: String[] = this.$route.path.split("/");
				const lastItem = last(pathArray);
				this.id = !isNaN(toNumber(lastItem)) ? toNumber(lastItem) : NaN;
			},
			getCategories(): Category[] {
				return this.$store.state.advertiser.categories;
			},
			getAdvertiser(): Advertiser {
				return this.advertiser;
			},
			isAlertize(): Boolean {
				return this.$store.state.proccess.alertize;
			},
			getRules() {
				return {
					isRequired,
					isNumber,
					isDomain,
					isMinLength,
					isMaxLength,
				};
			},
		},
		methods: {
			async validate() {
				let form = this.$refs.form;
				return await form.validate();
			},
			setNotification(notification: Notification) {
				return this.$store.dispatch(
					"proccess/setNotification",
					notification,
					{ root: true }
				);
			},
			async handleSubmit() {
				try {
					if (!(await this.validate())) return;
					this.setLoading(true);
					await this.update();
					this.setLoading(false);
				} catch (error) {
					console.error("handleSubmit", { error: error });
					this.setLoading(false);
				}
			},
			redirectTo() {
				this.setNotification({ title: "", message: "", type: "" });
				this.$router.push({ name: "AdvertisersIndex" });
			},
			setLoading(_loading: Boolean) {
				this.$store.state.proccess.loading = _loading;
			},
			toggleTooltipAppBundle() {
				this.show_tooltip_app_bundle = !this.show_tooltip_app_bundle;
			},
			toggleTooltipDomain() {
				this.show_tooltip_domain = !this.show_tooltip_domain;
			},
			toggleStatus(status: boolean) {
				this.active = Boolean(status);
			},
			async dispatchCategories() {
				return this.$store.dispatch("advertiser/getCategories", {
					root: true,
				});
			},
			async dispatchShowAdvertiser() {
				return this.$store.dispatch("advertiser/show", this.id, {
					root: true,
				});
			},
			async update() {
				this.advertiser = {
					id: this.id,
					name: this.name,
					category_id: this.category_id,
					domain: this.domain,
					app_bundle: this.app_bundle,
					active: this.active,
				} as AdvertiserDataUpdate;

				return this.$store.dispatch(
					"advertiser/update",
					{
						advertiser: this.advertiser,
						id: this.id,
					},
					{
						root: true,
					}
				);
			},
		},
	});
</script>
