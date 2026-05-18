import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { getMeApi } from './util/api.js';
import { useContext, useEffect } from 'react';
import { AuthContext } from './components/context/auth.context.jsx';

function App() {
  const { setAuth, appLoading, setAppLoading } = useContext(AuthContext);
  const location = useLocation();
  const hasHero = location.pathname === '/';
  const isAuthRoute = ['/login', '/register', '/forgot-password', '/reset-password'].includes(location.pathname);

  useEffect(() => {
    const fetchAccount = async () => {
      setAppLoading(true);
      try {
        const user = await getMeApi();
        if (user?.email) {
          setAuth({
            isAuthenticated: true,
            user: {
              email: user.email,
              name: user.name,
              role: user.role || 'User',
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
      <main className={`flex-1 ${isAuthRoute ? 'auth-main' : ''}`} style={hasHero || isAuthRoute ? {} : { paddingTop: '72px' }}>
        <Outlet />
      </main>
      {!isAuthRoute && <Footer />}
    </div>
  );
}

export default App;
