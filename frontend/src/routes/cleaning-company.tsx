import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  Form,
  Input,
  Button,
  Card,
  Typography,
  message,
  Checkbox,
  InputNumber,
  Row,
  Col,
  Result,
  Divider,
} from 'antd';
import {
  ShopOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  LockOutlined,
  SendOutlined,
} from '@ant-design/icons';
import { api } from '../api/axios';
import {cleaningTypes} from "../components/booking/booking-modal.tsx";

const { Title, Text, Paragraph } = Typography;

export const Route = createFileRoute('/cleaning-company')({
  component: CleaningCompanyRegisterPage,
});

function CleaningCompanyRegisterPage() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const handleFinish = async (values: any) => {
    if (values.password !== values.confirmPassword) {
      message.error('Пароли не совпадают');
      return;
    }

    if (values.priceBathroom <= values.priceLargeRoom || values.priceLargeRoom <= values.priceSmallRoom) {
      message.error('Стоимость санузла должна быть выше большой комнаты, а большая комната — выше маленькой!');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        name: values.name,
        email: values.email,
        password: values.password,
        phone: values.phone,
        address: values.address,
        description: values.description,
        logo: values.logo,
        serviceTypes: values.serviceTypes,
        basePrices: {
          smallRoom: values.priceSmallRoom,
          largeRoom: values.priceLargeRoom,
          bathroom: values.priceBathroom,
        },
        coefficients: values.coefficients || {},
      };

      await api.post('/cleaning-company', payload);
      setIsSubmitted(true);
    } catch (error: any) {
      const serverMessage = error.response?.data?.message;
      const errorText = Array.isArray(serverMessage)
        ? serverMessage.join(', ')
        : serverMessage || 'Ошибка при регистрации компании.';
      message.error(errorText);
    } finally {
      setLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div style={{ maxWidth: 600, margin: '60px auto', padding: '0 16px' }}>
        <Result
          status="success"
          title="Регистрация успешно завершена, мы вам перезвоним!"
          subTitle="На указанную электронную почту отправлено письмо со ссылкой для подтверждения. Ссылка действительна в течение 8 часов."
        />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 800, margin: '40px auto', padding: '0 16px' }}>
      <Card bordered={false} style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.08)', borderRadius: 12 }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <Title level={3}>Регистрация клининговой службы</Title>
          <Text type="secondary">Заполните данные компании для начала работы на платформе</Text>
        </div>

        <Form form={form} layout="vertical" onFinish={handleFinish} size="large">
          <Title level={5}>Основные данные</Title>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item name="name" label="Название компании" rules={[{ required: true, message: 'Введите название' }]}>
                <Input prefix={<ShopOutlined />} placeholder="ООО Чистый Дом" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email', message: 'Введите корректный email' }]}>
                <Input prefix={<MailOutlined />} placeholder="company@clean.ru" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="phone" label="Телефон" rules={[{ required: true, message: 'Введите телефон' }]}>
                <Input prefix={<PhoneOutlined />} placeholder="+7 (999) 000-00-00" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="address" label="Адрес компании">
                <Input prefix={<HomeOutlined />} placeholder="г. Москва, ул. Мира, д. 5" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="logo" label="URL логотипа">
            <Input placeholder="https://example.com/logo.png" />
          </Form.Item>

          <Form.Item name="description" label="Описание компании">
            <Input.TextArea rows={3} placeholder="Расскажите о преимуществах вашей службы" />
          </Form.Item>

          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item name="password" label="Пароль" rules={[{ required: true, min: 6, message: 'Минимум 6 символов' }]}>
                <Input.Password prefix={<LockOutlined />} placeholder="Пароль" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="confirmPassword"
                label="Подтверждение пароля"
                rules={[{ required: true, message: 'Подтвердите пароль' }]}
              >
                <Input.Password prefix={<LockOutlined />} placeholder="Повторите пароль" />
              </Form.Item>
            </Col>
          </Row>

          <Divider />
          <Title level={5}>Услуги и Расценки</Title>

          <Form.Item
            name="serviceTypes"
            label="Оказываемые услуги"
            rules={[{ required: true, message: 'Выберите хотя бы одну услугу' }]}
          >
            <Checkbox.Group
              options={cleaningTypes.map((t) => ({ label: t, value: t }))}
              onChange={(checkedValues) => setSelectedServices(checkedValues as string[])}
            />
          </Form.Item>

          <Paragraph type="secondary" style={{ fontSize: 13 }}>
            Укажите базовую стоимость уборки комнат (Санузел должен быть дороже большой комнаты, а большая — дороже маленькой):
          </Paragraph>

          <Row gutter={16}>
            <Col xs={24} sm={8}>
              <Form.Item
                name="priceSmallRoom"
                label="Маленькая комната (до 20м²)"
                rules={[{ required: true, message: 'Укажите цену' }]}
              >
                <InputNumber min={0} style={{ width: '100%' }} placeholder="800 ₽" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item
                name="priceLargeRoom"
                label="Большая комната (> 20м²)"
                rules={[{ required: true, message: 'Укажите цену' }]}
              >
                <InputNumber min={0} style={{ width: '100%' }} placeholder="1200 ₽" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item
                name="priceBathroom"
                label="Санузел (трудоемкий)"
                rules={[{ required: true, message: 'Укажите цену' }]}
              >
                <InputNumber min={0} style={{ width: '100%' }} placeholder="1500 ₽" />
              </Form.Item>
            </Col>
          </Row>

          {selectedServices.length > 0 && (
            <>
              <Text strong style={{ display: 'block', marginBottom: 12 }}>
                Коэффициенты удорожания для выбранных услуг (1.0 = Стандартная уборка):
              </Text>
              <Row gutter={16}>
                {selectedServices.map((serviceKey) => (
                  <Col xs={24} sm={12} key={serviceKey}>
                    <Form.Item
                      name={['coefficients', serviceKey]}
                      label={serviceKey}
                      initialValue={serviceKey === 'Стандартная уборка помещений' ? 1.0 : 1.5}
                      rules={[{ required: true, message: 'Укажите коэффициент' }]}
                    >
                      <InputNumber min={0.5} max={5} step={0.1} style={{ width: '100%' }} />
                    </Form.Item>
                  </Col>
                ))}
              </Row>
            </>
          )}

          <Form.Item style={{ marginTop: 24, marginBottom: 0 }}>
            <Button type="primary" htmlType="submit" block loading={loading} icon={<SendOutlined />}>
              Зарегистрироваться
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}