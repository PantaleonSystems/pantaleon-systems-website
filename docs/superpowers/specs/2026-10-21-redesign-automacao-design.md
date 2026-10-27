# Redesign do site Pantaleon Systems: automação e integração de sistemas

Data: 2026-10-21 · Status: aguardando aprovação

## 1. Intenção e porquê

A Pantaleon deixou de ser uma empresa de cripto/Web4. Hoje ela faz **integração de sistemas e automação** e está quase lançando o primeiro produto: um SaaS que publica um vídeo em várias redes e responde comentários ("QUERO") com o link no Direct.

O site precisa, nesta ordem:
1. **Apresentar uma visão**: a Pantaleon vende o fim do trabalho repetitivo, não "software".
2. **Provar que a visão virou produto**: o primeiro produto é a prova.
3. **Passar confiança**: empresa real, CNPJ, endereço, contato (também exigido na verificação da Meta).

O visitante deve sair pensando: "isso que eu faço todo dia na mão pode ser automático, e essa empresa sabe fazer."

A tese do site é a frase "soluções poderosas surgem quando dizemos não a tarefas manuais repetitivas". A página inteira existe para prová-la, inclusive no próprio movimento: o site mostra o emaranhado virando linha reta.

## 2. Objetivos, não-objetivos, anti-objetivos

**Objetivos**
- Home de página única, com sensação Apple: entrada animada imediata, rolagem suave com inércia, tipografia grande, muito espaço vazio.
- Hero com frase marcante e animação "do emaranhado à linha reta".
- Captar inscritos na lista de espera do primeiro produto.
- Atender os requisitos de confiança/Meta (rodapé com dados legais e páginas de Termos, Privacidade, Exclusão de dados).

**Não-objetivos**
- Vender o Plano Fundador no site (é oferta separada, enviada depois à lista).
- Mostrar preço, depoimentos ou números de clientes (não existem).
- Vídeo renderizado com Hyperframes na v1 (ver §8).
- Manter qualquer conteúdo cripto/Web4.

**Anti-objetivos (seria fracasso mesmo se funcionar)**
- Aparência de "página feita por IA": cards de três colunas iguais, gradientes roxos genéricos, emojis, ícones soltos em círculos, fade-in idêntico em tudo.
- Jargão de software: "revolucionário", "disruptivo", "soluções inovadoras de ponta", "sinergia", "transformação digital".
- Escassez falsa ou promessa de redes que ainda não existem.
- Animação que atrapalha leitura, trava em celular ou ignora `prefers-reduced-motion`.

## 3. Restrições

- Stack existente é mantida: Vite, React 19, TypeScript, React Router 6, CSS Modules. Sem Tailwind, sem biblioteca de UI.
- Paleta e logo ficam (tokens em `docs/DESIGN_SYSTEM.md`): `--purple-deep #241033`, `--purple-royal #4B1E73`, `--gold-khipu #C89B3C`, `--gold-soft #E7C879`, `--bg-ivory #F7F3EA`, `--bg-warm #FFFDF8`, texto `#1D1D1F`/`#5F5A66`. O dourado segue sendo acento (cerca de 5% da área), nunca fundo grande. Fontes: Space Grotesk, Inter, IBM Plex Mono (decisão do builder se manter as três ou reduzir; ver §9).
- Site estático, sem servidor próprio. O formulário grava numa **planilha Google via Google Apps Script** (decisão do usuário, plano gratuito).
- Português do Brasil natural, tratamento "você". Regras de escrita em §6.
- Não inventar dados. WhatsApp e domínio do e-mail ainda não definidos: usar constantes únicas e claramente marcadas (ex.: `src/data/contact.ts`) para trocar depois.
- Acessibilidade: `prefers-reduced-motion` desativa a animação e mostra o estado final; contraste AA; navegação por teclado; foco visível.
- Desempenho: animação só com `transform`/`opacity`; hero legível sem esperar o JS terminar; sem layout shift.

## 4. Estrutura da página (uma rolagem, oito "cenas")

Copy base fornecido pelo usuário. O builder pode lapidar a escrita seguindo §6, sem mudar o sentido nem a ordem.

