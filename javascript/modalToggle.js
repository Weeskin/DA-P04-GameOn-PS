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
        if (event.target === modal ||event.target.classList.contains("close")) {
            modal.style.display = "none"
        }
    });
}


function verificationInputModal() {
    const inputs = document.querySelectorAll(".modal input");
    const submit = document.querySelector(".modal button");
    const form = document.querySelector(".modal form");

    // Check if the message element already exists
    let messageElement = form.querySelector('.form-message');
    if (!messageElement) {
        messageElement = document.createElement('div');
        messageElement.classList.add('form-message');
        form.appendChild(messageElement);
    }

    submit.addEventListener('submit', (event) => {
        event.preventDefault();
        let isValid = true;

        inputs.forEach(input => {
            const errorMessage = validateInput(input);
            if (errorMessage) {
                input.style.border = "1px solid red";
                showError(input, errorMessage);
                isValid = false;
            } else {
                input.style.border = "1px solid green";
                showSuccess(input);
            }
        });

        if (isValid) {
            // Envoyer les données
            console.log("Formulaire validé et envoyé");
            messageElement.textContent = "";
        } else {
            // Display the message if the form is not valid
            messageElement.textContent = "Merci de bien vouloir remplir le formulaire";
            messageElement.style.color = "red";
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
                return "Veuillez entrer une date valide (JJ--MM-AAAA).";
            }
            break;
        case "number":
            if (isNaN(value) || value < 0 || value > 99) {
                return "Veuillez entrer un nombre entre 0 et 99.";
            }
            break;
        default:
            break;
    }

    return null;
}

function showError(input, message) {
    let errorElement = input.nextElementSibling;
    if (!errorElement || !errorElement.classList.contains('error-message')) {
        errorElement = document.createElement('div');
        errorElement.classList.add('error-message');
        input.parentNode.insertBefore(errorElement, input.nextSibling);
    }
    errorElement.textContent = message;
}

function showSuccess(input) {
    let errorElement = input.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error-message')) {
        errorElement.remove();
    }
}

// //Validation propre à chaque input
// const VALIDATION_MAPPING => () {
//     agreement: {
//         errorMessage: 'Vous devez accepter les conditions d'utilisation',
//         validate: (input) => {
//             return input.target.checked;
//         },
//     },
//     firstName: {
//         errorMessage: 'Ce champs doit contenir au moins deux caractères',
//         validate : (input) => {
//             return input.target.value.length > 2;
//         },
//     },
// };
