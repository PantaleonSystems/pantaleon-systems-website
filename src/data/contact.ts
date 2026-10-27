/**
 * Dados de contato e da empresa: ÚNICO lugar para editar.
 * Itens marcados com TODO(usuário) ainda não existem e são provisórios.
 */

export const COMPANY = {
  legalName: 'PANTALEON SYSTEMS INOVA SIMPLES I.S. - ME',
  brand: 'Pantaleon Systems',
  cnpj: '66.899.192/0001-28',
  city: 'Parnamirim/RN',
} as const

// TODO(usuário): endereço completo (rua, número, bairro, CEP). Enquanto vazio, só a cidade aparece.
export const ADDRESS_FULL = ''

// TODO(usuário): número real do WhatsApp, só dígitos com DDI+DDD (ex.: 5584999999999).
export const WHATSAPP_NUMBER = ''

// TODO(usuário): e-mail real, quando o domínio existir.
export const CONTACT_EMAIL = 'contato@pantaleonsystems.com.br'

// TODO(usuário): confirmar a quantidade de vagas do Plano Fundador antes de publicar.
export const FOUNDER_SLOTS = 50

export const addressLine = ADDRESS_FULL
  ? `${ADDRESS_FULL} · ${COMPANY.city}`
  : COMPANY.city

export function whatsappUrl(message = 'Olá! Vim pelo site da Pantaleon Systems.') {
  const text = encodeURIComponent(message)
  return WHATSAPP_NUMBER
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`
    : `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Contato pelo site')}&body=${text}`
}
