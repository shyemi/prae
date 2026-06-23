from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import (
    User, Categoria, Producto, Servicio, Trabajo,
    Oferta, Testimonio, Cotizacion, MensajeContacto, Config as ConfigModel
)
from app.extensions import db
from app.utils import admin_required, validate_json
import re

admin_bp = Blueprint('admin', __name__)


def _ok(data, status=200):
    return jsonify({'success': True, 'data': data}), status


def _err(msg, status=400):
    return jsonify({'success': False, 'message': msg}), status


def _slugify(text):
    return re.sub(r'[^a-z0-9]+', '-', text.lower()).strip('-')


def _paginate(query, page, per_page=20):
    p = query.paginate(page=page, per_page=per_page, error_out=False)
    return {
        'items': [item.to_dict() for item in p.items],
        'total': p.total,
        'page': p.page,
        'pages': p.pages,
        'per_page': p.per_page,
    }


# === AUTH CHECK ===
@admin_bp.route('/check', methods=['GET'])
@jwt_required()
@admin_required
def check():
    return _ok({'message': 'Admin access granted'})


# === DASHBOARD ===
@admin_bp.route('/dashboard', methods=['GET'])
@jwt_required()
@admin_required
def dashboard():
    return _ok({
        'productos': Producto.query.count(),
        'servicios': Servicio.query.count(),
        'trabajos': Trabajo.query.count(),
        'ofertas': Oferta.query.count(),
        'testimonios_pendientes': Testimonio.query.filter_by(aprobado=False).count(),
        'testimonios_aprobados': Testimonio.query.filter_by(aprobado=True).count(),
        'cotizaciones_no_leidas': Cotizacion.query.filter_by(leida=False).count(),
        'cotizaciones_totales': Cotizacion.query.count(),
        'mensajes_no_leidos': MensajeContacto.query.filter_by(leido=False).count(),
        'usuarios': User.query.count(),
        'categorias': Categoria.query.count(),
    })


# === USERS ===
@admin_bp.route('/users', methods=['GET'])
@jwt_required()
@admin_required
def get_users():
    users = User.query.order_by(User.created_at.desc()).all()
    return _ok([u.to_dict() for u in users])


# === CATEGORIAS ===
@admin_bp.route('/categorias', methods=['GET'])
@jwt_required()
@admin_required
def get_categorias():
    cats = Categoria.query.order_by(Categoria.nombre).all()
    return _ok([c.to_dict() for c in cats])


@admin_bp.route('/categorias', methods=['POST'])
@jwt_required()
@admin_required
@validate_json('nombre')
def create_categoria():
    data = request.get_json()
    c = Categoria(nombre=data['nombre'], slug=_slugify(data['nombre']), descripcion=data.get('descripcion'))
    db.session.add(c)
    db.session.commit()
    return _ok(c.to_dict(), 201)


@admin_bp.route('/categorias/<int:id>', methods=['PUT'])
@jwt_required()
@admin_required
def update_categoria(id):
    c = Categoria.query.get_or_404(id)
    data = request.get_json(silent=True) or {}
    if 'nombre' in data:
        c.nombre = data['nombre']
        c.slug = _slugify(data['nombre'])
    if 'descripcion' in data:
        c.descripcion = data['descripcion']
    if 'activo' in data:
        c.activo = data['activo']
    db.session.commit()
    return _ok(c.to_dict())


@admin_bp.route('/categorias/<int:id>', methods=['DELETE'])
@jwt_required()
@admin_required
def delete_categoria(id):
    c = Categoria.query.get_or_404(id)
    db.session.delete(c)
    db.session.commit()
    return _ok({'message': 'Categoria eliminada'})


# === PRODUCTOS ===
@admin_bp.route('/productos', methods=['GET'])
@jwt_required()
@admin_required
def get_productos():
    page = request.args.get('page', 1, type=int)
    query = Producto.query.order_by(Producto.created_at.desc())
    return _ok(_paginate(query, page))


@admin_bp.route('/productos', methods=['POST'])
@jwt_required()
@admin_required
@validate_json('nombre')
def create_producto():
    data = request.get_json()
    p = Producto(
        nombre=data['nombre'],
        slug=_slugify(data['nombre']),
        descripcion=data.get('descripcion'),
        precio=data.get('precio'),
        disponibilidad=data.get('disponibilidad', 'disponible'),
        categoria_id=data.get('categoria_id'),
        imagenes=data.get('imagenes', []),
    )
    db.session.add(p)
    db.session.commit()
    return _ok(p.to_dict(), 201)


