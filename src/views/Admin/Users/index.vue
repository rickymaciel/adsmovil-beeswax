<template>
	<v-layout class="d-block ma-0 pa-0">
		<v-layout class="white d-block ma-0 pa-0">
			<UserHeader></UserHeader>
		</v-layout>
		<v-layout class="d-block ma-0 pa-0 pt-lg-4">
			<router-view></router-view>
		</v-layout>
	</v-layout>
</template>

<script lang="ts">
	import UserHeader from "./UserHeader.vue";
	import Vue from "vue";

	export default Vue.extend({
		name: "Users",
		props: {},
		components: { UserHeader },
		data: () => ({}),
		created() {},
		async mounted() {},
		computed: {},
		methods: {},
	});
</script>
