$(document).ready(function() {
  axios.get("http://localhost:8080/myapp/materias").then(function(res) {
    res.data.forEach(function(item) {
      $("#materiasList").append(
        "<option value=" + item.id + ">" + item.descricao + "</option>"
      );
    });
  });

  axios.get("http://localhost:8080/myapp/usuarios").then(function(res) {
    res.data.forEach(function(item) {
      $("#usuariosList").append(
        "<option value=" + item.id + ">" + item.nome + "</option>"
      );
    });
  });

  $("#adicionarMateriaUsuario").on("submit", function(event) {
    event.preventDefault();
    let id = $("input[name=id]").val();
    let ano = $("input[name=ano]").val();
    let situacao = $("input[name=situacao]").val();
    let materia = $("#materiasList").val();
    let usuario = $("#usuariosList").val();
    var materiaUsuario = {
      ano: ano,
      situacao: situacao,
      materia: { id: materia },
      usuario: { id: usuario }
    };
    adicionaMateriaUsuario(materiaUsuario);
  });
});

function adicionaMateriaUsuario(materiaUsuario) {
  axios
    .post("http://localhost:8080/myapp/materiasUsuario/create", materiaUsuario)
    .then(function(res) {
      console.log(res);
    })
    .finally(function() {
      window.history.back();
    });
}
