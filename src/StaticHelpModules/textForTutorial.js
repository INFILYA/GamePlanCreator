export function Button({ onClick, value }) {
  return (
    <button className="regularButton" onClick={onClick}>
      {value}
    </button>
  );
}

const enterWord = (
  <>
    <div className="inner-text-wrapper">
      Дякую, що вирішили скористатися послугами моєї програми. Наразі мій проект знаходиться в
      режимі бета-тесту, тому контент буде оновлюватись періодично. На данний момент реальна база
      статистичних даних відсутня, але буде заповнюватися з початком сезону 2023-2024 ПВЛУ.
    </div>
    <div className="inner-image-wrapper">
      <img alt="" src="/photos/Harmash.jpg" />
    </div>
  </>
);
const aboutFirstPage = (
  <>
    <div className="inner-text-wrapper">
      За її допомогою ви зможете швидко та легко складати плани на поєдинки. Також вона допоможе вам
      організувати стратегію для вашої команди. Ви зможете обрати склад з існуючих колективів ПВЛУ,
      обрати стартовий розташунок гравців на майданчику та підкрутити його під свої потреби.
    </div>
    <div className="inner-image-wrapper">
      <img alt="" src="/photos/FirstPage.jpg" />
    </div>
  </>
);
const attackAndService = (
  <>
    <div className="inner-text-wrapper">
      Крім того, програма надасть вам можливість візуалізувати свої плани за допомогою зрозумілого
      графічного інтерфейсу. Відобразити візуально напрямок атак та подач в процентному
      співвідношенні з кожної зони та по кожній позиції усіх гравців ПВЛУ.
    </div>
    <div className="inner-image-wrapper">
      <img alt="" src="/photos/Attack.jpg" />
    </div>
  </>
);
const distribution = (
  <>
    <div className="inner-text-wrapper">
      Також ви зможете відобразити "загрузку" зон пасуючого гравця, щоб максимально ефективно обрати
      стратегію своєї команди для гри на блоці та в захисті. А в майбутньому (наразі я працюю над
      цим), побачити, як буде поводити кожний зв'язуючий ПВЛУ в тій або іншій ситуації.
    </div>
    <div className="inner-image-wrapper">
      <img alt="" src="/photos/Distribution.jpg" />
    </div>
  </>
);
const ratings = (
  <>
    <div className="inner-text-wrapper">
      Рейтинги гравців по позиціях до ваших послуг. При натисканні на заголовок кожної з категорій
      програма відсортує по рейтингу від першого до останнього та навпаки. А також рейтинги по
      командах в цілому.
    </div>
    <div className="inner-image-wrapper">
      <img alt="" src="/photos/Ratings.jpg" />
    </div>
  </>
);
const personalInfo = (
  <>
    <div className="inner-text-wrapper">
      І на додачу , персональна інформація по кожному гравцю з діаграмою ефективності в атаці і на
      подачі. На даний момент наявна інформація більше ніж на 100 гравців.
    </div>
    <div className="inner-image-wrapper">
      <img alt="" src="/photos/PersonalInfo.jpg" />
    </div>
  </>
);
const awarness = (
  <>
    <div className="inner-text-wrapper">
      Повний функціонал програми ви зможете отримати лише за умови простої та безкоштовної
      регестрації через Google , Facebook або @Email.
    </div>
    <div className="inner-image-wrapper">
      <img alt="" src="/photos/Registration.jpg" />
    </div>
  </>
);
const lastWord = (
  <>
    <div className="inner-text-wrapper">
      Моя програма є простою та зрозумілою для розробки ефективної стратегії вашого колективу. Я
      завжди відкритий до отримання вашого фідбеку та пропозицій щодо поліпшення функціоналу. Бажаю
      вам успіхів та вдалого складання планів для вашої команди! З найкращими побажаннями, Пилип
      Гармаш.
    </div>

    <div className="inner-image-wrapper">
      <img alt="" src="/photos/Harmash.jpg" />
    </div>
  </>
);

const enterWordEng = (
  <>
    <div className="inner-text-wrapper">
      Thank you for choosing to use my program. Currently, my project is in beta testing mode, so
      the content will be periodically updated. At the moment, there is no actual statistical
      database available. However, it will be populated starting from the 2023-2024 PVLU season.
    </div>
    <div className="inner-image-wrapper">
      <img alt="" src="/photos/Harmash.jpg" />
    </div>
  </>
);
const aboutFirstPageEng = (
  <>
    <div className="inner-text-wrapper">
      With her help, you will be able to quickly and easily create plans for volleyball matches.
      Also program going to help you organize a strategy for your team. You will be able to select
      lineups from existing PVLU teams, choose the starting positions of players on the court, and
      adjust it to fit your needs.
    </div>
    <div className="inner-image-wrapper">
      <img alt="" src="/photos/FirstPage.jpg" />
    </div>
  </>
);
const attackAndServiceEng = (
  <>
    <div className="inner-text-wrapper">
      Additionally, the program will provide you with the opportunity to visualize your plans
      through a user-friendly graphical interface. It will visually display the direction of attacks
      and serves in a percentage ratio from each zone and for each position of all active PVLU
      players.
    </div>
    <div className="inner-image-wrapper">
      <img alt="" src="/photos/Attack.jpg" />
    </div>
  </>
);
const distributionEng = (
  <>
    <div className="inner-text-wrapper">
      You will also be able to visualize the "loading" of passing zones for the setter, in order to
      effectively choose your team's strategy for blocking and defense. And in the future
      (currently, I am working on it), you will be able to see how each PVLU setter performs in
      different situations.
    </div>
    <div className="inner-image-wrapper">
      <img alt="" src="/photos/Distribution.jpg" />
    </div>
  </>
);
const ratingsEng = (
  <>
    <div className="inner-text-wrapper">
      Player ratings by positions are at your service. By clicking on the header of each category,
      the program will sort the ratings from first to last and vice versa. Additionally, there are
      overall team ratings available.
    </div>
    <div className="inner-image-wrapper">
      <img alt="" src="/photos/Ratings.jpg" />
    </div>
  </>
);
const personalInfoEng = (
  <>
    <div className="inner-text-wrapper">
      And as an addition, there is personal information available for each player, including a
      diagram showing their efficiency in attack and serving. At the moment, information is
      available for more than 100 players.
    </div>
    <div className="inner-image-wrapper">
      <img alt="" src="/photos/PersonalInfo.jpg" />
    </div>
  </>
);
const awarnessEng = (
  <>
    <div className="inner-text-wrapper">
      You can access the full functionality of the program only after a simple and free registration
      via Google , Facebook or @Email.
    </div>
    <div className="inner-image-wrapper">
      <img alt="" src="/photos/Registration.jpg" />
    </div>
  </>
);
const lastWordEng = (
  <>
    <div className="inner-text-wrapper">
      My program is designed to be simple and intuitive to use so that you can focus on the main
      task - developing an effective strategy for your team. I am always open to receiving your
      feedback and suggestions for improving the functionality. I wish you success and smooth
      planning for your team! Best regards, Pylyp Harmash.
    </div>
    <div className="inner-image-wrapper">
      <img alt="" src="/photos/Harmash.jpg" />
    </div>
  </>
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
