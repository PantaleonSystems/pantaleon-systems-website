export type Profile = 'Afiliado' | 'Loja' | 'Criador'
export const PROFILES: Profile[] = ['Afiliado', 'Loja', 'Criador']

export interface WaitlistInput {
  nome: string
  whatsapp: string
  instagram: string
  perfil: Profile | ''
  consentimento: boolean
  /** honeypot: pessoas não veem nem preenchem; robôs sim */
  website: string
}

export type WaitlistErrors = Partial<Record<keyof WaitlistInput, string>>

export const emptyWaitlist: WaitlistInput = {
  nome: '',
  whatsapp: '',
  instagram: '',
  perfil: '',
  consentimento: false,
  website: '',
}

export const onlyDigits = (value: string) => value.replace(/\D/g, '')

export function normalizeInstagram(value: string) {
  return value.trim().replace(/^@+/, '')
}

export function validateWaitlist(input: WaitlistInput): WaitlistErrors {
  const errors: WaitlistErrors = {}
  if (input.nome.trim().length < 2) errors.nome = 'Como podemos te chamar?'
  const digits = onlyDigits(input.whatsapp)
  if (digits.length < 10 || digits.length > 13)
    errors.whatsapp = 'Digite o WhatsApp com DDD, por exemplo (84) 99999-9999.'
  if (!/^[A-Za-z0-9._]{1,30}$/.test(normalizeInstagram(input.instagram)))
    errors.instagram = 'Digite o @ do seu Instagram, sem espaços.'
  if (!input.perfil) errors.perfil = 'Escolha como você vende.'
  if (!input.consentimento) errors.consentimento = 'Precisamos do seu aceite para entrar em contato.'
  return errors
}

export class WaitlistConfigError extends Error {}

/**
 * Envia o cadastro ao Web App do Google Apps Script (VITE_WAITLIST_URL).
 * Content-Type text/plain evita o preflight de CORS, que o Apps Script não responde.
 * Honeypot preenchido: finge sucesso e não envia nada.
 */
export async function submitWaitlist(input: WaitlistInput): Promise<void> {
  if (input.website.trim() !== '') return

  const url = import.meta.env.VITE_WAITLIST_URL as string | undefined
  if (!url) throw new WaitlistConfigError('VITE_WAITLIST_URL não configurada')

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({
      nome: input.nome.trim(),
      whatsapp: onlyDigits(input.whatsapp),
      instagram: normalizeInstagram(input.instagram),
      perfil: input.perfil,
      consentimento: input.consentimento,
    }),
  })
  if (!response.ok) throw new Error(`HTTP ${response.status}`)
  const result = (await response.json()) as { ok?: boolean }
  if (!result.ok) throw new Error('Resposta inesperada do script')
}
