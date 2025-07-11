// script.js

document.addEventListener("DOMContentLoaded", () => {
  renderAlphabetList();
  renderCalendar();
  setupMenuLinks();
  // Bu Hafta ve Ne Yesek kısımları eklenecek sonra
});

// 1. Uzaktan Ne Yapabiliriz A-Z listesi
const alphabetItems = {
  A: "Art exchange: Birbirinize çizimler veya dijital sanatlar gönderin.",
  B: "Book club: Aynı kitabı okuyup tartışın.",
  C: "Chess Date: Sonucu belli bir satranç maçı yapalım sevgilim.",
  D: "Deep questions: Anlamlı sorularla birbirinizi daha iyi tanıyın.",
  E: "Emoji story: Sadece emoji kullanarak hikaye anlatın ve tahmin edin.",
  F: "Film night: Aynı filmi eş zamanlı izleyin.",
  G: "GeoGuessr: Online dünya haritasında yer tahmini oyunu oynayın.",
  H: "Handwritten letters: El yazısı mektuplar gönderin.",
  I: "Inside jokes: Kendi aranızda özel espriler yapın.",
  J: "Journaling: Ortak günlük tutup duygularınızı yazın.",
  K: "Karaoke: Online karaoke yapıp şarkı söyleyin.",
  L: "Learn together: Yeni bir şey öğrenin (dil, hobi vb.).",
  M: "Make a mixtape: Birbiriniz için özel çalma listeleri hazırlayın.",
  N: "Night sky: Yıldızları izleyip fotoğraf paylaşın.",
  O: "Origami: Birlikte origami yapın ve sonucu gösterin.",
  P: "Playlist swap: Favori şarkılarınızı değiş tokuş edin.",
  Q: "Quizzes: Eğlenceli testler yapıp sonuçları karşılaştırın.",
  R: "Random acts of kindness: Küçük sürprizler yapın, hediyeler gönderin.",
  S: "Stargazing: Sanal olarak birlikte yıldızları inceleyin.",
  T: "Tarot card reading: Birbirinize tarot falı bakın.",
  U: "Online Uno date: İnternetten Uno veya başka kart oyunları oynayın.",
  V: "Virtual tours: Sanal müzeler veya şehir turları yapın.",
  W: "Workout: Beraber online egzersiz yapın.",
  X: "XOXO letters: Sevgili dolu mesajlar, resimler paylaşın.",
  Y: "YouTube binge: Aynı anda YouTube videoları izleyin.",
  Z: "Zen time: Birlikte meditasyon veya rahatlama yapın."
};

function renderAlphabetList() {
  const list = document.querySelector(".alphabet-list");
  list.innerHTML = Object.entries(alphabetItems)
    .map(([letter, desc]) => `<li><strong>${letter}:</strong> ${desc}</li>`)
    .join("");
}

// 4. Takvim

let currentMonth = 7; // Ağustos 2025 (0 bazlı: 0=Ocak)
let currentYear = 2025;

const monthNames = [
  "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
  "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
];

function renderCalendar() {
  const calendarContainer = document.getElementById("calendar-container");
  calendarContainer.innerHTML = "";

  // Header ve Ay Değiştirme Butonları
  const header = document.createElement("div");
  header.className = "calendar-header";

  const prevBtn = document.createElement("button");
  prevBtn.textContent = "◀";
  prevBtn.onclick = () => {
    if (currentYear < 2025 || (currentYear === 2025 && currentMonth <= 7)) return; // Sınır Ağustos 2025
    if (currentMonth === 0) {
      currentMonth = 11;
      currentYear--;
    } else {
      currentMonth--;
    }
    renderCalendar();
  };

  const nextBtn = document.createElement("button");
  nextBtn.textContent = "▶";
  nextBtn.onclick = () => {
    if (currentYear > 2026 || (currentYear === 2026 && currentMonth >= 9)) return; // Sınır Ekim 2026
    if (currentMonth === 11) {
      currentMonth = 0;
      currentYear++;
    } else {
      currentMonth++;
    }
    renderCalendar();
  };

  const title = document.createElement("h3");
  title.textContent = `${monthNames[currentMonth]} ${currentYear}`;

  header.appendChild(prevBtn);
  header.appendChild(title);
  header.appendChild(nextBtn);
  calendarContainer.appendChild(header);

  // Haftanın günleri
  const daysRow = document.createElement("div");
  daysRow.className = "calendar-days";
  ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"].forEach(day => {
    const dayEl = document.createElement("div");
    dayEl.className = "day-name";
    dayEl.textContent = day;
    daysRow.appendChild(dayEl);
  });
  calendarContainer.appendChild(daysRow);

  // Günler ve boş hücreler
  const calendarGrid = document.createElement("div");
  calendarGrid.className = "calendar-grid";

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // JS'te haftanın günü Pazar=0... biz Pazartesi=0 olacak şekilde ayarlıyoruz:
  let skip = (firstDay + 6) % 7;
  for (let i = 0; i < skip; i++) {
    const empty = document.createElement("div");
    empty.className = "calendar-cell empty";
    calendarGrid.appendChild(empty);
  }

  const today = new Date();

  for (let day = 1; day <= daysInMonth; day++) {
    const cell = document.createElement("div");
    cell.className = "calendar-cell";
    cell.textContent = day;

    // Bugünü işaretle
    if (
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    ) {
      cell.classList.add("today");
    }

    calendarGrid.appendChild(cell);
  }

  calendarContainer.appendChild(calendarGrid);
}

// Menüde tıklanınca o bölüme yumuşak scroll
function setupMenuLinks() {
  document.querySelectorAll(".navbar a").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      const targetElem = document.getElementById(targetId);
      if (targetElem) {
        targetElem.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}
