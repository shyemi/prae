const API = (() => {
  const BASE = 'http://localhost:3001'
  function token() { return localStorage.getItem('prae_token') || '' }
  function headers() { return { 'Content-Type':'application/json', ...(token() ? {'Authorization':`Bearer ${token()}`} : {}) } }
  async function get(path) { const r = await fetch(`${BASE}${path}`, {headers:headers()}); const d = await r.json(); return d }
  async function post(path, body) { const r = await fetch(`${BASE}${path}`, { method:'POST', headers:headers(), body:JSON.stringify(body) }); return r.json() }
  async function put(path, body) { const r = await fetch(`${BASE}${path}`, { method:'PUT', headers:headers(), body:JSON.stringify(body) }); return r.json() }
  async function del(path) { const r = await fetch(`${BASE}${path}`, { method:'DELETE', headers:headers() }); return r.json() }
  return { get, post, put, del, base: BASE }
})()

const $ = id => document.getElementById(id)
const html = (s, ...v) => s.reduce((a, s, i) => a + s + (v[i] !== undefined ? v[i] : ''), '')

let currentSection = 'dashboard'
let allData = {}

async function init() {
  try {
    const me = await API.get('/auth/me')
    if (me.success && me.data) {
      $('adminUser').textContent = `${me.data.nombre}`
      if (me.data.rol === 'admin' || me.data.rol === 'super_admin') { $('logoutBtn').style.display = 'inline-flex' }
      else { window.location = 'index.html'; return }
    } else {
      await tryGoogleAuth()
    }
  } catch(e) { await tryGoogleAuth() }
  setupNavigation()
  await loadSection('dashboard')
}

async function tryGoogleAuth() {
  // For demo, redirect to backend Google OAuth or show login button
  $('adminContent').innerHTML = html`
    <div style="max-width:400px;margin:100px auto;text-align:center;padding:40px;background:var(--white);border-radius:24px;border:1px solid var(--gray-200)">
      <div style="margin-bottom:16px"><i class="fas fa-lock" style="font-size:36px;color:var(--gray-400)"></i></div>
      <h2 style="font-size:24px;font-weight:400;margin-bottom:8px;font-family:'Playfair Display',Georgia,serif">Acceso administrativo</h2>
      <p style="color:var(--gray-500);margin-bottom:24px;font-size:14px">Inicia sesion con tu cuenta de Google</p>
      <a href="${API.base}/auth/google" class="btn btn--primary" style="text-decoration:none;display:inline-flex">
        <i class="fab fa-google"></i> Iniciar sesion con Google
      </a>
    </div>
  `
}

function setupNavigation() {
  document.querySelectorAll('.admin-nav a').forEach(a => {
    a.addEventListener('click', async (e) => {
      e.preventDefault()
      document.querySelectorAll('.admin-nav a').forEach(x => x.classList.remove('active'))
      a.classList.add('active')
      const section = a.dataset.section
      currentSection = section
      $('sectionTitle').textContent = a.textContent.trim()
      await loadSection(section)
    })
  })
}

async function loadSection(section) {
  const content = $('adminContent')
  try {
    switch(section) {
      case 'dashboard': await loadDashboard(content); break
      case 'productos': await loadCRUD(content, 'productos', productFields); break
      case 'categorias': await loadCRUD(content, 'categorias', categoryFields); break
      case 'servicios': await loadCRUD(content, 'servicios', serviceFields); break
      case 'trabajos': await loadCRUD(content, 'trabajos', workFields); break
      case 'ofertas': await loadCRUD(content, 'ofertas', offerFields); break
      case 'testimonios': await loadTestimonios(content); break
      case 'cotizaciones': await loadMessages(content, 'cotizaciones', 'cotizacion'); break
      case 'mensajes': await loadMessages(content, 'mensajes', 'mensaje'); break
      case 'config': await loadConfig(content); break
      default: content.innerHTML = '<p>Seccion no encontrada</p>'
    }
  } catch(e) { content.innerHTML = `<p style="color:var(--red-500)">Error: ${e.message}</p>` }
}

