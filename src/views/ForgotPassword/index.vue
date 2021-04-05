<template>
	<v-main class="main" :class="{ mobile: $vuetify.breakpoint.mobile }">
		<v-responsive :min-width="$vuetify.breakpoint.mobile ? 100 : 1200">
			<v-container class="pa-8 fill-height">
				<v-row>
					<v-col>
						<v-flex
							class="d-flex flex-row justify-center align-center"
						>
							<div
								v-if="!$vuetify.breakpoint.mobile"
								class="image-container"
							></div>
							<div
								class="form-container d-flex flex-row justify-center align-center"
							>
								<v-card width="100%" elevation="0">
									<v-card-title
										class="form-title text-capitalize mb-16"
									>
										{{ $t("forgotPassword") }}
									</v-card-title>

									<v-card-text>
										<v-form
											ref="form"
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

											<v-text-field
												v-model="email"
												ref="email"
												class="label-fixed"
												value=""
												:label="$t('enterEmail')"
												:rules="emailRules"
												:disabled="loading"
											></v-text-field>

											<v-card-actions class="mt-8">
												<v-row
													align="center"
													justify="space-between"
												>
													<v-btn
														:block="
															$vuetify.breakpoint
																.xs
														"
														rounded
														text
														color="secondary"
														class="text-capitalize"
														:disabled="loading"
														href="/auth/login"
													>
														{{ $t("backLogin") }}
													</v-btn>
												</v-row>
											</v-card-actions>
											<v-card-actions class="mt-8">
												<v-row
													align="end"
													justify="end"
												>
													<v-btn
														:block="
															$vuetify.breakpoint
																.xs
														"
														color="secondary"
														class="px-16 float-end"
														rounded
														:disabled="loading"
														@click="handleLogin"
													>
														{{
															$t("resetPassword")
														}}
													</v-btn>
												</v-row>
											</v-card-actions>
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
		</v-responsive>
	</v-main>
</template>

<script>
	export default {
		name: "Login",
		props: {},

		data: function () {
			return {
				email: "",
				valid: false,
				loading: false,
				message: "",
			};
		},

		created() {},

		mounted() {
			console.log("mounted", { lang: this.$vuetify.lang });
		},

		computed: {
			getMessageComputed() {
				return this.message;
			},

			isLoggedIn() {
				return this.$store.state.AuthModule.loggedIn;
			},

			token() {
				return this.$store.state.AuthModule.token;
			},

			emailRules() {
				return [
					(v) => !!v || this.$t("fieldRequired"),
					(v) => /.+@.+\..+/.test(v) || this.$t("invalidEmail"),
				];
			},
		},

		components: {},

		methods: {
			dispatchResetPassword(credentials) {
				return this.$store.dispatch("AuthModule/reset", credentials);
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

			handleAction() {
				if (!this.validate()) return;

				this.loading = true;

				this.dispatchResetPassword({ email: this.email })
					.then(
						(data) => {
							console.log(
								"view:REsetPassword:dispatchResetPassword",
								{ data: data }
							);
							this.$router.push("/admin/dashboard");
							this.loading = false;
						},
						(error) => {
							console.error("handleAction:REsetPassword(error)", {
								error: error,
							});
							this.message = error;
							this.loading = false;
						}
					)
					.catch((error) => {
						console.error("handleAction:REsetPassword:catch", {
							error: error,
						});
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

<style src="./index.scss" lang="scss" />
