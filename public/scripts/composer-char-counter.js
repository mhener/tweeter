// Implementing character count, once character count is reached, the character count turns red and a -ve value is shown:

$(document).ready(function() {
  const textBox = $('#tweet-text');
  textBox.keyup(function() {
    const maxLength = 140;
    const counter = $('.counter');

    counter.text(maxLength);

    const characters = $(this).val().length;
    console.log(characters);
    counter.text(maxLength - characters);

    if (maxLength < characters) {
      $('.counter').css('color', 'red');
    } else {
      $('.counter').css('color', '#545149');
    }
  });
});
