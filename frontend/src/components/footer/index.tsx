import { useState } from 'react';
import { Modal } from 'antd';
import styles from './footer.module.css';
import {AdminPage} from "../../routes/admin.tsx";

export const Footer = () => {
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  return (
    <footer className={styles.footer}>
      <div className={styles.leftSlot} />
      <div className={styles.centerSlot}>
        <p>
          &copy; {new Date().getFullYear()} <span className={styles.brand}>CleanPro</span>. Все права защищены.
        </p>
      </div>

      <div className={styles.rightSlot}>
        <button
          type="button"
          className={styles.adminButton}
          onClick={() => setIsAdminModalOpen(true)}
        >
          Вход для администратора
        </button>
      </div>

      <Modal
        open={isAdminModalOpen}
        onCancel={() => setIsAdminModalOpen(false)}
        footer={null}
        width={1000}
        destroyOnClose
        style={{ top: 20 }}
      >
        <AdminPage />
      </Modal>
    </footer>
  );
};