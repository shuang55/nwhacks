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

#tentative...
@expense.route("/save")
def save_receipt_as_expense():
    """
    Takes a local receipt path and runs the image through the Form
    """
    
    #Call the endpoint that converts the receipt to usable data
    #begin_recognize_content to run recognizer on local files
    # https://docs.microsoft.com/en-us/python/api/azure-ai-formrecognizer/azure.ai.formrecognizer.formrecognizerclient?view=azure-python


    #Save receipt as multiple expenses to DB
    return 'Save'



@expense.route('/get_expenses', methods=["GET"])
def get_expenses():
    # query expenses by month
    session = Session()
    month = request.args.get('month')
    print(month)
    expense_list = session.query(Expense).filter(extract('month', Expense.date) == month).all()

    print(expense_list)
    
    parsed = [{'item_name': exp.item_name, 'vendor_name' : exp.vendor_name, 'date' : exp.date, 'price' : exp.price, 'quantity' : exp.quantity} for exp in expense_list]

    return {'expenses' : parsed}
