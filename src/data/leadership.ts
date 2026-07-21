import ceoPhoto from '../assets/ceo.png'
import ctoPhoto from '../assets/cto.png'
import type { Leader } from '../types'

export const leaders: Leader[] = [
  {
    name: "Dianelys O'Farril Pantaleon",
    role: 'CEO & Co-Founder',
    bio: 'Responsável pela visão estratégica, posicionamento institucional, parcerias e construção do ecossistema Pantaleon.',
    photo: ceoPhoto,
  },
  {
    name: 'Efrain M. P. Pantaleon',
    role: 'CTO & Co-Founder',
    bio: 'Responsável pela arquitetura tecnológica, infraestrutura da rede, pesquisa computacional e evolução do núcleo USF.',
    photo: ctoPhoto,
  },
]
