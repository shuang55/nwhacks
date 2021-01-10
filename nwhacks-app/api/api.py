import psycopg2 as db
from flask import Flask
from auth.auth import auth as auth_blueprint

app = Flask(__name__)

# con = db.connect(database="postgres", user="siwonpark", password = "", host="localhost", post="5432")

app.register_blueprint(auth_blueprint)


@app.route('/')
def index():
    return "This is an example app"

