import { Brain, TrendingUp, Users, Award, ChevronRight } from "lucide-react";
import { Badge } from "../ui/badge";

export function AIScreening() {
  const screeningResults = [
    {
      id: 1,
      name: "Michael Chen",
      position: "Senior .NET Developer",
      overallScore: 92,
      technicalScore: 95,
      experienceScore: 90,
      culturalFitScore: 88,
      recommendation: "Strong Match",
      highlights: [
        "8+ years of .NET development",
        "Extensive Azure cloud experience",
        "Led multiple enterprise projects",
        "Strong communication skills",
      ],
    },
    {
      id: 2,
      name: "David Kim",
      position: "Tech Lead",
      overallScore: 88,
      technicalScore: 92,
      experienceScore: 85,
      culturalFitScore: 87,
      recommendation: "Recommended",
      highlights: [
        "10 years in software development",
        "Proven leadership experience",
        "Full-stack expertise",
        "Startup and enterprise background",
      ],
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      position: "Product Manager",
      overallScore: 85,
      technicalScore: 80,
      experienceScore: 88,
      culturalFitScore: 87,
      recommendation: "Recommended",
      highlights: [
        "Strong product strategy skills",
        "Data-driven decision maker",
        "Cross-functional team experience",
        "User-centric approach",
      ],
    },
    {
      id: 4,
      name: "Sarah Jones",
      position: "UX Designer",
      overallScore: 65,
      technicalScore: 70,
      experienceScore: 62,
      culturalFitScore: 63,
      recommendation: "Review",
      highlights: [
        "Solid design portfolio",
        "Figma and prototyping skills",
        "Limited enterprise experience",
        "Growing user research skills",
      ],
    },
  ];

  const getRecommendationColor = (recommendation: string) => {
    if (recommendation === "Strong Match")
      return "bg-emerald-100 text-emerald-700";
    if (recommendation === "Recommended") return "bg-teal-100 text-teal-700";
    return "bg-orange-100 text-orange-700";
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            AI Screening
          </h1>
          <p className="text-gray-600">
            AI-powered candidate evaluation and matching recommendations.
          </p>
        </div>
        <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors">
          <Brain className="w-5 h-5" />
          Run New Analysis
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-500">CANDIDATES SCREENED</div>
            <Users className="w-5 h-5 text-teal-600" />
          </div>
          <div className="text-3xl font-semibold text-gray-900">148</div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-500">STRONG MATCHES</div>
            <Award className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="text-3xl font-semibold text-emerald-600">24</div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-500">AVG. MATCH SCORE</div>
            <TrendingUp className="w-5 h-5 text-teal-600" />
          </div>
          <div className="text-3xl font-semibold text-gray-900">82%</div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-500">TIME SAVED</div>
            <Brain className="w-5 h-5 text-orange-600" />
          </div>
          <div className="text-3xl font-semibold text-gray-900">48h</div>
        </div>
      </div>

      {/* Screening Results */}
      <div className="space-y-6">
        {screeningResults.map((result) => (
          <div
            key={result.id}
            className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 font-semibold">
                  {result.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">
                    {result.name}
                  </h3>
                  <p className="text-gray-600">{result.position}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500 mb-1">
                  Overall Match Score
                </div>
                <div
                  className={`text-4xl font-semibold ${
                    result.overallScore >= 85
                      ? "text-emerald-600"
                      : result.overallScore >= 70
                        ? "text-orange-600"
                        : "text-red-600"
                  }`}
                >
                  {result.overallScore}%
                </div>
              </div>
            </div>

            {/* Score Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-2">
                  Technical Skills
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-teal-600 rounded-full h-2"
                      style={{ width: `${result.technicalScore}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">
                    {result.technicalScore}%
                  </span>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-2">
                  Experience Level
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-teal-600 rounded-full h-2"
                      style={{ width: `${result.experienceScore}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">
                    {result.experienceScore}%
                  </span>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-2">Cultural Fit</div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-teal-600 rounded-full h-2"
                      style={{ width: `${result.culturalFitScore}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">
                    {result.culturalFitScore}%
                  </span>
                </div>
              </div>
            </div>

            {/* Highlights */}
            <div className="mb-6">
              <div className="text-sm font-medium text-gray-700 mb-3">
                Key Highlights
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {result.highlights.map((highlight, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2 text-sm text-gray-600"
                  >
                    <ChevronRight className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <Badge
                className={`${getRecommendationColor(result.recommendation)} border-0`}
              >
                {result.recommendation}
              </Badge>
              <div className="flex gap-2">
                <button className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                  View Full Report
                </button>
                <button className="px-4 py-2 text-sm bg-teal-600 text-white hover:bg-teal-700 rounded-lg transition-colors">
                  Move to Interview
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
