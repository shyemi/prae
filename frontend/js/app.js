const { animate, scroll, inView, stagger, hover } = window.Motion

const MOCK_DATA = {
  productos: [
    {id:1,nombre:"Split Inverter 12K BTU",categoria:{nombre:"Aires Acondicionados"},descripcion:"Alta eficiencia con compresor inverter.",precio:28500,disponibilidad:"disponible",imagenes:["https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&h=400&fit=crop"]},
    {id:2,nombre:"Nevera No Frost 12 pies",categoria:{nombre:"Neveras"},descripcion:"Sistema No Frost, eficiencia A++.",precio:32000,disponibilidad:"disponible",imagenes:["https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=600&h=400&fit=crop"]},
    {id:3,nombre:"Aire de Ventana 10K BTU",categoria:{nombre:"Aires Acondicionados"},descripcion:"Compacto y eficiente.",precio:12500,disponibilidad:"disponible",imagenes:["https://images.unsplash.com/photo-1573641232560-bb0873d987ef?w=600&h=400&fit=crop"]},
    {id:4,nombre:"Compresor 1.5 HP",categoria:{nombre:"Piezas"},descripcion:"Compresor rotativo R410A.",precio:8500,disponibilidad:"disponible",imagenes:["https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&h=400&fit=crop"]},
    {id:5,nombre:"Condensador 35uF",categoria:{nombre:"Piezas"},descripcion:"Condensador de arranque.",precio:450,disponibilidad:"disponible",imagenes:["https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=600&h=400&fit=crop"]},
    {id:6,nombre:"Nevera Ciclica 10 pies",categoria:{nombre:"Neveras"},descripcion:"Economica y confiable.",precio:18000,disponibilidad:"agotado",imagenes:["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop"]},
    {id:7,nombre:"Kit de Instalacion",categoria:{nombre:"Accesorios"},descripcion:"Tuberia, cable y soportes.",precio:2500,disponibilidad:"disponible",imagenes:["https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=600&h=400&fit=crop"]},
    {id:8,nombre:"Termostato Digital",categoria:{nombre:"Accesorios"},descripcion:"Pantalla LED, programable.",precio:1200,disponibilidad:"disponible",imagenes:["https://images.unsplash.com/photo-1585123334904-845d60e97b29?w=600&h=400&fit=crop"]},
  ],
  servicios: [
    {id:1,nombre:"Reparacion de Aires",descripcion_corta:"Diagnostico y reparacion profesional.",descripcion_larga:""},
    {id:2,nombre:"Mantenimiento Preventivo",descripcion_corta:"Limpieza y puesta a punto.",descripcion_larga:""},
    {id:3,nombre:"Venta e Instalacion",descripcion_corta:"Equipos nuevos con instalacion profesional.",descripcion_larga:""},
    {id:4,nombre:"Asesoria Tecnica",descripcion_corta:"Consultoria en climatizacion.",descripcion_larga:""},
  ],
  trabajos: [
    {id:1,titulo:"Instalacion Climatizacion Centro Comercial",descripcion:"Sistema centralizado de 120 toneladas.",media:["https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&h=500&fit=crop"]},
    {id:2,titulo:"Mantenimiento Edificio Corporativo",descripcion:"Mantenimiento preventivo de 45 equipos.",media:["https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&h=500&fit=crop"]},
    {id:3,titulo:"Reparacion Sistema Refrigeracion",descripcion:"Diagnostico y reparacion de camara frigorifica.",media:["https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=800&h=500&fit=crop"]},
  ],
  ofertas: [
    {id:1,titulo:"20% OFF en Mantenimiento",descripcion:"Aproveche nuestro descuento en mantenimiento preventivo para aires acondicionados."},
    {id:2,titulo:"Financiamiento sin intereses",descripcion:"Compre su equipo nuevo con 12 meses sin intereses."},
  ],
  testimonios: [
    {id:1,nombre_publico:"Maria G.",comentario:"Excelente servicio, repararon mi aire rapidamente.",calificacion:5},
    {id:2,nombre_publico:"Carlos R.",comentario:"Compre mi nevera con ellos, todo perfecto.",calificacion:5},
    {id:3,nombre_publico:"Ana L.",comentario:"Muy profesionales, recomendados.",calificacion:5},
  ],
  config: {telefono_principal:"809-303-9156",email_contacto:"espinalclimatizacion@gmail.com",horario:"Lunes a sabado 8:00am - 6:00pm",whatsapp_number:"18093039156",direccion:"Espinal, Republica Dominicana",facebook:"https://facebook.com/prae",instagram:"https://instagram.com/prae"},
}

