# Pantaleon Systems — Website (React + TypeScript)

> Este arquivo é o contrato de engenharia do projeto. O Claude Code deve lê-lo antes de
> qualquer tarefa e mantê-lo como fonte de verdade sobre arquitetura, convenções e escopo.

## Contexto do produto

A **Pantaleon Systems** é uma deep tech brasileira — organização-mãe, orientada por pesquisa —
que projeta e constrói infraestrutura para a próxima geração de redes, agentes e sistemas
verificáveis (posicionamento "Web4"). Os projetos IFRA Network, USF Engine, Khipu e CidadesMIL
orbitam essa tese como ramificações.

**Regra de ouro do posicionamento (não violar):** a Pantaleon NÃO é a blockchain, NÃO é o token,
NÃO é uma landing page cripto, NÃO é um SaaS genérico. É a organização por trás da visão.
Todo copy e cada decisão de UI protegem essa narrativa.

## Fonte visual da verdade

O arquivo `reference/pantaleon-home.html` é um protótipo **completo e aprovado** da Home, feito
em HTML/CSS/JS puro. Ele é a especificação visual definitiva: paleta, tipografia, espaçamentos,
componentes, animações, copy e estrutura de seções já estão validados ali.

**Sua tarefa é portar esse protótipo para uma aplicação React + TypeScript componentizada e
multipágina, preservando 1:1 a aparência e o comportamento.** Não reinvente o design. Quando
tiver dúvida sobre um valor (cor, radius, espaçamento, easing), extraia do HTML de referência.

## Stack e ferramentas

- **Vite** + **React 18** + **TypeScript** (strict).
- **React Router v6** para multipágina.
- **CSS Modules** ou **vanilla-extract** para estilos com escopo. (Escolha CSS Modules se quiser
  o caminho mais direto; NÃO use Tailwind — o design system já está definido em tokens CSS e
  Tailwind exigiria reescrever tudo.)
- Fontes via Google Fonts (Space Grotesk, Inter, IBM Plex Mono) — importadas em `index.html`.
- Sem bibliotecas de UI (Material, Chakra, etc.). Os componentes são próprios.
- Animações com IntersectionObserver + CSS (como no protótipo). Não adicione Framer Motion a menos
  que seja pedido.

## Estrutura de pastas alvo

```
src/
  main.tsx
  App.tsx                      # define o Router e as rotas
  styles/
    tokens.css                 # design tokens (:root com todas as variáveis) — ver DESIGN_SYSTEM.md
    global.css                 # reset, base tipográfica, utilitários (.wrap, .reveal, .eyebrow)
  design-system/               # primitivos reutilizáveis, agnósticos de conteúdo
    Button/
      Button.tsx
      Button.module.css
    Eyebrow/
    SectionHeading/
    Card/
    StatusBadge/
    index.ts                   # barrel export
  components/                  # componentes de layout compartilhados
    Header/
    Footer/
    KhipuLines/                # o SVG de linhas/nós animados (fundo)
    OrbitVisual/               # o visual do hero (logo + órbita)
    TransitionPath/            # Pesquisa → Protótipo → Validação → Rede → Ecossistema
    EcosystemDiagram/          # Pantaleon → USF → IFRA → Khipu → aplicações
    Reveal/                    # wrapper que aplica o scroll-reveal via IntersectionObserver
  sections/                    # seções da Home (uma pasta por seção)
    Hero/
    SimpleWords/
    Web3ToWeb4/
    MissionVision/
    Ecosystem/
    WhyItMatters/
    Projects/
    Leadership/
    Research/
    BuildStatus/
    Manifesto/
    Community/
    FinalCTA/
  pages/
    HomePage.tsx
    AboutPage.tsx
    projects/
      IfraNetworkPage.tsx
      UsfEnginePage.tsx
      KhipuPage.tsx
      CidadesMilPage.tsx
    NotFoundPage.tsx
  data/                        # conteúdo separado da apresentação
    projects.ts                # array tipado dos 4 projetos (nome, status, descrição, slug)
    leadership.ts              # CEO e CTO
    navigation.ts              # itens de menu e footer
    principles.ts
  content/                     # textos longos, se preferir isolar copy
  assets/
    logo.png                   # (fornecido em reference/assets)
    ceo.png
    cto.png
  hooks/
    useScrollReveal.ts
    useHeaderScroll.ts
  types/
    index.ts                   # Project, Leader, NavItem, ProjectStatus, etc.
```

