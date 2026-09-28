# 🥋 Certificado Pro - BJJ Edition

Sistema profissional **Mobile-First** para geração, organização e impressão em lote de certificados de graduação de Jiu-Jitsu, calibrado especialmente para a impressora **Epson L3250 EcoTank** e aplicação manual de selo de ouro em relevo.

---

## 🚀 Como Iniciar no Computador

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
3. O Vite iniciará o servidor com suporte a rede local (Host: `0.0.0.0`):
   - **No PC:** `http://localhost:3000`
   - **No Celular / Tablet (mesmo Wi-Fi):** Acesse pelo IP exibido no terminal (ex: `http://192.168.1.15:3000`)

---

## 📱 Como Usar no Celular como Aplicativo (PWA)

1. Conecte o celular ou tablet na mesma rede Wi-Fi do computador onde o app está rodando (ou acesse a URL após publicar na Vercel/Netlify).
2. Abra o navegador (Chrome no Android ou Safari no iPhone).
3. No Safari (iPhone/iPad): Toque no botão de **Compartilhar** ➔ **"Adicionar à Tela de Início"**.
4. No Chrome (Android): Toque nos **3 pontinhos** ➔ **"Instalar aplicativo"** ou **"Adicionar à tela inicial"**.
5. O app abrirá em tela cheia como se fosse um app nativo, permitindo enviar a impressão direta para a Epson L3250 (via AirPrint / Mopria / Epson iPrint / Wi-Fi Direct).

---

## 📁 Onde Colocar os Modelos de Certificado e Logos

Você pode alterar o modelo pelo próprio botão **"Modelo"** na tela do app, ou colocar seus arquivos diretamente nesta pasta:

📂 **`public/templates/`**

1. **`modelo-padrao.png`** ou **`modelo-padrao.jpg`**
   - O fundo do certificado do seu irmão (A4 Paisagem: 297mm x 210mm ou 3508 x 2480 px em 300 DPI).
2. **`logo-equipe.png`**
   - Brasão/escudo da equipe em alta resolução com fundo transparente.
3. **`assinatura.png`** (Opcional)
   - Assinatura do mestre/professor em PNG transparente.

> **💡 Dica para Papel Timbrado:** Se a academia já tem o papel grosso impresso pela gráfica e seu irmão só precisa que a Epson imprima os nomes e faixas por cima, basta ir em **"Modelo" ➔ Escolher "Papel Pré-Impresso"**.

---

## 🖨️ Calibração de Impressão na Epson L3250

Ao clicar em **"Imprimir Lote na Epson"**:
1. **Destino:** Selecione a sua impressora `Epson L3250 Series`.
2. **Orientação:** `Paisagem`.
3. **Páginas:** `Tudo` (o lote já monta todas as folhas dos alunos daquela faixa).
4. **Tamanho do Papel:** `A4`.
5. **Margens:** Selecione **Nenhuma** (ou *Mínimas*).
6. **Opções:** Certifique-se de marcar **"Gráficos de segundo plano"** para sair com a arte completa.
7. **Papel Recomendado:** Opaline 180g/240g, Diplomata 180g ou Couchê Fosco 200g.
8. **Selo de Ouro:** O sistema já reserva e alinha perfeitamente o espaço circular para ele colar o selo dourado com a logo da equipe com a mão!

---

## 🗄️ Integração com Supabase (Opcional)

O sistema é **Offline-First**, ou seja, funciona 100% mesmo sem internet, salvando no aparelho. Se quiser sincronizar na nuvem:

1. Crie um projeto gratuito no [Supabase](https://supabase.com).
2. Crie um arquivo `.env` na raiz do projeto baseado no `.env.example`:
   ```env
   VITE_SUPABASE_URL=https://seu-projeto.supabase.co
   VITE_SUPABASE_ANON_KEY=sua-chave-anonima
   ```
3. Pronto! Os dados passarão a sincronizar automaticamente.

---

## 🐙 Como Subir para o GitHub

```bash
git remote add origin https://github.com/SEU_USUARIO/Certificado-Pro.git
git branch -M main
git push -u origin main
```
