<template>
    <div class="footer container-fluid text-center position-absolute bottom-0">

        <p style="color: white;">© {{currDate}} Phuykong Meng. Powered by Vue JS. Coded with ❤.</p>

    </div>
</template>


<script>
export default {
    name: 'Footer',
    date() {
        return {
            currDate: undefined,
        }
    },
    beforeMount() {
        this.getCurrDate();
    },
    methods:{
        getCurrDate: function(){
            this.currDate =  new Date().getFullYear();
        }
    }
    
}
</script>

<style scoped>

.footer {
    font-family: 'Courier New', Courier, monospace;
    font-size: 1rem;
    padding-bottom: 5px;
}

</style>