Vue.component('evt', {
    template: '#evt',
    props: {
        apiUrl: String,
    },
    data: function () {
        return {
            rowId: 1,
            accid: 1,
            rlpcurl: String,
            rspaurl: 'rpqa',
            rlpc: null,
            rlpcP: null,
            rspar: null
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
        createurl: function (elements) {
            var initrlpcurl = 'rlpcqa/search?';
            var temp = '';

            temp += ('ruleId=' + $(elements[0]).text())

            this.rlpcurl = initrlpcurl + temp;
        },
        addPar: function() {
        },
        acId: function(event) {
            var id = event.target.id
            console.log($('#' + id +'>option:selected').attr('id'));
            this.accid = $('#' + id +'>option:selected').attr('id');

            for(var i = 0;i < 6;i ++) {
                $('.' + i).css({'display': 'none'})
            }

            $('.' + this.accid).css({'display': 'block'})
        },
        fetchData: function () {
            var self = this;

            $(document).ready(function () {
                var template;
                template += "<div style='margin-left:15px;'><div> 事件编号: </div><div>{evntNo} </div>";
                template += "<div> 事件中文名称: </div><div>{chnName} </div>";
                template += "<div> 事件大类: </div><div>{evntCatlog} </div>";
                template += "<div> 事件类型:</div><div> {evntType} </div>";
                template += "<div> 事件计算周期:</div><div> {evntCmpPeriod} </div>";
                template += "<div> 事件维度类型:</div><div> {evntDmType} </div>";
                template += "<div> 事件计算公式描述:</div><div> {evntFormulaDes} </div>";
                template += "<div> 聚合SQL:</div><div>{assembleSql}</div>";
                template += "<div> 溯源SQL:</div><div>{traceSql}</textarea></div>";
                template += "<hr style='width:100%;'/>";
                template += "<div> {sData} {cData}  </div></div>";

                $("#jqGrid").jqGrid({
                    url: self.apiUrl,
                    datatype: "json",
                    caption: "规则配置表",
                    colModel: [{
                        name: 'ruleId',
                        label: '规则ID',
                        hidden: true
                    }, {
                        name: 'ruleNo',
                        label: '规则编号',
                        editable: true,
                    }, {
                        name: 'chnName',
                        label: '规则中文名称',
                        editable: true // must set editable to true if you want to make the field editable
                    }, {
                        name: 'ruleCatlog',
                        label: '规则服务大类',
                        editable: true
                    }, {
                        name: 'ruleBelongType',
                        label: '规则归属类型',
                        editable: true
                    }, {
                        name: 'ruleCmpPeriod',
                        label: '规则计算周期',
                        editable: true
                    }, {
                        name: 'ruleCmpSql',
                        label: '规则计算SQL',
                        editable: true
                    }, {
                        name: 'traceSql',
                        label: '规则溯源SQL',
                        editable: true
                    }, {
                        name: 'defaultSts',
                        label: '默认状态值',
                        editable: true
                    }, {
                        name: 'allowUpRptFlg',
                        label: '可上报标志',
                        editable: true
                    }, {
                        name: 'validDte',
                        label: '生效日期',
                        editable: true
                    }, {
                        name: 'cancelDte',
                        label: '失效日期',
                        editable: true
                    }, {
                        name: 'memoDes',
                        label: '备注',
                        editable: true
                    }],
                    onSelectRow: function (id) {
                        self.rowId = id;
                        self.createurl($('#' + id).children());

                        axios.get(self.rlpcurl)
                        .then(function (response) {
                            self.rlpcP = JSON.parse(response.data[0]["paramCntConf"]);
                            self.rlpc = response.data[0];

                            console.log(self.rlpcP);
                        })
                        .catch(function (error) {
                            self.errorHandle(error);
                        });
                    },
                    loadComplete: function () {
                        axios.get(self.rspaurl)
                        .then(function (response) {
                            self.rspar = response.data;
                        })
                        .catch(function (error) {
                            self.errorHandle(error);
                        });
                    },
                    viewrecords: true,
                    width: 1180,
                    height: 200,
                    rowNum: 10,
                    pager: "#jqGridPager"
                });

                $('#jqGrid').navGrid('#jqGridPager', {
                    edit: true,
                    add: true,
                    del: true,
                    search: true,
                    position: "left",
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