from .list_lib import *
from .next import Secrets
import json, os

def cek_folder(name, default: dict):
    file = f'apps/json/{name}.json'
    if not os.path.exists(file):
        os.makedirs(os.path.dirname(file), exist_ok=True) # Pastikan folder ada default = {
        with open(file, "w", encoding="utf-8") as f:
            json.dump(default, f, indent=4, ensure_ascii=False)
    else: pass

cek_folder(
    name="login",
    default = {
        "status": {
            "email": {
                "name": "", 
                "password": ""
            }
        }
    }
)
cek_folder(
    name="books",
    default={
        "kode": {
            "book_title": "-",
            "author": "-",
            "isbn": "-",
            "category": "-",
            "publisher": "-",
            "year": "-",
            "stock": 0,
            "borrowed": 0,
            "description": "-"
        }
    }
)

__all__ = ["Secrets", "Login", "Error", "Data"]