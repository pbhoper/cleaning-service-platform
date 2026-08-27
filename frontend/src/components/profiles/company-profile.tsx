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
} from 'antd';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  EyeOutlined,
  StarOutlined,
  LockOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import {cleaningTypes} from "../booking/booking-modal.tsx";

const { Title, Text, Paragraph } = Typography;

export interface Order {
  id: number;
  clientName?: string;
  contact: string;
  address: string;
  cleaningType: string;
  smallRooms: number;
  largeRooms: number;
  bathrooms: number;
  date: string;
  startTime: string;
  recurrence: 'ONCE' | 'WEEKLY' | 'BIWEEKLY' | 'MONTHLY';
  recurrenceDurationMonths?: number;
  price: number;
  estimatedTimeMinutes: number;
  status: 'new' | 'confirmed' | 'cancelled';
  cancellationReason?: string;
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

const INITIAL_ORDERS: Order[] = [
  {
    id: 101,
    clientName: 'Алексей Иванов',
    contact: '+7 (999) 111-22-33',
    address: 'г. Москва, ул. Арбат, д. 12, кв. 34',
    cleaningType: 'Генеральная уборка',
    smallRooms: 2,
    largeRooms: 1,
    bathrooms: 2,
    date: '2026-09-01',
    startTime: '10:00',
    recurrence: 'ONCE',
    price: 7800,
    estimatedTimeMinutes: 225,
    status: 'new',
  },
  {
    id: 102,
    clientName: 'Елена Петрова',
    contact: 'elena@example.com',
    address: 'г. Москва, Ленинский пр-т, д. 45, кв. 89',
    cleaningType: 'Стандартная уборка помещений',
    smallRooms: 1,
    largeRooms: 1,
    bathrooms: 1,
    date: '2026-09-02',
    startTime: '14:00',
    recurrence: 'WEEKLY',
    recurrenceDurationMonths: 3,
    price: 3500,
    estimatedTimeMinutes: 135,
    status: 'confirmed',
  },
];

const INITIAL_REVIEWS: Review[] = [
  { id: 1, author: 'Ольга', rating: 5, date: '2026-08-20', comment: 'Отличная уборка, всё блестит!' },
  { id: 2, author: 'Дмитрий', rating: 4, date: '2026-08-18', comment: 'Пунктуальные клинеры, но немного затянули по времени.' },
  { id: 3, author: 'Мария', rating: 5, date: '2026-08-15', comment: 'Очень качественно отмыли сантехнику.' },
  { id: 4, author: 'Игорь', rating: 5, date: '2026-08-10', comment: 'Заказываем регулярно, нареканий нет.' },
  { id: 5, author: 'Светлана', rating: 4, date: '2026-08-05', comment: 'Хорошая клининговая служба.' },
  { id: 6, author: 'Екатерина', rating: 5, date: '2026-07-28', comment: 'Супер! Уборка после ремонта прошла на ура.' },
  { id: 7, author: 'Павел', rating: 5, date: '2026-07-20', comment: 'Рекомендую данную компанию.' },
];

export const CompanyDashboard: React.FC<CompanyDashboardProps> = ({ initialCompanyData }) => {
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [cancelForm] = Form.useForm();

  const [profileForm] = Form.useForm();
  const [reviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [visibleReviewsCount, setVisibleReviewsCount] = useState(5);

  useEffect(() => {
    if (initialCompanyData) {
      profileForm.setFieldsValue({
        name: initialCompanyData.name,
        address: initialCompanyData.address,
        description: initialCompanyData.description,
        logo: initialCompanyData.logo,
        serviceTypes: initialCompanyData.serviceTypes,
        priceSmallRoom: initialCompanyData.basePrices?.smallRoom,
        priceLargeRoom: initialCompanyData.basePrices?.largeRoom,
        priceBathroom: initialCompanyData.basePrices?.bathroom,
      });
    }
  }, [initialCompanyData, profileForm]);

  const handleConfirmOrder = (orderId: number) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: 'confirmed' } : o))
    );
    if (selectedOrder?.id === orderId) {
      setSelectedOrder((prev) => (prev ? { ...prev, status: 'confirmed' } : null));
    }
    message.success('Заказ подтвержден! Клиенту отправлено письмо.');
  };

  const handleOpenCancelModal = (order: Order) => {
    setSelectedOrder(order);
    setCancelModalOpen(true);
  };

  const handleConfirmCancel = async () => {
    try {
      const values = await cancelForm.validateFields();
      if (!selectedOrder) return;

      setOrders((prev) =>
        prev.map((o) =>
          o.id === selectedOrder.id
            ? { ...o, status: 'cancelled', cancellationReason: values.reason }
            : o
        )
      );

      if (selectedOrder) {
        setSelectedOrder((prev) =>
          prev ? { ...prev, status: 'cancelled', cancellationReason: values.reason } : null
        );
      }

      message.warning('Заказ отменен.');
      cancelForm.resetFields();
      setCancelModalOpen(false);
    } catch {
    }
  };

  const handleSaveProfile = (values: any) => {
    if (values.newPassword && values.newPassword !== values.confirmPassword) {
      message.error('Новые пароли не совпадают!');
      return;
    }
    message.success('Данные профиля успешно обновлены!');
  };

  const formatRecurrence = (order: Order) => {
    const map = {
      ONCE: 'Только один раз',
      WEEKLY: 'Каждую неделю',
      BIWEEKLY: 'Каждые две недели',
      MONTHLY: 'Каждый месяц',
    };
    let text = map[order.recurrence];
    if (order.recurrence !== 'ONCE' && order.recurrenceDurationMonths) {
      text += ` (Срок сделки: ${order.recurrenceDurationMonths} мес.)`;
    }
    return text;
  };

  const formatMinutes = (totalMinutes: number) => {
    const h = Math.floor(totalMinutes / 60);
    const m = totalMinutes % 60;
    return h > 0 ? `${h} ч. ${m} мин.` : `${m} мин.`;
  };

  const columns = [
    { title: '№ Заказа', dataIndex: 'id', key: 'id', width: 90 },
    { title: 'Дата и время', key: 'dateTime', render: (record: Order) => `${record.date} в ${record.startTime}` },
    { title: 'Тип уборки', dataIndex: 'cleaningType', key: 'cleaningType' },
    { title: 'Адрес', dataIndex: 'address', key: 'address' },
    { title: 'Сумма', key: 'price', render: (record: Order) => `${record.price.toLocaleString('ru-RU')} ₽` },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      render: (status: Order['status']) => {
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
          {record.status === 'new' && (
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
              onClick={() => handleOpenCancelModal(record)}
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
            label: 'Управление заказами',
            children: (
              <Card title="Список заказов клининга">
                <Table
                  dataSource={orders}
                  columns={columns}
                  rowKey="id"
                  pagination={{ pageSize: 5 }}
                />
              </Card>
            ),
          },
          {
            key: 'profile',
            label: 'Профиль и Отзывы',
            children: (
              <Row gutter={24}>
                <Col xs={24} lg={14}>
                  <Card title="Редактирование профиля службы">
                    <Form
                      form={profileForm}
                      layout="vertical"
                      onFinish={handleSaveProfile}
                      initialValues={{
                        name: 'ООО Чистый Дом',
                        address: 'г. Москва, ул. Мира, д. 5',
                        description: 'Профессиональная уборка квартир и офисов любой сложности.',
                        logo: 'https://via.placeholder.com/150',
                        serviceTypes: ['Стандартная уборка помещений', 'Генеральная уборка'],
                        priceSmallRoom: 800,
                        priceLargeRoom: 1200,
                        priceBathroom: 1500,
                      }}
                    >
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
                        <Checkbox.Group options={cleaningTypes.map((t) => ({ label: t, value: t }))} />
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
                        <Button type="primary" htmlType="submit" icon={<SaveOutlined />} block size="large">
                          Сохранить изменения
                        </Button>
                      </Form.Item>
                    </Form>
                  </Card>
                </Col>

                <Col xs={24} lg={10}>
                  <Card title="Рейтинг и отзывы">
                    <div style={{ textAlign: 'center', marginBottom: 20 }}>
                      <Title level={2} style={{ margin: 0 }}>4.8</Title>
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
                            <Text type="secondary" style={{ fontSize: 12 }}>{review.date}</Text>
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
            selectedOrder.status === 'new' && (
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
                  handleOpenCancelModal(selectedOrder);
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
            <Descriptions.Item label="Email / Телефон">
              {selectedOrder.contact}
            </Descriptions.Item>
            <Descriptions.Item label="Адрес / местоположение">
              {selectedOrder.address}
            </Descriptions.Item>
            <Descriptions.Item label="Тип уборки">
              {selectedOrder.cleaningType}
            </Descriptions.Item>
            <Descriptions.Item label="Описание помещения">
              Маленьких комнат (&lt;20м²): {selectedOrder.smallRooms}, Больших комнат (&gt;20м²): {selectedOrder.largeRooms}, Санузлов: {selectedOrder.bathrooms}
            </Descriptions.Item>
            <Descriptions.Item label="День проведения">
              {selectedOrder.date}
            </Descriptions.Item>
            <Descriptions.Item label="Ожидаемое время начала">
              {selectedOrder.startTime}
            </Descriptions.Item>
            <Descriptions.Item label="Планируемая регулярность">
              {formatRecurrence(selectedOrder)}
            </Descriptions.Item>
            <Descriptions.Item label="Цена уборки">
              <Text strong style={{ color: '#52c41a', fontSize: 16 }}>
                {selectedOrder.price.toLocaleString('ru-RU')} ₽
              </Text>
            </Descriptions.Item>
            <Descriptions.Item label="Ожидаемое время уборки">
              {formatMinutes(selectedOrder.estimatedTimeMinutes)}
            </Descriptions.Item>
            <Descriptions.Item label="Статус">
              {selectedOrder.status === 'confirmed' && <Tag color="green">Подтвержден</Tag>}
              {selectedOrder.status === 'cancelled' && <Tag color="red">Отменен</Tag>}
              {selectedOrder.status === 'new' && <Tag color="orange">Новый</Tag>}
            </Descriptions.Item>
            {selectedOrder.cancellationReason && (
              <Descriptions.Item label="Причина отмены">
                <Text type="danger">{selectedOrder.cancellationReason}</Text>
              </Descriptions.Item>
            )}
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
            <Input.TextArea rows={3} placeholder="Например: Отсутствие свободных клинеров на выбранное время" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};