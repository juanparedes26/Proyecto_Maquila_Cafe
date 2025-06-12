# public_bp.py (Blueprint para las rutas públicas)
# Public está vacio para que lo llenes vos. Podes tener en cuenta las rutas de "admin_bp.py" Podrias hacer casi lo mismo acá.
# Si vas a hacer un copy paste, acordate que tenés que cambiarle los nombres a todas las rutas @admin_bp a @public_bp.
# Después no digas que no te avisé...

from flask import Blueprint, jsonify

public_bp = Blueprint('public', __name__)

@public_bp.route('/')
def home():
    return jsonify({'msg':'Home Page'})

@public_bp.route('/demo')
def demo():
    return jsonify({'msg':'Este es un mensaje que viene desde el backend, especificamente la Demo Page... :)'}), 200

@public_bp.route('/about')
def about():
    return jsonify({'msg':'About Page'})