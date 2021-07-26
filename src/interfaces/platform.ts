export interface Platform {
  id: number,
  type: string,
  description: string,
  extra: string
}

export interface Browsers {
  id: number,
  type: string,
  description: string,
  extra: string
}

export interface BrowserVersion {
  id: number,
  type: string,
  description: string,
  key: string,
  browser_key: string
}

export interface DeviceModel {
  id: number,
  type: string,
  description: string,
  key: string,
  device_make_key: string
}

export interface DeviceScreenSize {
  id: number,
  type: string,
  description: string,
  key: string,
  field_order: number
}

export interface OperatingSystemVersion {
  id: number,
  type: string,
  description: string,
  key: string,
  operating_system_key: string
}
