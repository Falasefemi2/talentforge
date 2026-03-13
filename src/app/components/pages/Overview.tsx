import { Clock, Calendar as CalendarIcon, Video, Mail } from "lucide-react";
import { Badge } from "../ui/badge";

export function Overview() {
  const stats = [
    { label: "ACTIVE JOBS", value: "12" },
    { label: "TOTAL CANDIDATES", value: "148" },
    { label: "INTERVIEWS TODAY", value: "4", color: "text-orange-500" },
  ];

  const appliedCandidates = [
    {
      id: 1,
      name: "Michael Chen",
      position: "Senior .NET Developer",
      score: 92,
      skills: ["C#", "Azure"],
      scoreColor: "bg-indigo-100 text-indigo-700",
    },
    {
      id: 2,
      name: "Sarah Jones",
      position: "UX Designer",
      score: 65,
      skills: ["Figma", "UI/UX"],
      scoreColor: "bg-orange-100 text-orange-700",
    },
  ];

  const interviewCandidates = [
    {
      id: 1,
      name: "David Kim",
      position: "Tech Lead",
      time: "Today, 2:00 PM",
    },
  ];

  const offerSentCandidates = [
    {
      id: 1,
      name: "Elena Rodriguez",
      position: "Product Manager",
      status: "Pending Acceptance",
    },
  ];

  const upcomingInterviews = [
    {
      id: 1,
      date: "OCT 24",
      title: "Technical Screen - Backend Role",
      candidate: "David Kim",
      interviewer: "You",
    },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            Recruitment Hub
          </h1>
          <p className="text-gray-600">
            Manage pipeline, screen candidates, and schedule interviews.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-lg p-6 border border-gray-200"
          >
            <div className="text-sm text-gray-500 mb-2">{stat.label}</div>
            <div
              className={`text-4xl font-semibold ${stat.color || "text-gray-900"}`}
            >
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* Pipeline Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Applied */}
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <div className="flex items-center gap-2 mb-6">
            <h3 className="font-semibold text-gray-900">Applied</h3>
            <Badge
              variant="secondary"
              className="bg-gray-200 text-gray-700 rounded-full"
            >
              12
            </Badge>
          </div>
          <div className="space-y-4">
            {appliedCandidates.map((candidate) => (
              <div
                key={candidate.id}
                className="bg-white rounded-lg p-4 border border-gray-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {candidate.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {candidate.position}
                    </p>
                  </div>
                  <Badge
                    className={`${candidate.scoreColor} border-0 rounded-md`}
                  >
                    👍 {candidate.score}%
                  </Badge>
                </div>
                <div className="flex gap-2">
                  {candidate.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 bg-gray-100 text-xs text-gray-700 rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interview */}
        <div className="bg-violet-50 rounded-lg p-6 border border-violet-200">
          <div className="flex items-center gap-2 mb-6">
            <h3 className="font-semibold text-gray-900">Interview</h3>
            <Badge
              variant="secondary"
              className="bg-violet-200 text-violet-700 rounded-full"
            >
              4
            </Badge>
          </div>
          <div className="space-y-4">
            {interviewCandidates.map((candidate) => (
              <div
                key={candidate.id}
                className="bg-white rounded-lg p-4 border-l-4 border-indigo-600"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {candidate.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {candidate.position}
                    </p>
                  </div>
                  <Clock className="w-4 h-4 text-gray-400" />
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CalendarIcon className="w-4 h-4 text-indigo-600" />
                  <span>{candidate.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Offer Sent */}
        <div className="bg-emerald-50 rounded-lg p-6 border border-emerald-200">
          <div className="flex items-center gap-2 mb-6">
            <h3 className="font-semibold text-gray-900">Offer Sent</h3>
            <Badge
              variant="secondary"
              className="bg-emerald-200 text-emerald-700 rounded-full"
            >
              2
            </Badge>
          </div>
          <div className="space-y-4">
            {offerSentCandidates.map((candidate) => (
              <div
                key={candidate.id}
                className="bg-white rounded-lg p-4 border border-gray-200"
              >
                <h4 className="font-medium text-gray-900 mb-1">
                  {candidate.name}
                </h4>
                <p className="text-sm text-gray-600 mb-3">
                  {candidate.position}
                </p>
                <p className="text-xs text-emerald-600">{candidate.status}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Interviews */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            Upcoming Interviews
          </h2>
          <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
            View Calendar
          </button>
        </div>
        <div className="p-6">
          {upcomingInterviews.map((interview) => (
            <div key={interview.id} className="flex items-start gap-6">
              <div className="text-center">
                <div className="text-sm text-indigo-600 font-medium">
                  {interview.date.split(" ")[0]}
                </div>
                <div className="text-2xl font-semibold text-indigo-600">
                  {interview.date.split(" ")[1]}
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">
                  {interview.title}
                </h3>
                <p className="text-sm text-gray-600">
                  Candidate: {interview.candidate} • Interviewer:{" "}
                  {interview.interviewer}
                </p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <Video className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <Mail className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