const MAPS_URL = 'https://maps.app.goo.gl/ntJpyw3oX22j4YxTA'
const MAPS_EMBED = 'https://maps.google.com/maps?q=18.4680273,-69.998676&z=17&hl=es&output=embed'
const BUSINESS_ADDRESS = 'Prae Climatizacion & Refrigeracion, Espinal, Santo Domingo'

const API = (() => {
  const BASE = 'http://localhost:3001'
  async function get(path) {
    try {
      const r = await fetch(`${BASE}${path}`, { signal: AbortSignal.timeout(2000) })
      const d = await r.json()
      return d.success ? d.data : []
    } catch(e) {
      const key = path.replace(/^\/+/, '').replace(/\/+$/, '')
      const fallback = MOCK_DATA[key]
      return fallback || []
    }
  }
  async function post(path, body) {
    try {
      const r = await fetch(`${BASE}${path}`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(body) })
      return r.json()
    } catch(e) { return {success:false} }
  }
  return { get, post, base: BASE }
})()

const $ = id => document.getElementById(id)
const html = (s, ...v) => s.reduce((a, s, i) => a + s + (v[i] !== undefined ? v[i] : ''), '')

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href')
    if (id === '#') return
    const target = document.querySelector(id)
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }) }
  })
})

async function init() {
  try { await loadConfig() } catch(e) {}
  try { setupHeader() } catch(e) {}
  try { setupMobileMenu() } catch(e) {}
  try { setupThemeToggle() } catch(e) {}
  try { await setupHeroAnimation() } catch(e) { console.warn('hero', e) }
  try { setupSectionAnimations() } catch(e) {}
  try { setupCardHover() } catch(e) {}
  try { setupScrollProgress() } catch(e) {}
  const [prods, svcs, works, offers, tests] = await Promise.all([
    loadProducts(), loadServices(), loadWorks(), loadOffers(), loadTestimonials()
  ])
  setupBTUCalculator()
  setupContactForm()
  setupTestimonialModal()
  setupWhatsAppFloat()
  setupNewsletter()
  updateStats(prods, svcs, tests)
  setupCardAnimations()
  setupLocationSection()
}

/* ============ Theme toggle ============ */
function setupThemeToggle() {
  const btn = $('themeToggle')
  if (!btn) return

  btn.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
    document.documentElement.setAttribute('data-theme', next)
    localStorage.setItem('prae-theme', next)
    animate(btn, { rotate: [0, 15, 0], scale: [1, 0.92, 1] }, { duration: 0.35, ease: [0.22, 1, 0.36, 1] })
  })
}

function setupLocationSection() {
  const map = $('locationMap')
  const addressEl = $('locationAddress')
  if (map) map.src = MAPS_EMBED
  if (addressEl) addressEl.textContent = BUSINESS_ADDRESS

  document.querySelectorAll('#locationDirections, .location__actions a').forEach(link => {
    if (link.href.includes('maps')) link.href = MAPS_URL
  })

  const section = document.getElementById('ubicacion')
  if (!section) return
  inView(section, () => {
    animate(section.querySelector('.location__map-wrap'), { opacity: [0, 1], x: [-24, 0] }, { duration: 0.7, ease: [0.22, 1, 0.36, 1] })
    animate(section.querySelector('.location__panel'), { opacity: [0, 1], x: [24, 0] }, { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 })
  }, { amount: 0.15 })
}

