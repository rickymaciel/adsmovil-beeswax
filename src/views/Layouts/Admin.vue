<template>
	<v-app id="app">
		<v-main class="white">
			<AppBar />

			<v-layout class="white">
				<v-container class="my-0 py-0" fluid bg grid-list-md>
					<v-layout
						class="justify-center align-center"
						row
						align-center
						justify-center
					>
						<v-flex align-self-center>
							<v-card
								class="transparent d-lg-flex my-auto justify-center align-center"
								flat
								tile
							>
								<v-card
									class="transparent mr-auto justify-center align-center"
									flat
									tile
								>
									<BreadCrumbs :items="items" />
								</v-card>
								<v-card
									class="transparent justify-center align-center"
									flat
									tile
								>
									<Searcher />
								</v-card>
							</v-card>
						</v-flex>
					</v-layout>
				</v-container>
			</v-layout>

			<v-layout class="white lighten-3">
				<v-container class="my-0 py-0" fluid bg grid-list-md>
					<v-layout
						class="justify-center align-center"
						row
						align-center
						justify-center
					>
						<v-flex align-self-center>
							<v-card
								class="transparent d-lg-flex my-auto justify-center align-center"
								flat
								tile
							>
								<v-card
									class="transparent mr-auto justify-center align-center"
									flat
									tile
								>
									<v-subheader class="my-4">
										Advertisers
									</v-subheader>
								</v-card>
							</v-card>
						</v-flex>
					</v-layout>
				</v-container>
			</v-layout>

			<v-layout class="grey lighten-3">
				<v-container>
					<router-view></router-view>
				</v-container>
			</v-layout>
		</v-main>
	</v-app>
</template>

<script lang="ts">
	import Vue from "vue";
	import AppBar from "../../components/Admin/AppBar/AppBar.vue";
	import BreadCrumbs from "../../components/Content/BreadCrumbs.vue";
	import Searcher from "../../components/Content/Searcher.vue";

	export default Vue.extend({
		name: "LayoutAdmin",
		props: {
			title: {
				type: String,
				default: "Create New Campaign",
			},
		},
		components: { AppBar, BreadCrumbs, Searcher },
		data: () => ({
			items: [
				{
					text: "Advertiser: Name",
					disabled: false,
					href: "advertiser_name",
				},
				{
					text: "Campaign: Name",
					disabled: false,
					href: "campaign_name",
				},
				{
					text: "Line: Name",
					disabled: true,
					href: "line_name",
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
