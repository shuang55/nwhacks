import os
import hashlib
from flask import Blueprint, redirect, url_for, request
from ..models import User
from ..models import Receipt
from ..models import Expense
from ..db import Session

from azure.core.exceptions import ResourceNotFoundError
from azure.ai.formrecognizer import FormRecognizerClient
from azure.ai.formrecognizer import FormTrainingClient
from azure.core.credentials import AzureKeyCredential

from .config import KEY
from .config import ENDPOINT


form_client = Blueprint('form-client', __name__)

@form_client.route('/extract_receipt', methods=["POST"])
def extract():
    session = Session()
    form_recognizer_client = FormRecognizerClient(ENDPOINT, AzureKeyCredential(KEY))

    receiptUrl = request.form.get('receipt')
    user_id = request.form.get('user_id')
    
    poller = form_recognizer_client.begin_recognize_receipts_from_url(receiptUrl)
    result = poller.result()

    receipts = []
    expenses = []

    for receipt in result:
        name = "unknown"
        date = "unknown"
        num_items = 0
        total_price = 0
        for name, field in receipt.fields.items():
            if name == "Items":
                print("Receipt Items:")
                for idx, items in enumerate(field.value):
                    print("...Item #{}".format(idx + 1))
                    num_items += 1

                    exp_name = "unknown"
                    price = 0
                    quantity = 1
                    for item_name, item in items.value.items():
                        if item_name == "TotalPrice":
                            price = float(item.value)
                            total_price += float(item.value)
                        if item_name == "Name":
                            exp_name = item.value
                        if item_name == "quantity":
                            quantity = int(item.value)
                        print("......{}: {} has confidence {}".format(item_name, item.value, item.confidence))
                    expense = Expense(item_name=exp_name, price=price, quantity=quantity)
                    expenses.append(expense)
            else:
                if (name == "MerchantName"):
                    name = field.value
                if (name == "TransactionDate"):
                    date = field.value
                print("{}: {} has confidence {}".format(name, field.value, field.confidence))
        
        receipt = Receipt(name=name, date=date, num_items=num_items, total_price=total_price)
        for expense in expenses:
            receipt.expenses.append(expense)
        reciepts.append(receipt)
    
    session.add_all(receipts)
    session.commit()
    


    


