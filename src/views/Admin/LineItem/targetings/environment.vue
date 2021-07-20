<template>
	<v-list>
		<!-- environment_type -->
		<v-list-item>
			<v-container>
				<v-row dense>
					<!-- url -->
					<v-col cols="12" sm="12" md="6" lg="4">
						<CardTextField
							v-model="environment.environment_type.url"
							hint="Environment Type"
							reference="name"
							label="Environment Type"
							placeholder="Select Environment Type"
							:required="false"
						></CardTextField>
					</v-col>

					<!-- include -->
					<v-col
						class="pe-lg-16 pa-0"
						cols="12"
						sm="12"
						md="4"
						lg="4"
					>
						<CardSwitch
							v-model="environment.environment_type.include"
							reference="include"
							:label="
								environment.environment_type.include
									? 'Include'
									: 'Exclude'
							"
							:color="
								environment.environment_type.include
									? 'success'
									: 'red'
							"
						></CardSwitch>
					</v-col>
				</v-row>
			</v-container>
		</v-list-item>

		<v-divider></v-divider>

		<!-- topframe -->
		<v-list-item>
			<v-container>
				<v-row dense>
					<!-- url -->
					<v-col cols="12" sm="12" md="6" lg="4">
						<CardTextField
							v-model="environment.topframe.url"
							hint="Top Frame"
							reference="name"
							label="Top Frame"
							placeholder="Select Top Frame"
							:required="false"
						></CardTextField>
					</v-col>

					<!-- include -->
					<v-col
						class="pe-lg-16 pa-0"
						cols="12"
						sm="12"
						md="4"
						lg="4"
					>
						<CardSwitch
							v-model="environment.topframe.include"
							reference="include"
							:label="
								environment.topframe.include
									? 'Include'
									: 'Exclude'
							"
							:color="
								environment.topframe.include ? 'success' : 'red'
							"
						></CardSwitch>
					</v-col>
				</v-row>
			</v-container>
		</v-list-item>

		<v-divider></v-divider>

		<!-- video_api -->
		<v-list-item>
			<v-container>
				<v-row dense>
					<!-- url -->
					<v-col cols="12" sm="12" md="6" lg="4">
						<CardTextField
							v-model="environment.video_api.url"
							hint="API Framework"
							reference="name"
							label="API Framework"
							placeholder="Select API Framework"
							:required="false"
						></CardTextField>
					</v-col>

					<!-- include -->
					<v-col
						class="pe-lg-16 pa-0"
						cols="12"
						sm="12"
						md="4"
						lg="4"
					>
						<CardSwitch
							v-model="environment.video_api.include"
							reference="include"
							:label="
								environment.video_api.include
									? 'Include'
									: 'Exclude'
							"
							:color="
								environment.video_api.include
									? 'success'
									: 'red'
							"
						></CardSwitch>
					</v-col>
				</v-row>
			</v-container>
		</v-list-item>
	</v-list>
</template>
<script lang="ts">
	import Vue from "vue";
	import CardTextField from "../../../../components/Content/CardTextField.vue";
	import CardSwitch from "../../../../components/Content/CardSwitch.vue";

	export default Vue.extend({
		name: "Environment",
		props: {
			environment: {
				type: Object,
				default: function () {},
			},
		},
		components: { CardTextField, CardSwitch },
		data: () => ({}),
		created() {},
		async mounted() {},
		computed: {},
		methods: {},
	});
</script>
