function logar() {
    let codigo = document.getElementById("codigo").value
    let senha = document.getElementById("senha").value
    let request = new XMLHttpRequest()
    request.open('GET', `http://localhost:8080/usuario-comum/${senha}`, true)
    request.onload = function() {
        let usuario = JSON.parse(this.response)
        let nome = ""
        usuario.nm_usuario ? nome = usuario.nm_usuario : null
        if((usuario.senha == senha) && (usuario.cod_usuario != codigo)) {
            alert(`Código informado não confere com o cadastrado!`)
        }else {
            window.location.href = `http://127.0.0.1:5500/pages/index.html`
        }
    }
    request.send()
}

function dataUser() {    
    let year = new Date()
    document.getElementById("userName").innerHTML = `<h1>Bem vindo!</h1></br> 
        <h4>Ao Trote Solidário ${year.getFullYear()}</h4>` 
    document.getElementById('footer').innerHTML = `<span>2021 - UNIFACEF &copy; TROTE SOLIDÁRIO </span>`
}

function exit() {
    window.location.href = "http://127.0.0.1:5500/pages/login/login.html"
}

function typeWrite(elemento){
    const textoArray = elemento.innerHTML.split('');
    elemento.innerHTML = ' ';
    textoArray.forEach(function(letra, i){   
      
    setTimeout(function(){
        elemento.innerHTML += letra;
    }, 150 * i)

  });
}
const titulo = document.querySelector('.info1');
typeWrite(titulo);
const titulo1 = document.querySelector('.info2');
typeWrite(titulo1);
const titulo2 = document.querySelector('.info3');
typeWrite(titulo2);
const titulo3 = document.querySelector('.info4');
typeWrite(titulo3);

function redirect1() {
    window.location.href = "http://127.0.0.1:5500/pages/sala/sala.html"
}

function redirect2() {
    window.location.href = "http://127.0.0.1:5500/pages/sala/sala.html"
}

function redirect3() {
    window.location.href = "http://127.0.0.1:5500/pages/avisos/avisos.html"
}

function redirect4() {
    window.location.href = "http://127.0.0.1:5500/pages/items/items.html"
}
