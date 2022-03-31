/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const renderTweets = function(tweets) {
 tweets.forEach(element => {
  $('.tweets-container').append(createTweetElement(element))
 });

}

$('.new-tweet-form').submit((event) => {
  event.preventDefault();
  let data = $('.new-tweet-form').serialize();
  console.log(data)
  $.post("/tweets", data)
});


const createTweetElement = function(tweet) {
let $tweet = `
<article class="tweet">  
  <header class="post-tweet-header">       
  <img class="post-user-avatar" src="${tweet.user.avatars}" width="30" height="30">
  <div class="post-user-name">${tweet.user.name}</div>
  <div class="post-user-handle">${tweet.user.handle}</div>
  </header>
  <div>
  <p class="posted-tweet-text">
  ${tweet.content.text}
  </p>
  </div>
  <footer class="submit-count">
    <output class="tweet-time" for="tweet-text">"${tweet.created_at}"</output>
    <div class="posted-tweet-buttons">
      <i class="fa-solid fa-flag"></i>
      <i class="fa-solid fa-retweet"></i>
      <i class="fa-solid fa-heart"></i>
    </div>
  </div>
</form>
</article>
`
  return $tweet;
}

renderTweets(data);

});