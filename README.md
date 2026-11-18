# Micher Store — Streetwear

Páginas: `index.html` (home conceitual), `loja.html` (catálogo), `collections.html`, `track.html`, `support.html`. O checkout é um painel central (`public/checkout.js`) com Cartão, Pix e Boleto, aberto por "FINALIZAR COMPRA" em qualquer página.
Rodar: `npm install && npm start` → http://localhost:3000.

- Home: fundo pixel art animado (carro synthwave em estrada roxa) em `public/scene.js`, com camada de escurecimento para legibilidade.
- Animações globais em `public/app.js` + `public/styles.css`: transição de página em faixas, tilt 3D, brilho magnético, ondas ao clicar, revelação escalonada ao rolar.
- Paleta: #050505 / #9D00FF / #FF007F. Logo sempre em Fraktur (UnifrakturCook).
- Fontes: Unbounded (menu da home), Instrument Serif (frase da home), Boomme nas páginas internas (coloque `Boomme.woff2` em `public/fonts/`).
- Pagamento, rastreio e suporte ainda não têm back-end: conecte um gateway, um sistema de pedidos e um canal de suporte antes de vender de verdade.
- API: GET/POST `/api/products`, GET/PUT/DELETE `/api/products/:id`.
