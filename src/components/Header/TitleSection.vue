<template>
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
</template>

<script lang="ts">
	import Vue from "vue";

	export default Vue.extend({
		name: "TitleSection",
		props: {},
		components: {},
		data: () => ({
			loading: false,
		}),

		async created() {},

		mounted() {},

		computed: {
			isLoading() {
				return this.loading;
			},
		},

		methods: {},
	});
</script>
