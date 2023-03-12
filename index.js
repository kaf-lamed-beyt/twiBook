const BASE_ANIME_DELAY = 0.2;
const INSERT_TWEET = document.querySelector(".app-form");
const SAVE_BUTTON = document.querySelector(".save-tweet");
const TITLE_FEILD = document.querySelector("#title");
const LINK_FEILD = document.querySelector("#link");
const SAVED_TWEETS = document.querySelector(".tweets");
const TWEETS_CONTAINER = document.querySelector(".saved-tweets-container");
const NEW_TWEET = document.querySelector(".add-tweet");
const SEARCHBOX = document.querySelector("#search");
const SAVE_BTN = document.querySelector(".save-tweet");

// modals
const ERROR_MODAL = document.querySelector(".error");
const SUCCESS_MODAL = document.querySelector(".success");

// check if there's a localStorage object containing an array of tweets
function checkForTweets() {
  const tweets = JSON.parse(localStorage.getItem("tweets"));

  if (tweets && tweets.length) {
    TWEETS_CONTAINER.classList.add("appear");
    INSERT_TWEET.style.display = "none";
    renderTweets(tweets);
  } else {
    showForm();
  }
}

// onload, check for available tweets
window.onload = function () {
  checkForTweets();
};

function showForm() {
  INSERT_TWEET.removeAttribute("style");
  INSERT_TWEET.classList.add("come-down");
  TWEETS_CONTAINER.style.display = "none";
}

function hideForm() {
  INSERT_TWEET.classList.add("disappear");
  INSERT_TWEET.addEventListener("animationend", function () {
    INSERT_TWEET.parentNode.removeChild(INSERT_TWEET);
  });
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

  if (!tweetLink || !tweetTitle) {
    ERROR_MODAL.innerHTML =
      "Don't anger the gods! Please enter a tweet link and the title.";
    ERROR_MODAL.style.display = "block";
    return false;
  }

  if (!tweetLink.includes("twitter.com")) {
    ERROR_MODAL.style.display = "block";
    ERROR_MODAL.innerHTML = "The link you entered is invalid";
    return false;
  }

  if (!tweetTitle) {
    ERROR_MODAL.innerHTML =
      "I know you have a retentive memory, but won't it be nice to search for these links with their titles?";
    ERROR_MODAL.style.display = "block";
    return false;
  }

  return true;
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

  console.log(filteredTweets);

  SAVED_TWEETS.innerHTML = "";

  const cards = filteredTweets.reverse().map(({ id, link, title }, index) => {
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

  if (cards.length === 0) {
    SAVED_TWEETS.innerText = "no result found";
  }
}

function saveToLocalStorage() {
  const valid = validateInputs();

  if (!valid) {
    return;
  }

  const title = TITLE_FEILD.value;
  const link = LINK_FEILD.value;
  const id = Math.floor(Math.random() * 60000) + 10000;
  let tweets = JSON.parse(localStorage.getItem("tweets"));

  !tweets ? (tweets = []) : null;

  tweets.push({ id, title, link });
  localStorage.setItem("tweets", JSON.stringify(tweets));

  hideForm();
  renderTweets();
  TITLE_FEILD.value = "";
  LINK_FEILD.value = "";
}

toggleButtonState();
NEW_TWEET.addEventListener("click", showForm);
SEARCHBOX.addEventListener("input", renderTweets);
TITLE_FEILD.addEventListener("input", toggleButtonState);
LINK_FEILD.addEventListener("input", toggleButtonState);

INSERT_TWEET.addEventListener("submit", function (e) {
  e.preventDefault();

  saveToLocalStorage();
});
