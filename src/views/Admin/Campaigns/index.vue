<template>
	<v-layout class="d-block">
		<v-layout class="white">
			<CampaignHeader></CampaignHeader>
		</v-layout>
		<v-layout class="grey lighten-3">
			<router-view></router-view>
		</v-layout>
	</v-layout>
</template>

<script lang="ts">
	import CampaignHeader from "./CampaignHeader.vue";
	import Vue from "vue";

	export default Vue.extend({
		name: "Campaigns",
		props: {},
		components: { CampaignHeader },
		data: () => ({}),
		created() {},
		async mounted() {},
		computed: {},
		methods: {},
	});
</script>
