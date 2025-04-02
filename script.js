let scroll = 0;

const header = document.getElementById('header');

window.addEventListener('scroll', function() {
  const currentScroll = window.pageYOffset;

  if (currentScroll > scroll && !headerLeft.classList.contains('open')) {
    header.classList.add('hide');                                                               // Scroll vers le bas → cacher

  } else if (currentScroll < scroll) {
    header.classList.remove('hide');                                                            // Scroll vers le haut → afficher
  }
  scroll = currentScroll;
});

const burger = document.querySelector('.burger');
const headerLeft = document.querySelector('.header-left');
const closeBtn = document.querySelector('.close-btn');

burger.addEventListener('click', function () {
  headerLeft.classList.toggle('open');
  header.classList.toggle('menu-hide');

  if (headerLeft.classList.contains('open')) {
    header.classList.remove('hidden');
    closeBtn.style.display = 'block';
  } else {
  }
});


closeBtn.addEventListener('click', function () {
  headerLeft.classList.remove('open');
  header.classList.remove('menu-hide');
  burger.style.pointerEvents = 'auto';
  closeBtn.style.display = 'none'; 
});

closeBtn.addEventListener('click', function() {
    headerLeft.classList.remove('open');
    header.classList.remove('menu-hide');
    burger.style.pointerEvents = 'auto';
});

function updateHeaderBackgroundOnScroll() {
  const isMobile = window.innerWidth < 1260;
  const hasScrolledPastBanner = window.scrollY > window.innerHeight;

  if (isMobile && hasScrolledPastBanner) {
    header.style.backgroundColor = '#363A2B'; // couleur mobile après scroll
  } else if (isMobile && !hasScrolledPastBanner) {
    header.style.backgroundColor = 'transparent'; // mobile en haut de page
  } else {
    header.style.backgroundColor = '#E5E0DC'; // 💡 couleur fixe en desktop
  }
  
}

// Rafraîchir au scroll
window.addEventListener('scroll', updateHeaderBackgroundOnScroll);

// Rafraîchir au redimensionnement
window.addEventListener('resize', updateHeaderBackgroundOnScroll);

// Rafraîchir au chargement initial
window.addEventListener('DOMContentLoaded', updateHeaderBackgroundOnScroll);
