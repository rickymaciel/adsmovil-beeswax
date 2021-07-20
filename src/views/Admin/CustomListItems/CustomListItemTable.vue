<template>
	<v-col md="12">
		<!-- input mode -->
		<v-row no-gutters>
			<v-col md="12">
				<v-card elevation="0">
					<!-- TABLE -->
					<v-data-table
						:headers="headers"
						:items="items"
						:items-per-page="items.length"
						item-key="listItem"
						class="elevation-1"
						hide-default-footer
						:mobile-breakpoint="null"
					>
						<!-- HEADERS -->

						<template v-slot:[`header.id`]="{ header }">
							<div class="text-left" >
								{{ header.text }}
							</div>
						</template>

						<template v-slot:[`header.lat`]="{ header }">
							<div class="text-left" >
								{{ header.text }}
							</div>
						</template>

						<template v-slot:[`header.long`]="{ header }">
							<div class="text-left" >
								{{ header.text }}
							</div>
						</template>

						<template v-slot:[`header.radius_km`]="{ header }">
							<div class="text-left" >
								{{ header.text }}
							</div>
						</template>

						<template v-slot:[`header.prefix`]="{ header }">
							<div class="text-left" >
								{{ header.text }}
							</div>
						</template>

						<template v-slot:[`header.list_item`]="{ header }">
							<div class="text-left" >
								{{ header.text }}
							</div>
						</template>

						<template v-slot:[`header.value`]="{ header }">
							<div class="text-left" >
								{{ header.text }}
							</div>
						</template>

						<template v-slot:[`header.name`]="{ header }">
							<div class="text-left" >
								{{ header.text }}
							</div>
						</template>

						<!-- ITEMS -->

						<template v-slot:[`item.id`]="{ item }">
							<v-text-field
								v-model="item.id"
								:rules="[]"
								placeholder="ID"
								class="label-fixed disabled"
								:disabled="true"
							></v-text-field>
						</template>

						<template v-slot:[`item.lat`]="{ item }">
							<v-text-field
								type="number"
								v-model="item.lat"
								:rules="[getRules.isRequired]"
								:placeholder="$t('customListItem.fields.latitude')"
								:class="'label-fixed'+(!!item.id  ? ' disabled' : '')"
								:disabled="!!item.id"
								l
							></v-text-field>
						</template>

						<template v-slot:[`item.long`]="{ item }">
							<v-text-field
								type="number"
								v-model="item.long"
								:rules="[getRules.isRequired]"
								:placeholder="$t('customListItem.fields.longitude')"
								:class="'label-fixed'+(!!item.id  ? ' disabled' : '')"
								:disabled="!!item.id"
							></v-text-field>
						</template>

						<template v-slot:[`item.radius_km`]="{ item }">
							<v-text-field
								type="number"
								v-model="item.radius_km"
								:rules="[getRules.isRequired]"
								:placeholder="$t('customListItem.fields.radius_km')"
								:class="'label-fixed'+(!!item.id  ? ' disabled' : '')"
								:disabled="!!item.id"
							></v-text-field>
						</template>

						<template v-slot:[`item.prefix`]="{ item }">
							<v-autocomplete
								v-model="item.prefix"
								:rules="[getRules.isRequired]"
								:items="exchanges"
								ref="exchange_prefix"
								item-text="abbreviation"
								item-value="abbreviation"
								:placeholder="$t('customListItem.fields.prefix')"
								:class="'label-fixed'+(!!item.id  ? ' disabled' : '')"
								:disabled="!!item.id"
							></v-autocomplete>							
						</template>

						<template v-slot:[`item.list_item`]="{ item }">
							<v-text-field
								v-model="item.list_item"
								:rules="[getRules.isRequired]"
								:placeholder="$t('customListItem.fields.list_item')"
								:class="'label-fixed'+(!!item.id  ? ' disabled' : '')"
								:disabled="!!item.id"
							></v-text-field>
						</template>

						<template v-slot:[`item.value`]="{ item }">
							<v-text-field
								type="number"
								v-model="item.value"
								:placeholder="$t('customListItem.fields.value')"
								:class="'label-fixed'+(!!item.editing ? '' : ' disabled')"
								:disabled="!!!item.editing"
							></v-text-field>
						</template>

						<template v-slot:[`item.name`]="{ item }">
							<v-text-field
								v-model="item.name"
								:rules="[getRules.isRequired]"
								:placeholder="$t('customListItem.fields.name')"
								:class="'label-fixed'+(!!item.editing ? '' : ' disabled')"
								:disabled="!!!item.editing"
							></v-text-field>
						</template>

						<template v-slot:[`item.actions`]="{ item, index }">
							<v-card-actions class="pa-0">
								<v-btn
									v-if="!!!item.deleted"
									color="secondary"
									elevation="0"
									medium
									raised
									rounded
									text
									icon
									class="ma-0"
									@click="handleEdit(index)"
								>
									<v-icon small class="secondary--text">mdi-pencil-outline</v-icon>
								</v-btn>
								<v-btn
									v-if="!!!item.deleted"
									color="secondary"
									elevation="0"
									medium
									raised
									rounded
									text
									icon
									class="ma-0"
									@click="handleDelete(index)"
								>
									<v-icon small class="secondary--text">mdi-trash-can-outline</v-icon>
								</v-btn>
								<div v-if="!!item.deleted">{{ $t('customListItem.labels.deleted') }}</div> 
							</v-card-actions>
						</template>

					</v-data-table>

					<v-row no-gutters>
						<v-card-subtitle class="secondary--text mt-2">
							{{ $t('customListItem.labels.total_items', {length: items.length, total: (items.length > total ? items.length : total )}) }}
						</v-card-subtitle>
					</v-row>

					<!-- PAGINATION -->
					<div v-if="items.length" class="text-center py-8">
						<v-pagination
							v-model="currentPage"
							:length="getLength"
						></v-pagination>
					</div>			

				</v-card>
			</v-col>
		</v-row>
	</v-col>
</template>

<script lang="ts">
	
	import { isEmpty } from "lodash";
	import Vue from "vue";
	import Filterable from "../../../components/Header/Tables/Filterable.vue";
	import { isRequired, isNumber } from "@/services/rule-services";

	export default Vue.extend({
		name: "CustomListItemTable",
		props: {
			custom_list: { type: Object, default: {} },
			current_page: { type: Number },
			next_page_url: { type: String },
			path: { type: String },
			per_page: { type: Number },
			prev_page_url: { type: String },
			to: { type: Number },
			total: { type: Number },
			headers: { type: Array, default: [] },
			items: { type: Array, default: [] },
			option: { type: Object, default: () => ({}) },
			filters: { type: Object, default: () => ({}) },
			exchanges: { type: Array }
		},
		components: { Filterable },
		
		data: () => ({
			input_mode: "manual",
			current_file: undefined,
      		progress: 0
		}),

		created() {},

		async mounted() {},

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
				return !isNaN(this.per_page) && isEmpty(this.per_page) ? this.per_page : 25;
			},
			getRules() {
				return {isRequired, isNumber};
			}			
		},

		methods: {
			handleAddItem() {
				this.$emit("add-item", {});
			},
			async handleEdit(index) {
				this.$emit("edit-item", index);				
			},			
			async handleDelete(index) {
				this.$emit("delete-item", index);				
			}
		},
	});
</script>