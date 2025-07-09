var express = require('express');
var router = express.Router();
const CgespService = require('../services/CGESP/index.service');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/cgesp/alagamentos', async function(req, res, next) {
  const { date } = req.query;
  console.log('cgesp', date);
  const cgespService = new CgespService(date);
  await cgespService.scrapper();
  res.json(cgespService.getObject());
});

module.exports = router;
