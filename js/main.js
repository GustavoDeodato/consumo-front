"use strict"

import { getContatos, getContatosPorNome, postContatos, uploadImageToAzure } from './contato.js'


function criarCard(contato){
    const container = document.getElementById('container')

    const novaDiv = document.createElement('div')
    novaDiv.classList.add('cardContato')
    novaDiv.innerHTML = `
                <img src="${contato.foto}" alt="avatar">
                <h2>${contato.nome}</h2>
                <p>${contato.celular}</p>`

    container.appendChild(novaDiv)
}

async function exibirContatos(){
    const contatos = await getContatos()
    contatos.forEach(criarCard)
}

async function exibirPesquisa(evento){
    const container = document.getElementById('container')


    if(evento.key == 'Enter'){
        const contatos = await getContatosPorNome(evento.target.value)
        container.replaceChildren()
        contatos.forEach(criarCard)   

    }
}

function novoContato(){
    document.querySelector('main').className = 'form-show'
}

function voltarHome(){
    document.querySelector('main').className = 'card-show'
}

async function salvarCriacaoContato() {
    const fileInput = document.getElementById('foto')
    const file = fileInput.files[0];
  
    let fotoUrl = ''
    if (file) {
      const uploadParams = {
        file,
        storageAccount: 'imageobt',
        sasToken: 'sp=racwl&st=2025-05-13T20:05:32Z&se=2025-05-14T04:05:32Z&sv=2024-11-04&sr=c&sig=xMmY3sqFfyEypRV86JLPG0uSc%2FcETwU0dn5A7cqrUKI%3D',
        containerName: 'fotos',
      };
      
      fotoUrl = await uploadImageToAzure(uploadParams)
    }
  
    const contato = {
      "nome": document.getElementById('nome').value,
      "celular": document.getElementById('celular').value,
      "foto": fotoUrl, 
      "email": document.getElementById('email').value,
      "endereco": document.getElementById('endereco').value,
      "cidade": document.getElementById('cidade').value
    }
  
    if (postContatos(contato)) {
      alert('Contato cadastrado com sucesso')
      await exibirContatos()
      voltarHome()
    }
  }
  


exibirContatos()
document.getElementById('nome-contato').addEventListener('keydown',exibirPesquisa)
document.getElementById('novo-contato').addEventListener('click', novoContato)
document.getElementById('cancelar').addEventListener('click', voltarHome)
document.getElementById('salvar').addEventListener('click', salvarCriacaoContato)