$(document).ready(function() {
  $("#preloader").css("display", "block");
  axios
    .get("http://localhost:8080/myapp/conteudos")
    .then(function(res) {
      res.data.forEach(function(item) {
        $("#listaConteudosBody").append(
          "<tr><td>" +
            item.conteudo +
            "</td>" +
            "<td>" +
            item.aula.descricao +
            "</td>" +
            "<td><a href='javascript:editConteudo(" +
            item.id +
            ")'>Editar</td>" +
            "<td><a href='javascript:deleteConteudo(" +
            item.id +
            ")'>Excluir</td></tr>"
        );
      });
      $("#listaConteudos").DataTable();
    })
    .finally(function() {
      $("#preloader").css("display", "none");
    });

  axios.get("http://localhost:8080/myapp/aulas").then(function(res) {
    res.data.forEach(function(item) {
      $("#aulasList").append(
        "<option value=" + item.id + ">" + item.descricao + "</option>"
      );
    });
  });

  var modal = document.getElementById("editConteudoModal");

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

  $("#doEditConteudo").on("click", function() {
    let id = $("input[name=id]").val();
    let conteudoContent = $("input[name=conteudo]").val();
    let aulaId = $("#aulasList").val();
    var conteudo = {
      conteudo: conteudoContent,
      aula: { id: aulaId }
    };
    debugger
    doEditConteudo(conteudo, id);
  });
});

function doEditConteudo(conteudo, id) {
  $("#preloader").css("display", "block");
  axios
    .put("http://localhost:8080/myapp/conteudos/conteudo/" + id, conteudo)
    .then(function(res) {
      debugger
      console.log(res);
    })
    .finally(function() {
      location.reload();
      $("#preloader").css("display", "none");
    });
}

function editConteudo(id) {
  $("#preloader").css("display", "block");
  axios
    .get("http://localhost:8080/myapp/conteudos/conteudo/" + id)
    .then(function(res) {
      $("input[name=id]").val(res.data.id);
      $("input[name=conteudo]").val(res.data.conteudo);
      var modal = document.getElementById("editConteudoModal");
      modal.style.display = "block";
    })
    .finally(function() {
      $("#preloader").css("display", "none");
    });
}

function deleteConteudo(id) {
  $("#preloader").css("display", "block");
  axios
    .delete("http://localhost:8080/myapp/conteudos/conteudo/" + id)
    .then(function(res) {
      console.log(res);
    })
    .finally(function() {
      location.reload();
      $("#preloader").css("display", "none");
    });
}
