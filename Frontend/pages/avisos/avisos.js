function optionsNotice() {
    document.getElementById("insertion").innerHTML = ""
    document.getElementById("insertionTT").innerHTML = ""
    document.getElementById("insertNotice").innerHTML = `
    <div class="mb-4 column">
        <button type="button" class="btn btn-success" onclick="addNotice()">Adicionar</button>
        <button type="button" class="btn btn-primary" onclick="consultNotice()">Consultar</button>
    </div>    
    `
}

function addNotice() {
    document.getElementById("insertion").innerHTML = `
    <h2>Criar aviso</h2><br>
    <input id="id" hidden/>
    <div class="mb-2 row tableUser">
        <label for="inputPassword" class="col-sm-2 col-form-label">Código</label>
        <div class="col-sm-10 p-1" >
            <input type="number" class="form-control" id="codigo" placeholder="Código usado para logar no AVA">
        </div>
        <label for="inputPassword" class="col-sm-2 col-form-label">Descrição</label>
        <div class="col-sm-10 p-1">
            <textarea class="form-control" id="descricao" rows="3"></textarea>
        </div>
        <label for="inputPassword" class="col-sm-2 col-form-label" >Data</label>
        <div class="col-sm-10 p-1">
            <input type="text" class="form-control" id="data" placeholder="DD/MM/AAAA">
        </div>
        <label for="inputPassword" class="col-sm-2 col-form-label" >Título</label>
        <div class="col-sm-10 p-1">
            <input type="text" class="form-control" id="titulo">
        </div>
    </div>
    <button type="button" class="btn btn-success" onclick="sendNotice()">Criar aviso</button>
    `
}
function sendNotice() {

    let id = document.getElementById('id').value
    let codigo = document.getElementById("codigo").value
    let descricao = document.getElementById("descricao").value
    let data = document.getElementById("data").value
    let titulo = document.getElementById("titulo").value

    let aviso = new Object()
    aviso.cod_usuario = codigo
    aviso.desc_aviso_sala = descricao
    aviso.data_aviso_sala = data
    aviso.titulo_aviso_sala = titulo

    let verbo
    if (id == "") {
        verbo = 'POST'
    } else {
        verbo = 'PUT'
        aviso.id_aviso_sala = id
    }
    let request = new XMLHttpRequest()
    let url = `http://localhost:8080/aviso-sala`
    request.open(verbo, url, true)
    request.onload = function () {
        if ((request.status >= 200) && (request.status < 400)) {
            console.log(`Conexão feita com sucesso!`)
        } else {
            console.log(`Erro de concexão!`)
        }
    }
    request.setRequestHeader('Content-Type', 'application/json')
    request.send(JSON.stringify(aviso))
    alert(`Aviso cadastrado com sucesso!`)
    consultNotice()
}
function deleteProduct(id_aviso_sala) {
    let request = new XMLHttpRequest()
    request.open('DELETE', `http://localhost:8080/aviso-sala/${id_aviso_sala}`, true)
    request.send()
    alert(`Aviso excluido com sucesso!`)
    consultNotice()
}
function putNotice(id_aviso_sala, cod_usuario, desc_aviso_sala, data_aviso_sala, titulo_aviso_sala) {
    let data = aviso.data_aviso_sala.split("-")
    addNotice()
    document.getElementById("id").value = id_aviso_sala
    document.getElementById("codigo").value = cod_usuario
    document.getElementById("descricao").value = desc_aviso_sala
    document.getElementById("data").value = data[2]+"/"+data[1]+"/"+data[0]
    document.getElementById("titulo").value = titulo_aviso_sala
}
function consultNotice() {
    let request = new XMLHttpRequest()
    request.open('GET', 'http://localhost:8080/aviso-sala', true)
    request.onload = function () {
        let avisos = JSON.parse(this.response)
        let title = `<h2>Lista de avisos</h2>`
        let saida = ""
        avisos.forEach(aviso => {
            let data = aviso.data_aviso_sala.split("-")
            saida = saida + `
            <div class="containerList">
                <div class="cardList">
                    <p class="listLeft">Código usuário:</p>
                    <p class="listRigth"> ${aviso.cod_usuario}</p>
                </div>
                <div class="cardList">
                    <p class="listLeft">Data:</p>
                    <p class="listRigth"> ${data[2]+"/"+data[1]+"/"+data[0]}</p>
                </div>
                <div class="cardList">
                    <p class="listLeft">Titulo:</p>
                    <p class="listRigth"> ${aviso.titulo_aviso_sala}</p>
                </div>
                <div class="cardList ">
                    <div class="unica">
                        <p class="unicaLeft">Descrição:</p>
                        <p class="unicaRigth">${aviso.desc_aviso_sala}</p>
                    </div>
                </div>
                <div class="cardList actionsList">
                    <i class="bi bi-x-circle text-danger p-1" onclick="deleteNotice(${aviso.id_aviso_sala})">Remover</i>
                    <i class="bi bi-arrow-clockwise text-primary p-1" onclick="putNotice( 
                                                                                        ${aviso.id_aviso_sala},                    
                                                                                        ${aviso.cod_usuario}, 
                                                                                        '${aviso.desc_aviso_sala}', 
                                                                                        '${aviso.data_aviso_sala}',
                                                                                        '${aviso.titulo_aviso_sala}')">
                        Atualizar
                    </i>
                </div>
            </div>
            `
        })
        document.getElementById("insertionTT").innerHTML = title + saida
    }
    request.send()
}

function exit() {
    window.location.href = "http://127.0.0.1:5500/pages/login/login.html"
}