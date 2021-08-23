<template>
	<v-layout class="d-block ma-0 pa-0">
		<Alertize></Alertize>
		<v-layout class="d-block ma-0 pa-0">
			<v-container class="my-0 py-0">
				<Overview
					:creative="getCreative"
					:message_pixel="message_pixel"
					:message_script="message_script"
					:message_click_tracker="message_click_tracker"
					:tag_validated="tag_validated"
					:resources="resources"
					@update-creative-type-id="updateCreativeTypeId"
					@update-creative-type="updateCreativeType"
					@fetch-creative-templates="fetchCreativeTemplates"
					@fetch-creative-sizes="fetchCreativeSizes"
					@fetch-advertiser-categories="fetchAdvertiserCategories"
					@fetch-creative-rules="fetchCreativeRules"
					@fetch-mime-types="fetchMimeTypes"
					@fetch-creative-advertisers="fetchCreativeAdvertisers"
					@selected-creative-advertiser="selectedCreativeAdvertiser"
					@fetch-expandable-types="fetchExpandableTypes"
					@fetch-expandable-directions="fetchExpandableDirections"
					@fetch-banner-videos="fetchInBannerVideos"
					@fetch-vendors="fetchVendors"
					@fetch-addons="fetchAddons"
					@fetch-assets="fetchAssets"
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
					@selected-size="selectedSize"
					@update-creative="updateCreative"
				></Overview>
			</v-container>
		</v-layout>
	</v-layout>
</template>

<script lang="ts">
import { isEmpty, isNull, isUndefined, last, toNumber } from "lodash";
import Vue from "vue";
import Alertize from "../../../../components/Alertize.vue";
import { isUrl } from "../../../../services/rule-services";
import Overview from "./../Create/overview.vue";
import { ImageDataCreate } from "../../../../interfaces/creativeBannerImage";
import { JsTagDataCreate } from "../../../../interfaces/creativeBannerJsTag";
import { IframeTagDataCreate } from "../../../../interfaces/creativeBannerIframeTag";
import { MraidTagDataCreate } from "../../../../interfaces/creativeBannerMraidTag";
import { Html5DataCreate } from "../../../../interfaces/creativeBannerHtml5";
import { VastInlineDataCreate } from "../../../../interfaces/creativeVideoVastInline";
import { CreativeFilters, TagCheck } from "../../../../interfaces/creative";

