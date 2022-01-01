const express = require('express')
const router = express.Router()
const connectionRequest = require('../connectionRequest')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

router.get('/employees', function (req, res, next) {
  res.render('employees');
});

router.get('/factures', function (req, res, next) {
  res.render('factures');
});

// this script to fetch data from MySQL databse table
router.get('/delegations', function (req, res, next) {
  const sql = 'SELECT * FROM delegations';
  connection = connectionRequest()
  connection.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render('delegations', {
      userData: data
    });
  });
});

// this script to fetch data from MySQL databse table
router.get('/contractors', function (req, res, next) {
  const sql = 'SELECT * FROM contractors ORDER BY name ASC';
  connection = connectionRequest()
  connection.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render('contractors', {
      userData: data
    });
  });
});

router.post('/insert', function (req, res) {
  connection = connectionRequest()
  connection.query(
    "INSERT INTO contractors (nip, regon, name, isVat, street, house, flat) VALUES (?, ?, ?, ?, ?, ?, ?);",
    [
      req.body.nip,
      req.body.regon,
      req.body.name,
      req.body.isVat,
      req.body.street,
      req.body.house,
      req.body.flat,
    ], 
    function (err, data, fields) {
      if (err) {
        res.status(400).send()
        throw err;
    }
    res.status(200).send()
  });
});

router.post('/delete', function (req, res) {
  connection = connectionRequest()
  connection.query("UPDATE contractors SET deleted=1 WHERE id=?;",
    [
      req.body.id
    ], 
    function (err, data, fields) {
      if (err) {
        res.status(400).send()
        throw err;
    }
    res.status(200).send()
  });
});

router.post('/edit', function (req, res) {
  connection = connectionRequest()
  connection.query(
    "UPDATE contractors SET nip=?, regon=?, name=?, isVat=?, street=?, house=?, flat=? WHERE id=?", 
    [
      req.body.nip,
      req.body.regon,
      req.body.name,
      req.body.isVat,
      req.body.street,
      req.body.house,
      req.body.flat,
      req.body.id,
    ], 
    function (err, data, fields) {
      if (err) {
        res.status(400).send()
        throw err;
    }
    res.status(200).send()
  });
});

module.exports = router;