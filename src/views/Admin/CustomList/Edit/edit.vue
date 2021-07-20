<template>
	<v-container class="my-0">
		<Alertize :message="message" :type="type"></Alertize>
		<v-layout column>
			<v-form
				ref="form"
				justify="center"
				align="center"
				v-model="valid"
				lazy-validation
			>
				<CustomListForm 
					v-if="getCustomList"
					:custom_list="getCustomList"
					:is_edit="true"
					@handle-submit="handleSubmit"
					@handle-cancel="handleCancel"
				></CustomListForm>

			</v-form>
		</v-layout>
	</v-container>
</template>

<script lang="ts">
	import Vue from "vue";
	import { Type } from "../../../../interfaces/list";
	import Alertize from "../../../../components/Alertize.vue";
	import CustomListForm from "../CustomListForm.vue";
	import { last, toNumber } from "lodash";

	export default Vue.extend({
		name: "ListEdit",
		props: {},
		components: { Alertize, CustomListForm },
		data: () => ({
			id: undefined,
			CustomListItems: "Edit",
			message: "",
			type: "info",
			valid: true,
			option_selected: undefined, //
			custom_list: undefined,
			type_selected: {} as Type,
		}),
		created() {},
		async mounted() {
			this.setLoading(true);
			this.id = this.getId;
			this.custom_list = await this.loadCustomList(this.id);
			this.setLoading(false);
		},
		computed: {
			getId() {
				let pathArray: String[] = this.$route.path.split("/");
				const lastItem = last(pathArray);
				return !isNaN(toNumber(lastItem)) ? toNumber(lastItem) : NaN;
			},	
			getCustomList() {
				return this.custom_list;
			}
		},
		methods: {
			setLoading(loading: Boolean) {
				this.$store.state.proccess.loading = loading;
			},
			async validate() {
				let form = this.$refs.form;
				const valid = await form.validate();
				return await valid;
			},
			async handleSubmit(updates) {
				const valid = await this.validate();
				console.log('valid',valid);
				if (!valid) return;
				this.setLoading(true);
				await this.dispatchEditCustomList(updates); 				
				updates.done();
				this.setLoading(false);
			},
			handleCancel() {
				this.$router.push({ name: "CustomListIndex" });
			},
			async loadCustomList(id) {
				if (isNaN(id)) return;
				return await this.$store.dispatch("custom_list/show", id, {root: true});
			},			
			async dispatchEditCustomList(updates) {
				return this.$store.dispatch("custom_list/update", updates, {root: true});
			}
		},

		watch: {
			async option_selected(val, old) {}
		},
	});
</script>
