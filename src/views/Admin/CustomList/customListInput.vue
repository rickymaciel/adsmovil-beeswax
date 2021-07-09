<template>
	<v-container>
		<!-- <v-card>
			<v-card-text> is_edit: {{ is_edit }} </v-card-text>
			<v-card-text>
				{{ custom_list }}
			</v-card-text>
		</v-card> -->
		<v-row no-gutters>
			<!-- ID -->
			<v-col v-if="isEdit" cols="12" sm="12" md="6" lg="3">
				<CardTextField
					v-model="custom_list.id"
					hint="ID"
					reference="id"
					placeholder="ID"
					label="ID"
					:required="true"
					:rules="idRules"
					:class="{ disabled: isEdit }"
					:disabled="isEdit"
				></CardTextField>
			</v-col>

			<!-- List Name -->
			<v-col cols="12" sm="12" md="6" lg="3">
				<CardTextField
					v-model="custom_list.name"
					hint="List Name"
					reference="name"
					placeholder="List Name"
					label="List Name"
					:required="true"
					:rules="nameRules"
					:class="{ disabled: isEdit }"
					:disabled="isEdit"
				></CardTextField>
			</v-col>

			<!-- List Type -->
			<v-col cols="12" sm="12" md="6" lg="3">
				<CardAutocomplete
					v-model="custom_list.custom_list_type_id"
					:model="custom_list.custom_list_type_id"
					:rules="listTypeRules"
					:items="getTypes"
					item_text="name"
					item_value="id"
					hint="Select List Type"
					reference="custom_list_type_id"
					placeholder="Select List Type"
					label="List Type"
					:required="true"
					@change="handleTypeModelChange"
					:class="{ disabled: isEdit }"
					:disabled="isEdit"
				></CardAutocomplete>
			</v-col>
		</v-row>

		<v-row v-if="enable_radius_field" no-gutters>
			<!-- List Default Radius (km) -->
			<v-col cols="12" sm="12" md="6" lg="3">
				<CardTextField
					v-model="custom_list.default_radius_km"
					hint="Default Radius (km)"
					reference="default_radius_km"
					placeholder="Default Radius (km)"
					label="Default Radius (km)"
					:class="{ disabled: isEdit }"
					:disabled="isEdit"
				></CardTextField>
			</v-col>
		</v-row>

		<v-row no-gutters>
			<!-- Status -->
			<v-col cols="12" sm="12" md="3" lg="3">
				<CardSwitch
					v-model="custom_list.active"
					reference="active"
					:label="`${custom_list.active ? 'Active' : 'Inactive'}`"
					color="success"
				></CardSwitch>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
	import { Type } from "../../../interfaces/custom_list";
	import Vue from "vue";
	import { find, isEmpty, isInteger, isNull, isUndefined } from "lodash";
	import CardTextField from "./../../../components/Content/CardTextField.vue";
	import CardAutocomplete from "./../../../components/Content/CardAutocomplete.vue";
	import CardSwitch from "./../../../components/Content/CardSwitch.vue";

	export default Vue.extend({
		name: "CustomListInput",
		props: {
			custom_list: {
				required: true,
			},
			is_edit: {
				type: Boolean,
				default: false,
			},
			enable_radius_field: {
				type: Boolean,
				default: false,
			},
		},
		components: {
			CardTextField,
			CardAutocomplete,
			CardSwitch,
		},
		data: () => ({
			type_selected: {} as Type,
		}),
		created() {},
		mounted() {
			setTimeout(() => {
				this.setTypeModelChange();
			}, 1000);
		},
		computed: {
			isEdit() {
				return this.is_edit;
			},
			idRules() {
				return [(v: number) => (v && !isNaN(v)) || this.$t("numeric")];
			},
			nameRules() {
				return [
					(v: string) =>
						(!isUndefined(v) && !isNull(v) && !isEmpty(v)) ||
						this.$t("fieldRequired"),
					(v: string) =>
						(v && v.length <= 255) ||
						this.$t("maxLength", { max: 255 }),
					(v: string) =>
						(v && v.length >= 2) || this.$t("minLength", { min: 2 }),
				];
			},

			listTypeRules() {
				return this.autocompleteRules("autocompleteRules");
			},
			getTypes(): Type[] {
				return this.$store.state.custom_list.types;
			},
		},
		methods: {
			autocompleteRules(type: string) {
				return [
					(v: any) =>
						(!isUndefined(v) && !isNull(v)) || this.$t("fieldRequired"),
					(v: any) => isInteger(v) || this.$t(type),
				];
			},
			handleTypeModelChange(e: any) {
				this.type_selected = find(this.getTypes, { id: e });
				this.$emit("update-type-selected", this.type_selected);
			},
			setTypeModelChange() {
				if (this.custom_list.id > 0) {
					this.type_selected = find(this.getTypes, {
						id: this.custom_list.custom_list_type_id,
					});
					this.$emit("update-type-selected", this.type_selected);
				}
			},
		},

		watch: {
			enable_radius_field(val, old) {
				this.custom_list.default_radius_km = val ? 0.5 : undefined;
			},
		},
	});
</script>
