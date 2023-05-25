import "../photos/Attack.jpg";
export function Button({ onClick, value }) {
  return (
    <button className={"regularButton"} onClick={onClick}>
      {value}
    </button>
  );
}

const enterWord = (
  <div>
    <h1>Вітаю!</h1>
    Дякую, що вирішили скористатися послугами моєї програми. Наразі мій проект знаходиться в режимі
    бета-тесту, тому контент буде оновлюватись періодично.
  </div>
);
const aboutFirstPage = (
  <div>
    За допомогою цієї програми ви зможете швидко та легко складати плани на волейбольні поєдинки.
    Незалежно від вашого досвіду та рівня гри, програма допоможе вам організувати стратегію для
    вашої команди. Ви зможете обрати склад з існуючих колективів ПВЛУ, обрати стартовий розташунок
    гравців на майданчику та підкрутити його під свої потреби.
    <img alt="" className="aboutFirstPage" />
  </div>
);
const attackAndService = (
  <div>
    Крім того, програма надасть вам можливість візуалізувати свої плани за допомогою зрозумілого
    графічного інтерфейсу. Відобразити візуально напрямок атак та подач в процентному співвідношенні
    з кожної зони та по кожній позиції усіх гравців ПВЛУ.
    <img alt="" className="aboutAttack" />
  </div>
);
const distribution = (
  <div>
    Також ви зможете відобразити "загрузку" зон пасуючого гравця, щоб максимально ефективно обрати
    стратегію своєї команди для гри на блоці та в захисті. А в майбутньому (наразі я працюю над
    цим), побачити, як буде поводити кожний пасуючий ПВЛУ в тій або іншій ситуації (процентне
    співвідношення передач в кожну зону при різних заказах).
    <img alt="" className="aboutDistr" />
  </div>
);
const ratings = (
  <div>
    Рейтинги гравців по позиціях до ваших послуг. При натисканні на заголовок кожної з категорій
    програма відсортує по рейтингу від першого до останнього та навпаки. А також рейтинги по
    командах в цілому.
    <img alt="" className="aboutRatings" />
  </div>
);
const personalInfo = (
  <div>
    І на додачу , персональна інформація по кожному гравцю з діаграмою ефективності в атаці і на
    подачі. На даний момент наявна інформація більше ніж на 100 гравців.
    <img alt="" className="aboutInfo" />
  </div>
);
const awarness = (
  <div>
    Повний функціонал програми ви зможете отримати лише за умови простої та безкоштовної регестрації
    через Google або Facebook.
    <img alt="" className="awarness" />
  </div>
);
const lastWord = (
  <div>
    Моя програма є простою та інтуїтивно зрозумілою у використанні, щоб ви могли сконцентруватися на
    головному - розробці ефективної стратегії для вашого колективу. Я завжди відкритий до отримання
    вашого фідбеку та пропозицій щодо поліпшення функціоналу. Бажаю вам успіхів та вдалого складання
    планів для вашої команди! З найкращими побажаннями, Пилип Гармаш.
    <div>
      <img alt="" className="lastWord" />
    </div>
  </div>
);

const enterWordEng = (
  <div>
    <h1>Welcome!</h1>
    Thank you for choosing to use my program. Currently, my project is in beta testing mode, so the
    content will be periodically updated.
  </div>
);
const aboutFirstPageEng = (
  <div>
    With this program, you will be able to quickly and easily create plans for volleyball matches.
    Regardless of your experience and skill level, the program will help you organize a strategy for
    your team. You will be able to select lineups from existing PVLU teams, choose the starting
    positions of players on the court, and adjust it to fit your needs.
    <img alt="" className="aboutFirstPage" />
  </div>
);
const attackAndServiceEng = (
  <div>
    Additionally, the program will provide you with the opportunity to visualize your plans through
    a user-friendly graphical interface. It will visually display the direction of attacks and
    serves in a percentage ratio from each zone and for each position of all active PVLU players.
    <img alt="" className="aboutAttack" />
  </div>
);
const distributionEng = (
  <div>
    You will also be able to visualize the "loading" of passing zones for the setter, in order to
    effectively choose your team's strategy for blocking and defense. And in the future (currently,
    I am working on it), you will be able to see how each PVLU setter performs in different
    situations, such as the percentage distribution of their sets to each zone for different
    requests.
    <img alt="" className="aboutDistr" />
  </div>
);
const ratingsEng = (
  <div>
    Player ratings by positions are at your service. By clicking on the header of each category, the
    program will sort the ratings from first to last and vice versa. Additionally, there are overall
    team ratings available.
    <img alt="" className="aboutRatings" />
  </div>
);
const personalInfoEng = (
  <div>
    And as an addition, there is personal information available for each player, including a diagram
    showing their efficiency in attack and serving. At the moment, information is available for more
    than 100 players.
    <img alt="" className="aboutInfo" />
  </div>
);
const awarnessEng = (
  <div>
    You can access the full functionality of the program only after a simple and free registration
    via Google or Facebook.
    <img alt="" className="awarness" />
  </div>
);
const lastWordEng = (
  <div>
    My program is designed to be simple and intuitive to use so that you can focus on the main task
    - developing an effective strategy for your team. I am always open to receiving your feedback
    and suggestions for improving the functionality. I wish you success and smooth planning for your
    team! Best regards, Pylyp Harmash.
    <div>
      <img alt="" className="lastWord" />
    </div>
  </div>
);
export const UKRTUTORIAL = [
  lastWord,
  awarness,
  personalInfo,
  ratings,
  distribution,
  attackAndService,
  aboutFirstPage,
  enterWord,
];
export const ENGTUTORIAL = [
  lastWordEng,
  awarnessEng,
  personalInfoEng,
  ratingsEng,
  distributionEng,
  attackAndServiceEng,
  aboutFirstPageEng,
  enterWordEng,
];
