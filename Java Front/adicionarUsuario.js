$(document).ready(function(){
    $("#adicionarUsuario").onSubmit(function(event){
        let nome = $("input[name=nome]").val();
        let sobrenome = $("input[name=sobrenome]").val();
        let idade = $("input[name=idade]").val();
        let usuario = $("input[name=usuario]").val();
        let senha = $("input[name=senha]").val();
        var pessoa = {nome: nome, sobrenome: sobrenome, idade:idade, usuario: usuario, senha:senha}
        adicionaUsuario(pessoa)
        event.preventDefault();
    })
})

function adicionaUsuario(pessoa){
    axios
        .post("http://localhost:8080/myapp/users/create", pessoa)
        .then(function(res){
            console.log(res);
        })
}