import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import styles from './header.module.css';
import { LoginModal } from "../auth/login-modal.tsx";
import { BookingModal } from "../booking/booking-modal.tsx";
import { UserProfile } from "./user-profile.tsx";

export const Header = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <span>Clean</span>Pro
      </div>

      <nav className={styles.nav}>
        <Link to="/">Главная</Link>
        <a href="#services">Услуги</a>
        <a href="#contacts">Контакты</a>
        <Link to="/reports">Оставить Отзыв</Link>
      </nav>

      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <UserProfile onOpenLogin={() => setIsAuthOpen(true)} />

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