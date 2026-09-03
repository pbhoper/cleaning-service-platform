import { useEffect, useState } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import {
  Form,
  Input,
  Button,
  Card,
  Switch,
  InputNumber,
  Upload,
  message,
  Typography,
  Divider,
  Space,
  Avatar,
  Result,
} from 'antd';
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  LockOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { api } from '../api/axios';

const { Title, Text } = Typography;

export const Route = createFileRoute('/profile')({
  component: ProfilePage,
});

function ProfilePage() {
  const navigate = useNavigate();
  const token = localStorage.getItem('access_token');
  const userId = localStorage.getItem('user_id');
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const notifyEnabled = Form.useWatch('notificationsEnabled', form);

  useEffect(() => {
    if (!token || !userId) return;

    const fetchProfile = async () => {
      try {
        const response = await api.get(`/clients/${userId}`);
        const userData = response.data;

        form.setFieldsValue({
          name: userData.name || userData.username || '',
          email: userData.email || '',
          phone: userData.phone || '',
          address: userData.address || '',
          notificationsEnabled: userData.notificationsEnabled ?? true,
          notificationHours: userData.notificationHours ?? 2,
        });

        if (userData.avatar) {
          setAvatarUrl(userData.avatar);
        }
      } catch (error) {
        console.warn('Не удалось загрузить данные профиля с сервера');
      }
    };

    fetchProfile();
  }, [token, userId, form]);

  if (!token || !userId) {
    return (
      <div style={{ padding: '60px 20px', textAlign: 'center' }}>
        <Result
          status="403"
          title="Доступ запрещен"
          subTitle="Для редактирования профиля необходимо войти в аккаунт."
          extra={
            <Button type="primary" onClick={() => navigate({ to: '/' })}>
              На главную
            </Button>
          }
        />
      </div>
    );
  }

  const handleFinish = async (values: any) => {
    setLoading(true);
    try {
      const payload = {
        name: values.name,
        email: values.email,
        phone: values.phone,
        address: values.address,
        notificationsEnabled: values.notificationsEnabled,
        notificationHours: values.notificationsEnabled ? values.notificationHours : null,
        ...(values.newPassword && { password: values.newPassword }),
        avatar: avatarUrl,
      };

      await api.patch(`/clients/${userId}`, payload);

      message.success('Профиль успешно обновлен!');
    } catch (error: any) {
      const serverMessage = error.response?.data?.message;
      const errorText = Array.isArray(serverMessage)
        ? serverMessage.join(', ')
        : serverMessage || 'Ошибка при сохранении профиля.';

      message.error(errorText);
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = (info: any) => {
    const file = info.file.originFileObj || info.file;
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setAvatarUrl(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ maxWidth: 680, margin: '40px auto', padding: '0 16px' }}>
      <Card variant="borderless" style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.08)', borderRadius: 12 }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Title level={3} style={{ marginBottom: 4 }}>
            Редактирование профиля
          </Title>
          <Text type="secondary">Управление личными данными и настройками</Text>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          initialValues={{
            notificationsEnabled: true,
            notificationHours: 2,
          }}
          size="large"
        >
          <Form.Item label="Фотография профиля" style={{ textAlign: 'center' }}>
            <Space orientation="vertical" align="center">
              <Avatar
                size={80}
                src={avatarUrl}
                icon={<UserOutlined />}
                style={{ backgroundColor: '#1677ff' }}
              />
              <Upload
                showUploadList={false}
                beforeUpload={() => false}
                onChange={handleAvatarChange}
                accept="image/*"
              >
                <Button icon={<UploadOutlined />} size="small">
                  Загрузить фото
                </Button>
              </Upload>
            </Space>
          </Form.Item>

          <Divider />

          <Form.Item
            name="name"
            label="Имя пользователя"
            rules={[{ required: true, message: 'Введите имя пользователя' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Иван Иванов" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            dependencies={['phone']}
            rules={[
              { type: 'email', message: 'Введите корректный email' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value && !getFieldValue('phone')) {
                    return Promise.reject(new Error('Заполните Email или Телефон'));
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="name@example.com" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Телефон"
            dependencies={['email']}
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value && !getFieldValue('email')) {
                    return Promise.reject(new Error('Заполните Email или Телефон'));
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Input prefix={<PhoneOutlined />} placeholder="+7 (999) 000-00-00" />
          </Form.Item>

          <Form.Item name="address" label="Адрес проживания">
            <Input.TextArea placeholder="г. Москва, ул. Ленина, д. 10, кв. 5" rows={2} />
          </Form.Item>

          <Divider titlePlacement="left">Настройки уведомлений</Divider>

          <Form.Item
            name="notificationsEnabled"
            label="Напоминания о предстоящих уборках"
            valuePropName="checked"
          >
            <Switch checkedChildren="Вкл" unCheckedChildren="Выкл" />
          </Form.Item>

          {notifyEnabled && (
            <Form.Item
              name="notificationHours"
              label="За сколько часов до уборки отправлять напоминание?"
              rules={[{ required: true, message: 'Укажите время' }]}
            >
              <Space.Compact style={{ width: '100%' }}>
                <InputNumber min={1} max={72} style={{ width: '100%' }} />
                <Button disabled style={{ color: 'rgba(0,0,0,0.88)', cursor: 'default' }}>
                  ч.
                </Button>
              </Space.Compact>
            </Form.Item>
          )}

          <Divider titlePlacement="left">Безопасность (Смена пароля)</Divider>

          <Form.Item
            name="oldPassword"
            label="Старый пароль"
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (getFieldValue('newPassword') && !value) {
                    return Promise.reject(new Error('Введите старый пароль для его смены'));
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Введите текущий пароль" />
          </Form.Item>

          <Form.Item
            name="newPassword"
            label="Новый пароль"
            rules={[{ min: 6, message: 'Пароль должен быть не менее 6 символов' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Новый пароль" />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Подтверждение нового пароля"
            dependencies={['newPassword']}
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (getFieldValue('newPassword') && getFieldValue('newPassword') !== value) {
                    return Promise.reject(new Error('Пароли не совпадают!'));
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Повторите новый пароль" />
          </Form.Item>

          <Form.Item style={{ marginTop: 32, marginBottom: 0 }}>
            <Button type="primary" htmlType="submit" block loading={loading} size="large">
              Сохранить изменения
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}