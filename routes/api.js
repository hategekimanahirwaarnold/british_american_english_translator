'use strict';

const Translator = require('../components/translator.js');

module.exports = function(app) {

  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      let { text, locale } = req.body;
      // console.log("text: ", text, "locale: ", locale);
      let keys = Object.keys(req.body);
      let isText = keys.some(elt => elt == "text");
      let isLocal = keys.some(elt => elt == "locale");
      if (!isText || !isLocal) {
        res.json({ error: 'Required field(s) missing' });
      } else if (text === "") {
        res.json({ error: 'No text to translate' });
      } else if (locale === "british-to-american") {
        let result = translator.britAm(text);
        //  console.log("result from britAm: ", result);
        res.json(result);
      } else if (locale === "american-to-british") {
        let result = translator.amBrit(text);
        //  console.log("result from amBrit: ", result);
        res.json(result);
      } else {
        res.json({ error: 'Invalid value for locale field' });
      }

    });
};