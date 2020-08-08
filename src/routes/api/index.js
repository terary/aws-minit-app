const express = require('express');
const router = express.Router();
const config = require('../../../config');
const AWS = require('aws-sdk');
const meta  = new AWS.MetadataService();


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET users listing. */
router.get('/env', function(req, res, next) {
    res.send(config);
});

router.get('/whoami', function(req, res, next) {
  res.send({'whoami':'Node Script'});
});

router.get('/aws-id', function(req, res, next) {
  meta.request("/latest/meta-data/instance-id", function(err, data){
    if(err) {
      res.send(end);
    }else {
      res.send(data);
    }
  });
});
router.get('/aws', function(req, res, next) {
  meta.request("/latest/meta-data", function(err, data){
    if(err) {
      res.send(end);
    }else {
      res.send(data);
    }
  });
});




module.exports = router;
