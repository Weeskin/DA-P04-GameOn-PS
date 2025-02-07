export function clickOnMenu(){
    const navbar = document.querySelector('.main-navbar');
    const links = navbar.querySelectorAll('a');

    // Event au click sur le bouton d'un des menus
    for (let linksIdx = 0; linksIdx < links.length; linksIdx++) {
        links[linksIdx].addEventListener('click', (event) => {
            links.forEach((link) => link.classList.remove('active'));
            event.target.classList.add('active');
        });
    }
}

