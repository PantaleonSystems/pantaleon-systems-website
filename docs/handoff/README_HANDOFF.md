# Como gerar o site Pantaleon no seu VSCode com o Claude Code

Você recebeu uma pasta com tudo o que o Claude Code precisa. Siga este guia.

## O que tem aqui

```
handoff/
├── CLAUDE.md               ← brief de engenharia (o Claude Code lê isto sozinho)
├── DESIGN_SYSTEM.md        ← tokens e specs de componentes
├── README_HANDOFF.md       ← este arquivo (só para você)
└── reference/
    ├── pantaleon-home.html ← protótipo aprovado = fonte visual da verdade
    └── assets/
        ├── logo.png
        ├── ceo.png
        └── cto.png
```

## Passo a passo

### 1. Crie o projeto vazio (ou use o que já tem)
No terminal, dentro da pasta onde quer o projeto:
```bash
npm create vite@latest pantaleon-site -- --template react-ts
cd pantaleon-site
```

### 2. Copie os arquivos de handoff para a raiz do projeto
- `CLAUDE.md` → na **raiz** do projeto (o Claude Code detecta e lê automaticamente).
- `DESIGN_SYSTEM.md` → na raiz também.
- A pasta `reference/` inteira (com o HTML e os assets) → na raiz.

Sua raiz deve ficar assim:
```
pantaleon-site/
├── CLAUDE.md
├── DESIGN_SYSTEM.md
├── reference/
│   ├── pantaleon-home.html
│   └── assets/...
├── package.json
├── src/
└── ...
```

### 3. Abra o Claude Code e dê o primeiro comando
Não peça "gera o site todo". Peça UMA etapa. Primeira mensagem sugerida:

> Leia o CLAUDE.md e o DESIGN_SYSTEM.md deste projeto, e o protótipo em
> reference/pantaleon-home.html. Confirme que entendeu o escopo resumindo em 5 linhas
> o que vamos construir e qual a etapa 1. Ainda NÃO escreva código — só o plano.

Depois que ele confirmar, siga a ordem de execução que está no CLAUDE.md (seção "Ordem de
execução recomendada"), uma etapa por vez:

> Ok, execute a etapa 1 (scaffold): instale react-router-dom, configure tsconfig strict,
> crie a árvore de pastas e importe as fontes no index.html. Me mostre o resultado antes de seguir.

E assim por diante — etapa 2 (tokens), etapa 3 (primitivos), etc.

### 4. Mova os assets para dentro do src quando ele pedir
Na etapa de assets, peça:
> Copie reference/assets/*.png para src/assets/ e referencie por import nos componentes.

## Por que fazer assim (e não jogar o HTML e pedir "converte")

- O Claude Code trabalha muito melhor com **um plano explícito + uma fonte visual** do que com
  "transforma isso aí". O CLAUDE.md é esse plano.
- Fazer **etapa por etapa** deixa você revisar e corrigir o rumo cedo, em vez de receber 40
  arquivos de uma vez e ter que refazer tudo.
- O HTML de referência garante que a aparência final seja idêntica ao que você aprovou — ele não
  precisa "imaginar" o design, só portá-lo.

## Dicas de condução

- Se algo sair diferente do protótipo, diga: *"compare com reference/pantaleon-home.html, a seção
  X está com espaçamento/cor diferente"*. Ele corrige contra a fonte da verdade.
- Peça a ele para rodar `npx tsc --noEmit` e `npm run build` ao final de cada bloco grande.
- Quando chegar nas páginas de projeto (que não existem no protótipo), lembre-o: *"siga o padrão
  visual da Home e a seção 'Páginas internas' do DESIGN_SYSTEM.md"*.
- Restrição jurídica do Khipu: se ele escrever qualquer coisa que soe a oferta de token, corrija.

## Checklist de "está pronto"

- [ ] `npm run dev` sobe sem erros e a Home está idêntica ao protótipo
- [ ] `/sobre` e as 4 rotas `/projetos/*` funcionam
- [ ] `npx tsc --noEmit` passa sem erros
- [ ] `npm run build` gera o dist sem warnings críticos
- [ ] Responsivo nos breakpoints 960 / 900 / 560
- [ ] Foco de teclado visível e `prefers-reduced-motion` respeitado
- [ ] Nenhum hex solto no CSS (tudo via var(--token))
- [ ] Conteúdo em src/data/, não hardcoded no JSX
