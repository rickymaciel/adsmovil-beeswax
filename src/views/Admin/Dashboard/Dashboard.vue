<template>
	<v-card :loading="loading" :disabled="loading">
		<template slot="progress">
			<v-progress-linear color="secondary" height="5" indeterminate>
			</v-progress-linear>
		</template>
		<v-img
			contain
			lazy-src="https://cdn.vuetifyjs.com/images/cards/house.jpg"
			src="https://cdn.vuetifyjs.com/images/cards/house.jpg"
			class="white--text w-100"
			width="100%"
			gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
		>
			<v-card-title>
				<span v-if="Profile()">
					{{ $t("welcomeMsg") }} {{ Profile().first_name }}
				</span>
			</v-card-title>

			<v-divider></v-divider>

			<v-card-subtitle class="white--text">
				<v-chip :color="loggedIn ? 'green' : 'red'">
					{{ loggedIn ? "Autenticado" : "Invitado" }}
				</v-chip>
			</v-card-subtitle>

			<v-divider></v-divider>

			<v-card-subtitle class="white--text">
				{{ isLoading ? "Cargando..." : "Listo" }}
			</v-card-subtitle>

			<v-divider></v-divider>
		</v-img>

		<v-card-actions>
			<v-spacer></v-spacer>

			<v-btn icon>
				<v-icon>mdi-cog-outline</v-icon>
			</v-btn>

			<v-btn icon>
				<v-icon>mdi-bell-outline</v-icon>
			</v-btn>

			<v-btn icon>
				<v-icon>mdi-dots-vertical</v-icon>
			</v-btn>
		</v-card-actions>

		<v-divider></v-divider>

		<!-- profile -->
		<v-card-actions>
			<v-btn
				color="secondary"
				text
				@click="handleProfile()"
				:disabled="loading"
			>
				Refrescar perfil
			</v-btn>

			<v-spacer></v-spacer>

			<v-btn icon @click="togleShowProfile()">
				<v-icon
					>{{ showProfile ? "mdi-chevron-up" : "mdi-chevron-down" }}
				</v-icon>
			</v-btn>
		</v-card-actions>

		<v-expand-transition>
			<div v-show="showProfile" v-if="Profile()">
				<v-divider></v-divider>

				<v-list two-line>
					<template>
						<v-list-item>
							<v-list-item-content>
								<v-list-item-title>ID </v-list-item-title>
								<v-list-item-subtitle
									>{{ Profile().id }}
								</v-list-item-subtitle>
							</v-list-item-content>
						</v-list-item>
						<v-divider></v-divider>
						<v-list-item>
							<v-list-item-content>
								<v-list-item-title>Nombre </v-list-item-title>
								<v-list-item-subtitle
									>{{ Profile().first_name }}
								</v-list-item-subtitle>
							</v-list-item-content>
						</v-list-item>
						<v-divider></v-divider>
						<v-list-item>
							<v-list-item-content>
								<v-list-item-title>Apellido </v-list-item-title>
								<v-list-item-subtitle
									>{{ Profile().last_name }}
								</v-list-item-subtitle>
							</v-list-item-content>
						</v-list-item>
						<v-divider></v-divider>
						<v-list-item>
							<v-list-item-content>
								<v-list-item-title
									>Cuenta Nro
								</v-list-item-title>
								<v-list-item-subtitle
									>{{ Profile().account_id }}
								</v-list-item-subtitle>
							</v-list-item-content>
						</v-list-item>
						<v-divider></v-divider>
						<v-list-item>
							<v-list-item-content>
								<v-list-item-title>Email </v-list-item-title>
								<v-list-item-subtitle
									>{{ Profile().email }}
								</v-list-item-subtitle>
							</v-list-item-content>
						</v-list-item>
					</template>
				</v-list>
			</div>
		</v-expand-transition>
		<!-- profile -->

		<v-divider></v-divider>

		<!-- premissions -->
		<v-card-actions>
			<v-btn
				color="secondary"
				text
				@click="handlePermissions()"
				:disabled="loading"
			>
				Obtener permisos
			</v-btn>

			<v-spacer></v-spacer>

			<v-btn icon @click="togleShowPermissions()">
				<v-icon
					>{{
						showPermissions ? "mdi-chevron-up" : "mdi-chevron-down"
					}}
				</v-icon>
			</v-btn>
		</v-card-actions>

		<v-expand-transition>
			<div v-show="showPermissions" v-if="Permissions()">
				<v-divider></v-divider>
				<v-list two-line>
					<template>
						<v-list-item
							v-for="(permission, index) in Permissions()"
							:key="index"
						>
							<v-list-item-content>
								<v-list-item-title
									>{{ permission.name }}
								</v-list-item-title>
								<v-list-item-subtitle
									>{{ permission.description }}
								</v-list-item-subtitle>
							</v-list-item-content>
						</v-list-item>
					</template>
				</v-list>
			</div>
		</v-expand-transition>
		<!-- premissions -->
	</v-card>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
	name: 'Dashboard',
	props: {
		title: {
			type: String,
			default: 'Create New Campaign'
		}
	},
	components: {},
	data: () => ({
		loading: false,
		showProfile: false,
		showPermissions: false
	}),

	async created () {
		await this.handleProfile()
		await this.handlePermissions()
		console.log('Using Dashboard', {
			profile: this.$store.state.profile.profile
		})
	},

	// Declare mounted lifecycle hook
	async mounted () {
		await this.handleProfile()
		await this.handlePermissions()
	},
	computed: {
		loggedIn () {
			return this.$store.state.auth.loggedIn
		},

		isLoading () {
			return this.loading
		}
	},

	methods: {
		async togleShowPermissions () {
			this.showProfile = false
			this.showPermissions = !this.showPermissions
			if (!this.Permissions() && !this.showPermissions) {
				this.handlePermissions()
			}
		},

		async togleShowProfile () {
			this.showProfile = !this.showProfile
			this.showPermissions = false
			if (!this.Profile() && !this.showProfile) {
				this.handleProfile()
			}
		},

		async handlePermissions () {
			console.log('handlePermissions')
			this.loading = true
			this.fetchPermissions()
				.then(
					(response: any) => {
						console.log('handlePermissions:fetchPermissions', {
							response: response
						})
						this.loading = false
						// this.showPermissions = true;
					},
					(error: any) => {
						console.log('handlePermissions:fetchPermissions', {
							error: error
						})
						this.loading = false
					}
				)
				.catch((error: any) => {
					console.error('handlePermissions:fetchPermissions', {
						error: error
					})
					this.loading = false
				})
		},

		async handleProfile () {
			console.log('handleProfile')
			this.loading = true
			this.fetchProfile()
				.then(
					(response: any) => {
						console.log('handleProfile:fetchProfile', {
							response: response
						})
						this.loading = false
						// this.showProfile = true;
					},
					(error: any) => {
						console.log('handleProfile:fetchProfile', {
							error: error
						})
						this.loading = false
					}
				)
				.catch((error: any) => {
					console.error('handleProfile:fetchProfile', {
						error: error
					})
					this.loading = false
				})
		},

		fetchProfile () {
			return this.$store.dispatch('profile/fetchProfile')
		},

		fetchPermissions () {
			return this.$store.dispatch('permissions/fetchPermissions')
		},

		Permissions (): Array<any> {
			return this.$store.state.permissions.permissions
		},

		Profile () {
			console.log('Dashboard:Profile', {
				ProfileModule: this.$store.state.profile
			})
			return this.$store.state.profile.profile
		}
	}
})
</script>
