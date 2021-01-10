import hashlib
from flask import Blueprint, redirect, url_for, request
from ..models import User

auth = Blueprint('auth', __name__)

@auth.route('/login')
def login():
    return 'Login'

@auth.route('/signup', methods=['POST'])
def signup_post():
    email = request.form.get('email')
    name = request.form.get('name')
    password = request.form.get('password')

    user = User.query.filter_by(email=email).first()

    if user: 
        return redirect(url_for('auth.login'))
    
    new_user = User(email=email, name=name, password=hashlib.sha256(password.encode))



@auth.route('/logout')
def logout():
    return 'Logout'
