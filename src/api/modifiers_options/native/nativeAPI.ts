import { forEach } from 'lodash'
import { AxiosGet } from '@/api/AxiosService'
import { success, error } from '@/api/handlers/HandlerResponse'
import { GetMessage, GetErrors } from '@/api/handlers/HandlerError'
import { NativeLayouts } from '@/interfaces/native'

const ROUTES = require('../../routes').NATIVE

export async function nativeLayoutsList(token: string) {
    try {
        const response = await AxiosGet(ROUTES.NATIVE_NATIVE_LAYOUT_ROUTE, token)

        const nativeDatas = [] as any

        if (response.success) {
            const data = response.content

            forEach(data, function (value, key) {
                const nativeData = {
                    id: value.id,
                    type: value.type,
                    description: value.description,
                    extra: value.extra
                } as NativeLayouts

                nativeDatas.push(nativeData)
            })
            return success('', nativeDatas)
        }

        console.log('ERROR: ', response)
        return error(response.message, response.errors)
    } catch (error) {
        console.log('EXCEPTION: ', error)
        return error(GetMessage(error), GetErrors(error))
    }
}