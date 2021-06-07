<template>
	<v-container class="my-0">
		<Alertize @return-alertize="redirectTo"></Alertize>
		<v-layout column>
			<v-form
				ref="form"
				justify="center"
				align="center"
				v-model="valid"
				lazy-validation
			>
				<v-container>
					<v-row no-gutters>
						<!-- Advertiser Name -->
						<v-col cols="12" sm="12" md="6" lg="3">
							<v-card
								elevation="0"
								class="pa-2"
								outlined
								tile
								color="rgb(0, 0, 0, 0.0)"
							>
								<v-text-field
									v-model="name"
									:rules="nameRules"
									hint="Advertiser Name"
									ref="name"
									placeholder="Advertiser Name"
									label="Advertiser Name*"
									class="label-fixed"
									counter="255"
								></v-text-field>
							</v-card>
						</v-col>

						<!-- Advertiser Category -->
						<v-col cols="12" sm="12" md="6" lg="3">
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
									:rules="categoryRules"
									:hint="`Advertiser Category`"
									:items="getCategories"
									ref="category_id"
									item-text="name"
									item-value="id"
									label="Advertiser Category*"
									placeholder="Advertiser Category"
								></v-autocomplete>
							</v-card>
						</v-col>
					</v-row>

					<v-row no-gutters>
						<!-- Advertiser Domain -->
						<v-col cols="12" sm="12" md="6" lg="3">
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
											:rules="domainRules"
											hint="Advertiser Domain"
											placeholder="Advertiser Domain"
											label="Advertiser Domain*"
											class="label-fixed"
											@click:append-outer="
												toggleTooltipDomain()
											"
										></v-text-field>
									</template>
									<!-- prefix="https://"
											append-outer-icon="mdi-help-circle-outline" -->
									<span>
										The advertiser’s primary domain. This is
										recuerde by many exchanges
									</span>
								</v-tooltip>
							</v-card>
						</v-col>

						<!-- Advertiser App Bundle -->
						<v-col cols="12" sm="12" md="6" lg="3">
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
											:rules="appBundleRules"
											ref="app_bundle"
											hint="Advertiser App Bundle"
											placeholder="Advertiser App Bundle"
											label="Advertiser App Bundle*"
											class="label-fixed"
											counter="255"
											append-outer-icon="mdi-help-circle-outline"
											@click:append-outer="
												toggleTooltipAppBundle()
											"
										></v-text-field>
									</template>
									<span>
										The advertiser’s primary domain. This is
										recuerde by many exchanges
									</span>
								</v-tooltip>
							</v-card>
						</v-col>

						<!-- Status -->
						<v-col cols="12" sm="12" md="6" lg="3">
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
									:label="`${active ? 'Active' : 'Inactive'}`"
									@change="toggleStatus"
								>
								</v-switch>
							</v-card>
						</v-col>
					</v-row>
					<v-divider class="ma-4"></v-divider>
					<v-row no-gutters align="center" justify="center">
						<v-col cols="12" sm="12" md="8" lg="9">
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

						<v-col cols="12" sm="12" md="8" lg="3">
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
										class="mx-2 px-8"
										@click="handleSubmit"
									>
										{{ $t("save") }}
									</v-btn>
									<v-btn
										rounded
										color="secondary"
										class="mx-2 px-8"
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
		</v-layout>
	</v-container>
</template>

<script lang="ts">
	import Vue from "vue";
	import {
		Advertiser,
		AdvertiserDataCreate,
		Category,
	} from "../../../../interfaces/advertiser";
	import { isEmpty, isNull, isUndefined, isNaN } from "lodash";
	import Alertize from "../../../../components/Alertize.vue";

	export default Vue.extend({
		name: "AdvertiserCreate",
		props: {},
		components: { Alertize },
		data: () => ({
			title: "Create",
			advertiser: {} as AdvertiserDataCreate,
			valid: false,
			show_tooltip_app_bundle: false,
			show_tooltip_domain: false,

			name: "",
			category_id: NaN,
			domain: "",
			app_bundle: "",
			active: true,
		}),
		created() {},
		async mounted() {
			this.setLoading(true);
			await this.dispatchCategories();
			this.setLoading(false);
		},
		computed: {
			getCategories(): Category[] {
				return this.$store.state.advertiser.categories;
			},
			nameRules() {
				return [
					(v: string) =>
						(!isUndefined(v) && !isNull(v) && !isEmpty(v)) ||
						this.$t("fieldRequired"),
					(v: string) =>
						(v && v.length <= 255) ||
						this.$t("maxLength", { max: 255 }),
					(v: string) =>
						(v && v.length >= 2) || this.$t("minLength", { min: 2 }),
				];
			},
			categoryRules() {
				return [
					(v: any) =>
						(!isNull(v) && !isNaN(v)) || this.$t("fieldRequired"),
				];
			},
			domainRules() {
				return [
					(v: string) =>
						(!isUndefined(v) && !isNull(v) && !isEmpty(v)) ||
						this.$t("fieldRequired"),
					(v: string) =>
						/^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/?\n]+)/gim.test(
							v
						) || this.$t("domainRegex"),
				];
			},
			appBundleRules() {
				return [
					(v: any) =>
						(!isUndefined(v) && !isNull(v) && !isEmpty(v)) ||
						this.$t("fieldRequired"),
					(v: string) =>
						/^(?:\w+|\w+\.\w+)+$/gim.test(v) ||
						this.$t("appBundleRegex"),
				];
			},
			getAdvertiser(): Advertiser {
				return this.advertiser;
			},
		},
		methods: {
			setNotification(notification: Notification) {
				return this.$store.dispatch(
					"proccess/setNotification",
					notification,
					{ root: true }
				);
			},
			redirectTo() {
				this.setNotification({ title: "", message: "", type: "" });
				this.$router.push({ name: "AdvertisersIndex" });
			},

			async validate() {
				let form = this.$refs.form;
				return await form.validate();
			},
			async handleSubmit() {
				try {
					if (!(await this.validate())) return;
					this.setLoading(true);
					await this.create();
					this.setLoading(false);
				} catch (error) {
					console.error("handleSubmit", { error: error });
					this.setLoading(false);
				}
			},
			setLoading(_loading: Boolean) {
				this.$store.state.proccess.loading = _loading;
			},
			handleCancel() {
				this.$router.push({ name: "AdvertisersIndex" });
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
			async create() {
				this.advertiser = {
					name: this.name,
					category_id: this.category_id,
					domain: this.domain,
					app_bundle: this.app_bundle,
					active: this.active,
				} as AdvertiserDataCreate;
				return this.$store.dispatch("advertiser/create", this.advertiser, {
					root: true,
				});
			},
		},
	});
</script>
