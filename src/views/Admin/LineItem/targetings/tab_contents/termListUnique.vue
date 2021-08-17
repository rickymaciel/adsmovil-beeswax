<template>
	<v-list
		align="start"
		self="start"
		items="start"
		justify="start"
		dense
		flat
		rounded
	>
		<v-list-item
			align="start"
			self="start"
			items="start"
			justify="start"
			dense
			v-for="(targeting_term, index) in targeting_terms"
			:key="index"
		>
			<v-list-item-action>
				<CardSwitch
					v-model="targeting_term.targeting_predicate_id"
					customClass=""
					reference="targeting_predicate_id"
					:inset="false"
					:true_value="predicates.INCLUDED"
					:false_value="predicates.EXCLUDED"
					:label="
						targeting_term.targeting_predicate_id ===
						predicates.INCLUDED
							? 'Include'
							: 'Exclude'
					"
					:color="
						targeting_term.targeting_predicate_id ===
						predicates.INCLUDED
							? 'success'
							: 'red'
					"
				></CardSwitch>
			</v-list-item-action>

			<v-list-item-content class="ma-0 pa-2">
				<v-flex>
					<v-chip
						class="me-2 mb-2"
						color="secondary"
						close
						outlined
						pill
						v-for="(value, index) in targeting_term.value"
						:key="index"
						@click:close="removeHandler(value)"
					>
						<template v-if="use_display_name">
							{{ getDisplayNameByID(value) }}
						</template>
						<template v-else>
							{{ value }}
						</template>
					</v-chip>
				</v-flex>
			</v-list-item-content>
		</v-list-item>
	</v-list>
</template>
<script lang="ts">
import Vue from "vue";
import CardSwitch from "../../../../../components/Content/CardSwitch.vue";

export default Vue.extend({
	name: "TermListUnique",
	props: {
		targeting_terms: {
			type: Array,
			default: function () {
				return [];
			},
		},
		appLists: {
			type: Array,
			default: function () {
				return [];
			},
		},
		use_display_name: {
			type: Boolean,
			default: true,
		},
		predicates: {
			type: Object,
			default: function () {
				return {};
			},
		},
	},
	components: { CardSwitch },
	data: () => ({}),
	async created() {},
	async mounted() {},
	computed: {},
	methods: {
		getDisplayNameByID(id: any) {
			let displayName = "";

			const app = this.appLists.find((app: any) => app.id == id);
			if (app) {
				displayName = `${app.value} (${id})`;
			}

			return displayName || id;
		},

		removeHandler(value: any) {
			this.$emit("remove-item-unique", value);
		},
	},
});
</script>