async function loadDashboard(content) {
  const d = await API.get('/admin/dashboard')
  const data = d.success ? d.data : {}
  content.innerHTML = html`
    <div class="admin-stats">
      <div class="admin-stat"><div class="admin-stat__number">${data.productos || 0}</div><div class="admin-stat__label">Productos</div></div>
      <div class="admin-stat"><div class="admin-stat__number">${data.categorias || 0}</div><div class="admin-stat__label">Categorias</div></div>
      <div class="admin-stat"><div class="admin-stat__number">${data.servicios || 0}</div><div class="admin-stat__label">Servicios</div></div>
      <div class="admin-stat"><div class="admin-stat__number">${data.testimonios || 0}</div><div class="admin-stat__label">Testimonios</div></div>
      <div class="admin-stat"><div class="admin-stat__number">${data.cotizaciones || 0}</div><div class="admin-stat__label">Cotizaciones</div></div>
      <div class="admin-stat"><div class="admin-stat__number">${data.mensajes || 0}</div><div class="admin-stat__label">Mensajes</div></div>
    </div>
    <div class="admin-table-wrap"><div class="admin-table" style="padding:40px;text-align:center;color:var(--gray-500)">
      <div style="margin-bottom:16px"><i class="fas fa-chart-simple" style="font-size:36px;color:var(--gray-400)"></i></div>
      <p style="font-size:18px;font-weight:400;color:var(--near-black)">Bienvenido al panel de administracion</p>
      <p style="font-size:14px;margin-top:4px">Gestiona productos, servicios, categorias y mas desde las opciones del menu</p>
    </div></div>
  `
}

// Generic CRUD
async function loadCRUD(content, section, fields) {
  const res = await API.get(`/admin/${section}`)
  const items = res.success ? (res.data || []) : []
  content.innerHTML = html`
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
      <div class="admin-tabs" id="crudTabs"></div>
      <button class="btn btn--primary btn--sm" onclick="showForm('${section}',null,${JSON.stringify(fields).replace(/"/g,'&quot;')})"><i class="fas fa-plus"></i> Nuevo</button>
    </div>
    <div class="admin-table-wrap">
      <table class="admin-table">
        <thead><tr>${fields.map(f => `<th>${f.label}</th>`).join('')}<th style="width:100px">Acciones</th></tr></thead>
        <tbody>${items.length ? items.map(item => html`
          <tr>${fields.map(f => `<td>${renderField(item, f)}</td>`).join('')}
            <td>
              <button class="btn--icon" onclick="showForm('${section}',${item.id},${JSON.stringify(fields).replace(/"/g,'&quot;')})" title="Editar"><i class="fas fa-pen"></i></button>
              <button class="btn--icon" onclick="deleteItem('${section}',${item.id})" title="Eliminar" style="color:var(--red-500)"><i class="fas fa-trash"></i></button>
            </td>
          </tr>
        `).join('') : '<tr><td colspan="99" style="text-align:center;padding:40px;color:var(--gray-400)">No hay registros</td></tr>'}</tbody>
      </table>
    </div>
    <div class="modal" id="crudModal">
      <div class="modal__overlay" onclick="closeForm()"></div>
      <div class="modal__content" id="crudFormContent"></div>
    </div>
  `
}

function renderField(item, field) {
  const val = item[field.key]
  if (field.type === 'bool') return `<span class="badge ${val ? 'badge--available' : 'badge--unavailable'}">${val ? 'Si' : 'No'}</span>`
  if (field.key === 'imagenes' || field.key === 'media') {
    if (val?.length) return `<img src="${API.base}/${val[0]}" style="width:48px;height:48px;border-radius:8px;object-fit:cover">`
    return '<span style="color:var(--gray-400)">—</span>'
  }
  if (field.key === 'precio') return val ? `$${Number(val).toLocaleString('es-DO')}` : '—'
  if (field.key === 'disponibilidad') return `<span class="badge ${val === 'disponible' ? 'badge--available' : 'badge--unavailable'}">${val || '—'}</span>`
  if (field.key === 'aprobado') return `<span class="badge ${val ? 'badge--available' : 'badge--unavailable'}">${val ? 'Aprobado' : 'Pendiente'}</span>`
  if (typeof val === 'string' && val.length > 60) return val.slice(0, 60) + '...'
  return val ?? '—'
}

