Vue.component('rsp', {
    template: '#rsp',
    props: {
        apiUrl: String,
    },
    data: function () {
        return {
            parId: 1,
            postUrl: String,
            deleteUrl: String
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
        fetchData: function () {
            var self = this;

            $(document).ready(function () {
                // var template;
                // template += "<div style='margin-left:15px;'><div> 参数变量名称: </div><div>{name} </div>";
                // template += "<div> 参数变量中文名称: </div><div>{chnName} </div>";
                // template += "<div> 输入类型: </div><div>{inputType} </div>";
                // template += "<div> 多选标识:</div><div> {multiSelFlg} </div>";
                // template += "<div> 数据类型:</div><div> {dataType} </div>";
                // template += "<div> 必输标识:</div><div> {required} </div>";
                // template += "<div> 缺省值:</div><div> {defaultValue} </div>";
                // template += "<div> 只读标识:</div><div> {readOnly} </div>";
                // template += "<div> 最小值(长度):</div><div> {minValue} </div>";
                // template += "<div> 最大值(长度):</div><div>  {maxValue} </div>";
                // template += "<div> 选择资源:</div><div>  {selectContent} </div>";
                // template += "<hr style='width:100%;'/>";
                // template += "<div> {sData} {cData}  </div></div>";

                $("#jqGrid").jqGrid({
                    url: self.apiUrl,
                    // we set the changes to be made at client side using predefined word clientArray
                    editurl: self.apiUrl,
                    datatype: "json",
                    caption: "风控事件规则参数属性定义表",
                    colModel: [
                    {
                        name: 'paramId',
                        label: '参数Id',
                        hidden:true
                    },{
                        name: 'name',
                        label: '参数变量名称',
                        width: 160,
                        editable: true,                        
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
                    }],
                    onSelectRow: function(id) {                        
                        self.parId = +$($('#' + id).children()[0]).text()
                        console.log(self.parId)
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
                        editCaption: "编辑风控事件规则参数",
                        errorTextFormat: function (data) {
                            console.log(data)
                            return '出现错误' + data.statusText
                        },
                        beforeSubmit: function(postdata, formid) {
                            //可以做一些数据验证                            
                        },
                        onclickSubmit: function(params, posdata) {
                            // console.log(posdata)
                            self.postUrl = self.apiUrl + '/' + self.parId
                            // console.log(self.postUrl)
                            console.log('params:' + params)                            
                            console.log('posdata:' + posdata)
                            axios.post(self.postUrl, posdata)
                            .then(function(response){
                                console.log(response)
                                alert('更新成功:'+ 'OK')
                            })
                            .catch(function(error){
                                self.errorHandle(error)
                            })
                        }
                    },
                    // options for the Add Dialog
                    {
                        errorTextFormat: function (data) {
                            return 'Error: ' + data.responseText
                        },
                        onclickSubmit: function(params, posdata) {
                            // console.log(posdata)
                            self.postUrl = self.apiUrl
                            console.log(self.postUrl)
                            // axios.post(self.postUrl, posdata)
                            // .then(function(response){
                            //     console.log(response)
                            //     alert('更新成功:'+ 'OK')
                            // })
                            // .catch(function(error){
                            //     self.errorHandle(error)
                            // })
                        }
                    },
                    // options for the Delete Dailog
                    {
                        errorTextFormat: function (data) {
                            return 'Error: ' + data.responseText
                        },
                        onclickSubmit: function(params, posdata) {
                            console.log(posdata)
                            // self.deleteUrl = self.apiUrl + '/delete/' + self.parId;
                            // console.log(self.deleteUrl)
                            // axios.get(self.deleteUrl)
                            // .then(function(response){
                            //     console.log(response)
                            //     console.log('删除成功:'+ 'OK')
                            // })
                            // .catch(function(error){
                            //     self.errorHandle(error)
                            // })
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