import { notification } from 'antd';
import { useEffect, useState, useContext } from 'react';
import { getUsersApi, updateProfileApi } from '../util/api.js';
import { AuthContext } from '../components/context/auth.context.jsx';
import PageHeader from '../components/ui/PageHeader.jsx';
import ProfileSidebar from '../components/profile/ProfileSidebar.jsx';
import ProfileForm from '../components/profile/ProfileForm.jsx';
import AdminUsersTable from '../components/profile/AdminUsersTable.jsx';

const UserPage = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('profile');
  const [usersList, setUsersList] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  const [name, setName] = useState(auth.user?.name || '');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const userRole = auth.user?.role || 'User';
  const isAdmin = userRole === 'Admin';

  useEffect(() => {
    if (auth.user?.name) {
      setName(auth.user.name);
    }
  }, [auth.user]);

  useEffect(() => {
    if (isAdmin && activeTab === 'admin') {
      const fetchUsers = async () => {
        setLoadingUsers(true);
        try {
          const users = await getUsersApi();
          setUsersList(Array.isArray(users) ? users : []);
        } catch (err) {
          notification.error({
            message: 'Không thể tải danh sách tài khoản',
            description: err?.message || 'Bạn không có quyền truy cập thông tin này.',
          });
        } finally {
          setLoadingUsers(false);
        }
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
      const data = await updateProfileApi(name.trim(), newPassword || undefined);
      localStorage.setItem('access_token', data.access_token);
      setAuth({
        ...auth,
        user: {
          ...auth.user,
          name: data.user.name,
        },
      });
      notification.success({
        message: 'Cập nhật thành công',
        description: 'Thông tin hồ sơ cá nhân của bạn đã được cập nhật!',
      });
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      notification.error({
        message: 'Cập nhật thất bại',
        description: err?.message || 'Có lỗi xảy ra khi cập nhật thông tin.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="luxury-page min-h-screen bg-[#080809] text-white">
      <div className="luxury-container py-12 px-4 md:px-8">
        <PageHeader
          eyebrow="Tài khoản"
          title="AutoVIP"
          highlight="Motors"
          description="Quản lý thông tin hồ sơ và bảo mật của bạn"
          className="mb-10"
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <ProfileSidebar
            user={auth.user}
            userRole={userRole}
            isAdmin={isAdmin}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          <div className="lg:col-span-3 bg-[#111112] border border-[#18181A] p-6 md:p-8">
            {activeTab === 'profile' && (
              <ProfileForm
                email={auth.user?.email || ''}
                name={name}
                onNameChange={(e) => setName(e.target.value)}
                newPassword={newPassword}
                onNewPasswordChange={(e) => setNewPassword(e.target.value)}
                confirmPassword={confirmPassword}
                onConfirmPasswordChange={(e) => setConfirmPassword(e.target.value)}
                submitting={submitting}
                onSubmit={handleUpdateProfile}
              />
            )}

            {activeTab === 'admin' && isAdmin && (
              <AdminUsersTable usersList={usersList} loadingUsers={loadingUsers} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