1. **Topo (hero).** "Diga não ao manual." + subtítulo "A Pantaleon Systems cria sistemas que conectam suas ferramentas e automatizam o trabalho repetitivo, para você e sua equipe cuidarem do que realmente importa." Botões: [Conhecer nosso primeiro produto] (rola até a cena 6) e [Falar com a gente] (WhatsApp).
2. **O problema.** "Quanto do seu dia é copiar, colar e repetir?" com os exemplos concretos (responder a mesma pergunta pela décima vez, postar o mesmo conteúdo em quatro redes, passar dados de um sistema para outro, atualizar a planilha que ninguém confia). Fecho: "Isso não é trabalho. É tempo preso."
3. **A visão (manifesto).** "Soluções poderosas começam com um não." + parágrafo do manifesto.
4. **O que fazemos.** Três blocos: Automação de processos, Integração de sistemas, Produtos próprios. Não usar três cards idênticos lado a lado; o builder escolhe uma composição própria (ver §5).
5. **Antes / Depois e como pensamos.** Cena de rolagem: a tarefa manual em passos que vão sendo riscados e, ao lado, a versão automática em um passo. Depois o método numerado: Observar, Simplificar, Conectar, Automatizar. (Antes/Depois é decisão minha de posicionar aqui; o texto original só diz que deve existir.)
6. **Nosso primeiro produto.** "Publique uma vez. Venda em todas as redes." + descrição + **formulário da lista de espera** (§7). Comunicar que é "em breve", sem data inventada. Prometer só Instagram; outras redes aparecem como "em breve, sem data garantida" (regra de honestidade do usuário).
7. **Sob medida.** "Tem um processo que te consome? Conte para a gente." [Conversar no WhatsApp]
8. **Rodapé.** PANTALEON SYSTEMS INOVA SIMPLES I.S. - ME · CNPJ 66.899.192/0001-28 · Parnamirim/RN · e-mail · Termos · Privacidade · Exclusão de dados.

Posicionamento: a empresa é ampla (qualquer negócio). O produto de redes sociais é "o primeiro de vários"; a seção de produtos deve aceitar novos cards no futuro sem refazer o site.

## 5. Direção visual e de movimento

**Conceito: "do emaranhado à linha reta".** A linha dourada é o fio condutor da página inteira.

- **Hero.** Fundo roxo profundo (minha decisão: mais impacto; as cenas seguintes clareiam para marfim). Ao carregar, traços e ícones soltos e confusos (copiar, colar, planilha, mensagem) aparecem em desordem e, em cerca de 3 segundos, **se transformam (MorphSVG) numa única linha dourada reta** que conecta tudo. "Diga não ao manual." entra junto, por linhas, com máscara (SplitText). Depois de assentar, a linha fica **quase parada**: no máximo um brilho curto e raro percorrendo-a (MotionPath), nunca um movimento lento e contínuo ocupando a tela (regra da apple-design, §14).
- **Rolagem.** ScrollSmoother (GSAP, grátis, integrado ao ScrollTrigger) dá a inércia suave. A linha dourada continua descendo entre as cenas, desenhada pela rolagem (DrawSVG + ScrollTrigger com `scrub`).
- **Antes/Depois.** Cena presa (pinned) curta: passos manuais surgem e são riscados um a um; a versão automática colapsa em um passo.
- **Cenas.** Muito espaço em branco, uma ideia por tela, tipografia grande com hierarquia forte. Entradas variadas e contidas (não o mesmo fade-up em tudo). Ritmo alternando fundos escuro/claro.
- **Princípios Apple.** Movimento com propósito, curvas de easing suaves e consistentes (token de easing único), durações curtas, hierarquia por tamanho e espaço e não por caixas e bordas, poucos elementos por tela, sem decoração gratuita.
- **Header.** Discreto, translúcido, esconde/mostra com a rolagem. Logo atual.
- **Redução de movimento.** Estado final estático, sem ScrollSmoother; só cross-fades curtos onde ajudam a entender.

Referências de qualidade pedidas pelo usuário: skills `greensock/gsap-skills` e `emilkowalski/skills` (apple-design), **já instaladas** em `~/.claude/skills/`. O mapa de uso está no §10.

## 6. Voz e escrita

