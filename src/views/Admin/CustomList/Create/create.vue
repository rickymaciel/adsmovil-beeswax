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
					:custom_list="custom_list"
					:is_edit="false"
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
	import { CustomListDataCreate } from "../../../../interfaces/custom_list";
	import {
		isRequired,
	} from "../../../../services/rule-services";

	export default Vue.extend({
		name: "ListCreate",
		props: {},
		components: { Alertize, CustomListForm },
		data: () => ({
			title: "Create",
			message: "",
			type: "info",
			valid: true,
			option_selected: undefined, //
			custom_list: {active:true} as CustomListDataCreate,
			type_selected: {} as Type,
		}),
		created() {
			// await this.dispatchTypes();
		},
		mounted() {},
		computed: {},
		methods: {
			async validate() {
				let form = this.$refs.form;
				const valid = await form.validate();
				return await valid;
			},
			async handleSubmit(custom_list) {
				if (!(await this.validate())) return;
				this.setLoading(true);
				this.custom_list = custom_list;
				this.dispatchCreateCustomList().then((result: any) => {
					this.setLoading(false);
				});
				
			},
			setLoading(loading: Boolean) {
				this.$store.state.proccess.loading = loading;
			},
			handleCancel() {
				this.$router.push({ name: "CustomListIndex" });
			},
			async dispatchCreateCustomList() {
				return this.$store.dispatch("custom_list/create",this.custom_list,{root: true});
			}
		},

		watch: {
			async option_selected(val, old) {}
		},
	});
</script>
