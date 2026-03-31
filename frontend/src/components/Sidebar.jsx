import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase, 
  Calendar, 
  PlusCircle, 
  Settings,
  HelpCircle
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const Sidebar = () => {
  const links = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Jobs', path: '/jobs', icon: Briefcase },
    { name: 'Interviews', path: '/interviews', icon: Calendar },
    { name: 'Add Application', path: '/add-job', icon: PlusCircle },
  ];

  return (
    <aside className="fixed bottom-0 left-0 z-40 w-64 pt-5 pb-4 bg-white border-r top-16 border-slate-200">
      <div className="flex flex-col h-full px-3">
        <nav className="flex-1 space-y-1">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                twMerge(
                  clsx(
                    'flex items-center px-4 py-3 text-sm font-medium transition-colors rounded-xl',
                    isActive
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  )
                )
              }
            >
              <link.icon className="w-5 h-4 mr-3" />
              {link.name}
            </NavLink>
          ))}
        </nav>
        
        <div className="pt-4 mt-4 border-t border-slate-100">
          <nav className="space-y-1">
             <button className="flex items-center w-full px-4 py-3 text-sm font-medium transition-colors rounded-xl text-slate-500 hover:bg-slate-50 hover:text-slate-900">
                <Settings className="w-5 h-4 mr-3" />
                Settings
             </button>
             <button className="flex items-center w-full px-4 py-3 text-sm font-medium transition-colors rounded-xl text-slate-500 hover:bg-slate-50 hover:text-slate-900">
                <HelpCircle className="w-5 h-4 mr-3" />
                Support
             </button>
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
