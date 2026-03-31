import { useState, useEffect } from 'react';
import jobApi from '../api/jobApi';
import StatsCard from '../components/StatsCard';
import { 
  Briefcase, 
  Target, 
  CalendarCheck, 
  CheckCircle2, 
  XCircle,
  TrendingUp,
  Activity
} from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip, 
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';
import { toast } from 'react-hot-toast';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const data = await jobApi.getStats();
      setStats(data);
    } catch (error) {
      toast.error('Failed to load dashboard metrics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center p-20 animate-pulse text-slate-400">
      <Activity className="w-8 h-8 mr-4 animate-spin text-primary-500" />
      <span className="text-lg font-medium">Synchronizing application data...</span>
    </div>
  );

  const chartData = [
    { name: 'Applied', value: stats?.applied || 0, color: '#0ea5e9' },
    { name: 'Interviews', value: stats?.interviews || 0, color: '#8b5cf6' },
    { name: 'Offers', value: stats?.offers || 0, color: '#10b981' },
    { name: 'Rejected', value: stats?.rejections || 0, color: '#ef4444' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <header>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Application Dashboard</h1>
        <p className="mt-2 text-slate-500 text-lg">Real-time health overview of your career search progress.</p>
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard 
          title="Total Applications" 
          value={stats?.totalApplications || 0} 
          icon={Briefcase} 
          trend="12"
          colorClass="bg-blue-50 text-blue-600 group-hover:bg-blue-100" 
        />
        <StatsCard 
          title="Interviews" 
          value={stats?.totalInterviews || 0} 
          icon={CalendarCheck} 
          trend="8"
          colorClass="bg-purple-50 text-purple-600 group-hover:bg-purple-100" 
        />
        <StatsCard 
          title="Active Offers" 
          value={stats?.offers || 0} 
          icon={Target} 
          colorClass="bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100" 
        />
        <StatsCard 
          title="Success Rate" 
          value={`${stats?.totalApplications > 0 ? Math.round((stats.offers / stats.totalApplications) * 100) : 0}%`} 
          icon={TrendingUp} 
          colorClass="bg-amber-50 text-amber-600 group-hover:bg-amber-100" 
        />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="p-8 bg-white shadow-sm border border-slate-200 rounded-3xl lg:col-span-2">
           <h3 className="text-xl font-bold text-slate-900 mb-8">Monthly Projection</h3>
           <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 13}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 13}} />
                    <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                    <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={50}>
                       {chartData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                    </Bar>
                 </BarChart>
              </ResponsiveContainer>
           </div>
        </div>

        <div className="p-8 bg-white shadow-sm border border-slate-200 rounded-3xl">
           <h3 className="text-xl font-bold text-slate-900 mb-8">Status Distribution</h3>
           <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                    <Pie
                      data={chartData}
                      innerRadius={80}
                      outerRadius={110}
                      paddingAngle={8}
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                    </Pie>
                    <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                    <Legend iconType="circle" wrapperStyle={{paddingTop: '20px'}} />
                 </PieChart>
              </ResponsiveContainer>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
