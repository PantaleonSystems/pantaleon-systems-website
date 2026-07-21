# Design System — Pantaleon Systems

Extraído do protótipo aprovado (`reference/pantaleon-home.html`). Estes são os valores
definitivos. Ao criar `src/styles/tokens.css`, use exatamente estes tokens.

## Princípio de marca

Comunicar simultaneamente **deep tech, confiança institucional e inteligência verificável**.
Modo claro premium (fundo ivory) como base, com seções escuras (roxo profundo) estratégicas.
Dourado é sinal de precisão e valor — nunca decoração em grandes áreas. Proporção alvo:
60% neutros claros/roxo · 25% grafite · 10% roxo royal · 5% dourado.

## Tokens de cor

```css
:root {
  /* Marca */
  --purple-deep: #241033;   /* fundos escuros, títulos premium, botão primário */
  --purple-royal: #4B1E73;  /* hover, links destacados, ícones */
  --gold-khipu: #C89B3C;    /* acentos, linhas, nós, bordas de foco, CTAs especiais */
  --gold-soft: #E7C879;     /* acento sobre fundo escuro, detalhes suaves */

  /* Neutros */
  --bg-ivory: #F7F3EA;      /* fundo principal claro */
  --bg-warm: #FFFDF8;       /* cards, seções claras internas */
  --text-primary: #1D1D1F;  /* texto principal */
  --text-secondary: #5F5A66;/* texto secundário, descrições */
  --border: #DDD4C4;        /* bordas, divisórias */

  /* Funcionais (estados) */
  --success: #2E7D5B;       /* "Hoje" / valid state */
  --warning: #B8872E;       /* "Próximo" / pending / status em desenvolvimento */
  --info: #3A6D8C;          /* "Futuro" / system / status núcleo P&D */

  /* Tipografia */
  --font-display: "Space Grotesk", sans-serif;  /* títulos, números, headings */
  --font-body: "Inter", sans-serif;             /* corpo, menus, botões */
  --font-mono: "IBM Plex Mono", monospace;      /* eyebrows, labels técnicos, metadados */

  /* Raios */
  --radius-md: 12px;
  --radius-lg: 20px;
  --radius-xl: 24px;
  --radius-pill: 999px;

  /* Sombras */
  --shadow-soft: 0 18px 60px rgba(36,16,51,0.08);
  --shadow-card: 0 10px 30px rgba(36,16,51,0.06);

  /* Movimento */
  --ease: cubic-bezier(0.22, 1, 0.36, 1);

  /* Layout */
  --maxw: 1200px;
}
```

