<template>
	<v-radio-group
		v-model="modelData"
		:rules="rules"
		:row="row"
		:disabled="disabled"
		:validate-on-blur="false"
	>
		<v-radio
			v-for="item in items"
			:key="item.id"
			:label="item.value"
			:value="item.id"
			:color="color"
		></v-radio>
	</v-radio-group>
</template>

<script lang="ts">
export default {
	name: "RadioButton",
	model: {
		prop: "model_data",
		event: "change",
	},
	props: {
		model_data: {},
		items: {
			type: Array,
			default: function () {
				return [];
			},
		},
		rules: {
			type: Array,
			default: function () {
				return [];
			},
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		row: {
			type: Boolean,
			default: false,
		},
		color: {
			type: String,
			default: "",
		},
	},
	data: function () {
		return {};
	},
	created() {
		// console.log("created::RadoButton", { rules: this.rules });
	},
	mounted() {},
	computed: {
		modelData: {
			set(val: any) {
				console.log("RadioButton::handleChange", { val });
				this.$emit("change", val);
			},
			get() {
				return this.model_data;
			},
		},
	},
	methods: {},
};
</script>
