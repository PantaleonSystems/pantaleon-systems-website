import ceoPhoto from '../assets/ceo.png'
import ctoPhoto from '../assets/cto.png'
import type { Leader } from '../types'

export const leaders: Leader[] = [
  {
    name: "Dianelys O'Farril Pantaleon",
    role: 'CEO & Co-Founder',
    bio: 'Responsável pela visão estratégica, posicionamento institucional, parcerias e construção do ecossistema Pantaleon.',
    photo: ceoPhoto,
    bioLong: [
      'Conduz a visão estratégica da Pantaleon Systems: como a organização se posiciona, com quem se conecta e de que forma o ecossistema se estrutura em torno da tese da Web4.',
      'À frente do posicionamento institucional, das parcerias e da formação da comunidade, garante que cada projeto — do núcleo de pesquisa às aplicações — seja apresentado com a clareza e a responsabilidade que uma infraestrutura de confiança exige.',
    ],
  },
  {
    name: 'Efrain M. P. Pantaleon',
    role: 'CTO & Co-Founder',
    bio: 'Responsável pela arquitetura tecnológica, infraestrutura da rede, pesquisa computacional e evolução do núcleo USF.',
    photo: ctoPhoto,
    bioLong: [
      'Responsável pela arquitetura tecnológica da Pantaleon: a infraestrutura da rede, a pesquisa computacional e a evolução do núcleo USF que sustenta os demais projetos.',
      'Conduz a construção do kernel experimental, dos mecanismos de validação de estado e da base técnica sobre a qual a IFRA Network e as aplicações serão erguidas — com pesquisa antes do hype e verificabilidade por design.',
    ],
  },
]
