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

    def saves(self, config_file: str, lib: dict):
        with open(config_file , "w") as f:
            json.dump(lib, f, indent=4)
        return
    
    def updates(self, file: str, add: dict):
        config_file = f'apps/json/{file}.json'
        lib = self.gets(file)
        lib.update(add)
        return self.saves(config_file, lib)
    
    def deleads(self, file: str, delead: str, key: str|None=None):
        config_file = f'apps/json/{file}.json'
        data = self.gets(file)
        if key:
            data_key = data[key]
            print(key)
            data_key.pop(delead, None)
        else:
            data.pop(delead, None)
        return self.saves(config_file, data)

class Login:
    def __init__(self):
        self.data = Data().gets("login")

    def list(self):
        return self.data

    def add(self, key: str, adds: dict):
        config_file = f'apps/json/login.json'
        self.data[key].update(adds)
        return Data().saves(config_file, self.data)

    def emailKey(self, key: str | None = None): 
        data = self.data
        for y in data.keys():
            for z in data[y].keys():
                if z == key:
                    return y, data[y][z]["name"]

    def room(self, key: str|None=None):
        if key:
            keys, __ = self.emailKey(key)
            if "admin" in keys:
                return ["dashboard", "books", "members", "reports"]
            elif "staff" in keys:
                return ["dashboard", "books", "borrow_book", "return_book"]
            elif "member" in keys:
                return ["dashboard", "check_fines", "search", "transaction"]
        else: 
            return["dashboard", "books", "members", "reports", "borrow_book", "return_book", "check_fines", "search", "transaction"]
   
class Books:
    def __init__(self):
        self.data = Data().gets(libs="books")

    def total(self):
        i = 0
        for x in self.data.keys():
            i += self.data[x]["stock"]
        return i
    
    def borrowed(self):
        i = 0
        for x in self.data.keys():
            i += self.data[x]["borrowed"]
        return i

class Error:
    def __init__(self, status: str):
        self.status_codes=status
    
    # def errorCode(self):
    def call(self):
        for x in Data().gets("error.code"):
            if x == self.status_codes:
                return [y for y in Data().gets("error.code")[x].values()]
            
# email = "nadhifthoriqi@gmail.com"
# status, __ = Login().emailKey(key=email)
# print(email, status)
# Data().deleads("login", delead=email, key=status)