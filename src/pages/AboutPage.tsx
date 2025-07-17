import React from 'react';
import Layout from '../components/common/Layout';

const AboutPage: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">Tentang Nutrié</h1>
          <p className="text-gray-600 text-lg mb-12">
          Alun Alun Kidul (Alun-Alun Selatan) merupakan salah satu tempat berkumpul paling populer di Yogyakarta, terletak di sebelah selatan Kraton atau Keraton Yogyakarta.
Area ini dikenal dengan suasana malamnya yang semarak dan deretan pedagang kaki lima yang menawarkan berbagai macam hidangan khas daerah.

Mulai dari hidangan gurih, camilan manis dan minuman tradisional, pengunjung dapat merasakan langsung kekayaan rasa dan budaya kuliner khas Yogyakarta.

Nutrié hadir sebagai platform informasi gizi yang akurat dan lengkap untuk berbagai makanan dan minuman yang tersedia di Alun Alun Kidul, Yogyakarta.
          </p>
          
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Misi Kami</h2>
            <p className="text-gray-600 text-lg mb-4">
            • Meningkatkan kesadaran gizi masyarakat dan wisatawan
            </p>
            <p className="text-gray-600 text-lg mb-4">
            • Membantu pengunjung membuat keputusan konsumsi yang bijak
            </p>
            <p className="text-gray-600 text-lg mb-4">
            • Mendukung gaya hidup sehat tanpa harus meninggalkan kekayaan cita rasa kuliner lokal
            </p>
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Pengumpulan Data</h2>
            <p className="text-gray-600 text-lg mb-4">
            Proses pengumpulan data dilakukan melalui metode estimasi gizi, 
            yaitu dengan melakukan identifikasi dan penimbangan bahan makanan yang digunakan dalam setiap menu. 
            Selanjutnya, data tersebut dianalisis menggunakan perangkat lunak NutriSurvey & Tabel Komposisi Pangan Indonesia (TKPI) untuk memperoleh rincian kandungan gizi secara kuantitatif dan terstandar.
            </p>
            <p className="text-gray-600 text-lg mb-4">
            Seluruh nilai gizi yang ditampilkan dihitung berdasarkan standar rujukan dan diperbarui secara berkala guna menjaga akurasi informasi.
            Namun, perlu diperhatikan bahwa kandungan gizi aktual dapat sedikit berbeda tergantung pada variasi ukuran porsi dan teknik penyajian oleh masing-masing pedagang.
            </p>

            <p className="text-gray-600 text-lg">
            Website ini merupakan bagian dari proyek penelitian mahasiswa Program Studi S1 Gizi Universitas Ahmad Dahlan.
            </p>
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Tim Pengembang</h2>
            <p className="text-gray-600 text-lg mb-4">
              Chintiya
            </p>
            <p className="text-gray-600 text-lg mb-4">
              Tiara Amanda Putri
            </p>
            <p className="text-gray-600 text-lg mb-4">
              Firman
            </p>
          </section>
<section>
  <h2 className="text-2xl font-bold text-gray-800 mb-4">Produksi</h2>
  <p className="text-gray-600 text-lg mb-6">
    Program Studi Gizi, Universitas Ahmad Dahlan (UAD)
  </p>
</section>
  
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Kontak Kami</h2>
            <p className="text-gray-600 text-lg mb-4">
              Ada pertanyaan, saran, atau kritik? Kami senang mendengar dari Anda!
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-2"><strong>Email:</strong> prodi@gizi.uad.ac.id</p>
              <p className="text-gray-700 mb-2"><strong>Telepon:</strong> +62 882 1573 2893</p>
              <p className="text-gray-700"><strong>Alamat:</strong> Program Studi S1 Gizi, Jl. Prof. DR. Soepomo Sh, Warungboto, Umbulharjo, Yogyakarta, Daerah Istimewa Yogyakarta</p>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;