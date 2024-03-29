$(document).ready(function() {
  $("#preloader").css("display", "block");
  axios
    .get("http://localhost:8080/myapp/aulas")
    .then(function(res) {
      res.data.forEach(function(item) {
        $("#listaAulasBody").append(
          "<tr><td>" +
            item.descricao +
            "</td>" +
            "<td>" +
            item.situacao +
            "</td>" +
            "<td>" +
            item.materia.descricao +
            "</td>" +
            "<td><a href='javascript:iniciarAula(" +
            item.id +
            ")'>Iniciar Aula/</td>" +
            "<td><a href='javascript:finalizarAula(" +
            item.id +
            ")'>Concluir Aula</td>" +
            "" +
            "</td>" +
            "<td><a href='javascript:editAula(" +
            item.id +
            ")'>Editar</td>" +
            "<td><a href='javascript:deleteAula(" +
            item.id +
            ")'>Excluir</td></tr>"
        );
      });
      $("#listaAulas").DataTable();
    })
    .finally(function() {
      $("#preloader").css("display", "none");
    });

  axios.get("http://localhost:8080/myapp/materias").then(function(res) {
    res.data.forEach(function(item) {
      $("#materiasList").append(
        "<option value=" + item.id + ">" + item.descricao + "</option>"
      );
    });
  });

  var modal = document.getElementById("editAulaModal");

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

  $("#doEditAula").on("click", function() {
    let id = $("input[name=id]").val();
    let descricao = $("input[name=descricao]").val();
    let situacao = $("input[name=situacao]").val();
    let materiaId = $("#materiasList").val();
    var aula = {
      descricao: descricao,
      situacao: situacao,
      materia: { id: materiaId }
    };
    doEditAula(aula, id);
  });
});

function doEditAula(aula, id) {
  $("#preloader").css("display", "block");
  axios
    .put("http://localhost:8080/myapp/aulas/aula/" + id, aula)
    .then(function(res) {
      console.log(res);
    })
    .finally(function() {
      location.reload();
      $("#preloader").css("display", "none");
    });
}

function editAula(id) {
  // Get the modal
  axios.get("http://localhost:8080/myapp/aulas/aula/" + id).then(function(res) {
    $("input[name=id]").val(res.data.id);
    $("input[name=descricao]").val(res.data.descricao);
    $("input[name=situacao]").val(res.data.situacao);
    var modal = document.getElementById("editAulaModal");
    modal.style.display = "block";
  });
}

function deleteAula(id) {
  $("#preloader").css("display", "block");
  axios
    .delete("http://localhost:8080/myapp/aulas/aula/" + id)
    .then(function(res) {
      console.log(res);
    })
    .finally(function() {
      location.reload();
      $("#preloader").css("display", "none");
    });
}

function iniciarAula(id) {
  $("#preloader").css("display", "block");
  axios
    .post("http://localhost:8080/myapp/aulas/aula/iniciarAula/" + id)
    .then(function(res) {
      console.log(res);
    })
    .finally(function() {
      location.reload();
      $("#preloader").css("display", "none");
    });
}

function finalizarAula(id) {
  $("#preloader").css("display", "block");
  axios
    .post("http://localhost:8080/myapp/aulas/aula/concluirAula/" + id)
    .then(function(res) {
      console.log(res);
    })
    .finally(function() {
      $("#preloader").css("display", "none");
      location.reload();
    });
}
