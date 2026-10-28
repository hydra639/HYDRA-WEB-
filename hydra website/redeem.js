import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabase = createClient(
  "https://nxopyywkcgagvprlvxny.supabase.co",
  "sb_publishable_GGG56DwK9TIwk2VnqDTTng_rEM1up1j"
);

const container = document.getElementById("codeContainer");

async function loadCodes() {

  const { data, error } = await supabase
    .from("redeem_codes")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    container.innerHTML = "<p>❌ Failed to load redeem codes</p>";
    return;
  }

  if (!data || data.length === 0) {
    container.innerHTML = "<p>⚠️ No redeem codes available</p>";
    return;
  }

  container.innerHTML = "";

  data.forEach(item => {
    container.innerHTML += `
      <div class="code-card">
        <div class="code-header">
          <span class="status">${item.status}</span>
        </div>

        <h2>${item.code}</h2>

        <p>${item.reward}</p>

        <button class="copy-btn"
          onclick="navigator.clipboard.writeText('${item.code}')">
          📋 COPY CODE
        </button>
      </div>
    `;
  });
}

loadCodes();