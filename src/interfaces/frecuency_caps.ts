export interface FrecuencyCapsDataCreate {
  impressions: number,
  every_time: number,
  unit_time_id: number
}

export interface FrecuencyCaps {
  id: number,
  impressions: number,
  duration: number,
  every_time: number,
  created_by: number,
  updated_by: number,
  deleted_by: number,
  created_at: string,
  updated_at: string,
  deleted_at: string,
  unit_time_id: number,
  campaign_id: number,
  line_item_id: number
}
