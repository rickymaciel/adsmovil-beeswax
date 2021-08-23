<template>
	<v-card v-if="loading" flat justify="between" align="center" color="grey lighten-3 py-4">
		<div ref="form" justify="between" align="start">
			<v-container class="my-3">
				<v-row dense>
					<v-col
						v-for="n in 3"
						:key="'a_' + n"
						cols="12"
						sm="12"
						md="6"
						lg="4"
					>
						<v-skeleton-loader
							type="article, divider"
						></v-skeleton-loader>
					</v-col>

					<v-col cols="12" sm="12" md="12" lg="12">
						<v-divider class="my-3"></v-divider>
					</v-col>
					<v-col
						v-for="n in 3"
						:key="'b_' + n"
						cols="12"
						sm="12"
						md="6"
						lg="4"
					>
						<v-skeleton-loader
							type="article, divider"
						></v-skeleton-loader>
					</v-col>
				</v-row>
			</v-container>
		</div>
	</v-card>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
	name: "SkeletonLineItem",
	props: {
		loading: {
			type: Boolean,
			default: false
		}
	},
	components: {},
	data: () => ({}),
	created() {
		this.$nextTick(async () => {});
	},
	mounted() {},
	computed: {
	},
	methods: {},
	watch: {}
});
</script>
