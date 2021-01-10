import psycopg2 as db
from flask import Flask
from service.auth import auth as auth_blueprint
from sqlalchemy import create_engine
from sqlalchemy import Table, Column, String, MetaData

app = Flask(__name__)

# con = db.connect(database="postgres", user="siwonpark", password = "", host="localhost", post="5432")

app.register_blueprint(auth_blueprint)
db_string = "postgresql://siwonpark:@localhost:5432/postgres"

db = create_engine(db_string)
# table = Table('hi', MetaData(db), Column('nice', String))

# with db.connect() as conn:
#     table.create()
    
@app.route('/')
def index():
    return "This is an example app"

