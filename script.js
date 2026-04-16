// ------------------------------
// 1. Переключение темы
// ------------------------------
function setTheme(person) {
  const themeLink = document.getElementById("theme-style");

  switch (person) {
    case "Гюго":
      themeLink.href = "theme-gugo.css";
      break;
    case "Хелена":
      themeLink.href = "theme-helena.css";
      break;
    case "Елена":
      themeLink.href = "theme-elena.css";
      break;
    default:
      themeLink.href = "style.css";
  }
}

document.addEventListener("change", (e) => {
  if (e.target.name === "person") {
    setTheme(e.target.value);   // ← переключаем тему
    renderCalendar();           // ← перерисовываем календарь под фильтры
  }

  if (e.target.name === "type") {
    renderCalendar();           // типы событий влияют только на подсветку
  }
});


function getSelectedPerson() {
  return document.querySelector('input[name="person"]:checked').value;
}

function getSelectedTypes() {
  return [...document.querySelectorAll('input[name="type"]:checked')].map(el => el.value);
}

// ------------------------------
// 2. Хранилище событий
// ------------------------------
let events = JSON.parse(localStorage.getItem("events")) || [];

function saveEvents() {
  localStorage.setItem("events", JSON.stringify(events));
}

// ------------------------------
// Системные (базовые) события
// ------------------------------
const systemEvents = [
    //для всех олл
  {
    id: "sys-1",
    date: "2027-01-01",
    type: "праздник",
    title: "Новый год!",
    description: "Пора пересматривать все свои планы",
    person: "all",
    system: true
  },
  {
    id: "sys-2",
    date: "2027-03-08",
    type: "праздник",
    title: "Восьмое марта",
    description: "Цветочки, букеты... РИЧ ПИЧ",
    person: "all",
    system: true
  },

    {
    id: "sys-3",
    date: "2026-04-17",
    type: "день рождения",
    title: "ЭТО ТВОЙ ДЕНЬ",
    description: "Котенька, я тебя очень люблю. Да, пусть это будет записано и в твоём календаре, который типа ты ведёшь сама.",
    person: "all",
    system: true
    },

    {
    id: "sys-4",
    date: "2026-07-09",
    type: "день рождения",
    title: "День Джунгарика №1",
    description: "Да, я решила, что это общий праздник",
    person: "all",
    system: true
    },

    {
    id: "sys-34",
    date: "2026-12-02",
    type: "джунгарики",
    title: "Годовщина",
    description: "День второй первой встречи. День ЛВЖ и ГГ. День когда всё встало на свои места",
    person: "all",
    system: true
    },
  // Хелена
    {
    id: "sys-5",
    date: "2027-03-26",
    type: "когтевран",
    title: "День Актива",
    description: "День Актива - это дань уважения активистам прошлых лет, которые вложили в развитие факультета немало сил, а также день благодарности всем когтевранцам, кто продолжает их дело.",
    person: "Хелена",
    system: true
    },

    {
    id: "sys-6",
    date: "2026-06-12",
    type: "когтевран",
    title: "День Театра",
    description: "Когтевран театралами славится. И надо сказать, что не зря. Каждый год Театр Ровены радует своих зрителей новыми интересными постановками.",
    person: "Хелена",
    system: true
    },

        {
    id: "sys-7",
    date: "2026-07-23",
    type: "когтевран",
    title: "РПГ-турнир на приз Синей Башни",
    description: "Лето – пора отдыха. Поэтому для всех желающих обитателей Хогвартса Дамблдора Когтевран предлагает увлекательное (и каждый раз разное) путешествие по увлекательным мирам и локациям.",
    person: "Хелена",
    system: true
    },

    {
    id: "sys-8",
    date: "2026-09-15",
    type: "когтевран",
    title: "День LaFaette",
    description: "В этот день мы чествуем ребят в синих мантиях, отважно бороздящих просторы бескрайнего неба и защищающих цвета нашего факультета на полях квиддичных сражений. День, когда мы вспоминаем ветеранов сборной, приветствуем новичков, вспоминаем былые победы и грезим о новых.",
    person: "Хелена",
    system: true
    },

    {
    id: "sys-9",
    date: "2026-10-01",
    type: "когтевран",
    title: "День Фруктокога",
    description: "В этот день когтевранцы посещают фруктовый сад и собирают плоды своих растений, чтобы изготовить из них нечто особенное, чем можно угощать всех обитателей Хогвартса Дамблдора",
    person: "Хелена",
    system: true
    },

    {
    id: "sys-10",
    date: "2026-11-30",
    type: "когтевран",
    title: "День Когтеврана",
    description: "Наш день, орлы и орлицы. День, когда небо окрашивается в бронзово-синие цвета, а Синяя Башня гудит с утра до глубокой ночи. Это наш праздник, с Днем Рождения, Когтевран!",
    person: "Хелена", 
    system: true
    },

    {
    id: "sys-11",
    date: "2027-02-03",
    type: "праздник",
    title: "День Камина",
    description: "Тёплый, почти семейный праздник. Как приятно холодным зимним вечером собраться у факультетского камина вместе с деканом, попить горячего шоколада и сладкого эля, послушать истории и сказки друзей! Обязательный атрибут, эдакий «дресс-код», – шерстяные носки и клетчатый плед, и, конечно же, одна-две истории, которые будут положены в специальную Сказочную Копилку.",
    person: "Хелена",
    system: true
    },

    {
    id: "sys-12",
    date: "2027-03-09",
    type: "праздник",
    title: "ДРХД",
    description: "Именно в этот день появилась на просторах Интернета с виду обычная страничка, на самом деле в будущем объединившая множество тропинок судеб разных людей. В этот весенний день можно зажмуриться крепко-крепко и про себя сказать Школе: «Спасибо!». Спасибо за всё, что происходило с нами в стенах этого замка. Хогвартс услышит и тепло улыбнётся окошком тёмным вечером.",
    person: "Хелена",
    system: true
    },

    {
    id: "sys-13",
    date: "2027-04-07",
    type: "праздник",
    title: "День Слизерина",
    description: "За окном уже весна, преддверие цветения и пробуждения природы. В этот день холодные Подземелья наполняются звонким смехом, светлыми улыбками, всюду слышатся поздравления и туда-сюда снуют совы с открытками, а ученики могут смело отбросить пергамент и перья и вдволь наесться слизеринского зефиру и устроить бои слизеринскими подушками! Ребята, гордые тем, что они слизеринцы, собираются в Каминном Зале, все вместе, и проводят этот день в своей большой слизеринской семье.",
    person: "Хелена",
    system: true
    },

    {
    id: "sys-14",
    date: "2027-04-15",
    type: "праздник",
    title: "День Мадам Пинс",
    description: "Ну конечно же, вы не раз ее видели. Эту строгую тетю в очках с пучком, собранным на затылке. Это она, незабвенная, твердо уверена, что тишина должна быть в библиотеке, а если вы не разделяете ее воззрений, готова предать вас анафеме. В этот день в общей гостиной не будет шумно, потому что откуда ни возьмись повылезают они: последователи Пинс, и буду шикать на вас, что вы мешаете им спокойно наслаждаться чтением, тишиной и одиночеством в Общей Гостиной Хогвартса.",
    person: "Хелена",
    system: true
    },

    {
    id: "sys-15",
    date: "2026-04-30",
    type: "празник",
    title: "Великий Шаббаш",
    description: "Так же «Ночь Сожжения Директора».А вы не забыли о Вальпургиевой ночи? Мы вот, ученики, не забыли. Это же праздник ведьм и ведьмаков! Вперёд, в гостинку, к высокому ведьминскому костру! Соберёмся вокруг Сатаны… эээ… то есть, директора! А фантазия у учеников Хогвартса Дамблдора отличная. Потому в процессе импровизаций пошла традиция танцевать вокруг костра, в котором горит директор – так сказать, два в одном. А что ему, бессмертному и всемогущему, сделается? А так – детям радость.",
    person: "Хелена",
    system: true
    },

    {
    id: "sys-16",
    date: "2026-05-02",
    type: "праздник",
    title: "День Магической Победы",
    description: "День, когда наши отцы и матери выиграли Битву за Хогвартс, и Гарри Поттер одержал победу над Тёмным Лордом. К чему лишние слова и лишние слёзы по погибшим? Победа – вот она, огромная, пьянящая, а впереди – множество лет процветания. Просто скажем победителям: «Спасибо. За всё».",
    person: "Хелена",
    system: true
    },

    {
    id: "sys-17",
    date: "2026-05-31",
    type: "праздник",
    title: "День Пуффендуя",
    description: "Праздник самого солнечного факультета Хогвартса. Обычно ребятам дарят печенье в форме барсучков и солнышка, а в зверинце все обязательно угостят Большого Барсука каким-нибудь лакомством. Некоторые особо ленивые ученики угощают его даже несколько раз, чтоб тот послал им побольше трудолюбия. А ещё 31 мая – день солнца, когда лучи этой яркой звезды щекочут наши лица.",
    person: "Хелена",
    system: true
    },

    {
    id: "sys-18",
    date: "2026-06-01",
    type: "праздник",
    title: "День Домового Эльфа",
    description: "Да-да, это тот самый день, когда Люциус Малфой швырнул грязный (но оттого не менее священный и благостный) носок Гарри Поттера своему домовику Добби. Выяснилось, что даже носки Гарри Поттера творят чудеса – Добби поймал сию шерстяную вещицу, став первым свободным эльфом. Парадокс, но в этот день эльфы трудятся ещё больше, чем обычно, считая это отличным подарком. Заодно к празднику примазались и граждане учащиеся (и преподающие), с удовольствием наслаждаясь вкуснейшими блюдами, приготовленными счастливыми эльфами.",
    person: "Хелена",
    system: true
    },

    {
    id: "sys-19",
    date: "2026-07-15",
    type: "праздник",
    title: "День Траволога",
    description: "Профессиональный праздник всех, кто так или иначе связан с растениями. Издревле в этот день почему-то принято дарить травологу небольшой кочан капусты, перевязанный золотой лентой. Легенда гласит, что когда-то очень давно один траволог изобрёл капустосапиенса – капусту с мозгами… ээ… капусты, ибо умом сей гибрид не блистал. Но его хватило, чтобы сбежать с огорода-лаборатории. И всю жизнь траволог искал свою капусту, а она от него убегала. Считается, что в этот день поздравляющие сдают когда-то потерянный кочан обратно травологу.",
    person: "Хелена",
    system: true
    },

    {
    id: "sys-20",
    date: "2026-07-26",
    type: "праздник",
    title: "День Мракоборца",
    description: "Профессиональный праздник борцов с нечистью, нежитью и просто злыми дяденьками (и тётеньками). Увы, выходного им не полагается – зло не дремлет, потому чаще всего мракоборцы встречают этот праздник под кустом в засаде на упыря, или играя в догонялки с каким-то очередным тёмным волшебником. Но иногда всё же получается попраздновать в тёплой компании коллег. Обычно под мерное звяканье рюмок мракоборцы рассказывают ехидные байки, хвастаются трофеями и рассуждают о том, чем будут заниматься после ухода на пенсию. Если, конечно, до неё доживут – мракоборцы убеждённые реалисты.",
    person: "Хелена",
    system: true
    },

    {
    id: "sys-21",
    date: "2026-08-19",
    type: "праздник",
    title: "День Квиддичиста",
    description: "День каждого, кто любит и ценит самую знаменитую игру магического мира – квиддич. Обычно в этот день игроки и болельщики устраивают пикник, и не абы где, а именно на квиддичном поле, и не на земле, а в небе. Вы даже не представляете, как весело перед тем, как съесть еду, сначала её поймать! Ловцы гоняются за увёртливыми конфетами в ярких обёртках, охотники деловито ловят вишнёвый пирог, защитники спасают народ от огромных тыкв Хагрида, попутно поедая пряники, а вратари умиротворённо приделывают к кольцам сети, надеясь таким образом поймать пролетающую мимо вскусняшку. А потом все дружно отправляются в раздевалку – травить байки и пить касторку (по привычке – в квиддичном БК только ею и поят, так сказать, национальный напиток).",
    person: "Хелена",
    system: true
    },

    {
    id: "sys-22",
    date: "2026-09-01",
    type: "праздник",
    title: "День Распределяющей Шляпы",
    description: "А так же день знаний и ПОшек. Старая мудрая Шляпа профессионально разберётся в ваших запутанных мыслях, желаниях и мечтах, и обязательно отправит вас на правильный факультет. Так почему же не отблагодарить её шариком нафталина, добрым словом или просто счастливой улыбкой уже ученика Хогвартса Дамблдора? Поздравим Шляпу с её профессиональным праздником!",
    person: "Хелена",
    system: true
    },

    {
    id: "sys-23",
    date: "2026-10-05",
    type: "праздник",
    title: "День Профессора",
    description: "Профессиональный праздник работников сферы магического образования.",
    person: "Хелена",
    system: true
    },

    {
    id: "sys-24",
    date: "2026-09-04",
    type: "праздник",
    title: "Мандрагоровый Спас",
    description: "История этого праздника идет с тех незапамятных времен, когда безгрешные души участвовали в священном ритуале пересадки еще более священных растений, во славу всех богов. С тех пор четвертый день осени все волшебники запасаются магическими ингредиентами, консервированными помидорчиками и обмениваются открытками с добрыми пожеланиями через совиную почту.",
    person: "Хелена",
    system: true
    },

    {
    id: "sys-25",
    date: "2026-10-10",
    type: "когтевран",
    title: "День Гриффиндор",
    description: "Красно-золотая осень, красно-золотые листья на деревьях, праздник ребят, носящих красно-золотые шарфы и гордо говорящие: «Мы – гриффиндорцы!». Традиционно в этот день ребята дарят друг другу букетики из сухих кленовых или любых других листьев – неважно! – главное, чтобы листья были яркими и праздничными. А камин к вечеру пестрел украшениями – бусинки, фенечки, мишура и ленты – сгодится всё! Главное, чтобы от души.",
    person: "Хелена",
    system: true
    },

    {
    id: "sys-26",
    date: "2026-11-11",
    type: "праздник",
    title: "Магический Субботник",
    description: "Или «День Торжества Филча», как называют этот праздник ученики. В этот день все учащиеся с немного удручённым видом отправляются на каторжные работы уборку Школы и её территорий под бдительным контролем Филча. Статистика показывает, что именно в этот день происходят регулярные вспышки гриппа, простуды, головной, зубной и желудочной боли, и всех других симптомов из «Большой Энциклопедии Болезней».",
    person: "Хелена",
    system: true
    },

    {
    id: "sys-27",
    date: "2026-12-01",
    type: "праздник",
    title: "Первый День Зимы",
    description: "АДВЕНТ-КАЛЕНДАРЬ ААААА. День, в который ну обязательно должен пойти снег, чтобы можно было играть в снежки с утра до вечера, как следует отморозить нос, а потом отогреваться, закутавшись в тёплое одеяло и попивая что-нибудь горячее. А ещё можно попытаться найти свою снежинку-талисман – такая снежинка не растает до самого конца зимы, всегда будет рядом оберегом – в шарфе, на шапке, или в варежке.",
    person: "Хелена",
    system: true
    },

    {
    id: "sys-28",
    date: "2026-12-06",
    type: "праздник",
    title: "День Волшебника",
    description: "Есть праздник в честь прекрасных дам, почему бы не назначить день в честь не менее прекрасных кавалеров? Это, конечно, с какой стороны посмотреть… Но не будем о плохом. Давайте просто скажем нашим любимым волшебникам, друзьям, отцам и братьям: «Спасибо за то, что ты есть!» И в отместку подарим им пушистенькую розовую подушечку – я недавно таааакую красивую видела, ну полный кавай!.",
    person: "Хелена",
    system: true
    },

    {
    id: "sys-29",
    date: "2027-02-09",
    type: "день рождения",
    title: "Блейк Эллингтон",
    description: "",
    person: "Хелена",
    system: true
    },

    {
    id: "sys-30",
    date: "2026-07-09",
    type: "день рождения",
    title: "Жужу",
    description: "Да, несколько раз могу себе позволить",
    person: "Хелена",
    system: true
    },
  //Гюго

    {
    id: "sys-31",
    date: "2027-04-07",
    type: "праздник",
    title: "День Слизерина",
    description: "",
    person: "Гюго",
    system: true
    },

    {
    id: "sys-44",
    date: "2026-07-09",
    type: "день рождения",
    title: "Грейсичка ДдК",
    description: "Да, ещё раз!",
    person: "Гюго",
    system: true
    },

    {
    id: "sys-32",
    date: "2026-05-03",
    type: "день рождения",
    title: "Яхья Фатхи",
    description: "",
    person: "Гюго",
    system: true
    },

    {
    id: "sys-33",
    date: "2026-07-23",
    type: "день рождения",
    title: "Шелия МакБрайд",
    description: "",
    person: "Гюго",
    system: true
    },

    {
    id: "sys-43",
    date: "2027-02-07",
    type: "день рождения",
    title: "Даррен Кейн",
    description: "",
    person: "Гюго",
    system: true
    },

    {
    id: "sys-42",
    date: "2027-02-07",
    type: "день рождения",
    title: "Томас Даша Брук",
    description: "",
    person: "Гюго",
    system: true
    },

    {
    id: "sys-35",
    date: "2027-02-10",
    type: "джунгарики",
    title: "Годовщина свадьбы",
    description: "Дарр и Гюго. Гюго и Дарр. Муруруру",
    person: "Гюго",
    system: true
    },
  //Елена

    {
    id: "sys-36",
    date: "2027-02-10",
    type: "день рождения",
    title: "Кира",
    description: "",
    person: "Елена",
    system: true
    },

    {
    id: "sys-37",
    date: "2027-04-03",
    type: "день рождения",
    title: "Вадим (папа)",
    description: "",
    person: "Елена",
    system: true
    },

    {
    id: "sys-38",
    date: "2027-04-03",
    type: "день рождения",
    title: "Таня",
    description: "",
    person: "Елена",
    system: true
    },

    {
    id: "sys-39",
    date: "2027-02-01",
    type: "день рождения",
    title: "Людмила (мама)",
    description: "",
    person: "Елена",
    system: true
    },

    {
    id: "sys-40",
    date: "2026-07-03",
    type: "день рождения",
    title: "Ольга",
    description: "",
    person: "Елена",
    system: true
    },

    {
    id: "sys-41",
    date: "2026-11-04",
    type: "день рождения",
    title: "Юра",
    description: "",
    person: "Елена",
    system: true
    },
];

