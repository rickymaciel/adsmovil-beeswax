<template>
	<section>
		<v-data-table
			:headers="headers"
			:items="prepareTableContent"
			item-key="association"
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

			<!-- THUMBAILS -->
			<template v-slot:[`header.thumbnail`]="{ header }">
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
								v-model="filter.thumbnail.value"
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

			<!-- THUMBAILS -->
			<template v-slot:[`item.thumbnail`]="{ item }">
				<v-card-actions>
					<v-img
						v-if="item.thumbnail"
						style="borderRadius: 5px"
						:lazy-src="item.thumbnail"
						max-height="45"
						max-width="45"
						:src="item.thumbnail"
					></v-img>
					<v-img
						v-else
						style="borderRadius: 5px"
						lazy-src="https://picsum.photos/id/11/10/6"
						max-height="45"
						max-width="45"
						src="https://picsum.photos/id/11/500/300"
					></v-img>
				</v-card-actions>
			</template>

			<!-- CREATIVE ID -->
			<template v-slot:[`header.creative_id`]="{ header }">
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
								v-model="filter.creative_id.value"
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

			<!-- CREATIVE NAME -->
			<template v-slot:[`header.creative_name`]="{ header }">
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
								v-model="filter.creative_name.value"
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

			<!-- SIZE -->
			<template v-slot:[`header.size`]="{ header }">
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
								v-model="filter.size.value"
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

			<!-- START DATE -->
			<template v-slot:[`header.start_date`]="{ header }">
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
								ref="start_date"
								v-model="filter.start_date.value"
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

			<!-- END DATE -->
			<template v-slot:[`header.end_date`]="{ header }">
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
								v-model="filter.end_date.value"
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

			<!-- ACTIONS -->
			<template v-slot:[`header.actions`]="{ header }">
				<v-container fluid class="delete-all-container">
					<div class="delete-all-box">
						<p class="delete-all-label">Delete all</p>
						<v-checkbox
							class="delete-all-option"
							label=""
							v-model="delete_all_selected"
							value="delete_all"
						></v-checkbox>
					</div>
				</v-container>
			</template>

				
			<template v-slot:[`item.start_date`]="{ item }">
				<p v-if="!item.edited">{{item.start_date}}</p>
				<DatePicker
					v-if="item.edited"
					v-model="item.new_start_date"
					:min_date="getToday"
					:rules="start_date_rules"
					:required="true"
					:withoutLabel="true"
				></DatePicker>
			</template>

			<template v-slot:[`item.end_date`]="{ item }">
				<p v-if="!item.edited">{{item.end_date}}</p>
				<DatePicker
					v-if="item.edited"
					v-model="item.new_end_date"
					:min_date="getMinDate"
					:rules="end_date_rules"
					:is_end="true"
					:required="true"
					:withoutLabel="true"
				></DatePicker>
			</template>

			<!-- ACTIONS -->
			<template v-slot:[`item.actions`]="{ item }">
				<v-card-actions>
					<!-- ENABLE EDIT -->
					<v-btn
						color="secondary"
						elevation="0"
						medium
						raised
						rounded
						text
						icon
						v-if="!item.edited"
						@click="handleEnableEdit(item)"
					>
						<v-icon small class="secondary--text">
							mdi-pencil
						</v-icon>
					</v-btn>

					<!-- CANCEL EDIT -->
					<v-btn
						color="secondary"
						elevation="0"
						medium
						raised
						rounded
						text
						icon
						v-if="item.edited"
						@click="handleCancelEdit(item)"
					>
						<v-icon small class="danger--text">
							mdi-close-circle
						</v-icon>
					</v-btn>

					<!-- CONFIRM EDIT -->
					<v-btn
						color="secondary"
						elevation="0"
						medium
						raised
						rounded
						text
						icon
						v-if="item.edited"
						@click="handleConfirmEdit(item)"
					>
						<v-icon small class="success--text">
							mdi-check-circle
						</v-icon>
					</v-btn>

					<!-- DELETE ASSOCIATION -->
					<v-btn
						color="secondary"
						elevation="0"
						medium
						raised
						rounded
						text
						icon
						v-if="!item.edited"
						@click="deleteAssociation(item.id)"
					>
						<v-icon small class="secondary--text">
							mdi-delete
						</v-icon>
					</v-btn>
				</v-card-actions>
			</template>

		</v-data-table>

	</section>
</template>

