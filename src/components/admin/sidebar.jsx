import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom'; // Import Link
import { DashboardOutlined, ShoppingOutlined, OrderedListOutlined, TagsOutlined } from '@ant-design/icons';

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
    key: 'orders',
    label: 'Orders',
    link: '/admin/orders',
    icon: <OrderedListOutlined />,
  },
  {
    key: 'vouchers', // New menu item key
    label: 'Vouchers', // Label for the menu item
    link: '/admin/vouchers', // Link to the vouchers page
    icon: <TagsOutlined />, // Icon for the vouchers menu item
  },
];

const SideBar = () => {
  return (
    <Sider
      width={250}
      className="site-layout-background" 
      breakpoint="lg" 
      collapsedWidth="0"
    >
      <div className="logo" style={{ fontWeight: 'bold', fontSize: '18px', textAlign: 'center', color: '#fff', padding: '20px 0' }}>
        Admin Dashboard
      </div>

      <Menu
        theme="dark" 
        mode="inline"
      >
        {menuItems.map(item => (
          <Menu.Item key={item.key} icon={item.icon}>
            <Link to={item.link} style={{ color: '#fff' }}>{item.label}</Link> {/* Ensure link has white color */}
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
};

export default SideBar;
