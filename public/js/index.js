// For Modals

var btn = document.getElementById("modal_opener");
var modal = document.querySelector(".modal");

function attachModalListeners(modalElem) {
    modalElem.querySelector(".close_modal").addEventListener("click", toggleModal);
    modalElem.querySelector(".overlay").addEventListener("click", toggleModal);
}

function detachModalListeners(modalElem) {
    modalElem.querySelector(".close_modal").removeEventListener("click", toggleModal);
    modalElem.querySelector(".overlay").removeEventListener("click", toggleModal);
}

function toggleModal() {
    var currentState = modal.style.display;

    // if modal is visible then hide, else display
    if (currentState === "none") {
        modal.style.display = "block";
        attachModalListeners(modal);
    } else {
        modal.style.display = "none";
        detachModalListeners(modal);
    }
}

btn.addEventListener("click", toggleModal);