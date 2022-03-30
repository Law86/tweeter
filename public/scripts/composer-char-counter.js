$(document).ready(function () {
  let maxChars = 140;

  $(".new-tweet-text").keydown(function() {
    
    let charsLeft = maxChars - $(this).val().length;

    $(".form-count").text(charsLeft);

    if (charsLeft < 0) {
      $(".form-count").addClass("red-text");
    } else {
      $(".form-count").removeClass("red-text");
    }

  });
});