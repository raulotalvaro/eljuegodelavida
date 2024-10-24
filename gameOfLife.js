// Tamaño de la cuadrícula
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const cellSize = 10;
const rows = 60;
const cols = 60;
canvas.width = cols * cellSize;
canvas.height = rows * cellSize;
const matriz = [];
// Estado actual de la cuadrícula
let grid = createGrid();
// Crea la cuadrícula inicial (aleatoriamente)
function createGrid() {
    // Crear la matriz llena de ceros
    
    for (let i = 0; i < rows; i++) {
      const fila = new Array(cols).fill(0); // Crear una fila llena de ceros
      matriz.push(fila);
    }
    i=0;
    return matriz;
}









// Dibuja la cuadrícula
function drawGrid() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      ctx.fillStyle = grid[row][col] === 1 ? 'black' : 'white';
      ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);

      // Agregar el borde visible para las celdas blancas
      if(!grid[row][col])grid[row][col]=0;
      if (grid[row][col] === 0) {
        ctx.strokeStyle = 'gray'; // Color del borde
        ctx.lineWidth = 1; // Grosor del borde
        ctx.strokeRect(col * cellSize, row * cellSize, cellSize, cellSize);
      }
    }
  }
}
// Calcula la próxima generación de la cuadrícula
function nextGeneration() {
  const newGrid = grid.map(arr => [...arr]);
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const neighbors = countNeighbors(row, col);
      const cell = grid[row][col];

      // Aplicar las reglas del juego de la vida
      if (cell === 1 && (neighbors < 2 || neighbors > 3)) {
        newGrid[row][col] = 0; // Muere por soledad o sobrepoblación
      } else if (cell === 0 && neighbors === 3) {
        newGrid[row][col] = 1; // Nace una nueva célula
      }
    }
  }
  grid = newGrid;
}

// Cuenta los vecinos vivos alrededor de una célula
function countNeighbors(row, col) {
  let count = 0;
  
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue; // No contar la célula actual

      const newRow = row + i;
      const newCol = col + j;

      // Verificar que las coordenadas estén dentro de los límites de la matriz
      if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
        count += grid[newRow][newCol]; // Sumar solo si está dentro de los límites
      }
    }
  }

  return count;
}

// Bucle del juego
function gameLoop() { //si llamo esta se hace en un ciclo infinito
  drawGrid();
  nextGeneration();
  requestAnimationFrame(gameLoop);
}

// Manejar el clic en el canvas
canvas.addEventListener('click', (event) => {
  const rect = canvas.getBoundingClientRect(); // Obtener el tamaño del canvas
  const x = event.clientX - rect.left; // Posición del mouse en relación al canvas
  const y = event.clientY - rect.top;

  const col = Math.floor(x / cellSize); // Calcular la columna
  const row = Math.floor(y / cellSize); // Calcular la fila

  // Verificar si el clic está dentro de los límites de la cuadrícula
  if (row >= 0 && row < rows && col >= 0 && col < cols) {
      console.log(`Posición del mouse: Fila ${row}, Columna ${col}`);
      matriz[row][col]=1;
      drawGrid();
return;
  }

  // Iniciar el bucle del juego si no está en ejecución
  
});

 function iniciar(){
    if (!isRunning) {
      gameLoop();
      isRunning = true; // Estado de ejecución del juego
  }
 }
 function parar(){
  location.reload();
 }
 function paso(){
  nextGeneration();
  drawGrid();
 }


// Dibuja la cuadrícula inicial
drawGrid();
let isRunning = false; // Estado del juego