<template>
	<v-container>
		<v-row dense>
			<!-- value -->
			<v-col cols="12" sm="12" md="6" lg="6">
				<CardTextField
					v-model="targeting_key_data.value"
					:hint="hint"
					:reference="reference"
					:placeholder="placeholder"
					:label="label"
					:required="false"
					:persistent_hint="persistent_hint"
					@blur="blurHandler"
					@enter="enterHandler"
				></CardTextField>
			</v-col>

			<!-- include -->
			<v-col class="pe-lg-16 pa-0" cols="12" sm="12" md="6" lg="6">
				<TermListUnique
					:targeting_terms="targeting_key_data.targeting_terms"
					:use_display_name="false"
					@remove-item-unique="removeHandler"
				></TermListUnique>
			</v-col>
		</v-row>
	</v-container>
</template>
<script lang="ts">
	import { isString } from "lodash";
	import Vue from "vue";
	import CardTextField from "../../../../components/Content/CardTextField.vue";
	import TermListUnique from "./termListUnique.vue";

	export default Vue.extend({
		name: "TargetingTabItemSplit",
		props: {
			targeting_key_data: {
				type: Object,
				default: function () {
					return {};
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
			persistent_hint: {
				type: Boolean,
				default: false,
			},
		},
		components: {
			CardTextField,
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
			blurHandler(data: string) {
				var items: Array<string> = [];

				if (isString(data)) {
					items = data.split(",");
				}

				this.$emit("blur", items);
			},

			enterHandler(e: any) {
				this.$emit("enter", e);
			},
		},

		watch: {},
	});
</script>
