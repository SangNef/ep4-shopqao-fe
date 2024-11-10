import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom'; // Import Link
import { DashboardOutlined, ShoppingOutlined, OrderedListOutlined, TagsOutlined, UserOutlined } from '@ant-design/icons';

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
    key: 'vouchers',
    label: 'Vouchers',
    link: '/admin/vouchers',
    icon: <TagsOutlined />,
  },
  {
    key: 'user',
    label: 'Customers',
    link: '/admin/customers',
    icon: <UserOutlined />,
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
        className="py-2"  // Thêm padding cho toàn bộ menu
      >
        {menuItems.map(item => (
          <Menu.Item 
            key={item.key} 
            icon={item.icon}
            className="text-lg !py-8 px-6 hover:bg-gray-700" // Tăng kích thước text, thêm padding và hiệu ứng hover
          >
            <Link to={item.link} style={{ color: '#fff' }}>{item.label}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
};

export default SideBar;
