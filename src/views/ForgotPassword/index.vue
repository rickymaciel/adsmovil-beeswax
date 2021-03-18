<template>
	<v-main class="main shadow">
		<v-container
			class="justify-center align-center align-self-center"
			justify="center"
		>
			<div class="imag d-none d-lg-block"></div>
			<div
				class="text-container bg-white pa-16"
				justify="center"
				no-gutters
			>
				<v-card-title class="form-title text-capitalize">
					{{ $t("forgotPassword") }}
				</v-card-title>

				<v-form
					ref="form"
					class="pa-8"
					justify="center"
					no-gutters
					v-model="valid"
					lazy-validation
				>
					<v-alert
						v-if="message.length"
						dismissible
						color="error"
						outlined
						class="mx-3"
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
									:label="$t('enterEmail')"
									:rules="emailRules"
									:disabled="loading"
								></v-text-field>
							</v-col>
							<v-col cols="12" sm="12">
								<v-card-actions>
									<v-row
										align="center"
										justify="space-between"
									>
										<v-btn
											:block="$vuetify.breakpoint.xs"
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
									<v-row align="end" justify="end">
										<v-btn
											:block="$vuetify.breakpoint.xs"
											color="secondary"
											class="px-16"
											rounded
											:disabled="loading"
											@click="handleAction"
										>
											{{ $t("resetPassword") }}
										</v-btn>
									</v-row>
								</v-card-actions>
							</v-col>
						</v-row>
					</v-container>
				</v-form>
			</div>
		</v-container>
		<v-overlay :value="loading">
			<v-progress-circular indeterminate size="64"></v-progress-circular>
			<p class="mt-8">{{ $t("loading") }}</p>
		</v-overlay>
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
