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
				<v-container>
					<v-row no-gutters>
						<!-- List Name -->
						<v-col cols="12" sm="12" md="6" lg="3">
							<v-card
								elevation="0"
								class="pa-2"
								outlined
								tile
								color="rgb(0, 0, 0, 0.0)"
							>
								<v-text-field
									v-model="name"
									hint="List Name"
									ref="name"
									placeholder="List Name"
									label="List Name*"
									class="label-fixed"
									counter="255"
								></v-text-field>
							</v-card>
						</v-col>

						<!-- List Type -->
						<v-col cols="12" sm="12" md="6" lg="3">
							<v-card
								elevation="0"
								class="pa-2"
								outlined
								tile
								color="rgb(0, 0, 0, 0.0)"
							>
								<v-autocomplete
									class="label-fixed"
									v-model="typeIdSelected"
									:hint="`List Type`"
									:items="getTypes"
									ref="typeIdSelected"
									item-text="name"
									item-value="id"
									label="List Type*"
									placeholder="List Type"
									@change="handleTypeModelChange"
								></v-autocomplete>
							</v-card>
						</v-col>
					</v-row>

					<v-row no-gutters>
						<!-- List Default Radius (km) -->
						<v-col cols="12" sm="12" md="6" lg="3">
							<v-card
								elevation="0"
								class="pa-2"
								outlined
								tile
								color="rgb(0, 0, 0, 0.0)"
							>
								<v-text-field
									v-model="radius"
									hint="Default Radius (km)"
									ref="radius"
									placeholder="Default Radius (km)"
									label="Default Radius (km)"
									class="label-fixed"
									counter="255"
								></v-text-field>
							</v-card>
						</v-col>
					</v-row>

					<v-row no-gutters>

						<!-- Status -->
						<v-col cols="12" sm="12" md="6" lg="3">
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
								>
								</v-switch>
							</v-card>
						</v-col>
					</v-row>

					<v-card
						class="pa-2 mt-2"
					>
						<v-row no-gutters>
							<v-col cols="12" sm="12" md="12" lg="12" align="left">
								<strong>List items</strong>
							</v-col>
						</v-row>
						<v-row no-gutters>
							<v-radio-group
								row
								@change="handleTypeModelChange"
								v-model="optionSelected"
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
						</v-row>
					</v-card>

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
									* Mandatory fields
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
				</v-container>
			</v-form>
			<CreateItem
				:modelSelected="modelView"
			></CreateItem>
		</v-layout>
	</v-container>
</template>

<script lang="ts">
	import Vue from "vue";
	import {
		List,
		ListDataCreate,
		Type,
	} from "../../../../interfaces/list";
	import { isEmpty, isNull, isUndefined, isNaN } from "lodash";

	import Alertize from "../../../../components/Alertize.vue";
	import CreateItem from "./../../Items/Create/create.vue";

	export default Vue.extend({
		name: "ListCreate",
		props: {},
		components: { Alertize, CreateItem },
		data: () => ({
			title: "Create",
			list: {} as ListDataCreate,
			message: "",
			type: "info",
			valid: false,
			active: true,
			name: "",
			radius: undefined,
			typeIdSelected: undefined,
			modelView: undefined,
			optionSelected: undefined
		}),
		created() {},
		async mounted() {},
		computed: {
			getTypes(): Type[] {
				//return this.$store.state.list.types;
				const data: Type[] = [
					{	id: 1,
						key: "1",
						name: "App Bundle List" },
					{	id: 2,
						key: "2",
						name: "App ID List" },
					{	id: 3,
						key: "3",
						name: "Deal ID" },
					{	id: 4,
						key: "4",
						name: "Domain ID List" },
					{	id: 5,
						key: "5",
						name: "IP Address List" },
					{	id: 6,
						key: "6",
						name: "Lat Long List" },
					{	id: 7,
						key: "7",
						name: "Placement ID List" },
					{	id: 8,
						key: "8",
						name: "Publisher ID List" },
					{	id: 9,
						key: "9",
						name: "Site ID List" },
					{	id: 10,
						key: "10",
						name: "Zip Code List" }
				]
				return data;
			},
			getList(): List {
				return this.list;
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
					list: this.list,
				});
				return await valid;
			},
			async handleSubmit() {
				console.log("--- handleSubmit ---");
			},
			setLoading(_loading: Boolean) {
				this.$store.state.proccess.loading = _loading;
			},
			handleCancel() {
				this.$router.push({ name: "CustomListIndex" });
			},
			handleTypeModelChange(){
				console.log("--- Model Seelcted: ", this.optionSelected);
				this.resetModelView();
				switch (this.optionSelected) {
					case "manually":
						console.log("--- Método Manual ---");
						switch (this.typeIdSelected) {
							case 1://App Bundle List
								this.modelView = "ModelTree";
								break;
							case 2://App ID List
								this.modelView = "ModelTree";
								break;
							case 3://Deal ID
								this.modelView = "ModelTree";
								break;
							case 4://Domain ID List
								this.modelView = "ModelTree";
								break;
							case 5://IP Address List
								this.modelView = "ModelTree";
								break;
							case 6://Lat Long List
								this.modelView = "modelTwo";
								break;
							case 7://Placement ID List
								this.modelView = "ModelTree";
								break;
							case 8://Publisher ID List
								this.modelView = "ModelTree";
								break;
							case 9://Site ID List
								this.modelView = "ModelTree";
								break;
							case 10://Zip Code List
								this.modelView = "ModelOne";
								break;
							default:
								break;
						}
						break;
					case "upload":
						console.log("--- Método Automático ---");

						break;
					default:
						break;
				}
			},
			resetModelView(){
				this.modelView = undefined;
			}
		},
	});
</script>
