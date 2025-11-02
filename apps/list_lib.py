from flask import abort
import json

class Data:
    def __init__(self):
        pass

    def gets(self, libs: str) -> list|dict:
        try:
            file = f'apps/json/{libs}.json'
            with open(file, 'r') as x:
                return json.load(x)
        except: return {"Gagal": None}

    def saves(self, config_file: str, lib):
        with open(config_file , "w") as f:
            json.dump(lib, f, indent=4)
        return
    
    def updates(self, file: str, add: dict):
        config_file = f'apps/json/{file}.json'
        lib = self.gets(file)
        lib.update(add)
        return self.saves(config_file, lib)
    
    def deleads(self, file: str, delead: str):
        config_file = f'apps/json/{file}.json'
        data = self.gets(file)
        data.pop(delead, None)
        return self.saves(config_file, data)

class Login:
    def list(self):
        return Data().gets("login")

    def emailKey(self, key: str | None = None): 
        data = self.list()
        for y in data.keys():
            for z in data[y].keys():
                if z == key:
                    return y, data[y][z]["name"]

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
        for x in Data.gets("error.code"):
            if x == self.status_codes:
                return [y for y in Data.gets("error.code")[x].values()]