const categoryFields = [
  { key:'nombre', label:'Nombre', type:'text' },
  { key:'slug', label:'Slug', type:'text' },
  { key:'activo', label:'Activo', type:'bool' },
]
const productFields = [
  { key:'nombre', label:'Nombre', type:'text' },
  { key:'categoria', label:'Categoria', type:'relation', model:'categorias', displayKey:'nombre' },
  { key:'precio', label:'Precio', type:'number' },
  { key:'disponibilidad', label:'Estado', type:'text' },
  { key:'activo', label:'Activo', type:'bool' },
]
const serviceFields = [
  { key:'nombre', label:'Nombre', type:'text' },
  { key:'descripcion_corta', label:'Descripcion', type:'text' },
  { key:'activo', label:'Activo', type:'bool' },
]
const workFields = [
  { key:'titulo', label:'Titulo', type:'text' },
  { key:'media', label:'Imagen', type:'image' },
  { key:'activo', label:'Activo', type:'bool' },
]
const offerFields = [
  { key:'titulo', label:'Titulo', type:'text' },
  { key:'destacada', label:'Destacada', type:'bool' },
  { key:'activa', label:'Activa', type:'bool' },
]

window.showForm = async function(section, id, fields) {
  let item = {}
  if (id) {
    const res = await API.get(`/admin/${section}`)
    const items = res.success ? (res.data || []) : []
    item = items.find(i => i.id === id) || {}
  }
  const modal = $('crudModal')
  const content = $('crudFormContent')
  const isEdit = !!id
  content.innerHTML = html`
    <h3 style="font-size:20px;font-weight:600;margin-bottom:20px">${isEdit ? 'Editar' : 'Nuevo'}</h3>
    <form onsubmit="submitForm(event,'${section}',${id || 'null'},${JSON.stringify(fields).replace(/"/g,'&quot;')})">
      ${await Promise.all(fields.map(async f => {
        if (f.type === 'relation') {
          const rel = await API.get(`/admin/${f.model}`)
          const relItems = rel.success ? (rel.data || []) : []
          const currentVal = item[f.model] ? item[f.model].id : (item[`${f.model}_id`] || '')
          return html`<div class="form-group"><label>${f.label}</label>
            <select class="form-input" name="${f.key}_id" ${f.required ? 'required' : ''}>
              <option value="">Seleccionar...</option>
              ${relItems.map(r => `<option value="${r.id}" ${currentVal == r.id ? 'selected' : ''}>${r[f.displayKey] || r.nombre}</option>`).join('')}
            </select></div>`
        }
        if (f.type === 'bool') return html`<div class="form-group"><label style="display:flex;align-items:center;gap:8px;cursor:pointer">
          <input type="checkbox" name="${f.key}" value="true" ${item[f.key] ? 'checked' : ''} style="width:18px;height:18px">
          ${f.label}</label></div>`
        if (f.type === 'number') return html`<div class="form-group"><label>${f.label}</label>
          <input type="number" class="form-input" name="${f.key}" value="${item[f.key] ?? ''}" ${f.required ? 'required' : ''} step="0.01"></div>`
        if (f.key === 'descripcion' || f.key === 'descripcion_larga' || f.key === 'mensaje')
          return html`<div class="form-group"><label>${f.label}</label><textarea class="form-input" name="${f.key}" rows="3">${item[f.key] || ''}</textarea></div>`
        return html`<div class="form-group"><label>${f.label}</label>
          <input type="text" class="form-input" name="${f.key}" value="${item[f.key] || ''}" ${f.required ? 'required' : ''}></div>`
      })).then(rows => rows.join(''))}
      <div style="display:flex;gap:8px;margin-top:20px">
        <button type="submit" class="btn btn--primary">${isEdit ? 'Guardar cambios' : 'Crear'}</button>
        <button type="button" class="btn btn--outline" onclick="closeForm()">Cancelar</button>
      </div>
    </form>
  `
  modal.classList.add('active')
}

