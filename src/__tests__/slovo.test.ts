import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { FREQ_6000_DB } from '../vocabData.ts';
import {
    generateUkrainianPhonetics,
    generateGrammarBreakdown,
    generateSentenceCorrection
} from '../morphologyAndPhonetics.ts';
import { COURSE_MODULES } from '../courseData.ts';
import { READER_PASSAGES } from '../readerData.ts';
import {
    EVERYDAY_CATEGORIES,
    getCategoryVocabItems,
    validateUkrainianAnswer,
    FILL_BLANK_EXERCISES,
    SENTENCE_CONSTRUCTION_EXERCISES,
    CONTEXTUAL_CHOICE_EXERCISES,
    GRAMMAR_AWARE_EXERCISES
} from '../everydayVocabData.ts';

const stripStress = (s: string): string => s.replace(/\u0301/g, '');

test('1. Zero textbook references (Pugh, Press, Routledge, §) across all source and HTML files', () => {
    const filesToCheck = [
        'index.html',
        'metadata.json',
        'src/vocabData.ts',
        'src/everydayVocabData.ts',
        'src/morphologyAndPhonetics.ts',
        'src/courseDataA0A1.ts',
        'src/courseDataA2C1.ts',
        'src/courseData.ts',
        'src/readerData.ts',
        'src/readerExtraData.ts',
        'src/main.ts'
    ];
    const forbidden = [/pugh/i, /ian\s+press/i, /pugh\s*&\s*press/i, /routledge/i, /poulard/i, /yurchenko/i, /shevchuk/i, /hippocrene/i, /roma\s+franko/i, /detselig/i, /bekh/i, /dingley/i, /hodder/i, /john\s+murray/i, /teach\s+yourself/i, /pavlyshyn/i, /lonely\s+planet/i, /kandybko/i, /§\s*\d/];
    for (const rel of filesToCheck) {
        const content = fs.readFileSync(path.join(process.cwd(), rel), 'utf8');
        for (const regex of forbidden) {
            assert.equal(
                regex.test(content),
                false,
                `Found forbidden textbook reference matching ${regex} in ${rel}`
            );
        }
    }
});

