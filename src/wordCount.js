const $ = require('jquery')
const host = require('./config.js').host

class wordCount {
  static getTopWord() {
    $.getJSON(`${host}/top_word`)
    .then(function(data) {
      const topWord = Object.keys(data['word'])[0]
      const times = data['word'][topWord]

      $('.top-heading').append(`${topWord} (${times})`)
    })
  }

  static getText() {
    const text = $('.text-field').val()
    const cleanedText = text.replace(/(\r\n|\n|\r)/gm," ").replace(/('re)/g, " are").replace(/('m)/g, " am").replace(/('t)/g, " not").replace(/('ll)/g, " will").replace(/('em)/g, " them").replace(/[&\/\\#,+()$~%.'":*-?<>{}]/g, '');
    const words = cleanedText.split(" ")
    const downcaseWords = words.map((word) => return word.toLowerCase())
    debugger
  }
}

module.exports = wordCount;
