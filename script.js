// welcome-screen tıklanınca gizle
document.getElementById('welcome-screen').addEventListener('click', () => {
  document.getElementById('welcome-screen').style.display = 'none';
});
const specialDates = [
  // Utku
  { start: '2025-10-20', end: '2025-10-24', color: 'orange', label: 'Atış' },
  { start: '2025-11-03', end: '2025-11-07', color: 'red', label: 'Vize' },
  { start: '2025-12-29', end: '2026-01-02', color: 'red', label: 'Final' },
  { start: '2026-01-12', end: '2026-01-23', color: 'green', label: 'İzin' },
  { start: '2026-03-09', end: '2026-03-13', color: 'red', label: 'Bahar Vize' },
  { start: '2026-03-30', end: '2026-04-03', color: 'orange', label: 'Atış' },
  { start: '2026-05-11', end: '2026-05-22', color: 'red', label: 'Final' },
  { start: '2026-06-01', end: '2026-06-22', color: 'green', label: 'İzin' },

  // Şevval (kırmızının tonlarıyla)
  { start: '2025-11-17', end: '2025-11-22', color: '#e57373', label: 'Vize' },
  { start: '2026-01-12', end: '2026-01-22', color: '#ef5350', label: 'Final' },
  { start: '2026-04-13', end: '2026-04-18', color: '#f06292', label: 'Vize Bahar' },
  { start: '2026-06-15', end: '2026-06-25', color: '#d32f2f', label: 'Final' },

  // Kesişen günler → Mor olacak (override yapacağız)
  // Doğum günleri
  { date: '2026-03-08', birthday: true },
  { date: '2025-05-29', birthday: true },
  { date: '2026-07-03', birthday: true },
  { date: '2025-12-27', birthday: true },
  { date: '2026-01-04', birthday: true },
];

const remoteList = [
  {letter: "A", text:"Art exchange: Birbirinize çizimler veya dijital sanatlar gönderin."},
  {letter: "B", text:"Book club: Aynı kitabı okuyup tartışın."},
  {letter: "C", text:"Chess Date: Sonucu belli bir satranç maçı yapalım sevgilim."},
  {letter: "D", text:"Deep questions: Anlamlı sorularla birbirinizi daha iyi tanıyın."},
  {letter: "E", text:"Emoji story: Sadece emoji kullanarak hikaye anlatın ve tahmin edin."},
  {letter: "F", text:"Film night: Aynı filmi eş zamanlı izleyin."},
  {letter: "G", text:"GeoGuessr: Online dünya haritasında yer tahmini oyunu oynayın."},
  {letter: "H", text:"Handwritten letters: El yazısı mektuplar gönderin."},
  {letter: "I", text:"Inside jokes: Kendi aranızda özel espriler yapın."},
  {letter: "J", text:"Journaling: Ortak günlük tutup duygularınızı yazın."},
  {letter: "K", text:"Karaoke: Online karaoke yapıp şarkı söyleyin."},
  {letter: "L", text:"Learn together: Yeni bir şey öğrenin (dil, hobi vb.)."},
  {letter: "M", text:"Make a mixtape: Birbiriniz için özel çalma listeleri hazırlayın."},
  {letter: "N", text:"Night sky: Yıldızları izleyip fotoğraf paylaşın."},
  {letter: "O", text:"Origami: Birlikte origami yapın ve sonucu gösterin."},
  {letter: "P", text:"Playlist swap: Favori şarkılarınızı değiş tokuş edin."},
  {letter: "Q", text:"Quizzes: Eğlenceli testler yapıp sonuçları karşılaştırın."},
  {letter: "R", text:"Random acts of kindness: Küçük sürprizler yapın, hediyeler gönderin."},
  {letter: "S", text:"Stargazing: Sanal olarak birlikte yıldızları inceleyin."},
  {letter: "T", text:"Tarot card reading: Birbirinize tarot falı bakın."},
  {letter: "U", text:"Online Uno date: İnternetten Uno veya başka kart oyunları oynayın."},
  {letter: "V", text:"Virtual tours: Sanal müzeler veya şehir turları yapın."},
  {letter: "W", text:"Workout: Beraber online egzersiz yapın."},
  {letter: "X", text:"XOXO letters: Sevgili dolu mesajlar, resimler paylaşın."},
  {letter: "Y", text:"YouTube binge: Aynı anda YouTube videoları izleyin."},
  {letter: "Z", text:"Zen time: Birlikte meditasyon veya rahatlama yapın."},
];

