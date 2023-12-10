function exibirAlertaAposTempo(tempo) {
  setTimeout(function () {
    //alert("Bem-vindo ao nosso site!");
  }, tempo);
}
exibirAlertaAposTempo(5000);

function exibirAlertaSimples() {
  const extra = 400;
  var desc = 1;
  var a = parseFloat(document.getElementById('inputTipoSite').value);
  var meses = parseFloat(document.getElementById('inputPrazo').value);  
  var c = $('input[type=checkbox]:checked').length;
  if (meses == 2) {
    desc = 0.95;  
  }

  if (meses == 3) {
    desc = 0.9;  
  }

  if (meses == 4) {
    desc = 0.9;  
  }

  if (meses == 5) {
    desc = 0.85;  
  }

  if (meses > 5) {
    desc = 0.8;  
  }
  var total = (a + (extra * c)) * desc;
  alert("Valor total: " + total + " €");
}


// EVENTO PARA GERAR UM FEED DE NOTÍCIAS, PEGANDO DADOS DO ARQUIVOS XML EXTERNO
document.addEventListener("DOMContentLoaded", function () {
  const url = "scripts/noticias.xml";

  fetch(url)
    .then(response => response.text())
    .then(data => {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data, "text/xml");

      const items = xmlDoc.querySelectorAll("item");

      const noticiasLista = document.getElementById("noticias-lista");

      items.forEach(item => {
        const titulo = item.querySelector("title").textContent;
        const link = item.querySelector("link").textContent;

        const li = document.createElement("li");
        const a = document.createElement("a");
        a.textContent = titulo;
        a.href = link;

        li.appendChild(a);
        noticiasLista.appendChild(li);
      });
    })
    .catch(error => console.error("Erro ao carregar notícias RSS:", error));
});

// FUNÇÃO GERAR COORDENADAS
function obterCoordenadas() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        console.log('Latitude:', latitude);
        console.log('Longitude:', longitude);

        // Aqui você pode usar as coordenadas conforme necessário
        // Por exemplo, exibir no mapa usando a API do Google Maps
        exibirNoMapa(latitude, longitude);
      },
      function (error) {
        console.error('Erro ao obter coordenadas:', error.message);
      }
    );
  } else {
    console.error('Geolocalização não é suportada neste navegador.');
  }
}

function exibirNoMapa(latitude, longitude) {
  const mapOptions = {
    center: { lat: latitude, lng: longitude },
    zoom: 15
  };

  const map = new google.maps.Map(document.getElementById('map'), mapOptions);

  const marker = new google.maps.Marker({
    position: { lat: latitude, lng: longitude },
    map: map,
    title: 'Localização Atual'
  });
}


// FUNÇÃO INIT MAP

function initMap() {
  // Substitua as coordenadas pelos valores reais
  const escritorio = { lat: 41.15635, lng: -8.61010 }; // Coordenadas da MasterD
  const cliente = { lat: 41.549053, lng: -8.433865 };   // Coordenadas do comboio de Braga

  const map = new google.maps.Map(document.getElementById('map'), {
    center: escritorio,
    zoom: 14
  });

  const markerEscritorio = new google.maps.Marker({
    position: escritorio,
    map: map,
    title: 'Escritório'
  });

  const markerCliente = new google.maps.Marker({
    position: cliente,
    map: map,
    title: 'Cliente'
  });

  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer();
  directionsRenderer.setMap(map);

  const request = {
    origin: cliente,
    destination: escritorio,
    travelMode: 'DRIVING'
  };

  directionsService.route(request, function (response, status) {
    if (status === 'OK') {
      directionsRenderer.setDirections(response);
    } else {
      window.alert('Erro ao calcular o caminho: ' + status);
    }
  });
}
