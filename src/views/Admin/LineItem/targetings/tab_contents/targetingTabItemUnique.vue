<template>
	<v-container>
		<v-row dense>
			<!-- value -->
			<v-col cols="12" sm="12" md="4" lg="4">
				<CardAutocomplete
					v-model="targeting_key_data.value"
					:items="appLists"
					:item_text="item_text"
					:item_value="item_value"
					:hint="hint"
					:reference="reference"
					:placeholder="placeholder"
					:label="label"
					:chips="false"
					:deletable_chips="true"
					:multiple="true"
					:small_chips="false"
					:dense="false"
					:required="false"
					:clearable="true"
					:persistent_hint="persistent_hint"
					:colapse_selection="colapse_selection"
					:search_input_sync="search_input_sync"
					@focus="focusHandler"
					@clear="clearHandler"
					@sync="syncHandler"
				></CardAutocomplete>
			</v-col>

			<!-- by_attribute -->
			<v-col cols="12" sm="12" md="2" lg="2">
				<v-select
					v-model="targeting_key_data.by_attribute"
					:items="attributeList"
					label=""
					class="label-fixed"
				></v-select>
			</v-col>

			<!-- include -->
			<v-col class="pe-lg-16 pa-0" cols="12" sm="12" md="6" lg="6">
				<TermListUnique
					:predicates="predicates"
					:appLists="appLists"
					:targeting_terms="targeting_key_data.targeting_terms"
					@remove-item-unique="removeHandler"
				></TermListUnique>
			</v-col>
		</v-row>
	</v-container>
</template>
<script lang="ts">
import Vue from "vue";
import CardAutocomplete from "../../../../../components/Content/CardAutocomplete.vue";
import TermListUnique from "./termListUnique.vue";

export default Vue.extend({
	name: "TargetingTabItemUnique",
	props: {
		targeting_key_data: {
			type: Object,
			default: function () {
				return {};
			},
		},
		appLists: {
			type: Array,
			default: function () {
				return [];
			},
		},
		attributeList: {
			type: Array,
			default: function () {
				return [];
			},
		},
		hint: {
			type: String,
			default: "Hint",
		},
		reference: {
			type: String,
			default: "reference",
		},
		placeholder: {
			type: String,
			default: "Placeholder",
		},
		label: {
			type: String,
			default: "Label",
		},
		item_text: {
			type: String,
			default: "value",
		},
		item_value: {
			type: String,
			default: "id",
		},
		search_input_sync: {
			default: null,
		},
		persistent_hint: {
			type: Boolean,
			default: false,
		},
		colapse_selection: {
			type: Boolean,
			default: false,
		},
		predicates: {
			type: Object,
			default: function () {
				return {};
			},
		},
	},
	components: {
		CardAutocomplete,
		TermListUnique,
	},
	data: () => ({}),
	async created() {},
	async mounted() {},
	computed: {},
	methods: {
		removeHandler(value: any) {
			this.$emit("remove-item", value);
		},
		clearHandler() {
			this.$emit("clear");
		},
		focusHandler() {
			this.$emit("focus");
		},
		syncHandler(data: any) {
			this.$emit("sync", data);
		},
	},

	watch: {},
});
</script>
