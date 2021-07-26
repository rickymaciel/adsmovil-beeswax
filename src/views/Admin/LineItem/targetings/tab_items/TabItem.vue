<template>
	<v-container>
		<v-row dense>
			<!-- value -->
			<v-col
				cols="12"
				sm="12"
				:md="filterable ? 4 : 6"
				:lg="filterable ? 4 : 6"
			>
				<!-- <v-card>
					<v-card-text class="secondary--text">
						filterable: {{ filterable }}
						<v-divider></v-divider>
						unique: {{ unique }}
						<v-divider></v-divider>
						targeting_key_data: {{ targeting_key_data }}
						<v-divider></v-divider>
						use_display_name: {{ use_display_name }}
					</v-card-text>
				</v-card> -->
				<CardAutocomplete
					v-model="targeting_key_data.value"
					:items="appLists"
					:item_text="item_text"
					:item_value="item_value"
					:hint="hint"
					:reference="reference"
					:placeholder="placeholder"
					:label="label"
					:chips="chips"
					:deletable_chips="deletable_chips"
					:multiple="multiple"
					:small_chips="small_chips"
					:dense="dense"
					:required="required"
					:clearable="clearable"
					:colapse_selection="colapse_selection"
					:persistent_hint="persistent_hint"
					:search_input_sync="search_input_sync"
					@focus="focusHandler"
					@clear="clearHandler"
					@sync="syncHandler"
				></CardAutocomplete>
			</v-col>

			<!-- by_attribute -->
			<v-col v-if="filterable" cols="12" sm="12" md="2" lg="2">
				<v-select
					v-model="targeting_key_data.by_attribute"
					:items="attributeList"
					label=""
					class="label-fixed"
				></v-select>
			</v-col>

			<!-- include -->
			<v-col class="pe-lg-16 pa-0" cols="12" sm="12" md="6" lg="6">
				<template v-if="unique">
					<TermListUnique
						:use_display_name="use_display_name"
						:appLists="appLists"
						:targeting_terms="targeting_key_data.targeting_terms"
						@remove-item-unique="removeHandler"
					></TermListUnique>
				</template>
				<template v-else>
					<TermList
						:appLists="appLists"
						:targeting_terms="targeting_key_data.targeting_terms"
						@remove-item="removeHandler"
					></TermList>
				</template>
			</v-col>
		</v-row>
	</v-container>
</template>
<script lang="ts">
	import Vue from "vue";
	import CardAutocomplete from "../../../../../components/Content/CardAutocomplete.vue";
	import TermList from "../termList.vue";
	import TermListUnique from "../termListUnique.vue";

	export default Vue.extend({
		name: "TabItem",
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
			searchable: {
				type: Boolean,
				default: false,
			},
			filterable: {
				type: Boolean,
				default: false,
			},
			unique: {
				type: Boolean,
				default: false,
			},
			customClass: {
				type: String,
				default: "label-fixed",
			},
			counter: {
				type: Number,
				default: 255,
			},
			disabled: {
				type: Boolean,
				default: false,
			},
			multiple: {
				type: Boolean,
				default: false,
			},
			chips: {
				type: Boolean,
				default: false,
			},
			deletable_chips: {
				type: Boolean,
				default: false,
			},
			small_chips: {
				type: Boolean,
				default: false,
			},
			dense: {
				type: Boolean,
				default: false,
			},
			persistent_hint: {
				type: Boolean,
				default: false,
			},
			required: {
				type: Boolean,
				default: false,
			},
			clearable: {
				type: Boolean,
				default: true,
			},
			auto_select_first: {
				type: Boolean,
				default: false,
			},
			search_input_sync: {
				default: null,
			},
			colapse_selection: {
				type: Boolean,
				default: false,
			},
			use_display_name: {
				type: Boolean,
				default: true,
			},
		},
		components: {
			CardAutocomplete,
			TermList,
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

			syncHandler(data: any) {
				this.$emit("sync", data);
			},

			focusHandler() {
				this.$emit("focus");
			},
		},

		watch: {},
	});
</script>
