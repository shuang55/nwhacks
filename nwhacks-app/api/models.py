from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship
from flask_login import UserMixin

Base = declarative_base()

class User(Base, UserMixin):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True)
    email = Column(String(100), unique=True)
    password = Column(String(100))
    name = Column(String(1000))

class Receipt(Base):
    __tablename__ = 'receipt'
    id = Column(Integer, primary_key=True)
    name = Column(String(100))
    date = Column(Date)
    num_items = Column(Integer)
    expenses = relationship('Expense', backref='expense', lazy=True)
    
class Expense(Base):
    __tablename__ = 'expense'
    id = Column(Integer, primary_key=True)
    receipt_fk = Column(Integer, ForeignKey('receipt.id'))
    item_name = Column(String(100))
    price = Column(Integer)
    quantity = Column(Integer)
