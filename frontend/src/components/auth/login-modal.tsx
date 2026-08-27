import React, { useState } from 'react';
import {
  Modal,
  Form,
  Input,
  Button,
  message,
  Divider,
  Typography
} from 'antd';
import {
  MailOutlined,
  LockOutlined,
  UserOutlined,
  ShopOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from '@tanstack/react-router';

const { Title, Text } = Typography;

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  onGuestBooking?: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ open, onClose }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

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
      const { access_token, role, user_role, user } = response.data;
      const detectedRole = role || user_role || user?.role || 'user';

      if (access_token) {
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('user_role', detectedRole);
      }

      message.success(isRegister ? 'Регистрация прошла успешно!' : 'Успешный вход!');
      form.resetFields();
      onClose();

      if (detectedRole === 'company') {
        window.location.href = '/cleaning-company';
      } else {
        window.location.href = '/profile';
      }
    } catch (error: any) {
      const serverMessage = error.response?.data?.message;
      const errorText = Array.isArray(serverMessage)
        ? serverMessage.join(', ')
        : serverMessage || 'Ошибка при входе. Проверьте логин и пароль.';

      message.error(errorText);
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsRegister((prev) => !prev);
    form.resetFields();
  };

  const handleCompanyRegister = () => {
    onClose();
    navigate({ to: '/cleaning-company' });
  };

  return (
    <Modal open={open} onCancel={onClose} footer={null} centered width={380} destroyOnClose>
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <Title level={4} style={{ marginBottom: 4 }}>
          {isRegister ? 'Регистрация' : 'Вход в систему'}
        </Title>
        <Text type="secondary">
          {isRegister
            ? 'Заполните данные для создания аккаунта'
            : 'Единая форма входа для клиентов и компаний'}
        </Text>
      </div>

      <Form form={form} layout="vertical" onFinish={handleFinish} size="large">
        {isRegister && (
          <Form.Item name="firstName" rules={[{ required: true, message: 'Введите имя' }]}>
            <Input prefix={<UserOutlined />} placeholder="Имя" />
          </Form.Item>
        )}

        <Form.Item
          name="email"
          rules={[{ required: true, type: 'email', message: 'Введите e-mail' }]}
        >
          <Input prefix={<MailOutlined />} placeholder="E-mail" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Введите пароль' }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Пароль" />
        </Form.Item>

        <Button type="primary" htmlType="submit" block loading={loading} style={{ marginTop: 8 }}>
          {isRegister ? 'Зарегистрироваться' : 'Войти'}
        </Button>
      </Form>

      <Divider style={{ margin: '16px 0' }} />

      <div style={{ textAlign: 'center' }}>
        <Button type="link" onClick={toggleMode}>
          {isRegister ? 'Уже есть аккаунт? Войти' : 'Нет аккаунта? Зарегистрироваться'}
        </Button>
      </div>

      <div style={{ textAlign: 'center', marginTop: 8 }}>
        <Button type="dashed" icon={<ShopOutlined />} block onClick={handleCompanyRegister}>
          Регистрация новой клининговой компании
        </Button>
      </div>
    </Modal>
  );
};