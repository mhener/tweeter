// Implementing character count, once character count is reached, the character count turns red and a -ve value is shown:

$(document).ready(function() {
  const maxLength = 140;
  const textBox = $('#tweet-text');
  const counter = $('.counter');

  counter.text(maxLength);

  textBox.keydown(function() {
    const characters = $(this).val().length;
    counter.text(maxLength - characters);

    if (maxLength < characters) {
      $('.counter').css('color', 'red');
    } else {
      $('.counter').css('color', '#545149');
    }
  });
});
