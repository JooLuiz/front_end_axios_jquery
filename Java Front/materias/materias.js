$(document).ready(function() {
  $("#preloader").css("display", "block");
  axios.get("http://localhost:8080/myapp/materias").then(function(res) {
    res.data.forEach(function(item) {
      $("#listaMateriasBody").append(
        "<tr><td>" +
          item.descricao +
          "</td>" +
          "<td>" +
          item.ativa +
          "</td>" +
          "<td><a href='javascript:editMateria(" +
          item.id +
          ")'>Editar</td>" +
          "<td><a href='javascript:deleteMateria(" +
          item.id +
          ")'>Excluir</td></tr>"
      );
    });
    $("#listaMaterias").DataTable();
  })
  .finally(function(){
    $("#preloader").css("display", "none");
  });

  var modal = document.getElementById("editMateriaModal");

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

  $("#doEditMateria").on("click", function() {
    let id = $("input[name=id]").val();
    let descricao = $("input[name=descricao]").val();
    let ativa = $("input[name=ativa]").val();
    var materia = {
      descricao: descricao,
      ativa: ativa
    };
    doEditMateria(materia, id);
  });
});

function doEditMateria(materia, id) {
  axios
    .put("http://localhost:8080/myapp/materias/materia/" + id, materia)
    .then(function(res) {
      console.log(res);
    })
    .finally(function() {
      location.reload();
    });
}

function editMateria(id) {
  // Get the modal
  axios
    .get("http://localhost:8080/myapp/materias/materia/" + id)
    .then(function(res) {
      $("input[name=id]").val(res.data.id);
      $("input[name=descricao]").val(res.data.descricao);
      $("input[name=ativa]").val(res.data.ativa);
      var modal = document.getElementById("editMateriaModal");
      modal.style.display = "block";
    });
}

function deleteMateria(id) {
  axios
    .delete("http://localhost:8080/myapp/materias/materia/" + id)
    .then(function(res) {
      console.log(res);
    })
    .finally(function() {
      location.reload();
    });
}
