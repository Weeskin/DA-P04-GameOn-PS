// Sélection des éléments du DOM
const modal = document.querySelector(".modal");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const inputs = document.querySelectorAll(".modal input");
const form = document.querySelector(".modal form");
const radioButtons = document.querySelectorAll("input[type=radio]");
const dataForms = [];

// Fonction pour afficher ou masquer la modale
export function showOrNotModal() {
    // Ajoute un écouteur d'événement à chaque bouton de la modale pour ouvrir la modale
    modalBtn.forEach(btn => btn.addEventListener('click', openModal));
    // Ajoute un écouteur d'événement à la modale pour la fermer si on clique en dehors de la modale ou sur le bouton de fermeture
    modal.addEventListener('click', event => {
        if (event.target === modal || event.target.classList.contains("close")) {
            closeModal();
        }
    });
}

// Fonction pour basculer l'affichage de la modale
function openModal() {
    if (modal.style.display !== "block") {
        modal.style.display = "block";
        resetForm();
        verificationInputModal();
    }
}

// Fonction pour fermer la modale
function closeModal() {
    modal.style.display = "none";
    resetForm();
}

// Fonction pour vérifier les entrées du formulaire dans la modale
function verificationInputModal() {
    // Ajoute un écouteur d'événement pour la soumission du formulaire
    form.addEventListener('submit', event => {
        event.preventDefault();
        let isValid = true;
        let allEmpty = true;

        // Vérifie chaque entrée du formulaire
        inputs.forEach(input => {
            const value = input.value.trim();
            const errorMessage = getErrorMessage(input, value, input.id);

            // Affiche un message d'erreur si l'entrée est invalide
            if (errorMessage) {
                input.style.border = "1px solid red";
                showErrorMessage(input, errorMessage);
                isValid = false;
            } else {
                input.style.border = "1px solid green";
                removeErrorMessage(input);
                dataForms.push({id: input.id, value});
                allEmpty = false;
            }
        });

        if (allEmpty) isValid = false;
        validateForm(isValid);
    });
}

// Fonction pour obtenir le message d'erreur en fonction de l'entrée
function getErrorMessage(input, value, id) {
    // Définition des expressions régulières pour la validation des entrées
    const regexes = {
        first: /^[a-zA-ZÀ-ÿ][a-zA-ZÀ-ÿ-]{1,}$/,
        last: /^[a-zA-ZÀ-ÿ][a-zA-ZÀ-ÿ-]{1,}$/,
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        birthdate: /^\d{4}-\d{2}-\d{2}$/
    };

    // Définition des messages d'erreur
    const messages = {
        required: "Ce champ est requis.",
        minLength: "Le texte doit contenir au moins 2 caractères.",
        invalidName: "Le nom est invalide. Il doit contenir au moins 2 caractères et ne peut contenir que des lettres (minuscules ou majuscules), des lettres accentuées et des tirets.",
        invalidEmail: "Veuillez entrer une adresse e-mail valide.",
        invalidDate: "Veuillez entrer une date valide (jj/mm/aaaa).",
        invalidQuantity: "Veuillez entrer un nombre entre 0 et 99.",
        acceptConditions: "Veuillez accepter les conditions.",
        chooseOption: "Veuillez choisir une option."
    };

    // Validation des entrées en fonction de leur id
    switch (id) {
        case "first":
        case "last":
            if (!value) return messages.required;
            if (value.length < 2) return messages.minLength;
            if (!regexes[id].test(value)) return messages.invalidName;
            break;
        case "email":
            if (!regexes.email.test(value)) return messages.invalidEmail;
            break;
        case "birthdate":
            if (!regexes.birthdate.test(value)) return messages.invalidDate;
            break;
        case "quantity":
            if (isNaN(value) || value < 0 || value > 99 || !value) return messages.invalidQuantity;
            break;
        default:
            break;
    }

    // Validation des boutons radio
    if (input.type === "radio" && !Array.from(radioButtons).some(radio => radio.checked)) {
        return messages.chooseOption;
    }

    // Validation des cases à cocher
    if (id === "checkbox1" && !input.checked) {
        return messages.acceptConditions;
    }

    return undefined;
}

// Fonction pour afficher le message d'erreur
function showErrorMessage(input, message) {
    let errorElement;
    if (input.type === "radio") {
        const locationsDiv = document.querySelector('.locations');
        errorElement = locationsDiv.nextElementSibling;
        if (!errorElement || !errorElement.classList.contains('error-message')) {
            errorElement = document.createElement('div');
            errorElement.classList.add('error-message');
            locationsDiv.parentNode.insertBefore(errorElement, locationsDiv.nextSibling);
        }
    } else if (input.id === "checkbox1" && !input.checked) {
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

// Fonction pour supprimer le message d'erreur si valide
function removeErrorMessage(input) {
    let errorElement = input.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error-message')) {
        errorElement.remove();
    }
}

// Fonction pour réinitialiser le formulaire
function resetForm() {
    // Réinitialise les cases à cocher et les boutons radio
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => checkbox.checked = false);
    document.querySelectorAll('input[type="radio"]').forEach(radio => radio.checked = false);
    // Supprime les messages d'erreur
    document.querySelectorAll('.error-message').forEach(errorMessage => errorMessage.remove());
    // Réinitialise les valeurs des entrées et leur style
    inputs.forEach(input => {
        input.value = "";
        input.style.border = "1px solid #ccc";
    });
    if (modal.querySelectorAll('.form-message')) {
        modal.querySelectorAll('.form-message').forEach(message => message.remove());
    }
}

// Fonction pour valider le formulaire
function validateForm(isValid) {
    if (isValid) {
        resetForm();
        modal.style.display = "none";
        createSucessModal();
    }
}

// Fonction pour créer une modale de succès
function createSucessModal() {
    let successModal = document.createElement('div');
    successModal.classList.add('modal');
    successModal.id = 'successModal';
    successModal.style.display = "block";
    successModal.innerHTML = `
    <div class="content">
         <span class="close closeSuccess" id="closeSuccessSpan"></span>
             <div class="modal-body">
                 <p class="successText">Merci pour votre inscription</p>
                   <button class="button btn-submit modal-btn"  id="closeSuccessSubmit" type="submit" value="Fermer" >Fermer</button>
            </div>
    </div>
    `;
    document.body.appendChild(successModal);

    // Ajoute des écouteurs d'événement aux boutons de fermeture
    document.getElementById('closeSuccessSpan').addEventListener('click', closeSuccess);
    document.getElementById('closeSuccessSubmit').addEventListener('click', closeSuccess);
}

// Fonction pour fermer la modal de succès
function closeSuccess() {
    const successModal = document.getElementById('successModal');
    if (successModal) {
        successModal.style.display = "none";
        successModal.remove();
    }
}