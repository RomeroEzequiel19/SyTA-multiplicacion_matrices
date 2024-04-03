function crearMatrices() {
  const filas1 = parseInt(document.getElementById("filas1").value);
  const columnas1 = parseInt(document.getElementById("columnas1").value);
  const filas2 = parseInt(document.getElementById("filas2").value);
  const columnas2 = parseInt(document.getElementById("columnas2").value);

  let matricesHTML = "<h2>Ingrese los valores de las matrices</h2>";
  matricesHTML += "<h3>Matriz 1</h3>";
  matricesHTML += "<table>";
  for (let i = 0; i < filas1; i++) {
    matricesHTML += "<tr>";
    for (let j = 0; j < columnas1; j++) {
      matricesHTML += `<td><input type="number" id="m1_${i}_${j}"></td>`;
    }
    matricesHTML += "</tr>";
  }
  matricesHTML += "</table>";

  matricesHTML += "<h3>Matriz 2</h3>";
  matricesHTML += "<table>";
  for (let i = 0; i < filas2; i++) {
    matricesHTML += "<tr>";
    for (let j = 0; j < columnas2; j++) {
      matricesHTML += `<td><input type="number" id="m2_${i}_${j}"></td>`;
    }
    matricesHTML += "</tr>";
  }
  matricesHTML += "</table>";

  matricesHTML +=
    '<br><button onclick="multiplicarMatrices()">Multiplicar Matrices</button>';

  document.getElementById("matrices").innerHTML = matricesHTML;
}

function multiplicarMatrices() {
  const filas1 = parseInt(document.getElementById("filas1").value);
  const columnas1 = parseInt(document.getElementById("columnas1").value);
  const filas2 = parseInt(document.getElementById("filas2").value);
  const columnas2 = parseInt(document.getElementById("columnas2").value);

  let matriz1 = [];
  for (let i = 0; i < filas1; i++) {
    matriz1[i] = [];
    for (let j = 0; j < columnas1; j++) {
      matriz1[i][j] = parseFloat(document.getElementById(`m1_${i}_${j}`).value);
    }
  }

  let matriz2 = [];
  for (let i = 0; i < filas2; i++) {
    matriz2[i] = [];
    for (let j = 0; j < columnas2; j++) {
      matriz2[i][j] = parseFloat(document.getElementById(`m2_${i}_${j}`).value);
    }
  }

  const matrices = {
    matriz1: matriz1,
    matriz2: matriz2,
  };

  fetch("/multiplicar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(matrices),
  })
    .then((response) => response.json())
    .then((data) => {
      mostrarResultado(data.resultado);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function mostrarResultado(resultado) {
  let resultadoHTML = "<h2>Resultado de la multiplicación</h2>";
  resultadoHTML += "<table>";
  resultado.forEach((row) => {
    resultadoHTML += "<tr>";
    row.forEach((cell) => {
      resultadoHTML += `<td>${cell}</td>`;
    });
    resultadoHTML += "</tr>";
  });
  resultadoHTML += "</table>";

  document.getElementById("matrices").innerHTML = resultadoHTML;
}
