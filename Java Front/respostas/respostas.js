$(document).ready(function() {
  axios.get("http://localhost:8080/myapp/respostas").then(function(res) {
    res.data.forEach(function(item) {
      $("#listaRespostasBody").append(
        "<tr><td>" +
          item.descricao +
          "</td>" +
          "<td>" +
          item.correta +
          "</td>" +
          "<td>" +
          item.exercicio.pergunta +
          "</td>" +
          "<td><a href='javascript:editResposta(" +
          item.id +
          ")'>Editar</td>" +
          "<td><a href='javascript:deleteResposta(" +
          item.id +
          ")'>Excluir</td></tr>"
      );
    });
  });

  axios.get("http://localhost:8080/myapp/exercicios").then(function(res) {
    res.data.forEach(function(item) {
      $("#exerciciosList").append(
        "<option value=" + item.id + ">" + item.pergunta + "</option>"
      );
    });
  });

  var modal = document.getElementById("editRespostaModal");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  $("#doEditResposta").on("click", function() {
    let id = $("input[name=id]").val();
    let descricao = $("input[name=descricao]").val();
    let correta = $("input[name=correta]").val();
    let exercicioId = $("#exercicioList").val();
    var resposta = {
      descricao,
      correta,
      exercicio: { id: parseInt(exercicioId) }
    };
    doEditResposta(resposta, id);
  });
});

function doEditResposta(resposta, id) {
  axios
    .put("http://localhost:8080/myapp/respostas/resposta/" + id, resposta)
    .then(function(res) {
      console.log(res);
    })
    .finally(function() {
      location.reload();
    });
}

function editResposta(id) {
  // Get the modal
  axios
    .get("http://localhost:8080/myapp/respostas/resposta/" + id)
    .then(function(res) {
      $("input[name=id]").val(res.data.id);
      $("input[name=descricao]").val(res.data.descricao);
      $("input[name=correta]").val(res.data.correta);
      $("#exercicioList").val(res.data.exercicio.id);
      var modal = document.getElementById("editRespostaModal");
      modal.style.display = "block";
    });
}

function deleteResposta(id) {
  axios
    .delete("http://localhost:8080/myapp/respostas/resposta/" + id)
    .then(function(res) {
      console.log(res);
    })
    .finally(function() {
      location.reload();
    });
}
