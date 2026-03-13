import {
    Briefcase,
    FileText,
    Calendar,
    CheckCircle,
    Clock,
    XCircle,
} from "lucide-react";
import { Badge } from "../../ui/badge";

export function ApplicantOverview() {
    const stats = [
        {
            label: "APPLICATIONS SENT",
            value: "8",
            icon: FileText,
            color: "text-teal-600",
        },
        { label: "IN REVIEW", value: "4", icon: Clock, color: "text-amber-600" },
        {
            label: "INTERVIEWS SCHEDULED",
            value: "2",
            icon: Calendar,
            color: "text-emerald-600",
        },
        {
            label: "OFFERS RECEIVED",
            value: "1",
            icon: CheckCircle,
            color: "text-green-600",
        },
    ];

    const recentApplications = [
        {
            id: 1,
            position: "Senior Frontend Developer",
            company: "TechCorp Inc.",
            appliedDate: "2 days ago",
            status: "In Review",
            statusColor: "bg-amber-100 text-amber-700",
        },
        {
            id: 2,
            position: "React Developer",
            company: "StartupXYZ",
            appliedDate: "5 days ago",
            status: "Interview Scheduled",
            statusColor: "bg-emerald-100 text-emerald-700",
        },
        {
            id: 3,
            position: "Full Stack Engineer",
            company: "Innovation Labs",
            appliedDate: "1 week ago",
            status: "Offer Received",
            statusColor: "bg-green-100 text-green-700",
        },
    ];

    const upcomingInterviews = [
        {
            id: 1,
            position: "React Developer",
            company: "StartupXYZ",
            date: "Tomorrow",
            time: "2:00 PM",
            type: "Technical Interview",
        },
        {
            id: 2,
            position: "Senior Frontend Developer",
            company: "TechCorp Inc.",
            date: "Next Week",
            time: "10:00 AM",
            type: "HR Round",
        },
    ];

    return (
        <div className="p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-semibold text-gray-900 mb-2">
                    Welcome Back!
                </h1>
                <p className="text-gray-600">
                    Here's an overview of your job search progress.
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div
                            key={stat.label}
                            className="bg-white rounded-lg p-6 border border-gray-200"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <div className="text-sm text-gray-500">{stat.label}</div>
                                <Icon className={`w-5 h-5 ${stat.color}`} />
                            </div>
                            <div className={`text-4xl font-semibold ${stat.color}`}>
                                {stat.value}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-2 gap-6">
                {/* Recent Applications */}
                <div className="bg-white rounded-lg border border-gray-200">
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900">
                            Recent Applications
                        </h2>
                    </div>
                    <div className="p-6 space-y-4">
                        {recentApplications.map((app) => (
                            <div
                                key={app.id}
                                className="border border-gray-200 rounded-lg p-4 hover:border-teal-300 transition-colors"
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <div>
                                        <h3 className="font-semibold text-gray-900">
                                            {app.position}
                                        </h3>
                                        <p className="text-sm text-gray-600">{app.company}</p>
                                    </div>
                                    <Badge className={`${app.statusColor} border-0`}>
                                        {app.status}
                                    </Badge>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <Clock className="w-4 h-4" />
                                    <span>Applied {app.appliedDate}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Upcoming Interviews */}
                <div className="bg-white rounded-lg border border-gray-200">
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900">
                            Upcoming Interviews
                        </h2>
                    </div>
                    <div className="p-6 space-y-4">
                        {upcomingInterviews.map((interview) => (
                            <div
                                key={interview.id}
                                className="border-l-4 border-emerald-600 bg-emerald-50 rounded-lg p-4"
                            >
                                <h3 className="font-semibold text-gray-900 mb-1">
                                    {interview.position}
                                </h3>
                                <p className="text-sm text-gray-600 mb-3">
                                    {interview.company}
                                </p>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-sm text-gray-700">
                                        <Calendar className="w-4 h-4 text-emerald-600" />
                                        <span>
                                            {interview.date} at {interview.time}
                                        </span>
                                    </div>
                                    <Badge className="bg-emerald-100 text-emerald-700 border-0">
                                        {interview.type}
                                    </Badge>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 grid grid-cols-3 gap-6">
                <button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-6 py-4 rounded-lg font-medium shadow-lg transition-all">
                    Browse Available Jobs
                </button>
                <button className="bg-white border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-6 py-4 rounded-lg font-medium transition-all">
                    Update Profile
                </button>
                <button className="bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-emerald-900 px-6 py-4 rounded-lg font-medium shadow-lg transition-all">
                    View All Applications
                </button>
            </div>
        </div>
    );
}
