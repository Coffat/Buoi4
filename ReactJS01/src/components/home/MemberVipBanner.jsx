import { useContext } from 'react';
import { AuthContext } from '../context/auth.context.jsx';

const MemberVipBanner = () => {
  const { auth } = useContext(AuthContext);

  if (!auth.isAuthenticated) return null;

  return (
    <section className="luxury-section pb-0 pt-16">
      <div className="luxury-container">
        <div className="p-6 border border-[#C5B49E]/30 bg-[#111112]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <span className="section-eyebrow">Ưu đãi thành viên VIP</span>
              <h3 className="text-base font-medium text-white tracking-wide">
                Chào mừng trở lại, {auth.user.name || auth.user.email}!
              </h3>
              <p className="text-[#A1A1AA] text-xs font-light leading-relaxed max-w-xl">
                Tài khoản hạng{' '}
                <strong className="text-white font-medium">{auth.user.role || 'Thành viên'}</strong>{' '}
                đang được áp dụng chiết khấu đặc quyền{' '}
                <strong className="text-[#C5B49E] font-medium">5%</strong> trên toàn hệ thống showroom.
              </p>
            </div>
            <span className="text-[10px] font-bold text-[#C5B49E] border border-[#C5B49E]/40 px-3.5 py-1.5 bg-[#C5B49E]/5 uppercase tracking-widest whitespace-nowrap self-start md:self-center">
              VIP Active
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MemberVipBanner;
