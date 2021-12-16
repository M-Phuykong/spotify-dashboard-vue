<template>
    <nav id="navbar">
        <ul class="nav justify-content-center ">
            <li class="nav-item">
                <router-link to="/artist" class="nav-link artist">Artist</router-link>
            </li>
            <div class="home_logo">
                <router-link to="/home" class="nav-link home"><img src="@/assets/img/Spotify_Icon_RGB_Green.png"></router-link>
            </div>
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

nav{
    display: relative;
}

#navbar {
    width: 100%;
    padding: 2px;

}
.nav-item {
  display: flex;
  align-items: center;
}

.home_logo img{
    display: absolute;
    width: 5rem;
    height: 5rem;
}

.nav.nav-pills{
    height: 100%;
}

.nav-link {
    font-family: fantasy;
    color: white;
    font-size: 2.2rem;
}

</style>