window.submitForm = async function(e, section, id, fields) {
  e.preventDefault()
  const fd = new FormData(e.target)
  const data = {}
  fields.forEach(f => {
    const val = fd.get(f.key)
    if (f.type === 'bool') data[f.key] = fd.has(f.key)
    else if (f.type === 'number') data[f.key] = val ? parseFloat(val) : null
    else data[f.key] = val ?? ''
    const relVal = fd.get(`${f.key}_id`)
    if (relVal) data[`${f.key}_id`] = parseInt(relVal)
  })
  const btn = e.target.querySelector('button[type="submit"]')
  btn.disabled = true; btn.textContent = 'Guardando...'
  let res
  if (id) res = await API.put(`/admin/${section}/${id}`, data)
  else res = await API.post(`/admin/${section}`, data)
  if (res.success) { closeForm(); await loadSection(currentSection) }
  else alert(res.message || 'Error al guardar')
  btn.disabled = false; btn.textContent = id ? 'Guardar cambios' : 'Crear'
}

window.deleteItem = async function(section, id) {
  if (!confirm('Eliminar este registro?')) return
  const res = await API.del(`/admin/${section}/${id}`)
  if (res.success) await loadSection(currentSection)
  else alert(res.message || 'Error al eliminar')
}

window.closeForm = function() { $('crudModal')?.classList.remove('active') }

async function loadTestimonios(content) {
  const res = await API.get('/admin/testimonios')
  const items = res.success ? (res.data || []) : []
  content.innerHTML = html`
    <div class="admin-table-wrap">
      <table class="admin-table">
        <thead><tr><th>Cliente</th><th>Comentario</th><th>Estrellas</th><th>Estado</th><th>Acciones</th></tr></thead>
        <tbody>${items.length ? items.map(t => html`
          <tr>
            <td><strong>${t.nombre_publico || 'Anonimo'}</strong></td>
            <td>${(t.comentario || '').slice(0,80)}${(t.comentario||'').length > 80 ? '...' : ''}</td>
            <td>${'★'.repeat(t.calificacion||5)}</td>
            <td><span class="badge ${t.aprobado ? 'badge--available' : 'badge--unavailable'}">${t.aprobado ? 'Aprobado' : 'Pendiente'}</span></td>
            <td>
              <button class="btn--icon" onclick="toggleAprobar(${t.id})" title="${t.aprobado ? 'Desaprobar' : 'Aprobar'}"><i class="fas fa-check"></i></button>
              <button class="btn--icon" onclick="deleteItem('testimonios',${t.id})" style="color:var(--red-500)"><i class="fas fa-trash"></i></button>
            </td>
          </tr>
        `).join('') : '<tr><td colspan="5" style="text-align:center;padding:40px;color:var(--gray-400)">Sin testimonios</td></tr>'}</tbody>
      </table>
    </div>
  `
}

window.toggleAprobar = async function(id) {
  const res = await API.put(`/admin/testimonios/${id}/aprobar`)
  if (res.success) await loadTestimonios($('adminContent'))
}

