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
			:class="getCustomClass"
			:persistent-hint="persistent_hint"
			:append-icon="icon_add ? 'mdi-plus-circle' : ''"
			:clearable="clearable"
			:error="!isEmpty(messages)"
			:messages="messages"
			@click:append="clickAppend"
			@change="changeEvent"
			@blur="blurEvent"
			:validate-on-blur="false"
			:loading="isLoading"
			:type="type"
			:step="type === 'time' ? 2 : 1"
			:disabled="disabled"
			:value="getValue"
			:error-messages="error_messages" 
			v-on:keyup.enter="enterHandler"
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
			type: {
				type: String,
				default: "text",
			},
			disabled: {
				type: Boolean,
				default: false,
			},
			valueNumber: {
				type: Number,
				default: undefined,
			},
			valueText: {
				type: String,
				default: undefined,
			},
			error_messages: { 
				type: Array,
				default: function () {
					return [];
				},
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
			getCustomClass() {
				if (this.disabled) {
					return this.customClass + " disabled";
				} else {
					return this.customClass;
				}
			},
			getValue() {
				if (this.valueNumber) return this.valueNumber;
				if (this.valueText) return this.valueText;
				return undefined;
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
			changeEvent(e: any) {
				this.$emit("change", e);
			},
			blurEvent(e: any) {
				this.$emit("blur", this.modelData);
			},
			enterHandler(e: any) {
				this.$emit("enter", e);
			},
		},
		watch: {},
	};
</script>
