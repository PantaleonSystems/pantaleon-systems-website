# Redesign Pantaleon Systems (automação) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Trocar o site cripto/Web4 por uma home de página única de 8 cenas sobre automação e integração de sistemas, com movimento GSAP, lista de espera em planilha Google e páginas legais.

**Architecture:** React Router com `Layout` (Header fora do wrapper do ScrollSmoother; `<main>` + Footer dentro). Toda a animação em `useGSAP` com `scope`, plugins registrados uma vez em `src/lib/gsap.ts`, `gsap.matchMedia()` separando `no-preference` de `reduce`. Conteúdo em `src/data/*.ts`; cada cena é um componente em `src/sections/`. A linha dourada é um SVG fixo no fluxo da página desenhado por ScrollTrigger (`scrub`).

**Tech Stack:** Vite 8, React 19, TS strict, CSS Modules, React Router 6, `gsap` + `@gsap/react` (ScrollTrigger, ScrollSmoother, SplitText, DrawSVGPlugin, MorphSVGPlugin, MotionPathPlugin).

**Spec:** `docs/superpowers/specs/2026-10-21-redesign-automacao-design.md`

## Global Constraints

- Paleta: `--purple-deep #241033`, `--purple-royal #4B1E73`, `--gold-khipu #C89B3C`, `--gold-soft #E7C879`, `--bg-ivory #F7F3EA`, `--bg-warm #FFFDF8`, texto `#1D1D1F`/`#5F5A66`. Dourado é acento (~5%).
- Sem Tailwind, sem lib de UI, sem Lenis. Animação só com `transform`/`opacity`.
- `prefers-reduced-motion`: estado final estático, sem ScrollSmoother, só cross-fades curtos.
- Português do Brasil, "você". Proibido: revolucionário, disruptivo, soluções inovadoras de ponta, sinergia, transformação digital. Sem números/depoimentos/preços inventados. Só Instagram prometido.
- WhatsApp e e-mail em constantes únicas marcadas em `src/data/contact.ts`.
- Endpoint do formulário em `VITE_WAITLIST_URL`.
- Antes de cada tarefa de movimento: ler as skills do §10 do design (gsap-react, gsap-plugins, gsap-core, gsap-timeline, gsap-scrolltrigger, gsap-performance, apple-design) e seguir os "Do Not".
- Não commitar nem dar push (instrução do usuário).
- Verificação por tarefa: `npm run build`, `npx oxlint`, navegador do app (desktop + mobile + reduced-motion). Não há suíte de testes no projeto; a verificação é build/lint/navegador.

## Review Focus

- Formulário com `VITE_WAITLIST_URL` ausente: mostra erro humano, não quebra nem envia a lugar nenhum.
- Honeypot preenchido: finge sucesso e não envia.
- Rota com hash (`/#produto`) vinda de página legal: rola até a cena após render (ScrollManager adaptado ao smoother).
- Troca de rota / StrictMode: nenhum ScrollTrigger/ScrollSmoother duplicado (cleanup via `useGSAP`).
- Fonte carregando tarde: SplitText com `autoSplit` e `ScrollTrigger.refresh()` após `document.fonts.ready`.

---

### Task 1: Limpeza, base e dependências

**Files:**
- Delete: `src/sections/*`, `src/pages/AboutPage*`, `src/pages/projects/`, `src/components/{EcosystemDiagram,KhipuLines,OrbitVisual,PageHero,TransitionPath,Reveal}`, `src/data/*` (exceto `index.ts`, `navigation.ts` reescritos), `src/hooks/useScrollReveal.ts`, `src/assets/{ceo,cto}.png`, `docs/handoff/`
- Create: `src/lib/gsap.ts`, `src/data/contact.ts`, `src/lib/motion.ts`
- Modify: `package.json`, `src/styles/global.css`, `src/types/index.ts`, `src/design-system/*` (remover Card/StatusBadge se não usados)

