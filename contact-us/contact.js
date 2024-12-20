function contactInDevelopmentAlert() {
    alert("Essa página não está disponível durante desenvolvimento.");
    window.location = "contact.html";
}
//armazenamento 

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio padrão do formulário

        // Obtem valores dos campos
        const firstName = form.querySelector('input[placeholder="First Name"]').value.trim();
        const lastName = form.querySelector('input[placeholder="Last Name"]').value.trim();
        const email = form.querySelector('input[placeholder="Email Address"]').value.trim();
        const message = form.querySelector('textarea[placeholder="Message"]').value.trim();

        // Validação simples
        if (!firstName || !lastName || !email || !message) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        if (!validateEmail(email)) {
            alert('Por favor, insira um e-mail válido.');
            return;
        }

        // Gera um ID único para a entrada
        const id = Date.now(); //timestamp como ID

        // Armazena dados no LocalStorage
        const formData = {
            firstName,
            lastName,
            email,
            message
        };
        localStorage.setItem(`contactFormData_${id}`, JSON.stringify(formData));

        alert('Mensagem enviada com sucesso!');
        form.reset(); // Limpa o formulário

        displayStoredData(); // Exibe os dados armazenados
    });

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function displayStoredData() {
        const storedDataDiv = document.getElementById('storedDataDisplay');
        const storedData = [];

        // Busca todos os dados armazenados
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith('contactFormData_')) {
                const data = JSON.parse(localStorage.getItem(key));
                storedData.push({ id: key, ...data });
            }
        }

        if (storedData.length === 0) {
            storedDataDiv.innerHTML = '<p>Nenhum dado armazenado.</p>';
            return;
        }

        let html = '<h2>Dados Armazenados:</h2><ul>';
        storedData.forEach(data => {
            html += `<li><strong>ID:</strong> ${data.id}, <strong>Nome:</strong> ${data.firstName} ${data.lastName}, <strong>Email:</strong> ${data.email}, <strong>Mensagem:</strong> ${data.message}</li>`;
        });
        html += '</ul>';

        storedDataDiv.innerHTML = html;
    }

    displayStoredData(); // Exibe dados ao carregar a página

});

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
