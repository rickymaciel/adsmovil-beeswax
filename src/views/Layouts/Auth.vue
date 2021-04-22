<template>
	<v-app id="app">
		<router-view></router-view>
		<!-- <v-main>			
			<v-container fill-height fluid color="primary">
				<v-row align="center" justify="center" no-gutters>
					<v-col cols="12" sm="12" md="12">
						<router-view></router-view>
					</v-col>
				</v-row>
			</v-container>
		</v-main> -->
	</v-app>
</template>

<script lang="ts">
	import Vue from "vue";

	export default Vue.extend({
		name: "LayoutAuth",
		data: () => ({}),
		created() {
			//console.log("Using LayoutAuth");
		},
		computed: {},
		methods: {},
	});
</script>
