/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Function handling the creation of new tweets upon forum submit

const createTweetElement = function (tweet) {
  let $tweet = `
<article class="tweet">  
  <header class="post-tweet-header">       
    <div class="avatar--user">
    <img class="post-user-avatar" src="${
    tweet.user.avatars
    }" width="30" height="30">
    <h2 class="post-user-name">${tweet.user.name}</h2>
    </div>
    <p class="post-user-handle">${tweet.user.handle}</p>
  </header>
<body class="posted-tweet-text">
${$("<p>").addClass("posted-tweet-text").text(tweet.content.text).html()}
<!-- <p class="posted-tweet-text">
${tweet.content.text}
</p> -->
<hr>
</body>
<footer class="submit-count">
  <output class="tweet-time" for="tweet-text">"${timeago.format(tweet.created_at)}"</output>
  <span class="posted-tweet-buttons">
  <i class="fas fa-flag"></i>
  <i class="fas fa-retweet"></i>
  <i class="fas fa-heart"></i>
  </span>
</div>
</footer>
</article>
`;
  return $tweet;
};

// Function handling AJAX request

const renderTweets = function (tweets) {
  tweets.forEach((element) => {
    $(".tweets-container").prepend(createTweetElement(element));
  });
};

let loadTweets = () => {
  $.ajax({
    type: "GET",
    url: "/tweets",
    data: "data",
  })
    .then((data) => {
      renderTweets(data);
    })
    .catch();
};

// Function handling the submission process (GET/POST) and error handling for the new tweet form within
// the document.ready function

$(document).ready(function () {
  $(".new-tweet-form").on("submit", function (event) {
    event.preventDefault();
    let data = $(".new-tweet-form").serialize();
    if ($(".new-tweet-text").val().length > 140) {
      return $(".error-message")
        .html(
          "<i class='fa-solid fa-exclamation'></i> Error! Tweet is too long! <i class='fa-solid fa-exclamation'>"
        )
        .slideDown();
    } else {
      if ($(".new-tweet-text").val().length === 0) {
        return $(".error-message")
          .html(
            "<i class='fa-solid fa-exclamation'></i> Error! Tweet cannot be empty! <i class='fa-solid fa-exclamation'> "
          )
          .slideDown();
      } else {
        $.post("/tweets", data, function () {
          $("textarea").val("");
          $.get("/tweets", (serverResponse) => {
            console.log(serverResponse);
            const recentTweet = serverResponse.slice(-1);
            renderTweets(recentTweet);
          });
        });
      }
      $(".error-message").html("");
    }
  });

  loadTweets();
});
