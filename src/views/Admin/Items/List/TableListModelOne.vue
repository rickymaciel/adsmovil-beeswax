<template>
	<v-card elevation="0">

		<v-data-table
			:headers="headers"
			:items="records"
			:items-per-page="records.length"
			item-key="listItem"
			class="elevation-1"
			hide-default-footer
			:mobile-breakpoint="null"
		>

			<!-- ID -->
			<template v-slot:[`header.id`]="{ header }">
				<v-menu :close-on-content-click="false">
					<template v-slot:activator="{ on, attrs }">
						<div v-bind="attrs" v-on="on">
							{{ header.text.toUpperCase() }}
							<v-icon>mdi-chevron-down</v-icon>
						</div>
					</template>

					<v-list subheader>
						<v-subheader>Sort</v-subheader>

						<v-list-item>
							<v-text-field
								class="label-fixed no-top"
								ref="id"
								v-model="filter.id.value"
								type="number"
								:placeholder="header.text"
								clearable
							></v-text-field>
						</v-list-item>

						<v-divider></v-divider>

						<v-list-item>
							<v-radio-group v-model="filter.id.order">
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
						</v-list-item>
					</v-list>
				</v-menu>
			</template>

			<template v-slot:[`item.id`]="{ item }">
				<v-text-field
					v-model="item.id"
					placeholder="ID"
					class="label-fixed disabled"
					disabled
				></v-text-field>
			</template>

			<!-- LIST ITEM -->
			<template v-slot:[`header.listItem`]="{ header }">
				<v-menu :close-on-content-click="false">
					<template v-slot:activator="{ on, attrs }">
						<div v-bind="attrs" v-on="on">
							{{ header.text }}
							<v-icon>mdi-chevron-down</v-icon>
						</div>
					</template>

					<v-list subheader>
						<v-subheader>Filter</v-subheader>

						<v-list-item>
							<v-text-field
								class="label-fixed no-top"
								ref="id"
								v-model="filter.listItem.value"
								type="text"
								:placeholder="header.text"
								clearable
							></v-text-field>
						</v-list-item>

						<v-divider></v-divider>

						<v-list-item>
							<v-btn
								color="secondary"
								elevation="2"
								block
								outlined
								rounded
							>
								Remove filter
							</v-btn>
						</v-list-item>
					</v-list>
				</v-menu>
			</template>
			
			<template v-slot:[`item.list_item`]="{ item }">
				<CardTextField
					v-model="item.list_item"
					:rules="getRules.required"
					hint="List Item"
					reference="list_item"
					placeholder="List Item"
					label="List Item"
					:required="true"
					:disabled="item.id > 0"
					:class="{ disabled: item.id > 0 }"
				></CardTextField>
			</template>

			<!-- VALUE -->
			<template v-slot:[`header.value`]="{ header }">
				<v-menu :close-on-content-click="false">
					<template v-slot:activator="{ on, attrs }">
						<div v-bind="attrs" v-on="on">
							{{ header.text }}
							<v-icon>mdi-chevron-down</v-icon>
						</div>
					</template>

					<v-list subheader two-line flat>
						<v-subheader>Filter</v-subheader>

						<v-list-item>
							<v-text-field
								class="label-fixed no-top"
								ref="id"
								v-model="filter.value.value"
								type="text"
								:placeholder="header.text"
								clearable
							></v-text-field>
						</v-list-item>

						<v-divider></v-divider>

						<v-list-item>
							<v-btn
								color="secondary"
								elevation="2"
								block
								outlined
								rounded
							>
								Remove filter
							</v-btn>
						</v-list-item>
					</v-list>
				</v-menu>
			</template>

			<template v-slot:[`item.value`]="{ item }">
				<CardTextField
					v-model="item.value"
					:rules="getRules.value"
					hint="Value"
					reference="value"
					placeholder="Value"
					label="Value"
					:required="true"
					@change="hasChanged(item)"
				></CardTextField>
			</template>

			<!-- LIST ITEM NAME -->
			<template v-slot:[`header.name`]="{ header }">
				<v-menu :close-on-content-click="false">
					<template v-slot:activator="{ on, attrs }">
						<div v-bind="attrs" v-on="on">
							{{ header.text }}
							<v-icon>mdi-chevron-down</v-icon>
						</div>
					</template>

					<v-list subheader two-line flat>
						<v-subheader>Filter</v-subheader>

						<v-list-item>
							<v-text-field
								class="label-fixed no-top"
								ref="id"
								v-model="filter.name.value"
								type="text"
								:placeholder="header.name"
								clearable
							></v-text-field>
						</v-list-item>

						<v-divider></v-divider>

						<v-list-item>
							<v-btn
								color="secondary"
								elevation="2"
								block
								outlined
								rounded
							>
								Remove filter
							</v-btn>
						</v-list-item>
					</v-list>
				</v-menu>
			</template>

			<template v-slot:[`item.name`]="{ item }">
				<CardTextField
					v-model="item.name"
					:rules="getRules.required"
					hint="Name"
					reference="name"
					placeholder="Name"
					label="Name"
					:required="true"
					@change="hasChanged(item)"
				></CardTextField>
			</template>

			<template v-slot:[`item.actions`]="{ item, index }">
				<v-card-actions>
					<!-- Alert Icon Success -->
					<v-icon
						v-show="
							item.status !== undefined &&
							item.status
						"
						small
						style="color: rgb(66, 233, 66) !important"
					>
						mdi-check-circle
					</v-icon>

					<!-- Alert Icon Danger -->
					<v-icon
						v-show="
							item.status !== undefined &&
							!item.status
						"
						small
						style="color: rgb(235, 67, 67) !important"
					>
						mdi-close-circle
					</v-icon>

					<!-- Actión Delete Item -->
					<v-btn
						color="secondary"
						elevation="0"
						medium
						raised
						rounded
						text
						icon
						@click="handleDelete(index)"
					>
						<v-icon small class="secondary--text">
							mdi-trash-can-outline
						</v-icon>
					</v-btn>
				</v-card-actions>
			</template>

		</v-data-table>

		<v-row no-gutters>
			<v-card-subtitle class="secondary--text mt-2">
				Total: {{ records.length }} items
			</v-card-subtitle>
		</v-row>

		<v-row no-gutters align="end" justify="end" class="pl-4 pb-4">
			<v-btn
				rounded
				color="secondary"
				class="ma-2 px-8"
				small
				@click="handleAddItem"
			>
				{{ $t("add list item") }}
			</v-btn>
			<v-btn
				rounded
				color="secondary"
				class="ma-2 px-8"
				small
				@click="handleSubmit"
			>
				{{ $t("save & exit") }}
			</v-btn>
			<v-btn
				rounded
				color="secondary"
				class="ma-2 px-8"
				small
				@click="handleCancel"
			>
				{{ $t("cancel") }}
			</v-btn>
		</v-row>
	</v-card>
