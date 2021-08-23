<template>
	<section>
		<v-data-table
			:headers="headers"
			:items="items"
			:items-per-page="perPage"
			item-key="creatives"
			class="elevation-1"
			hide-default-footer
			:mobile-breakpoint="null"
		>
			<!-- ID -->
			<template v-slot:[`header.id`]="{ header }">
				<Filterable
					field_name="id"
					type="number"
					:filters="filters"
					:header="header"
					:option="option"
					@selected-option="selectedOption"
				></Filterable>
			</template>

			<!-- CREATIVE NAME -->
			<template v-slot:[`header.name`]="{ header }">
				<Filterable
					field_name="name"
					type="text"
					:filters="filters"
					:header="header"
					:option="option"
					@selected-option="selectedOption"
				></Filterable>
			</template>

			<!-- SIZE -->
			<template v-slot:[`header.creative_size_name`]="{ header }">
				<Filterable
					field_name="creative_size_name"
					type="text"
					:filters="filters"
					:header="header"
					:option="option"
					@selected-option="selectedOption"
				></Filterable>
			</template>

			<!-- TYPE -->
			<template v-slot:[`header.creative_type_name`]="{ header }">
				<Filterable
					field_name="creative_type_name"
					type="text"
					:filters="filters"
					:header="header"
					:option="option"
					@selected-option="selectedOption"
				></Filterable>
			</template>

			<!-- LINE ITEMS -->
			<!-- <template v-slot:[`header.line_associations`]="{ header }">
				<Filterable
					field_name="line_associations"
					type="number"
					:filters="filters"
					:header="header"
					:option="option"
					@selected-option="selectedOption"
				></Filterable>
			</template> -->

			<!-- THUMBAILS -->
			<!-- <template v-slot:[`header.thumbail`]="{ header }">
				<Filterable
					field_name="thumbail"
					type="text"
					:filters="filters"
					:header="header"
					:option="option"
					@selected-option="selectedOption"
				></Filterable>
			</template> -->

			<!-- active -->
			<template v-slot:[`header.active`]="{ header }">
				<Filterable
					field_name="active"
					type="text"
					:filters="filters"
					:header="header"
					:option="option"
					:filter_by_active="true"
					@selected-option="selectedOption"
				></Filterable>
			</template>

			<!-- ///// ITEMS //// -->

			<!-- ACTIVE -->
			<template v-slot:[`item.active`]="{ item }">
				<strong class="d-flex" :class="getColor(item.active)">
					<v-icon :class="getColor(item.active)"
						>mdi-circle-medium</v-icon
					>
					{{ getActiveText(item.active) }}
				</strong>
			</template>

			<!-- THUMBAILS -->
			<template v-slot:[`item.thumbail`]="{ item }">
				<v-card-actions>
					<v-img
						v-if="item.thumbail"
						style="borderradius: 5px"
						:lazy-src="item.thumbail"
						max-height="45"
						max-width="45"
						:src="item.thumbail"
					></v-img>
					<v-img
						v-else
						style="borderradius: 5px"
						lazy-src="https://picsum.photos/id/11/10/6"
						max-height="45"
						max-width="45"
						src="https://picsum.photos/id/11/500/300"
					></v-img>
					<!-- <v-btn
						color="secondary"
						elevation="0"
						medium
						raised
						rounded
						text
						icon
					>
						<v-icon small class="secondary--text">
							mdi-magnify-plus-outline
						</v-icon>
					</v-btn> -->
				</v-card-actions>
			</template>

			<template v-slot:[`item.actions`]="{ item }">
				<v-card-actions>
					<v-btn
						color="secondary"
						elevation="0"
						medium
						raised
						rounded
						text
						icon
						:to="{
							name: 'CreativeEdit',
							params: { id: item.id },
						}"
					>
						<v-icon small class="secondary--text">
							mdi-pencil
						</v-icon>
					</v-btn>
				</v-card-actions>
			</template>
		</v-data-table>

		<!-- PAGINATION -->
		<div v-if="items.length" class="text-center py-8">
			<v-pagination
				v-model="currentPage"
				:length="getLength"
				@input="updatePaginate"
			></v-pagination>
		</div>
	</section>
</template>

<script lang="ts">
import { isEmpty } from "lodash";
import Vue from "vue";
import Filterable from "../../../../components/Header/Tables/Filterable.vue";
import { SortingOption } from "../../../../interfaces/paginated";

export default Vue.extend({
	name: "TableList",
	props: {
		current_page: {
			type: Number,
		},
		next_page_url: {
			type: String,
		},
		path: {
			type: String,
		},
		per_page: {
			type: Number,
		},
		prev_page_url: {
			type: String,
		},
		to: {
			type: Number,
		},
		total: {
			type: Number,
		},
		headers: {
			type: Array,
			default: [],
		},
		items: {
			type: Array,
			default: [],
		},
		option: {
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
	},
	components: { Filterable },
	data: function () {
		return {};
	},
	created() {},
	mounted() {},

	computed: {
		currentPage: {
			set(val) {
				this.$emit("update-current-page", val);
			},
			get() {
				return this.current_page;
			},
		},
		getLength() {
			return Math.ceil(this.total / this.per_page);
		},
		perPage() {
			return !isNaN(this.per_page) && isEmpty(this.per_page)
				? this.per_page
				: 25;
		},
	},

	methods: {
		getColor(active: Boolean) {
			return active ? "green--text" : "red--text";
		},
		getActiveText(active: Boolean) {
			return active ? "Active" : "Inactive";
		},
		updatePaginate(data: Number) {
			this.$emit("update-paginate", data);
		},
		selectedOption(params: { option: SortingOption; filter: any }) {
			this.$emit("selected-option", {
				option: params.option,
				filter: params.filter,
			});
		},
	},
});
</script>