import { Link } from 'react-router-dom'
import { COMPANY, CONTACT_EMAIL, addressLine } from '../../data/contact'
import { legalLinks } from '../../data/navigation'
import styles from './Footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`wrap ${styles.inner}`}>
        <div className={styles.company}>
          <p className={styles.brand}>{COMPANY.brand}</p>
          <p>{COMPANY.legalName}</p>
          <p>CNPJ {COMPANY.cnpj}</p>
          <p>{addressLine}</p>
          <p>
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </p>
        </div>
        <nav className={styles.legal} aria-label="Legal">
          {legalLinks.map((link) => (
            <Link key={link.to} to={link.to}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <p className={`wrap ${styles.copy}`}>
        © {new Date().getFullYear()} {COMPANY.brand}. Diga não ao manual.
      </p>
    </footer>
  )
}
