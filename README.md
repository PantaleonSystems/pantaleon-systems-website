# Pantaleon Systems: site

Site institucional da Pantaleon Systems (integração de sistemas e automação). Home de página única, páginas legais e lista de espera do primeiro produto.

```bash
yarn install        # ou npm install
yarn dev            # http://localhost:5173
yarn build          # tsc + vite build
npx oxlint          # lint
```

- Contrato de engenharia e regras de escrita: [`docs/CLAUDE.md`](docs/CLAUDE.md)
- Tokens e componentes: [`docs/DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md)
- Lista de espera (planilha Google + Apps Script): [`docs/waitlist-apps-script.md`](docs/waitlist-apps-script.md)
- Design aprovado e plano: [`docs/superpowers/`](docs/superpowers/)

Variável de ambiente: `VITE_WAITLIST_URL` (ver `.env.example`).
