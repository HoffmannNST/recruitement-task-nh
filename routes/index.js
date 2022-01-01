const express = require("express")
const router = express.Router()
const connectionRequest = require("../connectionRequest")

router.get("/", function (req, res) {
  res.render("index")
})

router.get("/employees", function (req, res) {
  res.render("employees")
})

router.get("/factures", function (req, res) {
  res.render("factures")
})

router.get("/delegations", function (req, res) {
  const sql = "SELECT * FROM delegations";
  connection = connectionRequest()
  connection.query(sql, function (err, data) {
    if (err) throw err
    res.render("delegations", {
      userData: data
    })
  })
})

router.get("/contractors", function (req, res) {
  const sql = "SELECT * FROM contractors ORDER BY name ASC";
  connection = connectionRequest()
  connection.query(sql, function (err, data) {
    if (err) throw err
    res.render("contractors", {
      userData: data
    })
  })
})

router.post("/insert", function (req, res) {
  connection = connectionRequest()
  const {nip, regon, name, isVat, street, house, flat} = req.body
  connection.query(
      "INSERT INTO contractors (nip, regon, name, isVat, street, house, flat) VALUES (?, ?, ?, ?, ?, ?, ?);", 
      [
        nip,
        regon,
        name,
        isVat,
        street,
        house,
        flat,
      ],
    function (err) {
      if (err) {
        res.status(400).send()
        throw err
      }
      res.status(200).send()
    })
})

router.post("/delete", function (req, res) {
  connection = connectionRequest()
  const {id} = req.body
  connection.query(
      "UPDATE contractors SET deleted=1 WHERE id=?;", 
      [
        id,
      ], 
    function (err) {
      if (err) {
        res.status(400).send()
        throw err
      }
      res.status(200).send()
    })
})

router.post("/edit", function (req, res) {
  connection = connectionRequest()
  const {nip, regon, name, isVat, street, house, flat, id} = req.body
  connection.query(
      "UPDATE contractors SET nip=?, regon=?, name=?, isVat=?, street=?, house=?, flat=? WHERE id=?", 
      [
        nip,
        regon,
        name,
        isVat,
        street,
        house,
        flat,
        id,
      ], 
      function (err, data, fields) {
        if (err) {
          res.status(400).send()
          throw err;
      }
      res.status(200).send()
    })
})

module.exports = router