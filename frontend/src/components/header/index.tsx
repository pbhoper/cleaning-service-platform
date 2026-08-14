import styles from './header.module.css';

export const Header = () => {
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
      <button className={styles.ctaButton}>Заказать уборку</button>
    </header>
  );
};