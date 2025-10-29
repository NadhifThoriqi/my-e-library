import base64

def locked(text: str):
    return base64.urlsafe_b64encode(text.encode()).decode()

def unlock(text: str):
    decoded_bytes = base64.urlsafe_b64decode(text)
    return decoded_bytes.decode('utf-8')

try:
    print(locked("Nadhif_Thoriqi"))
except:
    print("Nan")

x=9; y=10
if x or y == 10:
    print("Success")