<template>
	<v-container class="my-0">
		<Alertize :message="message" :type="type"></Alertize>
		<v-layout column>
			<v-form
				ref="form"
				justify="center"
				align="center"
				v-model="valid"
				lazy-validation
			>
				<CustomListInput
					:custom_list="custom_list"
					:is_edit="custom_list.id > 0"
					:enable_radius_field="enableRadiusField"
					@update-type-selected="updateTypeSelected"
				></CustomListInput>

				<v-divider class="my-4"></v-divider>

				<!-- btn group -->
				<v-row no-gutters align="center" justify="center">
					<v-col cols="12" sm="12" md="6" lg="8">
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

					<v-col cols="12" sm="12" md="6" lg="4">
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
									{{ $t("save & continue") }}
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
			</v-form>
		</v-layout>
	</v-container>
</template>

<script lang="ts">
	import Vue from "vue";
	import { Type } from "../../../../interfaces/list";
	import Alertize from "../../../../components/Alertize.vue";
	import CustomListInput from "../customListInput.vue";
	import { CustomListDataCreate } from "../../../../interfaces/custom_list";
	import {
		isRequired,
	} from "../../../../services/rule-services";

	export default Vue.extend({
		name: "ListCreate",
		props: {},
		components: {
			Alertize,
			CustomListInput,
		},
		data: () => ({
			title: "Create",
			message: "",
			type: "info",
			valid: false,

			option_selected: undefined, //
			custom_list: { active: true } as CustomListDataCreate,
			type_selected: {} as Type,
		}),
		async created() {
			await this.dispatchTypes();
		},
		async mounted() {},
		computed: {
			enableRadiusField(): Boolean {
				return (
					Object.keys(this.type_selected).length > 0 &&
					this.type_selected.key === "lat_long"
				);
			},
			getRules() {
				return {
					isRequired,
				};
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
				this.$router.push({ name: "CustomListIndex" });
			},
			async validate() {
				let form = this.$refs.form;
				const valid = await form.validate();
				console.log("validate", {
					form: form,
					validate: valid,
				});
				return await valid;
			},
			async handleSubmit() {
				if (!(await this.validate())) return;
				this.dispatchCreateCustomList().then((result: any) => {
					this.$router.push({
						name: "CustomListShow",
						params: { id: result.id },
					});
				});
			},
			setLoading(_loading: Boolean) {
				this.$store.state.proccess.loading = _loading;
			},
			handleCancel() {
				this.$router.push({ name: "CustomListIndex" });
			},
			resetModelView() {
				this.$store.state.custom_list.model_view = "";
			},
			async dispatchTypes() {
				return this.$store.dispatch("custom_list/getTypes", {
					root: true,
				});
			},
			async dispatchModelView(type: Type) {
				return this.$store.dispatch(
					"custom_list/getViewByTypeSelected",
					type,
					{
						root: true,
					}
				);
			},
			async dispatchCreateCustomList() {
				return this.$store.dispatch(
					"custom_list/createCustomList",
					this.custom_list,
					{
						root: true,
					}
				);
			},
			async updateTypeSelected(data: Type) {
				this.resetModelView();
				this.type_selected = data;

				switch (this.option_selected) {
					case "manually":
						await this.dispatchModelView(data);

						break;
					case "upload":

						break;
					default:
						break;
				}
			},

			handleTypeModelChange() {},
		},

		watch: {
			async option_selected(val, old) {
				switch (val) {
					case "manually":
						await this.dispatchModelView(this.type_selected);
						break;

					default:
						break;
				}
			},
		},
	});
</script>