@admin_bp.route('/productos/<int:id>', methods=['PUT'])
@jwt_required()
@admin_required
def update_producto(id):
    p = Producto.query.get_or_404(id)
    data = request.get_json(silent=True) or {}
    for field in ('nombre', 'descripcion', 'precio', 'disponibilidad', 'activo', 'categoria_id', 'imagenes'):
        if field in data:
            setattr(p, field, data[field])
    if 'nombre' in data:
        p.slug = _slugify(data['nombre'])
    db.session.commit()
    return _ok(p.to_dict())


@admin_bp.route('/productos/<int:id>', methods=['DELETE'])
@jwt_required()
@admin_required
def delete_producto(id):
    p = Producto.query.get_or_404(id)
    db.session.delete(p)
    db.session.commit()
    return _ok({'message': 'Producto eliminado'})


# === SERVICIOS ===
@admin_bp.route('/servicios', methods=['GET'])
@jwt_required()
@admin_required
def get_servicios():
    servicios = Servicio.query.order_by(Servicio.nombre).all()
    return _ok([s.to_dict() for s in servicios])


@admin_bp.route('/servicios', methods=['POST'])
@jwt_required()
@admin_required
@validate_json('nombre')
def create_servicio():
    data = request.get_json()
    s = Servicio(
        nombre=data['nombre'],
        slug=_slugify(data['nombre']),
        descripcion_corta=data.get('descripcion_corta'),
        descripcion_larga=data.get('descripcion_larga'),
        imagenes=data.get('imagenes', []),
    )
    db.session.add(s)
    db.session.commit()
    return _ok(s.to_dict(), 201)


@admin_bp.route('/servicios/<int:id>', methods=['PUT'])
@jwt_required()
@admin_required
def update_servicio(id):
    s = Servicio.query.get_or_404(id)
    data = request.get_json(silent=True) or {}
    for field in ('nombre', 'descripcion_corta', 'descripcion_larga', 'activo', 'imagenes'):
        if field in data:
            setattr(s, field, data[field])
    if 'nombre' in data:
        s.slug = _slugify(data['nombre'])
    db.session.commit()
    return _ok(s.to_dict())


@admin_bp.route('/servicios/<int:id>', methods=['DELETE'])
@jwt_required()
@admin_required
def delete_servicio(id):
    s = Servicio.query.get_or_404(id)
    db.session.delete(s)
    db.session.commit()
    return _ok({'message': 'Servicio eliminado'})


# === TRABAJOS ===
@admin_bp.route('/trabajos', methods=['GET'])
@jwt_required()
@admin_required
def get_trabajos():
    page = request.args.get('page', 1, type=int)
    query = Trabajo.query.order_by(Trabajo.created_at.desc())
    return _ok(_paginate(query, page))


@admin_bp.route('/trabajos', methods=['POST'])
@jwt_required()
@admin_required
@validate_json('titulo')
def create_trabajo():
    data = request.get_json()
    t = Trabajo(
        titulo=data['titulo'],
        descripcion=data.get('descripcion'),
        media=data.get('media', []),
    )
    db.session.add(t)
    db.session.commit()
    return _ok(t.to_dict(), 201)


@admin_bp.route('/trabajos/<int:id>', methods=['PUT'])
@jwt_required()
@admin_required
def update_trabajo(id):
    t = Trabajo.query.get_or_404(id)
    data = request.get_json(silent=True) or {}
    for field in ('titulo', 'descripcion', 'activo', 'media'):
        if field in data:
            setattr(t, field, data[field])
    db.session.commit()
    return _ok(t.to_dict())


@admin_bp.route('/trabajos/<int:id>', methods=['DELETE'])
@jwt_required()
@admin_required
def delete_trabajo(id):
    t = Trabajo.query.get_or_404(id)
    db.session.delete(t)
    db.session.commit()
    return _ok({'message': 'Trabajo eliminado'})


# === OFERTAS ===
@admin_bp.route('/ofertas', methods=['GET'])
@jwt_required()
@admin_required
def get_ofertas():
    ofertas = Oferta.query.order_by(Oferta.created_at.desc()).all()
    return _ok([o.to_dict() for o in ofertas])


