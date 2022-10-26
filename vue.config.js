// vue.config.js

/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
    // options...
    devServer: {
        proxy: 'https://spotify-dashboard-backend.herokuapp.com/',
    }
}