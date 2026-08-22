import React from 'react';
import { Dropdown, Avatar, Space, Button, message, type MenuProps } from 'antd';
import { UserOutlined, LogoutOutlined, HistoryOutlined, SettingOutlined } from '@ant-design/icons';
import { Link, useNavigate } from '@tanstack/react-router';

interface UserProfileProps {
  onOpenLogin: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ onOpenLogin }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('access_token');

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    message.success('Вы вышли из системы');
    navigate({ to: '/' });
  };

  const items: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: <Link to="/profile">Мой профиль</Link>,
    },
    {
      key: 'orders',
      icon: <HistoryOutlined />,
      label: 'Мои заказы',
      onClick: () => message.info('Раздел заказов добавим позже'),
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Настройки',
      onClick: () => message.info('Настройки добавим позже'),
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
        <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#1677ff' }} />
        <span style={{ fontWeight: 500 }}>Профиль</span>
      </Space>
    </Dropdown>
  );
};