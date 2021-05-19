<template>
	<div class="d-lg-flex justify-lg-space-between">
		<div class="mb-2">
			<v-btn
				to="/admin/campaigns/create"
				class="me-4 mb-1"
				color="secondary"
				elevation="0"
				:medium="!$vuetify.breakpoint.mobile"
				:small="$vuetify.breakpoint.mobile"
				raised
				rounded
				>Create New</v-btn
			>

			<v-btn
				color="secondary"
				elevation="0"
				icon
				:medium="!$vuetify.breakpoint.mobile"
				:small="$vuetify.breakpoint.mobile"
				raised
				rounded
				class="me-4 mb-1"
			>
				<img src="@/assets/icons/download_btn.png" alt="Tools" />
			</v-btn>

			<v-btn
				color="secondary"
				elevation="0"
				icon
				:medium="!$vuetify.breakpoint.mobile"
				:small="$vuetify.breakpoint.mobile"
				raised
				rounded
				class="me-4 mb-1"
			>
				<img src="@/assets/icons/bulk_btn.png" alt="Tools" />
			</v-btn>
		</div>

		<div class="mb-2">
			<v-btn
				class="me-4 mb-1"
				color="secondary"
				outlined
				elevation="0"
				:medium="!$vuetify.breakpoint.mobile"
				:small="$vuetify.breakpoint.mobile"
				raised
				rounded
				>Customize View</v-btn
			>
			<v-btn
				class="me-4 mb-1"
				color="secondary"
				outlined
				elevation="0"
				:medium="!$vuetify.breakpoint.mobile"
				:small="$vuetify.breakpoint.mobile"
				raised
				rounded
				>Show 40</v-btn
			>
			<v-btn
				class="me-4 mb-1"
				color="secondary"
				outlined
				elevation="0"
				:medium="!$vuetify.breakpoint.mobile"
				:small="$vuetify.breakpoint.mobile"
				raised
				rounded
				>Show Last 30 days</v-btn
			>
		</div>
	</div>
</template>

<script lang="ts">
	import Vue from "vue";

	export default Vue.extend({
		name: "Buttons",
		props: {},
		components: {},
		data: () => ({}),

		created() {},

		mounted() {},

		computed: {},

		methods: {},
	});
</script>
