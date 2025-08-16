const REGEX_NOME = /^[\p{L}\s]+$/u;
const inputAmigo = document.getElementById("amigo");
let listaAmigos = [];

function adicionarAmigo() {
    const input = document.getElementById("amigo");
    let nome = input.value.trim();           // agora é let
    nome = nome.replace(/\s+/g, " ");        // normaliza espaços

    if (nome === "") {
        alert("Por favor, insira um nome válido.");
        return;
    }
    
    // valida com regex
    if (!REGEX_NOME.test(nome)) {
        alert("O nome deve conter somente letras e espaços (sem números ou símbolos).");
        return;
    }
    
    listaAmigos.push(nome);
    alert("Amigo adicionado com sucesso!");
    limparInputAmigos();
    atualizarLista();
}

function limparInputAmigos() {
    document.getElementById("amigo").value = "";
}

function atualizarLista() {
    const ul = document.getElementById("listaAmigos");
    ul.innerHTML = "";
    
    for (let i = 0; i < listaAmigos.length; i++) {
        const li = document.createElement("li");
        li.textContent = listaAmigos[i];
        ul.appendChild(li);
    }
}

function sortearAmigo() {
    console.log("Sortear amigo clicado");
    if (listaAmigos.length === 0) {
        alert("Não há amigos para sortear.");
        return;
    }
    
    const indiceAleatorio = Math.floor(Math.random() * listaAmigos.length);
    const amigoSorteado = listaAmigos[indiceAleatorio];
    
    const ulResultado = document.getElementById("resultado");
    ulResultado.innerHTML = `<li>${amigoSorteado}</li>`;
}

// Detectar tecla Enter no campo de texto
inputAmigo.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // evita quebra de linha no input
        adicionarAmigo();
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const btnSortear = document.querySelector(".button-draw");
    if (btnSortear) {
        btnSortear.addEventListener("click", sortearAmigo);
    } else {
        console.error("Botão para sortear não encontrado!");
    }
});
