<template>
	<v-menu :close-on-content-click="false">
		<template v-slot:activator="{ on, attrs }">
			<div v-bind="attrs" v-on="on">
				{{ header.text }}
				<v-icon>mdi-chevron-down</v-icon>
			</div>
		</template>

		<v-list subheader dense flat>
			<v-subheader>{{ $t("filter") }}</v-subheader>

			<template v-if="filter_by_active">
				<v-list-item v-if="filter_by_active">
					<v-radio-group
						@change="selectedOption"
						v-model="filter"
						:ref="field_name"
					>
						<v-radio color="secondary" :value="true">
							<template v-slot:label>
								<div>Active</div>
							</template>
						</v-radio>
						<v-radio color="secondary" :value="false">
							<template v-slot:label>
								<div>Inactive</div>
							</template>
						</v-radio>
					</v-radio-group>
				</v-list-item>
			</template>
			<template v-else>
				<v-list-item>
					<v-text-field
						class="label-fixed no-top"
						:type="type"
						:ref="field_name"
						v-model="filter"
						@input="selectedOption"
						:placeholder="header.text"
						clearable
					></v-text-field>
				</v-list-item>
			</template>

			<v-divider></v-divider>

			<v-list-item-action>
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
				this.$emit("selected-option", {
					option: {
						sort: (this as any).field_name,
						order: (this as any).option.order,
					} as SortingOption,
					filter: this.filter,
				});
			}, 500),
		},
	});
</script>
