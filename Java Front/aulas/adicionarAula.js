$(document).ready(function() {
  axios.get("http://localhost:8080/myapp/materias").then(function(res) {
    res.data.forEach(function(item) {
      $("#materiasList").append(
        "<option value=" + item.id + ">" + item.descricao + "</option>"
      );
    });
  });

  $("#adicionarAula").on("submit", function(event) {
    event.preventDefault();
    let descricao = $("input[name=descricao]").val();
    let situacao = $("input[name=situacao]").val();
    let materiaId = $("#materiasList").val();
    var aula = {
      descricao: descricao,
      situacao: situacao,
      materia: { id: materiaId }
    };
    adicionaAula(aula);
  });
});

function adicionaAula(aula) {
  axios
    .post("http://localhost:8080/myapp/aulas/create", aula)
    .then(function(res) {
      console.log(res);
    })
    .finally(function() {
      window.history.back();
    });
}
