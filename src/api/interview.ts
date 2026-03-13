import { client } from "./client";
import {
    Interview,
    GetInterviewsRequest,
    ScheduleInterviewRequest,
    RescheduleInterviewRequest,
    UpdateInterviewStatusRequest,
} from "./types";

export const interviewApi = {
    getInterviews: async (params: GetInterviewsRequest) => {
        const res = await client.get("/Interview", { params });
        return res.data;
    },
    getInterview: async (id: string) => {
        const res = await client.get(`/Interview/${id}`);
        return res.data;
    },
    deleteInterview: async (id: string) => {
        const res = await client.delete(`/Interview/${id}`);
        return res.data;
    },
    getApplicantInterviews: async () => {
        const res = await client.get(`/Interview/applicant`);
        return res.data;
    },
    scheduleInterview: async (data: ScheduleInterviewRequest) => {
        const res = await client.post(`/Interview/schedule`, data);
        return res.data;
    },
    rescheduleInterview: async (data: RescheduleInterviewRequest) => {
        const res = await client.post(`/Interview/reschedule`, data);
        return res.data;
    },
    updateStatus: async (data: UpdateInterviewStatusRequest) => {
        const res = await client.post(`/Interview/status-Update`, data);
        return res.data;
    },
};
