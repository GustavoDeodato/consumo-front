"use strict"

export async function getContatos(){
    const url = "https://bakcend-fecaf-render.onrender.com/contatos"
    const response = await fetch(url)
    const data = await response.json()

    return data
}

export async function getContatosPorNome(nome){
    const url = `https://bakcend-fecaf-render.onrender.com/contatos?nome_like=^${nome}`
    const response = await fetch(url)
    const data = await response.json()

    return data
}


export async function postContatos(contato){
    const url = "https://bakcend-fecaf-render.onrender.com/contatos"
    const options = {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(contato)
    }
    const response = await fetch(url, options)

    return response.ok
}

export async function uploadImageToAzure(uploadParams) {

    const { file, storageAccount, sasToken, containerName } = uploadParams;

    const blobName = `${Date.now()}-${file.name}`;

    const baseUrl = `https://${storageAccount}.blob.core.windows.net/${containerName}/${blobName}`;
    const uploadUrl = `${baseUrl}?${sasToken}`;

    const options = {
      method: "PUT",
      headers: {
        "x-ms-blob-type": "BlockBlob",
        "Content-Type": file.type || "application/octet-stream",
      },
      body: file,
    }

    const response = await fetch(uploadUrl, options)

    if (response.ok) {
      return baseUrl;
    }else {
      return response.ok
    }
   
}


async function putContatos(contato, id) {
    const url = `https://bakcend-fecaf-render.onrender.com/contatos/${id}`
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(contato)
    }
    const response = await fetch(url, options)

    return response.ok
}

export async function deleteContatos(id) {
    const url = `https://bakcend-fecaf-render.onrender.com/contatos/${id}`
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type' : 'application/json'
        }
    }
    const response = await fetch(url, options)

    return response.ok
}

const contato = {
    "nome": "vini",
    "celular": "69 9 5999-5999",
    "foto": "../img/avatar.png",
    "email": "vini@gmail.com",
    "endereco": "carapicuiba, aterro",
}