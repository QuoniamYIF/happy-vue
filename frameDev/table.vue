<template>
    <div>        
        <vuetable api-url="./data/one.json" url-one="./data/test1-1.json" url-two="./data/test2-1.json" url-three="./data/test3-1.json"
            :columns="gridColumns" :filter-key="searchQuery" :pages="config">
        </vuetable>
    </div>
</template>

<script>
    import vuetable from './vuetable.vue'

    export default {
        name: 'app',
        components: {
            'vuetable': vuetable
        },
        data () {
            return {
                searchQuery: '',
                gridColumns: [{
                    label: "name",
                    name: "名字"
                }, {
                    label: "power",
                    name: "力量"
                }, {
                    label: "level",
                    name: "水平"
                }, {
                    label: "age",
                    name: "年龄"
                }, {
                    label: "sex",
                    name: "男"
                }],
                config: [20, 30, 40]
            }
        }
    }
    
</script>