const $ = require('jquery')
const host = require('./config.js').host

class wordCount {
  static getTopWord() {
    wordCount.getTopWordApi()
    .then(wordCount.appendTopWord)
  }

  static getTopWordApi() {
    return $.getJSON(`${host}/top_word`)
  }

  static appendTopWord(data) {
    const topWord = Object.keys(data['word'])[0]
    const times = data['word'][topWord]

    $('.top-heading').append(`${topWord} (${times})`)
  }

  static getText() {
    const text = $('.text-field').val()
    const cleanedText = text.replace(/(\r\n|\n|\r)/gm," ").replace(/('re)/g, " are").replace(/('m)/g, " am").replace(/('t)/g, " not").replace(/('ll)/g, " will").replace(/('em)/g, " them").replace(/[&\/\\#,+()$~%.'":*-?<>{}]/g, '');
    const words = cleanedText.split(" ")
    const downcaseWords = words.map((word) => {return word.toLowerCase()})

    const result = downcaseWords.reduce(function(counterObject, word) {
      if(!counterObject[word]) {
        counterObject[word] = 0
      }
      counterObject[word] += 1
      return counterObject
    }, {})

    //appending to word-count
    const resultKeys = Object.keys(result)
    for (let i = 0; i < resultKeys.length; i++) {
      const word = resultKeys[i]
      const frequency = result[resultKeys[i]]
      $('article.word-count').append(`<span class='${word}-count'>${word}</span>`)
      $(`.${word}-count`).css('margin', '2px').css('font-size', `${frequency}em`)
      for (let j = 0; j < frequency; j++) {
      let data = { word: { value: word } }
        $.post(`${host}/words`, data)
        .then((respones) => {console.log(respones)})
      }
    }
  }
}

module.exports = wordCount;