**Interfaces:**
- Produces: `src/lib/gsap.ts` exporta `gsap`, `ScrollTrigger`, `ScrollSmoother`, `SplitText`, `DrawSVGPlugin`, `MorphSVGPlugin`, `MotionPathPlugin`, `useGSAP` (plugins registrados uma vez). `src/lib/motion.ts` exporta `EASE = 'power3.out'`, `DUR = { fast: 0.4, base: 0.8, slow: 1.2 }`, `REDUCED = '(prefers-reduced-motion: reduce)'`, `NO_PREF = '(prefers-reduced-motion: no-preference)'`. `src/data/contact.ts` exporta `COMPANY`, `WHATSAPP_NUMBER`, `whatsappUrl(msg?: string): string`, `CONTACT_EMAIL`, `ADDRESS`.

- [ ] **Step 1:** `npm i gsap @gsap/react`; confirmar `node_modules/gsap/MorphSVGPlugin.js` existe.
- [ ] **Step 2:** Remover arquivos listados; reescrever `App.tsx` com rotas `/`, `/termos`, `/privacidade`, `/exclusao-de-dados`, `*` (placeholders).
- [ ] **Step 3:** `contact.ts` com `// TODO(usuário):` em WhatsApp, e-mail e endereço; `whatsappUrl` retorna `https://wa.me/${WHATSAPP_NUMBER}?text=...`.
- [ ] **Step 4:** Em `global.css` remover `scroll-behavior: smooth`, `.reveal`/`.stagger`, `.tint`; manter reset, `.wrap`, `:focus-visible`.
- [ ] **Step 5:** Verificar: `npm run build` e `npx oxlint` sem erros.

### Task 2: Layout, ScrollSmoother, Header e Footer

**Files:** Create `src/components/Layout/Layout.tsx`, `src/hooks/useSmoother.ts`; modify `Header`, `Footer`, `ScrollManager`, `src/data/navigation.ts`.

**Interfaces:**
- Consumes: `src/lib/gsap.ts`.
- Produces: `Layout` renderiza `<Header/>` + `#smooth-wrapper > #smooth-content > <main><Outlet/></main><Footer/>`. `useSmoother(enabled: boolean)` cria `ScrollSmoother` (smooth 1.1) só em `NO_PREF` e mata no cleanup; `getSmoother()` via `ScrollSmoother.get()`. `ScrollManager` rola por hash usando `smoother.scrollTo(el, true)` se existir, senão `scrollIntoView`.

- [ ] **Step 1:** Header: translúcido (`backdrop-filter`), esconde ao rolar para baixo e mostra ao subir (ScrollTrigger `onUpdate` + `direction`), fallback sólido em `prefers-reduced-transparency`; nav: `Produto`, `Sob medida`; botão WhatsApp.
- [ ] **Step 2:** Footer: razão social, CNPJ, Parnamirim/RN, e-mail, links Termos/Privacidade/Exclusão de dados (valores de `contact.ts`).
- [ ] **Step 3:** Verificar no navegador: rolagem com inércia na home, nativa com reduced-motion, header some/volta. Build + oxlint.

### Task 3: Hero (emaranhado → linha dourada)

**Files:** Create `src/sections/Hero/Hero.tsx`, `Hero.module.css`, `src/data/hero.ts`. Skills: gsap-react, gsap-plugins (MorphSVG, SplitText, MotionPath), gsap-timeline, apple-design §15.

**Interfaces:** `Hero()` sem props; expõe `id="topo"`; botões `href="#produto"` e `whatsappUrl()`.

- [ ] **Step 1:** SVG com 4–5 traços emaranhados (`path`s com ícones simples: seta copiar, planilha, balão) e um alvo reto; timeline única ~3s: entrada desordenada → `morphSVG` (`shapeIndex` ajustado) → nó final. Título "Diga não ao manual." via SplitText `type: 'lines'`, `mask: 'lines'`, `autoSplit: true`, `aria`.
- [ ] **Step 2:** Brilho raro com MotionPath (uma passada, repetição com `repeatDelay` longo), sem loop contínuo.
- [ ] **Step 3:** `gsap.matchMedia`: reduce → estado final (linha reta, texto visível). Hero legível sem JS (estado final no CSS, JS parte do estado inicial via `gsap.set`/`from`).
- [ ] **Step 4:** Verificar desktop, mobile (375px), reduced-motion, build + oxlint.

