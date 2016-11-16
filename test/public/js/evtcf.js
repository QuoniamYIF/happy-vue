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
            rspaurl: 'http://localhost:3000/rpqa',
            epc: null,
            epcP: null,
            rspar: null
        }
    },
    methods: {
        errorHandle: function (err) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else {
                console.log('Error', error.message);
            }
        },
        createurl: function (elements) {
            var initepcurl = 'epcqa/search?';
            var temp = '';

            temp += ('evntId=' + $(elements[0]).text())

            this.epcurl = initepcurl + temp;
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
                    caption: "事件配置表",
                    colModel: [{
                        name: 'evntId',
                        label: '事件ID',
                        hidden: true
                    }, {
                        name: 'evntNo',
                        label: '事件编号',
                        editable: true,
                    }, {
                        name: 'chnName',
                        label: '事件中文名称',
                        editable: true // must set editable to true if you want to make the field editable
                    }, {
                        name: 'evntCatlog',
                        label: '事件大类',
                        editable: true
                    }, {
                        name: 'evntType',
                        label: '事件类型',
                        editable: true
                    }, {
                        name: 'evntCmpPeriod',
                        label: '事件计算周期',
                        editable: true
                    }, {
                        name: 'evntDmType',
                        label: '事件维度类型',
                        editable: true
                    }, {
                        name: 'evntFormulaDes',
                        label: '事件计算公式描述',
                        editable: true
                    }, {
                        name: 'assembleSql',
                        label: '聚合SQL',
                        editable: true
                    }, {
                        name: 'traceSql',
                        label: '溯源SQL',
                        editable: true
                    }, {
                        name: 'memoDes',
                        label: '备注',
                        editable: true
                    }],
                    onSelectRow: function (id) {
                        self.rowId = id;
                        self.createurl($('#' + id).children());

                        console.log(self.epcurl);

                        axios.get(self.epcurl)
                        .then(function (response) {
                            self.epcP = JSON.parse(response.data[0]["paramCntConf"]);
                            self.epc = response.data[0];
                        })
                        .catch(function (error) {
                            self.errorHandle(error);
                        });

                        console.log(self.epc)
                    },
                    loadComplete: function () {
                        axios.get(self.rspaurl)
                        .then(function (response) {
                            self.rspar = response.data;
                            console.log(self.rspar)
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