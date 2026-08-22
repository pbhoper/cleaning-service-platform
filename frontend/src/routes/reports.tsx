import { useState } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Form, Input, Rate, Button, Card, Typography, message, Result } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { api } from '../api/axios';

const { Title, Text } = Typography;
const { TextArea } = Input;

export const Route = createFileRoute('/reports')({
  component: ReviewPage,
});

function ReviewPage() {
  const navigate = useNavigate();
  const token = localStorage.getItem('access_token');
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  if (!token) {
    return (
      <div style={{ padding: '60px 20px', textAlign: 'center' }}>
        <Result
          status="403"
          title="Доступ ограничен"
          subTitle="Оставлять отзывы могут только авторизованные пользователи."
          extra={
            <Button type="primary" onClick={() => navigate({ to: '/' })}>
              На главную
            </Button>
          }
        />
      </div>
    );
  }

  const handleFinish = async (values: { rating: number; text: string }) => {
    setLoading(true);
    try {
      await api.post('/reports', {
        rating: values.rating,
        text: values.text,
      });

      message.success('Спасибо! Ваш отзыв отправлен.');
      form.resetFields();
      navigate({ to: '/' });
    } catch (error: any) {
      const serverMessage = error.response?.data?.message;
      const errorText = Array.isArray(serverMessage)
        ? serverMessage.join(', ')
        : serverMessage || 'Ошибка при отправке отзыва.';

      message.error(errorText);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', padding: '0 16px' }}>
      <Card bordered={false} style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.08)', borderRadius: 12 }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Title level={3} style={{ marginBottom: 4 }}>
            Оставить отзыв
          </Title>
          <Text type="secondary"> Поделитесь вашим мнением о нашей клининговой службе</Text>
        </div>

        <Form form={form} layout="vertical" onFinish={handleFinish} size="large">
          <Form.Item
            name="rating"
            label="Оценка сервиса"
            rules={[{ required: true, message: 'Пожалуйста, выберите рейтинг' }]}
          >
            <Rate style={{ fontSize: 32 }} />
          </Form.Item>

          <Form.Item
            name="text"
            label="Текст отзыва"
            rules={[
              { required: true, message: 'Пожалуйста, введите текст отзыва' },
              { min: 5, message: 'Отзыв должен содержать хотя бы 5 символов' },
            ]}
          >
            <TextArea
              rows={5}
              placeholder="Расскажите, что вам понравилось или что стоит улучшить..."
              maxLength={1000}
              showCount
            />
          </Form.Item>

          <Form.Item style={{ marginTop: 24, marginBottom: 0 }}>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
              icon={<SendOutlined />}
            >
              Отправить
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}