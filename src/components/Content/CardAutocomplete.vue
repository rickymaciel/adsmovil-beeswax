<template>
	<v-card
		elevation="0"
		class="px-2 mb-2"
		outlined
		tile
		color="rgb(0, 0, 0, 0.0)"
	>
		<!-- <v-card> {{ modelData }} </v-card> -->
		<v-autocomplete
			v-model="modelData"
			:rules="rules"
			:hint="hint"
			:items="items"
			:ref="reference"
			:placeholder="placeholder"
			:label="label"
			:class="getClass"
			:item-text="item_text"
			:item-value="item_value"
			:disabled="disabled"
			@click="clickEvent"
			@change="changeEvent"
			:chips="chips"
			:deletable-chips="deletable_chips"
			:multiple="multiple"
			:small-chips="small_chips"
			:dense="dense"
			validate-on-blur
			:persistent-hint="persistent_hint"
		>
			<!-- <template v-slot:prepend-inner>
				<v-fade-transition leave-absolute>
					<v-progress-circular
						v-if="isLoading"
						size="24"
						color="secondary"
						indeterminate
						class="ms-2"
					></v-progress-circular>
				</v-fade-transition>
			</template> -->
			<template #label>
				{{ label }}
				<span class="red--text" v-if="required">
					<strong>*</strong>
				</span>
			</template>
		</v-autocomplete>
	</v-card>
</template>

<script lang="ts">
	export default {
		name: "CardAutocomplete",
		model: {
			prop: "model_data",
			event: "input",
		},
		props: {
			model_data: {},
			rules: {
				type: Array,
				default: function () {
					return [];
				},
			},
			items: {
				type: Array,
				default: function () {
					return [];
				},
			},
			hint: {
				type: String,
				default: "",
			},
			reference: {
				type: String,
				default: "",
			},
			placeholder: {
				type: String,
				default: "",
			},
			label: {
				type: String,
				default: "",
			},
			customClass: {
				type: String,
				default: "label-fixed",
			},
			counter: {
				type: Number,
				default: 255,
			},
			item_text: {
				type: String,
				default: "value",
			},
			item_value: {
				type: String,
				default: "id",
			},
			disabled: {
				type: Boolean,
				default: false,
			},
			multiple: {
				type: Boolean,
				default: false,
			},
			chips: {
				type: Boolean,
				default: false,
			},
			deletable_chips: {
				type: Boolean,
				default: false,
			},
			small_chips: {
				type: Boolean,
				default: false,
			},
			dense: {
				type: Boolean,
				default: false,
			},
			persistent_hint: {
				type: Boolean,
				default: false,
			},
			required: {
				type: Boolean,
				default: false,
			},
		},
		data: function () {
			return {};
		},
		mounted() {},
		computed: {
			isLoading() {
				return this.$store.state.proccess.loading_field;
			},
			modelData: {
				set(val: any) {
					this.$emit("input", val);
				},
				get() {
					return this.model_data;
				},
			},
			getClass() {
				return `${this.customClass} ${this.disabled ? "disabled" : ""}`;
			},
		},
		methods: {
			clickEvent(e: any) {
				this.$emit("click", e);
			},
			changeEvent(e: any) {
				this.$emit("change", e);
			},
		},
		watch: {},
	};
</script>
