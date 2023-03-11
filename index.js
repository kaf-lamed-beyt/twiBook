const INSERT_TWEET = document.querySelector(".app-form");
const SAVE_BUTTON = document.querySelector(".save-tweet");
const TITLE_FEILD = document.querySelector("#title");
const LINK_FEILD = document.querySelector("#link");

// modals
const ERROR_MODAL = document.querySelector(".error");
const SUCCESS_MODAL = document.querySelector(".success");

// validate input fields
function validateInputs() {
  const tweetTitle = document.querySelector("#title").value;
  const tweetLink = document.querySelector("#link").value;

  if (!tweetLink.includes("https://twitter.com")) {
    ERROR_MODAL.style.display = "block";
    ERROR_MODAL.innerHTML = "invalid Tweet link";
    LINK_FEILD.focus();
  } else if (!tweetTitle) {
    ERROR_MODAL.innerHTML =
      "I know you have a retentive memory, but won't it be nice to search for these links with their titles?";
    ERROR_MODAL.style.display = "block";
    TITLE_FEILD.focus();
  } else if (!tweetLink) {
    ERROR_MODAL.innerHTML = "I think you forgot to add a tweet link";
    ERROR_MODAL.style.display = "block";
    LINK_FEILD.focus();
  } else if (!tweetLink && !tweetTitle) {
    ERROR_MODAL.innerHTML =
      "Don't anger the gods! Please enter a tweet link and the title.";
    ERROR_MODAL.style.display = "block";
  } else {
    ERROR_MODAL.style.display = "none";
  }
}

function saveToLocalStorage() {
  const title = document.querySelector("#title").value;
  const link = document.querySelector("#link").value;

  let tweets = [JSON.parse(localStorage.getItem("tweets"))];

  console.log(tweets);

  tweets.push({ title, link });

  localStorage.setItem("tweets", JSON.stringify(tweets));
}

INSERT_TWEET.addEventListener("submit", function (e) {
  e.preventDefault();

  validateInputs();
  saveToLocalStorage();
});
