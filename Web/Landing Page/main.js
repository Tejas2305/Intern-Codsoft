(function ($) {
    'use strict';

    // Preloader
    // makes sure the whole site is loaded

    // TopSearch
    const $searchLink = $(".ttm-header-search-link a");
    $searchLink.addClass('sclose').click(function (event) {
        $(".field.searchform-s").focus();
        const $icon = $(this).find('i');
        $(this).toggleClass('sclose open');
        $icon.toggleClass('ti-search ti-close');
        $(".ttm-search-overlay").toggleClass('st-show');
        event.preventDefault();
    });

    // Fixed-header
    $(window).scroll(function () {
        if (window.matchMedia('only screen and (min-width: 1200px)').matches) {
            const $header = $('.ttm-stickable-header');
            if ($(window).scrollTop() >= 50) {
                $header.addClass('fixed-header visible-title');
            } else {
                $header.removeClass('fixed-header visible-title');
            }
        }
    });

    // Menu
    $('ul li:has(ul)').addClass('has-submenu').children('ul').addClass('sub-menu');
    $('ul.dropdown li').hover(function () {
        $(this).toggleClass('hover');
    });

    const $menu = $('#menu'), $menulink = $('#menu-toggle-form'), $menuTrigger = $('.has-submenu > a');
    $menulink.click(() => $menulink.toggleClass('active') && $menu.toggleClass('active'));
    $menuTrigger.click(function (e) {
        e.preventDefault();
        $(this).toggleClass('active').next('ul').toggleClass('active');
    });

    // Animation on scroll: Number rotator
    $("[data-appear-animation]").each(function () {
        const self = $(this), animation = self.data("appear-animation"), delay = self.data("appear-animation-delay") || 0;
        if ($(window).width() > 959) {
            self.html('0').waypoint(function () {
                if (!self.hasClass('completed')) {
                    self.numinate({
                        format: '%counter%',
                        from: self.data('from'),
                        to: self.data('to'),
                        runningInterval: 2000,
                        stepUnit: self.data('interval'),
                        onComplete: () => self.addClass('completed')
                    });
                }
            }, { offset: '85%' });
        } else if (animation === 'animateWidth') {
            self.css('width', self.data("width"));
        }
    });

    // Skillbar
    $('.progress').each(function () {
        $(this).find('.progress-bar').animate({ width: $(this).attr('data-value') }, 6000);
    });

    // Tab
    $('.ttm-tabs').each(function () {
        const $this = $(this);
        $this.children('.content-tab').children().hide().first().show();
        $this.find('.tabs li').click(function (e) {
            e.preventDefault();
            const liActive = $(this).index();
            $(this).addClass('active').siblings().removeClass('active');
            $this.children('.content-tab').children().eq(liActive).addClass('active').fadeIn('slow').siblings().removeClass('active').hide();
        });
    });

    // Accordion
    $('.toggle').eq(0).addClass('active').find('.toggle-content').show();
    $('.accordion .toggle-title').click(function () {
        $(this).siblings('.toggle-content').slideToggle('fast').parent().toggleClass('active').siblings().removeClass('active').children('.toggle-content:visible').slideUp('fast');
    });

    // Isotope
    $(window).load(function () {
        const $container = $('#isotopeContainer');
        $('#filters a').click(function () {
            $container.isotope({ filter: $(this).attr('data-filter') });
            return false;
        });

        $('#filters li a').click(function () {
            const $this = $(this), $optionSet = $this.parents('#filters');
            if ($this.hasClass('selected')) return false;
            $optionSet.find('.selected').removeClass('selected');
            $this.addClass('selected');
            const options = {}, key = $optionSet.attr('data-option-key'), value = $this.attr('data-option-value') === 'false' ? false : $this.attr('data-option-value');
            options[key] = value;
            if (key === 'layoutMode' && typeof changeLayoutMode === 'function') {
                changeLayoutMode($this, options);
            } else {
                $container.isotope(options);
            }
            return false;
        });
    });

    // Prettyphoto
    $(document).ready(function () {
        $('a[href*=".jpg"], a[href*=".jpeg"], a[href*=".png"], a[href*=".gif"]').each(function () {
            if (!$(this).attr('target') && !$(this).hasClass('prettyphoto') && !$(this).hasClass('modula-lightbox')) {
                $(this).attr('data-rel', 'prettyPhoto');
            }
        });
        $('a[data-gal^="prettyPhoto"], a.ttm_prettyphoto').prettyPhoto({ hook: 'data-gal' });
    });

    // owlCarousel
    const owlCarouselSettings = {
        loop: true,
        margin: 0,
        smartSpeed: 3000,
        responsive: {
            0: { items: 1 },
            600: { items: 2 },
            1000: { items: 3 }
        }
    };

    $(".testimonial-slide, .blog-slide, .post-slide, .featured-slide, .team-slide, .clients-slide, .portfolio-slide, .portfolio-img-slide, .event-slide").each(function () {
        const $this = $(this);
        $this.owlCarousel($.extend({}, owlCarouselSettings, {
            nav: $this.data('nav'),
            dots: $this.data('dots'),
            autoplay: $this.data('auto'),
            responsive: {
                0: { items: 1 },
                480: { items: 2 },
                768: { items: 3 },
                1200: { items: $this.data('item') }
            }
        }));
    });

    // One Page setting
    $(document).ready(function () {
        $('[data-scroll]').click(function (event) {
            event.preventDefault();
            $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top }, 500);
        });
    });

    // Back to top
    const $totop = $('#totop');
    $totop.hide();
    $(window).scroll(function () {
        $(this).scrollTop() >= 100 ? $totop.fadeIn(200).addClass('top-visible') : $totop.fadeOut(200).removeClass('top-visible');
    });
    $totop.click(function () {
        $('body,html').animate({ scrollTop: 0 }, 500);
        return false;
    });

})(jQuery);