import base64

# Membuat kode acak sepanjang 32 karakter hex
class Secrets:
    def __init__(self, text: str):
        self.text=text

    def locked(self):
        return base64.urlsafe_b64encode(self.text.encode()).decode()

    def unlock(self):
        decoded_bytes = base64.urlsafe_b64decode(self.text)
        return decoded_bytes.decode('utf-8')