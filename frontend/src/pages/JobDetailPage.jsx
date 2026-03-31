import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import jobApi from '../api/jobApi';
import interviewApi from '../api/interviewApi';
import { 
  Building2, 
  Briefcase, 
  Calendar, 
  FileText, 
  Clock, 
  CheckCircle2, 
  Plus, 
  ChevronLeft,
  Loader2,
  Trash2,
  CalendarCheck,
  MoreVertical,
  Activity
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const JobDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showInterviewForm, setShowInterviewForm] = useState(false);
  const [isSubmittingInterview, setIsSubmittingInterview] = useState(false);

  const [newInterview, setNewInterview] = useState({
    round: '',
    interviewDate: new Date().toISOString().slice(0, 16),
    notes: '',
  });

  useEffect(() => {
    fetchJobData();
  }, [id]);

  const fetchJobData = async () => {
    try {
      const [jobData, interviewsData] = await Promise.all([
        jobApi.getJob(id),
        interviewApi.getInterviewsByJobId(id)
      ]);
      setJob(jobData);
      setInterviews(interviewsData);
    } catch (error) {
      toast.error('Identity of this application node is inaccessible.');
      navigate('/jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleInterviewSubmit = async (e) => {
    e.preventDefault();
    setIsSubmittingInterview(true);
    try {
      await interviewApi.createInterview({
        ...newInterview,
        jobApplicationId: id
      });
      toast.success('Interview round synchronized.');
      setShowInterviewForm(false);
      setNewInterview({ round: '', interviewDate: new Date().toISOString().slice(0, 16), notes: '' });
      const updatedInterviews = await interviewApi.getInterviewsByJobId(id);
      setInterviews(updatedInterviews);
    } catch (error) {
      toast.error('Failed to log interview event.');
    } finally {
      setIsSubmittingInterview(false);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center p-20 animate-pulse text-slate-400">
      <Activity className="w-8 h-8 mr-4 animate-spin text-primary-500" />
      <span className="text-lg font-medium">Downloading carrier details...</span>
    </div>
  );

  return (
    <div className="space-y-10 animate-in fade-in duration-500 max-w-6xl mx-auto">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center">
            <button onClick={() => navigate('/jobs')} className="p-3 mr-6 rounded-2xl bg-white border border-slate-200 text-slate-500 hover:text-primary-600 hover:border-primary-100 transition-all">
               <ChevronLeft className="w-5 h-5" />
            </button>
            <div>
               <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 group">{job.companyName}</h1>
               <div className="flex items-center mt-1 space-x-2">
                  <span className="text-slate-500 font-bold tracking-tight">{job.jobTitle}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                  <span className={clsx('text-xs font-bold px-2 py-0.5 rounded-full uppercase', 
                    job.status === 'OFFER' ? 'bg-emerald-50 text-emerald-600' : 'bg-primary-50 text-primary-600')}>
                    {job.status}
                  </span>
               </div>
            </div>
        </div>
        <div className="flex items-center space-x-3">
           <button className="btn btn-secondary rounded-2xl h-12 px-5 font-bold shadow-sm">
              Edit Details
           </button>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
           <section className="p-10 bg-white border border-slate-200 shadow-sm rounded-[2.5rem]">
              <div className="flex items-center mb-8">
                <FileText className="w-6 h-6 mr-4 text-primary-500" />
                <h3 className="text-xl font-bold text-slate-900">Application Notes</h3>
              </div>
              <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed font-medium">
                 {job.notes || "No supplementary insights documented for this application phase."}
              </div>
           </section>

           <section className="p-10 bg-white border border-slate-200 shadow-sm rounded-[2.5rem]">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                   <CalendarCheck className="w-6 h-6 mr-4 text-purple-500" />
                   <h3 className="text-xl font-bold text-slate-900">Interview Timeline</h3>
                </div>
                <button 
                  onClick={() => setShowInterviewForm(!showInterviewForm)}
                  className="flex items-center text-sm font-bold text-primary-600 hover:text-primary-700 transition-colors p-2 px-3 rounded-xl bg-primary-50 active:scale-95"
                >
                   {showInterviewForm ? 'Cancel Entry' : <><Plus className="w-4 h-4 mr-1"/> Append Round</>}
                </button>
              </div>

              {showInterviewForm && (
                <form onSubmit={handleInterviewSubmit} className="mb-10 p-8 border-2 border-dashed border-primary-200 bg-primary-50/20 rounded-3xl animate-in fade-in slide-in-from-top-2 duration-300">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-extrabold text-primary-700 uppercase tracking-wider ml-1" htmlFor="round">Round Identity</label>
                        <input
                          id="round"
                          required
                          value={newInterview.round}
                          onChange={(e) => setNewInterview(prev => ({ ...prev, round: e.target.value }))}
                          className="input-field h-12 font-bold px-4 border-primary-100"
                          placeholder="e.g. System Design Architecture"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-extrabold text-primary-700 uppercase tracking-wider ml-1" htmlFor="date">Scheduled Timestamp</label>
                        <input
                          id="date"
                          type="datetime-local"
                          required
                          value={newInterview.interviewDate}
                          onChange={(e) => setNewInterview(prev => ({ ...prev, interviewDate: e.target.value }))}
                          className="input-field h-12 font-bold px-4 border-primary-100"
                        />
                      </div>
                      <div className="md:col-span-2 space-y-2">
                        <label className="text-xs font-extrabold text-primary-700 uppercase tracking-wider ml-1" htmlFor="interviewNotes">Session Notes</label>
                        <textarea
                          id="interviewNotes"
                          rows="3"
                          value={newInterview.notes}
                          onChange={(e) => setNewInterview(prev => ({ ...prev, notes: e.target.value }))}
                          className="input-field pt-3 font-medium min-h-[100px] border-primary-100 placeholder:text-primary-200"
                          placeholder="What were the key takeaways or follow-up tasks?"
                        />
                      </div>
                   </div>
                   <div className="flex justify-end mt-6">
                      <button type="submit" disabled={isSubmittingInterview} className="btn btn-primary h-12 shadow-lg shadow-primary-200 rounded-2xl px-8 font-bold">
                         {isSubmittingInterview ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Log Event'}
                      </button>
                   </div>
                </form>
              )}

              <div className="space-y-6">
                {interviews.length > 0 ? interviews.map((interview, index) => (
                  <div key={interview.id} className="relative flex group">
                    {index !== interviews.length - 1 && (
                      <div className="absolute left-6 top-8 bottom-0 w-0.5 bg-slate-100"></div>
                    )}
                    <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors z-10">
                       <Clock className="w-5 h-5" />
                    </div>
                    <div className="ml-6 flex-1 pb-10">
                       <div className="flex items-center justify-between">
                          <h4 className="text-lg font-bold text-slate-900 group-hover:text-primary-600 transition-colors">{interview.round}</h4>
                          <span className="text-xs font-bold text-slate-400 flex items-center bg-slate-50 px-2 py-1 rounded-lg">
                             <Calendar className="w-3.5 h-3.5 mr-1.5" />
                             {new Date(interview.interviewDate).toLocaleDateString()} at {new Date(interview.interviewDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          </span>
                       </div>
                       <p className="mt-2 text-slate-500 font-medium leading-relaxed bg-slate-50/50 p-4 rounded-2xl border border-slate-100 group-hover:border-primary-100 group-hover:bg-primary-50/10 transition-colors">
                          {interview.notes || "No session insights documented."}
                       </p>
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-20 p-8 border-2 border-dashed border-slate-100 rounded-3xl">
                     <Clock className="w-12 h-12 mx-auto text-slate-200 mb-4" />
                     <p className="text-slate-400 font-bold mb-1">No rounds documented yet.</p>
                     <p className="text-slate-300 font-medium text-sm">Synchronize your first interview to track progress.</p>
                  </div>
                )}
              </div>
           </section>
        </div>

        <div className="space-y-8">
           <section className="p-8 bg-slate-900 text-white rounded-[2.5rem] shadow-xl shadow-slate-200 overflow-hidden relative group">
              <Activity className="absolute -right-8 -bottom-8 w-48 h-48 opacity-[0.03] group-hover:scale-110 transition-transform duration-700" />
              <h3 className="text-xl font-bold mb-6">Phase Overview</h3>
              <div className="space-y-5">
                 <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-sm font-semibold uppercase tracking-widest">Submit Date</span>
                    <span className="font-bold text-indigo-400 font-mono tracking-tighter">{job.appliedDate || 'PENDING'}</span>
                 </div>
                 <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-sm font-semibold uppercase tracking-widest">Status Log</span>
                    <span className="font-bold text-emerald-400 font-mono tracking-tighter uppercase">{job.status}</span>
                 </div>
                 <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-sm font-semibold uppercase tracking-widest">Total Rounds</span>
                    <span className="font-bold text-primary-400 font-mono tracking-tighter">{interviews.length}</span>
                 </div>
              </div>
           </section>

           <section className="p-8 bg-amber-50 border border-amber-100 rounded-[2.5rem] text-amber-900 group">
              <h3 className="text-lg font-bold mb-4 flex items-center">
                 <Activity className="w-5 h-5 mr-2" /> Quick Actions
              </h3>
              <div className="space-y-3">
                 <button onClick={() => navigate('/add-job')} className="w-full flex items-center justify-between p-4 bg-white/60 hover:bg-white rounded-2xl text-sm font-bold shadow-sm transition-all border border-amber-200 group-hover:border-amber-300">
                    Duplicate Node <Plus className="w-4 h-4 ml-2" />
                 </button>
                 <button onClick={() => toast.error('Advanced analytics coming soon.')} className="w-full flex items-center justify-between p-4 bg-white/60 hover:bg-white rounded-2xl text-sm font-bold shadow-sm transition-all border border-amber-200 group-hover:border-amber-300">
                    Generate Resume <MoreHorizontal className="w-4 h-4 ml-2" />
                 </button>
              </div>
           </section>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;