### Task 4: Problema, Visão, O que fazemos + linha dourada entre cenas

**Files:** Create `src/sections/{Problem,Vision,Services}/*`, `src/components/GoldenLine/GoldenLine.tsx`, `src/data/{problem,services}.ts`. Skills: gsap-scrolltrigger (batch, scrub), gsap-plugins (DrawSVG), gsap-core.

**Interfaces:** `GoldenLine()` SVG vertical absoluto atrás do conteúdo, `drawSVG` de `0%` a `100%` com `scrub: true`, triggers criados de cima para baixo. Serviços: composição editorial (lista numerada com linha divisória por bloco, não 3 cards iguais).

- [ ] **Step 1:** Problem: título + 4 exemplos concretos revelados em lote (`ScrollTrigger.batch`), fecho "Isso não é trabalho. É tempo preso."
- [ ] **Step 2:** Vision: fundo roxo, frase grande, parágrafo do manifesto (copy lapidada pelo §6).
- [ ] **Step 3:** Services: Automação de processos, Integração de sistemas, Produtos próprios, entradas distintas por bloco.
- [ ] **Step 4:** GoldenLine desenhada pela rolagem; reduced-motion: linha completa estática.
- [ ] **Step 5:** Verificar + build + oxlint.

### Task 5: Antes/Depois (pin) e Método

**Files:** Create `src/sections/BeforeAfter/*`, `src/sections/Method/*`, `src/data/method.ts`. Skills: gsap-scrolltrigger (pin no container, `end: '+=…'`), gsap-timeline.

- [ ] **Step 1:** Pin curto (`+=~120%`): passos manuais (copiar pedido, abrir planilha, digitar no sistema, avisar no chat, conferir) riscados um a um; versão automática à direita colapsa num passo ("Pedido entrou. Tudo atualizado."). Sem números inventados de tempo.
- [ ] **Step 2:** Método numerado Observar, Simplificar, Conectar, Automatizar (lista tipográfica, sem caixas).
- [ ] **Step 3:** Mobile: sem pin se a altura for pequena (`matchMedia` max-width), empilha. Reduced-motion: tudo riscado/estado final, sem pin.
- [ ] **Step 4:** Verificar + build + oxlint.

### Task 6: Primeiro produto e lista de espera

**Files:** Create `src/sections/Product/*`, `src/components/WaitlistForm/{WaitlistForm.tsx,WaitlistForm.module.css}`, `src/lib/waitlist.ts`, `docs/waitlist-apps-script.md`, `apps-script/waitlist.gs`. Skills: apple-design §1,§3,§16, gsap-performance (`quickTo`).

**Interfaces:**
- `submitWaitlist(data: WaitlistInput): Promise<void>` em `src/lib/waitlist.ts`; `interface WaitlistInput { nome: string; whatsapp: string; instagram: string; perfil: 'Afiliado' | 'Loja' | 'Criador'; consentimento: boolean; website: string /* honeypot */ }`. `validate(input): Partial<Record<keyof WaitlistInput, string>>`. Se `website` preenchido resolve sem enviar; se `VITE_WAITLIST_URL` ausente rejeita com `Error('config')`. Envio: `fetch(url, { method: 'POST', body: JSON.stringify(...), headers: { 'Content-Type': 'text/plain;charset=utf-8' } })` (evita preflight no Apps Script).
- Apps Script `doPost(e)` acrescenta linha `[data/hora, nome, whatsapp, instagram, perfil, consentimento]` e responde JSON.

- [ ] **Step 1:** Cena: "Publique uma vez. Venda em todas as redes.", descrição, selo "em breve", Instagram prometido, demais redes "em breve, sem data garantida", texto das 50 vagas (marcado como a confirmar em `contact.ts`/comentário).
- [ ] **Step 2:** Form com validação inline (onBlur + submit), estados enviando/sucesso/erro com mensagem humana, `aria-live`, consentimento obrigatório, botão com feedback no pointer-down (`quickTo`).
- [ ] **Step 3:** Escrever `apps-script/waitlist.gs` e `docs/waitlist-apps-script.md` (criar planilha, colar script, implantar como Web App "qualquer pessoa", copiar URL em `.env` como `VITE_WAITLIST_URL`); criar `.env.example`.
- [ ] **Step 4:** Verificar: validação, erro sem env, honeypot, sucesso simulado; build + oxlint.

