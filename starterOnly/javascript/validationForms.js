const formData = document.querySelectorAll(".formData");

export function validateForm() {
    // On parcourt tous les éléments de la classe formData
    formData.forEach((data) => {
        // On récupère les éléments input et button
        const input = data.querySelector("input");
        const button = data.querySelector("button");
        // On écoute l'événement input sur l'input
        input.addEventListener("input", () => {
            // Si la valeur de l'input est vide
            if (input.value === "") {

                // On ajoute la classe invalid à l'input
                input.classList.add("invalid");
                // On désactive le bouton
                button.disabled = true;
            }
            // Sinon
            else {
                // On retire la classe invalid à l'input
                input.classList.remove("invalid");
                // On active le bouton
                button.disabled = false;
            }
        });
    });
}