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
					href: "/admin/campaigns/index",
				},
				{
					text: "Line Item",
					disabled: false,
					href: "/admin/lineitem/index",
				},
				{
					text: "Creatives",
					disabled: false,
					href: "/admin/creatives/index",
				},
				{
					text: "Reporting",
					disabled: false,
					href: "/admin/reporting/index",
				},
				{
					text: "Tools",
					disabled: false,
					href: "#",
					children: [
						{
							text: "Event",
							disabled: false,
							href: "/admin/events/index",
						},
						{
							text: "List",
							disabled: false,
							href: "/admin/custom_lists/index",
						},
						{
							text: "Model",
							disabled: false,
							href: "/admin/models/index",
						},
						{
							text: "Modifier",
							disabled: false,
							href: "/admin/modifiers/index",
						},
						{
							text: "Segment",
							disabled: false,
							href: "/admin/segments/index",
						},
					],
				},
			],
		}),
		created() {
			// console.log("Using LayoutAdmin", {
			// 	profile: this.$store.state.profile.profile,
			// });
		},
		computed: {},
		methods: {},
	});
</script>
