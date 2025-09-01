$(() => {
    // Search
    $('a.nav-search').on('click', function() {
        $('.search-field-wrapper').slideToggle();
        $('.searchField').focus();
        return false;
    });

    $('.close-search').on('click', function() {
        $('.search-field-wrapper').slideUp();
        return false;
    });
})