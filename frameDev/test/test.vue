<template>
    <div>
        {{ message }}
        <test></test>
    </div>
</template>

<script>
   import test from './tttt.vue'
   
   export default {
       components: {
           'test': test
       },
       data () {
           return {
               "message": "quoniammmm!"
           }
       },
       created () {
           console.log("我被创建了");
       }
   }
</script>