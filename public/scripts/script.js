var bounds = [
  [35.5, -10.0],
  [44.5, 5.0]
];

var initialView = [40.4168, -3.7038];
var initialZoom = 6;

if (window.innerWidth <= 768) {
    initialView = [39.5, -3.5];
    initialZoom = 5;
}

var map = L.map('map', {
  maxBounds: bounds,
  maxBoundsViscosity: 1.0,
  minZoom: 5,
  maxZoom: 18
}).setView(initialView, initialZoom);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

var infoControl = L.control({ position: 'topleft' });
infoControl.onAdd = function (map) {
  var div = L.DomUtil.create('div', 'info-btn');
  div.innerHTML = '<i class="fas fa-info"></i>';
  div.onclick = abrirInfo;
  return div;
};
infoControl.addTo(map);

// Circulo
var centroPI = [39.463705, -0.372171]; 

var offsetLat = 0.38; 
var offsetLng = 0.50; 

var imageBounds = [
[centroPI[0] - offsetLat, centroPI[1] - offsetLng],
[centroPI[0] + offsetLat, centroPI[1] + offsetLng]
];

L.imageOverlay('/Imagenes/PI.png', imageBounds, {
opacity: 0.6
}).addTo(map);
// Circulo


function abrirEstudia() {
  document.getElementById('overlay').classList.add('show');
  document.getElementById('modalPi').classList.add('show');
}

function practicar() {
  document.getElementById('modalPi').classList.remove('show');
  setTimeout(() => {
    document.getElementById('modalPractica').classList.add('show');
  }, 400);
}

function abrirInfo() {
  document.getElementById('overlay').classList.add('show');
  document.getElementById('modalInfo').classList.add('show');
}

function cerrarTodo() {
  document.getElementById('modalPi').classList.remove('show');
  document.getElementById('modalPractica').classList.remove('show');
  document.getElementById('modalInfo').classList.remove('show');
  document.getElementById('overlay').classList.remove('show');
  document.getElementById('Alerta').classList.remove('show');
  document.getElementById('resultado').textContent = "";
  document.getElementById('piInput').value = "";
}

function comprobar() {
  const piReal = "31415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491";
  let userInput = document.getElementById('piInput').value;
  userInput = userInput.replace(/[\s,\.]/g, '');

  const resultadoDiv = document.getElementById('resultado');

  if (userInput.length === 0) {
    resultadoDiv.textContent = "¿Nada? ¡Tienes que intentarlo al menos! 🙃";
    resultadoDiv.style.color = "#e74c3c";
    return;
  }

  if (userInput[0] !== piReal[0]) {
    resultadoDiv.textContent = "¿En serio? ¡Pi empieza por 3! 😂";
    resultadoDiv.style.color = "#e74c3c";
    return;
  }

  if (userInput.length > 500) {
    resultadoDiv.textContent = "¿501 dígitos? ¡No voy a comprobar tanto, es imposible! No te flipes tanto. 😅";
    resultadoDiv.style.color = "#e74c3c";
    return;
  }

  let correctos = 0;
  let errorEncontrado = false;
  for (let i = 0; i < userInput.length; i++) {
    if (userInput[i] === piReal[i]) {
      correctos++;
    } else {
      errorEncontrado = true;
      break;
    }
  }

  if (errorEncontrado) {
    resultadoDiv.textContent = `¡Te has equivocado en el dígito número ${correctos + 1}! 🚫`;
    resultadoDiv.style.color = "#e74c3c";
    return;
  }

  if (correctos <= 2) {
    resultadoDiv.textContent = "Si solo te sabes esto, ríndete y mira los videos (todos los días a las 21:00)";
    resultadoDiv.style.color = "#e74c3c";
  } else if (correctos <= 10) {
    resultadoDiv.textContent = "Hasta ahí llega también Soul";
    resultadoDiv.style.color = "#f39c12";
  } else if (correctos === 11) {
    resultadoDiv.textContent = "Hasta ahí está bien para conseguir los 100k pero sigue aprendiendo";
    resultadoDiv.style.color = "#3498db";
  } else if (correctos <= 20) {
    resultadoDiv.textContent = "Apréndete unos cuantos más por si te encuentras con alguien que se sabe más";
    resultadoDiv.style.color = "#2ecc71";
  } else if (correctos <= 40) {
    resultadoDiv.textContent = "¿Estás seguro de que ya no te sabes más?";
    resultadoDiv.style.color = "#2ecc71";
  } else if (correctos >= 41) {
    resultadoDiv.textContent = "Ya estás listo para encontrarte a Nil Ojeda y contarle que te sabes todos esos dígitos de pi de memoria";
    resultadoDiv.style.color = "#9b59b6";
  }
}

// Alerta
//document.addEventListener('DOMContentLoaded', function() {
//  abriralerta();
//});

//function abriralerta() {
//  document.getElementById('Alerta').classList.add('show');
//  document.getElementById('overlay').classList.add('show');
//}

// Exponer funciones globalmente
window.abrirEstudia = abrirEstudia;
window.practicar = practicar;
window.abrirInfo = abrirInfo;
window.cerrarTodo = cerrarTodo;
window.comprobar = comprobar;
window.abriralerta = abriralerta;
