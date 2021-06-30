<template>
	<v-layout class="d-block ma-0 pa-0">
		<Alertize></Alertize>
		<v-layout class="d-block ma-0 pa-0">
			<v-container class="my-0 py-0">
				<Overview
					:creative="creative"
					:message_pixel="message_pixel"
					:message_script="message_script"
					:message_click_tracker="message_click_tracker"
					:tag_validated="tag_validated"
					@update-creative-type-id="updateCreativeTypeId"
					@fetch-creative-templates="fetchCreativeTemplates"
					@fetch-creative-sizes="fetchCreativeSizes"
					@fetch-advertiser-categories="fetchAdvertiserCategories"
					@fetch-creative-rules="fetchCreativeRules"
					@fetch-mime-types="fetchMimeTypes"
					@fetch-creative-advertisers="fetchCreativeAdvertisers"
					@selected-creative-advertiser="selectedCreativeAdvertiser"
					@fetch-expendable-types="fetchExpendableTypes"
					@fetch-expendable-directions="fetchExpendableDirections"
					@fetch-banner-videos="fetchInBannerVideos"
					@fetch-vendors="fetchVendors"
					@fetch-addons="fetchAddons"
					@fetch-assets="fetchAssets"
					@fetch-thumbnails="fetchAssets"
					@add-new-pixel="addPixel"
					@delete-pixel="deletePixel"
					@add-new-script="addScript"
					@add-new-click-tracker="addNewClickTracker"
					@delete-script="deleteScript"
					@delete-click-tracker="deleteclickTracker"
					@create-asset="createAsset"
					@create-creative-image="createCreativeImage"
					@create-creative-jstag="createCreativeJsTag"
					@create-creative-iframetag="createCreativeIframeTag"
					@create-creative-mraidtag="createCreativeMraidTag"
					@create-creative-html5="createCreativeHtml5"
					@create-creative-vast-inline="createCreativeVastInline"
					@add-row-vast-event="addRowVastEvent"
					@delete-row-vast-event="deleteRowVastEvent"
					@add-row-progress-event="addRowProgressEvent"
					@delete-row-progress-event="deleteRowProgressEvent"
					@validate-tag="validateTag"
					@must-validated="mustValidated"
				></Overview>
			</v-container>
		</v-layout>
	</v-layout>
</template>