test('2. FREQ_6000_DB vocabulary integrity: authentic words, stress marks, no filler rows, natural examples', () => {
    assert.ok(FREQ_6000_DB.length >= 1400, `Expected at least 1400 curated vocabulary items after Books 1–12 integration, got ${FREQ_6000_DB.length}`);
    for (const item of FREQ_6000_DB) {
        assert.ok(item.ru && item.ru.length > 0, `Rank ${item.rank} missing ru`);
        assert.ok(item.en && item.en.length > 0, `Rank ${item.rank} missing en`);
        assert.ok(!/\(variant\s+\d+/i.test(item.en), `Rank ${item.rank} has mechanical '(variant N)' filler: ${item.en}`);
        assert.ok(!item.en.includes('aspectual pair'), `Rank ${item.rank} has mechanical 'aspectual pair' filler: ${item.en}`);
        assert.ok(item.exampleUk && item.exampleUk.length > 5, `Rank ${item.rank} (${item.ru}) missing authentic exampleUk`);
        assert.ok(item.exampleEn && item.exampleEn.length > 5, `Rank ${item.rank} (${item.ru}) missing authentic exampleEn`);
    }
});

test('3. Phonetics & G2P analyzer: IPA, plain-English guide, [ɦ] vs [ɡ], bilabial [w], apostrophe', () => {
    const hory = generateUkrainianPhonetics('гори́');
    assert.ok(hory.ipa.includes('ɦ'), `Expected voiced glottal [ɦ] in гори́ IPA, got ${hory.ipa}`);
    assert.ok(hory.approxEn.length > 2, 'Expected non-empty approxEn plain-English guide for гори́');
    assert.ok(hory.notes.includes('ɦ'), 'Expected note explaining г [ɦ]');

    const gudz = generateUkrainianPhonetics('ґа́нок');
    assert.ok(gudz.ipa.includes('ɡ'), `Expected velar plosive [ɡ] in ґа́нок IPA, got ${gudz.ipa}`);

    const lviv = generateUkrainianPhonetics('Львів');
    assert.ok(lviv.ipa.includes('w'), `Expected bilabial [w] for final в in Львів, got ${lviv.ipa}`);
    assert.ok(lviv.ipa.includes('ʲ'), `Expected palatalization [ʲ] for ль in Львів, got ${lviv.ipa}`);

    const simya = generateUkrainianPhonetics("сім'я́");
    assert.ok(simya.ipa.includes('j'), `Expected [j] glide after apostrophe in сім'я́, got ${simya.ipa}`);
});

test('4. Morphology & 7-Case Declension Engine: fleeting vowels, consonant mutations, animate accusative, verbs', () => {
    // Fleeting vowel in хлопець -> хлопця (animate masculine accusative = genitive)
    const khlopets = generateGrammarBreakdown({
        rank: 101,
        ru: 'хло́пець',
        en: 'boy / young man',
        pos: 'NOUN',
        level: 'A1',
        gender: 'm',
        animacy: 'animate'
    });
    const cleanKhlopetsHtml = stripStress(khlopets.tableHtml);
    assert.ok(cleanKhlopetsHtml.includes('хлопця'), 'Expected fleeting vowel хлопець -> хлопця in declension table');
    assert.ok(cleanKhlopetsHtml.includes('хлопче'), 'Expected Vocative хлопче in declension table');

    // Fleeting vowel in день -> дня
    const den = generateGrammarBreakdown({
        rank: 45,
        ru: 'день',
        en: 'day',
        pos: 'NOUN',
        level: 'A1',
        gender: 'm',
        animacy: 'inanimate'
    });
    assert.ok(stripStress(den.tableHtml).includes('дня'), 'Expected день -> дня in Genitive');

    // Consonant mutation к -> ц in книжка -> книжці (Dative / Locative)
    const knyzhka = generateGrammarBreakdown({
        rank: 77,
        ru: 'кни́жка',
        en: 'book',
        pos: 'NOUN',
        level: 'A1',
        gender: 'f',
        animacy: 'inanimate'
    });
    assert.ok(stripStress(knyzhka.tableHtml).includes('книжці'), 'Expected к -> ц mutation in книжка -> книжці');

    // Verb conjugation: читати -> читаю, читаєш, читають
    const chytaty = generateGrammarBreakdown({
        rank: 52,
        ru: 'чита́ти',
        en: 'to read',
        pos: 'VERB',
        level: 'A1'
    });
    const cleanChytatyHtml = stripStress(chytaty.tableHtml);
    assert.ok(cleanChytatyHtml.includes('читаю'), 'Expected 1st sg. читаю');
    assert.ok(cleanChytatyHtml.includes('читаєш'), 'Expected 2nd sg. читаєш');
    assert.ok(cleanChytatyHtml.includes('читають'), 'Expected 3rd pl. читають');

    // Sentence correction generator produces valid contrast without textbook citations
    const corr = generateSentenceCorrection({
        rank: 77,
        ru: 'кни́жка',
        en: 'book',
        pos: 'NOUN',
        level: 'A1',
        gender: 'f',
        animacy: 'inanimate'
    });
    assert.notEqual(corr.wrongWord, corr.rightWord);
    assert.ok(!/\bpugh\b|\bpress\b|§/i.test(corr.explanation));
});

test('5. Course Curriculum (29 modules A0.1-C1.1): structure, dialogues, recall prompts, audio matching, varied answer indices', () => {
    assert.equal(COURSE_MODULES.length, 29, 'Expected 29 CEFR modules from A0.1 to C1.1 (including A2.4, A2.5, B1.4, B1.5, B1.6, B1.7, B1.8, B1.9, B1.10, B2.2, B2.3, B2.4, and B2.5)');

    const cfuAnswerIndices = new Set<number>();
    const examAnswerIndices = new Set<number>();

    for (const mod of COURSE_MODULES) {
        assert.ok(mod.objectives.length >= 2, `Module ${mod.id} should have at least 2 learning objectives`);
        assert.ok(mod.rules && mod.rules.length >= 3, `Module ${mod.id} should have at least 3 step-by-step core concepts`);
        for (const r of mod.rules) {
            assert.ok(r && r.trim().length > 10, `Module ${mod.id} has an empty core concept rule`);
        }
        assert.ok(mod.dialogue && mod.dialogue.lines.length >= 2, `Module ${mod.id} should have a real-life dialogue`);
        assert.ok(mod.activeRecall && mod.activeRecall.length >= 2, `Module ${mod.id} should have active recall prompts`);
        for (const ar of mod.activeRecall) {
            assert.ok(ar.answerUk && /[А-ЯҐЄІЇа-яґєії]/.test(ar.answerUk), `Module ${mod.id} activeRecall answerUk must be Ukrainian Cyrillic, got: ${ar.answerUk}`);
        }
        assert.ok(mod.cfu.length >= 2, `Module ${mod.id} should have at least 2 CFU questions`);
        assert.ok(mod.practice.length >= 3, `Module ${mod.id} should have at least 3 practice drills`);
        for (const pr of mod.practice) {
            assert.ok(pr.audioUk && pr.audioUk !== 'undefined' && /[А-ЯҐЄІЇа-яґєії]/.test(pr.audioUk), `Module ${mod.id} practice item missing valid Ukrainian audioUk: ${pr.q}`);
        }
        for (const [uk, pos, en, exUk, exEn] of mod.vocab) {
            const gData = generateGrammarBreakdown({
                rank: 0,
                ru: uk,
                en,
                pos,
                level: mod.level,
                exampleUk: exUk,
                exampleEn: exEn
            });
            assert.equal(gData.exampleRu, exUk, `Module ${mod.id} vocab ${uk} exampleRu mismatch`);
            assert.equal(gData.exampleEn, exEn, `Module ${mod.id} vocab ${uk} exampleEn mismatch`);
            assert.ok(gData.spokenSummary.includes(exUk), `Module ${mod.id} vocab ${uk} spokenSummary does not include its exact card example '${exUk}'`);
        }
        assert.equal(mod.exam.length, 6, `Module ${mod.id} should have 6 mastery exam questions`);

        for (const q of mod.cfu) {
            assert.ok(q.ans >= 0 && q.ans < q.opts.length, `Invalid CFU answer index in ${mod.id}`);
            cfuAnswerIndices.add(q.ans);
        }
        for (const q of mod.exam) {
            assert.ok(q.ans >= 0 && q.ans < q.opts.length, `Invalid Exam answer index in ${mod.id}`);
            examAnswerIndices.add(q.ans);
        }
    }

    assert.ok(cfuAnswerIndices.has(0) && cfuAnswerIndices.has(1) && cfuAnswerIndices.has(2), 'CFU correct answers must vary across indices 0, 1, and 2');
    assert.ok(examAnswerIndices.has(0) && examAnswerIndices.has(1) && examAnswerIndices.has(2), 'Exam correct answers must vary across indices 0, 1, and 2');
});

test('6. Graded Comprehensible Reader: 52 passages across CEFR levels A0 to B2-C1 with glossaries and comprehension checks', () => {
    assert.equal(READER_PASSAGES.length, 52, 'Expected 52 graded reader passages');
    const levels: Array<'A0' | 'A1' | 'A2' | 'B1' | 'B2–C1'> = ['A0', 'A1', 'A2', 'B1', 'B2–C1'];
    for (const lvl of levels) {
        const count = READER_PASSAGES.filter((p) => p.level === lvl).length;
        assert.ok(count >= 6, `Expected at least 6 passages for CEFR level ${lvl}, found ${count}`);
    }
    const answerIndices = new Set<number>();
    for (const p of READER_PASSAGES) {
        assert.ok(p.sentences.length >= 4, `Passage ${p.id} should have at least 4 coherent sentences`);
        assert.ok(Object.keys(p.glossary).length >= 5, `Passage ${p.id} should have a word glossary`);
        assert.ok(p.questions.length >= 3, `Passage ${p.id} should have comprehension questions`);
        for (const q of p.questions) {
            answerIndices.add(q.ans);
        }
    }
    assert.ok(answerIndices.has(0) && answerIndices.has(1) && answerIndices.has(2), 'Reader quiz answers must vary across indices 0, 1, 2');
});

test('7. Everyday Vocabulary & Memory Lab: 27 categories, tolerant Ukrainian answer validation, and multi-modal exercise sets', () => {
    assert.equal(EVERYDAY_CATEGORIES.length, 27, 'Expected 27 practical everyday vocabulary categories');
    for (const cat of EVERYDAY_CATEGORIES) {
        const items = getCategoryVocabItems(cat.id);
        assert.ok(items.length >= 5, `Category ${cat.id} (${cat.title}) should have at least 5 mapped vocabulary items, got ${items.length}`);
    }

    // Verify tolerant Ukrainian validation (stress marks, capitalization, apostrophe normalization)
    const res1 = validateUkrainianAnswer('кам’яний', 'кам’яни́й');
    assert.equal(res1.isCorrect, true, 'Expected unstressed input to be accepted');
    const res2 = validateUkrainianAnswer("КАМ'ЯНИЙ", 'кам’яни́й');
    assert.equal(res2.isCorrect, true, 'Expected uppercase and straight apostrophe to be normalized and accepted');
    const resWrongEnding = validateUkrainianAnswer('мамин', 'ма́мина');
    assert.equal(resWrongEnding.isCorrect, false, 'Expected gender ending mismatch to be marked incorrect');
    assert.ok(resWrongEnding.feedbackMessage.includes('ending'), 'Expected specific ending feedback on inflection mismatch');

    assert.ok(FILL_BLANK_EXERCISES.length >= 52, 'Expected at least 52 fill-in-the-blank exercises');
    assert.ok(SENTENCE_CONSTRUCTION_EXERCISES.length >= 37, 'Expected at least 37 sentence construction exercises');
    assert.ok(CONTEXTUAL_CHOICE_EXERCISES.length >= 37, 'Expected at least 37 contextual choice exercises');
    assert.ok(GRAMMAR_AWARE_EXERCISES.length >= 37, 'Expected at least 37 grammar-aware exercises');
});

