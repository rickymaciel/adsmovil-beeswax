<template>
	<v-menu :close-on-content-click="false">
		<template v-slot:activator="{ on, attrs }">
			<div v-bind="attrs" v-on="on">
				{{ header.text }}
				<v-icon>mdi-chevron-down</v-icon>
			</div>
		</template>

		<v-list subheader dense flat class="pa-3 py-1">
			
			<!-- filters title -->
			<v-subheader v-if="header.filterable">{{ $t("filter") }}</v-subheader>
			<v-divider v-if="header.filterable"></v-divider>

			<template v-if="header.filterable && filter_by_active">
				<v-list-item v-if="filter_by_active" class="px-2">
					<v-radio-group
						class="px-0 py-0 mx-0 my-4"
						@change="selectedOption"
						v-model="filter"
						:ref="field_name"
					>
						<v-radio color="secondary" :value="1">
							<template v-slot:label>
								<div>Active</div>
							</template>
						</v-radio>
						<v-radio color="secondary" :value="0">
							<template v-slot:label>
								<div>Inactive</div>
							</template>
						</v-radio>
					</v-radio-group>
				</v-list-item>
			</template>
			<template v-if="header.filterable && !filter_by_active">
				<v-list-item>
					<v-text-field
						class="label-fixed pt-0 px-0 mx-0"
						:type="type"
						:ref="field_name"
						v-model="filter"
						@input="selectedOption"
						:placeholder="header.text"
						clearable
					></v-text-field>
				</v-list-item>
			</template>

			<v-subheader v-if="header.sortable">{{ $t("sort") }}</v-subheader>
			<v-divider v-if="header.sortable"></v-divider>

			<v-list-item-action v-if="header.sortable">
				<v-radio-group v-model="option.order" @change="selectedOption">
					<v-radio color="secondary" value="asc">
						<template v-slot:label>
							<div>Ascending</div>
						</template>
					</v-radio>
					<v-radio color="secondary" value="desc">
						<template v-slot:label>
							<div>Descending</div>
						</template>
					</v-radio>
				</v-radio-group>
			</v-list-item-action>
		</v-list>
	</v-menu>
</template>

<script lang="ts">
	import { debounce } from "lodash";
	import Vue from "vue";
	import { SortingOption } from "../../../interfaces/paginated";
	export default Vue.extend({
		name: "Filterable",
		props: {
			header: {
				type: Object,
				default: function () {
					return {};
				},
			},
			filters: {
				type: Object,
				default: function () {
					return {};
				},
			},
			option: {
				type: Object,
				default: function () {
					return {};
				},
			},
			field_name: {
				type: String,
			},
			filter_by_active: {
				type: Boolean,
				default: false,
			},
			type: {
				type: String,
				default: "text",
			},
		},
		components: {},
		data: function () {
			return {
				filter: "",
			};
		},
		created() {},
		mounted() {},
		computed: {},
		methods: {
			selectedOption: debounce(function () {
				const options = {
					option: {
						sort: (this as any).field_name,
						order: (this as any).option.order,
					} as SortingOption,
					filter: this.filter,
				};
				this.$emit("selected-option", options);
			}, 500),
		},
	});
</script>
