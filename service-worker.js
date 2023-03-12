if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("./service-worker.js");
  });
}

// caching implementation of app's assets
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open("my-app-cache-v1").then(function (cache) {
      return cache.addAll([
        "/",
        "/index.html",
        "/style/global.css",
        "/index.js",
        "/public/favicon/favicon.ico",
      ]);
    })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});

// // check if there's a localStorage object containing an array of tweets
// function checkForTweets() {
//   const tweets = JSON.parse(localStorage.getItem("tweets"));
//   const searchParam = SEARCHBOX.value;

//   const filteredList = search(searchParam, tweets);

//   console.log(filteredList);

//   if (tweets) {
//     INSERT_TWEET.style.display = "none";
//     // TWEETS_CONTAINER.style.display = "block";
//     TWEETS_CONTAINER.classList.add("appear");
//   }

//   // render available tweets
//   const cards = tweets?.reverse().map(({ id, link, title }, index) => {
//     const delay = `${BASE_ANIME_DELAY * index}s`;

//     return (SAVED_TWEETS.innerHTML += `
//       <a href="${link}" target="__blank" key=${id}>
//       <div class="tweet-card" style="--animation-delay: ${delay}">
//         <p class="tweet-title">
//           ${title}
//         </p>
//       </div>
//     </a>
//       `);
//   });
// }
