import time
import requests
import sys

# n8n Webhook URL'nizi buraya yapıştırın (önceki adımdaki gibi)
N8N_WEBHOOK_URL = "https://n8n.brandslord.online/webhook/market-pulse-data"

def get_market_data():
    """n8n'den veriyi çeker."""
    try:
        response = requests.get(N8N_WEBHOOK_URL, timeout=5)
        response.raise_for_status() # Hata varsa (örn. 404, 500) except bloğuna düşürür
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"\n[Hata] Veri çekilemedi: {e}")
        # Hata durumunda dönecek örnek/varsayılan veri
        return [
            {"symbol": "S&P 500", "price": "$681.01", "change": "↑ 10.75 (1.60%)", "isUp": True},
            {"symbol": "Bitcoin", "price": "$58779.78", "change": "↓ -1358.60 (-2.26%)", "isUp": False}
        ]

def display_ticker():
    """Veriyi terminalde sürekli güncellenen bir satır olarak gösterir."""
    print("Market Pulse Başlatılıyor... (Çıkmak için Ctrl+C'ye basın)\n")
    
    while True:
        data = get_market_data()
        
        # Verileri tek bir string (metin) satırında birleştir
        ticker_text = " | ".join(
            [f"{item['symbol']}: {item['price']} ({item['change']})" for item in data]
        )
        
        # Terminalde aynı satırın üzerine yaz (üzerine yazma efekti)
        # \r karakteri imleci satır başına alır
        # end="" print fonksiyonunun yeni satıra geçmesini engeller
        sys.stdout.write(f"\r LIVE BIST/KRYPTO: {ticker_text}          ")
        sys.stdout.flush() # Tampon belleği temizle ve hemen ekrana yaz
        
        # Her 60 saniyede bir veriyi güncelle
        time.sleep(60)

if __name__ == "__main__":
    try:
        display_ticker()
    except KeyboardInterrupt:
        print("\n\nTicker durduruldu. İyi günler!")
