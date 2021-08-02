<template>
	<v-dialog v-model="isAlertize" width="388" :content-class="'rounded-10 pa-0' + getType">
		<v-card class="text-center notification-dialog mx-auto" rounded>
			<div>
				<v-avatar v-if="isSuccess" size="96" class="my-8">
					<v-img src="@/assets/icons/success.svg" lazy-src="@/assets/icons/success.svg"/>
				</v-avatar>
				<v-avatar v-if="isError" size="96" class="my-8">
					<v-img src="@/assets/icons/error.svg" lazy-src="@/assets/icons/error.svg"/>
				</v-avatar>
			</div>

			<v-card-title class="title justify-center">
				<h3>{{ getTitle }}</h3>
			</v-card-title>

			<v-card-title class="message justify-center">
				{{ getMessage }}
			</v-card-title>

			<v-card-subtitle v-if="getErrors" class="message justify-start text-left pt-4">
				<div v-for="(errors,field) in getErrors" :key="field">
					<h3 class="text-subtitle-2">{{ field }}</h3>
					<p v-for="error in errors" :key="error" class="text-caption px-0 mx-0">
						{{ error }}
					</p>
				</div>
			</v-card-subtitle>

			<v-card-actions class="justify-center lighten-2 pa-8 pt-2">
				<v-btn
					color="secondary"
					class="px-8 ma-8"
					elevation="2"
					rounded
					@click="actionBtn()"
				>
					{{ getBtnText }}
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script lang="ts">
	import { Notification, MessageTypes } from "../interfaces/proccess";
	import Vue from "vue";
	export default Vue.extend({
		name: "Alertize",
		props: {},
		data: () => ({
			images: {
				success: `@/assets/icons/success.svg`,
				error: `@/assets/icons/error.svg`,
			},
		}),
		mounted() {},
		computed: {
			notification(): Notification {
				return this.$store.state.proccess.notification;
			},
			showNotification() {
				return Boolean(this.notification.show);
			},
			getMessage() {
				return this.notification.message;
			},
			getErrors() {
				return this.$store.state.proccess.errors;
			},
			getType() {
				return this.notification.type;
			},
			getRedirectTo() {
				return this.notification.to;
			},
			getTitle() {
				return this.notification.title;
			},
			getBtnText() {
				return this.notification.btn_text;
			},

			isSuccess() {
				return this.notification.type === MessageTypes.SUCCESS;
			},

			isError() {
				return this.notification.type === MessageTypes.ERROR;
			},

			// matched

			matchedTitle() {
				return {
					success: this.$t("title-success"),
					error: this.$t("title-failed"),
				};
			},

			matchedType() {
				return {
					success: this.$t("continue"),
					error: this.$t("try-again"),
				};
			},

			isAlertize: {
				set(val: Boolean) {
					this.setAlertize(val);
				},
				get() {
					return this.showNotification;
				},
			},
		},
		methods: {
			setAlertize(val: Boolean) {
				this.$store.state.proccess.notification.show = val;
			},
			async resetNotification() {
				return this.$store.dispatch(
					"proccess/setNotification",
					{
						show: false,
						message: "",
						type: "",
						title: "",
						btn_text: "",
					} as Notification,
					{ root: true }
				);
			},
			async actionBtn() {
				const to = this.getRedirectTo;
				await this.resetNotification();
				if (to) {
					return this.$router.push(typeof to == "object" ? to : { name: to });
				}
				return;
			},
		},
	});
</script>
