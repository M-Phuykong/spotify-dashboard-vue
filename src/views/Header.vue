<template>
    <nav id="navbar">
        <ul class="nav justify-content-center ">
            <li class="nav-item">
                <router-link to="/artist" class="nav-link artist">ARTISTS</router-link>
            </li>
            <div class="home_logo">
                <router-link to="/home" class="nav-link home"><img src="@/assets/img/Spotify_Icon_RGB_Green.png"></router-link>
            </div>
            <li class="nav-item">
                <router-link to="/track" class="nav-link track">TRACKS</router-link>
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
    border-radius: 55px;
    transform: scale(1);
}

.home_logo img:hover{
    animation: logo-pulse 2000ms infinite;
}


.nav.nav-pills{
    height: 100%;
}

.nav-link {
    font-family: fantasy;
    color: white;
    font-size: 2.2rem;
}

@keyframes logo-pulse {
    0%{
        transform: scale(0.95);
		box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7);
    }
    70% {
        transform: scale(1);
		box-shadow: 0 0 0 10px rgba(255, 255, 255, 0);
    }
    100% {
        transform: scale(0.95);
		box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
    }
    
}


</style>