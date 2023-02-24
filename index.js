// import { express } from "express";
const express = require('express');
const path = require("path");
const bodyParser = require('body-parser');
const app = express();
const port = 3007;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.redirect("/store");
})

app.get('/admin', (req, res) => {
  res.sendFile("admin/admin.html", {
    root: path.join(__dirname, 'public'),
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    },
  });
})

// app.get('/api/getAll', (req, res) => {
//
// })
//
// app.post('/api/create', (req, res) => {
//
// })

app.get('/store', (req, res) => {
  res.sendFile("store/store.html", {
    root: path.join(__dirname, 'public'),
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    },
  });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})