<script lang="ts">
	import DatePicker from "../../../../components/Content/DatePicker.vue";
	import {
		isNull,
		isUndefined,
	} from "lodash";
	import Vue from "vue";
	import {
		isRequired,
		isNumber,
		isAfterToday,
		isAfterCompare,
	} from "../../../../services/rule-services";
	const DATE_TIME_FORMAT = "YYYY-MM-DD HH:mm:ss";
	const DATE_FORMAT = "DD-MM-YYYY";

	export default Vue.extend({
		name: "AssociationTable",
		props: {
			headers: {
				type: Array,
				default: [],
			},
			/* items: {
				type: Array,
				default: [],
			}, */
			line_item: {
				type: Object,
				default: function () {
					return {};
				},
			},
		},
		components: {
			DatePicker,
		},
		data: () => ({
			filter: {
				id: {
					value: "",
					order: "asc",
				},
				thumbnail: {
					value: "",
					order: "asc",
				},
				creative_id: {
					value: "",
					order: "asc",
				},
				creative_name: {
					value: "",
					order: "asc",
				},
				size: {
					value: "",
					order: "asc",
				},
				start_date: {
					value: "",
					order: "asc",
				},
				end_date: {
					value: "",
					order: "asc",
				},
			},
			start_date_rules: [],
			end_date_rules: [],
			delete_all_selected: null,
			all_selected: []
		}),

		created() {},

		mounted() {},

		computed: {
			getRules() {
				return {
					isRequired,
					isNumber,
					isAfterToday,
					isAfterCompare,
				};
			},

			getToday() {
				return this.moment().format(DATE_TIME_FORMAT);
			},

			getMinDate() {
				if (this.getLineItem?.start_date) {
					return this.moment(this.getLineItem?.start_date).format(
						DATE_TIME_FORMAT
					);
				}
				return undefined;
			},

			currentPage: {
				set(val) {
					this.$emit("update-current-page", val);
				},
				get() {
					return this.current_page;
				},
			},

			getRecords(){
				if( !isNull(this.getLineItem?.creative_associations) && !isUndefined(this.getLineItem?.creative_associations) ){
					return this.getLineItem.creative_associations;
				}
				return this.entities;
			},

			getLineItem() {
				let result = this.$store.state.line_item.lineItem;
				if ( !isNull(result) && !isUndefined(result) ) {
					return result;
				}
				return this.line_item;
			},

			prepareTableContent() {
				const entities = this.getRecords;

				if ( isUndefined(entities) || isNull(entities) ) return [];

				return entities.map((entity: any) => {
					return {
						id: entity?.id,
						thumbnail: entity?.thumbnail,
						creative_id: entity?.creative_id ? Number(entity?.creative_id) : undefined,
						creative_name: entity?.creative_name,
						size: entity?.size ? entity.size : undefined,
						start_date: entity?.start_date ? this.moment(entity?.start_date).format(DATE_FORMAT) : undefined,
						end_date: entity?.end_date ? this.moment(entity.end_date).format(DATE_FORMAT) : undefined,
						line_item_id: entity?.line_item_id ? Number(entity?.line_item_id) : undefined,
						active: entity?.active ? true : false,
						edited: false,
						new_start_date: undefined,
						new_end_date: undefined,
						valid: true,
					}
				});
			},
		},

		methods: {
			async validate() {
				return await this.$refs.form.validate();
			},

			async addValidations() {
				this.start_date_rules = [
					this.getRules.isRequired,
					this.getRules.isAfterToday,
				];
				this.end_date_rules = [
					this.getRules.isRequired,
					this.getRules.isAfterCompare(
						this.getLineItem.end_date,
						this.getLineItem.start_date
					),
				];
			},

			getColor(active: Boolean) {
				return active ? "green--text" : "red--text";
			},

			getActiveText(active: Boolean) {
				return active ? "Active" : "Inactive";
			},

			async deleteAssociation(id: number) {
				if ( isNull(id) || isUndefined(id) ) {return false;}
				try {
					await this.setLoading(true);
					await this.$store.dispatch(
						"creative/associateLineItemDelete",
						id
					).then( (result) => {
						this.dispatchShowLineItem(this.getLineItem?.id);
					},
					(error) => {
						console.error("-- deleteAssociation::error", error);
					}).catch( (error) => {
						console.error("handleAction:deleteAssociation:catch", error);
					});
					await this.setLoading(false);
				} catch (error) {
					console.error("deleteAssociation", { error: error });
					await this.setLoading(false);
				}
			},

			async handleEnableEdit(record: any) {
				record.edited = true;
				return record;
			},

			async handleConfirmEdit(record: any) {
				//await this.addValidations();
				//if (!(await this.validate())) return;

				record.start_date = this.moment(
					String(record.new_start_date)
				).format(DATE_TIME_FORMAT),
				record.end_date = this.moment(
					String(record.new_end_date)
				).format(DATE_TIME_FORMAT),
				
				record.new_start_date = this.moment(
					String(record.new_start_date)
				).format(DATE_TIME_FORMAT),
				record.new_end_date = this.moment(String(record.new_end_date)).format(
					DATE_TIME_FORMAT
				),

				await this.setLoading(true);
				await this.updateAssociate(record);
				await this.setLoading(false);
				return record;
			},

			async handleCancelEdit(record: any) {
				record.edited = false;
				record.start_date = this.moment(record.new_start_date).format(DATE_FORMAT);
				record.end_date = this.moment(record.new_end_date).format(DATE_FORMAT);
				record.new_start_date = undefined;
				record.new_end_date = undefined;
				return record;
			},

			async setLoading(_loading: Boolean) {
				this.$store.state.proccess.loading = _loading;
			},

			async dispatchShowLineItem(id: any) {
				return await this.$store.dispatch("line_item/show", id, {
					root: true,
				});
			},

			async updateAssociate(record: any) {
				await this.$store.dispatch(
					"creative/associateLineItemUpdate",
					record
				).then( (result) => {
					record.start_date = this.moment(record.new_start_date).format(DATE_FORMAT),
					record.end_date = this.moment(record.new_end_date).format(DATE_FORMAT),
					record.edited = false;
				},
				(error) => {
					console.error("-- updateAssociate::error", error);
				}).catch( (error) => {
					console.error("handleAction:updateAssociate:catch", error);
				});
			},
		},

		watch: {
			delete_all_selected(val, old){
				this.$emit("delete-all-selected", val);
			}
		}
	});
</script>

<style scoped>
	.delete-all-container{
		padding-right: 0px; 
		padding-left: 0px;
	}
	
	.delete-all-box{
		padding-top: 5px;
	}
		
	.delete-all-label{
		float: left;
		padding-top: 5px;
	}
		
	.delete-all-option{
		padding: 0px;
		margin: 0px;
		float: right;
	}
</style>