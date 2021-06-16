<template>
	<v-layout class="d-block ma-0 pa-0">
		<Alertize></Alertize>
		<v-layout class="d-block ma-0 pa-0">
			<v-container class="my-0 py-0">
				<Overview :creative="creative"></Overview>
			</v-container>
		</v-layout>
	</v-layout>
</template>

<script lang="ts">
	import Vue from "vue";
	import Alertize from "../../../../components/Alertize.vue";
	import Overview from "./overview.vue";

	export default Vue.extend({
		name: "CreateCreative",
		props: {},
		components: { Alertize, Overview },
		data: () => ({
			creative: {},
		}),
		created() {},
		async mounted() {},
		computed: {},
		methods: {},
	});
</script>