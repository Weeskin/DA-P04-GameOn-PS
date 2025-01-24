import {clickOnMenu} from "./clickOnMenu.js";
import {toggleShowMenuBurger}  from "./menuBurger.js";




clickOnMenu();
toggleShowMenuBurger();

// DOM Elements
const modal = document.querySelector(".modal");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

// Lance la modal sur tous les boutons ayant la classe modal-btn
modalBtn.forEach((btn) =>
    btn.addEventListener("click", () => {
      modal.style.display = "block";
    })
);


