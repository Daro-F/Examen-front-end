// ===================== AFFICHER / CACHER LE HEADER SELON DE SCROLL =====================//
let scroll = 0;                                                                                 // On part de 0

const header = document.getElementById('header');                                               // Récupère l'ID header
const burger = document.querySelector('.burger');                                               // Récupère le burger menu
const headerLeft = document.querySelector('.header-left');                                      // Récupère la partie gauche du header
const closeBtn = document.querySelector('.close-btn');                                          // Récupère le bouton de fermeture

window.addEventListener('scroll', function() {                                                  // Ecoute quand il y a un scroll dans la fenêtre
  const currentScroll = window.pageYOffset;                                                     // Récupère la position actuelle de scroll

  if (currentScroll > scroll && !headerLeft.classList.contains('open')) {                       // Si je scroll vers le bas et que le header gauche a la class 'open'
    header.classList.add('hide');                                                               // Cache le header

  } else if (currentScroll < scroll) {                                                          // Sinon si je scroll vers le haut
    header.classList.remove('hide');                                                            // Affiche le header
  }
  scroll = currentScroll;                                                                       // Met à jour la position du scroll 
});

function updateHeaderBackgroundOnScroll() {                                                     // Function pour afficher un background colors sur le header (uniquement mobile)
  const isMobile = window.innerWidth < 1260;                                                    // Vérifie si on est en mobile
  const hasScrolledPastBanner = window.scrollY > window.innerHeight;                            // Vérifie si on a dépassé la bannière

  if (isMobile && hasScrolledPastBanner) {                                                      // Si on est en mobile et qu'on a dépassé la bannière
    header.style.backgroundColor = '#363A2B';                                                   // Le backgroundColor du header sera '#363A2B'
  } else if (isMobile && !hasScrolledPastBanner) {                                              // Sinon si on est en mobile mais qu'on a pas dépassé la bannière
    header.style.backgroundColor = 'transparent';                                               // Le backgroundColor du header sera 'transparent'
  } else {                                                                                      // Sinon
    header.style.backgroundColor = '#E5E0DC';                                                   // On est en deskop donc backgroundColor '#E5E0DC'
  }
}

window.addEventListener('scroll', updateHeaderBackgroundOnScroll);                              // Appel la function à chaque scoll
window.addEventListener('resize', updateHeaderBackgroundOnScroll);                              // Appel la function à chaque redimension de la page


// ===================== BOUTON BURGER =====================//
burger.addEventListener('click', function () {                                                  // Ecoute quand il y a un clique sur le burger                                           
  headerLeft.classList.toggle('open');                                                          // Ouvre le header gauche 

  if (headerLeft.classList.contains('open')) {                                                  // Si le header gauche a la class 'open'                                     
    closeBtn.style.display = 'block';                                                           // Fais apparaître le bouton 'fermer'
  }
});

closeBtn.addEventListener('click', function () {                                                // Quand on clique sur le bouton 'fermer'
  headerLeft.classList.remove('open');                                                          // Le 'headerLeft' se cache                                              
});


// ===================== CHANGER D'IMAGE POUR LES CAROUSEL =====================//
const carousels = document.querySelectorAll(".carousel");                                       // Récupère tous les ID 'carouselé

carousels.forEach(function (carousel) {                                                         // Parcourt chaque carousel trouvé sur la page
  const images = carousel.querySelectorAll(".carousel-img");                                    // Récupère toutes les images à l'intérieur du carousel
  let currentImage = 0;                                                                         // Initialise l'index de l'image affichée à 0

  images.forEach(function (img, i) {
    img.addEventListener("click", function () {                                                 // Ajoute un écouteur de clic sur chaque image
      currentImage = (i + 1) % images.length;                                                   // Passe à l'image suivante (ou revient à la première si on est à la fin)

      const nextImage = images[currentImage];                                                   // Récupère la prochaine image
      carousel.scrollTo({                                                                       // Scroll entre chaque images                                           
        left: nextImage.offsetLeft - carousel.offsetLeft,                                       // Calcule la position de l'image cible par rapport au début du carousel
        behavior: "smooth"                                                                      // Applique un défilement fluide
      });
    });
  });
});

// ===================== SCROLL AU SUIVI DE LA SOURIS SUR SERVICE-LIST =====================//
const listeServices = document.querySelector(".service-list");                                  // Récupère le conteneur des cartes service

let sourisAppuyee = false;                                                                      // Est-ce que la souris est enfoncée ? Initialement non
let positionDepartX;                                                                            // Position X au moment du clic
let scrollInitial;                                                                              // Position de scroll avant le déplacement

listeServices.addEventListener("mousedown", function (e) {
  sourisAppuyee = true;                                                                         // Active le glissement
  listeServices.classList.add("drag");                                                          // Change le curseur de la souris
  positionDepartX = e.pageX - listeServices.offsetLeft;                                         // Enregistre la position X du clic
  scrollInitial = listeServices.scrollLeft;                                                     // Enregistre le scroll de base
});

listeServices.addEventListener("mouseleave", function () {                                      // Ecoute si la souris sort
  sourisAppuyee = false;                                                                        // Si la souris sort, on arrête
  listeServices.classList.remove("drag");                                                       // Change le curseur de la souris
});

listeServices.addEventListener("mouseup", function () {                                         // Ecoute si la souris est appuyé
  sourisAppuyee = false;                                                                        // Quand on relâche, on arrête
  listeServices.classList.remove("drag");                                                       // Change le curseur de la souris
});

listeServices.addEventListener("mousemove", function (e) {                                      // Ecoute si la souris bouge
  if (!sourisAppuyee)                                                                           // Si on ne clique pas,
  return;                                                                                       // Rien ne se passe
  const positionX = e.pageX - listeServices.offsetLeft;                                         // Nouvelle position X (en fonction de la distance)
  const distance = (positionX - positionDepartX) * 1.5;                                         // Calcule la distance de glissement (x1.5 pour augmenter la vitesse)
  listeServices.scrollLeft = scrollInitial - distance;                                          // Scroll le conteneur selon le mouvement
});
