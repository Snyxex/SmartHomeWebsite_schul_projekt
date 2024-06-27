const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Statische Dateien aus dem "public"-Verzeichnis bereitstellen
app.use(express.static(path.join(__dirname, 'public')));

// Route für die Hauptseite
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Server starten
app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});


// Supabase-Client initialisieren
const { createClient } = supabase;

// Ersetze diese Variablen durch deine Supabase-URL und den öffentlichen API-Schlüssel
const SUPABASE_URL = 'https://kkkjznjllahgsvidwpax.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtra2p6bmpsbGFoZ3N2aWR3cGF4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxOTQ4OTU3OCwiZXhwIjoyMDM1MDY1NTc4fQ.Jkck7tio8KYyEdLxE4833XHQAFqpS_ld5_uD9mTfSnU';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Funktion zum Abrufen der Daten
// Funktion zum Abrufen der Daten aus der Datenbank
async function fetchData() {
  try {
      const { data: sensorData, error } = await supabase
          .from('sensor-data')
          .select('date', 'temperature', 'humidity');

      if (error) {
          throw error;
      }

      return sensorData;
  } catch (error) {
      console.error('Fehler beim Abrufen der Daten:', error.message);
      return [];
  }
}
async function updateChart() {
  try {
      const data = await fetchData(); // Aufruf der fetchData-Funktion
      // Restliche Logik zur Verarbeitung der Daten und Aktualisierung des Diagramms
  } catch (error) {
      console.error('Fehler beim Aktualisieren des Diagramms:', error.message);
  }
}


// Daten abrufen, wenn die Seite geladen wird
document.addEventListener('DOMContentLoaded', fetchData);
