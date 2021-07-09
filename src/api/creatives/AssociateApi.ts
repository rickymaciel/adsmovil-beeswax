import { success, error } from '@/api/handlers/HandlerResponse'
import { GetMessage, GetErrors } from '@/api/handlers/HandlerError'
import { AxiosGet, AxiosPost, AxiosDelete } from '@/api/AxiosService'
import { Association, AssociationDataCreate } from '@/interfaces/creativeAssociation'

const ROUTES = require('../routes').CREATIVES

export async function create (association: AssociationDataCreate, token: string) {
  try {
    const response = await AxiosPost(ROUTES.CREATIVE_ASSOCIATE_ROUTE, association, token)

    if (response.success) {
      const data = response.content

      const associate = {
        id: data.id,
        external_id: data.external_id,
        creative_id: data.creative_id,
        line_item_id: data.line_item_id,
        start_date: data.start_date,
        end_date: data.end_date,
        active: data.active,
        created_by: data.created_by,
        updated_by: data.updated_by,
        deleted_by: data.deleted_by,
        created_at: data.created_at,
        updated_at: data.updated_at,
        creative: {
          id: data.creative.id,
          external_id: data.creative.external_id,
          alternative_id: data.creative.alternative_id,
          account_id: data.creative.account_id,
          creative_type_id: data.creative.creative_type_id,
          creative_template_id: data.creative.creative_template_id,
          name: data.creative.name,
          start_date: data.creative.start_date,
          end_date: data.creative.end_date,
          secure: data.creative.secure,
          active: data.creative.active,
          created_by: data.creative.created_by,
          updated_by: data.creative.updated_by,
          deleted_by: data.creative.deleted_by,
          created_at: data.creative.created_at,
          updated_at: data.creative.updated_at
        },
        line_item: {
          id: data.line_item.id,
          name: data.line_item.name,
          alternative_id: data.line_item.alternative_id,
          start_date: data.line_item.start_date,
          end_date: data.line_item.end_date,
          budget: data.line_item.budget,
          daily_budget: data.line_item.daily_budget,
          fix_cpm: data.line_item.fix_cpm,
          cpm_bid: data.line_item.cpm_bid,
          target_ecpc: data.line_item.target_ecpc,
          target_ctr: data.line_item.target_ctr,
          target_vcr: data.line_item.target_vcr,
          active: data.line_item.active,
          external_id: data.line_item.external_id,
          spend: data.line_item.spend,
          created_by: data.line_item.created_by,
          updated_by: data.line_item.updated_by,
          deleted_by: data.line_item.deleted_by,
          created_at: data.line_item.created_at,
          updated_at: data.line_item.updated_at,
          deleted_at: data.line_item.deleted_at,
          account_id: data.line_item.account_id,
          advertiser_id: data.line_item.advertiser_id,
          campaign_id: data.line_item.campaign_id,
          line_item_type_id: data.line_item.line_item_type_id,
          budget_type_id: data.line_item.budget_type_id,
          strategy_id: data.line_item.strategy_id,
          bid_strategy_id: data.line_item.bid_strategy_id,
          line_pacing_id: data.line_item.line_pacing_id,
          bid_shading_id: data.line_item.bid_shading_id,
          creative_method_id: data.line_item.creative_method_id,
          budget_remaining: data.line_item.budget_remaining
        }
      } as Association

      return success('', associate)
    }

    console.log('ERROR: ', response)

    return error(response.message, response.errors)
  } catch (err) {
    console.log('EXCEPTION: ', err)
    return error(GetMessage(err), GetErrors(err))
  }
}

export async function deleted (id: number, token: string) {
  try {
    const response = await AxiosDelete(ROUTES.CREATIVE_ASSOCIATE_ROUTE + '/' + id, token)

    if (response.success) {
      return true
    }

    console.log('ERROR: ', response.message)

    return error(response.message, response.errors)
  } catch (err) {
    console.log('EXCEPTION: ', err)
    return error(GetMessage(err), GetErrors(err))
  }
}
