import { client } from "./client";
import {
    Application,
    CreateApplicationRequest,
    GetApplicationsRequest,
} from "./types";

export const applicationApi = {
    getApplications: async (params: GetApplicationsRequest) => {
        const res = await client.get("/Application", { params });
        return res.data;
    },
    createApplication: async (data: CreateApplicationRequest) => {
        const res = await client.post("/Application", data);
        return res.data;
    },
    getApplication: async (id: string) => {
        const res = await client.get(`/Application/${id}`);
        return res.data;
    },
    deleteApplication: async (id: string) => {
        const res = await client.delete(`/Application/${id}`);
        return res.data;
    },
    getApplicationsByJob: async (jobId: string) => {
        const res = await client.get(`/Application/jobs/${jobId}`);
        return res.data;
    },
    getMyHistory: async () => {
        const res = await client.get(`/Application/my-history`);
        return res.data;
    },
};
