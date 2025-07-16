from flask import Blueprint, request, jsonify
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from app import db, bcrypt
from app.models import User , Cliente , Maquila
from datetime import timedelta


admin_bp = Blueprint('admin', __name__)

# RUTA TEST de http://127.0.0.1:5000/admin_bp que muestra "Hola mundo":
@admin_bp.route('/', methods=['GET'])
def show_hello_world():
     return "Hola mundo",200


# RUTA CREAR USUARIO
@admin_bp.route('/users', methods=['POST'])
def create_user():
    try:
        username = request.json.get('username')
        password = request.json.get('password')
        name = request.json.get('name')

        if not username or not password or not name:
            return jsonify({'error': 'Username, password and Name are required.'}), 400

        existing_user = User.query.filter_by(username=username).first()
        if existing_user:
            return jsonify({'error': 'Username already exists.'}), 409

        password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

        new_user = User(username=username, password=password_hash, name=name)


        db.session.add(new_user)
        db.session.commit()

        good_to_share_user = {
            'id': new_user.id,
            'name':new_user.name,
            'username':new_user.username
        }

        return jsonify({'message': 'User created successfully.','user_created':good_to_share_user}), 201

    except Exception as e:
        return jsonify({'error': 'Error in user creation: ' + str(e)}), 500


#RUTA LOG-IN ( CON TOKEN DE RESPUESTA )
@admin_bp.route('/login', methods=['POST'])
def get_token():
    try:

        username = request.json.get('username')
        password = request.json.get('password')

        if not username or not password:
            return jsonify({'error': 'Username and password are required.'}), 400
        
        login_user = User.query.filter_by(username=request.json['username']).one()

        password_from_db = login_user.password
        true_o_false = bcrypt.check_password_hash(password_from_db, password)
        
        if true_o_false:
            expires = timedelta(minutes=60)

            user_id = login_user.id
            access_token = create_access_token(identity=str(user_id), expires_delta=expires)
            return jsonify({ 'access_token':access_token,"user":{
                'id': login_user.id,
                'name': login_user.name,
                'username': login_user.username
            }}), 200

        else:
            return {"Error":"Contraseña  incorrecta"}
    
    except Exception as e:
        return {"Error":"El username proporcionado no corresponde a ninguno registrado: " + str(e)}, 500
    
    

@admin_bp.route('/clientes')
@jwt_required()
def show_clientes():
    current_user_id = get_jwt_identity()
    if current_user_id:
        clientes = Cliente.query.all()
        cliente_list = []
        for cliente in clientes:
            cliente_dict = {
                'id': cliente.id,
                'nombre': cliente.nombre,
                'celular': cliente.celular
            }
            cliente_list.append(cliente_dict)
        return jsonify(cliente_list), 200
    else:
        return {"Error": "Token inválido o no proporcionado"}, 401
    
@admin_bp.route("/clientes", methods=["POST"])
@jwt_required()
def create_cliente():
    current_user_id = get_jwt_identity()
    if not current_user_id:
        return {"Error": "Token inválido o no proporcionado"}, 401

    try:
        nombre = request.json.get('nombre')
        celular = request.json.get('celular')

        if not nombre or not celular:
            return jsonify({'error': 'Nombre and Celular are required.'}), 400

        new_cliente = Cliente(nombre=nombre, celular=celular, user_id=current_user_id)
        db.session.add(new_cliente)
        db.session.commit()

        return jsonify({'message': 'Cliente created successfully.', 'cliente_id': new_cliente.id}), 201

    except Exception as e:
        return jsonify({'error': 'Error in cliente creation: ' + str(e)}), 500
    
@admin_bp.route("/maquilas", methods=["POST"])
@jwt_required()

def create_maquila():
    current_user_id = get_jwt_identity()
    if not current_user_id:
        return {"Error": "Token inválido o no proporcionado"}, 401

    try:
        cliente_id = request.json.get('cliente_id')
        peso_kg = request.json.get('peso_kg')
        esta_trillado = request.json.get('esta_trillado', False)
        peso_despues_trilla_kg = request.json.get('peso_despues_trilla_kg')
        grado_tostion = request.json.get('grado_tostion')
        tipo_empaque = request.json.get('tipo_empaque')
        porcentaje_merma = request.json.get('porcentaje_merma')
        precio_total = request.json.get('precio_total')
        detalle_precio = request.json.get('detalle_precio')
        observaciones = request.json.get('observaciones')

        if not cliente_id or not peso_kg:
            return jsonify({'error': 'Cliente ID and Peso KG are required.'}), 400

        new_maquila = Maquila(
            cliente_id=cliente_id,
            peso_kg=peso_kg,
            esta_trillado=esta_trillado,
            peso_despues_trilla_kg=peso_despues_trilla_kg,
            grado_tostion=grado_tostion,
            tipo_empaque=tipo_empaque,
            porcentaje_merma=porcentaje_merma,
            precio_total=precio_total,
            detalle_precio=detalle_precio,
            observaciones=observaciones
        )
        
        db.session.add(new_maquila)
        db.session.commit()

        return jsonify({'message': 'Maquila created successfully.', 'maquila_id': new_maquila.id}), 201

    except Exception as e:
        return jsonify({'error': 'Error in maquila creation: ' + str(e)}), 500
    
