// load latest posts
const loadLatestPosts = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/retro-forum/latest-posts"
  );
  const data = await res.json();
  const latestPost = data;
  displayLatestPosts(latestPost);
};

// display latest posts
const displayLatestPosts = (latestPost) => {
  //   console.log(latestPost);
  const latestPostsContainer = document.getElementById(
    "latest-posts-container"
  );
  latestPost.forEach((latest) => {
    // console.log(latest);
    const latestPostsCard = document.createElement("div");
    latestPostsCard.classList = "card bg-base-100 shadow-xl";
    latestPostsCard.innerHTML = `
    <figure class="px-10 pt-10">
        <img src="${
          latest?.cover_image
        }" alt="cover_image" class="rounded-xl" />
    </figure>
    <div class="card-body">
        <div class="flex gap-4">
            <img src="images/calender.png" alt="" />
            <p>${latest?.author.posted_date || "No publish date"}</p>
        </div>
        <h2 class="card-title font-extrabold">${latest?.title}</h2>
        <p>${latest.description}</p>
        <div class="flex gap-5">
        <div class="avatar">
            <div class="w-10 h-10 rounded-full">
                <img src="${latest.profile_image}" />
            </div>
        </div>
        <div>
            <h6 class="text-black font-bold">${latest?.author.name}</h6>
            <p class="text-gray-400 text-sm">${
              latest?.author?.designation || "Unknown"
            }</p>
        </div>
        </div>
    </div>
    `;
    latestPostsContainer.appendChild(latestPostsCard);
  });
};

loadLatestPosts();

/**
 *! ================
 *  Display All Post
 *! ================
 */

// load all posts
const loadAllPosts = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/retro-forum/posts"
  );
  const data = await res.json();
  const allPosts = data.posts;
  // console.log(allPosts);
  displayAllPosts(allPosts);
};

// search by category
const searchPosts = async (searchText) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchText}`
  );
  const data = await res.json();
  const searchPosts = data.posts;
  // console.log(searchPosts);
  displayBySearch(searchPosts);
};
// display by category
const displayBySearch = (searchPosts) => {
  // console.log(allPosts)
  const allPostsContainer = document.getElementById("all-posts-container");
  searchPosts.forEach((all) => {
    // console.log(all);
    const allPostsCard = document.createElement("div");
    allPostsCard.classList = `rounded-3xl p-10 max-w-5xl bg-[#7B7DFC1A] lg:mb-0 lg:flex gap-x-6`;

    // adding description and view count to the right
    allPostsCard.onclick = function () {
      const postCardContainer = document.getElementById("post-card-container");
      const postToRight = document.createElement("div");
      postToRight.innerHTML = `
      <div class="flex justify-between">
      <h6 class="font-semibold max-w-[70%]">${all.description}</h6>
      <div class="flex gap-x-3 items-center">
        <img src="images/view.png" alt="view_icon" />
        <p class="font-inter text-gray-400">${all.view_count}</p>
      </div>
    </div>
      `;
      postCardContainer.appendChild(postToRight);
    };
    allPostsCard.innerHTML = `
      <div class="md:flex gap-x-10">
        <div class="avatar">
          <div class="w-24 relative h-24 rounded-xl">
            <img src="${all.image}" />
          </div>
          <div class="w-6 h-6 absolute rounded-full -top-2 -right-2 ${
            all.isActive ? "bg-green-600" : "bg-red-700"
          }"></div>
        </div>
      </div>
      <div class="space-y-5 w-full">
        <div class="flex gap-5">
          <p class="text-sm font-inter font-medium"># ${all.category}</p>
          <p class="text-sm font-inter font-medium">Author: ${
            all.author.name
          }</p>
        </div>
        <h4 class="text-black text-xl font-bold">${all.title}</h4>
        <p class="text-gray-400 font-inter pb-5 border-b-2 border-dashed">${
          all.description
        }</p>
          <div class="flex justify-between mt-5">
            <div class="flex gap-x-6">
              <div class="flex gap-x-3">
                <img src="images/comment.png" alt="comment_icon" />
                <p class="font-inter text-gray-400">${all.comment_count}</p>
              </div>
              <div class="flex gap-x-3">
                <img src="images/view.png" alt="view_icon" />
                <p class="font-inter text-gray-400">${all.view_count}</p>
              </div>
              <div class="flex gap-x-3">
                <img src="images/time.png" alt="time_icon" />
                <p class="font-inter text-gray-400">${all.posted_time} min</p>
              </div>
            </div>
            <button onclick="emailClick()"><img src="images/email.png" alt="email_icon" /></button>
          </div>
        </div>
      </div>
    `;
    allPostsContainer.appendChild(allPostsCard);
  });
  setTimeout(() => {
    toggleLoadingSpinner(false);
  }, 2000);
};

