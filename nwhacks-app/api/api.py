import psycopg2 as db
from flask import Flask
from .service.expense_manager import expense as expense_blueprint
from .service.auth import auth as auth_blueprint
from .db import recreate_database, Session
from .service.form-client import form_client as form_client_blueprint

app = Flask(__name__)

app.register_blueprint(auth_blueprint)
app.register_blueprint(expense_blueprint)
app.register_blueprint(form_client_blueprint)

recreate_database()
s = Session()

@app.route('/')
def index():
    return "This is an example app"

