// --- Günaydın ekranı ---
const welcomeScreen = document.getElementById('welcome-screen');
if (welcomeScreen) {
  welcomeScreen.addEventListener('click', () => {
    welcomeScreen.classList.add('fade-out');
    setTimeout(() => {
      welcomeScreen.style.display = 'none';
    }, 800);
  });
}

// --- Takvim Bölümü ---

const calendarTitle = document.getElementById('calendar-title');
const prevMonthBtn = document.getElementById('prev-month');
const nextMonthBtn = document.getElementById('next-month');
const calendarDays = document.getElementById('calendar-days');
const dayNamesContainer = document.querySelector('.day-names');

const startYear = 2025;
const startMonth = 7; // Ağustos (0-indexed: 0=Ocak)
const endYear = 2026;
const endMonth = 9;  // Ekim

// Haftanın günleri
const dayNames = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];

// Özel tarih verileri
const specialDates = [
  // Utku
  {start: '2025-10-20', end: '2025-10-24', label: 'Atış Haftası', colorClass: 'utus-atis', person:'Utku'},
  {start: '2025-11-03', end: '2025-11-07', label: 'Vize Sınavı', colorClass: 'utus-vize', person:'Utku'},
  {start: '2025-12-29', end: '2026-01-02', label: 'Finaller', colorClass: 'utus-final', person:'Utku'},
  {start: '2026-01-12', end: '2026-01-23', label: 'İzin', colorClass: 'utus-izin', person:'Utku'},
  {start: '2026-03-09', end: '2026-03-13', label: 'Bahar Dönemi Vizeleri', colorClass: 'utus-vize', person:'Utku'},
  {start: '2026-03-30', end: '2026-04-03', label: 'Atış', colorClass: 'utus-atis', person:'Utku'},
  {start: '2026-05-11', end: '2026-05-22', label: 'Bahar Finalleri', colorClass: 'utus-final', person:'Utku'},
  {start: '2026-06-01', end: '2026-06-22', label: 'İzin', colorClass: 'utus-izin', person:'Utku'},
  // Şevval
  {start: '2025-11-17', end: '2025-11-22', label: 'Vize', colorClass: 'sevval-vize', person:'Şevval'},
  {start: '2026-01-12', end: '2026-01-22', label: 'Finaller', colorClass: 'sevval-final', person:'Şevval'},
  {start: '2026-04-13', end: '2026-04-18', label: 'Vize Bahar', colorClass: 'sevval-vize', person:'Şevval'},
  {start: '2026-06-15', end: '2026-06-25', label: 'Final Haftası', colorClass: 'sevval-final', person:'Şevval'},
];

// Kesişen tarihlerin mor rengi
const intersectionColorClass = 'ortak';

// Doğum günleri ( özel ikonlu )
const birthdays = [
  '2026-07-03',
  '2025-12-27',
  '2026-01-04',
  '2025-05-29', // anneler günü ekledik
  '2026-03-08', // anneler günü ekledik
];

// Tarih stringini Date objesine çevir
function parseDate(str) {
  const [y,m,d] = str.split('-').map(Number);
  return new Date(y,m-1,d);
}

// Tarih aralığında mı kontrolü
function isInRange(date, startStr, endStr) {
  const start = parseDate(startStr);
  const end = parseDate(endStr);
  return date >= start && date <= end;
}

// Günün tarihi (şimdiki gün)
const today = new Date();

// Şu anki takvimde gösterilen ay ve yıl
let currentYear = startYear;
let currentMonth = startMonth;

// Haftanın günleri başlıklarını oluştur
function drawDayNames() {
  dayNamesContainer.innerHTML = '';
  dayNames.forEach(d => {
    const div = document.createElement('div');
    div.textContent = d;
    dayNamesContainer.appendChild(div);
  });
}

