// Création d'un menu burger
const header = document.querySelector('#myTopnav');
const navbar = document.querySelector('.main-navbar');
const menuBurgerBtn = document.querySelector('.icon-navbar') && document.querySelector('.fa-bars');
const links = Array.from(navbar.querySelectorAll('a:not(.icon-navbar)'));
const logo = document.querySelector('.header-logo');

export function toggleShowMenuBurger() {
    menuBurgerBtn.addEventListener('click', () => {
        const menuBurger = document.querySelector('.menu-burger');
        if (menuBurger) {
            menuBurger.remove();
        } else {
            createMenuBurger();
        }
    });

    //Si je clique sur aucun lien du menu burger, je ferme le menu burger
    header.addEventListener('click', (event) => {
        if (event.target !== menuBurgerBtn && event.target !== logo && !links.includes(event.target)) {
            const menuBurger = document.querySelector('.menu-burger');
            if (menuBurger) {
                menuBurger.remove();
                menuBurgerBtn.classList.remove('active');
            }
        }
    });
}

function createMenuBurger() {
    // Créer la div menu-burger
    const menuBurger = document.createElement('div');
    menuBurger.classList.add('menu-burger');
    menuBurger.style.display = 'flex';
    menuBurger.style.flexDirection = 'column';
    menuBurger.style.position = 'absolute';
    menuBurger.style.top = '0';
    menuBurger.style.right = '0';
    menuBurger.style.backgroundColor = 'white';
    menuBurger.style.width = '100%';
    menuBurger.style.height = '100vh';
    menuBurger.style.zIndex = '1000';
    menuBurger.style.justifyContent = 'center';
    menuBurger.style.alignItems = 'center';

    // Déplacer le logo et les liens du menu dans la div menu-burger
    const logoClone = logo.cloneNode(true);
    logoClone.style.marginBottom = '20px';
    logoClone.style.marginTop = '20px';
    const logoChild = logoClone.firstElementChild;
    logoChild.style.width = '20vw';
    menuBurger.appendChild(logoClone);
    links.forEach(link => {
        const linkClone = link.cloneNode(true);
        linkClone.addEventListener('click', () => {
            links.forEach((link) => link.classList.remove('active'));
            link.classList.add('active');
        });
        menuBurger.appendChild(linkClone);
    });

    // Ajouter une croix pour fermer le menu burger
    const cross = document.createElement('span');
    cross.innerHTML = '&times;';
    cross.style.fontSize = '8vw';
    cross.style.color = 'red';
    cross.style.position = 'absolute';
    cross.style.top = '3vh';
    cross.style.right = '7vw';
    cross.style.cursor = "pointer";

    menuBurger.appendChild(cross);
    cross.addEventListener('click', () => {
        menuBurger.remove();
    });

    // Ajouter la div menu-burger à la barre de navigation
    header.appendChild(menuBurger);
}

