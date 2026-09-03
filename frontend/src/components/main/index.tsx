import styles from './main.module.css';

export const Main = () => {
  return (
    <section id="main" className={styles.main}>
      <div className={styles.content}>
        <h1>Идеальная чистота вашей квартиры и офиса</h1>
        <p>Закажите клининг онлайн за 2 минуты. Профессиональные клинеры, безопасные средства и гарантия качества.</p>
        <div className={styles.actions}>
          <button className={styles.primaryBtn}>Для домов и квартир</button>
          <button className={styles.primaryBtn}>Для бизнеса (офисы)</button>
        </div>
      </div>
    </section>
  );
};