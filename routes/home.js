var express = require('express');
var router = express.Router();
var mysql = require('mysql');

conn = mysql.createConnection({
  host: 'localhost',
  user: 'resume',
  password: 'resume',
  database: 'resume'
});

conn.connect();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

router.get('/list', function (req, res) {
  conn.query("SELECT id, name FROM members", function (err, rows, field) {
    res.json(rows);
  });
});

router.get('/member/:memberId', function (req, res) {
  conn.query("SELECT * FROM members WHERE id = ?", [
    req.params.memberId
  ], function (err, rows, field) {
    if (err) {
      res.json({
        err: err.toString()
      });
    } else if (!rows.length) {
      res.json({
        err: 'Not Found.'
      });
    } else {
      res.json({
        err: null,
        member: rows[0]
      });
    }
  });
});

router.post('/create', function (req, res) {
  if (!req.body.name || !req.body.email || !req.body.gender) {
    res.json({
      err: 'invalid parameters'
    });
  } else {
    conn.query("INSERT INTO members (name, email, gender) VALUES (?, ?, ?)", [
      req.body.name,
      req.body.email,
      (req.body.gender === 'male' ? 1 : 0)
    ], function (err, result) {
      if (err) {
        res.json({
          err: err.toString()
        });
      } else {
        res.json({
          err: null,
          id: result.insertId
        });
      }
    });
  }
});

module.exports = router;
