Vue.component('gyf', {
  props: ['todo'],
  template: '<div><li> {{ todo.text }} sdsds</li></div>'
});

var app = new Vue({
    el: "#app",
    data: {
        message: "quoniammm!",
        quoniammm: "gyf",
        seen: false,
        todos: [
          {text: "123"},
          {text: "456"}
        ]
    },
    computed: {
      reverseMessage: function() {
        return this.message.split('').reverse().join('');
      }
    },
    methods: {
      reverse: function() {
        this.message = this.message.split('').reverse().join('');
      },
      log: function() {
        console.log("123");
      }
    },
    created: function() {
      console.log("我被创建了");
    }
})
