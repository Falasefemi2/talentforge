import { useState } from 'react';
import { Briefcase, Search, Eye, Edit, Trash2, Ban, CheckCircle, TrendingUp } from 'lucide-react';
import { Badge } from '../../ui/badge';

interface Job {
  id: string;
  title: string;
  company: string;
  employerId: string;
  category: string;
  workType: string;
  salary: string;
  location: string;
  status: 'active' | 'closed' | 'suspended';
  applications: number;
  postedDate: string;
  views: number;
}

export function JobManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState<'all' | Job['status']>('all');

  const [jobs, setJobs] = useState<Job[]>([
    {
      id: '1',
      title: 'Senior Frontend Developer',
      company: 'TechCorp Inc.',
      employerId: '2',
      category: 'Technology',
      workType: 'Remote',
      salary: '$120k - $150k',
      location: 'Remote',
      status: 'active',
      applications: 42,
      postedDate: '2024-02-20',
      views: 256,
    },
    {
      id: '2',
      title: 'Product Manager',
      company: 'Innovation Labs',
      employerId: '3',
      category: 'Business',
      workType: 'Hybrid',
      salary: '$140k - $180k',
      location: 'San Francisco, CA',
      status: 'active',
      applications: 38,
      postedDate: '2024-02-18',
      views: 189,
    },
    {
      id: '3',
      title: 'Data Analyst',
      company: 'DataCorp',
      employerId: '4',
      category: 'Technology',
      workType: 'On-site',
      salary: '$85k - $105k',
      location: 'New York, NY',
      status: 'closed',
      applications: 67,
      postedDate: '2024-02-10',
      views: 342,
    },
  ]);

  const handleToggleStatus = (jobId: string) => {
    setJobs(jobs.map(job => {
      if (job.id === jobId) {
        if (job.status === 'active') return { ...job, status: 'suspended' as const };
        if (job.status === 'suspended') return { ...job, status: 'active' as const };
        return job;
      }
      return job;
    }));
  };

  const handleDeleteJob = (jobId: string) => {
    if (confirm('Are you sure you want to delete this job? This action cannot be undone.')) {
      setJobs(jobs.filter(job => job.id !== jobId));
    }
  };

  const getStatusBadgeColor = (status: Job['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700 border-0';
      case 'closed':
        return 'bg-gray-100 text-gray-700 border-0';
      case 'suspended':
        return 'bg-red-100 text-red-700 border-0';
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || job.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const stats = {
    total: jobs.length,
    active: jobs.filter(j => j.status === 'active').length,
    closed: jobs.filter(j => j.status === 'closed').length,
    suspended: jobs.filter(j => j.status === 'suspended').length,
    totalApplications: jobs.reduce((sum, job) => sum + job.applications, 0),
    avgApplications: Math.round(jobs.reduce((sum, job) => sum + job.applications, 0) / jobs.length),
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">Job Management</h1>
        <p className="text-gray-600">Manage all job postings on the platform</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-6 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="text-sm text-gray-500 mb-1">Total Jobs</div>
          <div className="text-2xl font-semibold text-gray-900">{stats.total}</div>
        </div>
        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <div className="text-sm text-green-600 mb-1">Active</div>
          <div className="text-2xl font-semibold text-green-700">{stats.active}</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="text-sm text-gray-600 mb-1">Closed</div>
          <div className="text-2xl font-semibold text-gray-700">{stats.closed}</div>
        </div>
        <div className="bg-red-50 rounded-lg p-4 border border-red-200">
          <div className="text-sm text-red-600 mb-1">Suspended</div>
          <div className="text-2xl font-semibold text-red-700">{stats.suspended}</div>
        </div>
        <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
          <div className="text-sm text-emerald-600 mb-1">Applications</div>
          <div className="text-2xl font-semibold text-emerald-700">{stats.totalApplications}</div>
        </div>
        <div className="bg-teal-50 rounded-lg p-4 border border-teal-200">
          <div className="text-sm text-teal-600 mb-1">Avg per Job</div>
          <div className="text-2xl font-semibold text-teal-700">{stats.avgApplications}</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <div className="grid grid-cols-3 gap-4">
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
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">All Categories</option>
            <option value="Technology">Technology</option>
            <option value="Business">Business</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Finance">Finance</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="closed">Closed</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
      </div>

      {/* Jobs Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Job Title</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Company</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Work Type</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Applications</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Views</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Posted</th>
                <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredJobs.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{job.title}</div>
                    <div className="text-sm text-gray-500">{job.salary}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{job.company}</td>
                  <td className="px-6 py-4">
                    <Badge className="bg-teal-100 text-teal-700 border-0">{job.category}</Badge>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{job.workType}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{job.location}</td>
                  <td className="px-6 py-4">
                    <Badge className={getStatusBadgeColor(job.status)}>
                      {job.status === 'active' && <CheckCircle className="w-3 h-3 mr-1" />}
                      {job.status === 'suspended' && <Ban className="w-3 h-3 mr-1" />}
                      {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">{job.applications}</span>
                      <TrendingUp className="w-4 h-4 text-emerald-600" />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{job.views}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{job.postedDate}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="View details"
                      >
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>
                      <button
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Edit job"
                      >
                        <Edit className="w-4 h-4 text-gray-600" />
                      </button>
                      <button
                        onClick={() => handleToggleStatus(job.id)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title={job.status === 'active' ? 'Suspend job' : 'Activate job'}
                      >
                        <Ban className={`w-4 h-4 ${job.status === 'active' ? 'text-orange-600' : 'text-green-600'}`} />
                      </button>
                      <button
                        onClick={() => handleDeleteJob(job.id)}
                        className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                        title="Delete job"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredJobs.length === 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center mt-6">
          <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No jobs found</h3>
          <p className="text-gray-600">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}
