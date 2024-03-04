// Função para falar a mensagem ao carregar a página
function falarMensagemInicial() {
    const mensagem = "Digite seu texto a ser criptografado";
    responsiveVoice.speak(mensagem, "Brazilian Portuguese Female", { rate: 1 });
}

// Chama a função ao carregar a página
window.addEventListener('load', falarMensagemInicial);

// Adiciona um evento ao textarea para verificar letras maiúsculas
document.getElementById('texto__entrada').addEventListener('input', function() {
    const textoEntrada = this.value;

    if (/[A-Z]/.test(textoEntrada)) {
        exibirAlerta('alerta__maiuscula', 'Digite apenas letras minúsculas.', 'white');
        this.value = textoEntrada.toLowerCase();
    } else {
        ocultarAlerta('alerta__maiuscula');
    }
});

// Função para criptografar o texto
function criptografarTexto() {
    const textoOriginal = document.getElementById('texto__entrada').value.toLowerCase();
    let textoCriptografado = '';

    for (let i = 0; i < textoOriginal.length; i++) {
        switch (textoOriginal[i]) {
            case 'e':
                textoCriptografado += 'enter';
                break;
            case 'i':
                textoCriptografado += 'imes';
                break;
            case 'a':
                textoCriptografado += 'ai';
                break;
            case 'o':
                textoCriptografado += 'ober';
                break;
            case 'u':
                textoCriptografado += 'ufat';
                break;
            default:
                textoCriptografado += textoOriginal[i];
        }
    }

    document.getElementById('label__resultado').value = textoCriptografado;
    substituirImagem(textoCriptografado);
}

// Função para descriptografar o texto
function descriptografarTexto() {
    const textoCriptografado = document.getElementById('texto__entrada').value.toLowerCase();
    let textoOriginal = '';

    for (let i = 0; i < textoCriptografado.length; i += 4) {
        const bloco = textoCriptografado.substr(i, 4);

        switch (bloco) {
            case 'enter':
                textoOriginal += 'e';
                break;
            case 'imes':
                textoOriginal += 'i';
                break;
            case 'ai':
                textoOriginal += 'a';
                break;
            case 'ober':
                textoOriginal += 'o';
                break;
            case 'ufat':
                textoOriginal += 'u';
                break;
            default:
                textoOriginal += bloco;
        }
    
    }
    if (textoCriptografado) {
        const textArea = document.getElementById('texto__entrada');
        textArea.classList.add('text__area__ajustado');
    }

    document.getElementById('label__resultado').value = textoOriginal;
    substituirImagem(textoOriginal);
}

// Função para substituir a imagem pelo texto
function substituirImagem(texto) {
    const imagemResultado = document.getElementById('imagem__resultado');
    const labelResultado = document.getElementById('label__resultado');
    const containerResultado = document.querySelector('.container__resultado');
    const fraseNenhumaMensagem = document.getElementById('texto__nenhuma__mensagem');

    fraseNenhumaMensagem.style.display = 'none';

    if (texto) {
        labelResultado.style.display = 'block';
        labelResultado.value = texto;
        imagemResultado.style.display = 'none';
        containerResultado.style.display = 'block';
    } else {
        imagemResultado.style.display = 'none';
        labelResultado.style.display = 'none';
        containerResultado.style.display = 'block';
    }
}

// Função para copiar o texto
function copiarTexto() {
    const resultadoTextArea = document.getElementById('label__resultado');
    const imagemResultado = document.getElementById('imagem__resultado');
    const alertaCopiar = document.getElementById('alerta__copiar');

    resultadoTextArea.select();

    try {
        navigator.clipboard.writeText(resultadoTextArea.value);
        console.log('Texto copiado para a área de transferência');
        imagemResultado.src = `data:image/svg+xml;base64,${btoa(resultadoTextArea.value)}`;
        imagemResultado.alt = "Texto Criptografado/Descriptografado";
        exibirAlerta(alertaCopiar, 'Texto copiado com sucesso!', '#0a3871');
    } catch (err) {
        console.error('Erro ao copiar texto para a área de transferência', err);
        exibirAlerta(alertaCopiar, 'Erro ao copiar texto. Tente novamente.', 'red');
    }
}

// Função para exibir alerta
function exibirAlerta(idAlerta, mensagem, cor) {
    const alerta = document.getElementById(idAlerta);
    alerta.textContent = mensagem;
    alerta.style.backgroundColor = cor;
    alerta.style.display = 'block';

    setTimeout(() => {
        alerta.style.display = 'none';
    }, 3000);
}

// Função para ocultar alerta
function ocultarAlerta(idAlerta) {
    document.getElementById(idAlerta).style.display = 'none';
}