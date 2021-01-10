from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Date, ForeignKey, Float
from sqlalchemy.orm import relationship
from flask_login import UserMixin

Base = declarative_base()

class User(Base, UserMixin):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True)
    email = Column(String(100), unique=True)
    password = Column(String(100))
    name = Column(String(1000))
    # expenses = relationship('Expense', backref='expense', lazy=True)

class Receipt(Base):
    __tablename__ = 'receipt'
    id = Column(Integer, primary_key=True)
    name = Column(String(100))
    date = Column(Date)
    num_items = Column(Integer)
    total_price = Column(Float)
    expenses = relationship('Expense', backref='expense', lazy=True)
    
class Expense(Base):
    __tablename__ = 'expense'
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer,  ForeignKey('user.id'))
    receipt_id = Column(Integer, ForeignKey('receipt.id'))
    item_name = Column(String(100))
    vendor_name = Column(String(100))
    date = Column(Date)
    price = Column(Float)
    quantity = Column(Integer)
