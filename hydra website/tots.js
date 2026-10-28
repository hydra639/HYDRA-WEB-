import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabase = createClient(
  "https://nxopyywkcgagvprlvxny.supabase.co",
  "sb_publishable_GGG56DwK9TIwk2VnqDTTng_rEM1up1j"
);

const container = document.getElementById("totsContainer");

async function loadTOTS() {

  // Loading
  container.innerHTML = `
    <div class="loading-card">
      ⏳ Loading Ballon d'Or Players...
    </div>
  `;

  // Fetch data from Supabase
  const { data, error } = await supabase
    .from("tots_updates")
    .select("*")
    .order("created_at", { ascending: false });

  // Error check
  if (error) {
    console.error("TOTS ERROR:", error);

    container.innerHTML = `
      <div class="empty-message">
        ❌ Failed to load Ballon d'Or updates
      </div>
    `;
    return;
  }

  // No data check
  if (!data || data.length === 0) {
    container.innerHTML = `
      <div class="empty-message">
        ⚠️ No Ballon d'Or players available
      </div>
    `;
    return;
  }

  // Clear container
  container.innerHTML = "";

  // Create cards
  data.forEach(player => {

    container.innerHTML += `
      <div class="tots-card">

        <img src="${player.image_url}"
             alt="${player.player_name}"
             onerror="this.src='https://via.placeholder.com/400x300?text=HYDRA+TOTS'">

        <div class="card-content">

          <div class="rating">⭐ ${player.rating}</div>

          <h3>${player.player_name}</h3>

          <p class="position">📌 ${player.position}</p>

          <p>Latest HYDRA Ballon d'Or featured player.</p>

        </div>

      </div>
    `;
  });
}

// Run when page loads
loadTOTS();