### Task 7: Sob medida, páginas legais e 404

**Files:** Create `src/sections/Custom/*`, `src/pages/{TermsPage,PrivacyPage,DataDeletionPage,NotFoundPage}.tsx`, `src/pages/Legal.module.css`, `src/data/legal.ts`.

- [ ] **Step 1:** Sob medida: "Tem um processo que te consome? Conte para a gente." + botão WhatsApp.
- [ ] **Step 2:** Termos, Privacidade (LGPD: dados coletados no formulário, finalidade, base legal consentimento, contato, direitos), Exclusão de dados (pedido por e-mail, prazo de 15 dias a confirmar pelo usuário). Marcar "revisar com advogado" só em documento de entrega, não na página.
- [ ] **Step 3:** 404 simples na linguagem do site. `useDocumentTitle` por página.
- [ ] **Step 4:** Verificar rotas e hash vindo das legais; build + oxlint.

### Task 8: Documentação e revisão final

**Files:** Rewrite `docs/CLAUDE.md`, `docs/DESIGN_SYSTEM.md`; update `README.md`; `index.html` (title/description/meta).

- [ ] **Step 1:** Reescrever docs para o novo produto, estrutura, GSAP, regras de voz, pendências.
- [ ] **Step 2:** `grep -ri "web4\|cripto\|ifra\|khipu\|usf" src index.html` sem resultados indevidos (a linha dourada pode se chamar `GoldenLine`).
- [ ] **Step 3:** Passada final: build, oxlint, desktop/mobile/reduced-motion, console sem erros; relatar pendências ao usuário (WhatsApp, e-mail, endereço, "50 vagas", planilha + script, textos legais).

---

## Adendo 2026-10-27: peças visuais (rodada 1)

Decisões do usuário: mockup do produto **esquemático e genérico** (o produto não foi lançado); **cortar texto** onde entrar visual.

- **Task 9: Problema com telas empilhadas.** `src/components/visuals/ManualWindows.tsx`: 4 janelas (chat, planilha, redes, sistema) em HTML/CSS que entram uma a uma, com um cursor que salta entre elas, ligado à rolagem (`scrub`, `invalidateOnRefresh`). Texto visível: título + fecho; os 4 exemplos ficam numa lista `.sr-only`.
- **Task 10: Mini-diagramas em "O que fazemos".** `src/components/visuals/ServiceDiagram.tsx` com `kind: 'automation' | 'integration' | 'products'`, SVG desenhado com DrawSVG/MotionPath uma única vez ao entrar. Cada linha mantém título + uma frase curta.
- **Task 11: Mockup esquemático do produto.** `src/components/visuals/ProductPhone.tsx`: celular genérico com publicação, chip "Instagram" aceso e "Outras redes · em breve", comentário "QUERO" e resposta com link. Sequência única ao entrar. A cena vira duas linhas (texto + celular; chamada da lista + formulário).
- Verificação de cada uma: build, oxlint, navegador, movimento reduzido (estado final estático), mobile 375px.

## Adendo 2026-10-27 (2): segunda rodada

- **Task 12: Visão em forma gráfica.** `components/visuals/VisionGraphic.tsx`: nove tarefas manuais soltas (copiar, colar, digitar de novo...) são riscadas e apagadas pela rolagem; no lugar, a linha dourada liga três nós: Tempo, Atenção, Dinheiro (palavras do próprio texto da visão). Parágrafo da visão encurtado.
- **Task 13: Método com linha e ícones.** Linha vertical que se desenha pela rolagem e nós com ícone (lupa, tesoura, conector, engrenagem) que acendem no passo atual.
- **Task 14: Sob medida com fluxo.** `components/visuals/CustomFlow.tsx`: três blocos soltos que se conectam sozinhos. Parágrafo cortado.
- **Task 15: Linha dourada termina num nó** no fim da história.
- **Hero:** aguardando escolha do usuário entre opções de composição tipográfica.
