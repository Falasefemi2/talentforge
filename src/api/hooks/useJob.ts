import { useMutation, useQuery } from "@tanstack/react-query";
import { jobApi } from "../job";
import { CreateJobRequest, UpdateJobRequest, GetJobsRequest } from "../types";

export const useGetJobs = (params: GetJobsRequest) => {
    return useQuery({
        queryKey: ["jobs", params],
        queryFn: () => jobApi.getJobs(params),
    });
};

export const useGetJob = (id: string) => {
    return useQuery({
        queryKey: ["job", id],
        queryFn: () => jobApi.getJob(id),
        enabled: !!id,
    });
};

export const useCreateJob = () => {
    return useMutation({
        mutationFn: (data: CreateJobRequest) => jobApi.createJob(data),
    });
};

export const useUpdateJob = () => {
    return useMutation({
        mutationFn: (data: UpdateJobRequest) => jobApi.updateJob(data),
    });
};

export const useDeleteJob = () => {
    return useMutation({
        mutationFn: (id: string) => jobApi.deleteJob(id),
    });
};
