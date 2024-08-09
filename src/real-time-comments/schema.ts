import { z } from 'zod'

export const createCommentSchema = z.object({
    user_id: z.string(),
    login_token: z.string(),
    msg: z.string(),
    store_id: z.string(),
    order_id: z.string()
})

export const realTimeCommentsIncomingMessageSchema = z.object({
    type: z.literal('merchant-comment'),
    params: createCommentSchema
}).or(z.object({
    type: z.literal('customer-comment'),
    params: createCommentSchema
}))

export const realTimeCommentsOutgoingMessageSchema = z.object({
    type: z.literal('error'),
    message: z.string(),
})

export type OutgoingCommentSchema = z.infer<typeof realTimeCommentsOutgoingMessageSchema>
export type AddOrderCommentParameters = z.infer<typeof createCommentSchema>