// script.js

// Elementos del DOM
const canvas = document.getElementById('circuitCanvas');
const ctx = canvas.getContext('2d');
const switchBtn = document.getElementById('switch');
const voltageInput = document.getElementById('voltage');
const resistanceInput = document.getElementById('resistance');
const capacitanceInput = document.getElementById('capacitance');

// Estado del circuito
let isCharging = true;
let switchClosed = false;
let voltage = 5;
let resistance = 1000;
let capacitance = 0.001;
let time = 0;
let maxTime = 5;
let electrons = [];
let animationId = null;

// Inicializar electrones
for (let i = 0; i < 10; i++) {
  electrons.push({ x: 60 + i * 20, y: 150 });
}

// Manejar interruptor gráfico
switchBtn.addEventListener('click', () => {
  switchClosed = !switchClosed;
  switchBtn.textContent = switchClosed ? '🔴 Apagar' : '🟢 Encender';
  time = 0;
});

// Actualizar parámetros al cambiar inputs
voltageInput.addEventListener('input', updateParameters);
resistanceInput.addEventListener('input', updateParameters);
capacitanceInput.addEventListener('input', updateParameters);

// Función para actualizar los valores
function updateParameters() {
  voltage = Math.max(0.1, parseFloat(voltageInput.value) || 0.1);
  resistance = Math.max(1, parseFloat(resistanceInput.value) || 1);
  capacitance = Math.max(0.000001, parseFloat(capacitanceInput.value) || 0.000001);
  maxTime = 5 * resistance * capacitance;
}

// Dibuja el circuito básico
function drawCircuit() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Líneas de conexión
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(50, 150);
  ctx.lineTo(250, 150); // parte superior
  ctx.lineTo(250, 100); // hacia arriba
  ctx.moveTo(250, 200);
  ctx.lineTo(250, 150);
  ctx.lineTo(450, 150);
  ctx.stroke();

  // Batería
  ctx.fillStyle = '#555';
  ctx.fillRect(250, 95, 10, 10);
  ctx.fillRect(250, 195, 10, 10);

  // Capacitor
  ctx.beginPath();
  ctx.moveTo(350, 140);
  ctx.lineTo(350, 160);
  ctx.moveTo(370, 140);
  ctx.lineTo(370, 160);
  ctx.stroke();

  // Interruptor (cerrado o abierto)
  ctx.strokeStyle = '#000';
  ctx.beginPath();
  ctx.moveTo(240, 150);
  if (switchClosed) {
    ctx.lineTo(250, 150);
  } else {
    ctx.lineTo(245, 140);
  }
  ctx.stroke();

  // Voltímetro
  ctx.beginPath();
  ctx.arc(310, 150, 20, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.font = '12px Arial';
  ctx.fillText('V', 305, 155);
}

// Simula voltímetro basado en ecuaciones físicas
function drawVoltmeterNeedle(voltageValue) {
  const centerX = 310;
  const centerY = 150;
  const radius = 15;
  const maxAngle = Math.PI / 2; // 90°
  const angle = (voltageValue / voltage) * maxAngle;

  const x = centerX + radius * Math.cos(Math.PI - angle);
  const y = centerY - radius * Math.sin(Math.PI - angle);

  // Aguja
  ctx.strokeStyle = 'red';
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.lineTo(x, y);
  ctx.stroke();

  // Mostrar valor numérico
  ctx.fillStyle = '#000';
  ctx.font = '12px Arial';
  ctx.fillText(`${voltageValue.toFixed(2)} V`, 285, 180);
}

// Dibuja electrones moviéndose por el cable
function drawElectrons() {
  ctx.fillStyle = 'blue';
  for (let e of electrons) {
    ctx.beginPath();
    ctx.arc(e.x, e.y, 5, 0, 2 * Math.PI);
    ctx.fill();
  }
}

// Actualiza posiciones de los electrones
function updateElectrons(speed) {
  for (let e of electrons) {
    e.x += speed;
    if (e.x > 450) e.x = 50;
  }
}

// Calcula el voltaje en el capacitor con base en si está cargando o descargando
function getCapacitorVoltage() {
  const tau = resistance * capacitance;
  if (isCharging) {
    return voltage * (1 - Math.exp(-time / tau));
  } else {
    return voltage * Math.exp(-time / tau);
  }
}

// Bucle de animación principal
function animate() {
  updateParameters();

  drawCircuit();
  const vCap = switchClosed ? getCapacitorVoltage() : 0;
  drawVoltmeterNeedle(vCap);
  drawElectrons();

  if (switchClosed) {
    const tau = resistance * capacitance;
    const speed = 1 + 4 * (vCap / voltage);
    updateElectrons(speed);
    time += 0.05 * tau;
  }

  animationId = requestAnimationFrame(animate);
}

// Iniciar animación
animate();
