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
			>
				<v-container>
					<v-row no-gutters>
						<!-- E-mail -->
						<!--
						<v-col cols="12" sm="12" md="6">
							<v-card
								elevation="0"
								class="pa-2"
								outlined
								tile
								color="rgb(0, 0, 0, 0.0)"
							>
								<v-text-field
									v-model="email"
									:rules="[
										getRules.isRequired,
										getRules.isEmail 
									]"
									hint="E-mail"
									ref="name"
									placeholder="E-mail"
									label="E-mail*"
									class="label-fixed"
									counter="255"
								></v-text-field>
							</v-card>
						</v-col>
						-->
						<v-col cols="12" sm="12" md="6" lg="6">
							<CardTextField
								v-model="email"
								:rules="[
									getRules.isRequired,
									getRules.isEmail 
								]"
								:hint="$t('users.fields.mail')"
								:reference="name"
								:placeholder="$t('users.fields.mail')"
								:label="$t('users.fields.mail')"
								:counter="255"
								:required="true"
								:error_messages="getFail('email')"
							></CardTextField>
						</v-col>

						<!-- Role -->
						<!--
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
									:label="$t('users.fields.role') + '*'"
									:placeholder="$t('users.fields.role')"
								></v-autocomplete>
							</v-card>
						</v-col>
						-->
						<v-col cols="12" sm="12" md="6" lg="6">
							<CardAutocomplete
								v-model="role_id"
								:rules="[
									getRules.isRequired,
									getRules.isNumber,
								]"
								:items="getRoles"
								item_text="description"
								item_value="id"
								ref="role_id"
								:hint="$t('users.fields.role')"
								:label="$t('users.fields.role')"
								:placeholder="$t('users.fields.role')"
								:chips="true"
								:deletable_chips="true"
								:multiple="false"
								:small_chips="true"
								:dense="false"
								:required="true"
								:error_messages="getFail('role_id')"
							></CardAutocomplete>
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
									{{ $t("common.labels.mandatory") }}
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
										{{ $t("common.actions.save") }}
									</v-btn>
									<v-btn
										rounded
										color="secondary"
										class="mx-2 px-8"
										@click="handleCancel"
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
	import {User, UserDataCreate, Role} from "../../../../interfaces/user";
	import Alertize from "../../../../components/Alertize.vue";
	import CardTextField from "../../../../components/Content/CardTextField.vue";
	import CardAutocomplete from "../../../../components/Content/CardAutocomplete.vue";
	import { isRequired, isEmail, isNumber } from "../../../../services/rule-services";
	import { getError } from "../../../../utils/resolveObjectArray";

	export default Vue.extend({
		name: "UserCreate",
		props: {},
		components: { 
			Alertize,
			CardTextField,
			CardAutocomplete, 
		},
		data: () => ({
			title: "Create",
			user: {} as UserDataCreate,
			valid: true,
			email: "",
			role_id: undefined
		}),
		created() {},
		async mounted() {
			this.setLoading(true);
			await this.dispatchRoles();
			this.setLoading(false);
		},
		computed: {
			getRoles(): Role[] {
				return this.$store.state.user.roles ? this.$store.state.user.roles : [];
			},
			getUser(): User {
				return this.user;
			},
			getRules() {
				return {
					isRequired,
					isEmail,
					isNumber
				};
			},
			getFails() {
				return this.$store.state.proccess.errors;
			},
		},
		methods: {
			getFail(index: any) {
				return getError(this.getFails, index);
			},
			setNotification(notification: Notification) {
				return this.$store.dispatch(
					"proccess/setNotification",
					notification,
					{ root: true }
				);
			},
			async validate() {
				return await this.$refs.form.validate();
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
				this.$router.push({ name: "UsersIndex" });
			},
			async dispatchRoles() {
				return this.$store.dispatch("user/listRoles", {
					root: true,
				});
			},
			async create() {
				this.user = {
					email: this.email,
					role_id: this.role_id,
				} as UserDataCreate;
				return this.$store.dispatch("user/create", this.user, {
					root: true,
				});
			},
		},
	});
</script>
