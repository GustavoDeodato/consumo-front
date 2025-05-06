'use strict'

import { getContatos, getContatosPorNome } from "./js/contatos.js"

function criarCard(contato){
    const container = document.getElementById("container")
    const card = document.createElement("div")
    card.classList.add("card-contato")
    card.innerHTML = `
    <img src="${contato.foto}" alt="">
    <h2>${contato.nome}</h2>
    <p>${contato.celular}</p>
    `
    container.appendChild(card)
}

async function exibirContatos() {
    const contatos = await getContatos(evento.target.value)
    contatos.forEach(criarCard)
}

async function exibirPesquisa(evento) {
    const container = document.getElementById("container")

    if(evento.key == 'Enter'){
        const contatos = await getContatosPorNome(evento.target.value)
        container.replaceChildren()
        contatos.forEach (criarCard)
    }
}

function novoContato(){
    document.querySelector('main').className = 'form-show'
}

function voltarHome(){
    document.querySelector('main').className = 'card-show'
}

exibirContatos()

document.getElementById('nome-contato')
        .addEventListener('keydown', exibirPesquisa)

document.getElementById('novo-contato')
        .addEventListener('click', novoContato)

document.getElementById('cancelar')
        .addEventListener('click', voltarHome)

document.getElementById('salvar')
        .addEventListener('click', novoContato)