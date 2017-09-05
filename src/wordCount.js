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
}

module.exports = wordCount;
