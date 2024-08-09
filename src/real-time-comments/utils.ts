import { API_CONSTANTS } from "../shared-utils/api-actions";
import { apiFetch } from "../shared-utils/api-requests";
import { emptyResponse } from "../shared-utils/api-schemas";
import { AddOrderCommentParameters, createCommentSchema } from "./schema";

export const addOrderComment = async ({ params, origin }: { params: AddOrderCommentParameters; origin: 'merchant' | 'customer' }) => {
    const response = await apiFetch({
        action: API_CONSTANTS.ACTIONS.ADD_ORDER_COMMENT,
        params,
        url: origin === 'merchant' ? API_CONSTANTS.MERCHANT_API_URL : API_CONSTANTS.CUSTOMER_API_URL,
        validators: {
            params: createCommentSchema,
            response: emptyResponse
        }
    })
    if (response.status === 'ERROR') {
        const msg = API_CONSTANTS.ERRORS.find(error => error.type === response.error.message)?.message || 'Opps, Something went wrong. You can try again.'
        return {
            error: {
                type: 'error',
                message: msg
            }
        }
    }
    return;
}