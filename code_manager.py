# code_manager.py

from Linemancode import Lineman_code

class CodeManager:
    def __init__(self):
        # Initialize the list of codes here
        self.available_codes = list(Lineman_code)  # Convert Lineman_code to a list
        self.used_codes = []

    def add_used_code(self, code):
        self.used_codes.append(code)
        self.remove_available_code(code)  # Remove the used code from available codes

    def is_code_used(self, code):
        return code in self.used_codes

    def is_empty(self):
        return not bool(self.available_codes)

    def get_available_code(self):
        if not self.is_empty():
            return self.available_codes[0]
        else:
            return None

    def remove_available_code(self, code):
        if code in self.available_codes:
            self.available_codes.remove(code)
            Lineman_code.remove(code)  # Remove the code from the external module

# Example usage:
# code_manager = CodeManager()
# code_manager.add_used_code("code1")  # Add a used code and remove it from available codes and Lineman_code