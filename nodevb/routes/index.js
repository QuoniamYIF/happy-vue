var express = require('express');
var router = express.Router();
var userDao = require('../dao/userDao');

//==============GET home page=================
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
//==============GET home page END=================

//===================GET======================

//

//============================================
router.get('/menu', function(req, res, next) {
	userDao.menu(req, res, next);
});
//============================================

//============================================
router.get('/ecqa', function(req, res, next) {
	userDao.ecqa(req, res, next);
});
//============================================

//============================================
router.get('/rpqa', function(req, res, next) {
	userDao.rpqa(req, res, next);
});
//============================================

//============================================
router.get('/rsqa', function(req, res, next) {
	userDao.rsqa(req, res, next);
});

router.get('/rsqqa', function(req, res, next) {
	userDao.rsqqa(req, res, next);
});
router.get('/rsqqa/search', function(req, res, next) {
	userDao.rsqqd(req, res, next);
});

router.get('/rstqa', function(req, res, next) {
	userDao.rstqa(req, res, next);
});

router.get('/rstqa/search', function(req, res, next) {
	userDao.rstqd(req, res, next);
});

router.get('/rstqqa', function(req, res, next) {
	userDao.rstqqa(req, res, next);
});

router.get('/rstqqa/search', function(req, res, next) {
	userDao.rstqqd(req, res, next);
});
//============================================

//===================GET END======================



//===================POST=========================
router.post('/rpqa', function(req, res, next) {
  userDao.rpud(req, res, next);
});

// router.get('/', function(req, res, next) {
// 	userDao.rpqa(req, res, next);
// });
//===================POST END=========================

module.exports = router;
