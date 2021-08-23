<template>
	<v-layout class="d-block ma-0 pa-0">
		<Alertize @return-alertize="redirectTo"></Alertize>
		<v-layout class="d-block ma-0 pa-0 white">
			<v-container class="my-0 py-0">
				<CreateTabs
					:current_tab="currentTab"
					:items="getItems"
					custom_class="v-tab--secondary"
					@update-selected-tab-index="updateSelectedTabIndex"
				></CreateTabs>
			</v-container>
		</v-layout>
		<!-- <v-layout class="d-block ma-0 pa-0 white">
			<SkeletonLineItem :loading="isLoading"></SkeletonLineItem>
		</v-layout> -->
		<v-layout class="d-block ma-0 pa-0">
			<v-container class="my-0 py-8">
				<v-tabs-items v-model="currentTab">
					<v-tab-item v-for="(item, index) in getItems" :key="index">
						<!-- Overview -->
						<v-layout v-if="isCurrentTabSelected(item, 0)" column>
							<Overview
								:resources="resources"
								:line_item="getLineItem"
								@init-frequency-caps="addFrecuencyCaps"
								@save="handleSubmit"
								@handle-cancel="handleCancel"
								:errors="getErrors"
								@fetch-resource="fetchResource"
								@change="handleChange"
								@clear="handleClear"
							></Overview>
						</v-layout>

						<!-- Targeting -->
						<v-layout
							color="transparent"
							v-if="isCurrentTabSelected(item, 1)"
							column
						>
							<v-container class="grey lighten-3">
								<!-- Tabs targeting -->
								<v-row>
									<v-col cols="12" lg="2" md="3">
										<NavTargeting
											:targeting="targeting"
											:current_tab="currentTabTargeting"
											@update-selected-tab-index="
												updateSelectedTabTargetingIndex
											"
										></NavTargeting>
									</v-col>
									<v-col cols="12" lg="10" md="9">
										<v-card
											width="100%"
											class="mx-auto rounded-lg"
											justify="between"
											align="center"
											color="transparent"
											elevation="0"
											tile
											flat
										>
											<AppSite
												v-if="currentTabTargeting === 0"
												:predicates="getPredicateIds"
												:data_variables="
													data_variables.app_site
												"
												:app_site="targeting.app_site"
												@add-item="addItem"
												@add-item-unique="addItemUnique"
												@remove-item="removeItem"
												@remove-item-unique="
													removeItemUnique
												"
												@clear-app-site="clearHandler"
												@update-data-var="
													updateDataVariables
												"
												@add-comma="addCommaHandler"
												@update-item-unique="
													updateItemUnique
												"
											></AppSite>

											<Content
												v-if="currentTabTargeting === 1"
												:predicates="getPredicateIds"
												:content="targeting.content"
											></Content>

											<Environment
												v-if="currentTabTargeting === 2"
												:predicates="getPredicateIds"
												:data_variables="
													data_variables.environment
												"
												:environment="
													targeting.environment
												"
												@add-item="addItem"
												@add-item-unique="addItemUnique"
												@remove-item="removeItem"
												@remove-item-unique="
													removeItemUnique
												"
												@clear-app-site="clearHandler"
												@update-data-var="
													updateDataVariables
												"
												@add-comma="addCommaHandler"
												@update-item-unique="
													updateItemUnique
												"
											></Environment>

											<Exchange
												v-if="currentTabTargeting === 3"
												:predicates="getPredicateIds"
												:data_variables="
													data_variables.exchange
												"
												:exchange="targeting.exchange"
												@add-item="addItem"
												@add-item-unique="addItemUnique"
												@remove-item="removeItem"
												@remove-item-unique="
													removeItemUnique
												"
												@clear-app-site="clearHandler"
												@update-data-var="
													updateDataVariables
												"
												@add-comma="addCommaHandler"
												@update-item-unique="
													updateItemUnique
												"
											></Exchange>

											<Geo
												v-if="currentTabTargeting === 4"
												:predicates="getPredicateIds"
												:data_variables="
													data_variables.geo
												"
												:geo="targeting.geo"
												@add-item="addItem"
												@add-item-unique="addItemUnique"
												@remove-item="removeItem"
												@remove-item-unique="
													removeItemUnique
												"
												@clear-app-site="clearHandler"
												@update-data-var="
													updateDataVariables
												"
												@add-comma="addCommaHandler"
												@update-item-unique="
													updateItemUnique
												"
											></Geo>

											<Platform
												v-if="currentTabTargeting === 5"
												:predicates="getPredicateIds"
												:data_variables="
													data_variables.platform
												"
												:platform="targeting.platform"
												@add-item="addItem"
												@add-item-unique="addItemUnique"
												@remove-item="removeItem"
												@remove-item-unique="
													removeItemUnique
												"
												@clear-app-site="clearHandler"
												@update-data-var="
													updateDataVariables
												"
												@add-comma="addCommaHandler"
												@update-item-unique="
													updateItemUnique
												"
											></Platform>

											<Time
												v-if="currentTabTargeting === 6"
												:predicates="getPredicateIds"
												:data_variables="
													data_variables.time
												"
												:time="targeting.time"
												@update-selected-checked="
													updateSelectedChecked
												"
												@update-selected-predicate="
													updateSelectedPredicate
												"
											></Time>
										</v-card>
									</v-col>
								</v-row>

								<!-- Actions targeting -->
								<v-row
									no-gutters
									class="mt-4"
									dense
									align="center"
									justify="start"
								>
									<v-col
										class="pe-lg-16 pa-0"
										cols="12"
										sm="4"
										md="4"
										lg="6"
									>
									</v-col>

									<v-col
										class="pe-lg-16 pa-0"
										cols="12"
										sm="8"
										md="8"
										lg="6"
									>
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
													@click="
														handleTargetingSubmit
													"
												>
													{{ $t("save") }}
												</v-btn>
												<v-btn
													rounded
													color="secondary"
													class="ma-2 px-8"
													@click="
														handleTargetingSubmit
													"
												>
													{{ $t("save-continue") }}
												</v-btn>
												<v-btn
													rounded
													color="secondary"
													class="ma-2 px-8"
												>
													{{ $t("cancel") }}
												</v-btn>
											</v-row>
										</v-card>
									</v-col>
								</v-row>
							</v-container>
						</v-layout>

						<!-- Creatives -->
						<v-layout v-if="isCurrentTabSelected(item, 3)" column>
							<AssociatedCreativesForm
								@line-item-activate="handleActivate"
								@cancel="handleCancel"
								:line_item="line_item"
								:entities="getAssociatedCreatives"
							></AssociatedCreativesForm>
						</v-layout>
					</v-tab-item>
				</v-tabs-items>
			</v-container>
		</v-layout>
	</v-layout>
</template>

<script lang="ts" src="@/views/Admin/LineItem/Logic.ts" />
