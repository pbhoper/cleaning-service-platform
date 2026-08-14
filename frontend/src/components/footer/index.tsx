import styles from './footer.module.css';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>&copy; {new Date().getFullYear()} CleanPro. Все права защищены.</p>
    </footer>
  );
};