const $ = require('jquery')
const wordCount = require('./wordCount')

document.addEventListener("DOMContentLoaded", () => {
  // have fun!
  wordCount.getTopWord()
  $('.break-down').on('click', wordCount.getText)
})

