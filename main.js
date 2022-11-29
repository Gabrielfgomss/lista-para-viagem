const form = document.querySelector('#novoItem');
const lista = document.getElementById('lista');
const itens = JSON.parse(localStorage.getItem('itens')) || [];

itens.forEach((elemento) => {
    criaElemento(elemento)
})

form.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const nome = evento.target.elements['nome'];
    const quantidade = evento.target.elements['quantidade'];
    const existe = itens.find(elemento => elemento.nome === nome.value);
    // Criar um objeto para guardar um grupo de informações de um mesmo elemento
    const itemAtual = {
        'nome': nome.value,
        'quantidade': quantidade.value,
    }
    console.log(existe);
    if (existe) {
        itemAtual.id = existe.id;
        atualizaElemento(itemAtual);
        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual;
    } else {
        itemAtual.id = itens[itens.length -1] ? (itens[itens.length-1]).id + 1:0;
        criaElemento(itemAtual);
        // Criar uma array para guardar um grupo de elementos
        itens.push(itemAtual);
    }
    localStorage.setItem('itens', JSON.stringify(itens));
    nome.value = '';
    quantidade.value = '';
})
// Criar elemento visual no HTML após "pegar" os values dos inputs
function criaElemento(item) {
    const novoItem = document.createElement('li');
    novoItem.classList.add('item');

    const numeroItem = document.createElement('strong');
    numeroItem.innerHTML = item.quantidade;
    numeroItem.dataset.id = item.id

    novoItem.appendChild(numeroItem);
    novoItem.innerHTML += item.nome;
    novoItem.appendChild(botaoDeleta(item.id));
    lista.appendChild(novoItem);
}

function atualizaElemento(item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade;
}

function botaoDeleta(id) {
    const elementoBotao = document.createElement("button");
    elementoBotao.innerText = 'X';
    elementoBotao.addEventListener('click', function() {
        deletaElemento(this.parentNode, id)
    })
    return elementoBotao
}

function deletaElemento(tag, id) {
    tag.remove();
    //itens.splice(tag.childNodes['0'].attributes["data-id"].value, 1)
    itens.splice(itens.findIndex(elemento => elemento.id === id), 1);
    localStorage.setItem('itens', JSON.stringify(itens));
}

