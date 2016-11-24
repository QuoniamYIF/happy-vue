Vue.component('rsp', {
    template: '#rsp',
    props: {
        apiUrl: String,
    },
    data: function () {
        return {
            rowId: 1,
            parId: 1,
            postUrl: String,
            editUrl: String,
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

                $("#jqGrid").jqGrid({
                    url: self.apiUrl,
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
                        width: 130,
                        editable: true
                    }, {
                        name: 'multiSelFlg',
                        label: '多选标识',
                        width: 130,
                        editable: true
                    }, {
                        name: 'dataType',
                        label: '数据类型',
                        width: 130,
                        editable: true
                    }, {
                        name: 'required',
                        label: '必输标识',
                        width: 130,
                        editable: true
                    }, {
                        name: 'defaultValue',
                        label: '缺省值',
                        width: 110,
                        editable: true
                    }, {
                        name: 'readOnly',
                        label: '只读标识',
                        width: 140,
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
                        width: 140,
                        editable: true
                    }],
                    onSelectRow: function(id) { 
                        self.rowId = id;                       
                        self.parId = +$($('#' + id).children()[0]).text()
                        //$('#' + id).attr('id', self.parId)
                        //console.log(self.deleteUrl)
                        //console.log(self.parId)
                    },
                    sortname: 'CustomerID',
                    sortorder: 'asc',
                    colMenu: true,
                    //loadonce: true,
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
                        search: false,
                        refresh: false,
                        view: false,
                        position: "left",
                        cloneToTop: false
                    },
                    // options for the Edit Dialog
                    {
                        editCaption: "编辑风控事件规则参数",
                        mtype: 'POST',
                        closeAfterEdit: true,
                        onclickSubmit: function(params, posdata) {
                            //console.log(params)
                            self.editUrl = self.apiUrl + '/' + self.parId;
                            // console.log($('#jqgrid').delGridRow(self.rowId, {
                            //     url: '啦啦啦啦啦啦啦啦啦'
                            // }))
                            //delete posdata.prototype.oper
                            console.log(params)
                            console.log(posdata)   
                            //delete posdata.chnName
                            delete posdata.oper  
                            //posdata.oper = undefined
                            //posdata.oper = "lsllslslsl"  
                            //console.log(delete posdata.prototype.oper)   
                            //console.log(posdata.prototype)
                            console.log(posdata.propertyIsEnumerable('oper'))
                            //console.log(Object.getOwnPropertyDescriptor(posdata, 'oper'))
                            console.log(Object.getPrototypeOf(posdata))
                            //console.log(posdata.hasOe)                    
                            //console.log(self.editUrl)
                            params.url = self.editUrl
                            //delete posdata.oper
                            posdata.chnName = "eeeee";
                            //console.log(posdata.chnName)
                            
                            // console.log(posdata)  
                            //console.log(posdata["oper"])
                                                      
                            //posdata.chnName = "weweuoiwueowieuoweu" + posdata.chnName
                            //console.log(params.url + "啦啦啦")
                            //console.log(self.deleteUrl)
                            // axios.post(self.deleteUrl)
                            // .then(function(response){
                            //     console.log(response)
                            //     //alert('删除成功:'+ 'OK')
                            // })
                            // .catch(function(error){
                            //     self.errorHandle(error)
                            // })
                        },
                        //serializeRowData
                        afterSubmit: function(res, postdata) {
                            console.log(res.responseText);
                            return [true, "错误"]
                        },
                        // errorTextFormat: function (data) {
                        //     console.log(data)
                        //     return '出现错误' + data.statusText
                        // },
                        // beforeSubmit: function(postdata, formid) {
                        //     //可以做一些数据验证                            
                        // },                        
                        // onclickSubmit: function(params, posdata) {
                        //     // console.log(posdata)
                        //     self.postUrl = self.apiUrl + '/' + self.parId
                        //     // console.log(self.postUrl)
                        //     console.log('params:' + params)                            
                        //     console.log('posdata:' + posdata)
                        //     axios.post(self.postUrl, posdata)
                        //     .then(function(response){
                        //         console.log(response)
                        //         alert('更新成功:'+ 'OK')
                        //     })
                        //     .catch(function(error){
                        //         self.errorHandle(error)
                        //     })
                        // }
                    },
                    // options for the Add Dialog
                    {
                        url: self.apiUrl,
                        mtype: 'POST',
                        closeAfterAdd: true,
                        afterSubmit: function(res, postdata) {
                            console.log(res.responseText);
                            return [true, "错误"]
                        },
                        // errorTextFormat: function (data) {
                        //     return 'Error: ' + data.responseText
                        // },
                        // onclickSubmit: function(params, posdata) {
                        //     // console.log(posdata)
                        //     self.postUrl = self.apiUrl
                        //     console.log(self.postUrl)
                        //     // axios.post(self.postUrl, posdata)
                        //     // .then(function(response){
                        //     //     console.log(response)
                        //     //     alert('更新成功:'+ 'OK')
                        //     // })
                        //     // .catch(function(error){
                        //     //     self.errorHandle(error)
                        //     // })
                        // }
                    },
                    // options for the Delete Dailog
                    {                        
                        // url: function() {
                        //     return self.deleteUrl + self.parId
                        // },
                        mtype: 'POST',
                        // delData: ["123", self.parId],
                        closeAfterAdd: true,                        
                        // errorTextFormat: function (data) {
                        //     return 'Error: ' + data.responseText
                        // },
                        onclickSubmit: function(params, posdata) {
                            console.log(params)
                            self.deleteUrl = self.apiUrl + '/delete/' + self.parId;
                            // console.log($('#jqgrid').delGridRow(self.rowId, {
                            //     url: '啦啦啦啦啦啦啦啦啦'
                            // }))
                            params.url = self.deleteUrl
                            //console.log(params.url + "啦啦啦")
                            //console.log(self.deleteUrl)
                            // axios.post(self.deleteUrl)
                            // .then(function(response){
                            //     console.log(response)
                            //     //alert('删除成功:'+ 'OK')
                            // })
                            // .catch(function(error){
                            //     self.errorHandle(error)
                            // })
                        },
                        afterSubmit: function(res, postdata) {
                            //console.log(res.responseText);
                            return [true, "错误"]
                        },
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