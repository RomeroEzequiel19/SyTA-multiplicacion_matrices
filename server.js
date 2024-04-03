const express = require("express");
const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname)));
app.use(express.json());

app.post("/multiplicar", (req, res) => {
  const matriz1 = req.body.matriz1;
  const matriz2 = req.body.matriz2;

  // Verificar si las dimensiones de las matrices son válidas para la multiplicación
  if (matriz1[0].length !== matriz2.length) {
    return res.status(400).json({
      error:
        "Las dimensiones de las matrices no son compatibles para la multiplicación.",
    });
  }

  // Lógica para multiplicar las matrices
  const resultado = multiplicarMatrices(matriz1, matriz2);

  res.json({ resultado: resultado });
});

function multiplicarMatrices(matriz1, matriz2) {
  const filas1 = matriz1.length;
  const columnas1 = matriz1[0].length;
  const filas2 = matriz2.length;
  const columnas2 = matriz2[0].length;

  const resultado = [];
  for (let i = 0; i < filas1; i++) {
    resultado[i] = [];
    for (let j = 0; j < columnas2; j++) {
      resultado[i][j] = 0;
      for (let k = 0; k < columnas1; k++) {
        resultado[i][j] += matriz1[i][k] * matriz2[k][j];
      }
    }
  }
  return resultado;
}

app.listen(3000, () => {
  console.log("Servidor escuchando en el puerto 3000");
});
