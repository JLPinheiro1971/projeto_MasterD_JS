function exibirAlertaAposTempo(tempo) {
  setTimeout(function () {
    //alert("Bem-vindo ao nosso site!");
  }, tempo);
}

exibirAlertaAposTempo(5000);

// FUNÇÃO PARA VERIFICAR PREENCHIMENTO DE FORMULÁRIO DE CONTATO
function confirmarPreenchimentoContato() {
  var contatoNome = document.getElementById('contatoNome').value;
  var contatoApelido = document.getElementById('contatoApelido').value;
  var contatoTelemovel = document.getElementById('contatoTelemovel').value;
  var contatoEmail = document.getElementById('contatoEmail').value;
  var contatoData = document.getElementById('contatoData').value;
  var contatoMotivo = document.getElementById('contatoMotivo').value;
  if (contatoNome == '' || contatoApelido == '' || contatoTelemovel == '' || contatoEmail == '' || contatoData == '' || contatoMotivo == '') {
    alert('Todos os campos do formulário de contato precisam estar preenchidos.');
  }
}

// FUNÇÃO PARA CALCULAR ORÇAMENTO
function calcularOrcamento() {
  const extra = 400;
  var prazo = 1;
  var desc = 1;
  var a = parseFloat(document.getElementById('inputTipoSite').value);
  var prazo = parseFloat(document.getElementById('inputPrazo').value);
  var c = $('input[type=checkbox]:checked').length;

  if (prazo == 2) {
    desc = 0.95;
  } else if (prazo == 3) {
    desc = 0.9;
  } else if (prazo == 4) {
    desc = 0.9;
  } else if (prazo == 5) {
    desc = 0.85;
  } else if (prazo > 5) {
    desc = 0.8;  }

  var total = (a + (extra * c)) * desc;

  document.getElementById('resultado').value = total;
  var resul = parseFloat(document.getElementById('resultado').value);

}

// FUNÇÃO PARA VERIFICAR PREENCHIMENTO DE FORMULÁRIO DE PEDIDO DE ORÇAMENTO
function enviarOrcamento() {
  
  var orcamentoNome = document.getElementById('orcamentoNome').value;
  var orcamentoApelido = document.getElementById('orcamentoApelido').value;
  var orcamentoTelemovel = document.getElementById('orcamentoTelemovel').value;
  var orcamentoValor = document.getElementById('resultado').value;
  if (orcamentoNome == '' || orcamentoApelido == '' || orcamentoTelemovel == '') {
    alert("Os Dados Pessoais precisam estar preenchidos.");
  } else if (orcamentoValor == 0) {
    alert('Preencha as informações do pedido de orçamento e itens necessários. Por favor, tente novamente.');
  } else {
    alert('O pedido de orçamento foi enviado com sucesso. Em breve retornaremos o contato.');
  }
}


// EVENTO PARA GERAR UM FEED DE NOTÍCIAS, PEGANDO DADOS DO ARQUIVOS XML EXTERNO
document.addEventListener("DOMContentLoaded", function () {
  const url = "scripts/noticias_google.xml";

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


//INCORPORAÇÃO DO MAPA E CÁLCULO DA ROTA
document.addEventListener("DOMContentLoaded", function () {
          getLocation();
      });

      function getLocation() {
          if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(showPosition, showError);
          } else {
              alert("Geolocalização não é suportada pelo seu navegador.");
          }
      }

      function showPosition(position) {
          var latitude = position.coords.latitude;
          var longitude = position.coords.longitude;

          var officeLocation = { lat: 38.73371, lng: -9.14117 }; // Substitua pelas coordenadas reais do seu escritório

          // Crie um mapa
          var map = new google.maps.Map(document.getElementById('map'), {
              center: { lat: latitude, lng: longitude },
              zoom: 14
          });

          // Crie um serviço de direções
          var directionsService = new google.maps.DirectionsService;
          var directionsDisplay = new google.maps.DirectionsRenderer({
              map: map
          });

          // Configure a solicitação de direções
          var request = {
              origin: { lat: latitude, lng: longitude },
              destination: officeLocation,
              travelMode: 'DRIVING'
          };

          // Faça a solicitação de direções
          directionsService.route(request, function(response, status) {
              if (status === 'OK') {
                  // Exiba as direções no mapa
                  directionsDisplay.setDirections(response);

                  // Exiba informações sobre a rota
                  var route = response.routes[0];
                  displayRouteInfo(route);
              } else {
                  window.alert('Erro ao calcular a rota: ' + status);
              }
          });
      }

      function displayRouteInfo(route) {
          var infoDiv = document.getElementById('info');
          infoDiv.innerHTML = 'Tempo de Deslocamento: ' + route.legs[0].duration.text + '<br>' +
                              'Distância: ' + route.legs[0].distance.text;
      }

      function showError(error) {
          switch (error.code) {
              case error.PERMISSION_DENIED:
                  alert("Permissão de geolocalização negada pelo usuário.");
                  break;
              case error.POSITION_UNAVAILABLE:
                  alert("Informações de localização indisponíveis.");
                  break;
              case error.TIMEOUT:
                  alert("A solicitação para obter a localização do usuário expirou.");
                  break;
              case error.UNKNOWN_ERROR:
                  alert("Ocorreu um erro desconhecido ao tentar obter a localização do usuário.");
                  break;
          }
      }