import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabase = createClient(
  "https://nxopyywkcgagvprlvxny.supabase.co",
  "sb_publishable_GGG56DwK9TIwk2VnqDTTng_rEM1up1j"
);

const newsContainer = document.getElementById("newsContainer");

async function loadNews() {

  newsContainer.innerHTML = "<h2>Loading News...</h2>";

  const { data, error } = await supabase
    .from("news")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {

    console.log(error);

    newsContainer.innerHTML = "<h2>❌ Failed to Load News</h2>";

    return;

  }

  if (data.length === 0) {

    newsContainer.innerHTML = "<h2>No News Available</h2>";

    return;

  }

  newsContainer.innerHTML = "";

  data.forEach(news => {

    const date = new Date(news.created_at);

    const card = document.createElement("div");

    card.className = "news-card";

    card.innerHTML = `

      <img src="${news.image_url}" alt="News Poster">

      <div class="news-content">

        <h2>${news.title}</h2>

        <p>${news.description}</p>

        <div class="news-date">

          📅 ${date.toLocaleDateString()}

        </div>

      </div>

    `;

    newsContainer.appendChild(card);

  });

}

loadNews();