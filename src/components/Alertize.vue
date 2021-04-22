<template>
	<v-layout column v-if="hasMessage">
		<v-alert
			:type="getType"
			dismissible
			outlined
			icon="mdi-alert-circle-outline"
			transition="scale-transition"
		>
			{{ $t(message) }}
		</v-alert>
	</v-layout>
</template>

<script lang="ts">
	import { isEmpty, isNull, isUndefined } from "lodash";
	import Vue from "vue";
	export default Vue.extend({
		name: "Alertize",
		props: {
			type: {
				type: String,
				default: "info",
			},
			message: {
				type: String,
			},
		},
		data: () => ({
			types: ["info", "success", "error"],
		}),
		computed: {
			hasMessage() {
				return (
					!isUndefined(this.message) &&
					!isNull(this.message) &&
					!isEmpty(this.message)
				);
			},
			getType() {
				return this.types.includes(this.type) ? this.type : "info";
			},
		},
		methods: {},
	});
</script>
