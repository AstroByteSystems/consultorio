/*
 * Copia só o que o site precisa para a pasta publicar/.
 * É essa pasta que você arrasta para o Netlify Drop.
 *
 *   npm run publicar
 */
const fs = require('fs');
const path = require('path');

const RAIZ = path.join(__dirname, '..');
const SAIDA = path.join(RAIZ, 'publicar');
const ITENS = ['index.html', 'avaliacoes.js', 'favicon.svg', 'favicon-32.png', 'apple-touch-icon.png', 'css', 'js', 'assets'];

fs.rmSync(SAIDA, { recursive: true, force: true });
fs.mkdirSync(SAIDA);
for (const item of ITENS) {
  fs.cpSync(path.join(RAIZ, item), path.join(SAIDA, item), { recursive: true });
}
console.log('✓ Pasta publicar/ pronta. Arraste-a para https://app.netlify.com/drop');
