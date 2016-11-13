Vue.component('evt', {
    template: '#evt',
    props: {
        apiUrl: String,
    },
    data: function() {
        return {

        }
    },
    methods: {

    },
    created: function() {
        console.log("我被创建了")
    }
});

new Vue({
    el: '#evt'
})