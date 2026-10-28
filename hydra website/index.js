// ================= HYDRA ARENA =================
// Admin Login Removed as requested.
document.addEventListener("DOMContentLoaded", () => {
  const adminForm = document.getElementById("adminForm");
  if (adminForm) {
    adminForm.addEventListener("submit", function (e) {
      e.preventDefault();
      window.location.href = "user.html";
    });
  }
});