import { initCreative } from "../../../../utils/initData";
import { getAssetFilters } from "../../../../utils/resolveObjectArray";
export default Vue.extend({
	name: "EditCreative",
	props: {},
	components: {
		Alertize,
		Overview,
	},
	data: () => ({
		entity: null,
		message_pixel: "",
		message_script: "",
		message_click_tracker: "",
		tag_validated: false,
		resources: {
			advertisers: [],
			asset_types: [],
			primary_assets: [],
			secondary_assets: [],
			thumbnail_assets: [],
		},
	}),
	async created() {
		await this.handleGetEntity();
		this.entity = this.getParsedData();
	},
	mounted() {},
	async beforeDestroy() {
		await this.refreshData();
	},
	computed: {
		getId() {
			let pathArray: String[] = this.$route.path.split("/");
			const lastItem = last(pathArray);
			return !isNaN(toNumber(lastItem)) ? toNumber(lastItem) : NaN;
		},
		isEdit() {
			return !isNaN(Number(this.getId));
		},
		getResponseTemplates() {
			return this.$store.state.creative.responseTemplates;
		},

		getAsset() {
			return this.$store.state.creative.asset;
		},

		hasCreative() {
			return (
				!isUndefined(this.$store.state.creative.creative) &&
				!isNull(this.$store.state.creative.creative)
			);
		},

		hasID() {
			return (
				!isUndefined(this.getCreative.id) &&
				!isNull(this.getCreative.id) &&
				this.getCreative.id > 0
			);
		},

		getCreative() {
			if (this.hasCreative) {
				return this.$store.state.creative.creative;
			}
			return this.entity;
		},

		getErrors() {
			return this.$store.state.proccess.errors;
		},
	},
	methods: {
		async refreshData() {
			this.entity = initCreative();
			this.$store.state.creative.creative = null;
		},

		updateCreativeType(data: { creative_type_id: number }) {
			this.entity.creative_type_id = data.creative_type_id;
			this.entity.creative_ad_content.primary_asset_id = null;
			this.entity.creative_ad_content.secondary_asset_id = null;
			this.entity.creative_ad_content.thumbnail_id = null;
		},

		updateCreativeTypeId(creative_type_id: number) {
			this.entity.creative_type_id = creative_type_id;
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
			this.resources.advertisers = await this.dispatchAdvertisers();
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

		async fetchExpandableTypes() {
			await this.setLoadingField(true);
			await this.dispatchExpandableTypes();
			await this.setLoadingField(false);
		},

		async fetchExpandableDirections() {
			await this.setLoadingField(true);
			await this.dispatchExpandableDirections();
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

		async fetchAssets(key: string) {
			if (
				!this.entity.creative_advertiser.advertiser_id ||
				!this.entity.creative_template_id
			)
				return;

			const params = {
				key: key,
				creative_templates:
					this.$store.state.creative.creative_templates,
				creative_template_id: this.entity.creative_template_id,
				asset_types: this.resources.asset_types,
				advertiser_id:
					this.entity.creative_advertiser.advertiser_id,
			};

			await this.setLoadingField(true);

			const assets = await this.dispatchAssets(
				await getAssetFilters(params)
			);

			switch (params.key) {
				case "primary_asset_id":
					this.resources.primary_assets = assets;

					break;

				case "secondary_asset_id":
					this.resources.secondary_assets = assets;

					break;

				case "thumbnail_id":
					this.resources.thumbnail_assets = assets;

					break;
			}

			await this.setLoadingField(false);
		},

		async createAsset(formData: FormData) {
			try {
				await this.setLoadingField(true);
				await this.dispatchcreateAsset(formData);
				await this.dispatchAssets({});

				this.entity.creative_ad_content.primary_asset_id =
					this.getAsset.id;
				this.entity.budget_type_id = 2;

				await this.setLoadingField(false);
			} catch (error) {
				console.error("createAsset", { error: error });
				await this.setLoadingField(false);
			}
		},

		/**
		 * Create Creative Image
		 */
		async createCreativeImage(params: {
			continue: boolean;
			creative: ImageDataCreate;
		}) {
			try {
				await this.setLoadingField(true);
				await this.dispatchCreative(params);
				await this.setLoadingField(false);
			} catch (error) {
				console.error("createCreativeImage", { error: error });
				await this.setLoadingField(false);
			}
		},

		/**
		 * Create Creative Js Tag
		 */
		async createCreativeJsTag(params: {
			continue: boolean;
			creative: JsTagDataCreate;
		}) {
			try {
				await this.setLoadingField(true);
				await this.dispatchCreative(params);
				await this.setLoadingField(false);
			} catch (error) {
				console.error("createCreativeJsTag", { error: error });
				await this.setLoadingField(false);
			}
		},

		/**
		 * Create Creative IframeTag
		 */
		async createCreativeIframeTag(params: {
			continue: boolean;
			creative: IframeTagDataCreate;
		}) {
			try {
				await this.setLoadingField(true);
				await this.dispatchCreative(params);
				await this.setLoadingField(false);
			} catch (error) {
				console.error("createCreativeIframeTag", { error: error });
				await this.setLoadingField(false);
			}
		},

		/**
		 * Create Creative MraidTag
		 */
		async createCreativeMraidTag(params: {
			continue: boolean;
			creative: MraidTagDataCreate;
		}) {
			try {
				await this.setLoadingField(true);
				await this.dispatchCreative(params);
				await this.setLoadingField(false);
			} catch (error) {
				console.error("createCreativeMraidTag", { error: error });
				await this.setLoadingField(false);
			}
		},

		/**
		 * Create Creative Html5
		 */
		async createCreativeHtml5(params: {
			continue: boolean;
			creative: Html5DataCreate;
		}) {
			try {
				await this.setLoadingField(true);
				await this.dispatchCreative(params);
				await this.setLoadingField(false);
			} catch (error) {
				console.error("createCreativeHtml5", { error: error });
				await this.setLoadingField(false);
			}
		},

		/**
		 * Create Creative Vast Inline
		 */
		async createCreativeVastInline(params: {
			continue: boolean;
			creative: VastInlineDataCreate;
		}) {
			try {
				await this.setLoadingField(true);
				await this.dispatchCreative(params);
				await this.setLoadingField(false);
			} catch (error) {
				console.error("createCreativeVastInline", { error: error });
				await this.setLoadingField(false);
			}
		},

		/**
		 * Create Creative Image
		 */
		async updateCreative(params: {
			continue: boolean;
			creative: any;
		}) {
			await this.setLoadingField(true);
			try {
				await this.dispatchCreative(params);
			} catch (error) {
				console.error("updateCreative", { error: error });
			}
			await this.setLoadingField(false);
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
				this.entity.creative_addon_settings.pixels,
				item
			);

			if (index > -1) {
				this.message_pixel = this.$t("url-added");
				return;
			}

			this.entity.creative_addon_settings.pixels.push(item);
			this.entity.creative_addon_settings.pixel = "";
		},

		deletePixel(item: any) {
			if (!item) return;
			const index = this.getIndexByData(
				this.entity.creative_addon_settings.pixels,
				item
			);
			if (index < 0) return;
			this.entity.creative_addon_settings.pixels.splice(index, 1);
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
				this.entity.creative_addon_settings.scripts,
				item
			);

			if (index > -1) {
				this.message_script = this.$t("url-added");
				return;
			}

			this.entity.creative_addon_settings.scripts.push(item);
			this.entity.creative_addon_settings.script = "";
		},

		addNewClickTracker(item: any) {
			this.message_click_tracker = "";

			if (isEmpty(item)) return;

			if (!isUrl(item)) {
				this.message_click_tracker = this.$t("domain");
				return;
			}

			const index = this.getIndexByData(
				this.entity.creative_addon_settings.click_trackers,
				item
			);

			if (index > -1) {
				this.message_click_tracker = this.$t("url-added");
				return;
			}

			this.entity.creative_addon_settings.click_trackers.push(
				item
			);
			this.entity.creative_addon_settings.click_tracker = "";
		},

		deleteScript(item: any) {
			if (!item) return;
			const index = this.getIndexByData(
				this.entity.creative_addon_settings.scripts,
				item
			);
			if (index < 0) return;
			this.entity.creative_addon_settings.scripts.splice(index, 1);
		},

		deleteclickTracker(item: any) {
			if (!item) return;
			const index = this.getIndexByData(
				this.entity.creative_addon_settings.click_trackers,
				item
			);
			if (index < 0) return;
			this.entity.creative_addon_settings.click_trackers.splice(
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
				this.entity.creative_addon_settings.vast_events,
				item
			);

			if (index > -1) return;

			this.entity.creative_addon_settings.vast_events.push(item);
		},

		deleteRowVastEvent(item: any) {
			if (!item) return;
			const index = this.getIndexByData(
				this.entity.creative_addon_settings.vast_events,
				item
			);
			if (index < 0) return;
			this.entity.creative_addon_settings.vast_events.splice(
				index,
				1
			);
		},

		/**
		 * Progress Event
		 */

		addRowProgressEvent(item: any) {
			if (isEmpty(item)) return;

			const index = this.getIndexByData(
				this.entity.creative_addon_settings.progress_events,
				item
			);

			if (index > -1) return;

			this.entity.creative_addon_settings.progress_events.push(
				item
			);
		},

		deleteRowProgressEvent(item: any) {
			if (!item) return;
			const index = this.getIndexByData(
				this.entity.creative_addon_settings.progress_events,
				item
			);
			if (index < 0) return;
			this.entity.creative_addon_settings.progress_events.splice(
				index,
				1
			);
		},

		async validateTag() {
			try {
				const tag: TagCheck = {
					creative_rule_id:
						this.entity.creative_ad_content.creative_rule_id,
					creative_content_tag:
						this.entity.creative_ad_content.tag,
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

		selectedSize(selectedSize: { width: any; height: any; id: any }) {
			this.entity.creative_attributes.size_id = selectedSize.id;
			this.entity.creative_attributes.width = selectedSize.width;
			this.entity.creative_attributes.height = selectedSize.height;
		},

		async assignTag(tag: any) {
			this.tag_validated = !isEmpty(tag) && !isUndefined(tag);
			if (this.tag_validated) {
				this.entity.creative_ad_content.tag = tag;
			}
		},

		selectedCreativeAdvertiser(creative_advertiser: any) {
			this.entity.creative_advertiser = creative_advertiser;
			this.entity.creative_ad_content.primary_asset_id = null;
			this.entity.creative_ad_content.secondary_asset_id = null;
			this.entity.creative_ad_content.thumbnail_id = null;
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
		async dispatchExpandableTypes() {
			return this.$store.dispatch("creative/expandableTypes");
		},
		async dispatchExpandableDirections() {
			return this.$store.dispatch("creative/expandableDirections");
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
		async dispatchAssetTypes() {
			return this.$store.dispatch("creative/assetTypes");
		},
		async dispatchAssets(filters?: CreativeFilters | undefined) {
			return this.$store.dispatch("creative/assets", {
				filters: filters,
			});
		},

		async dispatchcreateAsset(formData: FormData) {
			return this.$store.dispatch("creative/creativeAssets", formData);
		},

		/**
		 * Dispatch Create
		 */
		async dispatchCreative(params: { continue: boolean; creative: any }) {
			return this.$store.dispatch("creative/CreateNewCreative", params);
		},

		/**
		 * Dispatch Update
		 */
		async dispatchUpdate(params: { continue: boolean; creative: any }) {
			return this.$store.dispatch("creative/UpdateCreative", params);
		},

		/**
		 * Dispatch Validate Tag
		 */
		async dispatchValidateTag(tag: TagCheck) {
			return this.$store.dispatch("creative/validateTag", tag);
		},

		async getData(id: number) {
			return this.$store.dispatch("creative/show", id, {
				root: true,
			});
		},

		async handleGetEntity() {
			try {
				this.setLoading(true);
				await this.getData(this.getId);
				this.setLoading(false);
			} catch (error) {
				console.error("handleGetEntity", { error: error });
				this.setLoading(false);
			}
		},

		getParsedData() {
			let entity = this.getCreative;
			return entity;
		},
	},
});
</script>