<template>
	<v-list>
		<!-- content_category -->
		<v-list-item>
			<v-container>
				<v-row dense>
					<!-- url -->
					<v-col cols="12" sm="12" md="6" lg="4">
						<CardTextField
							v-model="content.content_category.url"
							hint="Content Category"
							reference="name"
							label="Content Category"
							placeholder="Select Content Category"
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
							v-model="content.content_category.include"
							reference="include"
							:label="
								content.content_category.include
									? 'Include'
									: 'Exclude'
							"
							:color="
								content.content_category.include
									? 'success'
									: 'red'
							"
						></CardSwitch>
					</v-col>
				</v-row>
			</v-container>
		</v-list-item>

		<v-divider></v-divider>

		<!-- language -->
		<v-list-item>
			<v-container>
				<v-row dense>
					<!-- url -->
					<v-col cols="12" sm="12" md="6" lg="4">
						<CardTextField
							v-model="content.language.url"
							hint="Language"
							reference="name"
							label="Language"
							placeholder="Select Language"
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
							v-model="content.language.include"
							reference="include"
							:label="
								content.language.include ? 'Include' : 'Exclude'
							"
							:color="
								content.language.include ? 'success' : 'red'
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
import CardTextField from "../../../../../components/Content/CardTextField.vue";
import CardSwitch from "../../../../../components/Content/CardSwitch.vue";

export default Vue.extend({
	name: "Content",
	props: {
		content: {
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
