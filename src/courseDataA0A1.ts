export interface CourseDialogueLine {
  speaker: string;
  uk: string;
  en: string;
}

export interface CourseActiveRecallItem {
  promptEn: string;
  answerUk: string;
  hint: string;
}

export interface CourseQuestion {
  q: string;
  opts: string[];
  ans: number;
  exp: string;
}

export interface CoursePracticeDrill {
  prompt: string;
  opts: string[];
  ans: number;
  audioUk: string;
  exp: string;
}

export type CourseVocabTuple = [string, string, string, string?, string?];

export interface CourseModule {
  id: string;
  level: 'A0' | 'A1' | 'A2' | 'B1' | 'B2' | 'C1';
  topicTag: string;
  title: string;
  objectives: string[];
  summary: string;
  rules: string[];
  examples: Array<{ uk: string; en: string }>;
  dialogue: {
    title: string;
    lines: CourseDialogueLine[];
  };
  activeRecall: CourseActiveRecallItem[];
  reviewSummary: string;
  cfu: CourseQuestion[];
  practice: CoursePracticeDrill[];
  vocab: CourseVocabTuple[];
  exam: CourseQuestion[];
}

export const COURSE_MODULES_A0_A1: CourseModule[] = [
  {
    id: 'A0.1',
    level: 'A0',
    topicTag: 'Pre-A1 Foundation • Alphabet & Vowels',
    title: 'Reading the Ukrainian Alphabet & Clear Vowels',
    objectives: [
      'Recognize Ukrainian Cyrillic letters that look and sound like English letters.',
      'Pronounce the six core Ukrainian vowel sounds clearly.',
      'Understand how word stress works in Ukrainian and read your first everyday words.',
    ],
    summary:
      'Ukrainian uses a 33-letter Cyrillic alphabet, and it is one of the most phonetic languages in Europe: almost every letter always makes the same sound. Better yet, unlike English (or Russian), Ukrainian vowels stay clear even when they are not stressed.',
    rules: [
      '<b>1. True Friends (Letters You Already Know)</b>: Six Ukrainian letters look and sound just like English: <b>А а</b> ("ah" as in <i>father</i>), <b>Е е</b> ("eh" as in <i>met</i>), <b>І і</b> ("ee" as in <i>meet</i>), <b>К к</b> (<i>k</i>), <b>М м</b> (<i>m</i>), <b>О о</b> ("o" as in <i>more</i>), and <b>Т т</b> (<i>t</i>). You can already read <b>ма́ма</b> (mom), <b>та́то</b> (dad), <b>кіт</b> (cat), and <b>те́ма</b> (topic)!',
      '<b>2. Look-Alikes with Different Sounds</b>: A few letters look like English letters but represent different sounds: <b>В в</b> sounds like <i>v</i> (<b>вода́</b> = water), <b>Н н</b> sounds like <i>n</i> (<b>ні</b> = no), <b>Р р</b> is a tapped <i>r</i> (<b>ра́нок</b> = morning), <b>С с</b> sounds like <i>s</i> (<b>сік</b> = juice), <b>У у</b> sounds like "oo" in <i>moon</i> (<b>тут</b> = here), and <b>Х х</b> is a breathy "kh" as in Bach or loch (<b>хліб</b> = bread).',
      '<b>3. The Two "I" Vowels: І і vs. И и</b>: Ukrainian has two distinct "i"-type vowels. Dotted <b>І і</b> sounds like a long "ee" in <i>meet</i> (<b>сік</b>, <b>мі́сто</b>). Undotted <b>И и</b> sounds like the short "i" in English <i>bit</i> or <i>sit</i> (<b>ти</b> = you, <b>ми</b> = we, <b>син</b> = son).',
      '<b>4. Word Stress & Clear "О"</b>: In this course, an accent mark (<b>´</b>) shows which syllable gets extra emphasis, as in <b>молоко́</b> (milk). In Ukrainian, every <b>о</b> is pronounced as a clear "o" sound whether it is stressed or unstressed—it never turns into an "ah" sound.',
      '<b>5. Unstressed Vowel Harmony (е/и, о/у) & 5 Ukrainian Intonation Patterns</b>:<ul><li><b>Natural Unstressed Vowel Coloring</b>: While Ukrainian vowels never reduce to an indistinct "uh" [ə], unstressed <b>е</b> and <b>и</b> move slightly closer to each other in natural speech (<b>село́</b> [се<sup>и</sup>ло́], <b>весна́</b> [ве<sup>и</sup>сна́], <b>живе́</b> [жи<sup>е</sup>ве́]), and unstressed <b>о</b> before a stressed syllable with <b>у</b> rounds slightly toward [u] (<b>голу́бка</b> [го<sup>у</sup>лу́бка], <b>зозу́ля</b> [зо<sup>у</sup>зу́ля]).</li><li><b>5 Core Intonation Contours</b>: (1) <b>Statements</b> end with a calm falling pitch on the stressed syllable of the key word (<i>Ось наш буди́нок.</i>); (2) <b>Wh-Questions</b> (with <i>хто, що, де, коли́, як</i>) start with an energetic high pitch on the question word and fall at the end (<i>Хто́ це? Де́ парк?</i>); (3) <b>Yes/No Questions without «чи»</b> keep statement word order and use a sharp rise-fall on the stressed syllable of the word being questioned (<i>Це <b>ка́</b>ва? Ти <b>тут</b>?</i>); (4) <b>Contrastive «А...?» & Alternative «...чи...?» Questions</b> rise before <i>чи</i> and fall at the end (<i>Це чай чи ка́ва? А ти?</i>); (5) <b>Polite Requests</b> rise warmly on the imperative verb and fall gently on <i>будь ла́ска</i> (<i>Скажі́ть, будь ла́ска!</i>).</li></ul>',
    ],
    examples: [
      { uk: 'Ма́ма, та́то і син удо́ма.', en: 'Mom, dad, and the son are at home.' },
      { uk: 'Тут ка́ва, чай і молоко́.', en: 'Here are coffee, tea, and milk.' },
      { uk: 'Це мій кіт і мій дім.', en: 'This is my cat and my house.' },
      { uk: 'Так, це сві́жий сік і хліб.', en: 'Yes, this is fresh juice and bread.' },
      { uk: 'Це ка́ва чи чай? — Це ка́ва. А де молоко́?', en: 'Is this coffee or tea (rising-falling alternative intonation)? — This is coffee. And where is the milk?' },
    ],
    dialogue: {
      title: 'At the Breakfast Table',
      lines: [
        { speaker: 'Ма́ма', uk: 'До́брого ра́нку! Ось ка́ва і молоко́.', en: 'Good morning! Here are coffee and milk.' },
        { speaker: 'Та́то', uk: 'Дя́кую! А де сік і хліб?', en: 'Thank you! And where are the juice and bread?' },
        { speaker: 'Ма́ма', uk: 'Сік і хліб тут, на столі́.', en: 'The juice and bread are right here on the table.' },
      ],
    },
    activeRecall: [
      { promptEn: 'mom', answerUk: 'ма́ма', hint: 'Uses the same M and A letters as English' },
      { promptEn: 'milk (stress on the last syllable)', answerUk: 'молоко́', hint: 'All three vowels are pronounced as a clear "o"' },
      { promptEn: 'you (informal singular)', answerUk: 'ти', hint: 'Uses Т + short vowel и (like "i" in bit)' },
      { promptEn: 'water', answerUk: 'вода́', hint: 'Starts with В (v-sound) and ends in stressed -а́' },
    ],
    reviewSummary:
      'Remember: А (ah), О (clear o), У (oo), Е (eh), І (long ee in meet), and И (short i in bit). Every Ukrainian "о" stays a clear "o" sound even when unstressed.',
    cfu: [
      {
        q: 'How is the Ukrainian word «молоко́» (milk) pronounced?',
        opts: [
          'Malako (the first two o’s turn into "a")',
          'Mo-lo-KO (all three "о" vowels sound like a clear "o", with stress on the last syllable)',
          'Mi-li-KO',
        ],
        ans: 1,
        exp: 'In Ukrainian, unstressed "о" always keeps its clear "o" sound. Only the last syllable (-ко́) is stressed: mo-lo-KO.',
      },
      {
        q: 'What is the difference in sound between the Ukrainian vowels «І і» and «И и»?',
        opts: [
          '«І і» sounds like "ee" in "meet", while «И и» sounds like short "i" in "bit"',
          'Both sound identical in Ukrainian',
          '«И и» is silent at the end of a word',
        ],
        ans: 0,
        exp: 'Dotted «і» is a high front "ee" sound (as in мі́сто), whereas «и» is a short central-front vowel like "i" in English "bit" (as in ти, ми, син).',
      },
      {
        q: 'Which English sound does the Ukrainian letter «В в» represent at the start of «вода́» (water)?',
        opts: ['"b" as in boy', '"w" as in window', '"v" as in voice'],
        ans: 2,
        exp: 'Before a vowel (like о in вода́), Ukrainian «В в» sounds like English "v": vo-DA.',
      },
    ],
    practice: [
      {
        prompt: 'Read the Ukrainian word and choose the word that means "cat":',
        opts: ['кіт', 'там', 'ма́ма'],
        ans: 0,
        audioUk: 'кіт',
        exp: '«кіт» (pronounced "keet") means "cat".',
      },
      {
        prompt: 'Which Ukrainian word means "we" (pronounced with the short vowel in "bit")?',
        opts: ['ма́ма', 'ми', 'ні'],
        ans: 1,
        audioUk: 'ми',
        exp: '«ми» means "we", while «ти» means "you" (informal singular).',
      },
      {
        prompt: 'Which word means "here" and uses the vowel «у» ("oo" as in moon)?',
        opts: ['так', 'тут', 'дім'],
        ans: 1,
        audioUk: 'тут',
        exp: '«тут» (pronounced "toot") means "here".',
      },
      {
        prompt: 'Look at the Cyrillic letters in «ка́ва». What does this everyday word mean?',
        opts: ['water', 'coffee', 'city'],
        ans: 1,
        audioUk: 'ка́ва',
        exp: '«ка́ва» (KA-va) means "coffee".',
      },
      {
        prompt: 'Which word means "yes" in Ukrainian?',
        opts: ['ні', 'так', 'хто'],
        ans: 1,
        audioUk: 'так',
        exp: '«так» means "yes", and «ні» means "no".',
      },
    ],
    vocab: [
      ['ма́ма', 'NOUN', 'mom / mother', 'Це моя́ ма́ма.', 'This is my mom.'],
      ['та́то', 'NOUN', 'dad / father', 'Мій та́то вдо́ма.', 'My dad is at home.'],
      ['кіт', 'NOUN', 'cat', 'Ось наш кіт.', 'Here is our cat.'],
      ['дім', 'NOUN', 'house / home', 'Це вели́кий дім.', 'This is a big house.'],
      ['вода́', 'NOUN', 'water', 'Тут є сві́жа вода́.', 'There is fresh water here.'],
      ['молоко́', 'NOUN', 'milk', 'Я люблю́ молоко́.', 'I like milk.'],
      ['ка́ва', 'NOUN', 'coffee', 'Це гаря́ча ка́ва.', 'This is hot coffee.'],
      ['чай', 'NOUN', 'tea', 'Ось зелений чай.', 'Here is green tea.'],
      ['хліб', 'NOUN', 'bread', 'Хліб на столі́.', 'The bread is on the table.'],
      ['ти', 'PRON', 'you (informal singular)', 'Де ти за́раз?', 'Where are you right now?'],
      ['ми', 'PRON', 'we', 'Ми вже тут.', 'We are already here.'],
      ['так', 'PART', 'yes', 'Так, це пра́вда.', 'Yes, that is true.'],
      ['ні', 'PART', 'no', 'Ні, дя́кую.', 'No, thank you.'],
      ['тут', 'ADV', 'here', 'Я живу́ тут.', 'I live here.'],
      ['там', 'ADV', 'there', 'Кав’я́рня там.', 'The coffee shop is over there.'],
    ],
    exam: [
      {
        q: 'What does the Ukrainian word «вода́» mean?',
        opts: ['coffee', 'water', 'bread'],
        ans: 1,
        exp: '«вода́» (vo-DA) means "water".',
      },
      {
        q: 'Which letter in «ні» (no) represents the "n" sound?',
        opts: ['Н н', 'І і', 'П п'],
        ans: 0,
        exp: 'Ukrainian «Н н» represents the "n" sound.',
      },
      {
        q: 'What do «ти» and «ми» mean in English?',
        opts: ['"he" and "she"', '"you (singular)" and "we"', '"here" and "there"'],
        ans: 1,
        exp: '«ти» is "you" (informal singular) and «ми» is "we".',
      },
      {
        q: 'How is the vowel «у» pronounced in «тут» (here)?',
        opts: ['Like "oo" in "moon"', 'Like "u" in "cup"', 'Like "y" in "yes"'],
        ans: 0,
        exp: 'Ukrainian «у» always sounds like a pure "oo" as in "moon".',
      },
      {
        q: 'In the word «молоко́», which syllable is stressed?',
        opts: ['The first syllable (мо-)', 'The middle syllable (-ло-)', 'The final syllable (-ко́)'],
        ans: 2,
        exp: 'The acute accent mark shows stress on the final syllable: молоко́.',
      },
      {
        q: 'Choose the correct translation of «Тут ка́ва і молоко́»:',
        opts: ['Here are coffee and milk.', 'Where is the water?', 'There is tea and bread.'],
        ans: 0,
        exp: '«тут» = here, «ка́ва» = coffee, «і» = and, «молоко́» = milk.',
      },
    ],
  },
  {
    id: 'A0.2',
    level: 'A0',
    topicTag: 'Pre-A1 Foundation • Consonants, Softness & Apostrophe',
    title: 'Key Ukrainian Consonants, Soft Sounds & The Apostrophe',
    objectives: [
      'Distinguish between the warm Ukrainian "h" sound (Г г) and the hard "g" sound (Ґ ґ).',
      'Read the "y"-gliding vowels (я, ю, є, ї) and the consonant Й й.',
      'Understand how the soft sign (ь) and the apostrophe (’) work in everyday words.',
    ],
    summary:
      'Now let’s unlock the remaining letters of the Ukrainian alphabet! Once you know how Г vs. Ґ, the "y"-vowels (я, ю, є, ї), the soft sign (ь), and the apostrophe (’) work, you can read any Ukrainian word aloud.',
    rules: [
      '<b>1. Two Different Sounds: Г г ("h") vs. Ґ ґ ("g")</b>: Very common <b>Г г</b> is a warm, voiced "h" sound made in the throat, like the "h" in English <i>aha!</i> or <i>behind</i> (<b>га́рний</b> = nice, <b>гора́</b> = mountain, <b>говори́ти</b> = to speak). Much rarer <b>Ґ ґ</b> (with an upturned hook) is a hard "g" as in English <i>go</i> (<b>ґа́нок</b> = porch, <b>ґу́дзик</b> = button).',
      '<b>2. The "Y" Sound (Й й) and Four "Y"-Vowels (Я, Ю, Є, Ї)</b>: <b>Й й</b> sounds like "y" in <i>boy</i> or <i>yes</i> (<b>мій</b> = my, <b>чай</b> = tea). Four vowels built with this "y" glide are: <b>Я я</b> ("ya" as in <i>yard</i>: <b>я</b> = I), <b>Ю ю</b> ("yu" as in <i>you</i>: <b>люблю́</b> = I love), <b>Є є</b> ("ye" as in <i>yes</i>: <b>є</b> = there is), and two-dot <b>Ї ї</b>, which ALWAYS sounds like "yee" (<b>Украї́на</b> = Ukraine, <b>ї́жа</b> = food, <b>Ки́їв</b> = Kyiv).',
      '<b>3. Unique Consonants to Recognize</b>: <b>Б б</b> (<i>b</i>), <b>Д д</b> (<i>d</i>), <b>Ж ж</b> ("zh" as in <i>measure</i>: <b>життя́</b> = life), <b>З з</b> (<i>z</i>: <b>за́раз</b> = now), <b>Л л</b> (<i>l</i>), <b>П п</b> (<i>p</i>), <b>Ф ф</b> (<i>f</i>), <b>Ц ц</b> ("ts" as in <i>cats</i>: <b>це</b> = this is), <b>Ч ч</b> ("ch" as in <i>chat</i>: <b>час</b> = time), <b>Ш ш</b> ("sh" as in <i>shop</i>: <b>шко́ла</b> = school), and <b>Щ щ</b> ("shch" as in <i>fresh cheese</i>: <b>борщ</b>, <b>що</b> = what).',
      '<b>4. Soft Sign (ь), Apostrophe (’) & Final В [w]</b>: The soft sign <b>ь</b> makes no sound of its own—it softens the consonant right before it by raising the middle of your tongue toward the roof of your mouth (<b>день</b> = day, <b>сіль</b> = salt). Conversely, an apostrophe (<b>’</b>) keeps a consonant hard and makes you pronounce a clear "y" glide right after it (<b>сім’я́</b> = family, <b>п’ять</b> = five, <b>м’я́со</b> = meat). Finally, at the end of a word or before another consonant, <b>в</b> sounds like a rounded English "w" (<b>Ки́їв</b> [kɪjiw], <b>сказа́в</b> [skɑzɑw]).',
      '<b>5. Crisp Dental Consonants (т, д, н, л), Unaspirated (п, т, к), Fused Affricates (дж, дз) & Long Double Consonants (-ння, -ття)</b>:<ul><li><b>Dental Articulation & No Puff of Air</b>: Pronounce Ukrainian <b>т, д, н, л</b> with the tip of your tongue touching the back of your upper front teeth (not the ridge behind them as in English), and pronounce <b>п, т, к</b> cleanly without an English puff of breath (aspiration).</li><li><b>One Fused Sound Written with Two Letters (дж, дз)</b>: Inside a root, <b>дж</b> is pronounced as a single fused sound like English "j" in <i>jump</i> [dʒ] (<b>бджола́</b> = bee, <b>джерело́</b> = spring, <b>піджа́к</b> = jacket, <b>сиджу́</b> = I sit), and <b>дз</b> is a single fused "dz" sound [dz] (<b>дзво́ник</b> = bell, <b>ґу́дзик</b> = button, <b>дзерка́ло</b> = mirror).</li><li><b>Prolonged Soft Consonants (-ння, -ття, -лля)</b>: Doubled consonants before <b>-я</b> in neuter nouns like <b>знання́</b> (knowledge), <b>життя́</b> (life), <b>взуття́</b> (footwear), <b>завда́ння</b> (task), and <b>оповіда́ння</b> (short story) are held ~1.5× longer as a prolonged soft sound.</li></ul>',
      '<b>6. Smooth Consonant Cluster Simplification & Soft Sibilant Assimilation</b>:<ul><li><b>Dropping Middle Consonants for Easy Flow</b>: To keep speech melodic, Ukrainian simplifies heavy consonant clusters both in pronunciation and spelling: <b>ти́ждень → ти́жня</b> (<i>д</i> drops in all oblique cases!), <b>ко́ристь → кори́сний</b> (useful), <b>ра́дість → ра́дісний</b> (joyful), <b>ща́стя → щасли́вий</b> (happy — <i>т</i> drops), <b>се́рце → серде́чний</b> (<i>д</i> reappears when the cluster breaks), <b>черне́ць → ченця́</b> (monk). In a few words like <b>шістна́дцять</b> (16) and <b>контра́стний</b>, the <i>т</i> is kept in writing but silent in natural speech: [ʃisnɑ́dʲtsʲɑtʲ]!</li><li><b>Sibilants Before «-ці» and «-ся»</b>: When <b>ж, ч, ш</b> come right before soft <b>ц</b> or <b>с</b>, they assimilate smoothly in speech: <b>кни́жка → у кни́жці</b> sounds like soft [knɪ́zʲtsʲi], <b>ка́чка → ка́чці</b> sounds like [kɑ́tsʲtsʲi], and 2nd-person reflexive <b>одяга́єшся / у́чишся</b> sounds like a long soft [sʲsʲɑ]!</li></ul>',
      '<b>7. Which Consonants Double Before «-я/-ю» vs. Take an Apostrophe, Selective Softener «-і», & Prefix Boundaries in «підживи́ти»</b>:<ul><li><b>Consonants That Double (Geminate) vs. Consonants That Take an Apostrophe</b>: Dental and palatal consonants (<b>д, т, з, с, л, н, ц, ж, ч, ш</b>) lengthen between vowels before <b>-я / -ю / -є</b> (written doubled: <b>пита́ння, життя́, дозві́лля, воло́сся, узбі́ччя, збі́жжя, суддя́</b>; notice minimal pairs like <b>Ві́тя</b> [name] vs. <b>ві́ття</b> [branches], <b>рі́ля</b> vs. <b>рілля́</b> [tilled soil]). By contrast, labials (<b>б, п, в, м, ф</b>) and <b>г, ґ, й, к, р, х, щ</b> NEVER double in native roots—instead, labials and hard <b>р</b> keep an apostrophe before <b>я, ю, є, ї</b>: <b>подві́р’я</b> (courtyard), <b>сім’я́</b> (family), <b>любо́в’ю</b> (with love).</li><li><b>Selective Softening Before «-і» & Soft «-л-» Before Dropped «-е-»</b>: While <b>я, ю, є, ь</b> fully palatalize preceding dentals, the vowel <b>і</b> softens <b>д, т, з, с, л, н, ц</b> only semi-softly in literary speech (<b>ді́вчина, ті́тка, зір, сіль, полі́т, ніс</b>). Also note that when fleeting <b>-е-</b> drops after <b>л</b> in <b>-ець</b> nouns, a soft sign <b>ь</b> is written: <b>па́лець → па́льці</b> (fingers), <b>стіле́ць → стільці́</b> (chairs), <b>брази́лець → брази́льці</b>.</li><li><b>Root Affricates «дж / дз» vs. Prefix-Root Boundaries & Reflexive «-ться / -шся»</b>: Inside a root, <b>дж</b> [dʒ] and <b>дз</b> [dz] are pronounced as one fused sound (<b>ходжу́, джерело́, дзе́ркало, дзвін</b>), but across a prefix-root boundary they are pronounced separately: <b>під-живи́ти</b>, <b>над-звукови́й</b>! Finally, in natural speech 3rd-person reflexive <b>-ться</b> (<b>він ди́виться, вони́ смію́ться</b>) sounds like a lengthened soft <b>[tsʲːa]</b>, and 2nd-person <b>-шся</b> (<b>ти ди́вишся, сміє́шся, бої́шся</b>) sounds like <b>[sʲːa]</b>.</li></ul>',
      '<b>8. The Story of «Ґ ґ», Two-Sound «зг» [zɦ] vs. «ж» [ʒ], Official Place-Name Spelling & Stress Minimal Pairs</b>:<ul><li><b>Resilience of the Letter «Ґ ґ»</b>: Included in the 1929 Kharkiv orthography to distinguish the velar plosive [ɡ] (<b>ґу́дзик, ґа́нок, а́ґрус, дзи́ґа</b>) from the voiced glottal fricative <b>Г г</b> [ɦ], the letter <b>Ґ ґ</b> was banned in Soviet orthography in 1946 and officially restored to the Ukrainian alphabet in 1990–1993.</li><li><b>Two Separate Sounds in «зг» [zɦ] vs. «ж» [ʒ]</b>: When the letters <b>з</b> and <b>г</b> meet in words like <b>зго́да!</b> ("Agreed!"), <b>згада́ти</b> ("to recall"), or <b>розмова з го́стем</b>, pronounce <b>з</b> [z] and <b>г</b> [ɦ] separately—never fuse them into <b>ж</b> [ʒ] (as in <b>журна́л</b>)!</li><li><b>Official Ukrainian Romanization of Place Names</b>: Always use the official Ukrainian forms in English—<b>Kyiv</b> (Ки́їв), <b>Odesa</b> (Оде́са), <b>Lviv</b> (Львів), <b>Kharkiv</b> (Ха́рків), <b>Chernihiv</b> (Черні́гів), <b>Zaporizhzhia</b> (Запорі́жжя), and the <b>Dnipro</b> River (Дніпро́)—and say <b>Ukraine</b> (never <i>"the Ukraine"</i>).</li><li><b>Four Essential Stress Minimal Pairs</b>: Because Ukrainian word stress is free and mobile, shifting stress alone can change a word’s meaning completely:<ul><li><b>доро́га</b> (road, noun) vs. <b>дорога́</b> (dear / expensive, feminine adjective)</li><li><b>за́мок</b> (castle) vs. <b>замо́к</b> (lock / zipper)</li><li><b>о́рган</b> (anatomical organ or governing body) vs. <b>орга́н</b> (pipe organ, musical instrument)</li><li><b>брати́</b> (brothers, Nominative plural of <i>брат</i>) vs. <b>бра́ти</b> (to take, infinitive).</li></ul></li></ul>',
    ],
    examples: [
      { uk: 'Я люблю́ Ки́їв і Украї́ну.', en: 'I love Kyiv and Ukraine.' },
      { uk: 'Це моя́ дру́жна сім’я́.', en: 'This is my friendly family.' },
      { uk: 'Сього́дні ду́же га́рний день.', en: 'Today is a very nice day.' },
      { uk: 'На обі́д є смачни́й украї́нський борщ і м’я́со.', en: 'For lunch there is delicious Ukrainian borscht and meat.' },
      { uk: 'Нове́ знання́, ціка́ве оповіда́ння і лісове́ джерело́.', en: 'New knowledge, an interesting short story (prolonged soft -нн-), and a forest spring (fused дж [dʒ]).' },
      { uk: 'Цього́ ти́жня ми прочита́ли у кни́жці шістна́дцять кори́сних і ра́дісних новин.', en: 'This week (ти́ждень → ти́жня) we read sixteen (шістна́дцять) useful (кори́сний) and joyful (ра́дісний) pieces of news in the book (у кни́жці).' },
      { uk: 'На за́тишному подві́р’ї стої́ть чотири стільці́; ти ди́вишся на збі́жжя й усміха́єшся.', en: 'In the cozy courtyard (подві́р’я with apostrophe) stand four chairs (стіле́ць → стільці́); you look (ди́вишся [-sʲːa]) at the grain (збі́жжя) and smile.' },
      { uk: 'Зго́да! Доро́га веде́ до старови́нного за́мку, де мої́ брати́ слу́хають класи́чний орга́н, а на дверя́х виси́ть міцни́й замо́к.', en: 'Agreed (зго́да [zɦ])! The road (доро́га) leads to the ancient castle (за́мок), where my brothers (брати́) listen to a classical pipe organ (орга́н), and a sturdy lock (замо́к) hangs on the door.' },
    ],
    dialogue: {
      title: 'Ordering Ukrainian Borscht',
      lines: [
        { speaker: 'Оле́на', uk: 'Скажі́ть, будь ла́ска, що сього́дні є на обі́д?', en: 'Tell me, please, what is there for lunch today?' },
        { speaker: 'Офіціа́нт', uk: 'Сього́дні є гаря́чий украї́нський борщ, м’я́со і сві́жий хліб.', en: 'Today there is hot Ukrainian borscht, meat, and fresh bread.' },
        { speaker: 'Оле́на', uk: 'Чудо́во! Я ду́же люблю́ борщ.', en: 'Wonderful! I really love borscht.' },
      ],
    },
    activeRecall: [
      { promptEn: 'I (first-person pronoun)', answerUk: 'я', hint: 'Single letter pronounced "ya"' },
      { promptEn: 'family (written with an apostrophe)', answerUk: 'сім’я́', hint: 'сім + apostrophe + я́' },
      { promptEn: 'what', answerUk: 'що', hint: 'Starts with щ ("shch") + о' },
      { promptEn: 'day (ends with a soft sign)', answerUk: 'день', hint: 'д + е + н + ь' },
    ],
    reviewSummary:
      'Key takeaways: Г г is a voiced breathy "h", while Ґ ґ is a hard "g". Ї ї is always "yee" (Украї́на, Ки́їв). The soft sign (ь) softens a consonant, while the apostrophe (’) separates a consonant from a following "y" glide (сім’я́, п’ять).',
    cfu: [
      {
        q: 'How do you pronounce the letter «Г г» in common Ukrainian words like «га́рний» (nice) and «говори́ти» (to speak)?',
        opts: [
          'Like a hard "g" in "go"',
          'Like a warm, voiced "h" sound (as in "aha" or "behind")',
          'Like "f" in "food"',
        ],
        ans: 1,
        exp: 'Standard Ukrainian «Г г» is a voiced glottal "h" sound [ɦ]. The hard "g" sound is written with the hooked letter «Ґ ґ» (as in ґа́нок).',
      },
      {
        q: 'How is the two-dotted letter «Ї ї» always pronounced in words like «Украї́на», «Ки́їв», and «ї́жа»?',
        opts: ['Like short "i" in "bit"', 'Like "yee" [ji] (with a clear "y" sound at the start)', 'Like "oo" in "moon"'],
        ans: 1,
        exp: '«Ї ї» always represents the two-sound combination "yee" [ji].',
      },
      {
        q: 'What does the apostrophe (’) do in Ukrainian words like «сім’я́» (family), «п’ять» (five), and «м’я́со» (meat)?',
        opts: [
          'It shows that a letter was deleted for slang',
          'It keeps the consonant before it unsoftened and signals a clear "y" sound on the following vowel (я, ю, є, ї)',
          'It makes the vowel silent',
        ],
        ans: 1,
        exp: 'An apostrophe separates a consonant (like м or п) from я, ю, є, or ї so you pronounce a distinct "y" glide (seem-YA, pyat, MYA-so).',
      },
    ],
    practice: [
      {
        prompt: 'Which word means "this is" and starts with the letter «Ц ц» ("ts")?',
        opts: ['що', 'це', 'ще'],
        ans: 1,
        audioUk: 'це',
        exp: '«це» (pronounced "tseh") means "this / this is / it is".',
      },
      {
        prompt: 'Choose the Ukrainian word for "family" (notice the apostrophe before -я́):',
        opts: ['сім’я́', 'земля́', 'пі́сня'],
        ans: 0,
        audioUk: 'сім’я́',
        exp: '«сім’я́» (seem-YA) means "family".',
      },
      {
        prompt: 'How is the final letter «в» pronounced at the end of «Ки́їв» (Kyiv)?',
        opts: ['Like voiceless "f"', 'Like a rounded "w" sound [w]', 'Like "p"'],
        ans: 1,
        audioUk: 'Ки́їв',
        exp: 'At the end of a word or before a consonant, Ukrainian «в» sounds like a rounded "w" [w], never "f".',
      },
      {
        prompt: 'Which word means "food" and starts with «Ї ї» ("yee")?',
        opts: ['ї́жа', 'іде́я', 'ім’я́'],
        ans: 0,
        audioUk: 'ї́жа',
        exp: '«ї́жа» (YEE-zha) means "food".',
      },
      {
        prompt: 'Which word means "nice / beautiful" and begins with the warm "h" letter «Г г»?',
        opts: ['ґа́нок', 'га́рний', 'чо́рний'],
        ans: 1,
        audioUk: 'га́рний',
        exp: '«га́рний» (HAR-nyy) means "nice, fine, or beautiful".',
      },
    ],
    vocab: [
      ['я', 'PRON', 'I', 'Я вивча́ю украї́нську.', 'I am learning Ukrainian.'],
      ['це', 'PRON', 'this / this is / it is', 'Це мій друг.', 'This is my friend.'],
      ['що', 'PRON', 'what', 'Що це?', 'What is this?'],
      ['день', 'NOUN', 'day', 'Сього́дні га́рний день.', 'Today is a nice day.'],
      ['га́рний', 'ADJ', 'beautiful / nice / fine', 'Яки́й га́рний парк!', 'What a nice park!'],
      ['сім’я́', 'NOUN', 'family', 'Це на́ша сім’я́.', 'This is our family.'],
      ['ім’я́', 'NOUN', 'first name', 'Це га́рне ім’я́.', 'This is a beautiful name.'],
      ['ї́жа', 'NOUN', 'food', 'Тут смачна́ ї́жа.', 'There is tasty food here.'],
      ['м’я́со', 'NOUN', 'meat', 'Ми купу́ємо сві́же м’я́со.', 'We are buying fresh meat.'],
      ['борщ', 'NOUN', 'borscht (Ukrainian beet soup)', 'Я ду́же люблю́ борщ.', 'I really love borscht.'],
      ['сіль', 'NOUN', 'salt', 'Ось сіль і хліб.', 'Here are salt and bread.'],
      ['ніч', 'NOUN', 'night', 'Ти́ха те́пла ніч.', 'A quiet warm night.'],
      ['п’ять', 'NUM', 'five', 'У ме́не є п’ять хвили́н.', 'I have five minutes.'],
      ['життя́', 'NOUN', 'life', 'Життя́ трива́є.', 'Life goes on.'],
      ['любо́в', 'NOUN', 'love', 'З любо́в’ю з Украї́ни.', 'With love from Ukraine.'],
    ],
    exam: [
      {
        q: 'Which Ukrainian letter represents the "shch" sound in «що» (what) and «борщ»?',
        opts: ['Ш ш', 'Ч ч', 'Щ щ'],
        ans: 2,
        exp: '«Щ щ» is pronounced as the two-sound combination "shch" [ʃtʃ].',
      },
      {
        q: 'What does the soft sign «ь» do at the end of «день» (day) and «сіль» (salt)?',
        opts: [
          'It softens (palatalizes) the consonant right before it',
          'It adds an "uh" vowel sound',
          'It makes the word plural',
        ],
        ans: 0,
        exp: 'The soft sign «ь» softens the preceding consonant without adding a separate syllable.',
      },
      {
        q: 'Which pair of words both contain the Ukrainian apostrophe (’)?',
        opts: ['сім’я́ and п’ять', 'ма́ма and та́то', 'день and ніч'],
        ans: 0,
        exp: 'Both «сім’я́» (family) and «п’ять» (five) use an apostrophe before я to keep the preceding labial consonant hard.',
      },
      {
        q: 'How is «це» (this is) pronounced?',
        opts: ['"cheh"', '"tseh"', '"seh"'],
        ans: 1,
        exp: '«Ц ц» sounds like "ts" in "cats", so «це» is pronounced "tseh".',
      },
      {
        q: 'Which letter is used for the hard "g" sound in words like «ґа́нок» (porch) and «ґу́дзик» (button)?',
        opts: ['Г г', 'Ґ ґ', 'Х х'],
        ans: 1,
        exp: '«Ґ ґ» (with the upturned hook) represents the hard "g" sound [ɡ].',
      },
      {
        q: 'What is the English meaning of «Сього́дні ду́же га́рний день»?',
        opts: ['Today is a very nice day.', 'Tomorrow is a new week.', 'Here is my family.'],
        ans: 0,
        exp: '«сього́дні» = today, «ду́же» = very, «га́рний» = nice/beautiful, «день» = day.',
      },
    ],
  },
  {
    id: 'A0.3',
    level: 'A0',
    topicTag: 'Pre-A1 Foundation • Greetings & Introductions',
    title: 'Everyday Greetings, Politeness & Introducing Yourself',
    objectives: [
      'Greet people naturally in the morning, afternoon, and evening.',
      'Choose appropriately between informal «ти» and polite/formal «Ви».',
      'Introduce yourself («Мене́ зва́ти...»), ask how someone is doing, and use essential polite expressions.',
    ],
    summary:
      'Whether you are meeting a new Ukrainian friend, walking into a café in Lviv, or joining a video call with colleagues in Kyiv, warm greetings and polite phrases open every conversation.',
    rules: [
      '<b>1. Saying Hello Throughout the Day</b>: Between friends, say <b>Приві́т!</b> (Hi!) or <b>Віта́ю!</b> (Greetings! / Hello!). For polite everyday greetings at any level of formality, use:<ul><li>Morning: <b>До́брого ра́нку!</b> (Good morning!)</li><li>Afternoon / Daytime: <b>До́брий день!</b> (Good day! / Hello!)</li><li>Evening: <b>До́брий ве́чір!</b> (Good evening!)</li></ul>',
      '<b>2. Informal «ти» vs. Polite/Plural «Ви»</b>: Ukrainian has two words for "you":<ul><li><b>ти</b> — used with friends, family members, children, and peers. (<i>Як у те́бе спра́ви?</i> = How are things with you?)</li><li><b>Ви</b> — used when speaking politely to a stranger, an older person, a client, or to more than one person. (<i>Як у Вас спра́ви?</i>)</li></ul>',
      '<b>3. Introducing Yourself</b>: To say "My name is...", Ukrainians literally say "They call me...": <b>Мене́ зва́ти...</b> (for example, <i>Мене́ зва́ти А́нна</i>). To ask someone’s name, say <b>Як тебе́ зва́ти?</b> (informal) or <b>Як Вас зва́ти?</b> (polite/formal). Reply with <b>Ду́же приє́мно!</b> (Nice to meet you!).',
      '<b>4. Essential Politeness & Saying Goodbye</b>:<ul><li><b>Дя́кую!</b> = Thank you! / <b>Ду́же дя́кую!</b> = Thank you very much!</li><li><b>Будь ла́ска</b> = Please, AND also You’re welcome! (In western Ukraine, you will also often hear <b>Про́шу!</b>).</li><li><b>Перепро́шую</b> or <b>Ви́бачте</b> = Excuse me / I’m sorry.</li><li><b>До поба́чення!</b> = Goodbye! / <b>До зу́стрічі!</b> = See you soon! / <b>На добра́ніч!</b> = Good night!</li></ul>',
      '<b>5. Polite Titles (Па́не, Па́ні, Пано́ве) & Ukrainian Patronymics (По ба́тькові)</b>:<ul><li>When addressing someone politely by title, use <b>Па́не</b> (Mr./Sir, Vocative of <i>пан</i>), <b>Па́ні</b> (Ms./Mrs./Madam — indeclinable), or the collective Vocative plural <b>Пано́ве!</b> / <b>Шано́вні па́ні та пано́ве!</b> (Ladies and gentlemen!).</li><li>In formal, academic, and official contexts, Ukrainians use a first name + <b>patronymic</b> (<b>ім’я́ по ба́тькові</b>, formed from the father’s first name): masculine <b>-ович / -йович</b> (<i>Іва́н → Іва́нович, Сергі́й → Сергі́йович</i>; Vocative: <b>Іва́новичу!</b>) and feminine <b>-івна / -ївна</b> (<i>Іва́н → Іва́нівна, Сергі́й → Сергі́ївна</i>; Vocative: <b>Іва́нівно!</b>).</li></ul>',
      '<b>6. Three Ways to State Names, Formal Introductions & «про́шу» vs. «прошу́»</b>:<ul><li><b>Stating & Asking Names</b>: In addition to <b>Мене́ зва́ти...</b>, Ukrainian uses <b>Мене́ звуть Тара́с Ко́валь</b> ("They call me Taras Koval"; <i>Його́ звуть Мико́ла, Її́ звуть Окса́на</i>) OR <b>Моє́ ім’я́ Тара́с, моє́ прі́звище Ко́валь</b> ("My first name is Taras, my surname is Koval"; question: <i>Як Ва́ше ім’я́ та прі́звище?</i>).</li><li><b>Introducing Yourself & Others</b>: In formal settings, say <b>Дозво́льте відрекомендува́тися!</b> (Allow me to introduce myself!) or <b>Дозво́льте познайо́мити: це мій коле́га</b> (Allow me to introduce: this is my colleague). With friends, say <b>Познайо́мся: це мій друг</b> (Meet my friend).</li><li><b>Stress Minimal Pair «про́шу» vs. «прошу́»</b>: Both forms come from <i>проси́ти</i>, but stress changes the meaning! <b>Про́шу!</b> (stress on the first syllable) means "please / go ahead / help yourself / you’re welcome" (<i>Про́шу заходи́ти! Про́шу сіда́ти!</i>), whereas <b>прошу́</b> (stress on the second syllable) means "I ask / I request" (<i>Я прошу́ вас зачека́ти</i>).</li></ul>',
      '<b>7. Standard vs. Regional/Diaspora Greetings («Як ся ма́єш?»), Language Adverbials & Phone Etiquette</b>:<ul><li><b>Asking "How are you?" Across Regions</b>: Standard literary Ukrainian uses <b>Як у те́бе (у Вас) спра́ви?</b> or <b>Як пожива́єш (пожива́єте)?</b>. In Western Ukraine (Galicia) and the North American Ukrainian diaspora, you will also frequently hear the warm greeting <b>Як ся ма́єш?</b> (informal) / <b>Як ся ма́єте?</b> (formal/plural), where the reflexive particle <i>ся</i> stands independently before the verb!</li><li><b>Speaking a Language</b>: Standard Ukrainian expresses "in Ukrainian / in English" with the Instrumental case (<b>розмовля́ти украї́нською мо́вою / англі́йською мо́вою</b>) or the adverb in <b>-ськи</b> (<b>говори́ти по-украї́нськи / по-англі́йськи</b>), whereas older diaspora speech often uses <i>по-украї́нському / по-англі́йському</i>.</li><li><b>Phone & Parting Expressions</b>: Answer the phone with <b>Алло́! Слу́хаю!</b> ("Hello! I’m listening!"); reply to <i>Дя́кую</i> with <b>Будь ла́ска!</b>, <b>Про́шу!</b>, or <b>Нема́ за що!</b> ("Don’t mention it! / Not at all!"); and wish someone well at parting with <b>На все до́бре!</b> or <b>Усього́ найкра́щого!</b> ("All the best!").</li></ul>',
      '<b>8. Transitioning from «Ви» to «ти» («перейти́ на ти»), Full Telephone Etiquette & Tag Questions («..., так?»)</b>:<ul><li><b>Social Etiquette of «перейти́ на ти»</b>: When two adults meet in professional or formal life, they address each other with polite <b>Ви</b> (and often first name + patronymic: <i>Іри́но Васи́лівно</i>). Moving to informal <b>ти</b> and first-name basis is a meaningful social milestone called <b>перейти́ на «ти»</b> (<i>Ми вже перейшли́ на «ти»</i>), which by etiquette is always initiated by the older person, the senior colleague, or the host: <b>Дава́йте пере́йдемо на «ти»!</b> ("Let’s switch to <i>ти</i>!").</li><li><b>Complete Telephone Formulas</b>:<ul><li>Identifying yourself politely on the phone: <b>Це Вас турбу́є Джон</b> ("This is John bothering/calling you") or <b>Це гово́рить Іри́на</b> ("This is Iryna speaking").</li><li>Asking for someone on the line (Accusative/Genitive after <i>попроси́ти</i>): <b>Чи мо́жна попроси́ти до телефо́ну па́ні Малярчу́к / па́на Малярчука́?</b> ("May I ask for Ms. Maliarchuk / Mr. Maliarchuk to come to the phone?").</li><li>Asking the caller to hold & closing: <b>Одну́ хвили́ночку, будь ла́ска!</b> ("Just one moment, please!"), <b>Переда́йте, будь ла́ска, приві́т Іва́нові</b> ("Please pass on my regards to Ivan"), and <b>Дя́кую за дзвіно́к!</b> ("Thank you for the call!").</li></ul></li><li><b>Conversational Tag Questions («..., так?»)</b>: To turn any statement into a natural confirmation question ("...isn’t she? / ...aren’t you? / ...right?"), simply add a comma and <b>так?</b> (or <b>пра́вда?</b>) with rising intonation at the end: <b>Ві́ра украї́нка, так?</b> ("Vira is Ukrainian, isn’t she?"), <b>Ви сього́дні працю́єте вдо́ма, так?</b></li></ul>',
    ],
    examples: [
      { uk: 'До́брого ра́нку! Мене́ зва́ти Оле́ксaндр. А як Вас зва́ти?', en: 'Good morning! My name is Oleksandr. And what is your name?' },
      { uk: 'Приві́т, Окса́но! Як у те́бе спра́ви? — Дя́кую, все до́бре!', en: 'Hi, Oksana! How are things with you? — Thank you, everything is good!' },
      { uk: 'Перепро́шую, де тут кав’я́рня? — Ось там. — Ду́же дя́кую!', en: 'Excuse me, where is the coffee shop here? — Right over there. — Thank you very much!' },
      { uk: 'До поба́чення, па́ні Оле́но Іва́нівно! Гарно́го вам дня!', en: 'Goodbye, Ms. Olena Ivanivna! Have a nice day!' },
      { uk: 'Дозво́льте відрекомендува́тися: моє́ ім’я́ Петро́, а моє́ прі́звище Ко́валь. Про́шу сіда́ти!', en: 'Allow me to introduce myself: my first name is Petro, and my surname is Koval. Please have a seat!' },
      { uk: 'Як пожива́єте? (У діа́спорі та Галичині́: Як ся ма́єте?) — Дя́кую, чу́дово! На все до́бре!', en: 'How are you doing? (In the diaspora and Galicia: Як ся ма́єте?) — Thank you, wonderfully! All the best!' },
      { uk: 'Алло́! Це Вас турбу́є Марко́. Чи мо́жна попроси́ти до телефо́ну па́ні Малярчу́к? — Одну́ хвили́ночку! До ре́чі, ми вже перейшли́ на «ти», так?', en: 'Hello! This is Marko calling you. May I ask for Ms. Maliarchuk to come to the phone? — One moment! By the way, we have already switched to «ти», haven’t we?' },
    ],
    dialogue: {
      title: 'Meeting Someone New in Kyiv',
      lines: [
        { speaker: 'Андрі́й', uk: 'До́брий день! Мене́ зва́ти Андрі́й. А як Вас зва́ти?', en: 'Good day! My name is Andriy. And what is your name?' },
        { speaker: 'Софі́я', uk: 'До́брий день! Мене́ зва́ти Софі́я. Ду́же приє́мно!', en: 'Good day! My name is Sofiya. Very nice to meet you!' },
        { speaker: 'Андрі́й', uk: 'Мені́ тако́ж ду́же приє́мно! Зві́дки Ви?', en: 'Nice to meet you too! Where are you from?' },
        { speaker: 'Софі́я', uk: 'Я з Кана́ди, але́ за́раз я живу́ тут, у Ки́єві.', en: 'I am from Canada, but right now I live here in Kyiv.' },
      ],
    },
    activeRecall: [
      { promptEn: 'Good morning!', answerUk: 'До́брого ра́нку!', hint: 'Two words: До́брого + ра́нку' },
      { promptEn: 'My name is...', answerUk: 'Мене́ зва́ти...', hint: 'Literally "They call me..."' },
      { promptEn: 'Thank you very much!', answerUk: 'Ду́же дя́кую!', hint: 'Ду́же (very) + дя́кую (I thank)' },
      { promptEn: 'Please / You’re welcome', answerUk: 'будь ла́ска', hint: 'Two words used for both "please" and "you’re welcome"' },
    ],
    reviewSummary:
      'Use Приві́т! with friends and До́брого ра́нку! / До́брий день! / До́брий ве́чір! in any situation. Introduce yourself with Мене́ зва́ти..., say thank you with Дя́кую, and use Будь ла́ска for both "please" and "you’re welcome".',
    cfu: [
      {
        q: 'How do you say "My name is Olena" in natural Ukrainian?',
        opts: ['Я є зва́ти Оле́на.', 'Мене́ зва́ти Оле́на.', 'Мій зва́ти Оле́на.'],
        ans: 1,
        exp: '«Мене́ зва́ти...» is the natural Ukrainian expression for "My name is..." (literally "They call me...").',
      },
      {
        q: 'When should you address one person as «Ви» instead of «ти»?',
        opts: [
          'When speaking to a close childhood friend or a pet',
          'When speaking politely to a stranger, an older person, or in a formal setting',
          'Only when speaking in the morning',
        ],
        ans: 1,
        exp: '«Ви» is used both for addressing a group ("you all") and as the polite/formal "you" for one person.',
      },
      {
        q: 'Which two meanings does the phrase «будь ла́ска» have in everyday Ukrainian?',
        opts: [
          '"Hello" and "Goodbye"',
          '"Please" and "You’re welcome"',
          '"Good morning" and "Good night"',
        ],
        ans: 1,
        exp: '«Будь ла́ска» is used both when making a polite request ("please") and when replying to «дя́кую» ("you’re welcome").',
      },
    ],
    practice: [
      {
        prompt: 'It is 8:30 AM and you walk into a bakery. How do you greet the baker?',
        opts: ['До́брий ве́чір!', 'До́брого ра́нку!', 'На добра́ніч!'],
        ans: 1,
        audioUk: 'До́брого ра́нку!',
        exp: '«До́брого ра́нку!» means "Good morning!".',
      },
      {
        prompt: 'You want to politely get someone’s attention on the street to ask a question. Which word do you use?',
        opts: ['Перепро́шую', 'До поба́чення', 'На добра́ніч'],
        ans: 0,
        audioUk: 'Перепро́шую',
        exp: '«Перепро́шую» (or «Ви́бачте») means "Excuse me / Pardon me".',
      },
      {
        prompt: 'Someone says «Ду́же приє́мно!» after you introduce yourself. What are they saying?',
        opts: ['See you tomorrow!', 'Very nice to meet you!', 'What time is it?'],
        ans: 1,
        audioUk: 'Ду́же приє́мно!',
        exp: '«Ду́же приє́мно!» means "Very pleasant! / Nice to meet you!".',
      },
      {
        prompt: 'How do you ask a friend "How are things?" in Ukrainian?',
        opts: ['Як спра́ви?', 'Де вокза́л?', 'Хто це?'],
        ans: 0,
        audioUk: 'Як спра́ви?',
        exp: '«Як спра́ви?» (or «Як у те́бе спра́ви?») is the standard way to ask "How are things? / How are you?".',
      },
      {
        prompt: 'Choose the standard polite way to say "Goodbye!" in Ukrainian:',
        opts: ['Приві́т!', 'До поба́чення!', 'Будь ла́ска!'],
        ans: 1,
        audioUk: 'До поба́чення!',
        exp: '«До поба́чення!» means "Goodbye!" (literally "Until we see each other!").',
      },
    ],
    vocab: [
      ['приві́т', 'PHRASE', 'hi / hello (informal)', 'Приві́т! Як спра́ви?', 'Hi! How are things?'],
      ['віта́ю', 'VERB', 'hello / greetings / congratulations', 'Віта́ю вас у Ки́єві!', 'Welcome / Greetings to you in Kyiv!'],
      ['до́брого ра́нку', 'PHRASE', 'good morning', 'До́брого ра́нку, дру́зі!', 'Good morning, friends!'],
      ['до́брий день', 'PHRASE', 'good day / hello', 'До́брий день! Чим мо́жу допомогти́?', 'Good day! How can I help?'],
      ['до́брий ве́чір', 'PHRASE', 'good evening', 'До́брий ве́чір! Ра́дий вас ба́чити.', 'Good evening! Glad to see you.'],
      ['на добра́ніч', 'PHRASE', 'good night', 'На добра́ніч! До за́втра.', 'Good night! See you tomorrow.'],
      ['мене́ зва́ти', 'PHRASE', 'my name is...', 'Мене́ зва́ти Марі́я.', 'My name is Mariya.'],
      ['ду́же приє́мно', 'PHRASE', 'very nice to meet you', 'Ду́же приє́мно познайо́митися!', 'Very nice to meet you!'],
      ['як спра́ви', 'PHRASE', 'how are things? / how are you?', 'Приві́т! Як у те́бе спра́ви?', 'Hi! How are things with you?'],
      ['дя́кую', 'VERB', 'thank you', 'Ду́же дя́кую за ка́ву!', 'Thank you very much for the coffee!'],
      ['будь ла́ска', 'PHRASE', 'please / you’re welcome', 'Прохо́дьте, будь ла́ска.', 'Come in, please.'],
      ['перепро́шую', 'VERB', 'excuse me / pardon me', 'Перепро́шую, чи це мі́сце ві́льне?', 'Excuse me, is this seat free?'],
      ['ви́бачте', 'VERB', 'excuse me / forgive me (formal)', 'Ви́бачте, я тро́хи запізни́вся.', 'Excuse me, I am a little late.'],
      ['до поба́чення', 'PHRASE', 'goodbye', 'До поба́чення! Гарно́го ве́чора!', 'Goodbye! Have a nice evening!'],
      ['до зу́стрічі', 'PHRASE', 'see you soon / until next time', 'Дя́кую за розмо́ву, до зу́стрічі!', 'Thanks for the chat, see you soon!'],
    ],
    exam: [
      {
        q: 'Which greeting should you use at 7:00 PM in the evening?',
        opts: ['До́брого ра́нку!', 'До́брий ве́чір!', 'На добра́ніч!'],
        ans: 1,
        exp: '«До́брий ве́чір!» means "Good evening!". («На добра́ніч!» is used when going to sleep.)',
      },
      {
        q: 'How do you politely ask an older person or stranger what their name is?',
        opts: ['Як Вас зва́ти?', 'Як тебе́ зва́ти?', 'Мене́ зва́ти?'],
        ans: 0,
        exp: '«Як Вас зва́ти?» uses the polite pronoun «Вас» (you).',
      },
      {
        q: 'What does «Дя́кую, все до́бре!» mean?',
        opts: ['Excuse me, where is it?', 'Thank you, everything is good!', 'Please speak slowly.'],
        ans: 1,
        exp: '«дя́кую» = thank you, «все» = everything, «до́бре» = good/well.',
      },
      {
        q: 'Which informal greeting is best for saying "Hi!" to a close friend?',
        opts: ['Приві́т!', 'До поба́чення!', 'Ви́бачте!'],
        ans: 0,
        exp: '«Приві́т!» is the warm, informal way to say "Hi!".',
      },
      {
        q: 'What does «До зу́стрічі!» mean when parting?',
        opts: ['Good morning!', 'See you soon! / Until we meet again!', 'What is your name?'],
        ans: 1,
        exp: '«До зу́стрічі!» literally means "Until the meeting!" ("See you soon!").',
      },
      {
        q: 'Complete the polite request: «Да́йте, ________, ка́ву.» ("Give me a coffee, please.")',
        opts: ['будь ла́ска', 'до поба́чення', 'приві́т'],
        ans: 0,
        exp: '«будь ла́ска» means "please".',
      },
    ],
  },
  {
    id: 'A0.4',
    level: 'A0',
    topicTag: 'Pre-A1 Foundation • Sentences, Questions & Numbers',
    title: 'Simple Sentences, Questions, Negation & Numbers 1–10',
    objectives: [
      'Build simple Ukrainian sentences without needing "am / is / are" or "a / the".',
      'Ask everyday questions using Хто?, Що?, Де?, Коли́?, Як?, and the yes/no word Чи.',
      'Make negative sentences with не and count from 1 to 10.',
    ],
    summary:
      'Building your first sentences in Ukrainian is remarkably direct: Ukrainian has no articles ("a", "an", "the") and usually leaves out "am / is / are" in the present tense. With a handful of question words and numbers 1–10, you can start exchanging real information right away.',
    rules: [
      '<b>1. No "a / the" and No Present-Tense "am / is / are"</b>: Ukrainian does not use articles like "a" or "the". And in the present tense, "am / is / are" is simply omitted!<ul><li><b>Я студе́нт.</b> = I (am a) student.</li><li><b>Це ка́ва.</b> = This (is) coffee.</li><li><b>Ка́ва гаря́ча.</b> = (The) coffee (is) hot.</li><li>When defining one noun with another noun in writing, a long dash (<b>—</b>) is often placed where "is" would be: <b>Ки́їв — столи́ця Украї́ни.</b> (Kyiv is the capital of Ukraine.)</li></ul>',
      '<b>2. Essential Question Words</b>:<ul><li><b>Хто?</b> = Who? (<i>Хто це?</i> — Who is this?)</li><li><b>Що?</b> = What? (<i>Що це?</i> — What is this?)</li><li><b>Де?</b> = Where? (<i>Де метро́?</i> — Where is the subway?)</li><li><b>Коли́?</b> = When? (<i>Коли́ уро́к?</i> — When is the lesson?)</li><li><b>Як?</b> = How? / <b>Скі́льки?</b> = How much / How many?</li></ul>',
      '<b>3. Yes/No Questions & Negation with «не»</b>: You can turn any statement into a yes/no question simply by raising your voice at the end (<i>Ти вдо́ма?</i> = Are you at home?), OR by putting the question word <b>Чи</b> at the beginning: <b>Чи це ві́льне мі́сце?</b> (Is this seat free?). To make a sentence negative, place <b>не</b> right before the word you are negating: <b>Це не чай, це ка́ва.</b> (This is not tea, this is coffee.) / <b>Я не зна́ю.</b> (I do not know.)',
      '<b>4. Counting from 1 to 10 (plus Teens 11–19 & Tens 20–100)</b>:<ul><li><b>Digits 1–10</b>: 1 — <b>оди́н</b> (m.) / <b>одна́</b> (f.) / <b>одне́</b> (n.); 2 — <b>два</b> (m./n.) / <b>дві</b> (f.); 3 — <b>три</b>; 4 — <b>чоти́ри</b>; 5 — <b>п’ять</b>; 6 — <b>шість</b>; 7 — <b>сім</b>; 8 — <b>ві́сім</b>; 9 — <b>де́в’ять</b>; 10 — <b>де́сять</b>.</li><li><b>Teens (11–19 — Contraction of «на де́сять» = "on ten" → -на́дцять)</b>: 11 — <b>одина́дцять</b>, 12 — <b>двана́дцять</b>, 13 — <b>трина́дцять</b>, 14 — <b>чотирна́дцять</b>, 15 — <b>п’ятна́дцять</b>, 16 — <b>шістна́дцять</b> (note <i>шість</i> drops <i>ь</i>), 17 — <b>сімна́дцять</b>, 18 — <b>вісімна́дцять</b>, 19 — <b>дев’ятна́дцять</b> (note <i>п’ять / де́в’ять</i> drop <i>ь</i> before <i>-надцять</i>!).</li><li><b>Tens (20–100)</b>: 20 — <b>два́дцять</b>, 30 — <b>три́дцять</b>, 40 — <b>со́рок</b>, 50 — <b>п’ятдеся́т</b>, 60 — <b>шістдеся́т</b>, 70 — <b>сімдеся́т</b>, 80 — <b>вісімдеся́т</b> (notice that 50–80 end in hard <b>-т</b> without a soft sign!), 90 — <b>дев’яно́сто</b>, 100 — <b>сто</b>. Compound numbers simply place the unit right after the ten with no hyphen or "and": 21 — <b>два́дцять оди́н</b>, 26 — <b>два́дцять шість</b>, 45 — <b>со́рок п’ять</b>.</li></ul>',
      '<b>5. How Word Order Expresses English "The" vs. "A / An"</b>: Even though Ukrainian has no articles, word order shows whether a person or thing is already known ("the") or brand-new ("a/an"):<ul><li><b>Known / Definite ("The") — Subject at the Start</b>: <b>Хло́пчик чека́є на вас.</b> = <i>The</i> boy is waiting for you.</li><li><b>New / Indefinite ("A / An") — Subject at the End</b>: <b>На вас чека́є хло́пчик.</b> = <i>A</i> boy is waiting for you.</li><li>When you want extra emphasis, use <b>цей / той</b> ("this / that") for a specific item or <b>оди́н / яки́йсь</b> ("one / some") for an unspecified one.</li></ul>',
      '<b>6. The Three Roles of «чи», Expressive «хіба́», Conditional «якщо́» & Contrastive «А»</b>:<ul><li><b>Three Distinct Jobs of «чи»</b>:<ul><li><b>1) Yes/No Question Particle</b> at the start of a sentence: <b>Чи ти готу́єш обі́д?</b> (Are you cooking lunch?);</li><li><b>2) "Or" in Questions & Choices</b>: <b>Ти бу́деш чай чи ка́ву?</b> (Will you have tea or coffee?);</li><li><b>3) "Whether / If" in Indirect Questions</b>: <b>Я не зна́ю, чи він сього́дні вдо́ма</b> (I don’t know whether/if he is at home today).</li></ul></li><li><b>Never Confuse Indirect «чи» ("whether") with Conditional «якщо́» ("if")</b>: Use <b>чи</b> when asking or wondering <i>whether</i> something is true, and <b>якщо́</b> for a real condition ("in the event that"): <b>Якщо́ ма́тимеш час, зателефону́й мені́</b>.</li><li><b>Rhetorical «хіба́» & Contrastive «А»</b>: Start a surprised question with <b>Хіба́...?</b> ("Really? / Can it be that...?" — <i>Хіба́ ти ще не зна́єш?</i>) and a follow-up pivot question with <b>А...?</b> ("And what about...?" — <i>Це стіл. А це що? Я студе́нт. А ти?</i>).</li></ul>',
      '<b>7. Emphatic «є» vs. Pointing Adverbs («ось / он»), Correlative Conjunctions («і... і, або́... або́, ні... ні»), & Spatial Adverbs («де / куди́ / зві́дки»)</b>:<ul><li><b>Statement of Fact vs. Emphatic «є» vs. Pointing «ось / он»</b>:<ul><li>In ordinary statements of location, <b>є</b> is omitted: <b>Він тут. Вони́ вдо́ма.</b> (He is here. They are at home.)</li><li>When you want to strongly emphasize that someone or something <i>is indeed</i> somewhere, include <b>є</b>: <b>Він є тут! Вони́ є вдо́ма!</b> (He <i>is</i> here! They <i>are</i> at home!)</li><li>With the emphatic pointing adverbs <b>ось</b> ("right here!") and <b>он</b> ("right over there!"), <b>є</b> is always omitted: <b>Ось вона́!</b> (Here she is!), <b>Он вони́!</b> (There they are!).</li></ul></li><li><b>Correlative Conjunctions</b>:<ul><li><b>і ... і</b> = both ... and (<i>І він і вона́ звичайно вдо́ма</i>)</li><li><b>або́ ... або́</b> = either ... or (<i>Він або́ тут, або́ надво́рі</i>)</li><li><b>ні ... ні (+ не before verb!)</b> = neither ... nor (<i>Вона́ ні тут, ні вдо́ма; Він ні чита́є, ні пи́ше</i>).</li></ul></li><li><b>The Spatial Adverb Triad (Location «де?» vs. Motion «куди́?» vs. Origin «зві́дки?»)</b>:<ul><li><b>Static Location (Де? — Where at?)</b>: <b>тут</b> (here), <b>там</b> (there), <b>ніде́</b> (nowhere), <b>десь</b> (somewhere), <b>удо́ма / вдо́ма</b> (at home), <b>надво́рі</b> (outdoors / outside).</li><li><b>Directional Motion (Куди́? — Where to?)</b>: <b>сюди́</b> (hither / to here), <b>туди́</b> (thither / to there), <b>ніку́ди</b> (to nowhere), <b>куди́сь</b> (to somewhere), <b>додо́му</b> (homeward), <b>надві́р</b> (to the outdoors: <i>Ді́ти біжа́ть надві́р</i>).</li><li><b>Origin (Зві́дки? — Where from?)</b>: <b>зві́дси</b> (from here), <b>зві́дти</b> (from there).</li></ul></li></ul>',
    ],
    examples: [
      { uk: 'Хто це? — Це мій друг Тара́с. Він лі́кар.', en: 'Who is this? — This is my friend Taras. He is a doctor.' },
      { uk: 'Це не готе́ль, це музе́й.', en: 'This is not a hotel, this is a museum.' },
      { uk: 'Перепро́шую, де тут авто́бус но́мер вісімна́дцять?', en: 'Excuse me, where is bus number eighteen here?' },
      { uk: 'Да́йте, будь ла́ска, один чай і дві ка́ви. — Ра́зом вісімдеся́т п’ять гри́вень.', en: 'Please give me one tea and two coffees. — Together eighty-five hryvnias.' },
      { uk: 'Хло́пчик чека́є на вас. / На вас чека́є хло́пчик.', en: 'The boy is waiting for you (known). / A boy is waiting for you (new).' },
      { uk: 'Чи ви бу́дете чай чи ка́ву? Я ще не зна́ю, чи ма́тиму час.', en: 'Will you have tea or coffee? I don’t know yet whether I will have time (all three uses of чи).' },
      { uk: 'Ось вона́, і он вони́! Ді́ти за́раз надво́рі, а по́тім іду́ть сюди́ додо́му.', en: 'Here she is (ось вона́), and there they are (он вони́)! The children are outside (надво́рі) right now, and afterwards they are coming here (сюди́) homeward (додо́му).' },
    ],
    dialogue: {
      title: 'Asking Quick Questions in the City',
      lines: [
        { speaker: 'Марко́', uk: 'Перепро́шую, чи це ву́лиця Шевче́нка?', en: 'Excuse me, is this Shevchenko Street?' },
        { speaker: 'Іри́на', uk: 'Ні, це не ву́лиця Шевче́нка. Це пло́ща Ри́нок.', en: 'No, this is not Shevchenko Street. This is Rynok Square.' },
        { speaker: 'Марко́', uk: 'А де туристи́чний центр?', en: 'And where is the tourist center?' },
        { speaker: 'Іри́на', uk: 'Він о́сь там, буди́нок но́мер сім.', en: 'It is right over there, building number seven.' },
      ],
    },
    activeRecall: [
      { promptEn: 'Who is this?', answerUk: 'Хто це?', hint: 'Хто (who) + це (this is)' },
      { promptEn: 'I do not know.', answerUk: 'Я не зна́ю.', hint: 'Я + не (not) + зна́ю (know)' },
      { promptEn: 'Where is the subway?', answerUk: 'Де метро́?', hint: 'Де (where) + метро́' },
      { promptEn: 'one, two, three', answerUk: 'оди́н, два, три', hint: 'First three numbers in Ukrainian' },
    ],
    reviewSummary:
      'In present-tense Ukrainian, omit "am / is / are" (Це ка́ва = This is coffee). Place не before a word to negate it (Це не чай). Use Хто? (Who?), Що? (What?), Де? (Where?), Коли́? (When?), and Чи...? for yes/no questions.',
    cfu: [
      {
        q: 'Why does the Ukrainian sentence «Вона́ студе́нтка» ("She is a student") only have two words?',
        opts: [
          'Because Ukrainian omits both articles ("a/the") and present-tense "am/is/are"',
          'Because "вона́" means "she is a"',
          'Because it is a question',
        ],
        ans: 0,
        exp: 'Ukrainian has no articles ("a/an/the") and omits "am/is/are" in normal present-tense statements.',
      },
      {
        q: 'Which question word do you use to ask about a person ("Who is this?") vs. a thing ("What is this?")?',
        opts: [
          '«Де це?» for a person and «Коли́ це?» for a thing',
          '«Хто це?» for a person and «Що це?» for a thing',
          '«Чи це?» for both',
        ],
        ans: 1,
        exp: '«Хто?» means "Who?" (for people) and «Що?» means "What?" (for things).',
      },
      {
        q: 'What does the word «Чи» do at the start of «Чи ти вдо́ма?»?',
        opts: [
          'It turns the sentence into a clear yes/no question ("Are you at home?")',
          'It makes the sentence negative',
          'It means "because"',
        ],
        ans: 0,
        exp: 'Placing «Чи» at the start of a statement is a clean, polite way to form a yes/no question.',
      },
    ],
    practice: [
      {
        prompt: 'Translate "I do not understand" into Ukrainian:',
        opts: ['Я розумі́ю не.', 'Я не розумі́ю.', 'Не я розумі́ю.'],
        ans: 1,
        audioUk: 'Я не розумі́ю.',
        exp: 'Place the negation particle «не» directly before the verb: «Я не розумі́ю».',
      },
      {
        prompt: 'You want to ask "Where is the hotel?". Which sentence is correct?',
        opts: ['Хто готе́ль?', 'Де готе́ль?', 'Коли́ готе́ль?'],
        ans: 1,
        audioUk: 'Де готе́ль?',
        exp: '«Де?» means "Where?", so «Де готе́ль?» means "Where is the hotel?".',
      },
      {
        prompt: 'Which sequence shows the numbers 3, 4, 5 in Ukrainian?',
        opts: ['оди́н, два, три', 'три, чоти́ри, п’ять', 'шість, сім, ві́сім'],
        ans: 1,
        audioUk: 'три, чоти́ри, п’ять',
        exp: '«три» = 3, «чоти́ри» = 4, «п’ять» = 5.',
      },
      {
        prompt: 'Why do we say «два квитки́» (two tickets) but «дві ка́ви» (two coffees)?',
        opts: [
          'Because the number 2 changes to «дві» for feminine nouns like ка́ва',
          'Because coffee is uncountable',
          'Because «дві» means three',
        ],
        ans: 0,
        audioUk: 'два квитки́, дві ка́ви',
        exp: 'The number 1 (оди́н / одна́ / одне́) and the number 2 (два for masculine/neuter, дві for feminine) match the gender of the noun.',
      },
      {
        prompt: 'How do you ask "How much does this cost?" in a shop?',
        opts: ['Скі́льки це ко́штує?', 'Хто це ко́штує?', 'Коли́ це?'],
        ans: 0,
        audioUk: 'Скі́льки це ко́штує?',
        exp: '«Скі́льки?» means "How much / How many?", and «ко́штує» means "costs".',
      },
    ],
    vocab: [
      ['хто', 'PRON', 'who', 'Хто цей чолові́к?', 'Who is this man?'],
      ['де', 'ADV', 'where', 'Де тут апте́ка?', 'Where is the pharmacy here?'],
      ['коли́', 'ADV', 'when', 'Коли́ наш по́їзд?', 'When is our train?'],
      ['скі́льки', 'ADV', 'how much / how many', 'Скі́льки це ко́штує?', 'How much does this cost?'],
      ['чи', 'PART', 'yes/no question particle / or', 'Чи ви говори́те англі́йською?', 'Do you speak English?'],
      ['не', 'PART', 'not', 'Це не мій ключ.', 'This is not my key.'],
      ['оди́н', 'NUM', 'one (f. одна́, n. одне́)', 'Оди́н квито́к, будь ла́ска.', 'One ticket, please.'],
      ['два', 'NUM', 'two (f. дві)', 'Два дні і дві но́чі.', 'Two days and two nights.'],
      ['три', 'NUM', 'three', 'Три ча́шки ча́ю.', 'Three cups of tea.'],
      ['чоти́ри', 'NUM', 'four', 'Чоти́ри кімна́ти.', 'Four rooms.'],
      ['шість', 'NUM', 'six', 'Шість годи́н.', 'Six hours / six o’clock.'],
      ['сім', 'NUM', 'seven', 'Но́мер сім.', 'Number seven.'],
      ['ві́сім', 'NUM', 'eight', 'Ві́сім гри́вень.', 'Eight hryvnias.'],
      ['де́в’ять', 'NUM', 'nine', 'Де́в’ять хвили́н.', 'Nine minutes.'],
      ['де́сять', 'NUM', 'ten', 'Де́сять слів.', 'Ten words.'],
    ],
    exam: [
      {
        q: 'Choose the correct Ukrainian translation of "This is not tea, this is coffee":',
        opts: ['Це не чай, це ка́ва.', 'Не це чай, ка́ва це.', 'Чи це чай, чи ка́ва.'],
        ans: 0,
        exp: '«Це не чай, це ка́ва» puts «не» directly before «чай».',
      },
      {
        q: 'Which number is «ві́сім»?',
        opts: ['6', '7', '8'],
        ans: 2,
        exp: '«шість» = 6, «сім» = 7, «ві́сім» = 8.',
      },
      {
        q: 'Which question word means "When?"',
        opts: ['Де?', 'Коли́?', 'Хто?'],
        ans: 1,
        exp: '«Коли́?» means "When?".',
      },
      {
        q: 'Why do we say «одна́ кни́жка» (one book) instead of «оди́н кни́жка»?',
        opts: [
          'Because «кни́жка» ends in -а (feminine), so "one" takes the feminine form «одна́»',
          'Because «одна́» means "two"',
          'Because books are plural',
        ],
        ans: 0,
        exp: 'In Ukrainian, "one" matches the noun’s gender: оди́н (masculine), одна́ (feminine), одне́ (neuter).',
      },
      {
        q: 'What does «Чи мо́жна меню́?» mean in a restaurant?',
        opts: ['Where is the restaurant?', 'May I have the menu?', 'I do not have a menu.'],
        ans: 1,
        exp: '«Чи мо́жна...?» is a very useful polite phrase meaning "May I have...? / Is it possible to...?".',
      },
      {
        q: 'Which number is written with an apostrophe in Ukrainian?',
        opts: ['де́в’ять (9)', 'ві́сім (8)', 'де́сять (10)'],
        ans: 0,
        exp: 'Both «п’ять» (5) and «де́в’ять» (9) have an apostrophe before я.',
      },
    ],
  },
  {
    id: 'A1.1',
    level: 'A1',
    topicTag: 'A1 Beginner • Gender, Plurals & Adjectives',
    title: 'Noun Gender, Plurals & Describing Things with Adjectives',
    objectives: [
      'Identify whether a Ukrainian noun is Masculine, Feminine, or Neuter just by looking at its ending.',
      'Form basic plural nouns.',
      'Match adjectives (like нови́й, нова́, нове́, нові́) and possessives (мій, моя́, моє́, мої́) to the noun they describe.',
    ],
    summary:
      'In Ukrainian, every noun belongs to one of three grammatical genders: Masculine, Feminine, or Neuter. The good news is that you almost never have to guess a noun’s gender—the last letter of the word tells you right away!',
    rules: [
      '<b>1. How to Tell Noun Gender by the Ending</b>:<ul><li><b>Masculine</b>: Most nouns ending in a <b>consonant</b> or <b>-й</b> are masculine: <b>стіл</b> (table), <b>парк</b> (park), <b>друг</b> (friend), <b>чай</b> (tea), <b>музе́й</b> (museum). (Note: words for male family members like <b>та́то</b> "dad" and <b>ба́тько</b> "father" are also masculine!)</li><li><b>Feminine</b>: Most nouns ending in <b>-а</b> or <b>-я</b> are feminine: <b>кни́жка</b> (book), <b>ка́ва</b> (coffee), <b>ву́лиця</b> (street), <b>пі́сня</b> (song).</li><li><b>Neuter</b>: Nouns ending in <b>-о</b>, <b>-е</b>, or a doubled consonant + <b>-я</b> are neuter: <b>мі́сто</b> (city), <b>вікно́</b> (window), <b>мо́ре</b> (sea), <b>життя́</b> (life), <b>пита́ння</b> (question).</li></ul>',
      '<b>2. Matching Adjectives to Noun Gender</b>: In the dictionary, adjectives are listed in their masculine form ending in <b>-ий</b> (or soft <b>-ій</b>). When describing a feminine, neuter, or plural noun, simply swap the ending:<ul><li>Masculine (<b>-ий / -ій</b>): <b>нови́й буди́нок</b> (a new building), <b>си́ній авто́бус</b> (a blue bus)</li><li>Feminine (<b>-а / -я</b>): <b>нова́ кни́жка</b> (a new book), <b>си́ня су́кня</b> (a blue dress)</li><li>Neuter (<b>-е / -є</b>): <b>нове́ мі́сто</b> (a new city), <b>си́нє не́бо</b> (a blue sky)</li><li>Plural for ALL genders (<b>-і</b>): <b>нові́ буди́нки / книжки́ / міста́</b> (new buildings / books / cities)</li></ul>',
      '<b>3. Matching "My", "Your", and "This"</b>: Possessive words like <b>мій</b> (my), <b>твій</b> (your), <b>наш</b> (our), and <b>цей</b> (this) follow the exact same gender pattern:<ul><li>Masculine: <b>мій телефон́</b>, <b>цей стіл</b>, <b>наш парк</b></li><li>Feminine: <b>моя́ су́мка</b>, <b>ця ву́лиця</b>, <b>на́ша шко́ла</b></li><li>Neuter: <b>моє́ мі́сце</b>, <b>це вікно́</b>, <b>на́ше мі́сто</b></li><li>Plural: <b>мої́ дру́зі</b>, <b>ці квитки́</b>, <b>на́ші пла́ни</b></li></ul>',
      '<b>4. Making Nouns Plural</b>: Most masculine and feminine nouns form their plural with <b>-и</b> (hard) or <b>-і</b> (soft): <i>парк → па́рки, квито́к → квитки́, кни́жка → книжки́, ву́лиця → ву́лиці</i>. Neuter nouns in <i>-о</i> change to <b>-а</b> in the plural: <i>мі́сто → міста́, вікно́ → ві́кна</i>.',
      '<b>5. Watch Out: Singular vs. Plural Mismatches with English!</b>:<ul><li><b>Singular-Only in Ukrainian (where English uses plural)</b>: <b>о́дяг</b> (clothes — masculine singular: <i>мій те́плий о́дяг</i>), <b>взуття́</b> (footwear — neuter singular), and collective produce nouns like <b>карто́пля</b> (potatoes), <b>мо́рква</b> (carrots), <b>цибу́ля</b> (onions), <b>зе́лень</b> (greens), and <b>сміття́</b> (trash).</li><li><b>Plural-Only in Ukrainian (where English uses singular)</b>: <b>гро́ші</b> (money — always plural: <i>Де мої́ гро́ші?</i>), <b>кані́кули</b> (school vacation), <b>вершки́</b> (cream), <b>парфу́ми</b> (perfume), <b>ша́хи</b> (chess), <b>две́рі</b> (door), <b>воро́та</b> (gate), plus paired items like <b>окуля́ри</b> (glasses), <b>штани́</b> (trousers), and <b>но́жиці</b> (scissors).</li><li><b>Countable in Ukrainian</b>: <b>пора́да → пора́ди</b> (a piece of advice / advices) and <b>новина́ → нови́ни</b> (a piece of news / news).</li></ul>',
      '<b>6. Non-Typical Gender Nouns, Essential Irregular Plurals & Profession Gender Pairs</b>:<ul><li><b>Non-Typical Gender Endings</b>: Nouns denoting male people that end in <b>-о, -а, -я</b> are grammatically <b>Masculine</b> and take masculine adjectives: <b>мій дя́дько</b> (my uncle), <b>діду́сь Мико́ла</b>, <b>справедли́вий суддя́</b> (a fair judge), <b>завзя́тий риба́лка</b> (an avid fisherman). Conversely, 3rd-declension nouns ending in a soft consonant or sibilant—such as <b>ніч</b> (night), <b>річ</b> (thing), <b>тінь</b> (shadow/shade), <b>сіль</b> (salt), <b>любо́в</b> (love), <b>ра́дість</b> (joy), and <b>по́дорож</b> (trip)—are <b>Feminine</b> (<i>те́пла ніч, ціка́ва по́дорож</i>). And nouns in <b>-м’я</b> (<b>ім’я́</b> = first name) or <b>-а/-я</b> for young beings (<b>дівча́, ім’я́</b>) are <b>Neuter</b> (<i>га́рне ім’я́</i>).</li><li><b>Four Essential Irregular Plurals & Neuter «-ння» Nouns</b>: Memorize <b>люди́на → лю́ди</b> (person → people), <b>дити́на → ді́ти</b> (child → children), <b>друг → дру́зі</b> (friend → friends, with <i>г → з</i>), and <b>ма́ти → матері́</b> (mother → mothers). Meanwhile, neuter nouns in <b>-ння</b> (like <b>оповіда́ння</b> = story, <b>завда́ння</b> = assignment, <b>пита́ння</b> = question) have the <i>exact same form and stress</i> in Nominative singular and Nominative plural: <b>ціка́ве оповіда́ння → ціка́ві оповіда́ння</b>!</li><li><b>Profession Gender Pairs</b>: Ukrainian regularly forms feminine profession nouns with suffixes: <b>студе́нт → студе́нтка</b>, <b>учи́тель → учи́телька</b>, <b>письме́нник → письме́нниця</b>, <b>у́чень → учени́ця</b>, <b>робітни́к → робітни́ця</b>, <b>продаве́ць → продавчи́ня</b>, while classic specialist titles like <b>інжене́р, філо́лог, біо́лог, агроно́м, лі́кар</b> can also be paired with female names or feminine agreement (<i>Молода́ лі́кар увійшла́ в кабіне́т</i>).</li></ul>',
      '<b>7. Nationality & City-Resident Suffixes (-ець/-ка, -янин/-янка → -яни) & «украї́нський профе́сор» vs. «профе́сор украї́нської мо́ви»</b>:<ul><li><b>Nationalities in -(н)ець / -(н)ка & Friends</b>: Most nationalities form the masculine with <b>-ець / -єць</b> (fleeting <i>е</i> drops in plurals and oblique cases!) and the feminine with <b>-ка</b>: <b>украї́нець / украї́нка (украї́нці)</b>, <b>кана́дець / кана́дка</b>, <b>америка́нець / америка́нка</b>, <b>англі́єць / англі́йка (англі́йці)</b>, <b>ні́мець / ні́мка або́ німке́ня (ні́мці)</b>; compare also <b>поля́к / по́лька</b>, <b>слова́к / слова́чка</b>, <b>францу́з / францу́женка</b>, <b>чех / че́шка</b>.</li><li><b>Residents & Citizens in -янин / -янка (Drop -ин in the Plural!)</b>: Nouns ending in <b>-янин / -анин</b> drop the singular suffix <b>-ин</b> in the plural: <b>кия́нин</b> (f. <b>кия́нка</b>) → pl. <b>кия́ни</b> (Kyivans), <b>львів’я́нин → львів’я́ни</b>, <b>селя́нин → селя́ни</b> (villagers), <b>громадя́нин → громадя́ни</b> (citizens), <b>слов’яни́н → слов’я́ни</b>.</li><li><b>Nationality vs. Subject Taught</b>: Be careful to distinguish <b>украї́нський профе́сор / профе́сор-украї́нець</b> (a professor who is Ukrainian by nationality) from <b>профе́сор / виклада́ч украї́нської мо́ви</b> (a professor/instructor of the Ukrainian language), and use <b>з + Genitive</b> for textbooks or exercises in a subject: <b>підру́чник / зо́шит / впра́ви з украї́нської мо́ви</b>!</li></ul>',
      '<b>8. Plural Stress Shifts, Stem Vowel Alternations («ко́лір → кольори́») & «па́м’ятник» vs. «па́м’ятка»</b>:<ul><li><b>Mandatory Stress Shifts in Nominative Plurals</b>:<ul><li><b>Stem-to-Ending Shift</b>: <b>чолові́к → чоловіки́</b> (men), <b>жі́нка → жінки́</b> (women), <b>кни́жка → книжки́</b>, <b>зі́рка → зірки́</b>, <b>ліс → ліси́</b>, <b>дах → дахи́</b>, <b>брат → брати́</b>. Watch out for <b>ба́тько</b> (father, stem stress) vs. plural <b>батьки́</b> (ending stress = <b>parents</b>!).</li><li><b>Ending-to-Stem Shift in Feminines</b>: <b>гора́ → го́ри</b>, <b>ріка́ → рі́ки</b>, <b>трава́ → тра́ви</b>, <b>сестра́ → се́стри</b>.</li><li><b>Neuter Plurals in -а / -я</b>: Two-syllable neuters flip their stress to the opposite syllable (<b>вікно́ → ві́кна, село́ → се́ла</b> vs. <b>мо́ре → моря́, по́ле → поля́, мі́сто → міста́, мі́сце → місця́</b>), while three-syllable neuters shift stress to the middle syllable: <b>о́зеро → озе́ра</b>, <b>де́рево → дере́ва</b> (Gen. pl. <b>дере́в</b>).</li></ul></li><li><b>Three Classic Stem Alternations in Plurals</b>:<ul><li><b>Closed-Syllable і → о</b>: <b>стіл → столи́, рік → роки́, ніч → но́чі, гість → го́сті, ніж → ножі́</b>, and with soft <i>ьо</i>: <b>ко́лір → кольори́</b> (colors)!</li><li><b>Fleeting о in -ок</b>: <b>буди́нок → буди́нки, квито́к → квитки́, малю́нок → малю́нки, подару́нок → подару́нки, жовто́к → жовтки́</b>.</li><li><b>Fleeting е in -ець (with soft plural -і)</b>: <b>хло́пець → хло́пці, стіле́ць → стільці́, гребіне́ць → гребінці́, оліве́ць → олівці́</b>.</li></ul></li><li><b>«па́м’ятник» (Statue) vs. «па́м’ятка» (Heritage Landmark)</b>: Masculine <b>па́м’ятник (+ Dative)</b> is a sculpted statue or memorial to a person/event (<i>па́м’ятник Тара́сові Шевче́нку</i>), whereas feminine <b>па́м’ятка (+ Genitive)</b> is a historical or architectural monument/heritage site (<i>па́м’ятка архітекту́ри на пло́щі Ри́нок</i>)!</li></ul>',
    ],
    examples: [
      { uk: 'Це нови́й телефо́н, нова́ су́мка і нове́ мі́сце.', en: 'This is a new phone (m.), a new bag (f.), and a new place (n.).' },
      { uk: 'Моє́ рі́дне мі́сто ду́же краси́ве і зеле́не.', en: 'My hometown (neuter) is very beautiful and green.' },
      { uk: 'Де мої́ нові́ окуля́ри, гро́ші та ключі́?', en: 'Where are my new glasses, money, and keys (all plural in Ukrainian)?' },
      { uk: 'Цей зимо́вий о́дяг те́плий, а сві́жа мо́рква і карто́пля вже на столі́.', en: 'These winter clothes are warm, and the fresh carrots and potatoes are already on the table (all singular in Ukrainian).' },
      { uk: 'Мій дя́дько Мико́ла — завзя́тий риба́лка, а ці нові́ украї́нські оповіда́ння ду́же ціка́ві.', en: 'My uncle Mykola (masculine in -о/-а) is an avid fisherman, and these new Ukrainian short stories (-ння plural = singular) are very interesting.' },
      { uk: 'Корінні́ кия́ни та молоді́ україні́сти купи́ли нови́й підру́чник з украї́нської мо́ви.', en: 'Native Kyivans (кия́нин → кия́ни) and young Ukrainian studies specialists bought a new textbook in the Ukrainian language (з + Genitive).' },
      { uk: 'У Карпа́тах висо́кі го́ри, густі́ ліси́, глибо́кі озе́ра та яскра́ві кольори́, а в Льво́ві — да́вні па́м’ятки архітекту́ри.', en: 'In the Carpathians there are high mountains (го́ри), dense forests (ліси́), deep lakes (озе́ра), and bright colors (ко́лір → кольори́), and in Lviv — ancient architectural monuments (па́м’ятки архітекту́ри).' },
    ],
    dialogue: {
      title: 'Showing a Friend Your New Apartment',
      lines: [
        { speaker: 'Ната́ля', uk: 'Ласка́во про́симо! Це на́ша нова́ кварти́ра.', en: 'Welcome! This is our new apartment.' },
        { speaker: 'Богда́н', uk: 'Яка́ сві́тла і вели́ка кімна́та! І ду́же вели́ке вікно́.', en: 'What a bright and large room! And a very big window.' },
        { speaker: 'Ната́ля', uk: 'Так, а ось там наш балкон і зелений парк.', en: 'Yes, and right over there is our balcony and a green park.' },
      ],
    },
    activeRecall: [
      { promptEn: 'a new book (feminine)', answerUk: 'нова́ кни́жка', hint: 'кни́жка ends in -а, so нови́й becomes нова́' },
      { promptEn: 'a big city (neuter)', answerUk: 'вели́ке мі́сто', hint: 'мі́сто ends in -о (neuter), so the adjective ends in -е' },
      { promptEn: 'my bag (feminine)', answerUk: 'моя́ су́мка', hint: 'Feminine form of мій is моя́' },
      { promptEn: 'interesting books (plural)', answerUk: 'ціка́ві книжки́', hint: 'All plural adjectives end in -і' },
    ],
    reviewSummary:
      'Masculine nouns end in a consonant (нови́й стіл), Feminine nouns end in -а/-я (нова́ кни́жка), and Neuter nouns end in -о/-е/-CCя (нове́ мі́сто). In the plural, adjectives always end in -і for all genders (нові́ столи́, нові́ книжки́, нові́ міста́).',
    cfu: [
      {
        q: 'What grammatical gender are the nouns «мі́сто» (city), «вікно́» (window), and «мо́ре» (sea)?',
        opts: ['Masculine', 'Feminine', 'Neuter (because they end in -о or -е)'],
        ans: 2,
        exp: 'Nouns ending in -о or -е (except male family words like та́то/ба́тько) are Neuter and take neuter adjectives ending in -е/-є.',
      },
      {
        q: 'How does the adjective «ціка́вий» (interesting) change to describe «кни́жка» (book, feminine) and «фільм» (movie, masculine)?',
        opts: [
          'ціка́ва кни́жка and ціка́вий фільм',
          'ціка́ве кни́жка and ціка́ва фільм',
          'ціка́вий кни́жка and ціка́вий фільм',
        ],
        ans: 0,
        exp: '«кни́жка» is feminine (-а), so it takes «ціка́ва». «фільм» ends in a consonant (masculine), so it takes «ціка́вий».',
      },
      {
        q: 'What ending do Ukrainian adjectives take in the Nominative Plural across ALL three genders?',
        opts: ['-и', '-і (for example: нові́ буди́нки, нові́ книжки́, нові́ ві́кна)', '-а'],
        ans: 1,
        exp: 'In the plural, all Ukrainian adjectives end in -і regardless of the noun’s singular gender.',
      },
    ],
    practice: [
      {
        prompt: 'Choose the correct form of "my" for the feminine noun «робо́та» (work/job):',
        opts: ['мій робо́та', 'моя́ робо́та', 'моє́ робо́та'],
        ans: 1,
        audioUk: 'моя́ робо́та',
        exp: 'Because «робо́та» ends in -а (feminine), use the feminine possessive «моя́».',
      },
      {
        prompt: 'Choose the correct adjective form for the neuter noun «мі́сце» (place / seat):',
        opts: ['ві́льний мі́сце', 'ві́льна мі́сце', 'ві́льне мі́сце'],
        ans: 2,
        audioUk: 'ві́льне мі́сце',
        exp: '«мі́сце» ends in -е (neuter), so the adjective takes the neuter ending -е: «ві́льне мі́сце» (a free seat).',
      },
      {
        prompt: 'Why is «ба́тько» (father) masculine even though it ends in -о?',
        opts: [
          'Because it refers to a male person, so we say «мій до́брий ба́тько»',
          'Because all words starting with б are masculine',
          'It is actually neuter',
        ],
        ans: 0,
        audioUk: 'мій до́брий ба́тько',
        exp: 'Words for male family members like «ба́тько» (father) and «та́то» (dad) are grammatically masculine.',
      },
      {
        prompt: 'Select the correct plural phrase for "delicious varenyky (dumplings)":',
        opts: ['смачни́й варе́ники', 'смачна́ варе́ники', 'смачні́ варе́ники'],
        ans: 2,
        audioUk: 'смачні́ варе́ники',
        exp: '«варе́ники» is plural, so the adjective takes the plural ending -і: «смачні́ варе́ники».',
      },
      {
        prompt: 'What is the gender of «пита́ння» (question) and «життя́» (life)?',
        opts: [
          'Neuter (nouns with a doubled consonant before -я take neuter agreement: важли́ве пита́ння)',
          'Masculine',
          'Plural',
        ],
        ans: 0,
        audioUk: 'важли́ве пита́ння',
        exp: 'Nouns ending in a doubled consonant + -я (-ння, -ття) are neuter: «важли́ве пита́ння», «нове́ життя́».',
      },
    ],
    vocab: [
      ['нови́й', 'ADJ', 'new (f. нова́, n. нове́, pl. нові́)', 'Це наш нови́й проє́кт.', 'This is our new project.'],
      ['вели́кий', 'ADJ', 'big / large', 'У нас вели́ка кімна́та.', 'We have a large room.'],
      ['мали́й', 'ADJ', 'small / little', 'Це мале́ вікно́.', 'This is a small window.'],
      ['смачни́й', 'ADJ', 'tasty / delicious', 'Ду́же смачни́й обі́д!', 'A very delicious lunch!'],
      ['гаря́чий', 'ADJ', 'hot (food/drink)', 'Ось гаря́ча ка́ва.', 'Here is hot coffee.'],
      ['холо́дний', 'ADJ', 'cold', 'Холо́дна вода́ з лимо́ном.', 'Cold water with lemon.'],
      ['те́плий', 'ADJ', 'warm', 'Сього́дні те́плий ве́чір.', 'Today is a warm evening.'],
      ['ціка́вий', 'ADJ', 'interesting', 'Це ціка́ва кни́жка.', 'This is an interesting book.'],
      ['важли́вий', 'ADJ', 'important', 'Це важли́ве пита́ння.', 'This is an important question.'],
      ['ві́льний', 'ADJ', 'free / available', 'Чи цей сто́лик ві́льний?', 'Is this table free?'],
      ['мій', 'DET', 'my (f. моя́, n. моє́, pl. мої́)', 'Це моя́ сестра́.', 'This is my sister.'],
      ['наш', 'DET', 'our (f. на́ша, n. на́ше, pl. на́ші)', 'Це на́ше рі́дне мі́сто.', 'This is our hometown.'],
      ['цей', 'DET', 'this (f. ця, n. це, pl. ці)', 'Ця кав’я́рня ду́же затишна́.', 'This coffee shop is very cozy.'],
      ['вікно́', 'NOUN', 'window (neuter, pl. ві́кна)', 'Вели́ке сві́тле вікно́.', 'A large bright window.'],
      ['пита́ння', 'NOUN', 'question (neuter -ння)', 'У ме́не є одне́ пита́ння.', 'I have one question.'],
    ],
    exam: [
      {
        q: 'Which phrase correctly matches the adjective to the feminine noun «ка́ва»?',
        opts: ['смачни́й ка́ва', 'смачна́ ка́ва', 'смачне́ ка́ва'],
        ans: 1,
        exp: '«ка́ва» is feminine (-а), so the adjective takes the feminine ending -а: «смачна́ ка́ва».',
      },
      {
        q: 'Which phrase correctly says "this window" (where «вікно́» is neuter)?',
        opts: ['цей вікно́', 'ця вікно́', 'це вікно́'],
        ans: 2,
        exp: 'For a neuter noun like «вікно́», "this" is «це»: «це вікно́».',
      },
      {
        q: 'What is the plural of the neuter noun «мі́сто» (city)?',
        opts: ['міста́', 'мі́сти', 'мі́сту'],
        ans: 0,
        exp: 'Neuter nouns in -о take -а in the nominative plural: мі́сто → міста́.',
      },
      {
        q: 'How do you say "our friends" in the plural?',
        opts: ['наш дру́зі', 'на́ша дру́зі', 'на́ші дру́зі'],
        ans: 2,
        exp: 'In the plural, «наш» becomes «на́ші»: «на́ші дру́зі».',
      },
      {
        q: 'How do soft-stem adjectives like «си́ній» (dark blue) form their feminine and neuter singular?',
        opts: ['си́ня (feminine) and си́нє (neuter)', 'си́на and си́не', 'си́ній for all genders'],
        ans: 0,
        exp: 'Soft-stem adjectives ending in -ій take -я in the feminine (си́ня) and -є in the neuter (си́нє).',
      },
      {
        q: 'Why is «життя́» (life) described as «нове́ життя́» rather than «нова́ життя́»?',
        opts: [
          'Because nouns ending in a doubled consonant + -я (-ття, -ння) are neuter',
          'Because життя́ is masculine',
          'Because життя́ is plural',
        ],
        ans: 0,
        exp: 'Abstract nouns ending in a doubled consonant + -я (like життя́, знання́, пита́ння) are neuter.',
      },
    ],
  },
  {
    id: 'A1.2',
    level: 'A1',
    topicTag: 'A1 Beginner • Present & Past Tense Verbs',
    title: 'Everyday Verbs in the Present & Past Tense',
    objectives: [
      'Conjugate common Ukrainian verbs in the Present Tense (Group I -є- and Group II -и-).',
      'Recognize how -увати verbs (like працюва́ти "to work") change to -ую in the present tense.',
      'Form the Past Tense effortlessly using gender and plural endings (-в, -ла, -ло, -ли).',
    ],
    summary:
      'In Ukrainian, dictionary verbs end in -ти (like чита́ти "to read" or говори́ти "to speak"). To say who is doing the action in the present tense, we swap -ти for personal endings. And the past tense is even easier: it only changes by gender and plural!',
    rules: [
      '<b>1. Present Tense Group I (The "-аю / -єш / -є" Pattern)</b>: Many verbs ending in <b>-ати</b> drop <i>-ти</i> and add <b>-ю, -єш, -є, -ємо, -єте, -ють</b>. Notice that for "he / she" (<b>він / вона́</b>), Group I verbs end in a bare vowel <b>-є</b> (with NO <i>-ть</i> at the end!):<ul><li><b>чита́ти</b> (to read): я <b>чита́ю</b>, ти <b>чита́єш</b>, він/вона́ <b>чита́є</b>, ми <b>чита́ємо</b>, ви <b>чита́єте</b>, вони́ <b>чита́ють</b>.</li><li><b>зна́ти</b> (to know), <b>слу́хати</b> (to listen), <b>ду́мати</b> (to think), <b>сні́дати</b> (to eat breakfast), and <b>вивча́ти</b> (to study) work the exact same way!</li></ul>',
      '<b>2. Verbs in -увати / -ювати (Drop -ва- in the Present!)</b>: Dozens of useful verbs end in <b>-увати</b> or <b>-ювати</b>, such as <b>працюва́ти</b> (to work), <b>готува́ти</b> (to cook), <b>купува́ти</b> (to buy), and <b>подорожува́ти</b> (to travel). In the present tense, replace <i>-увати</i> with <b>-ую, -уєш, -ує, -уємо, -уєте, -ують</b>:<ul><li>я <b>працю́ю</b>, ти <b>працю́єш</b>, він/вона́ <b>працю́є</b>, ми <b>працю́ємо</b>, ви <b>працю́єте</b>, вони́ <b>працю́ють</b>.</li></ul>',
      '<b>3. Present Tense Group II (The "-ю / -иш / -ить" Pattern)</b>: Verbs ending in <b>-ити</b> or <b>-іти</b> use the vowel <b>-и-</b> and always keep <b>-ть</b> in the "he / she" form:<ul><li><b>говори́ти</b> (to speak): я <b>говорю́</b>, ти <b>гово́риш</b>, він/вона́ <b>гово́рить</b>, ми <b>гово́римо</b>, ви <b>гово́рите</b>, вони́ <b>гово́рять</b>.</li><li>If the verb stem ends in <b>б, п, в, м</b> (like <b>люби́ти</b> "to love" or <b>роби́ти</b> "to do"), an <b>-л-</b> appears in BOTH "I" and "they": я <b>люблю́</b>, ти <b>лю́биш</b>, він <b>лю́бить</b>, вони́ <b>лю́блять</b>; я <b>роблю́</b>, вони́ <b>ро́блять</b>!</li></ul>',
      '<b>4. The Super-Simple Past Tense (-в, -ла, -ло, -ли)</b>: To talk about the past, simply take the infinitive (e.g. <b>чита́ти</b>, <b>працюва́ти</b>, <b>бу́ти</b>), drop <b>-ти</b>, and add the gender/plural ending:<ul><li>Masculine (я / ти / він): <b>-в</b> (pronounced [w]!) → <b>чита́в, працюва́в, був</b></li><li>Feminine (я / ти / вона́): <b>-ла</b> → <b>чита́ла, працюва́ла, була́</b></li><li>Neuter (воно́): <b>-ло</b> → <b>було́</b></li><li>Plural (ми / ви / вони́): <b>-ли</b> → <b>чита́ли, працюва́ли, були́</b></li></ul>',
      '<b>5. When Present-Tense «є» Is Kept & The Habitual Verb «бува́ти»</b>:<ul><li>Although Ukrainian normally omits "am/is/are" in the present tense, the verb form <b>є</b> IS explicitly used when emphasizing existence, asking whether something is available, or giving a short affirmative reply: <b>Чи тут є словни́к? — Так, є!</b> (Is there a dictionary here? — Yes, there is!).</li><li>From <b>бу́ти</b> (to be), Ukrainian also forms the frequentative verb <b>бува́ти</b> (я <b>бува́ю</b>, ти <b>бува́єш</b>, він/вона́ <b>бува́є</b>), which means "to visit/be somewhere occasionally" or "it happens sometimes": <b>Ми ча́сто бува́ємо в теа́трі</b> (We often go to / attend the theater), <b>Уся́ке бува́є!</b> (All sorts of things happen!).</li></ul>',
      '<b>6. «могти́» vs. «умі́ти», «ма́ти + Infinitive», & Present Tense for "Have Been Doing"</b>:<ul><li><b>Physical Possibility («могти́») vs. Learned Skill («умі́ти / вмі́ти»)</b>: Use <b>могти́</b> (я <b>мо́жу</b>, ти <b>мо́жеш</b>, вони́ <b>мо́жуть</b>) for circumstantial possibility ("can / be able to right now": <i>Я мо́жу прийти́ о п’я́тій</i>), and <b>умі́ти / вмі́ти</b> (я <b>вмі́ю</b>, ти <b>вмі́єш</b>) for a learned skill ("know how to": <i>Вона́ чу́дово вмі́є пла́вати й готува́ти</i>).</li><li><b>Scheduled Obligation («ма́ти + Infinitive»)</b>: When <b>ма́ти</b> is followed by an infinitive verb instead of a noun, it means "have to / am supposed to": <b>Ви́бачте, я вже ма́ю йти додо́му</b> ("I have to go home now").</li><li><b>Present Tense for Ongoing Duration ("Have Been Doing")</b>: Where English uses the Present Perfect Continuous ("I have been studying Ukrainian for two years"), Ukrainian uses the <b>Present Tense</b> with <b>вже</b> and NO preposition for "for": <b>Я вивча́ю украї́нську мо́ву вже два ро́ки</b>; <b>Ми живемо́ в Ки́єві вже три мі́сяці</b>.</li></ul>',
      '<b>7. Positional Verbs of Placement (стоя́ти, лежа́ти, сиді́ти, висі́ти) — Why Ukrainian Plates "Stand" and Books "Lie"!</b>:<ul><li>Instead of a generic "is on the table", Ukrainian vividly describes an object’s posture using four Group II verbs:<ul><li><b>стоя́ти</b> (стої́ть, стоя́ть = to stand): used for people standing AND for upright objects with a base or legs—<b>стіл, стіле́ць, ша́фа, ла́мпа, ва́за, ча́шка, скля́нка, тарі́лка, пля́шка, телеві́зор, взуття́ стої́ть</b>!</li><li><b>лежа́ти</b> (лежи́ть, лежа́ть = to lie flat): used for flat or horizontal items—<b>кни́жка, зо́шит, газе́та, лист, ру́чка, оліве́ць, ніж, виде́лка, ло́жка, скате́рка, ки́лим, хліб лежи́ть</b>.</li><li><b>висі́ти</b> (виси́ть, вися́ть = to hang): used for items suspended on a wall or hook—<b>карти́на, портре́т, рушни́к, лю́стра виси́ть</b>; clothes in a closet also "hang" (<b>Су́кня й па́льто вися́ть у ша́фі</b>).</li><li><b>сиді́ти</b> (я <b>сиджу́</b> [dʒ], ти <b>сиди́ш</b>, він <b>сиди́ть</b>, вони́ <b>сидя́ть</b> = to sit): used for seated people, birds, or animals.</li></ul></li><li><b>«на столі́» vs. «у столі́»</b>: Note that <b>Кни́жка лежи́ть на столі́</b> means "The book is lying <i>on top of</i> the desk (зве́рху)", whereas <b>Зо́шит лежи́ть у столі́</b> means "The notebook is lying <i>inside the desk drawer</i> (всере́дині)"!</li></ul>',
      '<b>8. The 3rd-Plural Link-Vowel Shortcut, Phase Verbs (+ Imperfective Infinitive), & "Tried in Vain" («так і не»)</b>:<ul><li><b>How the "They" Form Predicts Every Other Ending</b>: If you know the 3rd-person plural ("вони́") of any Ukrainian verb, you automatically know its conjugation group and link vowel!<ul><li>If <b>вони́</b> ends in <b>-уть / -ють</b> → it is <b>1st Conjugation</b> and uses the link vowel <b>-е- / -є-</b> in ти, він/вона́, ми, ви: <i>писа́ти → вони́ пи́ш<b>уть</b> → ти пи́ш<b>еш</b>, він пи́ш<b>е</b>, ми пи́ш<b>емо</b>, ви пи́ш<b>ете</b></i>; <i>чита́ти → вони́ чита́<b>ють</b> → ти чита́<b>єш</b>, він чита́<b>є</b></i>.</li><li>If <b>вони́</b> ends in <b>-ать / -ять</b> → it is <b>2nd Conjugation</b> and uses the link vowel <b>-и- / -ї-</b>: <i>крича́ти → вони́ крич<b>а́ть</b> → ти крич<b>и́ш</b>, він крич<b>и́ть</b></i>; <i>стоя́ти → вони́ сто<b>я́ть</b> → ти сто<b>ї́ш</b>, він сто<b>ї́ть</b></i>.</li></ul></li><li><b>Phase Verbs Always Take an Imperfective Infinitive</b>: Verbs that mark the start, continuation, or end of an activity—<b>почина́ти / поча́ти</b> (to begin), <b>продо́вжувати / продо́вжити</b> (to continue), <b>закі́нчувати / закі́нчити</b> (to finish), <b>перестава́ти / переста́ти</b> (to stop)—are ALWAYS followed by an <b>imperfective infinitive</b>: <b>Ми почали́ вивча́ти украї́нську мо́ву</b> (never <i>*почали́ ви́вчити</i>!).</li><li><b>Expressing Unsuccessful Effort («довго роби́в, але́ так і не зроби́в»)</b>: Pair an imperfective past verb of effort with <b>але́ так і не + perfective past</b> to say someone tried for a long time but never succeeded: <b>Він три ра́зи вступа́в до університе́ту, але́ так і не вступи́в</b>.</li></ul>',
      '<b>9. Complete Second Conjugation Subgroup System & The «я / ти» Mutation Diagnostic Rule</b>:<ul><li><b>Five Subgroups of the Second Conjugation</b> (all share <b>-иш, -ить, -имо, -ите</b> except vowel stems in <b>-їш, -їть, -їмо, -їте</b>):<ul><li><b>1) Stems in л, н, р</b> (<i>говори́ти, кури́ти, голи́тися, жури́тися</i>): take <b>-ю</b> in <i>я</i> and <b>-ять</b> in <i>вони́</i> (<b>я гово́рю, вони́ гово́рять</b>).</li><li><b>2) Stems in hushers ж, ч, ш, щ</b> (<i>ба́чити, лежа́ти, мовча́ти, крича́ти, ва́жити, спіши́ти, ті́шитися, ска́ржитися, вчи́тися</i>, plus <b>бі́гти → біж-</b>): take <b>-у</b> in <i>я</i> and <b>-ать</b> in <i>вони́</i> (<b>я ба́чу, вони́ ба́чать; я біжу́, вони́ біжа́ть</b>).</li><li><b>3) Stems in labials б, в, м, п, ф</b> (<i>роби́ти, люби́ти, спа́ти, диви́тися, ломи́ти, губи́ти</i>): insert <b>-л-</b> in BOTH <i>я</i> and <i>вони́</i> (<b>я роблю́, вони́ ро́блять; я сплю, вони́ сплять</b>).</li><li><b>4) Stems in dentals д, з, с, т</b> (<i>сиді́ти, леті́ти, плати́ти, проси́ти, му́сити, ходи́ти, ї́здити, носи́ти, вози́ти</i>): mutate the consonant <b>ONLY in the «я» form</b> (<b>д→дж, зд→ждж, з→ж, с→ш, т→ч</b>) and return to the original consonant for <i>ти</i> and <i>вони́</i> (<b>я сиджу́, ти сиди́ш, вони́ сидя́ть; я плачу́, ти пла́тиш, вони́ пла́тять; я му́шу, ти му́сиш; я ї́жджу, ти ї́здиш</b>).</li><li><b>5) Vowel Stems</b> (<i>стоя́ти, боя́тися</i>): take <b>-ю, -їш, -їть, -їмо, -їте, -ять</b> (<b>я стою́, ти стої́ш, вони́ стоя́ть; я бою́ся, ти бої́шся</b>).</li></ul></li><li><b>The Golden «я / ти» Diagnostic Rule (1st vs. 2nd Conjugation)</b>: When a verb has a consonant mutation in <b>я</b>, check the <b>ти</b> form!<ul><li>If the mutated consonant <b>stays in «ти»</b> (and all persons), it is a <b>First Conjugation</b> verb: <b>писа́ти → я пишу́, ти пи́шеш, вони́ пи́шуть</b>; <b>каза́ти → я кажу́, ти ка́жеш</b>; <b>пла́кати → я пла́чу, ти пла́чеш</b>; <b>шепта́ти → я шепчу́, ти ше́пчеш</b>.</li><li>If the mutated consonant <b>disappears in «ти»</b>, it is a <b>Second Conjugation</b> verb: <b>сиді́ти → я сиджу́, ти сиди́ш, вони́ сидя́ть</b>; <b>проси́ти → я прошу́, ти про́сиш, вони́ про́сять</b>!</li></ul></li></ul>',
    ],
    examples: [
      { uk: 'За́раз я чита́ю кни́жку, а мій брат слу́хає му́зику.', en: 'Right now I am reading a book, and my brother is listening to music.' },
      { uk: 'Де ви працю́єте? — Ми працю́ємо в міжнаро́дній компа́нії.', en: 'Where do you work? — We work at an international company.' },
      { uk: 'Я ду́же люблю́ ка́ву, і мої́ дру́зі також лю́блять ка́ву.', en: 'I really love coffee, and my friends also love coffee.' },
      { uk: 'Учо́ра Оле́на працюва́ла вдо́ма, а Тара́с був у Льво́ві.', en: 'Yesterday Olena worked at home, and Taras was in Lviv.' },
      { uk: 'Чи у вас є нови́й підру́чник? — Так, є! А вве́чері ми інколи бува́ємо в кіно́.', en: 'Do you have the new textbook? — Yes, I do! And in the evening we sometimes go to the cinema.' },
      { uk: 'Я вивча́ю украї́нську мо́ву вже два ро́ки і вмі́ю чита́ти книжки́, але́ за́раз уже́ ма́ю йти.', en: 'I have been studying Ukrainian for two years and know how to read books, but right now I already have to go.' },
      { uk: 'На столі́ стої́ть ва́за з кві́тами й ча́шка, поруч лежи́ть кни́жка, а в ша́фі виси́ть нове́ па́льто.', en: 'On the table stand a vase with flowers and a cup, nearby lies a book, and in the wardrobe hangs a new coat.' },
      { uk: 'Ми почали́ чита́ти цю статтю́ вранці; я до́вго шука́в словни́к, але́ так і не знайшо́в його́.', en: 'We started reading (почали́ + impf. чита́ти) this article in the morning; I looked for the dictionary for a long time, but never found it (так і не знайшо́в).' },
      { uk: 'Я пишу́ листа́, і ти пи́шеш листа́ (І дієвідмі́на), але́ я сиджу́ за столо́м і плачу́ за ка́ву, а ти сиди́ш і пла́тиш (ІІ дієвідмі́на).', en: 'I write a letter and you write a letter (1st Conj. mutation stays in ти пи́шеш), whereas I sit at the table and pay for coffee, and you sit and pay (2nd Conj. mutation only in я сиджу́, плачу́ → ти сиди́ш, пла́тиш).' },
    ],
    dialogue: {
      title: 'Catching Up About Today and Yesterday',
      lines: [
        { speaker: 'Дмитро́', uk: 'Приві́т, А́нно! Що ти за́раз ро́биш?', en: 'Hi, Anna! What are you doing right now?' },
        { speaker: 'А́нна', uk: 'Приві́т! Я обі́даю в кав’я́рні і чита́ю нови́ни. А ти сього́дні працю́єш?', en: 'Hi! I am having lunch at a café and reading the news. Are you working today?' },
        { speaker: 'Дмитро́', uk: 'Ні, я працюва́в учо́ра весь день, тож сього́дні я відпочива́ю.', en: 'No, I worked all day yesterday, so today I am resting.' },
      ],
    },
    activeRecall: [
      { promptEn: 'He reads / is reading (from чита́ти)', answerUk: 'він чита́є', hint: 'Group I 3rd person singular ends in -є (no -ть)' },
      { promptEn: 'I work / am working (from працюва́ти)', answerUk: 'я працю́ю', hint: '-увати changes to -ую in the present tense' },
      { promptEn: 'They love (from люби́ти)', answerUk: 'вони́ лю́блять', hint: 'Labial б adds -л- in both я люблю́ and вони́ лю́блять' },
      { promptEn: 'She worked yesterday (past tense of працюва́ти)', answerUk: 'вона́ працюва́ла', hint: 'Drop -ти and add feminine -ла' },
    ],
    reviewSummary:
      'Group I verbs use -ю, -єш, -є (він чита́є, він працю́є). Group II verbs use -ю, -иш, -ить (він гово́рить, він ро́бить). In the past tense, drop -ти and add -в (masculine), -ла (feminine), -ло (neuter), or -ли (plural).',
    cfu: [
      {
        q: 'What is the correct "he / she" (він / вона́) present-tense form of «чита́ти» (to read) and «працюва́ти» (to work)?',
        opts: [
          'він чита́є, вона́ працю́є (ending in -є with no -ть)',
          'він чита́ти, вона́ працюва́ти',
          'він чита́ють, вона́ працю́ють',
        ],
        ans: 0,
        exp: 'In Conjugation I, the 3rd-person singular (він/вона́) ends in a clean vowel -є: він чита́є, вона́ працю́є.',
      },
      {
        q: 'How does the verb «купува́ти» (to buy) conjugate for «я» (I) in the present tense?',
        opts: ['я купува́ю', 'я купу́ю (the -увати suffix becomes -ую)', 'я купи́в'],
        ans: 1,
        exp: 'Verbs ending in -увати drop -ва- in the present tense: купува́ти → я купу́ю, ти купу́єш, він купу́є.',
      },
      {
        q: 'If a woman says "I was in Kyiv yesterday", which past-tense form of «бу́ти» does she use?',
        opts: ['Я був у Ки́єві.', 'Я була́ в Ки́єві.', 'Я були́ в Ки́єві.'],
        ans: 1,
        exp: 'In the past tense, verbs match the speaker’s gender: a male speaker says «Я був», and a female speaker says «Я була́».',
      },
    ],
    practice: [
      {
        prompt: 'Complete the sentence: «Ми ________ украї́нську мо́ву.» ("We are studying the Ukrainian language" — from вивча́ти):',
        opts: ['вивча́ю', 'вивча́ємо', 'вивча́ють'],
        ans: 1,
        audioUk: 'Ми вивча́ємо украї́нську мо́ву.',
        exp: 'With «ми» (we), Group I verbs end in -ємо: «ми вивча́ємо».',
      },
      {
        prompt: 'Choose the correct present-tense forms of «роби́ти» (to do/make) for «я» and «вони́»:',
        opts: ['я роблю́, вони́ ро́блять', 'я робу́, вони́ ро́бють', 'я ро́биш, вони́ ро́бить'],
        ans: 0,
        audioUk: 'я роблю́, вони́ ро́блять',
        exp: 'Because the stem ends in б, an -л- is added in both the "I" form (я роблю́) and the "they" form (вони́ ро́блять).',
      },
      {
        prompt: 'Complete the sentence: «Він ду́же до́бре ________ украї́нською.» ("He speaks Ukrainian very well" — from говори́ти):',
        opts: ['гово́рить', 'говорю́', 'гово́риш'],
        ans: 0,
        audioUk: 'Він ду́же до́бре гово́рить украї́нською.',
        exp: '«говори́ти» is a Group II verb, so the 3rd-person singular ends in -ить: «він гово́рить».',
      },
      {
        prompt: 'Translate "Yesterday my friends were at the theater" into Ukrainian:',
        opts: ['Учо́ра мої́ дру́зі був у теа́трі.', 'Учо́ра мої́ дру́зі була́ в теа́трі.', 'Учо́ра мої́ дру́зі були́ в теа́трі.'],
        ans: 2,
        audioUk: 'Учо́ра мої́ дру́зі були́ в теа́трі.',
        exp: 'For any plural subject (ми, ви, вони́, дру́зі), the past tense ends in -ли: «були́».',
      },
      {
        prompt: 'What are the "I" and "they" forms of the everyday verb «ї́сти» (to eat)?',
        opts: ['я їм, вони́ їдя́ть', 'я ї́стю, вони́ ї́стять', 'я їв, вони́ ї́ли'],
        ans: 0,
        audioUk: 'я їм, вони́ їдя́ть',
        exp: '«ї́сти» has special present-tense forms: я їм, ти їси́, він/вона́ їсть, ми їмо́, ви їсте́, вони́ їдя́ть.',
      },
    ],
    vocab: [
      ['чита́ти', 'VERB', 'to read (чита́ю, чита́єш, чита́є)', 'Вона́ чита́є кни́жку.', 'She is reading a book.'],
      ['зна́ти', 'VERB', 'to know (зна́ю, зна́єш, зна́є)', 'Я зна́ю цю ву́лицю.', 'I know this street.'],
      ['вивча́ти', 'VERB', 'to study / learn (вивча́ю, вивча́єш)', 'Ми вивча́ємо украї́нську.', 'We are studying Ukrainian.'],
      ['слу́хати', 'VERB', 'to listen (слу́хаю, слу́хаєш)', 'Я слу́хаю подка́ст.', 'I am listening to a podcast.'],
      ['працюва́ти', 'VERB', 'to work (працю́ю, працю́єш, працю́є)', 'Де ти працю́єш?', 'Where do you work?'],
      ['готува́ти', 'VERB', 'to cook / prepare (готу́ю, готу́єш)', 'Та́то готу́є вече́рю.', 'Dad is cooking dinner.'],
      ['купува́ти', 'VERB', 'to buy (купу́ю, купу́єш)', 'Ми купу́ємо сві́жі фру́кти.', 'We are buying fresh fruit.'],
      ['відпочива́ти', 'VERB', 'to rest / relax (відпочива́ю)', 'У неді́лю ми відпочива́ємо.', 'On Sunday we rest.'],
      ['говори́ти', 'VERB', 'to speak / talk (говорю́, гово́риш, гово́рить)', 'Він гово́рить пові́льно.', 'He speaks slowly.'],
      ['роби́ти', 'VERB', 'to do / make (роблю́, ро́биш, ро́блять)', 'Що ти за́раз ро́биш?', 'What are you doing right now?'],
      ['люби́ти', 'VERB', 'to love / like (люблю́, лю́биш, лю́блять)', 'Вони́ лю́блять подорожува́ти.', 'They love traveling.'],
      ['жи́ти', 'VERB', 'to live (живу́, живе́ш, живе́)', 'Я живу́ у Льво́ві.', 'I live in Lviv.'],
      ['ї́сти', 'VERB', 'to eat (їм, їси́, їсть, їдя́ть)', 'Ми ра́зом їмо́ сніда́нок.', 'We eat breakfast together.'],
      ['пи́ти', 'VERB', 'to drink (п’ю, п’єш, п’є, п’ють)', 'Я п’ю зелений чай.', 'I am drinking green tea.'],
      ['вчо́ра', 'ADV', 'yesterday (variant: учо́ра)', 'Вчо́ра ми гуля́ли в па́рку.', 'Yesterday we walked in the park.'],
    ],
    exam: [
      {
        q: 'Which form correctly completes «Ти ________ ка́ву вранці?» ("Do you drink coffee in the morning?" — from пи́ти)?',
        opts: ['п’ю', 'п’єш', 'п’ють'],
        ans: 1,
        exp: '«пи́ти» conjugates with an apostrophe: я п’ю, ти п’єш, він/вона́ п’є, вони́ п’ють.',
      },
      {
        q: 'How do you say "They love Ukrainian music" using «люби́ти»?',
        opts: ['Вони́ лю́блять украї́нську му́зику.', 'Вони́ лю́бить украї́нську му́зику.', 'Вони́ люблю́ украї́нську му́зику.'],
        ans: 0,
        exp: 'For «вони́» (they), «люби́ти» takes the -лять ending: «вони́ лю́блять».',
      },
      {
        q: 'Choose the correct present-tense form for «Я ________ в центрі мі́ста» ("I live in the city center" — from жи́ти):',
        opts: ['жи́ю', 'живу́', 'живе́'],
        ans: 1,
        exp: '«жи́ти» adds -в- in the present tense: я живу́, ти живе́ш, він/вона́ живе́, ми живемо́, вони́ живу́ть.',
      },
      {
        q: 'What is the feminine past-tense form of «чита́ти» (to read)?',
        opts: ['чита́в', 'чита́ла', 'чита́ли'],
        ans: 1,
        exp: 'Drop -ти and add -ла for a feminine subject: «вона́ чита́ла».',
      },
      {
        q: 'How is the final «-в» pronounced in masculine past-tense verbs like «чита́в», «працюва́в», and «був»?',
        opts: ['Like a rounded English "w" [w]', 'Like "f"', 'It is completely silent'],
        ans: 0,
        exp: 'Word-final «-в» in Ukrainian is always pronounced as a bilabial [w] sound, never "f".',
      },
      {
        q: 'What does «Що ти роби́ла вчо́ра вве́чері?» ask (spoken to a woman)?',
        opts: [
          'What are you doing right now?',
          'What did you do yesterday evening?',
          'Where will you work tomorrow?',
        ],
        ans: 1,
        exp: '«роби́ла» is the feminine past tense of «роби́ти» (to do), and «вчо́ра вве́чері» means "yesterday evening".',
      },
    ],
  },
  {
    id: 'A1.3',
    level: 'A1',
    topicTag: 'A1 Beginner • Food, Cafés & The Accusative Case',
    title: 'Ordering Food, Café Conversations & The Accusative Case',
    objectives: [
      'Order food and drinks naturally using «Я хо́чу...», «Я бу́ду...», and «Да́йте, будь ла́ска...».',
      'Understand what a Direct Object is and how the Accusative case works.',
      'Change feminine nouns (-а/-я → -у/-ю) and feminine adjectives (-а/-я → -у/-ю) when they are the direct object of a verb.',
    ],
    summary:
      'Now you are ready for your first grammatical case! In English, word order shows who is doing the action and what is receiving the action ("I am reading a book"). In Ukrainian, the word receiving the action (the Direct Object) takes the Accusative case—and only feminine words change their ending in basic everyday sentences!',
    rules: [
      '<b>1. What Is the Accusative Case (Direct Object)?</b>: When a noun is the direct target of an action verb—such as <b>чита́ю</b> (I read), <b>п’ю</b> (I drink), <b>їм</b> (I eat), <b>купу́ю</b> (I buy), <b>люблю́</b> (I love), or <b>хо́чу</b> (I want)—it is in the <b>Accusative case</b>.',
      '<b>2. The Golden Rule for Feminine Direct Objects (-а → -у, -я → -ю)</b>:<ul><li>When a <b>Feminine noun</b> ending in <b>-а</b> or <b>-я</b> is the direct object, change <b>-а → -у</b> and <b>-я → -ю</b>:<ul><li>Це <b>ка́ва</b> (Subject) → Я п’ю <b>ка́ву</b>. (I am drinking coffee.)</li><li>Це <b>кни́жка</b> (Subject) → Я чита́ю <b>кни́жку</b>. (I am reading a book.)</li><li>Це <b>вода́</b> (Subject) → Да́йте, будь ла́ска, <b>во́ду</b>. (Please give me water.)</li><li>Це <b>пі́сня</b> (Subject) → Ми слу́хаємо <b>пі́сню</b>. (We are listening to a song.)</li></ul></li><li>If a feminine adjective describes that direct object, its ending ALSO changes from <b>-а/-я → -у/-ю</b>: <b>гаря́ча ка́ва → Я п’ю гаря́чу ка́ву</b>; <b>ціка́ва кни́жка → Я чита́ю ціка́ву кни́жку</b>.</li></ul>',
      '<b>3. Good News: Inanimate Masculine, Neuter & Plural Objects Stay the Same!</b>: When the direct object is a non-living <b>Masculine noun</b> (like <b>чай, борщ, хліб, сік</b>), a <b>Neuter noun</b> (like <b>молоко́, я́блуко, меню́</b>), or an inanimate <b>Plural noun</b> (like <b>варе́ники, фру́кти</b>), its ending does NOT change at all!<ul><li>Я п’ю <b>зелений чай</b>. / Я їм <b>смачни́й борщ</b> і <b>варе́ники</b>. / Я купу́ю <b>сві́же молоко́</b>.</li></ul>',
      '<b>4. Polite Café Phrases</b>:<ul><li><b>Я хо́чу замо́вити...</b> = I want to order... (with <b>хоті́ти</b>: я <b>хо́чу</b>, ти <b>хо́чеш</b>, він/вона́ <b>хо́че</b>, ми <b>хо́чемо</b>, ви <b>хо́чете</b>, вони́ <b>хо́чуть</b>)</li><li><b>Да́йте, будь ла́ска, ...</b> = Give me, please, ...</li><li><b>Принесі́ть, будь ла́ска, раху́нок.</b> = Please bring the check.</li><li><b>Чи мо́жна оплати́ти ка́рткою?</b> = Can I pay by card?</li></ul>',
      '<b>5. Asking for "Some" of a Food or Drink (Partitive Genitive)</b>: When you want <i>some</i> of a drink or food (a cup, glass, or portion rather than the whole thing), or after a container word like <b>ча́шка</b> (cup) or <b>скля́нка</b> (glass), Ukrainian uses the <b>Genitive case</b>:<ul><li><b>ча́шка ча́ю / ка́ви</b> (a cup of tea / coffee), <b>скля́нка води́ / молока́</b> (a glass of water / milk), <b>тро́хи цу́кру / ме́ду</b> (a little sugar / honey).</li><li><b>Ви́пий гаря́чого ча́ю!</b> = Drink some hot tea!</li></ul>',
      '<b>6. Animate Accusative (People, Animals & Surnames) & «проси́ти» vs. «пита́ти»</b>:<ul><li><b>Animate Masculine & Plural Nouns</b>: When a direct object refers to a living person or animal, Masculine Singular AND both Masculine and Feminine Plural take the <b>Genitive form</b>: <i>брат → Я ба́чу <b>бра́та</b>; дру́зі → Я запрошу́ю <b>дру́зів</b>; се́стри → Я ба́чу <b>сесте́р</b>; ки́ці → Вона́ году́є <b>киць</b></i>!</li><li><b>Ukrainian Surnames Ending in a Consonant</b>: Surnames ending in a consonant (like <b>Ковальчу́к, Малярчу́к, Моро́з, Ко́валь</b>) decline when referring to a man (<i>Чи мо́жна попроси́ти до телефо́ну <b>па́на Малярчука́</b>?</i>), but remain <b>indeclinable when referring to a woman</b> (<i>Чи мо́жна попроси́ти до телефо́ну <b>па́ні Малярчу́к</b>?</i>).</li><li><b>«проси́ти / попроси́ти» ("ask for / request") vs. «пита́ти / запита́ти» ("ask a question")</b>: Use <b>попроси́ти + Accusative</b> when requesting an item or person (<b>Мо́жна попроси́ти раху́нок?</b>), and <b>запита́ти / спита́ти</b> when asking a question (<b>Запита́й дру́га, чи він лю́бить борщ</b>).</li></ul>',
      '<b>7. Multi-Course Ukrainian Dining («на заку́ску / на пе́рше / на дру́ге / на десе́рт») & Object of Thought or Speech («про + Accusative»)</b>:<ul><li><b>Ordering a Traditional Ukrainian Meal by Course</b>: In a Ukrainian restaurant or home dinner, courses are introduced with <b>на + Accusative</b>:<ul><li><b>на заку́ску</b> = for an appetizer / starter (<i>На заку́ску візьмемо́ овоче́вий сала́т або́ холоде́ць</i>)</li><li><b>на пе́рше</b> = for the first course (soup/borscht: <i>Що ви візьмете́ на пе́рше? — На пе́рше візьму́ черво́ний украї́нський борщ</i>)</li><li><b>на дру́ге</b> = for the main course (<i>А на дру́ге — котле́ту по-ки́ївськи або́ варе́ники зі смета́ною</i>)</li><li><b>на десе́рт / на тре́тє / на соло́дке</b> = for dessert (<i>На десе́рт — моро́зиво, узва́р або́ сві́жа ря́жанка</i>). And to defer to your host’s or waiter’s recommendation, say: <b>Я поклада́юсь на ваш смак!</b> ("I rely on your taste!").</li></ul></li><li><b>Talking & Thinking "About" Someone or Something («про + Accusative»)</b>: Verbs of speech, thought, and memory—<b>говори́ти, розповіда́ти, чита́ти, писа́ти, ду́мати, мрі́яти, зга́дувати, співа́ти</b>—use the preposition <b>про + Accusative</b> ("Про ко́го? Про що?"): <b>Ми чита́ємо кни́жку про Ки́їв і розповіда́ємо про на́шу подо́рож</b>; personal pronouns after <i>про</i> are <b>про ме́не, про те́бе, про ньо́го, про не́ї, про нас, про вас, про них</b>.</li></ul>',
      '<b>8. Definite (Accusative) vs. Indefinite (Genitive) Objects After «пита́ти, шука́ти, хоті́ти» & Going to Fetch («по + Accusative»)</b>:<ul><li><b>Specific ("the") vs. Unspecified ("a/an") Direct Objects</b>: After the verbs <b>пита́ти</b> (to ask), <b>шука́ти</b> (to look for), and <b>хоті́ти</b> (to want), Ukrainian distinguishes whether the object is specific/definite ("the") or unspecified/indefinite ("a/an"):<ul><li><b>Accusative Case (Specific / Definite "the")</b>: <b>Вони́ пита́ють учи́тельку</b> (They are asking <i>the</i> teacher); <b>Вона́ шука́є парасо́лю</b> (She is looking for <i>the</i> umbrella); <b>Жі́нка хо́че ва́зу</b> (The woman wants <i>the</i> vase).</li><li><b>Genitive Case (Unspecified / Indefinite "a / an")</b>: <b>Вони́ пита́ють бібліоте́карки</b> (They are asking <i>a</i> librarian); <b>Вона́ шука́є холоди́льника</b> (She is looking for <i>a</i> refrigerator); <b>Ді́ти хо́чуть ножа́</b> (The children want <i>a</i> knife). (Note: <b>пита́ти у/в + Genitive</b> is also used for "asking someone": <i>пита́ють в учи́тельки</i>.)</li></ul></li><li><b>Going to Fetch or Pick Up («іти́ / ї́хати по + Accusative»)</b>: To say you are going to fetch, buy, or pick up someone or something ("going for milk / going to pick up the children"), use the preposition <b>по + Accusative</b>: <b>Вона́ йде до крамни́ці по молоко́ й хліб</b> (She is going to the store for milk and bread); <b>Він ї́де до шко́ли по діте́й / по асисте́нта</b> (He is driving to school to pick up the children / the assistant).</li></ul>',
    ],
    examples: [
      { uk: 'Я п’ю гаря́чу ка́ву і чита́ю ціка́ву кни́жку.', en: 'I am drinking hot coffee (ка́ва → ка́ву) and reading an interesting book (кни́жка → кни́жку).' },
      { uk: 'Ми хо́чемо замо́вити украї́нський борщ, варе́ники і мінера́льну во́ду.', en: 'We want to order Ukrainian borscht, varenyky, and mineral water (вода́ → во́ду).' },
      { uk: 'Да́йте, будь ла́ска, одну́ ча́шку зе́леного ча́ю і скля́нку води́.', en: 'Please give me one cup of green tea and a glass of water (Partitive Genitive ча́ю, води́).' },
      { uk: 'Принесі́ть, будь ла́ска, меню́ і раху́нок.', en: 'Please bring the menu and the check.' },
      { uk: 'Чи мо́жна попроси́ти до телефо́ну па́ні Малярчу́к або́ па́на Малярчука́?', en: 'May I ask for Ms. Maliarchuk (indeclinable) or Mr. Maliarchuk (Acc./Gen. -а) to come to the phone?' },
      { uk: 'На заку́ску ми взяли́ сала́т, на пе́рше — борщ, на дру́ге — варе́ники, і довго розповіда́ли про ціка́ву екску́рсію.', en: 'For an appetizer we took salad, for the first course — borscht, for the main course — varenyky, and talked for a long time about the interesting excursion (про + Accusative).' },
      { uk: 'Вона́ шука́є свою́ си́ню парасо́лю (Acc.), бо надво́рі дощ, а по́тім іде́ до крамни́ці по молоко́ (по + Acc.).', en: 'She is looking for her blue umbrella (definite Acc.), because it is raining outside, and then goes to the shop for milk (по + Acc.).' },
    ],
    dialogue: {
      title: 'Ordering at a Lviv Coffee Shop',
      lines: [
        { speaker: 'Бари́ста', uk: 'До́брий день! Що ви хо́чете замо́вити?', en: 'Good day! What would you like to order?' },
        { speaker: 'Макси́м', uk: 'До́брий день! Да́йте, будь ла́ска, вели́ку чорну ка́ву і скля́нку води́.', en: 'Good day! Please give me a large black coffee and a glass of water.' },
        { speaker: 'Бари́ста', uk: 'Звича́йно! Чи хо́чете сві́жий круаса́н або́ десе́рт?', en: 'Of course! Do you want a fresh croissant or dessert?' },
        { speaker: 'Макси́м', uk: 'Так, візьму́ оди́н круаса́н. Чи мо́жна оплати́ти ка́рткою?', en: 'Yes, I will take one croissant. Can I pay by card?' },
        { speaker: 'Бари́ста', uk: 'Так, будь ла́ска. Ось ваш чек!', en: 'Yes, please go ahead. Here is your receipt!' },
      ],
    },
    activeRecall: [
      { promptEn: 'I am reading a book. (кни́жка → ?)', answerUk: 'Я чита́ю кни́жку.', hint: 'Feminine direct object changes -а to -у' },
      { promptEn: 'I love Ukrainian music. (украї́нська му́зика → ?)', answerUk: 'Я люблю́ украї́нську му́зику.', hint: 'Both adjective and noun change -а to -у' },
      { promptEn: 'I want to order borscht.', answerUk: 'Я хо́чу замо́вити борщ.', hint: 'Masculine inanimate борщ does not change' },
      { promptEn: 'Please bring the check.', answerUk: 'Принесі́ть, будь ла́ска, раху́нок.', hint: 'раху́нок = check / bill' },
    ],
    reviewSummary:
      'When a noun is the direct object of a verb (Accusative case), feminine nouns and adjectives change -а/-я to -у/-ю (Я п’ю гаря́чу ка́ву). Inanimate masculine, neuter, and plural nouns stay unchanged (Я п’ю зелений чай; Я купу́ю сві́же молоко́).',
    cfu: [
      {
        q: 'Why does «кни́жка» change to «кни́жку» in the sentence «Я чита́ю кни́жку» ("I am reading a book")?',
        opts: [
          'Because «кни́жка» is the direct object of the verb «чита́ю», so its feminine -а ending changes to Accusative -у',
          'Because «кни́жку» is plural',
          'Because «чита́ю» is in the past tense',
        ],
        ans: 0,
        exp: 'Feminine nouns ending in -а/-я change to -у/-ю when they are the direct object (Accusative case) of an action verb.',
      },
      {
        q: 'In the sentence «Ми замовля́ємо гаря́чий борщ і сві́же молоко́», why do «борщ» and «молоко́» keep their dictionary endings?',
        opts: [
          'Because inanimate masculine and neuter nouns do not change their ending in the Accusative case',
          'Because «замовля́ємо» does not take a direct object',
          'Because they are plural',
        ],
        ans: 0,
        exp: 'Inanimate masculine nouns (борщ, чай, хліб) and neuter nouns (молоко́, меню́) have the exact same form in the Accusative as in the Nominative.',
      },
      {
        q: 'How do both the adjective and noun change when «холо́дна вода́» (cold water) becomes the direct object in "I am drinking cold water"?',
        opts: [
          'Я п’ю холо́дна во́ду.',
          'Я п’ю холо́дну во́ду.',
          'Я п’ю холо́дний вода́.',
        ],
        ans: 1,
        exp: 'Both the feminine adjective (-а → -у) and the feminine noun (-а → -у) change to match in the Accusative case: «холо́дну во́ду».',
      },
    ],
    practice: [
      {
        prompt: 'Complete the sentence: «Вона́ слу́хає украї́нську ________.» (from пі́сня "song"):',
        opts: ['пі́сня', 'пі́сню', 'пі́сні'],
        ans: 1,
        audioUk: 'Вона́ слу́хає украї́нську пі́сню.',
        exp: 'Soft feminine nouns ending in -я change to -ю in the Accusative case: пі́сня → пі́сню.',
      },
      {
        prompt: 'Choose the natural way to say "Please give me a cup of coffee":',
        opts: [
          'Да́йте, будь ла́ска, ча́шку ка́ви.',
          'Да́йте, будь ла́ска, ча́шка ка́ва.',
          'Да́йте, будь ла́ска, ча́шкою ка́вою.',
        ],
        ans: 0,
        audioUk: 'Да́йте, будь ла́ска, ча́шку ка́ви.',
        exp: '«ча́шку» is the Accusative direct object of «да́йте» ("give a cup"), and «ка́ви» means "of coffee".',
      },
      {
        prompt: 'How do you ask "What do you want?" using the verb «хоті́ти» (to want)?',
        opts: ['Що ти хо́чеш?', 'Що ти хоті́ти?', 'Що ти хо́чуть?'],
        ans: 0,
        audioUk: 'Що ти хо́чеш?',
        exp: '«хоті́ти» conjugates as: я хо́чу, ти хо́чеш, він/вона́ хо́че, ми хо́чемо, ви хо́чете, вони́ хо́чуть.',
      },
      {
        prompt: 'Complete the sentence: «Я купу́ю ________ су́мку.» ("I am buying a new bag"):',
        opts: ['нови́й', 'нова́', 'нову́'],
        ans: 2,
        audioUk: 'Я купу́ю нову́ су́мку.',
        exp: 'Because «су́мку» is a feminine Accusative direct object, the adjective also takes -у: «нову́ су́мку».',
      },
      {
        prompt: 'You have finished your meal at a restaurant and want the check. What do you say?',
        opts: [
          'Принесі́ть, будь ла́ска, раху́нок.',
          'Принесі́ть, будь ла́ска, вокза́л.',
          'Де тут апте́ка?',
        ],
        ans: 0,
        audioUk: 'Принесі́ть, будь ла́ска, раху́нок.',
        exp: '«раху́нок» means "the bill / check".',
      },
    ],
    vocab: [
      ['хоті́ти', 'VERB', 'to want (хо́чу, хо́чеш, хо́че, хо́чуть)', 'Я хо́чу замо́вити ка́ву.', 'I want to order coffee.'],
      ['замовля́ти', 'VERB', 'to order (imperfective: замовля́ю)', 'Ми вже замовля́ємо обі́д.', 'We are already ordering lunch.'],
      ['замо́вити', 'VERB (pf)', 'to order (completed: замо́влю)', 'Що ви хо́чете замо́вити?', 'What do you want to order?'],
      ['сніда́нок', 'NOUN', 'breakfast', 'Смачни́й сніда́нок удо́ма.', 'A delicious breakfast at home.'],
      ['обі́д', 'NOUN', 'lunch', 'Ми йдемо́ на обі́д.', 'We are going for lunch.'],
      ['вече́ря', 'NOUN', 'dinner / supper (Acc. вече́рю)', 'Ма́ма готу́є вече́рю.', 'Mom is cooking dinner.'],
      ['варе́ники', 'NOUN', 'varenyky / Ukrainian dumplings', 'Я люблю́ варе́ники з ви́шнями.', 'I love varenyky with cherries.'],
      ['суп', 'NOUN', 'soup', 'Гаря́чий овоче́вий суп.', 'Hot vegetable soup.'],
      ['сир', 'NOUN', 'cheese / cottage cheese', 'Хліб і сві́жий сир.', 'Bread and fresh cheese.'],
      ['цу́кор', 'NOUN', 'sugar (Gen. цу́кру)', 'Ка́ва без цу́кру.', 'Coffee without sugar.'],
      ['ча́шка', 'NOUN', 'cup (Acc. ча́шку)', 'Да́йте, будь ла́ска, ча́шку ча́ю.', 'Please give me a cup of tea.'],
      ['скля́нка', 'NOUN', 'glass (Acc. скля́нку)', 'Скля́нка чисто́ї води́.', 'A glass of clean water.'],
      ['раху́нок', 'NOUN', 'bill / check / account', 'Принесі́ть, будь ла́ска, раху́нок.', 'Please bring the check.'],
      ['кав’я́рня', 'NOUN', 'coffee shop / café (Acc. кав’я́рню)', 'Це моя́ улю́блена кав’я́рня.', 'This is my favorite coffee shop.'],
      ['рестора́н', 'NOUN', 'restaurant', 'Затишни́й украї́нський рестора́н.', 'A cozy Ukrainian restaurant.'],
    ],
    exam: [
      {
        q: 'Which sentence correctly translates "I am reading an interesting book"?',
        opts: [
          'Я чита́ю ціка́ва кни́жка.',
          'Я чита́ю ціка́ву кни́жку.',
          'Я чита́ю ціка́вий кни́жку.',
        ],
        ans: 1,
        exp: 'Both «ціка́ва» and «кни́жка» change -а to -у because the book is the feminine direct object of «чита́ю».',
      },
      {
        q: 'Which sentence correctly translates "We are drinking hot tea"?',
        opts: [
          'Ми п’ємо́ гаря́чий чай.',
          'Ми п’ємо́ гаря́чу ча́ю.',
          'Ми п’ємо́ гаря́че чай.',
        ],
        ans: 0,
        exp: '«чай» is an inanimate masculine noun, so both the adjective and noun stay in their dictionary form in the Accusative case.',
      },
      {
        q: 'What is the Accusative direct object form of the soft feminine noun «вече́ря» (dinner) in "I am cooking dinner"?',
        opts: ['Я готу́ю вече́ря.', 'Я готу́ю вече́рю.', 'Я готу́ю вече́рі.'],
        ans: 1,
        exp: 'Feminine nouns ending in -я change -я to -ю in the Accusative singular: вече́ря → вече́рю.',
      },
      {
        q: 'How do you say "They want" using «хоті́ти»?',
        opts: ['вони́ хо́чуть', 'вони́ хо́че', 'вони́ хо́чете'],
        ans: 0,
        exp: 'The 3rd-person plural of «хоті́ти» is «вони́ хо́чуть».',
      },
      {
        q: 'What does «Ка́ва без цу́кру» mean?',
        opts: ['Coffee with milk', 'Coffee without sugar', 'Hot tea with lemon'],
        ans: 1,
        exp: '«без» means "without", and «цу́кру» is the Genitive form of «цу́кор» (sugar).',
      },
      {
        q: 'How do you politely ask "Can I pay by card?" in a café or store?',
        opts: [
          'Чи мо́жна оплати́ти ка́рткою?',
          'Де тут банкома́т?',
          'Скі́льки у вас ка́рток?',
        ],
        ans: 0,
        exp: '«Чи мо́жна оплати́ти ка́рткою?» is the natural everyday phrase for "Can I pay by card?".',
      },
    ],
  },
  {
    id: 'A1.4',
    level: 'A1',
    topicTag: 'A1 Beginner • Family, Possession & Locations',
    title: 'Family, Saying What You Have & Basic Locations (Genitive & Locative Intro)',
    objectives: [
      'Talk about family members and express possession using both «У ме́не є...» and the verb «ма́ти».',
      'Say what you do NOT have using «У ме́не нема́є...» + the Genitive case.',
      'Say where you live, study, or work using «у / в» and «на» + the Locative case.',
    ],
    summary:
      'In this lesson, you will learn how to talk about your family, say what you have and don’t have, and describe where people and places are located. You will also discover one of Ukrainian’s most pleasant features: alternating between «у» and «в» so sentences flow smoothly!',
    rules: [
      '<b>1. Two Ways to Say "I Have" in Ukrainian</b>: Unlike Russian, Ukrainian actively uses BOTH the "by me there is" pattern AND a regular verb <b>ма́ти</b> (to have):<ul><li>Pattern A: <b>У ме́не є...</b> (I have), <b>У те́бе є...</b> (You have), <b>У ньо́го є...</b> (He has), <b>У не́ї є...</b> (She has), <b>У нас є...</b> (We have), <b>У вас є...</b> (You have), <b>У них є...</b> (They have) + Nominative subject (<i>У ме́не є сестра́ і брат</i>).</li><li>Pattern B: Verb <b>ма́ти</b> (я <b>ма́ю</b>, ти <b>ма́єш</b>, він/вона́ <b>ма́є</b>, ми <b>ма́ємо</b>, ви <b>ма́єте</b>, вони́ <b>ма́ють</b>) + Accusative direct object (<i>Я ма́ю сестру́ і бра́та; Чи ти ма́єш час?</i>).</li></ul>',
      '<b>2. Saying "I Don’t Have" («нема́є» + Genitive Case)</b>: Whenever you say someone does NOT have something (or something is not present) using <b>нема́є</b> (short form: <b>нема́</b>), the noun after <b>нема́є</b> changes to the <b>Genitive case</b>:<ul><li>Feminine <b>-а/-я → -и/-і</b>: <i>сестра́ → У ме́не нема́є <b>сестри́</b>; ка́ва → Нема́є <b>ка́ви</b>; сім’я́ → Нема́є <b>сім’ї́</b></i>.</li><li>Masculine & Neuter <b>→ -а/-я or -у/-ю</b>: <i>брат → У ме́не нема́є <b>бра́та</b>; час → У ме́не нема́є <b>ча́су</b>; вікно́ → Нема́є <b>вікна́</b></i>.</li></ul>',
      '<b>3. Saying Where You Are («у/в» & «на» + Locative Case)</b>: To answer <b>Де?</b> (Where — static location), use <b>у / в</b> ("in/at" for cities, countries, rooms, and most buildings) or <b>на</b> ("on/at" for surfaces, open spaces, events, and a few words like <b>на робо́ті</b> "at work", <b>на ву́лиці</b> "on the street", <b>на вокза́лі</b> "at the station"). After <b>у/в</b> and <b>на</b>, most singular nouns end in <b>-і</b> (or <b>-у</b> after <i>-ок/-к</i>):<ul><li><i>Ки́їв → <b>у Ки́єві</b>; Львів → <b>у Льво́ві</b>; Украї́на → <b>в Украї́ні</b>; шко́ла → <b>у шко́лі</b>; стіл → <b>на столі́</b>; робо́та → <b>на робо́ті</b>; буди́нок → <b>у буди́нку</b>; парк → <b>у па́рку</b></i>.</li><li><b>Consonant Swap Before -і</b>: If a noun stem ends in <b>к, г, х</b>, that consonant softens before the Locative ending <b>-і</b>: <b>к → ц</b> (<i>кни́жка → у кни́жці; апте́ка → в апте́ці; рік → у ро́ці</i>), <b>г → з</b> (<i>доро́га → на доро́зі</i>), <b>х → с</b>!</li></ul>',
      '<b>4. Smooth Flow (Euphony): Choosing «у» vs. «в» and «і» vs. «й»</b>: Both <b>у</b> and <b>в</b> mean "in/at". Use <b>в</b> before vowels (<i><b>в</b> Украї́ні, <b>в</b> о́фісі, <b>в</b> апте́ці</i>) and <b>у</b> before consonants or clusters (<i><b>у</b> Ки́єві, <b>у</b> Льво́ві, <b>у</b> шко́лі</i>) so your speech never gets stuck on hard consonant clusters!',
      '<b>5. Family Possessive Adjectives (ма́мин, ба́тьків) & Reflexive «свій»</b>:<ul><li>Instead of saying "of mom" or "of father", Ukrainian forms warm <b>possessive adjectives</b> directly from singular family members and first names:<ul><li>From feminine nouns in <i>-а/-я</i> → add <b>-ин / -їн</b> (f. <b>-ина</b>, n. <b>-ине</b>, pl. <b>-ині</b>): <b>ма́ма → ма́мин голос, ма́мина пора́да</b>; <b>сестра́ → се́стрин зо́шит</b>; <b>Марі́я → Марі́їн</b>.</li><li>From masculine nouns → add <b>-ів / -їв</b> (f. <b>-ова/-єва</b>, n. <b>-ове/-єве</b>, pl. <b>-ові/-єві</b>): <b>ба́тько → ба́тьків дім, ба́тькова кни́жка</b>; <b>брат → бра́тів телефо́н</b>; <b>Андрі́й → Андрі́їв</b>.</li></ul></li><li>Use <b>свій (своя́, своє́, свої́)</b> to mean "one’s own" (my own, your own, his/her own) whenever the owner is the subject of the sentence: <b>Я люблю́ свою́ сім’ю́</b>; <b>Він чита́є свою́ кни́жку</b>.</li></ul>',
      '<b>6. Pronoun Stress Shift After Prepositions, Locative in «-у» & Declining «ма́ти»</b>:<ul><li>Notice how the Genitive/Accusative pronouns <b>мене́</b> (me) and <b>тебе́</b> (you) shift their stress onto the first syllable right after a preposition: <i>Він ба́чить <b>мене́</b></i>, but <b>У ме́не є час</b>, <b>бі́ля ме́не</b>, <b>до те́бе</b>! Also remember that 3rd-person pronouns add an initial <b>н-</b> after prepositions: <b>у ньо́го</b>, <b>у не́ї</b>, <b>до них</b>, <b>з ним</b>, <b>з не́ю</b>.</li><li>While most masculine nouns take <b>-і</b> (or <b>-ові/-еві</b> for people) in the Locative case, masculine nouns ending in <b>-к / -ок</b> and several monosyllabic nouns take <b>-у́</b>: <b>у буди́нку</b> (in the building), <b>у па́рку</b> (in the park), <b>у лі́жку</b> (in bed), <b>в саду́</b> (in the orchard), <b>на даху́</b> (on the roof), <b>у снігу́</b> (in the snow), <b>на мосту́</b> (on the bridge), <b>у Криму́</b> (in Crimea).</li><li>The formal word <b>ма́ти</b> (mother) adds <b>-ер- / -ір-</b> in all other cases: Gen./Dat./Loc. <b>ма́тері</b>, Acc. <b>ма́тір</b>, Inst. <b>ма́тір’ю</b> (with an apostrophe!).</li></ul>',
      '<b>7. Past & Future of Possession («був / не було́»), 4-Way Place Directions & «Що в те́бе ново́го?»</b>:<ul><li><b>Past & Future of «У ме́не є / нема́є»</b>: In the affirmative past/future, the verb <b>бу́ти</b> agrees with the possessed item: <b>У те́бе була́ маши́на?</b> (Did you have a car?), <b>В Оста́па були́ гро́ші</b> (Ostap had money). In the negative, it is ALWAYS impersonal neuter <b>не було́</b> (past) or <b>не бу́де</b> (future) + <b>Genitive</b>: <b>В Оста́па не було́ гро́шей / не бу́де гро́шей</b>!</li><li><b>4-Way Place Contrast</b>: <b>Я іду́ в університе́т</b> (entering inside as a student/worker) vs. <b>до університе́ту</b> (heading to or as far as the university building/stop); <b>з університе́ту</b> (coming out from inside) vs. <b>від університе́ту</b> (walking away from the outside/vicinity of the building).</li><li><b>«Що в те́бе ново́го?» ("What’s new with you?")</b>: After <b>що</b>, <b>щось</b>, or <b>нічо́го</b>, descriptive adjectives take the <b>Neuter Genitive Singular (-ого/-ього)</b>: <b>Що в газе́ті ціка́вого? — Нічо́го ново́го нема́є</b>; <b>Ви́пиймо чого́сь холо́дного!</b></li></ul>',
      '<b>8. Masculine Genitive «-а/-я» vs. «-у/-ю», Negated Direct Objects, & Singulative «-и́на»</b>:<ul><li><b>When Masculine Nouns Take Genitive -а/-я vs. -у/-ю</b>:<ul><li>Take <b>-а / -я</b>: people & animals (<b>бра́та, това́риша, коня́</b>), countable objects, machines & architectural elements (<b>стола́, олівця́, комп’ю́тера, тра́ктора, коридо́ра</b>), units of measurement/currency (<b>кілогра́ма, гекта́ра, мі́сяця, ти́жня, до́лара</b>), and cities/settlements (<b>Ки́єва, Льво́ва, Лондо́на</b>).</li><li>Take <b>-у / -ю</b>: substances & materials (<b>ме́ду, цу́кру, си́ру, ча́ю, борщу́, азо́ту</b>), weather & nature/landscapes (<b>сні́гу, дощу́, ві́тру, моро́зу, лі́су, га́ю, са́ду</b>), large buildings/institutions, abstract concepts & processes (<b>університе́ту, вокза́лу, теа́тру, ча́су, у́спіху, ро́звитку, ру́ху</b>), and rivers, mountain ranges & countries (<b>Дніпра́/Дуна́ю, Кавка́зу, Кри́му, Кита́ю</b>). Notice how a stress shift can even distinguish meaning: <b>мо́сту</b> (Gen. of bridge) vs. <b>мосту́</b> (Loc. <i>на мосту́</i>)!</li></ul></li><li><b>Negated Direct Objects (Genitive vs. Accusative)</b>: After a negated verb (<b>не + verb</b>), an indefinite or general direct object takes the <b>Genitive</b> (<b>Я не купи́в словника́ / кни́жки; Ми не ма́ємо ча́су</b>), whereas a specific, modified object can stay in the <b>Accusative</b> (<b>Я ще не купи́в цю нову́ кни́жку / ва́шу кни́жку</b>).</li><li><b>Singulative Suffix «-и́на» ("One Single Item" from Collective Produce)</b>: Because produce words like <b>капу́ста</b> (cabbage), <b>цибу́ля</b> (onions), and <b>карто́пля</b> (potatoes) are collective singulars, Ukrainian adds stressed <b>-и́на</b> to name a single head, bulb, or tuber: <b>капусти́на</b> (one head of cabbage), <b>цибули́на</b> (one onion), <b>картопли́на</b> (one potato)!</li></ul>',
      '<b>9. Locative «-у/-ю» After «по» vs. «-і» After «у/на», Street-Name Patterns, & «зва́ти» vs. «назива́тися»</b>:<ul><li><b>Why «у мі́сті» Changes to «по мі́сту»</b>: Inanimate masculine and neuter nouns that take <b>-і</b> after static <b>у/на</b> (<i>у мі́сті, у селі́, у це́нтрі, у теа́трі, на вокза́лі, у по́лі, на мо́рі</i>) switch to <b>-у / -ю</b> after the preposition <b>по</b> meaning "around / along / through": <b>ходи́ти по мі́сту, по селу́, по це́нтру, по теа́тру, по вокза́лу</b>; <b>бі́гати по по́лю</b>; <b>пла́вати по мо́рю</b>! (You can also express this with the bare Traversive Instrumental: <b>гуля́ти мі́стом, па́рком, ву́лицею, лі́сом</b>.) With plural days or times of day, <b>по + Locative plural (-ах/-ях)</b> means "on [Mondays] / in the [evenings]": <b>по понеді́лках, по субо́тах, по вечора́х</b>.</li><li><b>Two Patterns of Ukrainian Street & Square Names</b>:<ul><li>Pattern 1 (<b>Adjective + ву́лиця / пло́ща / проспе́кт</b>): Both words decline together → <b>Володи́мирська ву́лиця → на Володи́мирській ву́лиці</b>, <b>Контракто́ва пло́ща → на Контракто́вій пло́щі</b>, <b>Андрі́ївський узві́з → на Андрі́ївському узво́зі</b>.</li><li>Pattern 2 (<b>ву́лиця / пло́ща / бульва́р + Genitive of Person’s Name</b>): Only the word <i>ву́лиця / пло́ща / бульва́р</i> declines, while the Genitive name stays unchanged → <b>ву́лиця Мазе́пи → на ву́лиці Мазе́пи</b>, <b>бульва́р Шевче́нка → на бульва́рі Шевче́нка</b>!</li></ul></li><li><b>People Have an «ім’я́» («зва́ти»), Things Have a «на́зва» («назива́тися»), & «мі́сто» vs. «мі́сце»</b>:<ul><li>Use <b>Як зва́ти + Accusative?</b> for people and pets (<i>Як зва́ти ва́шого бра́та? — Мого́ бра́та зва́ти Яре́ма</i>), and <b>Як назива́ється + Nominative?</b> for cities, streets, books, films, and cafés (<i>Як назива́ється цей фільм / ця ву́лиця?</i>). Proper titles in quotation marks stay in the <b>Nominative</b> when preceded by a generic noun: <b>у кінотеа́трі «Украї́на»</b>, <b>у книга́рні «Є»</b>, <b>в готе́лі «Десна́»</b>.</li><li>Never confuse <b>мі́сто</b> (city → adjective <b>міськи́й</b> = urban/municipal, <i>міськи́й тра́нспорт</i>) with <b>мі́сце</b> (place, seat, or room → adjective <b>місце́вий</b> = local, <i>місце́вий час</i>; <b>У вас є ві́льні місця́?</b> = Do you have free seats/vacancies?).</li></ul></li></ul>',
      '<b>10. The 3-Way Spatial Orientation Matrix («де? / куди́? / зві́дки?»), Ukrainian Floor Numbering & Apartment Classifieds</b>:<ul><li><b>3-Way Spatial Adverbs (Location vs. Destination vs. Origin)</b>: Just as prepositions distinguish <b>у/на + Locative</b> (where at), <b>у/на + Accusative or до + Genitive</b> (where to), and <b>з/від + Genitive</b> (where from), Ukrainian spatial adverbs form systematic three-column triads:<ul><li>Here: <b>тут</b> (at here) — <b>сюди́</b> (to here) — <b>зві́дси</b> (from here)</li><li>There: <b>там</b> (at there) — <b>туди́</b> (to there) — <b>зві́дти</b> (from there)</li><li>Home: <b>вдо́ма / удо́ма</b> (at home) — <b>додо́му</b> (homeward) — <b>здо́му</b> (from home)</li><li>In front / ahead: <b>попе́реду</b> (ahead) — <b>впере́д / напере́д</b> (forward) — <b>спе́реду</b> (from the front)</li><li>Behind / back: <b>поза́ду</b> (behind) — <b>наза́д</b> (backward / back) — <b>зза́ду</b> (from behind)</li><li>Left / right / up / down: <b>ліво́руч / налі́во</b> (on/to the left) — <b>злі́ва</b> (from/on the left); <b>право́руч / напра́во</b> — <b>спра́ва</b>; <b>нагорі́ / вгорі́</b> (upstairs / above) — <b>наго́ру / вго́ру</b> (upward) — <b>згори́</b> (from above); <b>внизу́</b> (downstairs / below) — <b>вниз</b> (downward) — <b>зни́зу</b> (from below).</li></ul></li><li><b>Ukrainian Floor Numbering & Apartment Block Vocabulary</b>:<ul><li>In Ukraine (as in North America), the ground/street level is the <b>пе́рший по́верх</b> ("first floor"), so British "3rd floor" is <b>четве́ртий по́верх</b> (<i>на четве́ртому по́версі</i>)!</li><li>Entering an apartment building: <b>під’ї́зд</b> (building entrance/stairwell section: <i>дру́гий під’ї́зд</i>), <b>код на дверя́х</b> (door keypad code), <b>схі́дці</b> (stairs: <i>підніма́тися схі́дцями наго́ру</i>), <b>ліфт</b> (elevator).</li><li>Apartment classifieds (<b>оголо́шення</b>): <b>здава́ти / зда́ти кварти́ру</b> (to rent out / let an apartment as landlord) vs. <b>найма́ти / найня́ти (зніма́ти / зня́ти) кварти́ру без посере́дників</b> (to rent an apartment as tenant without middlemen/brokers).</li></ul></li><li><b>Standard Ukrainian Postal Address Abbreviations</b>: Envelopes and directories write the 5-digit postcode (<b>пошто́вий і́ндекс</b>), city, street, building, and apartment using standard abbreviations: <b>вул.</b> (<i>ву́лиця</i>), <b>пл.</b> (<i>пло́ща</i>), <b>пров.</b> (<i>прову́лок</i>), <b>просп.</b> (<i>проспе́кт</i>), <b>б-р</b> (<i>бульва́р</i>), <b>буд.</b> (<i>буди́нок</i>), <b>корп.</b> (<i>ко́рпус</i> = building wing), <b>пов.</b> (<i>по́верх</i>), <b>кв.</b> (<i>кварти́ра</i>).</li></ul>',
    ],
    examples: [
      { uk: 'У ме́не є ста́рший брат і моло́дша сестра́.', en: 'I have an older brother and a younger sister.' },
      { uk: 'Ви́бач, але́ сього́дні у ме́не нема́є ві́льного ча́су.', en: 'Sorry, but today I do not have free time (час → ча́су after нема́є).' },
      { uk: 'Мої́ батьки́ живу́ть у Ки́єві, а сестра́ навча́ється у Льво́ві.', en: 'My parents live in Kyiv, and my sister studies in Lviv.' },
      { uk: 'Кни́жка лежи́ть на столі́, а вітамі́ни продаю́ть в апте́ці.', en: 'The book is lying on the table, and vitamins are sold at the pharmacy (апте́ка → в апте́ці).' },
      { uk: 'Це ма́мина улю́блена ча́шка і ба́тьків робо́чий стіл, а діду́сь за́раз відпочива́є в саду́.', en: 'This is mom’s favorite cup and father’s work desk, and grandfather is resting in the orchard right now.' },
      { uk: 'Учо́ра в нас не було́ ві́льного ча́су. Що в те́бе ново́го й ціка́вого?', en: 'Yesterday we had no free time (impersonal не було́ + Gen.). What is new and interesting with you?' },
      { uk: 'Ми купи́ли кілогра́м ме́ду, вели́ку капусти́ну і дві цибули́ни, але́ ще не купи́ли словника́.', en: 'We bought a kilogram of honey (ме́ду), a large head of cabbage (капусти́на), and two onions (цибули́ни), but haven’t bought a dictionary (словника́) yet.' },
      { uk: 'По субо́тах ми гуля́ємо по мі́сту, заходимо до книга́рні «Є» на Володи́мирській ву́лиці або́ на бульва́рі Шевче́нка.', en: 'On Saturdays (по субо́тах) we walk around the city (по мі́сту in -у) and stop by the "Ye" Bookstore on Volodymyrska Street or on Shevchenko Boulevard.' },
      { uk: 'За оголо́шенням у газе́ті ми найняли́ двокімна́тну кварти́ру без посере́дників: дру́гий під’ї́зд, четве́ртий по́верх нагорі́, код на дверя́х 38.', en: 'Through a newspaper ad we rented a two-room apartment without brokers: second entrance, fourth floor upstairs, door code 38.' },
    ],
    dialogue: {
      title: 'Talking About Family and Where They Live',
      lines: [
        { speaker: 'Ю́лія', uk: 'Розкажи́ про свою́ сім’ю́! Чи у те́бе є брат або́ сестра́?', en: 'Tell me about your family! Do you have a brother or a sister?' },
        { speaker: 'Павло́', uk: 'У ме́не є сестра́, але́ нема́є бра́та. Моя́ сестра́ живе́ в Оде́сі.', en: 'I have a sister, but I do not have a brother. My sister lives in Odesa.' },
        { speaker: 'Ю́лія', uk: 'А ким вона́ працю́є?', en: 'And what does she do for work?' },
        { speaker: 'Павло́', uk: 'Вона́ лі́кар і працю́є в вели́кій ліка́рні. А де живу́ть твої́ батьки́?', en: 'She is a doctor and works at a large hospital. And where do your parents live?' },
        { speaker: 'Ю́лія', uk: 'Мої́ батьки́ живу́ть тут, у Ки́єві. За́раз та́то на робо́ті, а ма́ма вдо́ма.', en: 'My parents live here in Kyiv. Right now dad is at work, and mom is at home.' },
      ],
    },
    activeRecall: [
      { promptEn: 'I have a question.', answerUk: 'У ме́не є пита́ння.', hint: 'У ме́не є + пита́ння' },
      { promptEn: 'I do not have time. (час → ?)', answerUk: 'У ме́не нема́є ча́су.', hint: 'After нема́є, час takes Genitive -у' },
      { promptEn: 'in Kyiv (Locative case)', answerUk: 'у Ки́єві', hint: 'Ки́їв → у Ки́єві' },
      { promptEn: 'at work (Locative case)', answerUk: 'на робо́ті', hint: 'робо́та takes на + -і' },
    ],
    reviewSummary:
      'Use У ме́не є... (or Я ма́ю...) to say what you have, and У ме́не нема́є + Genitive (нема́є ча́су, нема́є ка́ви, нема́є бра́та) to say what you do not have. For static location ("in/at"), use у/в or на + Locative (у Ки́єві, в Украї́ні, на робо́ті, в апте́ці).',
    cfu: [
      {
        q: 'What happens to a noun when it comes after «нема́є» ("there is no / do not have")?',
        opts: [
          'It stays in the Nominative dictionary form',
          'It changes to the Genitive case (for example: ка́ва → нема́є ка́ви, час → нема́є ча́су)',
          'It becomes plural',
        ],
        ans: 1,
        exp: 'Expressing absence or non-possession with «нема́є» always requires the Genitive case in Ukrainian.',
      },
      {
        q: 'Why does «апте́ка» (pharmacy) become «в апте́ці» and «кни́жка» (book) become «у кни́жці» in the Locative case?',
        opts: [
          'Because before the Locative ending -і, stem-final к changes to ц (г → з, х → с)',
          'Because pharmacy is masculine',
          'Because it is a typo',
        ],
        ans: 0,
        exp: 'In Ukrainian, consonants к, г, and х soften before the Locative ending -і: к → ц (апте́ка → в апте́ці), г → з (доро́га → на доро́зі), х → с.',
      },
      {
        q: 'Why do we say «в Украї́ні» and «в апте́ці», but «у Ки́єві» and «у Льво́ві»?',
        opts: [
          '«в» and «у» are different cases',
          'Ukrainian alternates «в» (before vowels) and «у» (before consonants) so speech flows smoothly',
          '«в» is only used for countries',
        ],
        ans: 1,
        exp: 'Both «у» and «в» mean "in". Choosing «в» before vowels and «у» before consonants keeps Ukrainian smooth and melodic.',
      },
    ],
    practice: [
      {
        prompt: 'Complete the sentence: «Сього́дні в магази́ні нема́є ________.» (from молоко́ "milk"):',
        opts: ['молоко́', 'молока́', 'молоці́'],
        ans: 1,
        audioUk: 'Сього́дні в магази́ні нема́є молока́.',
        exp: 'After «нема́є», neuter nouns in -о change to Genitive -а: молоко́ → молока́.',
      },
      {
        prompt: 'How do you say "She has a sister" in Ukrainian?',
        opts: ['У не́ї є сестра́.', 'У її́ є сестра́.', 'Вона́ нема́є сестра́.'],
        ans: 0,
        audioUk: 'У не́ї є сестра́.',
        exp: 'After the preposition «у», «її́» (her) takes an initial н- and becomes «у не́ї»: «У не́ї є сестра́».',
      },
      {
        prompt: 'Choose the correct Locative phrase for "My brother is at work":',
        opts: ['Мій брат на робо́та.', 'Мій брат на робо́ті.', 'Мій брат без робо́ти.'],
        ans: 1,
        audioUk: 'Мій брат на робо́ті.',
        exp: 'Static location "at work" uses «на» + Locative ending -і: «на робо́ті».',
      },
      {
        prompt: 'Choose the correct Locative form for "in the park" and "in the building":',
        opts: ['у па́рку, у буди́нку', 'у па́рці, у буди́нці', 'у парк, у буди́нок'],
        ans: 0,
        audioUk: 'у па́рку, у буди́нку',
        exp: 'Masculine nouns ending in -к/-ок like «парк» and «буди́нок» take -у in the Locative singular: «у па́рку», «у буди́нку».',
      },
      {
        prompt: 'How do you say "We are at home" using a single everyday Ukrainian adverb?',
        opts: ['Ми вдо́ма.', 'Ми додо́му.', 'Ми з до́му.'],
        ans: 0,
        audioUk: 'Ми вдо́ма.',
        exp: '«вдо́ма» (or «удо́ма») means "at home" (static location), whereas «додо́му» means "homeward / going home".',
      },
    ],
    vocab: [
      ['ба́тько', 'NOUN', 'father', 'Мій ба́тько інжене́р.', 'My father is an engineer.'],
      ['брат', 'NOUN', 'brother (Gen. бра́та)', 'У ме́не є ста́рший брат.', 'I have an older brother.'],
      ['сестра́', 'NOUN', 'sister (Gen. сестри́)', 'У ме́не нема́є сестри́.', 'I do not have a sister.'],
      ['син', 'NOUN', 'son', 'Ї́хній син навча́ється в шко́лі.', 'Their son studies at school.'],
      ['дочка́', 'NOUN', 'daughter (also до́нька)', 'Ї́хня дочка́ живе́ у Льво́ві.', 'Their daughter lives in Lviv.'],
      ['батьки́', 'NOUN', 'parents (plural)', 'Мої́ батьки́ за́раз удо́ма.', 'My parents are at home right now.'],
      ['діду́сь', 'NOUN', 'grandfather', 'Діду́сь чита́є газе́ту в саду́.', 'Grandfather is reading a newspaper in the garden.'],
      ['бабу́ся', 'NOUN', 'grandmother', 'Бабу́ся готу́є смачни́й пирі́г.', 'Grandmother is baking a tasty pie.'],
      ['ма́ти', 'VERB', 'to have (ма́ю, ма́єш, ма́є, ма́ють)', 'Чи ти ма́єш ві́льний час?', 'Do you have free time?'],
      ['нема́є', 'PRED', 'there is no / do not have (+ Genitive)', 'Сього́дні у ме́не нема́є ча́су.', 'Today I do not have time.'],
      ['робо́та', 'NOUN', 'work / job (Loc. на робо́ті)', 'Він за́раз на робо́ті.', 'He is at work right now.'],
      ['шко́ла', 'NOUN', 'school (Loc. у шко́лі)', 'Ді́ти в шко́лі.', 'The children are at school.'],
      ['апте́ка', 'NOUN', 'pharmacy (Loc. в апте́ці)', 'Апте́ка поруч із до́мом.', 'The pharmacy is next to the house.'],
      ['вдо́ма', 'ADV', 'at home (variant: удо́ма)', 'Уве́чері ми бу́демо вдо́ма.', 'In the evening we will be at home.'],
      ['додо́му', 'ADV', 'home / homeward (direction)', 'Я вже іду́ додо́му.', 'I am already walking home.'],
    ],
    exam: [
      {
        q: 'Translate "I don’t have coffee" into Ukrainian:',
        opts: ['У ме́не нема́є ка́ви.', 'У ме́не нема́є ка́ва.', 'Я не є ка́ва.'],
        ans: 0,
        exp: 'After «нема́є», feminine «ка́ва» changes to the Genitive form «ка́ви».',
      },
      {
        q: 'Which sentence correctly says "We live in Lviv"?',
        opts: ['Ми живемо́ у Львів.', 'Ми живемо́ у Льво́ві.', 'Ми живемо́ без Льво́ва.'],
        ans: 1,
        exp: 'In the Locative case ("in Lviv"), the closed-syllable «і» in «Львів» alternates to «о» in the open syllable: «у Льво́ві».',
      },
      {
        q: 'How do you say "He has a new car" using the «У... є» construction?',
        opts: ['У ньо́го є нова́ маши́на.', 'У він є нова́ маши́на.', 'У його́ нема́є нова́ маши́на.'],
        ans: 0,
        exp: 'After the preposition «у», «його́» (him) takes an initial н- and becomes «у ньо́го»: «У ньо́го є нова́ маши́на».',
      },
      {
        q: 'What is the Locative form of «кни́жка» (book) after «у» ("in the book")?',
        opts: ['у кни́жкі', 'у кни́жці', 'у кни́жку'],
        ans: 1,
        exp: 'Before the Locative ending -і, stem-final к mutates to ц: кни́жка → у кни́жці.',
      },
      {
        q: 'What is the difference between «вдо́ма» and «додо́му»?',
        opts: [
          '«вдо́ма» means "at home" (where you are), while «додо́му» means "homeward / going home" (where you are going)',
          'They are interchangeable',
          '«вдо́ма» is plural and «додо́му» is singular',
        ],
        ans: 0,
        exp: 'Use «вдо́ма» for static location (Я вдо́ма = I am at home) and «додо́му» with motion verbs (Я іду́ додо́му = I am going home).',
      },
      {
        q: 'Which sentence uses the verb «ма́ти» (to have) + Accusative direct object correctly?',
        opts: ['Я ма́ю ціка́ву робо́ту.', 'Я ма́ю ціка́ва робо́та.', 'Я ма́ти ціка́ву робо́ту.'],
        ans: 0,
        exp: '«Я ма́ю» is a transitive verb, so its feminine direct object «ціка́ва робо́та» takes the Accusative case: «ціка́ву робо́ту».',
      },
    ],
  },
];
