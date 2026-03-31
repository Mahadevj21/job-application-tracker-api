import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, UserPlus, Loader2, Info } from 'lucide-react';
import { toast } from 'react-hot-toast';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'USER',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await register(formData);
      toast.success('Registration completed successfully! Welcome aboard.');
      navigate('/');
    } catch (err) {
      toast.error(err.message || 'Identity registration failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg space-y-8 bg-white p-10 rounded-3xl shadow-2xl border border-slate-100 animate-in slide-in-from-bottom-5 duration-500">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-600 text-white mb-6 shadow-lg shadow-primary-200">
             <UserPlus className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Create Personal Workspace</h2>
          <p className="mt-3 text-slate-500 text-sm font-medium">Join thousands of professionals tracking their success</p>
        </div>
        
        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="md:col-span-1">
              <label className="block text-sm font-semibold text-slate-700 ml-1 mb-1.5" htmlFor="username">Public Alias</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 group-focus-within:text-primary-500 transition-colors">
                   <User className="w-4 h-4" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className="input-field pl-10 h-11"
                  placeholder="jdoe"
                />
              </div>
            </div>

            <div className="md:col-span-1">
              <label className="block text-sm font-semibold text-slate-700 ml-1 mb-1.5" htmlFor="email">Work Email</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 group-focus-within:text-primary-500 transition-colors">
                   <Mail className="w-4 h-4" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field pl-10 h-11"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 ml-1 mb-1.5" htmlFor="password">Security Access Key</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 group-focus-within:text-primary-500 transition-colors">
                   <Lock className="w-4 h-4" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="input-field pl-10 h-11"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 ml-1 mb-1.5" htmlFor="role">User Authority</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="input-field h-11 appearance-none bg-slate-50 border-dashed"
              >
                <option value="USER">Personal Account</option>
                <option value="ADMIN">Team Administrator</option>
              </select>
              <div className="mt-3 flex items-center p-3 text-xs font-semibold text-slate-500 bg-slate-100 rounded-xl border border-slate-200">
                <Info className="w-4 h-4 mr-2 text-primary-500" />
                Administrators can audit team application patterns
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary w-full h-12 text-base font-bold shadow-lg shadow-primary-100 active:scale-[0.98] mt-4"
          >
            {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Finalize Registration'}
          </button>

          <p className="text-center text-sm font-medium text-slate-500 mt-6">
            Already verified?{' '}
            <Link to="/login" className="text-primary-600 hover:text-primary-700 font-bold transition-colors border-b-2 border-primary-100 hover:border-primary-600">
              Access account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
