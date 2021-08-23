<template>
	<v-card
		elevation="0"
		justify="start"
		align="center"
		class="grey lighten-3 py-4 my-4"
	>
		<v-form
			ref="form"
			justify="start"
			align="center"
			v-model="valid"
			lazy-validation
		>
			<v-container>
				<v-row
					no-gutters
					dense
					align="start"
					self="start"
					justify="start"
					fluid
				>
					<!-- name -->
					<v-col
						class="pe-lg-16 pa-0"
						cols="12"
						sm="12"
						md="4"
						lg="4"
					>
						<CardTextField
							v-model="creative.name"
							:rules="name_rules"
							hint="Creative Name"
							reference="name"
							placeholder="Creative Name"
							label="Creative Name"
							:required="true"
							:error_messages="getError('name')"
						></CardTextField>
					</v-col>

					<!-- start_date -->
					<v-col
						class="pe-lg-16 pa-0"
						v-show="showFieldByTemplateId('start_date')"
						cols="12"
						sm="12"
						md="4"
						lg="4"
					>
						<v-card
							elevation="0"
							class="pa-2"
							outlined
							tile
							color="rgb(0, 0, 0, 0.0)"
						>
							<DatePicker
								label="Start Date"
								v-model="creative.start_date"
								:min_date="getToday"
								:rules="start_date_rules"
								:error_messages="getError('start_date')"
							></DatePicker>
						</v-card>
					</v-col>

					<!-- end_date-->
					<v-col
						class="pe-lg-16 pa-0"
						v-show="showFieldByTemplateId('end_date')"
						cols="12"
						sm="12"
						md="4"
						lg="4"
					>
						<v-card
							elevation="0"
							class="pa-2"
							outlined
							tile
							color="rgb(0, 0, 0, 0.0)"
						>
							<DatePicker
								label="End Date"
								v-model="creative.end_date"
								:min_date="getMinDate"
								:rules="end_date_rules"
								:is_end="true"
								:error_messages="getError('end_date')"
							></DatePicker>
						</v-card>
					</v-col>

					<!-- alternative_id -->
					<v-col
						class="pe-lg-16 pa-0"
						cols="12"
						sm="12"
						md="4"
						lg="4"
					>
						<CardTextField
							v-model="creative.alternative_id"
							hint="Alternative ID"
							reference="alternative_id"
							placeholder="Alternative ID"
							label="Alternative ID"
							:error_messages="getError('alternative_id')"
						></CardTextField>
					</v-col>

					<!-- secure -->
					<v-col
						class="pe-lg-16 pa-0"
						cols="12"
						sm="12"
						md="4"
						lg="4"
					>
						<CardSwitch
							v-model="creative.secure"
							reference="secure"
							label="Secure"
							color="success"
						></CardSwitch>
					</v-col>

					<!-- active -->
					<v-col
						class="pe-lg-16 pa-0"
						cols="12"
						sm="12"
						md="4"
						lg="4"
					>
						<CardSwitch
							v-model="creative.active"
							reference="active"
							label="Active"
							color="success"
						></CardSwitch>
					</v-col>

					<!-- creative_template_id -->
					<v-col
						class="pe-lg-16 pa-0"
						cols="12"
						sm="12"
						md="4"
						lg="4"
					>
						<CardAutocomplete
							v-model="creative.creative_template_id"
							:model="creative.creative_template_id"
							:rules="creative_template_id_rules"
							:items="getCreativeTemplates"
							item_text="value"
							item_value="id"
							hint="Select Creative Template"
							reference="creative_template_id"
							placeholder="Select Creative Template"
							label="Template"
							@input="updateTemplate"
							@focus="fetchCreativeTemplates"
							:required="true"
							:error_messages="getError('creative_template_id')"
						></CardAutocomplete>
					</v-col>

					<!-- size_id -> on select: get width & height ✔ -->
					<v-col
						class="pe-lg-16 pa-0"
						v-show="showFieldByTemplateId('size_id')"
						cols="12"
						sm="12"
						md="4"
						lg="4"
					>
						<CardAutocomplete
							v-model="creative.creative_attributes.size_id"
							:rules="size_id_rules"
							:items="getCreativeSizes"
							item_text="value"
							item_value="id"
							hint="Select Size"
							reference="size_id"
							placeholder="Select Size"
							label="Width x Height"
							@input="selectedWidthHeight"
							@click="fetchCreativeSizes"
							:error_messages="
								getError('creative_attributes.size_id')
							"
						></CardAutocomplete>
					</v-col>

					<!-- creative_type_id: [hidden] | obtained by selecting creative_template_id -->
					<v-col
						class="pe-lg-16 pa-0"
						v-if="true"
						cols="12"
						sm="12"
						md="4"
						lg="4"
					>
						<CardAutocomplete
							v-model="creative.creative_type_id"
							:rules="creative_type_id_rules"
							:items="getCreativeTypes"
							item_text="value"
							item_value="id"
							hint="Select Creative Type"
							reference="creative_type_id"
							placeholder="Select Creative Type"
							label="Creative Type"
							:disabled="true"
							:error_messages="getError('creative_type_id')"
						></CardAutocomplete>
					</v-col>

					<!-- DividerForm: Advertiser -->
					<v-col
						class="pe-lg-16 pa-0"
						cols="12"
						sm="12"
						md="12"
						lg="12"
					>
						<DividerForm name="Advertiser"></DividerForm>
					</v-col>

					<!-- creative_advertiser  -->

					<!-- advertiser_id -->
					<v-col
						class="pe-lg-16 pa-0"
						cols="12"
						sm="12"
						md="4"
						lg="4"
					>
						<CardAutocomplete
							v-model="creative.creative_advertiser.advertiser_id"
							:model="creative.creative_advertiser.advertiser_id"
							:items="resources.advertisers"
							item_text="name"
							item_value="id"
							hint="Select Advertiser"
							reference="advertiser_id"
							placeholder="Select Advertiser"
							label="Advertiser"
							@input="selectedAdvertiser"
							@focus="fetchCreativeAdvertisers"
							:required="true"
							:error_messages="
								getError('creative_advertiser.advertiser_id')
							"
						></CardAutocomplete>
					</v-col>

					<!-- domain -->
					<v-col
						class="pe-lg-16 pa-0"
						cols="12"
						sm="12"
						md="4"
						lg="4"
					>
						<CardTextField
							v-model="creative.creative_advertiser.domain"
							:rules="domain_rules"
							hint="Domain"
							reference="domain"
							placeholder="Domain"
							label="Domain"
							:required="true"
							:error_messages="
								getError('creative_advertiser.domain')
							"
						></CardTextField>
					</v-col>

					<!-- category_id -->
					<v-col
						class="pe-lg-16 pa-0"
						cols="12"
						sm="12"
						md="4"
						lg="4"
					>
						<CardAutocomplete
							v-model="creative.creative_advertiser.category_id"
							:model="creative.creative_advertiser.category_id"
							:rules="category_id_rules"
							:items="getAdvertiserCategories"
							item_text="value"
							item_value="id"
							hint="Select Category"
							reference="category_id"
							placeholder="Select Category"
							label="Category"
							:required="true"
							@click="fetchAdvertiserCategories"
							:error_messages="
								getError('creative_advertiser.category_id')
							"
						></CardAutocomplete>
					</v-col>

					<!-- app_bundle -->
					<v-col
						class="pe-lg-16 pa-0"
						cols="12"
						sm="12"
						md="4"
						lg="4"
					>
						<CardTextField
							v-model="creative.creative_advertiser.app_bundle"
							:rules="app_bundle_rules"
							hint="App Bundle"
							reference="app_bundle"
							placeholder="App Bundle"
							label="App Bundle"
							:required="true"
							:error_messages="
								getError('creative_advertiser.app_bundle')
							"
						></CardTextField>
					</v-col>

					<!-- DividerForm: Ad Content -->
					<v-col
						class="pe-lg-16 pa-0"
						v-if="creative.creative_template_id"
						cols="12"
						sm="12"
						md="12"
						lg="12"
					>
						<DividerForm name="Ad Content"></DividerForm>
					</v-col>

					<!-- budget_type_id -->
					<v-col
						class="pe-lg-16 pa-0"
						v-if="
							creative.creative_template_id &&
							showFieldByTemplateId('budget_type_id')
						"
						cols="12"
						sm="12"
						md="4"
						lg="12"
					>
						<v-card
							elevation="0"
							class="pa-2"
							outlined
							tile
							color="rgb(0, 0, 0, 0.0)"
						>
							<v-layout>
								<v-label class="v-label theme--light">
									Assets
									<span class="red--text"
										><strong>*</strong></span
									>
								</v-label>
							</v-layout>
							<v-layout>
								<v-radio-group
									v-model.number="creative.budget_type_id"
									v-numeric
									:rules="budget_type_id_rules"
									row
								>
									<v-radio
										v-for="budgetType in getAssetsData"
										:key="budgetType.key"
										:label="budgetType.value"
										:value="budgetType.key"
										color="secondary"
									></v-radio>
								</v-radio-group>
							</v-layout>
						</v-card>
					</v-col>

					<!-- creative_ad_content  -->

					<!-- primary_asset_id -->
					<v-col
						v-if="
							creative.budget_type_id === 2 &&
							showFieldByTemplateId('primary_asset_id')
						"
						class="pe-lg-16 pa-0"
						cols="12"
						sm="12"
						md="4"
						lg="4"
					>
						<CardAutocomplete
							v-model="
								creative.creative_ad_content.primary_asset_id
							"
							:rules="primary_asset_id_rules"
							:items="resources.primary_assets"
							item_text="value"
							item_value="id"
							:hint="`Select Primary Asset ${
								!creative.creative_advertiser.advertiser_id
									? '(advertiser required)'
									: ''
							}`"
							:persistent_hint="
								!creative.creative_advertiser.advertiser_id
							"
							reference="primary_asset_id"
							:placeholder="`Select Primary Asset ${
								!creative.creative_advertiser.advertiser_id
									? '(advertiser required)'
									: ''
							}`"
							:hide_no_data="
								!creative.creative_advertiser.advertiser_id
							"
							label="Primary Asset"
							@focus="fetchAssets('primary_asset_id')"
							:error_messages="
								getError('creative_ad_content.primary_asset_id')
							"
						></CardAutocomplete>
					</v-col>

					<!-- secondary_asset_id -->
					<v-col
						v-if="
							creative.budget_type_id === 2 &&
							showFieldByTemplateId('secondary_asset_id')
						"
						class="pe-lg-16 pa-0"
						cols="12"
						sm="12"
						md="4"
						lg="4"
					>
						<CardAutocomplete
							v-model="
								creative.creative_ad_content.secondary_asset_id
							"
							:rules="secondary_asset_id_rules"
							:items="resources.secondary_assets"
							item_text="value"
							item_value="id"
							hint="Select Secondary Asset"
							reference="secondary_asset_id"
							placeholder="Select Secondary Asset"
							label="Secondary Asset"
							@focus="fetchAssets('secondary_asset_id')"
							:error_messages="
								getError(
									'creative_ad_content.secondary_asset_id'
								)
							"
						></CardAutocomplete>
					</v-col>

					<!-- Upload New Assets ✔ -->
					<v-col
						class="pe-lg-16 pa-0"
						v-if="
							creative.budget_type_id === 1 &&
							showFieldByTemplateId('primary_asset_id')
						"
						cols="12"
						sm="12"
						md="4"
						lg="4"
					>
						<v-card
							elevation="0"
							class="pa-2"
							outlined
							tile
							color="rgb(0, 0, 0, 0.0)"
						>
							<v-file-input
								v-model="creative.file"
								:rules="asset_rules"
								ref="file"
								counter
								class="label-fixed"
								label="Upload New Assets"
								placeholder="Upload New Assets"
								:show-size="1000"
								prepend-icon=""
								small-chips
								dense
								accept="image/png, image/jpeg, image/bmp"
							>
								<template v-slot:append-outer>
									<v-btn
										icon
										medium
										justify="center"
										items="center"
										self="end"
										@click="clickUpload"
									>
										<img
											width="30"
											height="30"
											src="@/assets/icons/bulk_btn.png"
											alt="Filter"
										/>
									</v-btn>
								</template>

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
										class="
											overline
											grey--text
											text--darken-3
											mx-2
										"
									>
										+{{ files.length - 2 }} File(s)
									</span>
								</template>
							</v-file-input>
						</v-card>
					</v-col>

					<!-- title -->
					<v-col
						class="pe-lg-16 pa-0"
						v-show="showFieldByTemplateId('title')"
						cols="12"
						sm="12"
						md="4"
						lg="4"
					>
						<CardTextField
							v-model="creative.creative_ad_content.title"
							:rules="title_rules"
							hint="Title"
							reference="title"
							placeholder="Title"
							label="Title"
							:error_messages="
								getError('creative_ad_content.title')
							"
						></CardTextField>
					</v-col>

					<!-- click_url -->
					<v-col
						class="pe-lg-16 pa-0"
						v-if="creative.budget_type_id"
						v-show="showFieldByTemplateId('click_url')"
						cols="12"
						sm="12"
						md="4"
						lg="4"
					>
						<CardTextField
							v-model="creative.creative_ad_content.click_url"
							:rules="click_url_rules"
							hint="Click Url"
							reference="click_url"
							placeholder="Click Url"
							label="Click Url"
							:required="true"
							:error_messages="
								getError('creative_ad_content.click_url')
							"
						></CardTextField>
					</v-col>

					<!-- video_duration -->
					<v-col
						class="pe-lg-16 pa-0"
						v-show="showFieldByTemplateId('video_duration')"
						cols="12"
						sm="12"
						md="4"
						lg="4"
					>
						<CardTextField
							v-model="
								creative.creative_ad_content.video_duration
							"
							:rules="video_duration_rules"
							hint="Video Duration"
							reference="video_duration"
							placeholder="Video Duration"
							label="Video Duration"
							:error_messages="
								getError('creative_ad_content.video_duration')
							"
						></CardTextField>
					</v-col>

					<!-- companion_html -->
					<v-col
						class="pe-lg-16 pa-0"
						v-show="showFieldByTemplateId('companion_html')"
						cols="12"
						sm="12"
						md="4"
						lg="4"
					>
						<CardTextField
							v-model="
								creative.creative_ad_content.companion_html
							"
							:rules="companion_html_rules"
							hint="Companion Html"
							reference="companion_html"
							placeholder="Companion Html"
							label="Companion Html"
							:error_messages="
								getError('creative_ad_content.companion_html')
							"
						></CardTextField>
					</v-col>

					<!-- Loading image preview -->
					<v-col
						v-if="creative.budget_type_id === 1"
						class="pe-lg-16 pa-0"
						v-show="showFieldByTemplateId('primary_asset_id')"
						cols="12"
						sm="12"
						md="4"
						lg="4"
					>
						<v-img
							:src="getPreviewImage"
							:lazy-src="getPreviewImage"
							:aspect-ratio="16 / 9"
							contain
							class="grey lighten-2"
							rounded
						>
							<template v-slot:placeholder>
								<v-row
									class="ma-0 pa-0"
									align="start"
									justify="start"
									self="start"
									items="start"
								>
									<v-progress-circular
										indeterminate
										color="grey lighten-5"
									></v-progress-circular>
								</v-row>
							</template>
						</v-img>
					</v-col>

					<!-- companion_size_id -->
					<v-col
						class="pe-lg-16 pa-0"
						v-show="showFieldByTemplateId('companion_size_id')"
						cols="12"
						sm="12"
						md="4"
						lg="4"
					>
						<CardAutocomplete
							v-model="
								creative.creative_ad_content.companion_size_id
							"
							:rules="companion_size_id_rules"
							:items="getCreativeSizes"
							item_text="value"
							item_value="id"
							hint="Select Companion Size"
							reference="companion_size_id"
							placeholder="Select Companion Size"
							label="Companion Size"
							@click="fetchCreativeSizes"
							:required="false"
							:error_messages="
								getError(
									'creative_ad_content.companion_size_id'
								)
							"
						></CardAutocomplete>
					</v-col>

					<!-- creative_rule_id -->
					<v-col
						class="pe-lg-16 pa-0"
						v-show="showFieldByTemplateId('creative_rule_id')"
						cols="12"
						sm="12"
						md="4"
						lg="4"
					>
						<CardAutocomplete
							v-model="
								creative.creative_ad_content.creative_rule_id
							"
							:rules="creative_rule_id_rules"
							:items="getCreativeRules"
							item_text="value"
							item_value="id"
							hint="Select Creative Rule"
							reference="creative_rule_id"
							placeholder="Select Creative Rule"
							label="Creative Rule"
							@click="fetchCreativeRules"
							:required="true"
							:error_messages="
								getError('creative_ad_content.creative_rule_id')
							"
						></CardAutocomplete>
					</v-col>

					<!-- tag -->
					<v-col
						class="pe-lg-16 pa-0"
						v-show="showFieldByTemplateId('tag')"
						cols="12"
						sm="12"
						md="4"
						lg="4"
					>
						<CardTextarea
							v-model="creative.creative_ad_content.tag"
							:rules="tag_rules"
							hint="Tag"
							reference="tag"
							placeholder="Tag"
							label="Tag"
							append_outer="mdi-tag-arrow-down"
							btn_text="Validar Tag"
							@click-append-outer="validateTag"
							:error_messages="
								getError('creative_ad_content.tag')
							"
						></CardTextarea>
					</v-col>

					<!-- creative_attributes  -->

					<!-- mime_type_id -->
					<v-col
						class="pe-lg-16 pa-0"
						v-show="showFieldByTemplateId('mime_type_id')"
						cols="12"
						sm="12"
						md="4"
						lg="4"
					>
						<CardAutocomplete
							v-model="creative.creative_attributes.mime_type_id"
							:rules="mime_type_id_rules"
							:items="getMimeTypes"
							item_text="value"
							item_value="id"
							hint="Select Myme Type"
							reference="mime_type_id"
							placeholder="Select Myme Type"
							label="Myme Type"
							@click="fetchMimeTypes"
							:error_messages="
								getError('creative_attributes.mime_type_id')
							"
						></CardAutocomplete>
					</v-col>

					<!-- expandable_type_id -->
					<v-col
						class="pe-lg-16 pa-0"
						v-show="showFieldByTemplateId('expandable_type_id')"
						cols="12"
						sm="12"
						md="4"
						lg="4"
					>
						<CardAutocomplete
							v-model="
								creative.creative_attributes.expandable_type_id
							"
							:rules="expandable_type_id_rules"
							:items="getExpandableTypes"
							item_text="value"
							item_value="id"
							hint="Expandable Type"
							reference="expandable_type_id"
							placeholder="Expandable Type"
							label="Expandable Type"
							@click="fetchExpandableTypes"
							:error_messages="
								getError(
									'creative_attributes.expandable_type_id'
								)
							"
						></CardAutocomplete>
					</v-col>

					<!-- expandable_directions -->
					<v-col
						class="pe-lg-16 pa-0"
						v-show="showFieldByTemplateId('expandable_directions')"
						cols="12"
						sm="12"
						md="4"
						lg="4"
					>
						<CardAutocomplete
							v-model="
								creative.creative_attributes
									.expandable_directions
							"
							:rules="expandable_directions_rules"
							:items="getExpandableDirections"
							item_text="value"
							item_value="id"
							hint="Expandable Directions"
							reference="expandable_directions"
							placeholder="Expandable Directions"
							label="Expandable Directions"
							@click="fetchExpandableDirections"
							:chips="true"
							:deletable_chips="true"
							:multiple="true"
							:small_chips="true"
							:dense="false"
							:error_messages="
								getError(
									'creative_attributes.expandable_directions'
								)
							"
						></CardAutocomplete>
					</v-col>

					<!-- responsive -->
					<v-col
						class="pe-lg-16 pa-0"
						v-show="showFieldByTemplateId('responsive')"
						cols="12"
						sm="12"
						md="4"
						lg="4"
					>
						<CardSwitch
							v-model="creative.creative_attributes.responsive"
							reference="responsive"
							label="Responsive"
							color="success"
						></CardSwitch>
					</v-col>

					<!-- skippable -->
					<v-col
						class="pe-lg-16 pa-0"
						v-show="showFieldByTemplateId('skippable')"
						cols="12"
						sm="12"
						md="4"
						lg="4"
					>
						<CardSwitch
							v-model="creative.creative_attributes.skippable"
							reference="skippable"
							label="Skippable"
							color="success"
						></CardSwitch>
					</v-col>

					<!-- skip_offset -->
					<v-col
						class="pe-lg-16 pa-0"
						v-show="showFieldByTemplateId('skip_offset')"
						cols="12"
						sm="12"
						md="4"
						lg="4"
					>
						<CardTextField
							v-model="creative.creative_attributes.skip_offset"
							:rules="skip_offset_rules"
							hint="Skip Offset"
							reference="skip_offset"
							placeholder="Skip Offset"
							label="Skip Offset"
							type="time"
							:error_messages="
								getError('creative_attributes.skip_offset')
							"
						></CardTextField>
					</v-col>

					<!-- in_banner_video_id -->
					<v-col
						class="pe-lg-16 pa-0"
						v-show="showFieldByTemplateId('in_banner_video_id')"
						cols="12"
						sm="12"
						md="4"
						lg="4"
					>
						<CardAutocomplete
							v-model="
								creative.creative_attributes.in_banner_video_id
							"
							:rules="in_banner_video_id_rules"
							:items="getInBannerVideos"
							item_text="value"
							item_value="id"
							hint="In Banner video"
							reference="in_banner_video_id"
							placeholder="In Banner video"
							label="In Banner video"
							@click="fetchBannerVideos"
							:error_messages="
								getError(
									'creative_attributes.in_banner_video_id'
								)
							"
						></CardAutocomplete>
					</v-col>

					<!-- DividerForm: Exchange Options -->
					<v-col
						class="pe-lg-16 pa-0"
						v-if="creative.creative_template_id"
						cols="12"
						sm="12"
						md="12"
						lg="12"
					>
						<DividerForm name="Exchange Options"></DividerForm>
					</v-col>

					<!-- creative_exchange_options  -->

					<!-- vendors -->
					<v-col
						class="pe-lg-16 pa-0"
						v-show="showFieldByTemplateId('vendors')"
						cols="12"
						sm="12"
						md="4"
						lg="4"
					>
						<CardAutocomplete
							v-model="creative.creative_exchange_options.vendors"
							:rules="vendors_rules"
							:items="getVendors"
							item_text="value"
							item_value="id"
							hint="(Required for Google AdX)"
							reference="vendors"
							placeholder="Add Technical Vendor"
							label="Technical Vendor"
							@click="fetchVendors"
							:chips="true"
							:deletable_chips="true"
							:multiple="true"
							:small_chips="true"
							:persistent_hint="true"
							:error_messages="
								getError('creative_exchange_options.vendors')
							"
						></CardAutocomplete>
					</v-col>

					<!-- landing_page_url -->
					<v-col
						class="pe-lg-16 pa-0"
						v-show="showFieldByTemplateId('landing_page_url')"
						cols="12"
						sm="12"
						md="4"
						lg="4"
					>
						<CardTextField
							v-model="
								creative.creative_exchange_options
									.landing_page_url
							"
							:rules="landing_page_url_rules"
							hint="(Required for Google AdX)"
							reference="landing_page_url"
							placeholder="Add Landing Page URL"
							label="Landing Page URL"
							:persistent_hint="true"
							:error_messages="
								getError(
									'creative_exchange_options.landing_page_url'
								)
							"
						></CardTextField>
					</v-col>

					<!-- appnexus_submit -->
					<v-col
						class="pe-lg-16 pa-0"
						v-show="showFieldByTemplateId('appnexus_submit')"
						cols="12"
						sm="12"
						md="4"
						lg="4"
					>
						<v-card
							elevation="0"
							class="pa-4"
							outlined
							tile
							color="rgb(0, 0, 0, 0.0)"
						>
							<v-checkbox
								v-model="
									creative.creative_exchange_options
										.appnexus_submit
								"
								:label="`Submit creative to AppNexus for audit`"
							></v-checkbox>
						</v-card>
					</v-col>

					<!-- thumbnail_id -->
					<v-col
						class="pe-lg-16 pa-0"
						v-show="showFieldByTemplateId('thumbnail_id')"
						cols="12"
						sm="12"
						md="4"
						lg="4"
					>
						<CardAutocomplete
							v-model="
								creative.creative_exchange_options.thumbnail_id
							"
							:rules="thumbnail_id_rules"
							:items="resources.thumbnail_assets"
							item_text="value"
							item_value="id"
							hint="Thumbnail"
							reference="thumbnail_id"
							placeholder="Thumbnail"
							label="Thumbnail"
							@focus="fetchAssets('thumbnail_id')"
							:error_messages="
								getError(
									'creative_exchange_options.thumbnail_id'
								)
							"
						></CardAutocomplete>
					</v-col>

					<!-- DividerForm: Pixels and Scripts -->
					<v-col
						class="pe-lg-16 pa-0"
						v-if="creative.creative_template_id"
						cols="12"
						sm="12"
						md="12"
						lg="12"
					>
						<DividerForm name="Pixels and Scripts"></DividerForm>
					</v-col>

					<!-- creative_addon_settings  -->

					<!-- addons -->
					<v-col
						class="pe-lg-16 pa-0"
						v-show="showFieldByTemplateId('addons')"
						cols="12"
						sm="12"
						md="4"
						lg="4"
					>
						<CardAutocomplete
							v-model="creative.creative_addon_settings.addons"
							:rules="addons_rules"
							:items="getAddons"
							item_text="value"
							item_value="id"
							hint="Creative Add-on"
							reference="addons"
							placeholder="Creative Add-on"
							label="Creative Add-on"
							@click="fetchAddons"
							:chips="true"
							:deletable_chips="true"
							:multiple="true"
							:small_chips="true"
							:dense="false"
							:error_messages="
								getError('creative_addon_settings.addons')
							"
						></CardAutocomplete>
					</v-col>

					<!-- pixels -->
					<v-col
						class="pe-lg-16 pa-0"
						v-show="showFieldByTemplateId('pixels')"
						cols="12"
						sm="12"
						md="4"
						lg="4"
					>
						<CardTextField
							v-model="creative.creative_addon_settings.pixel"
							:rules="pixels_rules"
							:hint="
								creative.creative_addon_settings.pixel
									? 'Para agregar pulse ⊕'
									: ''
							"
							reference="pixel"
							placeholder="Pixels"
							label="Pixels"
							:icon_add="true"
							@click-append="addNewPixel"
							:error="true"
							:messages="message_pixel"
							:persistent_hint="
								creative.creative_addon_settings.pixel !== ''
							"
							:clearable="message_pixel !== ''"
						></CardTextField>

						<ArrayListItem
							:items="creative.creative_addon_settings.pixels"
							@delete-item="deletePixel"
						></ArrayListItem>
					</v-col>

					<!-- scripts -->
					<v-col
						class="pe-lg-16 pa-0"
						v-show="showFieldByTemplateId('scripts')"
						cols="12"
						sm="12"
						md="4"
						lg="4"
					>
						<CardTextField
							v-model="creative.creative_addon_settings.script"
							:rules="scripts_rules"
							:hint="
								creative.creative_addon_settings.script
									? 'Para agregar pulse ⊕'
									: ''
							"
							reference="script"
							placeholder="Scripts"
							label="Scripts"
							:icon_add="true"
							@click-append="addNewScript"
							:error="true"
							:messages="message_script"
							:persistent_hint="
								creative.creative_addon_settings.script !== ''
							"
							:clearable="message_script !== ''"
						></CardTextField>

						<ArrayListItem
							:items="creative.creative_addon_settings.scripts"
							@delete-item="deleteScript"
						></ArrayListItem>
					</v-col>

					<!-- click_trackers -->
					<v-col
						class="pe-lg-16 pa-0"
						v-show="showFieldByTemplateId('click_trackers')"
						cols="12"
						sm="12"
						md="4"
						lg="4"
					>
						<CardTextField
							v-model="
								creative.creative_addon_settings.click_tracker
							"
							:rules="click_trackers_rules"
							:hint="
								creative.creative_addon_settings.click_tracker
									? 'Para agregar pulse ⊕'
									: ''
							"
							reference="click_trackers"
							placeholder="Click Trackers"
							label="Click Trackers"
							:icon_add="true"
							@click-append="addNewClickTracker"
							:error="true"
							:messages="message_click_tracker"
							:persistent_hint="
								creative.creative_addon_settings
									.click_tracker !== ''
							"
							:clearable="message_click_tracker !== ''"
						></CardTextField>

						<ArrayListItem
							:items="
								creative.creative_addon_settings.click_trackers
							"
							@delete-item="deleteclickTracker"
						></ArrayListItem>
					</v-col>

					<!-- DividerForm: Vast Events -->
					<v-col
						class="pe-lg-16 pa-0"
						v-show="showFieldByTemplateId('vast_events')"
						cols="12"
						sm="12"
						md="12"
						lg="12"
					>
						<DividerForm name="Vast Events"></DividerForm>
					</v-col>

					<!-- vast_events -->
					<v-col
						class="pe-lg-16 pa-0"
						v-show="showFieldByTemplateId('vast_events')"
						cols="12"
						sm="12"
						md="12"
						lg="12"
					>
						<v-layout class="my-4">
							<v-btn
								color="secondary"
								outlined
								rounded
								@click="addRowVastEvent()"
							>
								<v-icon left color="secondary">
									mdi-plus
								</v-icon>
								Add Vast Event
							</v-btn>
						</v-layout>
						<VastEvent
							:items="
								creative.creative_addon_settings.vast_events
							"
							@delete-item="deleteVastEvent"
						></VastEvent>
					</v-col>

					<!-- DividerForm: Vast Events -->
					<v-col
						class="pe-lg-16 pa-0"
						v-show="showFieldByTemplateId('progress_events')"
						cols="12"
						sm="12"
						md="12"
						lg="12"
					>
						<DividerForm name="Progress Events"></DividerForm>
					</v-col>

					<!-- progress_events -->
					<v-col
						class="pe-lg-16 pa-0"
						v-show="showFieldByTemplateId('progress_events')"
						cols="12"
						sm="12"
						md="12"
						lg="12"
					>
						<v-layout class="my-4">
							<v-btn
								color="secondary"
								outlined
								rounded
								@click="addRowProgressEvent()"
							>
								<v-icon left color="secondary">
									mdi-plus
								</v-icon>
								Add Progress Event
							</v-btn>
						</v-layout>
						<ProgressEvent
							:items="
								creative.creative_addon_settings.progress_events
							"
							@delete-item="deleteProgressEvent"
						></ProgressEvent>
					</v-col>

					<!-- <v-col class="pe-lg-16 pa-0" v-if="creative.creative_template_id" cols="12" sm="12" md="12" lg="12">
						<DividerForm name="Associated Line"></DividerForm>
					</v-col> -->
				</v-row>

				<AssociatedLineForm
					v-if="hasID"
					:creative="getCreative"
				></AssociatedLineForm>

				<v-layout column class="pb-5 pl-5 pr-5">
					<AssociationTable
						v-if="hasID"
						:creative="getCreative"
						@delete-all-selected="setDeleteAll"
					></AssociationTable>
				</v-layout>

				<v-divider class="my-4"></v-divider>

				<!-- Actions -->
				<v-row no-gutters dense align="center" justify="start">
					<v-col class="pe-lg-16 pa-0" cols="12" sm="4" md="4" lg="6">
						<v-card
							elevation="0"
							class="pa-2"
							outlined
							tile
							color="rgb(0, 0, 0, 0.0)"
						>
							<v-card-text
								align="start"
								class="secondary--text info-message ma-0 px-0"
							>
								* Mandatory fields
							</v-card-text>
						</v-card>
					</v-col>

					<v-col class="pe-lg-16 pa-0" cols="12" sm="8" md="8" lg="6">
						<v-card
							elevation="0"
							class="pa-2"
							outlined
							tile
							color="rgb(0, 0, 0, 0.0)"
						>
							<v-row align="center" justify="end">
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
									@click="handleSubmitContinue"
								>
									{{ $t("save-continue") }}
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
import {
	isRequired,
	isNumber,
	isDomain,
	isMinLength,
	isMaxLength,
	isAfterToday,
	isAfterCompare,
	isValidUrl,
	isFileMaxSize,
	isUploaded,
	isMustValidated,
} from "../../../../services/rule-services";
import DatePicker from "../../../../components/Content/DatePicker.vue";
import DividerForm from "../../../../components/Content/DividerForm.vue";
import CardTextField from "../../../../components/Content/CardTextField.vue";
import CardTextarea from "../../../../components/Content/CardTextarea.vue";
import CardAutocomplete from "../../../../components/Content/CardAutocomplete.vue";
import CardSwitch from "../../../../components/Content/CardSwitch.vue";
import ArrayListItem from "../../../../components/Content/ArrayListItem.vue";
import VastEvent from "../../../../components/Content/VastEvent.vue";
import ProgressEvent from "../../../../components/Content/ProgressEvent.vue";
import { find, isEmpty, isNull, isObject, isUndefined } from "lodash";
import {
	hasFieldByTemplateId,
	parseDataCreativeHtml5,
	parseDataCreativeIframeTag,
	parseDataCreativeImage,
	parseDataCreativeJsTag,
	parseDataCreativeMraidTag,
	parseDataCreativeVastInline,
} from "../../../../utils/fields";
import { getError } from "../../../../utils/resolveObjectArray";
import AssociatedLineForm from "./associatedLineForm.vue";
import AssociationTable from "./../Associations/AssociationTable.vue";

export default Vue.extend({
	name: "CreativeOverview",
	props: {
		creative: {
			type: Object,
			default: function () {
				return {};
			},
		},
		resources: {
			type: Object,
			required: true,
		},
		message_pixel: {
			type: String,
			default: "",
		},
		message_script: {
			type: String,
			default: "",
		},
		message_click_tracker: {
			type: String,
			default: "",
		},
		tag_validated: {
			type: Boolean,
			default: false,
		},
	},
	components: {
		DatePicker,
		DividerForm,
		CardTextField,
		CardTextarea,
		CardAutocomplete,
		CardSwitch,
		ArrayListItem,
		VastEvent,
		ProgressEvent,
		AssociatedLineForm,
		AssociationTable,
	},
	data: () => ({
		valid: true,
		name_rules: [], // name
		start_date_rules: [], // start_date
		end_date_rules: [], // end_date
		creative_type_id_rules: [], // creative_type_id
		creative_template_id_rules: [], // creative_template_id
		primary_asset_id_rules: [], // primary_asset_id
		secondary_asset_id_rules: [], // secondary_asset_id_rules
		size_id_rules: [], // size_id => width & height
		advertiser_id_rules: [], // advertiser_id
		domain_rules: [], // domain
		category_id_rules: [], // category_id
		app_bundle_rules: [], // app_bundle
		budget_type_id_rules: [], // budget_type_id
		tag_rules: [], // tag
		creative_rule_id_rules: [], // creative_rule_id
		mime_type_id_rules: [], // mime_type_id
		expandable_type_id_rules: [], // expandable_type_id
		expandable_directions_rules: [], // expandable_direction_id
		click_url_rules: [], // click_url
		vendors_rules: [], // vendors
		landing_page_url_rules: [], // landing_page_url
		addons_rules: [], // addons
		pixels_rules: [], // pixel => pixels
		scripts_rules: [], // script => scripts
		click_trackers_rules: [], // script => scripts
		asset_rules: [], // asset
		in_banner_video_id_rules: [], // in_banner_video_id
		thumbnail_id_rules: [], // thumbnail_id
		companion_size_id_rules: [],
		video_duration_rules: [],
		skip_offset_rules: [],
		title_rules: [],
		companion_html_rules: [],
		delete_all_performe: false,
	}),
	created() {},
	mounted() {
		setTimeout(async () => {
			await this.loadResources();
		}, 1000);
	},
	beforeDestroy() {
		this.$store.state.creative.creative = null;
	},
	computed: {
		/**
		 * Getters
		 */
		getToday() {
			return this.moment().format("YYYY-MM-DD HH:mm:ss");
		},
		getMinDate() {
			return this.moment(this.creative.start_date).format(
				"YYYY-MM-DD HH:mm:ss"
			);
		},
		getRules() {
			return {
				isRequired,
				isNumber,
				isDomain,
				isMinLength,
				isMaxLength,
				isAfterToday,
				isAfterCompare,
				isValidUrl,
				isFileMaxSize,
				isUploaded,
			};
		},
		getID() {
			return this.creative.id;
		},
		hasID() {
			return (
				!isUndefined(this.getID) &&
				!isNull(this.getID) &&
				this.getID > 0
			);
		},

		getErrors() {
			return this.$store.state.proccess.errors;
		},

		getCreative() {
			return this.$store.state.creative.creative;
		},
		getCreativeSizes() {
			return this.$store.state.creative.creative_sizes;
		},
		getCreativeTemplates() {
			return this.$store.state.creative.creative_templates;
		},
		getResponseTemplates() {
			return this.$store.state.creative.responseTemplates;
		},
		getBudgetTypes() {
			return this.$store.state.custom_list.budget_types;
		},
		getCreativeTypes() {
			return this.$store.state.creative.creative_types;
		},
		getAdvertiserCategories() {
			return this.$store.state.creative.advertiser_categories;
		},
		getCreativeRules() {
			return this.$store.state.creative.creative_rules;
		},
		getMimeTypes() {
			return this.$store.state.creative.mime_types;
		},
		getExpandableTypes() {
			return this.$store.state.creative.expandable_types;
		},
		getExpandableDirections() {
			return this.$store.state.creative.expandable_directions;
		},
		getVendors() {
			return this.$store.state.creative.vendors;
		},
		getAddons() {
			return this.$store.state.creative.addons;
		},
		getAsset() {
			return this.$store.state.creative.asset;
		},
		getInBannerVideos() {
			return this.$store.state.creative.in_banner_videos;
		},
		getPreviewImage() {
			if (!this.creative.file)
				return "https://i.stack.imgur.com/y9DpT.jpg";
			return URL.createObjectURL(this.creative.file);
		},
		getAssetsData() {
			return [
				{
					key: 1,
					value: "New",
				},
				{
					key: 2,
					value: "Existing",
				},
			];
		},

		isEdit() {
			return !isNaN(Number(this.getCreative?.id));
		},
	},
	methods: {
		getError(index: any) {
			return getError(this.getErrors, index);
		},

		async loadResources() {
			if (this.hasID) {
				this.$emit("fetch-creative-sizes");

				if (this.creative.creative_template_id) {
					this.$emit("fetch-creative-templates");
				}

				if (this.creative.creative_advertiser.category_id) {
					this.$emit("fetch-advertiser-categories");
				}

				if (this.creative.creative_ad_content.creative_rule_id) {
					this.$emit("fetch-creative-rules");
				}

				if (this.creative.creative_advertiser.advertiser_id) {
					this.$emit("fetch-creative-advertisers");
				}

				if (this.creative.creative_attributes.mime_type_id) {
					this.$emit("fetch-mime-types");
				}

				if (this.creative.creative_attributes.expandable_type_id) {
					this.$emit("fetch-expandable-types");
				}

				if (this.creative.creative_attributes.expandable_directions) {
					this.$emit("fetch-expandable-directions");
				}

				if (this.creative.creative_exchange_options.vendors) {
					this.$emit("fetch-vendors");
				}

				if (this.creative.creative_addon_settings.addons) {
					this.$emit("fetch-addons");
				}

				if (
					this.creative.creative_ad_content.primary_asset_id ||
					this.creative.creative_ad_content.secondary_asset_id
				) {
					this.$emit("fetch-assets", {
						advertiser_id:
							this.creative.creative_advertiser.advertiser_id,
					});
				}

				if (this.creative.creative_attributes.in_banner_video_id) {
					this.$emit("fetch-banner-videos");
				}
			}
		},

		showFieldByTemplateId(input: string) {
			return hasFieldByTemplateId(
				this.creative.creative_template_id,
				input
			);
		},

		async validate() {
			return await this.$refs.form.validate();
		},

		async fetchCreativeTemplates(e: any) {
			if (!isEmpty(this.getResponseTemplates)) return;
			this.$emit("fetch-creative-templates");
		},

		async fetchCreativeSizes(e: any) {
			if (!isEmpty(this.getCreativeSizes)) return;
			this.$emit("fetch-creative-sizes");
		},

		async fetchAdvertiserCategories(e: any) {
			if (!isEmpty(this.getAdvertiserCategories)) return;
			this.$emit("fetch-advertiser-categories");
		},

		async fetchCreativeRules(e: any) {
			if (!isEmpty(this.getCreativeRules)) return;
			this.$emit("fetch-creative-rules");
		},

		async fetchCreativeAdvertisers(e: any) {
			if (!isEmpty(this.resources.advertisers)) return;
			this.$emit("fetch-creative-advertisers");
		},

		async fetchMimeTypes(e: any) {
			if (!isEmpty(this.getMimeTypes)) return;
			this.$emit("fetch-mime-types");
		},

		async fetchExpandableTypes(e: any) {
			if (!isEmpty(this.getExpandableTypes)) return;
			this.$emit("fetch-expandable-types");
		},

		async fetchExpandableDirections(e: any) {
			if (!isEmpty(this.getExpandableDirections)) return;
			this.$emit("fetch-expandable-directions");
		},

		async fetchVendors(e: any) {
			if (!isEmpty(this.getVendors)) return;
			this.$emit("fetch-vendors");
		},

		async fetchAddons(e: any) {
			if (!isEmpty(this.getAddons)) return;
			this.$emit("fetch-addons");
		},

		async fetchAssets(key: string) {
			this.$emit("fetch-assets", key);
		},

		async fetchBannerVideos(e: any) {
			if (!isEmpty(this.getInBannerVideos)) return;
			this.$emit("fetch-banner-videos");
		},

		async updateTemplate(params: any) {
			const response = await this.getCreativeTypeByTemplateId();
			if (!response) return;
			this.$emit("update-creative-type", response);
		},

		async addDateValidations() {
			// dates
			if (this.creative.start_date instanceof Date) {
				this.start_date_rules = [
					this.getRules.isRequired,
					this.getRules.isAfterToday,
				];
				this.end_date_rules = [
					this.getRules.isRequired,
					this.getRules.isAfterCompare(
						this.creative.end_date,
						this.creative.start_date
					),
				];
			}
		},

		async addCommonsValidations() {
			this.creative_template_id_rules = [this.getRules.isRequired];
			this.name_rules = [
				this.getRules.isRequired,
				this.getRules.isMinLength,
				this.getRules.isMaxLength,
			];
			this.advertiser_id_rules = [this.getRules.isRequired];
			this.domain_rules = [
				this.getRules.isRequired,
				this.getRules.isDomain,
			];
			this.category_id_rules = [this.getRules.isRequired];
			this.budget_type_id_rules = [this.getRules.isRequired];
			this.app_bundle_rules = [this.getRules.isRequired];
		},

		async addImageValidations() {
			this.asset_rules = [];
			// creative_ad_content
			if (this.creative.budget_type_id === 1) {
				this.asset_rules = [
					this.getRules.isRequired,
					this.getRules.isFileMaxSize,
					this.getRules.isUploaded,
				];
			}
			if (this.creative.budget_type_id === 2) {
				this.primary_asset_id_rules = [];
			}
			this.click_url_rules = [
				this.getRules.isRequired,
				this.getRules.isValidUrl,
			];

			this.thumbnail_id_rules = [];

			this.mime_type_id_rules = [];

			// creative_exchange_options
			this.vendors_rules = [];
			this.landing_page_url_rules = [this.getRules.isValidUrl];

			// creative_addon_settings
			this.addons_rules = [];
			this.pixels_rules = [];
			this.scripts_rules = [];
		},

		async addTagValidations() {
			this.tag_rules = [
				this.getRules.isRequired,
				isMustValidated(this.tag_validated),
			];
		},

		async addJsTagValidations() {
			await this.addDateValidations();

			// creative_ad_content

			await this.addTagValidations();

			this.creative_rule_id_rules = [
				this.getRules.isRequired,
				this.getRules.isNumber,
			];

			// creative_attributes
			this.size_id_rules = []; // validar width & height
			this.mime_type_id_rules = [this.getRules.isNumber]; // (jpeg,gif,png,javascript)
			this.expandable_type_id_rules = [this.getRules.isNumber];
			this.expandable_directions_rules = []; // validar multiple number
			this.in_banner_video_id = [this.getRules.isNumber];

			// creative_exchange_options
			this.vendors_rules = [];
			this.landing_page_url_rules = [this.getRules.isValidUrl];
			this.thumbnail_id_rules = [this.getRules.isNumber];

			// creative_addon_settings
			this.addons_rules = [];
			this.pixels_rules = [];
			this.scripts_rules = [];
		},

		async addIframeTagValidations() {
			await this.addDateValidations();

			// creative_ad_content

			await this.addTagValidations();

			this.creative_rule_id_rules = [
				this.getRules.isRequired,
				this.getRules.isNumber,
			];

			// creative_attributes
			this.size_id_rules = []; // validar width & height
			this.mime_type_id_rules = [this.getRules.isNumber]; // (jpeg,gif,png,javascript)
			this.expandable_type_id_rules = [this.getRules.isNumber];
			this.expandable_directions_rules = []; // validar multiple number
			this.in_banner_video_id = [this.getRules.isNumber];

			// creative_exchange_options
			this.vendors_rules = [];
			this.landing_page_url_rules = [this.getRules.isValidUrl];
			this.thumbnail_id_rules = [this.getRules.isNumber];

			// creative_addon_settings
			this.addons_rules = [];
			this.pixels_rules = [];
			this.scripts_rules = [];
		},

		async addMraidTagValidations() {
			await this.addDateValidations();

			// creative_ad_content

			await this.addTagValidations();

			this.creative_rule_id_rules = [
				this.getRules.isRequired,
				this.getRules.isNumber,
			];

			// creative_attributes
			this.size_id_rules = []; // validar width & height
			this.mime_type_id_rules = [this.getRules.isNumber]; // (jpeg,gif,png,javascript)
			this.expandable_type_id_rules = [this.getRules.isNumber];
			this.expandable_directions_rules = []; // validar multiple number
			this.in_banner_video_id = [this.getRules.isNumber];

			// creative_exchange_options
			this.vendors_rules = [];
			this.landing_page_url_rules = [this.getRules.isValidUrl];
			this.thumbnail_id_rules = [this.getRules.isNumber];

			// creative_addon_settings
			this.addons_rules = [];
			this.pixels_rules = [];
			this.scripts_rules = [];
		},

		async addVastInlineValidations() {
			await this.addDateValidations();

			// creative_ad_content
			this.tag_rules = []; // check ins

			this.companion_html_rules = !this.creative.creative_ad_content
				.secondary_asset_id
				? [this.getRules.isRequired]
				: [];

			this.companion_size_id_rules = this.creative.creative_ad_content
				.companion_html
				? [this.getRules.isRequired]
				: [];

			// creative_attributes
			this.size_id_rules = []; // validar width & height
			this.mime_type_id_rules = [this.getRules.isNumber]; // (jpeg,gif,png,javascript)
			this.expandable_type_id_rules = [this.getRules.isNumber];
			this.expandable_directions_rules = []; // validar multiple number
			this.in_banner_video_id = [this.getRules.isNumber];

			// creative_exchange_options
			this.vendors_rules = [];
			this.landing_page_url_rules = [this.getRules.isValidUrl];
			this.thumbnail_id_rules = [this.getRules.isNumber];

			// creative_addon_settings
			this.addons_rules = [];
			this.pixels_rules = [];
			this.scripts_rules = [];
		},

		async addHtml5Validations() {
			await this.addDateValidations();

			// creative_ad_content

			await this.addTagValidations();

			this.creative_rule_id_rules = [
				this.getRules.isRequired,
				this.getRules.isNumber,
			];

			// creative_attributes
			this.size_id_rules = []; // validar width & height
			this.mime_type_id_rules = [
				this.getRules.isRequired,
				this.getRules.isNumber,
			]; // (jpeg,gif,png,javascript)
			this.expandable_type_id_rules = [this.getRules.isNumber];
			this.expandable_directions_rules = []; // validar multiple number
			this.in_banner_video_id = [this.getRules.isNumber];

			// creative_exchange_options
			this.vendors_rules = [];
			this.landing_page_url_rules = [this.getRules.isValidUrl];
			this.thumbnail_id_rules = [this.getRules.isNumber];

			// creative_addon_settings
			this.addons_rules = [];
			this.pixels_rules = [];
			this.scripts_rules = [];
		},

		async getCreativeTypeByTemplateId() {
			return await this.$store.dispatch(
				"creative/getCreativeTypeByTemplateId",
				{
					creativeTypes: this.getResponseTemplates,
					creative_template_id: this.creative.creative_template_id,
				}
			);
		},

		/**
		 * Actions
		 * handleCancel
		 */
		handleCancel() {
			this.$router.push({ name: "CreativesIndex" });
		},

		/**
		 * Store
		 * Submit Creative
		 */
		async submitCreative(_continue: boolean = false) {
			const templateSelected = await this.getCreativeTypeByTemplateId();

			if (!templateSelected) return;

			switch (templateSelected.name) {
				case "Image template": //1
					await this.addImageValidations();

					const creative_image = parseDataCreativeImage(
						this.creative
					);

					if (!(await this.validate())) return;
					if ( this.isEdit ) {
						this.$emit("update-creative", {
							continue: _continue,
							creative: creative_image,
						});
						break;
					}
					this.$emit("create-creative-image", {
						continue: _continue,
						creative: creative_image,
					});

					break;

				case "VAST InLine": //3
					await this.addVastInlineValidations();

					const creative_vast_inline = parseDataCreativeVastInline(
						this.creative
					);

					if (!(await this.validate())) return;
					if (this.isEdit) {
						this.$emit("update-creative", {
							continue: _continue,
							creative: creative_vast_inline,
						});
						break;
					}
					this.$emit("create-creative-vast-inline", {
						continue: _continue,
						creative: creative_vast_inline,
					});
					break;

				case "JS Tag": // 4
					await this.addJsTagValidations();

					const creative_js_tag = parseDataCreativeJsTag(
						this.creative
					);

					if (!(await this.validate())) return;
					if (this.isEdit) {
						this.$emit("update-creative", {
							continue: _continue,
							creative: creative_js_tag,
						});
						break;
					}
					this.$emit("create-creative-jstag", {
						continue: _continue,
						creative: creative_js_tag,
					});

					break;

				case "iFrame Tag": // 5
					await this.addIframeTagValidations();

					const creative_iframe_tag = parseDataCreativeIframeTag(
						this.creative
					);

					if (!(await this.validate())) return;
					if (this.isEdit) {
						this.$emit("update-creative", {
							continue: _continue,
							creative: creative_iframe_tag,
						});
						break;
					}
					this.$emit("create-creative-iframetag", {
						continue: _continue,
						creative: creative_iframe_tag,
					});
					break;

				case "VAST and VPAID Wrapper": // 6
					break;

				case "MRAID Tag": // 13
					await this.addMraidTagValidations();

					const creative_mraid_tag = parseDataCreativeMraidTag(
						this.creative
					);

					if (!(await this.validate())) return;
					if (this.isEdit) {
						this.$emit("update-creative", {
							continue: _continue,
							creative: creative_mraid_tag,
						});
						break;
					}
					this.$emit("create-creative-mraidtag", {
						continue: _continue,
						creative: creative_mraid_tag,
					});
					break;

				case "Native Image App Install": // 14
					break;

				case "Native Video App Install": // 15
					break;

				case "Native Image Content": // 16
					break;

				case "Native Video Content": // 17
					break;

				case "Native Video App Install (VAST/VPAID Wrapper)": // 18
					break;

				case "Native Video Content (VAST/VPAID Wrapper)": // 19
					break;

				case "VAST Wrapper with MOAT Viewability": // 20
					break;

				case "HTML5 Creative": // 21
					await this.addHtml5Validations();

					const creative_html5 = parseDataCreativeHtml5(
						this.creative
					);

					if (!(await this.validate())) return;
					if (this.isEdit) {
						this.$emit("update-creative", {
							continue: _continue,
							creative: creative_html5,
						});
						break;
					}
					this.$emit("create-creative-html5", {
						continue: _continue,
						creative: creative_html5,
					});
					break;

				case "App Promo Icon": // 22
					break;

				default:
					break;
			}

			this.pushErrors();
		},

		pushErrors() {
			setTimeout(() => {
				this.primary_asset_id_rules = [
					!isUndefined(
						this.getError("creative_ad_content.primary_asset_id")
					)
						? this.getError(
								"creative_ad_content.primary_asset_id"
						  )[0]
						: "",
				];

				this.thumbnail_id_rules = [
					!isUndefined(
						this.getError("creative_exchange_options.thumbnail_id")
					)
						? this.getError(
								"creative_exchange_options.thumbnail_id"
						  )[0]
						: "",
				];

				this.mime_type_id_rules = [
					this.getRules.isRequired,
					this.getRules.isNumber,
					!isUndefined(
						this.getError("creative_attributes.mime_type_id")
					)
						? this.getError("creative_attributes.mime_type_id")[0]
						: "",
				];
			}, 2000);
		},

		/**
		 * Actions
		 * handleSubmit
		 */
		async handleSubmit() {
			try {
				await this.addCommonsValidations();

				await this.validate();

				await this.submitCreative(false);
			} catch (error) {
				console.error("handleSubmit", { error: error });
			}
		},

		/**
		 * Actions
		 * handleSubmitContinue
		 */
		async handleSubmitContinue() {
			try {
				await this.addCommonsValidations();

				await this.validate();

				await this.submitCreative(true);
			} catch (error) {
				console.error("handleSubmitContinue", { error: error });
			}
		},

		hasProperty(data: any, attribute: any) {
			if (!isObject(data)) return false;
			return data.hasOwnProperty(attribute);
		},

		selectedWidthHeight(size_id: number) {
			const selectedSize = find(this.getCreativeSizes, function (s) {
				return s.id === size_id;
			});
			if (selectedSize) {
				this.$emit("selected-size", selectedSize);
			}
		},

		selectedAdvertiser(params: any) {
			const selectedAdvertiser = find(
				this.resources.advertisers,
				function (a) {
					return a.id === params;
				}
			);

			if (!selectedAdvertiser) return;

			this.$emit("selected-creative-advertiser", {
				advertiser_id: selectedAdvertiser.id,
				domain: selectedAdvertiser.domain,
				app_bundle: selectedAdvertiser.app_bundle,
				category_id: selectedAdvertiser.category_id,
			});
		},

		addNewPixel(item: any) {
			this.$emit("add-new-pixel", item);
		},

		addNewScript(item: any) {
			this.$emit("add-new-script", item);
		},

		addNewClickTracker(item: any) {
			this.$emit("add-new-click-tracker", item);
		},

		deletePixel(item: any) {
			this.$emit("delete-pixel", item);
		},

		deleteScript(item: any) {
			this.$emit("delete-script", item);
		},

		deleteclickTracker(item: any) {
			this.$emit("delete-click-tracker", item);
		},

		addRowVastEvent() {
			this.$emit("add-row-vast-event", {
				event: "",
				url: "",
			});
		},

		addRowProgressEvent() {
			this.$emit("add-row-progress-event", {
				event: "",
				url: "",
			});
		},

		deleteVastEvent(item: any) {
			this.$emit("delete-row-vast-event", item);
		},

		deleteProgressEvent(item: any) {
			this.$emit("delete-row-progress-event", item);
		},

		async clickUpload() {
			let formData = new FormData();
			formData.append(
				"advertiser_id",
				this.creative.creative_advertiser.advertiser_id
			);
			formData.append("file", this.creative.file);
			this.$emit("create-asset", formData);
		},

		async validateTag() {
			return this.$emit("validate-tag");
		},

		setDeleteAll(value: any) {
			if (!isNull(value)) {
				this.delete_all_performe = true;
			} else {
				this.delete_all_performe = false;
			}
		},
	},
});
</script>
