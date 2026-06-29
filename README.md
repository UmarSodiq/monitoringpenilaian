# Aplikasi Monitoring dan Penilaian Satker - KPPN Magelang

Aplikasi **Monitoring dan Penilaian Satker** (Seksi Verifikasi dan Akuntansi KPPN Magelang) adalah sistem manajemen, penilaian, pemantauan, dan pelaporan kepatuhan bagi Satuan Kerja (Satker) di bawah wilayah kerja KPPN Magelang. Aplikasi ini mempermudah proses evaluasi kepatuhan pajak, pengelolaan saldo kas tunai, serta penilaian kinerja bulanan secara otomatis.

---

## 🌟 Fitur Utama

Aplikasi ini dirancang dengan pendekatan modul-modul fungsional yang saling terintegrasi:

### 1. **Dashboard Analytics**
* **Ringkasan Kinerja Satker:** Infografis interaktif yang menampilkan rangkuman skor rata-rata kinerja seluruh Satker.
* **Tinjauan Kepatuhan Pajak:** Visualisasi statistik bulanan terkait kepatuhan pajak Satker untuk meminimalkan keterlambatan.
* **Grafik Kas Tunai:** Diagram pemantauan saldo kas tunai bulanan guna menjaga likuiditas dan ketertiban pelaporan kas.
* **Unduh Laporan Visual:** Dukungan ekspor grafik dashboard ke dalam format gambar (`.jpg`) secara langsung untuk lampiran laporan fisik.

### 2. **Modul Penilaian Kinerja**
* Evaluasi skor kinerja Satuan Kerja berdasarkan parameter baku yang telah ditetapkan oleh KPPN Magelang.
* Integrasi formula otomatis berbasis rumus excel seperti VLOOKUP untuk kalkulasi skor akhir tanpa perlu input manual berulang.
* Dukungan penuh format penamaan periode bulan baik dalam bahasa Indonesia (Januari-Desember) maupun bahasa Inggris.

### 3. **Modul Kepatuhan Pajak**
* Pencatatan dan monitoring transaksi pajak, setoran, serta kepatuhan pelaporan kewajiban pajak masing-masing Satker.
* Pengelompokan data perpajakan per bulan secara dinamis untuk memudahkan analisis kepatuhan bulanan.

### 4. **Modul Kas Tunai**
* Pengawasan saldo fisik kas tunai yang dipegang oleh Bendahara Pengeluaran Satker.
* Deteksi dini terhadap penumpukan kas tunai melebihi batas regulasi yang ditentukan.

---

## 🛠️ Arsitektur & Teknologi

* **Frontend:** Single Page Application (SPA) berbasis HTML5, Tailwind CSS untuk antarmuka yang modern dan responsif, serta Chart.js untuk visualisasi grafik.
* **Database & Autentikasi:** Menggunakan **Firebase Firestore** untuk penyimpanan data yang andal, aman, dan tersinkronisasi secara real-time.
* **Manajemen Berkas:** Didukung oleh pustaka **SheetJS (XLSX)** untuk pemrosesan file Excel secara instan di sisi klien (Client-Side), pencocokan formula formula dinamis, serta ekspor-impor data.

---

## 🔒 Keamanan API & Konfigurasi Firebase

Untuk melestarikan keamanan dan memastikan kredensial Firebase tidak terekspos langsung ke publik saat deployment:
1. Konfigurasi kredensial disimpan dalam berkas terisolasi atau diinjeksikan secara aman menggunakan variabel lingkungan (`environment variables`).
2. Aturan keamanan Firebase (`firestore.rules`) dikonfigurasi secara ketat untuk membatasi hak akses baca dan tulis berdasarkan kepemilikan data (Satker vs KPPN).

---

## 🚀 Cara Menjalankan Aplikasi di Lokal

### Prasyarat
Pastikan Anda sudah menginstal NodeJS versi terbaru di perangkat Anda.

### Langkah-langkah:
1. **Pasang Dependensi:**
   ```bash
   npm install
   ```

2. **Jalankan Server Pengembangan (Dev Mode):**
   ```bash
   npm run dev
   ```
   Aplikasi akan berjalan secara lokal dan dapat diakses di browser melalui alamat `http://localhost:3000`.

3. **Melakukan Build untuk Produksi:**
   ```bash
   npm run build
   ```
   Hasil kompilasi siap pakai akan berada dalam direktori `dist/`.

---

## 📝 Catatan Penting
* Formula excel di dalam template spreadsheet (seperti kecocokan VLOOKUP) didesain sangat fleksibel untuk mengakomodasi berbagai skenario penamaan lembar kerja (contoh: *JAN*, *JANUARI*, *Januari*, *JANUARY*).
* Aplikasi ini menjaga integritas data historis dengan tidak memodifikasi struktur skema tabel tabel yang sudah mapan untuk Penilaian, Pajak, dan Kas Tunai selama pemrosesan data baru.
