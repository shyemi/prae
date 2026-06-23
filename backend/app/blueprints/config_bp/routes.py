from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required
from app.models import Config as ConfigModel
from app.extensions import db
from app.utils import admin_required

config_bp = Blueprint('config', __name__)


def _get_config():
    c = ConfigModel.query.get(1)
    if not c:
        c = ConfigModel()
        db.session.add(c)
        db.session.commit()
    return c


@config_bp.route('/', methods=['GET'])
def get_config():
    return jsonify({'success': True, 'data': _get_config().to_dict()})


@config_bp.route('/', methods=['PUT'])
@jwt_required()
@admin_required
def update_config():
    data = request.get_json(silent=True) or {}
    c = _get_config()
    allowed = [
        'nombre_negocio', 'slogan', 'meta_title', 'meta_description',
        'logo_url', 'telefono_principal', 'whatsapp_number',
        'email_contacto', 'direccion', 'horario',
        'instagram', 'facebook', 'tiktok',
    ]
    for key in allowed:
        if key in data:
            setattr(c, key, data[key])
    db.session.commit()
    return jsonify({'success': True, 'data': c.to_dict()})


# Also accept POST for compatibility
@config_bp.route('/', methods=['POST'])
def update_config_post():
    return update_config()
