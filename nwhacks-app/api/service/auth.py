from flask import Blueprint, redirect, url_for, request
from models.user import User

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


@auth.route('/logout')
def logout():
    return 'Logout'
