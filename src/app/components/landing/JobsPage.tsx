import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Sparkles,
  Briefcase,
  MapPin,
  DollarSign,
  Clock,
  Search,
  Filter,
  TrendingUp,
  ArrowRight,
  Building2,
  Users,
} from "lucide-react";
// Supabase usage disabled — credentials import commented out.
// import { projectId, publicAnonKey } from "/utils/supabase/info";

interface Job {
  id: string;
  title: string;
  department: string;
  category: string;
  description: string;
  duration: string;
  type: string;
  salary: string;
  experienceLevel: string;
  applicants: number;
  status: string;
  postedDate: string;
  createdAt: string;
}

interface JobsPageProps {
  onLogin: () => void;
  onRegister: () => void;
  onBackToHome: () => void;
}

export function JobsPage({ onLogin, onRegister, onBackToHome }: JobsPageProps) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedType, setSelectedType] = useState("All");

  const categories = [
    "All",
    "Technology",
    "Business",
    "IT",
    "Agriculture",
    "Healthcare",
    "Finance",
    "Marketing",
    "Sales",
    "Human Resources",
    "Engineering",
    "Design",
    "Other",
  ];
  const types = ["All", "Remote", "Hybrid", "On-site"];

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      // Supabase job listing disabled — using empty list or local/demo data.
      setJobs([]);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || job.category === selectedCategory;
    const matchesType = selectedType === "All" || job.type === selectedType;
    return (
      matchesSearch && matchesCategory && matchesType && job.status === "active"
    );
  });

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "1 day ago";
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    return `${Math.floor(diffInDays / 30)} months ago`;
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-lg border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 cursor-pointer"
              onClick={onBackToHome}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-teal-600 to-green-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-teal-600 to-green-600 bg-clip-text text-transparent">
                TalentForge
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="hidden md:flex items-center gap-8"
            >
              <button
                onClick={onBackToHome}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Home
              </button>
              <a
                href="#features"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Features
              </a>
              <a
                href="#pricing"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Pricing
              </a>
              <button className="text-teal-600 font-medium">Jobs</button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-4"
            >
              <button
                onClick={onLogin}
                className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
              >
                Login
              </button>
              <button
                onClick={onRegister}
                className="bg-yellow-400 text-gray-900 px-6 py-2.5 rounded-lg hover:shadow-lg hover:bg-yellow-500 transition-all font-semibold"
              >
                Get Started
              </button>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-6 bg-gradient-to-br from-teal-50 via-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-teal-200 mb-6">
              <TrendingUp className="w-4 h-4 text-teal-600" />
              <span className="text-sm font-medium text-teal-600">
                {jobs.length} Active Opportunities
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
          >
            Discover Your Next
            <span className="bg-gradient-to-r from-teal-600 to-green-600 bg-clip-text text-transparent">
              {" "}
              Dream Job
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
          >
            Browse through our curated list of opportunities from top companies.
            Find the perfect role that matches your skills and ambitions.
          </motion.p>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 px-6 bg-white border-b border-gray-200 sticky top-[73px] z-40">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="md:col-span-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search jobs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <div className="relative">
                <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent appearance-none"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Type Filter */}
            <div>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent appearance-none"
                >
                  {types.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
            <span>{filteredJobs.length} jobs found</span>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
                setSelectedType("All");
              }}
              className="text-teal-600 hover:text-teal-700 font-medium"
            >
              Clear filters
            </button>
          </div>
        </div>
      </section>

      {/* Jobs List */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600">Loading jobs...</p>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="text-center py-20">
              <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No jobs found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your filters or search query
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                  setSelectedType("All");
                }}
                className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg hover:shadow-lg hover:bg-yellow-500 transition-all font-semibold"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid gap-6">
              {filteredJobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-teal-600 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Briefcase className="w-7 h-7 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">
                            {job.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                            <div className="flex items-center gap-1">
                              <Building2 className="w-4 h-4" />
                              <span>{job.department}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              <span>{job.type}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <DollarSign className="w-4 h-4" />
                              <span>{job.salary}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{getTimeAgo(job.postedDate)}</span>
                            </div>
                          </div>
                          <p className="text-gray-600 line-clamp-2 mb-4">
                            {job.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-xs font-medium">
                              {job.category}
                            </span>
                            <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">
                              {job.experienceLevel}
                            </span>
                            <span className="px-3 py-1 bg-pink-50 text-pink-700 rounded-full text-xs font-medium">
                              {job.duration}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={onRegister}
                      className="ml-4 px-6 py-3 bg-yellow-400 text-gray-900 rounded-lg hover:shadow-lg hover:bg-yellow-500 transition-all flex items-center gap-2 group font-semibold"
                    >
                      Apply Now
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  {job.applicants > 0 && (
                    <div className="pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Users className="w-4 h-4" />
                        <span>{job.applicants} applicants</span>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-teal-600 to-green-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-white mb-6"
          >
            Ready to Take Your Career to the Next Level?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-teal-100 mb-8"
          >
            Join thousands of professionals who have found their dream jobs
            through TalentForge.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            onClick={onRegister}
            className="bg-white text-teal-600 px-8 py-4 rounded-xl hover:shadow-2xl transition-all font-semibold flex items-center gap-2 mx-auto group"
          >
            Create Your Account
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      </section>
    </div>
  );
}
