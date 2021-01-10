import hashlib
from flask import Blueprint, redirect, url_for, request, flash
from werkzeug.security import generate_password_hash, check_password_hash
from ..models import User
from ..db import Session

auth = Blueprint('auth', __name__)

@auth.route('/login', methods=['GET'])
def login():
    return 'Login'
    
@auth.route('/login', methods=['POST'])
def login_post():
    session = Session()

    email = request.form.get('email')
    password = request.form.get('password')
    user = session.query(User).filter_by(email=email).first()

    if not user or not check_password_hash(user.password, password):
        return redirect(url_for('auth.login'))

    return "Logged in successfully!"

@auth.route('/signup', methods=['POST'])
def signup_post():
    session = Session()

    email = request.form.get('email')
    name = request.form.get('name')
    password = request.form.get('password')
    user = session.query(User).filter_by(email=email).first()

    if user: 
        return redirect(url_for('auth.login'))
    
    new_user = User(email=email, name=name, password=generate_password_hash(password, method='sha256'))
    session.add(new_user)
    session.commit()

    return redirect(url_for('auth.login'))

    

@auth.route('/logout')
def logout():
    return 'Logout'
