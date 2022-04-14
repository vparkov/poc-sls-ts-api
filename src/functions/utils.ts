import { RequestBody } from '../types';

export const getName = (data: RequestBody) => {
    if (!data.name) {
        throw new Error("Name is required");
    }

    return data.name;
}