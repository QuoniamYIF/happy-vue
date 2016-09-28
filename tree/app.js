var data = {
  name: 'My Tree',
  children: [
    { name: 'hello' },
    { name: 'wat' },
    {
      name: 'child folder',
      children: [
        {
          name: 'child folder',
          children: [
            { name: 'hello' },
            { name: 'wat' }
          ]
        },
        { name: 'hello' },
        { name: 'wat' },
        {
          name: 'child folder',
          children: [
            { name: 'hello' },
            { name: 'wat' }
          ]
        }
      ]
    }
  ]
}

Vue.component('item', {
  template: "#item-template",
  props: {
    model: Object
  },
  data: function() {
    return {
      open: false
    }
  },
  //
  computed: {

  },
  methods: {

  }
});

var demo = new Vue({
  el: '#demo',
  data: {
    treeData: data
  }
})