<template>
	<v-list>
		<v-list-item>
			<v-card
				class="
					d-flex
					justify-start
					align-self-center align-content-center align-center
				"
				color="transparent"
				elevation="0"
			>
				<CardSwitch
					v-model="targeting_predicate_id"
					customClass=""
					reference="targeting_predicate_id"
					:inset="false"
					:true_value="predicates.INCLUDED"
					:false_value="predicates.EXCLUDED"
					:label="
						targeting_predicate_id === predicates.INCLUDED
							? 'Include'
							: 'Exclude'
					"
					:color="
						targeting_predicate_id === predicates.INCLUDED
							? 'success'
							: 'red'
					"
					:disabled="!time.user_time_of_week.targeting_terms.length"
				></CardSwitch>
			</v-card>
		</v-list-item>

		<v-list-item>
			<v-card
				class="
					d-flex
					justify-start
					align-self-center align-content-center align-center
					my-4
				"
				color="transparent"
				elevation="0"
			>
				<v-simple-table
					color="transparent"
					elevation="0"
					class="align-center"
				>
					<template v-slot:default>
						<thead class="align-center text-center">
							<tr class="no-striped align-center">
								<th
									v-for="item in headers"
									:key="item.key"
									class="no-sticky align-center"
								>
									<span class="align-center">
										{{ item.display }}
									</span>
								</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="i in items" :key="i.key">
								<td color="tertiary">
									<strong class="tertiary--text">
										{{ i.value }}
									</strong>
								</td>
								<td
									color="tertiary"
									v-for="r in i.rows"
									:key="r.key"
									@click="updateTargetingChecked(r.text)"
									class="
										justify-center
										align-center
										ma-0
										pa-0
										mx-auto
										pointer
										no-sticky
									"
								>
									<v-card
										class="
											d-flex
											justify-center
											align-center
											ma-0
											pa-4
										"
										:class="
											hasTargetingChecked(r.text)
												? targeting_predicate_id ===
												  predicates.INCLUDED
													? 'green--text'
													: 'red--text'
												: 'white--text'
										"
										:color="
											hasTargetingChecked(r.text)
												? targeting_predicate_id ===
												  predicates.INCLUDED
													? 'green'
													: 'red'
												: 'white'
										"
										style="width: 100%"
										:elevation="
											hasTargetingChecked(r.text) ? 3 : 1
										"
										outlined
										tile
									>
										{{ r.key }}
										<!-- {{ r.text }} -->
									</v-card>
								</td>
							</tr>
						</tbody>
					</template>
				</v-simple-table>
			</v-card>
		</v-list-item>
	</v-list>
</template>

<script lang="ts">
import { filter, find, isEmpty } from "lodash";
import CardSwitch from "../../../../components/Content/CardSwitch.vue";
import Vue from "vue";

export default Vue.extend({
	name: "Time",
	props: {
		time: {
			type: Object,
			default: function () {},
		},
		data_variables: {
			type: Object,
			default: function () {
				return {};
			},
		},
		predicates: {
			type: Object,
			default: function () {
				return {};
			},
		},
	},
	components: { CardSwitch },
	data: () => ({
		active: false,
		selected: [],
		weekdays: [],
		hours: [],
		end_period: 11,
		divide_period: 12,
		headers: [
			{
				text: "Day",
				align: "center",
				sortable: false,
				value: "key",
			},
		],
		items: [],
		targeting_predicate_id: 0,
		minutes: 0,
		start: 0,
		end: 0,
	}),
	async created() {},
	async mounted() {
		this.targeting_predicate_id = this.predicates.INCLUDED;

		this.weekdays = [
			{
				key: 1,
				value: "MON",
			},
			{
				key: 2,
				value: "TUE",
			},
			{
				key: 3,
				value: "WED",
			},
			{
				key: 4,
				value: "THU",
			},
			{
				key: 5,
				value: "FRI",
			},
			{
				key: 6,
				value: "SAT",
			},
			{
				key: 0,
				value: "SUN",
			},
		];

		const range_h = this.getRange(0, 23);

		range_h.forEach((r: number) => {
			this.hours.push({
				key: r,
				value: r % this.divide_period,
			});
		});

		const h = await this.getHeaderItems();

		h.forEach((header: any) => {
			this.headers.push(header);
		});

		await this.matchingItems();
	},
	computed: {},
	methods: {
		setLoading(_loading: Boolean) {
			this.$store.state.proccess.loading_field = _loading;
		},
		async getHeaderItems() {
			const result: Array<any> = [];
			this.hours.forEach((h: any) => {
				result.push({
					value: `${h.value}`,
					display: `${h.value % this.divide_period} ${
						h.key > this.end_period ? "PM" : "AM"
					}`,
					key: `${h.key}`,
					align: "center",
				});
			});
			return result;
		},
		getItems() {
			return this.items;
		},
		async matchingItems() {
			this.weekdays.forEach((w: any) => {
				var rows: Array<any> = [];

				this.hours.forEach((h: any) => {
					if (this.minutes === 0) {
						this.end += 59;
					} else {
						this.start += 60;
						this.end += 60;
					}

					this.minutes += 60;

					rows.push({
						value: `${h.value}`,
						key: `${h.key}`,
						text: `${this.start},${this.end}`,
						align: "center",
					});
				});

				this.items.push({
					key: `${w.key}`,
					value: w.value,
					rows: rows,
				});
			});
		},
		getRange(min: number, max: number) {
			return [...Array(max - min + 1).keys()].map((i) => i + min);
		},

		hasTargetingChecked(text: any) {
			const targeting_term: Array<any> =
				this.time.user_time_of_week.targeting_terms;
			const finded = find(targeting_term, { value: `${text}` });
			return !isEmpty(finded);
		},

		updateTargetingChecked(text: any) {
			this.$emit("update-selected-checked", {
				tab: "time",
				key: "user_time_of_week",
				value: text,
			});
		},
	},
	watch: {
		targeting_predicate_id(val) {
			this.$emit("update-selected-predicate", {
				tab: "time",
				key: "user_time_of_week",
				value: val,
			});
		},
	},
});
</script>
