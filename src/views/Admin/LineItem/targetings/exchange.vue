<template>
	<v-list>
		<!-- inventory_source -->
		<v-list-item>
			<v-container>
				<v-row dense>
					<!-- url -->
					<v-col cols="12" sm="12" md="6" lg="4">
						<CardTextField
							v-model="exchange.inventory_source.url"
							hint="Inventory Source"
							reference="name"
							label="Inventory Source"
							placeholder="Select Inventory Source"
							:required="false"
						></CardTextField>
					</v-col>

					<!-- include -->
					<v-col
						class="pe-lg-16 pa-0"
						cols="12"
						sm="12"
						md="4"
						lg="4"
					>
						<CardSwitch
							v-model="exchange.inventory_source.include"
							reference="include"
							:label="
								exchange.inventory_source.include
									? 'Include'
									: 'Exclude'
							"
							:color="
								exchange.inventory_source.include
									? 'success'
									: 'red'
							"
						></CardSwitch>
					</v-col>
				</v-row>
			</v-container>
		</v-list-item>

		<v-divider></v-divider>

		<!-- auction_type -->
		<v-list-item>
			<v-container>
				<v-row dense>
					<!-- url -->
					<v-col cols="12" sm="12" md="6" lg="4">
						<CardTextField
							v-model="exchange.auction_type.url"
							hint="Auction Type"
							reference="name"
							label="Auction Type"
							placeholder="Select Auction Type"
							:required="false"
						></CardTextField>
					</v-col>

					<!-- include -->
					<v-col
						class="pe-lg-16 pa-0"
						cols="12"
						sm="12"
						md="4"
						lg="4"
					>
						<CardSwitch
							v-model="exchange.auction_type.include"
							reference="include"
							:label="
								exchange.auction_type.include
									? 'Include'
									: 'Exclude'
							"
							:color="
								exchange.auction_type.include
									? 'success'
									: 'red'
							"
						></CardSwitch>
					</v-col>
				</v-row>
			</v-container>
		</v-list-item>
	</v-list>
</template>
<script lang="ts">
	import Vue from "vue";
	import CardTextField from "../../../../components/Content/CardTextField.vue";
	import CardSwitch from "../../../../components/Content/CardSwitch.vue";

	export default Vue.extend({
		name: "Exchange",
		props: {
			exchange: {
				type: Object,
				default: function () {},
			},
		},
		components: { CardTextField, CardSwitch },
		data: () => ({}),
		created() {},
		async mounted() {},
		computed: {},
		methods: {},
	});
</script>
