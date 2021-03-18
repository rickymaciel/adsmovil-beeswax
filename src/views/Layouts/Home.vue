<template>
	<v-app id="app">
		<v-main>
			<v-container fill-height fluid color="primary">
				<v-row align="center" justify="center" no-gutters>
					<v-col cols="12" sm="8" md="8">
						<router-view></router-view>
					</v-col>
				</v-row>
			</v-container>
		</v-main>
	</v-app>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
	name: 'LayoutHome',
	data: () => ({}),
	created () {
		console.log('Using LayoutHome')
	},
	computed: {},
	methods: {}
})
</script>
