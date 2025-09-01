$(document).ready(function() {
    $(".site-banner a.sb-close").click(function() {
        return $(".site-banner").slideUp(function() {
            $(this).remove()
        }), $.ajax({
            type: "post",
            url: "/ajax/site-banner/set-cookie.php",
            data: {
                id: bannerId
            },
            dataType: "html",
            success: function(e) {}
        }), !1
    })
});