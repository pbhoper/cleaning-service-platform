import React, { useState, useEffect } from 'react';
import {
  Card,
  Table,
  Tag,
  Button,
  Modal,
  Form,
  Input,
  Typography,
  Tabs,
  Layout,
  Avatar,
  message,
  Spin,
} from 'antd';
import {
  UserOutlined,
  LockOutlined,
  UnlockOutlined,
  SafetyCertificateOutlined,
  TeamOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { api } from '../api/axios';

const { Title, Text } = Typography;
const { Header, Content } = Layout;

export interface ClientUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'blocked';
  blockReason?: string;
}

export interface CleaningCompanyUser {
  id: number;
  name: string;
  email: string;
  status: 'active' | 'blocked';
  blockReason?: string;
}

export const AdminPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState<ClientUser[]>([]);
  const [companies, setCompanies] = useState<CleaningCompanyUser[]>([]);
  const [activeTarget, setActiveTarget] = useState<{
    item: ClientUser | CleaningCompanyUser;
    type: 'client' | 'company';
  } | null>(null);

  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
  const [isUnblockModalOpen, setIsUnblockModalOpen] = useState(false);
  const [blockForm] = Form.useForm();
  const [loginForm] = Form.useForm();

  const fetchData = async () => {
    setLoading(true);
    try {
      const [clientsRes, companiesRes] = await Promise.all([
        api.get('/clients'),
        api.get('/cleaning-company'),
      ]);

      setClients(
        clientsRes.data.map((item: any) => ({
          ...item,
          name: item.name || item.username || 'Без имени',
          status: item.status || 'active',
        }))
      );

      setCompanies(
        companiesRes.data.map((item: any) => ({
          ...item,
          status: item.status || 'active',
        }))
      );
    } catch (error) {
      message.error('Ошибка при загрузке списка пользователей');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const handleLogin = (values: any) => {
    if (values.email === 'admin@platform.ru' && values.password === 'admin123') {
      setIsAuthenticated(true);
      message.success('Авторизация успешна');
    } else {
      message.error('Неверный логин или пароль');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    loginForm.resetFields();
  };

  const handleOpenBlockModal = (item: ClientUser | CleaningCompanyUser, type: 'client' | 'company') => {
    setActiveTarget({ item, type });
    setIsBlockModalOpen(true);
  };

  const handleConfirmBlock = async () => {
    try {
      const values = await blockForm.validateFields();
      if (!activeTarget) return;

      const { item, type } = activeTarget;
      const endpoint = type === 'client' ? `/clients/${item.id}` : `/cleaning-company/${item.id}`;

      await api.patch(endpoint, {
        status: 'blocked',
        blockReason: values.reason,
      });

      message.error(`${type === 'client' ? 'Клиент' : 'Служба'} "${item.name}" заблокирована`);

      blockForm.resetFields();
      setIsBlockModalOpen(false);
      setActiveTarget(null);
      fetchData();
    } catch (error) {
      message.error('Ошибка при попытке заблокировать пользователя');
    }
  };

  const handleOpenUnblockModal = (item: ClientUser | CleaningCompanyUser, type: 'client' | 'company') => {
    setActiveTarget({ item, type });
    setIsUnblockModalOpen(true);
  };

  const handleConfirmUnblock = async () => {
    if (!activeTarget) return;

    try {
      const { item, type } = activeTarget;
      const endpoint = type === 'client' ? `/clients/${item.id}` : `/cleaning-company/${item.id}`;

      await api.patch(endpoint, {
        status: 'active',
        blockReason: null,
      });

      message.success(`${type === 'client' ? 'Клиент' : 'Служба'} "${item.name}" разблокирована`);

      setIsUnblockModalOpen(false);
      setActiveTarget(null);
      fetchData();
    } catch (error) {
      message.error('Ошибка при попытке разблокировать пользователя');
    }
  };

  const clientColumns = [
    { title: 'Имя пользователя', dataIndex: 'name', key: 'name' },
    {
      title: 'Email / Телефон',
      key: 'contacts',
      render: (r: ClientUser) => (
        <div>
          <div>{r.email}</div>
          <Text type="secondary" style={{ fontSize: 12 }}>{r.phone || '—'}</Text>
        </div>
      ),
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) =>
        status === 'active' ? <Tag color="green">Активен</Tag> : <Tag color="red">Заблокирован</Tag>,
    },
    {
      title: 'Причина блокировки',
      dataIndex: 'blockReason',
      key: 'blockReason',
      render: (reason?: string) => (reason ? <Text type="danger">{reason}</Text> : '—'),
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (record: ClientUser) =>
        record.status === 'active' ? (
          <Button danger size="small" icon={<LockOutlined />} onClick={() => handleOpenBlockModal(record, 'client')}>
            Заблокировать
          </Button>
        ) : (
          <Button type="primary" size="small" icon={<UnlockOutlined />} onClick={() => handleOpenUnblockModal(record, 'client')}>
            Разблокировать
          </Button>
        ),
    },
  ];

  const companyColumns = [
    { title: 'Название', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) =>
        status === 'active' ? <Tag color="green">Активен</Tag> : <Tag color="red">Заблокирован</Tag>,
    },
    {
      title: 'Причина блокировки',
      dataIndex: 'blockReason',
      key: 'blockReason',
      render: (reason?: string) => (reason ? <Text type="danger">{reason}</Text> : '—'),
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (record: CleaningCompanyUser) =>
        record.status === 'active' ? (
          <Button danger size="small" icon={<LockOutlined />} onClick={() => handleOpenBlockModal(record, 'company')}>
            Заблокировать
          </Button>
        ) : (
          <Button type="primary" size="small" icon={<UnlockOutlined />} onClick={() => handleOpenUnblockModal(record, 'company')}>
            Разблокировать
          </Button>
        ),
    },
  ];

  if (!isAuthenticated) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <Card style={{ width: 380, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <Avatar size={56} icon={<SafetyCertificateOutlined />} style={{ backgroundColor: '#1890ff', marginBottom: 12 }} />
            <Title level={4} style={{ margin: 0 }}>Вход для администратора</Title>
          </div>
          <Form form={loginForm} layout="vertical" onFinish={handleLogin}>
            <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Введите Email' }]}>
              <Input prefix={<UserOutlined />} placeholder="admin@platform.ru" />
            </Form.Item>
            <Form.Item name="password" label="Пароль" rules={[{ required: true, message: 'Введите пароль' }]}>
              <Input.Password prefix={<LockOutlined />} placeholder="Пароль" />
            </Form.Item>
            <Button type="primary" htmlType="submit" block style={{ marginTop: 8 }}>
              Войти
            </Button>
          </Form>
        </Card>
      </div>
    );
  }

  return (
    <Layout style={{ minHeight: '80vh', background: '#f0f2f5' }}>
      <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#001529', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#fff' }}>
          <SafetyCertificateOutlined style={{ fontSize: 20 }} />
          <span style={{ fontSize: 16, fontWeight: 600 }}>Панель администратора</span>
        </div>
        <Button icon={<LogoutOutlined />} onClick={handleLogout}>
          Выйти
        </Button>
      </Header>

      <Content style={{ maxWidth: 1100, width: '100%', margin: '24px auto', padding: '0 16px' }}>
        <Spin spinning={loading}>
          <Tabs
            type="card"
            items={[
              {
                key: 'clients',
                label: (
                  <span>
                    <UserOutlined /> Список клиентов
                  </span>
                ),
                children: (
                  <Card title="Управление клиентами">
                    <Table dataSource={clients} columns={clientColumns} rowKey="id" pagination={{ pageSize: 5 }} />
                  </Card>
                ),
              },
              {
                key: 'companies',
                label: (
                  <span>
                    <TeamOutlined /> Список клининговых служб
                  </span>
                ),
                children: (
                  <Card title="Управление клининговыми службами">
                    <Table dataSource={companies} columns={companyColumns} rowKey="id" pagination={{ pageSize: 5 }} />
                  </Card>
                ),
              },
            ]}
          />
        </Spin>
      </Content>

      <Modal
        title={`Блокировка: ${activeTarget?.item.name}`}
        open={isBlockModalOpen}
        onOk={handleConfirmBlock}
        onCancel={() => {
          blockForm.resetFields();
          setIsBlockModalOpen(false);
        }}
        okText="Заблокировать"
        okButtonProps={{ danger: true }}
        cancelText="Отмена"
      >
        <Form form={blockForm} layout="vertical">
          <Form.Item
            name="reason"
            label="Причина блокировки"
            rules={[{ required: true, message: 'Пожалуйста, укажите причину блокировки' }]}
          >
            <Input.TextArea rows={4} placeholder="Укажите подробную причину блокировки..." />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Подтверждение разблокировки"
        open={isUnblockModalOpen}
        onOk={handleConfirmUnblock}
        onCancel={() => setIsUnblockModalOpen(false)}
        okText="Разблокировать"
        cancelText="Отмена"
      >
        <p>Вы уверены, что хотите разблокировать <b>{activeTarget?.item.name}</b>?</p>
      </Modal>
    </Layout>
  );
};