Direto, confiante, simples. Como um engenheiro explicando a um dono de negócio.
- Fale de resultado, não de tecnologia ("quando uma venda entra, a planilha, o estoque e a nota se atualizam sozinhos"). Termos técnicos só bem abaixo, se aparecerem.
- Exemplos concretos de tarefa manual para o leitor se reconhecer.
- Frases curtas, verbos de ação: conectar, automatizar, simplificar, devolver tempo.
- Proibido: revolucionário, disruptivo, soluções inovadoras de ponta, sinergia, transformação digital.
- Não inventar números nem depoimentos; a prova é o produto.
- Palavras da marca: manual, repetitivo, simples, conectado, automático, tempo de volta.
- Assinatura: "Diga não ao manual."

## 7. Lista de espera (cena 6)

Não é o Plano Fundador. Lista de espera = cadastro gratuito (funil). Plano Fundador = pré-venda paga, separada, enviada depois à lista; o site não vende nem mostra preço.

Texto de apoio: "Estamos abrindo 50 vagas para o Plano Fundador, com preço travado e acesso antecipado. Entre na lista e seja avisado primeiro." (O "50" vem do exemplo do usuário; confirmar antes de publicar.)

Campos: Nome · WhatsApp · @ do Instagram · "Você vende como?" (Afiliado / Loja / Criador) · caixa de consentimento LGPD obrigatória ("Aceito receber contato da Pantaleon Systems sobre este produto.") · botão [Quero uma vaga].

Comportamento: validação no cliente, estados de enviando/sucesso/erro com mensagem humana, proteção básica contra spam (campo honeypot), sem dados pessoais em URL. Envio por `fetch` para um Web App do Google Apps Script que acrescenta uma linha na planilha (colunas: data/hora, nome, WhatsApp, Instagram, perfil, consentimento). O endpoint fica em variável de ambiente (`VITE_WAITLIST_URL`). O builder também entrega o código do Apps Script e um passo a passo curto para o usuário publicá-lo (a criação da planilha e do script é feita pelo usuário, na conta dele).

## 8. Páginas e escopo

Ficam: `/` (home), `/termos`, `/privacidade`, `/exclusao-de-dados`, 404. Saem: `/sobre`, `/projetos/*` e todos os dados/seções cripto. Páginas legais: texto genuíno e simples em português; o usuário deve revisá-las (não substituem aconselhamento jurídico). A página de Exclusão de dados deve explicar como pedir exclusão (por e-mail) e o prazo.

Hyperframes (instalado pelo usuário) **fora do escopo da v1**: gera vídeo renderizado, não animação ao vivo. Possível v2: um vídeo curto de demonstração do produto para a página de pré-venda.

## 9. O que fica a cargo do builder (e ressalvas)

Decisões que deixo ao builder, dentro das regras acima: composição exata de cada cena, ícones/traços do emaranhado, número de fontes mantidas, textos finais lapidados, estrutura de pastas nova, e a limpeza do código cripto (`src/data`, `src/sections`, `components` não reaproveitáveis).

Atualizar `docs/CLAUDE.md` e `docs/DESIGN_SYSTEM.md`: hoje mandam "portar o protótipo cripto 1:1", o que passa a ser falso. Também remover/arquivar `docs/handoff`.

**Pendências do usuário (não bloqueiam a construção):** número do WhatsApp; domínio/e-mail de contato; endereço completo além de "Parnamirim/RN"; confirmar "50 vagas"; criar a planilha e publicar o Apps Script; revisar textos legais.

**Minhas decisões (marcadas como minhas):** hero em roxo escuro; cena Antes/Depois na seção 5; GSAP (ScrollTrigger, ScrollSmoother, SplitText, DrawSVG, MorphSVG, MotionPath, tudo gratuito) e nenhuma lib extra de scroll; planilha via Apps Script com variável de ambiente; honeypot anti-spam; Hyperframes fora da v1.

## 10. Mapa de skills: o que governa cada parte

Instaladas em `~/.claude/skills/`: `gsap-core`, `gsap-timeline`, `gsap-scrolltrigger`, `gsap-plugins`, `gsap-utils`, `gsap-react`, `gsap-performance`, `gsap-frameworks` (não usada: é para Vue/Svelte) e `apple-design`. O builder **lê a skill correspondente antes de implementar cada parte** e segue suas regras ("Do Not" incluídos).

