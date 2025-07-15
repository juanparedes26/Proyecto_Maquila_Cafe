from flask_admin.contrib.sqla import ModelView
from app.models import User  # importa tus modelos aquí

def register_admin_views(admin, db):
    admin.add_view(ModelView(User, db.session))
    # Agrega aquí más ModelView si tienes otros modelos