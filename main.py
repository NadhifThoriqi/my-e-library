from flask import Flask, render_template, url_for, redirect, request, jsonify, session, abort
from static.lib.next import Secrets
from static.lib.list_lib import Login, Error, gets_data
from itsdangerous import URLSafeTimedSerializer
from markupsafe import escape
from datetime import timedelta
import json

app = Flask(__name__)
app.secret_key = "TmFkaGlmX1Rob3JpcWk="
app.permanent_session_lifetime = timedelta(hours=24)  # Durasi session
ts = URLSafeTimedSerializer(app.secret_key)

@app.before_request
def make_session_paramenent():
    """
    Fungsi ini akan dijalankan sebelum setiap request.
    Jika pengguna aktif, maka waktu sesi diperbarui.
    """
    session.permanent = True  # jadikan session permanent
    session.modified = True   # tandai bahwa session diperbarui waktunya

@app.route('/api/data/language/')
def language():
    try:
        with open('static/Language/language.json', 'r') as f:
            data = json.load(f)
        return jsonify(data)
    except:
        return jsonify({"message": "Error loading data"})

@app.route("/")
def home():
    try:
        if not session.get("secret"):
            return render_template("login.html")
        else: 
            return redirect(url_for("ver", room="dashboard"))
    except:
        return "asdfghjkl"

@app.route("/login/", methods=["POST"])
def join():
    if request.method == "POST":
        name    : str = request.form["username"]
        password: str = request.form["password"]
        try:
            session['pending_user'] = {"user": name, "password": password}
            session["secret"] = ts.dumps({"name": name}, salt='verifyEmail')
            return redirect(url_for('ver', room="dashboard"))
        except: redirect(url_for("home"))

@app.route('/logout/')
def logout():
    session.pop('pending_user', None)
    session.pop('secret', None)
    return redirect(url_for('home'))

@app.route("/<room>/")
def ver(room: str= "dashboard"):
    verify = session.get("secret")

    if not verify: return abort(401)
    
    books = gets_data(libs="books")

    data = ts.loads(verify, salt='verifyEmail', max_age=86_400)
    email = escape(data['name'])
    status, name= Login().emailKey(key=email)
    key_room = Login().room(key=email)

    if status == "admin":
        data = Login().list()
    else: data = None

    if room in key_room:
        return render_template(f"{status}/{room}.html", name=name, email=email, data=data, books=books)
    else: 
        abort(403 if room in Login().room() else 404)
    # else: return redirect(url_for("error404", error=room))
    
@app.errorhandler(401)
def error401(e):
    text = Error("401").call()
    return render_template("errorCode.html", error="401", text=text, back="Login"), 401

@app.errorhandler(403)
def error403(e):
    text = Error("403").call()
    return render_template("errorCode.html", error="403", text=text, back="Dashboard"), 403

@app.errorhandler(404)
def error404(e):
    text = Error("404").call()
    return render_template("errorCode.html", error="404", text=text, back="Dashboard"), 404

@app.errorhandler(503)
def error503(e):
    text = Error("503").call()
    return render_template("errorCode.html", error="503", text=text), 503

if __name__ == "__main__":
    # app.run(debug=True, host="192.168.1.6", port=2601)
    app.run(debug=True, host="0.0.0.0", port=2601)