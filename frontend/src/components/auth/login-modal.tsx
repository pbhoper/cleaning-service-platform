import React, { useState } from 'react';
import { Modal, Form, Input, Button, message, Divider, Typography } from 'antd';
import { MailOutlined, LockOutlined, ArrowRightOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Title, Text } = Typography;

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  onGuestBooking?: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ open, onClose, onGuestBooking }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleFinish = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        email: values.email,
        password: values.password,
      });

      const { access_token } = response.data;
      localStorage.setItem('access_token', access_token);

      message.success('Авторизация успешна!');
      form.resetFields();
      onClose();

      window.location.reload();
    } catch (error: any) {

      const serverMessage = error.response?.data?.message;
      const errorText = Array.isArray(serverMessage)
        ? serverMessage.join(', ')
        : (serverMessage || 'Ошибка авторизации. Проверьте введенные данные.');

      message.error(errorText);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={380}
      destroyOnClose
    >
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <Title level={4} style={{ marginBottom: 4 }}>Вход в систему</Title>
        <Text type="secondary">
          Для сотрудников клининга и клиентов
        </Text>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        size="large"
      >
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Введите email' },
            { type: 'email', message: 'Введите корректный email' },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="name@example.com" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Пароль"
          rules={[{ required: true, message: 'Введите пароль' }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Пароль" />
        </Form.Item>

        <Form.Item style={{ marginBottom: 12, marginTop: 24 }}>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Войти
          </Button>
        </Form.Item>
      </Form>

      <Divider style={{ margin: '16px 0' }}>Или</Divider>

      <Button
        type="dashed"
        block
        icon={<ArrowRightOutlined />}
        onClick={() => {
          onClose();
          if (onGuestBooking) onGuestBooking();
        }}
      >
        Забронировать без входа
      </Button>
    </Modal>
  );
};