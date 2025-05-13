/* const canvas = document.getElementById('voltageChart');
const ctx = canvas.getContext('2d');
let voltageChart = null;

let lastVoltage = 0;
let lastTau = 1;

function generateChargeData(V, R, C) {
  const tau = R * C;
  const labels = [];
  const data = [];
  const dt = 0.1;
  const tMax = 5 * tau;

  for (let t = 0; t <= tMax; t += dt) {
    const Vc = V * (1 - Math.exp(-t / tau));
    data.push(Vc.toFixed(2));
    labels.push(t.toFixed(2));
  }

  lastVoltage = V;     // Guardamos voltaje para descarga
  lastTau = tau;       // Guardamos τ para descarga
  return { labels, data, maxVoltage: V };
}

function generateDischargeData(V0, tau) {
  const labels = [];
  const data = [];
  const dt = 0.1;
  const tMax = 5 * tau;

  for (let t = 0; t <= tMax; t += dt) {
    const Vc = V0 * Math.exp(-t / tau);
    data.push(Vc.toFixed(2));
    labels.push(t.toFixed(2));
  }

  return { labels, data, maxVoltage: V0 };
}

function updateChart(labels, data, maxV, labelText) {
  if (voltageChart) {
    voltageChart.data.labels = labels;
    voltageChart.data.datasets[0].label = labelText;
    voltageChart.data.datasets[0].data = data;
    voltageChart.options.scales.y.suggestedMax = maxV;
    voltageChart.update();
  } else {
    voltageChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: labelText,
          data: data,
          borderColor: 'blue',
          fill: false
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Tiempo (s)'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Voltaje (V)'
            },
            suggestedMin: 0,
            suggestedMax: maxV
          }
        }
      }
    });
  }
}

document.getElementById('startBtn').addEventListener('click', () => {
  const V = parseFloat(document.getElementById('voltage').value);
  const R = parseFloat(document.getElementById('resistance').value);
  const C = parseFloat(document.getElementById('capacitance').value) * 1e-6;

  const { labels, data, maxVoltage } = generateChargeData(V, R, C);
  updateChart(labels, data, maxVoltage, 'Carga del Capacitor');
});

document.getElementById('dischargeBtn').addEventListener('click', () => {
  const { labels, data, maxVoltage } = generateDischargeData(lastVoltage, lastTau);
  updateChart(labels, data, maxVoltage, 'Descarga del Capacitor');
});
 */