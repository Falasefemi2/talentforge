import { useEffect, useMemo, useState } from "react";
import { AlertCircle, CheckCircle, Circle, Clock } from "lucide-react";
import { useGetMyHistory } from "@/api/hooks/useApplication";

interface ApplicationStage {
    id: number;
    name: string;
    status: "completed" | "current" | "upcoming";
    date?: string;
    description: string;
}

export function TrackApplication() {
    const { data: historyResponse, isLoading, error } = useGetMyHistory();
    const [selectedApplication, setSelectedApplication] = useState("");

    const historyItems = useMemo(() => {
        const raw = historyResponse as any;
        const items =
            raw?.data?.items ??
            raw?.data ??
            raw?.items ??
            (Array.isArray(raw) ? raw : []);
        return Array.isArray(items) ? items : [];
    }, [historyResponse]);

    const getApplicationKey = (item: any) =>
        item?.applicationId ??
        item?.applicationID ??
        item?.application_id ??
        item?.jobApplicationId ??
        item?.jobId ??
        item?.job_id ??
        item?.id ??
        "";

    const applications = useMemo(() => {
        const map = new Map<
            string,
            { id: string; position: string; company: string; dateApplied?: string }
        >();
        for (const item of historyItems) {
            const key = getApplicationKey(item);
            if (!key) continue;
            if (map.has(String(key))) continue;
            const position =
                item?.jobTitle ??
                item?.position ??
                item?.title ??
                item?.jobName ??
                item?.role ??
                "Unknown Position";
            const company =
                item?.companyName ??
                item?.company ??
                item?.organization ??
                item?.employer ??
                "Unknown Company";
            const dateApplied =
                item?.dateApplied ??
                item?.appliedAt ??
                item?.createdAt ??
                item?.created_on ??
                item?.created ??
                item?.timestamp ??
                "";
            map.set(String(key), {
                id: String(key),
                position,
                company,
                dateApplied,
            });
        }
        return Array.from(map.values());
    }, [historyItems]);

    useEffect(() => {
        if (!selectedApplication && applications.length > 0) {
            setSelectedApplication(applications[0].id);
        }
    }, [applications, selectedApplication]);

    const selectedHistory = useMemo(() => {
        if (!selectedApplication) return [];
        return historyItems.filter(
            (item) => String(getApplicationKey(item)) === selectedApplication,
        );
    }, [historyItems, selectedApplication]);

    const getDateValue = (item: any) => {
        const raw =
            item?.date ??
            item?.dateApplied ??
            item?.appliedAt ??
            item?.updatedAt ??
            item?.updated_on ??
            item?.createdAt ??
            item?.created_on ??
            item?.timestamp ??
            "";
        const parsed = Date.parse(raw);
        return Number.isNaN(parsed) ? 0 : parsed;
    };

    const formatDate = (value?: string) => {
        if (!value) return "";
        const parsed = Date.parse(value);
        if (Number.isNaN(parsed)) return value;
        return new Date(parsed).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    const stages: ApplicationStage[] = useMemo(() => {
        if (selectedHistory.length === 0) return [];
        const ordered = [...selectedHistory].sort(
            (a, b) => getDateValue(a) - getDateValue(b),
        );
        return ordered.map((item, index) => {
            const isLast = index === ordered.length - 1;
            const name =
                item?.stage ??
                item?.status ??
                item?.name ??
                item?.title ??
                "Update";
            const description =
                item?.description ??
                item?.details ??
                item?.note ??
                "Application status updated.";
            const dateRaw =
                item?.date ??
                item?.updatedAt ??
                item?.updated_on ??
                item?.createdAt ??
                item?.created_on ??
                item?.dateApplied ??
                item?.appliedAt ??
                item?.timestamp ??
                "";
            return {
                id: index + 1,
                name,
                status: isLast ? "current" : "completed",
                date: formatDate(dateRaw),
                description,
            };
        });
    }, [selectedHistory]);

    const selectedApplicationInfo = applications.find(
        (a) => a.id === selectedApplication,
    );

    const currentStage = stages.find((stage) => stage.status === "current");
    const progressText =
        stages.length > 0
            ? `${stages.length} stage${stages.length === 1 ? "" : "s"}`
            : "No stages";
    const progressPercent =
        stages.length > 0
            ? `${Math.max(
                  12,
                  Math.min(100, (stages.length / Math.max(stages.length, 1)) * 100),
              )}%`
            : "0%";

    return (
        <div className="p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-semibold text-gray-900 mb-2">
                    Track Application
                </h1>
                <p className="text-gray-600">
                    Monitor the progress of your job applications.
                </p>
            </div>

            {/* Application Selector */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                    Select Application to Track
                </label>
                {isLoading ? (
                    <div className="flex items-center gap-3 text-gray-500">
                        <div className="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                        Loading applications...
                    </div>
                ) : applications.length === 0 ? (
                    <div className="text-sm text-gray-500">
                        No applications found.
                    </div>
                ) : (
                    <select
                        value={selectedApplication}
                        onChange={(e) => setSelectedApplication(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                        {applications.map((app) => (
                            <option key={app.id} value={app.id}>
                                {app.position} - {app.company}
                            </option>
                        ))}
                    </select>
                )}
            </div>

            {/* Application Details */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg p-6 text-white mb-8">
                <h2 className="text-2xl font-semibold mb-2">
                    {selectedApplicationInfo?.position || "Application"}
                </h2>
                <p className="text-emerald-100 mb-4">
                    {selectedApplicationInfo?.company || "Company"}
                </p>
                <div className="flex items-center gap-6">
                    <div>
                        <div className="text-sm text-emerald-200">
                            Current Stage
                        </div>
                        <div className="text-lg font-semibold">
                            {currentStage?.name || "N/A"}
                        </div>
                    </div>
                    <div>
                        <div className="text-sm text-emerald-200">Progress</div>
                        <div className="text-lg font-semibold">{progressText}</div>
                    </div>
                    <div>
                        <div className="text-sm text-emerald-200">Applied Date</div>
                        <div className="text-lg font-semibold">
                            {formatDate(selectedApplicationInfo?.dateApplied) ||
                                "N/A"}
                        </div>
                    </div>
                </div>
            </div>

            {/* Progress Timeline */}
            <div className="bg-white rounded-lg border border-gray-200 p-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-8">
                    Application Progress
                </h2>

                {error ? (
                    <div className="p-6 text-center">
                        <AlertCircle className="w-10 h-10 text-red-400 mx-auto mb-3" />
                        <p className="text-gray-600">
                            Failed to load application history.
                        </p>
                    </div>
                ) : stages.length === 0 ? (
                    <div className="p-6 text-center text-gray-500">
                        No history available for this application.
                    </div>
                ) : (
                    <div className="relative">
                        {/* Progress Line */}
                        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                        <div
                            className="absolute left-6 top-0 w-0.5 bg-gradient-to-b from-emerald-600 to-teal-600 transition-all"
                            style={{ height: progressPercent }}
                        ></div>

                        {/* Stages */}
                        <div className="space-y-8">
                            {stages.map((stage, index) => {
                                const isCompleted = stage.status === "completed";
                                const isCurrent = stage.status === "current";
                                const isUpcoming = stage.status === "upcoming";

                                return (
                                    <div key={stage.id} className="relative pl-16">
                                        {/* Icon */}
                                        <div
                                            className={`absolute left-0 w-12 h-12 rounded-full border-4 flex items-center justify-center ${
                                                isCompleted
                                                    ? "bg-emerald-600 border-emerald-200"
                                                    : isCurrent
                                                        ? "bg-white border-emerald-600"
                                                        : "bg-white border-gray-300"
                                            }`}
                                        >
                                            {isCompleted && (
                                                <CheckCircle className="w-6 h-6 text-white" />
                                            )}
                                            {isCurrent && (
                                                <Clock className="w-6 h-6 text-emerald-600 animate-pulse" />
                                            )}
                                            {isUpcoming && (
                                                <Circle className="w-6 h-6 text-gray-400" />
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div
                                            className={`pb-8 ${
                                                index !== stages.length - 1
                                                    ? "border-b border-gray-100"
                                                    : ""
                                            }`}
                                        >
                                            <div className="flex items-start justify-between mb-2">
                                                <h3
                                                    className={`text-lg font-semibold ${
                                                        isCompleted || isCurrent
                                                            ? "text-gray-900"
                                                            : "text-gray-500"
                                                    }`}
                                                >
                                                    {stage.name}
                                                </h3>
                                                {stage.date && (
                                                    <span
                                                        className={`text-sm ${
                                                            isCompleted || isCurrent
                                                                ? "text-emerald-600 font-medium"
                                                                : "text-gray-400"
                                                        }`}
                                                    >
                                                        {stage.date}
                                                    </span>
                                                )}
                                            </div>
                                            <p
                                                className={`text-sm ${
                                                    isCompleted || isCurrent
                                                        ? "text-gray-600"
                                                        : "text-gray-400"
                                                }`}
                                            >
                                                {stage.description}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>

            {/* Tips */}
            <div className="mt-8 bg-teal-50 border border-teal-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-teal-900 mb-3">
                    Tips for Success
                </h3>
                <ul className="space-y-2 text-sm text-teal-800">
                    <li>• Research the company culture and recent news</li>
                    <li>• Prepare examples of your past work and achievements</li>
                    <li>• Practice common interview questions</li>
                    <li>• Prepare thoughtful questions to ask the interviewer</li>
                    <li>• Test your video call setup if it is a virtual interview</li>
                </ul>
            </div>
        </div>
    );
}
