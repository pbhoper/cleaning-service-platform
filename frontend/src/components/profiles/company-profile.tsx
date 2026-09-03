import React, { useState, useEffect } from 'react';
import {
  Tabs,
  Card,
  Table,
  Tag,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Checkbox,
  Rate,
  List,
  Typography,
  Row,
  Col,
  Space,
  Divider,
  message,
  Descriptions,
  Calendar,
  Badge,
  Select,
  Spin,
} from 'antd';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  EyeOutlined,
  StarOutlined,
  LockOutlined,
  SaveOutlined,
  CalendarOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { type Dayjs } from 'dayjs';

const { Title, Text, Paragraph } = Typography;

export interface Order {
  id: number;
  companyId: number;
  userId?: number;
  clientName: string;
  serviceType: string;
  address: string;
  smallRooms: number;
  largeRooms: number;
  bathrooms: number;
  price: number;
  estimatedTimeMinutes: number;
  status: 'open' | 'confirmed' | 'cancelled';
  createdAt?: string;
}

export interface Review {
  id: number;
  author: string;
  rating: number;
  date: string;
  comment: string;
}

interface CompanyDashboardProps {
  initialCompanyData?: any;
}

const MONTH_NAMES = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь',
];

const INITIAL_REVIEWS: Review[] = [
  { id: 1, author: 'Ольга', rating: 5, date: '2026-08-20', comment: 'Отличная уборка, всё блестит!' },
  { id: 2, author: 'Дмитрий', rating: 4, date: '2026-08-18', comment: 'Пунктуальные клинеры, но немного затянули по времени.' },
  { id: 3, author: 'Мария', rating: 5, date: '2026-08-15', comment: 'Очень качественно отмыли сантехнику.' },
  { id: 4, author: 'Игорь', rating: 5, date: '2026-08-10', comment: 'Заказываем регулярно, нареканий нет.' },
  { id: 5, author: 'Светлана', rating: 4, date: '2026-08-05', comment: 'Хорошая клининговая служба.' },
];

