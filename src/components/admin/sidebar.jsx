import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom'; // Import Link
import { DashboardOutlined, UserOutlined, SettingOutlined, FileOutlined, BellOutlined, ShoppingOutlined, OrderedListOutlined } from '@ant-design/icons';

const { Sider } = Layout;

const menuItems = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    link: '/admin',
    icon: <DashboardOutlined />,
  },
  {
    key: 'products',
    label: 'Products',
    link: '/admin/products',
    icon: <ShoppingOutlined />,
  },
  {
    key: 'orders', // New menu item key
    label: 'Orders', // Label for the menu item
    link: '/admin/orders', // Link to the orders page
    icon: <OrderedListOutlined />, // Icon for the orders menu item
  },
  {
    key: 'users',
    label: 'Users',
    link: '/admin/users',
    icon: <UserOutlined />,
  },
  {
    key: 'notifications',
    label: 'Notifications',
    link: '/admin/notifications',
    icon: <BellOutlined />,
  },
  {
    key: 'files',
    label: 'Files',
    link: '/admin/files',
    icon: <FileOutlined />,
  },
  {
    key: 'settings',
    label: 'Settings',
    link: '/admin/settings',
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
