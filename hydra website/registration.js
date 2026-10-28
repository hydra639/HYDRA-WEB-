import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabase = createClient(
  "https://nxopyywkcgagvprlvxny.supabase.co",
  "sb_publishable_GGG56DwK9TIwk2VnqDTTng_rEM1up1j"
);

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzqyXUKERjHAvEcqJDxWayA778SHGJvSEteKiuCB5eYWSar22ygUJNHXFbbtZq4wnZd-Q/exec";

const form = document.getElementById("registrationForm");

form.addEventListener("submit", async (e) => {

  e.preventDefault();

  try {

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const uid = document.getElementById("uid").value.trim();
    const ign = document.getElementById("ign").value.trim();

    const file = document.getElementById("screenshot").files[0];

    if (!file) {
      alert("📷 Please upload payment screenshot.");
      return;
    }

    const reader = new FileReader();

    reader.onload = async () => {

      try {

        const base64 = reader.result.split(",")[1];

        const response = await fetch(GOOGLE_SCRIPT_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: new URLSearchParams({
            file: base64,
            name: file.name,
            type: file.type
          })
        });

        const result = await response.json();

        if (!result.success) {
          alert("❌ Screenshot Upload Failed");
          console.error(result);
          return;
        }

        const screenshotUrl = result.url;

        const { error } = await supabase
          .from("registrations")
          .insert([
            {
              name: name,
              email: email,
              mobile_number: mobile,
              uid: uid,
              in_game_name: ign,
              screenshot_url: screenshotUrl
            }
          ]);

        if (error) {
          console.error(error);
          alert("❌ Registration Failed\n\n" + error.message);
          return;
        }

        alert("✅ Registration Successful!");

        form.reset();

      } catch (err) {

        console.error(err);
        alert("❌ Screenshot Upload Error");

      }

    };

    reader.readAsDataURL(file);

  } catch (err) {

    console.error(err);
    alert("❌ Unexpected Error");

  }

});