from sqlalchemy import create_engine
from sqlalchemy import Table, Column, String, MetaData
from .config import DATABASE_URI
from .models import Base

engine = create_engine(DATABASE_URI)

def recreate_database():
    Base.metadata.drop_all(engine)
    Base.metadata.create_all(engine)