<template>
	<div>
		<v-row
			align="center"
			justify="start"
			dense
			v-for="(item, index) in items"
			:key="index"
		>
			<!-- time -->
			<v-col class="pe-lg-16 pa-0" cols="12" sm="12" md="4" lg="4">
				<CardTextField
					v-model="item.time"
					:rules="[getRules.isRequired]"
					class="label-fixed"
					hint="Time"
					:reference="'time_' + index"
					placeholder="Time"
					label="Time"
					:required="true"
					type="time"
				></CardTextField>
			</v-col>

			<!-- url -->
			<v-col class="pe-lg-16 pa-0" cols="12" sm="12" md="4" lg="4">
				<CardTextField
					v-model="item.url"
					:rules="[getRules.isRequired, getRules.isValidUrl]"
					class="label-fixed"
					hint="URL"
					:reference="'url_' + index"
					placeholder="URL"
					label="URL"
					:required="true"
				></CardTextField>
			</v-col>

			<!-- delete -->
			<v-col cols="12" sm="12" md="4" lg="1">
				<v-btn color="red" elevation="1" icon @click="deleteItem(item)">
					<v-icon dark> mdi-delete </v-icon>
				</v-btn>
			</v-col>
		</v-row>
	</div>
</template>

<script lang="ts">
	import { isEmpty } from "lodash";
	import Vue from "vue";
	import { isRequired, isValidUrl } from "../../services/rule-services";
	import CardTextField from "../../components/Content/CardTextField.vue";

	export default Vue.extend({
		name: "ProgressEvent",
		props: {
			items: {
				type: Array,
				default: function () {
					return [];
				},
			},
		},
		components: { CardTextField },
		data: () => ({}),
		created() {},
		mounted() {},
		computed: {
			getRules() {
				return {
					isRequired,
					isValidUrl,
				};
			},
			hasItems() {
				return !isEmpty(this.items);
			},
			getItems() {
				return this.items;
			},
		},
		methods: {
			deleteItem(item: any) {
				this.$emit("delete-item", item);
			},
		},
	});
</script>
