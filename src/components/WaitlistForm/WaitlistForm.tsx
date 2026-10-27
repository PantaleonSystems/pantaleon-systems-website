import { useRef, useState, type FormEvent } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'
import { DUR, EASE, NO_PREF } from '../../lib/motion'
import {
  PROFILES,
  WaitlistConfigError,
  emptyWaitlist,
  submitWaitlist,
  validateWaitlist,
  type WaitlistErrors,
  type WaitlistInput,
} from '../../lib/waitlist'
import { whatsappUrl } from '../../data/contact'
import { buttonClasses } from '../../design-system'
import { usePressFeedback } from '../../hooks'
import styles from './WaitlistForm.module.css'

type Status = 'idle' | 'sending' | 'success' | 'error' | 'unavailable'

export function WaitlistForm() {
  const root = useRef<HTMLDivElement>(null)
  const [values, setValues] = useState<WaitlistInput>(emptyWaitlist)
  const [touched, setTouched] = useState<Partial<Record<keyof WaitlistInput, boolean>>>({})
  const [status, setStatus] = useState<Status>('idle')
  usePressFeedback(root)

  const errors: WaitlistErrors = validateWaitlist(values)
  const visible = (field: keyof WaitlistInput) => (touched[field] ? errors[field] : undefined)

  const set = <K extends keyof WaitlistInput>(field: K, value: WaitlistInput[K]) =>
    setValues((current) => ({ ...current, [field]: value }))
  const touch = (field: keyof WaitlistInput) => setTouched((t) => ({ ...t, [field]: true }))

  // a confirmação entra com um cross-fade curto (também sob movimento reduzido)
  useGSAP(
    () => {
      if (status !== 'success') return
      const mm = gsap.matchMedia()
      mm.add({ full: NO_PREF, reduced: '(prefers-reduced-motion: reduce)' }, (ctx) => {
        const reduced = ctx.conditions?.reduced
        gsap.from('[data-done]', {
          autoAlpha: 0,
          y: reduced ? 0 : 14,
          duration: reduced ? 0.2 : DUR.base,
          ease: EASE,
        })
      })
      return () => mm.revert()
    },
    { scope: root, dependencies: [status] },
  )

  async function onSubmit(event: FormEvent) {
    event.preventDefault()
    setTouched({ nome: true, whatsapp: true, instagram: true, perfil: true, consentimento: true })
    if (Object.keys(errors).length > 0) {
      root.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus()
      return
    }
    setStatus('sending')
    try {
      await submitWaitlist(values)
      setStatus('success')
    } catch (error) {
      setStatus(error instanceof WaitlistConfigError ? 'unavailable' : 'error')
    }
  }

  if (status === 'success') {
    return (
      <div ref={root} className={styles.card} role="status">
        <p data-done className={styles.doneTitle}>Você está na lista.</p>
        <p data-done className={styles.doneText}>
          Assim que as vagas abrirem, você recebe o aviso no WhatsApp. Obrigado pela confiança.
        </p>
      </div>
    )
  }

  const sending = status === 'sending'

  return (
    <div ref={root} className={styles.card}>
      <form noValidate onSubmit={onSubmit} aria-describedby="waitlist-status">
        <Field label="Nome" error={visible('nome')} id="wl-nome">
          <input
            id="wl-nome"
            autoComplete="name"
            value={values.nome}
            onChange={(e) => set('nome', e.target.value)}
            onBlur={() => touch('nome')}
            aria-invalid={Boolean(visible('nome'))}
            aria-describedby={visible('nome') ? 'wl-nome-erro' : undefined}
          />
        </Field>
        <Field label="WhatsApp" error={visible('whatsapp')} id="wl-whatsapp">
          <input
            id="wl-whatsapp"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="(84) 99999-9999"
            value={values.whatsapp}
            onChange={(e) => set('whatsapp', e.target.value)}
            onBlur={() => touch('whatsapp')}
            aria-invalid={Boolean(visible('whatsapp'))}
            aria-describedby={visible('whatsapp') ? 'wl-whatsapp-erro' : undefined}
          />
        </Field>
        <Field label="@ do Instagram" error={visible('instagram')} id="wl-instagram">
          <input
            id="wl-instagram"
            autoCapitalize="none"
            autoCorrect="off"
            placeholder="@seuperfil"
            value={values.instagram}
            onChange={(e) => set('instagram', e.target.value)}
            onBlur={() => touch('instagram')}
            aria-invalid={Boolean(visible('instagram'))}
            aria-describedby={visible('instagram') ? 'wl-instagram-erro' : undefined}
          />
        </Field>

        <fieldset className={styles.field}>
          <legend className={styles.label}>Você vende como?</legend>
          <div className={styles.segment} role="radiogroup" aria-invalid={Boolean(visible('perfil'))}>
            {PROFILES.map((profile) => (
              <label key={profile} className={styles.option}>
                <input
                  type="radio"
                  name="perfil"
                  value={profile}
                  checked={values.perfil === profile}
                  onChange={() => {
                    set('perfil', profile)
                    touch('perfil')
                  }}
                />
                <span>{profile}</span>
              </label>
            ))}
          </div>
          {visible('perfil') && <p className={styles.error}>{errors.perfil}</p>}
        </fieldset>

        {/* honeypot: fora da tela e fora da navegação */}
        <div className={styles.trap} aria-hidden="true">
          <label>
            Não preencha este campo
            <input
              tabIndex={-1}
              autoComplete="off"
              value={values.website}
              onChange={(e) => set('website', e.target.value)}
            />
          </label>
        </div>

        <label className={styles.consent}>
          <input
            type="checkbox"
            checked={values.consentimento}
            onChange={(e) => {
              set('consentimento', e.target.checked)
              touch('consentimento')
            }}
            aria-invalid={Boolean(visible('consentimento'))}
          />
          <span>Aceito receber contato da Pantaleon Systems sobre este produto.</span>
        </label>
        {visible('consentimento') && <p className={styles.error}>{errors.consentimento}</p>}

        <button type="submit" className={`${buttonClasses('light')} ${styles.submit}`} data-press disabled={sending}>
          {sending ? 'Enviando…' : 'Quero uma vaga'}
        </button>

        <p id="waitlist-status" role="alert" className={styles.status}>
          {status === 'error' &&
            'Não conseguimos enviar agora. Tente de novo em instantes, ou fale com a gente pelo WhatsApp.'}
          {status === 'unavailable' && (
            <>
              A lista de espera ainda não está aberta por aqui.{' '}
              <a href={whatsappUrl('Quero entrar na lista de espera.')} target="_blank" rel="noreferrer">
                Fale com a gente
              </a>{' '}
              e garantimos o seu lugar.
            </>
          )}
        </p>
      </form>
    </div>
  )
}

function Field({
  label,
  id,
  error,
  children,
}: {
  label: string
  id: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-erro`} className={styles.error}>
          {error}
        </p>
      )}
    </div>
  )
}
