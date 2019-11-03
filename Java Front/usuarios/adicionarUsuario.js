$(document).ready(function() {
  $("#adicionarUsuario").on("submit", function(event) {
    event.preventDefault();
    let nome = $("input[name=nome]").val();
    let sobrenome = $("input[name=sobrenome]").val();
    let idade = $("input[name=idade]").val();
    let usuario = $("input[name=usuario]").val();
    let senha = $("input[name=senha]").val();
    var pessoa = {
      nome: nome,
      sobrenome: sobrenome,
      idade: idade,
      usuario: usuario,
      senha: senha
    };
    adicionaUsuario(pessoa);
  });
});

function adicionaUsuario(pessoa) {
  axios
    .post("http://localhost:8080/myapp/usuarios/create", pessoa)
    .then(function(res) {
      console.log(res);
    })
    .finally(function() {
      window.history.back();
    });
}
