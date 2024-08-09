import { z } from 'zod';

export const errorSchema = z.object({
    name: z.string(),
    message: z.string(),
})

export const apiErrorSchema = z.object({
    status: z.literal('ERROR'),
    error: errorSchema
})

export const inferApiResponse = <TData extends z.ZodTypeAny>(schema: TData) => {
    return z.union([
        apiErrorSchema,
        z.intersection(schema, z.object({
            status: z.literal('OK')
        }))
    ])
}

export const emptyResponse = inferApiResponse(z.object({}))