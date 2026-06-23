import os
from flask import Flask
from app.config import Config
from app.extensions import db, migrate, cors, jwt


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    db.init_app(app)
    migrate.init_app(app, db)
    cors.init_app(app, origins=app.config['FRONTEND_URL'], supports_credentials=True)
    jwt.init_app(app)

    from app.blueprints.auth.routes import auth_bp
    from app.blueprints.public.routes import public_bp
    from app.blueprints.admin.routes import admin_bp
    from app.blueprints.config_bp.routes import config_bp

    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(public_bp)
    app.register_blueprint(admin_bp, url_prefix='/admin')
    app.register_blueprint(config_bp, url_prefix='/config')

    @app.route('/health')
    def health():
        return {'status': 'ok'}

    return app
