import { client } from "./client";
import {
    Job,
    CreateJobRequest,
    UpdateJobRequest,
    GetJobsRequest,
} from "./types";

export const jobApi = {
    getJobs: async (params: GetJobsRequest) => {
        const res = await client.get("/Job", { params });
        return res.data;
    },
    createJob: async (data: CreateJobRequest) => {
        const res = await client.post("/Job", data);
        return res.data;
    },
    updateJob: async (data: UpdateJobRequest) => {
        const res = await client.put("/Job", data);
        return res.data;
    },
    getJob: async (id: string) => {
        const res = await client.get(`/Job/${id}`);
        return res.data;
    },
    deleteJob: async (id: string) => {
        const res = await client.delete(`/Job/${id}`);
        return res.data;
    },
};
