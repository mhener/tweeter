$(document).ready(function() { // Allowing our HTML load before implementing JS

  // Hiding error messages until implemented:
  $("#error-message-empty").hide();
  $("#error-message-tooLong").hide();
  
  // This is the function that will prevent XSS (Cross Site Scripting):
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // This is the function that will create a new tweet "article":
  const createTweetElement = function(tweetData) {
    const $tweet = $(`
    <article class="tweet">
    <header> 
    <div class="account-name">
    <div class="boy-avatar">
    <img src="${tweetData.user.avatars}" alt="">
    </div> ${tweetData.user.name}</div> 
    <div class="user-name">${tweetData.user.handle}</div>
    </header>
    <p>${escape(tweetData.content.text)}</p>
    <footer>
    <div class="tweet-date">${timeago.format(tweetData.created_at)}</div> 
    <div class="icons">  
    <i class="fa-solid fa-flag"></i>
    <i class="fa-solid fa-retweet"></i> 
    <i class="fa-solid fa-heart"></i> 
    </div>
    </footer>
    </article>
    `);
    return $tweet;
  };
  
  // This is the function that will render the tweets on the page:
  const renderTweets = function(tweets) {
    const tweetsContainer = $('.tweeter-feed').html('');
    for (const tweet of tweets) {
      const newTweet = createTweetElement(tweet);
      tweetsContainer.prepend(newTweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
    }
  };
  
  // This is the function that will allow the tweets to load automatically without refreshing the page:
  const loadTweets = function() {
    $.ajax('/tweets', { method: 'GET' })
      .then((tweets) => {
        renderTweets(tweets);
      });
  };

  loadTweets();
  
  // GET & POST requests using AJAX:
  $(`.tweetForm`).on('submit', function(event) {
    event.preventDefault();
    
    const data = $(this).serialize();
    
    if (data === null || data === "") {
      $("#error-message-empty").slideDown("slow");
      $("#error-message-tooLong").hide();
    } else if (data.length > 140) {
      $("#error-message-tooLong").slideDown("slow");
      $("#error-message-empty").hide();
    } else {
      $.ajax({
        method: 'POST',
        data: data,
        url: "/tweets"
      })
        .then(() => {
          $.ajax('/tweets', { method: 'GET' })
            .then((tweets) => {
              renderTweets(tweets);
            });
        });
    }
  });
});
