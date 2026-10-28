# Design system: Pantaleon Systems

Estética Apple: muito espaço vazio, uma ideia por tela, tipografia grande, hierarquia por tamanho e espaço (não por caixas e bordas). O dourado é acento (cerca de 5% da área), nunca fundo grande. Tokens em `src/styles/tokens.css`.

## Cores

| Token | Valor | Uso |
|---|---|---|
| `--purple-deep` | `#241033` | fundos escuros (hero, visão, produto, rodapé), botão escuro |
| `--purple-royal` | `#4B1E73` | hover, destaque em texto claro |
| `--gold` | `#C89B3C` | linha dourada, traços, foco, rótulos |
| `--gold-soft` | `#E7C879` | dourado sobre fundo escuro |
| `--bg-ivory` | `#F7F3EA` | fundo claro principal |
| `--bg-warm` | `#FFFDF8` | cena Antes/Depois, texto sobre escuro |
| `--text-primary` / `--text-secondary` | `#1D1D1F` / `#5F5A66` | texto |
| `--border` | `#DDD4C4` | divisórias finas |
| `--success`, `--error` | `#2E7D5B`, `#A8321F` | estados |

Ritmo de fundos: escuro (hero), claro (problema), escuro (visão), claro (o que fazemos), quente (antes/depois), claro (método), escuro (produto), claro (sob medida), escuro (rodapé).

## Tipografia

Uma família: **Inter** (400 a 700). Títulos com tracking negativo e entrelinha apertada que crescem com o tamanho (`-0.035em` a `-0.055em`, `line-height` 0.95 a 1.1); corpo perto de 0 e entrelinha 1.6; rótulos pequenos em caixa alta com tracking positivo (`.eyebrow`). Tamanhos fluidos com `clamp()`.

## Movimento

- Conceito: **do emaranhado à linha reta**. Hero morfa um traço confuso numa linha dourada reta (MorphSVG); uma linha dourada desce pela página desenhada pela rolagem (DrawSVG).
- Easing único `expo.out` (`EASE`), sem rebote; durações 0.4 / 0.9 / 1.4 s (`DUR`).
- Entradas variadas e contidas: títulos por linha com máscara (SplitText), lista com traços que se desenham, palavras que acendem pela rolagem, fichas riscadas e diagrama que se desenha uma vez no Antes/Depois (sem cena fixa: a rolagem prendia e travava no celular), destaque do passo atual no método.
- Depois de assentar, o hero fica quase parado: um brilho curto percorre a linha a cada ~11 s.
- Movimento reduzido: sem ScrollSmoother, sem triggers; a página aparece no estado final. A confirmação do formulário usa um cross-fade curto.

## Componentes

- **Button** (`design-system`): variantes `dark`, `light`, `ghost-on-dark`, `ghost`; pílula, Inter 600. `buttonClasses(variant)` para usar em links. O atributo `data-press` liga o feedback de pressão.
- **Header**: fixo, translúcido (`backdrop-filter`), borda inferior em fade, esconde ao rolar para baixo e volta ao subir; sólido com `prefers-reduced-transparency` ou `prefers-contrast: more`.
- **Footer**: razão social, CNPJ, cidade, e-mail, Termos, Privacidade, Exclusão de dados.
- **WaitlistForm**: campos Nome, WhatsApp, @ do Instagram, Você vende como? (controle segmentado), consentimento; validação inline; estados enviando/sucesso/erro; honeypot.
- **GoldenLine**: SVG que envolve as cenas da home (filho de um elemento `position: relative`).

## Páginas

`/` (home), `/termos`, `/privacidade`, `/exclusao-de-dados` (mesmo layout de texto em `LegalPage`), 404.
