<template>
	<v-card justify="between" align="center" color="grey lighten-3 py-4">
		<v-form
			ref="form"
			justify="between"
			align="center"
			v-model="valid"
			lazy-validation
		>
			<v-container>
				<v-row dense>
					<!-- Name -->
					<v-col cols="12" sm="12" md="4" lg="4">
						<v-card
							elevation="0"
							class="pa-2"
							outlined
							tile
							color="rgb(0, 0, 0, 0.0)"
						>
							<v-text-field
								v-model="name"
								:rules="nameRules"
								hint="Name"
								ref="name"
								placeholder="Name"
								label="Name*"
								class="label-fixed"
								counter="255"
							></v-text-field>
						</v-card>
					</v-col>

					<!-- Start Date -->
					<v-col cols="12" sm="12" md="4" lg="4">
						<v-menu
							v-model="menuStartDate"
							:close-on-content-click="false"
							:nudge-right="40"
							transition="scale-transition"
							offset-y
							min-width="auto"
						>
							<template v-slot:activator="{ on, attrs }">
								<v-text-field
									v-model="startDate"
									label="Start Date"
									prepend-icon="mdi-calendar"
									readonly
									v-bind="attrs"
									v-on="on"
									outlined
								></v-text-field>
							</template>
							<v-date-picker
								v-model="startDateSearch"
								@input="menuStartDate = false"
							></v-date-picker>
						</v-menu>
					</v-col>

					<!-- End Date -->
					<v-col cols="12" sm="12" md="4" lg="4">
						<v-menu
							v-model="menuEndDate"
							:close-on-content-click="false"
							:nudge-right="40"
							transition="scale-transition"
							offset-y
							min-width="auto"
						>
							<template v-slot:activator="{ on, attrs }">
								<v-text-field
									v-model="endDate"
									label="End Date"
									prepend-icon="mdi-calendar"
									readonly
									v-bind="attrs"
									v-on="on"
									outlined
								></v-text-field>
							</template>
							<v-date-picker
								v-model="endDateSearch"
								@input="menuEndDate = false"
							></v-date-picker>
						</v-menu>
					</v-col>
				</v-row>

				<v-row dense>
					<!-- Alternative Id -->
					<v-col cols="12" sm="12" md="4" lg="4">
						<v-card
							elevation="0"
							class="pa-2"
							outlined
							tile
							color="rgb(0, 0, 0, 0.0)"
						>
							<v-text-field
								v-model="calternativeId"
								:rules="alternativeIdRules"
								hint="Alternative Id"
								ref="alternative_id"
								placeholder="Alternative Id"
								label="Alternative Id"
								class="label-fixed"
								counter="255"
							></v-text-field>
						</v-card>
					</v-col>

					<!-- Secure -->
					<v-col cols="12" sm="12" md="4" lg="4">
						<v-card
							elevation="0"
							outlined
							tile
							color="rgb(0, 0, 0, 0.0)"
						>
							<v-switch
								color="success"
								class="v-input--reverse--column"
								inset
								flat
								hide-details
								v-model="activeSecure"
								:label="`${activeSecure ? 'Active' : 'Inactive'}`"
								@change="toggleSecure"
							>
							</v-switch>
						</v-card>
					</v-col>

					<!-- Active -->
					<v-col cols="12" sm="12" md="4" lg="4">
						<v-card
							elevation="0"
							outlined
							tile
							color="rgb(0, 0, 0, 0.0)"
						>
							<v-switch
								color="success"
								class="v-input--reverse--column"
								inset
								flat
								hide-details
								v-model="activeActive"
								:label="`${activeActive ? 'Active' : 'Inactive'}`"
								@change="toggleActive"
							>
							</v-switch>
						</v-card>
					</v-col>
				</v-row>

				<v-row dense>
					<!-- Template -->
					<v-col cols="12" sm="12" md="4" lg="4">
						<v-card
							elevation="0"
							class="pa-2"
							outlined
							tile
							color="rgb(0, 0, 0, 0.0)"
						>
							<v-autocomplete
								class="label-fixed"
								v-model="template_id"
								:rules="templateRules"
								:hint="`Template`"
								:items="getTemplates"
								ref="template_id"
								item-text="name"
								item-value="id"
								label="Select Creative Template*"
								placeholder="Select Creative Template"
							></v-autocomplete>
						</v-card>
					</v-col>

					<!-- Width x Height -->
					<v-col cols="12" sm="12" md="4" lg="4">
						<v-card
							elevation="0"
							class="pa-2"
							outlined
							tile
							color="rgb(0, 0, 0, 0.0)"
						>
							<v-autocomplete
								class="label-fixed"
								v-model="widthHeight_id"
								:rules="widthHeightRules"
								:hint="`Select Size`"
								:items="getWidthHeights"
								ref="widthHeight_id"
								item-text="name"
								item-value="id"
								label="Select Size*"
								placeholder="Select Size"
							></v-autocomplete>
						</v-card>
					</v-col>
				</v-row>

				<!-- Advertiser -->
				<v-row>
					<label>Advertiser</label>
					<v-divider class="ma-4"></v-divider>
				</v-row>

				<v-row dense>
					<!-- Advertiser -->
					<v-col cols="12" sm="12" md="4" lg="4">
						<v-card
							elevation="0"
							class="pa-2"
							outlined
							tile
							color="rgb(0, 0, 0, 0.0)"
						>
							<v-autocomplete
								class="label-fixed"
								v-model="advertiser_id"
								:rules="advertiserRules"
								:hint="`Select Advertiser`"
								:items="getAdvertisers"
								ref="advertiser_id"
								item-text="name"
								item-value="id"
								label="Select Advertiser*"
								placeholder="Select Advertiser"
							></v-autocomplete>
						</v-card>
					</v-col>

					<!-- Domain -->
					<v-col cols="12" sm="12" md="4" lg="4">
						<v-card
							elevation="0"
							class="pa-2"
							outlined
							tile
							color="rgb(0, 0, 0, 0.0)"
						>
							<v-text-field
								v-model="domainText"
								:rules="adomainRules"
								hint="Domain"
								ref="domain"
								placeholder="Domain"
								label="Domain"
								class="label-fixed"
								counter="255"
							></v-text-field>
						</v-card>
					</v-col>

					<!-- Category -->
					<v-col cols="12" sm="12" md="4" lg="4">
						<v-card
							elevation="0"
							class="pa-2"
							outlined
							tile
							color="rgb(0, 0, 0, 0.0)"
						>
							<v-autocomplete
								class="label-fixed"
								v-model="category_name"
								:rules="categoryRules"
								:hint="`Select Advertising`"
								:items="getCategories"
								ref="category_id"
								item-text="name"
								item-value="id"
								label="Select Advertising*"
								placeholder="Select Advertising"
							></v-autocomplete>
						</v-card>
					</v-col>
				</v-row>

				<!-- Ad Content -->
				<v-row>
					<label>Ad Content</label>
					<v-divider class="ma-4"></v-divider>
				</v-row>

				<v-row dense>
					<!-- Budget Type -->
					<v-col cols="12" sm="12" md="4" lg="4">
						<v-row>
							<v-col cols="6" sm="6" md="6" lg="6">
								<v-checkbox
									v-model="budgetType"
									label="Fix"
								></v-checkbox>
							</v-col>
							<v-col cols="6" sm="6" md="6" lg="6">
								<v-checkbox
									v-model="budgetType"
									label="Automated"
								></v-checkbox>
							</v-col>
						</v-row>
					</v-col>

					<!-- Upload New Assets -->
					<v-col cols="12" sm="12" md="4" lg="4">
						<v-card
							elevation="0"
							class="pa-2"
							outlined
							tile
							color="rgb(0, 0, 0, 0.0)"
						>
							<v-file-input
								v-model="files"
								color="deep-purple accent-4"
								counter
								label="Upload New Assets"
								multiple
								placeholder="Upload New Assets"
								prepend-icon="mdi-paperclip"
								outlined
								:show-size="1000"
							>
								<template v-slot:selection="{ index, text }">
									<v-chip
										v-if="index < 2"
										color="deep-purple accent-4"
										dark
										label
										small
									>
										{{ text }}
									</v-chip>

									<span
										v-else-if="index === 2"
										class="overline grey--text text--darken-3 mx-2"
									>
										+{{ files.length - 2 }} File(s)
									</span>
								</template>
							</v-file-input>
						</v-card>
					</v-col>

					<!-- Image -->
					<v-col cols="12" sm="12" md="4" lg="4">
						<v-img
							aspect-ratio="1"
							class="grey lighten-2"
						>
							<template v-slot:placeholder>
								<v-row
									class="fill-height ma-0"
									align="center"
									justify="center"
								>
									<v-progress-circular
									indeterminate
									color="grey lighten-5"
									></v-progress-circular>
								</v-row>
							</template>
						</v-img>
					</v-col>
				</v-row>

				<v-row dense>
					<!-- URL -->
					<v-col cols="12" sm="12" md="4" lg="4">
						<v-card
							elevation="0"
							class="pa-2"
							outlined
							tile
							color="rgb(0, 0, 0, 0.0)"
						>
							<v-text-field
								v-model="URLContent"
								:rules="urlRules"
								hint="Click URL"
								ref="url"
								placeholder="Click URL"
								label="Click URL"
								class="label-fixed"
								counter="255"
							></v-text-field>
						</v-card>
					</v-col>
				</v-row>

				<!-- Exchange Options -->
				<v-row>
					<label>Exchange Options</label>
					<v-divider class="ma-4"></v-divider>
				</v-row>

				<v-row dense>
					<!-- Technical Vendor -->
					<v-col cols="12" sm="12" md="4" lg="4">
						<v-card
							elevation="0"
							class="pa-2"
							outlined
							tile
							color="rgb(0, 0, 0, 0.0)"
						>
							<v-text-field
								v-model="TechnicalVendorContent"
								:rules="technicalVendorRules"
								hint="(Required for Google AdX)"
								persistent-hint
								ref="technicalVendor"
								placeholder="Add Technical Vendor"
								label="Technical Vendor"
								class="label-fixed"
								counter="255"
							></v-text-field>
							
						</v-card>
					</v-col>

					<!-- Landing Page URL -->
					<v-col cols="12" sm="12" md="4" lg="4">
						<v-card
							elevation="0"
							class="pa-2"
							outlined
							tile
							color="rgb(0, 0, 0, 0.0)"
						>
							<v-autocomplete
								class="label-fixed"
								v-model="landingURLContent"
								:rules="landingURLRules"
								hint="(Required for Google AdX)"
								persistent-hint
								:items="getlandingURLs"
								ref="landingURL_id"
								item-text="name"
								item-value="id"
								label="Landing URL"
								placeholder="Select Advertiser"
							></v-autocomplete>
						</v-card>
					</v-col>

					<!-- Submit Creative -->
					<v-col cols="12" sm="12" md="4" lg="4">
						<v-card
							elevation="0"
							class="pa-2"
							outlined
							tile
							color="rgb(0, 0, 0, 0.0)"
						>
							<v-checkbox
								v-model="submitCreative"
								label="Submit ceative to AppNexus for audit"
								></v-checkbox>
						</v-card>
					</v-col>
				</v-row>

				<!-- Pixels and Scripts -->
				<v-row>
					<label>Pixels and Scripts</label>
					<v-divider class="ma-4"></v-divider>
				</v-row>

				<v-row dense>
					<!-- Creative Add-On -->
					<v-col cols="12" sm="12" md="4" lg="4">
						<v-card
							elevation="0"
							class="pa-2"
							outlined
							tile
							color="rgb(0, 0, 0, 0.0)"
						>
							<v-text-field
								v-model="creativeAddOn"
								:rules="creativeAddOnRules"
								hint="Creative Add-on"
								placeholder="Creative Add-on"
								label="Creative Add-on"
								class="label-fixed"
								counter="255"
							></v-text-field>
							
						</v-card>
					</v-col>

					<!-- Pixels -->
					<v-col cols="12" sm="12" md="4" lg="4">
						<v-card
							elevation="0"
							class="pa-2"
							outlined
							tile
							color="rgb(0, 0, 0, 0.0)"
						>
							<v-text-field
								v-model="pixel"
								:rules="pixelRules"
								hint="Pixel"
								placeholder="Pixel"
								label="Pixels"
								class="label-fixed"
								counter="255"
							>
								<v-icon
									slot="prepend"
								>
								mdi-add-circle
								</v-icon>
							</v-text-field>
							<div id="pixelsContent">
								<v-label
									v-for="item in pixels"
									:key="item.id"
									v-bind:style="{
										width: '100%',
    									float: 'left',
									}"
								>
									<a>{{ item.name }}</a>
									<v-icon>mdi-delete</v-icon>
								</v-label>
							</div>
						</v-card>
					</v-col>

					<!-- Scripts -->
					<v-col cols="12" sm="12" md="4" lg="4">
						<v-card
							elevation="0"
							class="pa-2"
							outlined
							tile
							color="rgb(0, 0, 0, 0.0)"
						>
							<v-text-field
								v-model="script"
								:rules="scriptlRules"
								hint="Script"
								placeholder="Script"
								label="Scripts"
								class="label-fixed"
								counter="255"
							>
								<v-icon
									slot="prepend"
								>
								mdi-add-circle
								</v-icon>
							</v-text-field>
							<div id="scriptsContent">
								<v-label v-for="item in scripts" :key="item.id">
									<a>{{ item.name }}</a>
									<v-icon>mdi-delete</v-icon>
								</v-label>
							</div>
						</v-card>
					</v-col>
				</v-row>

				<v-divider class="ma-4"></v-divider>
				<v-row no-gutters align="center" justify="center">
					<v-col cols="12" sm="12" md="8" lg="9">
						<v-card
							elevation="0"
							class="pa-2"
							outlined
							tile
							color="rgb(0, 0, 0, 0.0)"
						>
							<v-card-text
								align="start"
								class="secondary--text info-message"
							>
								* Mandatory fields
							</v-card-text>
						</v-card>
					</v-col>

					<v-col cols="12" sm="12" md="8" lg="3">
						<v-card
							elevation="0"
							class="pa-2"
							outlined
							tile
							color="rgb(0, 0, 0, 0.0)"
						>
							<v-row align="center" justify="center">
								<v-btn
									rounded
									color="secondary"
									class="ma-2 px-8"
									@click="handleSubmit"
								>
									{{ $t("save") }}
								</v-btn>
								<v-btn
									rounded
									color="secondary"
									class="ma-2 px-8"
									@click="handleSubmit"
								>
									{{ $t("save & continue") }}
								</v-btn>
								<v-btn
									rounded
									color="secondary"
									class="ma-2 px-8"
									@click="handleCancel"
								>
									{{ $t("cancel") }}
								</v-btn>
							</v-row>
						</v-card>
					</v-col>
				</v-row>
			</v-container>
		</v-form>
	</v-card>
