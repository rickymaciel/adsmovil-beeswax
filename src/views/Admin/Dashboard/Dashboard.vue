<template>
	<v-container class="mt-8">
		<v-row no-gutters>
			<v-col cols="12">
				<TitleWelcome
					:title="getTitle"
					type="title-1"
					:showSubtitle="true"
					:showSearcher="true"
				></TitleWelcome>
			</v-col>
		</v-row>

		<!-- <v-row no-gutters>
			<label
				>File
				<input
					type="file"
					id="file"
					ref="file"
					v-on:change="handleFileUpload()"
				/>
			</label>
			<button v-on:click="submitFile()">Submit</button>
		</v-row> -->
	</v-container>
</template>

<script lang="ts">
	import { isNull } from "lodash";
	import Vue from "vue";
	import TitleWelcome from "../../../components/Header/TitleWelcome.vue";

	export default Vue.extend({
		name: "Dashboard",
		props: {},
		components: {
			TitleWelcome,
		},
		data: () => ({
			loading: false,
		}),

		async created() {},

		mounted() {
			console.log(this.$t("welcomeMsg"));
		},

		computed: {
			getTitle() {
				return this.$t("welcomeMsg", { name: this.getFirstName });
			},
			getFirstName() {
				return !isNull(this.$store.state.profile.profile)
					? this.$store.state.profile.profile.first_name
					: "";
			},
		},

		methods: {
			handleFileUpload() {
				this.file = this.$refs.file.files[0];
			},

			submitFile() {
				let formData = new FormData();
				formData.append("custom_list_id", "10");
				formData.append("file", this.file);

				return this.$store.dispatch("listItem/uploadFile", formData, {
					root: true,
				});
			},
		},
	});
</script>