function getAllEvents() {
  return [...systemEvents, ...events];
}


// ------------------------------
// 3. Цвета и приоритеты
// ------------------------------
const eventColors = {
  "мероприятие": "#c022ec",
  "праздник": "#f14ea2",
  "день рождения": "#10a580",
  "личное": "#69dbc8",
  "джунгарики": "#ff9aff",
  "когтевран": "#514bff"
};

const eventPriority = [
  "мероприятие",
  "праздник",
  "день рождения",
  "личное",
  "джунгарики",
  "когтевран"
];

function getDayColor(eventsForDay) {
  if (eventsForDay.length === 0) return null;

  eventsForDay.sort((a, b) =>
    eventPriority.indexOf(a.type) - eventPriority.indexOf(b.type)
  );

  return eventColors[eventsForDay[0].type];
}

function filterEventsForCalendar(dateStr) {
  const person = getSelectedPerson();
  const types = getSelectedTypes();

 return getAllEvents().filter(e =>
    e.date === dateStr &&
    (person === "all" || e.person === person) &&
    types.includes(e.type)
  );
}

// ------------------------------
// 4. Генерация календаря
// ------------------------------
const calendarContainer = document.getElementById("calendar-container");
const year = 2026;

const monthNames = [
  "Январь", "Февраль", "Март", "Апрель",
  "Май", "Июнь", "Июль", "Август",
  "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
];

