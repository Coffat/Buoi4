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

  const isProductsPage = location.pathname === '/products';
  const showSolidNav = scrolled || isProductsPage;

  useEffect(() => {
    const onScroll = () => {
      if (!isProductsPage) setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [isProductsPage]);

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
    { label: 'TRANG CHỦ', to: '/', type: 'link' },
    { label: 'SẢN PHẨM', to: '/products', type: 'link' },
    { label: 'THƯƠNG HIỆU', to: '#thuong-hieu', type: 'anchor' },
    { label: 'TÀI CHÍNH', to: '#tai-chinh', type: 'anchor' },
    { label: 'GIỚI THIỆU', to: '#gioi-thieu', type: 'anchor' },
    { label: 'LIÊN HỆ', to: '#lien-he', type: 'anchor' },
  ];

  const isActive = (to) => location.pathname === to;

  const navLinkClass = (active) =>
    `text-[11px] tracking-[0.15em] font-medium transition-all pb-1 border-b ${
      active
        ? 'text-[#FAFAFA] border-[#FAFAFA]'
        : 'text-[#A1A1AA] border-transparent hover:text-[#FAFAFA]'
    }`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        showSolidNav ? 'bg-[#080809]/95 backdrop-blur-md border-b border-[#18181A]' : 'bg-transparent'
      }`}
    >
      <div className="luxury-container flex items-center h-[72px] justify-between gap-6">
        {/* ── Logo (left) ── */}
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <span className="font-display text-[#FAFAFA] text-base tracking-[0.25em] font-light">
            AUTOVIP <span className="text-[#C5B49E]">MOTORS</span>
          </span>
        </Link>

        {/* ── Nav links (center) ── */}
        <nav className="hidden lg:flex items-center justify-center gap-8">
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
        <div className="hidden lg:flex items-center gap-6 flex-shrink-0">
          <button
            type="button"
            onClick={scrollToSearch}
            className="text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors"
            aria-label="Tìm kiếm"
          >
            <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          <Link
            to="/cart"
            className="text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors relative flex items-center"
            aria-label="Giỏ hàng"
          >
            <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {totalCartItems > 0 && (
              <span className="absolute -top-1.5 -right-2.5 bg-[#FAFAFA] text-[#080809] text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-[#080809]">
                {totalCartItems}
              </span>
            )}
          </Link>

          {auth.isAuthenticated ? (
            <>
              <Link
                to="/user"
                className="text-[11px] text-[#A1A1AA] hover:text-[#FAFAFA] max-w-[150px] truncate transition-colors font-medium flex items-center gap-1.5 tracking-[0.1em]"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {auth.user.name || auth.user.email}
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="text-[11px] text-[#A1A1AA] hover:text-[#FAFAFA] tracking-[0.1em] transition-colors"
              >
                ĐĂNG XUẤT
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-[11px] tracking-[0.12em] font-medium text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors">
                ĐĂNG NHẬP
              </Link>
              <a href="#dat-lich" className="luxury-btn-primary !py-2 !px-4 text-[10px] tracking-[0.12em]">
                ĐẶT LỊCH LÁI THỬ
              </a>
            </>
          )}
        </div>

        {/* ── Mobile hamburger and Cart ── */}
        <div className="lg:hidden flex items-center gap-5">
          <Link
            to="/cart"
            className="text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors relative"
            aria-label="Giỏ hàng"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {totalCartItems > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#FAFAFA] text-[#080809] text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-[#080809]">
                {totalCartItems}
              </span>
            )}
          </Link>
          <button
            type="button"
            className="p-1 text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-[#18181A] bg-[#080809]/98 px-6 py-4 space-y-1">
          {navLinks.map(({ label, to, type }) =>
            type === 'link' ? (
              <Link
                key={to}
                to={to}
                className={`block py-3 text-[11px] tracking-[0.12em] ${isActive(to) ? 'text-[#C5B49E]' : 'text-[#A1A1AA]'}`}
                onClick={() => setMobileOpen(false)}
              >
                {label}
              </Link>
            ) : (
              <a
                key={to}
                href={to}
                className="block py-3 text-[11px] tracking-[0.12em] text-[#A1A1AA]"
                onClick={() => setMobileOpen(false)}
              >
                {label}
              </a>
            )
          )}
          {auth.isAuthenticated ? (
            <div className="pt-3 border-t border-[#18181A] flex flex-col gap-1">
              <Link
                to="/user"
                className="text-[11px] tracking-[0.1em] text-[#A1A1AA] hover:text-[#FAFAFA] py-2 flex items-center gap-2"
                onClick={() => setMobileOpen(false)}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                HỒ SƠ: {auth.user.name || auth.user.email}
              </Link>
              <button
                type="button"
                onClick={() => {
                  handleLogout();
                  setMobileOpen(false);
                }}
                className="text-left text-[11px] tracking-[0.1em] text-[#ef4444] hover:text-[#f87171] py-2 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                ĐĂNG XUẤT
              </button>
            </div>
          ) : (
            <div className="pt-3 flex gap-2">
              <Link to="/login" className="flex-1 text-center luxury-btn-ghost !py-2.5 text-xs tracking-[0.1em]" onClick={() => setMobileOpen(false)}>
                ĐĂNG NHẬP
              </Link>
              <a href="#dat-lich" className="flex-1 text-center luxury-btn-primary !py-2.5 text-xs tracking-[0.1em]" onClick={() => setMobileOpen(false)}>
                ĐẶT LỊCH
              </a>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
