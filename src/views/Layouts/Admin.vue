<template>
	<v-app id="app">
		<v-main class="grey lighten-3">
			<AppBar :items="getNavItems" />
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
			navSecondaryItems: [
				{
					text: "Dashboard",
					disabled: false,
					href: "/admin/dashboard",
					roles: ["account-admin","account-operator"],
				},
				{
					text: "Users",
					disabled: false,
					href: "/admin/users/index",
					roles: ["account-admin"]
				},
				{
					text: "Adsvertisers",
					disabled: false,
					href: "/admin/advertisers/index",
					roles: ["account-admin","account-operator"]
				},
				{
					text: "Campaigns",
					disabled: false,
					href: "/admin/campaigns/index",
					roles: ["account-admin","account-operator"]
				},
				{
					text: "Line Item",
					disabled: false,
					href: "/admin/lineitem/index",
					roles: ["account-admin","account-operator"]
				},
				{
					text: "Creatives",
					disabled: false,
					href: "/admin/creatives/index",
					roles: ["account-admin","account-operator"]
				},
				{
					text: "Reporting",
					disabled: true,
					href: "/admin/reporting/index",
					roles: ["account-admin","account-operator"]
				},
				{
					text: "Tools",
					disabled: false,
					href: "#",
					roles: ["account-admin","account-operator"],
					children: [
						{
							text: "Event",
							disabled: true,
							href: "/admin/events/index",
							roles: ["adsmovil-admin"]
						},
						{
							text: "List",
							disabled: false,
							href: "/admin/custom_lists/index",
							roles: ["account-admin", "account-operator"]
						},
						{
							text: "Model",
							disabled: true,
							href: "/admin/models/index",
							roles: ["adsmovil-admin"]
						},
						{
							text: "Modifier",
							disabled: false,
							href: "/admin/modifiers/index",
							roles: ["adsmovil-admin"]
						},
						{
							text: "Segment",
							disabled: true,
							href: "/admin/segments/index",
							roles: ["adsmovil-admin"]
						},
					],
				},
			],
		}),
		mounted() {
			this.loadUsers();
		},
		computed: {
			getNavItems() {
				const profile = this.$store.state.profile.profile;
				return !!profile ? this.navSecondaryItems.filter((item) => {
					if(typeof item.children != "undefined") {
						item.children = item.children.filter((child) => {
							return child.roles.indexOf(profile.roles[0].name) != -1;
						});
					}
					return item.roles.indexOf(profile.roles[0].name) != -1;
				}) : [];
			}
		},
		methods: {
			loadUsers(){
				this.$store.dispatch('profile/fetchProfile');
			}
		},
	});
</script>
