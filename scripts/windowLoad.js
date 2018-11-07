(function($) {
    let $window = $(window), 
        $body = $('body'),
        $main = $('#main'),
        $sections = $

    // Play intial animations on page load.
    $window.on('load', function() {
        window.setTimeout(function() {
            $body.removeClass('is-preload')
        }, 100)
    })

    // Fix: Flexbox min-height bug on IE. 
    if (browser.name === 'ie') {
        let flexboxFixTimeoutId;
        $window.on('resize.flexbox-fix', function() {
            flexboxFixTimeoutId = setTimeout(function() {
                if ($wrapper.prop('scrollHeight') > $window.height()) {
                    $wrapper.css('height', 'auto')
                } else {
                    $wrapper.css('height', '100vh')
                }
            }, 250)
        }).triggerHandler('resize.flexbox-fix')
    }

    // Main 
    let delay = 325,
        locked = false

    $main._show = function(id, initial) {
        let $section = $main_sections.filter('#' + id)
        // No such section? Bail.
        if ($section.length === 0) {
            return;
        }

        // Handle lock.

        // Already locked? Speed through "show" steps w/o delays.
        if (locked || (typeof initial !== 'undefined' && initial === true)) {
            // Mark as switching.

        }
    }

})(jQuery)