import type { VocabItem } from './vocabData.ts';

export interface PhoneticsResult {
  ipa: string;
  approxEn: string;
  plainGuide: string;
  notes: string;
}

export interface GrammarBreakdownResult {
  summaryTag: string;
  usageNote: string;
  exampleRu: string;
  exampleEn: string;
  spokenSummary: string;
  tableHtml: string;
}

export interface SentenceCorrectionResult {
  wrongRu: string;
  wrongWord: string;
  rightWord: string;
  rightRu: string;
  enMeaning: string;
  ruleTitle: string;
  explanation: string;
  spokenExplanation: string;
}

export function expandPosForSpeech(pos: string): string {
  const map: Record<string, string> = {
    NOUN: 'noun',
    VERB: 'imperfective verb',
    'VERB (pf)': 'perfective verb',
    ADJ: 'adjective',
    DET: 'determiner',
    PRON: 'pronoun',
    PREP: 'preposition',
    CONJ: 'conjunction',
    PART: 'particle',
    ADV: 'adverb',
    NUM: 'number word',
    PHRASE: 'everyday expression',
    PRED: 'predicative expression',
  };
  return map[pos] || pos.toLowerCase();
}

export function cleanEnForSpeech(en: string): string {
  return en
    .replace(/\(.*?\)/g, '')
    .replace(/\//g, ' or ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function mutateStemBeforeI(stem: string): string {
  const clean = stem.replace(/\u0301/g, '');
  const last = clean.slice(-1);
  if (last === 'к') return stem.replace(/к(\u0301?)$/i, 'ц$1');
  if (last === 'г') return stem.replace(/г(\u0301?)$/i, 'з$1');
  if (last === 'х') return stem.replace(/х(\u0301?)$/i, 'с$1');
  return stem;
}

// ============================================================================
// 1. UKRAINIAN PRONUNCIATION & PHONETICS ENGINE (BEGINNER-FRIENDLY + IPA)
// ============================================================================
export function generateUkrainianPhonetics(stressedWord: string): PhoneticsResult {
  const w = stressedWord.toLowerCase().trim();
  let stressIdx = -1;
  let clean = '';
  for (let i = 0; i < w.length; i++) {
    if (w[i] === '\u0301') stressIdx = clean.length - 1;
    else clean += w[i];
  }
  const vowels = 'аоуеиіїяює';
  if (stressIdx === -1) {
    for (let i = 0; i < clean.length; i++) {
      if (vowels.includes(clean[i])) {
        stressIdx = i;
        break;
      }
    }
  }

  const softFollow = 'іїяюєь';
  const consMap: Record<string, string> = {
    б: 'b',
    г: 'ɦ',
    ґ: 'ɡ',
    д: 'd',
    ж: 'ʒ',
    з: 'z',
    й: 'j',
    к: 'k',
    л: 'l',
    м: 'm',
    н: 'n',
    п: 'p',
    р: 'r',
    с: 's',
    т: 't',
    ф: 'f',
    х: 'x',
    ц: 'ts',
    ч: 'tʃ',
    ш: 'ʃ',
    щ: 'ʃtʃ',
  };

  const enConsMap: Record<string, string> = {
    б: 'b',
    г: 'h',
    ґ: 'g',
    д: 'd',
    ж: 'zh',
    з: 'z',
    й: 'y',
    к: 'k',
    л: 'l',
    м: 'm',
    н: 'n',
    п: 'p',
    р: 'r',
    с: 's',
    т: 't',
    ф: 'f',
    х: 'kh',
    ц: 'ts',
    ч: 'ch',
    ш: 'sh',
    щ: 'shch',
  };

  const ipa: string[] = [];
  const approxParts: string[] = [];
  const notes: string[] = [];

  for (let i = 0; i < clean.length; i++) {
    const c = clean[i];
    const nxt = clean[i + 1] || '';
    const prev = clean[i - 1] || '';

    if (c === ' ' || c === '-') {
      ipa.push(c);
      approxParts.push(c);
      continue;
    }
    if (c === 'ь') continue;
    if (c === "'" || c === '’' || c === 'ʼ') {
      notes.push("Apostrophe (’): briefly separate the consonant from the following 'y' sound");
      approxParts.push('-');
      continue;
    }

    if (c === 'д' && (nxt === 'ж' || nxt === 'з')) {
      const aff = nxt === 'ж' ? 'dʒ' : softFollow.includes(clean[i + 2] || '') ? 'dzʲ' : 'dz';
      ipa.push(aff);
      approxParts.push(nxt === 'ж' ? 'j' : 'dz');
      notes.push(`Digraph 'д${nxt}' is spoken smoothly as a single sound [${aff}]`);
      i++;
      continue;
    }

    if (c === 'в') {
      const isWordEnd = i === clean.length - 1 || nxt === ' ';
      const beforeCons = nxt && !vowels.includes(nxt) && nxt !== 'ь' && nxt !== ' ';
      if (isWordEnd || (beforeCons && vowels.includes(prev)) || (i === 0 && beforeCons)) {
        ipa.push('w');
        approxParts.push('w');
        notes.push("Letter 'в' at the end of a syllable sounds like a rounded English 'w' (never 'f')");
      } else if (nxt === 'і') {
        ipa.push('vʲ');
        approxParts.push('v');
      } else {
        ipa.push('v');
        approxParts.push('v');
      }
      continue;
    }

    if (vowels.includes(c)) {
      const isStressed = i === stressIdx;
      const afterVowelOrStartOrApostrophe =
        i === 0 ||
        prev === ' ' ||
        vowels.includes(prev) ||
        prev === "'" ||
        prev === '’' ||
        prev === 'ь';
      let vSym = '';
      let enSym = '';
      if (c === 'а') {
        vSym = 'ɑ';
        enSym = 'ah';
      } else if (c === 'о') {
        const nextSyllHigh = /.[уіїю]/.test(clean.slice(i + 1, i + 4));
        vSym = !isStressed && nextSyllHigh ? 'o' : 'ɔ';
        enSym = 'o';
        if (!isStressed) {
          notes.push("Unstressed 'о' stays a clear 'o' sound in Ukrainian (never turns into 'a')");
        }
      } else if (c === 'у') {
        vSym = 'u';
        enSym = 'oo';
      } else if (c === 'е') {
        vSym = isStressed ? 'ɛ' : 'ɛ~ɪ';
        enSym = 'eh';
      } else if (c === 'и') {
        vSym = isStressed ? 'ɪ' : 'ɪ~ɛ';
        enSym = 'y';
        notes.push("Letter 'и' sounds like short 'i' in English 'bit' [ɪ] and keeps the consonant before it hard");
      } else if (c === 'і') {
        vSym = 'i';
        enSym = 'ee';
        notes.push("Letter 'і' sounds like 'ee' in 'meet' [i] and softens the consonant before it");
      } else if (c === 'ї') {
        vSym = 'ji';
        enSym = 'yi';
        notes.push("Letter 'ї' always starts with a 'y' sound: 'yee' [ji]");
      } else if (c === 'я') {
        vSym = afterVowelOrStartOrApostrophe ? 'jɑ' : 'ɑ';
        enSym = afterVowelOrStartOrApostrophe ? 'ya' : 'ia';
      } else if (c === 'ю') {
        vSym = afterVowelOrStartOrApostrophe ? 'ju' : 'u';
        enSym = afterVowelOrStartOrApostrophe ? 'yu' : 'iu';
      } else if (c === 'є') {
        vSym = afterVowelOrStartOrApostrophe ? 'jɛ' : 'ɛ';
        enSym = afterVowelOrStartOrApostrophe ? 'ye' : 'ie';
      }

      ipa.push((isStressed ? 'ˈ' : '') + vSym);
      approxParts.push(isStressed ? enSym.toUpperCase() : enSym);
    } else if (consMap[c]) {
      let s = consMap[c];
      const enC = enConsMap[c] || c;
      if (c === 'г') notes.push("Ukrainian 'г' is a warm, voiced 'h' sound [ɦ] (like 'h' in 'aha')");
      if (c === 'ґ') notes.push("Ukrainian 'ґ' with an upturned hook is a hard 'g' sound [ɡ] as in 'go'");
      if (c === 'щ') notes.push("Letter 'щ' combines two crisp sounds: 'sh' + 'ch' [ʃtʃ]");

      const canSoften = 'дтзсцлнр'.includes(c);
      const semiSoftBeforeI = 'бпвмфкгхжчшщ'.includes(c) && nxt === 'і';
      if (canSoften && softFollow.includes(nxt)) {
        s += 'ʲ';
        if (nxt === 'ь') {
          notes.push(`Soft sign 'ь' softens '${c}' by raising the middle of the tongue [${s}]`);
        }
      } else if (semiSoftBeforeI) {
        s += 'ʲ';
      }

      if ((i === clean.length - 1 || nxt === ' ') && 'бдгґжз'.includes(c)) {
        notes.push(`Final '${c}' stays fully voiced [${s}] at the end of a word`);
      }
      ipa.push(s);
      approxParts.push(enC);
    }
  }
  if (!notes.length) {
    notes.push('Pronounce every vowel clearly, putting extra energy on the stressed syllable.');
  }
  const approxStr = approxParts.join('');
  return {
    ipa: `[${ipa.join(' ')}]`,
    approxEn: approxStr,
    plainGuide: approxStr,
    notes: [...new Set(notes)].slice(0, 3).join(' • '),
  };
}

// ============================================================================
// 2. DICTIONARY OVERRIDES FOR NOUNS, PRONOUNS & VERBS
// ============================================================================
interface NounForms {
  gender: string;
  genderSpoken: string;
  declLabel: string;
  sg: { Nom: string; Gen: string; Dat: string; Acc: string; Ins: string; Loc: string; Voc: string };
  pl: { Nom: string; Gen: string; Dat: string; Acc: string; Ins: string; Loc: string; Voc: string };
}

const IRREGULAR_NOUNS: Record<string, NounForms> = {
  рік: {
    gender: 'Masculine',
    genderSpoken: 'Masculine',
    declLabel: 'Masculine Noun (vowel alternation і → о in open syllables)',
    sg: { Nom: 'рік', Gen: 'ро́ку', Dat: 'ро́кові (-у)', Acc: 'рік', Ins: 'ро́ком', Loc: 'ро́ці (у ро́ці)', Voc: 'ро́че' },
    pl: { Nom: 'роки́', Gen: 'ро́ків', Dat: 'рока́м', Acc: 'роки́', Ins: 'рока́ми', Loc: 'рока́х', Voc: 'роки́' },
  },
  день: {
    gender: 'Masculine',
    genderSpoken: 'Masculine',
    declLabel: 'Masculine Soft Noun (fleeting vowel е drops in endings)',
    sg: { Nom: 'день', Gen: 'дня', Dat: 'дне́ві (дню)', Acc: 'день', Ins: 'днем', Loc: 'дні (у дні)', Voc: 'дню' },
    pl: { Nom: 'дні', Gen: 'днів', Dat: 'дням', Acc: 'дні', Ins: 'дня́ми', Loc: 'днях', Voc: 'дні' },
  },
  ти́ждень: {
    gender: 'Masculine',
    genderSpoken: 'Masculine',
    declLabel: 'Masculine Soft Noun (cluster simplification: ти́ждень → ти́жня)',
    sg: { Nom: 'ти́ждень', Gen: 'ти́жня', Dat: 'ти́жневі (-ю)', Acc: 'ти́ждень', Ins: 'ти́жнем', Loc: 'ти́жні', Voc: 'ти́жню' },
    pl: { Nom: 'ти́жні', Gen: 'ти́жнів', Dat: 'ти́жням', Acc: 'ти́жні', Ins: 'ти́жнями', Loc: 'ти́жнях', Voc: 'ти́жні' },
  },
  люди́на: {
    gender: 'Feminine',
    genderSpoken: 'Feminine',
    declLabel: 'Feminine Noun (irregular plural: лю́ди)',
    sg: { Nom: 'люди́на', Gen: 'люди́ни', Dat: 'люди́ні', Acc: 'люди́ну', Ins: 'люди́ною', Loc: 'люди́ні', Voc: 'люди́но' },
    pl: { Nom: 'лю́ди', Gen: 'люде́й', Dat: 'лю́дям', Acc: 'люде́й', Ins: 'людьми́', Loc: 'лю́дях', Voc: 'лю́ди' },
  },
  лю́ди: {
    gender: 'Plural',
    genderSpoken: 'Plural',
    declLabel: 'Plural Noun (singular is люди́на)',
    sg: { Nom: 'люди́на', Gen: 'люди́ни', Dat: 'люди́ні', Acc: 'люди́ну', Ins: 'люди́ною', Loc: 'люди́ні', Voc: 'люди́но' },
    pl: { Nom: 'лю́ди', Gen: 'люде́й', Dat: 'лю́дям', Acc: 'люде́й', Ins: 'людьми́', Loc: 'лю́дях', Voc: 'лю́ди' },
  },
  дити́на: {
    gender: 'Feminine',
    genderSpoken: 'Feminine',
    declLabel: 'Feminine Noun (irregular plural: ді́ти)',
    sg: { Nom: 'дити́на', Gen: 'дити́ни', Dat: 'дити́ні', Acc: 'дити́ну', Ins: 'дити́ною', Loc: 'дити́ні', Voc: 'дити́но' },
    pl: { Nom: 'ді́ти', Gen: 'діте́й', Dat: 'ді́тям', Acc: 'діте́й', Ins: 'дітьми́', Loc: 'ді́тях', Voc: 'ді́ти' },
  },
  друг: {
    gender: 'Masculine (Animate)',
    genderSpoken: 'Masculine',
    declLabel: 'Masculine Animate Noun (г → з in plural: дру́зі)',
    sg: { Nom: 'друг', Gen: 'дру́га', Dat: 'дру́гові (-у)', Acc: 'дру́га', Ins: 'дру́гом', Loc: 'дру́гові', Voc: 'дру́же' },
    pl: { Nom: 'дру́зі', Gen: 'дру́зів', Dat: 'дру́зям', Acc: 'дру́зів', Ins: 'дру́зями', Loc: 'дру́зях', Voc: 'дру́зі' },
  },
  брат: {
    gender: 'Masculine (Animate)',
    genderSpoken: 'Masculine',
    declLabel: 'Masculine Animate Noun',
    sg: { Nom: 'брат', Gen: 'бра́та', Dat: 'бра́тові (-у)', Acc: 'бра́та', Ins: 'бра́том', Loc: 'бра́тові', Voc: 'бра́те' },
    pl: { Nom: 'брати́', Gen: 'браті́в', Dat: 'брата́м', Acc: 'браті́в', Ins: 'брата́ми', Loc: 'брата́х', Voc: 'брати́' },
  },
  ба́тько: {
    gender: 'Masculine (Animate)',
    genderSpoken: 'Masculine',
    declLabel: 'Masculine Noun in -о (declines like a masculine noun)',
    sg: { Nom: 'ба́тько', Gen: 'ба́тька', Dat: 'ба́тькові (-у)', Acc: 'ба́тька', Ins: 'ба́тьком', Loc: 'ба́тькові', Voc: 'ба́тьку' },
    pl: { Nom: 'батьки́', Gen: 'батькі́в', Dat: 'батька́м', Acc: 'батькі́в', Ins: 'батька́ми', Loc: 'батька́х', Voc: 'батьки́' },
  },
  син: {
    gender: 'Masculine (Animate)',
    genderSpoken: 'Masculine',
    declLabel: 'Masculine Animate Noun (Vocative: си́ну!)',
    sg: { Nom: 'син', Gen: 'си́на', Dat: 'си́нові (-у)', Acc: 'си́на', Ins: 'си́ном', Loc: 'си́нові', Voc: 'си́ну' },
    pl: { Nom: 'сини́', Gen: 'сині́в', Dat: 'сина́м', Acc: 'сині́в', Ins: 'сина́ми', Loc: 'сина́х', Voc: 'сини́' },
  },
  хло́пець: {
    gender: 'Masculine (Animate)',
    genderSpoken: 'Masculine',
    declLabel: 'Masculine Soft Animate Noun (fleeting е drops: хло́пця)',
    sg: { Nom: 'хло́пець', Gen: 'хло́пця', Dat: 'хло́пцеві (-ю)', Acc: 'хло́пця', Ins: 'хло́пцем', Loc: 'хло́пцеві', Voc: 'хло́пче' },
    pl: { Nom: 'хло́пці', Gen: 'хло́пців', Dat: 'хло́пцям', Acc: 'хло́пців', Ins: 'хло́пцями', Loc: 'хло́пцях', Voc: 'хло́пці' },
  },
  ді́вчина: {
    gender: 'Feminine (Animate)',
    genderSpoken: 'Feminine',
    declLabel: 'Feminine Animate Noun (plural: дівча́та)',
    sg: { Nom: 'ді́вчина', Gen: 'ді́вчини', Dat: 'ді́вчині', Acc: 'ді́вчину', Ins: 'ді́вчиною', Loc: 'ді́вчині', Voc: 'ді́вчино' },
    pl: { Nom: 'дівча́та', Gen: 'дівча́т', Dat: 'дівча́там', Acc: 'дівча́т', Ins: 'дівча́тами', Loc: 'дівча́тах', Voc: 'дівча́та' },
  },
  о́ко: {
    gender: 'Neuter',
    genderSpoken: 'Neuter',
    declLabel: 'Neuter Noun (irregular plural: о́чі)',
    sg: { Nom: 'о́ко', Gen: 'о́ка', Dat: 'о́кові (о́ку)', Acc: 'о́ко', Ins: 'о́ком', Loc: 'о́ці (в о́ці)', Voc: 'о́ко' },
    pl: { Nom: 'о́чі', Gen: 'оче́й', Dat: 'оча́м', Acc: 'о́чі', Ins: 'очи́ма (оча́ми)', Loc: 'оча́х', Voc: 'о́чі' },
  },
  "ім’я́": {
    gender: 'Neuter',
    genderSpoken: 'Neuter',
    declLabel: 'Neuter Noun with -ен- stem in plural (імена́)',
    sg: { Nom: 'ім’я́', Gen: 'і́мені (ім’я́)', Dat: 'і́мені', Acc: 'ім’я́', Ins: 'і́менем (ім’я́м)', Loc: 'і́мені', Voc: 'ім’я́' },
    pl: { Nom: 'імена́', Gen: 'іме́н', Dat: 'імена́м', Acc: 'імена́', Ins: 'імена́ми', Loc: 'імена́х', Voc: 'імена́' },
  },
  гро́ші: {
    gender: 'Plural-only',
    genderSpoken: 'Plural',
    declLabel: 'Plural-Only Noun (завжди́ в множині́)',
    sg: { Nom: '— (plural only)', Gen: '—', Dat: '—', Acc: '—', Ins: '—', Loc: '—', Voc: '—' },
    pl: { Nom: 'гро́ші', Gen: 'гроше́й', Dat: 'гро́шам', Acc: 'гро́ші', Ins: 'гроши́ма (гро́шами)', Loc: 'гро́шах', Voc: 'гро́ші' },
  },
  две́рі: {
    gender: 'Plural-only',
    genderSpoken: 'Plural',
    declLabel: 'Plural-Only Noun (even for one door)',
    sg: { Nom: '— (plural only)', Gen: '—', Dat: '—', Acc: '—', Ins: '—', Loc: '—', Voc: '—' },
    pl: { Nom: 'две́рі', Gen: 'двере́й', Dat: 'две́рям', Acc: 'две́рі', Ins: 'двери́ма (две́рями)', Loc: 'две́рях', Voc: 'две́рі' },
  },
  окуля́ри: {
    gender: 'Plural-only',
    genderSpoken: 'Plural',
    declLabel: 'Plural-Only Noun',
    sg: { Nom: '— (plural only)', Gen: '—', Dat: '—', Acc: '—', Ins: '—', Loc: '—', Voc: '—' },
    pl: { Nom: 'окуля́ри', Gen: 'окуля́рів', Dat: 'окуля́рам', Acc: 'окуля́ри', Ins: 'окуля́рами', Loc: 'окуля́рах', Voc: 'окуля́ри' },
  },
  дім: {
    gender: 'Masculine',
    genderSpoken: 'Masculine',
    declLabel: 'Masculine Noun (і → о in open syllables: до́му)',
    sg: { Nom: 'дім', Gen: 'до́му', Dat: 'до́мові (-у)', Acc: 'дім', Ins: 'до́мом', Loc: 'до́мі', Voc: 'до́ме' },
    pl: { Nom: 'доми́', Gen: 'домі́в', Dat: 'дома́м', Acc: 'доми́', Ins: 'дома́ми', Loc: 'дома́х', Voc: 'доми́' },
  },
  стіл: {
    gender: 'Masculine',
    genderSpoken: 'Masculine',
    declLabel: 'Masculine Noun (і → о in open syllables: стола́)',
    sg: { Nom: 'стіл', Gen: 'стола́ (столу́)', Dat: 'столо́ві (-у́)', Acc: 'стіл', Ins: 'столо́м', Loc: 'столі́', Voc: 'сто́ле' },
    pl: { Nom: 'столи́', Gen: 'столі́в', Dat: 'стола́м', Acc: 'столи́', Ins: 'стола́ми', Loc: 'стола́х', Voc: 'столи́' },
  },
  кіт: {
    gender: 'Masculine (Animate)',
    genderSpoken: 'Masculine',
    declLabel: 'Masculine Animate Noun (і → о: кота́)',
    sg: { Nom: 'кіт', Gen: 'кота́', Dat: 'кото́ві (-у́)', Acc: 'кота́', Ins: 'кото́м', Loc: 'кото́ві (коті́)', Voc: 'ко́те' },
    pl: { Nom: 'коти́', Gen: 'коті́в', Dat: 'кота́м', Acc: 'коті́в', Ins: 'кота́ми', Loc: 'кота́х', Voc: 'коти́' },
  },
  ніч: {
    gender: 'Feminine (-ч)',
    genderSpoken: 'Feminine',
    declLabel: 'Feminine Consonant-Stem Noun (і → о: но́чі, Inst. ні́ччю)',
    sg: { Nom: 'ніч', Gen: 'но́чі', Dat: 'но́чі', Acc: 'ніч', Ins: 'ні́ччю', Loc: 'но́чі', Voc: 'но́че' },
    pl: { Nom: 'но́чі', Gen: 'ноче́й', Dat: 'ноча́м', Acc: 'но́чі', Ins: 'ноча́ми', Loc: 'ноча́х', Voc: 'но́чі' },
  },
  сіль: {
    gender: 'Feminine (-ль)',
    genderSpoken: 'Feminine',
    declLabel: 'Feminine Consonant-Stem Noun (і → о: со́лі, Inst. сі́ллю)',
    sg: { Nom: 'сіль', Gen: 'со́лі', Dat: 'со́лі', Acc: 'сіль', Ins: 'сі́ллю', Loc: 'со́лі', Voc: 'со́ле' },
    pl: { Nom: 'со́лі', Gen: 'соле́й', Dat: 'соля́м', Acc: 'со́лі', Ins: 'соля́ми', Loc: 'соля́х', Voc: 'со́лі' },
  },
  любо́в: {
    gender: 'Feminine (-в)',
    genderSpoken: 'Feminine',
    declLabel: 'Feminine Consonant-Stem Noun (Inst. любо́в’ю with apostrophe)',
    sg: { Nom: 'любо́в', Gen: 'любо́ві', Dat: 'любо́ві', Acc: 'любо́в', Ins: 'любо́в’ю', Loc: 'любо́ві', Voc: 'любо́ве' },
    pl: { Nom: '—', Gen: '—', Dat: '—', Acc: '—', Ins: '—', Loc: '—', Voc: '—' },
  },
  біль: {
    gender: 'Masculine (-ль)',
    genderSpoken: 'Masculine',
    declLabel: 'Masculine Soft Noun (і → о: бо́лю)',
    sg: { Nom: 'біль', Gen: 'бо́лю', Dat: 'бо́леві (бо́лю)', Acc: 'біль', Ins: 'бо́лем', Loc: 'бо́лю (бо́лі)', Voc: 'бо́лю' },
    pl: { Nom: 'бо́лі', Gen: 'бо́лів', Dat: 'бо́лям', Acc: 'бо́лі', Ins: 'бо́лями', Loc: 'бо́лях', Voc: 'бо́лі' },
  },
};

interface VerbForms {
  aspect: 'Imperfective' | 'Perfective';
  conjLabel: string;
  pres: { ya: string; ty: string; vin: string; my: string; vy: string; vony: string };
  past: { m: string; f: string; n: string; pl: string };
  futureNote: string;
}

const IRREGULAR_VERBS: Record<string, VerbForms> = {
  бу́ти: {
    aspect: 'Imperfective',
    conjLabel: 'Irregular Verb "to be" (usually omitted in present tense)',
    pres: { ya: 'є (omitted)', ty: 'є (omitted)', vin: 'є (omitted)', my: 'є (omitted)', vy: 'є (omitted)', vony: 'є (omitted)' },
    past: { m: 'був', f: 'була́', n: 'було́', pl: 'були́' },
    futureNote: 'Future: я бу́ду, ти бу́деш, він бу́де, ми бу́демо, ви бу́дете, вони́ бу́дуть',
  },
  ма́ти: {
    aspect: 'Imperfective',
    conjLabel: 'Conjugation I (-ати: я ма́ю, ти ма́єш)',
    pres: { ya: 'ма́ю', ty: 'ма́єш', vin: 'ма́є', my: 'ма́ємо', vy: 'ма́єте', vony: 'ма́ють' },
    past: { m: 'мав', f: 'ма́ла', n: 'ма́ло', pl: 'ма́ли' },
    futureNote: 'Future: бу́ду ма́ти or ма́тиму',
  },
  да́ти: {
    aspect: 'Perfective',
    conjLabel: 'Irregular Archaic Conjugation (дам, даси́, дасть)',
    pres: { ya: 'дам', ty: 'даси́', vin: 'дасть', my: 'дамо́', vy: 'дасте́', vony: 'даду́ть' },
    past: { m: 'дав', f: 'дала́', n: 'дало́', pl: 'дали́' },
    futureNote: 'Simple Future: я дам, ти даси́, він дасть, вони́ даду́ть',
  },
  ї́сти: {
    aspect: 'Imperfective',
    conjLabel: 'Irregular Verb "to eat" (їм, їси́, їсть, їдя́ть)',
    pres: { ya: 'їм', ty: 'їси́', vin: 'їсть', my: 'їмо́', vy: 'їсте́', vony: 'їдя́ть' },
    past: { m: 'їв', f: 'ї́ла', n: 'ї́ло', pl: 'ї́ли' },
    futureNote: 'Future: бу́ду ї́сти or ї́стиму',
  },
  пи́ти: {
    aspect: 'Imperfective',
    conjLabel: 'Conjugation I with apostrophe (п’ю, п’єш, п’ють)',
    pres: { ya: 'п’ю', ty: 'п’єш', vin: 'п’є', my: 'п’ємо́', vy: 'п’єте́', vony: 'п’ють' },
    past: { m: 'пив', f: 'пила́', n: 'пило́', pl: 'пили́' },
    futureNote: 'Future: бу́ду пи́ти or пи́тиму',
  },
  жи́ти: {
    aspect: 'Imperfective',
    conjLabel: 'Conjugation I with stem -в- (живу́, живе́ш)',
    pres: { ya: 'живу́', ty: 'живе́ш', vin: 'живе́', my: 'живемо́', vy: 'живете́', vony: 'живу́ть' },
    past: { m: 'жив', f: 'жила́', n: 'жило́', pl: 'жили́' },
    futureNote: 'Future: бу́ду жи́ти or жи́тиму',
  },
  іти́: {
    aspect: 'Imperfective',
    conjLabel: 'Conjugation I One-Way Motion Verb (іду́, іде́ш)',
    pres: { ya: 'іду́', ty: 'іде́ш', vin: 'іде́', my: 'ідемо́', vy: 'ідете́', vony: 'іду́ть' },
    past: { m: 'ішо́в (йшов)', f: 'ішла́ (йшла)', n: 'ішло́', pl: 'ішли́ (йшли)' },
    futureNote: 'Future: бу́ду іти́ or іти́му',
  },
  піти́: {
    aspect: 'Perfective',
    conjLabel: 'Conjugation I Perfective Motion Verb (піду́, пі́деш)',
    pres: { ya: 'піду́', ty: 'пі́деш', vin: 'пі́де', my: 'пі́демо', vy: 'пі́дете', vony: 'пі́дуть' },
    past: { m: 'пішо́в', f: 'пішла́', n: 'пішло́', pl: 'пішли́' },
    futureNote: 'Simple Future: я піду́, ти пі́деш, він пі́де',
  },
  прийти́: {
    aspect: 'Perfective',
    conjLabel: 'Conjugation I Perfective Motion Verb (прийду́, при́йдеш)',
    pres: { ya: 'прийду́', ty: 'при́йдеш', vin: 'при́йде', my: 'при́йдемо', vy: 'при́йдете', vony: 'при́йдуть' },
    past: { m: 'прийшо́в', f: 'прийшла́', n: 'прийшло́', pl: 'прийшли́' },
    futureNote: 'Simple Future: я прийду́, ти при́йдеш',
  },
  знайти́: {
    aspect: 'Perfective',
    conjLabel: 'Conjugation I Perfective Verb (знайду́, зна́йдеш)',
    pres: { ya: 'знайду́', ty: 'зна́йдеш', vin: 'зна́йде', my: 'зна́йдемо', vy: 'зна́йдете', vony: 'зна́йдуть' },
    past: { m: 'знайшо́в', f: 'знайшла́', n: 'знайшло́', pl: 'знайшли́' },
    futureNote: 'Simple Future: я знайду́, ти зна́йдеш',
  },
  ходи́ти: {
    aspect: 'Imperfective',
    conjLabel: 'Conjugation II Multi-Directional Motion (д → дж in я ходжу́)',
    pres: { ya: 'ходжу́', ty: 'хо́диш', vin: 'хо́дить', my: 'хо́димо', vy: 'хо́дите', vony: 'хо́дять' },
    past: { m: 'ходи́в', f: 'ходи́ла', n: 'ходи́ло', pl: 'ходи́ли' },
    futureNote: 'Future: бу́ду ходи́ти or ходи́тиму',
  },
  ї́хати: {
    aspect: 'Imperfective',
    conjLabel: 'Conjugation I One-Way Vehicle Motion (ї́ду, ї́деш)',
    pres: { ya: 'ї́ду', ty: 'ї́деш', vin: 'ї́де', my: 'ї́демо', vy: 'ї́дете', vony: 'ї́дуть' },
    past: { m: 'ї́хав', f: 'ї́хала', n: 'ї́хало', pl: 'ї́хали' },
    futureNote: 'Future: бу́ду ї́хати or ї́хатиму',
  },
  пої́хати: {
    aspect: 'Perfective',
    conjLabel: 'Conjugation I Perfective Vehicle Motion (пої́ду, пої́деш)',
    pres: { ya: 'пої́ду', ty: 'пої́деш', vin: 'пої́де', my: 'пої́демо', vy: 'пої́дете', vony: 'пої́дуть' },
    past: { m: 'пої́хав', f: 'пої́хала', n: 'пої́хало', pl: 'пої́хали' },
    futureNote: 'Simple Future: я пої́ду, ти пої́деш',
  },
  приї́хати: {
    aspect: 'Perfective',
    conjLabel: 'Conjugation I Perfective Vehicle Arrival (приї́ду, приї́деш)',
    pres: { ya: 'приї́ду', ty: 'приї́деш', vin: 'приї́де', my: 'приї́демо', vy: 'приї́дете', vony: 'приї́дуть' },
    past: { m: 'приї́хав', f: 'приї́хала', n: 'приї́хало', pl: 'приї́хали' },
    futureNote: 'Simple Future: я приї́ду, ти приї́деш',
  },
  ї́здити: {
    aspect: 'Imperfective',
    conjLabel: 'Conjugation II Multi-Directional Vehicle Motion (ї́жджу, ї́здиш)',
    pres: { ya: 'ї́жджу', ty: 'ї́здиш', vin: 'ї́здить', my: 'ї́здимо', vy: 'ї́здите', vony: 'ї́здять' },
    past: { m: 'ї́здив', f: 'ї́здила', n: 'ї́здило', pl: 'ї́здили' },
    futureNote: 'Future: бу́ду ї́здити or ї́здитиму',
  },
  хоті́ти: {
    aspect: 'Imperfective',
    conjLabel: 'Conjugation I with т → ч (хо́чу, хо́чеш, хо́чуть)',
    pres: { ya: 'хо́чу', ty: 'хо́чеш', vin: 'хо́че', my: 'хо́чемо', vy: 'хо́чете', vony: 'хо́чуть' },
    past: { m: 'хоті́в', f: 'хоті́ла', n: 'хоті́ло', pl: 'хоті́ли' },
    futureNote: 'Future: бу́ду хоті́ти or хоті́тиму',
  },
  могти́: {
    aspect: 'Imperfective',
    conjLabel: 'Conjugation I with г → ж (мо́жу, мо́жеш, мо́жуть)',
    pres: { ya: 'мо́жу', ty: 'мо́жеш', vin: 'мо́же', my: 'мо́жемо', vy: 'мо́жете', vony: 'мо́жуть' },
    past: { m: 'міг', f: 'могла́', n: 'могло́', pl: 'могли́' },
    futureNote: 'Future: змо́жу, змо́жеш (perfective pair змогти́)',
  },
  допомогти́: {
    aspect: 'Perfective',
    conjLabel: 'Conjugation I with г → ж (допоможу́, допомо́жеш)',
    pres: { ya: 'допоможу́', ty: 'допомо́жеш', vin: 'допомо́же', my: 'допомо́жемо', vy: 'допомо́жете', vony: 'допомо́жуть' },
    past: { m: 'допомі́г', f: 'допомогла́', n: 'допомогло́', pl: 'допомогли́' },
    futureNote: 'Simple Future: я допоможу́, ти допомо́жеш',
  },
  писа́ти: {
    aspect: 'Imperfective',
    conjLabel: 'Conjugation I with с → ш (пишу́, пи́шеш, пи́шуть)',
    pres: { ya: 'пишу́', ty: 'пи́шеш', vin: 'пи́ше', my: 'пи́шемо', vy: 'пи́шете', vony: 'пи́шуть' },
    past: { m: 'писа́в', f: 'писа́ла', n: 'писа́ло', pl: 'писа́ли' },
    futureNote: 'Future: бу́ду писа́ти or писа́тиму',
  },
  написа́ти: {
    aspect: 'Perfective',
    conjLabel: 'Conjugation I with с → ш (напишу́, напи́шеш)',
    pres: { ya: 'напишу́', ty: 'напи́шеш', vin: 'напи́ше', my: 'напи́шемо', vy: 'напи́шете', vony: 'напи́шуть' },
    past: { m: 'написа́в', f: 'написа́ла', n: 'написа́ло', pl: 'написа́ли' },
    futureNote: 'Simple Future: я напишу́, ти напи́шеш',
  },
  каза́ти: {
    aspect: 'Imperfective',
    conjLabel: 'Conjugation I with з → ж (кажу́, ка́жеш, ка́жуть)',
    pres: { ya: 'кажу́', ty: 'ка́жеш', vin: 'ка́же', my: 'ка́жемо', vy: 'ка́жете', vony: 'ка́жуть' },
    past: { m: 'каза́в', f: 'каза́ла', n: 'каза́ло', pl: 'каза́ли' },
    futureNote: 'Future: бу́ду каза́ти or каза́тиму',
  },
  сказа́ти: {
    aspect: 'Perfective',
    conjLabel: 'Conjugation I with з → ж (скажу́, ска́жеш, ска́жуть)',
    pres: { ya: 'скажу́', ty: 'ска́жеш', vin: 'ска́же', my: 'ска́жемо', vy: 'ска́жете', vony: 'ска́жуть' },
    past: { m: 'сказа́в', f: 'сказа́ла', n: 'сказа́ло', pl: 'сказа́ли' },
    futureNote: 'Simple Future: я скажу́, ти ска́жеш',
  },
  показа́ти: {
    aspect: 'Perfective',
    conjLabel: 'Conjugation I with з → ж (покажу́, пока́жеш)',
    pres: { ya: 'покажу́', ty: 'пока́жеш', vin: 'пока́же', my: 'пока́жемо', vy: 'пока́жете', vony: 'пока́жуть' },
    past: { m: 'показа́в', f: 'показа́ла', n: 'показа́ло', pl: 'показа́ли' },
    futureNote: 'Simple Future: я покажу́, ти пока́жеш',
  },
  бра́ти: {
    aspect: 'Imperfective',
    conjLabel: 'Conjugation I with inserted -е- (беру́, бере́ш)',
    pres: { ya: 'беру́', ty: 'бере́ш', vin: 'бере́', my: 'беремо́', vy: 'берете́', vony: 'беру́ть' },
    past: { m: 'брав', f: 'бра́ла', n: 'бра́ло', pl: 'бра́ли' },
    futureNote: 'Future: бу́ду бра́ти or бра́тиму',
  },
  узя́ти: {
    aspect: 'Perfective',
    conjLabel: 'Conjugation I Perfective of бра́ти (візьму́, ві́зьмеш)',
    pres: { ya: 'візьму́', ty: 'ві́зьмеш', vin: 'ві́зьме', my: 'ві́зьмемо', vy: 'ві́зьмете', vony: 'ві́зьмуть' },
    past: { m: 'узя́в (взяв)', f: 'узяла́', n: 'узяло́', pl: 'узяли́' },
    futureNote: 'Simple Future: я візьму́, ти ві́зьмеш',
  },
  люби́ти: {
    aspect: 'Imperfective',
    conjLabel: 'Conjugation II Labial Stem (-л- in 1st sg. & 3rd pl.: люблю́, лю́блять)',
    pres: { ya: 'люблю́', ty: 'лю́биш', vin: 'лю́бить', my: 'лю́бимо', vy: 'лю́бите', vony: 'лю́блять' },
    past: { m: 'люби́в', f: 'люби́ла', n: 'люби́ло', pl: 'люби́ли' },
    futureNote: 'Future: бу́ду люби́ти or люби́тиму',
  },
  роби́ти: {
    aspect: 'Imperfective',
    conjLabel: 'Conjugation II Labial Stem (-л- in 1st sg. & 3rd pl.: роблю́, ро́блять)',
    pres: { ya: 'роблю́', ty: 'ро́биш', vin: 'ро́бить', my: 'ро́бимо', vy: 'ро́бите', vony: 'ро́блять' },
    past: { m: 'роби́в', f: 'роби́ла', n: 'роби́ло', pl: 'роби́ли' },
    futureNote: 'Future: бу́ду роби́ти or роби́тиму',
  },
  зроби́ти: {
    aspect: 'Perfective',
    conjLabel: 'Conjugation II Labial Stem (зроблю́, зро́биш, зро́блять)',
    pres: { ya: 'зроблю́', ty: 'зро́биш', vin: 'зро́бить', my: 'зро́бимо', vy: 'зро́бите', vony: 'зро́блять' },
    past: { m: 'зроби́в', f: 'зроби́ла', n: 'зроби́ло', pl: 'зроби́ли' },
    futureNote: 'Simple Future: я зроблю́, ти зро́биш, вони́ зро́блять',
  },
  купи́ти: {
    aspect: 'Perfective',
    conjLabel: 'Conjugation II Labial Stem (куплю́, ку́пиш, ку́плять)',
    pres: { ya: 'куплю́', ty: 'ку́пиш', vin: 'ку́пить', my: 'ку́пимо', vy: 'ку́пите', vony: 'ку́плять' },
    past: { m: 'купи́в', f: 'купи́ла', n: 'купи́ло', pl: 'купи́ли' },
    futureNote: 'Simple Future: я куплю́, ти ку́пиш, вони́ ку́плять',
  },
  спа́ти: {
    aspect: 'Imperfective',
    conjLabel: 'Conjugation II Labial Stem (сплю, спиш, сплять)',
    pres: { ya: 'сплю', ty: 'спиш', vin: 'спить', my: 'спимо́', vy: 'спите́', vony: 'сплять' },
    past: { m: 'спав', f: 'спа́ла', n: 'спа́ло', pl: 'спа́ли' },
    futureNote: 'Future: бу́ду спа́ти or спа́тиму',
  },
  плати́ти: {
    aspect: 'Imperfective',
    conjLabel: 'Conjugation II (т → ч in 1st sg.: плачу́, пла́тиш)',
    pres: { ya: 'плачу́', ty: 'пла́тиш', vin: 'пла́тить', my: 'пла́тимо', vy: 'пла́тите', vony: 'пла́тять' },
    past: { m: 'плати́в', f: 'плати́ла', n: 'плати́ло', pl: 'плати́ли' },
    futureNote: 'Future: бу́ду плати́ти or плати́тиму',
  },
  проси́ти: {
    aspect: 'Imperfective',
    conjLabel: 'Conjugation II (с → ш in 1st sg.: прошу́, про́сиш)',
    pres: { ya: 'прошу́', ty: 'про́сиш', vin: 'про́сить', my: 'про́симо', vy: 'про́сите', vony: 'про́сять' },
    past: { m: 'проси́в', f: 'проси́ла', n: 'проси́ло', pl: 'проси́ли' },
    futureNote: 'Future: бу́ду проси́ти or проси́тиму',
  },
  сиді́ти: {
    aspect: 'Imperfective',
    conjLabel: 'Conjugation II (д → дж in 1st sg.: сиджу́, сиди́ш)',
    pres: { ya: 'сиджу́', ty: 'сиди́ш', vin: 'сиди́ть', my: 'сидимо́', vy: 'сидите́', vony: 'сидя́ть' },
    past: { m: 'сиді́в', f: 'сиді́ла', n: 'сиді́ло', pl: 'сиді́ли' },
    futureNote: 'Future: бу́ду сиді́ти or сиді́тиму',
  },
  бі́гти: {
    aspect: 'Imperfective',
    conjLabel: 'Conjugation II with г → ж (біжу́, біжи́ш, біжа́ть)',
    pres: { ya: 'біжу́', ty: 'біжи́ш', vin: 'біжи́ть', my: 'біжимо́', vy: 'біжите́', vony: 'біжа́ть' },
    past: { m: 'біг', f: 'бі́гла', n: 'бі́гло', pl: 'бі́гли' },
    futureNote: 'Future: бу́ду бі́гти or бі́гтиму',
  },
};

const PERSONAL_PRONOUN_DECLENSIONS: Record<
  string,
  { Nom: string; Gen: string; Dat: string; Acc: string; Ins: string; Loc: string; note: string }
> = {
  я: {
    Nom: 'я (I)',
    Gen: 'мене́ (after prep.: до ме́не)',
    Dat: 'мені́ (to me)',
    Acc: 'мене́ (me)',
    Ins: 'мно́ю (with me)',
    Loc: 'на мені́',
    note: 'After a preposition like до or у, the stress shifts to the first syllable: до ме́не, у ме́не.',
  },
  ти: {
    Nom: 'ти (you — informal)',
    Gen: 'тебе́ (after prep.: у те́бе)',
    Dat: 'тобі́ (to you)',
    Acc: 'тебе́ (you)',
    Ins: 'тобо́ю (with you)',
    Loc: 'на тобі́',
    note: 'Use ти with friends, family, and children. Stress shifts after prepositions: до те́бе, у те́бе.',
  },
  він: {
    Nom: 'він (he / it)',
    Gen: 'його́ (after prep.: до ньо́го)',
    Dat: 'йому́ (to him)',
    Acc: 'його́ (after prep.: на ньо́го)',
    Ins: 'ним (with him)',
    Loc: 'на ньо́му (нім)',
    note: 'After prepositions (like до, у, з), third-person pronouns add an initial н-: до ньо́го, з ним.',
  },
  вона́: {
    Nom: 'вона́ (she / it)',
    Gen: 'її́ (after prep.: у не́ї)',
    Dat: 'їй (to her)',
    Acc: 'її́ (after prep.: на не́ї)',
    Ins: 'не́ю (with her)',
    Loc: 'на ній',
    note: 'Notice that "her" is її́, but after a preposition it becomes не́ї (for example: у не́ї є = she has).',
  },
  ми: {
    Nom: 'ми (we)',
    Gen: 'нас (of us)',
    Dat: 'нам (to us)',
    Acc: 'нас (us)',
    Ins: 'на́ми (with us)',
    Loc: 'на нас',
    note: 'Idiomatic tip: "My friend and I" is expressed as ми з дру́гом ("we with friend").',
  },
  ви: {
    Nom: 'ви / Ви (you — plural or polite formal)',
    Gen: 'вас (of you)',
    Dat: 'вам (to you)',
    Acc: 'вас (you)',
    Ins: 'ва́ми (with you)',
    Loc: 'на вас',
    note: 'Use ви both for addressing a group and for polite/formal address to one person.',
  },
  вони́: {
    Nom: 'вони́ (they)',
    Gen: 'їх (after prep.: до них)',
    Dat: 'їм (to them)',
    Acc: 'їх (after prep.: на них)',
    Ins: 'ни́ми (with them)',
    Loc: 'на них',
    note: 'For "their / theirs", Ukrainian uses the declinable adjective ї́хній (ї́хня, ї́хнє, ї́хні).',
  },
};

export function getConjugatedVerbForms(rawInf: string, isPf: boolean): VerbForms {
  const clean = rawInf.toLowerCase().replace(/\u0301/g, '').trim();
  if (IRREGULAR_VERBS[rawInf]) return IRREGULAR_VERBS[rawInf];
  for (const [k, val] of Object.entries(IRREGULAR_VERBS)) {
    if (k.toLowerCase().replace(/\u0301/g, '') === clean) return val;
  }

  const isRefl = clean.endsWith('ся') || clean.endsWith('сь');
  const baseInf = rawInf.replace(/(ся|сь)$/i, '');
  const cleanBase = clean.replace(/(ся|сь)$/i, '');
  const reflOther = isRefl ? 'ся' : '';

  const is2nd =
    cleanBase.endsWith('ити') ||
    cleanBase.endsWith('іти') ||
    cleanBase.endsWith('їти') ||
    ['стояти', 'боятися', 'лежати', 'кричати', 'мовчати', 'спати'].some((v) => clean.endsWith(v));

  let stem = baseInf.replace(/(увати|ювати|ати|яти|ити|іти|їти|ти)$/i, '');
  if (cleanBase.endsWith('увати')) {
    stem = baseInf.replace(/увати$/i, 'у');
  } else if (cleanBase.endsWith('ювати')) {
    stem = baseInf.replace(/ювати$/i, 'ю');
  }

  const cleanStem = stem.replace(/\u0301/g, '');
  const lastStemChar = cleanStem.slice(-1);
  const afterHusher = 'жчшщ'.includes(lastStemChar);
  const afterLabial = 'бпвмф'.includes(lastStemChar);

  let pres: VerbForms['pres'];
  if (is2nd) {
    const yaEnd = afterLabial ? 'лю' : afterHusher ? 'у' : 'ю';
    const vonyEnd = afterLabial ? 'лять' : afterHusher ? 'ать' : 'ять';
    pres = {
      ya: stem + yaEnd + reflOther,
      ty: stem + 'иш' + reflOther,
      vin: stem + 'ить' + reflOther,
      my: stem + 'имо' + reflOther,
      vy: stem + 'ите' + reflOther,
      vony: stem + vonyEnd + reflOther,
    };
  } else {
    pres = {
      ya: stem + 'ю' + reflOther,
      ty: stem + 'єш' + reflOther,
      vin: stem + (isRefl ? 'ється' : 'є'),
      my: stem + 'ємо' + reflOther,
      vy: stem + 'єте' + reflOther,
      vony: stem + 'ють' + reflOther,
    };
  }

  const pastStem = baseInf.replace(/ти$/i, '');
  const past = {
    m: pastStem + 'в' + reflOther,
    f: pastStem + 'ла' + reflOther,
    n: pastStem + 'ло' + reflOther,
    pl: pastStem + 'ли' + reflOther,
  };

  return {
    aspect: isPf ? 'Perfective' : 'Imperfective',
    conjLabel: is2nd
      ? 'Conjugation II (-иш, -ить, -имо, -ите, -ять/-ать)'
      : 'Conjugation I (-єш, -є, -ємо, -єте, -ють)',
    pres,
    past,
    futureNote: isPf
      ? `Completed Future: я ${pres.ya}, ти ${pres.ty}, він ${pres.vin}`
      : `Future: бу́ду ${rawInf} or ${baseInf}му${reflOther}`,
  };
}

export function getNounDeclensionForms(rawNoun: string): NounForms {
  const clean = rawNoun.toLowerCase().replace(/\u0301/g, '').trim();
  if (IRREGULAR_NOUNS[rawNoun]) return IRREGULAR_NOUNS[rawNoun];
  for (const [k, val] of Object.entries(IRREGULAR_NOUNS)) {
    if (k.toLowerCase().replace(/\u0301/g, '') === clean) return val;
  }

  if (['метро', 'таксі', 'кіно', 'кафе', 'меню', 'хобі'].includes(clean)) {
    return {
      gender: 'Neuter (Indeclinable)',
      genderSpoken: 'Neuter',
      declLabel: 'Indeclinable Borrowed Noun (form never changes)',
      sg: { Nom: rawNoun, Gen: rawNoun, Dat: rawNoun, Acc: rawNoun, Ins: rawNoun, Loc: rawNoun, Voc: rawNoun },
      pl: { Nom: rawNoun, Gen: rawNoun, Dat: rawNoun, Acc: rawNoun, Ins: rawNoun, Loc: rawNoun, Voc: rawNoun },
    };
  }

  const last = clean.slice(-1);
  const last2 = clean.slice(-2);

  const isNeuterYa =
    last === 'я' &&
    (clean.endsWith('ння') ||
      clean.endsWith('ття') ||
      clean.endsWith('лля') ||
      clean.endsWith('ччя') ||
      clean.endsWith('в’я') ||
      clean.endsWith('р’я') ||
      clean === 'щастя');

  if (isNeuterYa) {
    const stem = rawNoun.replace(/я\u0301?$/i, '');
    return {
      gender: 'Neuter (-я)',
      genderSpoken: 'Neuter',
      declLabel: 'Neuter Noun in -я (doubled consonant or apostrophe)',
      sg: { Nom: rawNoun, Gen: rawNoun, Dat: stem + 'ю', Acc: rawNoun, Ins: stem + 'ям', Loc: stem + 'і', Voc: rawNoun },
      pl: { Nom: rawNoun, Gen: stem.slice(0, -1), Dat: stem + 'ям', Acc: rawNoun, Ins: stem + 'ями', Loc: stem + 'ях', Voc: rawNoun },
    };
  }

  if (last === 'а' || last === 'я') {
    const stem = rawNoun.replace(/[ая]\u0301?$/i, '');
    const soft = last === 'я';
    const mutStem = mutateStemBeforeI(stem);
    const datLocEnd = last2 === 'ія' || last2 === 'їя' ? 'ї' : 'і';
    return {
      gender: 'Feminine',
      genderSpoken: 'Feminine',
      declLabel: 'Feminine Noun (-а / -я pattern)',
      sg: {
        Nom: rawNoun,
        Gen: stem + (soft ? (last2 === 'ія' ? 'ї' : 'і') : 'и'),
        Dat: mutStem + datLocEnd,
        Acc: stem + (soft ? 'ю' : 'у'),
        Ins: stem + (soft ? (last2 === 'ія' ? 'єю' : 'ею') : 'ою'),
        Loc: mutStem + datLocEnd,
        Voc: stem + (soft ? 'е' : 'о'),
      },
      pl: {
        Nom: stem + (soft ? 'і' : 'и'),
        Gen: stem,
        Dat: stem + (soft ? 'ям' : 'ам'),
        Acc: stem + (soft ? 'і' : 'и'),
        Ins: stem + (soft ? 'ями' : 'ами'),
        Loc: stem + (soft ? 'ях' : 'ах'),
        Voc: stem + (soft ? 'і' : 'и'),
      },
    };
  }

  if (last === 'о' || last === 'е') {
    const stem = rawNoun.replace(/[ое]\u0301?$/i, '');
    const soft = last === 'е';
    const mutStem = mutateStemBeforeI(stem);
    return {
      gender: 'Neuter',
      genderSpoken: 'Neuter',
      declLabel: 'Neuter Noun (-о / -е pattern)',
      sg: {
        Nom: rawNoun,
        Gen: stem + (soft ? 'я' : 'а'),
        Dat: stem + (soft ? 'ю' : 'у'),
        Acc: rawNoun,
        Ins: stem + (soft ? 'ем' : 'ом'),
        Loc: mutStem + 'і',
        Voc: rawNoun,
      },
      pl: {
        Nom: stem + (soft ? 'я' : 'а'),
        Gen: stem,
        Dat: stem + (soft ? 'ям' : 'ам'),
        Acc: stem + (soft ? 'я' : 'а'),
        Ins: stem + (soft ? 'ями' : 'ами'),
        Loc: stem + (soft ? 'ях' : 'ах'),
        Voc: stem + (soft ? 'я' : 'а'),
      },
    };
  }

  if (last === 'ь' || ['річ', 'кров', 'подорож', 'північ', 'відповідь', 'пам’ять', 'осінь'].includes(clean) || clean.endsWith('ість')) {
    const isFem =
      ['річ', 'кров', 'подорож', 'північ', 'відповідь', 'пам’ять', 'осінь'].includes(clean) || clean.endsWith('ість');
    let stem = rawNoun.replace(/ь$/i, '');
    if (clean.endsWith('ість')) {
      stem = rawNoun.replace(/і(\u0301?)сть$/i, 'о$1ст');
    }
    const baseNoSign = rawNoun.replace(/ь$/i, '');
    return {
      gender: isFem ? 'Feminine (-ь / consonant)' : 'Masculine (-ь)',
      genderSpoken: isFem ? 'Feminine' : 'Masculine',
      declLabel: isFem ? 'Feminine Consonant-Stem Noun' : 'Masculine Soft-Stem Noun',
      sg: isFem
        ? {
            Nom: rawNoun,
            Gen: stem + 'і',
            Dat: stem + 'і',
            Acc: rawNoun,
            Ins: baseNoSign + 'ю',
            Loc: stem + 'і',
            Voc: stem + 'е',
          }
        : {
            Nom: rawNoun,
            Gen: stem + 'я',
            Dat: stem + 'еві (-ю)',
            Acc: rawNoun,
            Ins: stem + 'ем',
            Loc: stem + 'і (-еві)',
            Voc: stem + 'ю',
          },
      pl: isFem
        ? {
            Nom: stem + 'і',
            Gen: stem + 'ей',
            Dat: stem + 'ям',
            Acc: stem + 'і',
            Ins: stem + 'ями',
            Loc: stem + 'ях',
            Voc: stem + 'і',
          }
        : {
            Nom: stem + 'і',
            Gen: stem + 'ів',
            Dat: stem + 'ям',
            Acc: stem + 'і',
            Ins: stem + 'ями',
            Loc: stem + 'ях',
            Voc: stem + 'і',
          },
    };
  }

  // Default Masculine consonant / -й stem
  const soft = last === 'й';
  const stem = soft ? rawNoun.slice(0, -1) : rawNoun;
  const mutStem = mutateStemBeforeI(stem);
  const vocEnd = /[кхчшщ]$/i.test(clean) ? 'у' : soft ? 'ю' : 'е';
  const locForm = clean.endsWith('ок') || clean.endsWith('ак') || clean === 'парк' ? stem + 'у' : mutStem + 'і';
  const isMassOrPlace = [
    'час',
    'світ',
    'ранок',
    'сніданок',
    'обід',
    'рахунок',
    'ресторан',
    'магазин',
    'ринок',
    'будинок',
    'телефон',
    'інтернет',
    'папір',
    'журнал',
    'текст',
    'урок',
    'університет',
    'вокзал',
    'аеропорт',
    'міст',
    'парк',
    'сад',
    'театр',
    'музей',
    'фільм',
    'вітер',
    'дощ',
    'сніг',
    'ліс',
    'чай',
    'цукор',
    'сир',
    'суп',
    'борщ',
    'одяг',
    'кордон',
    'досвід',
    'успіх',
    'приклад',
    'план',
    'мир',
    'закон',
    'проєкт',
    'схід',
    'захід',
  ].includes(clean);

  const isAnimatePerson = ['студент', 'чоловік', 'дідусь', 'сусід', 'лікар', 'вчитель', 'гість'].includes(clean);
  const genSg = stem + (soft ? (isMassOrPlace ? 'ю' : 'я') : isMassOrPlace ? 'у' : 'а');

  return {
    gender: isAnimatePerson ? 'Masculine (Animate)' : 'Masculine',
    genderSpoken: 'Masculine',
    declLabel: 'Masculine Noun',
    sg: {
      Nom: rawNoun,
      Gen: genSg,
      Dat: stem + (soft ? 'єві (-ю)' : 'ові (-у)'),
      Acc: isAnimatePerson ? genSg : rawNoun,
      Ins: stem + (soft ? 'єм' : 'ом'),
      Loc: locForm,
      Voc: stem + vocEnd,
    },
    pl: {
      Nom: stem + (soft ? 'ї' : 'и'),
      Gen: stem + (soft ? 'їв' : 'ів'),
      Dat: stem + (soft ? 'ям' : 'ам'),
      Acc: isAnimatePerson ? stem + (soft ? 'їв' : 'ів') : stem + (soft ? 'ї' : 'и'),
      Ins: stem + (soft ? 'ями' : 'ами'),
      Loc: stem + (soft ? 'ях' : 'ах'),
      Voc: stem + (soft ? 'ї' : 'и'),
    },
  };
}

// ============================================================================
// 3. GRAMMAR BREAKDOWN GENERATOR (FOR INSPECTOR & OPTIONAL CARD DETAILS)
// ============================================================================
export function generateGrammarBreakdown(item: VocabItem): GrammarBreakdownResult {
  const raw = item.ru.trim();
  const clean = raw.toLowerCase().replace(/\u0301/g, '');
  const pos = item.pos.toUpperCase();
  const spokenEn = cleanEnForSpeech(item.en);
  const userExUk = item.exampleUk || item.exUk;
  const userExEn = item.exampleEn || item.exEn;

  if (pos.startsWith('NOUN')) {
    const nf = getNounDeclensionForms(raw);
    const locClean = nf.sg.Loc.split(' ')[0];
    const genClean = nf.sg.Gen.split(' ')[0];

    const exampleRu =
      userExUk ||
      (nf.gender.includes('Plural')
        ? `Ось ${nf.pl.Nom}. Сього́дні у нас нема́є ${nf.pl.Gen}.`
        : `Це ${nf.sg.Nom}. Тут нема́є ${genClean}.`);
    const exampleEn =
      userExEn ||
      (nf.gender.includes('Plural')
        ? `Here are the ${spokenEn}. Today we do not have ${spokenEn}.`
        : `This is a ${spokenEn}. There is no ${spokenEn} here.`);
    const spokenSummary = `${item.ru} means ${spokenEn}. It is a ${nf.genderSpoken} noun. Example: ${exampleRu} ${exampleEn}`;

    return {
      summaryTag: `${nf.gender} Noun • ${nf.declLabel}`,
      usageNote: nf.gender.includes('Plural')
        ? `Used in the plural: Nominative ${nf.pl.Nom}, Genitive (after немає/багато) ${nf.pl.Gen}, Instrumental ${nf.pl.Ins}.`
        : `Key forms: Genitive (${genClean}) after немає/без; Accusative (${nf.sg.Acc}) for direct objects; Locative (у/на ${locClean}) for location; Vocative (${nf.sg.Voc}!) for direct address.`,
      exampleRu,
      exampleEn,
      spokenSummary,
      tableHtml: `<div class="table-scroll-wrap"><table class="gram-grid">
        <thead><tr><th>Case & Common Role</th><th>Singular</th><th>Plural</th></tr></thead>
        <tbody>
          <tr><td><b>Nominative</b> (Subject: <i>who/what?</i>)</td><td>${nf.sg.Nom}</td><td>${nf.pl.Nom}</td></tr>
          <tr><td><b>Genitive</b> (<i>of / without / немає</i>)</td><td style="color:var(--gen); font-weight:700;">${nf.sg.Gen}</td><td style="color:var(--gen)">${nf.pl.Gen}</td></tr>
          <tr><td><b>Dative</b> (Recipient: <i>to/for whom?</i>)</td><td style="color:var(--dat); font-weight:700;">${nf.sg.Dat}</td><td style="color:var(--dat)">${nf.pl.Dat}</td></tr>
          <tr><td><b>Accusative</b> (Direct object)</td><td style="color:var(--acc); font-weight:700;">${nf.sg.Acc}</td><td style="color:var(--acc)">${nf.pl.Acc}</td></tr>
          <tr><td><b>Instrumental</b> (<i>with / by means of</i>)</td><td style="color:var(--ins); font-weight:700;">${nf.sg.Ins}</td><td style="color:var(--ins)">${nf.pl.Ins}</td></tr>
          <tr><td><b>Locative</b> (Location: <i>у/в, на</i>)</td><td style="color:var(--loc); font-weight:700;">у/на ${nf.sg.Loc}</td><td style="color:var(--loc)">у/на ${nf.pl.Loc}</td></tr>
          <tr><td><b>Vocative</b> (Direct address)</td><td style="color:var(--voc); font-weight:800;">${nf.sg.Voc}!</td><td style="color:var(--voc)">${nf.pl.Voc}!</td></tr>
        </tbody></table></div>`,
    };
  }

  if (pos.startsWith('VERB') && !['перепрошую', 'вибачте'].includes(clean)) {
    const isPf =
      pos.includes('(PF)') ||
      (pos.includes('PERFECTIVE') && !pos.includes('IMPERFECTIVE'));
    const vf = getConjugatedVerbForms(raw, isPf);
    const aspectExplanation = isPf
      ? 'Perfective Aspect (Доко́наний вид): describes a single completed action with a clear result. Its conjugated forms express the future tense.'
      : 'Imperfective Aspect (Недоко́наний вид): describes an ongoing, repeated, or general action in the present, past, or future.';

    const exampleRu = userExUk || `Сього́дні я ${vf.pres.ya}, а вчо́ра він ${vf.past.m}.`;
    const exampleEn =
      userExEn ||
      `Today I ${spokenEn.replace(/^to /, '')}, and yesterday he ${spokenEn.replace(/^to /, '')} (past).`;
    const spokenSummary = `${item.ru} means ${spokenEn}. It is ${isPf ? 'a perfective' : 'an imperfective'} verb. Example: ${exampleRu} ${exampleEn}`;

    return {
      summaryTag: `${vf.aspect} Verb • ${vf.conjLabel}`,
      usageNote: `${aspectExplanation} ${vf.futureNote}.`,
      exampleRu,
      exampleEn,
      spokenSummary,
      tableHtml: `<div class="table-scroll-wrap"><table class="gram-grid">
        <thead><tr><th>Person / Subject</th><th>${isPf ? 'Completed Future Forms' : 'Present Tense Forms'}</th><th>Past Tense (By Gender)</th></tr></thead>
        <tbody>
          <tr><td><b>Я</b> (I)</td><td style="color:var(--accent); font-weight:700;">я ${vf.pres.ya}</td><td><b>Він</b> (Masc.): ${vf.past.m}</td></tr>
          <tr><td><b>Ти</b> (You — informal)</td><td>ти ${vf.pres.ty}</td><td><b>Вона́</b> (Fem.): ${vf.past.f}</td></tr>
          <tr><td><b>Він / Вона́</b> (He / She)</td><td style="color:var(--gen); font-weight:700;">він/вона́ ${vf.pres.vin}</td><td><b>Воно́</b> (Neut.): ${vf.past.n}</td></tr>
          <tr><td><b>Ми / Ви</b> (We / You)</td><td>ми ${vf.pres.my} / ви ${vf.pres.vy}</td><td><b>Вони́</b> (Plural): ${vf.past.pl}</td></tr>
          <tr><td><b>Вони́</b> (They)</td><td style="color:var(--accent); font-weight:700;">вони́ ${vf.pres.vony}</td><td style="color:var(--voc); font-weight:700;">${vf.futureNote}</td></tr>
        </tbody></table></div>`,
    };
  }

  if (pos.startsWith('PRON') && PERSONAL_PRONOUN_DECLENSIONS[clean]) {
    const pd = PERSONAL_PRONOUN_DECLENSIONS[clean];
    const exampleRu = userExUk || `Це ${raw}.`;
    const exampleEn = userExEn || `This is ${spokenEn}.`;
    const spokenSummary = `${item.ru} is a personal pronoun meaning ${spokenEn}. Example: ${exampleRu} ${exampleEn}`;
    return {
      summaryTag: `Personal Pronoun • Declines by Case`,
      usageNote: pd.note,
      exampleRu,
      exampleEn,
      spokenSummary,
      tableHtml: `<div class="table-scroll-wrap"><table class="gram-grid">
        <thead><tr><th>Case</th><th>Pronoun Form & Meaning</th></tr></thead>
        <tbody>
          <tr><td><b>Nominative</b> (Subject)</td><td><b>${pd.Nom}</b></td></tr>
          <tr><td><b>Genitive</b> (of / without / у...)</td><td style="color:var(--gen); font-weight:700;">${pd.Gen}</td></tr>
          <tr><td><b>Dative</b> (to / for)</td><td style="color:var(--dat); font-weight:700;">${pd.Dat}</td></tr>
          <tr><td><b>Accusative</b> (Direct object)</td><td style="color:var(--acc); font-weight:700;">${pd.Acc}</td></tr>
          <tr><td><b>Instrumental</b> (with)</td><td style="color:var(--ins); font-weight:700;">${pd.Ins}</td></tr>
          <tr><td><b>Locative</b> (on / about)</td><td style="color:var(--loc); font-weight:700;">${pd.Loc}</td></tr>
        </tbody></table></div>`,
    };
  }

  if (pos.startsWith('ADJ') || (pos.startsWith('DET') && /(ий|ій|їй)$/i.test(clean))) {
    const isSoft = clean.endsWith('ій') || clean.endsWith('їй');
    const stem = raw.replace(/(ий|ій|їй|а|я|е|є)\u0301?$/i, '');
    const f = {
      m: raw,
      fem: stem + (isSoft ? 'я' : 'а'),
      n: stem + (isSoft ? 'є' : 'е'),
      pl: stem + 'і',
      femAcc: stem + (isSoft ? 'ю' : 'у'),
      gen: stem + (isSoft ? 'ього' : 'ого'),
      loc: stem + (isSoft ? 'ьому' : 'ому'),
    };
    const exampleRu = userExUk || `Це ${f.m} буди́нок, ${f.fem} кни́жка і ${f.n} мі́сто.`;
    const exampleEn = userExEn || `This is a ${spokenEn} building, a ${spokenEn} book, and a ${spokenEn} city.`;
    const spokenSummary = `${item.ru} is a Ukrainian ${expandPosForSpeech(pos)} meaning ${spokenEn}. Example: ${exampleRu} ${exampleEn}`;

    return {
      summaryTag: `${isSoft ? 'Soft-Stem' : 'Hard-Stem'} Adjective • Matches Noun Gender & Case`,
      usageNote: `Adjectives change their ending to match the noun they describe: Masculine -ий/-ій (${f.m}), Feminine -а/-я (${f.fem}), Neuter -е/-є (${f.n}), Plural -і (${f.pl}).`,
      exampleRu,
      exampleEn,
      spokenSummary,
      tableHtml: `<div class="table-scroll-wrap"><table class="gram-grid">
        <thead><tr><th>Gender / Number</th><th>Nominative (Subject)</th><th>Accusative (Object)</th><th>Genitive</th><th>Locative (у/на)</th></tr></thead>
        <tbody>
          <tr><td><b>Masculine</b></td><td>${f.m}</td><td>${f.m} (anim.: ${f.gen})</td><td style="color:var(--gen);">${f.gen}</td><td style="color:var(--loc)">у ${f.loc}</td></tr>
          <tr><td><b>Feminine</b></td><td>${f.fem}</td><td style="color:var(--acc); font-weight:700;">${f.femAcc}</td><td style="color:var(--gen)">${stem}${isSoft ? 'ьої' : 'ої'}</td><td style="color:var(--loc)">у ${stem}ій</td></tr>
          <tr><td><b>Neuter</b></td><td>${f.n}</td><td>${f.n}</td><td style="color:var(--gen)">${f.gen}</td><td style="color:var(--loc)">у ${f.loc}</td></tr>
          <tr><td><b>Plural (All)</b></td><td style="color:var(--accent); font-weight:700;">${f.pl}</td><td>${f.pl} (anim.: ${stem}их)</td><td style="color:var(--gen)">${stem}их</td><td style="color:var(--loc)">у ${stem}их</td></tr>
        </tbody></table></div>`,
    };
  }

  // Indeclinable / Functional words (Prepositions, Conjunctions, Adverbs, Particles, Phrases)
  const exampleRu = userExUk || `Скажі́ть, будь ла́ска: «${raw}».`;
  const exampleEn = userExEn || `Please say: "${spokenEn}".`;
  const spokenSummary = `${item.ru} means ${spokenEn}. Example: ${exampleRu} ${exampleEn}`;

  let usageExplanation = 'This word does not change its ending (indeclinable). Focus on how it connects ideas in a sentence.';
  if (pos.startsWith('PREP')) {
    usageExplanation =
      'Prepositions in Ukrainian require the noun after them to take a specific grammatical case (shown in parentheses in the definition).';
  } else if (pos.startsWith('ADV')) {
    usageExplanation =
      'Adverbs describe how, when, or where an action happens. Their form stays the same regardless of who is speaking.';
  } else if (pos.startsWith('PHRASE') || clean === 'перепрошую' || clean === 'вибачте') {
    usageExplanation = 'High-utility everyday conversational expression used in contemporary Ukrainian.';
  }

  return {
    summaryTag: `${expandPosForSpeech(pos).toUpperCase()} • Everyday Usage`,
    usageNote: usageExplanation,
    exampleRu,
    exampleEn,
    spokenSummary,
    tableHtml: `<div class="table-scroll-wrap"><table class="gram-grid">
      <thead><tr><th>Property</th><th>Details for Learners</th></tr></thead>
      <tbody>
        <tr><td><b>Part of Speech</b></td><td>${item.pos} (${expandPosForSpeech(pos)})</td></tr>
        <tr><td><b>Meaning</b></td><td>${item.en}</td></tr>
        <tr><td><b>How It Works</b></td><td>${usageExplanation}</td></tr>
      </tbody></table></div>`,
  };
}

// ============================================================================
// 4. PURPOSEFUL SENTENCE CORRECTION GENERATOR
// ============================================================================
export function generateSentenceCorrection(item: VocabItem): SentenceCorrectionResult {
  const raw = item.ru.trim();
  const clean = raw.toLowerCase().replace(/\u0301/g, '');
  const pos = item.pos;
  const trapType = item.rank % 3;
  const spokenEn = cleanEnForSpeech(item.en);

  if (pos.startsWith('NOUN')) {
    const nf = getNounDeclensionForms(raw);
    if (nf.gender.includes('Indeclinable')) {
      return {
        wrongRu: `Ми пої́хали туди́ на *${raw}ові*.`,
        wrongWord: `${raw}ові`,
        rightWord: raw,
        rightRu: `Ми пої́хали туди́ на ${raw}.`,
        enMeaning: `We went there by ${spokenEn}.`,
        ruleTitle: `Indeclinable Borrowed Noun`,
        explanation: `Loanwords ending in -о or -і like «${raw}» never change their ending in Ukrainian. Always keep the base form «${raw}».`,
        spokenExplanation: `The word ${raw} is an indeclinable noun in Ukrainian, so its ending never changes.`,
      };
    }

    if (nf.gender.includes('Plural')) {
      const genPl = nf.pl.Gen;
      return {
        wrongRu: `Сього́дні у нас нема́є *${nf.pl.Nom}*.`,
        wrongWord: nf.pl.Nom,
        rightWord: genPl,
        rightRu: `Сього́дні у нас нема́є ${genPl}.`,
        enMeaning: `Today we don't have ${spokenEn}.`,
        ruleTitle: `Genitive Case After «нема́є» (Absence)`,
        explanation: `After «нема́є» (there is no / do not have), Ukrainian always uses the Genitive case («${genPl}») instead of the dictionary form («${nf.pl.Nom}»).`,
        spokenExplanation: `After nemaye, use the Genitive form ${genPl} instead of ${nf.pl.Nom}.`,
      };
    }

    const genForm = nf.sg.Gen.split(' ')[0];
    const locForm = nf.sg.Loc.split(' ')[0];
    const accForm = nf.sg.Acc.split(' ')[0];
    const insForm = nf.sg.Ins.split(' ')[0];

    if (nf.gender === 'Feminine' && accForm !== raw && trapType === 0) {
      return {
        wrongRu: `Я ба́чу на столі́ *${raw}*.`,
        wrongWord: raw,
        rightWord: accForm,
        rightRu: `Я ба́чу на столі́ ${accForm}.`,
        enMeaning: `I see the ${spokenEn} on the table.`,
        ruleTitle: `Direct Object (Accusative Case: -а/-я → -у/-ю)`,
        explanation: `When a feminine noun ending in -а or -я is the direct object of an action (like «ба́чу» — I see), its ending changes to -у or -ю: «${raw}» → «${accForm}».`,
        spokenExplanation: `Because ${raw} is the direct object of the verb, its feminine ending changes to the Accusative form ${accForm}.`,
      };
    }

    if (trapType === 0 && genForm !== raw) {
      return {
        wrongRu: `У ме́не сього́дні нема́є *${raw}*.`,
        wrongWord: raw,
        rightWord: genForm,
        rightRu: `У ме́не сього́дні нема́є ${genForm}.`,
        enMeaning: `I don't have a ${spokenEn} today.`,
        ruleTitle: `Expressing Absence with «нема́є» + Genitive`,
        explanation: `When saying you don't have something with «нема́є», the noun changes from the dictionary form («${raw}») to the Genitive case («${genForm}»).`,
        spokenExplanation: `After nemaye, Ukrainian uses the Genitive case: ${raw} changes to ${genForm}.`,
      };
    } else if (trapType === 1 && locForm !== raw) {
      return {
        wrongRu: `Ми говори́ли про це у *${raw}*.`,
        wrongWord: raw,
        rightWord: locForm,
        rightRu: `Ми говори́ли про це у ${locForm}.`,
        enMeaning: `We talked about this in/at the ${spokenEn}.`,
        ruleTitle: `Location with «у / на» + Locative Case`,
        explanation: `To express static location ("in" or "at") after «у/в» or «на», use the Locative form «${locForm}» instead of «${raw}».`,
        spokenExplanation: `To express location after u or na, use the Locative case: ${raw} becomes ${locForm}.`,
      };
    } else if (insForm !== raw) {
      return {
        wrongRu: `Ми ду́же задово́лені *${raw}*.`,
        wrongWord: raw,
        rightWord: insForm,
        rightRu: `Ми ду́же задово́лені ${insForm}.`,
        enMeaning: `We are very pleased with the ${spokenEn}.`,
        ruleTitle: `Instrumental Case ("with")`,
        explanation: `To express "with" or satisfaction with something, Ukrainian uses the Instrumental case: «${raw}» changes to «${insForm}».`,
        spokenExplanation: `Here the noun takes the Instrumental case ending: ${raw} changes to ${insForm}.`,
      };
    }
  }

  if (pos.startsWith('VERB') && !['перепрошую', 'вибачте'].includes(clean)) {
    const isPf = pos.includes('(pf)');
    const vf = getConjugatedVerbForms(raw, isPf);

    if (clean === 'бути') {
      return {
        wrongRu: `Вчо́ра моя́ сестра́ *був* удо́ма.`,
        wrongWord: 'був',
        rightWord: 'була́',
        rightRu: `Вчо́ра моя́ сестра́ була́ удо́ма.`,
        enMeaning: `Yesterday my sister was at home.`,
        ruleTitle: `Past Tense Gender Agreement (-в vs. -ла)`,
        explanation: `In the past tense, Ukrainian verbs match the gender of the subject. Since «сестра́» (sister) is feminine, use «була́» instead of masculine «був».`,
        spokenExplanation: `In the past tense, verbs match the subject's gender. For a feminine subject like sister, use bula.`,
      };
    }

    if (trapType === 0) {
      return {
        wrongRu: `За́раз я ува́жно *${raw}*.`,
        wrongWord: raw,
        rightWord: vf.pres.ya,
        rightRu: `За́раз я ува́жно ${vf.pres.ya}.`,
        enMeaning: `Right now I ${spokenEn.replace(/^to /, '')}.`,
        ruleTitle: `Matching the Verb to «я» (I)`,
        explanation: `After the subject «я» (I), replace the dictionary infinitive «${raw}» with the first-person form «я ${vf.pres.ya}».`,
        spokenExplanation: `After the pronoun ya, conjugate the infinitive ${raw} to ${vf.pres.ya}.`,
      };
    } else if (trapType === 1) {
      return {
        wrongRu: `Вчо́ра Оле́на *${vf.past.m}* це сама́.`,
        wrongWord: vf.past.m,
        rightWord: vf.past.f,
        rightRu: `Вчо́ра Оле́на ${vf.past.f} це сама́.`,
        enMeaning: `Yesterday Olena ${spokenEn.replace(/^to /, '')} (past) this herself.`,
        ruleTitle: `Past Tense Feminine Ending (-ла)`,
        explanation: `Ukrainian past-tense verbs change by gender: masculine ends in «-в» (${vf.past.m}) and feminine ends in «-ла» (${vf.past.f}). Since Olena is feminine, use «${vf.past.f}».`,
        spokenExplanation: `Because Olena is feminine, the past tense verb takes the feminine ending la: ${vf.past.f}.`,
      };
    } else {
      return {
        wrongRu: `Він за́раз *${raw}*.`,
        wrongWord: raw,
        rightWord: vf.pres.vin,
        rightRu: `Він за́раз ${vf.pres.vin}.`,
        enMeaning: `He ${spokenEn.replace(/^to /, '')}s right now.`,
        ruleTitle: `Matching the Verb to «він / вона́» (He / She)`,
        explanation: `With «він» (he) or «вона́» (she), conjugate the infinitive «${raw}» into the third-person singular form «${vf.pres.vin}».`,
        spokenExplanation: `With he or she, conjugate ${raw} to the third person singular form ${vf.pres.vin}.`,
      };
    }
  }

  if (pos.startsWith('ADJ') || (pos.startsWith('DET') && /(ий|ій|їй)$/i.test(clean))) {
    const isSoft = clean.endsWith('ій') || clean.endsWith('їй');
    const stem = raw.replace(/(ий|ій|їй|а|я|е|є)\u0301?$/i, '');
    const femNom = stem + (isSoft ? 'я' : 'а');
    const femAcc = stem + (isSoft ? 'ю' : 'у');
    if (trapType % 2 === 0) {
      return {
        wrongRu: `Це ду́же *${raw}* кни́жка.`,
        wrongWord: raw,
        rightWord: femNom,
        rightRu: `Це ду́же ${femNom} кни́жка.`,
        enMeaning: `This is a very ${spokenEn} book.`,
        ruleTitle: `Adjective Gender Agreement (Feminine -а / -я)`,
        explanation: `Adjectives must match the gender of the noun they describe. Because «кни́жка» is feminine, masculine «${raw}» changes to feminine «${femNom}».`,
        spokenExplanation: `Because knyzhka is a feminine noun, the adjective ${raw} changes to the feminine form ${femNom}.`,
      };
    }
    return {
      wrongRu: `Я чита́ю *${raw}* кни́жку.`,
      wrongWord: raw,
      rightWord: femAcc,
      rightRu: `Я чита́ю ${femAcc} кни́жку.`,
      enMeaning: `I am reading a ${spokenEn} book.`,
      ruleTitle: `Adjective Agreement with a Direct Object (-у / -ю)`,
      explanation: `Because «кни́жку» is a feminine direct object (Accusative case), the adjective describing it also takes the feminine Accusative ending: «${femAcc}».`,
      spokenExplanation: `To match the feminine direct object knyzhku, the adjective ${raw} changes to ${femAcc}.`,
    };
  }

  // Functional words / phrases: contextual usage check
  const exUk = item.exampleUk || `Ми ча́сто кажемо́ «${raw}».`;
  const exEn = item.exampleEn || `We often say "${spokenEn}".`;
  return {
    wrongRu: exUk.replace(new RegExp(raw, 'i'), `*[ ${spokenEn} ]*`),
    wrongWord: `[ ${spokenEn} ]`,
    rightWord: raw,
    rightRu: exUk,
    enMeaning: exEn,
    ruleTitle: `Using «${raw}» in Context`,
    explanation: `«${raw}» means "${item.en}" and is used here to complete the natural Ukrainian sentence: «${exUk}»`,
    spokenExplanation: `The Ukrainian expression for ${spokenEn} in this sentence is ${raw}.`,
  };
}
