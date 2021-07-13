<template>
	<v-card
		elevation="0"
		class="px-2 mb-2"
		outlined
		tile
		color="rgb(0, 0, 0, 0.0)"
	>
		<!-- <v-card> {{ modelData }} </v-card> -->
		<v-textarea
			v-model="modelData"
			:rules="rules"
			:hint="hint"
			:ref="reference"
			:placeholder="placeholder"
			:label="label"
			:class="customClass"
			:persistent-hint="persistent_hint"
			:clearable="clearable"
			:error="!isEmpty(messages)"
			:messages="messages"
			:validate-on-blur="false"
			:loading="isLoading"
			:rows="rows"
			:auto-grow="auto_grow"
		>
			<template v-if="append_outer" v-slot:append-outer>
				<v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-btn
							v-on="on"
							@click="clickAppendOuter"
							icon
							medium
							justify="center"
							items="center"
							self="center"
							color="secondary"
							elevation="3"
						>
							<v-icon color="secondary">{{
								append_outer
							}}</v-icon>
						</v-btn>
					</template>
					{{ btn_text }}
				</v-tooltip>
			</template>
			<template #label>
				{{ label }}
				<span class="red--text" v-if="required">
					<strong>*</strong>
				</span>
			</template>
		</v-textarea>
	</v-card>
</template>

<script lang="ts">
	import { isEmpty } from "lodash";
	export default {
		name: "CardTextarea",
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
			persistent_hint: {
				type: Boolean,
				default: false,
			},
			clearable: {
				type: Boolean,
				default: true,
			},
			error: {
				type: Boolean,
				default: false,
			},
			messages: {
				type: String,
				default: "",
			},
			required: {
				type: Boolean,
				default: false,
			},
			rows: {
				type: Number,
				default: 3,
			},
			auto_grow: {
				type: Boolean,
				default: true,
			},
			append_icon: {
				type: String,
				default: "",
			},
			append_outer: {
				type: String,
				default: "",
			},
			btn_text: {
				type: String,
				default: "",
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
		},
		methods: {
			isEmpty(data: any) {
				return isEmpty(data);
			},
			clickAppendOuter(params: any) {
				this.$emit("click-append-outer", params);
			},
			clickAppend() {
				this.$emit("click-append", this.modelData);
			},
		},
		watch: {},
	};
</script>
