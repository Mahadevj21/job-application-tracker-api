import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex pt-16">
        <Sidebar aria-label="Sidebar navigation" />
        <main className="flex-1 ml-64 p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
