import { z } from "zod";

export const apiFetch = async <TResponse = unknown, TParam = unknown>({ action, url, params, validators }: { action: string; url: string; params: TParam; validators: { params: z.ZodType<TParam>; response: z.ZodType<TResponse> } }) => {
    return await post<TResponse, TParam>({ action, url, params, validators: { params: validators.params, response: validators.response } });
}

async function post<TResponse = unknown, TParam = unknown>({ action, url, params, validators }: { action: string; url: string; params: unknown, validators: { params: z.ZodType<TParam>; response: z.ZodType<TResponse> } }): Promise<TResponse> {
    const parsedParams = validators.params.safeParse(params);
    if (!parsedParams.success) throw Error(parsedParams.error.message);
    const formData = new FormData();
    formData.append('action', action);
    if (params) {
        formData.append('param_json', JSON.stringify(params));
    }

    const response = await fetch(url, {
        method: 'POST',
        body: formData
    })
    if (!response.ok) throw Error(response.statusText);
    const jsonResponse = await response.json();

    const parsedResponse = validators.response.safeParse(jsonResponse);
    if (!parsedResponse.success) throw Error(parsedResponse.error.message);
    return parsedResponse.data;
}
