import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Modal,
  Button,
  Typography,
  message,
  List,
  Avatar,
  Spin,
  Segmented,
  Space,
  Alert,
} from 'antd';
import {
  ArrowLeftOutlined,
  StarFilled,
  EnvironmentOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;

export interface Company {
  id: number;
  name: string;
  logo: string | null;
  address: string;
  rating: number;
  estimatedPrice: number;
  distanceKm: number | null;
  popularity: number;
}

interface CompanySelectionModalProps {
  open: boolean;
  bookingData: any;
  onBack: () => void;
  onSuccess: () => void;
  onOpenLogin?: () => void;
}

export const CompanySelectionModal: React.FC<CompanySelectionModalProps> = ({
  open,
  bookingData,
  onBack,
  onSuccess,
  onOpenLogin,
  }) => {

  const [companies, setCompanies] = useState<Company[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('rating');
  const [activeCompany, setActiveCompany] = useState<Company | null>(null);
  const [confirmModalOpen, setConfirmModalOpen] = useState<boolean>(false);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const isLoggedIn = !!localStorage.getItem('access_token');
  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useCallback(

    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore],
  );

  const fetchCompanies = async (
    currentPage: number,
    currentSort: string,
    isNewSearch = false,
  ) => {
    if (!bookingData) return;
    setLoading(true);
    try {
      const areaSqM =
        (bookingData?.smallRooms || 0) * 15 +
        (bookingData?.largeRooms || 0) * 30 +
        (bookingData?.bathrooms || 0) * 10 || 50;

      const query = new URLSearchParams({
        address: bookingData?.address || '',
        areaSqM: areaSqM.toString(),
        sortBy: currentSort,
        sortOrder: 'DESC',
        page: currentPage.toString(),
        limit: '6',
      });

      const response = await fetch(`http://localhost:3000/search?${query}`);
      const data = await response.json();

      setCompanies((prev) => (isNewSearch ? data.items : [...prev, ...data.items]));
      setHasMore(data.meta?.hasMore ?? false);
    } catch {
      message.error('Не удалось загрузить список служб');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      setPage(1);
      fetchCompanies(1, sortBy, true);
    } else {
      setCompanies([]);
    }
  }, [open, bookingData]);

  useEffect(() => {
    if (open && page > 1) {
      fetchCompanies(page, sortBy, false);
    }
  }, [page]);

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
    setPage(1);
    fetchCompanies(1, newSort, true);
  };

  const handleSelectCompany = (company: Company) => {
    setActiveCompany(company);
    if (!isLoggedIn) {
      Modal.confirm({
        title: 'Требуется авторизация',
        content: 'Для продолжения бронирования войдите в систему или зарегистрируйтесь.',
        okText: 'Войти / Регистрация',
        cancelText: 'Отмена',
        onOk: () => {
          if (onOpenLogin) onOpenLogin();
        },
      });
    } else {
      setConfirmModalOpen(true);
    }
  };

  const handleConfirmOrder = async () => {
    if (!activeCompany) return;
    setConfirmLoading(true);
    try {
      const storedUserId = localStorage.getItem('user_id');
      const userId = storedUserId ? Number(storedUserId) : undefined;

      const payload = {
        companyId: activeCompany.id,
        userId: userId,
        clientName: bookingData?.contact || 'Гость',
        serviceType: bookingData?.cleaningType || 'Стандартная уборка',
        address: bookingData?.address || '',
        smallRooms: Number(bookingData?.smallRooms || 0),
        largeRooms: Number(bookingData?.largeRooms || 0),
        bathrooms: Number(bookingData?.bathrooms || 0),
      };

      const response = await fetch('http://localhost:3000/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Не удалось создать заказ');
      }

      const createdOrder = await response.json();

      message.success(`Заказ №${createdOrder.id} в "${activeCompany?.name}" успешно создан!`);
      setConfirmModalOpen(false);
      onSuccess();
    } catch (err: any) {
      message.error(err.message || 'Ошибка при оформлении заказа');
    } finally {
      setConfirmLoading(false);
    }
  };

  return (
    <>
      <Modal
        open={open}
        onCancel={onBack}
        footer={null}
        width={760}
        centered
        destroyOnHidden
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Button type="text" icon={<ArrowLeftOutlined />} onClick={onBack} />
            <Title level={3} style={{ margin: 0 }}>
              Доступные клининговые службы
            </Title>
          </div>
        }
      >
        <div style={{ marginBottom: 16 }}>
          <Text type="secondary" style={{ display: 'block', marginBottom: 8 }}>
            Сортировать предложения:
          </Text>
          <Segmented
            block
            value={sortBy}
            onChange={(val) => handleSortChange(val as string)}
            options={[
              { label: 'Рейтинг', value: 'rating' },
              { label: 'Цена', value: 'price' },
              { label: 'Удаленность', value: 'distance' },
              { label: 'Популярность', value: 'popularity' },
            ]}
          />
        </div>

        <div style={{ maxHeight: '420px', overflowY: 'auto', paddingRight: 4 }}>
          <List
            itemLayout="horizontal"
            dataSource={companies}
            renderItem={(item, index) => {
              const isLast = index === companies.length - 1;
              return (
                <List.Item
                  ref={isLast ? lastElementRef : null}
                  style={{
                    padding: '12px 16px',
                    border: '1px solid #f0f0f0',
                    borderRadius: '8px',
                    marginBottom: '12px',
                    background: '#fff',
                  }}
                  actions={[
                    <Button type="primary" onClick={() => handleSelectCompany(item)}>
                      Заказать услугу
                    </Button>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        shape="square"
                        size={54}
                        src={item.logo}
                        icon={<CheckCircleOutlined />}
                      />
                    }
                    title={
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Text strong style={{ fontSize: 16 }}>
                          {item.name}
                        </Text>
                        <span style={{ color: '#faad14', fontSize: 14 }}>
                          <StarFilled /> {item.rating}
                        </span>
                      </div>
                    }
                    description={
                      <div>
                        <div>
                          <EnvironmentOutlined /> {item.address || 'Адрес не указан'}
                          {item.distanceKm && ` (${item.distanceKm} км)`}
                        </div>
                        <div style={{ marginTop: 4 }}>
                          Приблизительная цена:{' '}
                          <Text type="success" strong style={{ fontSize: 15 }}>
                            {item.estimatedPrice} руб.
                          </Text>
                        </div>
                      </div>
                    }
                  />
                </List.Item>
              );
            }}
          />
          {loading && (
            <div style={{ textAlign: 'center', padding: '16px 0' }}>
              <Spin tip="Загрузка предложений..." />
            </div>
          )}
        </div>
      </Modal>

      <Modal
        open={confirmModalOpen}
        onCancel={() => setConfirmModalOpen(false)}
        title="Форма подтверждения брони"
        okText="Подтвердить бронь"
        cancelText="Назад"
        onOk={handleConfirmOrder}
        confirmLoading={confirmLoading}
      >
        {activeCompany && bookingData && (
          <Space direction="vertical" style={{ width: '100%' }} size="middle">
            <Alert
              type="info"
              message={`Выбранная служба: ${activeCompany.name}`}
              description={`Адрес: ${activeCompany.address}`}
            />
            <div>
              <Text type="secondary">Тип уборки:</Text>
              <div>
                <Text strong>{bookingData.cleaningType}</Text>
              </div>
            </div>
            <div>
              <Text type="secondary">Адрес доставки услуги:</Text>
              <div>
                <Text strong>{bookingData.address}</Text>
              </div>
            </div>
            <div>
              <Text type="secondary">Дата и время начала:</Text>
              <div>
                <Text strong>
                  {bookingData.date} в {bookingData.startTime}
                </Text>
              </div>
            </div>
            <div>
              <Text type="secondary">Итоговая ориентировочная стоимость:</Text>
              <div>
                <Title level={4} type="success" style={{ margin: 0 }}>
                  {activeCompany.estimatedPrice} руб.
                </Title>
              </div>
            </div>
          </Space>
        )}
      </Modal>
    </>
  );
};