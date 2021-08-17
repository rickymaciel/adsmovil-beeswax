import { forEach, isEmpty, isUndefined, replace } from 'lodash'
import { success, error } from '@/api/handlers/HandlerResponse'
import { GetMessage, GetErrors } from '@/api/handlers/HandlerError'
import { AxiosPost, AxiosGet, AxiosPatch } from '@/api/AxiosService'

const ROUTES = require('../routes').SEGMENTS

