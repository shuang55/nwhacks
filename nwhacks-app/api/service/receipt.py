from datetime import datetime
from flask import Flask

app = Flask(__name__)

class Receipt:
    """
    Receipt class tracks information related to an uploaded receipt.
    """
    def __init__(self, receiptPK, date, vendor_name, num_items, total_price):
        """
        Note: date must be formatted "YYYY-MM-DD"
        """
        self.receiptPK = receiptPK
        self.date = datetime.strptime(date, "%Y-%m-%d")
        self.vendor_name = vendor_name
        self.num_items = int(num_items)
        self.total_price = float(total_price)

