import os
import hashlib
import json
from sqlalchemy import extract
from flask import Blueprint, redirect, url_for, request, jsonify, make_response
from ..models import User
from ..models import Receipt
from ..models import Expense
from ..db import Session

from ..config import KEY
from ..config import ENDPOINT
expense = Blueprint('expense', __name__)

@expense.route('/get_expenses', methods=["GET"])
def get_expenses():
    # query expenses by month
    session = Session()
    month = request.args.get('month')
    user_id = request.args.get('user_id')
    expense_list = session.query(Expense).filter(extract('month', Expense.date) == month, Expense.user_id == user_id).all()

    print(expense_list)
    
    parsed = [{'item_name': exp.item_name, 'vendor_name' : exp.vendor_name, 'date' : exp.date, 'price' : exp.price, 'quantity' : exp.quantity} for exp in expense_list]

    return {'expenses' : parsed}

@expense.route('/get_all_expenses', methods=["GET"])
def get_all_expenses():
    # query expenses by month
    session = Session()
    user_id = request.args.get('user_id')
    expense_list = session.query(Expense).filter(Expense.user_id == user_id).all()

    print(expense_list)
    
    parsed = [{'item_name': exp.item_name, 'vendor_name' : exp.vendor_name, 'date' : exp.date, 'price' : exp.price, 'quantity' : exp.quantity} for exp in expense_list]

    return {'expenses' : parsed}

@expense.route('/delete_expense', methods=["DELETE"])
def delete_expense():
    session = Session()
    delete_id = request.args.get('delete_id')

    print('id', delete_id)

    deleted = session.query(Expense).filter(Expense.id == delete_id).delete()

    session.commit()
    print('deleted', deleted)
    return 'Success'
