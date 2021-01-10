from .expense import Expense
from flask import Flask, Blueprint
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
