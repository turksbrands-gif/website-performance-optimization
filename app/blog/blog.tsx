// Bu kod, sizin yerinize sayfayı oluşturur.
// Hiçbir şeyi değiştirmenize gerek yok.

export default function BlogSayfasi({ params }: { params: { slug: string } }) {
  return (
    <main style={{ padding: '50px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Yazı Başlığı: {params.slug.replace(/-/g, ' ')}</h1>
      <p>Burası sizin otomatik oluşan blog sayfanız.</p>
      <p>Buraya n8n üzerinden gelen veriler veya yüklediğiniz dosyalar gelecek.</p>
    </main>
  );
}
