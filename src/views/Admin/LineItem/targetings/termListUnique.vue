<template>
	<v-list>
		<v-list-item
			v-for="(targeting_term, index) in targeting_terms"
			:key="index"
		>
			<v-list-item-action>
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

			<v-list-item-content>
				<template>
					<v-chip
						label
						outlined
						close
						class="me-2 mb-2"
						color="secondary"
						v-for="(value, index) in targeting_term.value"
						:key="index"
						@click:close="removeHandler(value)"
					>
						<template v-if="use_display_name">
							<span class="text-truncate">
								{{ getDisplayNameByID(value) }}
							</span>
						</template>
						<template v-else>
							<span class="text-truncate">
								{{ value }}
							</span>
						</template>
					</v-chip>
				</template>
			</v-list-item-content>
		</v-list-item>
	</v-list>
</template>
<script lang="ts">
	import Vue from "vue";
	import CardSwitch from "../../../../components/Content/CardSwitch.vue";

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
		},
		components: { CardSwitch },
		data: () => ({}),
		async created() {},
		async mounted() {},
		computed: {},
		methods: {
			getDisplayNameByID(id: Number) {
				let displayName = "";

				const app = this.appLists.find((app: any) => app.id == id);
				if (app) {
					displayName = `${app.value} (${id})`;
				}

				return displayName;
			},

			removeHandler(value: any) {
				this.$emit("remove-item-unique", value);
			},
		},
	});
</script>
