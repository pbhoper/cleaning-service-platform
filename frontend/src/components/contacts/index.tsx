import styles from './contacts.module.css';

export const Contacts = () => {
  return (
    <section id="contacts" className={styles.contacts}>
      <h2>Связаться с нами</h2>
      <div className={styles.wrapper}>
        <div className={styles.info}>
          <p><strong>Телефон:</strong> +7 (999) 000-00-00</p>
          <p><strong>Email:</strong> info@cleanpro.ru</p>
          <p><strong>Режим работы:</strong> Ежедневно с 8:00 до 22:00</p>
        </div>
        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <input type="text" placeholder="Ваше имя" required />
          <input type="tel" placeholder="Номер телефона" required />
          <button type="submit">Заказать звонок</button>
        </form>
      </div>
    </section>
  );
};