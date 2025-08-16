const REGEX_NOME = /^[\p{L}\s]+$/u;
const inputAmigo = document.getElementById("amigo");
let listaAmigos = [];
const MAX_CARACTERES = 15; // limite de caracteres

function adicionarAmigo() {
    const input = document.getElementById("amigo");
    let nome = input.value.trim();           // agora é let
    nome = nome.replace(/\s+/g, " ");        // normaliza espaços

    if (nome === "") {
        alert("Por favor, insira um nome válido.");
        return;
    }
    
    // Remover nome se começar com "-"
    if (nome.startsWith("-")) {
        const nomeRemover = nome.substring(1).trim();
        listaAmigos = listaAmigos.filter(n => n.toLowerCase() !== nomeRemover.toLowerCase());
        atualizarLista();
        inputAmigo.value = "";
        return;
    }

    if (nome.length > MAX_CARACTERES) {
        alert(`O nome deve ter no máximo ${MAX_CARACTERES} caracteres.`);
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

    listaAmigos.forEach((nome, index) => {
        const li = document.createElement("li");
        li.style.display = "flex";
        li.style.justifyContent = "space-between";
        li.style.alignItems = "center";
        li.style.padding = "4px 0";

        const spanNome = document.createElement("span");
        spanNome.textContent = nome;

        // Botão "X" para remover
        const remover = document.createElement("button");
        remover.textContent = "✖";
        remover.style.background = "lightgray, white";
        remover.style.border = "none";
        remover.style.color = "red";
        remover.style.cursor = "pointer";
        remover.style.fontSize = "18px"; // menor tamanho do "X"
        remover.style.fontWeight = "bold";
        remover.style.marginLeft = "10px"; // espaço entre o nome e o "X"
        remover.style.padding = "10px 15px"; // espaço interno do botão
        remover.title = "Clique para remover";
        remover.onclick = function() {
            if (confirm(`Tem certeza que deseja remover "${nome}"?`)) {
                listaAmigos.splice(index, 1);
                atualizarLista();
            }
        };

        li.appendChild(spanNome);
        li.appendChild(remover);
        ul.appendChild(li);
    });
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