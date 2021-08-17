<template>
	<v-card elevation="0" justify="start" align="center" class="grey lighten-3">
		<!-- Associated Creatives Form -->
		<v-form
			ref="form"
			justify="start"
			align="center"
			v-model="valid"
			lazy-validation
		>
			<v-container>
				<v-row dense>
					<!-- <v-col cols="12" sm="12" md="12" lg="12" class="mt-2">
						<v-card>
							<v-card-text>
								{{ line_item }}
							</v-card-text>
						</v-card>
						<v-card>
							<v-card-text>
								{{ association }}
							</v-card-text>
						</v-card>
					</v-col> -->
					<!-- Associates Creatives -->
					<v-col cols="12" sm="6" md="6" lg="3" class="mt-2">
						<CardAutocomplete
							v-model="association.creative_id"
							v-numeric
							:items="getCreatives"
							item_text="value"
							item_value="id"
							:rules="creative_id_rules"
							hint="Associate Creatives"
							reference="creative_id"
							placeholder="Select Creative"
							label="Associate Creatives"
							:chips="true"
							:deletable_chips="true"
							:multiple="false"
							:small_chips="true"
							:dense="false"
							:required="true"
							@change="handleChangeCreative"
						></CardAutocomplete>
					</v-col>

					<!-- Start Date -->
					<v-col cols="12" sm="6" md="6" lg="3">
						<v-card
							elevation="0"
							class="pa-2"
							outlined
							tile
							color="rgb(0, 0, 0, 0.0)"
						>
							<DatePicker
								label="Start Date"
								v-model="association.start_date"
								:min_date="getToday"
								:rules="start_date_rules"
								:required="true"
							></DatePicker>
						</v-card>
					</v-col>

					<!-- End Date -->
					<v-col cols="12" sm="6" md="6" lg="3">
						<v-card
							elevation="0"
							class="pa-2"
							outlined
							tile
							color="rgb(0, 0, 0, 0.0)"
						>
							<DatePicker
								label="End Date"
								v-model="association.end_date"
								:min_date="getMinDate"
								:rules="end_date_rules"
								:is_end="true"
								:required="true"
							></DatePicker>
						</v-card>
					</v-col>

					<!-- Actions -->
					<v-col cols="12" sm="6" md="6" lg="3">
						<v-card
							elevation="0"
							class="pt-8"
							outlined
							tile
							color="rgb(0, 0, 0, 0.0)"
						>
							<v-row align="center" justify="end">
								<v-btn
									rounded
									color="secondary"
									class="ma-2 px-8"
									@click="handleSubmitAssociated"
								>
									{{ $t("add-associated-creative") }}
								</v-btn>
							</v-row>
						</v-card>
					</v-col>

					<v-layout column class="pb-5 pl-5 pr-5">
						<AssociationTable
							:headers="prepareTableHeaders"
							:line_item="getLineItem"
							@delete-all-selected="setDeleteAll"
						></AssociationTable>
					</v-layout>

					<!-- Actions -->
					<v-col cols="12" sm="12" md="12" lg="12">
						<v-card
							elevation="0"
							class="pt-8"
							outlined
							tile
							color="rgb(0, 0, 0, 0.0)"
						>
							<v-row align="center" justify="end">
								<v-btn
									rounded
									color="secondary"
									class="ma-2 px-8"
									@click="handleActivate"
									:disabled="!associated_creative"
								>
									{{ $t("save") }}
								</v-btn>
								<v-btn
									rounded
									color="secondary"
									class="ma-2 px-8"
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
	</v-card>
</template>

<script lang="ts">
import Vue from "vue";
import {
	isRequired,
	isNumber,
	isAfterToday,
	isAfterCompare,
} from "../../../../services/rule-services";
import DatePicker from "../../../../components/Content/DatePicker.vue";
import DividerForm from "../../../../components/Content/DividerForm.vue";
import CardTextField from "../../../../components/Content/CardTextField.vue";
import CardAutocomplete from "../../../../components/Content/CardAutocomplete.vue";
import { SortingOption } from "../../../../interfaces/paginated";
import { AssociationDataCreate } from "../../../../interfaces/creativeAssociation";
import AssociationTable from "./AssociationTable.vue";
import { isNull, isUndefined } from "lodash";

const DATE_TIME_FORMAT = "YYYY-MM-DD HH:mm:ss";
//const DATE_FORMAT = "DD-MM-YYYY";

