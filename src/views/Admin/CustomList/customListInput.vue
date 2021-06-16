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
				<v-card
					elevation="0"
					class="pa-2"
					outlined
					tile
					color="rgb(0, 0, 0, 0.0)"
				>
					<v-text-field
						v-model="custom_list.id"
						hint="ID"
						ref="id"
						placeholder="ID"
						label="ID*"
						class="label-fixed"
						:rules="idRules"
						:class="{ disabled: isEdit }"
						:disabled="isEdit"
					></v-text-field>
				</v-card>
			</v-col>

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
						v-model="custom_list.name"
						hint="List Name"
						ref="name"
						placeholder="List Name"
						label="List Name*"
						class="label-fixed"
						counter="255"
						:rules="nameRules"
						:class="{ disabled: isEdit }"
						:disabled="isEdit"
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
						v-model="custom_list.custom_list_type_id"
						:hint="`List Type`"
						:items="getTypes"
						ref="custom_list_type_id"
						item-text="name"
						item-value="id"
						label="List Type*"
						placeholder="List Type"
						:rules="listTypeRules"
						@change="handleTypeModelChange"
						:class="{ disabled: isEdit }"
						:disabled="isEdit"
					></v-autocomplete>
				</v-card>
			</v-col>
		</v-row>

		<v-row v-if="enable_radius_field" no-gutters>
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
						v-model="custom_list.default_radius_km"
						hint="Default Radius (km)"
						ref="default_radius_km"
						placeholder="Default Radius (km)"
						label="Default Radius (km)"
						class="label-fixed"
						:class="{ disabled: isEdit }"
						:disabled="isEdit"
					></v-text-field>
				</v-card>
			</v-col>
		</v-row>

		<v-row no-gutters>
			<!-- Status -->
			<v-col cols="12" sm="12" md="3" lg="3">
				<v-card elevation="0" outlined tile color="rgb(0, 0, 0, 0.0)">
					<v-switch
						color="success"
						class="v-input--reverse--column"
						inset
						flat
						hide-details
						v-model="custom_list.active"
						:label="`${custom_list.active ? 'Active' : 'Inactive'}`"
					>
					</v-switch>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
	import { Type } from "../../../interfaces/custom_list";
	import Vue from "vue";
	import { find, isEmpty, isInteger, isNull, isUndefined } from "lodash";
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
		components: {},
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
