$(document).ready(function() {
  $("#preloader").css("display", "block");
  axios.get("http://localhost:8080/myapp/usuarios").then(function(res) {
    res.data.forEach(function(item) {
      $("#listaUsuariosBody").append(
        "<tr><td>" +
          item.nome +
          "</td>" +
          "<td>" +
          item.sobrenome +
          "</td>" +
          "<td>" +
          item.idade +
          "</td>" +
          "<td>" +
          item.usuario +
          "</td>" +
          "<td><a href='javascript:editUser(" +
          item.id +
          ")'>Editar</td>" +
          "<td><a href='javascript:deleteUser(" +
          item.id +
          ")'>Excluir</td></tr>"
      );
    });
    $("#listaUsuarios").DataTable();
  })
  .finally(function(){
    $("#preloader").css("display", "none");
  });

  var modal = document.getElementById("editUsuarioModal");

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

  $("#doEditUsuario").on("click", function() {
    let id = $("input[name=id]").val();
    let nome = $("input[name=nome]").val();
    let sobrenome = $("input[name=sobrenome]").val();
    let idade = $("input[name=idade]").val();
    let usuario = $("input[name=usuario]").val();
    let senha = $("input[name=senha]").val();
    var pessoa = {
      nome: nome,
      sobrenome: sobrenome,
      idade: idade,
      usuario: usuario,
      senha: senha
    };
    doEditUsuario(pessoa, id);
  });
});

function doEditUsuario(pessoa, id) {
  axios
    .put("http://localhost:8080/myapp/usuarios/usuario/" + id, pessoa)
    .then(function(res) {
      console.log(res);
    })
    .finally(function() {
      location.reload();
    });
}

function editUser(id) {
  // Get the modal
  axios
    .get("http://localhost:8080/myapp/usuarios/usuario/" + id)
    .then(function(res) {
      $("input[name=id]").val(res.data.id);
      $("input[name=nome]").val(res.data.nome);
      $("input[name=sobrenome]").val(res.data.sobrenome);
      $("input[name=idade]").val(res.data.idade);
      $("input[name=usuario]").val(res.data.usuario);
      $("input[name=senha]").val(res.data.senha);
      var modal = document.getElementById("editUsuarioModal");
      modal.style.display = "block";
    });
}

function deleteUser(id) {
  axios
    .delete("http://localhost:8080/myapp/usuarios/usuario/" + id)
    .then(function(res) {
      console.log(res);
    })
    .finally(function() {
      location.reload();
    });
}
