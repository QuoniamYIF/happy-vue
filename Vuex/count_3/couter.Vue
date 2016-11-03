<template>
<div id="app">
    <p>{{ $store.state.count }}</p>
    <p><button @click="increment">+</button><button @click="decrement">-</button></p>
</div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    methods: mapActions([
        'increment',
        'decrement'
    ])
}
</script>
