<template>
	<v-card
		elevation="0"
		class="px-2 mb-2"
		outlined
		tile
		color="rgb(0, 0, 0, 0.0)"
	>
		<!-- <v-card> {{ modelData }} </v-card> -->
		<v-text-field
			v-model="modelData"
			:rules="rules"
			:hint="hint"
			:ref="reference"
			:placeholder="placeholder"
			:label="label"
			:class="customClass"
			:persistent-hint="persistent_hint"
			:append-icon="icon_add ? 'mdi-plus-circle' : ''"
			:clearable="clearable"
			:error="!isEmpty(messages)"
			:messages="messages"
			@click:append="clickAppend"
			:validate-on-blur="false"
			:loading="isLoading"
			:type="type"
			:step="type === 'time' ? 2 : 1"
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
			<template v-if="icon_add" v-slot:append-inner>
				<v-hover>
					<v-btn
						@click="clickAppendOuter"
						icon
						medium
						justify="center"
						items="center"
						self="end"
					>
						<img
							width="30"
							height="30"
							src="@/assets/icons/bulk_btn.png"
							alt="Filter"
						/>
					</v-btn>
				</v-hover>
			</template>
			<template v-if="is_upload" v-slot:append-outer>
				<v-btn
					@click="clickAppendOuter"
					icon
					medium
					justify="center"
					items="center"
					self="end"
				>
					<img
						width="30"
						height="30"
						src="@/assets/icons/bulk_btn.png"
						alt="Filter"
					/>
				</v-btn>
			</template>
		</v-text-field>
	</v-card>
</template>

<script lang="ts">
	import { isEmpty } from "lodash";
	export default {
		name: "CardTextField",
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
			is_upload: {
				type: Boolean,
				default: false,
			},
			persistent_hint: {
				type: Boolean,
				default: false,
			},
			icon_add: {
				type: Boolean,
				default: false,
			},
			clearable: {
				type: Boolean,
				default: false,
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
			type: {
				type: String,
				default: "text",
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
				console.log("CardTextField::clickAppendOuter", { params: params });
				this.$emit("click-append-outer", params);
			},
			clickAppend() {
				console.log("CardTextField::clickAppend", {
					modelData: this.modelData,
				});
				this.$emit("click-append", this.modelData);
			},
		},
		watch: {},
	};
</script>