function toggleRemoteList() {
  const listEl = document.querySelector('.alphabet-list');
  if(listEl.style.display === 'none') {
    listEl.style.display = 'block';
    if(listEl.children.length === 0) {
      remoteList.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.letter} – ${item.text}`;
        listEl.appendChild(li);
      });
    }
  } else {
    listEl.style.display = 'none';
  }
}
const bulusmaData = {
  locations: ["Ankara", "İstanbul", "Eskişehir", "Kim Bilir?"],
  indoor: ["AVM", "Sinema", "Tiyatro", "Sergi", "Müze", "Kutu Oyunları", "Hobi Atölyeleri", "Cafe", "Sürekli Dizi Maratonu"],
  outdoorIstanbul: ["Vapur", "Pierre Loti", "Maçka Parkı", "Eyüpsultan", "Balat", "Kadıköy turu", "Yıldız Teknik Beşiktaş Kampüsü", "Beylerbeyi Sarayı", "Yıldız Sarayı", "Galata Kulesi", "Yerebatan Sarnıcı"],
  outdoorAnkara: ["Ayaş", "Anıtkabir", "7. Cadde", "Kuğulu Park", "Gençlik Parkı", "Bahçelievler", "Mogan", "ESAT Mahallesi"],
  outdoorEskisehir: ["Barlar Sokağı", "Karnaval", "VR", "Pamukşekerli Türk Kahvecisi"],
  commonOutdoor: ["Piknik", "Voleybol", "Badminton", "Yürüyüş Rotası", "Kamp", "Konser", "Fotoğraf Çekme Buluşması"]
};

const interactiveSteps = document.getElementById('interactive-steps');
const resultEl = document.getElementById('result');

let selections = {};

// Adım 1: Nerede Buluşalım?
function startBulusma() {
  interactiveSteps.innerHTML = '';
  resultEl.innerHTML = '';
  selections = {};
  createQuestion('Nerede Buluşalım?', bulusmaData.locations, (answer) => {
    selections.location = answer;
    step2MeetingType();
  });
}

// Adım 2: Nasıl bir buluşma olsun?
function step2MeetingType() {
  createQuestion('Nasıl bir buluşma olsun?', ['Dış Mekan', 'İç Mekan'], (answer) => {
    selections.meetingType = answer;
    if(answer === 'İç Mekan') {
      step3IndoorOptions();
    } else {
      step3OutdoorOptions();
    }
  });
}

// Adım 3 İç Mekan Seçenekleri
function step3IndoorOptions() {
  createQuestion('İç Mekan seçenekleri:', bulusmaData.indoor, (answer) => {
    selections.indoorOption = answer;
    showBulusmaResult();
  });
}

// Adım 3 Dış Mekan Seçenekleri
function step3OutdoorOptions() {
  let options = [...bulusmaData.commonOutdoor];
  if(selections.location === 'İstanbul') {
    options = options.concat(bulusmaData.outdoorIstanbul);
  } else if(selections.location === 'Ankara') {
    options = options.concat(bulusmaData.outdoorAnkara);
  } else if(selections.location === 'Eskişehir') {
    options = options.concat(bulusmaData.outdoorEskisehir);
  }
  createQuestion('Dış Mekan seçenekleri:', options, (answer) => {
    selections.outdoorOption = answer;
    showBulusmaResult();
  });
}

// Genel soru yaratma fonksiyonu
function createQuestion(questionText, options, callback) {
  interactiveSteps.innerHTML = '';
  const q = document.createElement('h3');
  q.textContent = questionText;
  interactiveSteps.appendChild(q);

  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.textContent = opt;
    btn.className = 'button';
    btn.onclick = () => {
      callback(opt);
    };
    interactiveSteps.appendChild(btn);
  });
}

// Sonuç göster
function showBulusmaResult() {
  let text = `Seçimleriniz: <br>`;
  text += `Lokasyon: <strong>${selections.location || '-'}</strong><br>`;
  text += `Buluşma Türü: <strong>${selections.meetingType || '-'}</strong><br>`;
  if(selections.meetingType === 'İç Mekan') {
    text += `İç Mekan Seçeneği: <strong>${selections.indoorOption || '-'}</strong>`;
  } else {
    text += `Dış Mekan Seçeneği: <strong>${selections.outdoorOption || '-'}</strong>`;
  }
  resultEl.innerHTML = text;
}

// Reset butonu
document.getElementById('reset-bulusma').addEventListener('click', startBulusma);

// Sayfa açıldığında başlat
startBulusma();
const foodSteps = document.getElementById('food-steps');
const resetFoodBtn = document.getElementById('reset-yemek');

let foodSelection = {};

const foodData = {
  mainCategories: ["Fast Food", "Sıcak Yemek"],
  fastFoodOptions: ["Pizza", "Makarna", "Hamburger", "Döner", "Çiğköfte"],
  hotFoodOptions: ["Green Salads", "Tavuk Dünyası", "Çorbacı", "Masum bir Aspava", "Bizim Lokanta"],
  pizzaPlaces: ["Pizzabuls", "Dominos (Sarımsak Kenar)", "Pasaport", "MİGROS", "Pizza2Go"],
  hamburgerPlaces: ["Burger King", "McDonald’s", "BurgerYiyelim", "Dali", "SaltFried Chicken", "Betro Burger"],
  hamburgerSpecialCities: ["İstanbul"],
  cigkoftePlace: "Çiğköfteci Ömer Usta - Cevizlibağ",
  donerPlace: "Öncü"
};

function startFoodSelection() {
  foodSteps.innerHTML = '';
  foodSelection = {};
  createFoodQuestion('Ne yesek?', foodData.mainCategories, (answer) => {
    foodSelection.main = answer;
    if(answer === "Fast Food") {
      createFoodQuestion('Fast Food seçenekleri:', foodData.fastFoodOptions, (ans) => {
        foodSelection.fastFood = ans;
        if(ans === 'Pizza') {
          createFoodQuestion('Pizza için:', foodData.pizzaPlaces, (place) => {
            foodSelection.place = place;
            showFoodResult();
          });
        } else if(ans === 'Hamburger') {
          createFoodQuestion('Hamburger için:', foodData.hamburgerPlaces, (place) => {
            foodSelection.place = place;
            showFoodResult();
          });
        } else if(ans === 'Çiğköfte') {
          foodSelection.place = foodData.cigkoftePlace;
          showFoodResult();
        } else if(ans === 'Döner') {
          foodSelection.place = foodData.donerPlace;
          showFoodResult();
        } else {
          showFoodResult();
        }
      });
    } else {
      // Sıcak Yemek
      createFoodQuestion('Ev Yemeği seçenekleri:', foodData.hotFoodOptions, (ans) => {
        foodSelection.hotFood = ans;
        showFoodResult();
      });
    }
  });
}

function createFoodQuestion(questionText, options, callback) {
  foodSteps.innerHTML = '';
  const q = document.createElement('h3');
  q.textContent = questionText;
  foodSteps.appendChild(q);

  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.textContent = opt;
    btn.className = 'button';
    btn.onclick = () => {
      callback(opt);
    };
    foodSteps.appendChild(btn);
  });
}

function showFoodResult() {
  let text = `Seçimleriniz:<br>`;
  text += `Ana Kategori: <strong>${foodSelection.main || '-'}</strong><br>`;
  if(foodSelection.main === "Fast Food") {
    text += `Seçenek: <strong>${foodSelection.fastFood || '-'}</strong><br>`;
    if(foodSelection.place) {
      text += `Yer: <strong>${foodSelection.place}</strong>`;
      // Öncü resmi gösterme örneği
      if(foodSelection.place === "Öncü") {
        text += `<br><img src="oncu.jpg" alt="Öncü Döner" style="max-width: 300px; margin-top: 1rem; border-radius: 8px;">`;
      }
    }
  } else {
    text += `Seçenek: <strong>${foodSelection.hotFood || '-'}</strong>`;
  }
  foodSteps.innerHTML += `<div class="fade-in" style="margin-top: 1rem;">${text}</div>`;
}

resetFoodBtn.addEventListener('click', startFoodSelection);

// Sayfa açıldığında başlat
startFoodSelection();
const calendarContainer = document.getElementById('calendar-container');

let currentYear = 2025;
let currentMonth = 7; // Ağustos 2025, 0 tabanlı, 7 = Ağustos (Ocak=0)

function createCalendar(year, month) {
  calendarContainer.innerHTML = ''; // Temizle

  // Ay ve Yıl Başlığı
  const monthNames = ["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"];
  const header = document.createElement('div');
  header.style.display = 'flex';
  header.style.justifyContent = 'space-between';
  header.style.alignItems = 'center';
  header.style.marginBottom = '1rem';

  const prevBtn = document.createElement('button');
  prevBtn.textContent = '<';
  prevBtn.className = 'button';
  prevBtn.onclick = () => {
    if(month === 8 && year === 2026) return; // Sınır sağda  Ekim 2026
    if(month === 0) {
      currentYear--;
      currentMonth = 11;
    } else {
      currentMonth--;
    }
    createCalendar(currentYear, currentMonth);
  };

  const nextBtn = document.createElement('button');
  nextBtn.textContent = '>';
  nextBtn.className = 'button';
  nextBtn.onclick = () => {
    if(month === 7 && year === 2025) {
      // Ağustos 2025 başlangıç, izin
    }
    if(month === 9 && year === 2026) return; // Sınır sağda Ekim 2026
    if(month === 11) {
      currentYear++;
      currentMonth = 0;
    } else {
      currentMonth++;
    }
    createCalendar(currentYear, currentMonth);
  };

  const title = document.createElement('h3');
  title.textContent = `${monthNames[month]} ${year}`;
  title.style.flexGrow = '1';
  title.style.textAlign = 'center';

  header.appendChild(prevBtn);
  header.appendChild(title);
  header.appendChild(nextBtn);
  calendarContainer.appendChild(header);

  // Haftanın günleri başlıkları
  const daysOfWeek = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];
  const daysRow = document.createElement('div');
  daysRow.style.display = 'grid';
  daysRow.style.gridTemplateColumns = 'repeat(7, 1fr)';
  daysRow.style.fontWeight = '700';
  daysRow.style.marginBottom = '0.5rem';
  daysOfWeek.forEach(day => {
    const d = document.createElement('div');
    d.textContent = day;
    d.style.textAlign = 'center';
    daysRow.appendChild(d);
  });
  calendarContainer.appendChild(daysRow);

  // Günler ızgarası
  const daysGrid = document.createElement('div');
  daysGrid.style.display = 'grid';
  daysGrid.style.gridTemplateColumns = 'repeat(7, 1fr)';
  daysGrid.style.gap = '4px';

  // İlk gün haftanın günü (0=Pzt, 6=Paz)
  const firstDay = new Date(year, month, 1).getDay();
  // JS: Pazar=0 ... Cumartesi=6, bizde Pzt=0, pazar=6 olduğu için:
  const firstWeekDay = (firstDay + 6) % 7;

  // Boş kutucuklar ekle
  for(let i=0; i < firstWeekDay; i++) {
    const empty = document.createElement('div');
    daysGrid.appendChild(empty);
  }

  // Günleri ekle
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();

  for(let day=1; day<=daysInMonth; day++) {
    const dayDiv = document.createElement('div');
    dayDiv.textContent = day;
    dayDiv.style.textAlign = 'center';
    dayDiv.style.padding = '8px';
    dayDiv.style.borderRadius = '8px';
    dayDiv.style.userSelect = 'none';

    // Bugün mü?
    if(day === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
      dayDiv.style.border = '3px solid #00ffff'; // cam göbeği cursor
      dayDiv.style.fontWeight = '700';
    }

    // TODO: Özel tarihler renkleri ve doğum günü işaretleri buraya gelecek.

    daysGrid.appendChild(dayDiv);
  }

  calendarContainer.appendChild(daysGrid);
}

createCalendar(currentYear, currentMonth);

.calendar-day {
  text-align: center;
  padding: 10px;
  border-radius: 8px;
  position: relative;
  transition: transform 0.2s;
  cursor: default;
}

.calendar-day:hover {
  transform: scale(1.08);
}

.special-day {
  color: white;
  cursor: pointer;
  font-weight: bold;
  box-shadow: 0 0 5px rgba(0,0,0,0.2);
  position: relative;
}

/* Tooltip */
.special-day::after {
  content: attr(data-tooltip);
  position: absolute;
  bottom: 120%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #333;
  color: #fff;
  font-size: 12px;
  padding: 6px 8px;
  border-radius: 5px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
  z-index: 10;
}

.special-day:hover::after {
  opacity: 1;
}

.today {
  border: 2px solid #00ffff;
  font-weight: 900;
  box-shadow: 0 0 0 3px #00ffff60;
}

