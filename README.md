# PRAE — Refrigeracion y Climatizacion

Sitio web profesional para **PRAE**, empresa dominicana de venta, reparacion, mantenimiento y asesoria de aires acondicionados, neveras y piezas. Con mas de 12 anos de experiencia en Espinal, Santo Domingo.

🌐 **Sitio en vivo:** https://shyemi.github.io/prae/

---

## Stack

| Capa | Tecnologia |
|---|---|
| Frontend | HTML, CSS, JavaScript vanilla |
| Animaciones | [motion.dev](https://motion.dev) v12 — `animate()`, `scroll()`, `inView()`, `stagger()`, `hover()` |
| Tipografia | Geist Mono (headings) + EB Garamond (body) |
| Iconos | Font Awesome 6.5 |
| Mapas | Google Maps embed |
| Hosting | GitHub Pages (via Actions) |
| Backend (futuro) | Flask + PostgreSQL |

## Caracteristicas

- Diseno editorial con glassmorphism y tipografia elegante
- Tema claro/oscuro con persistencia en localStorage
- Animaciones de entrada con curtain reveal
- Catalogo de productos con filtros por categoria
- Calculadora de BTU interactiva
- Formulario de contacto
- Testimonios de clientes con calificacion por estrellas
- Galeria de trabajos realizados
- Integracion con Google Maps
- Boton flotante de WhatsApp
- Panel de administracion (admin.html)
- Datos estaticos embebidos como fallback (funciona sin servidor)

## Estructura

```
prae/
├── frontend/
│   ├── index.html          # Landing page principal
│   ├── admin.html          # Panel de administracion
│   ├── logo.png            # Logotipo
│   ├── favicon.png
│   ├── .nojekyll           # Desactiva Jekyll en GitHub Pages
│   ├── css/
│   │   └── style.css       # Sistema de diseno completo
│   └── js/
│       ├── app.js          # Logica del frontend + datos de prueba
│       └── admin.js        # Logica del panel admin
├── backend/
│   ├── .env
│   └── ...                 # API Flask (en desarrollo)
├── .github/
│   └── workflows/
│       └── pages.yml       # Deploy automatico a GitHub Pages
└── README.md
```

## Desarrollo local

```bash
# Servir frontend estatico
cd frontend && python3 -m http.server 3002

# O servidor combinado (frontend + API mock)
python3 /tmp/prae_server.py
# http://localhost:3000
```

## Deploy

Cada push a `main` despliega automaticamente via GitHub Actions:

1. El workflow `.github/workflows/pages.yml` toma la carpeta `frontend/`
2. La sube como artifact de Pages
3. GitHub Pages la sirve en https://shyemi.github.io/prae/

## Licencia

Uso interno. Proyecto privado de PRAE Refrigeracion y Climatizacion Espinal.
