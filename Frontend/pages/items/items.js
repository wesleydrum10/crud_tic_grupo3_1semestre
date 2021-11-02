function optionsProduct() {
    document.getElementById("insertion").innerHTML = ""
    document.getElementById("insertionTT").innerHTML = ""
    document.getElementById("insertProduct").innerHTML = `
    <div class="mb-4 column">
        <button type="button" class="btn btn-success" onclick="addProduct()">Adicionar</button>
        <button type="button" class="btn btn-primary" onclick="consultProduct()">Consultar</button>
    </div>    
    `
}

function addProduct() {
    document.getElementById("insertion").innerHTML = `
    <h2>Adicionar produto</h2><br>
    <input id="id" hidden >
    <div class="mb-2 row tableUser">
        <label for="inputPassword" class="col-sm-2 col-form-label">Código</label>
        <div class="col-sm-10 p-1" >
            <input type="number" class="form-control" id="codigo" placeholder="Código usado para logar no AVA">
        </div>
        <label for="inputPassword" class="col-sm-2 col-form-label">Nome</label>
        <div class="col-sm-10 p-1">
            <input type="text" class="form-control" id="nome" placeholder="Nome produto">
        </div>
        <label for="inputPassword" class="col-sm-2 col-form-label" >Descrição</label>
        <div class="col-sm-10 p-1">
            <textarea class="form-control" id="descricao" rows="3"></textarea>
        </div>
    </div>
    <button type="button" class="btn btn-success" onclick="sendProduct()">Adicionar produto</button>
    `
}

function sendProduct() {
    let id = document.getElementById('id').value
    let codigo = document.getElementById("codigo").value
    let nome = document.getElementById("nome").value
    let descricao = document.getElementById("descricao").value

    let produto = new Object()
    produto.cod_usuario = codigo
    produto.nome_produto = nome
    produto.descricao_produto = descricao

    let verbo
    if (id == "") {
        verbo = 'POST'
    } else {
        verbo = 'PUT'
        produto.id = id
    }
    let request = new XMLHttpRequest()
    let url = `http://localhost:8080/produto`
    request.open(verbo, url, true)
    request.onload = function () {
        if ((request.status >= 200) && (request.status < 400)) {
            console.log(`Conexão feita com sucesso!`)
        } else {
            console.log(`Erro de concexão!`)
        }
    }
    request.setRequestHeader('Content-Type', 'application/json')
    request.send(JSON.stringify(produto))
    alert(`Produto cadastrado com sucesso!`)
    consultProduct()
}

function deleteProduct(id) {
    let request = new XMLHttpRequest()
    request.open('DELETE', `http://localhost:8080/produto/${id}`, true)
    request.send()
    alert(`Produto excluido com sucesso!`)
    consultProduct()
}

function putProduct(id, cod_usuario, nome_produto, descricao_produto) {
    addProduct()
    document.getElementById("id").value = id
    document.getElementById("codigo").value = cod_usuario
    document.getElementById("nome").value = nome_produto
    document.getElementById("descricao").value = descricao_produto
}

function consultProduct() {
    let request = new XMLHttpRequest()
    request.open('GET', 'http://localhost:8080/produto', true)
    request.onload = function () {
        let produtos = JSON.parse(this.response)
        let title = `<h2>Lista de produtos</h2>`
        let saida = ""
        produtos.forEach(produto => {
            saida = saida + `
            <div class="containerList">
                <div class="cardList">
                    <p class="listLeft">Código usuário:</p>
                    <p class="listRigth"> ${produto.cod_usuario}</p>
                </div>
                <div class="cardList">
                    <p class="listLeft">Nome:</p>
                    <p class="listRigth"> ${produto.nome_produto}</p>
                </div>
                <div class="cardList ">
                    <div class="unica">
                        <p class="unicaLeft">Descrição:</p>
                        <p class="unicaRigth">${produto.descricao_produto}</p>
                    </div>
                </div>
                <div class="cardList actionsList">
                    <i class="bi bi-x-circle text-danger p-1" onclick="deleteProduct(${produto.id})">Remover</i>
                    <i class="bi bi-arrow-clockwise text-primary p-1" onclick="putProduct( ${produto.id},                    
                                                                                        ${produto.cod_usuario}, 
                                                                                        '${produto.nome_produto}', 
                                                                                        '${produto.descricao_produto}')">
                        Atualizar
                    </i>
                </div>
            </div>
            `
        })
        document.getElementById("insertionTT").innerHTML = title +saida 
    }
    request.send()
}

function exit() {
    window.location.href = "http://127.0.0.1:5500/pages/login/login.html"
}
