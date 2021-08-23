<template>
	<div>
		<v-card class="pa-5 pb-0 mt-5 mb-5">
			<v-row no-gutters>
				<v-col cols="12" sm="12" md="12" lg="12" align="left">
					
					<v-card-title>{{ $t("customListItem.list.title") }}</v-card-title>

					<v-card-subtitle>
						{{ $t("customListItem.labels.inputInstructions") }}
					</v-card-subtitle>

					<v-card-subtitle v-if="input_mode == 'upload'" class="pt-0 pb-0">
						<v-icon color="red" class="pr-2">mdi-alert-circle</v-icon>
						<strong style="color:red">File must have .csv extension and must be delimited by semicolon</strong>
					</v-card-subtitle>
					
					<v-card-text>
						<v-row no-gutters>
							<v-col cols="12" lg="6" xs="12">
								<v-radio-group 
									row
									v-model="input_mode"
									@onChange="handleInputTypeChanged"
								>
									<v-radio
										:label="$t('customListItem.labels.manualInput')"
										value="manual"
									></v-radio>
									<v-radio
										:label="$t('customListItem.labels.uploadInput')"
										value="upload"
									></v-radio>
								</v-radio-group>
							</v-col>
							<v-col cols="12" lg="6" xs="12" class="pt-2 pr-0" align="right">
								<v-row class="ma-0 pa-0" v-if="input_mode=='upload'" no-gutters>
									<v-col lg="8" xs="12">
										<v-file-input
											v-model="filename"
											accept="text/csv"
											truncate-length="30"
											class="pa-0 ma-0"
											@change="handleSelectFile"
										/>
									</v-col>
									<v-col lg="4" xs="12">
										<v-btn
											rounded
											color="secondary"
											class="mx-2 px-8"
											@click="handleUpload"
										>
											{{ $t("customListItem.actions.upload") }}
										</v-btn>									
									</v-col>
								</v-row>
								<v-btn
									v-if="input_mode=='manual'"
									rounded
									color="secondary"
									class="mx-2 px-8"
									@click="handleAddItem"
								>
									{{ $t("customListItem.actions.add") }}
								</v-btn>
							</v-col>
						</v-row>
						<v-row class="ma-0 pa-0" v-if="input_mode=='upload' && current_file" no-gutters>
								<v-col lg="12">
									<v-progress-linear v-model="upload_progress"/>
								</v-col>
						</v-row>						
					</v-card-text>
					
				</v-col>
			</v-row>		
			<v-row no-gutters>
				<v-col md="12">
					<CustomListItemTable 
						:input_mode="input_mode"
						:custom_list="custom_list"
						:current_page="Number(getPaginatedResult.current_page)"
						:next_page_url="String(getPaginatedResult.next_page_url)"
						:path="String(getPaginatedResult.path)"
						:per_page="Number(getPaginatedResult.per_page)"
						:prev_page_url="String(getPaginatedResult.prev_page_url)"
						:to="Number(getPaginatedResult.to)"
						:total="Number(getPaginatedResult.total)"					
						:headers="prepareTableHeaders"
						:items="prepareTableContent"
						:option="option"
						:filters="filters"
						:exchanges="getExchanges"	
						@add-item="handleAddItem"					
						@edit-item="handleEditItem"					
						@delete-item="handleDeleteItem"					
						@update-current-page="handleUpdateCurrentPage"					
					/>
				</v-col>
			</v-row>		
		</v-card>
		<v-row no-gutters>
				<v-col cols="12" sm="12" md="6">
					<v-card
						elevation="0"
						class="pa-2"
						outlined
						tile
						color="rgb(0, 0, 0, 0.0)"
					>
						<v-card-text align="start" class="secondary--text info-message">
							{{ $t('common.labels.mandatory') }}
						</v-card-text>
					</v-card>
				</v-col>			
				<v-col md="6" class="pt-md-4">
					<v-card
						elevation="0"
						class="pa-2"
						outlined
						tile
						color="rgb(0, 0, 0, 0.0)"
					>
						<v-row align="end" justify="end">
							<v-btn
								rounded
								color="secondary"
								class="mx-2 px-8"
								@click="handleSubmit"
							>
								{{ $t("common.actions.save_continue") }}
							</v-btn>
							<v-btn
								rounded
								color="secondary"
								class="mx-2 px-8"
								@click="handleCancel"
							>
								{{ $t("common.actions.cancel") }}
							</v-btn>
						</v-row>
					</v-card>			
				</v-col>
		</v-row>
	</div>
