<template>
	<v-container>
		
		<v-row no-gutters>
			<!-- ID -->
			<v-col v-if="isEdit" cols="12" md="2" sm="12">
				<v-card
					elevation="0"
					class="pa-2"
					outlined
					tile
					color="rgb(0, 0, 0, 0.0)"
				>
					<v-text-field
						v-model="id"
						ref="id"
						:hint="$t('customList.fields.id')"
						:placeholder="$t('customList.fields.id')"
						:label="$t('customList.fields.id')+'*'"
						class="label-fixed"
						:rules="[getRules.isNumber,getRules.isRequired]"
						:class="{ disabled: isEdit }"
						:disabled="isEdit"
					></v-text-field>
				</v-card>
			</v-col>
		</v-row>
		<v-row no-gutters>
			<!-- List Name -->
			<v-col cols="12" sm="12" md="6">
				<v-card
					elevation="0"
					class="pa-2"
					outlined
					tile
					color="rgb(0, 0, 0, 0.0)"
				>
					<v-text-field
						v-model="name"
						ref="name"
						:hint="$t('customList.fields.name')"
						:placeholder="$t('customList.fields.name')"
						:label="$t('customList.fields.name')+'*'"
						class="label-fixed"
						counter="255"
						:rules="[getRules.isRequired]"
					></v-text-field>
				</v-card>
			</v-col>

			<!-- List Type -->
			<v-col cols="12" sm="12" md="6">
				<v-card
					elevation="0"
					class="pa-2"
					outlined
					tile
					color="rgb(0, 0, 0, 0.0)"
				>
					<v-autocomplete
						class="label-fixed"
						v-model="custom_list_type_id"
						:items="getTypes"
						ref="custom_list_type_id"
						item-text="name"
						item-value="id"
						:hint="$t('customList.fields.type')"
						:label="$t('customList.fields.type')+'*'"
						:placeholder="$t('customList.fields.type')"
						:rules="[getRules.isRequired]"
						@change="onTypeChanged"
						:class="{ disabled: isEdit }"
						:disabled="isEdit"
					></v-autocomplete>
				</v-card>
			</v-col>

			<!-- Radius -->
			<v-col v-if="isRadiusEnabled" cols="12" sm="12" md="6">
				<v-card
					elevation="0"
					class="pa-2"
					outlined
					tile
					color="rgb(0, 0, 0, 0.0)"
				>
					<v-text-field
						v-model="default_radius_km"						
						ref="default_radius_km"
						:hint="$t('customList.fields.radius')"
						:placeholder="$t('customList.fields.radius')"
						:label="$t('customList.fields.radius')"
						class="label-fixed"
						:rules="[getRules.isNumber]"
						:class="{ disabled: isEdit }"
						:disabled="isEdit"
					></v-text-field>
				</v-card>
			</v-col>

			<!-- Status -->
			<v-col cols="12" sm="12" md="3" lg="3">
				<v-card elevation="0" outlined tile color="rgb(0, 0, 0, 0.0)">
					<v-switch
						color="success"
						class="v-input--reverse--column"
						inset
						flat
						hide-details
						v-model="active"
						:label="`${!!custom_list && custom_list.active ? $t('common.fields.active') : $t('common.fields.inactive')}`"
					>
					</v-switch>
				</v-card>
			</v-col>
		</v-row>

		<div v-if="isEdit" class="pt-3">
			<v-divider class="my-4"></v-divider>
			<CustomListItems 
				v-if="!!custom_list && isEdit" 
				:custom_list="custom_list" 
				@handle-list-submit="handleListSubmit"
				@handle-cancel="handleCancel"
			/>
		</div>
		
		<v-divider class="my-4"></v-divider>

		<!-- btn group -->
		<v-row v-if="!isEdit" no-gutters align="center" justify="center">
			<v-col cols="12" sm="12" md="6" lg="8">
				<v-card
					elevation="0"
					class="pa-2"
					outlined
					tile
					color="rgb(0, 0, 0, 0.0)"
				>
					<v-card-text align="start" class="secondary--text info-message">
						* Mandatory fields
					</v-card-text>
				</v-card>
			</v-col>

			<v-col cols="12" sm="12" md="6" lg="4">
				<v-card
					elevation="0"
					class="pa-2"
					outlined
					tile
					color="rgb(0, 0, 0, 0.0)"
				>
					<v-row align="center" justify="center">
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
	</v-container>
</template>

<script lang="ts">
	import { Type } from "../../../interfaces/custom_list";
	import Vue from "vue";
	import { isRequired, isNumber } from "@/services/rule-services";
	import CustomListItems from "../CustomListItems/index.vue";

	export default Vue.extend({
		name: "CustomListForm",
		props: {
			custom_list: {
				required: true,
			},
			is_edit: {
				type: Boolean,
				default: false,
			}
		},
		components: { CustomListItems},
		data: () => ({
			id: undefined,
			name: undefined,
			custom_list_type_id: undefined,
			default_radius_km: undefined,	
			active: true,	
			rules: [isRequired ],
			is_radius_enabled: false
		}),
		created() {},
		async mounted() {
			this.setLoading(true);			
			await this.loadTypes();		
			if(this.custom_list){
				this.id = this.custom_list.id;
				this.name = this.custom_list.name;
				this.custom_list_type_id = this.custom_list.custom_list_type_id;
				this.default_radius_km = this.custom_list.default_radius_km;
				this.active = this.custom_list.active;
				this.is_radius_enabled = this.custom_list.type?.key == 'lat_long'
			}
			this.setLoading(false);
		},
		computed: {
			isEdit() {
				return this.is_edit;
			},
			getTypes(): Type[] {
				return this.$store.state.custom_list.types;
			},
			getRules() {
				return {isRequired, isNumber};
			},
			isRadiusEnabled() {
				return this.is_radius_enabled;
			}
		},
		methods: {
			onTypeChanged(type_id: any){
				this.custom_list_type_id = type_id;
				const type = this.$store.state.custom_list.types.find(item => item.id === type_id);
				console.log('type',this.custom_list_type_id, type);
				this.is_radius_enabled = !!type && type.key == 'lat_long';
			},
			setLoading(loading: Boolean) {
				this.$store.state.proccess.loading = loading;
			},
			loadTypes() {
				return this.$store.dispatch("custom_list/getTypes", {
					root: true,
				});
			},
			handleSubmit() {
				const { id, name, custom_list_type_id, default_radius_km, active} = this;
				this.$emit("handle-submit", { 
					id, 
					name, 
					custom_list_type_id, 
					default_radius_km, 
					active
				});
			},
			async handleListSubmit({ edited, deleted, created, done }) {
				const { id, name, active} = this;
				await this.$emit("handle-submit", { 
					id, 
					name, 
					active,
					edited, 
					deleted,
					created,
					done
				});
			},
			handleCancel() {
				this.$emit("handle-cancel", {});
			},
		},
	});
</script>
