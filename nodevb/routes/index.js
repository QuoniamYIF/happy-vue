var express = require('express');
var router = express.Router();
var userDao = require('../dao/userDao');

//==============GET home page=================
router.get('/', function (req, res, next) {
	res.render('index.html', {
		title: 'Express'
	});
});
//==============GET home page END=================
//===================GET======================

//============================================
router.get('/menu', function (req, res, next) {
	userDao.menu(req, res, next);
});
//============================================

//============================================
router.get('/ecqa', function (req, res, next) {
	userDao.ecqa(req, res, next);
});
router.get('/ecqa/delete/:id', function (req, res, next) {
	//console.log(req.body)
	res.json({
		code: '1',
		msg: '操作成功'
    })
	//userDao.rpud(req, res, next);
});
//============================================

//============================================
router.get('/epcqa', function (req, res, next) {
	userDao.epcqa(req, res, next);
});

router.get('/epcqa/search', function (req, res, next) {
	userDao.epcqd(req, res, next);
});
//============================================

//============================================
router.get('/rlcqa', function (req, res, next) {
	userDao.rlcqa(req, res, next);
});
//============================================

//============================================
router.get('/rlpcqa', function (req, res, next) {
	userDao.rlpcqa(req, res, next);
});

router.get('/rlpcqa/search', function (req, res, next) {
	userDao.rlpcqd(req, res, next);
});
//============================================

//============================================
router.get('/rpqa', function (req, res, next) {
	console.log(req.body)
	userDao.rpqa(req, res, next);
});
//============================================

//============================================
router.get('/rsqa', function (req, res, next) {
	userDao.rsqa(req, res, next);
});

router.get('/rsqqa', function (req, res, next) {
	userDao.rsqqa(req, res, next);
});
router.get('/rsqqa/search', function (req, res, next) {
	userDao.rsqqd(req, res, next);
});

router.get('/rstqa', function (req, res, next) {
	userDao.rstqa(req, res, next);
});

router.get('/rstqa/search', function (req, res, next) {
	userDao.rstqd(req, res, next);
});

router.get('/rstqqa', function (req, res, next) {
	userDao.rstqqa(req, res, next);
});

router.get('/rstqqa/search', function (req, res, next) {
	userDao.rstqqd(req, res, next);
});
//============================================

//===================GET END======================



//===================POST=========================
router.post('/rpqa', function (req, res, next) {
	console.log(req.body)
	userDao.rpadd(req, res, next);
});
router.post('/rpqa/:id', function (req, res, next) {
	console.log(req.body)
	userDao.rpud(req, res, next);
});
router.post('/ecqa', function (req, res, next) {
	//console.log(req.body)
	res.json({
		code: '1',
		msg: '操作成功'
    })
	//userDao.rpud(req, res, next);
});
router.post('/ecqa/:id', function (req, res, next) {
	//console.log(req.body)
	res.json({
		code: '1',
		msg: '操作成功'
    })
	//userDao.rpud(req, res, next);
});
router.post('/epcqa', function (req, res, next) {
	console.log(req.body)
	res.json({
		code: '1',
		msg: '操作成功'
    })
	//userDao.epcqa(req, res, next);
});
router.post('/rpqa/delete/:id', function(req, res, next){
	console.log("啦啦啦")
	console.log(req.body)	
	userDao.rpdelete(req, res, next);
})

// router.get('/', function(req, res, next) {
// 	userDao.rpqa(req, res, next);
// });
//===================POST END=========================

module.exports = router;