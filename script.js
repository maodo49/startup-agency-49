
//Ajout de la classe "sticky" au scroll pour le header
window.addEventListener("scroll", function () {
  const header = document.querySelector(".site-header");
  const scrollPosition = window.scrollY || window.scrollY;

  // Ajouter la classe "fixed" lorsque l'utilisateur a scrollé
  if (scrollPosition > 0) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
});



//Gestion de l'affichage et du clic sur le menu avec ajout ou suppression de la classe "menu-hamburger"
document.addEventListener("DOMContentLoaded", () => {
  // document.body.style.overflow = 'hidden';
  const menuIcon = document.querySelector(".menu-icon");
  const menu = document.querySelector(".navbar");
  const closeIcon = document.querySelector(".icon-close-menu");
  const divOpacity = document.querySelector(".opacity");//pour l'ombre à coté du menu hamburger


  divOpacity.addEventListener('click', () => {
    divOpacity.style.display = 'none';
    closeIcon.style.display = 'none';
    document.querySelector('.logo-menu').style.display = 'none';
    menu.classList.replace('menu-hamburger', 'navbar');
  })

  if (menuIcon) {
    menuIcon.addEventListener('click', () => {
      divOpacity.style.display = 'flex';
      divOpacity.style.overflow = '-moz-hidden-unscrollable';
      closeIcon.style.display = 'flex';
      document.querySelector('.logo-menu').style.display = 'flex';
      menu.classList.replace('navbar', 'menu-hamburger');

    });

    closeIcon.addEventListener('click', () => {
      console.log('Close icon clicked!');
      menu.style.display = 'flex';
      closeIcon.style.display = 'none';
      divOpacity.style.display = 'none';
      document.querySelector('.logo-menu').style.display = 'none';
      menu.classList.replace('menu-hamburger', 'navbar');
    });

    if (menu.classList === 'menu-hamburger' || menu.classList === 'navbar') {
      if (window.innerWidth > 960) {
        menuIcon.style.display = 'none';
        menu.classList.add('navbar');
        menu.style.display = 'flex';
      }
    }


  } else {
    console.error('Menu icon not found');
  }

  let sections = document.querySelectorAll("section");
  let navLinks = document.querySelectorAll(".site-header nav a");

  window.addEventListener("scroll", () => {
    let scrollPosition = window.scrollY;

    sections.forEach((sec) => {
      let offset = sec.offsetTop - 150; // Ajustement pour le décalage
      let height = sec.offsetHeight;
      let id = sec.getAttribute("id");

      if (scrollPosition >= offset && scrollPosition < offset + height) {
        navLinks.forEach((link) => link.classList.remove("active"));
        let activeLink = document.querySelector(
          `.header nav a[href="#${id}"]`
        );
        if (activeLink) {
          activeLink.classList.add("active");
        }
      }
    });
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      navLinks.forEach((link) => link.classList.remove("active"));
      this.classList.add("active");

      let targetSection = document.querySelector(this.getAttribute("href"));
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 150,
          behavior: "smooth",
        });
      }
    });
  });
});






//Création du modal pour la video


let modal = document.getElementById("videoModal");
let btn = document.getElementById("openModal");
let span = document.getElementsByClassName("close")[0];
let iframe = document.getElementById("youtubeVideo");

// YouTube video URL (avec l'option autoplay:1 pour que la video soit auto-démarre)
let videoSrc = "https://www.youtube.com/embed/Cm3U-NgJb9I?autoplay=1&si=ipQff0oORqsnfIpp";


//Quand on clique sur le bouton, on ouvre le modal et la vidéo démarre
btn.onclick = function () {
  modal.style.display = "flex";
  iframe.src = videoSrc; // Set the video source to autoplay
};

//Quand on clique sur la croix, on ferme le modal
span.onclick = function () {
  modal.style.display = "none";
  iframe.src = ""; // Stop la video par le reset de la source
};


//Quand on clique en dehors de la modal, on la ferme
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    iframe.src = ""; // Stop la video par le reset de la source
  }
};

//Section des commentaires avec paragraphes de style "Playfair Display"

let persons = document.querySelectorAll(".person");//contient les personnes (5) avec leurs commentaires
let commentText = document.getElementById("comment-text");//contient les paragraphes
let currentIndex = 0;
let autoScrollInterval;
const customerInfo = document.querySelector(".customer-info");//contient le nom et le commentaire des 5 personnes
const customerPersons = document.querySelector(".customer-persons");
//contient customer-info et permet de délimiter la taille pour l'affichage et laisser le scroll vertical les marges internes aussi