</template>

<script lang="ts">
	import Vue from "vue";
	import { Paginated, SortingOption } from "@/interfaces/paginated";
	import { ResultPaginate } from "@/interfaces/user";
	import ParamService from "@/services/params-service";
	import { isNull, isUndefined } from "lodash";
	import CustomListItemTable from "./CustomListItemTable.vue";
	import notificationService from '@/services/notification-service'
	import { MessageTypes, Notification } from "@/interfaces/proccess";
	import i18n from "@/plugins/i18n";

	export default Vue.extend({
		name: "CustomListItems",
		props: {
			custom_list: {required: true},
		},
		components: { CustomListItemTable },
		data: () => ({
			page: {},
            input_mode: "manual",			
			headers: [],
			filters: {},
			paginated: { page: 1, limit: 10 } as Paginated,
			option: { sort: "id", order: "desc" } as SortingOption,			
			current_file: undefined,
			upload_progress: 0,
			filename: undefined,
			exchanges: [],
			prefix_types: [
				'app_id',
				'deal_id', 
				'placement_id', 
				'publisher_id', 
				'site_id'
			]
		}),
			created() {
		},
		async mounted() {
			this.setLoading(true);
			this.loadExchanges();
			this.page = await this.getPaginated();
			this.setLoading(false);
		},
		computed: {
			getPaginatedResult(): ResultPaginate {
				return this.page;
			},	
			getCustomListItems() {
				const result: ResultPaginate = this.getPaginatedResult;
				if (isUndefined(result) || isNull(result) || isUndefined(result.data) || isNull(result.data)) {
					return [];
				}
				return result.data;				
			},	
			getExchanges() {
				return this.exchanges;
			},	
			prepareTableHeaders() {
				
				const items = this.getCustomListItems;
				
				if(isUndefined(this.custom_list) || isUndefined(items) || isNull(items)) return [];
				
				const {type} = this.custom_list;
				
				const headers = [
					{
						text: "ID",
						align: "center",
						value: "id",
					},
					{
						text: i18n.t("customListItem.fields.latitude")+"*",
						align: "center",
						value: "lat",
					},
					{
						text: i18n.t("customListItem.fields.longitude")+"*",
						align: "center",
						value: "long",
					},
					{
						text: i18n.t("customListItem.fields.radius_km")+"*",
						align: "center",
						value: "radius_km",
					},
					{
						text: i18n.t("customListItem.fields.prefix")+"*",
						align: "center",
						value: "prefix",
					},
					{
						text: i18n.t("customListItem.fields.list_item")+"*",
						align: "center",
						value: "list_item",
					},
					{
						text: i18n.t("customListItem.fields.value"),
						align: "center",
						value: "value",
					},
					{
						text: i18n.t("customListItem.fields.name")+"*",
						align: "center",
						value: "name",
					},
					{
						text: "",
						align: "center",
						sortable: false,
						value: "actions",
						width: "5%",
					}					
				];


				// si es tipo lat_long
				if(type.key === 'lat_long') {
					const cols = ['id','lat','long','radius_km','value','name','actions'];
					return headers.filter(item => cols.indexOf(item.value) != -1);
				}
				// si el tipo esta entre los prefix_types
				else if(this.prefix_types.indexOf(type.key) != -1) {					
					const cols = ['id','prefix','list_item','value','name','actions'];
					return headers.filter(item => cols.indexOf(item.value) != -1);
				}
				else {
					const cols = ['id','list_item','value','name','actions'];
					return headers.filter(item => cols.indexOf(item.value) != -1);
				}
			},
			prepareTableContent() {

				const items = this.getCustomListItems;
				
				if (isUndefined(this.custom_list) || isUndefined(items) || isNull(items)) return [];

				const type = this.custom_list.type.key;
				const table_content = items.map(item => {
					if(type == 'lat_long' && item.list_item != ""){
						item.lat = item.list_item.lat;
						item.long = item.list_item.long;
						item.radius_km = item.list_item.radius_km;
						return item;
					}
					else if(this.prefix_types.indexOf(type) != -1 && item.list_item != "") {
						const parts = item.list_item.split('/');
						if(parts.length == 2){
							item.prefix = parts[0];
							item.list_item = parts[1];
						}
						return item;
					}
					else {
						return item;
					}					
				});
				
				return table_content;
			}
		},
		methods: {
			async getPaginated() {
				this.filters.custom_list_id = this.custom_list.id;
				const params = await ParamService.getParams(this.paginated,this.filters,this.option);
				return await this.$store.dispatch("list_item/paginated", params, {root: true});
			},
			async deleteCustomListItem(id) {
				return await this.$store.dispatch("list_item/delete", id, {root: true});
			},		
			setLoading(loading: Boolean) {
				this.$store.state.proccess.loading = loading;
			},
			handleInputTypeChanged(v: any) {
				console.log('handleInputTypeChanged', v);
			},
			handleAddItem() {
				this.page.data.unshift({
					id: undefined,
					value: "",
					name: "",
					editing: true,
					lat: undefined,
					long: undefined,
					radius_km: this.custom_list.default_radius_km ? this.custom_list.default_radius_km : undefined,
					list_item: "",
					prefix: undefined
				});
			},
			async handleEditItem(index) {
				const item = this.page.data[index];
				this.page.data.splice(index,1,{...item, editing: true});
			},
			async handleDeleteItem(index) {
				let item = this.page.data[index];
				if(!!item.id) {
					delete item.editing;					
					this.page.data.splice(index,1,{ ...item, deleted: true });
				}
				else {
					this.page.data.splice(index, 1);
				}
				
			},
			async handleSubmit() {
				const edited = this.page.data.filter(item => !!item.id && item.editing)
					.map(({id, value, name}) => ({id, value, name}))
				const deleted = this.page.data.filter(item => item.deleted)
					.map(({id}) => ({id}));
				const created = this.page.data.filter(item => !!!item.id)
					.map(item => {
						const type = this.custom_list.type.key;
						if(type == 'lat_long') {
							const {lat,long,radius_km} = item;
							item = {
								...item,
								list_item: { 
									lat: Number(lat), 
									long: Number(long), 
									radius_km: Number(radius_km) }
							}
						}
						else if(this.prefix_types.indexOf(type) != -1) {
							item.list_item = `${item.prefix}/${item.list_item}`;
						}
						return {
							...item, 
							custom_list_id: this.custom_list.id
						};
					});
				
				this.$emit("handle-list-submit", {edited, deleted, created, done: async () => {
					this.page = await this.getPaginated();
				}});
			},
			handleCancel() {
				this.$emit("handle-cancel", {});
			},
			async handleUpdateCurrentPage(page) {
				const edited = this.page.data.filter(item => !!item.id && item.editing).length > 0;
				const deleted = this.page.data.filter(item => item.deleted).length > 0;
				const created = this.page.data.filter(item => !!!item.id).length > 0;
				if(edited || deleted || created) {
					this.$store.dispatch(
						"proccess/setNotification", 
						await notificationService.CreateNotification({
							type: MessageTypes.ERROR,
							title: 'Error',
							message: i18n.t('customListItem.labels.paginationError'),
							btn_text: i18n.t(MessageTypes.CONTINUE)
						} as Notification), 
						{ root: true }
					);
					return;
				}
				this.setLoading(true);
				this.paginated.page = page;
				this.page = await this.getPaginated();
				this.setLoading(false);
			},
			handleSelectFile(file) {	
				this.current_file = file;
				this.upload_progress = 0;
			},
			onUploadProgress(event) {
        		this.upload_progress = Math.round((100 * event.loaded) / event.total);				
      		},
			async handleUpload() {
				if(!this.current_file || this.upload_progress != 0) return;
				this.setLoading(true);
				try {
					await this.$store.dispatch('custom_list/uploadItems', {
						payload:{
							custom_list_id: this.custom_list.id,
							file: this.current_file	
						}
						,function: this.onUploadProgress
					}, { root: true });
					this.page = await this.getPaginated();
					this.setLoading(false);
					this.filename = undefined;
					this.current_file = undefined;
					this.upload_progress = 0;
				}
				catch(error) {
					console.error('handleUpload', error);
				}
			},
			
			/*
			 * Carga la lista de exchanges
			 */		
			async loadExchanges() {
				this.exchanges = await this.$store.dispatch(
					'lists/getList', 
					{ list_name:	'custom_list_exchanges' }, 
					{ root: true }
				);
			}
		},
	});
</script>
