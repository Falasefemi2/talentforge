import { useState, useMemo, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  Plus,
  MapPin,
  DollarSign,
  Briefcase,
  Clock,
  MoreVertical,
  Eye,
  Pencil,
  Trash2,
  X,
  Building2,
  Globe,
  House,
  Search,
  Filter,
  RefreshCw,
  ChevronDown,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { CreateJob } from "./CreateJob";
import { Button } from "../ui/button";
import { useCreateJob, useGetJobs } from "@/api/hooks/useJob";
import { CreateJobRequest } from "@/api/types";

// âœ… Job interface with salary as number (not range string)
interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  employmentType: string;
  workType: "Remote" | "Hybrid" | "On-Site" | "Unknown";
  salary: number; // Single number, not string range
  applicants: number;
  status: "active" | "closed" | "draft" | "unknown";
  statusLabel: string;
  postedDate: string;
  type: string;
  description?: string;
}

// âœ… Filter state interface
interface JobFilters {
  search: string;
  department: string;
  workType: string;
  status: string;
  employmentType: string;
  minSalary: number | null;
  maxSalary: number | null;
}

// âœ… Format currency helper
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
};

const workTypeOptions = ["Remote", "Hybrid", "On-Site"];
const employmentTypeOptions = [
  "Full-time",
  "Part-time",
  "Contract",
  "Freelance",
  "Unknown",
];
const statusOptions = ["Active", "Draft", "Closed"];

const normalizeLabel = (value: string) => value?.toString().trim();

const getStatusKey = (value: string): Job["status"] => {
  const normalized = value.toLowerCase();
  if (normalized === "active") return "active";
  if (normalized === "draft") return "draft";
  if (normalized === "closed") return "closed";
  return "unknown";
};

