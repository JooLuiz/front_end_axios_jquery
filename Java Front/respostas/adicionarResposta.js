$(document).ready(function() {
  axios.get("http://localhost:8080/myapp/exercicios").then(function(res) {
    res.data.forEach(function(item) {
      $("#exerciciosList").append(
        "<option value=" + item.id + ">" + item.pergunta + "</option>"
      );
    });
  });

  $("#adicionarResposta").on("submit", function(event) {
    event.preventDefault();
    let descricao = $("input[name=descricao]").val();
    let correta = $("input[name=correta]").val();
    let exercicioId = $("#exerciciosList").val();
    var resposta = {
      descricao,
      correta,
      exercicio: { id: exercicioId }
    };
    adicionaResposta(resposta);
  });
});

function adicionaResposta(resposta) {
  axios
    .post("http://localhost:8080/myapp/respostas/create", resposta)
    .then(function(res) {
      console.log(res);
    })
    .finally(function() {
      window.history.back();
    });
}
