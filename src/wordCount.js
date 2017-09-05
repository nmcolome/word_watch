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

  static cleanFormatText() {
    const text = $('.text-field').val()
    const words = text.replace(/(\r\n|\n|\r)/gm," ").replace(/('re)/g, " are").replace(/('m)/g, " am").replace(/('t)/g, " not").replace(/('ll)/g, " will").replace(/('em)/g, " them").replace(/[&\/\\#,+()$~%.'":*-?<>{}]/g, '').split(" ")
    return words.map(function(word) {return word.toLowerCase()})
  }

  static buildTextFrequency() {
    const downcaseWords = wordCount.cleanFormatText()

    return downcaseWords.reduce(function(counterObject, word) {
      if(!counterObject[word]) {
        counterObject[word] = 0
      }
      counterObject[word] += 1
      return counterObject
    }, {})
  }

  static postWordApi(word) {
    let data = { word: { value: word } }
    $.post(`${host}/words`, data)
  }

  static appendPostWords(result) {
    const resultKeys = Object.keys(result)
    for (let i = 0; i < resultKeys.length; i++) {
      const word = resultKeys[i]
      const frequency = result[resultKeys[i]]
      wordCount.appendStyleWord(word, frequency)
      wordCount.postWords(word, frequency)
    }
  }

  static appendStyleWord(word, frequency) {
    $('article.word-count').append(`<span class='${word}-count'>${word}</span>`)
    $(`.${word}-count`).css('margin', '2px').css('font-size', `${frequency}em`)
  }

  static postWords(word, frequency) {
    for (let j = 0; j < frequency; j++) {
      wordCount.postWordApi(word)
    }
  }

  static getText() {
    const result = wordCount.buildTextFrequency()
    wordCount.appendPostWords(result)
  }
}

module.exports = wordCount;
