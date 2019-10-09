$(document).ready(function(){
    axios
    .get("http://localhost:8080/myapp/users")
    .then(function(res){
        console.log(res.data)
        res.data.forEach(function(item){
            $("#listaUsuariosBody").append(
                                            "<td>" + item.nome + "</td>" +
                                            "<td>" + item.sobrenome + "</td>" +
                                            "<td>" + item.idade + "</td>" +
                                            "<td>" + item.usuario + "</td>" +
                                            "<td>" + item.senha + "</td>" +
                                            "<td><a href='./editUsuario.html/"+item.id+"'>Editar</td>" +
                                            "<td><a>Excluir</td>"
                                            )
        })
    })
})