class Expense:
    """
    Expense class tracks information related to an individual expense.
    """
    def __init__(self, expense_PK, receipt_FK, price, item_name, quantity=None):
        """
        Note: date must be formatted "YYYY-MM-DD"
        """
        self.expense_PK = expense_PK
        self.receipt_FK = receipt_FK
        self.price = int(price)
        self.item_name = item_name
        self.quantity = int(quantity) if quantity else None 