/* ============ HERO — Editorial curtain + mask reveal ============ */
async function setupHeroAnimation() {
  document.body.classList.add('intro-active')

  const curtain = $('heroCurtain')
  const topPanel = curtain?.querySelector('.hero-curtain__panel--top')
  const bottomPanel = curtain?.querySelector('.hero-curtain__panel--bottom')
  const curtainLine = curtain?.querySelector('.hero-curtain__line')
  const header = $('header')

  const letterInners = document.querySelectorAll('.hero__letter-inner')
  const meta = document.querySelector('.hero__meta')
  const divider = document.querySelector('.hero__divider')
  const rule = document.querySelector('.hero__rule')
  const taglineWords = document.querySelectorAll('.hero__tagline-word')
  const taglineSep = document.querySelector('.hero__tagline-sep')
  const desc = document.querySelector('.hero__desc')
  const actions = document.querySelector('.hero__actions')
  const scrollEl = $('heroScroll')
  const accent = document.querySelector('.hero__accent')
  const grid = document.querySelector('.hero__grid')

  if (header) animate(header, { opacity: 0, y: -16 }, { duration: 0 })

  const ease = [0.76, 0, 0.24, 1]
  const easeOut = [0.22, 1, 0.36, 1]
  const lineWidth = Math.min(window.innerWidth * 0.72, 560)
  const ruleWidth = Math.min(window.innerWidth * 0.48, 320)

  const timeout = ms => new Promise(r => setTimeout(r, ms))

  // Safety: force curtain open after max delay regardless of animation bugs
  const safetyOpen = () => {
    curtain?.classList.add('done')
    document.body.classList.remove('intro-active')
  }
  const safetyTimer = setTimeout(safetyOpen, 4000)

  try {
    // ── Phase 1: Blue line draws on black curtain ──
    await Promise.race([
      animate(curtainLine, { width: ['0px', `${lineWidth}px`] }, { duration: 0.85, ease: [0.65, 0, 0.35, 1] }),
      timeout(2000)
    ])

    // ── Phase 2: Curtain panels split open ──
    await Promise.race([
      Promise.all([
        animate(topPanel, { y: ['0%', '-100%'] }, { duration: 1.15, ease }),
        animate(bottomPanel, { y: ['0%', '100%'] }, { duration: 1.15, ease }),
        animate(curtainLine, { opacity: [1, 0], scaleX: [1, 1.5] }, { duration: 0.35, delay: 0.15 })
      ]),
      timeout(3000)
    ])
  } catch(e) {}

  clearTimeout(safetyTimer)
  safetyOpen()

  // ── Phase 3: Background elements fade in ──
  try { animate(grid, { opacity: [0, 0.35] }, { duration: 1.2, ease: easeOut }) } catch(e) {}
  try { animate(accent, { opacity: [0, 0.5], scale: [0.8, 1], rotate: [0, 15] }, { duration: 1.4, ease: easeOut }) } catch(e) {}

  // ── Phase 4: Meta bar ──
  try { animate(meta, { opacity: [0, 1], y: [12, 0] }, { duration: 0.7, ease: easeOut }) } catch(e) {}
  try { animate(divider, { scaleX: [0, 1] }, { duration: 0.8, ease: easeOut, delay: 0.15 }) } catch(e) {}

  // ── Phase 5: Letters reveal (mask slide-up) ──
  try {
    await Promise.race([
      animate(letterInners, { y: ['110%', '0%'] }, { delay: stagger(0.1, { start: 0.05 }), duration: 0.95, ease: easeOut }),
      timeout(2000)
    ])
  } catch(e) {}

  // ── Phase 6: Accent rule expands ──
  try {
    await Promise.race([
      animate(rule, { width: ['0px', `${ruleWidth}px`] }, { duration: 0.75, ease: easeOut }),
      timeout(2000)
    ])
  } catch(e) {}

  // ── Phase 7: Tagline words stagger ──
  try {
    animate(taglineSep, { opacity: [0, 1] }, { duration: 0.4, ease: easeOut })
    animate(taglineWords, { opacity: [0, 1], y: [20, 0] }, { delay: stagger(0.12), duration: 0.7, ease: easeOut })
  } catch(e) {}

  // ── Phase 8: Description + CTAs ──
  try { animate(desc, { opacity: [0, 1], y: [14, 0] }, { duration: 0.7, ease: easeOut, delay: 0.2 }) } catch(e) {}
  try { animate(actions, { opacity: [0, 1], y: [18, 0] }, { duration: 0.7, ease: easeOut, delay: 0.35 }) } catch(e) {}

  // ── Phase 9: Header + scroll indicator ──
  try { animate(header, { opacity: [0, 1], y: [-16, 0] }, { duration: 0.6, ease: easeOut, delay: 0.1 }) } catch(e) {}
  try { animate(scrollEl, { opacity: [0, 1] }, { duration: 0.5, delay: 0.5 }) } catch(e) {}

  try {
    const scrollLine = scrollEl?.querySelector('.hero__scroll-line')
    if (scrollLine) {
      animate(scrollLine, { scaleY: [0, 1] }, { duration: 0.6, ease: easeOut, delay: 0.6 })
      animate(scrollLine, { scaleY: [1, 0.3, 1] }, { duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 1.2 })
    }
  } catch(e) {}

  // Parallax on scroll
  try {
    const heroInner = document.querySelector('.hero__inner')
    if (heroInner) scroll(heroInner, { offset: ['start start', 'end start'], y: [0, -80] })
  } catch(e) {}
}

