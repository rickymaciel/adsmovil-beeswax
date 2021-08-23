import { forEach, isEmpty } from 'lodash'
import { AxiosGet } from '@/api/AxiosService'
import { success, error } from '@/api/handlers/HandlerResponse'
import { GetMessage, GetErrors } from '@/api/handlers/HandlerError'
import { Video } from '@/interfaces/video'

const ROUTES = require('../../routes').VIDEO

/**
 * 
 * Implementa 
 * companion_required
 * playback_method
 * start_delay
 * player_size
 * video_placement_type
 */
export async function videoList(key: string, token: string) {

    let url = getURL(key);

    if (isEmpty(url)) return error(`The key "${key}" is invalid`, [])

    try {
        const response = await AxiosGet(url, token)

        const types = [] as any

        if (response.success) {
            const data = response.content

            forEach(data, function (value, key) {
                const datos = {
                    id: value.id,
                    type: value.type,
                    description: value.description,
                    extra: value.extra
                } as Video

                types.push(datos)
            })

            return success('', types)
        }

        console.log('ERROR: ', response)

        return error(response.message, response.errors)
    } catch (err) {
        console.log('EXCEPTION: ', err)
        return error(GetMessage(err), GetErrors(err))
    }

}

function getURL(key: string): string {
    let url = ''

    switch (key) {
        case 'companion_required':
            url = ROUTES.VIDEO_COMPANION_REQUIRED
            break
        case 'playback_method':
            url = ROUTES.VIDEO_PLAYBACK_METHOD
            break
        case 'start_delay':
            url = ROUTES.VIDEO_START_DELAY
            break
        case 'player_size':
            url = ROUTES.VIDEO_PLAYER_SIZE
            break
        case 'video_placement_type':
            url = ROUTES.VIDEO_PLACEMENT_TYPE
            break
        default:
            return ''
    }
    return url;
}