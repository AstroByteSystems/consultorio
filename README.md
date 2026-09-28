# Site — Jéssica Nogueira Schinzari, Psicóloga (CRP 06/106457)

Site de uma página só, feito em HTML, CSS e JavaScript simples. Não tem
programa para instalar para *abrir* o site: basta um navegador. O Node.js
só é usado para preparar as fotos.

---

## 1. Ver o site no computador

**Jeito rápido:** dê dois cliques no arquivo `index.html`. O site abre no
navegador, mas **o mapa não aparece** desse jeito: o OpenStreetMap só libera
o mapa para sites abertos por um endereço (http://...). Para ver tudo, use o
jeito abaixo.

**Jeito completo:** abra o Terminal nesta pasta e digite:

```
npm run site
```

Depois abra no navegador o endereço **http://localhost:8080**.
Para parar, volte ao Terminal e aperte `Ctrl + C`.

> Na primeira vez, rode `npm install` (precisa do Node.js, que você baixa
> em https://nodejs.org — escolha a versão "LTS").

---

## 2. Trocar as fotos do consultório

1. Salve as fotos da sala como **JPG** (no iPhone: Ajustes → Câmera →
   Formatos → "Mais Compatível").
2. Dê a elas os nomes `consultorio-interno-1.jpg`, `consultorio-interno-2.jpg`,
   `consultorio-interno-3.jpg`... (quantas quiser).
3. Coloque dentro da pasta **`fotos-originais/`**. A foto
   `consultorio-interno-1.jpg` que está lá hoje é a provisória: pode
   substituir.
4. No Terminal, rode:

   ```
   npm run imagens
   ```

Pronto. O comando cria as versões leves das fotos, apaga os dados de
localização (GPS) e monta a galeria sozinho. O aviso "Imagem ilustrativa"
some quando a foto provisória é trocada.

Para escrever uma descrição melhor de cada foto (importante para quem usa
leitor de tela), edite a lista `LEGENDAS` no começo de
`scripts/otimizar-imagens.js` e rode `npm run imagens` de novo.

A mesma coisa vale para trocar a foto da Jéssica (`profissional.webp`) ou a
da fachada (`imunecare-fachada.png`): substitua o arquivo em
`fotos-originais/` com o mesmo nome e rode o comando.

**As fotos originais nunca são alteradas.**

---

## 3. Colar avaliações reais do Google

Abra o arquivo **`avaliacoes.js`** num editor de texto (Bloco de Notas,
TextEdit em modo texto puro, ou VS Code). Para cada avaliação:

```js
{
  nome: 'Mariana S.',            // só primeiro nome + inicial
  nota: 5,
  texto: 'Texto exatamente como está no Google.',
  data: 'março de 2026',
  publicar: true,                // true = aparece no site
},
```

A seção de avaliações só aparece no site quando pelo menos uma estiver com
`publicar: true`. O resumo (nota média e total) fica no bloco `resumo`, no
mesmo arquivo: mude `mostrar` para `true` e copie os números do Google.

⚠️ Nunca escreva uma avaliação que não exista, nem mude o texto de uma.

---

## 4. Onde editar textos, telefone e WhatsApp

| O que | Onde |
|---|---|
| Textos do site | `index.html` (procure a frase que quer mudar) |
| Número do WhatsApp e mensagens prontas | começo de `js/principal.js`, bloco `CONTATO` |
| Telefone que aparece escrito no rodapé | `index.html`, procure `94034-2897` |
| Endereço | `index.html` (hero, "Como chegar", rodapé e o bloco `application/ld+json`) |
| Coordenadas do mapa | `index.html`, `data-lat` e `data-lng` na `div` do mapa |
| Cores e tamanhos de letra | começo de `css/estilo.css` |

Tudo o que ainda falta preencher está marcado no código com
**`<!-- PREENCHER: ... -->`**. Procure por "PREENCHER" no `index.html`.

---

## 5. Publicar de graça

### Opção A — Netlify Drop (mais fácil)

1. No Terminal: `npm run publicar` (cria a pasta `publicar/` só com o que o
   site precisa).
2. Entre em https://app.netlify.com/drop, crie uma conta grátis e arraste a
   pasta **`publicar`** para a página.
3. Em segundos você recebe um endereço tipo `nome-aleatorio.netlify.app`.
   Em "Site configuration → Change site name" dá para mudar o nome.
4. Para atualizar depois, rode `npm run publicar` de novo e arraste a pasta
   em "Deploys" no painel do site.

### Opção B — Vercel ou GitHub Pages

Também funcionam: é um site estático, sem etapa de build. Publique o
conteúdo da pasta `publicar/`.

### Usar um domínio próprio (ex.: jessicaschinzari.com.br)

1. Registre o domínio em https://registro.br (cerca de R$ 40/ano).
2. No Netlify: "Domain management → Add a domain" e digite o domínio.
3. O Netlify mostra os servidores DNS (tipo `dns1.p01.nsone.net`). No
   Registro.br, em "DNS → Alterar servidores DNS", cole esses endereços.
4. Em até algumas horas o site abre no domínio novo, com cadeado (HTTPS)
   automático.
5. Depois, troque `https://SEU-DOMINIO` pelo domínio real no `index.html`
   (aparece em 5 lugares) e publique de novo. Isso deixa bonita a prévia do
   link quando alguém compartilha no WhatsApp.

---

## 6. Créditos e licenças

- **Foto provisória do interior** (`fotos-originais/consultorio-interno-1.jpg`):
  "A cozy reading nook with plant and sunlight", de **feey**
  (https://unsplash.com/@feeypflanzen), no Unsplash:
  https://unsplash.com/photos/_bpsG5lbCDg — Licença Unsplash
  (https://unsplash.com/license): uso gratuito, inclusive comercial, sem
  obrigação de crédito. Usada só até chegarem as fotos reais.
- **Foto da fachada** (`imunecare-fachada.png`): fornecida pela
  profissional. Tem a placa de outra empresa (Imunecare) e parece ser de
  outro site. Confirme a autorização de uso ou troque por uma foto própria.
- **Fontes:** Newsreader (Production Type) e Figtree (Erik Kennedy), ambas
  sob SIL Open Font License, hospedadas em `assets/fonts/`.
- **Mapa:** Leaflet (licença BSD-2) com dados © colaboradores do
  OpenStreetMap (ODbL).

---

## Estrutura

```
index.html                  a página
css/estilo.css              visual
js/principal.js             WhatsApp, mapa, avaliações, barra do celular
avaliacoes.js               avaliações do Google (edite aqui)
assets/img/                 fotos otimizadas (geradas — não edite)
assets/fonts/               fontes
assets/vendor/leaflet/      biblioteca do mapa
fotos-originais/            fotos originais (nunca alteradas)
scripts/otimizar-imagens.js gera as fotos: npm run imagens
scripts/preparar-publicacao.js  gera publicar/: npm run publicar
```

O site não tem nenhum rastreamento (Google Analytics, Pixel). Se quiser
adicionar, há um comentário marcando o lugar no `<head>` do `index.html`.