/* ============ Sections — inView + stagger ============ */
function setupSectionAnimations() {
  document.querySelectorAll('.section').forEach(section => {
    inView(section, () => {
      const label = section.querySelector('.section__label')
      const title = section.querySelector('.section__title')
      const subtitle = section.querySelector('.section__subtitle')

      if (label) animate(label, { opacity: [0, 1], x: [-16, 0] }, { duration: 0.6, ease: [0.22, 1, 0.36, 1] })
      if (title) animate(title, { opacity: [0, 1], y: [20, 0] }, { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.08 })
      if (subtitle) animate(subtitle, { opacity: [0, 1], y: [16, 0] }, { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.16 })
    }, { amount: 0.12 })
  })
}

function setupCardAnimations() {
  document.querySelectorAll('.product-grid, .services-grid, .works-grid, .testimonials-grid, .offers-grid').forEach(grid => {
    inView(grid, () => {
      const cards = grid.querySelectorAll('.product-card, .service-card, .work-card, .testimonial-card, .offer-card')
      if (cards.length) {
        animate(cards, { opacity: [0, 1], y: [32, 0] }, {
          delay: stagger(0.06),
          duration: 0.65,
          ease: [0.22, 1, 0.36, 1]
        })
      }
    }, { amount: 0.08 })
  })

  document.querySelectorAll('.stat-card').forEach((card, i) => {
    inView(card, () => {
      animate(card, { opacity: [0, 1], y: [24, 0] }, {
        duration: 0.6,
        delay: i * 0.08,
        ease: [0.22, 1, 0.36, 1]
      })
    }, { amount: 0.3 })
  })
}

/* ============ Card hover — Motion ============ */
function setupCardHover() {
  document.querySelectorAll('.product-card, .service-card, .work-card, .offer-card').forEach(card => {
    hover(card, () => {
      animate(card, { y: -6 }, { type: 'spring', stiffness: 400, damping: 20 })
      return () => animate(card, { y: 0 }, { type: 'spring', stiffness: 400, damping: 20 })
    })
  })
  document.querySelectorAll('.btn').forEach(btn => {
    hover(btn, () => {
      animate(btn, { y: -2 }, { type: 'spring', stiffness: 400, damping: 20 })
      return () => animate(btn, { y: 0 }, { type: 'spring', stiffness: 400, damping: 20 })
    })
  })
}

