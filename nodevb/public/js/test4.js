var treenodeidpolyFill;
var data_user = {   
    _userid:"C4CA4238A0B923820DCC509A6F75849B",
    _token:"c985c27f3e7f809be7390d892abb939c",
    comTyp: "",     
};
var rskurl = 'http://192.168.17.34:8080/banking-console/aSelectOptBpCodeProcess.json';

function beforeClick(treeId, treeNode) {
    //console.log(treeId)
    var zTree = $.fn.zTree.getZTreeObj("treeDemo" + treenodeidpolyFill);
    zTree.checkNode(treeNode, !treeNode.checked, null, true);
    return false;
}

function onClick(e, treeId, treeNode) {
    //console.log(treeId)
    var zTree = $.fn.zTree.getZTreeObj("treeDemo" + treenodeidpolyFill);
    zTree.checkNode(treeNode, !treeNode.checked, null, true);
    return false;
}

function onCheck(e, treeId, treeNode) {
    //console.log(treeId)

    var zTree = $.fn.zTree.getZTreeObj("treeDemo" + treenodeidpolyFill),
        nodes = zTree.getCheckedNodes(true),
        v = "";
    for (var i = 0, l = nodes.length; i < l; i++) {
        v += nodes[i].name + ",";
    }
    if (v.length > 0) v = v.substring(0, v.length - 1);
    var cityObj = $(".citySel" + treenodeidpolyFill);
    cityObj.attr("value", v);
}

function showMenu(c) {
    //console.log("啦啦啦" + idE)
    var cityObj = $(".citySel" + treenodeidpolyFill);
    var cityOffset = $(".citySel" + treenodeidpolyFill).offset();
    $(".menuContent" + c).css({
        left: cityOffset.left + "px",
        top: cityOffset.top + cityObj.outerHeight() + "px"
    }).slideDown("fast");
    //$("body").bind("mousedown", onBodyDown);
}

function hideMenu(c) {
    //console.log("略略略" + idE)            
    $(".menuContent" + c).fadeOut("fast");
    //$("body").unbind("mousedown", onBodyDown);
}

var toggle = new Array(10000)

for (var i = 0; i < toggle.length; i++) {
    toggle[i] = false
    toggle['jqg' + i] = false
}

function toggleMenu(c) {
    //test = OtoggleMenu(c)
    if (toggle[c]) {
        showMenu(c);
        toggle[c] = false;
    } else {
        console.log("我被隐藏了")
        hideMenu(c);
        toggle[c] = true;
    }
}

var Evtcf = function () {
    this.apiUrl = 'http://localhost:3000/ecqa';
    this.rspaurl = 'http://localhost:3000/rpqa';
    this.ec_edit_post_url = 'http://localhost:3000/ecqa';
    this.ec_add_post_url = 'http://localhost:3000/ecqa';
    this.evntType = this.getData({
        type: 'GET',
        url: this.rspaurl,
        data: data_user,
        searchWord: 'inputType'
    });
    console.log(this.evntType)
}

//type, data, url, searchWord

Evtcf.prototype.getData = function(obj) {
    // axios
    // .post(url)
    obj.data['comTyp'] = obj.searchWord;

    $.ajax({
        method: obj.type || 'GET',
        url: obj.url,
        data: obj.data || '',
        success: function(response) {
            console.log(response)
        },
        error: function(error) {
            console.log(error)
        }
    })

    //return data
}

