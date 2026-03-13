import { Users, Briefcase, TrendingUp, DollarSign, UserCheck, Building, Target } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export function AdminOverview() {
  const stats = [
    { label: 'TOTAL USERS', value: '1,248', change: '+12%', icon: Users, color: 'text-emerald-600', bgColor: 'bg-emerald-50' },
    { label: 'EMPLOYERS', value: '342', change: '+8%', icon: Building, color: 'text-teal-600', bgColor: 'bg-teal-50' },
    { label: 'APPLICANTS', value: '906', change: '+15%', icon: UserCheck, color: 'text-amber-600', bgColor: 'bg-amber-50' },
    { label: 'ACTIVE JOBS', value: '156', change: '+5%', icon: Briefcase, color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { label: 'APPLICATIONS', value: '3,421', change: '+22%', icon: Target, color: 'text-purple-600', bgColor: 'bg-purple-50' },
    { label: 'PLATFORM REVENUE', value: '$42.5K', change: '+18%', icon: DollarSign, color: 'text-green-600', bgColor: 'bg-green-50' },
  ];

  const userGrowthData = [
    { month: 'Jan', users: 850 },
    { month: 'Feb', users: 920 },
    { month: 'Mar', users: 1050 },
    { month: 'Apr', users: 1150 },
    { month: 'May', users: 1200 },
    { month: 'Jun', users: 1248 },
  ];

  const jobActivityData = [
    { month: 'Jan', jobs: 120, applications: 2100 },
    { month: 'Feb', jobs: 135, applications: 2450 },
    { month: 'Mar', jobs: 142, applications: 2800 },
    { month: 'Apr', jobs: 148, applications: 3050 },
    { month: 'May', users: 152, applications: 3200 },
    { month: 'Jun', jobs: 156, applications: 3421 },
  ];

  const userTypeData = [
    { name: 'Applicants', value: 906, color: '#10b981' },
    { name: 'Employers', value: 342, color: '#f59e0b' },
  ];

  const recentActivity = [
    { id: 1, type: 'New User', description: 'John Doe registered as Employer', time: '5 minutes ago', icon: Users, color: 'text-emerald-600' },
    { id: 2, type: 'Job Posted', description: 'TechCorp posted "Senior Developer"', time: '12 minutes ago', icon: Briefcase, color: 'text-teal-600' },
    { id: 3, type: 'Application', description: 'Jane Smith applied to Product Manager role', time: '23 minutes ago', icon: Target, color: 'text-amber-600' },
    { id: 4, type: 'New User', description: 'Mike Johnson registered as Applicant', time: '35 minutes ago', icon: Users, color: 'text-emerald-600' },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Platform overview and key metrics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className={`${stat.bgColor} rounded-lg p-6 border border-gray-200`}>
              <div className="flex items-center justify-between mb-3">
                <div className="text-sm font-medium text-gray-600">{stat.label}</div>
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className={`text-3xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
              <div className="flex items-center gap-1 text-sm">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-green-600 font-medium">{stat.change}</span>
                <span className="text-gray-500">vs last month</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        {/* User Growth Chart */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">User Growth</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Line type="monotone" dataKey="users" stroke="#10b981" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* User Distribution */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">User Distribution</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={userTypeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {userTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Job Activity Chart */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Job Postings & Applications</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={jobActivityData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '1px solid #e5e7eb',
                borderRadius: '8px'
              }}
            />
            <Bar dataKey="jobs" fill="#14b8a6" name="Jobs Posted" />
            <Bar dataKey="applications" fill="#f59e0b" name="Applications" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
        </div>
        <div className="p-6 space-y-4">
          {recentActivity.map((activity) => {
            const Icon = activity.icon;
            return (
              <div key={activity.id} className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:border-emerald-300 transition-colors">
                <div className={`w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${activity.color}`} />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{activity.type}</div>
                  <div className="text-sm text-gray-600">{activity.description}</div>
                  <div className="text-xs text-gray-500 mt-1">{activity.time}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
