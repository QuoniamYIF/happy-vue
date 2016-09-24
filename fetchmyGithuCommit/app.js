var apiUrl = "https://api.github.com/repos/QuoniamYIF/myVueStudy/commits?per_page=3&sha=";

var demo = new Vue({
	el: '#demo',

	data: {
		branches: ['master', 'dev'],
		currentBranch: 'master',
		commits: null
	},

	created: function () {
    this.fetchData()
  },

	watch: {
	    currentBranch: 'fetchData'
  },

	filters: {
    truncate: function (v) {
      var newline = v.indexOf('\n')
      return newline > 0 ? v.slice(0, newline) : v
    },
    formatDate: function (v) {
      return v.replace(/T|Z/g, ' ')
    }
	},

	methods: {
		fetchData: function() {
			var self = this;
			var url = apiUrl + self.currentBranch;
			$.ajax({
			  url: url
			}).done(function(data) {
				self.commits = data;
			});
		}
	}
});