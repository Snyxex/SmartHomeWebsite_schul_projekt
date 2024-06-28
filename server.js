
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const { createClient } = require('@supabase/supabase-js');


const supabaseUrl = 'https://kkkjznjllahgsvidwpax.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtra2p6bmpsbGFoZ3N2aWR3cGF4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxOTQ4OTU3OCwiZXhwIjoyMDM1MDY1NTc4fQ.Jkck7tio8KYyEdLxE4833XHQAFqpS_ld5_uD9mTfSnU';
const supabase = createClient(supabaseUrl, supabaseKey);



// Statische Dateien aus dem "public"-Verzeichnis bereitstellen
app.use(express.static(path.join(__dirname, 'public')));

// Route für die Hauptseite
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Funktion zum Abrufen der Daten aus der Datenbank
async function fetchData() {
  try {
    const { data: sensorData, error } = await supabase
      .from('sensor_data')
      .select('temperatur');

    if (error) {
      throw error;
    }

    return sensorData;
  } catch (error) {
    console.error('Fehler beim Abrufen der Daten:', error.message);
    return [];
  }
}

// Add this route to server.js to handle fetching data
app.get('/fetch-data', async (req, res) => {
  try {
    const data = await fetchData();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data' });
  }
});

// Server starten
app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