let tailleConteneur = 0;

// Largeur d'une personne pour calculer le défilement horizontal
let personWidth = 0;
let tailleMaxConteneur = customerInfo.offsetWidth;//contient la largeur du conteneur

let divs = document.querySelectorAll(".customer-persons div.person");//contient les 5 divs == persons


function adjustDivWidths() {
  let tailleConteneur = 0;
  let personWidth = 0;

  if (window.innerWidth >= 992) {
    // Cas pour les écrans larges
    tailleConteneur = window.innerWidth - 180;
    personWidth = persons[0].offsetWidth + 60; // Ajuste la largeur avec la marge droite
    divs.forEach((div) => {
      div.style.width = "233.333px"; // Largeur définie pour ce cas
    });
  } else if (window.innerWidth >= 880) {
    // Cas pour les écrans moyens // Ajuste la largeur avec la marge droite
    divs.forEach((div) => {
      div.style.width = "253.333px"; // Largeur définie pour ce cas
    });
  } else if (window.innerWidth < 880 && window.innerWidth >= 575) {
    // Cas pour les écrans petits// Ajuste la largeur avec la marge droite
    divs.forEach((div) => {
      div.style.width = "353.5px"; // Largeur définie pour ce cas
    });
  } else if (window.innerWidth < 575) {
    divs.forEach((div) => {
      div.style.width = "171.667px"; // Largeur définie pour ce cas
    })
  }



}

// Appeler la fonction une première fois pour l'initialiser
adjustDivWidths();

// Ajout d'un écouteur d'événement pour surveiller le redimensionnement de la fenêtre
window.addEventListener('resize', adjustDivWidths);

// Fonction pour faire défiler horizontalement
function scrollToActivePerson() {
  // Calcul de la position à scroller en fonction de la largeur de la personne
  const personWidth = persons[currentIndex].offsetWidth + 45;
  const scrollPosition = personWidth * currentIndex - (customerPersons.offsetWidth / 2 - personWidth / 2);
  customerPersons.scrollTo({ left: scrollPosition, behavior: "smooth" });
}


// Fonction pour passer à la personne suivante
function nextPerson() {
  // Retirer la classe active de la personne actuelle
  persons[currentIndex].classList.remove("active");

  // Incrémenter l'index, revenir au début si nécessaire
  currentIndex = (currentIndex + 1) % persons.length;

  // Ajouter la classe active à la prochaine personne
  persons[currentIndex].classList.add("active");

  // Mettre à jour le commentaire
  const newComment = persons[currentIndex].getAttribute("data-comment");
  commentText.textContent = newComment;

  // Scroller jusqu'à la personne active
  scrollToActivePerson();
}

// Démarrer le défilement automatique
function startAutoScroll() {
  autoScrollInterval = setInterval(nextPerson, 1000); // 10 secondes d'intervalle
}

// Arrêter le défilement automatique
function stopAutoScroll() {
  clearInterval(autoScrollInterval);
}

// Gestion du clic sur une personne
persons.forEach((person, index) => {
  person.addEventListener("click", () => {
    // Arrêter l'auto-défilement
    stopAutoScroll();

    // Supprimer la classe active de toutes les personnes
    persons.forEach((p) => p.classList.remove("active"));

    // Ajouter la classe active à la personne cliquée
    person.classList.add("active");

    // Mettre à jour le commentaire
    const newComment = person.getAttribute("data-comment");
    commentText.textContent = newComment;

    // Mettre à jour l'index actuel
    currentIndex = index;

    // Scroller jusqu'à la personne cliquée
    scrollToActivePerson();

    // Redémarrer l'auto-défilement après un petit délai
    setTimeout(startAutoScroll, 5000); // Reprendre après 5 secondes
  });
});

// Lancer le défilement automatique initialement
startAutoScroll();


// bouton suivant et precedent pour le slider de tutoriels

const PrevButton = document.querySelector(".arrows button.prev");
const NextButton = document.querySelector(".arrows button.next");

function prevSlide() {
  const widthTutorials = document.querySelector(".tutorial1").offsetWidth;
  if (window.innerWidth <= 768) {
    document.querySelector(".tutorials").scrollLeft -= widthTutorials;
  } else {
    document.querySelector(".tutorials").scrollLeft -= widthTutorials + 30;
  }
}


function nextSlide() {
  const widthTutorials = document.querySelector(".tutorials").offsetWidth;
  document.querySelector(".tutorials").scrollLeft += widthTutorials;
}

PrevButton.addEventListener("click", prevSlide);
NextButton.addEventListener("click", nextSlide);