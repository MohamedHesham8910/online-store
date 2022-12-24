const menuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

function toggleMenu(){
    mobileMenu.classList.toggle('open');
}

menuBtn.addEventListener('click',toggleMenu);