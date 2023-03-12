const BASE_ANIME_DELAY = 0.2;
const INSERT_TWEET = document.querySelector(".app-form");
const SAVE_BUTTON = document.querySelector(".save-tweet");
const TITLE_FEILD = document.querySelector("#title");
const LINK_FEILD = document.querySelector("#link");
const SAVED_TWEETS = document.querySelector(".tweets");
const MORE_BTN = document.querySelector(".see-more");
const TWEETS_CONTAINER = document.querySelector(".save-tweets-container");
const NEW_TWEET = document.querySelector(".add-tweet");

// modals
const ERROR_MODAL = document.querySelector(".error");
const SUCCESS_MODAL = document.querySelector(".success");

// validate input fields
function validateInputs() {
  const tweetTitle = document.querySelector("#title").value;
  const tweetLink = document.querySelector("#link").value;

  if (!tweetLink && !tweetTitle) {
    ERROR_MODAL.innerHTML =
      "Don't anger the gods! Please enter a tweet link and the title.";
    ERROR_MODAL.style.display = "block";
    return false;
  }

  if (tweetTitle && !tweetLink.includes("twitter.com")) {
    ERROR_MODAL.style.display = "block";
    ERROR_MODAL.innerHTML = "The link you entered is invalid";
    return false;
  }

  if (!tweetLink.includes("twitter.com") && !tweetTitle) {
    ERROR_MODAL.style.display = "block";
    ERROR_MODAL.innerHTML =
      "The link you entered is invalid. And please add a title";
    TITLE_FEILD.focus();
    return false;
  }

  if (!tweetLink.includes("twitter.com")) {
    ERROR_MODAL.style.display = "block";
    ERROR_MODAL.innerHTML = "invalid Tweet link";
    LINK_FEILD.focus();
    return false;
  }

  if (!tweetTitle) {
    ERROR_MODAL.innerHTML =
      "I know you have a retentive memory, but won't it be nice to search for these links with their titles?";
    ERROR_MODAL.style.display = "block";
    TITLE_FEILD.focus();
    return false;
  }

  if (!tweetLink) {
    ERROR_MODAL.innerHTML = "I think you forgot to add a tweet link";
    ERROR_MODAL.style.display = "block";
    LINK_FEILD.focus();
    return false;
  }
}

function toggleButtonState() {
  if (TITLE_FEILD.value && LINK_FEILD.value.includes("twitter.com")) {
    SAVE_BUTTON.removeAttribute("disabled");
    SAVE_BUTTON.ariaDisabled = false;
    SAVE_BUTTON.style.background = "var(--deep-navy-blue)";
  } else {
    SAVE_BUTTON.setAttribute("disabled", true);
    SAVE_BUTTON.ariaDisabled = true;
    SAVE_BUTTON.style.background = "grey";
  }
}

function saveToLocalStorage() {
  validateInputs();

  const title = document.querySelector("#title").value;
  const link = document.querySelector("#link").value;
  const id = Math.floor(Math.random() * 60000) + 10000;
  let tweets = JSON.parse(localStorage.getItem("tweets"));

  !tweets ? (tweets = []) : null;

  tweets.push({ id, title, link });
  localStorage.setItem("tweets", JSON.stringify(tweets));

  console.log(tweets);

  INSERT_TWEET.classList.add("disappear");
  INSERT_TWEET.addEventListener("animationend", function () {
    INSERT_TWEET.parentNode.removeChild(INSERT_TWEET);
  });

  // fade tweets container into viewport
  TWEETS_CONTAINER.classList.add("appear");
}

// check if there's a localStorage object containing an array of tweets
(function checkForTweets() {
  const tweets = JSON.parse(localStorage.getItem("tweets"));

  if (tweets) {
    INSERT_TWEET.style.display = "none";
  }

  // render available tweets
  const cards = tweets?.reverse().map(({ id, link, title }, index) => {
    const delay = `${BASE_ANIME_DELAY * index}s`;

    return (SAVED_TWEETS.innerHTML += `
    <a href="${link}" target="__blank" key=${id}>
    <div class="tweet-card" style="--animation-delay: ${delay}">
      <p class="tweet-title">
        ${title}
      </p>
    </div>
  </a>
    `);
  });
})();

// add new tweet
function addTweet() {
  INSERT_TWEET.classList.remove("disappear");

  console.log("click");
}

toggleButtonState();
TITLE_FEILD.addEventListener("input", toggleButtonState);
LINK_FEILD.addEventListener("input", toggleButtonState);

INSERT_TWEET.addEventListener("submit", function (e) {
  e.preventDefault();

  saveToLocalStorage();
});

NEW_TWEET.addEventListener("click", addTweet);
