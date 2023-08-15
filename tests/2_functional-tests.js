const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');
let soln =  {
  text: 'Paracetamol takes up to an hour to work.',
  translation: '<span class="highlight">Tylenol</span> takes up to an hour to work.'
};
let valid = {
    text: 'Paracetamol takes up to an hour to work.',
    locale: "british-to-american"
};
let invalidLoc = {
    text: 'Paracetamol takes up to an hour to work.',
    locale: "british-to-french"
};
let missingText = {
    locale: "british-to-american"
};
let missingLocal = {
    text: 'Paracetamol takes up to an hour to work.',
    locale: "british-to-american"
};
let emptyText = {
    text: '',
    locale: "british-to-american"
};
let noNeed = {
    text: 'I love Hirwa so much!',
    locale: "british-to-american"
}
let i
suite('Functional Tests', () => {
      // #1
    test('Translation with text and locale fields: POST request to /api/translate', function (done) {
        // this.timeout(10000)

        chai
            .request(server)
            .keepOpen()
            .post('/api/translate')
            .send(valid)
            .end(function (err, res) {
                let data = res.body;
                assert.equal(data.translation, soln.translation);
            });

        done();
    });
      // #2
    test('Translation with text and invalid locale field: POST request to /api/translate', function (done) {
        // this.timeout(10000)

        chai
            .request(server)
            .keepOpen()
            .post('/api/translate')
            .send(invalidLoc)
            .end(function (err, res) {
                let data = res.body;
                assert.equal(data.error, 'Invalid value for locale field');
            });

        done();
    });
      // #3
    test('Translation with missing text field: POST request to /api/translate', function (done) {
        // this.timeout(10000)

        chai
            .request(server)
            .keepOpen()
            .post('/api/translate')
            .send(missingText)
            .end(function (err, res) {
                let data = res.body;
                assert.equal(data.error, 'Required field(s) missing');
            });

        done();
    });
      // #4
    test('Translation with missing locale field: POST request to /api/translate', function (done) {
        // this.timeout(10000)

        chai
            .request(server)
            .keepOpen()
            .post('/api/translate')
            .send(missingText)
            .end(function (err, res) {
                let data = res.body;
                assert.equal(data.error, 'Required field(s) missing');
            });

        done();
    });
      // #5
    test('Translation with empty text: POST request to /api/translate', function (done) {
        // this.timeout(10000)

        chai
            .request(server)
            .keepOpen()
            .post('/api/translate')
            .send(emptyText)
            .end(function (err, res) {
                let data = res.body;
                assert.equal(data.error, 'No text to translate');
            });

        done();
    });
      // #6
    test('Translation with text that needs no translation: POST request to /api/translate', function (done) {
        // this.timeout(10000)

        chai
            .request(server)
            .keepOpen()
            .post('/api/translate')
            .send(noNeed)
            .end(function (err, res) {
                let data = res.body;
                assert.equal(data.translation, "Everything looks good to me!");
            });

        done();
    });
});
