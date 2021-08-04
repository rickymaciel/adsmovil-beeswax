<template>
	<v-card 
        elevation="0"
		class="px-2 mb-2"
		outlined
		tile
		color="rgb(0, 0, 0, 0.0)"
	>

        <v-tooltip v-model="show" bottom>
            <template v-slot:activator="{ }">
                <v-text-field 
                    v-model="modelData"
                    append-icon="mdi-help-circle" 
                    :label="label"
                    :rules="rules"
                    :hint="hint"
                    :ref="reference"
                    :placeholder="placeholder"
                    :class="getCustomClass"
                    :persistent-hint="persistent_hint"
                    :clearable="clearable"
                    :error="!isEmpty(messages)"
                    :messages="messages"
                    :validate-on-blur="false"
                    :loading="isLoading"
                    :type="type"
                    :step="type === 'time' ? 2 : 1"
                    :disabled="disabled"
                    :value="getValue"
                    :error-messages="error_messages" 
                    v-on:keyup.enter="enterHandler"
                    @click:append="show = !show"
				    @change="changeEvent"
				    @blur="blurEvent"
                >
                    
                    <template #label>
                        {{ label }}
                        <span class="red--text" v-if="required">
                            <strong>*</strong>
                        </span>
                    </template>

                </v-text-field>
            </template>
            <span>{{ tooltip_message }}</span>
        </v-tooltip>
    </v-card>
</template>

<script lang="ts">
	import { isEmpty } from "lodash";
	export default {
		name: "CardTextFieldToolTip",
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
            tooltip_message: {
                type: String,
				default: undefined,
            }
		},
		data: function () {
			return {
                show: false
            };
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