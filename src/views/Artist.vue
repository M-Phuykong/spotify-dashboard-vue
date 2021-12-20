<template>
    <div>
        <Header></Header>

        <h1>Artist Page</h1>

        <Footer></Footer>
    </div>
</template>

<script>

import Header from './Header.vue'
import Footer from './Footer.vue'

export default {
    name: 'Artist',
    components : {
        Header,
        Footer
    },
    
}
</script>

<style scoped>

</style>