document.addEventListener('DOMContentLoaded', fetchData);

async function fetchData() {
  try {
    const response = await fetch('/fetch-data');
    const data = await response.json();
    console.log('Fetched data:', data);
    updateChart(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function updateChart(data) {
  const ctx = document.getElementById('myChart').getContext('2d');

  // Extract labels, temperature, and humidity from the fetched data
  const labels = data.map(item => item.date);
  const temperatureData = data.map(item => item.temperature);


  // Chart.js datasets
  const temperatureDataset = {
    label: 'Temperatur',
    data: temperatureData,
    backgroundColor: 'rgba(255, 99, 132, 0.2)', // Hintergrundfarbe der Balken
    borderColor: 'rgba(255, 99, 132, 1)', // Randfarbe der Balken
    borderWidth: 1
  };

  // Initialize Chart.js
  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [temperatureDataset]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}
