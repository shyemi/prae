**Backend y Base de Datos para PRAE Refrigeracion y Climatizacion Espinal**  
Documento tecnico en Markdown basado en el prompt recibido y en el archivo Apuntes para la realizacion del sitio web.docx.  
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANklEQVR4nO3OUQmAABBAsSeYxZyXSzCJASxgACv4J8KWYMvMbNURAAB/ca7VXe1fTwAAeO16AKe+BdmJqrPdAAAAAElFTkSuQmCC)  
**1. Analisis y supuestos**  
**1.1 Requisitos detectados desde el DOCX**  
1. El sitio pertenece a **PRAE Refrigeracion y Climatizacion Espinal**.  
2. Debe comunicar el eslogan: **"Tu comodidad y confort es nuestra satisfaccion"**.  
3. El negocio vende productos y piezas relacionadas con refrigeracion y climatizacion.  
4. El negocio ofrece servicios para aires acondicionados y refrigeracion.  
5. Debe destacar los **12 anos de experiencia**.  
6. La experiencia del cliente y el confort deben guiar el mensaje principal.  
7. El sitio debe verse moderno.  
8. La paleta preferida es **blanco y azul**.  
9. Debe usarse el logo de la empresa.  
10. El diseno debe ser llamativo.  
11. Debe mostrar trabajos realizados.  
12. Debe mostrar productos del negocio.  
13. Debe estar pensado preferiblemente para telefonos.  
14. Debe adaptarse tambien a tablets y desktop.  
15. Debe incluir resenas/testimonios.  
16. Debe permitir comentarios de clientes.  
17. Productos y servicios deben aparecer en apartados separados.  
18. Debe existir una seccion para servicios/trabajos realizados.  
19. La galeria debe soportar videos.  
20. El catalogo debe incluir neveras/refrigeradores.  
21. El catalogo debe incluir aires acondicionados.  
22. El catalogo debe incluir piezas/repuestos.  
23. El inventario puede venir desde Excel o administrarse con datos equivalentes.  
24. Los productos deben dividirse por categorias.  
25. Las categorias principales incluyen neveras y aires acondicionados.  
26. Todos los productos deben tener imagenes.  
27. Cada producto debe tener URL publica/slug para internet.  
28. Cada producto debe tener descripcion.  
29. Cada producto debe mostrar si esta disponible o no disponible.  
30. No se requiere seccion de patrocinadores.  
31. WhatsApp es un canal principal de contacto/compra.  
32. Debe contemplar servicio de reparacion.  
33. Debe contemplar servicio de mantenimiento.  
34. Debe contemplar servicio de venta.  
35. Debe contemplar servicio de asesoria sobre que conviene comprar.  
36. Cada servicio debe tener una explicacion breve.  
37. Cada servicio debe tener imagenes.  
38. El enfoque comercial es residencial.  
39. Debe mostrar el telefono directo **809-303-9156**.  
40. Debe mostrar redes sociales: TikTok, Facebook y WhatsApp.  
41. Debe mostrar la ubicacion del negocio.  
42. Debe mostrar el correo [**espinalclimatizacion@gmail.com**.](mailto:espinalclimatizacion@gmail.com "mailto:espinalclimatizacion@gmail.com")  
43. Debe mostrar horario: lunes a sabado, 8:00 a. m. a 6:00 p. m.; domingo cerrado.  
44. Debe existir un panel de administracion.  
45. El admin debe poder agregar, editar y eliminar productos.  
46. El admin debe poder editar imagenes y medios.  
47. El admin debe poder administrar ofertas.  
48. El admin debe poder cambiar informacion de contacto, redes sociales y configuracion general.  
49. La pagina sera administrada por el cliente y por el equipo desarrollador/operador.  
50. El acceso admin debe estar protegido. El DOCX menciona usuario y contrasena, pero este diseno lo resuelve con Google OAuth por la regla obligatoria del prompt.  
51. Debe existir apartado de ofertas con imagen, fecha de inicio, fecha de finalizacion y ofertas destacadas en la pagina principal.  
52. Debe incluir boton/formulario hacia WhatsApp, SEO orientado a tecnicos y busquedas como "refrigeracion", formulario de cotizacion previo a compra y capacidad de activar mantenimiento del sitio.  
53. Debe incluir una calculadora publica de capacidad de aire acondicionado en BTU para orientar al cliente antes de solicitar una compra o cotizacion.  
**1.2 Supuestos**  
- El sitio publico no requiere sesion para navegar catalogo, servicios, trabajos, ofertas, contacto y SEO.  
- El unico metodo de autenticacion sera **Google OAuth 2.0**. Aunque el DOCX menciona usuario/contrasena para admin, se prioriza la regla no negociable del prompt.  
- Los usuarios nuevos registrados por Google reciben rol cliente.  
- Solo un super_admin puede promover usuarios a admin.  
- El panel /admin/** requiere rol admin o super_admin.  
- Las imagenes y videos se modelan inicialmente como URLs externas, porque el documento menciona imagenes/URL y no exige almacenamiento propio de archivos.  
- El inventario desde Excel se interpreta como fuente/importacion administrativa; el modelo persistente vive en PostgreSQL.  
- Las cotizaciones se guardan en BD y tambien se notifican por email al negocio.  
- El numero WhatsApp normalizado sera 18093039156, derivado de 809-303-9156.  
- Los precios pueden ser NULL si un producto o servicio requiere cotizacion.  
- La calculadora BTU sera un endpoint publico, sin persistencia en BD, porque su objetivo es orientar al cliente y no crear diagnosticos tecnicos definitivos.  
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANklEQVR4nO3OYQ1AABSAwc8mi5wvlAB6CKCAACr4Z7a7BLfMzFYdAQDwF+da3dX+9QQAgNeuB6fWBdZMUxZ2AAAAAElFTkSuQmCC)  
**2. Arquitectura de la aplicacion Flask**  
**2.1 Arbol de carpetas**  
prae_backend/  
   app/  
     __init__.py  
     config.py  
     extensions.py  
     models/  
       __init__.py  
       mixins.py  
       usuario.py  
       catalogo.py  
       servicios.py  
       trabajos.py  
       testimonios.py  
       ofertas.py  
       cotizaciones.py  
       configuracion.py  
       refresh_token.py  
     schemas/  
       __init__.py  
       usuario_schema.py  
       producto_schema.py  
       categoria_schema.py  
       servicio_schema.py  
       oferta_schema.py  
       cotizacion_schema.py  
       testimonio_schema.py  
       configuracion_schema.py  
       calculadora_btu_schema.py  
     blueprints/  
       auth/  
         __init__.py  
         routes.py  
       catalogo/  
        __init__.py  
         routes.py  
       servicios/  
         __init__.py  
         routes.py  
       ofertas/  
         __init__.py  
         routes.py  
       cotizaciones/  
         __init__.py  
         routes.py  
       admin/  
         __init__.py  
         routes.py  
       config/  
         __init__.py  
         routes.py  
       calculadora/  
         __init__.py  
         routes.py  
     services/  
       auth_service.py  
       token_service.py  
       catalogo_service.py  
       servicio_service.py  
       oferta_service.py  
       cotizacion_service.py  
       calculadora_btu_service.py  
       email_service.py  
       whatsapp_service.py  
       seo_service.py  
     repositories/  
       usuario_repository.py  
       producto_repository.py  
       oferta_repository.py  
       cotizacion_repository.py  
     security/  
       decorators.py  
       cookies.py  
       oauth.py  
     errors.py  
   migrations/  
   tests/  
     test_auth.py  
     test_catalogo.py  
     test_admin_roles.py  
     test_cotizaciones.py  
     test_calculadora_btu.py  
   wsgi.py  
   requirements.txt  
   .env.example  
   
**2.2 Diagrama de capas**  
Cliente web / app responsive  
         |  
         v  
 Blueprint Flask  
         |  
         v  
 Schema Marshmallow/Pydantic: validacion y serializacion  
         |  
         v  
 Service: reglas de negocio, permisos, email, WhatsApp, OAuth  
         |  
         v  
 Repository / SQLAlchemy ORM  
         |  
         v  
 PostgreSQL 15+  
   
**2.3 Configuracion por entorno**  
# app/config.py  
 from datetime import timedelta  
 import os  
   
   
 class Config:  
     SQLALCHEMY_DATABASE_URI = os.environ["DATABASE_URL"]  
     SQLALCHEMY_TRACK_MODIFICATIONS = False  
   
     JWT_SECRET = os.environ["JWT_SECRET"]  
     JWT_ACCESS_TTL = timedelta(minutes=15)  
     REFRESH_TOKEN_TTL = timedelta(days=30)  
   
     GOOGLE_CLIENT_ID = os.environ["GOOGLE_CLIENT_ID"]  
     GOOGLE_CLIENT_SECRET = os.environ["GOOGLE_CLIENT_SECRET"]  
     GOOGLE_REDIRECT_URI = os.environ["GOOGLE_REDIRECT_URI"]  
   
     FRONTEND_URL = os.environ["FRONTEND_URL"]  
     WHATSAPP_NUMBER = os.getenv("WHATSAPP_NUMBER", "18093039156")  
   
     SESSION_COOKIE_HTTPONLY = True  
     SESSION_COOKIE_SECURE = True  
     SESSION_COOKIE_SAMESITE = "Lax"  
   
     RATELIMIT_STORAGE_URI = os.getenv("RATELIMIT_STORAGE_URI", "memory://")  
   
   
 class DevConfig(Config):  
     DEBUG = True  
     SESSION_COOKIE_SECURE = False  
   
   
 class ProdConfig(Config):  
     DEBUG = False  
   
# app/__init__.py  
 from flask import Flask  
 from .config import DevConfig, ProdConfig  
 from .extensions import db, migrate, cors, limiter, oauth  
   
   
 def create_app(config_object=None):  
     app = Flask(__name__)  
     app.config.from_object(config_object or ProdConfig)  
   
     db.init_app(app)  
     migrate.init_app(app, db)  
     cors.init_app(app, supports_credentials=True, origins=[app.config["FRONTEND_URL"]])  
     limiter.init_app(app)  
     oauth.init_app(app)  
   
     from app.blueprints.auth import auth_bp  
     from app.blueprints.catalogo import catalogo_bp  
     from app.blueprints.servicios import servicios_bp  
     from app.blueprints.ofertas import ofertas_bp  
     from app.blueprints.cotizaciones import cotizaciones_bp  
     from app.blueprints.admin import admin_bp  
     from app.blueprints.config import config_bp  
     from app.blueprints.calculadora import calculadora_bp  
   
     app.register_blueprint(auth_bp, url_prefix="/auth")  
     app.register_blueprint(catalogo_bp, url_prefix="/catalogo")  
     app.register_blueprint(servicios_bp, url_prefix="/servicios")  
     app.register_blueprint(ofertas_bp, url_prefix="/ofertas")  
     app.register_blueprint(cotizaciones_bp, url_prefix="/cotizaciones")  
     app.register_blueprint(admin_bp, url_prefix="/admin")  
     app.register_blueprint(config_bp, url_prefix="/config")  
     app.register_blueprint(calculadora_bp, url_prefix="/api")  
   
     return app  
   
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANUlEQVR4nO3OQQmAABRAsSd4NIGBzPXBmAawhhW8ibAl2DIze3UGAMBf3Gu1VcfXEwAAXrsehaQEN+8fLHEAAAAASUVORK5CYII=)  
**3. Modelo Entidad-Relacion (MER)**  
**3.1 Entidades y reglas principales**  
| | | | |  
|-|-|-|-|  
| **Entidad** | **Atributos principales** | **Relaciones** | **Reglas** |   
| usuario | id, google_sub, email, nombre, avatar_url, rol, activo | 1..N con refresh_token; 0..N con testimonio, cotizacion, mensaje_contacto | google_sub y email unicos. Rol por defecto cliente. |   
| categoria | id, nombre, slug, descripcion, activa | 1..N con producto | slug unico. |   
| producto | id, categoria_id, nombre, slug, descripcion, precio, disponibilidad, url_externa, SEO | N..1 con categoria; 1..N con producto_imagen; N..M con oferta | precio >= 0, slug unico, disponibilidad controlada por enum. |   
| producto_imagen | id, producto_id, url, alt_text, orden, es_principal | N..1 con producto | Se elimina en cascada con el producto. |   
| servicio | id, nombre, slug, descripcion_corta, descripcion_larga, SEO, activo | 1..N con servicio_imagen; 0..N con trabajo_realizado; 0..N con cotizacion_item | slug unico. |   
| servicio_imagen | id, servicio_id, url, alt_text, orden | N..1 con servicio | Cascada con el servicio. |   
| trabajo_realizado | id, servicio_id, titulo, slug, descripcion, fecha_realizacion, SEO | N..1 opcional con servicio; 1..N con trabajo_media | Puede existir sin servicio asociado. |   
| trabajo_media | id, trabajo_id, tipo, url, thumbnail_url, alt_text, orden | N..1 con trabajo_realizado | tipo en imagen o video. |   
| testimonio | id, usuario_id, nombre_publico, comentario, calificacion, estado, moderado_por | N..1 con usuario; N..1 opcional con moderador | calificacion entre 1 y 5. Estado inicia pendiente. |   
| oferta | id, titulo, slug, descripcion, imagen_url, fecha_inicio, fecha_fin, destacada, SEO | N..M con producto | fecha_fin >= fecha_inicio. |   
| oferta_producto | oferta_id, producto_id, precio_oferta | Tabla asociativa N..M | PK compuesta; precio_oferta >= 0. |   
| cotizacion | id, usuario_id, datos de contacto, mensaje, estado, total_estimado | 1..N con cotizacion_item; N..1 opcional con usuario | Guarda solicitud y dispara email. |   
| cotizacion_item | id, cotizacion_id, producto_id, servicio_id, descripcion, cantidad, precio_referencial | N..1 con cotizacion; opcional a producto o servicio | Debe tener producto, servicio o descripcion manual. |   
| configuracion_sitio | id, marca, contacto, horario, colores, SEO, mantenimiento | 1..N con red_social | Singleton por singleton_key. |   
| red_social | id, configuracion_sitio_id, nombre, url, handle, activo, orden | N..1 con configuracion_sitio | TikTok, Facebook, WhatsApp. |   
| mensaje_contacto | id, usuario_id, nombre, email, telefono, mensaje, estado | N..1 opcional con usuario | Captura mensajes generales. |   
| refresh_token | id, usuario_id, token_hash, jti, expires_at, revoked_at | N..1 con usuario | Token rotativo, token_hash y jti unicos. |   
   
**3.2 Diagrama MER en ASCII**  
usuario 1..1 ---- 0..N refresh_token  
 usuario 0..1 ---- 0..N cotizacion  
 usuario 0..1 ---- 0..N testimonio  
 usuario 0..1 ---- 0..N mensaje_contacto  
   
 categoria 1..1 ---- 0..N producto  
 producto 1..1 ---- 0..N producto_imagen  
 producto 0..N ---- N..M oferta  
 oferta 1..1 ---- 0..N oferta_producto  
 producto 1..1 ---- 0..N oferta_producto  
   
 servicio 1..1 ---- 0..N servicio_imagen  
 servicio 0..1 ---- 0..N trabajo_realizado  
 trabajo_realizado 1..1 ---- 0..N trabajo_media  
   
 cotizacion 1..1 ---- 1..N cotizacion_item  
 producto 0..1 ---- 0..N cotizacion_item  
 servicio 0..1 ---- 0..N cotizacion_item  
   
 configuracion_sitio 1..1 ---- 0..N red_social  
   
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAM0lEQVR4nO3KsQ0AIRAEsUW6Qij1KvnevhMSYmKQ7GiCGd09k3wBAOAVf+2o4wYAwE1qAdYuAy151mgcAAAAAElFTkSuQmCC)  
**4. Modelo fisico**  
| | | | | | | | | |  
|-|-|-|-|-|-|-|-|-|  
| **Tabla** | **Columna** | **Tipo PostgreSQL** | **PK** | **FK a** | **NULL** | **UNIQUE** | **DEFAULT** | **Comentario** |   
| usuario | id | BIGSERIAL | Si |   | No | Si |   | Identificador. |   
| usuario | google_sub | VARCHAR(128) | No |   | No | Si |   | ID unico de Google. |   
| usuario | email | VARCHAR(255) | No |   | No | Si |   | Email de Google. |   
| usuario | nombre | VARCHAR(160) | No |   | No | No |   | Nombre visible. |   
| usuario | avatar_url | TEXT | No |   | Si | No |   | Foto de Google. |   
| usuario | rol | rol_usuario | No |   | No | No | 'cliente' | Rol. |   
| usuario | activo | BOOLEAN | No |   | No | No | true | Bloqueo logico. |   
| usuario | ultimo_login_at | TIMESTAMPTZ | No |   | Si | No |   | Ultimo acceso. |   
| categoria | id | BIGSERIAL | Si |   | No | Si |   | Identificador. |   
| categoria | nombre | VARCHAR(120) | No |   | No | No |   | Nombre publico. |   
| categoria | slug | VARCHAR(140) | No |   | No | Si |   | URL SEO. |   
| categoria | descripcion | TEXT | No |   | Si | No |   | Descripcion. |   
| producto | id | BIGSERIAL | Si |   | No | Si |   | Identificador. |   
| producto | categoria_id | BIGINT | No | categoria.id | Si | No |   | Categoria. |   
| producto | nombre | VARCHAR(180) | No |   | No | No |   | Nombre. |   
| producto | slug | VARCHAR(200) | No |   | No | Si |   | URL SEO. |   
| producto | descripcion | TEXT | No |   | Si | No |   | Detalle. |   
| producto | precio | NUMERIC(12,2) | No |   | Si | No |   | CHECK precio >= 0. |   
| producto | disponibilidad | estado_disponibilidad | No |   | No | No | 'disponible' | Estado visible. |   
| producto | url_externa | TEXT | No |   | Si | No |   | URL de referencia. |   
| producto_imagen | id | BIGSERIAL | Si |   | No | Si |   | Identificador. |   
| producto_imagen | producto_id | BIGINT | No | producto.id | No | No |   | Cascada. |   
| producto_imagen | url | TEXT | No |   | No | No |   | Imagen remota. |   
| servicio | id | BIGSERIAL | Si |   | No | Si |   | Identificador. |   
| servicio | nombre | VARCHAR(160) | No |   | No | No |   | Reparacion, mantenimiento, venta, asesoria. |   
| servicio | slug | VARCHAR(180) | No |   | No | Si |   | URL SEO. |   
| servicio | descripcion_corta | TEXT | No |   | No | No |   | Resumen. |   
| servicio | descripcion_larga | TEXT | No |   | Si | No |   | Detalle. |   
| trabajo_realizado | id | BIGSERIAL | Si |   | No | Si |   | Caso/galeria. |   
| trabajo_realizado | servicio_id | BIGINT | No | servicio.id | Si | No |   | Servicio relacionado. |   
| trabajo_media | id | BIGSERIAL | Si |   | No | Si |   | Media. |   
| trabajo_media | tipo | tipo_media | No |   | No | No |   | imagen o video. |   
| testimonio | id | BIGSERIAL | Si |   | No | Si |   | Comentario. |   
| testimonio | usuario_id | BIGINT | No | usuario.id | Si | No |   | Cliente autenticado; SET NULL si se borra. |   
| testimonio | estado | estado_testimonio | No |   | No | No | 'pendiente' | Moderacion. |   
| oferta | id | BIGSERIAL | Si |   | No | Si |   | Oferta. |   
| oferta | slug | VARCHAR(180) | No |   | No | Si |   | URL SEO. |   
| oferta | fecha_inicio | DATE | No |   | No | No |   | Inicio. |   
| oferta | fecha_fin | DATE | No |   | No | No |   | Fin coherente. |   
| oferta_producto | oferta_id | BIGINT | Si | oferta.id | No | No |   | Asociativa. |   
| oferta_producto | producto_id | BIGINT | Si | producto.id | No | No |   | Asociativa. |   
| cotizacion | id | BIGSERIAL | Si |   | No | Si |   | Solicitud. |   
| cotizacion | usuario_id | BIGINT | No | usuario.id | Si | No |   | Cliente opcional. |   
| cotizacion | estado | estado_cotizacion | No |   | No | No | 'nueva' | Flujo comercial. |   
| cotizacion_item | id | BIGSERIAL | Si |   | No | Si |   | Item solicitado. |   
| cotizacion_item | cotizacion_id | BIGINT | No | cotizacion.id | No | No |   | Cascada. |   
| configuracion_sitio | id | BIGSERIAL | Si |   | No | Si |   | Config singleton. |   
| configuracion_sitio | singleton_key | BOOLEAN | No |   | No | Si | true | Fuerza una fila. |   
| red_social | id | BIGSERIAL | Si |   | No | Si |   | Red. |   
| red_social | configuracion_sitio_id | BIGINT | No | configuracion_sitio.id | No | No |   | Relacion con config. |   
| mensaje_contacto | id | BIGSERIAL | Si |   | No | Si |   | Mensaje general. |   
| refresh_token | id | BIGSERIAL | Si |   | No | Si |   | Token rotativo. |   
| refresh_token | token_hash | CHAR(64) | No |   | No | Si |   | Hash SHA-256. |   
| Todas | created_at | TIMESTAMPTZ | No |   | No | No | now() | Auditoria. |   
| Todas | updated_at | TIMESTAMPTZ | No |   | No | No | now() | Trigger set_updated_at(). |   
   
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANUlEQVR4nO3OMQ2AABAAsSNhZscZXlheJwqQgQU2QtIq6DIze3UGAMBf3Gu1VcfXEwAAXrseop8EQrmJduIAAAAASUVORK5CYII=)  
**5. Script SQL completo para PostgreSQL 15+**  
CREATE DATABASE prae_db;  
   
 -- En psql:  
 -- \connect prae_db  
   
 CREATE EXTENSION IF NOT EXISTS pg_trgm;  
   
 CREATE TYPE rol_usuario AS ENUM ('cliente', 'admin', 'super_admin');  
 CREATE TYPE estado_disponibilidad AS ENUM ('disponible', 'no_disponible', 'bajo_pedido');  
 CREATE TYPE estado_cotizacion AS ENUM ('nueva', 'en_revision', 'respondida', 'cerrada', 'cancelada');  
 CREATE TYPE estado_testimonio AS ENUM ('pendiente', 'aprobado', 'rechazado');  
 CREATE TYPE tipo_media AS ENUM ('imagen', 'video');  
   
 CREATE OR REPLACE FUNCTION set_updated_at()  
 RETURNS TRIGGER AS $$  
 BEGIN  
     NEW.updated_at = now();  
     RETURN NEW;  
 END;  
 $$ LANGUAGE plpgsql;  
   
 CREATE TABLE usuario (  
     id BIGSERIAL PRIMARY KEY,  
     google_sub VARCHAR(128) NOT NULL UNIQUE,  
     email VARCHAR(255) NOT NULL UNIQUE,  
     nombre VARCHAR(160) NOT NULL,  
     avatar_url TEXT,  
     rol rol_usuario NOT NULL DEFAULT 'cliente',  
     activo BOOLEAN NOT NULL DEFAULT true,  
     ultimo_login_at TIMESTAMPTZ,  
     created_at TIMESTAMPTZ NOT NULL DEFAULT now(),  
     updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),  
     CHECK (email <> ''),  
     CHECK (nombre <> '')  
 );  
   
 CREATE TABLE categoria (  
     id BIGSERIAL PRIMARY KEY,  
     nombre VARCHAR(120) NOT NULL,  
     slug VARCHAR(140) NOT NULL UNIQUE,  
     descripcion TEXT,  
     activa BOOLEAN NOT NULL DEFAULT true,  
     orden INTEGER NOT NULL DEFAULT 0,  
     meta_title VARCHAR(180),  
     meta_description VARCHAR(260),  
     keywords TEXT,  
     created_at TIMESTAMPTZ NOT NULL DEFAULT now(),  
     updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),  
     CHECK (nombre <> ''),  
     CHECK (slug <> '')  
 );  
   
 CREATE TABLE producto (  
     id BIGSERIAL PRIMARY KEY,  
     categoria_id BIGINT REFERENCES categoria(id)  
         ON UPDATE CASCADE  
         ON DELETE SET NULL,  
     nombre VARCHAR(180) NOT NULL,  
     slug VARCHAR(200) NOT NULL UNIQUE,  
     descripcion TEXT,  
     precio NUMERIC(12,2),  
     disponibilidad estado_disponibilidad NOT NULL DEFAULT 'disponible',  
     url_externa TEXT,  
     sku VARCHAR(80),  
     activo BOOLEAN NOT NULL DEFAULT true,  
     meta_title VARCHAR(180),  
     meta_description VARCHAR(260),  
     keywords TEXT,  
     created_at TIMESTAMPTZ NOT NULL DEFAULT now(),  
     updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),  
     CHECK (nombre <> ''),  
     CHECK (slug <> ''),  
     CHECK (precio IS NULL OR precio >= 0)  
 );  
   
 CREATE TABLE producto_imagen (  
     id BIGSERIAL PRIMARY KEY,  
     producto_id BIGINT NOT NULL REFERENCES producto(id)  
         ON UPDATE CASCADE  
         ON DELETE CASCADE,  
     url TEXT NOT NULL,  
     alt_text VARCHAR(180),  
     orden INTEGER NOT NULL DEFAULT 0,  
     es_principal BOOLEAN NOT NULL DEFAULT false,  
     created_at TIMESTAMPTZ NOT NULL DEFAULT now(),  
     updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),  
     CHECK (url <> ''),  
     UNIQUE (producto_id, url)  
 );  
   
 CREATE TABLE servicio (  
     id BIGSERIAL PRIMARY KEY,  
     nombre VARCHAR(160) NOT NULL,  
     slug VARCHAR(180) NOT NULL UNIQUE,  
     descripcion_corta TEXT NOT NULL,  
     descripcion_larga TEXT,  
     activo BOOLEAN NOT NULL DEFAULT true,  
     meta_title VARCHAR(180),  
     meta_description VARCHAR(260),  
     keywords TEXT,  
     created_at TIMESTAMPTZ NOT NULL DEFAULT now(),  
     updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),  
     CHECK (nombre <> ''),  
     CHECK (slug <> ''),  
     CHECK (descripcion_corta <> '')  
 );  
   
 CREATE TABLE servicio_imagen (  
     id BIGSERIAL PRIMARY KEY,  
     servicio_id BIGINT NOT NULL REFERENCES servicio(id)  
         ON UPDATE CASCADE  
         ON DELETE CASCADE,  
     url TEXT NOT NULL,  
     alt_text VARCHAR(180),  
     orden INTEGER NOT NULL DEFAULT 0,  
     created_at TIMESTAMPTZ NOT NULL DEFAULT now(),  
     updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),  
     CHECK (url <> ''),  
     UNIQUE (servicio_id, url)  
 );  
   
 CREATE TABLE trabajo_realizado (  
     id BIGSERIAL PRIMARY KEY,  
     servicio_id BIGINT REFERENCES servicio(id)  
         ON UPDATE CASCADE  
         ON DELETE SET NULL,  
     titulo VARCHAR(180) NOT NULL,  
     slug VARCHAR(200) NOT NULL UNIQUE,  
     descripcion TEXT,  
     fecha_realizacion DATE,  
     cliente_nombre VARCHAR(160),  
     activo BOOLEAN NOT NULL DEFAULT true,  
     meta_title VARCHAR(180),  
     meta_description VARCHAR(260),  
     keywords TEXT,  
     created_at TIMESTAMPTZ NOT NULL DEFAULT now(),  
     updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),  
     CHECK (titulo <> ''),  
     CHECK (slug <> '')  
 );  
   
 CREATE TABLE trabajo_media (  
     id BIGSERIAL PRIMARY KEY,  
     trabajo_id BIGINT NOT NULL REFERENCES trabajo_realizado(id)  
         ON UPDATE CASCADE  
         ON DELETE CASCADE,  
     tipo tipo_media NOT NULL,  
     url TEXT NOT NULL,  
     thumbnail_url TEXT,  
     alt_text VARCHAR(180),  
     orden INTEGER NOT NULL DEFAULT 0,  
     created_at TIMESTAMPTZ NOT NULL DEFAULT now(),  
     updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),  
     CHECK (url <> '')  
 );  
   
 CREATE TABLE testimonio (  
     id BIGSERIAL PRIMARY KEY,  
     usuario_id BIGINT REFERENCES usuario(id)  
         ON UPDATE CASCADE  
         ON DELETE SET NULL,  
     nombre_publico VARCHAR(160),  
     comentario TEXT NOT NULL,  
     calificacion SMALLINT,  
     estado estado_testimonio NOT NULL DEFAULT 'pendiente',  
     moderado_por BIGINT REFERENCES usuario(id)  
         ON UPDATE CASCADE  
         ON DELETE SET NULL,  
     moderado_at TIMESTAMPTZ,  
     created_at TIMESTAMPTZ NOT NULL DEFAULT now(),  
     updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),  
     CHECK (comentario <> ''),  
     CHECK (calificacion IS NULL OR calificacion BETWEEN 1 AND 5)  
 );  
   
 CREATE TABLE oferta (  
     id BIGSERIAL PRIMARY KEY,  
     titulo VARCHAR(180) NOT NULL,  
     slug VARCHAR(200) NOT NULL UNIQUE,  
     descripcion TEXT,  
     imagen_url TEXT,  
     fecha_inicio DATE NOT NULL,  
     fecha_fin DATE NOT NULL,  
     destacada BOOLEAN NOT NULL DEFAULT false,  
     activa BOOLEAN NOT NULL DEFAULT true,  
     meta_title VARCHAR(180),  
     meta_description VARCHAR(260),  
     keywords TEXT,  
     created_at TIMESTAMPTZ NOT NULL DEFAULT now(),  
     updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),  
     CHECK (titulo <> ''),  
     CHECK (slug <> ''),  
     CHECK (fecha_fin >= fecha_inicio)  
 );  
   
 CREATE TABLE oferta_producto (  
     oferta_id BIGINT NOT NULL REFERENCES oferta(id)  
         ON UPDATE CASCADE  
         ON DELETE CASCADE,  
     producto_id BIGINT NOT NULL REFERENCES producto(id)  
         ON UPDATE CASCADE  
         ON DELETE CASCADE,  
     precio_oferta NUMERIC(12,2),  
     created_at TIMESTAMPTZ NOT NULL DEFAULT now(),  
     updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),  
     PRIMARY KEY (oferta_id, producto_id),  
     CHECK (precio_oferta IS NULL OR precio_oferta >= 0)  
 );  
   
 CREATE TABLE cotizacion (  
     id BIGSERIAL PRIMARY KEY,  
     usuario_id BIGINT REFERENCES usuario(id)  
         ON UPDATE CASCADE  
         ON DELETE SET NULL,  
     nombre_cliente VARCHAR(160) NOT NULL,  
     email VARCHAR(255),  
     telefono VARCHAR(40),  
     whatsapp VARCHAR(40),  
     mensaje TEXT,  
     canal_origen VARCHAR(40) NOT NULL DEFAULT 'web',  
     estado estado_cotizacion NOT NULL DEFAULT 'nueva',  
     total_estimado NUMERIC(12,2),  
     created_at TIMESTAMPTZ NOT NULL DEFAULT now(),  
     updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),  
     CHECK (nombre_cliente <> ''),  
     CHECK (total_estimado IS NULL OR total_estimado >= 0)  
 );  
   
 CREATE TABLE cotizacion_item (  
     id BIGSERIAL PRIMARY KEY,  
     cotizacion_id BIGINT NOT NULL REFERENCES cotizacion(id)  
         ON UPDATE CASCADE  
         ON DELETE CASCADE,  
     producto_id BIGINT REFERENCES producto(id)  
         ON UPDATE CASCADE  
         ON DELETE SET NULL,  
     servicio_id BIGINT REFERENCES servicio(id)  
         ON UPDATE CASCADE  
         ON DELETE SET NULL,  
     descripcion TEXT,  
     cantidad NUMERIC(10,2) NOT NULL DEFAULT 1,  
     precio_referencial NUMERIC(12,2),  
     created_at TIMESTAMPTZ NOT NULL DEFAULT now(),  
     updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),  
     CHECK (cantidad > 0),  
     CHECK (precio_referencial IS NULL OR precio_referencial >= 0),  
     CHECK (producto_id IS NOT NULL OR servicio_id IS NOT NULL OR descripcion IS NOT NULL)  
 );  
   
 CREATE TABLE configuracion_sitio (  
     id BIGSERIAL PRIMARY KEY,  
     singleton_key BOOLEAN NOT NULL DEFAULT true UNIQUE,  
     nombre_negocio VARCHAR(180) NOT NULL,  
     slogan VARCHAR(220),  
     descripcion TEXT,  
     logo_url TEXT,  
     color_primario VARCHAR(20) NOT NULL DEFAULT '#0b65c2',  
     color_secundario VARCHAR(20) NOT NULL DEFAULT '#ffffff',  
     telefono_principal VARCHAR(40),  
     whatsapp_number VARCHAR(40),  
     email_contacto VARCHAR(255),  
     direccion TEXT,  
     horario TEXT,  
     mantenimiento_activo BOOLEAN NOT NULL DEFAULT false,  
     mantenimiento_mensaje TEXT,  
     meta_title VARCHAR(180),  
     meta_description VARCHAR(260),  
     keywords TEXT,  
     created_at TIMESTAMPTZ NOT NULL DEFAULT now(),  
     updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),  
     CHECK (singleton_key = true),  
     CHECK (nombre_negocio <> '')  
 );  
   
 CREATE TABLE red_social (  
     id BIGSERIAL PRIMARY KEY,  
     configuracion_sitio_id BIGINT NOT NULL REFERENCES configuracion_sitio(id)  
         ON UPDATE CASCADE  
         ON DELETE CASCADE,  
     nombre VARCHAR(80) NOT NULL,  
     url TEXT NOT NULL,  
     handle VARCHAR(120),  
     activa BOOLEAN NOT NULL DEFAULT true,  
     orden INTEGER NOT NULL DEFAULT 0,  
     created_at TIMESTAMPTZ NOT NULL DEFAULT now(),  
     updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),  
     CHECK (nombre <> ''),  
     CHECK (url <> ''),  
     UNIQUE (configuracion_sitio_id, nombre)  
 );  
   
 CREATE TABLE mensaje_contacto (  
     id BIGSERIAL PRIMARY KEY,  
     usuario_id BIGINT REFERENCES usuario(id)  
         ON UPDATE CASCADE  
         ON DELETE SET NULL,  
     nombre VARCHAR(160) NOT NULL,  
     email VARCHAR(255),  
     telefono VARCHAR(40),  
     mensaje TEXT NOT NULL,  
     estado VARCHAR(40) NOT NULL DEFAULT 'nuevo',  
     created_at TIMESTAMPTZ NOT NULL DEFAULT now(),  
     updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),  
     CHECK (nombre <> ''),  
     CHECK (mensaje <> '')  
 );  
   
 CREATE TABLE refresh_token (  
     id BIGSERIAL PRIMARY KEY,  
     usuario_id BIGINT NOT NULL REFERENCES usuario(id)  
         ON UPDATE CASCADE  
         ON DELETE CASCADE,  
     token_hash CHAR(64) NOT NULL UNIQUE,  
     jti VARCHAR(80) NOT NULL UNIQUE,  
     expires_at TIMESTAMPTZ NOT NULL,  
     revoked_at TIMESTAMPTZ,  
     replaced_by_jti VARCHAR(80),  
     ip_address INET,  
     user_agent TEXT,  
     created_at TIMESTAMPTZ NOT NULL DEFAULT now(),  
     updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),  
     CHECK (expires_at > created_at)  
 );  
   
 CREATE INDEX idx_usuario_google_sub ON usuario (google_sub);  
 CREATE INDEX idx_usuario_rol ON usuario (rol);  
   
 CREATE INDEX idx_categoria_slug ON categoria (slug);  
   
 CREATE INDEX idx_producto_slug ON producto (slug);  
 CREATE INDEX idx_producto_categoria_id ON producto (categoria_id);  
 CREATE INDEX idx_producto_disponibilidad ON producto (disponibilidad);  
 CREATE INDEX idx_producto_activo ON producto (activo);  
 CREATE INDEX idx_producto_search ON producto  
     USING GIN (to_tsvector('spanish', coalesce(nombre, '') || ' ' || coalesce(descripcion, '')));  
 CREATE INDEX idx_producto_nombre_trgm ON producto USING GIN (nombre gin_trgm_ops);  
   
 CREATE INDEX idx_servicio_slug ON servicio (slug);  
 CREATE INDEX idx_servicio_search ON servicio  
     USING GIN (to_tsvector('spanish', coalesce(nombre, '') || ' ' || coalesce(descripcion_corta, '') || ' ' || coalesce(descripcion_larga, '')));  
   
 CREATE INDEX idx_trabajo_slug ON trabajo_realizado (slug);  
 CREATE INDEX idx_trabajo_servicio_id ON trabajo_realizado (servicio_id);  
   
 CREATE INDEX idx_testimonio_estado ON testimonio (estado);  
 CREATE INDEX idx_testimonio_usuario_id ON testimonio (usuario_id);  
   
 CREATE INDEX idx_oferta_slug ON oferta (slug);  
 CREATE INDEX idx_oferta_fechas ON oferta (fecha_inicio, fecha_fin);  
 CREATE INDEX idx_oferta_destacada ON oferta (destacada) WHERE destacada = true;  
   
 CREATE INDEX idx_cotizacion_usuario_id ON cotizacion (usuario_id);  
 CREATE INDEX idx_cotizacion_estado ON cotizacion (estado);  
 CREATE INDEX idx_cotizacion_created_at ON cotizacion (created_at);  
   
 CREATE INDEX idx_refresh_token_usuario_id ON refresh_token (usuario_id);  
 CREATE INDEX idx_refresh_token_expires_at ON refresh_token (expires_at);  
 CREATE INDEX idx_refresh_token_revoked_at ON refresh_token (revoked_at);  
   
 CREATE TRIGGER trg_usuario_updated_at BEFORE UPDATE ON usuario  
 FOR EACH ROW EXECUTE FUNCTION set_updated_at();  
 CREATE TRIGGER trg_categoria_updated_at BEFORE UPDATE ON categoria  
 FOR EACH ROW EXECUTE FUNCTION set_updated_at();  
 CREATE TRIGGER trg_producto_updated_at BEFORE UPDATE ON producto  
 FOR EACH ROW EXECUTE FUNCTION set_updated_at();  
 CREATE TRIGGER trg_producto_imagen_updated_at BEFORE UPDATE ON producto_imagen  
 FOR EACH ROW EXECUTE FUNCTION set_updated_at();  
 CREATE TRIGGER trg_servicio_updated_at BEFORE UPDATE ON servicio  
 FOR EACH ROW EXECUTE FUNCTION set_updated_at();  
 CREATE TRIGGER trg_servicio_imagen_updated_at BEFORE UPDATE ON servicio_imagen  
 FOR EACH ROW EXECUTE FUNCTION set_updated_at();  
 CREATE TRIGGER trg_trabajo_realizado_updated_at BEFORE UPDATE ON trabajo_realizado  
 FOR EACH ROW EXECUTE FUNCTION set_updated_at();  
 CREATE TRIGGER trg_trabajo_media_updated_at BEFORE UPDATE ON trabajo_media  
 FOR EACH ROW EXECUTE FUNCTION set_updated_at();  
 CREATE TRIGGER trg_testimonio_updated_at BEFORE UPDATE ON testimonio  
 FOR EACH ROW EXECUTE FUNCTION set_updated_at();  
 CREATE TRIGGER trg_oferta_updated_at BEFORE UPDATE ON oferta  
 FOR EACH ROW EXECUTE FUNCTION set_updated_at();  
 CREATE TRIGGER trg_oferta_producto_updated_at BEFORE UPDATE ON oferta_producto  
 FOR EACH ROW EXECUTE FUNCTION set_updated_at();  
 CREATE TRIGGER trg_cotizacion_updated_at BEFORE UPDATE ON cotizacion  
 FOR EACH ROW EXECUTE FUNCTION set_updated_at();  
 CREATE TRIGGER trg_cotizacion_item_updated_at BEFORE UPDATE ON cotizacion_item  
 FOR EACH ROW EXECUTE FUNCTION set_updated_at();  
 CREATE TRIGGER trg_configuracion_sitio_updated_at BEFORE UPDATE ON configuracion_sitio  
 FOR EACH ROW EXECUTE FUNCTION set_updated_at();  
 CREATE TRIGGER trg_red_social_updated_at BEFORE UPDATE ON red_social  
 FOR EACH ROW EXECUTE FUNCTION set_updated_at();  
 CREATE TRIGGER trg_mensaje_contacto_updated_at BEFORE UPDATE ON mensaje_contacto  
 FOR EACH ROW EXECUTE FUNCTION set_updated_at();  
 CREATE TRIGGER trg_refresh_token_updated_at BEFORE UPDATE ON refresh_token  
 FOR EACH ROW EXECUTE FUNCTION set_updated_at();  
   
 INSERT INTO usuario (id, google_sub, email, nombre, rol)  
 VALUES (1, 'seed-super-admin-google-sub', 'admin@prae.local', 'Super Admin PRAE', 'super_admin');  
   
 INSERT INTO categoria (id, nombre, slug, descripcion, keywords)  
 VALUES  
     (1, 'Aires acondicionados', 'aires-acondicionados', 'Equipos, piezas y accesorios para climatizacion residencial.', 'aires acondicionados, climatizacion, refrigeracion'),  
     (2, 'Neveras y refrigeradores', 'neveras-refrigeradores', 'Neveras, refrigeradores y piezas para frio residencial.', 'neveras, refrigeradores, piezas refrigeracion');  
   
 INSERT INTO producto (id, categoria_id, nombre, slug, descripcion, precio, disponibilidad, keywords)  
 VALUES  
     (1, 1, 'Filtro para aire acondicionado', 'filtro-aire-acondicionado', 'Filtro de reemplazo para equipos residenciales.', 850.00, 'disponible', 'filtro, aire acondicionado, mantenimiento'),  
     (2, 1, 'Capacitor para aire acondicionado', 'capacitor-aire-acondicionado', 'Capacitor para reparacion de unidades residenciales.', 1200.00, 'disponible', 'capacitor, reparacion, climatizacion'),  
     (3, 2, 'Termostato para nevera', 'termostato-nevera', 'Termostato compatible con neveras residenciales.', 1500.00, 'bajo_pedido', 'termostato, nevera, refrigeracion');  
   
 INSERT INTO producto_imagen (producto_id, url, alt_text, orden, es_principal)  
 VALUES  
     (1, 'https://example.com/img/filtro-aire.jpg', 'Filtro para aire acondicionado', 1, true),  
     (2, 'https://example.com/img/capacitor-aire.jpg', 'Capacitor para aire acondicionado', 1, true),  
     (3, 'https://example.com/img/termostato-nevera.jpg', 'Termostato para nevera', 1, true);  
   
 INSERT INTO servicio (id, nombre, slug, descripcion_corta, descripcion_larga, keywords)  
 VALUES  
     (1, 'Mantenimiento residencial', 'mantenimiento-residencial', 'Limpieza y revision preventiva de equipos residenciales.', 'Servicio de mantenimiento para mejorar rendimiento, confort y vida util del equipo.', 'mantenimiento, aire acondicionado, refrigeracion'),  
     (2, 'Reparacion y asesoria', 'reparacion-asesoria', 'Diagnostico, reparacion y recomendacion antes de comprar.', 'Asesoria para elegir la mejor solucion segun necesidad, presupuesto y espacio.', 'reparacion, asesoria, tecnicos refrigeracion');  
   
 INSERT INTO servicio_imagen (servicio_id, url, alt_text, orden)  
 VALUES  
     (1, 'https://example.com/img/mantenimiento.jpg', 'Tecnico realizando mantenimiento', 1),  
     (2, 'https://example.com/img/reparacion.jpg', 'Servicio de reparacion residencial', 1);  
   
 INSERT INTO oferta (id, titulo, slug, descripcion, imagen_url, fecha_inicio, fecha_fin, destacada, keywords)  
 VALUES  
     (1, 'Oferta de mantenimiento preventivo', 'oferta-mantenimiento-preventivo', 'Promocion por tiempo limitado para mantenimiento residencial.', 'https://example.com/img/oferta-mantenimiento.jpg', CURRENT_DATE, CURRENT_DATE + INTERVAL '30 days', true, 'oferta, mantenimiento, aire acondicionado');  
   
 INSERT INTO oferta_producto (oferta_id, producto_id, precio_oferta)  
 VALUES  
     (1, 1, 700.00);  
   
 INSERT INTO testimonio (usuario_id, nombre_publico, comentario, calificacion, estado, moderado_por, moderado_at)  
 VALUES  
     (NULL, 'Cliente residencial', 'Excelente servicio y buena orientacion antes de comprar.', 5, 'aprobado', 1, now());  
   
 INSERT INTO cotizacion (usuario_id, nombre_cliente, email, telefono, whatsapp, mensaje, estado)  
 VALUES  
     (NULL, 'Cliente de prueba', 'cliente@example.com', '809-000-0000', '18090000000', 'Necesito cotizar mantenimiento para un aire residencial.', 'nueva');  
   
 INSERT INTO cotizacion_item (cotizacion_id, servicio_id, descripcion, cantidad)  
 VALUES  
     (1, 1, 'Mantenimiento de aire acondicionado residencial', 1);  
   
 INSERT INTO configuracion_sitio (  
     id,  
     nombre_negocio,  
     slogan,  
     descripcion,  
     telefono_principal,  
     whatsapp_number,  
     email_contacto,  
    direccion,  
     horario,  
     meta_title,  
     meta_description,  
     keywords  
 )  
 VALUES (  
     1,  
     'PRAE Refrigeracion y Climatizacion Espinal',  
     'Tu comodidad y confort es nuestra satisfaccion',  
     'Venta, reparacion, mantenimiento y asesoria de aires acondicionados, neveras y piezas para clientes residenciales.',  
     '809-303-9156',  
     '18093039156',  
     'espinalclimatizacion@gmail.com',  
     'Ubicacion pendiente de confirmar',  
     'Lunes a sabado de 8:00 a. m. a 6:00 p. m. Domingo cerrado.',  
     'PRAE Refrigeracion y Climatizacion Espinal',  
     'Servicios residenciales de refrigeracion, climatizacion, reparacion, mantenimiento y venta de piezas.',  
     'refrigeracion, climatizacion, tecnicos, aires acondicionados, neveras'  
 );  
   
 INSERT INTO red_social (configuracion_sitio_id, nombre, url, handle, orden)  
 VALUES  
     (1, 'TikTok', 'https://www.tiktok.com/@prae', '@prae', 1),  
     (1, 'Facebook', 'https://www.facebook.com/prae', 'PRAE', 2),  
     (1, 'WhatsApp', 'https://wa.me/18093039156', '809-303-9156', 3);  
   
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANklEQVR4nO3OMQ2AABAAsSNBACP6MMH6NpGACyywEZJWQZeZ2aszAAD+4l6rrTq+ngAA8Nr1AL+6BElk4wV6AAAAAElFTkSuQmCC)  
**6. Modelos SQLAlchemy**  
# app/extensions.py  
 from authlib.integrations.flask_client import OAuth  
 from flask_cors import CORS  
 from flask_limiter import Limiter  
 from flask_limiter.util import get_remote_address  
 from flask_migrate import Migrate  
 from flask_sqlalchemy import SQLAlchemy  
   
 db = SQLAlchemy()  
 migrate = Migrate()  
 cors = CORS()  
 oauth = OAuth()  
 limiter = Limiter(key_func=get_remote_address)  
   
# app/models/mixins.py  
 from datetime import datetime, timezone  
 from app.extensions import db  
   
   
 class TimestampMixin:  
     created_at = db.Column(db.DateTime(timezone=True), nullable=False, default=lambda: datetime.now(timezone.utc))  
     updated_at = db.Column(  
         db.DateTime(timezone=True),  
         nullable=False,  
         default=lambda: datetime.now(timezone.utc),  
         onupdate=lambda: datetime.now(timezone.utc),  
     )  
   
# app/models/usuario.py  
 from app.extensions import db  
 from app.models.mixins import TimestampMixin  
   
   
 class Usuario(TimestampMixin, db.Model):  
     __tablename__ = "usuario"  
   
     id = db.Column(db.BigInteger, primary_key=True)  
     google_sub = db.Column(db.String(128), nullable=False, unique=True, index=True)  
     email = db.Column(db.String(255), nullable=False, unique=True)  
     nombre = db.Column(db.String(160), nullable=False)  
     avatar_url = db.Column(db.Text)  
     rol = db.Column(db.Enum("cliente", "admin", "super_admin", name="rol_usuario"), nullable=False, default="cliente")  
     activo = db.Column(db.Boolean, nullable=False, default=True)  
     ultimo_login_at = db.Column(db.DateTime(timezone=True))  
   
     refresh_tokens = db.relationship("RefreshToken", back_populates="usuario", cascade="all, delete-orphan")  
     testimonios = db.relationship("Testimonio", foreign_keys="Testimonio.usuario_id", back_populates="usuario")  
     cotizaciones = db.relationship("Cotizacion", back_populates="usuario")  
     mensajes_contacto = db.relationship("MensajeContacto", back_populates="usuario")  
   
# app/models/catalogo.py  
 from app.extensions import db  
 from app.models.mixins import TimestampMixin  
   
   
 class Categoria(TimestampMixin, db.Model):  
     __tablename__ = "categoria"  
   
     id = db.Column(db.BigInteger, primary_key=True)  
     nombre = db.Column(db.String(120), nullable=False)  
     slug = db.Column(db.String(140), nullable=False, unique=True, index=True)  
     descripcion = db.Column(db.Text)  
     activa = db.Column(db.Boolean, nullable=False, default=True)  
     orden = db.Column(db.Integer, nullable=False, default=0)  
     meta_title = db.Column(db.String(180))  
     meta_description = db.Column(db.String(260))  
     keywords = db.Column(db.Text)  
   
     productos = db.relationship("Producto", back_populates="categoria")  
   
   
 class Producto(TimestampMixin, db.Model):  
     __tablename__ = "producto"  
   
     id = db.Column(db.BigInteger, primary_key=True)  
     categoria_id = db.Column(db.BigInteger, db.ForeignKey("categoria.id", ondelete="SET NULL", onupdate="CASCADE"), index=True)  
     nombre = db.Column(db.String(180), nullable=False)  
     slug = db.Column(db.String(200), nullable=False, unique=True, index=True)  
     descripcion = db.Column(db.Text)  
     precio = db.Column(db.Numeric(12, 2))  
     disponibilidad = db.Column(  
         db.Enum("disponible", "no_disponible", "bajo_pedido", name="estado_disponibilidad"),  
         nullable=False,  
         default="disponible",  
         index=True,  
     )  
     url_externa = db.Column(db.Text)  
     sku = db.Column(db.String(80))  
     activo = db.Column(db.Boolean, nullable=False, default=True)  
     meta_title = db.Column(db.String(180))  
     meta_description = db.Column(db.String(260))  
     keywords = db.Column(db.Text)  
   
     categoria = db.relationship("Categoria", back_populates="productos")  
     imagenes = db.relationship("ProductoImagen", back_populates="producto", cascade="all, delete-orphan")  
     ofertas = db.relationship("OfertaProducto", back_populates="producto", cascade="all, delete-orphan")  
   
     __table_args__ = (  
         db.CheckConstraint("precio IS NULL OR precio >= 0", name="ck_producto_precio_nonnegative"),  
     )  
   
   
 class ProductoImagen(TimestampMixin, db.Model):  
     __tablename__ = "producto_imagen"  
   
     id = db.Column(db.BigInteger, primary_key=True)  
     producto_id = db.Column(db.BigInteger, db.ForeignKey("producto.id", ondelete="CASCADE", onupdate="CASCADE"), nullable=False)  
     url = db.Column(db.Text, nullable=False)  
     alt_text = db.Column(db.String(180))  
     orden = db.Column(db.Integer, nullable=False, default=0)  
     es_principal = db.Column(db.Boolean, nullable=False, default=False)  
   
     producto = db.relationship("Producto", back_populates="imagenes")  
   
     __table_args__ = (  
         db.UniqueConstraint("producto_id", "url", name="uq_producto_imagen_url"),  
     )  
   
# app/models/servicios.py  
 from app.extensions import db  
 from app.models.mixins import TimestampMixin  
   
   
 class Servicio(TimestampMixin, db.Model):  
     __tablename__ = "servicio"  
   
     id = db.Column(db.BigInteger, primary_key=True)  
     nombre = db.Column(db.String(160), nullable=False)  
     slug = db.Column(db.String(180), nullable=False, unique=True, index=True)  
     descripcion_corta = db.Column(db.Text, nullable=False)  
     descripcion_larga = db.Column(db.Text)  
     activo = db.Column(db.Boolean, nullable=False, default=True)  
     meta_title = db.Column(db.String(180))  
     meta_description = db.Column(db.String(260))  
     keywords = db.Column(db.Text)  
   
     imagenes = db.relationship("ServicioImagen", back_populates="servicio", cascade="all, delete-orphan")  
     trabajos = db.relationship("TrabajoRealizado", back_populates="servicio")  
     cotizacion_items = db.relationship("CotizacionItem", back_populates="servicio")  
   
   
 class ServicioImagen(TimestampMixin, db.Model):  
     __tablename__ = "servicio_imagen"  
   
     id = db.Column(db.BigInteger, primary_key=True)  
     servicio_id = db.Column(db.BigInteger, db.ForeignKey("servicio.id", ondelete="CASCADE", onupdate="CASCADE"), nullable=False)  
     url = db.Column(db.Text, nullable=False)  
     alt_text = db.Column(db.String(180))  
     orden = db.Column(db.Integer, nullable=False, default=0)  
   
     servicio = db.relationship("Servicio", back_populates="imagenes")  
   
# app/models/trabajos.py  
 from app.extensions import db  
 from app.models.mixins import TimestampMixin  
   
   
 class TrabajoRealizado(TimestampMixin, db.Model):  
     __tablename__ = "trabajo_realizado"  
   
     id = db.Column(db.BigInteger, primary_key=True)  
     servicio_id = db.Column(db.BigInteger, db.ForeignKey("servicio.id", ondelete="SET NULL", onupdate="CASCADE"))  
     titulo = db.Column(db.String(180), nullable=False)  
     slug = db.Column(db.String(200), nullable=False, unique=True, index=True)  
     descripcion = db.Column(db.Text)  
     fecha_realizacion = db.Column(db.Date)  
     cliente_nombre = db.Column(db.String(160))  
     activo = db.Column(db.Boolean, nullable=False, default=True)  
     meta_title = db.Column(db.String(180))  
     meta_description = db.Column(db.String(260))  
     keywords = db.Column(db.Text)  
   
     servicio = db.relationship("Servicio", back_populates="trabajos")  
     media = db.relationship("TrabajoMedia", back_populates="trabajo", cascade="all, delete-orphan")  
   
   
 class TrabajoMedia(TimestampMixin, db.Model):  
     __tablename__ = "trabajo_media"  
   
     id = db.Column(db.BigInteger, primary_key=True)  
     trabajo_id = db.Column(db.BigInteger, db.ForeignKey("trabajo_realizado.id", ondelete="CASCADE", onupdate="CASCADE"), nullable=False)  
     tipo = db.Column(db.Enum("imagen", "video", name="tipo_media"), nullable=False)  
     url = db.Column(db.Text, nullable=False)  
     thumbnail_url = db.Column(db.Text)  
     alt_text = db.Column(db.String(180))  
     orden = db.Column(db.Integer, nullable=False, default=0)  
   
     trabajo = db.relationship("TrabajoRealizado", back_populates="media")  
   
# app/models/testimonios.py  
 from app.extensions import db  
 from app.models.mixins import TimestampMixin  
   
   
 class Testimonio(TimestampMixin, db.Model):  
     __tablename__ = "testimonio"  
   
     id = db.Column(db.BigInteger, primary_key=True)  
     usuario_id = db.Column(db.BigInteger, db.ForeignKey("usuario.id", ondelete="SET NULL", onupdate="CASCADE"))  
     nombre_publico = db.Column(db.String(160))  
     comentario = db.Column(db.Text, nullable=False)  
     calificacion = db.Column(db.SmallInteger)  
     estado = db.Column(db.Enum("pendiente", "aprobado", "rechazado", name="estado_testimonio"), nullable=False, default="pendiente")  
     moderado_por = db.Column(db.BigInteger, db.ForeignKey("usuario.id", ondelete="SET NULL", onupdate="CASCADE"))  
     moderado_at = db.Column(db.DateTime(timezone=True))  
   
     usuario = db.relationship("Usuario", foreign_keys=[usuario_id], back_populates="testimonios")  
     moderador = db.relationship("Usuario", foreign_keys=[moderado_por])  
   
     __table_args__ = (  
         db.CheckConstraint("calificacion IS NULL OR calificacion BETWEEN 1 AND 5", name="ck_testimonio_calificacion"),  
     )  
   
# app/models/ofertas.py  
 from app.extensions import db  
 from app.models.mixins import TimestampMixin  
   
   
 class Oferta(TimestampMixin, db.Model):  
     __tablename__ = "oferta"  
   
     id = db.Column(db.BigInteger, primary_key=True)  
     titulo = db.Column(db.String(180), nullable=False)  
     slug = db.Column(db.String(200), nullable=False, unique=True, index=True)  
     descripcion = db.Column(db.Text)  
     imagen_url = db.Column(db.Text)  
     fecha_inicio = db.Column(db.Date, nullable=False)  
     fecha_fin = db.Column(db.Date, nullable=False)  
     destacada = db.Column(db.Boolean, nullable=False, default=False, index=True)  
     activa = db.Column(db.Boolean, nullable=False, default=True)  
     meta_title = db.Column(db.String(180))  
     meta_description = db.Column(db.String(260))  
     keywords = db.Column(db.Text)  
   
     productos = db.relationship("OfertaProducto", back_populates="oferta", cascade="all, delete-orphan")  
   
     __table_args__ = (  
         db.CheckConstraint("fecha_fin >= fecha_inicio", name="ck_oferta_fechas"),  
     )  
   
   
 class OfertaProducto(TimestampMixin, db.Model):  
     __tablename__ = "oferta_producto"  
   
     oferta_id = db.Column(db.BigInteger, db.ForeignKey("oferta.id", ondelete="CASCADE", onupdate="CASCADE"), primary_key=True)  
     producto_id = db.Column(db.BigInteger, db.ForeignKey("producto.id", ondelete="CASCADE", onupdate="CASCADE"), primary_key=True)  
     precio_oferta = db.Column(db.Numeric(12, 2))  
   
     oferta = db.relationship("Oferta", back_populates="productos")  
     producto = db.relationship("Producto", back_populates="ofertas")  
   
     __table_args__ = (  
         db.CheckConstraint("precio_oferta IS NULL OR precio_oferta >= 0", name="ck_oferta_producto_precio"),  
     )  
   
# app/models/cotizaciones.py  
 from app.extensions import db  
 from app.models.mixins import TimestampMixin  
   
   
 class Cotizacion(TimestampMixin, db.Model):  
     __tablename__ = "cotizacion"  
   
     id = db.Column(db.BigInteger, primary_key=True)  
     usuario_id = db.Column(db.BigInteger, db.ForeignKey("usuario.id", ondelete="SET NULL", onupdate="CASCADE"))  
     nombre_cliente = db.Column(db.String(160), nullable=False)  
     email = db.Column(db.String(255))  
     telefono = db.Column(db.String(40))  
     whatsapp = db.Column(db.String(40))  
     mensaje = db.Column(db.Text)  
     canal_origen = db.Column(db.String(40), nullable=False, default="web")  
     estado = db.Column(db.Enum("nueva", "en_revision", "respondida", "cerrada", "cancelada", name="estado_cotizacion"), nullable=False, default="nueva")  
     total_estimado = db.Column(db.Numeric(12, 2))  
   
     usuario = db.relationship("Usuario", back_populates="cotizaciones")  
     items = db.relationship("CotizacionItem", back_populates="cotizacion", cascade="all, delete-orphan")  
   
   
 class CotizacionItem(TimestampMixin, db.Model):  
     __tablename__ = "cotizacion_item"  
   
     id = db.Column(db.BigInteger, primary_key=True)  
     cotizacion_id = db.Column(db.BigInteger, db.ForeignKey("cotizacion.id", ondelete="CASCADE", onupdate="CASCADE"), nullable=False)  
     producto_id = db.Column(db.BigInteger, db.ForeignKey("producto.id", ondelete="SET NULL", onupdate="CASCADE"))  
     servicio_id = db.Column(db.BigInteger, db.ForeignKey("servicio.id", ondelete="SET NULL", onupdate="CASCADE"))  
     descripcion = db.Column(db.Text)  
     cantidad = db.Column(db.Numeric(10, 2), nullable=False, default=1)  
     precio_referencial = db.Column(db.Numeric(12, 2))  
   
     cotizacion = db.relationship("Cotizacion", back_populates="items")  
     producto = db.relationship("Producto")  
     servicio = db.relationship("Servicio", back_populates="cotizacion_items")  
   
# app/models/configuracion.py  
 from app.extensions import db  
 from app.models.mixins import TimestampMixin  
   
   
 class ConfiguracionSitio(TimestampMixin, db.Model):  
     __tablename__ = "configuracion_sitio"  
   
     id = db.Column(db.BigInteger, primary_key=True)  
     singleton_key = db.Column(db.Boolean, nullable=False, unique=True, default=True)  
     nombre_negocio = db.Column(db.String(180), nullable=False)  
     slogan = db.Column(db.String(220))  
     descripcion = db.Column(db.Text)  
     logo_url = db.Column(db.Text)  
     color_primario = db.Column(db.String(20), nullable=False, default="#0b65c2")  
     color_secundario = db.Column(db.String(20), nullable=False, default="#ffffff")  
     telefono_principal = db.Column(db.String(40))  
     whatsapp_number = db.Column(db.String(40))  
     email_contacto = db.Column(db.String(255))  
     direccion = db.Column(db.Text)  
     horario = db.Column(db.Text)  
     mantenimiento_activo = db.Column(db.Boolean, nullable=False, default=False)  
     mantenimiento_mensaje = db.Column(db.Text)  
     meta_title = db.Column(db.String(180))  
     meta_description = db.Column(db.String(260))  
     keywords = db.Column(db.Text)  
   
     redes_sociales = db.relationship("RedSocial", back_populates="configuracion", cascade="all, delete-orphan")  
   
   
 class RedSocial(TimestampMixin, db.Model):  
     __tablename__ = "red_social"  
   
     id = db.Column(db.BigInteger, primary_key=True)  
     configuracion_sitio_id = db.Column(db.BigInteger, db.ForeignKey("configuracion_sitio.id", ondelete="CASCADE", onupdate="CASCADE"), nullable=False)  
     nombre = db.Column(db.String(80), nullable=False)  
     url = db.Column(db.Text, nullable=False)  
     handle = db.Column(db.String(120))  
     activa = db.Column(db.Boolean, nullable=False, default=True)  
     orden = db.Column(db.Integer, nullable=False, default=0)  
   
     configuracion = db.relationship("ConfiguracionSitio", back_populates="redes_sociales")  
   
   
 class MensajeContacto(TimestampMixin, db.Model):  
     __tablename__ = "mensaje_contacto"  
   
     id = db.Column(db.BigInteger, primary_key=True)  
     usuario_id = db.Column(db.BigInteger, db.ForeignKey("usuario.id", ondelete="SET NULL", onupdate="CASCADE"))  
     nombre = db.Column(db.String(160), nullable=False)  
     email = db.Column(db.String(255))  
     telefono = db.Column(db.String(40))  
     mensaje = db.Column(db.Text, nullable=False)  
     estado = db.Column(db.String(40), nullable=False, default="nuevo")  
   
     usuario = db.relationship("Usuario", back_populates="mensajes_contacto")  
   
# app/models/refresh_token.py  
 from app.extensions import db  
 from app.models.mixins import TimestampMixin  
   
   
 class RefreshToken(TimestampMixin, db.Model):  
     __tablename__ = "refresh_token"  
   
     id = db.Column(db.BigInteger, primary_key=True)  
     usuario_id = db.Column(db.BigInteger, db.ForeignKey("usuario.id", ondelete="CASCADE", onupdate="CASCADE"), nullable=False)  
     token_hash = db.Column(db.String(64), nullable=False, unique=True)  
     jti = db.Column(db.String(80), nullable=False, unique=True)  
     expires_at = db.Column(db.DateTime(timezone=True), nullable=False)  
     revoked_at = db.Column(db.DateTime(timezone=True))  
     replaced_by_jti = db.Column(db.String(80))  
     ip_address = db.Column(db.String(45))  
     user_agent = db.Column(db.Text)  
   
     usuario = db.relationship("Usuario", back_populates="refresh_tokens")  
   
# app/models/__init__.py  
 from .usuario import Usuario  
 from .catalogo import Categoria, Producto, ProductoImagen  
 from .servicios import Servicio, ServicioImagen  
 from .trabajos import TrabajoRealizado, TrabajoMedia  
 from .testimonios import Testimonio  
 from .ofertas import Oferta, OfertaProducto  
 from .cotizaciones import Cotizacion, CotizacionItem  
 from .configuracion import ConfiguracionSitio, RedSocial, MensajeContacto  
 from .refresh_token import RefreshToken  
   
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANElEQVR4nO3OUQmAABBAsSdYxKYXx1gmEBOIFfwTYUuwZWa2ag8AgL841uquzq8nAAC8dj05WgYLQTzjnAAAAABJRU5ErkJggg==)  
**7. Migraciones Alembic**  
**7.1 Comandos exactos**  
flask db init  
 flask db migrate -m "init schema"  
 flask db upgrade  
   
**7.2 Versionado del esquema**  
- Cada cambio estructural de BD se versiona con una migracion Alembic en migrations/versions/.  
- La primera migracion crea tipos ENUM, tablas, indices, constraints y triggers.  
- Cambios futuros deben ser incrementales: agregar columna, crear indice, modificar constraint o crear tabla en una nueva revision.  
- En produccion se despliega codigo y luego se ejecuta flask db upgrade.  
- Para rollback controlado se usa flask db downgrade -1, siempre que la migracion tenga downgrade() seguro.  
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANUlEQVR4nO3OQQmAABRAsSd4NIGhrOTvaQBrWMGbCFuCLTOzV2cAAPzFvVZbdXw9AQDgtesBhYQEO+64Y8AAAAAASUVORK5CYII=)  
**8. Flujo de autenticacion Google OAuth**  
**8.1 Secuencia**  
Usuario  
   |  
   | click "Iniciar sesion / Registrarse con Google"  
   v  
 Frontend  
   |  
   | window.location = "/auth/google/login"  
   v  
 Backend Flask  
   |  
   | crea state y redirige  
   v  
 Google OAuth Consent  
   |  
   | callback con code + state  
   v  
 Backend Flask  
   |  
   | valida state, intercambia code, obtiene userinfo  
   | upsert usuario por google_sub  
   | crea access JWT 15 min  
   | crea refresh token 30 dias  
   | set-cookie HttpOnly Secure SameSite=Lax  
   v  
 Frontend URL  
   
**8.2 Endpoints**  
| | | | |  
|-|-|-|-|  
| **Metodo** | **Ruta** | **Publico** | **Descripcion** |   
| GET | /auth/google/login | Si | Inicia OAuth, genera state y redirige a Google. |   
| GET | /auth/google/callback | Si | Valida OAuth, registra/login por google_sub, emite cookies y redirige al frontend. |   
| POST | /auth/refresh | Cookie refresh | Rota refresh token y emite nuevo access token. |   
| POST | /auth/logout | Cookie refresh | Revoca refresh token y limpia cookies. |   
| GET | /auth/me | Access JWT | Devuelve usuario actual o 401. |   
| GET | /catalogo/productos | Si | Lista productos publicos. |   
| GET | /catalogo/productos/<slug> | Si | Detalle de producto. |   
| GET | /servicios | Si | Lista servicios. |   
| GET | /ofertas | Si | Lista ofertas vigentes. |   
| POST | /cotizaciones | Si | Guarda solicitud y envia email. |   
| POST | /api/calculadora-btu | Si | Calcula BTU estimado y capacidad comercial recomendada para una habitacion. |   
| POST | /testimonios | Usuario | Crea testimonio pendiente. |   
| GET | /admin/** | Admin | Panel y datos administrativos. |   
| POST/PUT/DELETE | /admin/** | Admin | CRUD protegido. |   
   
**8.3 Servicio OAuth**  
# app/security/oauth.py  
 from app.extensions import oauth  
   
   
 def register_google_oauth(app):  
     oauth.register(  
         name="google",  
         client_id=app.config["GOOGLE_CLIENT_ID"],  
         client_secret=app.config["GOOGLE_CLIENT_SECRET"],  
         server_metadata_url="https://accounts.google.com/.well-known/openid-configuration",  
         client_kwargs={"scope": "openid email profile"},  
     )  
   
# app/blueprints/auth/routes.py  
 from flask import Blueprint, current_app, redirect, request, jsonify  
 from app.extensions import db, oauth  
 from app.models import Usuario  
 from app.services.token_service import issue_access_token, issue_refresh_token, rotate_refresh_token, revoke_refresh_token  
 from app.security.cookies import set_auth_cookies, clear_auth_cookies  
 from app.security.decorators import login_required  
   
 auth_bp = Blueprint("auth", __name__)  
   
   
 @auth_bp.get("/google/login")  
 def google_login():  
     redirect_uri = current_app.config["GOOGLE_REDIRECT_URI"]  
     return oauth.google.authorize_redirect(redirect_uri)  
   
   
 @auth_bp.get("/google/callback")  
 def google_callback():  
     token = oauth.google.authorize_access_token()  
     userinfo = token.get("userinfo") or oauth.google.userinfo()  
   
     google_sub = userinfo["sub"]  
     email = userinfo["email"]  
     nombre = userinfo.get("name") or email.split("@")[0]  
     avatar_url = userinfo.get("picture")  
   
     usuario = Usuario.query.filter_by(google_sub=google_sub).one_or_none()  
     if usuario is None:  
         usuario = Usuario(  
             google_sub=google_sub,  
             email=email,  
             nombre=nombre,  
             avatar_url=avatar_url,  
             rol="cliente",  
         )  
         db.session.add(usuario)  
     else:  
         usuario.email = email  
         usuario.nombre = nombre  
         usuario.avatar_url = avatar_url  
   
     db.session.commit()  
   
     access_token = issue_access_token(usuario)  
     refresh_token = issue_refresh_token(usuario, request)  
   
     response = redirect(current_app.config["FRONTEND_URL"])  
     set_auth_cookies(response, access_token, refresh_token)  
     return response  
   
   
 @auth_bp.post("/refresh")  
 def refresh():  
     refresh_cookie = request.cookies.get("refresh_token")  
     access_token, refresh_token = rotate_refresh_token(refresh_cookie, request)  
     response = jsonify({"ok": True})  
     set_auth_cookies(response, access_token, refresh_token)  
     return response  
   
   
 @auth_bp.post("/logout")  
 def logout():  
     refresh_cookie = request.cookies.get("refresh_token")  
     if refresh_cookie:  
         revoke_refresh_token(refresh_cookie)  
     response = jsonify({"ok": True})  
     clear_auth_cookies(response)  
     return response  
   
   
 @auth_bp.get("/me")  
 @login_required  
 def me(current_user):  
     return jsonify({  
         "id": current_user.id,  
         "email": current_user.email,  
         "nombre": current_user.nombre,  
         "avatar_url": current_user.avatar_url,  
         "rol": current_user.rol,  
     })  
   
**8.4 Cookies seguras**  
# app/security/cookies.py  
 def set_auth_cookies(response, access_token, refresh_token):  
     response.set_cookie(  
         "access_token",  
         access_token,  
         httponly=True,  
         secure=True,  
         samesite="Lax",  
         max_age=15 * 60,  
         path="/",  
     )  
     response.set_cookie(  
         "refresh_token",  
         refresh_token,  
         httponly=True,  
         secure=True,  
         samesite="Lax",  
         max_age=30 * 24 * 60 * 60,  
         path="/auth",  
     )  
   
   
 def clear_auth_cookies(response):  
     response.delete_cookie("access_token", path="/")  
     response.delete_cookie("refresh_token", path="/auth")  
   
**8.5 Decoradores**  
# app/security/decorators.py  
 from functools import wraps  
 from flask import request, jsonify  
 from app.models import Usuario  
 from app.services.token_service import decode_access_token  
   
   
 def login_required(fn):  
     @wraps(fn)  
     def wrapper(*args, **kwargs):  
         token = request.cookies.get("access_token")  
         if not token:  
             return jsonify({"error": "unauthorized"}), 401  
   
         payload = decode_access_token(token)  
         if not payload:  
             return jsonify({"error": "unauthorized"}), 401  
   
         usuario = Usuario.query.get(payload["sub"])  
         if not usuario or not usuario.activo:  
             return jsonify({"error": "unauthorized"}), 401  
   
         return fn(usuario, *args, **kwargs)  
   
     return wrapper  
   
   
 def role_required(*roles):  
     def decorator(fn):  
         @wraps(fn)  
         @login_required  
        def wrapper(current_user, *args, **kwargs):  
             if current_user.rol not in roles:  
                 return jsonify({"error": "forbidden"}), 403  
             return fn(current_user, *args, **kwargs)  
   
         return wrapper  
   
     return decorator  
   
**8.6 Frontend**  
document.querySelector("#google-login").addEventListener("click", () => {  
   window.location = "/auth/google/login";  
 });  
   
No hay pagina propia de login y no hay formulario usuario/contrasena.  
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANElEQVR4nO3OQQmAABRAsaeILbwZ9Fewo0Gs4E2ELcGWmTmqKwAA/uLeqr06v54AAPDa+gAthwNEfGhnhAAAAABJRU5ErkJggg==)  
**9. Normalizacion**  
**9.1 Primera Forma Normal (1FN)**  
Problema inicial:  
producto:  
   id  
   nombre  
   imagenes = "url1.jpg, url2.jpg, url3.jpg"  
   
Solucion:  
producto 1..N producto_imagen  
   
Cada imagen queda como fila independiente en producto_imagen, con orden, alt_text y es_principal.  
**9.2 Segunda Forma Normal (2FN)**  
Problema inicial:  
oferta_producto:  
   oferta_id  
   producto_id  
   titulo_oferta  
   nombre_producto  
   precio_oferta  
   
titulo_oferta depende solo de oferta_id y nombre_producto depende solo de producto_id.  
Solucion:  
oferta:  
   id  
   titulo  
   fecha_inicio  
   fecha_fin  
   
 producto:  
   id  
   nombre  
   
 oferta_producto:  
   oferta_id  
   producto_id  
   precio_oferta  
   
Los atributos dependen de toda la clave compuesta solo cuando corresponden a la relacion.  
**9.3 Tercera Forma Normal (3FN)**  
Problema inicial:  
configuracion_sitio:  
   id  
   telefono  
   email  
   tiktok_url  
   facebook_url  
   whatsapp_url  
   
Las redes sociales son datos repetibles y no dependen conceptualmente de toda la configuracion como columnas fijas.  
Solucion:  
configuracion_sitio 1..N red_social  
   
Esto permite agregar, desactivar, ordenar o editar redes sin alterar el esquema.  
**9.4 Cotizacion normalizada**  
Problema inicial:  
cotizacion:  
   id  
   cliente  
   producto_1  
   producto_2  
   servicio_1  
   precio_1  
   precio_2  
   
Solucion:  
cotizacion 1..N cotizacion_item  
 cotizacion_item 0..1 producto  
 cotizacion_item 0..1 servicio  
   
El formulario puede cotizar productos, servicios o una descripcion manual sin duplicar columnas.  
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANUlEQVR4nO3OQQmAABRAsSd40A5GMORPYEt7WMGbCFuCLTNzVFcAAPzFvVZbdX49AQDgtf0BSrIDUgOg4eAAAAAASUVORK5CYII=)  
**10. Requisitos de entorno**  
Flask==3.0.*  
 Flask-SQLAlchemy==3.1.*  
 Flask-Migrate==4.0.*  
 Flask-Cors==4.0.*  
 Flask-Limiter==3.7.*  
 Authlib==1.3.*  
 PyJWT==2.8.*  
 marshmallow==3.21.*  
 psycopg[binary]==3.1.*  
 python-dotenv==1.0.*  
 gunicorn==22.0.*  
   
DATABASE_URL=postgresql+psycopg://prae_user:change_me@localhost:5432/prae_db  
 JWT_SECRET=change_me_with_32_plus_chars  
 GOOGLE_CLIENT_ID=  
 GOOGLE_CLIENT_SECRET=  
 GOOGLE_REDIRECT_URI=http://localhost:5000/auth/google/callback  
 FRONTEND_URL=http://localhost:5173  
 WHATSAPP_NUMBER=18093039156  
 SMTP_HOST=  
 SMTP_PORT=587  
 SMTP_USER=  
 SMTP_PASSWORD=  
 SMTP_FROM=espinalclimatizacion@gmail.com  
   
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANUlEQVR4nO3OMQ2AUBBAsUeCE4yeIiT9CRVMWGAjJK2CbjNzVGcAAPzF2qu7Wl9PAAB47XoA/vcF8exqpY4AAAAASUVORK5CYII=)  
**11. Seguridad y OWASP**  
- Usar cookies HttpOnly, Secure, SameSite=Lax.  
- No exponer JWT en localStorage.  
- Validar state OAuth y usar redirect URI exacta.  
- Hashear refresh tokens antes de persistirlos.  
- Rotar refresh tokens en cada /auth/refresh.  
- Revocar token anterior al rotar.  
- Limitar intentos en endpoints sensibles con Flask-Limiter.  
- Validar payloads con Marshmallow o Pydantic v2.  
- Usar CORS solo contra FRONTEND_URL.  
- Aplicar 403 para usuarios sin rol administrativo.  
- Registrar acciones administrativas criticas en logs.  
- Escapar contenido de comentarios/testimonios en frontend.  
- Moderar testimonios antes de publicarlos.  
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANUlEQVR4nO3OQQmAABRAsSd4EKxgBjP+Asa0hxW8ibAl2DIzR3UFAMBf3Gu1VefXEwAAXtsfSqwDVbgKngwAAAAASUVORK5CYII=)  
**12. WhatsApp y cotizaciones**  
**12.1 Link WhatsApp**  
from urllib.parse import quote  
   
   
 def build_whatsapp_url(number: str, message: str) -> str:  
     return f"https://wa.me/{number}?text={quote(message)}"  
   
Ejemplo:  
https://wa.me/18093039156?text=Hola%2C%20quiero%20una%20cotizacion%20para%20mantenimiento  
   
**12.2 Flujo de cotizacion**  
Formulario publico  
   -> POST /cotizaciones  
   -> valida datos  
   -> guarda cotizacion + items  
   -> envia email a espinalclimatizacion@gmail.com  
   -> devuelve confirmacion  
   -> opcional: genera link WhatsApp con resumen  
   
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANUlEQVR4nO3OQQmAABRAsSfYxKK/kJXEkyE8WcGbCFuCLTOzVXsAAPzFsVZ3dX4cAQDgvesB/vEF9H9odtUAAAAASUVORK5CYII=)  
**13. SEO**  
Entidades publicas con campos SEO:  
- categoria: slug, meta_title, meta_description, keywords.  
- producto: slug, meta_title, meta_description, keywords.  
- servicio: slug, meta_title, meta_description, keywords.  
- trabajo_realizado: slug, meta_title, meta_description, keywords.  
- oferta: slug, meta_title, meta_description, keywords.  
- configuracion_sitio: SEO global.  
Palabras objetivo derivadas del DOCX:  
- refrigeracion  
- climatizacion  
- tecnicos de refrigeracion  
- aire acondicionado  
- mantenimiento de aire acondicionado  
- reparacion de aire acondicionado  
- neveras  
- piezas para refrigeracion  
- servicio residencial  
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANUlEQVR4nO3OQQmAABRAsSd4NIGRTPXNaQBrWMGbCFuCLTOzV2cAAPzFvVZbdXw9AQDgtesBhZQEOYZGgUEAAAAASUVORK5CYII=)  
**14. Calculadora de capacidad de aire acondicionado en BTU**  
**14.1 Tecnologia detectada y ubicacion**  
Dentro de este documento, la estructura del backend ya esta definida como **Python 3.12 + Flask**, con:  
- create_app() como application factory.  
- Blueprints por dominio.  
- Schemas para validacion.  
- Services para reglas de negocio reutilizables.  
- Tests separados en tests/.  
Por eso la calculadora BTU se agrega como un modulo publico sin tabla de base de datos:  
app/  
   blueprints/  
     calculadora/  
       __init__.py  
       routes.py  
   schemas/  
     calculadora_btu_schema.py  
   services/  
     calculadora_btu_service.py  
 tests/  
   test_calculadora_btu.py  
   
El endpoint queda registrado como:  
POST /api/calculadora-btu  
   
**14.2 Regla de negocio**  
La calculadora recibe dimensiones en pies:  
- largo: numero obligatorio mayor que 0.  
- ancho: numero obligatorio mayor que 0.  
- alto: numero mayor que 0; si no viene, se usa 9.  
- aceptaCondiciones: debe ser true.  
Formula:  
area = largo * ancho  
 factorAltura = alto / 9  
 btuEstimado = area * 30 * factorAltura  
 volumenPiesCubicos = largo * ancho * alto  
 toneladasAproximadas = btuRecomendado / 12000  
   
Base tecnica orientativa:  
30 BTU por pie cuadrado para clima calido, tomando como referencia habitaciones con altura estandar de 9 pies.  
   
Tabla comercial:  
| | |  
|-|-|  
| **BTU estimado** | **BTU recomendado** |   
| hasta 9000 | 9000 |   
| mas de 9000 y hasta 12000 | 12000 |   
| mas de 12000 y hasta 18000 | 18000 |   
| mas de 18000 y hasta 24000 | 24000 |   
| mas de 24000 y hasta 36000 | 36000 |   
| mas de 36000 y hasta 48000 | 48000 |   
| mas de 48000 y hasta 60000 | 60000 |   
| mas de 60000 | requiere evaluacion tecnica personalizada |   
   
**14.3 Schema de validacion**  
# app/schemas/calculadora_btu_schema.py  
 from marshmallow import EXCLUDE, Schema, ValidationError, fields, validates_schema  
   
   
 class CalculadoraBTUSchema(Schema):  
     largo = fields.Float(required=True)  
     ancho = fields.Float(required=True)  
     alto = fields.Float(load_default=9)  
     aceptaCondiciones = fields.Boolean(required=True)  
   
     class Meta:  
         unknown = EXCLUDE  
   
     @validates_schema  
     def validate_payload(self, data, **kwargs):  
         if data.get("aceptaCondiciones") is not True:  
             raise ValidationError({  
                 "aceptaCondiciones": ["Debe aceptar las condiciones de uso para realizar el calculo."]  
             })  
   
         if data.get("largo", 0) <= 0 or data.get("ancho", 0) <= 0:  
             raise ValidationError({  
                 "_schema": ["El largo y el ancho son obligatorios y deben ser mayores que cero."]  
             })  
   
         if data.get("alto", 9) <= 0:  
             raise ValidationError({"alto": ["El alto debe ser mayor que cero."]})  
   
**14.4 Service reutilizable**  
# app/services/calculadora_btu_service.py  
 CAPACIDADES_COMERCIALES = [9000, 12000, 18000, 24000, 36000, 48000, 60000]  
 NOTA_CALCULO = "Este calculo es aproximado. Para una recomendacion exacta se recomienda una evaluacion tecnica."  
   
   
 def _normalizar_numero(value, decimals=2):  
     rounded = round(float(value), decimals)  
     return int(rounded) if rounded.is_integer() else rounded  
   
   
 def _recomendar_btu(btu_estimado):  
     for capacidad in CAPACIDADES_COMERCIALES:  
         if btu_estimado <= capacidad:  
             return capacidad  
     return None  
   
   
 def calcular_capacidad_btu(payload):  
     """Calcula BTU aproximado para orientar al cliente, no como diagnostico tecnico."""  
     largo = float(payload["largo"])  
     ancho = float(payload["ancho"])  
     alto = float(payload.get("alto") or 9)  
   
     area = largo * ancho  
     volumen = area * alto  
     factor_altura = alto / 9  
     btu_estimado = area * 30 * factor_altura  
     btu_recomendado = _recomendar_btu(btu_estimado)  
   
     data = {  
         "largo": _normalizar_numero(largo),  
         "ancho": _normalizar_numero(ancho),  
         "alto": _normalizar_numero(alto),  
         "areaPiesCuadrados": _normalizar_numero(area),  
         "volumenPiesCubicos": _normalizar_numero(volumen),  
         "btuEstimado": _normalizar_numero(btu_estimado),  
         "btuRecomendado": btu_recomendado,  
         "toneladasAproximadas": None,  
         "mensaje": "",  
         "nota": NOTA_CALCULO,  
     }  
   
     if btu_recomendado is None:  
         data["requiereEvaluacionTecnica"] = True  
         data["mensaje"] = (  
             "La habitacion supera 60000 BTU estimados. "  
             "Se recomienda una evaluacion tecnica personalizada."  
         )  
         return data  
   
     data["toneladasAproximadas"] = _normalizar_numero(btu_recomendado / 12000)  
     data["requiereEvaluacionTecnica"] = False  
     data["mensaje"] = (  
         f"Para esta habitacion se recomienda aproximadamente un aire acondicionado "  
         f"de {btu_recomendado} BTU."  
     )  
     return data  
   
**14.5 Blueprint y endpoint**  
# app/blueprints/calculadora/__init__.py  
 from .routes import calculadora_bp  
   
# app/blueprints/calculadora/routes.py  
 from flask import Blueprint, jsonify, request  
 from marshmallow import ValidationError  
   
 from app.schemas.calculadora_btu_schema import CalculadoraBTUSchema  
 from app.services.calculadora_btu_service import calcular_capacidad_btu  
   
 calculadora_bp = Blueprint("calculadora", __name__)  
 calculadora_schema = CalculadoraBTUSchema()  
   
   
 def _validation_message(messages):  
     if "aceptaCondiciones" in messages:  
         return "Debe aceptar las condiciones de uso para realizar el calculo."  
   
     if "largo" in messages or "ancho" in messages or "_schema" in messages:  
         return "El largo y el ancho son obligatorios y deben ser mayores que cero."  
   
     if "alto" in messages:  
         return "El alto debe ser mayor que cero."  
   
     return "Los datos enviados no son validos."  
   
   
 @calculadora_bp.post("/calculadora-btu")  
 def calcular_btu():  
     payload = request.get_json(silent=True) or {}  
   
     try:  
         data = calculadora_schema.load(payload)  
     except ValidationError as error:  
         return jsonify({  
             "success": False,  
             "message": _validation_message(error.messages),  
         }), 400  
   
     resultado = calcular_capacidad_btu(data)  
     return jsonify({  
         "success": True,  
         "data": resultado,  
     }), 200  
   
Registro en el application factory:  
# app/__init__.py  
 from app.blueprints.calculadora import calculadora_bp  
   
 app.register_blueprint(calculadora_bp, url_prefix="/api")  
   
**14.6 Ejemplos de uso**  
Request:  
POST /api/calculadora-btu  
 Content-Type: application/json  
   
{  
   "largo": 12,  
   "ancho": 10,  
   "alto": 9,  
   "aceptaCondiciones": true  
 }  
   
Respuesta:  
{  
   "success": true,  
   "data": {  
     "largo": 12,  
     "ancho": 10,  
     "alto": 9,  
     "areaPiesCuadrados": 120,  
     "volumenPiesCubicos": 1080,  
     "btuEstimado": 3600,  
     "btuRecomendado": 9000,  
     "toneladasAproximadas": 0.75,  
     "requiereEvaluacionTecnica": false,  
     "mensaje": "Para esta habitacion se recomienda aproximadamente un aire acondicionado de 9000 BTU.",  
     "nota": "Este calculo es aproximado. Para una recomendacion exacta se recomienda una evaluacion tecnica."  
   }  
 }  
   
Error por condiciones:  
{  
   "success": false,  
   "message": "Debe aceptar las condiciones de uso para realizar el calculo."  
 }  
   
Error por dimensiones:  
{  
   "success": false,  
   "message": "El largo y el ancho son obligatorios y deben ser mayores que cero."  
 }  
   
Caso que requiere evaluacion tecnica:  
{  
   "success": true,  
   "data": {  
     "btuRecomendado": null,  
     "toneladasAproximadas": null,  
     "requiereEvaluacionTecnica": true,  
     "mensaje": "La habitacion supera 60000 BTU estimados. Se recomienda una evaluacion tecnica personalizada."  
   }  
 }  
   
**14.7 Prueba basica**  
# tests/test_calculadora_btu.py  
 def test_calculadora_btu_calculo_basico(client):  
     response = client.post("/api/calculadora-btu", json={  
         "largo": 12,  
         "ancho": 10,  
         "alto": 9,  
         "aceptaCondiciones": True,  
     })  
   
     assert response.status_code == 200  
     payload = response.get_json()  
     assert payload["success"] is True  
     assert payload["data"]["areaPiesCuadrados"] == 120  
     assert payload["data"]["volumenPiesCubicos"] == 1080  
     assert payload["data"]["btuEstimado"] == 3600  
     assert payload["data"]["btuRecomendado"] == 9000  
     assert payload["data"]["toneladasAproximadas"] == 0.75  
   
   
 def test_calculadora_btu_requiere_aceptar_condiciones(client):  
     response = client.post("/api/calculadora-btu", json={  
         "largo": 12,  
         "ancho": 10,  
         "aceptaCondiciones": False,  
     })  
   
     assert response.status_code == 400  
     assert response.get_json() == {  
         "success": False,  
         "message": "Debe aceptar las condiciones de uso para realizar el calculo.",  
     }  
   
**14.8 Como probar el endpoint**  
Con el backend Flask corriendo:  
curl -X POST http://localhost:5000/api/calculadora-btu \  
   -H "Content-Type: application/json" \  
   -d '{"largo":12,"ancho":10,"alto":9,"aceptaCondiciones":true}'  
   
Pruebas automatizadas:  
pytest tests/test_calculadora_btu.py  
   
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnEAAAACCAYAAAA3pIp+AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANElEQVR4nO3OUQmAABBAsSeILQSjXgcrmkOs4J8IW4ItM7NXZwAA/MW1Vlt1fBwBAOC9+wEukwQ+V/SggAAAAABJRU5ErkJggg==)  
**15. Criterios de aceptacion**  
- El home muestra marca, slogan, logo, colores blanco/azul, ofertas destacadas, servicios y CTA WhatsApp.  
- El catalogo permite ver productos por categoria, imagen, descripcion, precio y disponibilidad.  
- El sitio publico no obliga login.  
- El boton Google OAuth esta disponible como accion opcional.  
- El usuario autenticado puede comentar/testimoniar.  
- El testimonio no se publica hasta ser aprobado.  
- El admin puede gestionar productos, categorias, servicios, imagenes, ofertas, trabajos, configuracion, redes, cotizaciones y usuarios.  
- Solo admin y super_admin acceden a /admin/**.  
- Solo super_admin promueve usuarios.  
- El formulario de cotizacion guarda datos y envia email.  
- El formulario WhatsApp genera https://wa.me/18093039156?text=....  
- El endpoint publico POST /api/calculadora-btu calcula area, volumen, BTU estimado, BTU recomendado y toneladas aproximadas.  
- La calculadora BTU usa alto = 9 cuando el cliente no envia altura.  
- La calculadora BTU exige aceptaCondiciones = true antes de calcular.  
- Si el calculo supera 60000 BTU, el sistema indica que requiere evaluacion tecnica personalizada.  
- El sitio soporta SEO por slug y metadatos.  
- La BD esta normalizada en 1FN, 2FN y 3FN.  
