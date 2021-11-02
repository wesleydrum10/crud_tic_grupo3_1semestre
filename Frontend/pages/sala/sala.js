//=============================================Usuário==============================================
function optionsUser() {
    document.getElementById("insertEvent").innerHTML = ""
    document.getElementById("insertion").innerHTML = ""
    document.getElementById("insertionTT").innerHTML = ""
    document.getElementById("insertUser").innerHTML = `
    <div class="mb-4 column">
        <button type="button" class="btn btn-success" onclick="addUser()">Adicionar</button>
        <button type="button" class="btn btn-primary" onclick="consultUser()">Consultar</button>
    </div>    `
}

function addUser() {
    document.getElementById("insertion").innerHTML = `
    <h2>Inserir usuário</h2><br>
    <input id="id" hidden/>
    <div class="mb-2 row tableUser">
        <label for="inputPassword" class="col-sm-2 col-form-label">Código</label>
        <div class="col-sm-10 p-1" >
            <input type="number" class="form-control" id="codigo" placeholder="Código usado para logar no AVA">
        </div>
        <label for="inputPassword" class="col-sm-2 col-form-label">Nome</label>
        <div class="col-sm-10 p-1">
            <input type="text" class="form-control" id="nome">
        </div>
        <label for="inputPassword" class="col-sm-2 col-form-label" >Ocupação</label>
        <div class="col-sm-10 p-1">
            <input type="text" class="form-control" id="ocupacao" placeholder="Ex: Aluno">
        </div>
        <label for="inputPassword" class="col-sm-2 col-form-label" >Departamento</label>
        <div class="col-sm-10 p-1">
            <input type="text" class="form-control" id="departamento" placeholder="Ex: Computação">
        </div>
        <label for="inputPassword" class="col-sm-2 col-form-label" >Curso</label>
        <div class="col-sm-10 p-1">
            <input type="text" class="form-control" id="curso" placeholder="Ex: Engenharia de Software">
        </div>
        <label for="inputPassword" class="col-sm-2 col-form-label" >Turma</label>
        <div class="col-sm-10 p-1">
            <input type="text" class="form-control" id="turma" placeholder="Ex: A">
        </div>
        <label for="inputPassword" class="col-sm-2 col-form-label" >Senha</label>
        <div class="col-sm-10 p-1">
            <input type="password" class="form-control" id="senha">
        </div>
    </div>
    <button type="button" class="btn btn-success" onclick="sendUser()">Adicionar usuário</button>
    `
}
function sendUser() {
    let id = document.getElementById('id').value
    let codigo = document.getElementById("codigo").value
    let departamento = document.getElementById("departamento").value
    let nome = document.getElementById("nome").value
    let ocupacao = document.getElementById("ocupacao").value
    let curso = document.getElementById("curso").value
    let turma = document.getElementById("turma").value
    let senha = document.getElementById("senha").value

    let usuario = new Object()
    usuario.cod_usuario = codigo
    usuario.nm_usuario = nome
    usuario.ocupacao_usuario = ocupacao
    usuario.dep_usuario = departamento
    usuario.curso_usuario_comum = curso
    usuario.turma_usuario_comum = turma
    usuario.senha = senha

    let verbo
    if (id == "") {
        verbo = 'POST'
    } else {
        verbo = 'PUT'
        usuario.id = id
    }
    let request = new XMLHttpRequest()
    let url = `http://localhost:8080/usuario-comum`
    request.open(verbo, url, true)
    request.onload = function () {
        if ((request.status >= 200) && (request.status < 400)) {
            console.log(`Conexão feita com sucesso!`)
        } else {
            console.log(`Erro de concexão!`)
        }
    }
    request.setRequestHeader('Content-Type', 'application/json')
    request.send(JSON.stringify(usuario))
    alert(`Usuário cadastrado com sucesso!`)
    consultUser()
}
function deleteUser(id) {
    let request = new XMLHttpRequest()
    request.open('DELETE', `http://localhost:8080/usuario-comum/${id}`, true)
    request.send()
    alert(`Usuário excluido com sucesso!`)
    consultUser()
}
function putUser(id, cod_usuario, dep_usuario, nm_usuario, ocupacao_usuario, curso_usuario_comum, turma_usuario_comum) {
    addUser()
    document.getElementById("id").value = id
    document.getElementById("codigo").value = cod_usuario
    document.getElementById("departamento").value = dep_usuario
    document.getElementById("nome").value = nm_usuario
    document.getElementById("ocupacao").value = ocupacao_usuario
    document.getElementById("curso").value = curso_usuario_comum
    document.getElementById("turma").value = turma_usuario_comum
    document.getElementById("senha").style.display="none"
}
function consultUser() {
    let request = new XMLHttpRequest()
    request.open('GET', 'http://localhost:8080/usuario-comum', true)
    request.onload = function () {
        let usuarios = JSON.parse(this.response)
        let title = `<h2>Lista de usuários</h2> <br>`
        let saida = ""
        usuarios.forEach(usuario => {
            saida = saida + `
            <div class="containerList">
                <div class="cardList">
                    <p class="listLeft">Código usuário:</p>
                    <p class="listRigth"> ${usuario.cod_usuario}</p>
                </div>
                <div class="cardList">
                    <p class="listLeft">Nome:</p>
                    <p class="listRigth"> ${usuario.nm_usuario}</p>
                </div>
                <div class="cardList">
                    <p class="listLeft">Ocupação:</p>
                    <p class="listRigth"> ${usuario.ocupacao_usuario}</p>
                </div>
                <div class="cardList">
                    <p class="listLeft">Departamento:</p>
                    <p class="listRigth"> ${usuario.dep_usuario}</p>
                </div>
                <div class="cardList">
                    <p class="listLeft">Curso:</p>
                    <p class="listRigth"> ${usuario.curso_usuario_comum}</p>
                </div>
                <div class="cardList">
                    <p class="listLeft">Turma:</p>
                    <p class="listRigth"> ${usuario.turma_usuario_comum}</p>
                </div>
                <div class="cardList actionsList">
                    <i class="bi bi-x-circle text-danger p-1" onclick="deleteUser(${usuario.id})">Remover</i>
                    <i class="bi bi-arrow-clockwise text-primary p-1" onclick="putUser(
                                                                                            ${usuario.id},
                                                                                            ${usuario.cod_usuario}, 
                                                                                            '${usuario.dep_usuario}', 
                                                                                            '${usuario.nm_usuario}', 
                                                                                            '${usuario.ocupacao_usuario}', 
                                                                                            '${usuario.curso_usuario_comum}', 
                                                                                            '${usuario.turma_usuario_comum}'
                                                                                        )">
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

//===========================================Evento=========================================
function optionsEvent() {
    document.getElementById("insertUser").innerHTML = ""
    document.getElementById("insertion").innerHTML = ""
    document.getElementById("insertionTT").innerHTML = ""
    document.getElementById("insertEvent").innerHTML = `
    <div class="mb-4 column">
        <button type="button" class="btn btn-success" onclick="addEvent()">Adicionar</button>
        <button type="button" class="btn btn-primary" onclick="consultEvent()">Consultar</button>
    </div>
    `
}
function addEvent() {
    document.getElementById("insertion").innerHTML = `
    <h2>Criar evento</h2><br>
    <input id="id" hidden/>
    <div class="mb-2 row tableUser">
        <label for="inputPassword" class="col-sm-2 col-form-label">Código Usuário</label>
        <div class="col-sm-10 p-1" >
            <input type="number" class="form-control" id="codigo" placeholder="Código usado para logar no AVA">
        </div>
        <label for="inputPassword" class="col-sm-2 col-form-label">Data</label>
        <div class="col-sm-10 p-1">
            <input type="text" class="form-control" id="data" placeholder="DD/MM/AAAA">
        </div>
        <label for="inputPassword" class="col-sm-2 col-form-label">Descrição</label>
        <div class="col-sm-10 p-1">
            <textarea class="form-control" id="descricao" rows="3" maxLength="255"></textarea>
        </div>
        <label for="inputPassword" class="col-sm-2 col-form-label">Título</label>
        <div class="col-sm-10 p-1">
            <input type="text" class="form-control" id="titulo">
        </div>
    </div>
    <button type="button" class="btn btn-success" onclick="sendEvent()">Criar Evento</button>`
}
function sendEvent() {
    let id = document.getElementById("id").value
    let codigo = document.getElementById("codigo").value
    let descricao = document.getElementById("descricao").value
    let data = document.getElementById("data").value
    data.split('/')
    let dia = data.slice(0,2)
    let mes = data.slice(3,5)
    let ano = data.slice(6,10)
    let titulo = document.getElementById("titulo").value
    console.log(dia+"/"+mes+"/"+ano)
    let evento = new Object()
    evento.cod_usuario = codigo
    evento.descricao_evento = descricao
    evento.data_evento = ano+"-"+mes+"-"+dia 
    evento.titulo_evento = titulo

    let verbo
    if (id == "") {
        verbo = 'POST'
    } else {
        verbo = 'PUT'
        evento.id_evento = id
    }
    let request = new XMLHttpRequest()
    let url = `http://localhost:8080/evento`
    request.open(verbo, url, true)
    request.onload = function () {
        if ((request.status >= 200) && (request.status < 400)) {
            console.log(`Conexão feita com sucesso!`)
        } else {
            console.log(`Erro de concexão!`)
        }
    }
    request.setRequestHeader('Content-Type', 'application/json')
    request.send(JSON.stringify(evento))
    alert(`Evento criado com sucesso!`)
    consultEvent()
     
}
function deleteEvent(id_evento) {
    let request = new XMLHttpRequest()
    request.open('DELETE', `http://localhost:8080/evento/${id_evento}`, true)
    request.send()
    alert(`Evento excluido com sucesso!`)
    consultEvent()
}
function putEvent(id_evento, cod_usuario, descricao_evento, data_evento, titulo_evento) {
    let data = data_evento.split("-")
    addEvent()
    document.getElementById("id").value = id_evento
    document.getElementById("codigo").value = cod_usuario
    document.getElementById("descricao").value = descricao_evento
    document.getElementById("data").value = data[2]+"/"+data[1]+"/"+data[0]
    document.getElementById("titulo").value = titulo_evento
    consultEvent()
}
function consultEvent() {
    let request = new XMLHttpRequest()
    request.open('GET', 'http://localhost:8080/evento', true)
    request.onload = function () {
        let eventos = JSON.parse(this.response)
        let title = `<h2>Eventos criados</h2> <br>`
        let saida = ""
        eventos.forEach(evento => {
            let data = evento.data_evento.split("-") 
            saida = saida + `
                <div class="containerList">
                    <div class="cardList">
                        <p class="listLeft">Código usuário:</p>
                        <p class="listRigth"> ${evento.cod_usuario}</p>
                    </div>
                    <div class="cardList">
                        <p class="listLeft">Data do evento:</p>
                        <p class="listRigth">${data[2]+"/"+data[1]+"/"+data[0]}</p>
                    </div>
                    <div class="cardList">
                        <p class="listLeft">Título do evento:</p>
                        <p class="listRigth">${evento.titulo_evento}</p>
                    </div>
                    <div class="cardList ">
                        <div class="unica">
                            <p class="unicaLeft">Descrição:</p>
                            <p class="unicaRigth">${evento.descricao_evento}</p>
                        </div>
                    </div>
                    <div class="cardList actionsList">
                        <i class="bi bi-x-circle text-danger p-1" onclick="deleteEvent(${evento.id_evento})">Remover</i>
                        <i class="bi bi-arrow-clockwise text-primary p-1" onclick="putEvent(${evento.id_evento}, ${evento.cod_usuario}, '${evento.descricao_evento}', '${evento.data_evento}', '${evento.titulo_evento}')">Atualizar</i>
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