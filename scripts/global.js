$(document).ready(function() {
    "use strict";

    // Animation Handler
    $('.animate').each(function() {
        // Grab the data-animation value to add class, grab offset and height to set the scroll position.
        var $this = $(this),
            anim = $this.data('animation'),
            delay = $this.data('delay'),
            duration = $this.data('duration'),
            offset = $(this).offset().top - ($(window).height() / 1.05);

        // If data-delay is added
        if (delay) {
            $this.css('animation-delay', delay);
        }

        // If data-duration is added
        if (duration) {
            $this.css('animation-duration', duration);
        }

        // Add the animation class when scroll position is met
        $(window).on('scroll load', function() {
            if ($(window).scrollTop() >= offset) {
                $this.addClass(anim);
                $this.addClass('animated');
            }

            // Remove the classes to allow for z-indexing after animations run.
            // Removes animate because above script adds it back and we can't always target the animation name.
            if ($this.hasClass('animated')) {
                var timeout = 1000;

                setTimeout(function() {
                    $this.removeClass('animate');
                }, timeout);
            }
        });
    });

    // Back to Top
    $(window).scroll(function() {
        if ($(this).scrollTop() > 400) {
            $('.back-to-top').addClass('visible');
        } else {
            $('.back-to-top').removeClass('visible');
        }
    });

    $('.back-to-top').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, 500);
    });

    // Text resize using HTML classes (minus 3 stylesheets)
    $('.resizerButton').on('click', function() {
        var item = $(this);
        $.post("/ajax/text-resizer.php", {
            style: $(this).attr("data-style")
        }, function(d) {
            // DO NOTHING
            $('.resizerButton').each(function() {
                $(this).css("font-weight", "normal");
            });

            item.css("font-weight", "bold");
            $('html').removeClass('text-normal');
            $('html').removeClass('text-medium');
            $('html').removeClass('text-large');
            $('html').addClass(d);

        });
        return false;
    });

    // IE Fix for jumpy fixed backgrounds
    if (navigator.userAgent.match(/Trident\/7\./)) { // if IE
        $('body').on("mousewheel", function() {
            // remove default behavior
            event.preventDefault();

            //scroll without smoothing
            var wheelDelta = event.wheelDelta;
            var currentScrollPosition = window.pageYOffset;
            window.scrollTo(0, currentScrollPosition - wheelDelta);
        });
    }

    // Notification message close
    $("div.message.relative").on('click', function() {
        $(this).slideUp();
    });
});

// Class to fade in on load - Can be used to hide html exploding before the jquery can get to it
$(window).on('load', function() {
    $('.show-on-load').css('opacity', '1');
});


// Measure the scrollbar width
// Create the measurement node
var scrollDiv = document.createElement("div");
scrollDiv.className = "js-scrollbar-measure";
document.body.appendChild(scrollDiv);

// Get the scrollbar width
var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;

// Delete the DIV
document.body.removeChild(scrollDiv);

// Add data-scrollbarwidth to elements that may use it
// elements that use .js-break-out
var breakOutElements = document.querySelectorAll('.js-break-out');
for (var i = 0; i < breakOutElements.length; i++) {
    breakOutElements[i].setAttribute('data-scrollbarwidth', scrollbarWidth);
}


// Password Input Toggle
$(".js-toggle-password").on('click', function() {
    $(this).toggleClass("fa-eye fa-eye-slash");
    var input = $($(this).attr("toggle"));

    if (input.attr("type") == "password") {
        input.attr("type", "text");
    } else {
        input.attr("type", "password");
    }
});


function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    } else expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

var cookie = readCookie("style");

if (siteType == "ECOMMERCE") {
    $(function() {
        $("img.lazy").lazyload({
            threshold: 200
        });
    });
}

const modal = document.querySelector(".dialog-modal");
const openModal = document.querySelector(".button-olb");
const closeModal = document.querySelector(".close-button");

openModal.addEventListener("click", () => {
    modal.showModal();
});

closeModal.addEventListener("click", () => {
    modal.close();
});