async function loadMessages(content, section, label) {
  const res = await API.get(`/admin/${section}`)
  const items = res.success ? (res.data || []) : []
  const title = label === 'cotizacion' ? 'Cotizaciones' : 'Mensajes'
  content.innerHTML = html`
    <div class="admin-table-wrap">
      <table class="admin-table">
        <thead><tr><th>${label === 'cotizacion' ? 'Cliente' : 'Nombre'}</th><th>Contacto</th><th>${label === 'cotizacion' ? 'Items' : 'Mensaje'}</th><th>Estado</th><th>Fecha</th><th>Acciones</th></tr></thead>
        <tbody>${items.length ? items.map(m => html`
          <tr style="${m.leido ? '' : 'font-weight:600;background:var(--blue-50)'}">
            <td>${m.nombre_cliente || m.nombre}</td>
            <td>${m.email || m.telefono || m.whatsapp || '—'}</td>
            <td style="max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${m.mensaje || (m.items ? JSON.stringify(m.items) : '—')}</td>
            <td><span class="badge ${m.leido ? 'badge--available' : 'badge--unavailable'}">${m.leido ? 'Leido' : 'Nuevo'}</span></td>
            <td style="font-size:12px;color:var(--gray-400)">${m.created_at ? new Date(m.created_at).toLocaleDateString() : '—'}</td>
            <td>
              <button class="btn--icon" onclick="marcarLeido('${section}',${m.id})" title="Marcar leido"><i class="fas fa-envelope-open"></i></button>
              <button class="btn--icon" onclick="deleteItem('${section}',${m.id})" style="color:var(--red-500)"><i class="fas fa-trash"></i></button>
            </td>
          </tr>
        `).join('') : `<tr><td colspan="6" style="text-align:center;padding:40px;color:var(--gray-400)">Sin ${title.toLowerCase()}</td></tr>`}</tbody>
      </table>
    </div>
  `
}

window.marcarLeido = async function(section, id) {
  const res = await API.put(`/admin/${section}/${id}/leer`)
  // Map singular names
  if (!res.success) await API.put(`/admin/${section}/${id}/leer`)
  await loadMessages($('adminContent'), section, section === 'cotizaciones' ? 'cotizacion' : 'mensaje')
}

async function loadConfig(content) {
  const res = await API.get('/config/')
  const cfg = res.success ? res.data : {}
  content.innerHTML = html`
    <div style="max-width:600px;background:var(--white);border-radius:18px;padding:32px;border:1px solid var(--gray-200)">
      <h3 style="font-size:20px;font-weight:600;margin-bottom:24px">Configuracion del negocio</h3>
      <form onsubmit="saveConfig(event)">
        ${['nombre_negocio','slogan','meta_title','meta_description','telefono_principal','whatsapp_number','email_contacto','direccion','horario'].map(k => html`
          <div class="form-group">
            <label>${k.replace(/_/g,' ').replace(/\b\w/g,c=>c.toUpperCase())}</label>
            <input type="text" class="form-input" name="${k}" value="${cfg[k] || ''}">
          </div>
        `).join('')}
        <div class="form-group">
          <label>Facebook URL</label>
          <input type="text" class="form-input" name="facebook" value="${cfg.facebook || ''}">
        </div>
        <div class="form-group">
          <label>Instagram URL</label>
          <input type="text" class="form-input" name="instagram" value="${cfg.instagram || ''}">
        </div>
        <div class="form-group">
          <label>TikTok URL</label>
          <input type="text" class="form-input" name="tiktok" value="${cfg.tiktok || ''}">
        </div>
        <button type="submit" class="btn btn--primary">Guardar configuracion</button>
      </form>
    </div>
  `
}

window.saveConfig = async function(e) {
  e.preventDefault()
  const data = Object.fromEntries(new FormData(e.target))
  const btn = e.target.querySelector('button[type="submit"]')
  btn.disabled = true; btn.textContent = 'Guardando...'
  const res = await API.put('/config/', data)
  if (res.success) alert('Configuracion guardada')
  else alert('Error al guardar')
  btn.disabled = false; btn.textContent = 'Guardar configuracion'
}

window.handleLogout = function() {
  localStorage.removeItem('prae_token')
  window.location.reload()
}

document.addEventListener('DOMContentLoaded', init)
