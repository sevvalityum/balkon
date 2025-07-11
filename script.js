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
// --- Bu Hafta Ne Yapıyoruz ---

const bulusmaVerileri = {
  sehirler: ["Ankara", "İstanbul", "Eskişehir", "Kim Bilir?"],
  icMekan: ["AVM", "Sinema", "Tiyatro", "Sergi", "Müze", "Kutu Oyunları", "Hobi Atölyeleri", "Cafe", "Sürekli Dizi Maratonu"],
  disMekanGenel: ["Piknik", "Voleybol", "Badminton", "Yürüyüş Rotası", "Kamp", "Konser", "Fotoğraf Çekme Buluşması"],
  disMekanIst: ["Vapur", "Pierre Loti", "Maçka Parkı", "Eyüpsultan", "Balat", "Kadıköy turu", "Yıldız Teknik Beşiktaş Kampüsü", "Beylerbeyi Sarayı", "Yıldız Sarayı", "Galata Kulesi", "Yerebatan Sarnıcı"],
  disMekanAnk: ["Ayaş", "Anıtkabir", "7. Cadde", "Kuğulu Park", "Gençlik Parkı", "Bahçelievler", "Mogan", "ESAT Mahallesi"],
  disMekanEsk: ["Barlar Sokağı", "Karnaval", "VR", "Pamukşekerli Türk Kahvecisi"]
};

function startBulusmaPlanlama() {
  const container = document.getElementById("interactive-steps");
  container.innerHTML = "";
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";

  let secimler = {};

  // Soru 1: Nerede buluşalım?
  const soru1 = document.createElement("div");
  soru1.innerHTML = `<h3>1. Nerede Buluşalım?</h3>`;
  bulusmaVerileri.sehirler.forEach(sehir => {
    const btn = document.createElement("button");
    btn.textContent = sehir;
    btn.className = "button";
    btn.onclick = () => {
      secimler.sehir = sehir;
      soru1.style.display = "none";
      soru2.style.display = "block";
      renderSoru2(sehir);
    };
    soru1.appendChild(btn);
  });
  container.appendChild(soru1);

  // Soru 2: Nasıl bir buluşma olsun? (Dış / İç mekan)
  const soru2 = document.createElement("div");
  soru2.style.display = "none";
  soru2.innerHTML = `<h3>2. Nasıl bir buluşma olsun?</h3>`;

  ["Dış Mekan", "İç Mekan"].forEach(tur => {
    const btn = document.createElement("button");
    btn.textContent = tur;
    btn.className = "button";
    btn.onclick = () => {
      secimler.tur = tur;
      soru2.style.display = "none";
      renderSoru3(secimler.sehir, tur);
    };
    soru2.appendChild(btn);
  });
  container.appendChild(soru2);

  // Soru 3: Mekan seçenekleri (dinamik, şehir ve tur bazlı)
  function renderSoru2(sehir) {
    soru2.style.display = "block";
  }

  function renderSoru3(sehir, tur) {
    const soru3 = document.createElement("div");
    soru3.innerHTML = `<h3>3. Mekan Seçenekleri</h3>`;
    container.appendChild(soru3);

    let secenekler = [];

    if (tur === "İç Mekan") {
      secenekler = bulusmaVerileri.icMekan;
    } else if (tur === "Dış Mekan") {
      // Şehir bazlı dış mekan seçenekleri + ortaklar
      if (sehir === "İstanbul") {
        secenekler = [...bulusmaVerileri.disMekanIst, ...bulusmaVerileri.disMekanGenel];
      } else if (sehir === "Ankara") {
        secenekler = [...bulusmaVerileri.disMekanAnk, ...bulusmaVerileri.disMekanGenel];
      } else if (sehir === "Eskişehir") {
        secenekler = [...bulusmaVerileri.disMekanEsk, ...bulusmaVerileri.disMekanGenel];
      } else {
        secenekler = bulusmaVerileri.disMekanGenel;
      }
    }

    secenekler.forEach(opt => {
      const btn = document.createElement("button");
      btn.textContent = opt;
      btn.className = "button";
      btn.onclick = () => {
        secimler.mekan = opt;
        soru3.style.display = "none";
        showResult();
      };
      soru3.appendChild(btn);
    });

    function showResult() {
      const resultDiv = document.getElementById("result");
      resultDiv.innerHTML = `<h3>Sonuç:</h3>
      <p>Şehir: <strong>${secimler.sehir}</strong></p>
      <p>Tür: <strong>${secimler.tur}</strong></p>
      <p>Mekan: <strong>${secimler.mekan}</strong></p>`;
      resultDiv.classList.add("fade-in");
      container.scrollIntoView({behavior: "smooth"});
    }
  }
}

