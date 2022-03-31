/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const { render } = require("express/lib/response");

const data = [
  {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac",
    },
    content: {
      text: "If I have seen further it is by standing on the shoulders of giants",
    },
    created_at: 1461116232227,
  },
  {
    user: {
      name: "Descartes",
      avatars: "https://i.imgur.com/nlhLi3I.png",
      handle: "@rd",
    },
    content: {
      text: "Je pense , donc je suis",
    },
    created_at: 1461113959088,
  },
];

const createTweetElement = function (tweet) {
  let $tweet = `
<article class="tweet">  
<header class="post-tweet-header">       
<img class="post-user-avatar" src="${
    tweet.user.avatars
  }" width="30" height="30">
<div class="post-user-name">${tweet.user.name}</div>
<div class="post-user-handle">${tweet.user.handle}</div>
</header>
<div>
${$("<p>").addClass("posted-tweet-text").text(tweet.content.text).html()}
<!-- <p class="posted-tweet-text">
${tweet.content.text}
</p> -->
</div>
<footer class="submit-count">
  <output class="tweet-time" for="tweet-text">"${timeago.format(
    tweet.created_at
  )}"</output>
  <span class="posted-tweet-buttons">
  <i class="fas fa-flag"></i>
  <i class="fas fa-retweet"></i>
  <i class="fas fa-heart"></i>
  </span>
</div>
</form>
</article>
`;
  return $tweet;
};

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

$(document).ready(function () {
  $(".new-tweet-form").on("submit", function (event) {
    event.preventDefault();
    let data = $(".new-tweet-form").serialize();
    if ($(".new-tweet-text").val().length > 140) {
      return $(".error-message")
        .html(
          "<i class='fa-solid fa-exclamation'></i> Error! Your tweet is too long! "
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

      $(".error-message").html("");
    }
  });

  loadTweets();
});
