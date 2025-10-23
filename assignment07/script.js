// Get today's date
const today = new Date();

document.addEventListener("DOMContentLoaded", () => {
    // Make an object consisting of the html input elements
    // to get access to their values easier
    const formInputs = {
        heading: document.getElementById("otsikko"),
        author: document.getElementById("kirjoittaja"),
        datePicker: document.getElementById("paiva"),
        textContent: document.getElementById("sisalto"),
        picturePath: document.getElementById("kuva"),
        isPublic: document.getElementById("julkinen")
    };
    formInputs.datePicker.valueAsDate = today; // Default date
    formInputs.datePicker.setAttribute("min", today); // Min date today

    // Eventlistener for clicking the button inside the DOMContentLoaded event listener to use 
    // formInputs fields easier
    document.getElementById("lisaaBtn").addEventListener("click", () => addPost(formInputs))
})


function addPost(formInputs) {

    console.log(formInputs.isPublic.checked);

    clearFields(formInputs);
}

// After adding a new blog post, automatically reset every input field
function clearFields(formInputs) {
    formInputs.heading.value = "";
    formInputs.author.value = "";
    formInputs.datePicker.valueAsDate = today;
    formInputs.textContent.value = "";
    formInputs.picturePath.value = "";
}