/* ============ Counter animation ============ */
function animateCounter(el) {
  const target = parseInt(el.dataset.count)
  if (!target) return
  const suffix = el.dataset.suffix || ''
  const hasPlus = el.querySelector('.stat-card__suffix')
  animate(0, target, {
    duration: 1.4,
    ease: [0.22, 1, 0.36, 1],
    onUpdate: (v) => {
      if (hasPlus) {
        el.childNodes[0].textContent = Math.round(v)
      } else {
        el.textContent = Math.round(v) + suffix
      }
    }
  })
}

function setupScrollProgress() {
  const bar = document.createElement('div')
  bar.className = 'scroll-progress'
  document.body.appendChild(bar)
  scroll(progress => { bar.style.width = progress * 100 + '%' })
}

/* ============ Config & Data Loading ============ */
async function loadConfig() {
  try {
    const c = await API.get('/config/')
    if (c && typeof c === 'object') {
      if (c.telefono_principal) $('footerPhone').textContent = c.telefono_principal
      if (c.email_contacto) $('footerEmail').textContent = c.email_contacto
      if (c.horario) $('footerHours').textContent = c.horario
      if (c.whatsapp_number) {
        const wa = c.whatsapp_number.replace(/[^0-9]/g, '')
        document.querySelectorAll('.wa-link').forEach(el => el.href = `https://wa.me/${wa}`)
      }
      renderContactInfo(c)
      renderSocialLinks(c)
    }
  } catch(e) {}
}

function renderContactInfo(c) {
  const el = $('contactInfo')
  if (!el) return
  const address = c.direccion || BUSINESS_ADDRESS
  const mapsUrl = c.maps_url || MAPS_URL
  const items = [
    { icon: 'fas fa-phone', label: 'Telefono', value: c.telefono_principal || '809-303-9156' },
    { icon: 'fas fa-envelope', label: 'Email', value: c.email_contacto || 'espinalclimatizacion@gmail.com' },
    { icon: 'fas fa-map-marker-alt', label: 'Direccion', value: address, link: mapsUrl },
    { icon: 'fas fa-clock', label: 'Horario', value: c.horario || 'Lunes a sabado 8:00am - 6:00pm' },
  ]
  el.innerHTML = items.map(it => html`
    <div class="contact-info__item"><i class="${it.icon}"></i><div><strong>${it.label}</strong><span>${it.link ? `<a href="${it.link}" target="_blank" rel="noopener">${it.value}</a>` : it.value}</span></div></div>
  `).join('')

  const locationAddress = $('locationAddress')
  if (locationAddress && c.direccion) locationAddress.textContent = c.direccion
}

function renderSocialLinks(c) {
  const el = $('socialLinks')
  if (!el) return
  const links = []
  if (c.whatsapp_number) links.push({ url: `https://wa.me/${c.whatsapp_number.replace(/[^0-9]/g, '')}`, icon: 'fab fa-whatsapp' })
  if (c.facebook) links.push({ url: c.facebook, icon: 'fab fa-facebook' })
  if (c.instagram) links.push({ url: c.instagram, icon: 'fab fa-instagram' })
  if (c.tiktok) links.push({ url: c.tiktok, icon: 'fab fa-tiktok' })
  el.innerHTML = links.map(l => `<a href="${l.url}" target="_blank" rel="noopener"><i class="${l.icon}"></i></a>`).join('')
}

function setupHeader() {
  const header = $('header')
  scroll((progress) => {
    if (progress > 0.02) header.classList.add('scrolled')
    else header.classList.remove('scrolled')
  })
}

function setupMobileMenu() {
  const btn = $('menuToggle'), nav = $('mainNav')
  btn?.addEventListener('click', () => { nav?.classList.toggle('open'); btn.classList.toggle('open') })
  nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')))
}

