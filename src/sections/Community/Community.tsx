import type { ReactNode } from 'react'
import { Card, SectionHeading } from '../../design-system'
import { Reveal } from '../../components'
import { communityCards, communityChannels } from '../../data/community'
import styles from './Community.module.css'

const cardIcons: ReactNode[] = [
  <svg
    key="join"
    viewBox="0 0 40 40"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    aria-hidden="true"
  >
    <circle cx={20} cy={14} r={6} />
    <path d="M8 32c0-6 5-10 12-10s12 4 12 10" />
  </svg>,
  <svg
    key="updates"
    viewBox="0 0 40 40"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    aria-hidden="true"
  >
    <path d="M8 12h24M8 20h24M8 28h16" />
  </svg>,
  <svg
    key="github"
    viewBox="0 0 40 40"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    aria-hidden="true"
  >
    <path d="M15 13l-7 7 7 7M25 13l7 7-7 7" />
  </svg>,
  <svg
    key="partner"
    viewBox="0 0 40 40"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    aria-hidden="true"
  >
    <circle cx={13} cy={14} r={4} />
    <circle cx={27} cy={14} r={4} />
    <circle cx={20} cy={27} r={4} />
    <path d="M16 16l3 8M24 16l-3 8" />
  </svg>,
]

const channelIcons: Record<string, ReactNode> = {
  Discord: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.3 4.3a19 19 0 00-4.7-1.5l-.3.5a17 17 0 014.2 1.5A15.8 15.8 0 002 6.7C2.6 12 4.2 16.9 7 20a13 13 0 004-2l-.5-.8a11 11 0 01-1.7.8l.4-.6c1.9.9 4 .9 5.9 0l.4.6c-.6-.3-1.1-.5-1.7-.8L17 20c2.8-3.1 4.4-8 3-16zM9 14c-.8 0-1.5-.8-1.5-1.8S8.2 10.5 9 10.5s1.5.8 1.5 1.7S9.8 14 9 14zm6 0c-.8 0-1.5-.8-1.5-1.8s.7-1.7 1.5-1.7 1.5.8 1.5 1.7S15.8 14 15 14z" />
    </svg>
  ),
  Telegram: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22 3L2 10.5l6 2 2.5 6.5 3-4 5 4 3.5-16z" />
    </svg>
  ),
  LinkedIn: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6.5 8.5H3V21h3.5V8.5zM4.7 3a2 2 0 100 4 2 2 0 000-4zM21 21h-3.5v-6.5c0-1.6-.6-2.7-2-2.7-1.1 0-1.7.7-2 1.4-.1.3-.1.6-.1 1V21H10s.05-11.3 0-12.5h3.5v1.8c.5-.7 1.3-1.8 3.2-1.8 2.4 0 4.3 1.5 4.3 4.9V21z" />
    </svg>
  ),
  'X / Twitter': (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18 2h3l-7 8 8 12h-6l-5-6-5 6H2l8-9L2 2h6l4 5 6-5z" />
    </svg>
  ),
  GitHub: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 00-3 19.5c.5 0 .7-.2.7-.5v-2c-2.8.6-3.4-1.2-3.4-1.2-.4-1.2-1.1-1.5-1.1-1.5-1-.6 0-.6 0-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.6-1.4-2.2-.2-4.5-1.1-4.5-5 0-1 .4-1.9 1-2.5 0-.3-.4-1.3.1-2.6 0 0 .8-.3 2.7 1a9.4 9.4 0 015 0c1.9-1.3 2.7-1 2.7-1 .5 1.3.1 2.3.1 2.6.6.6 1 1.5 1 2.5 0 3.9-2.3 4.8-4.5 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A10 10 0 0012 2z" />
    </svg>
  ),
  Newsletter: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <rect x={3} y={5} width={18} height={14} rx={2} />
      <path d="M3 7l9 6 9-6" />
    </svg>
  ),
}

export function Community() {
  return (
    <section id="comunidade">
      <div className="wrap">
        <Reveal>
          <SectionHeading
            center
            eyebrow="Ecossistema e comunidade"
            title="Entre para o círculo Pantaleon"
            description="Estamos reunindo pesquisadores, builders, parceiros, desenvolvedores e pessoas interessadas em infraestrutura para a Web4."
          />
        </Reveal>

        <Reveal stagger className={styles.grid}>
          {communityCards.map((card, index) => (
            <Card
              key={card.title}
              variant="ivory"
              hover
              className={styles.card}
            >
              <span className={styles.icon}>{cardIcons[index]}</span>
              <h4>{card.title}</h4>
              <p className={styles.description}>{card.description}</p>
              <a href="#contato" className={styles.link}>
                {card.ctaLabel}
                <span className={styles.arrow} aria-hidden="true">
                  →
                </span>
              </a>
            </Card>
          ))}
        </Reveal>

        <Reveal className={styles.channels}>
          {communityChannels.map((channel) => (
            <a href={channel.href} className={styles.channel} key={channel.label}>
              <span className={styles.channelIcon}>
                {channelIcons[channel.label]}
              </span>
              {channel.label}
              {channel.soon && <span className={styles.soon}>em breve</span>}
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
