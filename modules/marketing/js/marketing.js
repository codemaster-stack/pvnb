$(window).on('load', function() {
    "use strict";
    $('.flexslider').flexslider({
        animation: "fade",
        directionNav: true,
        controlNav: true,
        pauseOnHover: false,
        pauseOnAction: true,
        pausePlay: true,
        pauseText: "Pause",
        playText: "Play",
        customDirectionNav: $('.mm-controls .mm-direction-nav'),
        controlsContainer: $('.mm-controls .mm-control-nav'),
        start: function() {
            // Check if only one slide, remove arrows, dots and pause if yes
            const count = $('.slides li').length;
            if (count == 1) $('.mm-controls').remove();
            $('.flex-pauseplay a').css({
                color: 'white',
                textDecoration: 'none'
            })
            $('.flex-pauseplay').appendTo('.mm-controls .mm-control-nav');
        },
    });
});