Evtcf.prototype.inputControl = function (seltype, rowid) {
    var setting;
    var zNodes;

    //console.log(epcId)

    if (seltype == 1 || seltype == 4) {
        setting = {
            check: {
                enable: true,
                chkStyle: "radio",
                radioType: "all"
            },
            view: {
                dblClickExpand: false
            },
            data: {
                simpleData: {
                    enable: true
                }
            },
            callback: {
                onClick: onClick,
                onCheck: onCheck
            }
        };
    }

    if (seltype == 2 || seltype == 5) {
        setting = {
            check: {
                enable: true,
                chkboxType: {
                    "Y": "",
                    "N": ""
                }
            },
            view: {
                dblClickExpand: false
            },
            data: {
                simpleData: {
                    enable: true
                }
            },
            callback: {
                beforeClick: beforeClick,
                onCheck: onCheck
            }
        };
    }


    if (seltype == 1 || seltype == 2) {
        zNodes = [{
            id: 1,
            pId: 0,
            name: "北京",
        }, {
            id: 2,
            pId: 0,
            name: "天津"
        }, {
            id: 3,
            pId: 0,
            name: "上海"
        }, {
            id: 6,
            pId: 0,
            name: "重庆"
        }, {
            id: 4,
            pId: 0,
            name: "河北省",
            open: true,
            nocheck: true
        }, {
            id: 41,
            pId: 4,
            name: "石家庄"
        }, {
            id: 42,
            pId: 4,
            name: "保定"
        }, {
            id: 43,
            pId: 4,
            name: "邯郸"
        }, {
            id: 44,
            pId: 4,
            name: "承德"
        }, {
            id: 5,
            pId: 0,
            name: "广东省",
            open: true,
            nocheck: true
        }, {
            id: 51,
            pId: 5,
            name: "广州"
        }, {
            id: 52,
            pId: 5,
            name: "深圳"
        }, {
            id: 53,
            pId: 5,
            name: "东莞"
        }, {
            id: 54,
            pId: 5,
            name: "佛山"
        }, {
            id: 6,
            pId: 0,
            name: "福建省",
            open: true,
            nocheck: true
        }, {
            id: 61,
            pId: 6,
            name: "福州"
        }, {
            id: 62,
            pId: 6,
            name: "厦门"
        }, {
            id: 63,
            pId: 6,
            name: "泉州"
        }, {
            id: 64,
            pId: 6,
            name: "三明"
        }];
    }

    if (seltype == 4 || seltype == 5) {
        zNodes = [{
            id: 1,
            pId: 0,
            name: "北京"
        }, {
            id: 2,
            pId: 0,
            name: "天津"
        }, {
            id: 3,
            pId: 0,
            name: "上海"
        }, {
            id: 6,
            pId: 0,
            name: "重庆"
        }]
    }

    $(document).ready(function () {
        if (seltype != 3 && seltype != 0) {
            $.fn.zTree.init($("#treeDemo" + rowid), setting, zNodes);
        }

        if (seltype == 3) {
            $('.epcDateSelect').datepicker({
                language: "zh-CN",
                format: "yyyy-mm-dd",
                autoclose: true,
                todayHighlight: true
            });
        }
    });
};
Evtcf.prototype.showChildGrid = function (parentRowID, parentRowKey) {

    // axios
    // .get(self.apiUrl)
    // .then(function (response) {
    //     console.log(response)
    //     $("#" + parentRowID)
    //     .append('<p>溯源SQL</p>')
    //     .append('<pre>' + response.data[parentRowKey - 1]["tracesql"] + '</pre>')
    //     .append('<p>聚合SQL</p>')
    //     .append('<pre>' + response.data[parentRowKey - 1]["assemblesql"] + '</pre>')
    // })
    // .catch(function (err) {
    //     if (err)
    //         self.errorHandle(err)
    // })

    $.ajax({
        method: 'GET',
        url: self.apiUrl,
        //data: obj.data || '',
        success: function(response) {
            //console.log(response)
            $("#" + parentRowID)
            .append('<p>溯源SQL</p>')
            .append('<pre>' + response[parentRowKey - 1]["tracesql"] + '</pre>')
            .append('<p>聚合SQL</p>')
            .append('<pre>' + response[parentRowKey - 1]["assemblesql"] + '</pre>')
        },
        error: function(error) {
            // if(error)
            //     self.errorHandle(error);
            console.log(error)                    
        }
    })
};
Evtcf.prototype.createurl = function (elements) {
    var initepcurl = 'epcqa/search?';
    var temp = '';
    temp += ('evntid=' + $(elements[1]).text())
    self.epcurl = initepcurl + temp;

    // axios
    // .get(self.epcurl)
    // .then(function (response) {
    //     console.log(response.data['rows'].length)
    // })
    // .catch(function (err) {
    //     if (err) {
    //         self.errorHandle(err)
    //     }
    // })
};
Evtcf.prototype.fetchRelaEVar = function () {

    var template = '' +
        '<div class="col-md-12" id="paraDetails" style="margin-top: 20px">' +
        '<table id="jqGrid1" style="width:100%"></table>' +
        '<div id="jqGridPager1"></div>' +
        '</div>';

    $("#paraDetails").remove();
    $('#event').append(template);

    $("#jqGrid1").jqGrid({
        url: self.epcurl,
        editurl: self.epcurl,
        datatype: "json",
        caption: '事件基本参数内容配置',
        colModel: [{
            label: '参数名称',
            edittype: 'select',
            name: 'paraN',
            editable: true,
            editoptions: {
                value: (function () {
                    return self.paramSelect
                })(),
                dataEvents: [{
                    type: 'click',
                    fn: function (e) {
                        console.log("11111")
                        treenodeidpolyFill = $(e.target).attr('rowid');
                        var ele = e
                        var selText = $('#' + e.target.id + '>option:selected').text();
                        var temp = selText.split('(');
                        var seltype = +temp[1][0];
                        //self.currentType = seltype;
                        var template = ''
                        var readonly = ''
                        var lastS = ''

                        var prefirst = '<input value="" type="text" role="textbox" class="'
                        var premiddle = ''
                        if (seltype == 3) {
                            premiddle = 'epcDateSelect citySel editable inline-edit-cell form-control'
                        } else {
                            premiddle = 'citySel editable inline-edit-cell form-control'
                        }
                        var prelast = '" style="width: 96%;" ';
                        var eleId = 'id="' + $(e.target).attr("id") + '_input" ';
                        var eleName = 'name="' + self.epcRowId + '_' + 'paraV"' + ' ';
                        var eleRowId = 'rowid="' + $(e.target).attr('rowid') + '" ';
                        var last = '/>'

                        // var text = OtoggleMenu($(e.target).attr('rowid'))
                        // console.log(text)
                        var divtemplate = ''
                        if (seltype == 1 || seltype == 2 || seltype == 4 || seltype == 5) {
                            var rowid = $(e.target).attr('rowid') + ''
                            readonly = 'readonly '
                            lastS = 'onclick="toggleMenu(\'' + rowid + '\'' + ')"'
                            premiddle = 'citySel' + treenodeidpolyFill + ' editable inline-edit-cell form-control'
                            divtemplate = '' +
                                '<div class="menuContent menuContent' + rowid + '">' +
                                '<ul id="treeDemo' + treenodeidpolyFill + '" class="ztree" style="margin-top:0; width:160px;"></ul>' +
                                '</div>'
                        }
                        //console.log("下拉列表点击事件执行")
                        var inputtemplate = prefirst + premiddle + prelast + readonly + eleId + eleName + eleRowId + lastS + last;
                        //console.log(inputtemplate)
                        //console.log(divtemplate)


                        $('#' + ele.target.id).parent().next().children().remove();
                        $('#' + ele.target.id).parent().next().append(inputtemplate).append(divtemplate);
                        //console.log(ele.target.id)
                        self.inputControl(seltype, $(e.target).attr("rowid"));
                        //console.log(self.epcRowId)
                        $('#' + self.epcRowId + '_paraN' + '_input').trigger('click')
                    }
                }]
            }
        }, {
            label: '参数值',
            name: 'paraV',
            editable: true
        }, {
            label: "编辑选项",
            name: "actions",
            width: 100,
            formatter: "actions",
            formatoptions: {
                url: 'http://localhost:3000/epcqa',
                mtype: 'POST',
                delOptions: {
                    url: 'http://localhost:3000/rpqa/delete/1',
                    mtype: 'POST'
                }
            }
        }],
        onSelectRow: function (id, status, e) {
            var clickeditseltype;
            //console.log($("#" + id))
            // console.log(id)  
            // console.log(e)                                      
            self.epcRowId = id
            // console.log("wobeidianjile")
            //console.log($(e.target))
            //console.log($(e.target).attr('class'))
            if (e) {
                //console.log("EEEEEEE")
                if ($(e.target).attr('class') == 'glyphicon glyphicon-edit') {
                    //console.log($(e.target).length);
                    var ELE = $($(e.target).parent().parent().parent().parent()).children()[0];
                    var ELE1 = $($(e.target).parent().parent().parent().parent()).children()[1];
                    //console.log(ELE1)
                    var currentParName = $(ELE).attr('title').split('-')[0]
                        //console.log(currentParName)
                        //onsole.log(currentParName)
                    self.whichisorarechecked = $($($(e.target).parent().parent().parent().parent()).children()[1]).attr('title').split(",")
                        //currentType
                        //console.log(self.whichisorarechecked)
                    for (item of self.rspar) {
                        if (item['name'] == currentParName) {
                            clickeditseltype = item['inputtype']
                        }
                    }
                    var ELETitle = currentParName.split('-')[0]
                    var ELEId = $($(ELE).children()[0]).attr('id')
                    $('#' + ELEId).trigger('click')
                        //console.log(self.currentType)
                        //console.log("编辑事件执行")
                    if (clickeditseltype != 0 && clickeditseltype != 3) {
                        for (var k = 0; k < self.whichisorarechecked.length; k++) {
                            //console.log(self.whichisorarechecked[k])
                            $($(ELE1).children()[1]).find('[title=' + self.whichisorarechecked[k] + ']').trigger('click')
                        }
                        //console.log($(ELE1).children()[1])                        
                    }


                    //console.log(ELEId)
                    //console.log(self.currentType)

                    if (clickeditseltype == 0 || clickeditseltype == 3) {
                        $('input[name=' + self.epcRowId + '_paraV]').val($($($(e.target).parent().parent().parent().parent()).children()[1]).attr('title'))
                    }
                }

                if( $(e.target).attr('class') == 'glyphicon glyphicon-save') {
                    console.log("保存!!!!!!")
                    //console.log($("#jqGrid1").jqGrid('getRowData'))
                    console.log($("#jqGrid1").jqGrid('getGridParam'));
                }
            } else {
                console.log(self.epcRowId)
                //$('#jEditButton_' + self.epcRowId).trigger('click')
                $('#' + self.epcRowId + '_paraN').trigger('click')
                $('#jEditButton_' + self.epcRowId).trigger('click')
            }
        },
        sortname: 'EmployeeID',
        //loadonce: true,
        width: 1110,
        height: 350,
        rowNum: 150,
        pager: "#jqGridPager1"
    });

    $('#jqGrid1').navGrid("#jqGridPager1", {
        edit: false,
        search: false,
        add: false,
        del: false,
        refresh: false,
        view: false,
        position: "right"
    });

    $('#jqGrid1').navButtonAdd('#jqGridPager1', {
        buttonicon: "glyphicon-plus",
        title: "添加新参数",
        caption: "添加新参数",
        position: "last",
        onClickButton: self.customButtonClicked1
    });

    $('#jqGrid1').navButtonAdd('#jqGridPager1', {
        buttonicon: "glyphicon-plus",
        title: "添加新参数变量",
        caption: "添加新参数变量",
        position: "last",
        onClickButton: self.customButtonClicked2
    });
};
Evtcf.prototype.paramSelect = function () {
    var temp = ''
    var length = self.rspar.length

    for (item of self.rspar) {
        var ipttype = '';
        var number = item['inputtype'];

        switch (number) {
            case 0:
                ipttype = '文本'
                break;
            case 1:
                ipttype = '机构单选'
                break;
            case 2:
                ipttype = '机构多选'
                break;
            case 3:
                ipttype = '日期'
                break;
            case 4:
                ipttype = '下拉单选'
                break;
            case 5:
                ipttype = '下拉多选'
                break;
        }
        temp += item['name'] + ':' + item['name'] + '-' + item['chnname'] + '(' + item['inputtype'] + ':' + ipttype + ')' + ';'
    }
    var ntemp = temp.split('')
    ntemp.pop()
    return ntemp.join('')
}
Evtcf.prototype.customButtonClicked1 = function () {
    //console.log("我被执行了");
    //console.log(self.epcParLength)
    //console.log($("#jqGrid1").jqGrid('getRowData'))
    $("#jqGrid1").jqGrid('addRow', {});
};
Evtcf.prototype.customButtonClicked2 = function () {
    $('#trimodalll').trigger('click')
};
Evtcf.prototype.errorHandle = function (error) {
    if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
    } else {
        console.log('Error', error.message);
    }
};

