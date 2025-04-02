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
    burger.style.pointerEvents = 'none';
    header.classList.remove('hidden');
    closeBtn.style.display = 'block';
  } else {
    burger.style.pointerEvents = 'auto';
    header.classList.add('hidden');
    closeBtn.style.display = 'none';
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
