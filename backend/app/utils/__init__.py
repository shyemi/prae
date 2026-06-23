from functools import wraps
from flask import jsonify
from flask_jwt_extended import get_jwt_identity
from app.models import User


def admin_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        if not user or user.rol not in ('admin', 'super_admin'):
            return jsonify({'success': False, 'message': 'Admin access required'}), 403
        return f(*args, **kwargs)
    return decorated


def validate_json(*required_keys):
    def decorator(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            from flask import request
            data = request.get_json(silent=True)
            if not data:
                return jsonify({'success': False, 'message': 'JSON body required'}), 400
            missing = [k for k in required_keys if k not in data]
            if missing:
                return jsonify({'success': False, 'message': f'Missing fields: {", ".join(missing)}'}), 400
            return f(*args, **kwargs)
        return decorated
    return decorator
