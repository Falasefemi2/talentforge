import { useState } from "react";
import { Clock, CheckCircle, XCircle, AlertCircle, Eye } from "lucide-react";
import { Badge } from "../../ui/badge";
import { useGetApplications } from "@/api/hooks/useApplication";

import { Application } from '@/api/types';

export function MyApplications() {
    const [filter, setFilter] = useState<"all" | Application["status"]>("all");

    const { data: appsResponse, isLoading, error } = useGetApplications({
        status: filter === "all" ? undefined : filter,
        pageNumber: 1,
        pageSize: 100,
    });

    const applications: Application[] = appsResponse?.data?.items || []; // adapt to response shape



    const getStatusConfig = (status: Application["status"]) => {
        const configs = {
            pending: {
                label: "Pending",
                color: "bg-gray-100 text-gray-700",
                icon: Clock,
                iconColor: "text-gray-500",
            },
            reviewing: {
                label: "In Review",
                color: "bg-amber-100 text-amber-700",
                icon: AlertCircle,
                iconColor: "text-amber-500",
            },
            interview: {
                label: "Interview Scheduled",
                color: "bg-emerald-100 text-emerald-700",
                icon: CheckCircle,
                iconColor: "text-emerald-500",
            },
            offer: {
                label: "Offer Received",
                color: "bg-green-100 text-green-700",
                icon: CheckCircle,
                iconColor: "text-green-500",
            },
            rejected: {
                label: "Not Selected",
                color: "bg-red-100 text-red-700",
                icon: XCircle,
                iconColor: "text-red-500",
            },
        };
        return configs[status];
    };

    const filteredApplications =
        filter === "all"
            ? applications
            : applications.filter((app) => app.status === filter);

    const stats = {
        total: applications.length,
        pending: applications.filter((a) => a.status === "pending").length,
        reviewing: applications.filter((a) => a.status === "reviewing").length,
        interview: applications.filter((a) => a.status === "interview").length,
        offer: applications.filter((a) => a.status === "offer").length,
    };

    if (isLoading) {
        return (
            <div className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-600 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
                    <Clock className="w-8 h-8 text-white" />
                </div>
                <p className="text-gray-600">Loading applications...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-8 text-center">
                <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Failed to load applications</h3>
                <p className="text-gray-600">Please try again later.</p>
            </div>
        );
    }

    return (
        <div className="p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-semibold text-gray-900 mb-2">
                    My Applications
                </h1>
                <p className="text-gray-600">
                    Track all your job applications in one place.
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 mb-6">
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="text-sm text-gray-500 mb-1">Total</div>
                    <div className="text-2xl font-semibold text-gray-900">
                        {stats.total}
                    </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="text-sm text-gray-500 mb-1">Pending</div>
                    <div className="text-2xl font-semibold text-gray-700">
                        {stats.pending}
                    </div>
                </div>
                <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                    <div className="text-sm text-amber-600 mb-1">In Review</div>
                    <div className="text-2xl font-semibold text-amber-700">
                        {stats.reviewing}
                    </div>
                </div>
                <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
                    <div className="text-sm text-emerald-600 mb-1">Interview</div>
                    <div className="text-2xl font-semibold text-emerald-700">
                        {stats.interview}
                    </div>
                </div>
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <div className="text-sm text-green-600 mb-1">Offers</div>
                    <div className="text-2xl font-semibold text-green-700">
                        {stats.offer}
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
                <div className="flex gap-2">
                    <button
                        onClick={() => setFilter("all")}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${filter === "all"
                            ? "bg-emerald-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                    >
                        All Applications
                    </button>
                    <button
                        onClick={() => setFilter("pending")}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${filter === "pending"
                            ? "bg-emerald-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                    >
                        Pending
                    </button>
                    <button
                        onClick={() => setFilter("reviewing")}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${filter === "reviewing"
                            ? "bg-emerald-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                    >
                        In Review
                    </button>
                    <button
                        onClick={() => setFilter("interview")}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${filter === "interview"
                            ? "bg-emerald-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                    >
                        Interview
                    </button>
                    <button
                        onClick={() => setFilter("offer")}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${filter === "offer"
                            ? "bg-emerald-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                    >
                        Offers
                    </button>
                </div>
            </div>

            {/* Applications List */}
            <div className="bg-white rounded-lg border border-gray-200">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                                    Job ID
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                                    Location
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                                    Years Exp
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                                    Applied Date
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                                    Status
                                </th>
                                <th className="px-6 py-4"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredApplications.map((app) => {
                                const statusConfig = getStatusConfig(app.status);
                                const StatusIcon = statusConfig.icon;
                                return (
                                    <tr key={app.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-gray-900">
                                                {app.jobId}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {app.location}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {app.yearsOfExperience}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {new Date(app.dateApplied).toLocaleDateString("en-US", {
                                                month: "short",
                                                day: "numeric",
                                                year: "numeric",
                                            })}
                                        </td>
                                        <td className="px-6 py-4">
                                            <Badge
                                                className={`${statusConfig.color} border-0 flex items-center gap-1 w-fit`}
                                            >
                                                <StatusIcon
                                                    className={`w-3 h-3 ${statusConfig.iconColor}`}
                                                />
                                                {statusConfig.label}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                                <Eye className="w-5 h-5 text-gray-400" />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {filteredApplications.length === 0 && (
                <div className="bg-white rounded-lg border border-gray-200 p-12 text-center mt-6">
                    <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        No applications found
                    </h3>
                    <p className="text-gray-600">Try selecting a different filter</p>
                </div>
            )}
        </div>
    );
}
