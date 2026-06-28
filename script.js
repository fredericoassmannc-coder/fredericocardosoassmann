/* ============================================================
   script.js — JavaScript compartilhado por todas as páginas
   do portfólio de Frederico Cardoso Assmann
   ============================================================ */


// -------------------------------------------------------
// TEMA CLARO / ESCURO
// Alterna a classe "dark" no <body> e salva a preferência
// no localStorage para manter ao trocar de página
// -------------------------------------------------------
function alternarTema() {
    var body  = document.body;
    var botao = document.getElementById('btn-tema');

    if (body.classList.contains('dark')) {
        // Volta para o tema claro
        body.classList.remove('dark');
        botao.textContent = '🌙 Escuro';
        localStorage.setItem('tema', 'claro'); // Salva preferência
    } else {
        // Ativa o tema escuro
        body.classList.add('dark');
        botao.textContent = '☀️ Claro';
        localStorage.setItem('tema', 'escuro'); // Salva preferência
    }
}

// Aplica o tema salvo assim que a página carregar
// Isso garante que o tema escolhido persista ao navegar entre páginas
function aplicarTemaSalvo() {
    var temaSalvo = localStorage.getItem('tema');
    var botao = document.getElementById('btn-tema');

    if (temaSalvo === 'escuro') {
        document.body.classList.add('dark');
        if (botao) {
            botao.textContent = '☀️ Claro';
        }
    }
}

// Executa ao carregar qualquer página
aplicarTemaSalvo();


// -------------------------------------------------------
// MENU RESPONSIVO (HAMBURGUER)
// Abre e fecha o menu em dispositivos móveis
// -------------------------------------------------------
function alternarMenu() {
    var navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('aberto');
}

// Fecha o menu ao clicar em qualquer link (navegação para outra página)
var linksDoMenu = document.querySelectorAll('.nav-links a');
linksDoMenu.forEach(function(link) {
    link.addEventListener('click', function() {
        document.getElementById('nav-links').classList.remove('aberto');
    });
});


// -------------------------------------------------------
// VALIDAÇÃO E ENVIO DO FORMULÁRIO DE CONTATO
// Esta função só é usada na página contato.html
// -------------------------------------------------------
function enviarFormulario() {

    // Pega os valores dos campos
    var nome     = document.getElementById('campo-nome').value.trim();
    var email    = document.getElementById('campo-email').value.trim();
    var mensagem = document.getElementById('campo-mensagem').value.trim();

    // Variável para controlar se o formulário passou em todas as validações
    var formularioValido = true;

    // --- Valida o campo Nome ---
    if (nome === '') {
        // Exibe erro: adiciona borda vermelha e mostra o texto de aviso
        document.getElementById('campo-nome').classList.add('erro');
        document.getElementById('erro-nome').style.display = 'block';
        formularioValido = false;
    } else {
        // Remove o erro quando o campo está preenchido
        document.getElementById('campo-nome').classList.remove('erro');
        document.getElementById('erro-nome').style.display = 'none';
    }

    // --- Valida o campo E-mail ---
    // Expressão regular que verifica o formato: texto@texto.texto
    var regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === '' || !regexEmail.test(email)) {
        document.getElementById('campo-email').classList.add('erro');
        document.getElementById('erro-email').style.display = 'block';
        formularioValido = false;
    } else {
        document.getElementById('campo-email').classList.remove('erro');
        document.getElementById('erro-email').style.display = 'none';
    }

    // --- Valida o campo Mensagem ---
    if (mensagem === '') {
        document.getElementById('campo-mensagem').classList.add('erro');
        document.getElementById('erro-mensagem').style.display = 'block';
        formularioValido = false;
    } else {
        document.getElementById('campo-mensagem').classList.remove('erro');
        document.getElementById('erro-mensagem').style.display = 'none';
    }

    // Se todos os campos passaram na validação, simula o envio
    if (formularioValido) {
        // Limpa os campos do formulário
        document.getElementById('campo-nome').value     = '';
        document.getElementById('campo-email').value    = '';
        document.getElementById('campo-mensagem').value = '';

        // Exibe o modal de confirmação
        document.getElementById('modal-overlay').classList.add('ativo');
    }
}


// -------------------------------------------------------
// FECHAR O MODAL DE CONFIRMAÇÃO
// -------------------------------------------------------
function fecharModal() {
    document.getElementById('modal-overlay').classList.remove('ativo');
}

// Fecha o modal ao clicar no fundo (overlay), fora da caixa
var overlay = document.getElementById('modal-overlay');
if (overlay) {
    overlay.addEventListener('click', function(evento) {
        // Confirma que o clique foi no fundo e não dentro da caixa
        if (evento.target === overlay) {
            fecharModal();
        }
    });
}
