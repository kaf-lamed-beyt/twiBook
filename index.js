const INSERT_TWEET = document.querySelector(".app-form");
const SAVE_BUTTON = document.querySelector(".save-tweet");
const TWEET_TITLE = document.querySelector("#title");
const TWEET_LINK = document.querySelector("#link");

// validate tweet url
function validateTweetUrl() {
  if (!TWEET_LINK.value.includes("https://twitter.com")) {
    console.log("invalid Tweet link");
  } else {
    console.log("This link is valid");
  }
}

INSERT_TWEET.addEventListener("submit", function (e) {
  e.preventDefault();

  validateTweetUrl();
});
