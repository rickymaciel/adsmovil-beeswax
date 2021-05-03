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
				<h3>{{ notification.title }}</h3>
			</v-card-title>

			<v-card-title class="message justify-center">
				{{ notification.message }}
			</v-card-title>

			<v-card-actions class="justify-center lighten-2 pa-8">
				<v-btn
					color="secondary"
					class="px-8 ma-8"
					elevation="2"
					rounded
					@click="actionBtn"
				>
					{{ btnText }}
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script lang="ts">
	import { isEmpty, isNull, isUndefined } from "lodash";
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

			hasMessage() {
				return (
					!isUndefined(this.notification.message) &&
					!isNull(this.notification.message) &&
					!isEmpty(this.notification.message)
				);
			},
			getType() {
				return this.notification.type;
			},

			isSuccess() {
				return this.getType === MessageTypes.SUCCESS;
			},

			isError() {
				return this.getType === MessageTypes.ERROR;
			},

			btnText() {
				let text = "";
				if (this.isSuccess) {
					text = this.$t("continue");
				}
				if (this.isError) {
					text = this.$t("try-again");
				}
				return text;
			},
			isAlertize: {
				set(val: Boolean) {
					this.setAlertize(val);
				},
				get() {
					return this.$store.state.proccess.alertize;
				},
			},
		},
		methods: {
			setAlertize(val: Boolean) {
				this.$store.state.proccess.alertize = val;
			},
			resetNotification() {
				return this.$store.dispatch(
					"proccess/setNotification",
					{},
					{ root: true }
				);
			},
			actionBtn() {
				switch (this.getType) {
					case MessageTypes.ERROR:
						this.resetNotification();

						break;

					case MessageTypes.SUCCESS:
						this.resetNotification();
						this.$router.push({ name: "AdvertisersList" });

						break;

					default:
						break;
				}
			},
		},
	});
</script>
