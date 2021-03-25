<template>
	<div class="toolbar gradient-primary">
		<v-card class="align-self-center" color="transparent" flat tile>
			<v-container class="my-0 py-0">
				<v-toolbar
					color="transparent"
					flat
					tile
					height="100px"
					align-center
					justify-center
				>
					<v-toolbar-title class="headline logo flex justify-center">
						<img
							:class="$vuetify.breakpoint.mobile ? 'sm' : 'lg'"
							src="@/assets/icons/logo_adsmovil_white.png"
							alt="Logo"
						/>
					</v-toolbar-title>

					<v-spacer></v-spacer>

					<v-btn icon medium>
						<img src="@/assets/icons/tools_icon.svg" alt="Tools" />
					</v-btn>

					<v-badge
						dot
						overlap
						color="red"
						offset-x="22"
						offset-y="22"
					>
						<v-btn icon medium>
							<img
								src="@/assets/icons/notifications_icon.png"
								alt="Notifications"
							/> </v-btn
					></v-badge>

					<v-menu
						transition="scale-transition"
						offset-y
						max-width="200"
					>
						<template v-slot:activator="{ on, attrs }">
							<v-list flat color="transparent">
								<v-list-item
									link
									v-bind="attrs"
									v-on="on"
									rounded="lg"
								>
									<v-list-item-avatar>
										<v-avatar>
											<img
												v-if="hasImage"
												:src="getImage"
												:alt="nameFL"
												class="border-5"
											/>
											<v-avatar v-else color="secondary">
												<span
													class="white--text headline"
													>{{ nameFL }}</span
												>
											</v-avatar>
										</v-avatar>
									</v-list-item-avatar>
									<v-list-item-content>
										<v-list-item-title
											class="subtitle-2 white--text ma-0"
										>
											{{ getFirstName }}
										</v-list-item-title>
										<!-- <v-list-item-subtitle
										class="subtitle white--text"
									>
										Logged In
									</v-list-item-subtitle> -->
									</v-list-item-content>

									<v-list-item-action>
										<v-icon color="#47A0D3"
											>mdi-chevron-down</v-icon
										>
									</v-list-item-action>
								</v-list-item>
							</v-list>
						</template>
						<v-list v-if="getProfile">
							<v-list-item>
								<v-list-item-content>
									<v-list-item-title class="title"
										>Profile</v-list-item-title
									>
									<v-list-item-subtitle>
										Account ID:
										<span class="font-weight-bold">
											{{ getProfile.account_id }}
										</span>
									</v-list-item-subtitle>
									<v-list-item-subtitle>
										Name:
										<span class="font-weight-bold">
											{{ getProfile.first_name }}
											{{ getProfile.last_name }}
										</span>
									</v-list-item-subtitle>
									<v-list-item-subtitle>
										Role:
										<span class="font-weight-bold">
											?
										</span>
									</v-list-item-subtitle>
								</v-list-item-content>
							</v-list-item>
							<v-divider></v-divider>
							<v-list-item>
								<v-list-item-content>
									<v-list-item-title class="title"
										>Other Accounts</v-list-item-title
									>
									<v-list-item-subtitle
										class="secondary--text"
									>
										Account ID: 1
									</v-list-item-subtitle>
									<v-list-item-subtitle
										class="secondary--text"
									>
										Account ID: 2
									</v-list-item-subtitle>
								</v-list-item-content>
							</v-list-item>
							<v-divider></v-divider>
							<v-list-item link @click="dispatchLogout()">
								<v-list-item-title class="secondary--text title"
									>Logout</v-list-item-title
								>
							</v-list-item>
						</v-list>
					</v-menu>
				</v-toolbar>
			</v-container>
		</v-card>
		<v-card class="toolbar gradient-secondary" flat tile>
			<v-container class="my-0 py-0">
				<v-toolbar color="transparent" flat tile>
					<v-tabs
						v-model="currentItem"
						slider-color="secondary"
						class="tabs"
						color="secondary lighten-4 float-left"
						dark
						next-icon="mdi-arrow-right-bold-box-outline"
						prev-icon="mdi-arrow-left-bold-box-outline"
						show-arrows
						slider-size="8"
					>
						<v-tabs-slider
							color="secondary"
							size="8"
							class="mb-2"
						></v-tabs-slider>
						<v-tab
							class="text-capitalize"
							:disabled="item.disabled"
							v-for="(item, index) in items"
							@click="changeItem(item)"
							:key="index"
							:href="'#tab-' + item.href"
						>
							{{ item.text }}
						</v-tab>
					</v-tabs>
				</v-toolbar>
			</v-container>
		</v-card>
	</div>
</template>

<script lang="ts">
	import { mapActions } from "vuex";
	import { isNull, isUndefined } from "lodash";

	export default {
		name: "AppBar",
		props: {
			items: {
				type: Array,
				default: function () {
					return [];
				},
			},
		},

		data: function () {
			return {
				links: ["Dashboard", "Profile"],
				currentItem: "tab-dashboard",
			};
		},

		async mounted() {
			await this.fetchProfile();
		},

		computed: {
			getProfile() {
				return this.$store.state.profile.profile;
			},

			getFirstName() {
				return !isNull(this.$store.state.profile.profile)
					? this.$store.state.profile.profile.first_name
					: "";
			},

			hasImage() {
				return this.hasElement(this.$store.state.profile.profile, "avatar");
			},

			getImage(): string {
				return this.$store.state.profile.profile.avatar;
			},

			nameFL(): string {
				return this.getFirtsLetter(
					this.$store.state.profile.profile,
					"first_name"
				);
			},
		},
		methods: {
			changeItem(item: { href: any }) {
				this.currentItem = `tab-${item.href}`;
				console.log("changeItem", {
					currentItem: this.currentItem,
					item: item,
				});
			},
			getFirtsLetter(data: any, element: string): string {
				if (
					isNull(data) ||
					isUndefined(data) ||
					isUndefined(data[element])
				) {
					return "A";
				}
				return data[element].charAt();
			},
			hasElement(data: any, element: string): boolean {
				return (
					!isNull(data) &&
					!isUndefined(data) &&
					!isUndefined(data[element])
				);
			},
			async dispatchLogout() {
				await this.signOff();
			},
			...mapActions({
				signOff: "auth/signOff",
				fetchProfile: "profile/fetchProfile",
			}),
		},
	};
</script>
