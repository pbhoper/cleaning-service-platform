import React from 'react';
import { Dropdown, Avatar, Space, Button, message, type MenuProps } from 'antd';
import { UserOutlined, LogoutOutlined, HistoryOutlined, ShopOutlined } from '@ant-design/icons';
import { Link } from '@tanstack/react-router';

interface UserProfileProps {
  onOpenLogin: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ onOpenLogin }) => {
  const token = localStorage.getItem('access_token');
  const userRole = localStorage.getItem('user_role');

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_role');
    message.success('Вы вышли из системы');
    window.location.href = '/';
  };

  const isCompany = userRole === 'company';

  const items: MenuProps['items'] = isCompany
    ? [
      {
        key: 'company-profile',
        icon: <ShopOutlined />,
        label: <Link to="/cleaning-company">Кабинет компании</Link>,
      },
      {
        type: 'divider',
      },
      {
        key: 'logout',
        icon: <LogoutOutlined />,
        danger: true,
        label: 'Выйти',
        onClick: handleLogout,
      },
    ]
    : [
      {
        key: 'profile',
        icon: <UserOutlined />,
        label: <Link to="/profile">Мой профиль</Link>,
      },
      {
        key: 'history',
        icon: <HistoryOutlined />,
        label: <Link to="/history">Мои заказы</Link>,
      },
      {
        type: 'divider',
      },
      {
        key: 'logout',
        icon: <LogoutOutlined />,
        danger: true,
        label: 'Выйти',
        onClick: handleLogout,
      },
    ];

  if (!token) {
    return (
      <Button type="primary" onClick={onOpenLogin}>
        Войти / Регистрация
      </Button>
    );
  }

  return (
    <Dropdown menu={{ items }} placement="bottomRight" arrow>
      <Space style={{ cursor: 'pointer', padding: '4px 8px', borderRadius: '6px' }}>
        <Avatar
          icon={isCompany ? <ShopOutlined /> : <UserOutlined />}
          style={{ backgroundColor: isCompany ? '#52c41a' : '#1677ff' }}
        />
        <span style={{ fontWeight: 500 }}>
          {isCompany ? 'Кабинет компании' : 'Профиль'}
        </span>
      </Space>
    </Dropdown>
  );
};