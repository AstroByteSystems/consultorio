/*
 * Comportamento da página. Sem bibliotecas: só o Leaflet, carregado
 * quando o mapa estiver perto de aparecer.
 */

/* ------------------------------------------------------------------
 * CONTATO — edite aqui o número e as mensagens do WhatsApp.
 * O número vai com 55 (Brasil) + DDD + número, só algarismos.
 * ------------------------------------------------------------------ */
const CONTATO = {
  whatsapp: '5511940342897',
  mensagens: {
    geral: 'Olá, Jéssica! Vi seu site e gostaria de saber mais sobre o atendimento.',
    presencial: 'Olá, Jéssica! Vi seu site e gostaria de saber mais sobre o atendimento presencial.',
    online: 'Olá, Jéssica! Vi seu site e gostaria de saber mais sobre o atendimento online.',
  },
};

(function () {
  'use strict';

  /* WhatsApp: monta os links com a mensagem de cada botão */
  document.querySelectorAll('[data-whatsapp]').forEach((a) => {
    const msg = CONTATO.mensagens[a.dataset.whatsapp] || CONTATO.mensagens.geral;
    a.href = `https://wa.me/${CONTATO.whatsapp}?text=${encodeURIComponent(msg)}`;
    a.target = '_blank';
    a.rel = 'noopener';
  });

  /* Barra fixa do celular: aparece quando o botão do topo sai da tela */
  const barra = document.querySelector('.barra-whats');
  const ctaHero = document.querySelector('.hero__cta');
  if (barra && ctaHero && 'IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => {
      const mostrar = !e.isIntersecting;
      barra.classList.toggle('visivel', mostrar);
      barra.inert = !mostrar;
    }).observe(ctaHero);
  } else if (barra) {
    barra.classList.add('visivel');
  }

  /* Avaliações (dados em avaliacoes.js) */
  (function avaliacoes() {
    const dados = window.AVALIACOES;
    const secao = document.getElementById('avaliacoes');
    if (!dados || !secao) return;

    const reais = (dados.lista || []).filter(
      (a) => a.publicar === true && a.texto && !/COLE AQUI/i.test(a.texto)
    );
    if (!reais.length) return;

    const lista = secao.querySelector('.avaliacoes__lista');
    reais.forEach((a) => {
      const nota = Math.max(0, Math.min(5, Math.round(Number(a.nota) || 0)));
      const fig = document.createElement('figure');
      fig.className = 'avaliacao';

      const bq = document.createElement('blockquote');
      bq.textContent = a.texto;

      const cap = document.createElement('figcaption');
      const estrelas = document.createElement('span');
      estrelas.className = 'avaliacao__nota';
      estrelas.setAttribute('aria-label', `Nota ${nota} de 5`);
      estrelas.textContent = '★'.repeat(nota) + '☆'.repeat(5 - nota);
      cap.append(estrelas, ` · ${a.nome}${a.data ? `, ${a.data}` : ''} · no Google`);

      fig.append(bq, cap);
      lista.append(fig);
    });

    const r = dados.resumo;
    if (r && r.mostrar && r.nota && r.total) {
      const p = secao.querySelector('.avaliacoes__resumo');
      const nota = Number(r.nota).toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
      p.textContent = `Nota ${nota} de 5 em ${r.total} ${r.total === 1 ? 'avaliação' : 'avaliações'} no Google.`;
      p.hidden = false;
    }
    secao.hidden = false;
  })();

  /* Mapa: carrega o Leaflet só quando a seção se aproxima */
  (function mapa() {
    const el = document.getElementById('mapa');
    if (!el) return;

    // O OpenStreetMap recusa pedidos sem a origem do site (Referer), e um
    // arquivo aberto com dois cliques (file://) não envia origem nenhuma.
    if (location.protocol === 'file:') {
      el.querySelector('.mapa__carregando').textContent =
        'O mapa só aparece com o site publicado ou aberto com "npm run site". Os botões de rota funcionam normalmente.';
      return;
    }

    const carregar = () => {
      const css = document.createElement('link');
      css.rel = 'stylesheet';
      css.href = 'assets/vendor/leaflet/leaflet.css';
      document.head.append(css);

      const js = document.createElement('script');
      js.src = 'assets/vendor/leaflet/leaflet.js';
      js.onload = () => iniciar(el);
      js.onerror = () => {
        el.querySelector('.mapa__carregando').textContent = 'Não foi possível carregar o mapa. Use os botões ao lado.';
      };
      document.body.append(js);
    };

    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(
        (entradas) => {
          if (entradas.some((e) => e.isIntersecting)) {
            io.disconnect();
            carregar();
          }
        },
        { rootMargin: '600px 0px' }
      );
      io.observe(el);
    } else {
      carregar();
    }
  })();

  function iniciar(el) {
    const L = window.L;
    const pos = [Number(el.dataset.lat), Number(el.dataset.lng)];
    const toque = window.matchMedia('(pointer: coarse)').matches;

    el.querySelector('.mapa__carregando')?.remove();

    const mapa = L.map(el, {
      center: pos,
      zoom: 16,
      scrollWheelZoom: false, // não prende a rolagem da página no desktop
      dragging: !toque,       // no celular, um dedo rola a página; dois dedos movem o mapa
      touchZoom: true,
      tap: false,
      zoomSnap: 0.5,
    });

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      // envia a origem do site, exigida pela política de uso do OpenStreetMap
      referrerPolicy: 'strict-origin-when-cross-origin',
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">colaboradores do OpenStreetMap</a>',
    }).addTo(mapa);
    mapa.attributionControl.setPrefix('<a href="https://leafletjs.com">Leaflet</a>');

    const pino = L.divIcon({
      className: 'pino',
      html:
        '<svg width="36" height="46" viewBox="0 0 36 46" aria-hidden="true"><path d="M18 1C8.6 1 1 8.4 1 17.6 1 30 18 45 18 45s17-15 17-27.4C35 8.4 27.4 1 18 1Z" fill="currentColor" stroke="#fff" stroke-width="2"/><circle cx="18" cy="17.5" r="6" fill="#fff"/></svg>',
      iconSize: [36, 46],
      iconAnchor: [18, 45],
      popupAnchor: [0, -40],
    });

    L.marker(pos, { icon: pino, title: 'Consultório — Edifício Metropolitan, sala 145', alt: 'Consultório' })
      .addTo(mapa)
      .bindPopup('<strong>Edifício Metropolitan</strong><br>Rua Santana, 335, sala 145');

    if (toque) {
      const aviso = document.createElement('div');
      aviso.className = 'mapa__aviso';
      aviso.setAttribute('aria-hidden', 'true');
      aviso.textContent = 'Use dois dedos para mover o mapa';
      el.append(aviso);

      let timer;
      el.addEventListener(
        'touchmove',
        (e) => {
          if (e.touches.length !== 1) {
            aviso.classList.remove('visivel');
            return;
          }
          aviso.classList.add('visivel');
          clearTimeout(timer);
          timer = setTimeout(() => aviso.classList.remove('visivel'), 1200);
        },
        { passive: true }
      );
    }
  }

})();
