<template>
	<v-card
		elevation="0"
		justify="start"
		align="center"
		class="grey lighten-3 py-4 my-4"
	>
		<!-- <DividerForm name="Begin Line Association"></DividerForm>
		<v-card v-if="line_association">
			<v-card-title>line_association: </v-card-title>
			<v-card-text>{{ line_association }}</v-card-text>
		</v-card>
		<DividerForm name="getLineItems"></DividerForm>
		<v-card>
			<v-card-title>getLineItems: </v-card-title>
			<v-card-text>{{ getLineItems }}</v-card-text>
		</v-card> -->

		<v-form
			ref="form"
			justify="start"
			align="center"
			v-model="valid"
			lazy-validation
		>
			<v-container>
				<v-row
					no-gutters
					dense
					align="start"
					self="start"
					justify="start"
					fluid
				>
					<!-- Associated Line -->
					<v-col
						class="pe-lg-16 pa-0"
						cols="12"
						sm="12"
						md="12"
						lg="12"
					>
						<DividerForm name="Associated Line"></DividerForm>
					</v-col>

					<!-- line_item -->
					<v-col
						class="pe-lg-16 pa-0"
						cols="12"
						sm="12"
						md="4"
						lg="4"
					>
						<CardAutocomplete
							v-model="line_association.line_item_id"
							:items="getLineItems"
							item_text="name"
							item_value="id"
							hint="Line Items"
							reference="addons"
							placeholder="Selected Line Items"
							label="Line Items"
							:rules="line_item_id_rules"
							@click="fetchLineItems"
							:required="true"
						></CardAutocomplete>
					</v-col>

					<!-- line_association.start_date -->
					<v-col
						class="pe-lg-16 pa-0"
						cols="12"
						sm="12"
						md="4"
						lg="4"
					>
						<v-card
							elevation="0"
							class="pa-2"
							outlined
							tile
							color="rgb(0, 0, 0, 0.0)"
						>
							<DatePicker
								label="Start Date"
								v-model="line_association.start_date"
								:min_date="getToday"
								:rules="start_date_rules"
								:required="true"
							></DatePicker>
						</v-card>
					</v-col>

					<!-- line_association.end_date-->
					<v-col
						class="pe-lg-16 pa-0"
						cols="12"
						sm="12"
						md="4"
						lg="4"
					>
						<v-card
							elevation="0"
							class="pa-2"
							outlined
							tile
							color="rgb(0, 0, 0, 0.0)"
						>
							<DatePicker
								label="End Date"
								v-model="line_association.end_date"
								:min_date="getAssociationMinDate"
								:rules="end_date_rules"
								:is_end="true"
								:required="true"
							></DatePicker>
						</v-card>
					</v-col>

					<!-- Actions -->
					<v-row no-gutters dense align="end" justify="end">
						<v-col
							class="pe-lg-16 pa-0"
							cols="12"
							sm="12"
							md="12"
							lg="12"
						>
							<v-card
								elevation="0"
								class="pa-2"
								outlined
								tile
								color="rgb(0, 0, 0, 0.0)"
							>
								<v-row align="center" justify="end">
									<v-btn
										class="me-4 mb-1"
										color="secondary"
										outlined
										elevation="0"
										raised
										rounded
										@click="handleSubmitAssociated"
									>
										<v-icon dark> mdi-plus </v-icon>
										{{ $t("add-associated-line") }}
									</v-btn>
								</v-row>
							</v-card>
						</v-col>
					</v-row>
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
	import { initAssociationCreative } from "../../../../utils/fields";
	import { AssociationDataCreate } from "../../../../interfaces/creativeAssociation";
	import { isEmpty } from "lodash";
	import { LineItemFilters } from "../../../../interfaces/line_item";
	import { SortingOption } from "../../../../interfaces/paginated";
	import { getCreativeTypeByTemplateId } from "../../../../utils/resolveObjectArray";

	export default Vue.extend({
		name: "AssociatedLineForm",
		props: {
			creative: {
				type: Object,
				default: function () {
					return {};
				},
			},
		},
		components: {
			CardTextField,
			DatePicker,
			DividerForm,
			CardAutocomplete,
		},
		data: () => ({
			valid: true,
			line_association: {} as AssociationDataCreate,
			line_item_id_rules: [],
			start_date_rules: [],
			end_date_rules: [],
			filters: {} as LineItemFilters,
			options: {
				sort: "",
				order: "asc",
			} as SortingOption,
		}),
		created() {
			this.line_association = initAssociationCreative(this.creative);
		},
		mounted() {
			this.setCreativeToAssign();
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
				return this.moment().format("YYYY-MM-DD HH:mm:ss");
			},
			getAssociationMinDate() {
				return this.moment(this.line_association.start_date).format(
					"YYYY-MM-DD HH:mm:ss"
				);
			},
			getLineItems() {
				return this.$store.state.line_item.lineItems;
			},
			getCreativeTypes() {
				return this.$store.state.creative.creative_types;
			},
		},
		methods: {
			async getCreativeTypeDescription() {
				return getCreativeTypeByTemplateId(
					this.getCreativeTypes,
					this.creative.creative_type_id
				)?.name;
			},
			async setFilter(params: { key: string | number; value: any }) {
				this.filters = {} as LineItemFilters;
				this.filters[params.key] = params.value || "";
			},
			async validate() {
				return await this.$refs.form.validate();
			},

			async addValidations() {
				this.line_item_id_rules = [this.getRules.isRequired];
				this.start_date_rules = [
					this.getRules.isRequired,
					this.getRules.isAfterToday,
				];
				this.end_date_rules = [
					this.getRules.isRequired,
					this.getRules.isAfterCompare(
						this.line_association.end_date,
						this.line_association.start_date
					),
				];
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
					await this.associateLineItem();
					await this.setLoading(false);
				} catch (error) {
					console.error("handleSubmitAssociated", { error: error });
					await this.setLoading(false);
				}
			},

			async setLoading(_loading: Boolean) {
				this.$store.state.proccess.loading = _loading;
			},
			async setCreativeToAssign() {
				this.line_association.creative_id = this.creative.id;
				this.filters = {
					line_item_type: {
						description: this.creative.type.description,
					},
					advertiser_id: this.creative.creative_advertiser.advertiser_id,
				} as LineItemFilters;
			},
			async fetchLineItems() {
				if (!isEmpty(this.getLineItems)) return;
				this.setLoading(true);
				await this.$store.dispatch("line_item/all", {
					filters: this.filters,
					options: this.options as SortingOption,
				});
				this.setLoading(false);
			},
			async associateLineItem() {
				await this.$store.dispatch(
					"creative/associateLineItem",
					await this.prepareAssociationDataCreate()
				);
			},
			async prepareAssociationDataCreate() {
				return {
					creative_id: this.creative.id,
					line_item_id: this.line_association.line_item_id,
					start_date: this.moment(
						String(this.line_association.start_date)
					).format("YYYY-MM-DD HH:mm:ss"),
					end_date: this.moment(
						String(this.line_association.end_date)
					).format("YYYY-MM-DD HH:mm:ss"),
				} as AssociationDataCreate;
			},
		},
		watch: {
			"creative.creative_type_id": function (newVal, oldVal) {
				this.line_association = initAssociationCreative(this.creative);
				this.setCreativeToAssign();
			},
		},
	});
</script>