startBulusmaPlanlama();
// --- Ne Yesek ---

const yemekVerileri = {
  anaSecenekler: ["Fast Food", "Sıcak Yemek"],
  fastFood: ["Pizza", "Makarna", "Hamburger", "Döner", "Çiğköfte"],
  sicakYemek: ["Green Salads", "Tavuk Dünyası", "Çorbacı", "Masum bir Aspava", "Bizim Lokanta"],
  pizzaYerler: ["Pizzabuls", "Dominos (Sarımsak Kenar)", "Pasaport", "MİGROS", "Pizza2Go"],
  hamburgerYerlerIstanbul: ["Burger King", "McDonald’s", "BurgerYiyelim", "Dali", "SaltFried Chicken", "Betro Burger"]
};

function startYemekSecimi() {
  const container = document.getElementById("food-steps");
  container.innerHTML = "";

  let secimler = {};

  // Soru 1: Fast Food / Sıcak Yemek
  const soru1 = document.createElement("div");
  soru1.innerHTML = `<h3>1. Ne tür yemek olsun?</h3>`;
  yemekVerileri.anaSecenekler.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.className = "button";
    btn.onclick = () => {
      secimler.tip = opt;
      soru1.style.display = "none";
      renderSoru2(opt);
    };
    soru1.appendChild(btn);
  });
  container.appendChild(soru1);

  // Soru 2: Seçenekler (fastfood veya sıcak yemek)
  function renderSoru2(tip) {
    const soru2 = document.createElement("div");
    soru2.innerHTML = `<h3>2. Seçenekler</h3>`;
    container.appendChild(soru2);

    let secenekler = [];
    if (tip === "Fast Food") secenekler = yemekVerileri.fastFood;
    else secenekler = yemekVerileri.sicakYemek;

    secenekler.forEach(opt => {
      const btn = document.createElement("button");
      btn.textContent = opt;
      btn.className = "button";
      btn.onclick = () => {
        secimler.yemek = opt;
        soru2.style.display = "none";
        showResult(opt);
      };
      soru2.appendChild(btn);
    });

    function showResult(yemek) {
      const resultDiv = document.createElement("div");
      resultDiv.className = "fade-in";
      container.appendChild(resultDiv);

      if (yemek === "Pizza") {
        resultDiv.innerHTML = `<h3>Pizza Seçenekleri</h3>`;
        yemekVerileri.pizzaYerler.forEach(pizzaYer => {
          const btn = document.createElement("button");
          btn.textContent = pizzaYer;
          btn.className = "button";
          resultDiv.appendChild(btn);
        });
      }
      else if (yemek === "Hamburger") {
        resultDiv.innerHTML = `<h3>Hamburger Seçenekleri</h3>`;
        yemekVerileri.hamburgerYerlerIstanbul.forEach(hamburgerYer => {
          const btn = document.createElement("button");
          btn.textContent = hamburgerYer;
          btn.className = "button";
          resultDiv.appendChild(btn);
        });
      }
      else if (yemek === "Çiğköfte") {
        container.innerHTML = `<h3>Öneri:</h3><p>Çiğköfteci Ömer Usta - Cevizlibağ</p>`;
      }
      else if (yemek === "Döner") {
        container.innerHTML = `<h3>Öneri:</h3><p>Öncü Döner</p>
        <img src="https://upload.wikimedia.org/wikipedia/commons/4/48/%C3%96nc%C3%BC_doner.jpg" alt="Öncü Döner" style="max-width:100%; border-radius: 12px; margin-top:10px;">`;
      }
      else {
        container.innerHTML = `<h3>Öneri:</h3><p>${yemek} - Harika seçim!</p>`;
      }
    }
  }
}

startYemekSecimi();

