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
            verificationInputModal();
        }
    });
    //Si je clique sur le background ou le "x" de la modale je ferme la modale
    modal.addEventListener('click', (event) => {
        if (event.target === modal || event.target.classList.contains("close")) {
            modal.style.display = "none"
        }
    });
}

function verificationInputModal() {
    const inputs = document.querySelectorAll(".modal input");
    const form = document.querySelector(".modal form");

    // Vérification si le message d'avertissement existe déjà sinon on le crée
    let messageElement = form.querySelector('.form-message');
    if (!messageElement) {
        messageElement = document.createElement('div');
        messageElement.classList.add('form-message');
        form.appendChild(messageElement);
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        let isValid = true;
        let allEmpty = true;

        inputs.forEach(input => {
            const errorMessage = validateInput(input); //true or false

            if (errorMessage) {
                // Si le champ n'est pas valide
                input.style.border = "1px solid red";
                showErrorMessage(input, errorMessage);
                isValid = false;
            } else {
                // Si le champ est valide
                input.style.border = "1px solid green";
                showSuccessMessage(input);
                allEmpty = false;
            }
        });

        if (allEmpty) {
            isValid = false;
        }

        if (isValid) {
            // Envoyer les données
            messageElement.textContent = "";
        } else {
            // Mettre le message d'erreur si le formulaire n'est pas valide
            messageElement.textContent = "Merci de bien vouloir remplir le formulaire";
        }
    });
}

function validateInput(input) {
    const value = input.value.trim();
    const type = input.type;

    if (value === "") {
        return "Ce champ est requis.";
    }

    switch (type) {
        case "text":
            if (value.length < 2) {
                return "Le texte doit contenir au moins 2 caractères.";
            }
            break;
        case "email":
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                return "Veuillez entrer une adresse e-mail valide.";
            }
            break;
        case "date":
            const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
            if (!dateRegex.test(value)) {
                return "Veuillez entrer une date valide (MM-JJ-AAAA).";
            }
            break;
        case "number":
            if (isNaN(value) || value < 0 || value > 99) {
                return "Veuillez entrer un nombre entre 0 et 99.";
            }
            break;
        case "radio":
            if (!input.checked) {
                return "Veuillez cocher une des options.";
            }
            break;
        case "checkbox1":
            if (!input.checked) {
                return "Veuillez accepter les conditions.";
            }
            break;
        default:
            break;
    }

    return true;
}

function showErrorMessage(input, message) {
    let errorElement;

    if (input.type === "radio") {
        const textLabelDiv = document.querySelector('.text-label');
        errorElement = textLabelDiv.nextElementSibling;
        if (!errorElement || !errorElement.classList.contains('error-message')) {
            errorElement = document.createElement('div');
            errorElement.classList.add('error-message');
            textLabelDiv.parentNode.insertBefore(errorElement, textLabelDiv.nextSibling);
        }
    } else if (input.type === "checkbox" && input.id === "checkbox1") {
        const submitButton = document.querySelector('.btn-submit');
        errorElement = submitButton.previousElementSibling;
        if (!errorElement || !errorElement.classList.contains('error-message')) {
            errorElement = document.createElement('div');
            errorElement.classList.add('error-message');
            submitButton.parentNode.insertBefore(errorElement, submitButton);
        }
    } else {
        errorElement = input.nextElementSibling;
        if (!errorElement || !errorElement.classList.contains('error-message')) {
            errorElement = document.createElement('div');
            errorElement.classList.add('error-message');
            input.parentNode.insertBefore(errorElement, input.nextSibling);
        }
    }

    errorElement.textContent = message;
}

function showSuccessMessage(input) {
    let errorElement = input.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error-message')) {
        errorElement.remove();
    }
}