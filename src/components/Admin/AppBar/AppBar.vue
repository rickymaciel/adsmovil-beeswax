<template>
	<div class="toolbar gradient-primary">
		<v-card class="align-self-center" color="transparent" flat tile>
			<Loader></Loader>
			<v-container class="my-0 py-0">
				<v-toolbar
					color="transparent"
					flat
					tile
					height="80px"
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

					<v-btn v-if="false" icon medium>
						<img src="@/assets/icons/tools_icon.svg" alt="Tools" />
					</v-btn>

					<v-badge
						v-if="false"
						dot
						overlap
						color="red"
						offset-x="22"
						offset-y="22"
					>
						<v-btn icon medium>
							<img src="@/assets/icons/notifications_icon.png" alt="Notifications"/> 
						</v-btn>
					</v-badge>

					<v-menu offset-y max-width="300" :rounded="true">
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
												>
													{{ nameFL }}
												</span>
											</v-avatar>
										</v-avatar>
									</v-list-item-avatar>
									<v-list-item-content>
										<v-list-item-title
											class="subtitle-2 white--text ma-0"
										>
											{{ getName }}
										</v-list-item-title>
									</v-list-item-content>

									<v-list-item-action>
										<v-icon color="#47A0D3">
											mdi-chevron-down
										</v-icon>
									</v-list-item-action>
								</v-list-item>
							</v-list>
						</template>
						<v-list shaped v-if="getProfile">
							<v-list-item two-line>
								<v-list-item-content>
									<v-list-item-title class="text-h6">
										Name
									</v-list-item-title>
									<v-list-item-subtitle>
										{{ getProfile.name }}
										{{ getProfile.last_name }}
									</v-list-item-subtitle>
								</v-list-item-content>
							</v-list-item>

							<v-divider></v-divider>

							<v-list-item two-line>
								<v-list-item-content>
									<v-list-item-title class="text-h6">
										Active account
									</v-list-item-title>
									<v-list-item-subtitle>
										{{ getProfile.account.name }}
									</v-list-item-subtitle>
								</v-list-item-content>
							</v-list-item>

							<v-divider v-if="false"></v-divider>

							<v-list-item v-if="false" two-line>
								<v-list-item-content>
									<v-list-item-title class="text-h6">
										Roles
									</v-list-item-title>
									<v-list-item-subtitle>
										<v-card-text
											class="pa-0 ma-0"
											v-for="role in getProfile.roles"
											:key="role.id"
										>
											{{ role.description }}
										</v-card-text>
									</v-list-item-subtitle>
								</v-list-item-content>
							</v-list-item>

							<v-divider v-if="otherAccounts.length > 0"></v-divider>

							<v-list-item v-if="otherAccounts.length > 0" two-line>
								<v-list-item-content>
									<v-list-item-title class="text-h6">
										Other accounts
									</v-list-item-title>
									<v-list-item-subtitle>
										<v-card-text 
											class="pa-0 ma-0" 
											v-for="account in otherAccounts" 
											:key="account.id">										
											<a link @click="dispatchChangeAccount(account.id)">{{ account.name }}</a>
										</v-card-text>
									</v-list-item-subtitle>
								</v-list-item-content>
							</v-list-item>

							<v-divider></v-divider>

							<v-list-item link @click="dispatchLogout()">
								<v-list-item-title
									class="secondary--text title"
								>
									Logout
								</v-list-item-title>
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
							class="mb-2 pa-0 ma-0"
						></v-tabs-slider>
						<template v-for="(item, index) in items">
							<template v-if="item.children">
								<v-menu
									color="primary"
									offset-y
									:key="index"
									rounded="b-lg"
								>
									<template v-slot:activator="{ on, attrs }">
										<v-tab
											class="text-capitalize v-tab--main"
											:disabled="item.disabled"
											:key="index"
											v-bind="attrs"
											v-on="on"
										>
											{{ item.text }}
											<v-icon right>
												mdi-menu-down
											</v-icon>
										</v-tab>
									</template>

									<v-list
										class="v-tools"
										color="primary"
										tile
									>
										<v-list-item
											v-for="(
												subitem, _index
											) in item.children"
											:key="_index"
											link
											:to="subitem.href"
											:disabled="subitem.disabled"
										>
											<v-list-item-subtitle
												class="white--text"
												v-text="subitem.text"
											></v-list-item-subtitle>
										</v-list-item>
									</v-list>
								</v-menu>
							</template>
							<template v-else>
								<v-tab
									class="text-capitalize v-tab--main"
									:disabled="item.disabled"
									:key="index"
									:to="item.href"
								>
									{{ item.text }}
								</v-tab>
							</template>
						</template>
					</v-tabs>
				</v-toolbar>
			</v-container>
		</v-card>
	</div>
</template>

<script lang="ts">
	import { mapActions } from "vuex";
	import { isNull, isUndefined } from "lodash";
	import Loader from "../../Loader.vue";

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
				currentItem: "",
			};
		},

		components: { Loader },

		created() {
			this.currentItem = this.getRoutePath;
		},

		async mounted() {
			await this.fetchProfile();
		},

		computed: {
			getRoutePath() {
				return this.$route.path;
			},

			otherAccounts() {
				const profile = this.$store.state.profile.profile;
				if(profile) {
					return profile.accounts.filter(account => account.id != profile.account_id);
				}
				else {
					return [];
				}
			},

			getProfile() {
				return this.$store.state.profile.profile;
			},

			getName() {
				if (!this.hasElement(this.$store.state.profile.profile, "name"))
					return "";
				return this.$store.state.profile.profile.name;
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
					"name"
				);
			},
		},
		methods: {
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
			async dispatchChangeAccount(account_id) {
				await this.setAccount(account_id);
				await this.fetchProfile();
				window.location.href = "/";
			},
			...mapActions({
				signOff: "auth/signOff",
				fetchProfile: "profile/fetchProfile",
				setAccount: "user/setAccount",
			}),
		},
	};
</script>
