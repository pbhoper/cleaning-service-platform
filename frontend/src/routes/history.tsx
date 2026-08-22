import { useState } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import {
  Table,
  Tag,
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
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
const { Title, Text } = Typography;

export type RegularityType = 'один раз' | 'каждую неделю' | 'каждые две недели' | 'каждый месяц';
export type OrderStatus = 'активная' | 'неактивная';

export interface CleaningOrder {
  id: string;
  serviceType: string;
  address: string;
  rooms: {
    small: number;
    large: number;
    bathrooms: number;
  };
  days: string[];
  startTime: string;
  regularity: RegularityType;
  contractDuration?: string;
  companyName: string;
  price: number;
  cleaningDurationHours: number;
  createdDate: string;
  status: OrderStatus;
}

const MOCK_ORDERS: CleaningOrder[] = [
  {
    id: '1',
    serviceType: 'Поддерживающая уборка',
    address: 'ул. Ленина, д. 45, кв. 12',
    rooms: { small: 2, large: 1, bathrooms: 1 },
    days: ['Понедельник', 'Четверг'],
    startTime: '10:00',
    regularity: 'каждую неделю',
    contractDuration: '6 месяцев',
    companyName: 'Чистый Дом',
    price: 3500,
    cleaningDurationHours: 3.5,
    createdDate: '2026-02-15',
    status: 'активная',
  },
  {
    id: '2',
    serviceType: 'Генеральная уборка',
    address: 'пр. Мира, д. 10, кв. 88',
    rooms: { small: 1, large: 2, bathrooms: 2 },
    days: ['Суббота'],
    startTime: '12:00',
    regularity: 'один раз',
    companyName: 'ЭкоКлининг',
    price: 7800,
    cleaningDurationHours: 6,
    createdDate: '2026-01-20',
    status: 'неактивная',
  },
  {
    id: '3',
    serviceType: 'Уборка после ремонта',
    address: 'ул. Гагарина, д. 3, кв. 104',
    rooms: { small: 3, large: 2, bathrooms: 2 },
    days: ['Среда'],
    startTime: '09:00',
    regularity: 'один раз',
    companyName: 'Блеск Сервис',
    price: 12500,
    cleaningDurationHours: 8,
    createdDate: '2026-02-01',
    status: 'активная',
  },
];

export const Route = createFileRoute('/history')({
  component: OrdersPage,
});

function OrdersPage() {
  const navigate = useNavigate();
  const token = localStorage.getItem('access_token');

  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [searchAddress, setSearchAddress] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | null>(null);

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

  const serviceOptions = Array.from(new Set(MOCK_ORDERS.map((o) => o.serviceType)));
  const companyOptions = Array.from(new Set(MOCK_ORDERS.map((o) => o.companyName)));
  const filteredData = MOCK_ORDERS.filter((order) => {
  const matchService = !selectedService || order.serviceType === selectedService;
  const matchCompany = !selectedCompany || order.companyName === selectedCompany;
  const matchAddress = !searchAddress || order.address.toLowerCase().includes(searchAddress.toLowerCase());
  const matchStatus = !selectedStatus || order.status === selectedStatus;

  return matchService && matchCompany && matchAddress && matchStatus;
  });

  const columns: ColumnsType<CleaningOrder> = [
    {
      title: 'Услуга и Компания',
      key: 'service',
      render: (_, record) => (
        <Space direction="vertical" size={2}>
          <Text strong>{record.serviceType}</Text>
          <Text type="secondary" style={{ fontSize: 12 }}>
            Компания: {record.companyName}
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
      title: 'Описание помещения',
      key: 'rooms',
      render: (_, record) => (
        <Text style={{ fontSize: 13 }}>
          {record.rooms.small} мал. / {record.rooms.large} бол. комн.
          <br />
          Санузлов: {record.rooms.bathrooms}
        </Text>
      ),
    },
    {
      title: 'Расписание',
      key: 'schedule',
      render: (_, record) => (
        <Space direction="vertical" size={2}>
          <Text style={{ fontSize: 13 }}>Дни: {record.days.join(', ')}</Text>
          <Text type="secondary" style={{ fontSize: 12 }}>
            Начало в {record.startTime}
          </Text>
        </Space>
      ),
    },
    {
      title: 'Регулярность',
      key: 'regularity',
      render: (_, record) => (
        <Space direction="vertical" size={2}>
          <Tag color={record.regularity === 'один раз' ? 'blue' : 'purple'}>
            {record.regularity}
          </Tag>
          {record.contractDuration && (
            <Text type="secondary" style={{ fontSize: 11 }}>
              Срок сделки: {record.contractDuration}
            </Text>
          )}
        </Space>
      ),
    },
    {
      title: 'Время уборки',
      dataIndex: 'cleaningDurationHours',
      key: 'cleaningDurationHours',
      sorter: (a, b) => a.cleaningDurationHours - b.cleaningDurationHours,
      render: (hours: number) => `${hours} ч.`,
    },
    {
      title: 'Цена',
      dataIndex: 'price',
      key: 'price',
      sorter: (a, b) => a.price - b.price,
      render: (price: number) => `${price.toLocaleString('ru-RU')} ₽`,
    },
    {
      title: 'Дата',
      dataIndex: 'createdDate',
      key: 'createdDate',
      sorter: (a, b) => new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime(),
      render: (date: string) => new Date(date).toLocaleDateString('ru-RU'),
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      render: (status: OrderStatus) => (
        <Badge
          status={status === 'активная' ? 'success' : 'default'}
          text={status === 'активная' ? 'Активная' : 'Неактивная'}
        />
      ),
    },
  ];

  return (
    <div style={{ maxWidth: 1200, margin: '40px auto', padding: '0 16px' }}>
      <Title level={2} style={{ marginBottom: 24 }}>
        Мои заказы
      </Title>

      <Card bordered={false} style={{ marginBottom: 24, boxShadow: '0 4px 16px rgba(0,0,0,0.08)', borderRadius: 12 }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={6}>
            <Input
              placeholder="Фильтр по адресу"
              prefix={<SearchOutlined />}
              value={searchAddress}
              onChange={(e) => setSearchAddress(e.target.value)}
              allowClear
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Select
              style={{ width: '100%' }}
              placeholder="Тип услуги"
              allowClear
              value={selectedService}
              onChange={setSelectedService}
              options={serviceOptions.map((s) => ({ label: s, value: s }))}
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Select
              style={{ width: '100%' }}
              placeholder="Компания"
              allowClear
              value={selectedCompany}
              onChange={setSelectedCompany}
              options={companyOptions.map((c) => ({ label: c, value: c }))}
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Select
              style={{ width: '100%' }}
              placeholder="Статус"
              allowClear
              value={selectedStatus}
              onChange={setSelectedStatus}
              options={[
                { label: 'Активная', value: 'активная' },
                { label: 'Неактивная', value: 'неактивная' },
              ]}
            />
          </Col>
        </Row>
      </Card>

      <Card bordered={false} style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.08)', borderRadius: 12, padding: 0 }}>
        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          scroll={{ x: 900 }}
        />
      </Card>
    </div>
  );
}