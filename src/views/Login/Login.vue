<template>
	<v-main class="main" :class="{ mobile: $vuetify.breakpoint.mobile }">
		<v-container class="fill-height">
			<v-row>
				<v-col>
					<v-flex class="d-flex flex-row justify-center align-center">
						<div
							v-if="!$vuetify.breakpoint.mobile"
							class="image-container"
						></div>
						<div
							class="form-container d-lg-flex"
							justify="center"
							align="center"
						>
							<v-card
								class="rounded-lg pa-4"
								:elevation="$vuetify.breakpoint.mobile ? 8 : 0"
								width="100%"
							>
								<v-card-title
									class="form-title text-capitalize"
								>
									{{ $t("login") }}
								</v-card-title>

								<Alertize></Alertize>

								<v-card-text>
									<v-form
										ref="form"
										justify="center"
										align="center"
										v-model="valid"
										lazy-validation
									>
										<v-alert
											v-if="message.length"
											dismissible
											color="error"
											outlined
											icon="mdi-alert-circle-outline"
										>
											{{ $t(message) }}
										</v-alert>

										<v-container>
											<v-row>
												<v-col cols="12" sm="12">
													<v-text-field
														v-model="email"
														ref="email"
														class="label-fixed"
														value=""
														:label="
															$t('enterEmail')
														"
														:rules="[
															rules.required,
															rules.emailMatch,
														]"
														:disabled="isLoading"
													></v-text-field>
												</v-col>
												<v-col cols="12" sm="12">
													<v-text-field
														v-model="password"
														:append-icon="
															showPass
																? 'mdi-eye'
																: 'mdi-eye-off'
														"
														:type="
															showPass
																? 'text'
																: 'password'
														"
														ref="password"
														class="label-fixed"
														value=""
														:label="
															$t('enterPassword')
														"
														:rules="[
															rules.required,
															rules.min,
														]"
														:disabled="isLoading"
														@click:append="
															showPass = !showPass
														"
													></v-text-field>
												</v-col>
												<v-col
													v-if="false"
													cols="12"
													sm="12"
												>
													<v-card-actions>
														<v-btn
															rounded
															text
															color="secondary"
															class="text-capitalize"
															:disabled="
																isLoading
															"
															href="/auth/forgot-password"
														>
															{{
																$t(
																	"forgotPassword"
																)
															}}
														</v-btn>
														<v-spacer></v-spacer>
														<v-switch
															inset
															v-model="rememberMe"
															:label="
																$t('rememberMe')
															"
															color="secondary"
															class="secondary--text"
															:disabled="
																isLoading
															"
														></v-switch>
													</v-card-actions>
												</v-col>
												<v-col cols="12" sm="12">
													<v-card-actions
														class="mt-8"
													>
														<v-row
															align="end"
															justify="end"
														>
															<v-btn
																:block="
																	$vuetify
																		.breakpoint
																		.xs
																"
																color="secondary"
																class="px-16"
																rounded
																:disabled="
																	isLoading
																"
																@click="
																	handleLogin
																"
															>
																{{
																	$t("login")
																}}
															</v-btn>
														</v-row>
													</v-card-actions>
												</v-col>
											</v-row>
										</v-container>
									</v-form>
								</v-card-text>
							</v-card>
						</div>
					</v-flex>
				</v-col>
				<v-overlay :value="isLoading">
					<v-progress-circular
						indeterminate
						size="64"
					></v-progress-circular>
					<p class="mt-8">{{ $t("loading") }}</p>
				</v-overlay>
			</v-row>
		</v-container>
	</v-main>
</template>

<script lang="ts">
	import Alertize from "../../components/Alertize.vue";
	export default {
		name: "Login",
		props: {},

		data: function () {
			return {
				email: "", // luciano@adsmovil.com
				password: "", // Chaicu777
				rememberMe: true,
				showPass: false,
				valid: false,
				message: "",
				rules: {
					required: (value: any) => !!value || this.$t("fieldRequired"),
					min: (v: string | any[]) =>
						v.length >= 8 || this.$t("minLength", { min: 8 }),
					emailMatch: (v: string) =>
						/.+@.+\..+/.test(v) || this.$t("invalidEmail"),
				},
			};
		},

		created() {},

		mounted() {},

		computed: {
			isLoggedIn() {
				return this.$store.state.auth.loggedIn;
			},

			isLoading() {
				return this.$store.state.proccess.loading;
			},

			token() {
				return this.$store.state.auth.token;
			},
		},

		components: { Alertize },

		methods: {
			async dispatchLogin(credentials: { email: string; password: string }) {
				return await this.$store.dispatch("auth/logIn", credentials, {
					root: true,
				});
			},

			handleLogOff() {
				localStorage.clear();
				const form = this.$refs.form;
				form.validate();
				form.resetValidation();
				form.reset();
				this.resetForm();
			},

			validate() {
				let form = this.$refs.form;
				return form.validate();
			},

			async handleLogin() {
				try {
					if (!this.validate()) return;

					this.setLoading(true);

					const response = await this.dispatchLogin({
						email: this.email,
						password: this.password,
					});

					if (response.success) {
						this.$router.push({ name: "CampaignsIndex" });
					}

					this.setLoading(false);
				} catch (error) {
					console.error("Login::handleLogin", { error: error });
					this.setLoading(false);
				}
			},

			resetForm() {
				this.valid = false;
				this.email = "";
				this.password = "";
				this.message = "";
			},

			setLoading(_loading: Boolean) {
				this.$store.state.proccess.loading = _loading;
			},
		},
	};
</script>
