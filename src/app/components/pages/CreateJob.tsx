import { useState } from "react";
import { X, Briefcase } from "lucide-react";
import { CreateJobRequest } from "@/api/types";
// Supabase usage disabled - credentials import commented out.
// import { projectId, publicAnonKey } from "/utils/supabase/info";

interface CreateJobProps {
  onClose: () => void;
  onJobCreated: (payload: CreateJobRequest) => Promise<void> | void;
}

export function CreateJob({ onClose, onJobCreated }: CreateJobProps) {
  const [formData, setFormData] = useState({
    title: "",
    department: "",
    description: "",
    location: "",
    employmentType: 0,
    status: 0,
    skills: "",
    experienceLevel: 0,
    type: 0,
    paymentAmount: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const workTypes = [
    { label: "Remote", value: 0 },
    { label: "Hybrid", value: 1 },
    { label: "On-site", value: 2 },
  ];

  const employmentTypes = [
    { label: "Full-time", value: 0 },
    { label: "Part-time", value: 1 },
    { label: "Contract", value: 2 },
    { label: "Freelance", value: 3 },
  ];

  const statusOptions = [
    { label: "Active", value: 0 },
    { label: "Draft", value: 1 },
    { label: "Closed", value: 2 },
  ];

  const experienceLevels = [
    { label: "Entry Level", value: 0 },
    { label: "Mid Level", value: 1 },
    { label: "Senior Level", value: 2 },
    { label: "Lead/Principal", value: 3 },
    { label: "Executive", value: 4 },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const payload: CreateJobRequest = {
        title: formData.title,
        department: formData.department,
        description: formData.description,
        location: formData.location,
        employmentType: formData.employmentType,
        status: formData.status,
        skills: formData.skills,
        experienceLevel: formData.experienceLevel,
        type: formData.type,
        paymentAmount: formData.paymentAmount,
      };

      await onJobCreated(payload);
    } catch (err: any) {
      console.error("Error creating job:", err);
      setError(err.message || "Failed to create job. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const numericFields = new Set([
      "employmentType",
      "status",
      "experienceLevel",
      "type",
      "paymentAmount",
    ]);

    setFormData({
      ...formData,
      [e.target.name]: numericFields.has(e.target.name)
        ? parseFloat(e.target.value) || 0
        : e.target.value,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-teal-600 to-green-600 rounded-xl flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Create New Job
              </h2>
              <p className="text-gray-600 text-sm">Fill in the details below</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Job Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="e.g., Senior React Developer"
            />
          </div>

          {/* Department */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Department <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="e.g., Engineering"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="e.g., Lagos, Nigeria"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
              placeholder="Describe the role, responsibilities, requirements, and qualifications..."
            />
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Skills <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="e.g., React, TypeScript, Node.js"
            />
          </div>

          {/* Work Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Work Type <span className="text-red-500">*</span>
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              {workTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Payment Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Amount <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="0"
              step="100"
              name="paymentAmount"
              value={formData.paymentAmount}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="e.g., 120000"
            />
          </div>

          {/* Employment Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Employment Type <span className="text-red-500">*</span>
            </label>
            <select
              name="employmentType"
              value={formData.employmentType}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              {employmentTypes.map((empType) => (
                <option key={empType.value} value={empType.value}>
                  {empType.label}
                </option>
              ))}
            </select>
          </div>

          {/* Experience Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Experience Level <span className="text-red-500">*</span>
            </label>
            <select
              name="experienceLevel"
              value={formData.experienceLevel}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              {experienceLevels.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status <span className="text-red-500">*</span>
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              {statusOptions.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-yellow-400 text-gray-900 rounded-lg hover:shadow-lg hover:bg-yellow-500 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating..." : "Create Job"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
