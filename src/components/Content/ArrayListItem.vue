<template>
	<v-card
		v-if="hasItems"
		elevation="0"
		class="bg-transparent mx-2 px-2"
		tile
		justify="start"
		align="start"
	>
		<!-- <v-card-text>{{ items }}</v-card-text> -->
		<v-list class="bg-transparent ma-0 pa-0">
			<template v-for="(item, index) in getItems">
				<v-list-item :key="item" class="ma-0 pa-0">
					<v-list-item-content class="ma-0 pa-0">
						<v-list-item-title class="color-secondary ma-0">
							{{ item }}
						</v-list-item-title>
					</v-list-item-content>

					<v-list-item-action class="ma-0 pa-0">
						<v-btn icon @click="deleteItem(item)" class="ma-0 pa-0">
							<v-icon color="secondary"> mdi-delete </v-icon>
						</v-btn>
					</v-list-item-action>
				</v-list-item>

				<v-divider v-if="items[index + 1]" :key="index"></v-divider>
			</template>
		</v-list>
	</v-card>
</template>

<script lang="ts">
	import { isEmpty } from "lodash";
	import Vue from "vue";

	export default Vue.extend({
		name: "ArrayListItem",
		props: {
			items: {
				type: Array,
				default: function () {
					return [];
				},
			},
		},
		components: {},
		data: () => ({}),
		created() {},
		mounted() {},
		computed: {
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
