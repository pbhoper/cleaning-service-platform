import React, { useState } from 'react';
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
} from 'antd';
import {
  UserOutlined,
  LockOutlined,
  UnlockOutlined,
  SafetyCertificateOutlined,
  TeamOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

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

const INITIAL_CLIENTS: ClientUser[] = [
  { id: 1, name: 'Алексей Иванов', email: 'alexey@example.com', phone: '+7 (999) 111-22-33', status: 'active' },
  { id: 2, name: 'Елена Петрова', email: 'elena@example.com', phone: '+7 (999) 222-33-44', status: 'blocked', blockReason: 'Систематические отмены заказов' },
];

const INITIAL_COMPANIES: CleaningCompanyUser[] = [
  { id: 1, name: 'ООО Чистый Дом', email: 'clean@house.ru', status: 'active' },
  { id: 2, name: 'ИП Блеск и Чистота', email: 'blesk@clean.ru', status: 'blocked', blockReason: 'Жалобы клиентов на качество' },
];

export const AdminPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [clients, setClients] = useState<ClientUser[]>(INITIAL_CLIENTS);
  const [companies, setCompanies] = useState<CleaningCompanyUser[]>(INITIAL_COMPANIES);

  const [activeTarget, setActiveTarget] = useState<{
    item: ClientUser | CleaningCompanyUser;
    type: 'client' | 'company';
  } | null>(null);

  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
  const [isUnblockModalOpen, setIsUnblockModalOpen] = useState(false);
  const [blockForm] = Form.useForm();
  const [loginForm] = Form.useForm();

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

      if (type === 'client') {
        setClients((prev) =>
          prev.map((c) => (c.id === item.id ? { ...c, status: 'blocked', blockReason: values.reason } : c))
        );
        message.error(`Клиент ${item.name} заблокирован`);
      } else {
        setCompanies((prev) =>
          prev.map((c) => (c.id === item.id ? { ...c, status: 'blocked', blockReason: values.reason } : c))
        );
        message.error(`Служба "${item.name}" заблокирована`);
      }

      console.log(`[Уведомление]: Отправлено сообщение о блокировке на ${item.email}. Причина: ${values.reason}`);

      blockForm.resetFields();
      setIsBlockModalOpen(false);
      setActiveTarget(null);
    } catch {}
  };

  const handleOpenUnblockModal = (item: ClientUser | CleaningCompanyUser, type: 'client' | 'company') => {
    setActiveTarget({ item, type });
    setIsUnblockModalOpen(true);
  };

  const handleConfirmUnblock = () => {
    if (!activeTarget) return;

    const { item, type } = activeTarget;

    if (type === 'client') {
      setClients((prev) =>
        prev.map((c) => (c.id === item.id ? { ...c, status: 'active', blockReason: undefined } : c))
      );
      message.success(`Клиент ${item.name} разблокирован`);
    } else {
      setCompanies((prev) =>
        prev.map((c) => (c.id === item.id ? { ...c, status: 'active', blockReason: undefined } : c))
      );
      message.success(`Служба "${item.name}" разблокирована`);
    }

    console.log(`[Уведомление]: Отправлено сообщение о разблокировке на ${item.email}`);

    setIsUnblockModalOpen(false);
    setActiveTarget(null);
  };

  const clientColumns = [
    { title: 'Имя пользователя', dataIndex: 'name', key: 'name' },
    {
      title: 'Email / Телефон',
      key: 'contacts',
      render: (r: ClientUser) => (
        <div>
          <div>{r.email}</div>
          <Text type="secondary" style={{ fontSize: 12 }}>{r.phone}</Text>
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
        <Text type="secondary">
          Пользователю/службе будет отправлено автоматическое уведомление о восстановлении доступа.
        </Text>
      </Modal>
    </Layout>
  );
};