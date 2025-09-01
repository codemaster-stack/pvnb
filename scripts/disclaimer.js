$(() => {
    //disclaimer
    $('#disclaimerGo').click(function() {
        setTimeout(function() {
            history.back();
        }, 2000);
    });
})