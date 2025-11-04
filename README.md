# 🧬 ICRPedigree — Sistem Silsilah Keluarga Digital

**ICRPedigree** adalah aplikasi berbasis web yang dirancang untuk membantu pengguna membuat, mengelola, dan memvisualisasikan **silsilah keluarga (family tree)** secara digital. Aplikasi ini memungkinkan pengguna untuk menambah, mengedit, dan menghapus anggota keluarga, serta menampilkan hubungan antar anggota dalam bentuk pohon keluarga interaktif yang mudah dipahami.

---

## 👥 Anggota Kelompok
| No | Nama Lengkap         | NIM        |
|----|----------------------|------------|
| 1  | ALVIN . LO           | 221110546  |
| 2  | Kenrick Fylan        | 221110113  |
| 3  | Sandy Agre Nicola    | 221110040  |
| 4  | Felicia              | 221111205  |
| 5  | Irfandi              | 221110290  |

---

## 🏗️ Arsitektur & Teknologi

**Arsitektur Sistem:**
```
[Frontend (React + Vite)] <-> [Backend (Node.js + Express)] <-> [Database (MySQL)] <-> [Docker + GitHub Actions]
```
markdown
Copy code

**Stack Teknologi:**
- **Frontend:** React.js + Vite + Axios  
- **Backend:** Node.js + Express.js  
- **Database:** MySQL  
- **Containerization:** Docker & Docker Compose  
- **Deployment:** GitHub Actions + ( Vercel dan Railway)

---

## ⚙️ Petunjuk Instalasi Lokal

### 1️⃣ Clone Repository
```bash
git clone <url-repo>
cd ICRIPedigree
```
### 2️⃣ Konfigurasi Environment  
Salin file environment contoh dan sesuaikan nilainya:
```bash
cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env

🔹 Frontend (/frontend/.env)
env
Copy code
VITE_API_URL=<URL_BACKEND_RAILWAY_ANDA>
# Ganti dengan URL backend yang diberikan Railway,
# misalnya: https://icrpedigree-production.up.railway.app


🔹 Backend (/backend/.env)
PORT=5000
NODE_ENV=production

# Database Configuration - GANTI SESUAI DATA RAILWAY
DB_HOST=mysql.railway.internal
DB_PORT=3306
DB_USER=root
DB_PASS=your_database_password_here
DB_NAME=railway

# JWT Configuration
JWT_SECRET=your_jwt_secret_here
SECRET_KEY_BASE64=your_secret_key_base64_here

# Cookie & CORS
COOKIE_NAME=icr_token
CORS_ORIGIN=https://ipicr.vercel.app

```
### 3️⃣ Jalankan Aplikasi dengan Docker Compose
```
docker-compose up --build
```
Aplikasi akan otomatis berjalan di:

Frontend: http://localhost:5173

Backend API: http://localhost:5000

## 💻 Langkah-Langkah Penggunaan
1. Melihat Daftar Anggota Keluarga
Setelah login, pengguna akan melihat Dashboard Keluarga yang menampilkan daftar anggota dalam bentuk kartu lengkap dengan foto, nama, tanggal lahir, dan hubungan keluarga.
Setiap kartu memiliki tombol Edit (kuning) dan Hapus (merah).

2. Menambah Anggota Keluarga Baru
Klik tombol Tambah Anggota di bagian atas dashboard.
Isi formulir dengan NIK, nama, tanggal lahir, dan jenis kelamin.

3. Melengkapi Informasi Relasi
Pilih ayah, ibu, dan pasangan dari dropdown, serta isi catatan tambahan di bagian bawah formulir.

4. Menyimpan Data
Klik tombol Simpan Anggota.
Sistem akan melakukan validasi dan enkripsi data sebelum menyimpan ke database.
Notifikasi popup akan muncul:
```
  ✅ “Berhasil! Anggota keluarga berhasil ditambahkan!”
```
5. Mengedit Data
Klik tombol Edit pada kartu anggota untuk memperbarui informasi yang sudah ada.

6. Menyimpan Perubahan
Klik Perbarui Anggota.
Sistem akan memvalidasi dan mencatat perubahan ke dalam audit log.

7. Menghapus Anggota
Klik Hapus, lalu konfirmasi penghapusan di popup.
Data akan dihapus dari database dan tercatat di log sistem.

8. Melihat Visualisasi Pohon Keluarga
Klik tombol Tutup Tree di dashboard untuk menampilkan tampilan Pedigree Keluarga (Generasi) dalam format hierarki.
Kotak biru muda untuk laki-laki dan krem untuk perempuan, tersusun berdasarkan generasi secara rapi.
---

## 📞 Fitur Tambahan — Contact (Kirim ke WhatsApp)
Pengguna dapat mengirimkan pesan langsung ke pengembang aplikasi melalui form Contact.

Fitur:

Input: nama, email, dan catatan.

Setelah dikirim, pesan otomatis membuka WhatsApp dan mengirimkan format seperti berikut:


---

## 🎥 Video Demo
📂 Folder /video berisi:

link_video.txt → berisi link Google Drive atau YouTube ke video demo aplikasi.

Contoh isi:

https://drive.google.com/file/d/xxxxxxxxxxxx/view


## 🌐 URL Aplikasi Live
https://icrpedigree.vercel.app


