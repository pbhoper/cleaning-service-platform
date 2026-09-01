import { useState, useEffect } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import {
  Table,
  Card,
  Typography,
  Result,
  Button,
  Select,
  Input,
  Space,
  Row,
  Col,
  Badge,
  Spin,
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

const { Title, Text } = Typography;

export interface OrderEntity {
  id: number;
  companyId: number;
  userId: number;
  clientName: string;
  serviceType: string;
  address: string;
  smallRooms: number;
  largeRooms: number;
  bathrooms: number;
  price: number;
  estimatedTimeMinutes: number;
  status: string;
  createdAt: string;
}

export const Route = createFileRoute('/history')({
  component: OrdersPage,
});

function OrdersPage() {
  const navigate = useNavigate();
  const token = localStorage.getItem('access_token');
  const userId = localStorage.getItem('user_id');

  const [orders, setOrders] = useState<OrderEntity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [searchAddress, setSearchAddress] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  useEffect(() => {
    if (token && userId) {
      setLoading(true);
      fetch(`http://localhost:3000/order/user/${userId}`)
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setOrders(data);
          }
        })
        .catch((err) => console.error('Ошибка загрузки заказов:', err))
        .finally(() => setLoading(false));
    }
  }, [token, userId]);

  if (!token) {
    return (
      <div style={{ padding: '60px 20px', textAlign: 'center' }}>
        <Result
          status="403"
          title="Доступ ограничен"
          subTitle="Просматривать историю заказов могут только авторизованные пользователи."
          extra={
            <Button type="primary" onClick={() => navigate({ to: '/' })}>
              На главную
            </Button>
          }
        />
      </div>
    );
  }

  const serviceOptions = Array.from(new Set(orders.map((o) => o.serviceType)));
  const filteredData = orders.filter((order) => {
    const matchService = !selectedService || order.serviceType === selectedService;
    const matchAddress = !searchAddress || order.address.toLowerCase().includes(searchAddress.toLowerCase());
    const matchStatus = !selectedStatus || order.status === selectedStatus;

    return matchService && matchAddress && matchStatus;
  });

  const columns: ColumnsType<OrderEntity> = [
    {
      title: 'Услуга',
      key: 'serviceType',
      render: (_, record) => (
        <Space direction="vertical" size={2}>
          <Text strong>{record.serviceType}</Text>
          <Text type="secondary" style={{ fontSize: 12 }}>
            Заказ №{record.id}
          </Text>
        </Space>
      ),
    },
    {
      title: 'Адрес',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Помещение',
      key: 'rooms',
      render: (_, record) => (
        <Text style={{ fontSize: 13 }}>
          {record.smallRooms} мал. / {record.largeRooms} бол. комн.
          <br />
          Санузлов: {record.bathrooms}
        </Text>
      ),
    },
    {
      title: 'Время выполнения',
      dataIndex: 'estimatedTimeMinutes',
      key: 'estimatedTimeMinutes',
      sorter: (a, b) => a.estimatedTimeMinutes - b.estimatedTimeMinutes,
      render: (mins: number) => `${Math.round(mins / 60)} ч. (${mins} мин.)`,
    },
    {
      title: 'Цена',
      dataIndex: 'price',
      key: 'price',
      sorter: (a, b) => a.price - b.price,
      render: (price: number) => `${price?.toLocaleString('ru-RU')} ₽`,
    },
    {
      title: 'Дата',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      render: (date: string) => new Date(date).toLocaleDateString('ru-RU'),
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const isConfirmed = status === 'confirmed';
        const isOpen = status === 'open';
        return (
          <Badge
            status={isConfirmed ? 'success' : isOpen ? 'processing' : 'default'}
            text={isConfirmed ? 'Подтвержден' : isOpen ? 'В обработке' : status}
          />
        );
      },
    },
  ];

  return (
    <div style={{ maxWidth: 1200, margin: '40px auto', padding: '0 16px' }}>
      <Title level={2} style={{ marginBottom: 24 }}>
        Мои заказы
      </Title>

      <Card bordered={false} style={{ marginBottom: 24, boxShadow: '0 4px 16px rgba(0,0,0,0.08)', borderRadius: 12 }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Input
              placeholder="Фильтр по адресу"
              prefix={<SearchOutlined />}
              value={searchAddress}
              onChange={(e) => setSearchAddress(e.target.value)}
              allowClear
            />
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Select
              style={{ width: '100%' }}
              placeholder="Тип услуги"
              allowClear
              value={selectedService}
              onChange={setSelectedService}
              options={serviceOptions.map((s) => ({ label: s, value: s }))}
            />
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Select
              style={{ width: '100%' }}
              placeholder="Статус"
              allowClear
              value={selectedStatus}
              onChange={setSelectedStatus}
              options={[
                { label: 'В обработке', value: 'open' },
                { label: 'Подтвержден', value: 'confirmed' },
                { label: 'Отменен', value: 'cancelled' },
              ]}
            />
          </Col>
        </Row>
      </Card>

      <Card bordered={false} style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.08)', borderRadius: 12, padding: 0 }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: 40 }}>
            <Spin size="large" />
          </div>
        ) : (
          <Table
            columns={columns}
            dataSource={filteredData}
            rowKey="id"
            pagination={{ pageSize: 10 }}
            scroll={{ x: 900 }}
          />
        )}
      </Card>
    </div>
  );
}