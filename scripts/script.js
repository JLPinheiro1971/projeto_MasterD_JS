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
    alert("Todos os dados pessoais devem ser preenchidos.");
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

// SCRIPT PARA VALIDAR CAMPO NOME
      function validarCampoNome() {
        var nomeInput = document.getElementById("contatoNome");
        var nomeErro = document.getElementById("nomeErro");
        var nome = nomeInput.value.trim();
  
        // Expressão regular para validar caracteres alfabéticos
        var regexNome = /^[a-zA-Z]+$/;
  
        // Verificar se o comprimento está entre 3 e 30 caracteres
        if (nome.length < 3 || nome.length > 30) {
          nomeErro.textContent = "O nome deve ter entre 3 e 30 caracteres.";
          nomeInput.setCustomValidity("invalid");
        } else if (!regexNome.test(nome)) {
          nomeErro.textContent = "Por favor, use apenas caracteres alfabéticos.";
          nomeInput.setCustomValidity("invalid");
        } else {
          nomeErro.textContent = "";
          nomeInput.setCustomValidity("");
        }
      }
  
      // Adicionar um ouvinte de evento para validar o campo ao enviar o formulário
      document.getElementById("formContato").addEventListener("submit", function(event) {
        var nomeInput = document.getElementById("nome");
        validarCampo();
        if (nomeInput.checkValidity() === false) {
          event.preventDefault(); // Impedir o envio do formulário se a validação falhar
        }
      });

      // SCRIPT PARA VALIDAR CAMPO APELIDO
      function validarCampoApelido() {
        var apelidoInput = document.getElementById("contatoApelido");
        var apelidoErro = document.getElementById("apelidoErro");
        var apelido = apelidoInput.value.trim();
  
        // Expressão regular para validar caracteres alfabéticos
        var regexApelido = /^[a-zA-Z]+$/;
  
        // Verificar se o comprimento está entre 2 e 50 caracteres
        if (apelido.length < 2 || apelido.length > 50) {
          apelidoErro.textContent = "O nome deve ter entre 2 e 50 caracteres.";
          apelidoInput.setCustomValidity("invalid");
        } else if (!regexApelido.test(apelido)) {
          apelidoErro.textContent = "Por favor, use apenas caracteres alfabéticos.";
          apelidoInput.setCustomValidity("invalid");
        } else {
          apelidoErro.textContent = "";
          apelidoInput.setCustomValidity("");
        }
      }
  
      // Adicionar um ouvinte de evento para validar o campo ao enviar o formulário
      document.getElementById("formContato").addEventListener("submit", function(event) {
        var apelidoInput = document.getElementById("apelido");
        validarCampoApelido();
        if (apelidoInput.checkValidity() === false) {
          event.preventDefault(); // Impedir o envio do formulário se a validação falhar
        }
      });          

       // SCRIPT PARA VALIDAR CAMPO TELEMÓVEL
       function validarCampoTelemovel() {
        var telemovelInput = document.getElementById("contatoTelemovel");
        var telemovelErro = document.getElementById("telemovelErro");
        var telemovel = telemovelInput.value.trim();
  
        // Expressão regular para validar caracteres alfabéticos
        var regexTelemovel = /^[0-9]+$/;
  
        // Verificar se o comprimento está entre 9 e 9 caracteres
        if (telemovel.length != 9) {
          telemovelErro.textContent = "O número do telemóvel deve ter 9 dígitos.";
          telemovelInput.setCustomValidity("invalid");
        } else if (!regexTelemovel.test(telemovel)) {
          telemovelErro.textContent = "Por favor, use apenas caracteres numéricos.";
          telemovelInput.setCustomValidity("invalid");
        } else {
          telemovelErro.textContent = "";
          telemovelInput.setCustomValidity("");
        }
      }
  
      // Adicionar um ouvinte de evento para validar o campo ao enviar o formulário
      document.getElementById("formContato").addEventListener("submit", function(event) {
        var telemovelInput = document.getElementById("telemovel");
        validarCampoTelemovel();
        if (telemovelInput.checkValidity() === false) {
          event.preventDefault(); // Impedir o envio do formulário se a validação falhar
        }
      });
      
      
// SCRIPT PARA VALIDAR CAMPO EMAIL
    function validarEmail() {
      var emailInput = document.getElementById("contatoEmail");
      var emailErro = document.getElementById("emailErro");
      var email = emailInput.value.trim();

      // Expressão regular para validar o formato de e-mail
      var regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

      if (!regexEmail.test(email)) {
        emailErro.textContent = "Por favor, insira um endereço de email válido.";
        emailInput.setCustomValidity("invalid");
      } else {
        emailErro.textContent = "";
        emailInput.setCustomValidity("");
      }
    }

    // Adicionar um ouvinte de evento para validar o campo ao enviar o formulário
    document.getElementById("formContato").addEventListener("submit", function(event) {
      var emailInput = document.getElementById("email");
      validarEmail();
      if (emailInput.checkValidity() === false) {
        event.preventDefault(); // Impedir o envio do formulário se a validação falhar
      }
    });