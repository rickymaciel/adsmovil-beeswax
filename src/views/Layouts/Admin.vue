<template>
	<v-app id="app">
		<v-main class="white">
			<AppBar :items="navSecundaryItems" />
			<v-layout class="white">
				<router-view></router-view>
			</v-layout>
		</v-main>
	</v-app>
</template>

<script lang="ts">
	import Vue from "vue";
	import AppBar from "../../components/Admin/AppBar/AppBar.vue";

	export default Vue.extend({
		name: "LayoutAdmin",
		props: {
			title: {
				type: String,
				default: "Create New Campaign",
			},
		},
		components: { AppBar },
		data: () => ({
			navSecundaryItems: [
				{
					text: "Dashboard",
					disabled: false,
					href: "dashboard",
				},
				{
					text: "Adsvertiser",
					disabled: false,
					href: "adsvertiser",
				},
				{
					text: "Campaigns",
					disabled: false,
					href: "campaigns",
				},
				{
					text: "Line Item",
					disabled: false,
					href: "line-item",
				},
				{
					text: "Creatives",
					disabled: false,
					href: "creatives",
				},
				{
					text: "Reporting",
					disabled: false,
					href: "reporting",
				},
				{
					text: "Tools",
					disabled: false,
					href: "tools",
				},
			],
			// items: [
			// 	{
			// 		text: "Advertiser: Name",
			// 		disabled: false,
			// 		href: "advertiser_name",
			// 	},
			// 	{
			// 		text: "Campaign: Name",
			// 		disabled: false,
			// 		href: "campaign_name",
			// 	},
			// 	{
			// 		text: "Line: Name",
			// 		disabled: true,
			// 		href: "line_name",
			// 	},
			// ],
		}),
		created() {
			console.log("Using LayoutAdmin", {
				profile: this.$store.state.profile.profile,
			});
		},
		computed: {},
		methods: {},
	});
</script>
