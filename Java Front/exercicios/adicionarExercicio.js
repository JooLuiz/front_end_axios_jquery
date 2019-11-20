$(document).ready(function() {
  axios.get("http://localhost:8080/myapp/conteudos").then(function(res) {
    res.data.forEach(function(item) {
      $("#conteudosList").append(
        "<option value=" + item.id + ">" + item.conteudo + "</option>"
      );
    });
  });

  $("#adicionarExercicio").on("submit", function(event) {
    event.preventDefault();
    let pergunta = $("input[name=pergunta]").val();
    let dificuldade = $("input[name=dificuldade]").val();
    let conteudoId = $("#conteudosList").val();
    var exercicio = {
      pergunta,
      dificuldade,
      conteudo: { id: conteudoId }
    };
    adicionaExercicio(exercicio);
  });
});

function adicionaExercicio(exercicio) {
  axios
    .post("http://localhost:8080/myapp/exercicios/create", exercicio)
    .then(function(res) {
      console.log(res);
    })
    .finally(function() {
      window.history.back();
    });
}
