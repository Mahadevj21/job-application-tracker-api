import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-40 bg-white border-b border-slate-200">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex items-center flex-shrink-0">
              <Link to="/" className="text-xl font-bold text-primary-600">
                JobTracker<span className="text-slate-900">.</span>
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="flex items-center px-3 py-1 text-sm font-medium rounded-full bg-slate-100 text-slate-700">
              <User className="w-4 h-4 mr-2" />
              {user?.username}
            </span>
            <button
              onClick={logout}
              className="flex items-center px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:text-red-700 hover:bg-red-50 rounded-lg"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
