import { notification, Table } from 'antd';
import { useEffect, useState, useContext } from 'react';
import { getUserApi, updateProfileApi } from '../util/api.js';
import { AuthContext } from '../components/context/auth.context.jsx';

const UserPage = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' | 'admin'
  const [usersList, setUsersList] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  // Form State
  const [name, setName] = useState(auth.user?.name || '');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const userRole = auth.user?.role || 'User';
  const isAdmin = userRole === 'Admin';

  // Keep state sync with context
  useEffect(() => {
    if (auth.user?.name) {
      setName(auth.user.name);
    }
  }, [auth.user]);

  // Fetch all users list if Admin
  useEffect(() => {
    if (isAdmin && activeTab === 'admin') {
      const fetchUsers = async () => {
        setLoadingUsers(true);
        const res = await getUserApi();
        if (res && !res.message) {
          setUsersList(res);
        } else {
          notification.error({
            message: 'Không thể tải danh sách tài khoản',
            description: res?.message || 'Bạn không có quyền truy cập thông tin này.',
          });
        }
        setLoadingUsers(false);
      };
      fetchUsers();
    }
  }, [isAdmin, activeTab]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      notification.warning({
        message: 'Thiếu thông tin',
        description: 'Vui lòng nhập họ và tên của bạn!',
      });
      return;
    }

    if (newPassword && newPassword !== confirmPassword) {
      notification.error({
        message: 'Lỗi xác nhận mật khẩu',
        description: 'Mật khẩu mới và mật khẩu xác nhận không khớp!',
      });
      return;
    }

    setSubmitting(true);
    try {
      const res = await updateProfileApi(name.trim(), newPassword || undefined);
      if (res && res.EC === 0) {
        localStorage.setItem('access_token', res.access_token);
        setAuth({
          ...auth,
          user: {
            ...auth.user,
            name: res.user.name,
          },
        });
        notification.success({
          message: 'Cập nhật thành công',
          description: 'Thông tin hồ sơ cá nhân của bạn đã được cập nhật!',
        });
        setNewPassword('');
        setConfirmPassword('');
      } else {
        notification.error({
          message: 'Cập nhật thất bại',
          description: res?.message || 'Có lỗi xảy ra khi cập nhật thông tin.',
        });
      }
    } catch (err) {
      notification.error({
        message: 'Lỗi kết nối',
        description: 'Không thể kết nối đến máy chủ. Vui lòng thử lại sau.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Ant Design Table Columns for Admin Users List
  const adminColumns = [
    {
      title: 'Mã số (ID)',
      dataIndex: '_id',
      key: '_id',
      render: (id) => <span className="font-mono text-xs text-[#8b95a5]">{id}</span>,
    },
    {
      title: 'Họ và tên',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <span className="font-semibold text-white">{text}</span>,
    },
    {
      title: 'Địa chỉ Email',
      dataIndex: 'email',
      key: 'email',
      render: (text) => <span className="text-[#8b95a5]">{text}</span>,
    },
    {
      title: 'Vai trò',
      dataIndex: 'role',
      key: 'role',
      render: (role) => (
        <span
          className={`inline-block px-2.5 py-0.5 text-[10px] font-bold tracking-widest uppercase border ${
            role === 'Admin'
              ? 'border-[#D4AF37] text-[#D4AF37] bg-[#D4AF37]/5'
              : 'border-[#1e2430] text-[#8b95a5] bg-[#0f1218]'
          }`}
        >
          {role}
        </span>
      ),
    },
  ];

  // Get Initials for Avatar
  const getInitials = (fullName) => {
    if (!fullName) return 'U';
    return fullName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <div className="luxury-page min-h-screen bg-[#05070a] text-white">
      <div className="luxury-container py-12 px-4 md:px-8">
        
        {/* Header Title */}
        <div className="mb-10">
          <h1 className="text-2xl font-bold uppercase tracking-widest border-l-4 border-[#D4AF37] pl-4">
            Tài Khoản AutoVIP
          </h1>
          <p className="text-[#8b95a5] text-xs mt-2 uppercase tracking-wider">
            Quản lý thông tin hồ sơ và bảo mật của bạn
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Left Column: Avatar & Summary */}
          <div className="lg:col-span-1 bg-[#0B0F14] border border-[#1e2430] p-6 flex flex-col items-center text-center">
            {/* Custom Premium Avatar */}
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#121620] to-[#1a202c] border border-[#D4AF37]/30 flex items-center justify-center shadow-lg shadow-[#000]/40 mb-4 relative group">
              <span className="text-[#D4AF37] text-2xl font-black tracking-widest font-serif">
                {getInitials(auth.user?.name)}
              </span>
              <div className="absolute inset-0 rounded-full border border-transparent group-hover:border-[#D4AF37] transition-all duration-500 scale-105" />
            </div>

            <h2 className="text-lg font-bold text-white tracking-wide truncate max-w-full">
              {auth.user?.name || 'Thành viên AutoVIP'}
            </h2>
            <p className="text-xs text-[#8b95a5] truncate max-w-full mb-4">
              {auth.user?.email}
            </p>

            <span className="px-3 py-1 text-[10px] font-black tracking-[0.2em] uppercase border border-[#D4AF37] text-[#0B0F14] bg-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.15)]">
              {userRole === 'Admin' ? 'QUẢN TRỊ VIÊN' : 'VIP MEMBER'}
            </span>

            {/* Tab Navigation Menu */}
            <div className="w-full mt-8 border-t border-[#1e2430]/50 pt-6 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('profile')}
                className={`w-full py-3 px-4 text-left text-xs font-bold tracking-widest uppercase transition-all duration-300 flex items-center gap-3 border-l-2 ${
                  activeTab === 'profile'
                    ? 'border-[#D4AF37] text-[#D4AF37] bg-[#D4AF37]/5'
                    : 'border-transparent text-[#8b95a5] hover:text-white hover:bg-white/5'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Thông tin hồ sơ
              </button>

              {isAdmin && (
                <button
                  type="button"
                  onClick={() => setActiveTab('admin')}
                  className={`w-full py-3 px-4 text-left text-xs font-bold tracking-widest uppercase transition-all duration-300 flex items-center gap-3 border-l-2 ${
                    activeTab === 'admin'
                      ? 'border-[#D4AF37] text-[#D4AF37] bg-[#D4AF37]/5'
                      : 'border-transparent text-[#8b95a5] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  Quản lý tài khoản
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Tab Content */}
          <div className="lg:col-span-3 bg-[#0B0F14] border border-[#1e2430] p-6 md:p-8">
            
            {/* Tab 1: Profile & Edit Profile */}
            {activeTab === 'profile' && (
              <div>
                <h3 className="text-lg font-bold tracking-widest text-[#D4AF37] uppercase mb-6 flex items-center gap-2">
                  <span>Hồ Sơ Cá Nhân</span>
                </h3>

                <form onSubmit={handleUpdateProfile} className="space-y-6 max-w-2xl">
                  {/* Email (Read Only) */}
                  <div>
                    <label className="block text-[#8b95a5] text-[10px] font-bold tracking-widest uppercase mb-2">
                      Địa chỉ Email (Không thể thay đổi)
                    </label>
                    <input
                      type="email"
                      value={auth.user?.email || ''}
                      disabled
                      className="w-full bg-[#05070a] border border-[#1e2430] text-gray-500 py-3 px-4 focus:outline-none cursor-not-allowed text-sm"
                    />
                  </div>

                  {/* Name Input */}
                  <div>
                    <label htmlFor="fullName" className="block text-[#8b95a5] text-[10px] font-bold tracking-widest uppercase mb-2">
                      Họ và tên của bạn
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Nhập họ và tên..."
                      className="w-full bg-[#05070a] border border-[#1e2430] text-white py-3 px-4 focus:outline-none focus:border-[#D4AF37] transition-all text-sm"
                    />
                  </div>

                  <div className="border-t border-[#1e2430]/50 pt-6">
                    <h4 className="text-xs font-black tracking-widest text-[#D4AF37] uppercase mb-4">
                      Thay Đổi Mật Khẩu (Tùy chọn)
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Password Input */}
                      <div>
                        <label htmlFor="newPassword" className="block text-[#8b95a5] text-[10px] font-bold tracking-widest uppercase mb-2">
                          Mật khẩu mới
                        </label>
                        <input
                          id="newPassword"
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="Mật khẩu mới..."
                          className="w-full bg-[#05070a] border border-[#1e2430] text-white py-3 px-4 focus:outline-none focus:border-[#D4AF37] transition-all text-sm"
                        />
                      </div>

                      {/* Confirm Password Input */}
                      <div>
                        <label htmlFor="confirmPassword" className="block text-[#8b95a5] text-[10px] font-bold tracking-widest uppercase mb-2">
                          Xác nhận mật khẩu mới
                        </label>
                        <input
                          id="confirmPassword"
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Xác nhận mật khẩu..."
                          className="w-full bg-[#05070a] border border-[#1e2430] text-white py-3 px-4 focus:outline-none focus:border-[#D4AF37] transition-all text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="luxury-btn-primary w-full md:w-auto px-8 py-3.5 text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2"
                    >
                      {submitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-[#0B0F14]" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Đang cập nhật...
                        </>
                      ) : (
                        'Lưu thay đổi'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Tab 2: Admin User Management List */}
            {activeTab === 'admin' && isAdmin && (
              <div>
                <h3 className="text-lg font-bold tracking-widest text-[#D4AF37] uppercase mb-6">
                  Quản Trị Danh Sách Tài Khoản
                </h3>

                <div className="bg-[#05070a] border border-[#1e2430] overflow-hidden">
                  <Table
                    loading={loadingUsers}
                    dataSource={usersList}
                    columns={adminColumns}
                    rowKey="_id"
                    pagination={{
                      pageSize: 10,
                      className: 'custom-table-pagination !mx-6 !my-4',
                    }}
                    className="custom-luxury-table"
                  />
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};

export default UserPage;
