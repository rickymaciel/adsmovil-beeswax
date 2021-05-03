<template>
	<v-container class="my-0">
		<Alertize :message="message" :type="type"></Alertize>
		<v-layout column>
			<ModelOne v-if="modelSelected == 'ModelOne'"></ModelOne>
			<ModelTwo v-else-if="modelSelected == 'ModelTwo'"></ModelTwo>
			<ModelTree v-else-if="modelSelected == 'ModelTree'"></ModelTree>
		</v-layout>
	</v-container>
</template>

<script lang="ts">
	import Vue from "vue";
	import {
		List,
		ListDataCreate,
		Type,
	} from "../../../../interfaces/list";
	import { isEmpty, isNull, isUndefined, isNaN } from "lodash";

	import Alertize from "../../../../components/Alertize.vue";
	import ModelOne from "./modelOne.vue";
	import ModelTwo from "./modelTwo.vue";
	import ModelTree from "./modelTree.vue";

	export default Vue.extend({
		name: "CreateItem",
		props: {
			modelSelected: {
				type: String,
				default: undefined,
			}
		},
		components: { Alertize, ModelOne, ModelTwo, ModelTree },
		data: () => ({
			title: "Create",
			list: {} as ListDataCreate,
			message: "",
			type: "info",
			viewModelOne: false,
			viewModelTwo: false,
			viewModelTree: false,
		}),
		created() {},
		async mounted() {},
		computed: {
			getTypes(): Type[] {
				//return this.$store.state.list.types;
				const data: Type[] = [
					{	id: 1,
						key: "1",
						name: "App Bundle List" },
					{	id: 2,
						key: "2",
						name: "App ID List" },
					{	id: 3,
						key: "3",
						name: "Deal ID" },
					{	id: 4,
						key: "4",
						name: "Domain ID List" },
					{	id: 5,
						key: "5",
						name: "IP Address List" },
					{	id: 6,
						key: "6",
						name: "Lat Long List" },
					{	id: 7,
						key: "7",
						name: "Placement ID List" },
					{	id: 8,
						key: "8",
						name: "Publisher ID List" },
					{	id: 9,
						key: "9",
						name: "Site ID List" },
					{	id: 10,
						key: "10",
						name: "Zip Code List" }
				]
				return data;
			},
			getList(): List {
				return this.list;
			},
			getModel(){
				return this.selectModelView(this.modelSelected)
			}
		},
		methods: {},
	});
</script>