async function loadProducts() {
  try {
    const prods = await API.get('/productos')
    const cats = [...new Set(prods.map(p => p.categoria?.nombre || 'General').filter(Boolean))]
    const filters = $('productFilters')
    if (filters) {
      filters.innerHTML = `<button class="category-pill active" data-cat="all">Todos</button>` +
        cats.map(c => `<button class="category-pill" data-cat="${c}">${c}</button>`).join('')
      filters.querySelectorAll('.category-pill').forEach(btn => {
        btn.addEventListener('click', () => {
          filters.querySelectorAll('.category-pill').forEach(b => b.classList.remove('active'))
          btn.classList.add('active')
          renderProducts(prods, btn.dataset.cat)
        })
      })
    }
    renderProducts(prods, 'all')
    return prods
  } catch(e) { return [] }
}

function renderProducts(prods, cat) {
  const grid = $('productGrid')
  if (!grid) return
  const filtered = cat === 'all' ? prods : prods.filter(p => p.categoria?.nombre === cat)
  grid.innerHTML = filtered.map(p => html`
    <div class="product-card">
      <div class="product-card__image">
        ${p.imagenes?.length ? `<img src="${p.imagenes[0].startsWith('http') ? p.imagenes[0] : API.base + '/' + p.imagenes[0]}" alt="${p.nombre}" loading="lazy">` : '<span class="placeholder-icon"><i class="fas fa-box"></i></span>'}
      </div>
      <div class="product-card__body">
        ${p.categoria ? `<div class="product-card__category">${p.categoria.nombre}</div>` : ''}
        <div class="product-card__name">${p.nombre}</div>
        ${p.descripcion ? `<div class="product-card__desc">${p.descripcion}</div>` : ''}
        <div style="display:flex;align-items:center;justify-content:space-between;margin-top:8px">
          ${p.precio ? `<div class="product-card__price">$${Number(p.precio).toLocaleString('es-DO')}</div>` : '<div></div>'}
          <span class="badge ${p.disponibilidad === 'disponible' ? 'badge--available' : 'badge--unavailable'}">${p.disponibilidad === 'disponible' ? 'Disponible' : 'Agotado'}</span>
        </div>
      </div>
    </div>
  `).join('')
  setupCardHover()
}

async function loadServices() {
  try {
    const svcs = await API.get('/servicios')
    const grid = $('servicesGrid')
    if (!grid) return svcs
    grid.innerHTML = svcs.map(s => html`
      <div class="service-card">
        <div class="service-card__icon"><i class="${getServiceIcon(s.nombre)}"></i></div>
        <div class="service-card__name">${s.nombre}</div>
        <div class="service-card__desc">${s.descripcion_corta || s.descripcion_larga || ''}</div>
      </div>
    `).join('')
    return svcs
  } catch(e) { return [] }
}

function getServiceIcon(name) {
  const n = name?.toLowerCase() || ''
  if (n.includes('repar')) return 'fas fa-wrench'
  if (n.includes('manten')) return 'fas fa-tools'
  if (n.includes('venta')||n.includes('instal')) return 'fas fa-snowflake'
  if (n.includes('asesor')) return 'fas fa-headset'
  return 'fas fa-star'
}

async function loadWorks() {
  try {
    const works = await API.get('/trabajos')
    const grid = $('worksGrid')
    if (!grid) return works
    grid.innerHTML = works.map(w => {
      const isVideo = w.media?.length && w.media[0].match(/\.(mp4|webm|mov)$/i)
      return html`
        <div class="work-card">
          <div class="work-card__media">
            ${isVideo
              ? `<video src="${API.base}/${w.media[0]}" muted loop playsinline></video><div class="work-card__play"><i class="fas fa-play"></i></div>`
              : w.media?.length
                ? `<img src="${API.base}/${w.media[0]}" alt="${w.titulo}" loading="lazy"><div class="work-card__play"><i class="fas fa-expand"></i></div>`
                : '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:rgba(255,255,255,0.15);font-size:28px"><i class="fas fa-wrench"></i></div>'
            }
          </div>
          <div class="work-card__body">
            <div class="work-card__title">${w.titulo}</div>
            ${w.descripcion ? `<div class="work-card__desc">${w.descripcion}</div>` : ''}
          </div>
        </div>
      `
    }).join('')
    return works
  } catch(e) { return [] }
}