Importar fontes no `index.html`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
```

## Escala tipográfica

- **Display / Hero (h1):** Space Grotesk 600, `clamp(36px, 5.4vw, 64px)`, line-height 1.04, letter-spacing -0.02em.
- **h2 (títulos de seção):** Space Grotesk 600, `clamp(28px, 4vw, 44px)`.
- **h3:** Space Grotesk 600, 20–24px.
- **Body:** Inter 400, 17px, line-height 1.65.
- **Body large / lead:** Inter 400, 18–20px.
- **Eyebrow:** IBM Plex Mono 500, 12.5px, letter-spacing 0.18em, uppercase, cor `--gold-khipu`,
  precedido de um traço horizontal de 22px (`::before`).
- **Label técnico / metadado:** IBM Plex Mono, 11–13px, uppercase, letter-spacing 0.04–0.14em.

## Primitivos do design system (`src/design-system/`)

### Button
Variantes: `primary`, `ghost`, `ghost-on-dark`. Prop `as` para renderizar `<a>`/`<Link>`/`<button>`.
Opcional `arrow` (seta → que desliza 4px no hover).
- primary: bg `--purple-deep`, texto `--bg-warm`; hover bg `--purple-royal` + translateY(-2px).
- ghost: transparente, texto `--purple-deep`, borda 1px `--gold-khipu`; hover bg rgba(200,155,60,0.10).
- ghost-on-dark: texto `--bg-warm`, borda rgba(231,200,121,0.5).
- radius `--radius-pill`, padding 14px 26px, Inter 600 15px, transição `.3s var(--ease)`.

### Eyebrow
Rótulo mono com traço. Props: `children`, `variant?: 'light' | 'dark'` (dark usa `--gold-soft`),
`center?`. 

### SectionHeading
Compõe Eyebrow + `<h2>` + parágrafo opcional. Props: `eyebrow`, `title`, `description?`, `center?`.

### Card
Base reutilizável: bg `--bg-warm` ou `--bg-ivory`, borda 1px `--border`, radius `--radius-xl`,
padding 32–34px. Hover opcional: translateY(-4px) + borda dourada rgba(200,155,60,0.55) +
`--shadow-soft`. Variante `dark` (bg `--purple-deep`, texto claro).

### StatusBadge
Pílula mono uppercase. Props: `variant: 'dev' | 'rnd'`, `children`.
- dev (em desenvolvimento / aplicação): cor `--warning`, borda/bg âmbar translúcido.
- rnd (núcleo P&D / em estudo): cor `--info`, borda/bg azul translúcido.

## Componentes compartilhados (`src/components/`)

- **Header:** fixo, transparente no topo; ao rolar >20px ganha `background rgba(247,243,234,0.82)`,
  `backdrop-filter: blur(16px)` e borda inferior. Logo (imagem circular 38px) + wordmark à
  esquerda, nav ao centro, botão "Conecte-se" à direita. Menu hamburguer <900px.
- **Footer:** fundo `--purple-deep`. Grid 4 colunas (marca+sobre, navegação, projetos, conecte-se).
  Barra inferior com copyright, o lema mono, e links legais.
- **KhipuLines:** SVG de fundo com 3–4 curvas finas douradas (opacity ~0.24) e nós circulares
  que pulsam suavemente (keyframes `pulse`, 3s, respeitando reduced-motion). Prop para variar
  densidade/tema (claro sobre ivory, dourado suave sobre roxo). É a assinatura visual.
- **OrbitVisual (hero):** logo central circular + anel tracejado + 4 nós (Dados, Agentes,
  Estados, Provas) com rótulos em pílula mono. Nós pulsam (`opulse`).
- **TransitionPath:** trilha horizontal Pesquisa → Protótipo → Validação → Rede → Ecossistema.
  Nós e linhas acendem em sequência (stagger ~250ms) quando entram na viewport. Vira vertical <900px.
- **EcosystemDiagram:** pilha vertical de nós conectados por verbos
  (Pantaleon —desenvolve→ USF Engine —sustenta→ IFRA Network —poderá utilizar→ Khipu —aplica-se em→
  CidadesMIL / Agentes / IoT / Redes Web4 / Dados físico-digitais). Nó raiz é escuro.
- **Reveal:** wrapper que aplica opacity 0→1 + translateY(24px→0) + blur(8px→0) via
  IntersectionObserver quando visível. Suporta `stagger` para escalonar filhos (~85ms). Deve
  desativar-se sob `prefers-reduced-motion`.

## Animações

- Easing único: `--ease` = `cubic-bezier(0.22, 1, 0.36, 1)`.
- Scroll reveal: 0.7s. Stagger entre cards: 85ms.
- Micro-hover: 0.28–0.32s.
- TransitionPath: nós 250ms de intervalo; linhas 170ms após o nó.
- SEMPRE respeitar `@media (prefers-reduced-motion: reduce)` (zera transições e animações).

## Estrutura da Home (ordem das seções)

1. Hero (título Web4 + orbit + CTAs + microfrase-lema)
2. SimpleWords (seção escura — 3 perguntas)
3. Web3ToWeb4 (comparativo)
4. MissionVision (missão, visão, 5 princípios)
5. Ecosystem (diagrama Pantaleon → … → aplicações)
6. WhyItMatters (4 blocos)
7. Projects (4 cards)
8. Leadership (CEO + CTO)
9. Research (Research-driven + TransitionPath)
10. BuildStatus (Hoje / Próximo / Futuro)
11. Manifesto (seção escura)
12. Community (4 cards + canais concretos)
13. FinalCTA

## Páginas internas — padrão a seguir

O protótipo cobre só a Home. Para as páginas internas, seguir o MESMO sistema visual:

- **/sobre:** hero curto (eyebrow + título + lead), Missão/Visão/Princípios expandidos,
  Leadership com bios mais longas, timeline/história opcional, CTA para comunidade.
- **/projetos/{slug}:** cada uma com: hero (nome + StatusBadge + 1 frase), "O que é",
  "Por que existe / problema", "Relação com a Pantaleon" (referência ao EcosystemDiagram),
  "Estágio atual" (reusar BuildStatus), "Como acompanhar" (CTA). Para **USF Engine**, não
  revelar detalhes proprietários (segredo industrial). Para **Khipu**, linguagem jurídica
  cautelosa: conceito e utilidade futura planejada, sem oferta/promessa/pré-venda.

## Dados a extrair para `src/data/`

- **projects.ts:** IFRA Network (dev), USF Engine (rnd), Khipu (rnd), CidadesMIL (dev) — com
  slug, título, status, descrição curta e CTA. Os textos exatos estão no HTML de referência.
- **leadership.ts:** Dianelys O'Farril Pantaleon (CEO & Co-Founder) e Efrain M. P. Pantaleon
  (CTO & Co-Founder), com bio curta (já no HTML) e caminho da foto.
- **principles.ts:** os 5 princípios.
- **navigation.ts:** itens do header (Visão, Ecossistema, Projetos, Liderança, Pesquisa,
  Comunidade) e colunas do footer.
