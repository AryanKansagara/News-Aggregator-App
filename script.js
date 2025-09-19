const api_key = "YOUR_API_KEY";

const container = document.getElementById("news-container");
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("search");
const categoryBtns = document.querySelectorAll(".category");
const loadMoreBtn = document.getElementById("loadMore");


let page = 1;


let currentQuery = "latest";


// async function fetchNews(query, pageNum=1) {
//     const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${api_key}`;
//     const res = await fetch(url);
//     if (!res.ok) {
//         console.error("Error fetching news:", res.status, res.statusText);
//         return;
//     }
//     const data = await res.json();
//     console.log(data); // check if data.articles exists
//     displayNews(data.articles);
// }

async function fetchNews(query, pageNum = 1, category = "") {
  const res = await fetch(`/api/news?q=${query}&page=${pageNum}&category=${category}`);
  const data = await res.json();

  if (data.articles) {
    displayNews(data.articles);
  } else {
    console.error("Error fetching news:", data);
  }
}



function displayNews(articles){

    articles.forEach(article => {
        const card = document.createElement("div");
        card.classList.add("article");

        card.innerHTML = `
            <img src="${article.urlToImage || 'https://via.placeholder.com/300'}" alt="news image">

            <h3>${article.title}</h3>
            <p>${article.description || "No description available."}</p>
            <a href="${article.url}" target="_blank">Read more</a>

        `;

        container.appendChild(card);

    });
}

//search button
searchBtn.addEventListener("click", ()=>{
    container.innerHTML = "";
    page = 1;
    currentQuery = searchInput.value || "latest";
    fetchNews(currentQuery, page);
});

// Trigger search when user presses Enter
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    container.innerHTML = "";
    page = 1;
    currentQuery = searchInput.value || "latest";
    fetchNews(currentQuery, page);
  }
});


//category button
categoryBtns.forEach(btn=>{
    btn.addEventListener("click",()=>{
        container.innerHTML = "";
        page = 1;
        currentQuery = btn.dataset.category;
        fetchNews(currentQuery, page);
    });
});

// Load More button
loadMoreBtn.addEventListener("click", () => {
  page++;
  fetchNews(currentQuery, page);
});


// Initial load
fetchNews(currentQuery, page);
