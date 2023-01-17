import { Outlet } from 'react-router-dom';
import Header from './Header.jsx';
// import Header from './Header/Header.jsx';
import styles from './Layout.css';

export default function Layout() {
  return (
    <div className={styles.Layout}>
      <Header />

      <main>
        <Outlet />
      </main>
    </div>
  );
}
