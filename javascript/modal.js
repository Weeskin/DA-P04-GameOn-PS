// Sélection des éléments du DOM
const modal = document.querySelector(".modal");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const inputs = document.querySelectorAll(".modal input");
const form = document.querySelector(".modal form");
const radioButtons = document.querySelectorAll("input[type=radio]");
const dataForms = [];

// Fonction pour afficher ou masquer la modal
export function showOrNotModal() {
    modalBtn.forEach(btn => btn.addEventListener('click', openModal));
    modal.addEventListener('click', event => {
        if (event.target === modal || event.target.classList.contains("close")) {
            closeModal();
        }
    });
}

// Fonction pour basculer l'affichage de la modal
function openModal() {
    modal.style.display = modal.style.display === "block" ? "none" : "block";
    if (modal.style.display === "block") {
        resetForm();
        verificationInputModal();
    }
}

// Fonction pour fermer la modal
function closeModal() {
    modal.style.display = "none";
    resetForm();
}

// Fonction pour vérifier les entrées du formulaire dans la modal
function verificationInputModal() {
    form.addEventListener('submit', event => {
        event.preventDefault();
        let isValid = true;
        let allEmpty = true;

        inputs.forEach(input => {
            const value = input.value.trim();
            const errorMessage = getErrorMessage(input, value, input.id);
            let isRadioChecked = Array.from(radioButtons).some(radio => radio.checked);

            if (errorMessage && errorMessage !== "Veuillez choisir une option." && errorMessage !== "Veuillez accepter les conditions.") {
                input.style.border = "1px solid red";
                showErrorMessage(input, errorMessage);
                isValid = false;
            } else if (errorMessage === "Veuillez choisir une option." && !isRadioChecked) {
                const divForAllRadio = document.querySelector('.locations');
                showErrorMessage(divForAllRadio, errorMessage);
            } else if (errorMessage === "Veuillez accepter les conditions.") {
                const divForAllCheckbox = document.querySelector('.checkboxCgu')
                showErrorMessage(divForAllCheckbox, errorMessage);
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
    const regexes = {
        first: /^[a-zA-ZÀ-ÿ][a-zA-ZÀ-ÿ-]{1,}$/,
        last: /^[a-zA-ZÀ-ÿ][a-zA-ZÀ-ÿ-]{1,}$/,
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        birthdate: /^\d{4}-\d{2}-\d{2}$/
    };

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
        case "checkbox1":
            if (!input.checked) return messages.acceptConditions;
            break;
        default:
            break;
    }

    // Validation for radio buttons with name "location"
    if (!Array.from(radioButtons).some(radio => radio.checked)) {
        return messages.chooseOption;
    }

    return undefined;
}

// Fonction pour afficher le message d'erreur
function showErrorMessage(input, message) {
    let errorElement = input.nextElementSibling;
    if (!errorElement || !errorElement.classList.contains('error-message')) {
        errorElement = document.createElement('div');
        errorElement.classList.add('error-message');
        input.parentNode.insertBefore(errorElement, input.nextSibling);
    } else if (input.id === "checkbox1" && !input.checked) {
        const submitButton = document.querySelector('.btn-submit');
        errorElement = submitButton.previousElementSibling;
        if (!errorElement || !errorElement.classList.contains('error-message')) {
            errorElement = document.createElement('div');
            errorElement.classList.add('error-message');
            submitButton.parentNode.insertBefore(errorElement, submitButton);
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
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => checkbox.checked = false);
    document.querySelectorAll('input[type="radio"]').forEach(radio => radio.checked = false);
    document.querySelectorAll('.error-message').forEach(errorMessage => errorMessage.remove());
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

    // Add event listeners to close buttons
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