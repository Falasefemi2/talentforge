import { useQuery, useMutation } from "@tanstack/react-query";
import { interviewApi } from "../interview";
import {
    GetInterviewsRequest,
    ScheduleInterviewRequest,
    RescheduleInterviewRequest,
    UpdateInterviewStatusRequest,
} from "../types";

export const useGetInterviews = (params: GetInterviewsRequest) => {
    return useQuery({
        queryKey: ["interviews", params],
        queryFn: () => interviewApi.getInterviews(params),
    });
};

export const useGetInterview = (id: string) => {
    return useQuery({
        queryKey: ["interview", id],
        queryFn: () => interviewApi.getInterview(id),
        enabled: !!id,
    });
};

export const useDeleteInterview = () => {
    return useMutation({
        mutationFn: (id: string) => interviewApi.deleteInterview(id),
    });
};

export const useGetApplicantInterviews = () => {
    return useQuery({
        queryKey: ["applicantInterviews"],
        queryFn: () => interviewApi.getApplicantInterviews(),
    });
};

export const useScheduleInterview = () => {
    return useMutation({
        mutationFn: (data: ScheduleInterviewRequest) =>
            interviewApi.scheduleInterview(data),
    });
};

export const useRescheduleInterview = () => {
    return useMutation({
        mutationFn: (data: RescheduleInterviewRequest) =>
            interviewApi.rescheduleInterview(data),
    });
};

export const useUpdateInterviewStatus = () => {
    return useMutation({
        mutationFn: (data: UpdateInterviewStatusRequest) =>
            interviewApi.updateStatus(data),
    });
};
