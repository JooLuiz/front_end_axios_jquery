$(document).ready(function() {
  axios.get("http://localhost:8080/myapp/aulas").then(function(res) {
    res.data.forEach(function(item) {
      $("#aulasList").append(
        "<option value=" + item.id + ">" + item.descricao + "</option>"
      );
    });
  });

  $("#adicionarConteudo").on("submit", function(event) {
    event.preventDefault();
    let conteudoContent = $("input[name=conteudo]").val();
    let aulaId = $("#aulasList").val();
    var conteudo = {
      conteudo: conteudoContent,
      aula: { id: aulaId }
    };
    adicionaConteudo(conteudo);
  });
});

function adicionaConteudo(conteudo) {
  axios
    .post("http://localhost:8080/myapp/conteudos/create", conteudo)
    .then(function(res) {
      console.log(res);
    })
    .finally(function() {
      window.history.back();
    });
}
