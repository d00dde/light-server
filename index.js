// import { express } from "express";
const express = require('express');
const path = require("path");
const fs = require("fs");
const bodyParser = require('body-parser');
const app = express();
const port = 3007;

const SERVER_LAG = 1000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.redirect("/store");
});

app.get('/admin', (req, res) => {
  res.sendFile("admin/admin.html", {
    root: path.join(__dirname, 'public'),
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    },
  });
});


app.get('/store', (req, res) => {
  res.sendFile("store/store.html", {
    root: path.join(__dirname, 'public'),
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    },
  });
});

app.get('/api/getAll', (req, res) => {
  fs.readFile(path.join(__dirname, 'database'), 'utf8',(err, json) => {
    const data = JSON.parse(json);
    setTimeout(() => {
      res.json(data);
    }, SERVER_LAG)
  });
});

app.post('/api/create', async (req, res) => {
  const { body } = req;
  const newItem = {
    id: Date.now(),
    text: body.text,
    title: body.title,
  };
  await fs.readFile(path.join(__dirname, 'database'), 'utf8',async (err, json) => {
    const data = JSON.parse(json);
    data.push(newItem);
    await fs.writeFile(path.join(__dirname, 'database'), JSON.stringify(data), () => {});
    setTimeout(() => {
      res.send("Ok");
    }, SERVER_LAG);
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


