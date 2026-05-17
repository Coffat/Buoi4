import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AuthContext } from '../context/auth.context';

const Navbar = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const cartItems = useSelector((state) => state.cart.items);
  const totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    setAuth({ isAuthenticated: false, user: { email: '', name: '' } });
    navigate('/');
  };

  const scrollToSearch = () => {
    document.getElementById('hero-search')?.scrollIntoView({ behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Trang chủ', to: '/', type: 'link' },
    { label: 'Kho xe', to: '/inventory', type: 'link' },
    { label: 'Thương hiệu', to: '#thuong-hieu', type: 'anchor' },
    { label: 'Tài chính', to: '#tai-chinh', type: 'anchor' },
    { label: 'Giới thiệu', to: '#gioi-thieu', type: 'anchor' },
    { label: 'Liên hệ', to: '#lien-he', type: 'anchor' },
  ];

  const isActive = (to) => location.pathname === to;

  const navLinkClass = (active) =>
    `text-[13px] font-medium transition-colors pb-1 border-b-2 ${
      active
        ? 'text-[#D4AF37] border-[#D4AF37]'
        : 'text-white/90 border-transparent hover:text-white'
    }`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#05070a]/92 backdrop-blur-md border-b border-[#1e2430]' : 'bg-transparent'
      }`}
    >
      <div className="luxury-container flex items-center h-[72px] gap-6">
        {/* ── Logo (left) ── */}
        <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
          <span className="w-9 h-9 bg-[#D4AF37] flex items-center justify-center text-[#0a0a0a] font-black text-lg leading-none">
            V
          </span>
          <span className="hidden sm:flex flex-col leading-none">
            <span className="font-display text-white font-bold text-[14px] tracking-wide">AUTOVIP</span>
            <span className="text-[#8b95a5] text-[8px] tracking-[0.22em] uppercase font-medium">MOTORS</span>
          </span>
        </Link>

        {/* ── Nav links (center, grows to fill) ── */}
        <nav className="hidden lg:flex items-center justify-center gap-8 flex-1">
          {navLinks.map(({ label, to, type }) =>
            type === 'link' ? (
              <Link key={to} to={to} className={navLinkClass(isActive(to))}>
                {label}
              </Link>
            ) : (
              <a key={to} href={to} className={navLinkClass(false)}>
                {label}
              </a>
            )
          )}
        </nav>

        {/* ── Actions (right) ── */}
        <div className="hidden lg:flex items-center gap-4 flex-shrink-0 ml-auto">
          <button
            type="button"
            onClick={scrollToSearch}
            className="text-white/80 hover:text-[#D4AF37] transition-colors"
            aria-label="Tìm kiếm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          <Link
            to="/cart"
            className="text-white/80 hover:text-[#D4AF37] transition-colors relative flex items-center"
            aria-label="Giỏ hàng"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {totalCartItems > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#ef4444] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-[#05070a]">
                {totalCartItems}
              </span>
            )}
          </Link>

          {auth.isAuthenticated ? (
            <>
              <Link
                to="/user"
                className="text-[13px] text-[#8b95a5] hover:text-[#D4AF37] max-w-[150px] truncate transition-colors font-medium flex items-center gap-1.5"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                {auth.user.name || auth.user.email}
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="text-[13px] text-white/70 hover:text-white transition-colors"
              >
                Đăng xuất
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-[13px] font-medium text-white/90 hover:text-[#D4AF37] transition-colors">
                Đăng nhập
              </Link>
              <a href="#dat-lich" className="luxury-btn-primary !py-2.5 !px-5 text-[12px]">
                Đặt lịch lái thử
              </a>
            </>
          )}
        </div>

        {/* ── Mobile hamburger and Cart ── */}
        <div className="lg:hidden ml-auto flex items-center gap-4">
          <Link
            to="/cart"
            className="text-white/80 hover:text-[#D4AF37] transition-colors relative"
            aria-label="Giỏ hàng"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {totalCartItems > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#ef4444] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-[#05070a]">
                {totalCartItems}
              </span>
            )}
          </Link>
          <button
            type="button"
            className="p-1 text-white/80"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-[#1e2430] bg-[#05070a]/98 px-6 py-4 space-y-1">
          {navLinks.map(({ label, to, type }) =>
            type === 'link' ? (
              <Link
                key={to}
                to={to}
                className={`block py-3 text-sm ${isActive(to) ? 'text-[#D4AF37]' : 'text-[#9CA3AF]'}`}
                onClick={() => setMobileOpen(false)}
              >
                {label}
              </Link>
            ) : (
              <a
                key={to}
                href={to}
                className="block py-3 text-sm text-[#9CA3AF]"
                onClick={() => setMobileOpen(false)}
              >
                {label}
              </a>
            )
          )}
          {auth.isAuthenticated ? (
            <div className="pt-3 border-t border-[#1e2430]/50 flex flex-col gap-1">
              <Link
                to="/user"
                className="text-sm text-[#8b95a5] hover:text-[#D4AF37] py-2 flex items-center gap-2"
                onClick={() => setMobileOpen(false)}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                Hồ sơ: {auth.user.name || auth.user.email}
              </Link>
              <button
                type="button"
                onClick={() => {
                  handleLogout();
                  setMobileOpen(false);
                }}
                className="text-left text-sm text-[#ef4444] hover:text-[#f87171] py-2 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Đăng xuất
              </button>
            </div>
          ) : (
            <div className="pt-3 flex gap-2">
              <Link to="/login" className="flex-1 text-center luxury-btn-ghost !py-2.5 text-sm" onClick={() => setMobileOpen(false)}>
                Đăng nhập
              </Link>
              <a href="#dat-lich" className="flex-1 text-center luxury-btn-primary !py-2.5 text-sm" onClick={() => setMobileOpen(false)}>
                Đặt lịch
              </a>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
