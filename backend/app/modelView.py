from flask_admin.contrib.sqla import ModelView
from app.models import User,Cliente,Maquila

class UserAdmin(ModelView):
    column_list = ('id', 'name', 'email')           # Solo muestra estos campos en la lista
    column_exclude_list = ['password']              # Oculta 'password' en la lista y detalles
    form_excluded_columns = ['password']     
    
class cliente(ModelView):
    column_list=("id","nombre","celular")    

class MaquilaAdmin(ModelView):
    column_list = (
        'id',
        'fecha',
        'cliente_id',
        'cliente.nombre',         # Muestra el nombre del cliente
        'peso_kg',
        'esta_trillado',
        'peso_despues_trilla_kg',
        'grado_tostion',
        'tipo_empaque',
        'porcentaje_merma',
        'precio_total',
        'detalle_precio',
        'observaciones'
    ) 
    
  # Oculta 'password' en el formulario

def register_admin_views(admin, db):
    admin.add_view(UserAdmin(User, db.session))
    admin.add_view(ModelView(Cliente, db.session))
    admin.add_view(MaquilaAdmin(Maquila, db.session))