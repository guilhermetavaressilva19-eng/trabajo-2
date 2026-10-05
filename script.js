// Banco de Perguntas (Adequado para Ciências - 6º Ano)
const perguntas = [
    {
        pergunta: "Qual é o maior bioma brasileiro em extensão territorial?",
        opcoes: ["Catinga", "Amazônia", "Cerrado", "Mata Atlântica"],
        correta: 1
    },
    {
        pergunta: "Os seres vivos que produzem seu próprio alimento através da fotossíntese são chamados de:",
        opcoes: ["Consumidores", "Decompositores", "Produtores", "Carnívoros"],
        correta: 2
    },
    {
        pergunta: "Qual camada da Terra é constituída por rochas sólidas e forma os continentes?",
        opcoes: ["Hidrosfera", "Atmosfera", "Litosfera", "Biosfera"],
        correta: 2
    },
    {
        pergunta: "Fungos e bactérias desempenham qual papel fundamental nos ecossistemas?",
        opcoes: ["Decompositores", "Produtores", "Consumidores Primários", "Predadores"],
        correta: 0
    },
    {
        pergunta: "Qual destas fontes de energia é considerada RENO VÁVEL?",
        opcoes: ["Carvão mineral", "Petróleo", "Energia Solar", "Gás natural"],
        correta: 2
    }
];

// Estado do Jogo
let indicePerguntaAtual = 0;
let pontuacao = 0;
let aceitandoRespostas = true;

// Elementos do DOM
const telaInicio = document.getElementById('tela-inicio');
const telaJogo = document.getElementById('tela-jogo');
const telaFim = document.getElementById('tela-fim');

const btnIniciar = document.getElementById('btn-iniciar');
const btnReiniciar = document.getElementById('btn-reiniciar');

const textoPergunta = document.getElementById('texto-pergunta');
const containerOpcoes = document.getElementById('opcoes-respostas');
const contadorPergunta = document.getElementById('contador-pergunta');
const pontuacaoAtual = document.getElementById('pontuacao-atual');
const mensagemFeedback = document.getElementById('mensagem-feedback');
const resultadoFinal = document.getElementById('resultado-final');

// Eventos
btnIniciar.addEventListener('click', iniciarJogo);
btnReiniciar.addEventListener('click', reiniciarJogo);

function iniciarJogo() {
    telaInicio.classList.add('esconde');
    telaJogo.classList.remove('esconde');
    indicePerguntaAtual = 0;
    pontuacao = 0;
    atualizarPontuacao();
    carregarPergunta();
}

function carregarPergunta() {
    aceitandoRespostas = true;
    mensagemFeedback.classList.add('esconde');
    containerOpcoes.innerHTML = '';

    const q = perguntas[indicePerguntaAtual];
    textoPergunta.textContent = q.pergunta;
    contadorPergunta.textContent = `Pergunta ${indicePerguntaAtual + 1} de ${perguntas.length}`;

    q.opcoes.forEach((opcao, index) => {
        const botao = document.createElement('button');
        botao.classList.add('btn-opcao');
        botao.textContent = opcao;
        botao.addEventListener('click', () => verificarResposta(index, botao));
        containerOpcoes.appendChild(botao);
    });
}

function verificarResposta(indiceSelecionado, botaoClicado) {
    if (!aceitandoRespostas) return;
    aceitandoRespostas = false;

    const correta = perguntas[indicePerguntaAtual].correta;
    const botoes = containerOpcoes.querySelectorAll('.btn-opcao');

    if (indiceSelecionado === correta) {
        botaoClicado.classList.add('correta');
        pontuacao += 10;
        atualizarPontuacao();
        exibirFeedback("Muito bem! Resposta correta! 🎉", "#388e3c");
    } else {
        botaoClicado.classList.add('incorreta');
        botoes[correta].classList.add('correta');
        exibirFeedback("Ops! Tente prestar atenção na próxima. 💡", "#d32f2f");
    }

    setTimeout(() => {
        indicePerguntaAtual++;
        if (indicePerguntaAtual < perguntas.length) {
            carregarPergunta();
        } else {
            finalizarJogo();
        }
    }, 2000);
}

function exibirFeedback(texto, cor) {
    mensagemFeedback.textContent = texto;
    mensagemFeedback.style.color = cor;
    mensagemFeedback.classList.remove('esconde');
}

function atualizarPontuacao() {
    pontuacaoAtual.textContent = `Pontos: ${pontuacao}`;
}

function finalizarJogo() {
    telaJogo.classList.add('esconde');
    telaFim.classList.remove('esconde');
    
    resultadoFinal.textContent = `Você fez ${pontuacao} pontos de um total de ${perguntas.length * 10}!`;
}

function reiniciarJogo() {
    telaFim.classList.add('esconde');
    iniciarJogo();
}
