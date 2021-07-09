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
								<v-card-title class="form-title text-capitalize">
									{{ $t("forgotPassword.title") }}
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
														label="Email"
														:rules="[rules.isRequired,rules.isEmail]"
														:disabled="isLoading"
													></v-text-field>
												</v-col>
												<v-col cols="12" sm="12">
													<v-card-actions class="mt-8">
														<v-row align="center" justify="center">
															<v-btn
																:block="$vuetify.breakpoint.xs"
																color="secondary"
																class="px-16"
																rounded
																:disabled="isLoading"
																@click="handleSubmit"
															>
																{{ $t("forgotPassword.actions.submit") }}
															</v-btn>
														</v-row>
													</v-card-actions>
												</v-col>
											</v-row>
											<v-row>
												<v-col cols="12" sm="12">
													<v-btn plain to="/auth/login">{{ $t("common.actions.backToLogin") }}</v-btn>
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
					<v-progress-circular indeterminate size="64"></v-progress-circular>
					<p class="mt-8">{{ $t("loading") }}</p>
				</v-overlay>
			</v-row>
		</v-container>
	</v-main>
</template>

<script lang="ts">

    import Alertize from "../../components/Alertize.vue";
	import { isRequired, isEmail, isMinLength } from "../../services/rule-services";
	
    export default {
		name: "Login",
		props: {},

		data: function () {
			return {
				email: "",
				valid: false,
				message: "",
				rules: { isRequired, isMinLength, isEmail },
			};
		},

		created() {},
		mounted() {},
		computed: {
            isLoading() {
				return this.$store.state.proccess.loading;
			}
        },
		components: { Alertize },
		methods: {
            validate() {
				let form = this.$refs.form;
				return form.validate();
			},
			setLoading(_loading: Boolean) {
				this.$store.state.proccess.loading = _loading;
			},
			async dispatchForgot(email) {
				return await this.$store.dispatch("auth/forgotPassword", {email}, {
					root: true,
				});
			},
			async handleSubmit() {
				try {
					if (!this.validate()) return;					
					this.setLoading(true);
					const response = await this.dispatchForgot(this.email);
                    this.setLoading(false);
				} catch (error) {
					this.setLoading(false);
				}
			},
			backToLogin() {
				this.$router.push("/auth/login");
			}
		},            
	};
</script>

<style src="./index.scss" lang="scss" />
