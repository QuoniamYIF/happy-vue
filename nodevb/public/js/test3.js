Vue.component('evt', {
    template: '#evt',
    props: {
        apiUrl: String,
    },
    data: function () {
        return {
            epcurl: String,
            rspaurl: 'rpqa',
            ec_edit_post_url: 'http://localhost:3000/ecqa/',
            ec_add_post_url: 'http://localhost:3000/ecqa',
            evntId: Number,
            rspar: null,
            inputBoxType: 1
        }
    },
    computed: {
        paramSelect: function () {
            var temp = ''
            for (item of this.rspar) {
                var ipttype = '';
                var number = item['inputType'];
                // console.log(item['name'])
                // console.log(item['chnName'])
                // console.log(item['inputType'])

                switch (number) {
                    case 0:
                        ipttype = '文本'
                        break;
                    case 1:
                        ipttype = '机构单选+文本'
                        break;
                    case 2:
                        ipttype = '机构多选+文本'
                        break;
                    case 3:
                        ipttype = '日期+文本'
                        break;
                    case 4:
                        ipttype = '下拉列表单选+文本'
                        break;
                    case 5:
                        ipttype = '下拉列表多选+文本'
                        break;
                }
                temp += item['paramId'] + ':' + item['name'] + '-' + item['chnName'] + '(' + item['inputType'] + ':' + ipttype + ')' + ';'
            }
            temp += '4:TX_STATUS1';
            return temp;
        },
        paramType: function () {
            if (this.inputBoxType == 1) {
                return '机构单选+文本'
            }
            if (this.inputBoxType == 4) {
                return '下拉列表单选+文本'
            }
            if (this.inputBoxType == 5) {
                return '下拉列表多选+文本'
            }
        }
    },
    methods: {
        inputControl: function () {
            var setting = {
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
                    onClick: onClick
                }
            };

            var zNodes = [{
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
            }, {
                id: 4,
                pId: 0,
                name: "河北省",
                open: true
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
                open: true
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
                open: true
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

            $(document).ready(function () {
                $.fn.zTree.init($("#treeDemo"), setting, zNodes);
            });
        },
        errorHandle: function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else {
                console.log('Error', error.message);
            }
        },
        showChildGrid: function (parentRowID, parentRowKey) {
            var self = this

            //console.log("id:" + parentRowID);
            //console.log(parentRowKey);
            axios
            .get(this.apiUrl)
            .then(function (response) {
                $("#" + parentRowID)
                .append('<p>溯源SQL</p>')
                .append('<pre>' + response.data[parentRowKey - 1]["traceSql"] + '</pre>')
                .append('<p>聚合SQL</p>')
                .append('<pre>' + response.data[parentRowKey - 1]["assembleSql"] + '</pre>')
            })
            .catch(function (err) {
                if (err)
                    self.errorHandle(err)
            })
        },
        createurl: function (elements) {
            var initepcurl = 'epcqa/search?';
            var temp = '';
            temp += ('evntId=' + $(elements[1]).text())
            this.epcurl = initepcurl + temp;
        },
        customButtonClicked: function () {
            $('#trimodalll').trigger('click')
        },
        
        fetchRelaEVar: function () {
            var self = this;
            
            var template = ''+
                '<div class="col-md-12" id="paraDetails" style="margin-top: 20px">'+
                    '<table id="jqGrid1" style="width:100%"></table>'+
                    '<div id="jqGridPager1"></div>'+
                '</div>';

            $("#paraDetails").remove();
            $('#event').append(template);

            $("#jqGrid1").jqGrid({
                url: self.epcurl,
                editurl: '/rpqa',
                datatype: "json",
                caption: '事件基本参数内容配置',
                colModel: [
                    {
                        label: '参数名称',
                        edittype: 'select',
                        name: 'paraN',
                        editable: true,
                        editoptions: {
                            value: self.paramSelect,
                            dataEvents: [{
                                type: 'change',
                                fn: function (e) {
                                    var ele = e
                                    var template = ''
                                    var eleId = $(e.target).attr('id');
                                    var eleRowId = $(e.target).attr('rowid');

                                    var pre = '<input type="text" role="textbox" class="citySel editable inline-edit-cell form-control" style="width: 96%;"  readonly ';
                                    id = "1_paraV"
                                    name = "paraV"
                                    rowid = "1"
                                    var eleId = 'id=' + $(e.target).attr("id"); + ' ';
                                    var eleName = 'name="paraV"' + ' ';
                                    var eleRowId = 'rowid=' + $(e.target).attr('rowid') + ' ';
                                    var last = 'onclick="toggleMenu()"/>'
                                    //var value = ''
                                    var inputtemplate = pre + eleId + eleName + eleRowId + last;
                                    var divtemplate = '' +
                                        '<div id="menuContent" class="menuContent">'+
                                        '<ul id="treeDemo" class="ztree" style="margin-top:0; width:160px;"></ul>'+
                                        '</div>'

                                    $('#' + ele.target.id).parent().next().children().remove();
                                    $('#' + ele.target.id).parent().next().append(inputtemplate).append(divtemplate);

                                    self.inputControl();
                                    //var selText = $('#' + e.target.id + '>option:selected').text();
                                    //var temp = selText.split('(');
                                    //console.log(temp);
                                    //var seltype = +temp[1][0];
                                    //self.inputBoxType = seltype;                                
                                    // if(self.inputBoxType == 1){
                                    //     modalcontent = ''
                                    //     +'<form role="form" id="paramform">'                                        
                                    //         +'<label class="radio-inline">'
                                    //         +'<input type="radio" name="inlineRadioOptions" id="inlineRadio1" value="机构1"> 机构1'
                                    //         +'</label>'                                      
                                    //         +'<label class="radio-inline">'
                                    //         +'<input type="radio" name="inlineRadioOptions" id="inlineRadio2" value="机构2"> 机构2'
                                    //         +'</label>'                                                                                                                                  
                                    //         +'<label class="radio-inline">'
                                    //         +'<input type="radio" name="inlineRadioOptions" id="inlineRadio3" value="机构3"> 机构3'
                                    //         +'</label>'                                                                                
                                    //         +'<label class="sr-only" for="text">文本</label>'
                                    //         +'<textarea id="text" name="paramtext" class="form-control" rows="3"></textarea>'                                        
                                    //     +'</form>'
                                    // }                                

                                    // var template = modalPre + temp[0] + modalMiddle + modalcontent + modalLast;
                                    // $('#myModal').children().remove();
                                    // $('#myModal').append(template)                                

                                    // $('#trimodalll').trigger("click");

                                    // $('#paramcontent').click(function(e){
                                    //     //alert($('#paramform').serialize());
                                    //     var r = $('[name=inlineRadioOptions]:checked').val()
                                    //     var t = $('[name=paramtext]').val()
                                    //     console.log(t)       
                                    //     value = r + t   
                                    //     console.log(value)                                               

                                    //     inputtemplate = pre + 'value=' + value + '>'
                                    //     $('#' + ele.target.id).parent().next().children().remove();
                                    //     $('#' + ele.target.id).parent().next().append(inputtemplate);                
                                    // })                             

                                    //var pre = '<td role="gridcell" style="" title="" aria-describedby="jqGrid1_paraV">'



                                    //console.log($('#' + e.target.id).parent().next())
                                    //console.log('inputBoxType:' + self.inputBoxType)
                                    //console.log('paramType:' + self.paramType)
                                    //console.log($('#' + e.target.id + '>option:selected').text()); 
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
                            keys: true,
                            onEdit: function(param1,param2,param3){
                                // console.log('iddddddddd:' + param1)
                                // console.log('iddddddddd:' + param2)
                                // console.log('iddddddddd:' + param3)
                                
                                console.log("我正在被编辑")
                            },
                            afterSave: function(param1,param2,param3){
                                // console.log('iddddddddd1:' + param1)
                                // console.log('iddddddddd1:' + param2)
                                // console.log('iddddddddd1:' + param3)
                                console.log("我被保存了")
                                //console.log($('#jqGrid1').jqGrid('editRow', "1", {keys: true, focusField: 2, url: 'http://localhost:3000/rpqa', mtype: 'POST'}))         
                            },                      
                        }
                    }
                ],
                onSelectRow: function(id) {
                    console.log(id)
                },
                sortname: 'EmployeeID',
                loadonce: true,
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

            $('#jqGrid1').inlineNav('#jqGridPager1', {
                edit: false,
                add: true,
                del: false,
                cancel: true,
                search: false,                
                addParams: {
                    keys: true,
                    //rowID
                },
                editParams: {
                    // keys: true,
                    // "url": "http://localhost:3000/rpqa",                 
                    // "mtype" : "POST",
                    // "aftersavefunc": function() {
                    //     consoel.log("我被调用了")
                        
                    // },
                    // "errorfunc": function(){
                    //     console.log("cuoleeeeeeeeeeeee")                    
                    // }
                    keys: true,
                    url: "http://localhost:3000/rpqa",                 
                    
                    
                }
            });

            $('#jqGrid1').navButtonAdd('#jqGridPager1', {
                buttonicon: "ui-icon-mail-closed",
                title: "添加新参数",
                caption: "添加新参数",
                position: "last",
                onClickButton: self.customButtonClicked
            });
        },
        
        fetchData: function () {
            var self = this;

            $(document).ready(function () {
                $("#jqGrid").jqGrid({
                    url: self.apiUrl,
                    datatype: "json",
                    caption: "事件配置表",
                    colModel: [
                        {
                            name: 'evntId',
                            label: '事件ID',
                            hidden: true,
                        }, {
                            name: 'evntNo',
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
                            name: 'chnName',
                            label: '事件中文名称',
                            editable: true,
                            edittype: 'text',
                            formoptions: {
                                colpos: 2, // the position of the column
                                rowpos: 1, // the position of the row
                                label: "事件中文名称" // the label to show for each input control                                                    
                            }
                        }, {
                            name: 'evntCatlog',
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
                            name: 'evntType',
                            label: '事件类型',
                            width: 130,
                            editable: true,
                            formoptions: {
                                colpos: 1,
                                rowpos: 2,
                                label: "事件类型"
                            }
                        }, {
                            name: 'evntCmpPeriod',
                            label: '事件计算周期',
                            editable: true,
                            formoptions: {
                                colpos: 2,
                                rowpos: 2,
                                label: "事件计算周期"
                            }
                        }, {
                            name: 'evntDmType',
                            label: '事件维度类型',
                            editable: true,
                            formoptions: {
                                colpos: 3,
                                rowpos: 2,
                                label: "事件维度类型"
                            }
                        }, {
                            name: 'evntFormulaDes',
                            label: '事件计算公式描述',
                            width: 200,
                            editable: true,
                            formoptions: {
                                colpos: 1,
                                rowpos: 3,
                                label: "事件计算公式描述"
                            }
                        }, {
                            name: 'assembleSql',
                            label: '聚合SQL',
                            width: 130,
                            editable: true,
                            edittype: 'textarea',
                            editoptions: {
                                rows: "10",
                                cols: "13"
                            }
                        }, {
                            name: 'traceSql',
                            label: '溯源SQL',
                            width: 130,
                            editable: true,
                            edittype: 'textarea',
                            editoptions: {
                                rows: "10",
                                cols: "13"
                            }
                        }, {
                            name: 'memoDes',
                            label: '备注',
                            width: 90,
                            editable: true,
                            formoptions: {
                                colpos: 2,
                                rowpos: 3,
                                label: "备注"
                            }
                        }
                    ],
                    onSelectRow: function (id) {
                        //createurl用来获取事件参数变量的url
                        self.evntId = +$($('#' + id).children()[1]).text()
                        self.createurl($('#' + id).children());
                        self.fetchRelaEVar();
                    },
                    loadComplete: function () {
                        axios
                        .get(self.rspaurl)
                        .then(function (response) {
                            self.rspar = response.data;
                        })
                        .catch(function (error) {
                            self.errorHandle(error);
                        });
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
        }
    },
    created: function () {
        console.log("我被创建了");
        this.fetchData();
    }
});

new Vue({
    el: '#et'
})