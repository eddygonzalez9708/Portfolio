(function($) {
    let $window = $(window)
    let $body = $('body')
    let $wrapper = $('#wrapper')
    let $home = $('#home')
    let $footer = $('#footer')
    let $sections = $wrapper.children('section')

    // Play initial animations on page load
    $window.on('load', function() {
        if (!$body.hasClass('is-section-visible')) {
            window.setTimeout(function() {
                $body.removeClass('is-preload')
            }, 100)
        }
    })

    // Fix: Flexbox min-height bug on IE. 
    // if (browser.name === 'ie') {
    //     let flexboxFixTimeoutId
    //     $window.on('resize.flexbox-fix', function() {
    //         flexboxFixTimeoutId = setTimeout(function() {
    //             if ($wrapper.prop('scrollHeight') > $window.height()) {
    //                 $wrapper.css('height', 'auto')
    //             } else {
    //                 $wrapper.css('height', '100vh')
    //             }
    //         }, 250)
    //     }).triggerHandler('resize.flexbox-fix')
    // }

    // Main 
    let delay = 325
    let locked = false

    $wrapper._show = function(id, initial) {
        let $section = $sections.filter('#' + id)
        // No such section? Bail.
        if ($section.length === 0) {
            return
        }

        // Handle Lock
        // Already locked? Speed through "show" steps without delays
        if (locked || (typeof initial !== 'undefined' && initial === true)) {
            // Mark as visible 
            $body.addClass('is-section-visible')

            // Deactivate all sections (just in case one's already active)
            $sections.removeClass('active')

            // Hide home, footer
            $home.hide()
            $footer.hide()

            // Show section 
            $section.show()

            // Activate section
            $section.addClass('active')

            // Unlock 
            locked = false

            return
        }

        // Lock
        locked = true

        // Section alread visible? Just swap sections
        if ($body.hasClass('is-section-visible')) {
            // Deactivate current section
            let $currentSection = $sections.filter('.active')
            $currentSection.removeClass('active')
            
            // Show section
			setTimeout(function() {
                // Hide current section
				$currentSection.hide()

				// Show section
				$section.show()

				// Activate section
				setTimeout(function() {
                    $section.addClass('active')

				    // Window stuff
				    $window
					    .scrollTop(0)
					    .triggerHandler('resize.flexbox-fix')

				    // Unlock
				    setTimeout(function() {
					    locked = false
                    }, delay)
                }, 25)
            }, delay)
        // Otherwise, handle as normal.
		} else {
            // Mark as visible.
            $body.addClass('is-section-visible')

            // Show section
            setTimeout(function() {
                // Hide home, footer
                $home.hide()
                $footer.hide()

                // Show section
                $section.show()

                // Activate article
                setTimeout(function() {
                    $section.addClass('active')

                    // Window stuff
                    $window
                        .scrollTop(0)
                        .triggerHandler('resize.flexbox-fix')
                    
                    // Unlock
                    setTimeout(function() {
                        locked = false
                    }, delay)
                }, 25)
            }, delay)
        }
    }

    $wrapper._hide = function(addState) {
        let $section = $sections.filter('.active')

        // Section not visible? Bail.
        if (!$body.hasClass('is-section-visible')) {
            return
        }

        // Add state? 
        if (typeof addState !== 'undefined' && addState === true) {
            history.pushState(null, null, '#')
        }

        // Handle lock
        // Already locked? Speed through "hide" steps w/o delays
		if (locked) {
            // Deactivate section
            $section.removeClass('active')
            
            // Hide section
			$section.hide()

			// Show home, footer
            $home.show()
            $footer.show()

		    // Unmark as visible.
            $body.removeClass('is-section-visible')
            
            // Unlock
			locked = false;

			// Window stuff
			$window
				.scrollTop(0)
                .triggerHandler('resize.flexbox-fix');
            
            return
        }
        
        // Lock
        locked = true
        
        // Deactivate section
        $section.removeClass('active')
        
        // Hide section
        setTimeout(function() {
			// Hide section
			$section.hide()

            // Show home, footer
            $home.show()
			$footer.show()

			// Unmark as visible
			setTimeout(function() {
                $body.removeClass('is-section-visible')
                // Window stuff
				$window
					.scrollTop(0)
					.triggerHandler('resize.flexbox-fix')

				// Unlock
				setTimeout(function() {
					locked = false
                }, delay)
            }, 25)
        }, delay)
    }
    
    // Sections
	$sections.each(function() {
        let $this = $(this)
        // Close
		$('<span class="fa-times close"></span>')
			.appendTo($this)
			.on('click', function() {
				location.hash = ''
            })
        
        // Prevent clicks from inside section from bubbling
		$this.on('click', function(event) {
            if ($this[0].id !== 'projects') {
                event.stopPropagation()
            }
        })
    })
    
    // Events
    $body.on('click', function(event) {
        // Section visible? Hide.
        if ($body.hasClass('is-section-visible')) {
            if(event.target.id === 'wrapper') {
                location.hash = ''
            }
        }
    })
    
    $window.on('keyup', function(event) {
        switch (event.keyCode) {
            // Escape Key
            case 27:
            // Section visible? Hide
                if ($body.hasClass('is-section-visible')) {
                    location.hash = ''
                }
                break
            default:
                break
        }
    })

    $window.on('hashchange', function(event) {
        // Empty hash?
        if (location.hash === '' ||	location.hash === '#') {
            $home.addClass('onSectionActive')
            window.setTimeout(function() {
                $home.removeClass('onSectionActive')
            }, 500)
            // Prevent default
            event.preventDefault()
            event.stopPropagation()
        // Otherwise, check for a matching section
            $wrapper._hide()
        } else if ($sections.filter(location.hash).length > 0) {
            // Show section
            $wrapper._show(location.hash.substr(1))
            // Prevent default
            event.preventDefault()
            event.stopPropagation()
        }
    })

    // Scroll restoration
	// This prevents the page from scrolling back to the top on a hashchange
	if ('scrollRestoration' in history)
        history.scrollRestoration = 'manual'
    else {
        let oldScrollPos = 0
        let scrollPos = 0
        let $htmlbody = $('html,body')
        
        $window
            .on('scroll', function() {
                oldScrollPos = scrollPos
                scrollPos = $htmlbody.scrollTop()
            })
            .on('hashchange', function() {
                $window.scrollTop(oldScrollPos)
            })
    }

    // Initialize
	// Hide sections
    $sections.hide()

    // Initial section
    if (location.hash !== '' &&	location.hash !== '#') {
        $window.on('load', function() {
            $wrapper._show(location.hash.substr(1))
        })
    }
})(jQuery)