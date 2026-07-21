import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '../../design-system'
import { useHeaderScroll } from '../../hooks/useHeaderScroll'
import { mainNavItems } from '../../data/navigation'
import logo from '../../assets/logo.png'
import styles from './Header.module.css'

export function Header() {
  const scrolled = useHeaderScroll()
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const [menuOpen, setMenuOpen] = useState(false)

  const headerClasses = [styles.header, scrolled && styles.scrolled]
    .filter(Boolean)
    .join(' ')

  const mobileNavClasses = [styles.mobileNav, menuOpen && styles.open]
    .filter(Boolean)
    .join(' ')

  return (
    <header className={headerClasses}>
      <div className={`wrap ${styles.nav}`}>
        {isHome ? (
          <a href="#top" className={styles.brand}>
            <img
              src={logo}
              alt="Pantaleon Systems"
              className={styles.brandLogo}
            />
            Pantaleon Systems
          </a>
        ) : (
          <Link to="/" className={styles.brand}>
            <img
              src={logo}
              alt="Pantaleon Systems"
              className={styles.brandLogo}
            />
            Pantaleon Systems
          </Link>
        )}

        <nav className={styles.navLinks} aria-label="Navegação principal">
          {mainNavItems.map((item) =>
            isHome ? (
              <a key={item.hash} href={`#${item.hash}`}>
                {item.label}
              </a>
            ) : (
              <Link key={item.hash} to={`/#${item.hash}`}>
                {item.label}
              </Link>
            ),
          )}
        </nav>

        {isHome ? (
          <Button variant="primary" href="#contato">
            Conecte-se
          </Button>
        ) : (
          <Button variant="primary" to="/#contato">
            Conecte-se
          </Button>
        )}

        <button
          type="button"
          className={styles.menuBtn}
          aria-label="Menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <nav className={mobileNavClasses} aria-label="Navegação mobile">
        {mainNavItems.map((item) =>
          isHome ? (
            <a
              key={item.hash}
              href={`#${item.hash}`}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ) : (
            <Link
              key={item.hash}
              to={`/#${item.hash}`}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ),
        )}
      </nav>
    </header>
  )
}
