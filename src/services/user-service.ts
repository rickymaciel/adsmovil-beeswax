import { UserFilters, UserOptions, UserPaginated } from '@/interfaces/user'
import { AxiosGet } from '@/services/axios-service'
import { isEmpty, isUndefined } from 'lodash'

export const USERS_ROUTE = '/api/users'

class UserService {

    async all(filters?: UserFilters, options?: UserOptions) {
        try {
            let filter = ''
            let option = ''

            if (!isUndefined(filters)) {
                filter = getFilters(filters)
            }

            if (!isUndefined(options)) {
                option += getOptions(options, 'all')
            }

            const url = getURL(filter, option)
            const response = await AxiosGet(USERS_ROUTE + url)
            console.log('AxiosGet:UserService:all ', { url: url, response: response })

            if (response.status < 200 && response.status > 300) {
                return null;
            }

            return response.data.response;
        } catch (error) {
            console.error('UserService:users', { error: error })
        }
    }

    async list(filters?: UserFilters, options?: UserOptions) {
        try {
            let filter = ''
            let option = ''

            if (!isUndefined(filters)) {
                filter = getFilters(filters)
            }

            if (!isUndefined(options)) {
                option += getOptions(options, 'list')
            }

            const url = getURL(filter, option)
            const response = await AxiosGet(USERS_ROUTE + url)
            console.log('AxiosGet:UserService:list ', { url: url, response: response })

            if (response.status < 200 && response.status > 300) {
                return null;
            }

            return response.data.response;

        } catch (error) {
            console.error('UserService:list', { error: error })
        }
    }
}

function getFilters(filters: UserFilters): string {
    let filter = ''

    const first_name = (isUndefined(filters.first_name)) ? '' : filters.first_name
    const last_name = (isUndefined(filters.last_name)) ? '' : filters.last_name
    const email = (isUndefined(filters.email)) ? '' : filters.email

    filter += 'filters[name]=' + first_name + '&filters[last_name]=' + last_name + '&filters[email]=' + email

    return filter
}

function getOptions(options: UserOptions, mode: string, paginated?: UserPaginated): string {
    let option = ''

    const sort = (isUndefined(options.sort)) ? '' : options.sort
    const order = (isUndefined(options.order)) ? '' : options.order

    option += 'sort=' + sort + '&order=' + order + '&mode=' + mode

    if (mode == 'paginated') {
        option += '&page=' + paginated?.page + '&limit=' + paginated?.limit
    }

    return option
}

function getURL(filters: string, options: string): string {
    let url = ''

    if (!isEmpty(filters) && !isEmpty(options)) {
        url = '?' + filters + '&' + options
    } else if (!isEmpty(filters)) {
        url = '?' + filters
    } else if (!isEmpty(options)) {
        url = '?' + options
    }

    return url
}


export default new UserService()