<script lang="ts">
	import { isEmpty, isUndefined } from "lodash";
	import Vue from "vue";
	import Alertize from "../../../../components/Alertize.vue";
	import { isUrl } from "../../../../services/rule-services";
	import Overview from "./overview.vue";
	import { ImageDataCreate } from "../../../../interfaces/creativeBannerImage";
	import { JsTagDataCreate } from "../../../../interfaces/creativeBannerJsTag";
	import { IframeTagDataCreate } from "../../../../interfaces/creativeBannerIframeTag";
	import { MraidTagDataCreate } from "../../../../interfaces/creativeBannerMraidTag";
	import { Html5DataCreate } from "../../../../interfaces/creativeBannerHtml5";
	import { VastInlineDataCreate } from "../../../../interfaces/creativeVideoVastInline";
	import { initCreative } from "../../../../utils/fields";
	import { TagCheck } from "../../../../interfaces/creative";

	export default Vue.extend({
		name: "CreateCreative",
		props: {},
		components: { Alertize, Overview },
		data: () => ({
			creative: initCreative(),
			message_pixel: "",
			message_script: "",
			message_click_tracker: "",
			tag_validated: false,
		}),
		created() {},
		mounted() {},
		computed: {
			getResponseTemplates() {
				return this.$store.state.creative.responseTemplates;
			},

			getAsset() {
				return this.$store.state.creative.asset;
			},
		},
		methods: {
			updateCreativeTypeId(creative_type_id: number) {
				this.creative.creative_type_id = creative_type_id;
			},

			async fetchCreativeTemplates() {
				await this.setLoadingField(true);
				await this.dispatchCreativeTypes();
				await this.dispatchCreativeTemplates();
				await this.setLoadingField(false);
			},

			async fetchCreativeSizes() {
				await this.setLoadingField(true);
				await this.dispatchCreativeSizes();
				await this.setLoadingField(false);
			},

			async fetchCreativeAdvertisers() {
				await this.setLoadingField(true);
				await this.dispatchAdvertisers();
				await this.fetchAdvertiserCategories();
				await this.setLoadingField(false);
			},

			async fetchAdvertiserCategories() {
				await this.setLoadingField(true);
				await this.dispatchAdvertiserCategories();
				await this.setLoadingField(false);
			},

			async fetchCreativeRules() {
				await this.setLoadingField(true);
				await this.dispatchCreativeRules();
				await this.setLoadingField(false);
			},

			async fetchMimeTypes() {
				await this.setLoadingField(true);
				await this.dispatchMimeTypes();
				await this.setLoadingField(false);
			},

			async fetchExpendableTypes() {
				await this.setLoadingField(true);
				await this.dispatchExpendableTypes();
				await this.setLoadingField(false);
			},

			async fetchExpendableDirections() {
				await this.setLoadingField(true);
				await this.dispatchExpendableDirections();
				await this.setLoadingField(false);
			},

			async fetchInBannerVideos() {
				await this.setLoadingField(true);
				await this.dispatchInBannerVideos();
				await this.setLoadingField(false);
			},

			async fetchVendors() {
				await this.setLoadingField(true);
				await this.dispatchVendors();
				await this.setLoadingField(false);
			},

			async fetchAddons() {
				await this.setLoadingField(true);
				await this.dispatchAddons();
				await this.setLoadingField(false);
			},

			async fetchAssets() {
				await this.setLoadingField(true);
				await this.dispatchAssets();
				await this.setLoadingField(false);
			},

			async createAsset(formData: FormData) {
				try {
					await this.setLoadingField(true);
					await this.dispatchcreateAsset(formData);
					await this.dispatchAssets();

					this.creative.creative_ad_content.primary_asset_id =
						this.getAsset.id;
					this.creative.budget_type_id = 2;

					await this.setLoadingField(false);
				} catch (error) {
					console.error("createAsset", { error: error });
					await this.setLoadingField(false);
				}
			},

			/**
			 * Create Creative Image
			 */
			async createCreativeImage(creative: ImageDataCreate) {
				try {
					await this.setLoadingField(true);
					await this.dispatchCreateImage(creative);
					await this.setLoadingField(false);
				} catch (error) {
					console.error("createCreativeImage", { error: error });
					await this.setLoadingField(false);
				}
			},

			/**
			 * Create Creative Js Tag
			 */
			async createCreativeJsTag(creative: JsTagDataCreate) {
				try {
					await this.setLoadingField(true);
					await this.dispatchCreateJsTag(creative);
					await this.setLoadingField(false);
				} catch (error) {
					console.error("createCreativeJsTag", { error: error });
					await this.setLoadingField(false);
				}
			},

			/**
			 * Create Creative IframeTag
			 */
			async createCreativeIframeTag(creative: IframeTagDataCreate) {
				try {
					await this.setLoadingField(true);
					await this.dispatchCreateIframeTag(creative);
					await this.setLoadingField(false);
				} catch (error) {
					console.error("createCreativeIframeTag", { error: error });
					await this.setLoadingField(false);
				}
			},

			/**
			 * Create Creative MraidTag
			 */
			async createCreativeMraidTag(creative: MraidTagDataCreate) {
				try {
					await this.setLoadingField(true);
					await this.dispatchCreateMraidTag(creative);
					await this.setLoadingField(false);
				} catch (error) {
					console.error("createCreativeMraidTag", { error: error });
					await this.setLoadingField(false);
				}
			},

			/**
			 * Create Creative Html5
			 */
			async createCreativeHtml5(creative: Html5DataCreate) {
				try {
					await this.setLoadingField(true);
					await this.dispatchCreateHtml5(creative);
					await this.setLoadingField(false);
				} catch (error) {
					console.error("createCreativeHtml5", { error: error });
					await this.setLoadingField(false);
				}
			},

			/**
			 * Create Creative Vast Inline
			 */
			async createCreativeVastInline(creative: VastInlineDataCreate) {
				try {
					await this.setLoadingField(true);
					await this.dispatchCreateVastInline(creative);
					await this.setLoadingField(false);
				} catch (error) {
					console.error("createCreativeVastInline", { error: error });
					await this.setLoadingField(false);
				}
			},

			findIndexByData(data: Array<any>, item: any) {
				return data.findIndex(item);
			},

			getIndexByData(data: Array<string>, item: string) {
				return data.indexOf(item);
			},

			/**
			 * pixel
			 */

			addPixel(item: any) {
				this.message_pixel = "";

				if (isEmpty(item)) return;

				if (!isUrl(item)) {
					this.message_pixel = this.$t("domain");
					return;
				}

				const index = this.getIndexByData(
					this.creative.creative_addon_settings.pixels,
					item
				);

				if (index > -1) {
					this.message_pixel = this.$t("url-added");
					return;
				}

				this.creative.creative_addon_settings.pixels.push(item);
				this.creative.creative_addon_settings.pixel = "";
			},

			deletePixel(item: any) {
				if (!item) return;
				const index = this.getIndexByData(
					this.creative.creative_addon_settings.pixels,
					item
				);
				if (index < 0) return;
				this.creative.creative_addon_settings.pixels.splice(index, 1);
			},

			/**
			 * script
			 */

			addScript(item: any) {
				this.message_script = "";

				if (isEmpty(item)) return;

				if (!isUrl(item)) {
					this.message_script = this.$t("domain");
					return;
				}

				const index = this.getIndexByData(
					this.creative.creative_addon_settings.scripts,
					item
				);

				if (index > -1) {
					this.message_script = this.$t("url-added");
					return;
				}

				this.creative.creative_addon_settings.scripts.push(item);
				this.creative.creative_addon_settings.script = "";
			},

			addNewClickTracker(item: any) {
				this.message_click_tracker = "";

				if (isEmpty(item)) return;

				if (!isUrl(item)) {
					this.message_click_tracker = this.$t("domain");
					return;
				}

				const index = this.getIndexByData(
					this.creative.creative_addon_settings.click_trackers,
					item
				);

				if (index > -1) {
					this.message_click_tracker = this.$t("url-added");
					return;
				}

				this.creative.creative_addon_settings.click_trackers.push(item);
				this.creative.creative_addon_settings.click_tracker = "";
			},

			deleteScript(item: any) {
				if (!item) return;
				const index = this.getIndexByData(
					this.creative.creative_addon_settings.scripts,
					item
				);
				if (index < 0) return;
				this.creative.creative_addon_settings.scripts.splice(index, 1);
			},

			deleteclickTracker(item: any) {
				if (!item) return;
				const index = this.getIndexByData(
					this.creative.creative_addon_settings.click_trackers,
					item
				);
				if (index < 0) return;
				this.creative.creative_addon_settings.click_trackers.splice(
					index,
					1
				);
			},

			/**
			 * Vast Event
			 */
			addRowVastEvent(item: any) {
				if (isEmpty(item)) return;

				const index = this.getIndexByData(
					this.creative.creative_addon_settings.vast_events,
					item
				);

				if (index > -1) return;

				this.creative.creative_addon_settings.vast_events.push(item);
			},

			deleteRowVastEvent(item: any) {
				if (!item) return;
				const index = this.getIndexByData(
					this.creative.creative_addon_settings.vast_events,
					item
				);
				if (index < 0) return;
				this.creative.creative_addon_settings.vast_events.splice(index, 1);
			},

			/**
			 * Progress Event
			 */

			addRowProgressEvent(item: any) {
				if (isEmpty(item)) return;

				const index = this.getIndexByData(
					this.creative.creative_addon_settings.progress_events,
					item
				);

				if (index > -1) return;

				this.creative.creative_addon_settings.progress_events.push(item);
			},

			deleteRowProgressEvent(item: any) {
				if (!item) return;
				const index = this.getIndexByData(
					this.creative.creative_addon_settings.progress_events,
					item
				);
				if (index < 0) return;
				this.creative.creative_addon_settings.progress_events.splice(
					index,
					1
				);
			},

			async validateTag() {
				try {
					const tag: TagCheck = {
						creative_rule_id:
							this.creative.creative_ad_content.creative_rule_id,
						creative_content_tag: this.creative.creative_ad_content.tag,
					};
					await this.setLoadingField(true);
					const response = await this.dispatchValidateTag(tag);
					const { content } = response;
					await this.assignTag(content);
					await this.setLoadingField(false);
				} catch (error) {
					console.error("create::validateTag", { error: error });
					await this.setLoadingField(false);
				}
			},

			async assignTag(tag: any) {
				this.tag_validated = !isEmpty(tag) && !isUndefined(tag);
				if (this.tag_validated) {
					this.creative.creative_ad_content.tag = tag;
				}
			},

			selectedCreativeAdvertiser(creative_advertiser: any) {
				this.creative.creative_advertiser = creative_advertiser;
			},

			/**
			 * Fetch
			 */

			async setLoading(loading: boolean = false) {
				return this.$store.dispatch("proccess/setLoading", loading);
			},

			async setLoadingField(loading: boolean = false) {
				return this.$store.dispatch("proccess/setLoadingField", loading);
			},

			async dispatchAdvertisers() {
				return this.$store.dispatch("advertiser/all");
			},

			async dispatchCreativeSizes() {
				return this.$store.dispatch("creative/creativeSizes");
			},
			async dispatchCreativeTemplates() {
				return this.$store.dispatch("creative/creativeTemplates");
			},
			async dispatchCreativeTypes() {
				return this.$store.dispatch("creative/creativeTypes");
			},
			async dispatchAdvertiserCategories() {
				return this.$store.dispatch("creative/advertiserCategories");
			},
			async dispatchCreativeRules() {
				return this.$store.dispatch("creative/creativeRules");
			},
			async dispatchMimeTypes() {
				return this.$store.dispatch("creative/mimeTypes");
			},
			async dispatchBudgetTypes() {
				return this.$store.dispatch("custom_list/getBudgetTypes");
			},
			async dispatchExpendableTypes() {
				return this.$store.dispatch("creative/expendableTypes");
			},
			async dispatchExpendableDirections() {
				return this.$store.dispatch("creative/expendableDirections");
			},
			async dispatchInBannerVideos() {
				return this.$store.dispatch("creative/inBannerVideos");
			},

			async dispatchVendors() {
				return this.$store.dispatch("creative/vendors");
			},
			async dispatchAddons() {
				return this.$store.dispatch("creative/addons");
			},
			async dispatchAssets() {
				return this.$store.dispatch("creative/assets");
			},

			async dispatchcreateAsset(formData: FormData) {
				return this.$store.dispatch("creative/creativeAssets", formData);
			},

			/**
			 * Dispatch Create CreativeImage
			 */
			async dispatchCreateImage(creative: ImageDataCreate) {
				return this.$store.dispatch("creative/CreateNewCreative", creative);
			},

			/**
			 * Dispatch Create CreativeJsTag
			 */
			async dispatchCreateJsTag(creative: JsTagDataCreate) {
				return this.$store.dispatch("creative/CreateNewCreative", creative);
			},

			/**
			 * Dispatch Create CreativeIframeTag
			 */
			async dispatchCreateIframeTag(creative: IframeTagDataCreate) {
				return this.$store.dispatch("creative/CreateNewCreative", creative);
			},

			/**
			 * Dispatch Create CreativeMraidTag
			 */
			async dispatchCreateMraidTag(creative: MraidTagDataCreate) {
				return this.$store.dispatch("creative/CreateNewCreative", creative);
			},

			/**
			 * Dispatch Create dispatchCreateHtml5
			 */
			async dispatchCreateHtml5(creative: Html5DataCreate) {
				return this.$store.dispatch("creative/CreateNewCreative", creative);
			},

			/**
			 * Dispatch Create dispatchCreateVastInline
			 */
			async dispatchCreateVastInline(creative: VastInlineDataCreate) {
				return this.$store.dispatch("creative/CreateNewCreative", creative);
			},

			/**
			 * Dispatch Validate Tag
			 */
			async dispatchValidateTag(tag: TagCheck) {
				return this.$store.dispatch("creative/validateTag", tag);
			},
		},
	});
</script>