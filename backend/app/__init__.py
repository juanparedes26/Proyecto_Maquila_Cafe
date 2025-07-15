import os
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from flask import Flask
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from flask_migrate import Migrate
from dotenv import load_dotenv

# Instancias que se inicializan más adelante
db = SQLAlchemy()
bcrypt = Bcrypt()
jwt = JWTManager()
migrate = Migrate()

def create_app():
    load_dotenv()

    app = Flask(__name__, static_folder="front/build", static_url_path="/")

    # Configuración básica
    app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URL")

    # Extensiones
    CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)
    db.init_app(app)
    bcrypt.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app, db, compare_type=True)


    admin = Admin(app, name="Panel Admin", template_mode="bootstrap3")
    from app.modelView import register_admin_views
    register_admin_views(admin, db)

    # Creamos carpeta de base de datos si no existe
    db_path = os.path.join(os.path.abspath(os.path.dirname(__file__)), 'instance', 'mydatabase.db')
    print(f"Ruta de la base de datos: {db_path}")
    if not os.path.exists(os.path.dirname(db_path)):
        os.makedirs(os.path.dirname(db_path))

    # Registramos blueprints
    from app.routes.admin_bp import admin_bp
    from app.routes.public_bp import public_bp
    app.register_blueprint(admin_bp, url_prefix='/panel', name='panel_bp')  # Cambia '/admin' por '/panel'
    app.register_blueprint(public_bp, url_prefix='/public')

    return app
