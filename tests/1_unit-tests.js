const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
let translate = new Translator;
suite('Unit Tests', () => {
    // #1
    test("Translate Mangoes are my favorite fruit. to British English", function () {
        assert.equal(JSON.stringify(translate.amBrit("Mangoes are my favorite fruit.")), JSON.stringify({
            text: 'Mangoes are my favorite fruit.',
            translation: 'Mangoes are my <span class="highlight">favourite</span> fruit.'
        }));
    });
    // #2
    test("Translate I ate yogurt for breakfast. to British English", function () {
        assert.equal(JSON.stringify(translate.amBrit("I ate yogurt for breakfast.")), JSON.stringify({
            text: 'I ate yogurt for breakfast.',
            translation: 'I ate <span class="highlight">yoghurt</span> for breakfast.'
        }));
    });
    // #3
    test("Translate We had a party at my friend's condo. to British English", function () {
        assert.equal(JSON.stringify(translate.amBrit("We had a party at my friend's condo.")), JSON.stringify({
            text: "We had a party at my friend's condo.",
            translation: `We had a party at my friend's <span class="highlight">flat</span>.`
        }));
    });
    // #4
    test("Translate Can you toss this in the trashcan for me? to British English", function () {
        assert.equal(JSON.stringify(translate.amBrit("Can you toss this in the trashcan for me?")), JSON.stringify({
            text: 'Can you toss this in the trashcan for me?',
            translation: 'Can you toss this in the <span class="highlight">bin</span> for me?'
        }));
    });
    // #5
    test("Translate The parking lot was full. to British English", function () {
        assert.equal(JSON.stringify(translate.amBrit("The parking lot was full.")), JSON.stringify({
            text: 'The parking lot was full.',
            translation: 'The <span class="highlight">car park</span> was full.'
        }));
    });
    // #6
    test("Translate Like a high tech Rube Goldberg machine. to British English", function () {
        assert.equal(JSON.stringify(translate.amBrit("Like a high tech Rube Goldberg machine.")), JSON.stringify({
            text: 'Like a high tech Rube Goldberg machine.',
            translation: 'Like a high tech <span class="highlight">Heath Robinson device</span>.'
        }));
    });
    // #7
    test("Translate To play hooky means to skip class or work. to British English", function () {
        assert.equal(JSON.stringify(translate.amBrit("To play hooky means to skip class or work.")), JSON.stringify({
            text: 'To play hooky means to skip class or work.',
            translation: 'To <span class="highlight">bunk off</span> means To skip class or work.'
        }));
    });
    // #8
    test("Translate No Mr. Bond, I expect you to die. to British English", function () {
        assert.equal(JSON.stringify(translate.amBrit("No Mr. Bond, I expect you to die.")), JSON.stringify({
            text: 'No Mr. Bond, I expect you to die.',
            translation: 'No <span class="highlight">Mr</span> Bond, I expect you to die.'
        }));
    });
    // #9
    test("Translate Dr. Grosh will see you now. to British English", function () {
        assert.equal(JSON.stringify(translate.amBrit("Dr. Grosh will see you now.")), JSON.stringify({
            text: 'Dr. Grosh will see you now.',
            translation: '<span class="highlight">Dr</span> Grosh will see you now.'
        }));
    });
    // #10
    test("Translate Lunch is at 12:15 today. to British English", function () {
        assert.equal(JSON.stringify(translate.amBrit("Lunch is at 12:15 today.")), JSON.stringify({
            text: 'Lunch is at 12:15 today.',
            translation: 'Lunch is at <span class="highlight">12.15</span> today.'
        }));
    });
    // #11
    test("Translate We watched the footie match for a while. to American English", function () {
        assert.equal(JSON.stringify(translate.britAm("We watched the footie match for a while.")), JSON.stringify({
            text: 'We watched the footie match for a while.',
            translation: 'We watched the <span class="highlight">soccer</span> match for a while.'
        }));
    });
    // #12
    test("Translate Paracetamol takes up to an hour to work. to American English", function () {
        assert.equal(JSON.stringify(translate.britAm("Paracetamol takes up to an hour to work.")), JSON.stringify({
            text: 'Paracetamol takes up to an hour to work.',
            translation: '<span class="highlight">Tylenol</span> takes up to an hour to work.'
        }));
    });
    // #13
    test("Translate First, caramelise the onions. to American English", function () {
        assert.equal(JSON.stringify(translate.britAm("First, caramelise the onions.")), JSON.stringify({
            text: 'First, caramelise the onions.',
            translation: 'First, <span class="highlight">caramelize</span> the onions.'
        }));
    });
    // #14
    test("Translate I spent the bank holiday at the funfair. to American English", function () {
        assert.equal(JSON.stringify(translate.britAm("I spent the bank holiday at the funfair.")), JSON.stringify({
            text: 'I spent the bank holiday at the funfair.',
            translation: 'I spent the <span class="highlight">public holiday</span> at the <span class="highlight">carnival</span>.'
        }));
    });
    // #15
    test("Translate I had a bicky then went to the chippy. to American English", function () {
        assert.equal(JSON.stringify(translate.britAm("I had a bicky then went to the chippy.")), JSON.stringify({
            text: 'I had a bicky then went to the chippy.',
            translation: 'I had a <span class="highlight">cookie</span> then went to the <span class="highlight">fish-and-chip shop</span>.'
        }));
    });
    // #16
    test("Translate I've just got bits and bobs in my bum bag. to American English", function () {
        assert.equal(JSON.stringify(translate.britAm("I've just got bits and bobs in my bum bag.")), JSON.stringify({
            text: "I've just got bits and bobs in my bum bag.",
            translation: `I've just got <span class="highlight">odds and ends</span> in my <span class="highlight">fanny pack</span>.`
        }));
    });
    // #17
    test("Translate The car boot sale at Boxted Airfield was called off. to American English", function () {
        assert.equal(JSON.stringify(translate.britAm("The car boot sale at Boxted Airfield was called off.")), JSON.stringify({
            text: 'The car boot sale at Boxted Airfield was called off.',
            translation: 'The <span class="highlight">swap meet</span> at Boxted Airfield was called off.'
        }));
    });
    // #18
    test("Translate Have you met Mrs Kalyani? to American English", function () {
        assert.equal(JSON.stringify(translate.britAm("Have you met Mrs Kalyani?")), JSON.stringify({
            text: 'Have you met Mrs Kalyani?',
            translation: 'Have you met <span class="highlight">Mrs.</span> Kalyani?'
        }));
    });
    // #19
    test("Translate Prof Joyner of King's College, London. to American English", function () {
        assert.equal(JSON.stringify(translate.britAm("Prof Joyner of King's College, London.")), JSON.stringify({
            text: "Prof Joyner of King's College, London.",
            translation: `<span class="highlight">Prof.</span> Joyner of King's College, London.`
        }));
    });
    // #20
    test("Translate Tea time is usually around 4 or 4.30. to American English", function () {
        assert.equal(JSON.stringify(translate.britAm("Tea time is usually around 4 or 4.30.")), JSON.stringify({
            text: 'Tea time is usually around 4 or 4.30.',
            translation: 'Tea time is usually around 4 or <span class="highlight">4:30</span>.'
        }));
    });
    // #21
    test("Highlight translation in Mangoes are my favorite fruit.", function () {
        assert.equal(JSON.stringify(translate.amBrit("Mangoes are my favorite fruit.")), JSON.stringify({
            text: 'Mangoes are my favorite fruit.',
            translation: 'Mangoes are my <span class="highlight">favourite</span> fruit.'
        }));
    });
    // #22
    test("Highlight translation in I ate yogurt for breakfast.", function () {
        assert.equal(JSON.stringify(translate.amBrit("I ate yogurt for breakfast.")), JSON.stringify({
            text: 'I ate yogurt for breakfast.',
            translation: 'I ate <span class="highlight">yoghurt</span> for breakfast.'
        }));
    });
    // #23
    test("Highlight translation in We watched the footie match for a while.", function () {
        assert.equal(JSON.stringify(translate.britAm("We watched the footie match for a while.")), JSON.stringify({
            text: 'We watched the footie match for a while.',
            translation: 'We watched the <span class="highlight">soccer</span> match for a while.'
        }));
    });
    // #24
    test("Highlight translation in Paracetamol takes up to an hour to work.", function () {
        assert.equal(JSON.stringify(translate.britAm("Paracetamol takes up to an hour to work.")), JSON.stringify({
            text: 'Paracetamol takes up to an hour to work.',
            translation: '<span class="highlight">Tylenol</span> takes up to an hour to work.'
        }));
    });
});
