Vue.component('evt', {
    template: '#evt',
    props: {
        apiUrl: String,
    },
    data: function () {
        return {
            lastSeId: '',
            currentType: 2,
            currentParValue: Array,
            epcRowId: String,
            //==============================================
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
            var length = this.rspar.length

            for (item of this.rspar) {
                var ipttype = '';
                var number = item['inputType'];

                if(item['inputType'] == this.currentType) {
                    cparamId = item['paramId'];
                    cname = item['name'];
                    cchnName = item['chnName'];
                    cinputType = this.currentType;
                    switch (this.currentType) {
                        case 0:
                            cipttype = '文本'
                            break;
                        case 1:
                            cipttype = '机构单选'
                            break;
                        case 2:
                            cipttype = '机构多选'
                            break;
                        case 3:
                            cipttype = '日期'
                            break;
                        case 4:
                            cipttype = '下拉单选'
                            break;
                        case 5:
                            cipttype = '下拉多选'
                            break;
                    }
                    continue;
                }

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
                //item['paramId']
                temp += item['name'] + ':' + item['name'] + '-' + item['chnName'] + '(' + item['inputType'] + ':' + ipttype + ')' + ';'
            }
            //获取当前值
            //temp += '4:TX_STATUS1';
            //cname + '-' + cchnName + '(' + cinputType + ':' + cipttype + ')' + ';'
            temp += cname + ':' + cname + '-' + cchnName + '(' + cinputType + ':' + cipttype + ')';
            //console.log(this.epcRowId)
            //console.log($('#' + this.epcRowId))
            //console.log($('#' + this.epcRowId).children())
            //console.log(temp)
            return temp;
        }
    },
    methods: {
        inputControl: function (seltype, epcId) {
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
                }, {
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
                    $.fn.zTree.init($("#treeDemo"), setting, zNodes);
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
                        value: (function(){return self.paramSelect})(),
                        dataEvents: [{
                            type: 'click',
                            fn: function (e) {
                                var ele = e
                                var selText = $('#' + e.target.id + '>option:selected').text();
                                var temp = selText.split('(');
                                var seltype = +temp[1][0];
                                //self.currentType = seltype;
                                var template = ''
                                var readonly = ''
                                var lastS = ''

                                var pre = '<input value="" type="text" role="textbox" class="epcDateSelect citySel editable inline-edit-cell form-control" style="width: 96%;" ';
                                var eleId = 'id="' + $(e.target).attr("id") + '" ';
                                var eleName = 'name="' + self.epcRowId + '_' + 'paraV"' + ' ';
                                var eleRowId = 'rowid="' + $(e.target).attr('rowid') + '" ';
                                var last = '/>'

                                // var text = OtoggleMenu($(e.target).attr('rowid'))
                                // console.log(text)

                                if (seltype == 1 || seltype == 2 || seltype == 4 || seltype == 5) {
                                    readonly = 'readonly '
                                    lastS = 'onclick="toggleMenu(' + $(e.target).attr('rowid') + ')"'
                                    //lastS = 'onclick="toggleMenu()"'
                                    
                                }

                                

                                console.log("下拉列表点击事件执行")
                                var inputtemplate = pre + readonly + eleId + eleName + eleRowId + lastS + last;
                                //+ ' menuContent' + $(e.target).attr('rowid')
                                var divtemplate = '' +
                                    '<div id="menuContent" class="menuContent menuContent' + $(e.target).attr('rowid') + '">' +
                                    '<ul id="treeDemo" class="ztree" style="margin-top:0; width:160px;"></ul>' +
                                    '</div>'

                                $('#' + ele.target.id).parent().next().children().remove();
                                $('#' + ele.target.id).parent().next().append(inputtemplate).append(divtemplate);
                                //console.log(ele.target.id)

                                self.inputControl(seltype, $(e.target).attr("id"));
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
                        delOptions: {
                            url: 'localhost:3000/rpqa/delete/1',
                            mtype: 'GET'
                        }
                    }
                }],
                onSelectRow: function (id, status, e) {                    
                    self.epcRowId = id
                    // console.log("wobeidianjile")
                    // console.log($(e.target).attr('class'))
                    if($(e.target).attr('class') == 'glyphicon glyphicon-edit') {
                        var ELE = $($(e.target).parent().parent().parent().parent()).children()[0];
                        var currentParName = $(ELE).attr('title').split('-')[0]
                        //onsole.log(currentParName)
                        self.currentParValue = $($($(e.target).parent().parent().parent().parent()).children()[1]).attr('title').split(",")
                        //currentType
                        for (item of self.rspar) {                       
                            if(item['name'] == currentParName) {
                                self.currentType = item['inputType']
                            } 
                        }
                        //console.log(self.currentType)
                        console.log("编辑事件执行")

                        var ELETitle = currentParName.split('-')[0]
                        var ELEId = $($(ELE).children()[0]).attr('id')
                        //console.log(ELEId)
                        //console.log(self.currentType)
                        $('#' + ELEId).trigger('click')

                        //$('input[name=' + self.epcRowId + '_paraV]').val($($($(e.target).parent().parent().parent().parent()).children()[1]).attr('title'))
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

            

            //$('#jqGrid1').inlineNav('#jqGridPager1',{edit: false,add: true,del: false,cancel: true});

            // $('#jqGrid1').navButtonAdd('#jqGridPager1', {
            //     buttonicon: "ui-icon-mail-closed",
            //     title: "添加新参数",
            //     caption: "添加新参数",
            //     position: "last",
            //     onClickButton: self.customButtonClicked
            // });
        },
        fetchData: function () {
            var self = this;

            $(document).ready(function () {
                $("#jqGrid").jqGrid({
                    url: self.apiUrl,
                    datatype: "json",
                    caption: "事件配置表",
                    colModel: [{
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
                    }],
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
                                console.log(self.rspar)
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