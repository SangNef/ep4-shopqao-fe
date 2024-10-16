import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom'; // Import Link
import { DashboardOutlined, UserOutlined, SettingOutlined, FileOutlined, BellOutlined, ShoppingOutlined } from '@ant-design/icons';

const { Sider } = Layout;

const menuItems = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    link: '/',
    icon: <DashboardOutlined />,
  },
  {
    key: 'products',
    label: 'Products',
    link: '/products',
    icon: <ShoppingOutlined />,
  },
  {
    key: 'users',
    label: 'Users',
    link: '/users',
    icon: <UserOutlined />,
  },
  {
    key: 'notifications',
    label: 'Notifications',
    link: '/notifications',
    icon: <BellOutlined />,
  },
  {
    key: 'files',
    label: 'Files',
    link: '/files',
    icon: <FileOutlined />,
  },
  {
    key: 'settings',
    label: 'Settings',
    link: '/settings',
    icon: <SettingOutlined />,
  },
];

const SideBar = () => {
  return (
    <Sider
      width={250}
       className="site-layout-background" breakpoint="lg" collapsedWidth="0"
    >
      <div className="logo" style={{ fontWeight: 'bold', fontSize: '18px', textAlign: 'center', color: '#fff', padding: '20px 0' }}>
        Admin Dashboard
      </div>

      <Menu
         theme="dark" mode="inline"
      >
        {menuItems.map(item => (
          <Menu.Item key={item.key} icon={item.icon}>
            <Link to={item.link}>{item.label}</Link> {/* Đảm bảo link có màu trắng */}
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
};

export default SideBar;
