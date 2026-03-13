import { useMutation, useQuery } from "@tanstack/react-query";
import { applicationApi } from "../application";
import { CreateApplicationRequest, GetApplicationsRequest } from "../types";

export const useGetApplications = (params: GetApplicationsRequest) => {
    return useQuery({
        queryKey: ["applications", params],
        queryFn: () => applicationApi.getApplications(params),
    });
};

export const useCreateApplication = () => {
    return useMutation({
        mutationFn: (data: CreateApplicationRequest) =>
            applicationApi.createApplication(data),
    });
};

export const useGetApplication = (id: string) => {
    return useQuery({
        queryKey: ["application", id],
        queryFn: () => applicationApi.getApplication(id),
        enabled: !!id,
    });
};

export const useDeleteApplication = () => {
    return useMutation({
        mutationFn: (id: string) => applicationApi.deleteApplication(id),
    });
};

export const useGetApplicationsByJob = (jobId: string) => {
    return useQuery({
        queryKey: ["jobApplications", jobId],
        queryFn: () => applicationApi.getApplicationsByJob(jobId),
        enabled: !!jobId,
    });
};

export const useGetMyHistory = () => {
    return useQuery({
        queryKey: ["myApplicationHistory"],
        queryFn: () => applicationApi.getMyHistory(),
    });
};