// âœ… Action Dropdown Component
interface ActionDropdownProps {
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

function ActionDropdown({ onView, onEdit, onDelete }: ActionDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 hover:bg-gray-100 rounded transition-colors"
        aria-label="Job actions"
      >
        <MoreVertical className="w-5 h-5 text-gray-400" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20 animate-in fade-in slide-in-from-top-2">
            <button
              onClick={() => {
                onView();
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
            >
              <Eye className="w-4 h-4" />
              View Details
            </button>
            <button
              onClick={() => {
                onEdit();
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
            >
              <Pencil className="w-4 h-4" />
              Edit Job
            </button>
            <hr className="my-1 border-gray-100" />
            <button
              onClick={() => {
                onDelete();
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Delete Job
            </button>
          </div>
        </>
      )}
    </div>
  );
}

// âœ… View Job Modal
interface ViewJobModalProps {
  job: Job;
  onClose: () => void;
}

function ViewJobModal({ job, onClose }: ViewJobModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl max-w-full sm:max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Job Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">{job.title}</h3>
            <div className="flex items-center gap-3 mt-2">
              <Badge
                variant="outline"
                className="bg-teal-50 text-teal-700 border-teal-200"
              >
                {job.department}
              </Badge>
              <Badge
                variant="outline"
                className="bg-emerald-50 text-emerald-700 border-emerald-200"
              >
                {job.statusLabel}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-gray-600">
              <Briefcase className="w-4 h-4" />
              <span>{job.employmentType}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              {job.workType === "Remote" && <Globe className="w-4 h-4" />}
              {job.workType === "Hybrid" && <Building2 className="w-4 h-4" />}
              {job.workType === "On-Site" && <House className="w-4 h-4" />}
              <span>{job.workType}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <DollarSign className="w-4 h-4" />
              <span className="font-semibold">
                {formatCurrency(job.salary)}
              </span>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">Description</h4>
            <p className="text-gray-600 leading-relaxed">
              {job.description || "No description available for this position."}
            </p>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-500 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              Posted {job.postedDate}
            </div>
            <div className="flex items-center gap-1">
              <Briefcase className="w-4 h-4" />
              {job.applicants} applicants
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50 rounded-b-xl">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button
            onClick={() => {
              onClose();
            }}
          >
            Edit Job
          </Button>
        </div>
      </div>
    </div>
  );
}

// âœ… Edit Job Modal
interface EditJobModalProps {
  job: Job;
  onClose: () => void;
  onSave: (updatedJob: Job) => void;
}

function EditJobModal({ job, onClose, onSave }: EditJobModalProps) {
  const [formData, setFormData] = useState<Job>(job);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl max-w-full sm:max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Edit Job</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Department
              </label>
              <input
                type="text"
                value={formData.department}
                onChange={(e) =>
                  setFormData({ ...formData, department: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Work Type
              </label>
              <select
                value={formData.workType}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    workType: e.target.value as Job["workType"],
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
              >
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="On-Site">On-Site</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Salary (USD)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  $
                </span>
                <input
                  type="number"
                  min="0"
                  step="1000"
                  value={formData.salary}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      salary: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                  placeholder="e.g., 120000"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Employment Type
              </label>
              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    type: e.target.value as Job["type"],
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Freelance">Freelance</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.value as Job["status"],
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
              >
                <option value="active">Active</option>
                <option value="draft">Draft</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={formData.description || ""}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
              placeholder="Add job description..."
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

// âœ… Delete Confirmation Modal
interface DeleteJobModalProps {
  job: Job;
  onClose: () => void;
  onConfirm: () => void;
}

function DeleteJobModal({ job, onClose, onConfirm }: DeleteJobModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl max-w-full sm:max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
              <Trash2 className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Delete Job?
              </h3>
              <p className="text-gray-600 text-sm">
                This action cannot be undone.
              </p>
            </div>
          </div>
          <p className="text-gray-700 mb-6">
            Are you sure you want to delete <strong>"{job.title}"</strong>? All
            associated data and applications will be permanently removed.
          </p>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={onConfirm}>
              Delete Job
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// âœ… Filter Panel Component
interface FilterPanelProps {
  filters: JobFilters;
  onFilterChange: (filters: JobFilters) => void;
  onReset: () => void;
  departments: string[];
  activeFilterCount: number;
}

function FilterPanel({
  filters,
  onFilterChange,
  onReset,
  departments,
  activeFilterCount,
}: FilterPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleChange = (
    key: keyof JobFilters,
    value: string | number | null,
  ) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
      {/* Filter Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <span className="font-medium text-gray-700">Filters</span>
          {activeFilterCount > 0 && (
            <Badge variant="secondary" className="text-xs">
              {activeFilterCount} active
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          {activeFilterCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onReset}
              className="text-xs h-8"
            >
              <RefreshCw className="w-3 h-3 mr-1" />
              Reset
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs h-8"
          >
            {isExpanded ? "Hide" : "Show"} Filters
            <ChevronDown
              className={`w-3 h-3 ml-1 transition-transform ${isExpanded ? "rotate-180" : ""}`}
            />
          </Button>
        </div>
      </div>

      {/* Search Bar - Always Visible */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search jobs by title, department, or location..."
          value={filters.search}
          onChange={(e) => handleChange("search", e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm"
        />
      </div>

      {/* Advanced Filters - Expandable */}
      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-gray-100">
          {/* Department Filter */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Department
            </label>
            <select
              value={filters.department}
              onChange={(e) => handleChange("department", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500"
            >
              <option value="">All Departments</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          {/* Work Type Filter */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Work Type
            </label>
            <select
              value={filters.workType}
              onChange={(e) => handleChange("workType", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500"
            >
              <option value="">All Types</option>
              {workTypeOptions.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Status
            </label>
            <select
              value={filters.status}
              onChange={(e) => handleChange("status", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500"
            >
              <option value="">All Statuses</option>
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          {/* Employment Type Filter */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Employment
            </label>
            <select
              value={filters.employmentType}
              onChange={(e) => handleChange("employmentType", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500"
            >
              <option value="">All Types</option>
              {employmentTypeOptions.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Salary Range Filter */}
          <div className="md:col-span-2 lg:col-span-4">
            <label className="block text-xs font-medium text-gray-500 mb-2">
              Salary Range (USD)
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-xs text-gray-400">Min</span>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                    $
                  </span>
                  <input
                    type="number"
                    min="0"
                    step="1000"
                    placeholder="0"
                    value={filters.minSalary ?? ""}
                    onChange={(e) =>
                      handleChange(
                        "minSalary",
                        e.target.value ? parseFloat(e.target.value) : null,
                      )
                    }
                    className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>
              <div>
                <span className="text-xs text-gray-400">Max</span>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                    $
                  </span>
                  <input
                    type="number"
                    min="0"
                    step="1000"
                    placeholder="No limit"
                    value={filters.maxSalary ?? ""}
                    onChange={(e) =>
                      handleChange(
                        "maxSalary",
                        e.target.value ? parseFloat(e.target.value) : null,
                      )
                    }
                    className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Active Filter Tags */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
          {filters.search && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Search: "{filters.search}"
              <button
                onClick={() => handleChange("search", "")}
                className="hover:text-red-500"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
          {filters.department && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Dept: {filters.department}
              <button
                onClick={() => handleChange("department", "")}
                className="hover:text-red-500"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
          {filters.workType && (
            <Badge variant="secondary" className="flex items-center gap-1">
              {filters.workType}
              <button
                onClick={() => handleChange("workType", "")}
                className="hover:text-red-500"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
          {filters.status && (
            <Badge variant="secondary" className="flex items-center gap-1">
              {filters.status}
              <button
                onClick={() => handleChange("status", "")}
                className="hover:text-red-500"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
          {filters.employmentType && (
            <Badge variant="secondary" className="flex items-center gap-1">
              {filters.employmentType}
              <button
                onClick={() => handleChange("employmentType", "")}
                className="hover:text-red-500"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
          {(filters.minSalary || filters.maxSalary) && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Salary:{" "}
              {filters.minSalary ? formatCurrency(filters.minSalary) : "$0"} -{" "}
              {filters.maxSalary
                ? formatCurrency(filters.maxSalary)
                : "No limit"}
              <button
                onClick={() => {
                  handleChange("minSalary", null);
                  handleChange("maxSalary", null);
                }}
                className="hover:text-red-500"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}

// âœ… Main Component
export function JobPostings() {
  const queryClient = useQueryClient();
  const { mutateAsync: createJob } = useCreateJob();
  const [showCreateJob, setShowCreateJob] = useState(false);
  const [viewingJob, setViewingJob] = useState<Job | null>(null);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [deletingJob, setDeletingJob] = useState<Job | null>(null);

  // âœ… Filter state
  const [filters, setFilters] = useState<JobFilters>({
    search: "",
    department: "",
    workType: "",
    status: "",
    employmentType: "",
    minSalary: null,
    maxSalary: null,
  });

  const jobsParams = useMemo(
    () => ({
      title: filters.search || undefined,
      department: filters.department || undefined,
      pageNumber: 1,
      pageSize: 100,
    }),
    [filters.search, filters.department],
  );

  const { data: jobsResponse, isLoading, error } = useGetJobs(jobsParams);
  const apiJobs =
    (jobsResponse as any)?.data?.items ??
    (jobsResponse as any)?.items ??
    [];

  const jobs = useMemo(() => {
    return (apiJobs as any[]).map((job, index) => {
      const statusLabel = normalizeLabel(job?.status ?? "Unknown");
      const workType = normalizeLabel(job?.type ?? "Unknown");
      const employmentType = normalizeLabel(job?.employmentType ?? "Unknown");

      return {
        id: String(job?.id ?? `${job?.title ?? "job"}-${index}`),
        title: job?.title ?? "Untitled Job",
        department: job?.department ?? "Unknown",
        location: job?.location ?? "Unknown",
        employmentType,
        workType: workType as Job["workType"],
        salary: job?.paymentAmount ?? 0,
        applicants: job?.applicantsNo ?? 0,
        status: getStatusKey(statusLabel),
        statusLabel,
        postedDate: "N/A",
        description: job?.description ?? "",
        type: job?.type ?? "Unknown",
      } satisfies Job;
    });
  }, [apiJobs]);

  // âœ… Get unique departments for filter dropdown
  const departments = useMemo(
    () => [...new Set(jobs.map((job) => job.department))].sort(),
    [jobs],
  );

  // âœ… Count active filters
  const activeFilterCount = useMemo(() => {
    return Object.values(filters).filter(
      (v) => v !== "" && v !== null && v !== undefined,
    ).length;
  }, [filters]);

  // âœ… Filter jobs based on criteria
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // Search filter (title, department, location)
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch =
          job.title.toLowerCase().includes(searchLower) ||
          job.department.toLowerCase().includes(searchLower) ||
          job.location.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      // Department filter
      if (filters.department && job.department !== filters.department) {
        return false;
      }

      // Work type filter
      if (filters.workType && job.workType !== filters.workType) {
        return false;
      }

      // Status filter
      if (filters.status && job.statusLabel !== filters.status) {
        return false;
      }

      // Employment type filter
      if (filters.employmentType && job.employmentType !== filters.employmentType) {
        return false;
      }

      // Salary range filter
      if (filters.minSalary !== null && job.salary < filters.minSalary) {
        return false;
      }
      if (filters.maxSalary !== null && job.salary > filters.maxSalary) {
        return false;
      }

      return true;
    });
  }, [jobs, filters]);

  // âœ… Handlers
  const handleFilterChange = useCallback((newFilters: JobFilters) => {
    setFilters(newFilters);
  }, []);

  const handleResetFilters = useCallback(() => {
    setFilters({
      search: "",
      department: "",
      workType: "",
      status: "",
      employmentType: "",
      minSalary: null,
      maxSalary: null,
    });
  }, []);

  const handleJobCreated = async (payload: CreateJobRequest) => {
    const response = await createJob(payload);
    const created = (response as any)?.data ?? response;

    queryClient.setQueriesData({ queryKey: ["jobs"] }, (old: any) => {
      if (!old) return old;
      const items = old?.data?.items ?? old?.items;
      if (!Array.isArray(items)) return old;
      const createdId =
        created?.id ??
        `${created?.title ?? "job"}-${created?.department ?? "dept"}`;
      const exists = items.some((item: any) => {
        const itemId =
          item?.id ?? `${item?.title ?? "job"}-${item?.department ?? "dept"}`;
        return String(itemId) === String(createdId);
      });
      if (exists) return old;
      const nextItems = [{ ...created, id: createdId }, ...items];
      if (old?.data?.items) {
        return { ...old, data: { ...old.data, items: nextItems } };
      }
      if (old?.items) {
        return { ...old, items: nextItems };
      }
      return old;
    });

    queryClient.invalidateQueries({ queryKey: ["jobs"] });
    setShowCreateJob(false);
  };

  const handleEditJob = (updatedJob: Job) => {
    // In real app: call API to update
    console.log("Job updated:", updatedJob);
  };

  const handleDeleteJob = () => {
    if (deletingJob) {
      // In real app: call API to delete
      console.log("Job deleted:", deletingJob.id);
      setDeletingJob(null);
    }
  };

  const getWorkTypeIcon = (type: Job["workType"]) => {
    switch (type) {
      case "Remote":
        return <Globe className="w-4 h-4 text-teal-500" />;
      case "Hybrid":
        return <Building2 className="w-4 h-4 text-teal-500" />;
      case "On-Site":
        return <House className="w-4 h-4 text-orange-500" />;
      default:
        return <Building2 className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            Job Postings
          </h1>
          <p className="text-gray-600">
            Manage and track all your job openings.
          </p>
        </div>
        <button
          onClick={() => setShowCreateJob(true)}
          className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-6 py-3 rounded-lg flex items-center gap-2 transition-colors font-semibold"
        >
          <Plus className="w-5 h-5" />
          Post New Job
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="text-sm text-gray-500 mb-2">TOTAL JOBS</div>
          <div className="text-3xl font-semibold text-gray-900">
            {jobs.length}
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="text-sm text-gray-500 mb-2">ACTIVE</div>
          <div className="text-3xl font-semibold text-emerald-600">
            {jobs.filter((j) => j.status === "active").length}
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="text-sm text-gray-500 mb-2">TOTAL APPLICANTS</div>
          <div className="text-3xl font-semibold text-gray-900">
            {jobs.reduce((sum, job) => sum + job.applicants, 0)}
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="text-sm text-gray-500 mb-2">DRAFT</div>
          <div className="text-3xl font-semibold text-gray-600">
            {jobs.filter((j) => j.status === "draft").length}
          </div>
        </div>
      </div>

      {/* âœ… Filter Panel */}
      <FilterPanel
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleResetFilters}
        departments={departments}
        activeFilterCount={activeFilterCount}
      />

      {/* Results Count */}
      <div className="mb-4 text-sm text-gray-600">
        Showing <span className="font-medium">{filteredJobs.length}</span> of{" "}
        <span className="font-medium">{jobs.length}</span> jobs
        {activeFilterCount > 0 && <span> (filtered)</span>}
      </div>

      {/* Jobs List */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                  Job Title
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                  Department
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                  Location
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                  Salary
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                  Applicants
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                  Posted
                </th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td
                    colSpan={9}
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    Loading jobs...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td
                    colSpan={9}
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    Failed to load jobs. Please try again.
                  </td>
                </tr>
              ) : filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <tr key={job.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">
                        {job.title}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                        <Briefcase className="w-3 h-3" />
                        {job.employmentType}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {job.department}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getWorkTypeIcon(job.workType)}
                        <Badge
                          variant="outline"
                          className={`text-xs font-medium ${job.workType === "Remote"
                            ? "bg-teal-50 text-teal-700 border-teal-200"
                            : job.workType === "Hybrid"
                              ? "bg-green-50 text-green-700 border-green-200"
                              : "bg-orange-50 text-orange-700 border-orange-200"
                            }`}
                        >
                          {job.workType}
                        </Badge>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-sm text-gray-600 font-medium">
                        <DollarSign className="w-4 h-4" />
                        {formatCurrency(job.salary)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center justify-center px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-medium">
                        {job.applicants}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        variant={
                          job.status === "active" ? "default" : "secondary"
                        }
                        className={
                          job.status === "active"
                            ? "bg-emerald-100 text-emerald-700 border-0"
                            : "bg-gray-100 text-gray-600 border-0"
                        }
                      >
                        {job.statusLabel}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Clock className="w-3 h-3" />
                        {job.postedDate}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <ActionDropdown
                        onView={() => setViewingJob(job)}
                        onEdit={() => setEditingJob(job)}
                        onDelete={() => setDeletingJob(job)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={9}
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    <div className="flex flex-col items-center gap-3">
                      <Search className="w-8 h-8 text-gray-300" />
                      <p className="font-medium">No jobs match your filters</p>
                      <p className="text-sm">
                        Try adjusting your search criteria or reset filters
                      </p>
                      {activeFilterCount > 0 && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleResetFilters}
                        >
                          <RefreshCw className="w-3 h-3 mr-1" />
                          Reset Filters
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      {viewingJob && (
        <ViewJobModal job={viewingJob} onClose={() => setViewingJob(null)} />
      )}
      {editingJob && (
        <EditJobModal
          job={editingJob}
          onClose={() => setEditingJob(null)}
          onSave={handleEditJob}
        />
      )}
      {deletingJob && (
        <DeleteJobModal
          job={deletingJob}
          onClose={() => setDeletingJob(null)}
          onConfirm={handleDeleteJob}
        />
      )}
      {showCreateJob && (
        <CreateJob
          onClose={() => setShowCreateJob(false)}
          onJobCreated={handleJobCreated}
        />
      )}
    </div>
  );
}




