import { AxiosError } from 'axios'

export function GetDataError (error: AxiosError<any>) {
  return error.response?.data
}

export function GetErrors (error: AxiosError<any>) {
  return error.response?.data.errors || []
}

export function GetMessage (error: AxiosError<any>) {
  return error.response?.data.message
}
