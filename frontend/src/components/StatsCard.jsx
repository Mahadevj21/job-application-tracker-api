import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const StatsCard = ({ title, value, icon: Icon, trend, colorClass }) => {
  return (
    <div className="p-6 transition-all bg-white shadow-sm border border-slate-200 rounded-2xl hover:shadow-md hover:border-primary-100 group">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h3 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">{value}</h3>
        </div>
        <div className={twMerge(clsx('p-3 rounded-xl transition-colors', colorClass))}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      {trend && (
        <div className="flex items-center mt-4 text-sm font-medium text-emerald-600">
           <span className="flex items-center px-1.5 py-0.5 rounded-full bg-emerald-50 mr-2 text-xs font-semibold">
              +{trend}%
           </span>
           <span className="text-slate-400 font-normal">vs last month</span>
        </div>
      )}
    </div>
  );
};

export default StatsCard;
