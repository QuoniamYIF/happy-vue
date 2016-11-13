//==========================response data details=====================================
/*
    console.log(response.data);
    console.log(response.status);
    console.log(response.statusText);
    console.log(response.headers);
    console.log(response.config);
*/
//====================================================================================

const str = ["cmpDte", "ruleId","ruleSetId","cmpBatNo","ruleBelongType","rstBelongTo"]
            
Vue.component('vuetable', {
  template: '#vuetable',
  props: {
    apiUrl: String,
  },
  data: function () {
    return {
      rowId: 1,
      url: {
        rsqurl: String,
        rsturl: String,
        rstqurl: String
      },
      rsq: null,
      rst: null,
      rstq: null
    }
  },
  methods: {
    errorHandle: function(err) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else {
        console.log('Error', error.message);
      }
    },
    fetchDetails: function(url, param) {
      var self = this;
      axios.get(url)
      .then(function(response) {
        self[param] = response.data;
      })
      .catch(function(error) {
        self.errorHandle(error);
      });
    },
    dealStr: function(str){
      var temp = str;
      str = str.split('');
      str.splice(-1)
      str = str.join('')
      return str;
    },
    createurl: function(elements) {
      var initrsq = 'rsqqa/search?';
      var initrst = 'rstqa/search?';
      var initrstq = 'rstqqa/search?';

      var four,six;
      var temp = '';
      var deal = this.dealStr;

      for(var i = 0;i < 6;i ++) {
        temp += (str[i] + '=' + $(elements[i]).text() + '&')

        if(i == 5) {
          six = temp;
          temp = '';  
        }
        if(i == 3)
          four = temp;
      }

      this.url.rsq = initrsq + deal(four);
      this.url.rst = initrst + deal(six);
      this.url.rstq = initrstq + deal(four);
       
    },
    fetchData: function () {
      var self = this;

      $(function () {
        $("#jqGrid").jqGrid({
          url: self.apiUrl,
          datatype: "json",
          colModel: [
            {
              name: "cmpDte",
              label: "计算日期",
              hidden: true
            }, {
              name: "ruleId",
              label: "规则标识码",
              hidden: true
            }, {
              name: "ruleSetId",
              label: "规则集标识码",
              hidden: true
            }, {
              name: "cmpBatNo",
              label: "计算批次号",
              hidden: true
            }, {
              name: "ruleBelongType",
              label: "规则归属类型",
              hidden: true
            }, {
              name: "rstBelongTo",
              label: "结果归属物",
              hidden: true
            }, {
              name: "rstSts",
              label: "默认状态值",
            }, {
              name: "evntCount",
              label: "事件总数",
            }, {
              name: "evntCount",
              label: "事件总金额",
            }, {
              name: "upRptFlg",
              label: "可上报标志",
            }, {
              name: "evntCountSet",
              label: "事件总数结果组合"
            }, {
              name: "evntSumAmtSet",
              label: "事件金额组合"
            }, {
              name: "memoDes",
              label: "备注",
            }
          ],
          caption: "规则结果",
          onSelectRow: function(id) {
            self.rowId = id;
            self.createurl($('#' + id).children());

            var url = self.url;
            var fet = self.fetchDetails;

            fet(url.rsq, "rsq");
            fet(url.rst, "rst");
            fet(url.rstq, "rstq");
          },
          loadComplete: function() {
            var url = self.url;
            var fet = self.fetchDetails;

            self.createurl($('#' + self.rowId).children());

            fet(url.rsq, "rsq");
            fet(url.rst, "rst");
            fet(url.rstq, "rstq");
          },
          viewrecords: true,
          width: 730,
          height: 200,
          rowNum: 30,
          pager: "#jqGridPager"
        });
      });
    }
  },
  created: function () {
    this.fetchData()
  }
})

var demo = new Vue({
  el: '#result'
});