import uuid
from datetime import datetime, timezone
from app.extensions import db


def _uuid():
    return str(uuid.uuid4())


def _now():
    return datetime.now(timezone.utc)


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.String(36), primary_key=True, default=_uuid)
    google_id = db.Column(db.String(255), unique=True, nullable=True)
    email = db.Column(db.String(255), unique=True, nullable=False)
    nombre = db.Column(db.String(255), nullable=False)
    avatar_url = db.Column(db.String(500), nullable=True)
    rol = db.Column(db.String(20), default='user')
    activo = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=_now)

    testimonios = db.relationship('Testimonio', backref='user', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'nombre': self.nombre,
            'avatar_url': self.avatar_url,
            'rol': self.rol,
            'activo': self.activo,
            'created_at': self.created_at.isoformat() if self.created_at else None,
        }
