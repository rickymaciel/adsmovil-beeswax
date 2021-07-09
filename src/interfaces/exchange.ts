export interface AuctionType {
  id: number,
  type: string,
  description: string,
  extra: string
}

export interface InventorySource {
  id: number,
  external_id: number,
  name: string,
  key: string,
  mobile_app: boolean,
  mobile_web: boolean,
  mobile_native: boolean,
  desktop: boolean,
  desktop_native: boolean,
  video: boolean,
  other: boolean
}
