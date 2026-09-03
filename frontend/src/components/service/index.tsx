import styles from './service.module.css';

const servicesData = [
  { title: 'Химчистка мебели', price: 'от 1 500 ₽', desc: 'Глубокая чистка диванов, ковров и матрасов на дому.' },
  { title: 'Уборка квартир', price: 'от 2 500 ₽', desc: 'Поддерживающая и генеральная уборка жилых помещений.' },
  { title: 'Уборка офисов', price: 'от 5 000 ₽', desc: 'Регулярный клининг рабочих пространств и бизнес-центров.' },
  { title: 'После ремонта', price: 'от 8 000 ₽', desc: 'Удаление строительной пыли, пятен краски и затирки.' },
];

export const Services = () => {
  return (
    <section id="services" className={styles.services}>
      <h2>Наши услуги</h2>
      <div className={styles.grid}>
        {servicesData.map((service, index) => (
          <div key={index} className={styles.card}>
            <h3>{service.title}</h3>
            <p>{service.desc}</p>
            <span className={styles.price}>{service.price}</span>
          </div>
        ))}
      </div>
    </section>
  );
};