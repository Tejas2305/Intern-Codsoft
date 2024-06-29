document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    window.addEventListener('scroll', function () {
        if (window.matchMedia('only screen and (min-width: 1200px)').matches) {
            const header = document.querySelector('.ttm-stickable-header');
            if (window.scrollY >= 50) {
                header.classList.add('fixed-header', 'visible-title');
            } else {
                header.classList.remove('fixed-header', 'visible-title');
            }
        }
        else {
            var headerElement = document.getElementById("ttm-stickable-header-w");
            console.log("1");

            if (headerElement) {
                console.log("2");
                headerElement.classList.add('fixed-header');
            }
        }
    });

    document.querySelectorAll('ul.dropdown li').forEach(li => {
        li.addEventListener('mouseenter', () => li.classList.add('hover'));
        li.addEventListener('mouseleave', () => li.classList.remove('hover'));
    });

    const menu = document.getElementById('menu'), menulink = document.getElementById('menu-toggle-form'), menuTrigger = document.querySelectorAll('.has-submenu > a');
    menulink.addEventListener('click', () => {
        menulink.classList.toggle('active');
        menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    });
    menuTrigger.forEach(trigger => {
        trigger.addEventListener('click', function (e) {
            e.preventDefault();
            this.classList.toggle('active');
            this.nextElementSibling.classList.toggle('active');
        });
    });

    document.querySelectorAll("[data-appear-animation]").forEach(el => {
        const animation = el.dataset.appearAnimation, delay = el.dataset.appearAnimationDelay || 0;
        el.innerHTML = '0';

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !el.classList.contains('completed')) {
                    const from = parseInt(el.dataset.from, 10);
                    const to = parseInt(el.dataset.to, 10);
                    const interval = parseInt(el.dataset.interval, 10);
                    const duration = 2000;
                    const stepTime = Math.abs(Math.floor(duration / (to - from)));
                    let current = from;
                    const increment = to > from ? 1 : -1;

                    const counter = setInterval(() => {
                        current += increment;
                        el.innerHTML = current;
                        if (current === to) {
                            clearInterval(counter);
                            el.classList.add('completed');
                        }
                    }, stepTime);

                    observer.unobserve(el); 
                }
            });
        }, { threshold: 0.85 });

        observer.observe(el);

    });

    const toggles = document.querySelectorAll('.toggle');
    if (toggles.length > 0) {
        toggles[0].classList.add('active');
        toggles[0].querySelector('.toggle-content').style.display = 'block';
    }
    document.querySelectorAll('.accordion .toggle-title').forEach(title => {
        title.addEventListener('click', function () {
            const content = this.nextElementSibling;
            content.style.display = content.style.display === 'block' ? 'none' : 'block';
            this.parentElement.classList.toggle('active');
            Array.from(this.parentElement.parentElement.children).forEach(sibling => {
                if (sibling !== this.parentElement) {
                    sibling.classList.remove('active');
                    sibling.querySelector('.toggle-content').style.display = 'none';
                }
            });
        });
    });

    document.querySelectorAll('[data-scroll]').forEach(scroll => {
        scroll.addEventListener('click', function (event) {
            event.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
        });
    });

});