
function logar() {
    let codigo = document.getElementById("codigo").value
    let senha = document.getElementById("senha").value
    let request = new XMLHttpRequest()
    request.open('GET', `http://localhost:8080/usuario-comum/${senha}`, true)
    request.onload = function() {
        let usuario = JSON.parse(this.response)
        if((usuario.senha == senha) && (usuario.cod_usuario != codigo)) {
            alert(`Código informado não confere com o cadastrado!`)
        }else {
            window.location.href = `http://127.0.0.1:5500/pages/index.html`
        }
    }
    request.send()
}