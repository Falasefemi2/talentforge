import { useState, useMemo } from "react";
import { Mail, Phone, MapPin, Star, Download } from "lucide-react";
import { Badge } from "../ui/badge";

interface Candidate {
  id: number;
  name: string;
  email: string;
  phone: string;
  position: string;
  location: string;
  experience: string;
  score: number;
  status: "applied" | "screening" | "interview" | "offer" | "rejected";
  skills: string[];
  appliedDate: string;
}

interface CandidatesProps {
  searchQuery: string;
}

export function Candidates({ searchQuery }: CandidatesProps) {
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  const candidates: Candidate[] = [
    {
      id: 1,
      name: "Michael Chen",
      email: "michael.chen@email.com",
      phone: "+1 (555) 123-4567",
      position: "Senior .NET Developer",
      location: "Seattle, WA",
      experience: "8 years",
      score: 92,
      status: "applied",
      skills: ["C#", "Azure", ".NET Core", "SQL"],
      appliedDate: "2024-02-08",
    },
    {
      id: 2,
      name: "Sarah Jones",
      email: "sarah.jones@email.com",
      phone: "+1 (555) 234-5678",
      position: "UX Designer",
      location: "New York, NY",
      experience: "5 years",
      score: 65,
      status: "screening",
      skills: ["Figma", "UI/UX", "Prototyping", "User Research"],
      appliedDate: "2024-02-07",
    },
    {
      id: 3,
      name: "David Kim",
      email: "david.kim@email.com",
      phone: "+1 (555) 345-6789",
      position: "Tech Lead",
      location: "San Francisco, CA",
      experience: "10 years",
      score: 88,
      status: "interview",
      skills: ["React", "Node.js", "AWS", "Team Leadership"],
      appliedDate: "2024-02-06",
    },
    {
      id: 4,
      name: "Elena Rodriguez",
      email: "elena.rodriguez@email.com",
      phone: "+1 (555) 456-7890",
      position: "Product Manager",
      location: "Austin, TX",
      experience: "7 years",
      score: 85,
      status: "offer",
      skills: ["Product Strategy", "Agile", "Analytics", "Roadmapping"],
      appliedDate: "2024-02-05",
    },
    {
      id: 5,
      name: "James Wilson",
      email: "james.wilson@email.com",
      phone: "+1 (555) 567-8901",
      position: "Backend Developer",
      location: "Boston, MA",
      experience: "4 years",
      score: 72,
      status: "applied",
      skills: ["Python", "Django", "PostgreSQL", "Docker"],
      appliedDate: "2024-02-09",
    },
  ];

  const filteredCandidates = useMemo(() => {
    let filtered = candidates;

    if (selectedStatus !== "all") {
      filtered = filtered.filter((c) => c.status === selectedStatus);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.name.toLowerCase().includes(query) ||
          c.position.toLowerCase().includes(query) ||
          c.email.toLowerCase().includes(query) ||
          c.skills.some((s) => s.toLowerCase().includes(query)),
      );
    }

    return filtered;
  }, [selectedStatus, searchQuery]);

  const statusCounts = {
    all: candidates.length,
    applied: candidates.filter((c) => c.status === "applied").length,
    screening: candidates.filter((c) => c.status === "screening").length,
    interview: candidates.filter((c) => c.status === "interview").length,
    offer: candidates.filter((c) => c.status === "offer").length,
    rejected: candidates.filter((c) => c.status === "rejected").length,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "applied":
        return "bg-teal-100 text-teal-700";
      case "screening":
        return "bg-purple-100 text-purple-700";
      case "interview":
        return "bg-teal-100 text-teal-700";
      case "offer":
        return "bg-emerald-100 text-emerald-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-600";
    if (score >= 60) return "text-orange-600";
    return "text-red-600";
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            Candidates
          </h1>
          <p className="text-gray-600">
            Review and manage candidate applications.
          </p>
        </div>
        <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors">
          <Download className="w-5 h-5" />
          Export List
        </button>
      </div>

      {/* Status Filter */}
      <div className="flex gap-4 mb-6 overflow-x-auto pb-2">
        {Object.entries(statusCounts).map(([status, count]) => (
          <button
            key={status}
            onClick={() => setSelectedStatus(status)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
              selectedStatus === status
                ? "bg-teal-600 text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)} ({count})
          </button>
        ))}
      </div>

      {/* Candidates Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCandidates.map((candidate) => (
          <div
            key={candidate.id}
            className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 font-semibold">
                  {candidate.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">
                    {candidate.name}
                  </h3>
                  <p className="text-gray-600">{candidate.position}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Star
                  className={`w-5 h-5 ${getScoreColor(candidate.score)}`}
                  fill="currentColor"
                />
                <span
                  className={`font-semibold ${getScoreColor(candidate.score)}`}
                >
                  {candidate.score}%
                </span>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="w-4 h-4" />
                {candidate.email}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                {candidate.phone}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                {candidate.location} • {candidate.experience} experience
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {candidate.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <Badge className={`${getStatusColor(candidate.status)} border-0`}>
                {candidate.status}
              </Badge>
              <div className="flex gap-2">
                <button className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                  View Profile
                </button>
                <button className="px-4 py-2 text-sm bg-teal-600 text-white hover:bg-teal-700 rounded-lg transition-colors">
                  Schedule Interview
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCandidates.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">
            No candidates found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
}
