import { Outlet } from 'react-router-dom';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';
import AmbientGlow from '../Components/Common/SVG/AmbientGlow';

const Main = () => {
  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-between overflow-x-hidden">
      {/* Background Ambient Radial Glow */}
      <AmbientGlow variant="subtle" />

      {/* Floating Glass Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-grow pt-24 sm:pt-28">
        <Outlet />
      </main>

      {/* Modern Glass Footer */}
      <Footer />
    </div>
  );
};

export default Main;
