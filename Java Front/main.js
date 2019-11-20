$(document).ready(function() {
  var myChart = document.getElementById("myChart").getContext("2d");

  axios.get("http://localhost:8080/myapp/materias").then(function(resp) {
    var labels = ["Ativas", "Inativas"];
    var dados = [0, 0];
    var dados2 = [[], []];

    resp.data.forEach(function(e) {
      if (e.ativa == "S") {
        dados[0]++;
      } else {
        dados[1]++;
      }
    });

    Chart.defaults.global.defaultFontFamily = "Lato";
    Chart.defaults.global.defaultFontSize = 18;
    Chart.defaults.global.defaultFontColor = "#777";

    var massPopChart = new Chart(myChart, {
      type: "pie",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Matérias",
            data: dados,
            backgroundColor: ["green", "red"]
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: "Relação de matérias",
          fontSize: 25
        },
        legend: {
          display: true,
          position: "right",
          labels: {
            fontColor: "#000"
          }
        },
        layout: {
          padding: {
            left: 50,
            right: 0,
            bottom: 0,
            top: 0
          }
        },
        tooltips: {
          enabled: true
        }
      }
    });
  });

  var myChart2 = document.getElementById("myChart2").getContext("2d");

  axios.get("http://localhost:8080/myapp/aulas").then(function(resp) {
    var labelsChart2 = ["Pendentes", "Em Andamento", "Concluida"];
    var dadosChart2 = [0, 0, 0];

    resp.data.forEach(function(e) {
      if (e.situacao == "P") {
        dadosChart2[0]++;
      } else if (e.situacao == "A") {
        dadosChart2[1]++;
      } else {
        dadosChart2[2]++;
      }
    });

    Chart.defaults.global.defaultFontFamily = "Lato";
    Chart.defaults.global.defaultFontSize = 18;
    Chart.defaults.global.defaultFontColor = "#777";

    var massPopChart2 = new Chart(myChart2, {
      type: "pie",
      data: {
        labels: labelsChart2,
        datasets: [
          {
            label: "Aulas",
            data: dadosChart2,
            backgroundColor: ["red", "blue", "green"]
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: "Relação de Aulas",
          fontSize: 25
        },
        legend: {
          display: true,
          position: "right",
          labels: {
            fontColor: "#000"
          }
        },
        layout: {
          padding: {
            left: 50,
            right: 0,
            bottom: 0,
            top: 0
          }
        },
        tooltips: {
          enabled: true
        }
      }
    });
  });
});
