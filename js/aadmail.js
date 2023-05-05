document.getElementById("contactform").addEventListener("submit", function (event) {
    event.preventDefault();

    fetch("https://formspree.io/f/mdovblgktest", {
        method: "POST",
        body: new FormData(event.target),
        headers: {
            "Accept": "application/json"
        }
    }).then(response => {
        if (response.status === 200) {
            // Reset the form
            document.getElementById("contactform").reset();
            // Show the modal
            showModal();
        } else {
            console.error("Form submission failed with status", response.status);
        }
    }).catch(error => {
        console.error("Form submission error:", error);
    });
});

function showModal() {
    const submitButton = document.getElementById("submit");
    submitButton.classList.add("btn-active");

    setTimeout(() => {
        submitButton.classList.remove("btn-active");
    }, 200);

    resetModalContent();

    let counterElement = document.createElement('p');
    counterElement.id = 'counter';
    document.getElementById("formspree-message").innerHTML = "<div class='formspree-form-success'><h2>Thank you!</h2><p>Your message has been sent successfully.</p></div>";
    document.getElementById("formspree-message").appendChild(counterElement);

    const modal = document.getElementById("myModal");
    modal.style.display = "block";

    const span = document.getElementsByClassName("close")[0];
    span.onclick = closeModal;

    window.onclick = function (event) {
        if (event.target === modal) {
            closeModal();
        }
    };

    let counter = 10; // Change this value to adjust the duration before the modal closes
    countdown = setInterval(function () {
        counterElement.innerText = "Closing in " + counter + " seconds";
        if (counter <= 0) {
            closeModal();
        }
        counter--;
    }, 1000);
}

function closeModal() {
    const modal = document.getElementById("myModal");
    modal.style.display = "none";
    clearInterval(countdown); // Clear the countdown interval
    resetModalContent(); // Reset the modal content when it is closed
}

function resetModalContent() {
    document.getElementById("formspree-message").innerHTML = "";
}
