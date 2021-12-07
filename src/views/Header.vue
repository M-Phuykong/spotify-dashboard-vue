<template>
    <nav id="navbar" class="bg-primary">
        <ul class="nav justify-content-center ">
            <li class="nav-item">
                <router-link to="/artist" class="nav-link artist">Artist</router-link>
            </li>
            <li class="nav-item home">
                <router-link to="/home" class="nav-link home">Home</router-link>
            </li>
            <li class="nav-item">
                <router-link to="/track" class="nav-link track">Tracks</router-link>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    name: "Header"
}
</script>

<style scoped>

#navbar {
    width: 100%;
    padding: 20px;

}

.nav.nav-pills{
    height: 100%;
}

.nav-link {
    font-family: fantasy;
}

</style>