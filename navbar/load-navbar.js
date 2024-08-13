document.addEventListener("DOMContentLoaded", function () { // Espera o conteúdo da página ser carregado
    fetch("navbar.html")// Faz a requisição do arquivo navbar.html
        .then((response) => response.text())// Converte a resposta para texto
        .then((data) => { // Pega o texto e coloca no elemento com id navbar
            document.getElementById("navbar").innerHTML = data; // Coloca o texto no elemento com id navbar
        })
        .catch((error) => console.error("Error loading navbar:", error)); // Se der erro, exibe no console
});
