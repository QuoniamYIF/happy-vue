// dao/userDao.js
// 实现与MySQL交互
var mysql = require('mysql');
var $conf = require('../conf/db');
var $sql = require('./Mapping');
 
 console.log($sql.queryAll)
// 向前台返回JSON方法的简单封装
var jsonWrite = function (res, ret) {
	if(typeof ret === 'undefined') {
		res.json({
			code:'1',
			msg: '操作失败'
		});
	} else {
		res.json(ret);
	}
};
 
module.exports = {
    //事件配置queryAll
	ecqa: function (req, res, next) {		
        var connection = mysql.createConnection($conf.mysql);
        connection.connect();
        connection.query($sql.evntCnfig.queryAll, function(err, result) {
            jsonWrite(res, result);
        });
	},
    //风控事件规则参数queryAll
    rpqa: function (req, res, next) {		
        var connection = mysql.createConnection($conf.mysql);
        connection.connect();
        connection.query($sql.rskPara.queryAll, function(err, result) {
            jsonWrite(res, result);
        });
	},
    //风控事件规则参数更新
    rpud: function (req, res, next) {		
        var connection = mysql.createConnection($conf.mysql);
        connection.connect();
        connection.query($sql.rskPara.update, function(err, result) {
            // jsonWrite(res, result);
            console.log(result)
        });
	},
    //规则结果queryAll
    rsqa: function(req, res, next) {
        var connection = mysql.createConnection($conf.mysql);
        connection.connect();
        connection.query($sql.rleCRst.queryAll, function(err, result) {
            jsonWrite(res, result);
        });
    },
    //=============================================================================================
    rsqqa: function(req, res, next) {
        var connection = mysql.createConnection($conf.mysql);
        connection.connect();
        connection.query($sql.rleCRSql.queryAll, function(err, result) {
            jsonWrite(res, result);
        });
    },
    //规则结果SQL语句queryById cmp(计算日期) ruleSetId(规则集标识码) ruleId(规则标识码) cmpBatNo(计算批次号)
    rsqqd: function(req, res, next) {
        var connection = mysql.createConnection($conf.mysql);

        var q = req.query;
        var ruleSetId = +q.ruleSetId;
        var ruleId = +q.ruleId;

        connection.connect();
        connection.query($sql.rleCRSql.queryById, [q.cmpDte, ruleSetId, ruleId, q.cmpBatNo], function(err, result) {
            jsonWrite(res, result);
        });
    },
    //=============================================================================================

    //=============================================================================================    
    rstqa: function(req, res, next) {
        var connection = mysql.createConnection($conf.mysql);
        connection.connect();
        connection.query($sql.rleCRT.queryAll, function(err, result) {
            jsonWrite(res, result);
        });
    },
    //规则结果明细queryBy cmpDte(计算日期) ruleSetId(规则集标识码) ruleId(规则标识码) cmpBatNo(计算批次号) ruleBelongType(规则归属类型) rstBelongTo(结果归属物)
    rstqd: function(req, res, next) {
        var connection = mysql.createConnection($conf.mysql);
        connection.connect();

        var q = req.query;
        var ruleSetId = +q.ruleSetId;
        var ruleId = +q.ruleId;
        
        connection.query($sql.rleCRT.queryById, [q.cmpDte, ruleSetId, ruleId, q.cmpBatNo, q.ruleBelongType, q.rstBelongTo], function(err, result) {
            jsonWrite(res, result);
        });
    },
    //=============================================================================================
    
    //=============================================================================================    
    rstqqa: function(req, res, next) {
        var connection = mysql.createConnection($conf.mysql);
        connection.connect();
        connection.query($sql.rleCRTSql.queryAll, function(err, result) {
            jsonWrite(res, result);
        });
    },
    //规则结果明细SQL语句queryBy cmp(计算日期) ruleSetId(规则集标识码) ruleId(规则标识码) cmpBatNo(计算批次号)
    rstqqd: function(req, res, next) {
        var connection = mysql.createConnection($conf.mysql);
        connection.connect();

        var q = req.query;
        var ruleSetId = +q.ruleSetId;
        var ruleId = +q.ruleId;

        connection.query($sql.rleCRTSql.queryById, [q.cmpDte, ruleSetId, ruleId, q.cmpBatNo], function(err, result) {
            jsonWrite(res, result);
        });
    },
    //=============================================================================================
    
}