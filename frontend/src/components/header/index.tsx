import { useState } from 'react';
import styles from './header.module.css';
import {LoginModal} from "../auth/login-modal.tsx";
import {BookingModal} from "../booking/booking-modal.tsx";

export const Header = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <span>Clean</span>Pro
      </div>

      <nav className={styles.nav}>
        <a href="#main">Главная</a>
        <a href="#services">Услуги</a>
        <a href="#contacts">Контакты</a>
      </nav>

      <div style={{ display: 'flex', gap: '12px' }}>

        <button
          className={styles.ctaButton}
          style={{
            backgroundColor: 'transparent',
            color: '#0284c7',
            border: '1px solid #0284c7',
          }}
          onClick={() => setIsAuthOpen(true)}
        >
          Войти
        </button>

        <button
          className={styles.ctaButton}
          onClick={() => setIsBookingOpen(true)}
        >
          Заказать уборку
        </button>
      </div>

      <LoginModal
        open={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />

      <BookingModal
        open={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        onOpenLogin={() => setIsAuthOpen(true)}
      />
    </header>
  );
};