function renderCalendar() {
  calendarContainer.innerHTML = "";

  const startYear = 2026;
  const endYear = 2027;

  for (let yearIter = startYear; yearIter <= endYear; yearIter++) {
    // если 2026 → начинаем с апреля (3)
    // если 2027 → заканчиваем апрелем (3)
    const startMonth = (yearIter === startYear) ? 3 : 0;
    const endMonth = (yearIter === endYear) ? 3 : 11;

    for (let month = startMonth; month <= endMonth; month++) {

      const monthBlock = document.createElement("div");
      monthBlock.className = "month";

      const title = document.createElement("h3");
      title.className = "month-title";
      title.textContent = `${monthNames[month]} ${yearIter}`;
      monthBlock.appendChild(title);

      const grid = document.createElement("div");
      grid.className = "month-grid";

      const weekdays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
      weekdays.forEach(d => {
        const wd = document.createElement("div");
        wd.className = "weekday";
        wd.textContent = d;
        grid.appendChild(wd);
      });

      let shift;

       // если это апрель 2026 — считаем сдвиг от 17 апреля
       if (yearIter === 2026 && month === 3) {
         const realStart = new Date(2026, 3, 17).getDay(); // 17 апреля
         shift = realStart === 0 ? 6 : realStart - 1;
       } else {
       // обычный месяц
          const firstDay = new Date(yearIter, month, 1).getDay();
          shift = firstDay === 0 ? 6 : firstDay - 1;
       }


      for (let i = 0; i < shift; i++) {
        const empty = document.createElement("div");
        empty.className = "empty";
        grid.appendChild(empty);
      }

      const daysInMonth = new Date(yearIter, month + 1, 0).getDate();

      // --- ВАЖНО: обрезаем первый и последний месяц ---
      let startDay = 1;
      let endDay = daysInMonth;

      // апрель 2026 → с 17 числа
      if (yearIter === 2026 && month === 3) {
        startDay = 17;
      }

      // апрель 2027 → до 16 числа
      if (yearIter === 2027 && month === 3) {
        endDay = 16;
      }

      for (let day = startDay; day <= endDay; day++) {
        const dayCell = document.createElement("div");
        dayCell.className = "day";
        dayCell.textContent = day;

        const dateStr = `${yearIter}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
        const dayEvents = filterEventsForCalendar(dateStr);
        const color = getDayColor(dayEvents);

        if (color) {
          dayCell.style.backgroundColor = color;
          dayCell.style.color = "#000";
          dayCell.style.fontWeight = "600";
        }

        dayCell.addEventListener("click", () => openModal(yearIter, month, day));

        grid.appendChild(dayCell);
      }

      monthBlock.appendChild(grid);
      calendarContainer.appendChild(monthBlock);
    }
  }
}

renderCalendar();

setTheme(getSelectedPerson());

// ------------------------------
// 5. Модальное окно
// ------------------------------
function openModal(year, month, day) {
  const modal = document.getElementById("event-modal");
  const title = document.getElementById("modal-date-title");
  const eventsList = document.getElementById("events-list");

  const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  modal.dataset.date = dateStr;

  title.textContent = `События на ${dateStr}`;

  const person = getSelectedPerson();
  const types = getSelectedTypes();

  const dayEvents = getAllEvents().filter(e =>
  e.date === dateStr &&
  (e.person === "all" || person === "all" || e.person === person) &&
  types.includes(e.type)
  );


  eventsList.innerHTML = dayEvents.length
    ? dayEvents.map(e => `
      <div class="event-item" style="--event-color:${eventColors[e.type]}">
        <div class="event-item-title">${e.title}</div>
        
        ${e.description ? `
          <div class="event-item-description">${e.description}</div>
        ` : ""}

        ${e.system ? "" : `
        <button class="delete-event-btn" data-id="${e.id}">
        Удалить
        </button>
        `}

        </div>
    `).join("")
    : "<p>Нет событий</p>";

  modal.setAttribute("aria-hidden", "false");
}

document.getElementById("modal-close").addEventListener("click", () => {
  document.getElementById("event-modal").setAttribute("aria-hidden", "true");
});

// ------------------------------
// 6. Добавление события из модалки
// ------------------------------
document.getElementById("add-event-btn").addEventListener("click", () => {
  document.getElementById("modal-form-wrapper").classList.toggle("hidden");
});

document.getElementById("modal-event-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const date = document.getElementById("event-modal").dataset.date;

  const newEvent = {
    id: crypto.randomUUID(),
    date,
    person: document.getElementById("modal-person").value,
    type: document.getElementById("modal-type").value,
    title: document.getElementById("modal-title").value,
    description: document.getElementById("modal-description").value
  };

  events.push(newEvent);
  saveEvents();

  // обновляем календарь
  renderCalendar();

  // закрываем модалку
  document.getElementById("event-modal").setAttribute("aria-hidden", "true");

  // очищаем форму
  document.getElementById("modal-event-form").reset();
  document.getElementById("modal-form-wrapper").classList.add("hidden");
});



// ------------------------------
// 7. Кат-блок формы сверху
// ------------------------------


// ------------------------------
// 8. Рандомная картинка сверху
// ------------------------------

function setRandomHeaderImage() {
  const images = [
    "images/1.jpg",
    "images/2.jpg",
    "images/3.jpg",
    "images/4.jpg",
    "images/5.jpg",
    "images/6.jpg",
    "images/7.jpg",
    "images/8.jpg",
    "images/9.jpg",
    "images/10.jpg",
    "images/11.jpg",
    "images/12.jpg",
    "images/13.jpg",
    "images/14.jpg",
    "images/15.jpg",
    "images/16.jpg",
    "images/17.jpg",
    "images/18.jpg",
    "images/19.jpg",
    "images/20.jpg",
    "images/21.jpg",
    "images/22.jpg",
    "images/1.png",
    "images/2.png",
    "images/3.png",
    "images/4.png",
    "images/5.png",
    "images/6.png",
    "images/7.png",
    "images/8.png",
    "images/9.png",
    "images/10.png",
    "images/11.png",
    "images/12.png",
    "images/13.png",
    "images/14.png",
    "images/15.png",
    "images/16.png",
    "images/17.png",
    "images/cit1.jpg",
    "images/cit2.jpg",
    "images/cit3.jpg",
    "images/cit4.jpg",
    "images/cit5.jpg",
    "images/cit10.jpg",
    "images/cit13.jpg",
    "images/cit6.png",
    "images/cit7.png",
    "images/cit8.png",
    "images/cit9.png",
    "images/cit11.png",
    "images/cit12.png",
    "images/val1.jpg",
    "images/val2.jpg",
    "images/val3.jpg",
    "images/val4.jpg",
    "images/val5.jpg",
    "images/val6.jpg",
    "images/val7.jpg",
    "images/val8.jpg",
    "images/val9.jpg",
    "images/val10.jpg",
    "images/val11.jpg",
    "images/val12.jpg",
    "images/val13.jpg",
    "images/val14.jpg",
    "images/val15.jpg",
    "images/val16.jpg",
    "images/val17.jpg",
    "images/val18.jpg",
    "images/val19.jpg",
    "images/val20.jpg",
  ];

  const random = images[Math.floor(Math.random() * images.length)];
  document.getElementById("header-image").src = random;
}

setRandomHeaderImage();

// ------------------------------
// 9. Удаление события
// ------------------------------
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-event-btn")) {
    const id = e.target.dataset.id;

    // Удаляем событие
  events = events.filter(ev => ev.id !== id); // systemEvents не трогаем
    saveEvents();

    // Перерисовываем календарь
    renderCalendar();

    // Перерисовываем модалку
    const date = document.getElementById("event-modal").dataset.date;
  }
});
