import psycopg2 as db
from flask import Flask
from .service.auth import auth as auth_blueprint
from .db import recreate_database

app = Flask(__name__)

app.register_blueprint(auth_blueprint)

@app.route('/')
def index():
    recreate_database()
    return "This is an example app"

