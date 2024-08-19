document.addEventListener("DOMContentLoaded", function () {
    fetch("/navbar/navbar.html")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.text();
        })
        .then((data) => {
            document.getElementById("navbar").innerHTML = data;
        })
        .catch((error) => console.error("Error loading navbar:", error));
});

function inDevelopmentAlert() {
    alert("Essa página não está disponível durante desenvolvimento.");
    window.location = "/home/index.html";
}