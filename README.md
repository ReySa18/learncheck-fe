# LearnCheck 
Formative assessment generator using AI — integrated inside Dicoding LMS via iFrame.

## Overview
LearnCheck adalah fitur formative assessment otomatis yang:
- Terintegrasi di LMS Dicoding melalui **iFrame**
- Menghasilkan soal berdasarkan materi submodul (dari backend AI)
- Menyimpan progres siswa secara **lokal di browser**
- Menyediakan UI interaktif, responsif, dan mudah di-embed

Aplikasi ini dibangun menggunakan:
- **React + Vite**
- **TailwindCSS**
- **LocalStorage API**

---

## Fitur Utama

### 1. Input URL Query Params
Frontend menerima query parameters dari LMS:
- `tutorial_id` → digunakan backend untuk mengambil materi submodul
- `user_id` → digunakan frontend untuk membuat key penyimpanan state lokal

Contoh:
```
https://learncheck.app/?tutorial_id=35363&user_id=1
```

---

### 2. Formative Assessment (Auto-Generated)
- Menampilkan **3 - 5 soal** hasil generate AI  
- Mendukung **multiple choice** & **multiple answer**  
- Menampilkan **hint** untuk membantu siswa memahami soal  
- Menampilkan **feedback AI** setelah siswa submit  
- Siswa dapat melakukan **reset** untuk mengulang asesmen  

---

### 3. Penyimpanan State Lokal (LocalStorage)
State siswa disimpan secara lokal berdasarkan kombinasi:
```
lc_{stateKey}_{userId}_{tutorialId}
```

Yang disimpan:
- Soal  
- Jawaban siswa  
- Feedback  
- Status submit  
- Theme & preferences UI  
- Posisi soal terakhir (currentIndex)  

---

### 4. Penyesuaian Tampilan Sesuai Preferensi User
Backend mengirimkan preferensi UI seperti:
- Theme (light/dark)
- Font family
- Font size
- Layout width

FE akan:
- Menyimpan preferences di localStorage  
- Menerapkan theme sejak awal render  
- Melakukan update otomatis saat preferences berubah  

---

### 5. Integrasi iFrame
Saat di-embed dalam LMS:
- FE mendeteksi apakah berjalan dalam iFrame  
- FE mengirim tinggi kontainer secara otomatis menggunakan:

```js
window.parent.postMessage({ learncheck_height: document.body.scrollHeight }, "*")
```


---

## ⚙️ Instalasi & Development

### 1. Clone repository
```bash
git clone https://github.com/your-repo/learncheck-fe.git
cd learncheck-fe
```

### 2. Install dependencies
```bash
npm install
```

### 3. Buat file `.env`
Ikuti berdasarkan contoh berikur.
```
VITE_BASE_URL=http://localhost:3000
```

### 4. Jalankan development server
```bash
npm run dev
```

---

## 🔌 API Endpoints (Frontend Perspective)

### 1. Generate Questions
```
GET /api/generate?tutorial_id={id}&user_id={id}
```

### 2. Submit Answers
```
POST /api/submit
```

---

## 🌗 Theme System
Frontend menerapkan theme menggunakan:
```js
document.documentElement.classList.add("dark")
```

Preferences disimpan di:
```
lc_preferences
```

---

## 🔄 Reset Asesmen
Reset dilakukan dengan:
- Menghapus seluruh state “lc_...” dari localStorage  
- Regenerate soal dari backend  
- Reset semua state React  

Fungsi:
```js
resetSession()
```

---

## Behaviour Summary
| Skenario | Hasil |
|----------|--------|
| User refresh halaman | State tetap ada (soal, jawaban, theme) |
| User ganti browser | State hilang |
| User buka submodul berbeda | State baru dibuat |
| User klik "Mulai Ulang" | Semua state direset & generate ulang |

---

