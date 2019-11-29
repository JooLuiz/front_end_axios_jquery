$(document).ready(function() {
  $("#preloader").css("display", "block");
  axios.get("http://localhost:8080/myapp/materiasUsuario").then(function(res) {
    res.data.forEach(function(item) {
      $("#listaMateriasUsuarioBody").append(
        "<tr><td>" +
          item.ano +
          "</td>" +
          "<td>" +
          item.situacao +
          "</td>" +
          "<td>" +
          item.materia.descricao +
          "</td>" +
          "<td>" +
          item.usuario.nome +
          "</td>" +
          "<td><a href='javascript:editMateriaUsuario(" +
          item.id +
          ")'>Editar</td>" +
          "<td><a href='javascript:deleteMateriaUsuario(" +
          item.id +
          ")'>Excluir</td></tr>"
      );
    });
    $("#listaMateriasUsuario").DataTable();
  })
  .finally(function(){
    $("#preloader").css("display", "none");
  });

  axios.get("http://localhost:8080/myapp/materias").then(function(res) {
    res.data.forEach(function(item) {
      $("#materiasList").append(
        "<option value=" + item.id + ">" + item.descricao + "</option>"
      );
    });
  });

  axios.get("http://localhost:8080/myapp/usuarios").then(function(res) {
    res.data.forEach(function(item) {
      $("#usuariosList").append(
        "<option value=" + item.id + ">" + item.nome + "</option>"
      );
    });
  });

  var modal = document.getElementById("editMateriaUsuarioModal");

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

  $("#doEditMateriaUsuario").on("click", function() {
    let id = $("input[name=id]").val();
    let ano = $("input[name=ano]").val();
    let situacao = $("input[name=situacao]").val();
    let materiaId = $("#materiasList").val();
    let usuario = $("#usuariosList").val();
    var materiaUsuario = {
      ano: ano,
      situacao: situacao,
      materia: { id: materiaId },
      usuario: { id: usuario }
    };
    doEditMateriaUsuario(materiaUsuario, id);
  });
});

function doEditMateriaUsuario(materiaUsuario, id) {
  axios
    .put(
      "http://localhost:8080/myapp/materiasUsuario/materiaUsuario/" + id,
      materiaUsuario
    )
    .then(function(res) {
      console.log(res);
    })
    .finally(function() {
      location.reload();
    });
}

function editMateriaUsuario(id) {
  // Get the modal
  axios
    .get("http://localhost:8080/myapp/materiasUsuario/materiaUsuario/" + id)
    .then(function(res) {
      $("input[name=id]").val(res.data.id);
      $("input[name=ano]").val(res.data.ano);
      $("input[name=situacao]").val(res.data.situacao);
      $("#materiasList").val(res.data.materia.id);
      $("#usuariosList").val(res.data.usuario.id);
      var modal = document.getElementById("editMateriaUsuarioModal");
      modal.style.display = "block";
    });
}

function deleteMateriaUsuario(id) {
  axios
    .delete("http://localhost:8080/myapp/materiasUsuario/materiaUsuario/" + id)
    .then(function(res) {
      console.log(res);
    })
    .finally(function() {
      location.reload();
    });
}
