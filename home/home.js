document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('#subscribe-form');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio padrão do formulário

        const emailInput = form.querySelector('#subscribe-email');
        const email = emailInput.value.trim();

        if (!validateEmail(email)) {
            alert('Por favor, insira um e-mail válido.');
            return;
        }

        // Gerar um ID único para a chave
        const uniqueKey = generateUniqueKey();

        // Obter dados do LocalStorage
        let storedData = JSON.parse(localStorage.getItem('subscribers')) || {};
        console.log('Dados armazenados:', storedData); // Verifique os dados armazenados

        // Verificar se o e-mail já existe
        for (const key in storedData) {
            if (storedData[key].email === email) {
                alert('Este e-mail já está registrado.');
                return;
            }
        }

        // Armazenar novos dados com uma chave única
        storedData[uniqueKey] = { email };
        localStorage.setItem('subscribers', JSON.stringify(storedData));
        console.log('Dados atualizados:', storedData); // Verifique os dados atualizados

        alert('Inscrição realizada com sucesso!');
        form.reset(); // Limpa o formulário
    });

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function generateUniqueKey() {
        // Gerar uma chave única usando o timestamp atual e um número aleatório
        return 'sub_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
    }
});
