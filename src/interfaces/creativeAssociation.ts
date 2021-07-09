export interface Association {
  id: number,
  external_id: number,
  creative_id: number,
  line_item_id: number,
  start_date: string,
  end_date: string,
  active: boolean,
  created_by: number,
  updated_by: number,
  deleted_by: number,
  created_at: string,
  updated_at: string,
  creative: Creative,
  line_item: LineItem
}

export interface AssociationDataCreate {
  creative_id: number,
  line_item_id: number,
  start_date: string,
  end_date: string,
  active: boolean
}

interface Creative {
  id: number,
  external_id: number,
  alternative_id: number,
  account_id: number,
  creative_type_id: number,
  creative_template_id: number,
  name: string,
  start_date: string,
  end_date: string,
  secure: boolean,
  active: boolean,
  created_by: number,
  updated_by: number,
  deleted_by: number,
  created_at: string,
  updated_at: string
}

interface LineItem {
  id: number,
  name: string,
  alternative_id: string,
  start_date: string,
  end_date: string,
  budget: number,
  daily_budget: number,
  fix_cpm: number,
  cpm_bid: number,
  target_ecpc: number,
  target_ctr: number,
  target_vcr: number,
  active: boolean,
  external_id: number,
  spend: number,
  created_by: number,
  updated_by: number,
  deleted_by: number,
  created_at: string,
  updated_at: string,
  deleted_at: string,
  account_id: number,
  advertiser_id: number,
  campaign_id: number,
  line_item_type_id: number,
  budget_type_id: number,
  strategy_id: number,
  bid_strategy_id: number,
  line_pacing_id: number,
  bid_shading_id: number,
  creative_method_id: number,
  budget_remaining: number
}
