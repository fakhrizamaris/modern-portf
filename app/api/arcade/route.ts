import { NextResponse } from 'next/server';
import axios from 'axios';
import * as cheerio from 'cheerio';

export async function GET() {
  // ID profil kamu dari link yang kamu berikan
  const PROFILE_ID = '3ee205e0-bbfa-48d6-852f-770aac47be0a';
  const URL = `https://www.cloudskillsboost.google/public_profiles/${PROFILE_ID}`;

  try {
    // 1. Fetch halaman HTML profil
    const { data: html } = await axios.get(URL, {
      headers: {
        // Pura-pura jadi browser agar tidak diblokir
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36',
      },
    });

    // 2. Load HTML ke Cheerio
    const $ = cheerio.load(html);
    const badges: any[] = [];

    // 3. Iterasi setiap elemen badge (Logika adaptasi dari profileParser.ts)
    $('.profile-badge').each((_, element) => {
      const el = $(element);

      // Ambil Gambar Badge
      const image = el.find('img').attr('src');

      // Ambil Tanggal (Format: "Earned Jun 20, 2024")
      const dateText = el.find('.ql-body-medium.l-mbs').text();
      const date = dateText.replace('Earned', '').trim();

      // Ambil Judul (Trik mengambil dari Modal ID seperti di referensi gcsbhelper)
      // Mencari tombol di dalam badge untuk mendapatkan ID modal target
      const modalId = el.find('ql-button').attr('modal');
      let title = '';

      if (modalId) {
        // Cari elemen modal berdasarkan ID di seluruh dokumen
        const modalEl = $(`#${modalId}`);
        // Judul biasanya ada di atribut 'headline' pada elemen modal tersebut
        title = modalEl.attr('headline') || '';
      }

      // Fallback jika judul tidak ketemu via modal (kadang struktur berubah)
      if (!title) {
        title = el.find('.profile-badge--title').text().trim();
      }

      if (title && image) {
        badges.push({ title, date, image });
      }
    });

    // 4. Hitung Statistik Sederhana
    const stats = {
      totalBadges: badges.length,
      // Asumsi: 1 Badge = 0.5 poin Arcade (Sesuaikan dengan aturan musim ini)
      estimatedPoints: Math.floor(badges.length * 0.5),
      lastActive: badges.length > 0 ? badges[0].date : '-',
      profileUrl: URL,
    };

    return NextResponse.json({ stats, badges });
  } catch (error) {
    console.error('Scraping Error:', error);
    return NextResponse.json({ error: 'Gagal mengambil data Arcade. Coba lagi nanti.' }, { status: 500 });
  }
}