export default Vue.extend({
	name: "AssociatedCreativesForm",
	props: {
		line_item: {
			type: Object,
			default: function () {
				return {};
			},
		},
		entities: {
			type: Array,
			default: function () {
				return [];
			},
		},
	},
	components: {
		CardTextField,
		DatePicker,
		DividerForm,
		CardAutocomplete,
		AssociationTable,
	},
	data: () => ({
		valid: true,
		filters: {},
		options: {
			sort: "id",
			order: "desc",
		} as SortingOption,
		association: {} as AssociationDataCreate,
		creative_id_rules: [],
		start_date_rules: [],
		end_date_rules: [],
		creativeSelected: undefined,
		delete_all_performe: false,
		associated_creative: false,
	}),
	created() {},
	async mounted() {
		this.setLoading(true);
		await this.dispatchShowLineItem(this.getLineItem?.id);
		await this.dispatchCreatives();
		this.setLoading(false);
	},
	computed: {
		getRules() {
			return {
				isRequired,
				isNumber,
				isAfterToday,
				isAfterCompare,
			};
		},

		getToday() {
			return this.moment().format(DATE_TIME_FORMAT);
		},

		getMinDate() {
			if (this.getLineItem?.start_date) {
				return this.moment(this.getLineItem?.start_date).format(
					DATE_TIME_FORMAT
				);
			}
			return undefined;
		},

		getCreatives() {
			return this.$store.state.creative.creatives;
		},

		getCreative() {
			return this.$store.state.creative.creative;
		},

		getLineItem() {
			return this.line_item;
		},

		getEntities(): any[] {
			if (
				!isNull(this.getLineItem?.creative_associations) &&
				!isUndefined(this.getLineItem?.creative_associations)
			) {
				return this.getLineItem.creative_associations;
			}
			return this.entities;
		},

		prepareTableHeaders() {
			return [
				{
					text: "Id",
					align: "center",
					sortable: false,
					filterable: false,
					value: "id",
				},
				{
					text: "Thumbnail",
					align: "center",
					sortable: false,
					filterable: false,
					value: "thumbnail",
				},
				{
					text: "Creative Id",
					align: "center",
					sortable: false,
					filterable: false,
					value: "creative_id",
				},
				{
					text: "Creative Name",
					align: "start",
					sortable: false,
					filterable: false,
					value: "creative_name",
				},
				{
					text: "Size",
					align: "start",
					sortable: false,
					filterable: false,
					value: "size",
				},
				{
					text: "Start Date",
					align: "center",
					sortable: false,
					filterable: false,
					value: "start_date",
				},
				{
					text: "End Date",
					align: "center",
					sortable: false,
					filterable: false,
					value: "end_date",
				},
				{
					text: "",
					align: "center",
					sortable: false,
					value: "actions",
					width: "5%",
				},
			];
		},
	},
	methods: {
		async dispatchCreatives() {
			return this.$store.dispatch("creative/list", {
				filters: {
					creative_type_id: this.getLineItem?.line_item_type_id,
					advertiser_id: this.getLineItem?.advertiser_id,
					active: true,
				},
				options: {
					sort: "name",
					order: "asc",
				},
			});
		},

		async dispatchShowLineItem(id: any) {
			return await this.$store.dispatch("line_item/getDataById", id, {
				root: true,
			});
		},

		async handleChangeCreative(id) {
			if (!isNull(id)) {
				this.setLoading(true);
				this.creativeSelected = undefined;
				await this.$store
					.dispatch("creative/show", id, {
						root: true,
					})
					.then((result: any) => {
						this.creativeSelected = result;
					});
				this.setLoading(false);
				return this.creativeSelected;
			}
			this.creativeSelected = undefined;
			return {};
		},

		async validate() {
			return await this.$refs.form.validate();
		},

		async addValidations() {
			this.creative_id_rules = [this.getRules.isRequired];
			this.start_date_rules = [
				this.getRules.isRequired,
				this.getRules.isAfterToday,
			];
			if (this.creativeSelected) {
				this.end_date_rules = [
					this.getRules.isRequired,
					this.getRules.isAfterCompare(
						this.association.end_date,
						this.association.start_date
					),
				];
			} else {
				this.end_date_rules = [
					(v: any) =>
						Boolean(this.creativeSelected) ||
						this.$t("require-creative"),
				];
			}
		},

		/**
		 * Actions
		 * handleSubmitAssociated
		 */
		async handleSubmitAssociated() {
			try {
				await this.addValidations();
				if (!(await this.validate())) return;
				await this.setLoading(true);
				await this.associateCreative();
				this.associated_creative = true;
				await this.setLoading(false);
			} catch (error) {
				console.error("handleSubmitAssociated", { error: error });
				await this.setLoading(false);
			}
		},

		/**
		 * Activate Line Item
		 * No tocar
		 */
		async handleActivate() {
			this.$emit("line-item-activate");
		},

		/**
		 * Cancel
		 * No tocar
		 */
		async handleCancel() {
			this.$emit("cancel");
		},

		// Que hace? Preguntar a Saul
		async handleSave() {
			if (this.delete_all_performe) {
				await this.deleteAllAssociations();
			}
		},

		async setLoading(_loading: Boolean) {
			this.$store.state.proccess.loading = _loading;
		},

		async associateCreative() {
			await this.$store
				.dispatch("creative/associateLineItem", await this.parsedData())
				.then(
					(result) => {
						this.$refs.form.reset();
						this.dispatchShowLineItem(this.line_item?.id);
					},
					(error) => {
						console.error("-- associateCreative::error", error);
					}
				)
				.catch((error) => {
					console.error(
						"handleAction:associateCreative:catch",
						error
					);
				});
		},

		async deleteAllAssociations() {
			await this.setLoading(true);
			this.getEntities.forEach((element) => {
				this.deleteAssociation(element.id);
			});
			this.dispatchShowLineItem(this.getLineItem?.id);
			await this.setLoading(false);
		},

		async deleteAssociation(id: number) {
			if (isNull(id) || isUndefined(id)) {
				return false;
			}
			try {
				await this.$store
					.dispatch("creative/associateLineItemDelete", id)
					.then(
						(result) => {
							console.log("-- deleteAssociation::success");
						},
						(error) => {
							console.error("-- deleteAssociation::error", error);
						}
					)
					.catch((error) => {
						console.error(
							"handleAction:deleteAssociation:catch",
							error
						);
					});
			} catch (error) {
				console.error("deleteAssociation", { error: error });
			}
		},

		async parsedData() {
			return {
				creative_id: this.creativeSelected.id,
				line_item_id: this.line_item.id,
				start_date: this.moment(
					String(this.association.start_date)
				).format(DATE_TIME_FORMAT),
				end_date: this.moment(String(this.association.end_date)).format(
					DATE_TIME_FORMAT
				),
			} as AssociationDataCreate;
		},

		setDeleteAll(value: any) {
			if (!isNull(value)) {
				this.delete_all_performe = true;
			} else {
				this.delete_all_performe = false;
			}
		},
	},
});
</script>