<template>
	<v-breadcrumbs :items="items">
		<template v-slot:divider>
			<v-icon>mdi-chevron-right</v-icon>
		</template>
	</v-breadcrumbs>
</template>

<script lang="ts">
export default {
	name: 'BreadCrumbs',
	props: {
		items: {
			type: Array,
			default: function () {
				return []
			}
		}
	},
	data: function () {
		return {
			message: null
		}
	},
	mounted () {},
	computed: {},
	methods: {}
}
</script>
