// Enanle Funcitons
function disable(identifier) {
    console.log(identifier)
    const input = document.getElementById(identifier);
    input.disabled = !input.disabled;
    if (!input.disabled) {
        input.focus();
    }
}

// Send to API
function send() {
    console.log("Teste")
}

// Copy Clipboard
function copyToClipboard(elementId) {
    const element = document.getElementById(elementId);
    const text = element.value;

    if (text) {
        navigator.clipboard.writeText(text).then(() => {
            const button = event.target.closest('.copy-button');
            const originalTitle = button.title;
            button.title = 'Copiado!';
            button.style.background = '#48bb78';

            setTimeout(() => {
                button.title = originalTitle;
                button.style.background = '';
            }, 2000);
        }).catch(err => {
            console.error('Erro ao copiar:', err);
            element.select();
            document.execCommand('copy');
        });
    }
}

// Generate PSK functionality
document.querySelector('.generate-copy-button').addEventListener('click', function () {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let psk = '';
    for (let i = 0; i < 56; i++) {
        psk += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    document.getElementById('psk').value = psk;

    navigator.clipboard.writeText(psk).then(() => {
        this.innerHTML = 'Copiado!';
        this.style.background = '#48bb78';

        setTimeout(() => {
            this.innerHTML = 'Gerar & Copiar';
            this.style.background = '';
        }, 2000);
    }).catch(err => {
        console.error('Erro ao copiar PSK:', err);
    });
});

// Auto-generate client identifier based on client name
document.getElementById('client-name').addEventListener('input', function () {
    const clientIdentifier = document.getElementById('client-identifier');

    // Só gera automaticamente se o campo estiver desabilitado
    if (clientIdentifier.disabled) {
        clientIdentifier.value = this.value
            .toLowerCase()
            .replace(/\s+/g, '_') + '@ipsec.com';
    }
});

// Nat Button
document.querySelectorAll('.nat-button').forEach(button => {
    button.addEventListener('click', function() {
        document.querySelectorAll('.nat-button').forEach(btn => {
            btn.classList.remove('active');
        });
        
        this.classList.add('active');
        
        const natType = this.getAttribute('data-nat');
        
        const valueLocalIdentifier = document.getElementById("local-subnet");
        if (natType === 'binat') {
            valueLocalIdentifier.value = valueLocalIdentifier.dataset.default;
            valueLocalIdentifier.disabled = true;
        } else if (natType === 'no-nat') {
            valueLocalIdentifier.value = "";
            valueLocalIdentifier.disabled = false;
        }
    });
});