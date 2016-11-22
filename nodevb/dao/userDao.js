// dao/userDao.js
// 实现与MySQL交互
var mysql = require('mysql');
var $conf = require('../conf/db');
var $sql = require('./Mapping');

console.log($sql.queryAll)
    // 向前台返回JSON方法的简单封装
var jsonWrite = function (res, ret) {
    if (typeof ret === 'undefined') {
        res.json({
            code: '1',
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};

module.exports = {
    menu: function (req, res, next) {
        var connection = mysql.createConnection($conf.mysql);
        connection.connect();
        connection.query($sql.menu.queryAll, [6, 1], function (err, result) {
            jsonWrite(res, result);
        });
    },
    //规则配置
    rlcqa: function (req, res, next) {
        var connection = mysql.createConnection($conf.mysql);
        connection.connect();
        connection.query($sql.rleCnfig.queryAll, function (err, result) {
            jsonWrite(res, result);
        });
    },
    //规则基本参数配置
    rlpcqa: function (req, res, next) {
        var connection = mysql.createConnection($conf.mysql);
        connection.connect();
        connection.query($sql.rlePaC.queryAll, function (err, result) {
            jsonWrite(res, result);
        });
    },
    rlpcqd: function (req, res, next) {
        var connection = mysql.createConnection($conf.mysql);

        var q = req.query;
        var id = +q.ruleId;

        connection.connect();
        connection.query($sql.rlePaC.queryById, id, function (err, result) {
            jsonWrite(res, result);
        });
    },

    //事件配置queryAll
    ecqa: function (req, res, next) {
        var connection = mysql.createConnection($conf.mysql);
        connection.connect();
        connection.query($sql.evntCnfig.queryAll, function (err, result) {
            jsonWrite(res, result);
        });
    },
    //事件基本参数配置
    epcqa: function (req, res, next) {
        var connection = mysql.createConnection($conf.mysql);
        connection.connect();
        connection.query($sql.evntPC.queryAll, function (err, result) {
            jsonWrite(res, result);
        });
    },
    epcqd: function (req, res, next) {
        var connection = mysql.createConnection($conf.mysql);
        connection.connect();

        var q = req.query;
        var evntId = +q.evntId;

        // console.log(evntId)

        connection.query($sql.evntPC.queryById, evntId, function (err, result) {

            var item = JSON.parse(JSON.stringify(result))[0]['paramCntConf']
            var nitem = JSON.parse(item)

            var tempO = { "rows" : []}
            

            // console.log(nitem)
            // for(var i = 0;i < nitem.length;i ++) {
            //     tempO['rows'][i] = {} 
            // }

            var ar = [];
            var temp = {};

            
            for(var i = 0;i < nitem.length;i ++) {
                var key = Object.keys(nitem[i]);
                console.log('key值：' + key)
                temp['paraN'] = key[0]              
                temp['paraV'] = nitem[i][key];
                ar.push(temp);
                temp = {}
            }
            tempO['rows'] = ar
            ar = [];

            console.log(tempO)

            // for(var i = 0;i < nitem.length;i ++) {
            //     tempO['rows'][i]['paramN']
            // }

            // paramN

            // paramV
            
            

            jsonWrite(res, tempO);
        });
    },
    //风控事件规则参数queryAll
    rpqa: function (req, res, next) {
        var connection = mysql.createConnection($conf.mysql);
        connection.connect();
        connection.query($sql.rskPara.queryAll, function (err, result) {
            jsonWrite(res, result);            
        });
    },
    rpadd: function (req, res, next) {
        var connection = mysql.createConnection($conf.mysql);
        connection.connect();
        //console.log(req.body)
        console.log(req.body.name)
        connection.query($sql.rskPara.insert, [req.body.name, req.body.chnName], function (err, result) {
            jsonWrite(res, result);            
        });
    },
    rpdelete: function(req, res, next) {
        var connection = mysql.createConnection($conf.mysql);
        connection.connect();
        console.log(+req.params.id);
        
        connection.query($sql.rskPara.delete, +req.params.id, function (err, result) {
            jsonWrite(res, result);            
        });
    },
    //风控事件规则参数更新
    rpud: function (req, res, next) {
        var connection = mysql.createConnection($conf.mysql);
        connection.connect();

        var temp = [];
        console.log(req.body);
        
        for(item in req.body) {
            temp.push(req.body[item])                                
        }
        temp.pop()
        temp.push(+req.params.id)
        var ooo = [2,3,4,5,7,8,9,11];
        for(var i = 0;i < ooo.length;i ++){
            temp[ooo[i]] = +temp[ooo[i]]
        }
        //console.log(temp)
        //console.log("999:" + temp[9]);

        
        //temp[2],temp[3],temp[4],temp[5],temp[6],temp[7],temp[8],temp[9],temp[10],temp[11],
        connection.query($sql.rskPara.update, [temp[0], temp[1], temp[2], temp[3], temp[4], temp[5], temp[6], temp[7], temp[8], temp[10], temp[11], temp[12]], function (err, result) {
            jsonWrite(res, result);
            //console.log('localhost:3000/r.html')
        });
    },
    //规则结果queryAll
    rsqa: function (req, res, next) {
        var connection = mysql.createConnection($conf.mysql);
        connection.connect();
        connection.query($sql.rleCRst.queryAll, function (err, result) {
            console.log(result)
            jsonWrite(res, result);
        });
    },
    //=============================================================================================
    rsqqa: function (req, res, next) {
        var connection = mysql.createConnection($conf.mysql);
        connection.connect();
        connection.query($sql.rleCRSql.queryAll, function (err, result) {
            jsonWrite(res, result);
        });
    },
    //规则结果SQL语句queryById cmp(计算日期) ruleSetId(规则集标识码) ruleId(规则标识码) cmpBatNo(计算批次号)
    rsqqd: function (req, res, next) {
        var connection = mysql.createConnection($conf.mysql);

        var q = req.query;
        var ruleSetId = +q.ruleSetId;
        var ruleId = +q.ruleId;

        connection.connect();
        connection.query($sql.rleCRSql.queryById, [q.cmpDte, ruleSetId, ruleId, q.cmpBatNo], function (err, result) {
            jsonWrite(res, result);
        });
    },
    //=============================================================================================

    //=============================================================================================    
    rstqa: function (req, res, next) {
        var connection = mysql.createConnection($conf.mysql);
        connection.connect();
        connection.query($sql.rleCRT.queryAll, function (err, result) {
            jsonWrite(res, result);
        });
    },
    //规则结果明细queryBy cmpDte(计算日期) ruleSetId(规则集标识码) ruleId(规则标识码) cmpBatNo(计算批次号) ruleBelongType(规则归属类型) rstBelongTo(结果归属物)
    rstqd: function (req, res, next) {
        var connection = mysql.createConnection($conf.mysql);
        connection.connect();

        var q = req.query;
        var ruleSetId = +q.ruleSetId;
        var ruleId = +q.ruleId;

        connection.query($sql.rleCRT.queryById, [q.cmpDte, ruleSetId, ruleId, q.cmpBatNo, q.ruleBelongType, q.rstBelongTo], function (err, result) {
            jsonWrite(res, result);
        });
    },
    //=============================================================================================

    //=============================================================================================    
    rstqqa: function (req, res, next) {
        var connection = mysql.createConnection($conf.mysql);
        connection.connect();
        connection.query($sql.rleCRTSql.queryAll, function (err, result) {
            jsonWrite(res, result);
        });
    },
    //规则结果明细SQL语句queryBy cmp(计算日期) ruleSetId(规则集标识码) ruleId(规则标识码) cmpBatNo(计算批次号)
    rstqqd: function (req, res, next) {
        var connection = mysql.createConnection($conf.mysql);
        connection.connect();

        var q = req.query;
        var ruleSetId = +q.ruleSetId;
        var ruleId = +q.ruleId;

        connection.query($sql.rleCRTSql.queryById, [q.cmpDte, ruleSetId, ruleId, q.cmpBatNo], function (err, result) {
            jsonWrite(res, result);
        });
    },
    //=============================================================================================

}