from app import db
from datetime import datetime

class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)  # Guarda el hash

    clientes = db.relationship("Cliente", back_populates="user", cascade="all, delete-orphan")

class Cliente(db.Model):
    __tablename__ = "clientes"
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    celular = db.Column(db.String(20), unique=True, nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    user = db.relationship("User", back_populates="clientes")

    maquilas = db.relationship("Maquila", back_populates="cliente", cascade="all, delete-orphan")

class Maquila(db.Model):
    __tablename__ = "maquilas"
    id = db.Column(db.Integer, primary_key=True, index=True)
    fecha = db.Column(db.DateTime, default=datetime.utcnow)

    peso_kg = db.Column(db.Float, nullable=False)
    esta_trillado = db.Column(db.Boolean, default=False)
    peso_despues_trilla_kg = db.Column(db.Float, nullable=True)

    grado_tostion = db.Column(db.String(20), nullable=True)  # "Baja", "Media", "Alta"
    tipo_empaque = db.Column(db.String(20), nullable=True)   # "Granel", "Libra"
    porcentaje_merma = db.Column(db.Float, nullable=True)

    precio_total = db.Column(db.Float, nullable=True)
    detalle_precio = db.Column(db.String(255), nullable=True)
    observaciones = db.Column(db.String(255), nullable=True)

    cliente_id = db.Column(db.Integer, db.ForeignKey("clientes.id"))
    cliente = db.relationship("Cliente", back_populates="maquilas")