$(() => {
    // Overlays
    $('[data-overlay]').on('click', function() {
        var overlayrel = $(this).data('overlay');

        $('body').addClass('overflow-hidden');
        $(overlayrel + ', .overlay-mask').fadeIn();
        return false;
    });

    $('.modal .close, .overlay-mask').on('click', function() {
        $('body').removeClass('overflow-hidden');
        $('.modal, .overlay-mask').fadeOut();
        return false;
    });
})