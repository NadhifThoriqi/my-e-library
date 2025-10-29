from flask import Flask, request, url_for, redirect, abort
from itsdangerous import URLSafeTimedSerializer
from markupsafe import escape

app = Flask(__name__)
app.secret_key = 'kunci_rahasia'
ts = URLSafeTimedSerializer(app.secret_key)

@app.route('/')
def index():
    token = ts.dumps({'user': 'nadhif'}, salt='login')
    link = url_for('verify', token=token, _external=True)
    return f'<a href="{escape(link)}">Verifikasi Akun</a>'

@app.route('/verify/<token>')
def verify(token):
    try:
        data = ts.loads(token, salt='login', max_age=600)
        return f"Selamat datang, {escape(data['user'])}!"
    except:
        abort(403)

app.run()