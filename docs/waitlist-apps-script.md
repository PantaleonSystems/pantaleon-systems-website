# Lista de espera: planilha Google + Apps Script

O formulário do site envia cada cadastro para um Web App do Google Apps Script, que grava uma linha na sua planilha. É gratuito e roda na sua conta Google. Leva uns 10 minutos.

## Passo a passo

1. Acesse [sheets.google.com](https://sheets.google.com) e crie uma planilha em branco. Nome sugerido: **Lista de espera Pantaleon**.
2. Na planilha, abra **Extensões > Apps Script**.
3. Apague o código que aparece e cole o conteúdo de [`apps-script/waitlist.gs`](../apps-script/waitlist.gs). Clique em **Salvar** (ícone de disquete).
4. Clique em **Implantar > Nova implantação**. Em "Selecionar tipo" (engrenagem), escolha **App da Web**.
   - **Executar como:** Eu (seu e-mail).
   - **Quem pode acessar:** Qualquer pessoa.
5. Clique em **Implantar** e autorize quando o Google pedir (aparece um aviso de "app não verificado": clique em *Avançado* e em *Acessar … (não seguro)*; é o seu próprio script).
6. Copie a **URL do app da Web** (termina em `/exec`).
7. Na pasta do projeto, crie o arquivo `.env` (copie de `.env.example`) e cole a URL:

   ```
   VITE_WAITLIST_URL=https://script.google.com/macros/s/XXXXXXXX/exec
   ```

8. Rode o site (`npm run dev`), preencha o formulário e confira se a linha apareceu na aba **Lista de espera** (o script cria a aba e os cabeçalhos sozinho).
9. Na hospedagem do site, cadastre a mesma variável `VITE_WAITLIST_URL` antes de publicar. Ela é lida na hora do build, então é preciso gerar o site de novo depois de cadastrar.

## Colunas gravadas

Data/hora · Nome · WhatsApp (só números) · Instagram (sem @) · Perfil (Afiliado, Loja ou Criador) · Consentimento (Sim)

## Se você mudar o script depois

Em **Implantar > Gerenciar implantações**, edite a implantação e escolha **Nova versão**. A URL continua a mesma. Se criar uma "Nova implantação", a URL muda e é preciso atualizar o `.env`.

## Como testar sem o site

Abra a URL `/exec` no navegador. Deve aparecer `{"ok":true,"service":"lista-de-espera"}`.

## Observações

- Quem preenche não vê a planilha, só o envio. Os dados ficam na sua conta Google; limite o compartilhamento da planilha.
- O script repete as validações do site e ignora envios inválidos. O campo escondido do formulário (armadilha para robôs) nunca chega ao script.
- Enquanto `VITE_WAITLIST_URL` estiver vazio, o formulário mostra uma mensagem pedindo para falar pelo WhatsApp e não envia nada.