## Convenções de código

- Um componente por arquivo, PascalCase. Co-localizar `.module.css` ao lado do `.tsx`.
- Props sempre tipadas com `interface`. Evitar `any`. `tsconfig` em `strict`.
- Conteúdo (textos, listas de projetos, membros) vive em `src/data/*.ts` — NUNCA hardcodar
  arrays de conteúdo dentro do JSX. As seções mapeiam sobre esses dados.
- Cores, espaçamentos, radius, sombras e easing SEMPRE via `var(--token)`. Nenhum hex solto no CSS.
- Acessibilidade: foco de teclado visível, `alt` em imagens, `prefers-reduced-motion` respeitado
  (o protótipo já faz isso — reproduza), navegação por landmarks (`<header> <main> <footer>`).
- Responsivo: os breakpoints do protótipo são 960px, 900px e 560px. Preserve-os.

## Roteamento (multipágina)

```
/                       HomePage
/sobre                  AboutPage        (CEO + CTO + missão/visão/princípios expandidos)
/projetos/ifra-network  IfraNetworkPage
/projetos/usf-engine    UsfEnginePage
/projetos/khipu         KhipuPage
/projetos/cidadesmil    CidadesMilPage
*                       NotFoundPage
```

Header e Footer são compartilhados por um `Layout` que envolve o `<Outlet />`. Os CTAs internos
que hoje apontam para âncoras (`#projetos`) devem virar `<Link>` do React Router quando o destino
for outra página, e âncora/scroll suave quando for a mesma página.

## Ordem de execução recomendada (dê essas tarefas ao Claude Code nesta sequência)

1. **Scaffold**: inicializar Vite (react-ts), instalar react-router-dom, configurar tsconfig strict,
   criar a árvore de pastas acima (vazia com barrels), importar as fontes no `index.html`.
2. **Design tokens**: criar `styles/tokens.css` e `global.css` a partir de `DESIGN_SYSTEM.md`.
3. **Primitivos**: `design-system/` (Button, Eyebrow, SectionHeading, Card, StatusBadge).
4. **Componentes compartilhados**: Header, Footer, KhipuLines, Reveal, OrbitVisual,
   TransitionPath, EcosystemDiagram.
5. **Dados**: preencher `data/` a partir do conteúdo do HTML de referência.
6. **Seções da Home**: portar cada seção do HTML para um componente em `sections/`, uma por vez,
   comparando visualmente com o protótipo.
7. **HomePage**: compor todas as seções.
8. **Páginas internas**: About e as 4 de projeto (estrutura descrita em DESIGN_SYSTEM.md / o
   próprio HTML de projetos ainda não existe — gere seguindo o padrão visual da Home).
9. **Polish**: revisar responsivo, foco, reduced-motion, e rodar `tsc --noEmit` + build.

Faça UMA etapa por vez e me mostre o resultado antes de seguir. Não gere o projeto inteiro de uma vez.

## O que NÃO fazer

- Não trocar a paleta, as fontes ou os textos aprovados.
- Não introduzir Tailwind, styled-components ou libs de UI sem me perguntar.
- Não inventar métricas, números de usuários, logos de clientes ou claims não comprovados.
- Não afirmar status de projeto além de "em desenvolvimento / em estudo / em breve".
- Sobre o **Khipu**: manter linguagem conservadora ("conceito", "planejado"), sem qualquer termo
  que sugira oferta, pré-venda, promessa de retorno ou listagem (restrição jurídica).
