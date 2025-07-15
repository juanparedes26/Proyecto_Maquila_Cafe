from flask_admin.contrib.sqla import ModelView
from app.models import User

class UserAdmin(ModelView):
    column_list = ('id', 'name', 'email')           # Solo muestra estos campos en la lista
    column_exclude_list = ['password']              # Oculta 'password' en la lista y detalles
    form_excluded_columns = ['password']            # Oculta 'password' en el formulario

def register_admin_views(admin, db):
    admin.add_view(UserAdmin(User, db.session))