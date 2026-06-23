from datetime import datetime, timezone
from app.extensions import db
from app.models.user import User


def _now():
    return datetime.now(timezone.utc)


class Categoria(db.Model):
    __tablename__ = 'categorias'

    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(255), nullable=False)
    slug = db.Column(db.String(255), unique=True, nullable=False)
    descripcion = db.Column(db.Text, nullable=True)
    activo = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=_now)

    productos = db.relationship('Producto', backref='categoria', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'nombre': self.nombre,
            'slug': self.slug,
            'descripcion': self.descripcion,
            'activo': self.activo,
        }


class Producto(db.Model):
    __tablename__ = 'productos'

    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(255), nullable=False)
    slug = db.Column(db.String(255), unique=True, nullable=False)
    descripcion = db.Column(db.Text, nullable=True)
    precio = db.Column(db.Numeric(12, 2), nullable=True)
    disponibilidad = db.Column(db.String(20), default='disponible')
    activo = db.Column(db.Boolean, default=True)
    categoria_id = db.Column(db.Integer, db.ForeignKey('categorias.id'), nullable=True)
    imagenes = db.Column(db.JSON, default=list)
    created_at = db.Column(db.DateTime, default=_now)

    def to_dict(self):
        return {
            'id': self.id,
            'nombre': self.nombre,
            'slug': self.slug,
            'descripcion': self.descripcion,
            'precio': float(self.precio) if self.precio else None,
            'disponibilidad': self.disponibilidad,
            'activo': self.activo,
            'categoria_id': self.categoria_id,
            'categoria': self.categoria.to_dict() if self.categoria else None,
            'imagenes': self.imagenes or [],
            'created_at': self.created_at.isoformat() if self.created_at else None,
        }


class Servicio(db.Model):
    __tablename__ = 'servicios'

    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(255), nullable=False)
    slug = db.Column(db.String(255), unique=True, nullable=False)
    descripcion_corta = db.Column(db.String(500), nullable=True)
    descripcion_larga = db.Column(db.Text, nullable=True)
    activo = db.Column(db.Boolean, default=True)
    imagenes = db.Column(db.JSON, default=list)
    created_at = db.Column(db.DateTime, default=_now)

    def to_dict(self):
        return {
            'id': self.id,
            'nombre': self.nombre,
            'slug': self.slug,
            'descripcion_corta': self.descripcion_corta,
            'descripcion_larga': self.descripcion_larga,
            'activo': self.activo,
            'imagenes': self.imagenes or [],
            'created_at': self.created_at.isoformat() if self.created_at else None,
        }


class Trabajo(db.Model):
    __tablename__ = 'trabajos'

    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(255), nullable=False)
    descripcion = db.Column(db.Text, nullable=True)
    activo = db.Column(db.Boolean, default=True)
    media = db.Column(db.JSON, default=list)
    created_at = db.Column(db.DateTime, default=_now)

    def to_dict(self):
        return {
            'id': self.id,
            'titulo': self.titulo,
            'descripcion': self.descripcion,
            'activo': self.activo,
            'media': self.media or [],
            'created_at': self.created_at.isoformat() if self.created_at else None,
        }


class Oferta(db.Model):
    __tablename__ = 'ofertas'

    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(255), nullable=False)
    descripcion = db.Column(db.Text, nullable=True)
    imagen_url = db.Column(db.String(500), nullable=True)
    destacada = db.Column(db.Boolean, default=False)
    activa = db.Column(db.Boolean, default=True)
    producto_ids = db.Column(db.JSON, default=list)
    created_at = db.Column(db.DateTime, default=_now)

    def to_dict(self):
        return {
            'id': self.id,
            'titulo': self.titulo,
            'descripcion': self.descripcion,
            'imagen_url': self.imagen_url,
            'destacada': self.destacada,
            'activa': self.activa,
            'producto_ids': self.producto_ids or [],
            'created_at': self.created_at.isoformat() if self.created_at else None,
        }


class Testimonio(db.Model):
    __tablename__ = 'testimonios'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=True)
    nombre_publico = db.Column(db.String(255), nullable=True)
    comentario = db.Column(db.Text, nullable=False)
    calificacion = db.Column(db.Integer, default=5)
    aprobado = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=_now)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'nombre_publico': self.nombre_publico,
            'comentario': self.comentario,
            'calificacion': self.calificacion,
            'aprobado': self.aprobado,
            'created_at': self.created_at.isoformat() if self.created_at else None,
        }


class Cotizacion(db.Model):
    __tablename__ = 'cotizaciones'

    id = db.Column(db.Integer, primary_key=True)
    nombre_cliente = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=True)
    telefono = db.Column(db.String(50), nullable=True)
    whatsapp = db.Column(db.String(50), nullable=True)
    mensaje = db.Column(db.Text, nullable=True)
    items = db.Column(db.JSON, default=list)
    leida = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=_now)

    def to_dict(self):
        return {
            'id': self.id,
            'nombre_cliente': self.nombre_cliente,
            'email': self.email,
            'telefono': self.telefono,
            'whatsapp': self.whatsapp,
            'mensaje': self.mensaje,
            'items': self.items or [],
            'leida': self.leida,
            'created_at': self.created_at.isoformat() if self.created_at else None,
        }


class MensajeContacto(db.Model):
    __tablename__ = 'mensajes_contacto'

    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=True)
    telefono = db.Column(db.String(50), nullable=True)
    mensaje = db.Column(db.Text, nullable=False)
    leido = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=_now)

    def to_dict(self):
        return {
            'id': self.id,
            'nombre': self.nombre,
            'email': self.email,
            'telefono': self.telefono,
            'mensaje': self.mensaje,
            'leido': self.leido,
            'created_at': self.created_at.isoformat() if self.created_at else None,
        }


class Config(db.Model):
    __tablename__ = 'config'

    id = db.Column(db.Integer, primary_key=True, default=1)
    nombre_negocio = db.Column(db.String(255), default='PRAE Refrigeracion y Climatizacion Espinal')
    slogan = db.Column(db.String(500), default='Tu comodidad y confort es nuestra satisfaccion')
    meta_title = db.Column(db.String(255), default='PRAE Refrigeracion y Climatizacion Espinal')
    meta_description = db.Column(db.Text, default='Venta, reparacion, mantenimiento y asesoria de aires acondicionados, neveras y piezas.')
    logo_url = db.Column(db.String(500), nullable=True)
    telefono_principal = db.Column(db.String(50), default='809-303-9156')
    whatsapp_number = db.Column(db.String(50), default='18093039156')
    email_contacto = db.Column(db.String(255), default='espinalclimatizacion@gmail.com')
    direccion = db.Column(db.String(500), default='Prae Climatizacion & Refrigeracion, Espinal, Santo Domingo')
    horario = db.Column(db.String(255), default='Lunes a sabado de 8:00am a 6:00pm')
    instagram = db.Column(db.String(500), default='https://www.instagram.com/praeclimatizacion/')
    facebook = db.Column(db.String(500), default='https://web.facebook.com/refriulises/')
    tiktok = db.Column(db.String(500), default='https://www.tiktok.com/@prae_climatizacion')

    def to_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns if c.name != 'id'}
