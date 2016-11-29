function Rspar() {
    this.apiUrl = "rpqa";
}
Rspar.prototype.errorHandle = function(error) {
    if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
    } else {
        console.log('Error', error.message);
    }
};
var self = new Rspar();

$(document).ready(function() {
    $("#jqGrid").jqGrid({
        url: self.apiUrl,
        datatype: "json",
        caption: "风控事件规则参数属性定义表",
        colModel: [{
            name: 'paramid',
            label: '参数Id',
            hidden: true
        }, {
            name: 'name',
            label: '参数变量名称',
            width: 160,
            editable: true,
        }, {
            name: 'chnname',
            label: '参数变量中文名称',
            width: 180,
            editable: true // must set editable to true if you want to make the field editable
        }, {
            name: 'inputtype',
            label: '输入类型',
            width: 130,
            editable: true
        }, {
            name: 'multiselflg',
            label: '多选标识',
            width: 130,
            editable: true
        }, {
            name: 'datatype',
            label: '数据类型',
            width: 130,
            editable: true
        }, {
            name: 'required',
            label: '必输标识',
            width: 130,
            editable: true
        }, {
            name: 'defaultvalue',
            label: '缺省值',
            width: 110,
            editable: true
        }, {
            name: 'readonly',
            label: '只读标识',
            width: 140,
            editable: true
        }, {
            name: 'minvalue',
            label: '最小值(长度)',
            width: 140,
            editable: true
        }, {
            name: 'maxvalue',
            label: '最大值(长度)',
            width: 140,
            editable: true
        }, {
            name: 'selectcontent',
            label: '选择资源',
            width: 140,
            editable: true
        }, {
            name: 'validflg',
            label: '生效标识',
            width: 140,
            editable: true
        }],
        onSelectRow: function(id) {
            self.rowId = id;
            self.parId = +$($('#' + id).children()[0]).text()
        },
        loadComplete: function() {
            console.log($("#jqGrid").jqGrid('getRowData'))
        },
        prmNames: {
            page: "page",
            rows: "rows",
            sort: "sidx",
            order: "sord",
            search: "_search",
            nd: "nd",
            id: "id",
            oper: "oper",
            editoper: "edit",
            addoper: "add",
            deloper: "del",
            subgridid: "id",
            npage: null,
            totalrows: "totalrows"
        },
        sortname: 'CustomerID',
        sortorder: 'asc',
        colMenu: true,
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
                self.editUrl = self.apiUrl + '/' + self.parId;
                console.log(posdata)
                console.log(posdata)
                console.log($("#jqGrid").jqGrid('getGridParam', 'postData'))
                console.log(posdata)
                params.url = self.editUrl
            },
        }, {
            url: self.apiUrl,
            mtype: 'POST',
            closeAfterAdd: true,
            afterSubmit: function(res, postdata) {
                console.log(res.responseText);
                return [true, "错误"]
            },
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
            },
            afterSubmit: function(res, postdata) {
                return [true, "错误"]
            },
        });
});