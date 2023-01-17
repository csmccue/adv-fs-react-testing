import Navigation from './Navigation.jsx';
import User from './User.jsx';
import styles from './Header.css';
import SlideoutMenu from './SlideoutMenu.jsx';

export default function Header() {
  return (
    <header className={styles.Header}>
      <div className={styles.MenuContainer}>
        <SlideoutMenu />
      </div>

      <h1>Shopping List</h1>

      <div className={styles.NavigationContainer}>
        <Navigation />
      </div>

      <User />
    </header>
  );
}
