# 🔍 Panduan SEO: Agar Website Muncul di Google

## Langkah 1: Deploy Website

Pastikan website sudah di-deploy ke `https://fakhridjamaris.my.id`

## Langkah 2: Daftar di Google Search Console

1. Buka [Google Search Console](https://search.google.com/search-console)
2. Login dengan akun Google
3. Klik **"Add Property"** (Tambah Properti)
4. Pilih **"URL prefix"** dan masukkan: `https://fakhridjamaris.my.id`
5. Verifikasi kepemilikan dengan salah satu cara:
   - **HTML Tag** (Recommended): Copy kode verifikasi dan paste ke `layout.tsx` di bagian `verification.google`
   - **DNS Record**: Tambahkan TXT record di DNS domain Anda
   - **HTML File**: Upload file verifikasi ke folder `public/`

## Langkah 3: Submit Sitemap

1. Di Google Search Console, buka menu **"Sitemaps"**
2. Masukkan URL sitemap: `sitemap.xml`
3. Klik **"Submit"**
4. Tunggu Google untuk crawl (biasanya 1-7 hari)

## Langkah 4: Request Indexing

1. Di Search Console, buka **"URL Inspection"**
2. Masukkan URL homepage: `https://fakhridjamaris.my.id`
3. Klik **"Request Indexing"**
4. Ini akan mempercepat proses indexing

## Langkah 5: Update Verification Code

Setelah dapat kode verifikasi dari Google, update file `app/layout.tsx`:

```typescript
verification: {
  google: 'paste-your-verification-code-here',
},
```

---

## 📋 Checklist SEO yang Sudah Diimplementasikan

- [x] **Title & Description** - Mengandung nama lengkap "Fakhri Djamaris"
- [x] **Keywords** - Variasi nama dan skill
- [x] **Canonical URL** - Mengarah ke domain utama
- [x] **Open Graph** - Untuk preview saat share di sosmed
- [x] **Twitter Card** - Untuk preview di Twitter
- [x] **Sitemap.xml** - Daftar halaman untuk Google
- [x] **Robots.txt** - Izin crawling untuk search engine
- [x] **JSON-LD Structured Data** - Data terstruktur tentang Anda sebagai "Person"
- [x] **Mobile Responsive** - Google prioritaskan mobile-first

---

## ⏱️ Estimasi Waktu

| Tahap                     | Waktu      |
| ------------------------- | ---------- |
| Verifikasi domain         | 5-30 menit |
| Sitemap di-crawl          | 1-7 hari   |
| Muncul di hasil pencarian | 1-4 minggu |
| Ranking stabil            | 1-3 bulan  |

---

## 💡 Tips Tambahan untuk Meningkatkan Ranking

1. **Buat konten berkualitas** - Update blog/TIL secara rutin
2. **Backlinks** - Tambahkan link ke portfolio di:
   - LinkedIn profile
   - GitHub README
   - Bio Instagram/Twitter
   - Forum seperti Medium, Dev.to
3. **Share di sosial media** - Setiap kali update project
4. **Gunakan nama konsisten** - "Fakhri Djamaris" di semua platform

---

## 🔗 Link Penting

- [Google Search Console](https://search.google.com/search-console)
- [Rich Results Test](https://search.google.com/test/rich-results) - Test structured data
- [PageSpeed Insights](https://pagespeed.web.dev/) - Test performa
- [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)
