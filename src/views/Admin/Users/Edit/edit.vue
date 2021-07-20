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
						<!-- User ID -->
						<v-col cols="12" sm="12" md="2">
							<v-card
								elevation="0"
								class="pa-2"
								outlined
								tile
								color="rgb(0, 0, 0, 0.0)"
							>
								<v-text-field
									v-model="id"
									:hint="$t('users.fields.id')"
									ref="id"
									:placeholder="$t('users.fields.id')"
									:label="$t('users.fields.id')+'*'"
									disabled
									class="label-fixed disabled"
								></v-text-field>
							</v-card>
						</v-col>
						<!-- User Email -->
						<v-col cols="12" sm="12" md="4">
							<v-card
								elevation="0"
								class="pa-2"
								outlined
								tile
								color="rgb(0, 0, 0, 0.0)"
							>
								<v-text-field
									v-model="email"
									hint="E-mail"
									ref="email"
									placeholder="E-mail"
									label="E-mail*"
									disabled
									class="label-fixed disabled"
								></v-text-field>
							</v-card>
						</v-col>
					</v-row>

					<v-row no-gutters>
						<!-- User Name -->
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
									:hint="$t('users.fields.name')"
									ref="name"
									:placeholder="$t('users.fields.name')"
									:label="$t('users.fields.name')"
									class="label-fixed"
									counter="255"
								></v-text-field>
							</v-card>
						</v-col>

						<!-- User Last Name -->
						<v-col cols="12" sm="12" md="6">
							<v-card
								elevation="0"
								class="pa-2"
								outlined
								tile
								color="rgb(0, 0, 0, 0.0)"
							>
								<v-text-field
									v-model="last_name"
									:rules="[
										getRules.isRequired,
										getRules.isMinLength,
										getRules.isMaxLength,
									]"
									:hint="$t('users.fields.last_name')"
									ref="name"
									:placeholder="$t('users.fields.last_name')"
									:label="$t('users.fields.last_name')"
									class="label-fixed"
									counter="255"
								></v-text-field>
							</v-card>
						</v-col>
					</v-row>

					<v-row no-gutters>
						<!-- User Role -->
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
									v-model="role_id"
									:rules="[
										getRules.isRequired,
										getRules.isNumber,
									]"
									:hint="$t('users.fields.role')"
									:items="getRoles"
									ref="role_id"
									item-text="description"
									item-value="id"
									:label="$t('users.fields.role')+'*'"
									:placeholder="$t('users.fields.role')"
								></v-autocomplete>
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
									:label="`${active ? 'Active' : 'Inactive'}`"
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
								<v-card-text
									align="start"
									class="secondary--text info-message"
								>
									{{ $t("common.labels.mandatory") }}
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
										{{ $t("save") }}
									</v-btn>
									<v-btn
										type="button"
										rounded
										color="secondary"
										class="mx-2 px-8"
										@click="redirectTo"
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
		User,
		UserDataCreate,
		UserDataUpdate,
		Role,
	} from "../../../../interfaces/user";
	import { isNaN, last, toNumber } from "lodash";

	import Alertize from "../../../../components/Alertize.vue";
	import { Notification } from "../../../../interfaces/proccess";

	import {
		isRequired,	
		isNumber,	
		isMinLength,
		isMaxLength,
	} from "../../../../services/rule-services";

	export default Vue.extend({
		name: "UserCreate",
		props: {},
		components: { Alertize },
		data: () => ({
			title: "User Create",
			user: {} as UserDataCreate,
			valid: false,
			loading: false,
			message: "",
			type: "info",

			id: undefined,
			name: "",
			last_name: "",
			email: "",
			role_id: undefined,
			active: true,
		}),
		created() {},
		async mounted() {
			try {
				this.setLoading(true);
				await this.dispatchRoles();
				this.getId;
				this.user = await this.dispatchShowUser();
				this.id = this.user.id;
				this.name = this.user.name;
				this.last_name = this.user.last_name;
				this.email = this.user.email;
				this.role_id = this.user.role_id;
				this.active = this.user.active;
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
			getRoles(): Role[] {
				return this.$store.state.user.roles;
			},
			getUser(): User {
				return this.user;
			},
			isAlertize(): Boolean {
				return this.$store.state.proccess.alertize;
			},
			getRules() {
				return {
					isRequired,
					isNumber,
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
				this.$router.push({ name: "UsersIndex" });
			},
			setLoading(_loading: Boolean) {
				this.$store.state.proccess.loading = _loading;
			},
			toggleStatus(status: boolean) {
				this.active = Boolean(status);
			},
			async dispatchRoles() {
				return this.$store.dispatch("user/listRoles", {
					root: true,
				});
			},
			async dispatchShowUser() {
				return this.$store.dispatch("user/show", this.id, {
					root: true,
				});
			},
			async update() {
				this.user = {
					id: this.id,
					name: this.name,
					last_name: this.last_name,
					email: this.email,
					role_id: this.role_id,
					active: this.active,
				} as UserDataUpdate;

				return this.$store.dispatch(
					"user/update",
					{
						user: this.user,
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