async function loadOffers() {
  try {
    const offers = await API.get('/ofertas')
    const grid = $('offersGrid')
    if (!grid) return
    if (!offers.length) { grid.innerHTML = ''; return }
    grid.innerHTML = offers.map(o => html`
      <div class="offer-card">
        <div class="offer-card__title">${o.titulo}</div>
        ${o.descripcion ? `<div class="offer-card__desc">${o.descripcion}</div>` : ''}
      </div>
    `).join('')
  } catch(e) {}
}

async function loadTestimonials() {
  try {
    const tests = await API.get('/testimonios')
    const grid = $('testimonialsSlider')
    if (!grid) return tests
    grid.innerHTML = tests.map(t => html`
      <div class="testimonial-card">
        <div class="testimonial-card__stars">${Array(5).fill(0).map((_, i) => `<i class="${i < (t.calificacion || 5) ? 'fas' : 'far'} fa-star${i < (t.calificacion || 5) ? '' : ' empty'}"></i>`).join('')}</div>
        <div class="testimonial-card__text">${t.comentario}</div>
        <div class="testimonial-card__author">— ${t.nombre_publico || 'Cliente'}</div>
      </div>
    `).join('')
    return tests
  } catch(e) { return [] }
}

function updateStats(prods, svcs, tests) {
  const counters = [
    { el: $('statYears'), count: 12, suffix: '+' },
    { el: $('statProducts'), count: prods?.length || 0 },
    { el: $('statServices'), count: svcs?.length || 0 },
    { el: $('statClients'), count: tests?.length || 0 },
  ]
  counters.forEach(({ el, count, suffix }) => {
    if (!el) return
    el.dataset.count = count
    if (suffix) el.dataset.suffix = suffix
  })
  animateStatCounters()
}

function animateStatCounters() {
  const sec = document.querySelector('.stats')
  if (!sec) return
  inView(sec, () => {
    sec.querySelectorAll('.stat-card__number').forEach(el => {
      if (!el.dataset.counted) {
        el.dataset.counted = 'true'
        animateCounter(el)
      }
    })
  }, { amount: 0.2 })
}

function setupBTUCalculator() {
  const form = $('btuForm')
  if (!form) return
  const result = $('btuResult')
  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const area = parseFloat($('btuArea')?.value)
    const height = parseFloat($('btuHeight')?.value) || 2.5
    const people = parseInt($('btuPeople')?.value) || 1
    const electronics = parseInt($('btuElectronics')?.value) || 0
    if (!area || area < 1) { $('btuArea').classList.add('error'); setTimeout(() => $('btuArea').classList.remove('error'), 2000); return }
    const vol = area * height
    const btu = Math.max(vol * 25 + (people - 1) * 600 + electronics * 1000, 6000)
    const rounded = Math.ceil(btu / 1000) * 1000
    const valEl = $('btuValue')
    valEl.textContent = '0'
    if (result) {
      result.style.display = 'flex'
      animate(result, { opacity: [0, 1], y: [12, 0] }, { duration: 0.5, ease: [0.22, 1, 0.36, 1] })
    }
    animate(0, rounded, { duration: 0.9, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => { valEl.textContent = Math.round(v).toLocaleString() } })
    await API.post('/calcular-btu', { area, altura: height, personas: people, equipos: electronics })
  })
}

function setupContactForm() {
  const form = $('contactForm')
  if (!form) return
  form.querySelectorAll('.form-input').forEach(el => {
    el.addEventListener('input', () => el.classList.remove('error', 'success'))
  })
  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    let valid = true
    form.querySelectorAll('[required]').forEach(el => {
      if (!el.value.trim()) { el.classList.add('error'); valid = false }
      else el.classList.remove('error')
    })
    if (!valid) { showToast('Completa todos los campos requeridos', 'error'); return }
    const data = Object.fromEntries(new FormData(form))
    const btn = form.querySelector('button[type="submit"]')
    if (!btn) return
    const orig = btn.innerHTML
    btn.disabled = true; btn.innerHTML = 'Enviando...'
    const res = await API.post('/contacto', data)
    btn.disabled = false
    if (res.success) { form.reset(); showToast('Mensaje enviado con exito!', 'success') }
    else showToast('Error al enviar.', 'error')
    btn.innerHTML = orig
  })
}

