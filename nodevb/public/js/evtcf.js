Vue.component('evt', {
    template: '#evt',
    props: {
        apiUrl: String,
    },
    data: function () {
        return {
            rowId: 1,
            accid: 1,
            epcurl: String,
            rspaurl: 'rpqa',
            epc: null,
            epcP: null,
            rspar: null,
        }
    },
    computed: {
        paramSelect: function() {
            var temp = ''
            for(item of this.rspar) {
                console.log(item['name'])
                console.log(item['chnName'])
                temp += item['paramId'] + ':' + item['name'] + '-' + item['chnName'] + ';'
            }
            //name:chnName:
            console.log(temp)
            temp += '4:TX_STATUS1';
            return temp;
        }
    },
    methods: {
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

            console.log(parentRowID);
            console.log(parentRowKey);
            axios
                .get(this.apiUrl)
                .then(function (response) {
                    $("#" + parentRowID).append('<p>溯源SQL</p>');
                    $("#" + parentRowID).append('<pre>' + response.data[parentRowKey - 1]["assembleSql"] + '</pre>');
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
        addPar: function () {},
        acId: function (event) {
            var id = event.target.id
            this.accid = $('#' + id + '>option:selected').attr('id');

            for (var i = 0; i < 6; i++) {
                $('.' + i).css({
                    'display': 'none'
                })
            }

            $('.' + this.accid).css({
                'display': 'block'
            })
        },
        customButtonClicked: function () {
            alert("You have clicked a custom button.");
        },
        fetchParData: function () {
            // $("#jqGrid1").remove();
            // $('#jqGridPager1').remove();
            var self = this;
            var template = '<div class="col-md-12" id="paraDetails" style="margin-top: 20px">' +
                '<table id="jqGrid1" style="width:100%"></table>' +
                '<div id="jqGridPager1"></div>' +
                '</div>';

            $("#paraDetails").remove();
            $('#event').append(template);

            $("#jqGrid1").jqGrid({
                url: self.epcurl,
                editurl: 'clientArray',
                datatype: "json",
                caption: '事件基本参数内容配置',
                colModel: [{
                    label: '参数名称',
                    edittype: 'select',
                    name: 'paraN',
                    editable: true,
                    editoptions: {
                        value: self.paramSelect                        
                    }
                }, {
                    label: '参数值',
                    name: 'paraV',
                    editable: true // must set editable to true if you want to make the field editable
                }, {
                    label: "编辑选项",
                    name: "actions",
                    width: 100,
                    formatter: "actions",
                    formatoptions: {

                    }
                }],
                sortname: 'EmployeeID',
                loadonce: true,
                width: 1110,
                height: 200,
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
                editParams: {
                    keys: true,
                },
                addParams: {
                    keys: true
                },
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
                    colModel: [{
                        name: 'evntId',
                        label: '事件ID',
                        hidden: true
                    }, {
                        name: 'evntNo',
                        label: '事件编号',
                        width: 130,
                        hidden: true,
                        editable: true,
                        edittype: 'text',
                        editrules: {
                            edithidden: true
                        },
                        formoptions: {
                            colpos: 1, // the position of the column
                            rowpos: 1, // the position of the row
                            label: "事件编号" // the label to show for each input control                    
                                //elmsuffix: " * " // the suffix to show after that
                        },
                        editoptions: {}
                    }, {
                        name: 'chnName',
                        label: '事件中文名称',
                        editable: true,
                        edittype: 'text',
                        formoptions: {
                            colpos: 2, // the position of the column
                            rowpos: 1, // the position of the row
                            label: "事件中文名称" // the label to show for each input control                                                    
                        },
                        editoptions: {}
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
                        },
                        editoptions: {}
                    }, {
                        name: 'evntType',
                        label: '事件类型',
                        edittype: 'text',
                        width: 130,
                        editable: true,
                        formoptions: {
                            colpos: 1,
                            rowpos: 2,
                            label: "事件类型"
                        },
                        editoptions: {}
                    }, {
                        name: 'evntCmpPeriod',
                        label: '事件计算周期',
                        editable: true,
                        edittype: 'text',
                        formoptions: {
                            colpos: 2,
                            rowpos: 2,
                            label: "事件计算周期"
                        },
                        editoptions: {}
                    }, {
                        name: 'evntDmType',
                        label: '事件维度类型',
                        editable: true,
                        edittype: 'text',
                        formoptions: {
                            colpos: 3,
                            rowpos: 2,
                            label: "事件维度类型"
                        },
                        editoptions: {}
                    }, {
                        name: 'evntFormulaDes',
                        label: '事件计算公式描述',
                        width: 200,
                        editable: true,
                        edittype: 'text',
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
                        editable: true
                    }],
                    onSelectRow: function (id) {

                        self.rowId = id;
                        self.createurl($('#' + id).children());
                        console.log(self.epcurl)
                        self.fetchParData();
                        //console.log(self.epcurl)
                        // axios
                        // .get(self.epcurl)
                        // .then(function (response) {
                        //     self.epcP = JSON.parse(response.data[0]["paramCntConf"]);
                        //     self.epc = response.data[0];
                        // })
                        // .catch(function (error) {
                        //     self.errorHandle(error);
                        // });

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
                    position: "left",
                }, {
                    editCaption: "事件编辑",
                    width: 1000
                });
            });
        },
        delegate: function() {
            // console.log('event:' + $('body').html());
            
            // $('#add_jqGrid').click(function(){
            //     console.log("我被点击了")
            // });
            // $('#edit_jqGrid').click(function(){
            //     console.log("我被点击了")                
            // });

            // $("#event").click(function(){
            //     console.log("111111")
            // });

            // $('body').on('click', '#edit_jqGrid', function(){
            //     console.log('222')
            // })
        }
    },
    created: function () {
        console.log("我被创建了");
        this.fetchData();
        this.delegate();
    }
});

new Vue({
    el: '#et'
})