import { COMPANY, CONTACT_EMAIL, addressLine } from './contact'

export interface LegalSection {
  heading: string
  paragraphs: string[]
}

export interface LegalDoc {
  title: string
  intro: string
  updated: string
  sections: LegalSection[]
}

const UPDATED = '21 de outubro de 2026'
const who = `${COMPANY.legalName}, CNPJ ${COMPANY.cnpj}, com sede em ${addressLine}`

export const terms: LegalDoc = {
  title: 'Termos de uso',
  intro: 'Estas regras valem para quem usa o site da Pantaleon Systems. São poucas e escritas para serem entendidas.',
  updated: UPDATED,
  sections: [
    {
      heading: 'Quem somos',
      paragraphs: [`Este site é mantido por ${who}. Para falar com a gente: ${CONTACT_EMAIL}.`],
    },
    {
      heading: 'O que o site oferece',
      paragraphs: [
        'O site apresenta a empresa, os serviços de automação e integração de sistemas e o nosso primeiro produto, que ainda não foi lançado. Também permite entrar na lista de espera desse produto.',
      ],
    },
    {
      heading: 'Lista de espera',
      paragraphs: [
        'Entrar na lista de espera é gratuito e não é uma compra. Ela não garante vaga, preço, prazo nem acesso ao produto. Quem estiver na lista será avisado primeiro quando houver novidade, e qualquer oferta paga será apresentada separadamente, com as condições completas.',
        'Você pode sair da lista quando quiser, pedindo pelo e-mail acima.',
      ],
    },
    {
      heading: 'Uso do site',
      paragraphs: [
        'Use o site de forma honesta: informe dados verdadeiros e não tente atrapalhar o funcionamento dele ou acessar áreas que não são públicas.',
      ],
    },
    {
      heading: 'Propriedade intelectual',
      paragraphs: [
        'Textos, marca, logotipo e o desenho do site pertencem à Pantaleon Systems. Você pode compartilhar o endereço do site, mas não pode copiar ou usar esses materiais como se fossem seus sem a nossa autorização.',
      ],
    },
    {
      heading: 'Limite de responsabilidade',
      paragraphs: [
        'Fazemos o possível para manter o site no ar e as informações corretas, mas não garantimos que ele nunca terá falhas ou interrupções. O conteúdo é informativo e pode mudar, inclusive o que se refere ao produto em desenvolvimento.',
      ],
    },
    {
      heading: 'Mudanças nestes termos',
      paragraphs: ['Podemos atualizar estes termos. A data de atualização fica no topo desta página.'],
    },
    {
      heading: 'Lei aplicável',
      paragraphs: [
        'Estes termos seguem as leis brasileiras. Qualquer dúvida que não seja resolvida em conversa será tratada no foro da comarca de Parnamirim/RN.',
      ],
    },
  ],
}

export const privacy: LegalDoc = {
  title: 'Política de privacidade',
  intro: 'Aqui explicamos quais dados coletamos, por quê, e o que você pode fazer com eles, conforme a Lei Geral de Proteção de Dados (LGPD, Lei 13.709/2018).',
  updated: UPDATED,
  sections: [
    {
      heading: 'Quem é responsável pelos dados',
      paragraphs: [
        `${who}. Para qualquer assunto sobre dados pessoais, escreva para ${CONTACT_EMAIL}.`,
      ],
    },
    {
      heading: 'Quais dados coletamos',
      paragraphs: [
        'Só coletamos o que você mesmo preenche no formulário da lista de espera: nome, número de WhatsApp, @ do Instagram, como você vende (afiliado, loja ou criador) e o seu aceite para receber contato, junto com a data e a hora do cadastro.',
        'O site não usa cookies de publicidade nem ferramentas de rastreamento. Para exibir a fonte de texto, a página carrega um arquivo do Google Fonts, e por isso o Google pode receber o seu endereço de IP.',
      ],
    },
    {
      heading: 'Para que usamos',
      paragraphs: [
        'Para avisar você sobre o lançamento do nosso primeiro produto e sobre a abertura das vagas do Plano Fundador, pelo WhatsApp ou pelo Instagram. Não usamos os dados para outra finalidade sem pedir o seu consentimento de novo.',
      ],
    },
    {
      heading: 'Por que podemos tratar esses dados',
      paragraphs: ['Pelo seu consentimento (LGPD, art. 7º, inciso I), dado ao marcar a caixa de aceite do formulário. Você pode retirar o consentimento a qualquer momento.'],
    },
    {
      heading: 'Com quem compartilhamos',
      paragraphs: [
        'Não vendemos nem alugamos dados. Os cadastros ficam numa planilha do Google, em conta da Pantaleon Systems, e o Google atua como prestador do serviço de armazenamento. Só a equipe da Pantaleon tem acesso.',
      ],
    },
    {
      heading: 'Por quanto tempo guardamos',
      paragraphs: [
        'Até você pedir a exclusão ou até a lista de espera deixar de ser necessária, o que acontecer primeiro. Depois disso, apagamos os dados.',
      ],
    },
    {
      heading: 'Seus direitos',
      paragraphs: [
        'Você pode pedir a confirmação de que tratamos seus dados, o acesso a eles, a correção, a exclusão, a portabilidade e informações sobre com quem compartilhamos, além de retirar o consentimento. Basta escrever para o e-mail acima. Para excluir seus dados, veja também a página Exclusão de dados.',
      ],
    },
    {
      heading: 'Segurança',
      paragraphs: [
        'Limitamos o acesso à planilha e usamos conexão segura (HTTPS) no envio do formulário. Nenhum sistema é perfeito, e se houver um incidente que possa afetar você, avisaremos como a lei exige.',
      ],
    },
    {
      heading: 'Mudanças nesta política',
      paragraphs: ['Podemos atualizar esta política. A data de atualização fica no topo da página.'],
    },
  ],
}

export const dataDeletion: LegalDoc = {
  title: 'Exclusão de dados',
  intro: 'Você pode pedir a exclusão dos seus dados pessoais a qualquer momento, sem precisar explicar o motivo.',
  updated: UPDATED,
  sections: [
    {
      heading: 'Como pedir',
      paragraphs: [
        `Envie um e-mail para ${CONTACT_EMAIL} com o assunto “Exclusão de dados”. No texto, informe o nome, o WhatsApp e o @ do Instagram que você usou no cadastro, para que a gente encontre o seu registro.`,
      ],
    },
    {
      heading: 'O que acontece depois',
      paragraphs: [
        'Respondemos para confirmar que recebemos o pedido e, em até 15 dias, apagamos os seus dados da lista de espera e de qualquer outro lugar onde eles estejam guardados. Quando terminar, avisamos você.',
      ],
    },
    {
      heading: 'O que será apagado',
      paragraphs: [
        'Nome, WhatsApp, Instagram, perfil e registro de consentimento. Se algum dado precisar ser mantido por obrigação legal, avisamos qual é e por quê.',
      ],
    },
    {
      heading: 'Dados vindos de outras plataformas',
      paragraphs: [
        'Se no futuro você conectar uma conta de rede social aos nossos produtos, os dados recebidos dessa plataforma (como a Meta) também serão apagados no mesmo pedido.',
      ],
    },
  ],
}
