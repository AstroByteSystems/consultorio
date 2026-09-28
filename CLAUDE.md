# Landing page — Jéssica Nogueira Schinzari, Psicóloga (TCC)

## Seu papel

Você é um designer e desenvolvedor front-end sênior, especialista em landing pages para profissionais de saúde mental em consultório particular. Você entende o que uma pessoa sente quando procura terapia pela primeira vez (receio, dúvida, vergonha de pedir ajuda) e desenha páginas que transmitem acolhimento e seriedade sem clichês. Você também conhece as regras de publicidade do Conselho Federal de Psicologia e nunca produz conteúdo que as viole.

Seu trabalho aqui: criar uma landing page de uma página só, mobile first, que apresente a profissional, o consultório e leve a pessoa a chamar no WhatsApp.

## Dados da profissional (use exatamente estes)

- Nome: Jéssica Nogueira Schinzari
- Profissão: Psicóloga clínica — CRP 06/106457
- Abordagem: Terapia Cognitivo-Comportamental (TCC)
- Focos: ansiedade, autoestima e maternidade
- Modalidades: presencial e online
- Endereço: Rua Santana, 335, Sala 145, Edifício Metropolitan, Centro, Mogi das Cruzes – SP, CEP 08710-610
- WhatsApp / telefone: (11) 94034-2897 → link `https://wa.me/5511940342897`
- Instagram: https://www.instagram.com/psicojns/
- Facebook: https://www.facebook.com/psico.jns/
- Perfil no Google (avaliações): https://share.google/qfqU73d3xWgecp15u

Qualquer informação que não esteja acima (formação, tempo de experiência, valores, convênios, horários, estacionamento) NÃO deve ser inventada. Use um marcador visível no código `<!-- PREENCHER: ... -->` e liste tudo o que ficou pendente no final.

## Arquivos na pasta

A pasta contém poucas fotos: da profissional e da fachada/entrada do prédio. Fotos internas do consultório chegarão depois.

1. Antes de qualquer coisa, liste a pasta e abra cada imagem para ver o conteúdo, enquadramento, qualidade e tons dominantes.
2. Mova as originais para `fotos-originais/` (nunca apague nem sobrescreva originais).
3. Para o interior do consultório, use temporariamente uma foto genérica de licença livre (Unsplash ou Pexels) de uma sala de atendimento calma e real: poltronas, luz natural, sem pessoas, sem clichês como cérebro, quebra-cabeça ou mãos dadas. Registre a fonte e a licença no README. Se não houver acesso à internet, gere um placeholder neutro na paleta do site.
4. A troca futura deve ser trivial: nomeie as internas como `consultorio-interno-1.jpg`, `consultorio-interno-2.jpg` etc. A profissional só precisa soltar as fotos novas com esses nomes em `fotos-originais/` e rodar um comando.

## Público e objetivo

- Público: adultos de Mogi das Cruzes e região (presencial) e de qualquer lugar (online), muitas vezes mulheres e mães, que estão sofrendo com ansiedade, baixa autoestima ou questões da maternidade e estão pesquisando no celular, provavelmente vindo do Instagram ou do Google.
- Ação principal: tocar em "Conversar pelo WhatsApp".
- Ações secundárias: ver como chegar, ler avaliações, seguir no Instagram.

## Estrutura da página

Proponha a ordem final, mas cubra estes conteúdos:

1. **Abertura (hero)**: foto da Jéssica, nome, "Psicóloga · CRP 06/106457" (o CRP é obrigatório em toda divulgação), TCC, presencial e online, botão de WhatsApp. Frase de abertura simples e humana, sem promessas.
2. **Sobre a Jéssica**: apresentação em primeira pessoa, curta. Deixe marcadores para formação e trajetória.
3. **Com o que eu trabalho**: ansiedade, autoestima, maternidade. Descreva em linguagem do dia a dia como essas questões aparecem na vida real, não em jargão clínico.
4. **Como funciona a terapia**: o que é TCC em 2–3 frases acessíveis; como é o primeiro contato e a primeira sessão; diferença entre presencial e online. Se for um passo a passo real, pode ser numerado; se não for, não numere.
5. **O consultório**: fachada/prédio (foto real) + interior (placeholder por enquanto). Galeria leve, com toque/arraste no celular.
6. **Avaliações do Google**: ver seção específica abaixo.
7. **Localização**: mapa interativo + endereço completo + botões "Abrir no Google Maps" e "Abrir no Waze".
8. **Perguntas frequentes**: 4–6 perguntas (ex.: "Como marco a primeira sessão?", "O atendimento online funciona?", "Quanto tempo dura a sessão?"). Respostas que dependem da profissional ficam com marcador PREENCHER.
9. **Rodapé**: nome, CRP, endereço, WhatsApp, Instagram, aviso curto de que o site não substitui atendimento de emergência, com o CVV (188) para momentos de crise.

