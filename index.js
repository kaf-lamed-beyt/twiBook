const BASE_ANIME_DELAY = 0.2;
const LINK_FEILD = document.querySelector("#link");
const SEARCHBOX = document.querySelector("#search");
const TITLE_FEILD = document.querySelector("#title");
const SAVED_TWEETS = document.querySelector(".tweets");
const NEW_TWEET = document.querySelector(".add-tweet");
const SAVE_BTN = document.querySelector(".save-tweet");
const TWEET = document.querySelector(".tweet__link");
const INSERT_TWEET = document.querySelector(".app-form");
const SAVE_BUTTON = document.querySelector(".save-tweet");
const TWEETS_CONTAINER = document.querySelector(".saved-tweets-container");

// modals
const ERROR_MODAL = document.querySelector(".error");
const SUCCESS_MODAL = document.querySelector(".success");

function getId() {
  const tweets = JSON.parse(localStorage.getItem("tweets"));

  const tweetsId = tweets.map(({ id }) => id);

  console.log(tweetsId);
}

// check if there's a localStorage object containing an array of tweets
function checkForTweets() {
  const tweets = JSON.parse(localStorage.getItem("tweets"));

  if (tweets && tweets.length) {
    INSERT_TWEET.style.display = "none";
    // INSERT_TWEET.parentNode.removeChild(INSERT_TWEET);
    TWEETS_CONTAINER.classList.add("appear");
    renderTweets(tweets);
  }

  getId();

  // window.removeEventListener("load", checkForTweets);
}

// onload, check for available tweets
window.addEventListener("load", checkForTweets);

function showForm() {
  TWEETS_CONTAINER.style.display = "none";

  // Show form
  INSERT_TWEET.removeAttribute("style");
  INSERT_TWEET.style.display = "flex";
  INSERT_TWEET.classList.add("appear");
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

function validateInputs() {
  const tweetTitle = TITLE_FEILD.value;
  const tweetLink = LINK_FEILD.value;

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

  if (tweetLink && tweetTitle) {
    SUCCESS_MODAL.innerHTML = "Great work saving your tweet!";
    SUCCESS_MODAL.style.display = "block";
    return true;
  }
}

function searchTweets(query, tweets) {
  const searchTerm = query.value.toLowerCase();

  if (!searchTerm) {
    return tweets;
  }

  return tweets.filter(({ title }) => title.toLowerCase().includes(searchTerm));
}

function renderTweets() {
  const tweets = JSON.parse(localStorage.getItem("tweets")) || [];
  const filteredTweets = searchTweets(SEARCHBOX, tweets);

  SAVED_TWEETS.innerHTML = "";

  const cards = filteredTweets.reverse().map(({ id, link, title }, index) => {
    const delay = `${BASE_ANIME_DELAY * index}s`;

    return (SAVED_TWEETS.innerHTML += `
      <a href="#" key=${id} class="tweet__link">
        <div class="tweet-card" style="--animation-delay: ${delay}">
          <p class="tweet-title">
            ${title}
          </p>
        </div>
      </a>
    `);
  });

  if (cards.length === 0) {
    SAVED_TWEETS.innerHTML = `<p class="smirk">😏</p>`;
  }
}

function saveToLocalStorage() {
  validateInputs();

  const title = TITLE_FEILD.value;
  const link = LINK_FEILD.value;
  const id = crypto.randomUUID();
  let tweets = JSON.parse(localStorage.getItem("tweets"));

  !tweets ? (tweets = []) : null;

  tweets.push({ id, title, link });
  localStorage.setItem("tweets", JSON.stringify(tweets));

  TITLE_FEILD.value = "";
  LINK_FEILD.value = "";

  INSERT_TWEET.style.display = "none";
  INSERT_TWEET.classList.remove("appear");
  INSERT_TWEET.classList.add("disappear");
  TWEETS_CONTAINER.style.display = "block";
}

toggleButtonState();
NEW_TWEET.addEventListener("click", showForm);
SEARCHBOX.addEventListener("input", renderTweets);
TITLE_FEILD.addEventListener("input", toggleButtonState);
LINK_FEILD.addEventListener("input", toggleButtonState);

INSERT_TWEET.addEventListener("submit", function (e) {
  e.preventDefault();

  saveToLocalStorage();
  renderTweets();
});
