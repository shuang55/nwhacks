import psycopg2 as db
from flask import Flask
from flask_login import LoginManager
from .service.expense_manager import expense as expense_blueprint
from .service.auth import auth as auth_blueprint
from .db import recreate_database, Session
from .service.form-client import form_client as form_client_blueprint
from .models import User

app = Flask(__name__)

app.config['SECRET_KEY'] = 'secret-key-goes-here'

app.register_blueprint(auth_blueprint)
app.register_blueprint(expense_blueprint)
app.register_blueprint(form_client_blueprint)

recreate_database()

login_manager = LoginManager()
login_manager.login_view = 'auth.login'
login_manager.init_app(app)

session = Session()

@login_manager.user_loader
def load_user(user_id):
    return session.query(User).get(int(user_id))

@app.route('/')
def index():
    return "This is an example app"

