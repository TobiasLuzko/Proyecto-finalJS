// Definición de un array para almacenar los créditos
let creditos = [];

// Función que se ejecuta cuando se carga la página
document.addEventListener("DOMContentLoaded", function () {
  // Verifica si hay créditos guardados en localStorage y los carga si existen
  let creditosGuardados = localStorage.getItem("creditos");
  if (creditosGuardados) {
    creditos = JSON.parse(creditosGuardados);
    // Muestra los créditos en la página
    creditos.forEach(function (credito) {
      mostrarResultado(credito);
    });
  }

  // Cargar datos de préstamos desde el archivo JSON
  cargarDatosPrestamos();
  
  // Agrega un evento de clic al botón "Calcular"
  document.getElementById("calcularBtn").addEventListener("click", calcular);
});

// Función para calcular créditos

function calcular() {
  let monto = parseInt(document.getElementById("monto").value);
  let tasa = parseFloat(document.getElementById("tasa").value);
  let plazo = parseInt(document.getElementById("plazo").value);

  let intereses = (monto * tasa) / 100;
  let total = monto + intereses;
  let cuotaMensual = total / plazo;

  let credito = {
    monto: monto,
    tasa: tasa,
    plazo: plazo,
    total: total,
    cuotaMensual: cuotaMensual
  };

  creditos.push(credito);
  mostrarResultado(credito);

  // Guardar los créditos en localStorage
  localStorage.setItem("creditos", JSON.stringify(creditos));
}

function mostrarResultado(credito) {
  let resultado = "Crédito: $" + credito.monto.toFixed(2) + "<br>";
  resultado += "Tasa de interés: " + credito.tasa.toFixed(2) + "%<br>";
  resultado += "Plazo: " + credito.plazo + " meses<br>";
  resultado += "Total a pagar: $" + credito.total.toFixed(2) + "<br>";
  resultado += "Cuota mensual: $" + credito.cuotaMensual.toFixed(2);

  document.getElementById("resultado").innerHTML = resultado;
}

// Función para cargar datos de préstamos desde el archivo JSON
function cargarDatosPrestamos() {
  fetch("datos-prestamos.json") // Nombre del archivo JSON
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Error en la respuesta del archivo JSON.");
      }
      return response.json();
    })
    .then(function (prestamos) {
      // Procesa los datos de préstamos y muestra en la página
      mostrarPrestamos(prestamos);
    })
    .catch(function (error) {
      console.error("Error al cargar los datos de préstamos desde el archivo JSON: " + error);
    });
}

// Función para mostrar los préstamos en la página
function mostrarPrestamos(prestamos) {
  let prestamosDiv = document.getElementById("prestamos");

  prestamos.forEach(function (prestamo) {
    let prestamoElement = document.createElement("div");
    prestamoElement.innerHTML = "<strong>" + prestamo.nombre + "</strong><br>Monto máximo: $" + prestamo.montoMaximo.toFixed(2) + "<br>Tasa de interés: " + prestamo.tasa + "%<br>Plazo máximo: " + prestamo.plazoMaximo + " meses";
    prestamosDiv.appendChild(prestamoElement);
  });
}

