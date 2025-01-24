const modal = document.querySelector(".modal");
const modalBtn =
    document.querySelector(".btn-signup") ||
    document.querySelector(".modal-btn");

export function toggleModal() {
    modalBtn.addEventListener('click', () => {
        if (modal.style.display === "block") {
            modal.style.display = "none"
        } else {
            modal.style.display = "block"
        }
    });
    //Si je clique sur le background ou le "x" de la modale je ferme la modale
    modal.addEventListener('click', (event) => {
        if (event.target === modal ||event.target.classList.contains("close")) {
            modal.style.display = "none"
        }
    });
}
