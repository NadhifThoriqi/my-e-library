from flask import Flask, render_template, url_for, redirect, request, jsonify, session, abort
from itsdangerous import URLSafeTimedSerializer
from markupsafe import escape
from datetime import timedelta
from threading import Thread
import json, time, apps

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

@app.route('/api/data/language/', methods=["GET", "POST"])
def language():
    try:
        data = request.get_json() or "None"
        if data.get('key') == "language":
            with open('static/Language/language.json', 'r') as f:
                data = json.load(f)
            return jsonify(data)
    except:
        return render_template("index.html")
        
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
    
    books = apps.Books().data
    total = apps.Books().total()
    borrowed = apps.Books().borrowed()

    data = ts.loads(verify, salt='verifyEmail', max_age=86_400)
    email = escape(data['name'])
    status, name= apps.Login().emailKey(key=email)
    key_room = apps.Login().room(key=email)

    if status == "admin":
        data = apps.Login().list()
    else: data = None

    if room in key_room:
        return render_template(f"{status}/{room}.html", name=name, email=email, data=data, books=books, total=[total, borrowed])
    else: 
        abort(403 if room in apps.Login().room() else 404)
    # else: return redirect(url_for("error404", error=room))
    
@app.route("/<type>/<path>/", methods=["POST"])
def add(type, path):
    if request.method == "POST":
        if type in ["add", "edit"] and path in ["book", "member"]: 
            if path == "book":
                book_kode = request.form["book_kode"] if type == "edit" else time.strftime("%H%M%S%d%m%Y")
                book_title = request.form["book_title"]
                author = request.form["author"]
                category = request.form["category"]
                isbn = request.form["isbn"]
                publisher = request.form["publisher"]
                year = request.form["year"]
                stock = request.form["stock"] or 1
                description = request.form["description"]
                
                books = {
                    book_kode: {
                        "book_title": book_title,
                        "author": author,
                        "isbn": isbn,
                        "category": category,
                        "publisher": publisher,
                        "year": year,
                        "stock": int(stock),
                        "borrowed": 0,
                        "description": description
                    }
                }
                
                apps.Data().updates(file="books", add=books)
                
                return redirect(url_for("ver", room="books"))
            elif path == "member":
                if type == "edit": pass
                else: pass

                name = request.form["name"]
                email = request.form["email"]
                telepon = request.form["telepon"]
                alamat = request.form["alamat"]
                kota = request.form["kota"]
                status = request.form["status"]
                job = request.form["job"]
                login = {
                    job: {
                        
                    }
                }
                return abort(405)
        else: abort(404)

@app.route("/delead/<path>/", methods=["POST"])
def delead(path):
    if request.method == "POST":
        if path == "book":
            data = request.get_json()
            book = data.get("book")
            apps.Data().deleads("books", delead=book)
            return redirect(url_for("ver", room="books"))
        elif path == "member":
            data = request.get_json()
            email = data.get("member")
            status, __ = apps.Login().emailKey(key=email)
            apps.Data().deleads("login", delead=email, key=status)
            return redirect(url_for("ver", room="members"))
        else: return abort(404)

@app.errorhandler(401)
def error401(e):
    text = apps.Error("401").call()
    return render_template("errorCode.html", error="401", text=text, back="Login"), 401

@app.errorhandler(403)
def error403(e):
    text = apps.Error("403").call()
    return render_template("errorCode.html", error="403", text=text, back="Dashboard"), 403

@app.errorhandler(404)
def error404(e):
    text = apps.Error("404").call()
    return render_template("errorCode.html", error="404", text=text, back="Dashboard"), 404

@app.errorhandler(405)
def handle_405_error(e):
    # Daftar metode yang diizinkan di setiap endpoint (bisa kamu ubah sesuai program)
    allowed_routes = {
        "/login": ["POST"],
        "/logout": ["GET"],
        "/data": ["GET", "POST"],
        "/delead/book/": ["POST"],
        "/add/book/": ["POST"],
    }

    # Dapatkan route yang sedang diakses
    path = request.path
    method = request.method

    # Cek apakah route dikenali tapi metodenya salah (user error)
    if path in allowed_routes and method not in allowed_routes[path]:
        return jsonify({
            "error": "Aksi tidak diizinkan",
            "message": f"Metode '{method}' tidak dapat digunakan di halaman ini.",
            "hint": f"Gunakan salah satu metode yang diizinkan: {', '.join(allowed_routes[path])}"
        }), 405

    # Jika route tidak dikenali atau tidak terdaftar di sistem → kemungkinan kesalahan admin/developer
    else:
        return jsonify({
            "error": "405 Method Not Allowed",
            "message": (
                "Terjadi kesalahan konfigurasi backend. "
                "Periksa definisi route atau metode HTTP yang diizinkan."
            ),
            "hint": "Pastikan endpoint sudah terdaftar dan memiliki metode yang sesuai.",
            "ket": f"{request.path}, {request.method}"
        }), 405

@app.errorhandler(503)
def error503(e):
    text = apps.Error("503").call()
    return render_template("errorCode.html", error="503", text=text), 503

def run_flask():
    # return app.run(debug=True, host="0.0.0.0", port=2601)
    return app.run(debug=False, port=2601)

if __name__ == "__main__":
    run_flask()