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

				<!-- <v-card>
					<v-card-text>
						getModelView: {{ getModelView }}
					</v-card-text>
					<v-card-text>
						enableRadiusField: {{ enableRadiusField }}
					</v-card-text>
					<v-card-text> custom_list: {{ custom_list }} </v-card-text>
					<v-card-text>
						option_selected: {{ option_selected }}
					</v-card-text>
					<v-card-text>
						type_selected: {{ type_selected }}
					</v-card-text>
					<v-card-text>
						hasTypeSelected: {{ hasTypeSelected }}
					</v-card-text>
					<v-card-text>
						getCustomList: {{ getCustomList }}
					</v-card-text>
					<v-card-text> getId: {{ getId }} </v-card-text>
				</v-card> -->

				<!-- <v-divider class="my-4"></v-divider> -->

				<!-- btn group -->
				<!-- <v-row no-gutters align="center" justify="center">
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
				</v-row> -->
			</v-form>

			<!-- <v-divider v-if="hasTypeSelected" class="my-8"></v-divider> -->

			<!-- select radio group bar -->
			<v-card class="pa-10 my-4">
				<v-row no-gutters>
					<v-col cols="12" sm="12" md="12" lg="12" align="left">
						<v-card-title>List items</v-card-title>
						<v-card-subtitle>
							Indicate the charging method you want to use
						</v-card-subtitle>
						<v-card-text>
							<v-radio-group
								row
								v-model="option_selected"
								@onChange="updateTypeSelected"
							>
								<v-radio
									label="Load items manually"
									value="manually"
								></v-radio>
								<v-radio
									label="Upload file"
									value="upload"
								></v-radio>
							</v-radio-group>
						</v-card-text>
					</v-col>
				</v-row>

				<CreateItem
					v-if="showItems"
					:modelSelected="getModelView"
					:customList="custom_list"
					:entities="getListItems"
				></CreateItem>
			</v-card>
		</v-layout>
	</v-container>
</template>

<script lang="ts">
	import Vue from "vue";
	import { Type } from "../../../../interfaces/list";
	import Alertize from "../../../../components/Alertize.vue";
	import CreateItem from "./../../Items/Create/create.vue";
	import CustomListInput from "../customListInput.vue";
	import {
		CustomListDataCreate,
		CustomList,
	} from "../../../../interfaces/custom_list";
	import { last, toNumber } from "lodash";

	export default Vue.extend({
		name: "ListShow",
		props: {},
		components: { Alertize, CreateItem, CustomListInput },
		data: () => ({
			title: "Show",
			message: "",
			type: "info",
			valid: false,

			option_selected: "manually",
			custom_list: { active: true } as CustomListDataCreate,
			type_selected: {} as Type,
			model_view: undefined,
		}),
		async created() {
			this.setLoading(true);
			let typeIdSetted = undefined;
			await this.dispatchTypes();
			await this.dispatchShowCustomList().then((result: CustomList) => {
				this.custom_list = result;
				typeIdSetted = this.custom_list?.custom_list_type_id;
			});
			await this.dispatchListItems();
			let customTypes = this.getCustomTypes;
			if( Array.isArray(customTypes) ){
				let type = customTypes.find( t => {return t.id == typeIdSetted});
				if( type ){
					await this.dispatchModelView(type);
				}
			}
			this.setLoading(false);
		},
		async mounted() {},
		computed: {
			getListItems(): any[] {
				const elements = this.$store.state.listItem.entities;
				return elements;
			},
			getCustomList() {
				return this.$store.state.custom_list.custom_list;
			},
			getModelView() {
				return this.$store.state.custom_list.model_view;
			},
			enableRadiusField(): Boolean {
				return (
					Object.keys(this.type_selected).length > 0 &&
					this.type_selected.key === "lat_long"
				);
			},
			hasTypeSelected(): Boolean {
				return Object.keys(this.type_selected).length > 0;
			},
			showItems(): Boolean {
				return (
					this.option_selected === "manually"
				);
			},
			getId() {
				let pathArray: String[] = this.$route.path.split("/");
				const lastItem = last(pathArray);
				return !isNaN(toNumber(lastItem)) ? toNumber(lastItem) : NaN;
			},
			getCustomTypes(): Type[] {
				return this.$store.state.custom_list.types;
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
				return await valid;
			},
			async handleSubmit() {
				if (!(await this.validate())) return;
				await this.dispatchCreateCustomList();
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
			async dispatchListItems() {
				//let id_selected = this.custom_list.id;
				if (isNaN(this.custom_list.id)) return [];
				return this.$store.dispatch("listItem/getAllByCustomId", this.custom_list, {
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
			async dispatchShowCustomList() {
				if (isNaN(this.getId)) return;
				return this.$store.dispatch("custom_list/show", this.getId, {
					root: true,
				});
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
