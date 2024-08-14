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
