function createMatrixInputs() {
  const rows1 = parseInt(document.getElementById("rows1").value);
  const cols1 = parseInt(document.getElementById("cols1").value);
  const rows2 = parseInt(document.getElementById("rows2").value);
  const cols2 = parseInt(document.getElementById("cols2").value);

  const matrixInputs = document.getElementById("matrixInputs");
  matrixInputs.innerHTML = "";

  if (isNaN(rows1) || isNaN(cols1) || isNaN(rows2) || isNaN(cols2)) {
    alert("Please enter valid numbers for rows and columns.");
    return;
  }

  const matrix1 = document.createElement("div");
  matrix1.innerHTML = "<h3>Matrix 1:</h3>";
  for (let i = 0; i < rows1; i++) {
    for (let j = 0; j < cols1; j++) {
      matrix1.innerHTML += `<input type="number" id="m1_${i}_${j}">`;
    }
    matrix1.innerHTML += "<br>";
  }

  const matrix2 = document.createElement("div");
  matrix2.innerHTML = "<h3>Matrix 2:</h3>";
  for (let i = 0; i < rows2; i++) {
    for (let j = 0; j < cols2; j++) {
      matrix2.innerHTML += `<input type="number" id="m2_${i}_${j}">`;
    }
    matrix2.innerHTML += "<br>";
  }

  matrixInputs.appendChild(matrix1);
  matrixInputs.appendChild(matrix2);
}

function multiplyMatrices() {
  const rows1 = parseInt(document.getElementById("rows1").value);
  const cols1 = parseInt(document.getElementById("cols1").value);
  const rows2 = parseInt(document.getElementById("rows2").value);
  const cols2 = parseInt(document.getElementById("cols2").value);

  if (isNaN(rows1) || isNaN(cols1) || isNaN(rows2) || isNaN(cols2)) {
    alert("Please enter valid numbers for rows and columns.");
    return;
  }

  const matrix1 = [];
  const matrix2 = [];

  for (let i = 0; i < rows1; i++) {
    matrix1[i] = [];
    for (let j = 0; j < cols1; j++) {
      matrix1[i][j] = parseFloat(document.getElementById(`m1_${i}_${j}`).value);
    }
  }

  for (let i = 0; i < rows2; i++) {
    matrix2[i] = [];
    for (let j = 0; j < cols2; j++) {
      matrix2[i][j] = parseFloat(document.getElementById(`m2_${i}_${j}`).value);
    }
  }

  const result = multiply(matrix1, matrix2);
  displayResult(result);
}

function multiply(matrix1, matrix2) {
  const rows1 = matrix1.length;
  const cols1 = matrix1[0].length;
  const rows2 = matrix2.length;
  const cols2 = matrix2[0].length;

  if (cols1 !== rows2) {
    alert(
      "Cannot multiply matrices. Number of columns in Matrix 1 must be equal to the number of rows in Matrix 2."
    );
    return;
  }

  const result = [];
  for (let i = 0; i < rows1; i++) {
    result[i] = [];
    for (let j = 0; j < cols2; j++) {
      result[i][j] = 0;
      for (let k = 0; k < cols1; k++) {
        result[i][j] += matrix1[i][k] * matrix2[k][j];
      }
    }
  }

  return result;
}

function displayResult(result) {
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "<h3>Result Matrix:</h3>";
  result.forEach((row) => {
    resultDiv.innerHTML += row.join(" ") + "<br>";
  });
}
