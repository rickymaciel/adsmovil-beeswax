import { UserDataCreate, UserFilters, UserOptions, UserPaginated } from '@/interfaces/user'
import { AxiosDownload, AxiosGet, AxiosPatch, AxiosPost, GetData, GetErrors, GetMessage } from '@/services/axios-service'
import { isEmpty, isUndefined } from 'lodash'
import { UserDataUpdate } from '../interfaces/user';

export const USERS_ROUTE = '/api/users'
export const ROLES_ROUTE = '/api/list/roles'

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
            return Promise.resolve(GetData(response));

        } catch (error) {
            return Promise.reject({
                success: false,
                message: GetMessage(error),
                errors: GetErrors(error)
            });
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
            return Promise.resolve(GetData(response));

        } catch (error) {
            return Promise.reject({
                success: false,
                message: GetMessage(error),
                errors: GetErrors(error)
            });
        }
    }

    async paginated(params: { paginated?: UserPaginated, filters?: UserFilters, options?: UserOptions }) {
        try {
            let filter = ''
            let option = ''

            if (!isUndefined(params.filters)) {
                filter = getFilters(params.filters)
            }

            if (!isUndefined(params.options)) {
                option += getOptions(params.options, 'paginated', params.paginated)
            }

            const url = getURL(filter, option)
            const response = await AxiosGet(USERS_ROUTE + url)
            return Promise.resolve(GetData(response));

        } catch (error) {
            return Promise.reject({
                success: false,
                message: GetMessage(error),
                errors: GetErrors(error)
            });
        }
    } 

    async download(params: { paginated?: UserPaginated, filters?: UserFilters, options?: UserOptions }) {
        try {
            let filter = ''
            let option = ''

            if (!isUndefined(params.filters)) {
                filter = getFilters(params.filters)
            }

            if (!isUndefined(params.options)) {
                option += getOptions(params.options, 'download', params.paginated)
            }

            const url = getURL(filter, option)
            
            await AxiosDownload(USERS_ROUTE + url, 'users-export.csv')
            
            return Promise.resolve({});

        } catch (error) {
            return Promise.reject({
                success: false,
                message: GetMessage(error),
                errors: GetErrors(error)
            });
        }
    } 

    async listRoles() {
        try {
            const response = await AxiosGet(ROLES_ROUTE);
            return Promise.resolve(GetData(response));
        }
        catch (error) {
            return Promise.reject({
                success: false,
                message: GetMessage(error),
                errors: GetErrors(error)
            });
        }
    }
    
    async create(user: UserDataCreate) {
        try {
            const response = await AxiosPost(USERS_ROUTE, user);
            return Promise.resolve(GetData(response));
        } catch (error) {
            return Promise.reject({
                success: false,
                message: GetMessage(error),
                errors: GetErrors(error)
            });
        }
    }

    async show(id: number) {
        try {
            const response = await AxiosGet(`${USERS_ROUTE}/${id}`);
            return Promise.resolve(GetData(response));
        } catch (error) {
            return Promise.reject({
                success: false,
                message: GetMessage(error),
                errors: GetErrors(error)
            });
        }
    }

    async update(user: UserDataUpdate, id: number) {
        try {
            const response = await AxiosPatch(`${USERS_ROUTE}/${id}`, user);
            return Promise.resolve(GetData(response));
        } catch (error) {
            return Promise.reject({
                success: false,
                message: GetMessage(error),
                errors: GetErrors(error)
            });
        }
    }

    async setAccount(account_id: number) {
        try {
            const response = await AxiosPatch(`${USERS_ROUTE}/set_account/${account_id}`,{});
            return Promise.resolve(GetData(response));
        } catch (error) {
            return Promise.reject({
                success: false,
                message: GetMessage(error),
                errors: GetErrors(error)
            });
        }        
    } 
}

function getFilters(filters: UserFilters): string {
    let filter = ''

    const id = !!filters.id ? filters.id : '';
    const name = !!filters.name ? filters.name : '';
    const last_name = !!filters.last_name ? filters.last_name : '';
    const email = !!filters.email ? filters.email : '';
    const role_description = !!filters.role_description ? filters.role_description : '';    
    const active = (typeof filters.active === "undefined") ? '' : (!!filters.active ? 1 : 0)

    filter += 'filters[users.id]=' + id +
              '&filters[users.name]=' + name +
              '&filters[users.name]=' + name + 
              '&filters[users.last_name]=' + last_name + 
              '&filters[users.email]=' + email + 
              '&filters[roles.description]=' + role_description + 
              '&filters[users_roles.active]=' + active; 

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
