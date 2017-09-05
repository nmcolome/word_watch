const $ = require('jquery')
const wordCount = require('./wordCount')

document.addEventListener("DOMContentLoaded", () => {
  // have fun!
  wordCount.getTopWord()
  $('.break-down').on('click', wordCount.getText)
  $('.text-field').on('keyup', function(e) {
    if (e.keyCode === 13) {
      wordCount.getText()
    }
});
})

