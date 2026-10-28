/* ============================================
   HYDRA ESPORTS — Classic Clean Interactions
   Smooth Hover & Clean Visual Feedback
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initClassicHover();
});

function initClassicHover() {
    const cards = document.querySelectorAll('.card, .login-card, .glass, .registration-card');

    cards.forEach(card => {
        card.style.transition = 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease';

        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-4px)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0px)';
        });
    });
}
