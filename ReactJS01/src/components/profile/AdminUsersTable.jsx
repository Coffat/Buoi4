import { Table } from 'antd';

const adminColumns = [
  {
    title: 'Mã số (ID)',
    dataIndex: '_id',
    key: '_id',
    render: (id) => <span className="font-mono text-xs text-[#A1A1AA]">{id}</span>,
  },
  {
    title: 'Họ và tên',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <span className="font-medium text-white">{text}</span>,
  },
  {
    title: 'Địa chỉ Email',
    dataIndex: 'email',
    key: 'email',
    render: (text) => <span className="text-[#A1A1AA]">{text}</span>,
  },
  {
    title: 'Vai trò',
    dataIndex: 'role',
    key: 'role',
    render: (role) => (
      <span
        className={`inline-block px-2.5 py-0.5 text-[10px] font-bold tracking-widest uppercase border ${
          role === 'Admin'
            ? 'border-[#C5B49E] text-[#C5B49E] bg-[#C5B49E]/5'
            : 'border-[#18181A] text-[#A1A1AA] bg-[#080809]'
        }`}
      >
        {role}
      </span>
    ),
  },
];

const AdminUsersTable = ({ usersList, loadingUsers }) => (
  <div>
    <h3 className="text-lg font-medium tracking-wide text-[#C5B49E] uppercase mb-6">
      Quản trị danh sách tài khoản
    </h3>

    <div className="bg-[#080809] border border-[#18181A] overflow-hidden">
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
);

export default AdminUsersTable;
