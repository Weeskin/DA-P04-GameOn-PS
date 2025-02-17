const header = document.querySelector('#myTopnav');
const menuBurgerBtn = document.querySelector('.icon-navbar');
const logo = document.querySelector('.header-logo');
const navbar = document.querySelector('.main-navbar');
const links = navbar.querySelectorAll('a');
const linksArray = Array.from(navbar.querySelectorAll('a:not(.icon-navbar)'));

export function navbarUnderlineOnClick() {
    for (let linksIdx = 0; linksIdx < links.length; linksIdx++) {
        links[linksIdx].addEventListener('click', (event) => {
            links.forEach((link) => link.classList.remove('active'));
            event.target.classList.add('active');
        });
    }
}

export function initBurgerMenu() {
    menuBurgerBtn.addEventListener('click', () => {
        const menuBurger = document.querySelector('.menu-burger');
        menuBurger ? menuBurger.remove() : createMenuBurger();
    });

    header.addEventListener('click', (event) => {
        const menuBurger = document.querySelector('.menu-burger');
        if (menuBurger && !menuBurger.contains(event.target) && event.target !== menuBurgerBtn && event.target !== logo) {
            menuBurger.remove();
            menuBurgerBtn.classList.remove('active');
        }
    });
}

function createMenuBurger() {
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

    const logoClone = logo.cloneNode(true);
    logoClone.style.marginBottom = '20px';
    logoClone.style.marginTop = '20px';
    const logoChild = logoClone.firstElementChild;
    logoChild.style.width = '20vw';
    menuBurger.appendChild(logoClone);

    linksArray.forEach(link => {
        const linkClone = link.cloneNode(true);
        linkClone.addEventListener('click', () => {
            const allLinks = document.querySelectorAll('.menu-burger a');
            allLinks.forEach((link) => link.classList.remove('active'));
            linkClone.classList.add('active');
        });
        menuBurger.appendChild(linkClone);
    });

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

    header.appendChild(menuBurger);
}