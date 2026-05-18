const getInitials = (fullName) => {
  if (!fullName) return 'U';
  return fullName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();
};

const ProfileSidebar = ({ user, userRole, isAdmin, activeTab, onTabChange }) => (
  <aside className="lg:col-span-1 bg-[#111112] border border-[#18181A] p-6 flex flex-col items-center text-center">
    <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#111112] to-[#18181A] border border-[#C5B49E]/30 flex items-center justify-center shadow-lg mb-4 relative group">
      <span className="text-[#C5B49E] text-2xl font-black tracking-widest font-serif">
        {getInitials(user?.name)}
      </span>
      <div className="absolute inset-0 rounded-full border border-transparent group-hover:border-[#C5B49E] transition-all duration-500 scale-105" />
    </div>

    <h2 className="text-lg font-medium text-white tracking-wide truncate max-w-full">
      {user?.name || 'Thành viên AutoVIP'}
    </h2>
    <p className="text-xs text-[#A1A1AA] truncate max-w-full mb-4 mt-1">
      {user?.email}
    </p>

    <span className="px-3 py-1 text-[10px] font-bold tracking-[0.2em] uppercase border border-[#C5B49E] text-[#080809] bg-[#C5B49E]">
      {userRole === 'Admin' ? 'Quản trị viên' : 'VIP Member'}
    </span>

    <nav className="w-full mt-8 border-t border-[#18181A] pt-6 flex flex-col gap-2" aria-label="Menu tài khoản">
      <button
        type="button"
        onClick={() => onTabChange('profile')}
        className={`w-full py-3 px-4 text-left text-xs font-semibold tracking-widest uppercase transition-all duration-300 flex items-center gap-3 border-l-2 ${
          activeTab === 'profile'
            ? 'border-[#C5B49E] text-[#C5B49E] bg-[#C5B49E]/5'
            : 'border-transparent text-[#A1A1AA] hover:text-white hover:bg-white/5'
        }`}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        Thông tin hồ sơ
      </button>

      {isAdmin && (
        <button
          type="button"
          onClick={() => onTabChange('admin')}
          className={`w-full py-3 px-4 text-left text-xs font-semibold tracking-widest uppercase transition-all duration-300 flex items-center gap-3 border-l-2 ${
            activeTab === 'admin'
              ? 'border-[#C5B49E] text-[#C5B49E] bg-[#C5B49E]/5'
              : 'border-transparent text-[#A1A1AA] hover:text-white hover:bg-white/5'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          Quản lý tài khoản
        </button>
      )}
    </nav>
  </aside>
);

export default ProfileSidebar;