export const CompanyDashboard: React.FC<CompanyDashboardProps> = ({ initialCompanyData }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [savingProfile, setSavingProfile] = useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState<boolean>(false);
  const [cancelModalOpen, setCancelModalOpen] = useState<boolean>(false);
  const [cancelForm] = Form.useForm();
  const [profileForm] = Form.useForm();
  const [reviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [visibleReviewsCount, setVisibleReviewsCount] = useState<number>(5);

  const companyId = initialCompanyData?.id || Number(localStorage.getItem('company_id')) || 1;

  const fetchCompanyOrders = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/order/company/${companyId}`);
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      }
    } catch {
      message.error('Не удалось загрузить заказы из базы данных');
    } finally {
      setLoading(false);
    }
  };

  const fetchCompanyProfile = async () => {
    try {
      const res = await fetch(`http://localhost:3000/cleaning-company/${companyId}`);
      if (res.ok) {
        const data = await res.json();
        profileForm.setFieldsValue({
          name: data.name || '',
          address: data.address || '',
          description: data.description || '',
          logo: data.logo || '',
          serviceTypes: data.serviceTypes || [],
          priceSmallRoom: data.priceSmallRoom || data.basePrices?.smallRoom || 0,
          priceLargeRoom: data.priceLargeRoom || data.basePrices?.largeRoom || 0,
          priceBathroom: data.priceBathroom || data.basePrices?.bathroom || 0,
        });
      }
    } catch {
      message.error('Не удалось загрузить данные профиля компании');
    }
  };

  useEffect(() => {
    fetchCompanyOrders();
    fetchCompanyProfile();
  }, [companyId]);

  const handleConfirmOrder = async (orderId: number) => {
    try {
      const res = await fetch(`http://localhost:3000/order/${orderId}/confirm`, {
        method: 'PATCH',
      });
      if (res.ok) {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, status: 'confirmed' } : o)),
        );
        if (selectedOrder?.id === orderId) {
          setSelectedOrder((prev) => (prev ? { ...prev, status: 'confirmed' } : null));
        }
        message.success('Заказ подтвержден!');
      }
    } catch {
      message.error('Ошибка при подтверждении заказа');
    }
  };

  const handleConfirmCancel = async () => {
    if (!selectedOrder) return;
    try {
      const res = await fetch(`http://localhost:3000/order/${selectedOrder.id}/cancel`, {
        method: 'PATCH',
      });
      if (res.ok) {
        setOrders((prev) =>
          prev.map((o) => (o.id === selectedOrder.id ? { ...o, status: 'cancelled' } : o)),
        );
        if (selectedOrder) {
          setSelectedOrder((prev) => (prev ? { ...prev, status: 'cancelled' } : null));
        }
        message.warning('Заказ отменен.');
        cancelForm.resetFields();
        setCancelModalOpen(false);
      }
    } catch {
      message.error('Ошибка при отмене заказа');
    }
  };

  const handleSaveProfile = async (values: any) => {
    if (values.newPassword && values.newPassword !== values.confirmPassword) {
      message.error('Новые пароли не совпадают!');
      return;
    }

    setSavingProfile(true);
    try {
      const payload = {
        name: values.name,
        address: values.address,
        description: values.description,
        logo: values.logo,
        serviceTypes: values.serviceTypes,
        priceSmallRoom: Number(values.priceSmallRoom || 0),
        priceLargeRoom: Number(values.priceLargeRoom || 0),
        priceBathroom: Number(values.priceBathroom || 0),
        ...(values.newPassword && { password: values.newPassword }),
      };

      const res = await fetch(`http://localhost:3000/cleaning-company/${companyId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error();
      message.success('Данные профиля компании успешно обновлены!');
    } catch {
      message.error('Ошибка при сохранении профиля компании');
    } finally {
      setSavingProfile(false);
    }
  };

  const formatMinutes = (totalMinutes: number) => {
    const h = Math.floor(totalMinutes / 60);
    const m = totalMinutes % 60;
    return h > 0 ? `${h} ч. ${m} мин.` : `${m} мин.`;
  };

  const dateCellRender = (value: Dayjs) => {
    const dateStr = value.format('YYYY-MM-DD');
    const dayOrders = orders.filter((o) => o.createdAt && o.createdAt.startsWith(dateStr));

    return (
      <div style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {dayOrders.map((order) => {
          let badgeStatus: 'warning' | 'success' | 'error' = 'warning';
          if (order.status === 'confirmed') badgeStatus = 'success';
          if (order.status === 'cancelled') badgeStatus = 'error';

          return (
            <div
              key={order.id}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedOrder(order);
                setDetailsModalOpen(true);
              }}
              style={{
                cursor: 'pointer',
                marginBottom: 4,
                fontSize: 11,
                padding: '2px 4px',
                borderRadius: 4,
                backgroundColor:
                  order.status === 'confirmed'
                    ? '#f6ffed'
                    : order.status === 'cancelled'
                      ? '#fff2f0'
                      : '#fffbe6',
                border: `1px solid ${
                  order.status === 'confirmed'
                    ? '#b7eb8f'
                    : order.status === 'cancelled'
                      ? '#ffccc7'
                      : '#ffe58f'
                }`,
              }}
            >
              <Badge status={badgeStatus} text={<b>№{order.id}</b>} />
              <div
                style={{
                  color: '#444',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {order.serviceType}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const columns = [
    { title: '№ Заказа', dataIndex: 'id', key: 'id', width: 90 },
    { title: 'Клиент', dataIndex: 'clientName', key: 'clientName' },
    { title: 'Тип уборки', dataIndex: 'serviceType', key: 'serviceType' },
    { title: 'Адрес', dataIndex: 'address', key: 'address' },
    {
      title: 'Сумма',
      key: 'price',
      render: (record: Order) => `${(record.price || 0).toLocaleString('ru-RU')} ₽`,
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        if (status === 'confirmed') return <Tag color="green">Подтвержден</Tag>;
        if (status === 'cancelled') return <Tag color="red">Отменен</Tag>;
        return <Tag color="orange">Новый</Tag>;
      },
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (record: Order) => (
        <Space>
          <Button
            icon={<EyeOutlined />}
            size="small"
            onClick={() => {
              setSelectedOrder(record);
              setDetailsModalOpen(true);
            }}
          >
            Детали
          </Button>
          {record.status === 'open' && (
            <Button
              type="primary"
              icon={<CheckCircleOutlined />}
              size="small"
              onClick={() => handleConfirmOrder(record.id)}
            >
              Подтвердить
            </Button>
          )}
          {record.status !== 'cancelled' && (
            <Button
              danger
              icon={<CloseCircleOutlined />}
              size="small"
              onClick={() => {
                setSelectedOrder(record);
                setCancelModalOpen(true);
              }}
            >
              Отменить
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div style={{ maxWidth: 1100, margin: '30px auto', padding: '0 16px' }}>
      <Tabs
        defaultActiveKey="orders"
        type="card"
        items={[
          {
            key: 'orders',
            label: (
              <span>
                <UnorderedListOutlined /> Управление заказами
              </span>
            ),
            children: (
              <Card title="Список заказов клининга">
                {loading ? (
                  <div style={{ textAlign: 'center', padding: '24px 0' }}>
                    <Spin tip="Загрузка заказов..." />
                  </div>
                ) : (
                  <Table
                    dataSource={orders}
                    columns={columns}
                    rowKey="id"
                    pagination={{ pageSize: 8 }}
                  />
                )}
              </Card>
            ),
          },
          {
            key: 'calendar',
            label: (
              <span>
                <CalendarOutlined /> Календарь службы
              </span>
            ),
            children: (
              <Card title="Календарь расписания заказов">
                <Calendar
                  cellRender={(date) => dateCellRender(date)}
                  headerRender={({ value, onChange }) => {
                    const currentMonth = value.month();

                    return (
                      <div
                        style={{
                          padding: '8px 16px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 12,
                        }}
                      >
                        <Text strong style={{ fontSize: 16 }}>
                          Месяц:
                        </Text>
                        <Select
                          value={currentMonth}
                          onChange={(newMonth) => {
                            const now = value.clone().month(newMonth);
                            onChange(now);
                          }}
                          style={{ width: 140 }}
                        >
                          {MONTH_NAMES.map((month, index) => (
                            <Select.Option key={index} value={index}>
                              {month}
                            </Select.Option>
                          ))}
                        </Select>
                      </div>
                    );
                  }}
                />
              </Card>
            ),
          },
          {
            key: 'profile',
            label: (
              <span>
                <UserOutlined /> Профиль и Отзывы
              </span>
            ),
            children: (
              <Row gutter={24}>
                <Col xs={24} lg={14}>
                  <Card title="Редактирование профиля службы">
                    <Form form={profileForm} layout="vertical" onFinish={handleSaveProfile}>
                      <Form.Item name="logo" label="URL логотипа">
                        <Input />
                      </Form.Item>

                      <Form.Item name="name" label="Название компании" rules={[{ required: true }]}>
                        <Input />
                      </Form.Item>

                      <Form.Item name="description" label="Описание">
                        <Input.TextArea rows={3} />
                      </Form.Item>

                      <Form.Item name="address" label="Адрес">
                        <Input />
                      </Form.Item>

                      <Form.Item name="serviceTypes" label="Типы оказываемых услуг">
                        <Checkbox.Group
                          options={[
                            'Стандартная уборка',
                            'Генеральная уборка',
                            'Уборка после ремонта',
                          ]}
                        />
                      </Form.Item>

                      <Divider>Расценки на услуги</Divider>
                      <Row gutter={12}>
                        <Col span={8}>
                          <Form.Item name="priceSmallRoom" label="Маленькая комната (₽)">
                            <InputNumber min={0} style={{ width: '100%' }} />
                          </Form.Item>
                        </Col>
                        <Col span={8}>
                          <Form.Item name="priceLargeRoom" label="Большая комната (₽)">
                            <InputNumber min={0} style={{ width: '100%' }} />
                          </Form.Item>
                        </Col>
                        <Col span={8}>
                          <Form.Item name="priceBathroom" label="Санузел (₽)">
                            <InputNumber min={0} style={{ width: '100%' }} />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Divider>Смена пароля</Divider>
                      <Form.Item name="oldPassword" label="Старый пароль">
                        <Input.Password prefix={<LockOutlined />} />
                      </Form.Item>
                      <Row gutter={12}>
                        <Col span={12}>
                          <Form.Item name="newPassword" label="Новый пароль">
                            <Input.Password prefix={<LockOutlined />} />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item name="confirmPassword" label="Подтверждение нового пароля">
                            <Input.Password prefix={<LockOutlined />} />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Form.Item style={{ marginTop: 16 }}>
                        <Button
                          type="primary"
                          htmlType="submit"
                          icon={<SaveOutlined />}
                          block
                          size="large"
                          loading={savingProfile}
                        >
                          Сохранить изменения
                        </Button>
                      </Form.Item>
                    </Form>
                  </Card>
                </Col>

                <Col xs={24} lg={10}>
                  <Card title="Рейтинг и отзывы">
                    <div style={{ textAlign: 'center', marginBottom: 20 }}>
                      <Title level={2} style={{ margin: 0 }}>
                        4.8
                      </Title>
                      <Rate disabled defaultValue={4.8} allowHalf character={<StarOutlined />} />
                      <div style={{ marginTop: 4 }}>
                        <Text type="secondary">На основе {reviews.length} отзывов</Text>
                      </div>
                    </div>

                    <Divider />

                    <List
                      itemLayout="vertical"
                      dataSource={reviews.slice(0, visibleReviewsCount)}
                      renderItem={(review) => (
                        <List.Item key={review.id} style={{ padding: '12px 0' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text strong>{review.author}</Text>
                            <Text type="secondary" style={{ fontSize: 12 }}>
                              {review.date}
                            </Text>
                          </div>
                          <Rate disabled defaultValue={review.rating} style={{ fontSize: 12, margin: '4px 0' }} />
                          <Paragraph style={{ margin: 0, fontSize: 13 }}>{review.comment}</Paragraph>
                        </List.Item>
                      )}
                    />

                    {visibleReviewsCount < reviews.length && (
                      <Button
                        block
                        style={{ marginTop: 16 }}
                        onClick={() => setVisibleReviewsCount((prev) => prev + 5)}
                      >
                        Загрузить еще
                      </Button>
                    )}
                  </Card>
                </Col>
              </Row>
            ),
          },
        ]}
      />

      {selectedOrder && (
        <Modal
          title={`Детали заказа №${selectedOrder.id}`}
          open={detailsModalOpen}
          onCancel={() => setDetailsModalOpen(false)}
          footer={[
            selectedOrder.status === 'open' && (
              <Button
                key="confirm"
                type="primary"
                icon={<CheckCircleOutlined />}
                onClick={() => handleConfirmOrder(selectedOrder.id)}
              >
                Подтвердить
              </Button>
            ),
            selectedOrder.status !== 'cancelled' && (
              <Button
                key="cancel"
                danger
                icon={<CloseCircleOutlined />}
                onClick={() => {
                  setDetailsModalOpen(false);
                  setCancelModalOpen(true);
                }}
              >
                Отменить заказ
              </Button>
            ),
            <Button key="close" onClick={() => setDetailsModalOpen(false)}>
              Закрыть
            </Button>,
          ]}
          width={650}
        >
          <Descriptions column={1} bordered size="small">
            <Descriptions.Item label="Имя клиента">
              {selectedOrder.clientName || 'Не указано'}
            </Descriptions.Item>
            <Descriptions.Item label="Адрес / местоположение">
              {selectedOrder.address}
            </Descriptions.Item>
            <Descriptions.Item label="Тип уборки">
              {selectedOrder.serviceType}
            </Descriptions.Item>
            <Descriptions.Item label="Описание помещения">
              Маленьких комнат: {selectedOrder.smallRooms}, Больших комнат: {selectedOrder.largeRooms}, Санузлов: {selectedOrder.bathrooms}
            </Descriptions.Item>
            <Descriptions.Item label="Цена уборки">
              <Text strong style={{ color: '#52c41a', fontSize: 16 }}>
                {(selectedOrder.price || 0).toLocaleString('ru-RU')} ₽
              </Text>
            </Descriptions.Item>
            <Descriptions.Item label="Ожидаемое время уборки">
              {formatMinutes(selectedOrder.estimatedTimeMinutes || 0)}
            </Descriptions.Item>
            <Descriptions.Item label="Статус">
              {selectedOrder.status === 'confirmed' && <Tag color="green">Подтвержден</Tag>}
              {selectedOrder.status === 'cancelled' && <Tag color="red">Отменен</Tag>}
              {selectedOrder.status === 'open' && <Tag color="orange">Новый</Tag>}
            </Descriptions.Item>
          </Descriptions>
        </Modal>
      )}

      <Modal
        title="Подтверждение отмены заказа"
        open={cancelModalOpen}
        onOk={handleConfirmCancel}
        onCancel={() => {
          cancelForm.resetFields();
          setCancelModalOpen(false);
        }}
        okText="Подтвердить отмену"
        okButtonProps={{ danger: true }}
        cancelText="Назад"
      >
        <Form form={cancelForm} layout="vertical">
          <Form.Item
            name="reason"
            label="Укажите причину отмены заказа"
            rules={[{ required: true, message: 'Пожалуйста, укажите причину отмены' }]}
          >
            <Input.TextArea rows={3} placeholder="Например: Отсутствие свободных клинеров" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};