// Takvimi çiz
function drawCalendar(year, month) {
  calendarDays.innerHTML = '';
  calendarTitle.textContent = new Date(year, month).toLocaleString('tr-TR', {month:'long', year:'numeric'});

  const firstDayOfMonth = new Date(year, month, 1);
  const startWeekday = (firstDayOfMonth.getDay() + 6) % 7; // Pzt=0 için shift

  const daysInMonth = new Date(year, month+1, 0).getDate();

  // Önce boş kutucuklar (ilk hafta için)
  for(let i=0; i < startWeekday; i++){
    const emptyCell = document.createElement('div');
    calendarDays.appendChild(emptyCell);
  }

  // Günleri çiz
  for(let day=1; day<=daysInMonth; day++){
    const dateStr = `${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
    const dateObj = new Date(year, month, day);

    const dayCell = document.createElement('div');
    dayCell.textContent = day;
    dayCell.title = dateStr;

    // Bugün ise özel sınıf
    if (dateObj.toDateString() === today.toDateString()) {
      dayCell.classList.add('today');
    }

    // Özel tarihler için renk ve label ekle
    let colorClass = null;
    let labels = [];

    specialDates.forEach(event => {
      if (isInRange(dateObj, event.start, event.end)) {
        labels.push(event.label);
        // Eğer daha önce eklenmişse kesişen tarih olabilir
        if (colorClass && colorClass !== event.colorClass) {
          colorClass = intersectionColorClass;
        } else if (!colorClass) {
          colorClass = event.colorClass;
        }
      }
    });

    if (colorClass) {
      dayCell.classList.add('special-day');
      dayCell.classList.add(colorClass);
      dayCell.setAttribute('data-label', labels.join(', '));
    }

    // Doğum günü işaretle
    if (birthdays.includes(dateStr)) {
      dayCell.classList.add('dogumgunu');
      let oldLabel = dayCell.getAttribute('data-label') || '';
      dayCell.setAttribute('data-label', (oldLabel ? oldLabel + ', ' : '') + 'Doğum Günü');
    }

    calendarDays.appendChild(dayCell);
  }
}

// Ay değiştir
function changeMonth(offset) {
  let newMonth = currentMonth + offset;
  let newYear = currentYear;

  if (newMonth > 11) {
    newMonth = 0;
    newYear++;
  }
  if (newMonth < 0) {
    newMonth = 11;
    newYear--;
  }

  // Aralık 2026 dışına çıkma
  if (newYear > endYear || (newYear === endYear && newMonth > endMonth)) return;
  if (newYear < startYear || (newYear === startYear && newMonth < startMonth)) return;

  currentMonth = newMonth;
  currentYear = newYear;
  drawCalendar(currentYear, currentMonth);
}

// Başlangıçta yükle
drawDayNames();
drawCalendar(currentYear, currentMonth);

// Butonlara event ata
prevMonthBtn.addEventListener('click', () => changeMonth(-1));
nextMonthBtn.addEventListener('click', () => changeMonth(1));


// --- Uzaktan Ne Yapabiliriz Listesi ---

const alphabetList = [
  { letter: 'A', text: 'Art exchange: Birbirinize çizimler veya dijital sanatlar gönderin.' },
  { letter: 'B', text: 'Book club: Aynı kitabı okuyup tartışın.' },
  { letter: 'C', text: 'Chess Date: Sonucu belli bir satranç maçı yapalım sevgilim.' },
  { letter: 'D', text: 'Deep questions: Anlamlı sorularla birbirinizi daha iyi tanıyın.' },
  { letter: 'E', text: 'Emoji story: Sadece emoji kullanarak hikaye anlatın ve tahmin edin.' },
  { letter: 'F', text: 'Film night: Aynı filmi eş zamanlı izleyin.' },
  { letter: 'G', text: 'GeoGuessr: Online dünya haritasında yer tahmini oyunu oynayın.' },
  { letter: 'H', text: 'Handwritten letters: El yazısı mektuplar gönderin.' },
  { letter: 'I', text: 'Inside jokes: Kendi aranızda özel espriler yapın.' },
  { letter: 'J', text: 'Journaling: Ortak günlük tutup duygularınızı yazın.' },
  { letter: 'K', text: 'Karaoke: Online karaoke yapıp şarkı söyleyin.' },
  { letter: 'L', text: 'Learn together: Yeni bir şey öğrenin (dil, hobi vb.).' },
  { letter: 'M', text: 'Make a mixtape: Birbiriniz için özel çalma listeleri hazırlayın.' },
  { letter: 'N', text: 'Night sky: Yıldızları izleyip fotoğraf paylaşın.' },
  { letter: 'O', text: 'Origami: Birlikte origami yapın ve sonucu gösterin.' },
  { letter: 'P', text: 'Playlist swap: Favori şarkılarınızı değiş tokuş edin.' },
  { letter: 'Q', text: 'Quizzes: Eğlenceli testler yapıp sonuçları karşılaştırın.' },
  { letter: 'R', text: 'Random acts of kindness: Küçük sürprizler yapın, hediyeler gönderin.' },
  { letter: 'S', text: 'Stargazing: Sanal olarak birlikte yıldızları inceleyin.' },
  { letter: 'T', text: 'Tarot card reading: Birbirinize tarot falı bakın.' },
  { letter: 'U', text: 'Online Uno date: İnternetten Uno veya başka kart oyunları oynayın.' },
  { letter: 'V', text: 'Virtual tours: Sanal müzeler veya şehir turları yapın.' },
  { letter: 'W', text: 'Workout: Beraber online egzersiz yapın.' },
  { letter: 'X', text: 'XOXO letters: Sevgili dolu mesajlar, resimler paylaşın.' },
  { letter: 'Y', text: 'YouTube binge: Aynı anda YouTube videoları izleyin.' },
  { letter: 'Z', text: 'Zen time: Birlikte meditasyon veya rahatlama yapın.' },
];

const alphabetListEl = document.getElementById('alphabet-list');
alphabetList.forEach(item => {
  const li = document.createElement('li');
  li.innerHTML = `<strong>${item.letter}</strong> – ${item.text}`;
  alphabetListEl.appendChild(li);
});


// --- BU HAFTA NE YAPIYORUZ ---

const plannerContainer = document.getElementById('planner-container');

const places = {
  Ankara: ['Ayaş', 'Anıtkabir', '7. Cadde', 'Kuğulu Park', 'Gençlik Parkı', 'Bahçelievler', 'Mogan', 'ESAT Mahallesi'],
  İstanbul: ['Vapur', 'Pierre Loti', 'Maçka Parkı', 'Eyüpsultan', 'Balat', 'Kadıköy turu', 'Yıldız Teknik Beşiktaş Kampüsü', 'Beylerbeyi Sarayı', 'Yıldız Sarayı', 'Galata Kulesi', 'Yerebatan Sarnıcı'],
  Eskişehir: ['Barlar Sokağı', 'Karnaval', 'VR', 'Pamukşekerli Türk Kahvecisi'],
  'Kim Bilir?': []
};

const insideOptions = ['AVM', 'Sinema', 'Tiyatro', 'Sergi', 'Müze', 'Kutu Oyunları', 'Hobi Atölyeleri', 'Cafe', 'Sürekli Dizi Maratonu'];
const outsideOptions = ['Piknik'];

const commonOptions = ['Piknik', 'Voleybol', 'Badminton', 'Yürüyüş Rotası', 'Kamp', 'Konser', 'Fotoğraf Çekme Buluşması'];

function createButton(text, onClick) {
  const btn = document.createElement('button');
  btn.className = 'btn';
  btn.textContent = text;
  btn.addEventListener('click', onClick);
  return btn;
}

function clearContainer(container) {
  container.innerHTML = '';
}

function showResults(text) {
  clearContainer(plannerContainer);
  const p = document.createElement('p');
  p.textContent = text;
  p.className = 'result-text';
  plannerContainer.appendChild(p);
}

function askStep1() {
  clearContainer(plannerContainer);
  const question = document.createElement('h3');
  question.textContent = 'Nerede Buluşalım?';
  plannerContainer.appendChild(question);

  Object.keys(places).forEach(city => {
    const btn = createButton(city, () => {
      askStep2(city);
    });
    plannerContainer.appendChild(btn);
  });
}

function askStep2(city) {
  clearContainer(plannerContainer);
  const question = document.createElement('h3');
  question.textContent = 'Nasıl bir buluşma olsun?';
  plannerContainer.appendChild(question);

  const insideBtn = createButton('İç Mekan', () => askInside(city));
  const outsideBtn = createButton('Dış Mekan', () => askOutside(city));

  plannerContainer.appendChild(insideBtn);
  plannerContainer.appendChild(outsideBtn);
}

function askInside(city) {
  clearContainer(plannerContainer);
  const question = document.createElement('h3');
  question.textContent = 'İç Mekan seçenekleri:';
  plannerContainer.appendChild(question);

  insideOptions.forEach(option => {
    const btn = createButton(option, () => {
      showResults(`İç Mekan buluşma: ${option} (${city})`);
    });
    plannerContainer.appendChild(btn);
  });
  appendCommonOptions();
}

function askOutside(city) {
  clearContainer(plannerContainer);
  const question = document.createElement('h3');
  question.textContent = 'Dış Mekan seçenekleri:';
  plannerContainer.appendChild(question);

  // Özel şehir dış mekan seçenekleri
  if (places[city].length > 0) {
    places[city].forEach(place => {
      const btn = createButton(place, () => {
        showResults(`Dış Mekan buluşma: ${place} (${city})`);
      });
      plannerContainer.appendChild(btn);
    });
  } else {
    showResults(`Dış Mekan buluşma: ${city}`);
  }
  appendCommonOptions();
}

function appendCommonOptions() {
  const commonDiv = document.createElement('div');
  commonDiv.style.marginTop = '16px';

  const commonTitle = document.createElement('h4');
  commonTitle.textContent = 'Ortak seçenekler:';
  commonDiv.appendChild(commonTitle);

  commonOptions.forEach(option => {
    const btn = createButton(option, () => {
      showResults(`Ortak seçenek: ${option}`);
    });
    commonDiv.appendChild(btn);
  });

  plannerContainer.appendChild(commonDiv);
}

// Başlat
askStep1();


// --- NE YESEK ---

const foodContainer = document.getElementById('food-container');

const foodOptions = {
  'Fast Food': ['Pizza', 'Makarna', 'Hamburger', 'Döner', 'Çiğköfte'],
  'Sıcak Yemek': ['Green Salads', 'Tavuk Dünyası', 'Çorbacı', 'Masum bir Aspava', 'Bizim Lokanta'],
};

const pizzaPlaces = ['Pizzabuls', 'Dominos (Sarımsak Kenar)', 'Pasaport', 'MİGROS', 'Pizza2Go'];
const hamburgerPlaces = [
  'Burger King',
  'McDonald’s',
  // İstanbul özel hamburger seçenekleri
  { name: 'BurgerYiyelim', city: 'İstanbul' },
  { name: 'Dali', city: 'İstanbul' },
  { name: 'SaltFried Chicken', city: 'İstanbul' },
  { name: 'Betro Burger', city: 'İstanbul' },
];

function createFoodButton(text, onClick) {
  const btn = document.createElement('button');
  btn.className = 'btn';
  btn.textContent = text;
  btn.addEventListener('click', onClick);
  return btn;
}

function clearFoodContainer() {
  foodContainer.innerHTML = '';
}

function showFoodResult(text) {
  clearFoodContainer();
  const p = document.createElement('p');
  p.className = 'result-text';
  p.textContent = text;
  foodContainer.appendChild(p);
}

function askFoodType() {
  clearFoodContainer();
  const question = document.createElement('h3');
  question.textContent = 'Ne yemek istersin?';
  foodContainer.appendChild(question);

  Object.keys(foodOptions).forEach(type => {
    const btn = createFoodButton(type, () => {
      askFoodChoice(type);
    });
    foodContainer.appendChild(btn);
  });
}

function askFoodChoice(type) {
  clearFoodContainer();
  const question = document.createElement('h3');
  question.textContent = `${type} seçenekleri:`;
  foodContainer.appendChild(question);

  foodOptions[type].forEach(choice => {
    if (choice === 'Pizza') {
      const btn = createFoodButton('Pizza', () => showPizzaPlaces());
      foodContainer.appendChild(btn);
    } else if (choice === 'Hamburger') {
      const btn = createFoodButton('Hamburger', () => showHamburgerPlaces());
      foodContainer.appendChild(btn);
    } else if (choice === 'Çiğköfte') {
      const btn = createFoodButton('Çiğköfte', () => showFoodResult('Çiğköfteci Ömer Usta - Cevizlibağ'));
      foodContainer.appendChild(btn);
    } else if (choice === 'Döner') {
      const btn = createFoodButton('Döner', () => showFoodResult('Öncü Döner'));
      foodContainer.appendChild(btn);
    } else {
      const btn = createFoodButton(choice, () => showFoodResult(choice));
      foodContainer.appendChild(btn);
    }
  });
}

function showPizzaPlaces() {
  clearFoodContainer();
  const title = document.createElement('h3');
  title.textContent = 'Pizza Mekanları:';
  foodContainer.appendChild(title);

  pizzaPlaces.forEach(place => {
    const btn = createFoodButton(place, () => showFoodResult(place));
    foodContainer.appendChild(btn);
  });
}

function showHamburgerPlaces() {
  clearFoodContainer();
  const title = document.createElement('h3');
  title.textContent = 'Hamburger Mekanları:';
  foodContainer.appendChild(title);

  hamburgerPlaces.forEach(place => {
    if (typeof place === 'string') {
      const btn = createFoodButton(place, () => showFoodResult(place));
      foodContainer.appendChild(btn);
    } else {
      // Şehir bazlı seçenekler
      const userCity = document.querySelector('#planner-container h3')?.textContent.includes('İstanbul') ? 'İstanbul' : '';
      if (userCity === place.city) {
        const btn = createFoodButton(place.name, () => showFoodResult(place.name));
        foodContainer.appendChild(btn);
      }
    }
  });
}

// Başlat
askFoodType();


// --- Menüler arası geçişler ---

const menuButtons = document.querySelectorAll('nav button[data-section]');
const sections = document.querySelectorAll('section');

menuButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.getAttribute('data-section');

    sections.forEach(sec => {
      if (sec.id === target) {
        sec.style.display = 'block';
      } else {
        sec.style.display = 'none';
      }
    });

    // Scroll to ilgili bölüm varsa
    if (target === 'bu-hafta') {
      document.getElementById('planner-container').scrollIntoView({behavior: 'smooth'});
    }
    if (target === 'ne-yesek') {
      document.getElementById('food-container').scrollIntoView({behavior: 'smooth'});
    }
  });
});

