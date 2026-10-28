import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://nxopyywkcgagvprlvxny.supabase.co";
const supabaseKey = "sb_publishable_GGG56DwK9TIwk2VnqDTTng_rEM1up1j";

const supabase = createClient(supabaseUrl, supabaseKey);

const tableBody = document.getElementById("winnerTableBody");

async function loadWinners() {
  const { data, error } = await supabase
    .from("tournament_winners")
    .select("position, player_name, team_name, tournament_name")
    .order("id", { ascending: true });

  if (error) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="4">❌ Failed to load winners</td>
      </tr>
    `;
    console.error(error);
    return;
  }

  tableBody.innerHTML = "";

  data.forEach(winner => {
    tableBody.innerHTML += `
      <tr>
        <td>${winner.position}</td>
        <td>${winner.player_name}</td>
        <td>${winner.team_name}</td>
        <td>${winner.tournament_name}</td>
      </tr>
    `;
  });
}

loadWinners();