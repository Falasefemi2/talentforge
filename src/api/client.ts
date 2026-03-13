import axios from "axios";
import { ApiError } from "./types";

export const client = axios.create({
    baseURL: import.meta.env.VITE_API_URL ?? "/api",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

client.interceptors.response.use(
    (response) => response,
    (error) => {
        const apiError: ApiError = error.response?.data;
        const message = apiError?.ErrorMessage ?? error.message;
        return Promise.reject(new Error(message));
    }
);