@admin_bp.route('/ofertas', methods=['POST'])
@jwt_required()
@admin_required
@validate_json('titulo')
def create_oferta():
    data = request.get_json()
    o = Oferta(
        titulo=data['titulo'],
        descripcion=data.get('descripcion'),
        imagen_url=data.get('imagen_url'),
        destacada=data.get('destacada', False),
        producto_ids=data.get('producto_ids', []),
    )
    db.session.add(o)
    db.session.commit()
    return _ok(o.to_dict(), 201)


@admin_bp.route('/ofertas/<int:id>', methods=['PUT'])
@jwt_required()
@admin_required
def update_oferta(id):
    o = Oferta.query.get_or_404(id)
    data = request.get_json(silent=True) or {}
    for field in ('titulo', 'descripcion', 'imagen_url', 'destacada', 'activa', 'producto_ids'):
        if field in data:
            setattr(o, field, data[field])
    db.session.commit()
    return _ok(o.to_dict())


@admin_bp.route('/ofertas/<int:id>', methods=['DELETE'])
@jwt_required()
@admin_required
def delete_oferta(id):
    o = Oferta.query.get_or_404(id)
    db.session.delete(o)
    db.session.commit()
    return _ok({'message': 'Oferta eliminada'})


# === TESTIMONIOS ===
@admin_bp.route('/testimonios', methods=['GET'])
@jwt_required()
@admin_required
def get_testimonios():
    page = request.args.get('page', 1, type=int)
    aprobado = request.args.get('aprobado')
    query = Testimonio.query.order_by(Testimonio.created_at.desc())
    if aprobado is not None:
        query = query.filter_by(aprobado=aprobado == 'true')
    return _ok(_paginate(query, page))


@admin_bp.route('/testimonios/<int:id>/aprobar', methods=['PUT'])
@jwt_required()
@admin_required
def aprobar_testimonio(id):
    t = Testimonio.query.get_or_404(id)
    t.aprobado = not t.aprobado
    db.session.commit()
    return _ok(t.to_dict())


@admin_bp.route('/testimonios/<int:id>', methods=['DELETE'])
@jwt_required()
@admin_required
def delete_testimonio(id):
    t = Testimonio.query.get_or_404(id)
    db.session.delete(t)
    db.session.commit()
    return _ok({'message': 'Testimonio eliminado'})


# === COTIZACIONES ===
@admin_bp.route('/cotizaciones', methods=['GET'])
@jwt_required()
@admin_required
def get_cotizaciones():
    page = request.args.get('page', 1, type=int)
    query = Cotizacion.query.order_by(Cotizacion.created_at.desc())
    return _ok(_paginate(query, page))


@admin_bp.route('/cotizaciones/<int:id>/leer', methods=['PUT'])
@jwt_required()
@admin_required
def marcar_leida(id):
    c = Cotizacion.query.get_or_404(id)
    c.leida = True
    db.session.commit()
    return _ok(c.to_dict())


@admin_bp.route('/cotizaciones/<int:id>', methods=['DELETE'])
@jwt_required()
@admin_required
def delete_cotizacion(id):
    c = Cotizacion.query.get_or_404(id)
    db.session.delete(c)
    db.session.commit()
    return _ok({'message': 'Cotizacion eliminada'})


# === MENSAJES ===
@admin_bp.route('/mensajes', methods=['GET'])
@jwt_required()
@admin_required
def get_mensajes():
    page = request.args.get('page', 1, type=int)
    query = MensajeContacto.query.order_by(MensajeContacto.created_at.desc())
    return _ok(_paginate(query, page))


@admin_bp.route('/mensajes/<int:id>/leer', methods=['PUT'])
@jwt_required()
@admin_required
def marcar_mensaje_leido(id):
    m = MensajeContacto.query.get_or_404(id)
    m.leido = True
    db.session.commit()
    return _ok(m.to_dict())


@admin_bp.route('/mensajes/<int:id>', methods=['DELETE'])
@jwt_required()
@admin_required
def delete_mensaje(id):
    m = MensajeContacto.query.get_or_404(id)
    db.session.delete(m)
    db.session.commit()
    return _ok({'message': 'Mensaje eliminado'})
