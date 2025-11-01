from flask import abort
import json, os

def gets_data(libs: str) -> list|dict:
    try:
        file = f'static/lib/json/{libs}.json'
        with open(file, 'r') as x:
            return json.load(x)
    except:
        return abort(405)

class Login:
    def __init__(self):
        if not os.path.exists(self.list()):
            os.makedirs(os.path.dirname(self.list()), exist_ok=True) # Pastikan folder ada
            default_data = {
                "directory": {
                    "repo_url": "",
                    "branch": ""
                }
            }
            with open(self.list(), "w", encoding="utf-8") as f:
                json.dump(default_data, f, indent=4, ensure_ascii=False)

    def list(self):
        return gets_data("login")
    
    def emailKey(self, key: str | None = None): 
        for y in self.list().keys():
            for z in self.list()[y].keys():
                if z == key:
                    return y, self.list()[y][z]["name"]

    def room(self, key: str|None=None):
        if key:
            keys, _ = self.emailKey(key)
            if "admin" in keys:
                return ["dashboard", "books", "members", "reports"]
            elif "staff" in keys:
                return ["dashboard", "books", "borrow_book", "return_book"]
            elif "member" in keys:
                return ["dashboard", "check_fines", "search", "transaction"]
        else:
            return["dashboard", "books", "members", "reports", "borrow_book", "return_book", "check_fines", "search", "transaction"]
   
class Error:
    def __init__(self, status: str):
        self.status_codes=status
    
    # def errorCode(self):
    def call(self):
        for x in gets_data("error.code"):
            if x == self.status_codes:
                return [y for y in gets_data("error.code")[x].values()]