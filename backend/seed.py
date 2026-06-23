from app import create_app
from app.extensions import db
from app.models import User, Categoria, Config

app = create_app()


def seed():
    with app.app_context():
        db.create_all()

        if not User.query.first():
            admin = User(
                email='admin@prae.local',
                nombre='Admin PRAE',
                google_id='seed-admin',
                rol='super_admin',
            )
            db.session.add(admin)
            print('✓ Admin user created')

        if not Categoria.query.first():
            for cat in [
                ('Aires Acondicionados', 'aires-acondicionados', 'Equipos de climatizacion residencial y comercial'),
                ('Neveras y Refrigeradores', 'neveras-refrigeradores', 'Refrigeradores, congeladores y mas'),
                ('Piezas y Repuestos', 'piezas-repuestos', 'Componentes y repuestos para equipos'),
            ]:
                db.session.add(Categoria(nombre=cat[0], slug=cat[1], descripcion=cat[2]))
            print('✓ Categories seeded')

        if not Config.query.get(1):
            db.session.add(Config())
            print('✓ Config created')

        db.session.commit()
        print('✓ Database seeded successfully!')


if __name__ == '__main__':
    seed()
