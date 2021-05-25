<template>
	<v-dialog
		v-model="isAlertize"
		width="388"
		:content-class="'rounded-10 ' + getType"
	>
		<v-card class="text-center notification-dialog mx-auto" rounded>
			<div class="p-8">
				<v-avatar v-if="isSuccess" size="96" class="my-8">
					<v-img
						src="@/assets/icons/success.svg"
						lazy-src="@/assets/icons/success.svg"
					></v-img>
				</v-avatar>
				<v-avatar v-if="isError" size="96" class="my-8">
					<v-img
						src="@/assets/icons/error.svg"
						lazy-src="@/assets/icons/error.svg"
					></v-img>
				</v-avatar>
			</div>

			<v-card-title class="title justify-center">
				<h3>{{ getTitle }}</h3>
			</v-card-title>

			<v-card-title class="message justify-center">
				{{ getMessage }}
			</v-card-title>

			<v-card-actions class="justify-center lighten-2 pa-8">
				<v-btn
					color="secondary"
					class="px-8 ma-8"
					elevation="2"
					rounded
					@click="actionBtn()"
				>
					{{ btnText }}
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

			getType() {
				return this.notification.type;
			},

			getRedirectTo() {
				return this.notification.to;
			},

			getTitle() {
				return this.matchedTitle[this.notification.type];
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

			btnText() {
				if (this.getRedirectTo) {
					return this.$t("close");
				}
				return this.matchedType[this.getType];
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
					{ show: false, message: "", type: "" } as Notification,
					{ root: true }
				);
			},
			async actionBtn() {
				const to = this.getRedirectTo;
				console.log("actionBtn", { to: to });
				await this.resetNotification();
				console.log("resetNotification", {
					notification: this.notification,
				});
				if (to) {
					return this.$router.push({ name: to });
				}
				return;
			},
		},
	});
</script>
