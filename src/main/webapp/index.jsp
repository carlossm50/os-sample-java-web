<!--html>
<body>
<h2>Hello World with OpenShift and me!</h2>
</body>
</html-->
<!DOCTYPE html>
<html lang="en">

<head>
  <title>DAW App</title>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE-edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>



  <link rel="stylesheet" href="css/style.css">
  <script type="text/javascript" src="js/script.js"></script>
  <script type="text/javascript" src="js/geolocalizacion.js"></script>
</head>

<body>
  <nav class="navbar navbar-inverse">
    <div class="container-fluid">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>

      </div>
      <div class="collapse navbar-collapse" id="myNavbar">
        <ul class="nav navbar-nav">
          <li class="active">
            <a href="#">Home</a>
          </li>
          <li>
            <a href="map.html">Trazar recorrido</a>
          </li>
          <li>
            <a href="streev.html">Ubicación actual</a>
          </li>
        </ul>

      </div>
    </div>
  </nav>
  <div class="continer-fluid">
    <div class="row">
      <div style="display: flex; justify-content: center;">
        <!--input class="form-control" type="text" id="txt" placeholder="Velocidad" style="text-align: center;" />
        <input class="form-control" type="text" id="txts" placeholder="Speed" style="text-align: center;" /-->

      </div>
    </div>
    <div class="row">
      <div style="display: flex; justify-content: center;">

        <input class="form-control" type="text" id="txtdist" placeholder="Distancia" style="text-align: center;" />
        <!--p id="demo"></p-->
      </div>
    </div>
    <div class="row">
      <div style="margin: 1%; padding: 1%; display: flex; justify-content: center;">
        <div class="reloj" id="Horas">00</div>
        <div class="reloj" id="Minutos">:00</div>
        <div class="reloj" id="Segundos">:00</div>
        <div class="reloj" id="Centesimas">:00</div>
      </div>
    </div>
    <div class="row" style="margin: 0; padding: 1%; align-content: center; display: flex; justify-content: center;">
      <div>
        <input type="button" class="btn btn-primary" id="inicio" value="Start &#9658;" onclick="inicio();">
        <input type="button" class="btn btn-primary" id="parar" value="Stop &#8718;" onclick="parar();" disabled>
        <input type="button" class="btn btn-primary" id="continuar" value="Resume &#8634;" onclick="inicio();" disabled style="display:none">
        <input type="button" class="btn btn-primary" id="reinicio" value="Reset &#8635;" onclick="reinicio();" disabled style="display:none">
        <input type="button" class="btn btn-primary" id="run" value="Run" style="display:none">
      </div>
    </div>

    <div class="row" style="margin: 0; padding: 1%; align-content: center; display: flex; justify-content: center;">
      
    </div>
    <div id="map" ></div>
  </div>

  <!--iframe id="ifrtrayecto" height="300px" width="100%" src="trayecto.html" name="iframe_a" style="display:none"></iframe-->
  <script>
    
    var map;
    
    var localizacion = { lat: 37.389131899999995, lng: -5.9991205 };
    $(document).ready(function(){
      
      initMap();
    })
    function initMap() {
      map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: localizacion
      });
    }
    function verruta() {
      var objconfigDR = {
        map: map
      };
      var objconfigDS = {
        origin: { lat: 0, lng: 0 },
        destination: { lat: 0, lng: 0 },
        travelMode: google.maps.TravelMode.DRIVING
      };

      var ds = new google.maps.DirectionsService();
      var dr = new google.maps.DirectionsRenderer(objconfigDR);

      ds.route(objconfigDS, fnRutear);
      function fnRutear(resultados, status) {
        if (status = 'OK') {
          dr.setDirections(resultados)

        }
        else {
          alert("Error " + status);
        }

      }
    }
  </script>
  <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAVpOMG1Aniq5XkgEARLWLNauhv0-W71FU&callback=initMap&callback=initMap">
  </script>
</body>