Evtcf.prototype.saveRspa = function () {
    var test = ['name', 'chnname', 'inputtype'];
    var ELE = $('.rlpa');
    var par = {};
    var self = this;
    for (var k = 0; k < ELE.length; k++) {
        par[test[k]] = $(ELE[k]).val()
    }
    console.log(par)
    //console.log($('.rlpa'))
    axios
    .post('http://localhost:3000/rpqa', par)
    .then(function (response) {
        console.log(resposne)
    })
    .catch(function (err) {
        if (err)
            self.errorHandle(err)
    })

    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/rpqa',
        data: par,
        //data: obj.data || '',
        success: function(response) {
        },
        error: function(error) {            
            console.log(error)                    
        }
    })
}

var self = new Evtcf();

$(document).ready(function () {
    $('.evtcfaddRspa').click(self.saveRspa)

    $("#jqGrid").jqGrid({
        url: self.apiUrl,
        datatype: "json",
        caption: "事件配置表",
        colModel: [{
            name: 'evntid',
            label: '事件ID',
            hidden: true,
        }, {
            name: 'evntno',
            label: '事件编号',
            width: 130,
            hidden: true,
            editable: true,
            editrules: {
                edithidden: true
            },
            formoptions: {
                colpos: 1, // the position of the column
                rowpos: 1, // the position of the row
                label: "事件编号" // the label to show for each input control                    
                    //elmsuffix: " * " // the suffix to show after that
            }
        }, {
            name: 'chnname',
            label: '事件中文名称',
            editable: true,
            edittype: 'text',
            formoptions: {
                colpos: 2, // the position of the column
                rowpos: 1, // the position of the row
                label: "事件中文名称" // the label to show for each input control                                                    
            }
        }, {
            name: 'evntcatlog',
            label: '事件大类',
            width: 130,
            edittype: 'text',
            editable: true,
            formoptions: {
                colpos: 3,
                rowpos: 1,
                label: "事件大类"
            }
        }, {
            name: 'evnttype',
            label: '事件类型',
            width: 130,
            editable: true,
            formoptions: {
                colpos: 1,
                rowpos: 2,
                label: "事件类型"
            }
        }, {
            name: 'evntcmpperiod',
            label: '事件计算周期',
            editable: true,
            formoptions: {
                colpos: 2,
                rowpos: 2,
                label: "事件计算周期"
            }
        }, {
            name: 'evntdmtype',
            label: '事件维度类型',
            editable: true,
            formoptions: {
                colpos: 3,
                rowpos: 2,
                label: "事件维度类型"
            }
        }, {
            name: 'evntformulades',
            label: '事件计算公式描述',
            width: 200,
            editable: true,
            formoptions: {
                colpos: 1,
                rowpos: 3,
                label: "事件计算公式描述"
            }
        }, {
            name: 'assemblesql',
            label: '聚合SQL',
            width: 130,
            editable: true,
            edittype: 'textarea',
            editoptions: {
                rows: "10",
                cols: "13"
            }
        }, {
            name: 'tracesql',
            label: '溯源SQL',
            width: 130,
            editable: true,
            edittype: 'textarea',
            editoptions: {
                rows: "10",
                cols: "13"
            }
        }, {
            name: 'memodes',
            label: '备注',
            width: 90,
            editable: true,
            formoptions: {
                colpos: 2,
                rowpos: 3,
                label: "备注"
            }
        }],
        onSelectRow: function (id) {
            //createurl用来获取事件参数变量的url
            self.evntId = +$($('#' + id).children()[1]).text()
            self.createurl($('#' + id).children());
            self.fetchRelaEVar();
        },
        loadComplete: function () {
            // axios
            //     .get(self.rspaurl)
            //     .then(function (response) {
            //         self.rspar = response.data;
            //         console.log(self.rspar)
            //     })
            //     .catch(function (error) {
            //         self.errorHandle(error);
            //     });

            $.ajax({
                method: 'GET',
                url: self.rspaurl,
                //data: obj.data || '',
                success: function(response) {
                    self.rspar = response
                },
                error: function(error) {
                    // if(error)
                    //     self.errorHandle(error);
                    console.log(error)                    
                }
            })
        },
        colMenu: true,
        viewrecords: true,
        subGrid: true,
        subGridRowExpanded: self.showChildGrid,
        width: 1110,
        height: 350,
        rowNum: 10,
        pager: "#jqGridPager"
    });

    $('#jqGrid').navGrid('#jqGridPager', {
        edit: true,
        add: true,
        del: true,
        search: false,
        refresh: false,
        position: "left",
    }, {
        editCaption: "编辑事件",
        width: 1000,
        left: 50,
        top: 50,
        url: self.ec_edit_post_url + self.evntId,
        mtype: 'POST',
        //checkOnSubmit: true,     
        //checkOnUpdate: true,
        closeAfterEdit: true,
        afterShowForm: function () {
            $($('[rowpos=8]').children()[1]).attr('colspan', 8)
            $($('[rowpos=9]').children()[1]).attr('colspan', 8)
            $($($('[rowpos=8]').children()[1]).children()[0]).attr('cols', 130)
            $($($('[rowpos=9]').children()[1]).children()[0]).attr('cols', 130)
        },
        afterSubmit: function (res, postdata) {
            console.log(res.responseText)
                //return [true, "错误"]                        
            return [false, "错误"]
        }
    }, {
        addCaption: "添加事件",
        width: 1000,
        left: 50,
        top: 50,
        url: self.ec_add_post_url,
        mtype: 'POST',
        //checkOnSubmit: true,
        //checkOnUpdate: true,
        //topinfo: '对事件进行详细配置',    
        closeAfterAdd: true,

        afterSubmit: function (res, postdata) {
            console.log(res.responseText)
            return [true, "错误"]
                //return [false, "错误"]
        },
        afterShowForm: function () {
            $($('[rowpos=8]').children()[1]).attr('colspan', 8)
            $($('[rowpos=9]').children()[1]).attr('colspan', 8)
            $($($('[rowpos=8]').children()[1]).children()[0]).attr('cols', 130)
            $($($('[rowpos=9]').children()[1]).children()[0]).attr('cols', 130)
        }
    }, {
        caption: "删除事件",
        msg: "你确定要删除这条事件吗？",
        width: 300,
        top: 200,
        left: 450,
        url: self.ec_edit_post_url + 'delete/' + self.evntId,
        mtype: 'GET',
        afterSubmit: function (res, postdata) {
            console.log(res.responseText)
            return [true, "错误"]
                //return [false, "错误"]
        }
    });
});