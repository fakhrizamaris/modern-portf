---
description: Panduan deploy portfolio Next.js ke Vercel dengan custom domain
---

# Deploy ke Vercel & Setup Domain (fakhridjamaris.my.id)

Berikut adalah langkah-langkah untuk mengonlinekan portfolio kamu:

## 1. Push Code ke GitHub

Pastikan semua perubahan terbaru sudah di-push ke repository GitHub kamu.

```bash
git add .
git commit -m "Final polish for deployment"
git push origin main
```

## 2. Setup Project di Vercel

1. Buka [vercel.com](https://vercel.com) dan login (biasanya continue with GitHub).
2. Klik tombol **"Add New..."** > **"Project"**.
3. Di bagian **Import Git Repository**, cari repo `portfolio-fakhri` (atau nama repo kamu) dan klik **Import**.
4. Di halaman konfigurasi:
   - **Framework Preset**: Next.js (Otomatis terdeteksi).
   - **Environment Variables**:
     - Klik tab ini untuk membuka.
     - Masukkan Key: `GITHUB_TOKEN`
     - Masukkan Value: (Token GitHub kamu yang ada di `.env.local` saat ini).
     - Klik **Add**.
5. Klik **Deploy**. Tunggu hingga proses build selesai dan muncul kembang api! 🚀

## 3. Hubungkan Domain (fakhridjamaris.my.id)

Setelah berhasil deploy/tayang:

1. Masuk ke dashboard project Vercel kamu.
2. Pergi ke menu **Settings** > **Domains**.
3. Ketik `fakhridjamaris.my.id` di kolom input dan klik **Add**.
4. Pilih opsi yang direkomendasikan (biasanya opsi pertama).

## 4. Konfigurasi DNS (Di Tempat Beli Domain)

Vercel akan memberikan **DNS Records** yang harus kamu masukkan di penyedia domain kamu (misal: Niagahoster, Domainesia, IdCloudHost, dll).

Biasanya ada 2 opsi, pilih salah satu (Vercel akan memberitahu yang mana, tapi ini umumnya):

**Opsi A (Recommended): A Record**
Buka panel DNS domain kamu, tambahkan:

- **Type**: `A`
- **Name/Host**: `@` (atau kosong)
- **Value/Points to**: `76.76.21.21` (IP Vercel)

**Opsi B: CNAME**
Untuk sub-domain `www`:

- **Type**: `CNAME`
- **Name/Host**: `www`
- **Value/Points to**: `cname.vercel-dns.com`

_Catatan: Tunggu beberapa menit hingga jam (propagasi DNS) agar domain bisa diakses._
