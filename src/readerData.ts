export interface ReaderComprehensionQuestion {
  q: string;
  opts: string[];
  ans: number;
  exp: string;
}

export interface ReaderSentence {
  uk: string;
  en: string;
}

export interface ReaderGlossaryEntry {
  surface: string;
  lemma: string;
  pos: string;
  en: string;
  note: string;
}

export interface ReaderPassage {
  id: string;
  level: 'A0' | 'A1' | 'A2' | 'B1' | 'B2–C1';
  titleUk: string;
  titleEn: string;
  genre: string;
  summaryEn: string;
  sentences: ReaderSentence[];
  glossary: Record<string, ReaderGlossaryEntry>;
  questions: ReaderComprehensionQuestion[];
}

import { EXTRA_READER_PASSAGES } from './readerExtraData.ts';

const BASE_READER_PASSAGES: ReaderPassage[] = [
  {
    id: 'A0-cafe',
    level: 'A0',
    titleUk: 'Ра́нок і ка́ва в Ки́єві',
    titleEn: 'Morning and Coffee in Kyiv',
    genre: 'Pre-A1 Micro-Story • Everyday Greetings & Café',
    summaryEn:
      'A gentle first Ukrainian reading passage using high-frequency words, clear vowels, and simple sentences.',
    sentences: [
      {
        uk: 'Приві́т! Мене́ зва́ти Оле́на, і я з Украї́ни.',
        en: 'Hello! My name is Olena, and I am from Ukraine.',
      },
      {
        uk: 'Сього́дні те́плий ра́нок, і я тут у кав’я́рні.',
        en: 'Today is a warm morning, and I am here in a coffee shop.',
      },
      {
        uk: 'Ось мій стіл, гаря́ча ка́ва, молоко́ і сві́жий круаса́н.',
        en: 'Here are my table, hot coffee, milk, and a fresh croissant.',
      },
      {
        uk: 'По́руч сиди́ть мій друг Макси́м — він п’є зелений чай з лимо́ном.',
        en: 'Nearby sits my friend Maksym — he is drinking green tea with lemon.',
      },
    ],
    glossary: {
      привіт: { surface: 'Приві́т', lemma: 'приві́т', pos: 'interjection', en: 'hello / hi', note: 'Friendly informal greeting.' },
      мене: { surface: 'Мене́', lemma: 'я', pos: 'pronoun (Acc./Gen.)', en: 'me', note: 'Used in "Мене́ зва́ти..." (My name is / They call me...).' },
      звати: { surface: 'зва́ти', lemma: 'зва́ти', pos: 'verb (infinitive)', en: 'to call', note: '"Мене́ зва́ти Оле́на" = My name is Olena.' },
      україни: { surface: 'Украї́ни', lemma: 'Украї́на', pos: 'noun (Gen. sg.)', en: 'from Ukraine', note: 'Genitive case after the preposition "з" (from).' },
      сьогодні: { surface: 'Сього́дні', lemma: 'сього́дні', pos: 'adverb', en: 'today', note: 'Pronounced [sʲo-HOD-ni] with soft "сьо".' },
      теплий: { surface: 'те́плий', lemma: 'те́плий', pos: 'adjective (masc. Nom.)', en: 'warm', note: 'Modifies masculine noun "ра́нок" (morning).' },
      ранок: { surface: 'ра́нок', lemma: 'ра́нок', pos: 'noun (masc. Nom.)', en: 'morning', note: 'Has a fleeting "о" in other cases (ра́нку).' },
      "кав’ярні": { surface: 'кав’я́рні', lemma: 'кав’я́рня', pos: 'noun (fem. Loc.)', en: 'in a coffee shop', note: 'Locative singular after "у" (in).' },
      "кав'ярні": { surface: 'кав’я́рні', lemma: 'кав’я́рня', pos: 'noun (fem. Loc.)', en: 'in a coffee shop', note: 'Locative singular after "у" (in).' },
      кава: { surface: 'ка́ва', lemma: 'ка́ва', pos: 'noun (fem. Nom.)', en: 'coffee', note: 'Feminine noun ending in -а.' },
      молоко: { surface: 'молоко́', lemma: 'молоко́', pos: 'noun (neut. Nom.)', en: 'milk', note: 'Neuter noun ending in -о; all "о" vowels stay clear.' },
      сидить: { surface: 'сиди́ть', lemma: 'сиді́ти', pos: 'verb (3rd sg.)', en: 'sits / is sitting', note: '2nd conjugation verb (він сиди́ть).' },
      "п’є": { surface: 'п’є', lemma: 'пи́ти', pos: 'verb (3rd sg.)', en: 'drinks / is drinking', note: 'Present tense of пи́ти (я п’ю, ти п’єш, він п’є).' },
      "п'є": { surface: 'п’є', lemma: 'пи́ти', pos: 'verb (3rd sg.)', en: 'drinks / is drinking', note: 'Present tense of пи́ти (я п’ю, ти п’єш, він п’є).' },
      лимоном: { surface: 'лимо́ном', lemma: 'лимо́н', pos: 'noun (masc. Ins.)', en: 'with lemon', note: 'Instrumental case after "з" (with).' },
    },
    questions: [
      {
        q: 'Where is Olena this morning?',
        opts: ['In a coffee shop (у кав’я́рні)', 'At the train station (на вокза́лі)', 'At home (удо́ма)'],
        ans: 0,
        exp: 'Olena says: "Сього́дні те́плий ра́нок, і я тут у кав’я́рні" (Today is a warm morning, and I am here in a coffee shop).',
      },
      {
        q: 'What is Maksym drinking?',
        opts: ['Coffee with milk', 'Green tea with lemon', 'Orange juice'],
        ans: 1,
        exp: 'The text states: "він п’є зелений чай з лимо́ном" (he is drinking green tea with lemon).',
      },
      {
        q: 'Why does "з лимо́ном" end in "-ом"?',
        opts: [
          'Because the preposition "з" (with) takes the Instrumental case.',
          'Because "лимо́н" is plural.',
          'Because it is in the past tense.',
        ],
        ans: 0,
        exp: 'After "з" meaning "together with", masculine nouns add "-ом": "лимо́н → з лимо́ном".',
      },
    ],
  },
  {
    id: 'A1-saturday',
    level: 'A1',
    titleUk: 'Субо́тній ра́нок у Льво́ві',
    titleEn: 'Saturday Morning in Lviv',
    genre: 'A1 Narrative • Weekend Routine & Market Visit',
    summaryEn:
      'Follow Taras and his sister Marta as they shop at a morning market in Lviv and cook lunch together.',
    sentences: [
      {
        uk: 'У субо́ту Тара́с і його́ сестра́ Ма́рта встаю́ть о во́сьмій годи́ні ра́нку.',
        en: 'On Saturday Taras and his sister Marta get up at eight o’clock in the morning.',
      },
      {
        uk: 'Вони́ йдуть пі́шки на старий ри́нок бі́ля пло́щі Ри́нок.',
        en: 'They walk on foot to the old market near Rynok Square.',
      },
      {
        uk: 'Там Ма́рта купу́є сві́жі о́вочі, зе́лень, сир і соло́дкі я́блука.',
        en: 'There Marta buys fresh vegetables, herbs, cheese, and sweet apples.',
      },
      {
        uk: 'Тара́с бере́ духмя́ний жи́тній хліб і баночку карпа́тського ме́ду.',
        en: 'Taras takes fragrant rye bread and a small jar of Carpathian honey.',
      },
      {
        uk: 'Удо́ма вони́ ра́зом готу́ють смачни́й украї́нський обі́д для всіє́ї роди́ни.',
        en: 'At home they cook a delicious Ukrainian lunch together for the whole family.',
      },
    ],
    glossary: {
      суботу: { surface: 'субо́ту', lemma: 'субо́та', pos: 'noun (fem. Acc.)', en: 'on Saturday', note: 'Days of the week after "у/в" take the Accusative case.' },
      встають: { surface: 'встаю́ть', lemma: 'встава́ти', pos: 'verb (3rd pl.)', en: 'get up', note: 'Present tense plural of встава́ти.' },
      йдуть: { surface: 'йдуть', lemma: 'іти́', pos: 'verb (3rd pl.)', en: 'walk / are going on foot', note: 'Unidirectional walking verb (вони́ йдуть).' },
      пішки: { surface: 'пі́шки', lemma: 'пі́шки', pos: 'adverb', en: 'on foot', note: 'Common adverb with ходи́ти / іти́.' },
      купує: { surface: 'купу́є', lemma: 'купува́ти', pos: 'verb (3rd sg.)', en: 'buys / is buying', note: 'Verbs in -увати replace -ува- with -у- in the present.' },
      овочі: { surface: 'о́вочі', lemma: 'о́вочі', pos: 'noun (Acc. pl.)', en: 'vegetables', note: 'Inanimate Accusative plural matches Nominative plural.' },
      яблука: { surface: 'я́блука', lemma: 'я́блуко', pos: 'noun (neut. Acc. pl.)', en: 'apples', note: 'Neuter nouns in -о take -а in the plural.' },
      хліб: { surface: 'хліб', lemma: 'хліб', pos: 'noun (masc. Acc.)', en: 'bread', note: 'Inanimate masculine Accusative matches Nominative.' },
      меду: { surface: 'ме́ду', lemma: 'мед', pos: 'noun (masc. Gen.)', en: 'of honey', note: 'Partitive/mass Genitive singular ending in -у.' },
      готують: { surface: 'готу́ють', lemma: 'готува́ти', pos: 'verb (3rd pl.)', en: 'cook / prepare', note: '3rd person plural of готува́ти.' },
      родини: { surface: 'роди́ни', lemma: 'роди́на', pos: 'noun (fem. Gen.)', en: 'for the family', note: 'Genitive case after the preposition "для" (for).' },
    },
    questions: [
      {
        q: 'How do Taras and Marta get to the market?',
        opts: ['By bus (авто́бусом)', 'On foot (пі́шки)', 'By taxi (на таксі́)'],
        ans: 1,
        exp: 'The passage says: "Вони́ йдуть пі́шки на стари́й ри́нок" (They walk on foot to the old market).',
      },
      {
        q: 'What does Taras buy at the market?',
        opts: ['Rye bread and Carpathian honey', 'Coffee and croissants', 'Milk and butter'],
        ans: 0,
        exp: 'Taras takes "духмя́ний жи́тній хліб і баночку карпа́тського ме́ду" (fragrant rye bread and a small jar of Carpathian honey).',
      },
      {
        q: 'What do Taras and Marta do when they return home?',
        opts: [
          'They watch a movie.',
          'They cook lunch together for the whole family.',
          'They study for an exam.',
        ],
        ans: 1,
        exp: '"Удо́ма вони́ ра́зом готу́ють смачни́й украї́нський обі́д для всіє́ї роди́ни."',
      },
    ],
  },
  {
    id: 'A2-carpathians',
    level: 'A2',
    titleUk: 'По́дорож нічни́м по́їздом у Карпа́ти',
    titleEn: 'A Night-Train Journey to the Carpathians',
    genre: 'A2 Travel Story • Past Tense, Aspect & Motion Verbs',
    summaryEn:
      'Read how Andriy and Sofiia traveled by night train from Kyiv to Yaremche to hike in the Carpathian Mountains.',
    sentences: [
      {
        uk: 'Мину́лої п’я́тниці Андрі́й і Софі́я вирі́шили пої́хати на вихідні́ в Карпа́ти.',
        en: 'Last Friday Andriy and Sofiia decided to travel to the Carpathians for the weekend.',
      },
      {
        uk: 'Вони́ заздалегі́дь купи́ли квитки́ у застосу́нку «Укрзалі́зниці» та приї́хали на вокза́л о дев’я́тій ве́чора.',
        en: 'They bought tickets in advance in the Ukrzaliznytsia app and arrived at the station at nine in the evening.',
      },
      {
        uk: 'У ваго́ні провідни́к прині́с їм запашни́й чай у фірмо́вих склянка́х.',
        en: 'In the train car, the attendant brought them fragrant tea in signature glasses.',
      },
      {
        uk: 'Уранці по́їзд прибу́в до Яре́мча, де дру́зі поба́чили висо́кі смере́ки та почу́ли шум гірсько́ї рі́чки Прут.',
        en: 'In the morning the train arrived in Yaremche, where the friends saw tall spruce trees and heard the sound of the Prut mountain river.',
      },
      {
        uk: 'Уве́сь день вони́ гуля́ли гірськи́ми стежка́ми і поверну́лися до готе́лю щасли́вими.',
        en: 'All day they hiked along mountain trails and returned to the hotel happy.',
      },
    ],
    glossary: {
      вирішили: { surface: 'ви́рішили', lemma: 'ви́рішити', pos: 'verb (perf. past pl.)', en: 'decided', note: 'Perfective past plural (-ли).' },
      поїхати: { surface: 'пої́хати', lemma: 'пої́хати', pos: 'verb (perf. inf.)', en: 'to travel / set off by vehicle', note: 'Prefix по- + ї́хати expresses setting off on a trip.' },
      купили: { surface: 'купи́ли', lemma: 'купи́ти', pos: 'verb (perf. past pl.)', en: 'bought', note: 'Completed purchase (perfective of купува́ти).' },
      квитки: { surface: 'квитки́', lemma: 'квито́к', pos: 'noun (masc. Acc. pl.)', en: 'tickets', note: 'Fleeting "о" drops in plural: квито́к → квитки́.' },
      вокзал: { surface: 'вокза́л', lemma: 'вокза́л', pos: 'noun (masc. Acc.)', en: 'train station', note: 'Takes the preposition "на" (на вокза́л / на вокза́лі).' },
      приніс: { surface: 'прині́с', lemma: 'принести́', pos: 'verb (perf. past masc.)', en: 'brought', note: 'Masculine past tense of принести́ (вона́ прине́сла).' },
      прибув: { surface: 'прибу́в', lemma: 'прибу́ти', pos: 'verb (perf. past masc.)', en: 'arrived', note: 'Formal/schedule verb for train and flight arrivals.' },
      побачили: { surface: 'поба́чили', lemma: 'поба́чити', pos: 'verb (perf. past pl.)', en: 'saw / spotted', note: 'Perfective of ба́чити.' },
      річки: { surface: 'рі́чки', lemma: 'рі́чка', pos: 'noun (fem. Gen. sg.)', en: 'of the river', note: 'Genitive singular after "шум" (the sound of the river).' },
      стежками: { surface: 'стежка́ми', lemma: 'сте́жка', pos: 'noun (fem. Ins. pl.)', en: 'along the trails', note: 'Instrumental plural used for movement along a path.' },
    },
    questions: [
      {
        q: 'How did Andriy and Sofiia buy their train tickets?',
        opts: [
          'In advance in the Ukrzaliznytsia mobile app',
          'From a friend at the hotel',
          'Inside the train car after departure',
        ],
        ans: 0,
        exp: 'The story notes: "Вони́ заздалегі́дь купи́ли квитки́ у застосу́нку «Укрзалі́зниці»".',
      },
      {
        q: 'What did the train attendant (провідни́к) bring them in the evening?',
        opts: ['Coffee and ice cream', 'Fragrant tea in signature glasses', 'Sandwiches and juice'],
        ans: 1,
        exp: '"У ваго́ні провідни́к прині́с їм запашни́й чай у фірмо́вих склянка́х."',
      },
      {
        q: 'Why does the last sentence use imperfective "гуля́ли" first and perfective "поверну́лися" second?',
        opts: [
          'Because "гуля́ли" describes an ongoing activity ("Уве́сь день" — all day), while "поверну́лися" describes the single completed return to the hotel.',
          'Because "гуля́ли" is future tense.',
          'Because reflexive verbs are always perfective.',
        ],
        ans: 0,
        exp: 'Duration ("уве́сь день") pairs naturally with the imperfective aspect ("гуля́ли"), while the completed result of returning uses the perfective ("поверну́лися").',
      },
    ],
  },
  {
    id: 'B1-it-coworking',
    level: 'B1',
    titleUk: 'Робо́чий день у суча́сному ково́ркінгу',
    titleEn: 'A Workday in a Modern Coworking Space',
    genre: 'B1 Contemporary Life • Complex Clauses, Vocative & Professional Vocabulary',
    summaryEn:
      'Explore how a product designer in Kyiv balances remote teamwork, client calls, and language study.',
    sentences: [
      {
        uk: 'Дмитро́ працю́є диза́йнером інтерфе́йсів у компа́нії, яка́ ство́рює осві́тні мобі́льні застосу́нки.',
        en: 'Dmytro works as a UI designer at a company that creates educational mobile apps.',
      },
      {
        uk: 'Щоб працюва́ти продуктивніше й спілкува́тися з коле́гами, він три́чі на ти́ждень прихо́дить до світлого ково́ркінгу на Подо́лі.',
        en: 'In order to work more productively and communicate with colleagues, he comes to a bright coworking space in Podil three times a week.',
      },
      {
        uk: '«Дми́тре, перегля́нь, будь ла́ска, нови́й маке́т, яки́й ми підготува́ли для кліє́нтів!» — зверта́ється до ньо́го мене́джерка Окса́на.',
        en: '“Dmytro, please review the new mockup that we prepared for the clients!” manager Oksana addresses him.',
      },
      {
        uk: 'Якщо́ всі де́талі бу́де узго́джено до обі́ду, кома́нда змо́же запусти́ти тестува́ння вже насту́пного ти́жня.',
        en: 'If all details are agreed upon before lunch, the team will be able to launch testing as early as next week.',
      },
      {
        uk: 'Пі́сля робо́ти Дмитро́ бере́ у́часть у розмо́вному клу́бі, бо переко́наний, що пості́йна пра́ктика — найкра́щий шлях до успі́ху.',
        en: 'After work Dmytro takes part in a conversation club, because he is convinced that constant practice is the best path to success.',
      },
    ],
    glossary: {
      дизайнером: { surface: 'диза́йнером', lemma: 'диза́йнер', pos: 'noun (masc. Ins.)', en: 'as a designer', note: 'Professions after працюва́ти take the Instrumental case.' },
      створює: { surface: 'ство́рює', lemma: 'ство́рювати', pos: 'verb (3rd sg.)', en: 'creates', note: 'Imperfective verb paired with perfective створи́ти.' },
      щоб: { surface: 'Щоб', lemma: 'щоб', pos: 'conjunction', en: 'in order to', note: 'Followed by an infinitive when the subject is the same.' },
      тричі: { surface: 'три́чі', lemma: 'три́чі', pos: 'adverb', en: 'three times', note: 'Одноразово / дві́чі (twice) / три́чі (three times).' },
      дмитре: { surface: 'Дми́тре', lemma: 'Дмитро́', pos: 'proper noun (Voc.)', en: 'Dmytro! (direct address)', note: 'Vocative case used when calling Dmytro directly.' },
      переглянь: { surface: 'перегля́нь', lemma: 'перегля́нути', pos: 'verb (imperative 2nd sg.)', en: 'review / take a look at', note: 'Informal singular imperative.' },
      узгоджено: { surface: 'узго́джено', lemma: 'узго́дити', pos: 'predicative (-но form)', en: 'agreed upon / coordinated', note: 'Impersonal passive resultative with future "бу́де".' },
      участь: { surface: 'у́часть', lemma: 'у́часть', pos: 'noun (fem. Acc.)', en: 'part / participation', note: 'Used in the collocation "бра́ти у́часть" (to take part).' },
    },
    questions: [
      {
        q: 'Why is "диза́йнером" in the Instrumental case in the first sentence?',
        opts: [
          'Because professions after the verb "працюва́ти" (to work as) take the Instrumental case.',
          'Because it is plural.',
          'Because it follows the preposition "у".',
        ],
        ans: 0,
        exp: '"Працюва́ти ким?" requires the Instrumental case: "Дмитро́ працю́є диза́йнером".',
      },
      {
        q: 'Why does Oksana say "Дми́тре" instead of "Дмитро́"?',
        opts: [
          '"Дми́тре" is the plural form of the name.',
          'She is addressing him directly, so his name changes to the Vocative case (Кличний відмінок).',
          '"Дми́тре" is past tense.',
        ],
        ans: 1,
        exp: 'Hard masculine nouns and names ending in "-о" or a consonant take "-е" in the Vocative case: "Дмитро́ → Дми́тре!".',
      },
      {
        q: 'When will the team be able to launch testing?',
        opts: [
          'Yesterday evening',
          'In two months',
          'Next week, if all details are agreed upon before lunch',
        ],
        ans: 2,
        exp: '"Якщо́ всі де́талі бу́де узго́джено до обі́ду, кома́нда змо́же запусти́ти тестува́ння вже насту́пного ти́жня."',
      },
    ],
  },
  {
    id: 'B2C1-culture',
    level: 'B2–C1',
    titleUk: 'Фено́мен украї́нської книжко́вої культу́ри та живи́й діало́г поколі́нь',
    titleEn: 'The Phenomenon of Ukrainian Book Culture and the Living Dialogue of Generations',
    genre: 'B2–C1 Cultural Essay • Euphony, Participles & Impersonal Resultatives',
    summaryEn:
      'An upper-intermediate/advanced essay on how contemporary Ukrainian book festivals, independent publishers, and reader communities connect tradition with modernity.',
    sentences: [
      {
        uk: 'Про́тягом оста́нніх ро́ків в Украї́ні відкри́то деся́тки нови́х книга́рень-кав’я́рень, які́ ста́ли справжніми осере́дками культу́рного життя́.',
        en: 'Over recent years, dozens of new bookstore-cafés have been opened in Ukraine, becoming true hubs of cultural life.',
      },
      {
        uk: 'Відві́дуючи «Книжко́вий Арсена́л» у Ки́єві чи «Фо́рум видавці́в» у Льво́ві, читачі́ ма́ють змо́гу безпосере́дньо поспілкува́тися з авторами й перекладача́ми.',
        en: 'While visiting the Book Arsenal in Kyiv or the Publishers’ Forum in Lviv, readers have the opportunity to converse directly with authors and translators.',
      },
      {
        uk: 'Поєдна́вши класи́чну літерату́рну спа́дщину із суча́сним графі́чним диза́йном, молоді́ видавни́цтва залучи́ли нове́ поколі́ння поціно́вувачів кни́жки.',
        en: 'Having combined classical literary heritage with modern graphic design, young publishing houses have attracted a new generation of book lovers.',
      },
      {
        uk: 'Якби́ не така́ ті́сна взаємоді́я між письменниками, видавця́ми та грома́дою, важко бу́ло б уяви́ти насті́льки стрімки́й ро́звиток украї́нського друко́ваного сло́ва.',
        en: 'Were it not for such close interaction among writers, publishers, and the community, it would be hard to imagine such rapid development of the Ukrainian printed word.',
      },
    ],
    glossary: {
      протягом: { surface: 'Про́тягом', lemma: 'про́тягом', pos: 'preposition (+ Gen.)', en: 'throughout / over the course of', note: 'Takes the Genitive case (про́тягом оста́нніх ро́ків).' },
      відкрито: { surface: 'відкри́то', lemma: 'відкри́ти', pos: 'predicative (-то form)', en: 'have been opened', note: 'Impersonal resultative passive construction.' },
      відвідуючи: { surface: 'Відві́дуючи', lemma: 'відві́дувати', pos: 'present adverbial participle', en: 'while visiting', note: 'Formed from imperfective 3rd plural stem + -ючи.' },
      поєднавши: { surface: 'Поєдна́вши', lemma: 'поєдна́ти', pos: 'past adverbial participle', en: 'having combined', note: 'Formed from perfective past stem + -вши.' },
      спадщину: { surface: 'спа́дщину', lemma: 'спа́дщина', pos: 'noun (fem. Acc.)', en: 'heritage / legacy', note: 'Direct object of поєдна́вши.' },
      якби: { surface: 'Якби́', lemma: 'якби́', pos: 'conjunction', en: 'if / were it not for', note: 'Introduces a counterfactual conditional clause.' },
      уявити: { surface: 'уяви́ти', lemma: 'уяви́ти', pos: 'verb (perf. inf.)', en: 'to imagine', note: 'Paired with imperfective уявля́ти.' },
    },
    questions: [
      {
        q: 'What grammatical structure is "відкри́то деся́тки нови́х книга́рень-кав’я́рень"?',
        opts: [
          'An impersonal resultative passive in "-то" governing a direct object',
          'A future tense active verb',
          'A Vocative address',
        ],
        ans: 0,
        exp: '"Відкри́то" is an invariant impersonal resultative predicate meaning "(there) have been opened".',
      },
      {
        q: 'How do "Відві́дуючи" (sentence 2) and "Поєдна́вши" (sentence 3) differ in time relationship?',
        opts: [
          'Both describe future actions.',
          '"Відві́дуючи" describes a simultaneous action ("while visiting"), whereas "Поєдна́вши" describes a completed prior action ("having combined").',
          '"Відві́дуючи" is passive and "Поєдна́вши" is conditional.',
        ],
        ans: 1,
        exp: 'Present adverbial participles in "-ючи" express simultaneous action; past adverbial participles in "-вши" express prior completed action.',
      },
      {
        q: 'Notice the prepositions in sentence 2: "у Ки́єві чи «Фо́рум видавці́в» у Льво́ві" and "з авторами й перекладача́ми". Why is "й" used before "перекладача́ми"?',
        opts: [
          'Because "й" means "or".',
          'Because "перекладача́ми" is singular.',
          'Because "авторами" ends in a vowel (-и) and "перекладача́ми" starts with a single consonant, so "й" preserves smooth euphony (милозву́чність).',
        ],
        ans: 2,
        exp: 'After a word ending in a vowel ("авторами"), the glide conjunction "й" creates a smooth CV syllable transition.',
      },
    ],
  },
];

const LEVEL_ORDER: Array<ReaderPassage['level']> = [
  'A0',
  'A1',
  'A2',
  'B1',
  'B2–C1',
];

export const READER_PASSAGES: ReaderPassage[] = LEVEL_ORDER.flatMap((lvl) => [
  ...BASE_READER_PASSAGES.filter((p) => p.level === lvl),
  ...EXTRA_READER_PASSAGES.filter((p) => p.level === lvl),
]);

