import hashlib
from flask import Blueprint, redirect, url_for, request, flash, jsonify, make_response
from flask_login import login_user, logout_user, login_required, current_user
from flask_cors import cross_origin
from werkzeug.security import generate_password_hash, check_password_hash
from ..models import User
from ..db import Session

auth = Blueprint('auth', __name__)

@auth.route('/login', methods=['GET'])
def login():
    return 'Login'

@auth.route('/login', methods=['POST'])
@cross_origin(supports_credentials=True)
def login_post():
    session = Session()

    email = request.form.get('email')
    password = request.form.get('password')
    remember = True if request.form.get('remember') else False

    user = session.query(User).filter_by(email=email).first()

    if not user or not check_password_hash(user.password, password):
        return make_response({'message': 'Invalid login'}, 400)
    
    login_user(user, remember=remember)

    return make_response({'message': 'Successfully Logged In!', 'userID': user.id, 'userName': user.name}, 200)

@auth.route('/register', methods=['POST'])
@cross_origin(supports_credentials=True)
def register_post():
    session = Session()

    email = request.form.get('email')
    name = request.form.get('name')
    password = request.form.get('password')
    user = session.query(User).filter_by(email=email).first()

    if user: 
        return make_response({'message': 'User already Exists'}, 400)
 
    new_user = User(email=email, name=name, password=generate_password_hash(password, method='sha256'))
    session.add(new_user)
    session.commit()

    return make_response({'message': 'User successfully created'}, 200)

@auth.route('/profile')
@login_required
def profile():
    return 'Logged in as ' + current_user.name

@auth.route('/logout')
def logout():
    logout_user()
    return 'Logout'
