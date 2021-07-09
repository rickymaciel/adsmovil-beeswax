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
									{{ $t("init.title") }}
								</v-card-title>

								<Alertize></Alertize>

								<v-card-text>
									{{ setToken }}
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
														label="E-mail"
														:rules="[rules.isRequired,rules.isEmail]"
														:disabled="isLoading"
													></v-text-field>
												</v-col>
												<v-col cols="12" sm="12">
													<v-text-field
														v-model="name"
														ref="name"
														class="label-fixed"
														value=""
														:label="$t('users.fields.name')"
														:rules="[rules.isRequired]"
														:disabled="isLoading"
													></v-text-field>
												</v-col>
												<v-col cols="12" sm="12">
													<v-text-field
														v-model="last_name"
														ref="last_name"
														class="label-fixed"
														value=""
														:label="$t('users.fields.last_name')"
														:rules="[rules.isRequired]"
														:disabled="isLoading"
													></v-text-field>
												</v-col>
												<v-col cols="12" sm="12"> 
													<v-text-field
														v-model="password"
														type="password"
														ref="password"
														class="label-fixed"
														value=""
														:label="$t('users.fields.password')"
														:rules="[rules.isRequired,rules.isMinPassword]"
														:disabled="isLoading"
													></v-text-field>
												</v-col>
												<v-col cols="12" sm="12"> 
													<v-text-field
														v-model="password_confirmation"
														type="password"
														ref="password_confirmation"
														class="label-fixed"
														value=""
														:label="$t('users.fields.password_confirmation')"
														:rules="[rules.isRequired,rules.isMinPassword]"
														:disabled="isLoading"
													></v-text-field>
												</v-col>

												<v-col cols="12" sm="12">
													<v-card-actions class="mt-8">
														<v-row align="end" justify="end">
															<v-btn
																:block="$vuetify.breakpoint.xs"
																color="secondary"
																class="px-16"
																rounded
																:disabled="isLoading"
																@click="handleSubmit"
															>
																{{ $t("init.actions.submit") }}
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
					<v-progress-circular indeterminate size="64"></v-progress-circular>
					<p class="mt-8">{{ $t("loading") }}</p>
				</v-overlay>
			</v-row>
		</v-container>
	</v-main>
</template>

<script lang="ts">
	import Alertize from "../../components/Alertize.vue";
	import { isRequired, isEmail, isMinPassword } from "../../services/rule-services";
	import { last } from "lodash";

	export default {
		name: "Init",
		props: {},

		data: function () {
			return {
				init_token: undefined,
				email: "",
				password: "",
				password_confirmation: "",
				name: "",
				last_name: "",
				valid: false,
				message: "",
				rules: { isRequired, isMinPassword, isEmail },
			};
		},

		created() {},

		mounted() {
			this.setToken;
		},

		computed: {
			setToken() {
				let pathArray: String[] = this.$route.path.split("/");
				const lastItem = last(pathArray);
				this.init_token = lastItem;
			},
			isLoading() {
				return this.$store.state.proccess.loading;
			},
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

			async dispatchAuthInit(initData) {
				return await this.$store.dispatch("auth/init", initData, {
					root: true,
				});
			},

			async handleSubmit() {
				try {
					if (!this.validate()) return;
					
					this.setLoading(true);

					const response = await this.dispatchAuthInit({
						email: this.email,
						name: this.name,
						last_name: this.last_name,
						password: this.password,
						password_confirmation: this.password_confirmation,
						init_token: this.init_token
					});

					// if (response.success) {
					// 	this.$router.push({ name: "CampaignsIndex" });
					// }
					this.setLoading(false);
				} catch (error) {
					this.setLoading(false);
				}
			},
		},
	};
</script>