function setupTestimonialModal() {
  const modal = $('testimonialModal'), overlay = $('modalOverlay'), close = $('modalClose')
  const openBtn = $('addTestimonialBtn'), stars = $('starRating'), ratingInput = $('calificacion')
  const form = $('testimonialForm')
  if (!modal || !form) return

  const openModal = () => {
    modal.classList.add('active')
    animate(modal.querySelector('.modal__overlay'), { opacity: [0, 1] }, { duration: 0.3 })
    animate(modal.querySelector('.modal__content'), { opacity: [0, 1], y: [24, 0], scale: [0.97, 1] }, { duration: 0.4, ease: [0.22, 1, 0.36, 1] })
  }
  const closeModal = () => {
    animate(modal.querySelector('.modal__content'), { opacity: 0, y: 16 }, { duration: 0.25 }).then(() => modal.classList.remove('active'))
  }

  openBtn?.addEventListener('click', openModal)
  close?.addEventListener('click', closeModal)
  overlay?.addEventListener('click', closeModal)
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal() })

  stars?.querySelectorAll('i').forEach(star => {
    const setRating = (val) => {
      if (ratingInput) ratingInput.value = val
      stars.querySelectorAll('i').forEach((s, i) => s.className = i < val ? 'fas fa-star active' : 'far fa-star')
    }
    star.addEventListener('click', () => setRating(parseInt(star.dataset.val)))
    star.addEventListener('mouseenter', () => {
      const val = parseInt(star.dataset.val)
      stars.querySelectorAll('i').forEach((s, i) => s.className = i < val ? 'fas fa-star active' : 'far fa-star')
    })
    star.addEventListener('mouseleave', () => {
      if (ratingInput) setRating(parseInt(ratingInput.value) || 5)
    })
  })

  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(form))
    const btn = form.querySelector('button[type="submit"]'); if (!btn) return
    btn.disabled = true; btn.innerHTML = 'Enviando...'
    const res = await API.post('/testimonios', data)
    if (res.success) { form.reset(); closeModal(); showToast('Gracias por tu testimonio!', 'success'); setTimeout(() => location.reload(), 1200) }
    else showToast('Error al enviar.', 'error')
    btn.disabled = false; btn.innerHTML = 'Enviar testimonio'
  })
}

function setupWhatsAppFloat() {
  const el = document.querySelector('.whatsapp-float')
  if (!el) return
  setTimeout(() => {
    animate(el, { opacity: [0, 1], y: [20, 0] }, { duration: 0.6, ease: [0.22, 1, 0.36, 1] })
  }, 2500)
}

function setupNewsletter() {
  const form = document.querySelector('.newsletter')
  if (!form) return
  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const input = form.querySelector('input')
    const email = input?.value.trim()
    if (!email || !email.includes('@')) { showToast('Ingresa un email valido', 'error'); return }
    await API.post('/newsletter', { email })
    showToast('Gracias por suscribirte!', 'success')
    form.reset()
  })
}

function showToast(msg, type) {
  let toast = document.querySelector('.toast')
  if (!toast) {
    toast = document.createElement('div')
    toast.className = 'toast'
    document.body.appendChild(toast)
  }
  toast.textContent = msg
  toast.className = 'toast ' + (type || '')
  animate(toast, { opacity: [0, 1], y: [16, 0] }, { duration: 0.3 })
  clearTimeout(toast._hide)
  toast._hide = setTimeout(() => {
    animate(toast, { opacity: 0, y: 16 }, { duration: 0.3 })
  }, 3000)
}

document.addEventListener('DOMContentLoaded', init)
