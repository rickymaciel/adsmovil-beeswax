<template>
	<v-app id="app">
		<v-main class="grey lighten-3">
			<AppBar :items="navSecundaryItems" />
			<v-layout>
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
					href: "/admin/dashboard",
				},
				{
					text: "Adsvertisers",
					disabled: false,
					href: "/admin/advertisers/index",
				},
				{
					text: "Campaigns",
					disabled: false,
					href: "/admin/campaigns",
				},
				{
					text: "Line Item",
					disabled: false,
					href: "/admin/line-item",
				},
				{
					text: "Creatives",
					disabled: false,
					href: "/admin/creatives",
				},
				{
					text: "Reporting",
					disabled: false,
					href: "/admin/reporting",
				},
				{
					text: "Tools",
					disabled: false,
					href: "/admin/tools",
				},
			],
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
