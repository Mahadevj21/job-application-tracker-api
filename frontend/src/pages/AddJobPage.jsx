import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jobApi from '../api/jobApi';
import { useAuth } from '../context/AuthContext';
import { 
  Building2, 
  Briefcase, 
  Calendar, 
  FileText, 
  ChevronLeft,
  Loader2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const AddJobPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    companyName: '',
    jobTitle: '',
    status: 'APPLIED',
    appliedDate: new Date().toISOString().split('T')[0],
    notes: '',
    userId: user?.userId || null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.userId) {
      toast.error('Identity required for repository commit.');
      return;
    }
    setIsSubmitting(true);
    try {
      await jobApi.createJob(formData);
      toast.success('Career application synchronized.');
      navigate('/jobs');
    } catch (error) {
      toast.error(error.message || 'Creation operation failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-10 animate-in fade-in slide-in-from-right-10 duration-500">
      <header className="flex items-center">
        <button onClick={() => navigate(-1)} className="p-3 mr-6 rounded-2xl bg-white border border-slate-200 text-slate-500 hover:text-primary-600 hover:border-primary-100 transition-all hover:shadow-md">
           <ChevronLeft className="w-5 h-5" />
        </button>
        <div>
           <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Record Application</h1>
           <p className="mt-1 text-slate-500 font-medium tracking-tight">Add a new career trajectory to your workspace.</p>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="p-10 space-y-10 bg-white shadow-sm border border-slate-200 rounded-[2.5rem]">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
           <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-700 ml-1" htmlFor="companyName">Enterprise Asset</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 group-focus-within:text-primary-500 transition-colors">
                   <Building2 className="w-5 h-5" />
                </div>
                <input
                  id="companyName"
                  name="companyName"
                  type="text"
                  required
                  value={formData.companyName}
                  onChange={handleChange}
                  className="input-field pl-12 h-14 text-base font-semibold"
                  placeholder="e.g. OpenAI"
                />
              </div>
           </div>

           <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-700 ml-1" htmlFor="jobTitle">Position Title</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 group-focus-within:text-primary-500 transition-colors">
                   <Briefcase className="w-5 h-5" />
                </div>
                <input
                  id="jobTitle"
                  name="jobTitle"
                  type="text"
                  required
                  value={formData.jobTitle}
                  onChange={handleChange}
                  className="input-field pl-12 h-14 text-base font-semibold"
                  placeholder="e.g. Senior Backend Engineer"
                />
              </div>
           </div>

           <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-700 ml-1" htmlFor="status">Submission Phase</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="input-field h-14 bg-slate-50 font-bold border-slate-100"
              >
                <option value="APPLIED">Applied</option>
                <option value="INTERVIEW">Interview stage</option>
                <option value="OFFER">Contract (Offer)</option>
                <option value="REJECTED">Archived (Rejected)</option>
              </select>
           </div>

           <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-700 ml-1" htmlFor="appliedDate">Submit Date</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 group-focus-within:text-primary-500 transition-colors">
                   <Calendar className="w-5 h-5" />
                </div>
                <input
                  id="appliedDate"
                  name="appliedDate"
                  type="date"
                  value={formData.appliedDate}
                  onChange={handleChange}
                  className="input-field pl-12 h-14 font-bold"
                />
              </div>
           </div>

           <div className="md:col-span-2 space-y-2">
              <label className="block text-sm font-bold text-slate-700 ml-1" htmlFor="notes">Supplementary Notes</label>
              <div className="relative group">
                <div className="absolute top-4 left-4 text-slate-400 group-focus-within:text-primary-500 transition-colors">
                   <FileText className="w-5 h-5" />
                </div>
                <textarea
                  id="notes"
                  name="notes"
                  rows="4"
                  value={formData.notes}
                  onChange={handleChange}
                  className="input-field pl-12 pt-4 min-h-[120px] font-medium leading-relaxed"
                  placeholder="Summarize key takeaways, referral leads, or compensation projections..."
                />
              </div>
           </div>
        </div>

        <div className="flex items-center justify-end pt-8 space-x-4 border-t border-slate-100">
           <button onClick={() => navigate(-1)} type="button" className="btn btn-secondary h-14 px-8 font-bold text-slate-600 rounded-3xl hover:bg-slate-50 border-slate-200">
              Discard Changes
           </button>
           <button
             type="submit"
             disabled={isSubmitting}
             className="btn btn-primary h-14 px-10 font-bold shadow-lg shadow-primary-200 rounded-3xl"
           >
             {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : (
              <span className="flex items-center">Synchronize Application <CheckCircle2 className="ml-3 w-5 h-5" /></span>
             )}
           </button>
        </div>
      </form>
    </div>
  );
};

export default AddJobPage;
