import React, { useState } from 'react';
import { Modal, Form, Input, Button, message, Divider, Typography } from 'antd';
import { MailOutlined, LockOutlined, UserOutlined, ArrowRightOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Title, Text } = Typography;

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  onGuestBooking?: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ open, onClose, onGuestBooking }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleFinish = async (values: any) => {
    setLoading(true);

    const endpoint = isRegister
      ? 'http://localhost:3000/auth/register'
      : 'http://localhost:3000/auth/login';

    const payload = isRegister
      ? {
        email: values.email,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName || undefined,
      }
      : {
        email: values.email,
        password: values.password,
      };

    try {
      const response = await axios.post(endpoint, payload);
      const { access_token } = response.data;

      if (access_token) {
        localStorage.setItem('access_token', access_token);
      }

      message.success(isRegister ? 'Регистрация прошла успешно!' : 'Авторизация успешна!');
      form.resetFields();
      onClose();

      window.location.reload();
    } catch (error: any) {
      const serverMessage = error.response?.data?.message;
      const errorText = Array.isArray(serverMessage)
        ? serverMessage.join(', ')
        : (serverMessage || 'Ошибка при отправке данных. Проверьте введенные поля.');

      message.error(errorText);
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsRegister((prev) => !prev);
    form.resetFields();
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
        <Title level={4} style={{ marginBottom: 4 }}>
          {isRegister ? 'Регистрация' : 'Вход в систему'}
        </Title>
        <Text type="secondary">
          {isRegister
            ? 'Заполните данные для создания аккаунта'
            : 'Для сотрудников клининга и клиентов'}
        </Text>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        size="large"
      >
        {isRegister && (
          <>
            <Form.Item
              name="firstName"
              label="Имя"
              rules={[{ required: true, message: 'Введите ваше имя' }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Иван" />
            </Form.Item>

            <Form.Item
              name="lastName"
              label="Фамилия (необязательно)"
            >
              <Input prefix={<UserOutlined />} placeholder="Иванов" />
            </Form.Item>
          </>
        )}

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
          rules={[
            { required: true, message: 'Введите пароль' },
            { min: 6, message: 'Пароль должен быть не менее 6 символов' },
          ]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Пароль" />
        </Form.Item>

        <Form.Item style={{ marginBottom: 12, marginTop: 24 }}>
          <Button type="primary" htmlType="submit" block loading={loading}>
            {isRegister ? 'Зарегистрироваться' : 'Войти'}
          </Button>
        </Form.Item>
      </Form>

      <div style={{ textAlign: 'center', marginBottom: 12 }}>
        <Button type="link" onClick={toggleMode} style={{ padding: 0 }}>
          {isRegister
            ? 'Уже есть аккаунт? Войти'
            : 'Ещё нет аккаунта? Зарегистрироваться'}
        </Button>
      </div>

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