@admin_bp.route("/maquilas", methods=["GET"])
@jwt_required()

def get_maquilas():
    current_user_id = get_jwt_identity()
    if not current_user_id:
        return {"Error": "Token inválido o no proporcionado"}, 401

    try:
        maquilas = Maquila.query.all()
        maquila_list = []
        for maquila in maquilas:
            maquila_dict = {
                'id': maquila.id,
                'fecha': maquila.fecha,
                "nombre_cliente": maquila.cliente.nombre if maquila.cliente else None,
                "celular_cliente": maquila.cliente.celular if maquila.cliente else None,
                'cliente_id': maquila.cliente_id,
                'peso_kg': maquila.peso_kg,
                'esta_trillado': maquila.esta_trillado,
                'peso_despues_trilla_kg': maquila.peso_despues_trilla_kg,
                'grado_tostion': maquila.grado_tostion,
                'tipo_empaque': maquila.tipo_empaque,
                'porcentaje_merma': maquila.porcentaje_merma,
                'precio_total': maquila.precio_total,
                'detalle_precio': maquila.detalle_precio,
                'observaciones': maquila.observaciones
            }
            maquila_list.append(maquila_dict)
        return jsonify(maquila_list), 200

    except Exception as e:
        return jsonify({'error': 'Error fetching maquilas: ' + str(e)}), 500

@admin_bp.route("/clientes/<int:cliente_id>/maquilas", methods=["GET"])
@jwt_required()
def get_maquilas_by_cliente(cliente_id):
    maquilas = Maquila.query.filter_by(cliente_id=cliente_id).all()
    maquila_list = [{
        'id': m.id,
        'fecha': m.fecha,
        'peso_kg': m.peso_kg,
        'esta_trillado': m.esta_trillado,
        'peso_despues_trilla_kg': m.peso_despues_trilla_kg,
        'grado_tostion': m.grado_tostion,
        'tipo_empaque': m.tipo_empaque,
        'porcentaje_merma': m.porcentaje_merma,
        'precio_total': m.precio_total,
        'detalle_precio': m.detalle_precio,
        'observaciones': m.observaciones
    } for m in maquilas]
    return jsonify(maquila_list), 200

@admin_bp.route("/clientes/<int:cliente_id>", methods=["PUT"])
@jwt_required()
def update_cliente(cliente_id):
    cliente = Cliente.query.get_or_404(cliente_id)
    nombre = request.json.get('nombre')
    celular = request.json.get('celular')
    if nombre: cliente.nombre = nombre
    if celular: cliente.celular = celular
    db.session.commit()
    return jsonify({'message': 'Cliente actualizado'}), 200
@admin_bp.route("/clientes/<int:cliente_id>", methods=["DELETE"])
@jwt_required()
def delete_cliente(cliente_id):
    cliente = Cliente.query.get_or_404(cliente_id)
    db.session.delete(cliente)
    db.session.commit()
    return jsonify({'message': 'Cliente eliminado'}), 200

@admin_bp.route("/maquilas/<int:maquila_id>", methods=["PUT"])
@jwt_required()
def update_maquila(maquila_id):
    maquila = Maquila.query.get_or_404(maquila_id)
    # Actualiza los campos según el request
    for field in ['peso_kg', 'esta_trillado', 'peso_despues_trilla_kg', 'grado_tostion', 'tipo_empaque', 'porcentaje_merma', 'precio_total', 'detalle_precio', 'observaciones']:
        value = request.json.get(field)
        if value is not None:
            setattr(maquila, field, value)
    db.session.commit()
    return jsonify({'message': 'Maquila actualizada'}), 200

@admin_bp.route("/maquilas/<int:maquila_id>", methods=["DELETE"])
@jwt_required()
def delete_maquila(maquila_id):
    maquila = Maquila.query.get_or_404(maquila_id)
    db.session.delete(maquila)
    db.session.commit()
    return jsonify({'message': 'Maquila eliminada'}), 200