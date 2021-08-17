import { success, error } from '@/api/handlers/HandlerResponse'
import { GetMessage, GetErrors } from '@/api/handlers/HandlerError'
import { AxiosGet } from '@/api/AxiosService'
import { forEach, isEmpty } from 'lodash'
import { Content } from '@/interfaces/content'

const ROUTES = require('../routes').CONTENT

export async function contents (key: string, token: string) {

  let url = getURL(key);

  if(isEmpty(url)) return error(`The key "${key}" is invalid`, [])

  try {
    const response = await AxiosGet(url, token)

    const items = [] as any

    if (response.success) {
      const data = response.content

      forEach(data, function (value, key) {
        const item = {
          id: value.id,
          type: value.type,
          description: value.description,
          extra: value.extra //Key to use
        } as Content

        items.push(item)
      })

      return success('', items)
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
    case 'content_category':
      url = ROUTES.CONTENT_CATEGORY_ROUTE
      break
    case 'language':
      url = ROUTES.CONTENT_LENGUAGE_ROUTE
      break
    case 'content_ratings':
      url = ROUTES.CONTENT_RATINGS_ROUTE
      break
    default:
      return ''
  }
  return url;
}