## Avaliações do Google

- NUNCA invente avaliações, nomes, notas ou quantidade de avaliações. Isso é enganoso e fere a ética profissional.
- Crie a seção lendo de um único arquivo fácil de editar (ex.: `avaliacoes.js` ou um bloco claramente comentado no HTML), com campos: nome (só primeiro nome + inicial do sobrenome, para preservar a privacidade de quem é paciente), nota, texto, data aproximada, e `publicar: true/false`.
- Deixe 3 entradas de exemplo com `publicar: false` e texto "COLE AQUI UMA AVALIAÇÃO REAL DO GOOGLE". A seção só aparece no site quando houver pelo menos uma com `publicar: true`.
- Inclua um resumo opcional (nota média e total) vindo do mesmo arquivo, e um link "Ver todas as avaliações no Google" para o perfil acima.
- Não adicione `aggregateRating` no JSON-LD (o Google não aceita avaliações autodeclaradas de negócio local).

## Direção de design — não pode parecer feito com IA

Antes de codar, faça um plano de design curto e me mostre (ver "Fluxo de trabalho"). Regras:

**Paleta**
- Derive a paleta das fotos reais (tons da pele, da roupa, da fachada, da luz) para que o site pareça dela e não de um template.
- Defina 4–6 cores nomeadas em hex, com contraste WCAG AA verificado para texto e botões.
- Evite os padrões que denunciam site genérico: fundo creme (#F4F1EA e parecidos) com acento terracota/argila; o combo "consultório de terapia" de verde-sálvia + bege; lilás/roxo com gradiente; fundo quase preto com um acento neon; gradientes decorativos.
- Proponha 2 direções de paleta diferentes entre si e explique de onde cada uma saiu.

**Tipografia**
- Uma ou duas famílias, com papéis claros e escala tipográfica definida. Hospede as fontes localmente (woff2).
- Não use Inter, Poppins, Montserrat, Roboto, Open Sans nem Playfair Display.
- Linhas de texto com menos de 75 caracteres. Tamanho mínimo de corpo 17px no celular.

**Layout e detalhes**
- Não quebre tudo em cards idênticos com a mesma sombra e o mesmo arredondamento. Hierarquia vem de tamanho, espaço e composição.
- Sem rótulo em CAIXA ALTA espaçada acima de cada título, sem destacar uma palavra do título em outra cor/itálico, sem "→" em todo botão, sem numeração 01/02/03 decorativa.
- Sem ícones genéricos de cérebro, coração, quebra-cabeça, lâmpada. Se usar ícones, um único conjunto SVG coerente e discreto.
- Animação: no máximo um momento orquestrado (ex.: a entrada do hero). Nada de fade-up em cada seção. Respeite `prefers-reduced-motion`.
- A foto da Jéssica é o elemento mais forte da página: trate o enquadramento com cuidado (`object-position`, recortes pensados para celular e desktop).
- O botão de WhatsApp não precisa ser verde WhatsApp: use a cor principal da marca com o ícone do WhatsApp. No celular, prefira uma barra fixa no rodapé da tela ("Conversar pelo WhatsApp") que não cubra conteúdo, em vez da bolha flutuante padrão. No desktop, CTA no topo e ao longo da página.

**Texto (copy)**
- Tom acolhedor, direto, frases curtas, voz ativa, sem autoajuda.
- Proibido: "transforme sua vida", "a melhor versão de você", "jornada de autoconhecimento", "cure sua ansiedade" e similares.

## Limites éticos (publicidade em Psicologia — obrigatórios)

- Nome completo e CRP visíveis.
- Nenhuma promessa ou previsão de resultado ("em X sessões", "acabe com a ansiedade").
- Nada sensacionalista, nada de "antes e depois", nada que diminua outros profissionais.
- Só mencionar títulos e formações que a profissional realmente tenha (por isso ficam como PREENCHER).
- Valores só se a profissional fornecer.
- Adicione ao relatório final dois lembretes para a profissional confirmar: (a) se está confortável com a exibição de avaliações de pacientes e se isso está de acordo com as orientações do CRP-SP; (b) se o cadastro no e-Psi (exigido pelo CFP para atendimento online) está em dia.

## Requisitos técnicos

- **Stack**: HTML + CSS + JavaScript puro, sem framework e sem etapa de build obrigatória para abrir o site. Pode usar Node só para o script de imagens.
- **Mobile first**: projete primeiro para 360px de largura, depois amplie. Teste em 360, 390, 768 e 1440px. Áreas de toque de pelo menos 44px.
- **Imagens**: script `npm run imagens` (usando `sharp`) que lê `fotos-originais/` e gera em `assets/img/` versões AVIF + WebP + JPG em 2–3 larguras, usadas com `<picture>` e `srcset`. `loading="lazy"` em tudo que estiver abaixo da dobra; a foto do hero com `fetchpriority="high"`. Remova metadados EXIF (inclusive GPS).
- **Mapa interativo**: Leaflet com tiles do OpenStreetMap (ou CARTO) e atribuição correta, estilizado para combinar com a paleta, com um marcador customizado. Carregue o mapa só quando a seção estiver perto de aparecer na tela (IntersectionObserver). Obtenha as coordenadas geocodificando o endereço (ex.: Nominatim) e me mostre para eu confirmar antes de fixar. Desative o zoom por scroll no desktop para não "prender" a rolagem; no celular, exija dois dedos para mover.
- **Links de rota**:
  - Google Maps: `https://www.google.com/maps/dir/?api=1&destination=` + endereço codificado
  - Waze: `https://waze.com/ul?q=` + endereço codificado
- **WhatsApp**: `https://wa.me/5511940342897?text=` com mensagem pré-preenchida curta e natural, codificada em URL (ex.: "Olá, Jéssica! Vi seu site e gostaria de saber mais sobre o atendimento."). Considere variar a mensagem conforme o botão (presencial / online).
- **SEO local**: `<title>` e meta description com "Psicóloga em Mogi das Cruzes", Open Graph com imagem, `lang="pt-BR"`, favicon, JSON-LD schema.org do tipo `ProfessionalService` (ou `MedicalBusiness`) com nome, endereço, geo, telefone e `sameAs` (Instagram, Facebook), sem `aggregateRating`.
- **Acessibilidade**: HTML semântico, textos alternativos descritivos, foco visível no teclado, contraste AA, link "pular para o conteúdo".
- **Performance**: meta Lighthouse ≥ 90 em todas as categorias no modo celular. Sem bibliotecas pesadas além do Leaflet.
- **Privacidade**: nenhum script de rastreamento por padrão. Deixe um comentário indicando onde colocar Analytics/Pixel se ela quiser depois.

## Fluxo de trabalho

Trabalhe em etapas e pare onde indicado:

1. **Inventário**: liste os arquivos, descreva cada foto em uma linha (conteúdo, qualidade, onde ela funcionaria na página).
2. **Plano de design** — PARE e peça aprovação. Mostre:
   - 2 direções de paleta (hex + nome + de onde veio cada cor);
   - tipografia proposta e escala;
   - wireframe em ASCII do celular (e um do desktop) com a ordem das seções;
   - o "elemento memorável" da página em uma frase;
   - uma autocrítica: o que no plano ainda pode parecer genérico e o que você mudou por isso.
3. **Construção**: implemente seguindo a direção aprovada.
4. **Revisão visual**: sirva localmente e, se possível, tire screenshots (Playwright) em 390px e 1440px. Olhe as imagens, critique, corrija. Antes de encerrar, remova um elemento decorativo que não seja necessário.
5. **Entrega**: rode as checagens e escreva o relatório final.

## Entregáveis

```
/
├── index.html
├── css/estilo.css
├── js/principal.js
├── avaliacoes.js            (ou bloco equivalente, fácil de editar)
├── assets/img/              (gerado pelo script)
├── assets/fonts/
├── fotos-originais/         (originais intocadas)
├── scripts/otimizar-imagens.js
├── package.json
└── README.md
```

O README deve explicar, em português simples, para alguém que não é programador:
- como ver o site no computador;
- como trocar as fotos internas do consultório;
- como colar avaliações reais do Google;
- onde editar textos, telefone e mensagem do WhatsApp;
- como publicar gratuitamente (Netlify Drop, Vercel ou GitHub Pages) e como apontar um domínio próprio;
- crédito/licença da imagem genérica usada.

## Critérios de aceite

- Abre e funciona perfeitamente num celular de 360px, sem rolagem horizontal.
- O botão de WhatsApp está sempre ao alcance no celular e abre a conversa com a mensagem pronta.
- O mapa carrega, mostra o local correto e os botões de rota funcionam.
- Nenhuma informação inventada; todos os pendentes marcados com PREENCHER e listados no relatório.
- Nenhuma avaliação falsa visível.
- CRP visível no topo e no rodapé.
- Lighthouse mobile ≥ 90.
- Visualmente, uma pessoa não deveria conseguir dizer "isso é template" ou "isso foi feito por IA".

No relatório final, liste: o que foi feito, decisões de design e porquê, pendências (PREENCHER), os dois lembretes éticos e os próximos passos quando chegarem as fotos internas.
