import subprocess
import json
import os

# File konfigurasi (agar tidak perlu isi ulang setiap kali)
CONFIG_FILE = "github_config.json"

def load_config():
    if os.path.exists(CONFIG_FILE):
        with open(CONFIG_FILE, "r") as f:
            return json.load(f)
    else:
        # Jika belum ada config, minta input dari pengguna
        repo_url = input("Masukkan URL repository GitHub (contoh: https://github.com/NadhifThoriqi/my-e-library.git): ").strip()
        branch = input("Masukkan nama branch (default: main): ").strip() or "main"
        config = {"repo_url": repo_url, "branch": branch}
        with open(CONFIG_FILE, "w") as f:
            json.dump(config, f, indent=4)
        return config

def run_command(command):
    """Jalankan perintah terminal dan tampilkan output-nya"""
    print(f"Menjalankan: {command}")
    result = subprocess.run(command, shell=True, text=True, capture_output=True)
    if result.returncode != 0:
        print("❌ Terjadi kesalahan:\n", result.stderr)
    else:
        print(result.stdout)

def upload_to_github():
    config = load_config()
    repo_url = config["repo_url"]
    branch = config["branch"]

    # Pastikan .git sudah ada
    if not os.path.exists(".git"):
        print("⚙️  Menginisialisasi repository Git baru...")
        run_command("git init")
        run_command(f"git remote add origin {repo_url}")

    # Tambahkan semua file, commit, dan push
    commit_message = input("Masukkan pesan commit (default: 'update otomatis'): ").strip() or "update otomatis"

    print("\n📦 Menambahkan file ke Git...")
    run_command("git add .")

    print("\n📝 Melakukan commit...")
    run_command(f'git commit -m "{commit_message}"')

    print(f"\n🚀 Mengunggah ke GitHub branch '{branch}'...")
    run_command(f"git push -u origin {branch}")

    print("\n✅ Selesai! Program telah diunggah ke GitHub.")

if __name__ == "__main__":
    upload_to_github()