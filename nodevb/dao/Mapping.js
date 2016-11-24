var rskParaMapping = {
	//, chnName=?, inputType=?
	// insert:'INSERT INTO user(id, name, age) VALUES(0,?,?)',
	//chnName=?, inputType=?, multiSelFlg=?, dataType=?, required=?, defaultValue=?, readOnly=?, minValue=?, maxValue=?, selectContent=?, validFlg=? 
	//, multiSelFlg=?, dataType=?, required=?, defaultValue=?, readOnly=?, minValue=?, selectContent=?, validFlg=? 
	update:'UPDATE rsParamVarDef SET name=?, chnName=?, inputType=? WHERE paramId=?',
	delete: 'delete from rsParamVarDef where paramId=?',
	// queryById: 'select * from user where id=?,',
	insert: 'INSERT INTO rsParamVarDef(name, chnName, inputType) VALUES(?, ?, ?)',
	queryAll: 'select * from rsParamVarDef',
	// update: 'update '
};

var evntCnfigMapping = {
	// insert:'INSERT INTO user(id, name, age) VALUES(0,?,?)',
	// update:'update user set name=?,, age=?, where id=?,',
	// delete: 'delete from user where id=?,',
	// queryById: 'select * from user where id=?,',
	queryAll: 'select * from evntCnfig'
};

var evntParamContentMapping = {
	//......
	queryAll: 'select * from evntParamContent',
	queryById: 'select * from evntParamContent where evntId=?'
};

var ruleCmpRstMapping = {
	queryAll: 'select * from ruleCmpRst',
	queryById: 'select * from ruleCmpRst where ruleRstId=?'
}
//规则计算结果语句表
var ruleCmpRstSqlMapping = {
	queryAll: 'select * from ruleCmpRstSql',
	queryById: 'select * from ruleCmpRstSql where cmpDte=?, and ruleSetId=?, and ruleId=?, and cmpBatNo=?,'
}
//规则计算结果明细表
var ruleCmpRstTraceMapping = {
	queryAll: 'select * from ruleCmpRstTrace',
	queryById: 'select * from ruleCmpRstTrace where cmpDte=?, and ruleSetId=?, and ruleId=?, and cmpBatNo=?, and ruleBelongType=?, and rstBelongTo=?,'
}
//规则计算结果明细语句
var ruleCmpRstTrcSqlMapping = {
	queryAll: 'select * from ruleCmpRstTrcSql',
	queryById: 'select * from ruleCmpRstTrcSql where cmpDte=?, and ruleSetId=?, and ruleId=?, and cmpBatNo=?,'
}

var rbacMenuMapping = {
	queryAll: 'select MENU_ID, PARENT_MENU_ID, URL, IMAGE, MENU_INDEX, GBK_RESOURCE_NAME, BIG5_RESOURCE_NAME, EN_RESOURCE_NAME, OTH_RESOURCE_NAME, PROCESS_ID, ACCESS_LEVEL, REMARK from rbac_menu'
}

var ruleCnfigMapping = {
	queryAll: 'select * from ruleCnfig'
}

var ruleParamContentMapping = {
	queryAll: 'select * from ruleParamContent',
	queryById: 'select * from ruleParamContent where ruleId=?'	
}

 
module.exports = {
    "rskPara": rskParaMapping,
    "evntCnfig": evntCnfigMapping,
	"rleCnfig": ruleCnfigMapping,
	"rlePaC": ruleParamContentMapping,
	"rleCRst": ruleCmpRstMapping,
	"rleCRSql": ruleCmpRstSqlMapping,
	"rleCRT": ruleCmpRstTraceMapping,
	"rleCRTSql": ruleCmpRstTrcSqlMapping,
	"evntPC": evntParamContentMapping,
	"menu": rbacMenuMapping
};