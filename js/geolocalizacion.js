
var x = document.getElementById("demo");
var long_ini = -5.999097;
var lat_ini = 37.389094;
var long_fin = 0;
var lat_fin = 0;

var h_ini = new Date().getHours();
var h_fin = new Date().getHours();
var m_ini = new Date().getMinutes();
var m_fin = new Date().getMinutes();
var s_ini = new Date().getSeconds();
var s_fin = new Date().getSeconds();

var running = 0;

$(document).ready(function () {

  /*$("#btnmap").click(function(){
    if ($("#marker").attr("Value") != "Mostar mapa"){
      $("#marker").attr("Value",'Mostar mapa');
    }
    else {
      $("#marker").attr("Value", 'Ocultar mapa');
    }
    $("#ifrmap").toggle(); 
  });*/


  $("#inicio").click(function () {
    running=1;
    $("#map").hide(); 
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(starposition, showError);
      navigator.geolocation.watchPosition(showPosition, showError);
    } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  })
  $("#parar").click(function () {
    running=0;
    $("#map").toggle(); 
  })
  
  function starposition(position) {
    running = 1;
    long_ini = position.coords.longitude;
    lat_ini = position.coords.latitude;

    long_fin = position.coords.longitude;
    lat_fin = position.coords.latitude;

    

    if (typeof (Storage) !== "undefined") {
      localStorage.setItem("lngIni", null);
      localStorage.setItem("latIni", null);
      localStorage.setItem("lngFin", null);
      localStorage.setItem("latFin", null);

      localStorage.setItem("lngIni", position.coords.longitude);
      localStorage.setItem("latIni", position.coords.latitude);
    } else {
      alert("Sorry! No Web Storage support.");
    }
  }

  function endposition(position) {
    if (typeof (Storage) !== "undefined") {
      localStorage.setItem("lngFin", position.coords.longitude);
      localStorage.setItem("latFin", position.coords.latitude);
    } else {
      alert("Sorry! No Web Storage support.");
    }
  }

  var con = 0;
  function showPosition(position) {
    con++;
    long_fin = position.coords.longitude;
    lat_fin = position.coords.latitude;


    var dist = calcCrow(lat_ini, long_ini, lat_fin, long_fin);

    var velocidad = dist / caltiem();
    if (running == 1) {
      /*$("#txt").val(" Longitud: " + position.coords.longitude);
      $("#txts").val("Latitud:" + position.coords.latitude + " " + con);
      $("#txtdist").val(" Distancia: " + dist + " -------> Velocidad: " + velocidad);*/

      $("#txtdist").val(" Distancia: " + dist);
    }
    else{
      if (localStorage.getItem("lngFin")==null){
        endposition(position);
      }
    }
  }
  $("#btnRec").click(function () {
    if (typeof (Storage) !== "undefined") {

      var recorrido = [{ id: 1, long: "-5.9991138", lat: "37.3891293" }];
      localStorage.setItem("recorrido", recorrido);
    } else {
      alert("Sorry! No Web Storage support..");
    }
  });
  var speedEl = document.getElementById('speed');

  function showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        x.innerHTML = "User denied the request for Geolocation."
        break;
      case error.POSITION_UNAVAILABLE:
        x.innerHTML = "Location information is unavailable."
        break;
      case error.TIMEOUT:
        x.innerHTML = "The request to get user location timed out."
        break;
      case error.UNKNOWN_ERROR:
        x.innerHTML = "An unknown error occurred."
        break;
    }
  }

  //This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
  function calcCrow(lat1, lon1, lat2, lon2) {
    var R = 6371; // km
    var dLat = toRad(lat2 - lat1);
    var dLon = toRad(lon2 - lon1);
    var lat1 = toRad(lat1);
    var lat2 = toRad(lat2);

    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
  }
  // Converts numeric degrees to radians
  function toRad(Value) {
    return Value * Math.PI / 180;
  }


  function caltiem() {
    h_ini = h_fin;
    m_ini = m_fin;
    s_ini = s_fin;
    h_fin = new Date().getHours();
    m_fin = new Date().getMinutes();
    s_fin = new Date().getSeconds();
    return (h_fin - h_ini).toString() + "." + (m_fin - m_ini).toString() + (s_fin - s_ini).toString();
  }
});