</template>

<script lang="ts">
	import Vue from "vue";
	import { isUndefined, isNull, isEmpty, findIndex } from "lodash";
	import { Advertiser } from "../../../../interfaces/advertiser";
	const moment = require('moment');

	export default Vue.extend({
		name: "CreateCreative",
		props: {},
		components: {},
		data: () => ({
			title: "Create New Creative",
			name: "",
			domainText: "",
			category_name: "",
			URLContent: "",
			TechnicalVendorContent: "",
			landingURLContent: "",
			creativeAddOn: "",
			pixel: "",
			script: "",
			calternativeId: NaN,
			template_id: NaN,
			widthHeight_id: NaN,
			advertiser_id: NaN,
			activeSecure: false,
			activeActive: false,
			budgetType: false,
			submitCreative: false,
			files: [],
			pixels: [
				{id: 1, name: "Pixel 1"},
				{id: 2, name: "Pixel 2"},
			],
			scripts: [
				{id: 1, name: "Script 1"},
				{id: 2, name: "Script 2"},
			],
			//Menúes
			menuStartDate: false,
			startDateSearch: moment(new Date()).local().format('YYYY-MM-DD'),
			startDate: moment(new Date()).local().format('YYYY-MM-DD'),
			menuEndDate: false,
			endDateSearch: moment(new Date()).local().format('YYYY-MM-DD'),
			endDate: moment(new Date()).local().format('YYYY-MM-DD'),
			valid: false
		}),
		created() {},
		async mounted() {},
		computed: {
			alternativeIdRules() {
				return [];
			},
			templateRules(){
				return [];
			},
			widthHeightRules(){
				return [];
			},
			adomainRules(){
				return [];
			},
			categoryRules(){
				return [];
			},
			urlRules(){
				return [];
			},
			technicalVendorRules(){
				return [];
			},
			landingURLRules(){
				return [];
			},
			creativeAddOnRules(){
				return [];
			},
			pixelRules(){
				return [];
			},
			scriptlRules(){
				return [];
			},
			advertiserRules(){
				return [];
			},
			nameRules(){
				return [];
			},
			getTemplates(): any{
				return [
					{name: "Template 1",
					id: 1},
					{name: "Template 2",
					id: 2},
					{name: "Template 3",
					id: 3},
				]
			},
			getWidthHeights(): any{
				return [
					{name: "WidthHeight 1",
					id: 1},
					{name: "WidthHeight 2",
					id: 2},
					{name: "WidthHeight 3",
					id: 3},
				]
			},
			getCategories(): any{
				return [
					{name: "Category 1",
					id: 1},
					{name: "Category 2",
					id: 2},
					{name: "Category 3",
					id: 3},
				]
			},
			getlandingURLs(): any{
				return [
					{name: "Landing URL 1",
					id: 1},
					{name: "Landing URL 2",
					id: 2},
					{name: "Landing URL 3",
					id: 3},
				]
			},
			getAdvertisers(): any{
				return [
					{name: "Advertiser 1",
					id: 1},
					{name: "Advertiser 2",
					id: 2},
					{name: "Advertiser 3",
					id: 3},
				]
			},
		},
		methods: {
			toggleSecure(){},
			toggleActive(){},
			handleSubmit(){},
			handleCancel(){},
			/*updatefield(event: any, field: string) {
				console.log("updatefield", { event: event, field: field });
				this.$emit("update-model", this.campaign);
			},
			handleSubmit() {},
			handleCancel() {},*/
		},
	});
</script>