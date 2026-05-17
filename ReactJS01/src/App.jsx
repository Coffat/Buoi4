import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import axios from './util/axios.customize.js';
import { useContext, useEffect } from 'react';
import { AuthContext } from './components/context/auth.context.jsx';

function App() {
  const { setAuth, appLoading, setAppLoading } = useContext(AuthContext);
  const location = useLocation();
  const hasHero = location.pathname === '/' || location.pathname === '/inventory';

  useEffect(() => {
    const fetchAccount = async () => {
      setAppLoading(true);
      try {
        const res = await axios.get('/v1/api/account');
        if (res && !res.message) {
          setAuth({
            isAuthenticated: true,
            user: {
              email: res.email,
              name: res.name,
              role: res.role || 'User',
            },
          });
        }
      } catch {
        /* no valid session */
      } finally {
        setAppLoading(false);
      }
    };
    fetchAccount();
  }, [setAuth, setAppLoading]);

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F14]">
      <Navbar />
      <main className="flex-1" style={hasHero ? {} : { paddingTop: '72px' }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
