Vue.component('rsp', {
    template: '#rsp',
    props: {
        apiUrl: String,
    },
    data: function () {},
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
        fetchData: function () {
            var self = this;

            $(document).ready(function () {
                var template;
                template += "<div style='margin-left:15px;'><div> 参数变量名称: </div><div>{name} </div>";
                template += "<div> 参数变量中文名称: </div><div>{chnName} </div>";
                template += "<div> 输入类型: </div><div>{inputType} </div>";
                template += "<div> 多选标识:</div><div> {multiSelFlg} </div>";
                template += "<div> 数据类型:</div><div> {dataType} </div>";
                template += "<div> 必输标识:</div><div> {required} </div>";
                template += "<div> 缺省值:</div><div> {defaultValue} </div>";
                template += "<div> 只读标识:</div><div> {readOnly} </div>";
                template += "<div> 最小值(长度):</div><div> {minValue} </div>";
                template += "<div> 最大值(长度):</div><div>  {maxValue} </div>";
                template += "<div> 选择资源:</div><div>  {selectContent} </div>";
                template += "<hr style='width:100%;'/>";
                template += "<div> {sData} {cData}  </div></div>";

                $("#jqGrid").jqGrid({
                    url: self.apiUrl,
                    // we set the changes to be made at client side using predefined word clientArray
                    editurl: self.apiUrl,
                    datatype: "json",
                    caption: "风控事件规则参数属性定义表",
                    colModel: [{
                        name: 'name',
                        label: '参数变量名称',
                        width: 160,
                        key: true,
                        editable: true,
                        editrules: {
                            required: true
                        }
                    }, {
                        name: 'chnName',
                        label: '参数变量中文名称',
                        width: 180,
                        editable: true // must set editable to true if you want to make the field editable
                    }, {
                        name: 'inputType',
                        label: '输入类型',
                        width: 100,
                        editable: true
                    }, {
                        name: 'multiSelFlg',
                        label: '多选标识',
                        width: 100,
                        editable: true
                    }, {
                        name: 'dataType',
                        label: '数据类型',
                        width: 100,
                        editable: true
                    }, {
                        name: 'required',
                        label: '必输标识',
                        width: 100,
                        editable: true
                    }, {
                        name: 'defaultValue',
                        label: '缺省值',
                        width: 180,
                        editable: true
                    }, {
                        name: 'readOnly',
                        label: '只读标识',
                        width: 100,
                        editable: true
                    }, {
                        name: 'minValue',
                        label: '最小值(长度)',
                        width: 140,
                        editable: true
                    }, {
                        name: 'maxValue',
                        label: '最大值(长度)',
                        width: 140,
                        editable: true
                    }, {
                        name: 'selectContent',
                        label: '选择资源',
                        width: 140,
                        editable: true
                    }, {
                        name: 'validFlg',
                        label: '生效标识',
                        width: 100,
                        editable: true
                    }, ],
                    afterSubmit: function () {
                        console.log("提交")
                    },
                    sortname: 'CustomerID',
                    sortorder: 'asc',
                    loadonce: true,
                    viewrecords: true,
                    width: 1180,
                    height: 500,
                    rowNum: 10,
                    pager: "#jqGridPager"
                });

                $('#jqGrid').navGrid('#jqGridPager',
                    // the buttons to appear on the toolbar of the grid
                    {
                        edit: true,
                        add: true,
                        del: true,
                        search: true,
                        refresh: false,
                        view: false,
                        position: "left",
                        cloneToTop: false
                    },
                    // options for the Edit Dialog
                    {
                        editCaption: "风控事件规则参数属性定义",
                        template: template,
                        errorTextFormat: function (data) {
                            return 'Error: ' + data.responseText
                        }
                    },
                    // options for the Add Dialog
                    {
                        template: template,
                        errorTextFormat: function (data) {
                            return 'Error: ' + data.responseText
                        }
                    },
                    // options for the Delete Dailog
                    {
                        errorTextFormat: function (data) {
                            return 'Error: ' + data.responseText
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
    el: '#rs'
})