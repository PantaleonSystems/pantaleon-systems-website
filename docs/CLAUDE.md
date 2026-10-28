# Pantaleon Systems: site (React + TypeScript)

Contrato de engenharia do projeto. Leia antes de qualquer tarefa. A fonte de verdade do que o site é e diz está em `docs/superpowers/specs/2026-10-21-redesign-automacao-design.md`.

## Contexto

A Pantaleon Systems (CNPJ 66.899.192/0001-28, Parnamirim/RN) faz **integração de sistemas e automação**. O primeiro produto, ainda não lançado, publica um vídeo em várias redes e responde comentários ("QUERO") com o link no Direct. O site precisa apresentar a visão ("Diga não ao manual."), provar que ela virou produto e passar confiança (empresa real, dados legais, contato).

A empresa **não é mais cripto/Web4**. Não reintroduza nada desse tema. O protótipo HTML antigo e a pasta `docs/handoff` foram removidos de propósito.

## Stack

Vite, React 19, TypeScript strict, React Router 6, CSS Modules. Movimento com **GSAP** (`gsap` + `@gsap/react`: ScrollTrigger, ScrollSmoother, SplitText, DrawSVG, MorphSVG, MotionPath, todos gratuitos). Sem Tailwind, sem biblioteca de UI, sem Lenis. Uma única fonte: Inter.

## Estrutura

```
src/
  App.tsx                    rotas: /, /termos, /privacidade, /exclusao-de-dados, *
  lib/gsap.ts                registro ÚNICO de plugins; importe gsap sempre daqui
  lib/motion.ts              easing, durações e media queries (NO_PREF / REDUCED)
  lib/scroll.ts              scrollToId / scrollToTop (usa o ScrollSmoother quando ativo)
  lib/waitlist.ts            validação e envio do formulário
  components/                Layout, Smoother, Header, Footer, HashLink, GoldenLine, WaitlistForm, ScrollManager
  components/visuals/        peças visuais animadas: ManualWindows, ServiceDiagram, ProductPhone, VisionGraphic, CustomFlow, Glyph
  design-system/             Button (+ buttonClasses)
  sections/                  uma pasta por cena da home (Hero, Problem, Vision, Services, BeforeAfter, Method, Product, Custom)
  pages/                     HomePage, LegalPage(s), NotFoundPage
  data/                      conteúdo e constantes (contact.ts é o ÚNICO lugar de WhatsApp, e-mail, endereço, nº de vagas)
  hooks/                     useDocumentTitle, usePressFeedback
apps-script/waitlist.gs      código do Google Apps Script (ver docs/waitlist-apps-script.md)
```

## Regras de movimento (GSAP)

- Tudo dentro de `useGSAP` com `scope`; selectors só dentro do escopo; cleanup é automático.
- `gsap.matchMedia()` separa `NO_PREF` de `REDUCED`. Estado inicial de animação (`gsap.set`/`from`) só dentro de `NO_PREF`: o HTML/CSS padrão já é o **estado final**, então movimento reduzido (e falta de JS) mostram a página completa.
- O `ScrollSmoother` é criado em `<Smoother />`, que precisa ser o **primeiro irmão** no `Layout`: os efeitos do React rodam em ordem e o smoother deve existir antes de qualquer ScrollTrigger. O Header fica fora do `#smooth-wrapper`.
- Âncoras da home usam `<HashLink>` (rola pelo smoother); nunca `href="#..."` cru nem `scroll-behavior: smooth`.
- ScrollTriggers criados de cima para baixo; pin no container, animar os filhos; nunca `scrub` junto com `toggleActions`.
- Só `transform` e `opacity` (exceção: `morphSVG` e `drawSVG`, que são do desenho). Easing de marca sem rebote (`EASE` em `lib/motion.ts`).
- Feedback de pressão no pointer-down com `usePressFeedback` (atributo `data-press`).
- Em desenvolvimento `window.gsap`, `ScrollTrigger` e `ScrollSmoother` ficam expostos para depuração.

## Voz e escrita

Direto, confiante, simples; "você". Fale de resultado, não de tecnologia. Exemplos concretos de tarefa manual. Frases curtas, verbos de ação. **Proibido:** revolucionário, disruptivo, soluções inovadoras de ponta, sinergia, transformação digital. Não inventar números, depoimentos nem preços. Só Instagram é prometido; outras redes são "em breve, sem data garantida". Assinatura: "Diga não ao manual."

## Convenções

- Um componente por arquivo, CSS Module ao lado. Conteúdo em `src/data`, nunca array de texto dentro do JSX.
- Cores, raios e easing via `var(--token)`. Nenhum hex solto (exceção: vermelho de erro sobre fundo escuro).
- Acessibilidade: foco visível, contraste AA, `prefers-reduced-motion`, `prefers-reduced-transparency`, `prefers-contrast`.
- Verifique cada mudança com `npm run build` e `npx oxlint`.

## Pendências do dono do projeto

Marcadas com `TODO(usuário)` em `src/data/contact.ts`: número do WhatsApp, e-mail e domínio, endereço completo, confirmar "50 vagas". Também: criar a planilha e publicar o Apps Script, definir `VITE_WAITLIST_URL` na hospedagem, e revisar os textos legais (`src/data/legal.ts`) com um advogado.
