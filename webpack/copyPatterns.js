module.exports = [
    // copy static/config file
    { from: "dist/static", to: "static" },

    { from: "node_modules/jquery/dist", to: "static/scripts/lib/jquery/" },
    { from: "node_modules/bootstrap/dist", to: "static/scripts/lib/bootstrap/" },
    { from: "node_modules/bootstrap-icons", to: "static/scripts/lib/bootstrap-icons/" },
    { from: "node_modules/frowser/build", to: "static/scripts/lib/frowser/" },
    { from: "node_modules/font-awesome", to: "static/content/font-awesome/" },
    { from: "node_modules/mathjax-full", to: "static/scripts/lib/mathjax-full" },
    {
        from: "node_modules/spectrum-colorpicker/spectrum.js",
        to: "static/scripts/lib/spectrum/spectrum.js",
    },
    {
        from: "node_modules/dplayer/dist/DPlayer.min.css",
        to: "static/content/DPlayer.min.css",
    },
    {
        from: "node_modules/dplayer/dist/DPlayer.min.css.map",
        to: "static/content/DPlayer.min.css.map",
    },
    {
        from: "node_modules/aplayer/dist/APlayer.min.css",
        to: "static/content/APlayer.min.css",
    },
    {
        from: "node_modules/aplayer/dist/APlayer.min.css.map",
        to: "static/content/APlayer.min.css.map",
    },
    {
        from: "node_modules/hls.js/dist/hls.min.js",
        to: "static/content/hls.min.js",
    },
    {
        from: "reset.html",
        to: "static/reset.html",
    },
];

