<template>
	<v-main class="main" :class="{ mobile: $vuetify.breakpoint.mobile }">
		<v-container class="pa-8 fill-height">
			<v-row>
				<v-col>
					<v-flex class="d-flex flex-row justify-center align-center">
						<div
							v-if="!$vuetify.breakpoint.mobile"
							class="image-container"
						></div>
						<div
							class="form-container d-flex"
							justify="center"
							align="center"
						>
							<v-card elevation="0" width="100%">
								<v-card-title
									class="form-title text-capitalize"
								>
									{{ $t("login") }}
								</v-card-title>

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
														:rules="emailRules"
														:disabled="loading"
													></v-text-field>
												</v-col>
												<v-col cols="12" sm="12">
													<v-text-field
														v-model="password"
														ref="password"
														class="label-fixed"
														value=""
														:label="
															$t('enterPassword')
														"
														:rules="passwordRules"
														clearable
														:disabled="loading"
													></v-text-field>
												</v-col>
												<v-col cols="12" sm="12">
													<v-card-actions
														class="mt-8"
													>
														<v-row
															align="center"
															justify="space-between"
														>
															<v-btn
																:block="
																	$vuetify
																		.breakpoint
																		.xs
																"
																rounded
																text
																color="secondary"
																class="text-capitalize"
																:disabled="
																	loading
																"
																href="/auth/forgot-password"
															>
																{{
																	$t(
																		"forgotPassword"
																	)
																}}
															</v-btn>
															<v-switch
																inset
																v-model="
																	rememberMe
																"
																:label="
																	$t(
																		'rememberMe'
																	)
																"
																color="secondary"
																class="secondary--text"
																:disabled="
																	loading
																"
															></v-switch>
														</v-row>
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
																	loading
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
				<v-overlay :value="loading">
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

<script>
	export default {
		name: "Login",
		props: {},

		data: function () {
			return {
				email: "luciano@adsmovil.com",
				password: "Chaicu777",
				rememberMe: true,
				valid: false,
				loading: false,
				message: "",
			};
		},

		created() {},

		mounted() {
			//console.log("mounted", { lang: this.$vuetify.lang });
		},

		computed: {
			getMessageComputed() {
				return this.message;
			},

			isLoggedIn() {
				return this.$store.state.auth.loggedIn;
			},

			token() {
				return this.$store.state.auth.token;
			},

			emailRules() {
				return [
					(v) => !!v || this.$t("fieldRequired"),
					(v) => /.+@.+\..+/.test(v) || this.$t("invalidEmail"),
				];
			},

			passwordRules() {
				return [
					(v) => !!v || this.$t("fieldRequired"),
					(v) => (v && v.length >= 8) || this.$t("minLength", { min: 8 }),
				];
			},
		},

		components: {},

		methods: {
			dispatchLogin(credentials) {
				return this.$store.dispatch("auth/logIn", credentials, {
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

			handleLogin() {
				if (!this.validate()) return;

				this.loading = true;

				this.dispatchLogin({ email: this.email, password: this.password })
					.then(
						(data) => {
							console.log("view:Login:dispatchLogin", { data: data });
							this.$router.push("/admin/dashboard");
							this.loading = false;
						},
						(error) => {
							console.error("handleLogin:Login(error)", {
								error: error,
							});
							this.message = error;
							this.loading = false;
						}
					)
					.catch((error) => {
						console.error("handleLogin:Login:catch", { error: error });
						this.message = error;
						this.loading = false;
					});
			},

			resetForm() {
				this.valid = false;
				this.loading = false;
				this.email = "";
				this.password = "";
				this.message = "";
			},
		},
	};
</script>

<style src="./Login.scss" lang="scss" />