// display all posts
const displayAllPosts = (allPosts) => {
  // console.log(allPosts)
  const allPostsContainer = document.getElementById("all-posts-container");
  allPosts.forEach((all) => {
    // console.log(all);
    const allPostsCard = document.createElement("div");
    allPostsCard.classList = `rounded-3xl p-10 max-w-5xl bg-[#7B7DFC1A] lg:mb-0 lg:flex gap-x-6`;

    // adding description and view count to the right
    allPostsCard.onclick = function () {
      const postCardContainer = document.getElementById("post-card-container");
      const postToRight = document.createElement("div");
      postToRight.innerHTML = `
      <div class="flex justify-between">
      <h6 class="font-semibold max-w-[70%]">${all.description}</h6>
      <div class="flex gap-x-3 items-center">
        <img src="images/view.png" alt="view_icon" />
        <p class="font-inter text-gray-400">${all.view_count}</p>
      </div>
    </div>
      `;
      postCardContainer.appendChild(postToRight);
    };
    allPostsCard.innerHTML = `
      <div class="md:flex gap-x-10">
        <div class="avatar">
          <div class="w-24 relative h-24 rounded-xl">
            <img src="${all.image}" />
          </div>
          <div class="w-6 h-6 absolute rounded-full -top-2 -right-2 ${
            all.isActive ? "bg-green-600" : "bg-red-700"
          }"></div>
        </div>
      </div>
      <div class="space-y-5 w-full">
        <div class="flex gap-5">
          <p class="text-sm font-inter font-medium"># ${all.category}</p>
          <p class="text-sm font-inter font-medium">Author: ${
            all.author.name
          }</p>
        </div>
        <h4 class="text-black text-xl font-bold">${all.title}</h4>
        <p class="text-gray-400 font-inter pb-5 border-b-2 border-dashed">${
          all.description
        }</p>
          <div class="flex justify-between mt-5">
            <div class="flex gap-x-6">
              <div class="flex gap-x-3">
                <img src="images/comment.png" alt="comment_icon" />
                <p class="font-inter text-gray-400">${all.comment_count}</p>
              </div>
              <div class="flex gap-x-3">
                <img src="images/view.png" alt="view_icon" />
                <p class="font-inter text-gray-400">${all.view_count}</p>
              </div>
              <div class="flex gap-x-3">
                <img src="images/time.png" alt="time_icon" />
                <p class="font-inter text-gray-400">${all.posted_time} min</p>
              </div>
            </div>
            <img src="images/email.png" alt="email_icon" />
          </div>
        </div>
      </div>
    `;
    allPostsContainer.appendChild(allPostsCard);
  });
};

// search button functionality
const handleSearch = () => {
  toggleLoadingSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  // console.log(searchText);
  searchPosts(searchText);
  const allPostsContainer = document.getElementById("all-posts-container");
  allPostsContainer.textContent = "";
};

// show loading spinner
const toggleLoadingSpinner = (isLoading) => {
  const loadingSkeleton = document.getElementById("loading-skeleton");
  if (isLoading) {
    loadingSkeleton.classList.remove("hidden");
  } else {
    loadingSkeleton.classList.add("hidden");
  }
};

// searchPosts();
loadAllPosts();
