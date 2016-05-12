(function($, win) {
    "use strict";
    var connector = function(itemNavigation, carouselStage) {
        return carouselStage.jcarousel('items').eq(itemNavigation.index());
    };
    var Jcarousel = $.Jcarousel = (function() {
        var
            $carouselStage = null,
            $carouselNavigation = null,
            $prev = null,
            $next = null,
            $carousel = null;

        function init() {

            $carousel = $('.carousel');
            $prev = $('.prev-stage');
            $next = $('.next-stage');
            $carouselStage = $('.carousel-stage');
            $carouselNavigation = $('.carousel-navigation');

            carousel();
            autoPlay();
            controls();
        }

        function carousel() {
            $carouselStage.jcarousel();
            $carouselNavigation.jcarousel();

            // We loop through the items of the navigation carousel and set it up
            // as a control for an item from the stage carousel.
            $carouselNavigation.jcarousel('items').each(function(e) {
                var item = $(this);

                // This is where we actually connect to items.
                var target = connector(item, $carouselStage);

                item
                    .on('jcarouselcontrol:active', function(e) {
                        $carouselNavigation.jcarousel('scrollIntoView', this);
                        item.addClass('active');
                    })
                    .on('jcarouselcontrol:inactive', function(e) {
                        item.removeClass('active');
                    })
                    .jcarouselControl({
                        target: target,
                        carousel: $carouselStage
                    });
            });

        }
        // Setup controls for the stage carousel
        function controls() {
            $prev
                .on('jcarouselcontrol:inactive', function(e) {
                    event.preventDefault();
                    $(this).addClass('inactive');
                })
                .on('jcarouselcontrol:active', function(e) {
                    event.preventDefault();
                    $(this).removeClass('inactive');
                })
                .jcarouselControl({
                    target: '-=1'
                });

            $next
                .on('jcarouselcontrol:inactive', function(e) {
                    event.preventDefault();
                    $(this).addClass('inactive');
                })
                .on('jcarouselcontrol:active', function(e) {
                    event.preventDefault();
                    $(this).removeClass('inactive');
                })
                .jcarouselControl({
                    target: '+=1'
                });
        }

        function autoPlay() {
            $carousel
                .jcarouselAutoscroll({
                    autostart: true,
                    interval: 2000,
                    target: '+=1'
                })
                .jcarousel({
                    wrap: 'circular'
                });
        }

        return {
            init: init
        };

    })();

    $(Jcarousel.init);

})(jQuery, window);
