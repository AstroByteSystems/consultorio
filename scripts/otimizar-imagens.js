/*
 * Gera as imagens do site a partir de fotos-originais/.
 *
 *   npm run imagens
 *
 * - Cria versões AVIF, WebP e JPG em várias larguras em assets/img/.
 * - Remove todos os metadados (EXIF, GPS, câmera) — o sharp só mantém
 *   metadados quando pedimos, e aqui nunca pedimos.
 * - Remonta a galeria do consultório dentro do index.html, entre os
 *   marcadores GALERIA:INICIO e GALERIA:FIM, com a fachada e todas as
 *   fotos chamadas consultorio-interno-1.jpg, consultorio-interno-2.jpg...
 *
 * As originais nunca são alteradas.
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const sharp = require('sharp');

const RAIZ = path.join(__dirname, '..');
const ORIGEM = path.join(RAIZ, 'fotos-originais');
const DESTINO = path.join(RAIZ, 'assets', 'img');
const INDEX = path.join(RAIZ, 'index.html');

// Fotos fixas do site.
const FOTOS = [
  { arquivo: 'profissional.webp', nome: 'jessica', larguras: [360, 540, 731] },
  { arquivo: 'imunecare-fachada.png', nome: 'fachada', larguras: [480, 900, 1396] },
];

// Legendas da galeria. Edite aqui para descrever as fotos novas.
const LEGENDAS = {
  fachada: {
    alt: 'Entrada do Edifício Metropolitan, na Rua Santana, 335: marquise com o nome do prédio, palmeiras e escada de acesso.',
    legenda: 'Entrada do Edifício Metropolitan, Rua Santana, 335',
  },
  // Exemplo:
  // 'consultorio-interno-2': { alt: 'Poltronas da sala de atendimento, perto da janela.', legenda: 'Sala de atendimento' },
};

// Foto genérica provisória (Unsplash). Enquanto o arquivo
// consultorio-interno-1.jpg for exatamente esta foto, o site mostra
// "imagem ilustrativa". Quando a foto real entrar no lugar, o aviso some sozinho.
const HASH_PROVISORIA = 'ab587cc91ab41d67bc2e9d55bc45be179a18e0662554ce2d51bdd555fb400e30';
const LEGENDA_PROVISORIA = {
  alt: 'Imagem ilustrativa: duas poltronas de palha, uma planta grande e a luz do sol entrando pela janela.',
  legenda: 'Imagem ilustrativa. As fotos da sala chegam em breve.',
};

const INTERNA = /^consultorio-interno-(\d+)\.(jpe?g|png|webp|avif|tiff?)$/i;
const LARGURAS_INTERNAS = [480, 900, 1400];
const SIZES_GALERIA = '(min-width: 60em) 36rem, 85vw';

async function gerar(entrada, nome, larguras) {
  const base = sharp(entrada).rotate(); // aplica a rotação do celular e descarta o EXIF
  const meta = await base.metadata();
  const girada = meta.orientation && meta.orientation >= 5;
  const larguraOriginal = girada ? meta.height : meta.width;
  const alturaOriginal = girada ? meta.width : meta.height;
  const ws = [...new Set(larguras.map((w) => Math.min(w, larguraOriginal)))];

  for (const w of ws) {
    const r = base.clone().resize({ width: w, withoutEnlargement: true });
    await r.clone().avif({ quality: 52, effort: 6 }).toFile(path.join(DESTINO, `${nome}-${w}.avif`));
    await r.clone().webp({ quality: 74 }).toFile(path.join(DESTINO, `${nome}-${w}.webp`));
    await r.clone().jpeg({ quality: 78, mozjpeg: true }).toFile(path.join(DESTINO, `${nome}-${w}.jpg`));
  }
  const maior = ws[ws.length - 1];
  return { nome, larguras: ws, w: maior, h: Math.round((alturaOriginal * maior) / larguraOriginal) };
}

function srcset(nome, larguras, ext) {
  return larguras.map((w) => `assets/img/${nome}-${w}.${ext} ${w}w`).join(', ');
}

function htmlItem(img, textos) {
  const meio = img.larguras[Math.min(1, img.larguras.length - 1)];
  const legenda = textos.legenda ? `\n            <figcaption>${textos.legenda}</figcaption>` : '';
  return `        <li class="galeria__item" data-foto="${img.nome}">
          <figure>
            <picture>
              <source type="image/avif" srcset="${srcset(img.nome, img.larguras, 'avif')}" sizes="${SIZES_GALERIA}">
              <source type="image/webp" srcset="${srcset(img.nome, img.larguras, 'webp')}" sizes="${SIZES_GALERIA}">
              <img src="assets/img/${img.nome}-${meio}.jpg" srcset="${srcset(img.nome, img.larguras, 'jpg')}" sizes="${SIZES_GALERIA}" width="${img.w}" height="${img.h}" alt="${textos.alt}" loading="lazy" decoding="async">
            </picture>${legenda}
          </figure>
        </li>`;
}

async function iconesEOg() {
  // Imagem para compartilhamento (WhatsApp, Facebook): foto sobre fundo branco.
  const foto = await sharp(path.join(ORIGEM, 'profissional.webp'))
    .resize({ height: 630, width: 560, fit: 'cover', position: 'top' })
    .toBuffer();
  await sharp({ create: { width: 1200, height: 630, channels: 3, background: '#FFFFFF' } })
    .composite([{ input: foto, left: 600, top: 0 }])
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(path.join(DESTINO, 'og.jpg'));

  const svg = fs.readFileSync(path.join(RAIZ, 'favicon.svg'));
  await sharp(svg, { density: 600 }).resize(180, 180).png().toFile(path.join(RAIZ, 'apple-touch-icon.png'));
  await sharp(svg, { density: 300 }).resize(32, 32).png().toFile(path.join(RAIZ, 'favicon-32.png'));
}

async function main() {
  fs.mkdirSync(DESTINO, { recursive: true });
  for (const f of fs.readdirSync(DESTINO)) {
    if (/\.(avif|webp|jpg)$/.test(f)) fs.unlinkSync(path.join(DESTINO, f));
  }

  const galeria = [];
  for (const foto of FOTOS) {
    const entrada = path.join(ORIGEM, foto.arquivo);
    if (!fs.existsSync(entrada)) {
      console.warn(`! Não encontrei ${foto.arquivo} em fotos-originais/ — pulando.`);
      continue;
    }
    const img = await gerar(entrada, foto.nome, foto.larguras);
    console.log(`✓ ${foto.arquivo} → ${img.nome} (${img.larguras.join(', ')}px)`);
    if (foto.nome === 'fachada') galeria.push(htmlItem(img, LEGENDAS.fachada));
  }

  const internas = fs
    .readdirSync(ORIGEM)
    .map((f) => ({ f, m: f.match(INTERNA) }))
    .filter((x) => x.m)
    .sort((a, b) => Number(a.m[1]) - Number(b.m[1]));

  for (const { f, m } of internas) {
    const nome = `consultorio-interno-${m[1]}`;
    const entrada = path.join(ORIGEM, f);
    const hash = crypto.createHash('sha256').update(fs.readFileSync(entrada)).digest('hex');
    const provisoria = hash === HASH_PROVISORIA;
    const textos = provisoria
      ? LEGENDA_PROVISORIA
      : LEGENDAS[nome] || { alt: `Sala de atendimento do consultório, foto ${m[1]}.`, legenda: '' };
    const img = await gerar(entrada, nome, LARGURAS_INTERNAS);
    galeria.push(htmlItem(img, textos));
    console.log(`✓ ${f} → ${nome}${provisoria ? ' (foto provisória)' : ''}`);
  }

  await iconesEOg();
  console.log('✓ og.jpg, apple-touch-icon.png, favicon-32.png');

  if (fs.existsSync(INDEX)) {
    const html = fs.readFileSync(INDEX, 'utf8');
    const re = /(<!-- GALERIA:INICIO[^>]*-->)[\s\S]*?(\s*<!-- GALERIA:FIM -->)/;
    if (re.test(html)) {
      fs.writeFileSync(INDEX, html.replace(re, `$1\n${galeria.join('\n')}$2`));
      console.log(`✓ Galeria atualizada no index.html (${galeria.length} fotos)`);
    } else {
      console.warn('! Marcadores da galeria não encontrados no index.html.');
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
