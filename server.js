const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const jsonFilePath = path.join(__dirname, 'data.json');

const readJsonFile = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(jsonFilePath, 'utf8', (err, data) => {
      if (err) {
        return reject(err);
      }
      resolve(JSON.parse(data));
    });
  });
};

const writeJsonFile = (data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(jsonFilePath, JSON.stringify(data, null, 2), (err) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
};

app.get('/data', async (req, res) => {
  try {
    const data = await readJsonFile();  
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при чтении файла' });
  }
});

app.patch('/data', async (req, res) => {
  try {
    const data = await readJsonFile();
    const updatedItem = req.body;

    const tableItems = data.tables.tableOne.items;
    const itemIndex = tableItems.findIndex(item => item.id === updatedItem.id);

    if (itemIndex !== -1) {
      Object.assign(tableItems[itemIndex], updatedItem);

      await writeJsonFile(data);

      res.json(tableItems[itemIndex]);
    } else {
      res.status(404).json({ error: 'Элемент не найден' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при обновлении файла' });
  }
});

app.listen(3000, () => {
  console.log('Сервер запущен на http://localhost:3000');
});
