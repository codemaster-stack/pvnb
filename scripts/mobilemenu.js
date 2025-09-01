$(() => {
    // Open Mobile Menu
    $('.open-mobilemenu').on('click', function() {
        $('.mobilemenu').toggleClass('slide-in');
        $('body').addClass('overflow-hidden');
        return false;
    });

    // Close Mobile Menu
    $('.close-mobilemenu, .mobilemenu a[href*="#"]:not(a[href="#"])').on('click', function() {
        $('.mobilemenu').removeClass('slide-in');
        $('body').removeClass('overflow-hidden');
    });

    // Clone Parent Pages
    $('.mobilemenu ul li a').each(function() {
        if ($(this).siblings().length > 0 && !$(this).siblings().hasClass('active')) {
            if ($(this).attr('href') != '#') {
                var cloney = $(this).prop('outerHTML');
                $(this).siblings('ul').prepend('<li>' + cloney + '</li>');
            }
        }
    });

    // Mobile Menu Sliding
    $('.mobilemenu.sliding-menu ul li a').on('click', function() {
        if ($(this).siblings().length > 0) {
            $(this).parents('ul').removeClass('active');
            $(this).parents('ul').addClass('left');
            $(this).siblings('ul').addClass('active');
            $(this).siblings('ul').removeClass('right');
            return false;
        }

        if ($(this).hasClass('backup')) {
            $(this).parents('.active').addClass('right');
            $(this).closest('.left').addClass('active');
            $(this).closest('.left').removeClass('left');
            $(this).closest('ul').removeClass('active');
            return false;
        }
    });
})