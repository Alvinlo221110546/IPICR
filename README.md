🧬 ICRPedigree — Sistem Silsilah Keluarga Digital

ICRPedigree adalah aplikasi berbasis web yang dirancang untuk membantu pengguna membuat, mengelola, dan memvisualisasikan silsilah keluarga (family tree) secara digital.
Aplikasi ini memungkinkan pengguna untuk menambah, mengedit, dan menghapus anggota keluarga, serta menampilkan hubungan antar anggota dalam bentuk pohon keluarga interaktif.

👥 Anggota Kelompok
Nama	NIM
[Nama 1]	[NIM 1]
[Nama 2]	[NIM 2]
[Nama 3]	[NIM 3]
[Nama 4]	[NIM 4]
🏗️ Arsitektur & Teknologi
[Frontend (React + Vite)]  <->  [Backend (Node.js + Express)]  <->  [Database (MySQL)]  <->  [Docker + GitHub Actions]


Stack Teknologi:

Frontend: React.js + Vite + Axios

Backend: Node.js + Express.js

Database: MySQL

Containerization: Docker & Docker Compose

Deployment: GitHub Actions + (Opsional: Vercel / Render)

⚙️ Petunjuk Instalasi Lokal

1️⃣ Clone repository

git clone <url-repo>
cd ICRIPedigree


2️⃣ Copy file environment contoh

cp .env.example .env


Isi variabel sesuai kebutuhan:

# Contoh .env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=123456
DB_NAME=icrpedigree
PORT=5000
FRONTEND_URL=http://localhost:5173
WHATSAPP_NUMBER=6281234567890   # Nomor WA penerima pesan dari fitur Contact


3️⃣ Jalankan aplikasi dengan Docker Compose

docker-compose up --build


Akses di browser:

Frontend: http://localhost:5173

Backend API: http://localhost:5000

💻 Langkah-Langkah Penggunaan
1. Melihat Daftar Anggota Keluarga

Setelah login, pengguna akan melihat halaman Dashboard Keluarga Anda yang menampilkan daftar anggota dalam bentuk kartu lengkap dengan foto, nama, tanggal lahir, dan hubungan keluarga.
Setiap kartu memiliki tombol Edit (kuning) dan Hapus (merah).

2. Menambah Anggota Keluarga Baru

Klik tombol Tambah Anggota di bagian atas dashboard.
Isi formulir NIK, nama, tanggal lahir, dan jenis kelamin.

3. Melengkapi Informasi Relasi

Pilih ayah, ibu, dan pasangan dari dropdown, serta isi catatan tambahan di bagian bawah formulir.

4. Menyimpan Data

Klik tombol Simpan Anggota.
Sistem akan melakukan validasi dan enkripsi data sebelum menyimpan ke database.
Notifikasi popup akan muncul:
✅ “Berhasil! Anggota keluarga berhasil ditambahkan!”

5. Mengedit Data

Klik tombol Edit pada kartu anggota untuk memperbarui informasi yang sudah ada.

6. Menyimpan Perubahan

Klik Perbarui Anggota.
Sistem akan memvalidasi dan mencatat perubahan ke dalam audit log.

7. Menghapus Anggota

Klik Hapus, lalu konfirmasi penghapusan di popup.
Data akan dihapus dari database dan dicatat di log sistem.

8. Melihat Visualisasi Pohon Keluarga

Klik tombol Tutup Tree di dashboard untuk menampilkan tampilan Pedigree Keluarga (Generasi) dalam format hierarki.
Kotak biru muda untuk laki-laki dan krem untuk perempuan, tersusun berdasarkan generasi secara rapi.

📞 Fitur Tambahan — Contact (Kirim ke WhatsApp)

Pengguna dapat mengirimkan pesan langsung ke pengembang aplikasi melalui form Contact.

Fitur:

Input nama, email, dan catatan.

Setelah dikirim, pesan otomatis membuka WhatsApp dan mengirimkan format:

Nama: [Nama User]
Email: [Email User]
Catatan: [Pesan yang diketik]


Contoh Format WA Otomatis:

https://wa.me/6281234567890?text=Nama:%20Doni%0AEmail:%20doni@gmail.com%0ACatatan:%20Saya%20ingin%20melaporkan%20bug%20di%20halaman%20dashboard.

🎥 Video Demo

📂 Folder /video berisi:

link_video.txt → berisi link Google Drive / YouTube ke video demo aplikasi.

Contoh isi:

https://drive.google.com/file/d/xxxxxxxxxxxx/view

🌐 URL Aplikasi Live

https://icrpedigree.vercel.app
 (contoh — sesuaikan dengan domain kamu)
