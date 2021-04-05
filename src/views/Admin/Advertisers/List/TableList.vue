<template>
	<v-data-table
		v-model="selected"
		:headers="headers"
		:items="desserts"
		:single-select="singleSelect"
		item-key="name"
		show-select
		class="elevation-1"
		:footer-props="{
			showFirstLastPage: true,
			firstIcon: 'mdi-arrow-collapse-left',
			lastIcon: 'mdi-arrow-collapse-right',
			prevIcon: 'mdi-minus',
			nextIcon: 'mdi-plus',
		}"
	>
		<template v-slot:[`header.data-table-select`]="{ props, on }">
			<v-simple-checkbox
				color="accent"
				v-if="props.indeterminate"
				v-ripple
				v-bind="props"
				:value="props.indeterminate"
				v-on="on"
			></v-simple-checkbox>
			<v-simple-checkbox
				color="accent"
				v-if="!props.indeterminate"
				v-ripple
				v-bind="props"
				v-on="on"
			></v-simple-checkbox>
		</template>

		<!-- LABEL -->

		<!-- id -->
		<template v-slot:[`header.id`]="{ header }">
			<v-menu min-width="100" :close-on-content-click="false">
				<template v-slot:activator="{ on, attrs }">
					<div v-bind="attrs" v-on="on">
						{{ header.text.toUpperCase() }}
						<v-icon>mdi-chevron-down</v-icon>
					</div>
				</template>

				<v-list subheader two-line flat>
					<v-subheader>Sort</v-subheader>

					<v-list-item>
						<v-text-field
							class="label-fixed no-top"
							ref="id"
							v-model="header.id"
							type="number"
							:placeholder="header.text"
							clearable
						></v-text-field>
					</v-list-item>

					<v-divider></v-divider>

					<v-list-item>
						<v-radio-group v-model="radios">
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

		<!-- name -->
		<template v-slot:[`header.name`]="{ header }">
			<v-menu min-width="100" :close-on-content-click="false">
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

		<!-- active -->
		<template v-slot:[`header.active`]="{ header }">
			<v-menu min-width="100" :close-on-content-click="false">
				<template v-slot:activator="{ on, attrs }">
					<div v-bind="attrs" v-on="on">
						{{ header.text }}
						<v-icon>mdi-chevron-down</v-icon>
					</div>
				</template>

				<v-list subheader two-line flat>
					<v-subheader>Filter</v-subheader>

					<v-list-item>
						<v-radio-group v-model="radios">
							<v-radio color="secondary" value="asc">
								<template v-slot:label>
									<div>Active</div>
								</template>
							</v-radio>
							<v-radio color="secondary" value="desc">
								<template v-slot:label>
									<div>Inactive</div>
								</template>
							</v-radio>
						</v-radio-group>
					</v-list-item>
				</v-list>
			</v-menu>
		</template>

		<!-- category -->
		<template v-slot:[`header.category`]="{ header }">
			<v-menu min-width="100" :close-on-content-click="false">
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
							v-model="header.category"
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

		<!-- ITEMS -->

		<!-- active -->
		<template v-slot:[`item.active`]="{ item }">
			<strong class="d-flex" :class="getColor(item.active)">
				<v-icon :class="getColor(item.active)"
					>mdi-circle-medium</v-icon
				>
				{{ getActiveText(item.active) }}
			</strong>
		</template>

		<template v-slot:[`item.actions`]="{}">
			<v-card-actions>
				<v-btn
					color="secondary"
					elevation="0"
					medium
					raised
					rounded
					text
					icon
				>
					<v-icon small class="secondary--text"> mdi-pencil </v-icon>
				</v-btn>
			</v-card-actions>
		</template>
	</v-data-table>
</template>

<script lang="ts">
	import Vue from "vue";

	export default Vue.extend({
		name: "AdvertiserHeader",
		props: {},
		components: {},
		data: () => ({
			page: 1,
			pageCount: 0,
			itemsPerPage: 10,
			radios: false,

			singleSelect: false,
			selected: [],
			headers: [
				{
					text: "Id",
					align: "start",
					sortable: false,
					value: "id",
				},
				{
					text: "Advertiser Name",
					align: "start",
					sortable: false,
					value: "name",
				},
				{
					text: "Active",
					align: "start",
					sortable: false,
					value: "active",
				},
				{
					text: "Advertiser Category",
					align: "start",
					sortable: false,
					value: "category",
				},
				{
					text: "Advertiser Domain",
					align: "start",
					sortable: false,
					value: "domain",
				},
				{
					text: "Advertiser App Bundle",
					align: "start",
					sortable: false,
					value: "appbundle",
				},
				{
					text: "Default Currency",
					align: "start",
					sortable: false,
					value: "currency",
				},
				,
				{
					text: "Actions",
					align: "start",
					sortable: false,
					value: "actions",
				},
			],
			desserts: [
				{
					id: 158,
					name: "Frozen Yogurt",
					active: true,
					category: "Category 1",
					domain: "Advertiser 1",
					appbundle: "Advertiser App Bundle",
					currency: "$",
				},
				{
					id: 346,
					name: "Ice cream sandwich",
					active: false,
					category: "Category 2",
					domain: "Advertiser 1",
					appbundle: "Advertiser App Bundle",
					currency: "$",
				},
				{
					id: 3,
					name: "Eclair",
					active: true,
					category: "Category 3",
					domain: "Advertiser 1",
					appbundle: "Advertiser App Bundle",
					currency: "$",
				},
			],
		}),

		created() {},

		mounted() {},

		computed: {},

		methods: {
			getColor(active: Boolean) {
				return active ? "green--text" : "red--text";
			},
			getActiveText(active: Boolean) {
				return active ? "Active" : "Inactive";
			},
		},
	});
</script>
