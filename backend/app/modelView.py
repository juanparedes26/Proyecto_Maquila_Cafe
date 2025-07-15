from flask_admin.contrib.sqla import ModelView
from app.models import User  # importa tus modelos aquí


class UserAdmin(ModelView):
    form_excluded_columns = ['password']
    form_excluded_columns = ['password']   # Oculta el campo en el formulario

def register_admin_views(admin, db):
    admin.add_view(UserAdmin(User, db.session))