<template>
	<section
		class="d-lg-flex justify-space-between align-center align-items-center align-self-center py-4"
	>
		<v-breadcrumbs :items="items">
			<template v-slot:divider>
				<v-icon>mdi-chevron-right</v-icon>
			</template>
			<template v-slot:item="{ item }">
				<v-breadcrumbs-item
					:to="item.to"
					exact
					:disabled="item.disabled"
				>
					{{ item.text }}
				</v-breadcrumbs-item>
			</template>
		</v-breadcrumbs>

		<!-- <template v-if="showSearcher">
			<Searcher />
		</template> -->
	</section>
</template>

<script lang="ts">
	import Searcher from "../../components/Content/Searcher.vue";
	export default {
		name: "BreadCrumbs",
		props: {
			showSearcher: {
				type: Boolean,
				default: false,
			},
		},
		data: function () {
			return {
				message: null,
				directoriesRoot: [
					"/admin/advertisers",
					"/admin/custom_lists",
					"/admin/campaigns",
					"/admin/lineitem",
					"/admin/creatives",
				],
			};
		},
		components: { Searcher },
		mounted() {},
		computed: {
			items() {
				let self = this;
				return self.$route.matched.map((math: any) => {
					this.path = this.getPath(math.path);
					return {
						exact: true,
						to: this.path,
						link: true,
						text: math.meta.breadcrumb,
						disabled: false,
					};
				});
			},
		},
		methods: {
			getPath(path: string) {
				if (this.isEditPath(path)) {
					path = path.replace(":id", this.$route.params.id);
					return path;
				}
				if (this.isRoot(path)) {
					path = path.concat("/index");
					return path;
				}
				if (this.isAdminPath(path)) {
					path = path.concat("/dashboard");
					return path;
				}
				if (this.isCreatePath(path)) {
					path = path;
					return path;
				}
			},
			isRoot(path: string) {
				return this.directoriesRoot.includes(path);
			},
			isAdminPath(path: string) {
				return String(path).endsWith("/admin");
			},
			isCreatePath(path: string) {
				return String(path).endsWith("/create");
			},
			isEditPath(path: string) {
				return String(path).includes(":id");
			},
		},
	};
</script>
