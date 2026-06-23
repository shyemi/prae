from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import Categoria, Producto, Servicio, Trabajo, Oferta, Testimonio, Cotizacion, MensajeContacto, Config
from app.extensions import db

public_bp = Blueprint('public', __name__)


def _ok(data, status=200):
    return jsonify({'success': True, 'data': data}), status


def _err(msg, status=400):
    return jsonify({'success': False, 'message': msg}), status


# === CATEGORIAS ===
@public_bp.route('/categorias', methods=['GET'])
def get_categorias():
    categorias = Categoria.query.filter_by(activo=True).order_by(Categoria.nombre).all()
    return _ok([c.to_dict() for c in categorias])


# === PRODUCTOS ===
@public_bp.route('/productos', methods=['GET'])
def get_productos():
    query = Producto.query.filter_by(activo=True)
    categoria = request.args.get('categoria')
    if categoria:
        query = query.join(Categoria).filter(Categoria.slug == categoria)
    productos = query.order_by(Producto.created_at.desc()).all()
    return _ok([p.to_dict() for p in productos])


@public_bp.route('/productos/<slug>', methods=['GET'])
def get_producto(slug):
    p = Producto.query.filter_by(slug=slug, activo=True).first()
    if not p:
        return _err('Producto no encontrado', 404)
    return _ok(p.to_dict())


# === SERVICIOS ===
@public_bp.route('/servicios', methods=['GET'])
def get_servicios():
    servicios = Servicio.query.filter_by(activo=True).order_by(Servicio.nombre).all()
    return _ok([s.to_dict() for s in servicios])


@public_bp.route('/servicios/<slug>', methods=['GET'])
def get_servicio(slug):
    s = Servicio.query.filter_by(slug=slug, activo=True).first()
    if not s:
        return _err('Servicio no encontrado', 404)
    return _ok(s.to_dict())


# === TRABAJOS ===
@public_bp.route('/trabajos', methods=['GET'])
def get_trabajos():
    trabajos = Trabajo.query.filter_by(activo=True).order_by(Trabajo.created_at.desc()).all()
    return _ok([t.to_dict() for t in trabajos])


# === TESTIMONIOS ===
@public_bp.route('/testimonios', methods=['GET'])
def get_testimonios():
    testimonios = Testimonio.query.filter_by(aprobado=True).order_by(Testimonio.created_at.desc()).all()
    return _ok([t.to_dict() for t in testimonios])


@public_bp.route('/testimonios', methods=['POST'])
@jwt_required(optional=True)
def create_testimonio():
    data = request.get_json(silent=True)
    if not data or not data.get('comentario'):
        return _err('Comentario requerido', 400)

    user_id = get_jwt_identity()
    t = Testimonio(
        user_id=user_id,
        nombre_publico=data.get('nombre_publico'),
        comentario=data['comentario'],
        calificacion=data.get('calificacion', 5),
    )
    db.session.add(t)
    db.session.commit()
    return _ok(t.to_dict(), 201)


# === OFERTAS ===
@public_bp.route('/ofertas', methods=['GET'])
def get_ofertas():
    query = Oferta.query.filter_by(activa=True)
    if request.args.get('destacadas') == 'true':
        query = query.filter_by(destacada=True)
    ofertas = query.order_by(Oferta.created_at.desc()).all()
    return _ok([o.to_dict() for o in ofertas])


# === COTIZACIONES ===
@public_bp.route('/cotizaciones', methods=['POST'])
def create_cotizacion():
    data = request.get_json(silent=True)
    if not data or not data.get('nombre_cliente'):
        return _err('Nombre del cliente requerido', 400)

    c = Cotizacion(
        nombre_cliente=data['nombre_cliente'],
        email=data.get('email'),
        telefono=data.get('telefono'),
        whatsapp=data.get('whatsapp'),
        mensaje=data.get('mensaje'),
        items=data.get('items', []),
    )
    db.session.add(c)
    db.session.commit()
    return _ok(c.to_dict(), 201)


# === CONTACTO ===
@public_bp.route('/contacto', methods=['POST'])
def send_contacto():
    data = request.get_json(silent=True)
    if not data or not data.get('nombre') or not data.get('mensaje'):
        return _err('Nombre y mensaje requeridos', 400)

    m = MensajeContacto(
        nombre=data['nombre'],
        email=data.get('email'),
        telefono=data.get('telefono'),
        mensaje=data['mensaje'],
    )
    db.session.add(m)
    db.session.commit()
    return _ok(m.to_dict(), 201)


# === BTU ===
@public_bp.route('/calcular-btu', methods=['POST'])
def calcular_btu():
    data = request.get_json(silent=True)
    if not data:
        return _err('Datos requeridos', 400)

    try:
        largo = float(data.get('largo', 0))
        ancho = float(data.get('ancho', 0))
        alto = float(data.get('alto', 9))
    except (TypeError, ValueError):
        return _err('Valores invalidos', 400)

    if largo <= 0 or ancho <= 0:
        return _err('Largo y ancho deben ser mayores a 0', 400)

    area = round(largo * ancho, 2)
    volumen = round(area * alto, 2)
    btu_base = area * 25
    btu_recomendado = round(btu_base / 1000) * 1000
    toneladas = round(btu_recomendado / 12000, 1) if btu_recomendado else None

    return _ok({
        'areaPiesCuadrados': area,
        'volumenPiesCubicos': volumen,
        'btuEstimado': round(btu_base),
        'btuRecomendado': btu_recomendado,
        'toneladasAproximadas': toneladas,
        'mensaje': 'Recomendamos una evaluacion presencial para una solucion exacta.',
        'nota': 'Este calculo es aproximado y no constituye un diagnostico tecnico.',
    })
