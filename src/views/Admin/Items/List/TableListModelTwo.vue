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

			<!-- LATITUDE -->
			<template v-slot:[`header.latitude`]="{ header }">
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
								v-model="filter.latitude.value"
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
			
			<template v-slot:[`item.latitude`]="{ item }">
				<v-text-field
					v-model="item.latitude"
					:rules="getRules.lat"
					placeholder="Latitude"
					class="label-fixed"
					:disabled="item.id > 0"
					:class="{ disabled: item.id > 0 }"
				></v-text-field>
			</template>
			
			<!-- LONGITUDE -->
			<template v-slot:[`header.longitude`]="{ header }">
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
								v-model="filter.longitude.value"
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
			
			<template v-slot:[`item.longitude`]="{ item }">
				<v-text-field
					v-model="item.longitude"
					:rules="getRules.long"
					placeholder="Longitude"
					class="label-fixed"
					:disabled="item.id > 0"
					:class="{ disabled: item.id > 0 }"
				></v-text-field>
			</template>

			<!-- RADIUS -->
			<template v-slot:[`header.radius`]="{ header }">
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
								v-model="header.radius"
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

			<template v-slot:[`item.radius`]="{ item }">
				<v-text-field
					v-model="item.radius"
					:rules="getRules.radius_km"
					placeholder="Radius"
					class="label-fixed"
					:disabled="item.id > 0"
					:class="{ disabled: item.id > 0 }"
				></v-text-field>
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
								v-model="header.value"
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
				<v-text-field
					v-model="item.value"
					:rules="getRules.value"
					placeholder="Value"
					class="label-fixed"
					@change="hasChanged(item)"
				></v-text-field>
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
								v-model="header.name"
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
				<v-text-field
					v-model="item.name"
					:rules="getRules.required"
					placeholder="Name"
					class="label-fixed"
					@change="hasChanged(item)"
				></v-text-field>
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
				class="mx-2 px-8"
				@click="handleAddItem"
			>
				{{ $t("add list item") }}
			</v-btn>
			<v-btn
				rounded
				color="secondary"
				class="mx-2 px-8"
				@click="handleSubmit"
			>
				{{ $t("save & exit") }}
			</v-btn>
			<v-btn
				rounded
				color="secondary"
				class="mx-2 px-8"
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

	export default Vue.extend({
		name: "TableListModelTwo",
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
		components: {},
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
				latitude: {
					value: "",
					order: "asc",
				},
				longitude: {
					value: "",
					order: "asc",
				},
				radius: {
					value: "",
					order: "asc",
				},
				value: {
					value: "",
					order: "asc",
				},
			},
		}),

		created() {
			this.records = this.initialicerecords(this.items);
		},

		mounted() {
			this.records = this.initialicerecords(this.items);
			/*this.setLoading(true);
			this.records await this.dispatchEntities(this?.customList?.id);
			this.setLoading(false);*/
		},

		computed: {
			filteredData() {
				this.filtered = this.items;
				return this.filtered;
			},
			getRules() {
				return {
					required: [(v: any) => Boolean(v) || this.$t("fieldRequired")],
					lat: [
						(v: any) => Boolean(v) || this.$t("fieldRequired"),
						(v: number) => !isNaN(v) || this.$t("must-be-numeric"),
						(v: number) => v >= -90 || this.$t("min", { min: -90 }),
						(v: number) => v <= 90 || this.$t("max", { max: 90 }),
					],
					long: [
						(v: any) => Boolean(v) || this.$t("fieldRequired"),
						(v: number) => !isNaN(v) || this.$t("must-be-numeric"),
						(v: number) => v >= -180 || this.$t("min", { min: -180 }),
						(v: number) => v <= 180 || this.$t("max", { max: 180 }),
					],
					value: [
						(v: number) => !isNaN(v) || this.$t("must-be-numeric"),
						(v: number) => v >= 0 || this.$t("min", { min: 0 }),
						(v: number) => v <= 100 || this.$t("max", { max: 100 }),
					],
					radius_km: [
						(v: any) => Boolean(v) || this.$t("fieldRequired"),
						(v: number) => !isNaN(v) || this.$t("must-be-numeric"),
						(v: number) => v >= 0.001  || this.$t("min", { min: 0.001  }),
						(v: number) => v <= 50 || this.$t("max", { max: 50 }),
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
					//entity = {errors: ["Item cannot be empty."]};
				}//else{entity.errors = new Array;}

				if( isUndefined(entity.latitude) || isNull(entity.latitude)  || entity.latitude == "" ){
					return false;
					//entity.errors?.push(this.$t("fieldRequired"));
				}else{
					let tempotalValue = parseFloat(entity.latitude);
					if( isNaN(tempotalValue) || (tempotalValue < -90 ) ){
						return false;
						//entity.errors?.push(this.$t("min", { min: -90 }));
					}else if( isNaN(tempotalValue) || tempotalValue > 90 ){
						//entity.errors?.push(this.$t("min", { min: 90 }));
						return false;
					}
				}

				if( isUndefined(entity.longitude) || isNull(entity.longitude)  || entity.longitude == "" ){
					return false;
					//entity.errors?.push(this.$t("fieldRequired"));
				}else{
					let tempotalValue = parseFloat(entity.longitude);
					if( isNaN(tempotalValue) || (tempotalValue < -180 ) ){
						return false;
						//entity.errors?.push(this.$t("min", { min: -180 }));
					}else if( isNaN(tempotalValue) || tempotalValue > 180 ){
						return false;
						//entity.errors?.push(this.$t("min", { min: 180 }));
					}
				}

				if( !isUndefined(entity.value) ){
					let tempotalValue = parseFloat(entity.value);
					if( isNaN(tempotalValue) ){
						return false;
						//entity.errors?.push(this.$t("must-be-numeric"));
					}else if( tempotalValue < 0 ){
						return false;
						//entity.errors?.push(this.$t("min", { min: 0 }));
					}else if( tempotalValue > 100 ){
						return false;
						//entity.errors?.push(this.$t("max", { max: 100 }));
					}
				}

				if( isUndefined(entity.radius) ){
					return false;
					//entity.errors?.push(this.$t("fieldRequired"));
				}else{
					let tempotalValue = parseFloat(entity.radius);
					if( isNaN(tempotalValue) ){
						return false;
						//entity.errors?.push(this.$t("must-be-numeric"));
					}else if( tempotalValue < 0.001 ){
						return false;
						//entity.errors?.push(this.$t("min", { min: 0 }));
					}else if( tempotalValue > 50 ){
						return false;
						//entity.errors?.push(this.$t("max", { max: 50 }));
					}
				}

				/* if( entity && entity.errors ){
					return !( entity.errors.length > 0);
				}else{return false;} */
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
					latitude: undefined,
					longitude: undefined,
					radius: undefined,
					value: undefined,
					name: undefined,
					actions: [],
					edited: false,
					status: undefined,
				};
				let result = this.validate(this.records);
				if( result || this.records.length == 0 ){this.records.push(item);}
			},
			async handleDelete(index) {
				/*let result = await this.delete(this.records[index].id);
				if( result && result.success ){
					this.records.splice(index, 1);
				}*/
				this.records.splice(index, 1);
			},
			/*async dispatchEntities(id: number) {
				return this.$store.dispatch("listItem/getAll", id, {
					root: true,
				});
			},*/
			async handleAction(item: any) {
				this.entity = {
					id: item?.id,
					custom_list_id: this.customList?.id,
					list_item: {
						lat: parseFloat(item?.latitude),
						long: parseFloat(item?.longitude),
						radius_km: parseFloat(item?.radius),
					},
					name: item?.name?.toString()?.trim(),
					value: parseFloat(item?.value),
					edited: item?.edited,
				} as any;
				let result:any = undefined;
				if( this.entity && this.entity?.id > 0 ){
					if( this.entity.edited ){
						result = await this.$store.dispatch("listItem/update", {listItem: this.entity, customListType: "lat_long"}, {
							root: true,
						});
					}
				}else if ( this.entity ) {
					result = await this.$store.dispatch("listItem/create", {listItem: this.entity, customListType: "lat_long"}, {
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
