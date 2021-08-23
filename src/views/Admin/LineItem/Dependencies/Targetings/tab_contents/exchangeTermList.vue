<template>
	<v-list>
		<v-list-item
			dense
			class="my-0"
			v-for="(targeting_term, index) in targeting_terms"
			:key="index"
		>
			<v-list-item-action class="my-0">
				<CardSwitch
					v-model="targeting_term.targeting_predicate_id"
					customClass=""
					reference="targeting_predicate_id"
					:inset="false"
					:true_value="1823"
					:false_value="1824"
					:label="
						targeting_term.targeting_predicate_id === 1823
							? 'Include'
							: 'Exclude'
					"
					:color="
						targeting_term.targeting_predicate_id === 1823
							? 'success'
							: 'red'
					"
				></CardSwitch>
			</v-list-item-action>

			<v-list-item-content class="my-0">
				<v-chip
					label
					outlined
					close
					class="ma-0"
					color="secondary"
					@click:close="removeHandler(targeting_term.value)"
				>
					{{ getDisplayNameByID(targeting_term.value) }}
				</v-chip>
			</v-list-item-content>

			<!-- <v-list-item-action>
				<v-btn
					icon
					elevation="0"
					raised
					small
					@click="removeHandler(targeting_term.value)"
				>
					<v-icon color="grey"> mdi-close </v-icon>
				</v-btn>
			</v-list-item-action> -->
		</v-list-item>
	</v-list>
</template>
<script lang="ts">
import Vue from "vue";
import CardSwitch from "../../../../../../components/Content/CardSwitch.vue";

export default Vue.extend({
	name: "ExchangeTermList",
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

			return displayName;
		},

		removeHandler(value: any) {
			this.$emit("remove-item", value);
		},
	},
});
</script>
