import { NavLink, NavLinkProps } from 'react-router-dom';
import styles from './Nav.module.css';
import { useAuthContext } from '../../features/Auth/AuthContext';

function BrandNavLink({ children, ...props }: NavLinkProps) {
  return (
    <NavLink
      {...props}
      className={({ isActive }) => (isActive ? styles.active : '')}
    >
      {children}
    </NavLink>
  );
}

export function Nav() {
  const { user, logout } = useAuthContext();
  return (
    <nav className={styles.mainNav}>
      <menu>
        <li>
          <BrandNavLink to="/">Home</BrandNavLink>
        </li>
        <li>
          <BrandNavLink to="counter">Counter</BrandNavLink>
        </li>
        <li>
          <BrandNavLink to="weather">Weather</BrandNavLink>
        </li>
        <li>
          <BrandNavLink to="films">Films</BrandNavLink>
        </li>
        {user && (
          <li className={styles.shiftRight}>
            Welcome, {user.firstName}!
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                logout();
              }}
            >
              Logout
            </a>
          </li>
        )}

        {!user && (
          <>
            <li className={styles.shiftRight}>
              <BrandNavLink to="login">Login</BrandNavLink>
            </li>
            <li>
              <BrandNavLink to="register">Register</BrandNavLink>
            </li>
          </>
        )}
      </menu>
    </nav>
  );
}
