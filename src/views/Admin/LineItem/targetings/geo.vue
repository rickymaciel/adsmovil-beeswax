<template>
	<v-list>
		<!-- country -->
		<v-list-item>
			<v-container>
				<v-row dense>
					<!-- url -->
					<v-col cols="12" sm="12" md="6" lg="4">
						<CardTextField
							v-model="geo.country.url"
							hint="City"
							reference="name"
							label="City"
							placeholder="Select City"
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
							v-model="geo.country.include"
							reference="include"
							:label="geo.country.include ? 'Include' : 'Exclude'"
							:color="geo.country.include ? 'success' : 'red'"
						></CardSwitch>
					</v-col>
				</v-row>
			</v-container>
		</v-list-item>

		<v-divider></v-divider>

		<!-- region -->
		<v-list-item>
			<v-container>
				<v-row dense>
					<!-- url -->
					<v-col cols="12" sm="12" md="6" lg="4">
						<CardTextField
							v-model="geo.region.url"
							hint="Language"
							reference="name"
							label="Language"
							placeholder="Select Language"
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
							v-model="geo.region.include"
							reference="include"
							:label="geo.region.include ? 'Include' : 'Exclude'"
							:color="geo.region.include ? 'success' : 'red'"
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
		name: "Geo",
		props: {
			geo: {
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
