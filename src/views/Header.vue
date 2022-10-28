<template>
    <!-- <nav id="navbar">
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
        
    </nav> -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">Navbar</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
    
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <router-link to="/artist" class="nav-link artist">ARTISTS</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/home" class="nav-link home"><img src="@/assets/img/Spotify_Icon_RGB_Green.png"></router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/track" class="nav-link track">TRACKS</router-link>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item" href="#">Action</a>
                        <a class="dropdown-item" href="#">Another action</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#">Something else here</a>
                    </div>
                </li>
                <li class="nav-item">
                    <a class="nav-link disabled" href="#">Disabled</a>
                </li>
            </ul>
            <form class="form-inline my-2 my-lg-0">
                <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
        </div>
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
    font-family: fantasy, Helvetica, Arial, sans-serif;
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