| Parte do site | O que será feito | Skill(s) e regras que valem |
|---|---|---|
| Instalação e base | `npm i gsap @gsap/react`; registrar plugins uma vez, no topo do app; tudo dentro de `useGSAP` com `scope` | `gsap-react`, `gsap-plugins` (sem `.npmrc` de Club GSAP, plugins vêm do pacote `gsap`) |
| Hero: emaranhado vira linha | Timeline única: traços soltos entram, `morphSVG` até a linha reta, nó final. Ícones podem ter `shapeIndex` ajustado para não cruzar | `gsap-timeline` (posição, sequência), `gsap-plugins` (MorphSVG, `convertToPath`, `shapeIndex`) |
| Hero: frase | "Diga não ao manual." revelada por linhas com máscara; tracking negativo e entrelinha apertada em tamanho grande; split depois das fontes carregarem (`autoSplit`) | `gsap-plugins` (SplitText, `mask`, `aria`), `apple-design` §15 (tipografia: tracking e leading por tamanho) |
| Hero: vida depois de assentar | Brilho raro ao longo da linha; sem loop lento permanente nem fundo animado na tela toda | `gsap-plugins` (MotionPath), `apple-design` §14 |
| Rolagem suave | ScrollSmoother com wrapper `#smooth-wrapper/#smooth-content`; header fixo fica fora do wrapper; remover `scroll-behavior: smooth` do CSS global | `gsap-plugins` (ScrollSmoother), `gsap-scrolltrigger` (`refresh()` após fontes/imagens; criar triggers de cima para baixo) |
| Linha dourada entre as cenas | Traço desenhado pela rolagem, de uma cena à outra | `gsap-plugins` (DrawSVG: precisa de `stroke` visível), `gsap-scrolltrigger` (`scrub`; nunca `scrub` e `toggleActions` juntos) |
| Entradas das cenas | Variadas e contidas, não o mesmo fade-up; entradas em lote para itens de lista | `gsap-scrolltrigger` (`batch`), `gsap-core` (stagger, defaults), `apple-design` §16 (restrição: movimento com propósito) |
| Antes / Depois | Cena fixa (pin) curta; passos manuais riscados um a um; versão automática colapsa em um passo | `gsap-scrolltrigger` (`pin` no container e animar os filhos; `end: "+=…"`), `gsap-timeline` |
| Botões e interação | Feedback no pressionar (pointer-down), não só ao soltar; hover/press via GSAP (`quickTo`) para poder ser interrompido, não CSS transition em gestos | `apple-design` §1 e §3 (resposta imediata, interrompível), `gsap-performance` (`quickTo`) |
| Easing e "mola" | Easing único de marca, sem rebote por padrão (equivalente a amortecimento 1.0); rebote só se houver gesto com momento | `apple-design` §4 (springs), `gsap-core` (eases; `CustomEase` se precisar de curva própria) |
| Header translúcido | `backdrop-filter` com borda superior clara; sem linha divisória dura, usa fade de borda onde o conteúdo passa por baixo; esconde/mostra com a rolagem | `apple-design` §12 (materiais), `gsap-scrolltrigger` (direção da rolagem) |
| Formulário | Validação inline (não só ao enviar); estados enviando/sucesso/erro; rótulos específicos | `apple-design` §16 (feedback: status, conclusão, aviso, erro; rótulos diretos) |
| Acessibilidade | `gsap.matchMedia()` com `prefers-reduced-motion` (estado final, sem smoother, cross-fade curto); `prefers-reduced-transparency` (header sólido); `prefers-contrast` | `gsap-core` (matchMedia; não aninhar `gsap.context()` dentro dele), `apple-design` §14 |
| Desempenho | Só `transform` e `opacity`; `will-change` apenas em quem anima; poucos pins; matar triggers ao trocar de rota | `gsap-performance`, `gsap-scrolltrigger` (cleanup), `gsap-react` (nada de GSAP em SSR/fora do ciclo do React) |
| Revisão final de qualidade | Os "Oito princípios": propósito, simplicidade (não minimalismo), craft. Revisar o movimento em câmera lenta, quadro a quadro | `apple-design` §16 e §17 |

Conflitos conhecidos e resolvidos: (a) `apple-design` fala em springs de Motion/Framer, mas o projeto usa GSAP, então vale o princípio (curvas suaves, sem rebote por padrão, interrompível), não a biblioteca; (b) a proposta antiga de Lenis foi substituída pelo ScrollSmoother; (c) o "respirar" do hero foi reduzido para respeitar a regra de não ter movimento lento contínuo.
