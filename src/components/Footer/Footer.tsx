import { Link, useLocation } from 'react-router-dom'
import type { FooterLink } from '../../types'
import logo from '../../assets/logo.png'
import {
  footerAbout,
  footerColumns,
  footerLegalLinks,
  footerTagline,
} from '../../data/navigation'
import styles from './Footer.module.css'

export function Footer() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  return (
    <footer className={styles.footer}>
      <div className="wrap">
        <div className={styles.grid}>
          <div>
            <div className={styles.brand}>
              <img
                src={logo}
                alt="Pantaleon Systems"
                className={styles.brandLogo}
              />
              Pantaleon Systems
            </div>
            <p className={styles.about}>{footerAbout}</p>
          </div>

          {footerColumns.map((column) => (
            <div className={styles.col} key={column.title}>
              <h5>{column.title}</h5>
              {column.links.map((link) => (
                <FooterNavLink key={link.label} link={link} isHome={isHome} />
              ))}
            </div>
          ))}
        </div>

        <div className={styles.bottom}>
          <span>© 2026 Pantaleon Systems. Todos os direitos reservados.</span>
          <span className={`mono ${styles.tagline}`}>{footerTagline}</span>
          <span>
            {footerLegalLinks.map((link, index) => (
              <span key={link.label}>
                <a href={link.href}>{link.label}</a>
                {index < footerLegalLinks.length - 1 ? ' · ' : ''}
              </span>
            ))}
          </span>
        </div>
      </div>
    </footer>
  )
}

function FooterNavLink({
  link,
  isHome,
}: {
  link: FooterLink
  isHome: boolean
}) {
  if (link.to !== undefined) {
    return <Link to={link.to}>{link.label}</Link>
  }

  if (link.hash !== undefined) {
    return isHome ? (
      <a href={`#${link.hash}`}>{link.label}</a>
    ) : (
      <Link to={`/#${link.hash}`}>{link.label}</Link>
    )
  }

  return <a href={link.href}>{link.label}</a>
}
