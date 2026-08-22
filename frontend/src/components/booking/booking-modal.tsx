import React, { useState, useEffect } from 'react';
import {
  Modal,
  Form,
  Input,
  Select,
  InputNumber,
  DatePicker,
  TimePicker,
  Radio,
  Button,
  Typography,
  Row,
  Col,
  Space,
  message,
  Alert,
  Card,
} from 'antd';
import { GoogleOutlined, FacebookOutlined, LoginOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import {CompanySelectionModal} from "../cleaning/cleaning.tsx";

const { Title } = Typography;
const { Option } = Select;

export const cleaningTypes = [
  'Стандартная уборка помещений',
  'Генеральная уборка',
  'Уборка после ремонта и строительства',
  'Химчистка ковров',
  'Уборка офисов',
  'Химчистка мебели и покрытий',
  'Промышленная уборка',
  'Уборка бассейна',
];

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
  selectedCompany?: { id: number; name: string } | null;
  onOpenLogin?: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  open,
  onClose,
  selectedCompany = null,
  onOpenLogin,
  }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [recurrence, setRecurrence] = useState<string>('ONCE');
  const [companiesModalOpen, setCompaniesModalOpen] = useState<boolean>(false);
  const [bookingData, setBookingData] = useState<any>(null);

  const isLoggedIn = !!localStorage.getItem('access_token');

  useEffect(() => {
    if (open && isLoggedIn) {
      form.setFieldsValue({
        address: 'г. Москва, ул. Ленина, д. 10, кв. 45',
        cleaningType: 'Стандартная уборка помещений',
        smallRooms: 2,
        largeRooms: 1,
        bathrooms: 1,
        startTime: dayjs('10:00', 'HH:mm'),
        recurrence: 'ONCE',
      });
    }
  }, [open, isLoggedIn, form]);

  const handleSubmit = async (values: any) => {
    const formattedValues = {
      ...values,
      date: values.date?.format('YYYY-MM-DD'),
      startTime: values.startTime?.format('HH:mm'),
    };

    if (selectedCompany) {
      setLoading(true);
      try {
        console.log('Отправка заявки:', { ...formattedValues, companyId: selectedCompany.id });
        message.success(`Заявка успешно оформлена для "${selectedCompany.name}"!`);
        form.resetFields();
        onClose();
      } catch (err) {
        message.error('Ошибка при отправке заявки');
      } finally {
        setLoading(false);
      }
    } else {
      setBookingData(formattedValues);
      setCompaniesModalOpen(true);
    }
  };

  const handleCloseAll = () => {
    form.resetFields();
    setCompaniesModalOpen(false);
    onClose();
  };

  return (
    <>
      <Modal
        open={open && !companiesModalOpen}
        onCancel={onClose}
        footer={null}
        width={680}
        centered
        destroyOnClose
        title={<Title level={3} style={{ margin: 0 }}>Заказ уборки</Title>}
      >
        {!isLoggedIn && (
          <Alert
            type="info"
            showIcon
            style={{ marginBottom: 16 }}
            message="Вы делаете заказ как гость"
            description={
              <div>
                Войдите в профиль для автоматического подтягивания адреса и прошлых настроек.
                <div style={{ marginTop: 8, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <Button
                    size="small"
                    type="primary"
                    icon={<LoginOutlined />}
                    onClick={() => {
                      onClose();
                      if (onOpenLogin) onOpenLogin();
                    }}
                  >
                    Войти / Регистрация
                  </Button>
                  <Button size="small" icon={<GoogleOutlined />} onClick={() => message.info('Вход через Google')}>
                    Google
                  </Button>
                  <Button size="small" icon={<FacebookOutlined />} onClick={() => message.info('Вход через Facebook')}>
                    Facebook
                  </Button>
                </div>
              </div>
            }
          />
        )}

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            recurrence: 'ONCE',
            smallRooms: 1,
            largeRooms: 0,
            bathrooms: 1,
          }}
        >
          <Form.Item
            name="address"
            label="Адрес / местоположение"
            rules={[{ required: true, message: 'Укажите адрес помещения' }]}
          >
            <Input placeholder="Улица, дом, корпус, квартира / офис" />
          </Form.Item>

          <Form.Item
            name="cleaningType"
            label="Тип уборки"
            rules={[{ required: true, message: 'Выберите тип уборки' }]}
          >
            <Select placeholder="Выберите нужный тип уборки">
              {cleaningTypes.map((type) => (
                <Option key={type} value={type}>
                  {type}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Card title="Описание помещения" size="small" style={{ marginBottom: 16, background: '#fafafa' }}>
            <Row gutter={12}>
              <Col span={8}>
                <Form.Item name="smallRooms" label="Маленькие комнаты" rules={[{ required: true }]}>
                  <InputNumber min={0} style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="largeRooms" label="Большие комнаты" rules={[{ required: true }]}>
                  <InputNumber min={0} style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="bathrooms" label="Санузлы" rules={[{ required: true }]}>
                  <InputNumber min={1} style={{ width: '100%' }} />
                </Form.Item>
              </Col>
            </Row>
          </Card>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="date"
                label="День уборки"
                rules={[{ required: true, message: 'Выберите день' }]}
              >
                <DatePicker style={{ width: '100%' }} format="DD.MM.YYYY" placeholder="Выберите дату" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="startTime"
                label="Ожидаемое время начала"
                rules={[{ required: true, message: 'Укажите время' }]}
              >
                <TimePicker style={{ width: '100%' }} format="HH:mm" placeholder="09:00" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="recurrence"
            label="Планируемая регулярность уборки"
            rules={[{ required: true }]}
          >
            <Radio.Group onChange={(e) => setRecurrence(e.target.value)}>
              <Space direction="vertical">
                <Radio value="ONCE">Только один раз</Radio>
                <Radio value="WEEKLY">Каждую неделю</Radio>
                <Radio value="BIWEEKLY">Каждые две недели</Radio>
                <Radio value="MONTHLY">Каждый месяц</Radio>
              </Space>
            </Radio.Group>
          </Form.Item>

          {recurrence !== 'ONCE' && (
            <Form.Item
              name="recurrenceDurationMonths"
              label="Продолжительность сделки (максимум — 6 месяцев)"
              rules={[
                { required: true, message: 'Укажите срок сделки' },
                { type: 'number', max: 6, min: 1, message: 'Максимум 6 месяцев' },
              ]}
              initialValue={1}
            >
              <InputNumber min={1} max={6} style={{ width: '100%' }} addonAfter="мес." />
            </Form.Item>
          )}

          {!isLoggedIn && (
            <Form.Item
              name="contact"
              label="Email или номер телефона (для подтверждения заказа)"
              rules={[{ required: true, message: 'Введите Email или телефон' }]}
            >
              <Input placeholder="+7 (999) 000-00-00 или example@mail.ru" />
            </Form.Item>
          )}

          <Form.Item style={{ marginTop: 24, marginBottom: 0 }}>
            <Button type="primary" htmlType="submit" block size="large" loading={loading}>
              {selectedCompany ? 'Заказать услугу' : 'Рассмотреть предложения'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <CompanySelectionModal
        open={companiesModalOpen}
        bookingData={bookingData}
        onBack={() => setCompaniesModalOpen(false)}
        onSuccess={handleCloseAll}
        onOpenLogin={() => {
          handleCloseAll();
          if (onOpenLogin) onOpenLogin();
        }}
      />
    </>
  );
};