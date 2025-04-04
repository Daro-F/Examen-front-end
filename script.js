document.addEventListener("DOMContentLoaded", () => {
    
    // ===================== AFFICHER / CACHER LE HEADER SELON DE SCROLL =====================//

    let scroll = 0;                                                                                 // On part de 0

    const header = document.getElementById('header');                                               // Récupère l'ID header
    const burger = document.querySelector('.burger');                                               // Récupère le burger menu
    const headerLeft = document.querySelector('.header-left');                                      // Récupère la partie gauche du header
    const closeBtn = document.querySelector('.close-btn');                                          // Récupère le bouton de fermeture

    window.addEventListener('scroll', function() {                                                  // Ecoute quand il y a un scroll dans la fenêtre
        const currentScroll = window.pageYOffset;                                                   // Récupère la position actuelle de scroll

        if (currentScroll > scroll && !headerLeft.classList.contains('open')) {                     // Si je scroll vers le bas et que le header gauche a la class 'open'
            header.classList.add('hide');                                                           // Cache le header

        } else if (currentScroll < scroll) {                                                        // Sinon si je scroll vers le haut
            header.classList.remove('hide');                                                        // Affiche le header
        }
        scroll = currentScroll;                                                                     // Met à jour la position du scroll 
    });

    function updateHeaderBackgroundOnScroll() {                                                     // Function pour afficher un background colors sur le header (uniquement mobile)
        const isMobile = window.innerWidth < 1260;                                                  // Vérifie si on est en mobile
        const hasScrolledPastBanner = window.scrollY > window.innerHeight;                          // Vérifie si on a dépassé la bannière

        if (isMobile && hasScrolledPastBanner) {                                                    // Si on est en mobile et qu'on a dépassé la bannière
            header.style.backgroundColor = '#363A2B';                                               // Le backgroundColor du header sera '#363A2B'
        } else if (isMobile && !hasScrolledPastBanner) {                                            // Sinon si on est en mobile mais qu'on a pas dépassé la bannière
            header.style.backgroundColor = 'transparent';                                           // Le backgroundColor du header sera 'transparent'
        } else {                                                                                    // Sinon
            header.style.backgroundColor = '#E5E0DC';                                               // On est en deskop donc backgroundColor '#E5E0DC'
        }
    }

    window.addEventListener('scroll', updateHeaderBackgroundOnScroll);                              // Appel la function à chaque scoll
    window.addEventListener('resize', updateHeaderBackgroundOnScroll);                              // Appel la function à chaque redimension de la page


    // ===================== BOUTON BURGER =====================//

    burger.addEventListener('click', function () {                                                  // Ecoute quand il y a un clique sur le burger                                           
        headerLeft.classList.toggle('open');                                                        // Ouvre le header gauche 

        if (headerLeft.classList.contains('open')) {                                                // Si le header gauche a la class 'open'                                     
            closeBtn.style.display = 'block';                                                       // Fais apparaître le bouton 'fermer'
        }
    });

    closeBtn.addEventListener('click', function () {                                                // Quand on clique sur le bouton 'fermer'
        headerLeft.classList.remove('open');                                                        // Le 'headerLeft' se cache                                              
    });


    // ===================== CHANGER D'IMAGE POUR LES CAROUSEL =====================//

    const carousels = document.querySelectorAll(".carousel");                                       // Récupère tous les ID 'carouselé

    carousels.forEach(function (carousel) {                                                         // Parcourt chaque carousel trouvé sur la page
        const images = carousel.querySelectorAll(".carousel-img");                                  // Récupère toutes les images à l'intérieur du carousel
        let currentImage = 0;                                                                       // Initialise l'index de l'image affichée à 0

        images.forEach(function (img, i) {
            img.addEventListener("click", function () {                                             // Ajoute un écouteur de clic sur chaque image
                currentImage = (i + 1) % images.length;                                             // Passe à l'image suivante (ou revient à la première si on est à la fin)

                const nextImage = images[currentImage];                                             // Récupère la prochaine image
                carousel.scrollTo({                                                                 // Scroll entre chaque images                                           
                left: nextImage.offsetLeft - carousel.offsetLeft,                                   // Calcule la position de l'image cible par rapport au début du carousel
                behavior: "smooth"                                                                  // Applique un défilement fluide
                });
            });
        });
    });

    // ===================== SCROLL AU SUIVI DE LA SOURIS SUR SERVICE-LIST =====================//

    const listeServices = document.querySelectorAll(".service-list");                               // Récupère le conteneur des cartes service
    console.log(listeServices);

    let sourisAppuyee = false;                                                                      // Est-ce que la souris est enfoncée ? Initialement non
    let positionDepartX;                                                                            // Position X au moment du clic
    let scrollInitial;                                                                              // Position de scroll avant le déplacement

    listeServices.forEach((list) => {
        list.addEventListener("mousedown", function (e) {
            sourisAppuyee = true;                                                                   // Active le glissement
            list.classList.add("drag");                                                             // Change le curseur de la souris
            positionDepartX = e.pageX - list.offsetLeft;                                            // Enregistre la position X du clic
            scrollInitial = list.scrollLeft;                                                        // Enregistre le scroll de base
        });

        list.addEventListener("mouseleave", function () {                                           // Ecoute si la souris sort
            sourisAppuyee = false;                                                                  // Si la souris sort, on arrête
            list.classList.remove("drag");                                                          // Change le curseur de la souris
        });

        list.addEventListener("mouseup", function () {                                              // Ecoute si la souris est appuyé
            sourisAppuyee = false;                                                                  // Quand on relâche, on arrête
            list.classList.remove("drag");                                                          // Change le curseur de la souris
        });

        list.addEventListener("mousemove", function (e) {                                           // Ecoute si la souris bouge
            if (!sourisAppuyee)                                                                     // Si on ne clique pas,
            return;                                                                                 // Rien ne se passe
            console.log(e);
            const positionX = e.pageX - list.offsetLeft;                                            // Nouvelle position X (en fonction de la distance)
            const distance = (positionX - positionDepartX) * 1.5;                                   // Calcule la distance de glissement (x1.5 pour augmenter la vitesse)
            list.scrollLeft = scrollInitial - distance;                                             // Scroll le conteneur selon le mouvement
        });
    });

    // ===================== GESTION DE L'OUVERTURE ET FERMETURE DE LA MODALE =====================//

    const openModalBtns = document.querySelectorAll(".open-modal-btn");
    const modalOverlay = document.querySelector(".modal-overlay");
    const modalCloseBtn = document.querySelector(".modal-close");
    const modalHotelSelect = document.querySelector(".modal select#hotel"); // sélectionne le bon <select>
    
    openModalBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            modalOverlay.classList.add("active");
            document.body.style.overflow = "hidden";
    
            const selectedHotel = btn.getAttribute("data-hotel");
            if (selectedHotel && modalHotelSelect) {
                modalHotelSelect.value = selectedHotel;
            }
        });
    });
    
    modalCloseBtn.addEventListener("click", () => {
        modalOverlay.classList.remove("active");
        document.body.style.overflow = "auto";
    });
    

    // ===================== GESTION DU FORMULAIRE =====================//

    const form = document.querySelector(".modal form");                                                    // Récupère le formulaire
    form.addEventListener("submit", function (e) {                                                  // Ecoute quand il est envoyé
        e.preventDefault();                                                                         // Empêche le rechargement de la page
        removeErrors();                                                                             // Appel la fonction removeErrors 

        const errors = [];                                                                          // Crée un tableau d'erreur

        const firstname = form.querySelector('#nom');                                           // Récupère le nom
        const name = form.querySelector('#prenom');                                             // Récupère le prenom
        const email = form.querySelector('#email');                                             // Récupère l'émail
        const phone = form.querySelector('#tel');                                               // Récupère le téléphone
        const people = form.querySelector('#personnes');                                        // Récupère le nombre de personnes
        const hotel = form.querySelector('#hotel')                                              // Récupère l'hotel
        const arrival = form.querySelector('#arrivee');                                         // Récupère la date d'arrivée
        const depart = form.querySelector('#depart');                                           // Récupère la date de départ
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;                                            // Format Regex de l'émail
        const phoneRegex = /^(\+?\d{1,3}[-.\s]?)?\d{9,12}$/;                                        // Format Regex du numéro de téléphone

        if (firstname.value.trim().length < 2 || firstname.value.trim().length > 50) {                              // Si la valeur est inférieur a 2 ou supérieur a 50
            errors.push({ element: firstname, message: "Le prénom doit contenir entre 2 et 50 caractères." });      // Renvoie l'erreur "..." 
        }

        if (name.value.trim().length < 2 || name.value.trim().length > 50) {                                        // Si la valeur est inférieur a 2 ou supérieur a 50
            errors.push({ element: name, message: "Le prénom doit contenir entre 2 et 50 caractères." });           // Renvoie l'erreur "..." 
        }

        if (!emailRegex.test(email.value.trim())) {                                                                 // Si le format de l'émail ne respecte pas le Regex
            errors.push({ element: email, message: "Adresse email invalide." });                                    // Renvoie l'erreur "..." 
        }

        if (!phoneRegex.test(phone.value.trim())) {                                                                 // Si le format du téléphone ne respecte pas le Regex
            errors.push({ element: phone, message: "Numéro de téléphone invalide." });                              // Renvoie l'erreur "..." 
        }

        if (hotel.value === "") {                                                                                   // Si la valeur de hotel est vide
            errors.push({ element: hotel, message: "Veuillez choisir votre hotel." });                              // Renvoie l'erreur "..." 
        }

        if (people.value < 1 || people.value > 10 || people.value === "") {                                         // Si le nombre de personne est < à 1 ou > à 10 ou vide
            errors.push({ element: people, message: "Le nombre de personnes doit être entre 1 et 10." });           // Renvoie l'erreur "..."
        }

        if (!arrival.value || !depart.value) {                                                                      // Si il n'y a pas de date d'arrivée ou de départ
            errors.push({ element: arrival, message: "Veuillez indiquer une date d'arrivée." });                    // Renvoie l'erreur "..." 
            errors.push({ element: depart, message: "Veuillez indiquer une date de départ." });                     // Renvoie l'erreur "..." 
        }

        if (new Date(arrival.value) > new Date(depart.value)) {                                                                     // Si la date d'arrivé est > a la date de départ
            errors.push({element: depart, message: "La date d'arrivée ne peut pas être postérieure à la date de départ." });        // Renvoie l'erreur "..." 
        }
        

        if (errors.length > 0) {                                                                                    // Si le nombre d'erreur est supérieur à 0
            errors.forEach(err => showError(err.element, err.message));                                             // Pour chaque erreur, affiche là
            return;                                                                                                 
        }

        // ===== Créer et afficher le message de succès ===== //
        const successMsg = document.createElement("div");                                                           // Crée une div
        successMsg.textContent = "Réservation envoyée avec succès ✅";                                              // Importe le texte "..."
        successMsg.className = "success-message";                                                                   // Donne la class "success-message"
        form.parentNode.insertBefore(successMsg, form);                                                             // L'importe au-dessus du form

        console.log("✅ Message de succès inséré !");

        // Masquer le formulaire 
        form.style.opacity = "0.5";                                                                                 // L'opacité du form passe a 0.5
        form.style.pointerEvents = "none";                                                                          // Empeche le clique sur le formulaire

    });

    function showError(element, message) {                                                                          // Function pour afficher les erreurs
        const error = document.createElement("div");                                                                // Crée une div quand il y a une erreur
        error.className = "error";                                                                                  // Ajoute la class error
        error.style.color = "red";                                                                                  // Applique la couleur rouge
        error.textContent = message;                                                                                // Affiche le message adéquat
        element.parentNode.insertBefore(error, element.nextSibling);                                                // Inset l'erreur sous l'élémenst cible
    }

    function removeErrors() {                                                                                       // Function pour effacer les erreurs
        document.querySelectorAll(".error").forEach(function (e) {                                                  // Parcours chaque erreurs
            e.remove();                                                                                             // Quand une est touvé, efface là
        });
    }

    const resetBtn = document.querySelector(".reset-btn");                                                          // Récupère le bouton pour remettre a 0 le formulaire
    resetBtn.addEventListener("click", function () {                                                                // Ecoute quand on clique dessus
        removeErrors();                                                                                             // Appel la fonction pour effacer les erreurs
        const form = document.querySelector(".modal form");                                                                // Récupère le formulaire
        form.reset();                                                                                               // Remet le à 0
    });   
});
