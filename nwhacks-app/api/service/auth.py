import hashlib
from flask import Blueprint, redirect, url_for, request
from werkzeug.security import generate_password_hash, check_password_hash
from ..models import User
from ..db import Session

auth = Blueprint('auth', __name__)

@auth.route('/login')
def login():
    return 'Login'

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
