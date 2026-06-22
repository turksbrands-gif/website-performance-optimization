export default function BlogSayfasi({ params }: { params: { slug: string } }) {
  // Yazı başlığını URL'den otomatik temiz ve düzgün alır
  const title = params.slug.replace(/-/g, ' ').toUpperCase();

  return (
    <article style={{ 
      maxWidth: '800px', 
      margin: '80px auto', 
      padding: '0 20px', 
      lineHeight: '1.8', 
      color: '#d1d5db' 
    }}>
      {/* Header - Başlık ve Meta Bilgisi */}
      <header style={{ marginBottom: '50px', borderBottom: '1px solid #1f2937', paddingBottom: '20px' }}>
        <h1 style={{ fontSize: '36px', fontWeight: '800', color: '#ffffff', marginBottom: '10px' }}>
          {title}
        </h1>
        <p style={{ color: '#6b7280', fontSize: '14px', letterSpacing: '1px' }}>
          MARKET INTELLIGENCE REPORT • BRANDLORD
        </p>
      </header>

      {/* İçerik Alanı - Okuma Ahengi İçin Geniş Boşluklar */}
      <section style={{ fontSize: '18px', marginBottom: '40px' }}>
        <p>Analiz detaylarınız, öngörüleriniz ve piyasa notlarınız burada otomatik olarak yer alacak.</p>
      </section>

      {/* Modern Veri Tablosu Yapısı */}
      <div style={{ 
        background: '#0b0f19', 
        border: '1px solid #374151', 
        padding: '25px', 
        borderRadius: '12px', 
        marginTop: '40px' 
      }}>
        <h3 style={{ color: '#fff', marginBottom: '20px', fontSize: '20px' }}>Önemli Göstergeler</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ color: '#9ca3af', borderBottom: '1px solid #374151' }}>
              <th style={{ textAlign: 'left', padding: '12px' }}>Sinyal</th>
              <th style={{ textAlign: 'left', padding: '12px' }}>Durum</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '12px', borderBottom: '1px solid #1f2937' }}>Piyasa Hacmi</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #1f2937' }}>Pozitif</td>
            </tr>
          </tbody>
        </table>
      </div>
    </article>
  );
}
