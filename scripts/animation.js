(function($) {
    let $window = $(window)
    let $body = $('body')
    let $wrapper = $('#wrapper')
    let $home = $('#home')
    let $footer = $('#footer')
    let $projects = $('#projects')
    let $content= $('.dropdown-content')
    let $sections = $wrapper.children('section')

    let delay = 325
    let locked = false

    // This code block will display a section in the div wrapper
    $wrapper._show = function(id, initial) {
        let $section = $sections.filter('#' + id)
        
        if (!$section.length) {
            return
        }

        if (locked || (typeof initial !== 'undefined' && initial === true)) {
            $body.addClass('is-section-visible')

            $sections.removeClass('active')

            $home.hide()
            $footer.hide()

            $section.show()

            $section.addClass('active')

            locked = false

            return
        }

        locked = true

        if ($body.hasClass('is-section-visible')) {
            let $currentSection = $sections.filter('.active')
            $currentSection.removeClass('active')
            
			setTimeout(function() {
				$currentSection.hide()

                $section.show()

				setTimeout(function() {
                    $section.addClass('active')
                    
                    $section
                        .scrollTop(0)
                        .triggerHandler('resize.flexbox-fix')
                    
				    setTimeout(function() {
					    locked = false
                    }, delay)
                }, 25)
            }, delay)
		} else {
            $body.addClass('is-section-visible')

            setTimeout(function() {
                $home.hide()
                $footer.hide()

                $section.show()

                setTimeout(function() {
                    $section.addClass('active')

                    $section
                        .scrollTop(0)
                        .triggerHandler('resize.flexbox-fix')
                    
                    setTimeout(function() {
                        locked = false
                    }, delay)
                }, 25)
            }, delay)
        }
    }

    // This code block will hide a section in the div wrapper
    $wrapper._hide = function() {
        let $section = $sections.filter('.active')
        if (!$body.hasClass('is-section-visible')) {
            return
        }

		if (locked) {
            $section.hide()
            $section.removeClass('active')
            
            $home.show()
            $footer.show()

            $body.removeClass('is-section-visible')
            
			locked = false;

			$home
				.scrollTop(0)
                .triggerHandler('resize.flexbox-fix');
            
            return
        }
        
        locked = true

        $section.removeClass('active')
        
        setTimeout(function() {
            $section.hide()

            $home.show()
			$footer.show()

			setTimeout(function() {
                $body.removeClass('is-section-visible')
 
                $home
					.scrollTop(0)
					.triggerHandler('resize.flexbox-fix')

				setTimeout(function() {
					locked = false
                }, delay)
            }, 25)
        }, delay)
    }

    // This code block hides active dropdown content divs and sets the border radius of dropdown buttons to .8rem when the body is clicked on
    $content._hide  = function() {
        for (let x = 0; x < $content.length; x++) {
            if ( $content[x].classList.contains('show')) {
                $content[x].classList.remove('show')
                $('.' + $content[x].id)[0].style.borderRadius = '.8rem'
            }
        }
    }
    
    // This code block attaches an close button to each section
	$sections.each(function() {
        let $this = $(this)
		$('<span class="fa-times close"></span>')
			.appendTo($this)
			.on('click', function() {
				location.hash = ''
            })
    })
    
    // When the body is clicked on while a section is visible the web page will return home
    $body.on('click', function(event) {
        if ($body.hasClass('is-section-visible')) {
            if (event.target.id === 'wrapper') {
                location.hash = ''
                if ($projects.hasClass('active')) {
                    $content._hide()
                }
            }
        }
    })
    
    // When the ESC key is clicked on while a section is visible the web page will return home
    $window.on('keyup', function(event) {
        if (event.keyCode === 27) {
            if ($body.hasClass('is-section-visible')) {
                location.hash = ''
                if ($projects.hasClass('active')) {
                    $content._hide()
                }
            } 
        }
    })

    // This code block will execute when the hash changes
    $window.on('hashchange', function() {
        if (location.hash === '' ||	location.hash === '#') {
            $home.addClass('onSectionActive')
            window.setTimeout(function() {
                $home.removeClass('onSectionActive')
            }, 500)
            $wrapper._hide()
        } else if ($sections.filter(location.hash).length > 0) {
            $wrapper._show(location.hash.substr(1))
        }
    })

	// This line hides all sections
    $sections.hide()

    // This code block initializes the application on page load to show the home page or other section based on certain conditions met
    $window.on('load', function() {
        window.setTimeout(function() {
            $body.removeClass('is-preload')
        }, 100)

        if (location.hash === '' ||	location.hash === '#') {
            $home.addClass('onSectionActive')
            window.setTimeout(function() {
                $home.removeClass('onSectionActive')
            }, 500)
            $wrapper._hide()
        } else {
            $wrapper._show(location.hash.substr(1))
        }
    })
})(jQuery)