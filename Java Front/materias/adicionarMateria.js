$(document).ready(function() {
  $("#adicionarMateria").on("submit", function(event) {
    event.preventDefault();
    var descricao = $("input[name=descricao]").val();
    var ativa = $("input[name=ativa]").val();
    var materia = {
      descricao: descricao,
      ativa: ativa
    };
    adicionaMateria(materia);
  });
});

function adicionaMateria(materia) {
  axios
    .post("http://localhost:8080/myapp/materias/create", materia)
    .then(function(res) {
      console.log(res);
    })
    .finally(function() {
      window.history.back();
    });
}
