// Supabase-Client initialisieren
const { createClient } = supabase;

// Ersetze diese Variablen durch deine Supabase-URL und den öffentlichen API-Schlüssel
const SUPABASE_URL = 'https://kkkjznjllahgsvidwpax.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtra2p6bmpsbGFoZ3N2aWR3cGF4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxOTQ4OTU3OCwiZXhwIjoyMDM1MDY1NTc4fQ.Jkck7tio8KYyEdLxE4833XHQAFqpS_ld5_uD9mTfSnU';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Funktion zum Abrufen der Daten
async function fetchData() {
  try {
    const { data, error } = await supabase
      .from('sensor-data')  // Ersetze 'sensor-data' durch den Namen deiner Tabelle
      .select('temperatur');  // Wähle die Spalte 'temperatur' aus

    if (error) {
      throw error;
    } else {
      const container = document.getElementById('data-container');
      container.innerHTML = '';  // Container leeren

      data.forEach(item => {
        const div = document.createElement('div');
        div.textContent = JSON.stringify(item, null, 2);  // Daten als JSON-String anzeigen, formatiert
        container.appendChild(div);
      });
    }
  } catch (error) {
    console.error('Fehler beim Abrufen der Daten:', error.message);
  }
}

// Daten abrufen, wenn die Seite geladen wird
document.addEventListener('DOMContentLoaded', fetchData);