<template>
	<v-container>
		<v-row dense>
			<!-- value -->
			<v-col cols="12" sm="12" md="6" lg="6">
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
					:colapse_selection="true"
					@focus="focusHandler"
					@clear="clearHandler"
				></CardAutocomplete>
			</v-col>

			<!-- include -->
			<v-col class="pe-lg-16 pa-0" cols="12" sm="12" md="6" lg="6">
				<TermList
					:appLists="appLists"
					:targeting_terms="targeting_key_data.targeting_terms"
					:predicates="predicates"
					@remove-item="removeHandler"
				></TermList>
			</v-col>
		</v-row>
	</v-container>
</template>
<script lang="ts">
import Vue from "vue";
import CardAutocomplete from "../../../../../components/Content/CardAutocomplete.vue";
import TermList from "./termList.vue";

export default Vue.extend({
	name: "TargetingTabItem",
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
		predicates: {
			type: Object,
			default: function () {
				return {};
			},
		},
	},
	components: {
		CardAutocomplete,
		TermList,
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
	},

	watch: {},
});
</script>
