<template>
	<v-card
		elevation="0"
		class="px-2 mb-2"
		outlined
		tile
		color="rgb(0, 0, 0, 0.0)"
	>
		<!-- <v-card> {{ modelData }} </v-card> -->
		<v-switch
			:class="customClass"
			inset
			hide-details
			v-model="modelData"
			:color="color"
			:label="label"
			validate-on-blur
		>
			<template v-slot:label> {{ label }} </template>
		</v-switch>
	</v-card>
</template>

<script lang="ts">
	export default {
		name: "CardSwitch",
		model: {
			prop: "model_data",
			event: "change",
		},
		props: {
			model_data: {},
			label: {
				type: String,
				default: "",
			},
			customClass: {
				type: String,
				default: "v-input--reverse--column",
			},
			color: {
				type: String,
				default: "success",
			},
		},
		data: function () {
			return {};
		},
		mounted() {},
		computed: {
			modelData: {
				set(val: any) {
					this.$emit("change", val);
				},
				get() {
					return this.model_data;
				},
			},
		},
		methods: {},
		watch: {},
	};
</script>
