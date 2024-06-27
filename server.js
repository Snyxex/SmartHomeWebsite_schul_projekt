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