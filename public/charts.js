// HTML und Chart.js Einbindung
const ctx = document.getElementById('myChart').getContext('2d');
let myChart; // Variable für das Chart-Objekt

// Funktion zum Aktualisieren des Diagramms mit neuen Daten
async function updateChart() {
    const data = await fetchData(); // Daten aus der Datenbank abrufen

    // Aufbereitung der Daten für das Diagramm
    const labels = data.map(entry => entry.date); // Beispiel: Datum als Label
    const temperatureData = data.map(entry => entry.temperature); // Temperaturdaten
    const humidityData = data.map(entry => entry.humidity); // Luftfeuchtigkeitsdaten

    // Chart.js-Datensätze aktualisieren
    if (myChart) {
        myChart.data.labels = labels;
        myChart.data.datasets[0].data = temperatureData;
        myChart.data.datasets[1].data = humidityData;
        myChart.update(); // Diagramm aktualisieren
    } else {
        myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Temperatur',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                    data: temperatureData
                }, {
                    label: 'Luftfeuchtigkeit',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                    data: humidityData
                }]
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
}

// Daten abrufen und Diagramm aktualisieren, wenn die Seite geladen wird
document.addEventListener('DOMContentLoaded', updateChart);
