$(document).ready(function() {
  axios.get("http://localhost:8080/myapp/exercicios").then(function(res) {
    res.data.forEach(function(item) {
      $("#listaExerciciosBody").append(
        "<tr><td>" +
          item.pergunta +
          "</td>" +
          "<td>" +
          item.dificuldade +
          "</td>" +
          "<td>" +
          item.conteudo.conteudo +
          "</td>" +
          "<td><a href='javascript:editExercicio(" +
          item.id +
          ")'>Editar</td>" +
          "<td><a href='javascript:deleteExercicio(" +
          item.id +
          ")'>Excluir</td></tr>"
      );
    });
  });

  axios.get("http://localhost:8080/myapp/conteudos").then(function(res) {
    res.data.forEach(function(item) {
      $("#conteudosList").append(
        "<option value=" + item.id + ">" + item.conteudo + "</option>"
      );
    });
  });

  var modal = document.getElementById("editExercicioModal");

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

  $("#doEditExercicio").on("click", function() {
    let id = $("input[name=id]").val();
    let pergunta = $("input[name=pergunta]").val();
    let dificuldade = $("input[name=dificuldade]").val();
    let conteudoId = $("#conteudoList").val();
    var exercicio = {
      pergunta,
      dificuldade,
      conteudo: { id: parseInt(conteudoId) }
    };
    doEditExercicio(exercicio, id);
  });
});

function doEditExercicio(exercicio, id) {
  axios
    .put("http://localhost:8080/myapp/exercicios/exercicio/" + id, exercicio)
    .then(function(res) {
      console.log(res);
    })
    .finally(function() {
      location.reload();
    });
}

function editExercicio(id) {
  // Get the modal
  axios
    .get("http://localhost:8080/myapp/exercicios/exercicio/" + id)
    .then(function(res) {
      $("input[name=id]").val(res.data.id);
      $("input[name=pergunta]").val(res.data.pergunta);
      $("input[name=dificuldade]").val(res.data.dificuldade);
      $("#conteudoList").val(res.data.conteudo.id);
      var modal = document.getElementById("editExercicioModal");
      modal.style.display = "block";
    });
}

function deleteExercicio(id) {
  axios
    .delete("http://localhost:8080/myapp/exercicios/exercicio/" + id)
    .then(function(res) {
      console.log(res);
    })
    .finally(function() {
      location.reload();
    });
}
