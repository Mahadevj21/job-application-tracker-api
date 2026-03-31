import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import jobApi from '../api/jobApi';
import { 
  Plus, 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  Filter,
  MoreVertical,
  ExternalLink,
  Edit2,
  Trash2,
  MoreHorizontal,
  Building2,
  Briefcase
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [filters, setFilters] = useState({
    status: '',
    companyName: '',
    jobTitle: '',
  });

  const statusColors = {
    APPLIED: 'bg-blue-50 text-blue-700 border-blue-200',
    INTERVIEW: 'bg-purple-50 text-purple-700 border-purple-200',
    OFFER: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    REJECTED: 'bg-red-50 text-red-700 border-red-200',
  };

  useEffect(() => {
    fetchJobs();
  }, [page, filters]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const data = await jobApi.getJobs({
        page,
        size: 10,
        ...filters
      });
      setJobs(data.content);
      setTotalPages(data.totalPages);
    } catch (error) {
      toast.error('Failed to synchronize job repository.');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setPage(0);
  };

  const deleteJob = async (id) => {
    if (!window.confirm('Archive this application permanently?')) return;
    try {
      await jobApi.deleteJob(id);
      toast.success('Application archived.');
      fetchJobs();
    } catch (error) {
      toast.error('Archiving operation failed.');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
           <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Career Repository</h1>
           <p className="mt-1 text-slate-500 font-medium tracking-tight">Active tracking of {jobs.length} applications in this view</p>
        </div>
        <Link to="/add-job" className="btn btn-primary h-12 shadow-md shadow-primary-100 flex items-center px-6">
           <Plus className="w-5 h-5 mr-2" />
           Record Application
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 p-8 bg-white shadow-sm border border-slate-200 rounded-3xl">
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-[240px]">
             <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <Search className="w-4 h-4" />
             </div>
             <input
               name="companyName"
               type="text"
               value={filters.companyName}
               onChange={handleFilterChange}
               placeholder="Filter by company asset..."
               className="input-field pl-10 h-11"
             />
          </div>
          
          <select 
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="input-field w-full sm:w-48 h-11 appearance-none bg-slate-50 border-slate-100 pl-4 pr-10"
          >
             <option value="">All Statuses</option>
             <option value="APPLIED">Applied</option>
             <option value="INTERVIEW">Interviewing</option>
             <option value="OFFER">Offers Received</option>
             <option value="REJECTED">Archived (Rejected)</option>
          </select>
        </div>

        <div className="overflow-x-auto ring-1 ring-slate-100 rounded-2xl">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase font-bold text-slate-500 bg-slate-50">
              <tr>
                <th className="px-6 py-4">Structure</th>
                <th className="px-6 py-4">Current Status</th>
                <th className="px-6 py-4">Submission Date</th>
                <th className="px-6 py-4 text-right">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan="4" className="px-6 py-8 h-16 bg-slate-50/50"></td>
                  </tr>
                ))
              ) : jobs.length > 0 ? (
                jobs.map((job) => (
                  <tr key={job.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-primary-100 flex items-center justify-center text-primary-600 transition-transform group-hover:scale-105">
                           <Building2 className="w-5 h-5" />
                        </div>
                        <div className="ml-4">
                          <p className="font-bold text-slate-900 group-hover:text-primary-600 truncate max-w-[200px]">{job.companyName}</p>
                          <p className="text-xs text-slate-500 font-semibold">{job.jobTitle}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={twMerge(clsx('px-3 py-1 text-xs font-bold rounded-full border', statusColors[job.status]))}>
                        {job.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-slate-500 font-semibold whitespace-nowrap italic">
                      {job.appliedDate || 'No date set'}
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Link to={`/jobs/${job.id}`} className="p-2 text-slate-400 hover:text-primary-600 transition-colors rounded-lg hover:bg-white border border-transparent hover:border-slate-100">
                          <ExternalLink className="w-5 h-5" />
                        </Link>
                        <button onClick={() => deleteJob(job.id)} className="p-2 text-slate-400 hover:text-red-600 transition-colors rounded-lg hover:bg-white border border-transparent hover:border-slate-100">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-20 text-center text-slate-400">
                     <div className="flex flex-col items-center">
                        <Briefcase className="w-12 h-12 mb-4 opacity-10" />
                        <p className="text-lg font-bold">No applications found</p>
                        <p className="mt-1 font-medium">Try adjusting your repository filter parameters</p>
                     </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-6 border-t border-slate-100 gap-4">
            <p className="text-sm font-semibold text-slate-600">
              Showing <span className="text-slate-900 font-bold">{page * 10 + 1}</span> to <span className="text-slate-900 font-bold">{Math.min((page + 1) * 10, jobs.length)}</span> results
            </p>
            <div className="flex items-center space-x-1">
              <button 
                onClick={() => setPage(p => Math.max(0, p - 1))}
                disabled={page === 0}
                className="p-2 btn-secondary disabled:opacity-30 rounded-xl"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center px-4 font-bold text-slate-900">
                 {page + 1} <span className="mx-2 text-slate-400 font-medium">of</span> {totalPages}
              </div>
              <button 
                onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                disabled={page >= totalPages - 1}
                className="p-2 btn-secondary disabled:opacity-30 rounded-xl"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobsPage;
