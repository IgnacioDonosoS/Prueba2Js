$(document).ready(function () {
  $("#form").submit(function (e) {
    e.preventDefault();
    let idHero = $("#inputHero").val();
    if (inRange(idHero, 1, 731)) {
      $.ajax({
        url: "https://www.superheroapi.com/api.php/10225473560763923/" + idHero,
        success: function (data) {
          let imagen = data.image.url;
          let nombre = data.name;
          let conexionesFam = data.connections.relatives;
          let publicadoPor = data.biography.publisher;
          let ocupacion = data.work.occupation;
          let primeraAparicion = data.biography["first-appearance"];
          let altura = data.appearance.height[1];
          let peso = data.appearance.weight[1];
          let alianzas = data.connections["group-affiliation"];
          let powerStatsArr = Object.entries(data.powerstats);
          let estadisticas = [];
          powerStatsArr.forEach((element) => {
            estadisticas.push({
              label: element[0],
              y: element[1]
            });
          });
          for (let i = 0; i < estadisticas.length; i++) {
            if (estadisticas[i].y == "null") {
              estadisticas[i].y = 1
            } 
          }
        console.log(estadisticas)
        
          $("#cardHero").html(`
              <div class="card row container">
              <div class="card-horizontal row">
                <div class="img-square-wrapper col-12 col-sm-6 text-center">
                  <img
                    class="img-fluid"
                    src="${imagen}"
                    alt="Card image cap"
                  />
                </div>
                <div class="card-body col-12 col-sm-6 text-start">
                  <h4 class="card-title">Superheroe encontrado</h4>
                  <h6>Nombre: ${nombre}</h6>
                  <p>Conexiones: ${conexionesFam}</p>
                  <p class="ps-3">Publicado por: ${publicadoPor}</p>
                  <p class="ps-3">Ocupación: ${ocupacion}</p>
                  <p class="ps-3">Primera aparición: ${primeraAparicion}</p>
                  <p class="ps-3">Altura: ${altura}</p>
                  <p class="ps-3">Peso: ${peso}</p>
                  <p class="ps-3">Alianzas: ${alianzas}</p>
                </div>
              `);

          let config = {
            animationEnabled: true,
            title: {
              text: "Estadísticas de poder para " + nombre,
            },

            data: [
              {
                type: "pie",
                startAngle: 25,
                toolTipContent: "<b>{label}</b>: {y}",
                showInLegend: "true",
                legendText: "{label}",
                indexLabelFontSize: 16,
                indexLabel: "{label} - {y}",
                dataPoints: estadisticas,
              },
            ],
          };

          let chart = new CanvasJS.Chart("statsHero", config);
          chart.render();
        },
      });
    } else {
      alert("Id del super heroe debe estar entre 1 y 731");
    }
  });
});

function inRange(x, min, max) {
  return (x - min) * (x - max) <= 0;
}
