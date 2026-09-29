import express from 'express';
import compression from 'compression';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(compression());

app.get('/download-zip', (req, res) => {
  const zipPath = path.join(__dirname, 'geo-saude-sorocaba.zip');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.download(zipPath, 'geo-saude-sorocaba.zip', (err) => {
    if (err) {
      res.status(404).send('Arquivo zip não encontrado.');
    }
  });
});

app.get('/geo-saude-sorocaba.zip', (req, res) => {
  const zipPath = path.join(__dirname, 'geo-saude-sorocaba.zip');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.download(zipPath, 'geo-saude-sorocaba.zip', (err) => {
    if (err) {
      res.status(404).send('Arquivo zip não encontrado.');
    }
  });
});

app.use(express.static(__dirname));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${PORT}`);
});
