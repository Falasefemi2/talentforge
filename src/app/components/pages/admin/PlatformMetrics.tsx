import { TrendingUp, Users, Briefcase, Target, DollarSign, Clock } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export function PlatformMetrics() {
  const monthlyData = [
    { month: 'Jan', users: 850, jobs: 120, applications: 2100, revenue: 32000 },
    { month: 'Feb', users: 920, jobs: 135, applications: 2450, revenue: 35500 },
    { month: 'Mar', users: 1050, jobs: 142, applications: 2800, revenue: 39200 },
    { month: 'Apr', users: 1150, jobs: 148, applications: 3050, revenue: 41800 },
    { month: 'May', users: 1200, jobs: 152, applications: 3200, revenue: 42100 },
    { month: 'Jun', users: 1248, jobs: 156, applications: 3421, revenue: 42500 },
  ];

  const engagementData = [
    { day: 'Mon', activeUsers: 420, jobViews: 1250, applications: 180 },
    { day: 'Tue', activeUsers: 445, jobViews: 1320, applications: 195 },
    { day: 'Wed', activeUsers: 480, jobViews: 1450, applications: 210 },
    { day: 'Thu', activeUsers: 510, jobViews: 1520, applications: 225 },
    { day: 'Fri', activeUsers: 490, jobViews: 1480, applications: 205 },
    { day: 'Sat', activeUsers: 280, jobViews: 890, applications: 95 },
    { day: 'Sun', activeUsers: 245, jobViews: 780, applications: 85 },
  ];

  const conversionData = [
    { stage: 'Visits', count: 12500 },
    { stage: 'Sign Ups', count: 1248 },
    { stage: 'Job Views', count: 8200 },
    { stage: 'Applications', count: 3421 },
    { stage: 'Interviews', count: 890 },
    { stage: 'Hires', count: 145 },
  ];

  const performanceMetrics = [
    { label: 'Avg. Response Time', value: '2.3s', change: '-12%', icon: Clock, color: 'text-green-600', bgColor: 'bg-green-50' },
    { label: 'User Satisfaction', value: '4.8/5', change: '+5%', icon: Target, color: 'text-emerald-600', bgColor: 'bg-emerald-50' },
    { label: 'Monthly Active Users', value: '2,847', change: '+18%', icon: Users, color: 'text-teal-600', bgColor: 'bg-teal-50' },
    { label: 'Conversion Rate', value: '27.4%', change: '+3%', icon: TrendingUp, color: 'text-amber-600', bgColor: 'bg-amber-50' },
  ];

  const topCategories = [
    { name: 'Technology', jobs: 58, percentage: 37 },
    { name: 'Business', jobs: 42, percentage: 27 },
    { name: 'Healthcare', jobs: 28, percentage: 18 },
    { name: 'Finance', jobs: 18, percentage: 12 },
    { name: 'Other', jobs: 10, percentage: 6 },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">Platform Metrics</h1>
        <p className="text-gray-600">Comprehensive analytics and performance insights</p>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {performanceMetrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.label} className={`${metric.bgColor} rounded-lg p-6 border border-gray-200`}>
              <div className="flex items-center justify-between mb-3">
                <div className="text-sm font-medium text-gray-600">{metric.label}</div>
                <Icon className={`w-5 h-5 ${metric.color}`} />
              </div>
              <div className={`text-3xl font-bold ${metric.color} mb-2`}>{metric.value}</div>
              <div className="flex items-center gap-1 text-sm">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-green-600 font-medium">{metric.change}</span>
                <span className="text-gray-500">vs last month</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Revenue & User Growth */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Revenue & User Growth</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                </linearGradient>
              </defs>
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
              <Legend />
              <Area type="monotone" dataKey="users" stroke="#10b981" fillOpacity={1} fill="url(#colorUsers)" name="Total Users" />
              <Area type="monotone" dataKey="revenue" stroke="#f59e0b" fillOpacity={1} fill="url(#colorRevenue)" name="Revenue ($)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Jobs & Applications</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
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
              <Legend />
              <Bar dataKey="jobs" fill="#14b8a6" name="Jobs Posted" />
              <Bar dataKey="applications" fill="#6366f1" name="Applications" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Weekly Engagement */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Weekly Engagement</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={engagementData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="day" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '1px solid #e5e7eb',
                borderRadius: '8px'
              }}
            />
            <Legend />
            <Line type="monotone" dataKey="activeUsers" stroke="#10b981" strokeWidth={2} name="Active Users" />
            <Line type="monotone" dataKey="jobViews" stroke="#14b8a6" strokeWidth={2} name="Job Views" />
            <Line type="monotone" dataKey="applications" stroke="#f59e0b" strokeWidth={2} name="Applications" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Conversion Funnel & Top Categories */}
      <div className="grid grid-cols-2 gap-6">
        {/* Conversion Funnel */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Conversion Funnel</h2>
          <div className="space-y-3">
            {conversionData.map((stage, index) => {
              const percentage = index === 0 ? 100 : Math.round((stage.count / conversionData[0].count) * 100);
              return (
                <div key={stage.stage}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">{stage.stage}</span>
                    <span className="text-sm text-gray-600">{stage.count.toLocaleString()} ({percentage}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-emerald-600 to-teal-600 h-3 rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Categories */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Top Job Categories</h2>
          <div className="space-y-4">
            {topCategories.map((category) => (
              <div key={category.name} className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{category.name}</span>
                    <span className="text-sm text-gray-600">{category.jobs} jobs ({category.percentage}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-amber-400 to-yellow-500 h-2 rounded-full"
                      style={{ width: `${category.percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