</template>

<script lang="ts">
	import Vue from "vue";
	import { isEmpty, isNull, isUndefined, isNaN } from "lodash";
	import { ListItemDataCreate } from "@/interfaces/list_items";
	import CardTextField from "../../../../components/Content/CardTextField.vue";

	export default Vue.extend({
		name: "TableListModelOne",
		props: {
			headers: {
				type: Array,
				default: [],
			},
			items: {
				type: Array,
				default: [],
			},
			title: {
				type: String,
				default: "",
			},
			customList: {
				type: Object,
				default: {},
			}
		},
		components: {
			CardTextField,
		},
		data: () => ({
			records: Array,
			entity: {} as ListItemDataCreate,
			filter: {
				id: {
					value: "",
					order: "asc",
				},
				name: {
					value: "",
					order: "asc",
				},
				value: {
					value: "",
					order: "asc",
				},
				listItem: {
					value: "",
					order: "asc",
				},
			},
		}),

		created() {
			this.records = this.initialicerecords(this.items);
		},

		async mounted() {
			this.records = this.initialicerecords(this.items);
		},

		computed: {
			filteredData() {
				this.filtered = this.items;
				return this.filtered;
			},
			getRules() {
				return {
					required: [(v: any) => Boolean(v) || this.$t("fieldRequired")],
					number: [(v: number) => !isNaN(v) || this.$t("fieldRequired")],
					value: [
						(v: number) => !isNaN(v) || this.$t("must-be-numeric"),
						(v: number) => v >= 0 || this.$t("min", { min: 0 }),
						(v: number) => v <= 100 || this.$t("max", { max: 100 }),
					],
				};
			},
		},

		methods: {
			setNotification(notification: Notification) {
				return this.$store.dispatch(
					"proccess/setNotification",
					notification,
					{ root: true }
				);
			},

			redirectTo() {
				this.setNotification({ title: "", message: "", type: "" });
				this.$router.push({ name: "CustomList" });
			},

			initialicerecords(oldRecords) {
				return oldRecords;
			},

			validateEntity(entity: any): boolean {

				if( isUndefined(entity) || isNull(entity) ){
					return false;
				}

				if( isUndefined(entity.list_item) || isNull(entity.list_item)  || entity.list_item == "" ){
					return false;
				}

				if( !isUndefined(entity.value) ){
					let tempotalValue = parseInt(entity.value);
					if( isNaN(tempotalValue) ){
						return false;
					}else if( tempotalValue < 0 ){
						return false;
					}else if( tempotalValue > 100 ){
						return false;
					}
				}
				return true;
			},

			validate(entities: any[]): boolean {
				if( isUndefined(entities) || isNull(entities) || isEmpty(entities) ){return false;}
				let valid = true;
				let index = 0;
				while ( index < entities.length && valid ) {
					valid = this.validateEntity(entities[index]);
					entities[index].status = valid;
					index++;
				}
				return valid;
			},

			async handleSubmit() {
				try {
					if ( !(await this.validate(this.records)) ) return;
					this.setLoading(true);
					let index: number = 0;
					while ( index < this.records.length ) {
						let result = await this.handleAction(this.records[index]);
						if( result ){
							this.records[index].id = result?.id;
							this.records[index].value = result?.value;
							this.records[index].name = result?.name;
							this.records[index].edited = false;
						}
						index++;
					}
					this.setLoading(false);
				} catch (error) {
					this.setLoading(false);
				}
			},

			setLoading(_loading: Boolean) {
				this.$store.state.proccess.loading = _loading;
			},

			handleCancel() {
				this.$router.push({ name: "CustomListIndex" });
			},

			handleAddItem() {
				let item: any;
				item = {
					id: undefined,
					value: undefined,
					list_item: undefined,
					name: undefined,
					status: undefined,
					message: undefined,
					errors: [],
					actions: [],
					edited: false,
				};
				let result = this.validate(this.records);
				if( result || this.records.length == 0 ){this.records.push(item);}
			},

			async handleDelete(index) {
				this.records.splice(index, 1);
			},

			async handleAction(item: any) {
				this.entity = {
					id: item?.id,
					custom_list_id: this.customList?.id,
					list_item: item?.list_item?.toString()?.trim(),
					name: item?.name?.toString()?.trim(),
					value: item?.value,
					edited: item?.edited,
				} as any;
				let result:any = undefined;
				if( this.entity && this.entity?.id > 0 ){
					if( this.entity.edited ){
						result = await this.$store.dispatch("listItem/update", {listItem: this.entity, customListType: ""}, {
							root: true,
						});
					}
				}else if ( this.entity ) {
					result = await this.$store.dispatch("listItem/create", {listItem: this.entity, customListType: ""}, {
						root: true,
					});
				}
				return result;
			},

			async delete(id: number) {				
				if( id && id > 0 ){
					return await this.$store.dispatch("listItem/delete", id, {
						root: true,
					});
				}
				return {success: true};
			},

			hasChanged(entity: any){
				entity.edited = true;
				return entity;
			},
		},
	});
</script>