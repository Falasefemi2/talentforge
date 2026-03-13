import { useMemo, useState } from "react";
import { MapPin, DollarSign, Briefcase, Clock, Search, Filter } from "lucide-react";
import { Badge } from "../../ui/badge";
import { useGetJobs } from "@/api/hooks/useJob";

interface BrowseJob {
    id: string;
    title: string;
    department: string;
    location: string;
    status: string;
    type: string;
    paymentAmount: number;
    applicantsNo: number;
    description?: string;
}

export function BrowseJobs() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedType, setSelectedType] = useState("all");

    const { data: jobsData, isLoading, error } = useGetJobs({
        title: searchQuery || undefined,
        department: selectedCategory === "all" ? undefined : selectedCategory,
        pageNumber: 1,
        pageSize: 50,
    });

    const rawItems =
        (jobsData as any)?.data?.items ?? (jobsData as any)?.items ?? [];

    const jobs: BrowseJob[] = useMemo(() => {
        return (rawItems as any[]).map((job, index) => ({
            id: String(job?.id ?? `${job?.title ?? "job"}-${index}`),
            title: job?.title ?? "Untitled Job",
            department: job?.department ?? "Unknown",
            location: job?.location ?? "Unknown",
            status: job?.status ?? "Unknown",
            type: job?.type ?? "Unknown",
            paymentAmount: job?.paymentAmount ?? 0,
            applicantsNo: job?.applicantsNo ?? 0,
            description: job?.description ?? "No description provided.",
        }));
    }, [rawItems]);

    const categories = useMemo(() => {
        const unique = new Set(jobs.map((job) => job.department));
        return ["all", ...Array.from(unique).sort()];
    }, [jobs]);

    const workTypes = ["all", "Remote", "Hybrid", "On-Site"]; 

    const filteredJobs = jobs.filter((job) => {
        const matchesSearch =
            job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.location.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory =
            selectedCategory === "all" || job.department === selectedCategory;
        const matchesType = selectedType === "all" || job.type === selectedType;
        return matchesSearch && matchesCategory && matchesType;
    });

    if (isLoading) {
        return (
            <div className="p-8">
                <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-teal-600 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
                        <Search className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-gray-600">Loading jobs...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-8">
                <div className="text-center">
                    <Filter className="w-12 h-12 text-red-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Error loading jobs</h3>
                    <p className="text-gray-600">Please try again later</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-semibold text-gray-900 mb-2">Browse Jobs</h1>
                <p className="text-gray-600">Find your next opportunity from {filteredJobs.length} available positions.</p>
            </div>

            {/* Search and Filters */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                <div className="grid grid-cols-3 gap-4">
                    {/* Search */}
                    <div className="col-span-3 md:col-span-1">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search jobs or companies..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            />
                        </div>
                    </div>

                    {/* Category Filter */}
                    <div>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat === "all" ? "All Categories" : cat}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Type Filter */}
                    <div>
                        <select
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                            {workTypes.map((type) => (
                                <option key={type} value={type}>
                                    {type === "all" ? "All Work Types" : type}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Results Count */}
            <div className="mb-4">
                <p className="text-sm text-gray-600">
                    Showing <span className="font-semibold text-emerald-600">{filteredJobs.length}</span> job
                    {filteredJobs.length !== 1 ? "s" : ""}
                </p>
            </div>

            {/* Jobs List */}
            <div className="space-y-4">
                {filteredJobs.map((job) => (
                    <div
                        key={job.id}
                        className="bg-white rounded-lg border border-gray-200 p-6 hover:border-emerald-500 hover:shadow-md transition-all"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <h3 className="text-xl font-semibold text-gray-900 mb-1">{job.title}</h3>
                                <p className="text-gray-600 font-medium mb-3">{job.department}</p>
                                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                    <div className="flex items-center gap-1">
                                        <MapPin className="w-4 h-4 text-emerald-600" />
                                        <span>{job.location}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Briefcase className="w-4 h-4 text-emerald-600" />
                                        <span>{job.status}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <DollarSign className="w-4 h-4 text-emerald-600" />
                                        <span>${job.paymentAmount}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-4 h-4 text-gray-400" />
                                        <span>{job.type}</span>
                                    </div>
                                </div>
                            </div>
                            <Badge className="bg-teal-100 text-teal-700 border-0">{job.department}</Badge>
                        </div>

                        <p className="text-gray-700 mb-4">{job.description}</p>

                        <div className="flex gap-3">
                            <button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-6 py-2 rounded-lg font-medium transition-all">
                                Apply Now
                            </button>
                            <button className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2 rounded-lg font-medium transition-all">
                                Save Job
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {filteredJobs.length === 0 && (
                <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                    <Filter className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No jobs found</h3>
                    <p className="text-gray-600">Try adjusting your search or filters</p>
                </div>
            )}
        </div>
    );
}
