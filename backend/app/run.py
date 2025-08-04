from app import create_app, db
from flask import send_from_directory
import os

app = create_app()

@app.route("/")
def serve_frontend():
    return send_from_directory(app.static_folder, "index.html")

@app.route('/<path:path>')
def serve_static_files(path):
    if os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, "index.html")
    # Handler global para errores 500
@app.errorhandler(500)
def internal_error(error):
        app.logger.error("Error 500: %s", error, exc_info=True)
        return {"msg": "Internal server error"}, 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5100)
