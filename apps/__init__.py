from .list_lib import *
from .next import Secrets
import json, os

def cek_folder():
    file = 'apps/json/login.json'
    if not os.path.exists(file):
        os.makedirs(os.path.dirname(file), exist_ok=True) # Pastikan folder adadefault_data = {
        default_data = {
                        "status": {
                            "email": {
                                "name": "", 
                                "password": ""
                            }
                        }
                    }
        with open(file, "w", encoding="utf-8") as f:
            json.dump(default_data, f, indent=4, ensure_ascii=False)
    else: pass

cek_folder()

__all__ = ["Secrets", "Login", "Login", "Error", "gets_data"]