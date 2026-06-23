from flask import Blueprint, jsonify, request, current_app
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
import requests
from app.models import User
from app.extensions import db

auth_bp = Blueprint('auth', __name__)


@auth_bp.route('/google', methods=['POST'])
def google_login():
    data = request.get_json(silent=True)
    if not data or not data.get('credential'):
        return jsonify({'success': False, 'message': 'Credential required'}), 400

    try:
        resp = requests.post('https://oauth2.googleapis.com/tokeninfo', params={
            'id_token': data['credential']
        }, timeout=10)
        if resp.status_code != 200:
            return jsonify({'success': False, 'message': 'Invalid token'}), 401
        info = resp.json()

        if info.get('aud') != current_app.config['GOOGLE_CLIENT_ID']:
            return jsonify({'success': False, 'message': 'Invalid audience'}), 401

        google_id = info['sub']
        email = info['email']
        nombre = info.get('name', email.split('@')[0])
        avatar = info.get('picture')

        user = User.query.filter_by(google_id=google_id).first()
        if not user:
            user = User.query.filter_by(email=email).first()
            if user:
                user.google_id = google_id
                user.avatar_url = avatar or user.avatar_url
            else:
                user = User(google_id=google_id, email=email, nombre=nombre, avatar_url=avatar)
                db.session.add(user)
        else:
            user.nombre = nombre
            user.avatar_url = avatar or user.avatar_url

        db.session.commit()

        token = create_access_token(identity=user.id)
        return jsonify({'success': True, 'token': token, 'user': user.to_dict()})

    except requests.RequestException:
        return jsonify({'success': False, 'message': 'Google verification failed'}), 502


@auth_bp.route('/me', methods=['GET'])
@jwt_required(optional=True)
def get_me():
    user_id = get_jwt_identity()
    if not user_id:
        return jsonify({'success': False, 'message': 'Not authenticated'}), 401
    user = User.query.get(user_id)
    if not user:
        return jsonify({'success': False, 'message': 'User not found'}), 404
    return jsonify({'success': True, 'data': user.to_dict()})


@auth_bp.route('/logout', methods=['POST'])
def logout():
    return jsonify({'success': True, 'message': 'Logged out'})
