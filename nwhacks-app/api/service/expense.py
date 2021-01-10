# import os
# import hashlib
# from flask import Blueprint, redirect, url_for, request
# from ..models import User
# from ..models import Receipt
# from ..models import Expense
# from ..db import Session

# from ..config import KEY
# from ..config import ENDPOINT

# expense = Blueprint('expense', __name__)

# @form_client.route('/get_expenses', methods=["GET"])
# def get_expenses():
#     # query expenses by month
#     month = request.args.get('month')
#     expense_list = session.query(Expense).filter_by(Expense.date.month=month)

#     return {'expenses': expenses}