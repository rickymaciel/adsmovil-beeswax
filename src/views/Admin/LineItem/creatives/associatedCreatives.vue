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

					<!-- Activate -->
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

const DATE_TIME_FORMAT = "YYYY-MM-DD HH:mm:ss";

export default Vue.extend({
	name: "AssociatedCreativesForm",
	props: {
		line_item: {
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
		filters: {},
		options: {
			sort: "",
			order: "asc",
		} as SortingOption,
		association: {} as AssociationDataCreate,
		creative_id_rules: [],
		start_date_rules: [],
		end_date_rules: [],
		creativeSelected: undefined,
	}),
	created() {
		// if (isNull(this.line_item?.id) || isUndefined(this.line_item?.id)) {
		// 	this.line_item = this.getLineItem;
		// 	console.log("--- Line Item Restored:", this.line_item);
		// } else {
		// 	console.log("--- Line Item Received:", this.line_item);
		// }
	},
	async mounted() {
		this.setLoading(true);
		await this.dispatchCreatives();
		// TODO TEST AFTER REMOVE
		await this.dispatchShowLineItem(2);
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
			if (this.creativeSelected?.start_date) {
				return this.moment(this.creativeSelected?.start_date).format(
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
			console.log("--- getLineItem", this.line_item);
			return this.line_item;
		},
	},
	methods: {
		async dispatchCreatives() {
			return this.$store.dispatch("creative/list");
		},

		async dispatchShowLineItem(id: any) {
			console.log("--- dispatchShowLineItem(id)", id);
			return await this.$store.dispatch("line_item/show", id, {
				root: true,
			});
		},

		async handleChangeCreative(id) {
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
				await this.setLoading(false);
			} catch (error) {
				console.error("handleSubmitAssociated", { error: error });
				await this.setLoading(false);
			}
		},

		async handleActivate() {
			this.$emit("line-item-activate");
		},

		async handleCancel() {
			this.$emit("cancel");
		},

		async setLoading(_loading: Boolean) {
			this.$store.state.proccess.loading = _loading;
		},

		async associateCreative() {
			await this.$store.dispatch(
				"creative/associateLineItem",
				await this.parsedData()
			);
		},

		async parsedData() {
			return {
				creative_id: this.creativeSelected.id,
				//line_item_id: this.line_item.id,
				line_item_id: 50, // TODO REMOVER (VALUE TO TEST CASE)
				start_date: this.moment(
					String(this.association.start_date)
				).format(DATE_TIME_FORMAT),
				end_date: this.moment(String(this.association.end_date)).format(
					DATE_TIME_FORMAT
				),
			} as AssociationDataCreate;
		},
	},
});
</script>