document.addEventListener('DOMContentLoaded', function () {

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    var options = {
        strings: ["Developer", "Student", "Designer", "GDSC Member"],
        typeSpeed: 80,
        backSpeed: 80,
        backDelay: 1000,
        loop: true
    };
    var typed = new Typed("#typed-text", options);

    async function progressBarAndCountNumber() {
        await sleep(2500);
        const progress = document.querySelectorAll('.progress');
        let count = 0;
        let MAX = 100;
        let run = setInterval(() => {
            count++;
            progress.forEach(element => {
                if (count <= element.dataset.progress) {
                    element.parentElement.style.background = `conic-gradient(#f9004d ${count}%, #212428 0)`;
                    element.firstElementChild.textContent = `${count}%`;
                }
                if (count == MAX) {
                    clearInterval(run);
                }
            });
        }, 20);
    }

    const headerLinks = document.querySelectorAll('.header-link');
    headerLinks.forEach(link => {
        link.addEventListener('click', () => {
            headerLinks.forEach(link => {
                link.classList.remove('active');
            });
            link.classList.add('active');
        });
    });

    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.header-link');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').substring(1) === entry.target.id) {
                        link.classList.add('active');
                        if (link.getAttribute('href').substring(1) === "skill") {
                            progressBarAndCountNumber();
                        }
                    }
                });
            }
        });
    }, observerOptions);
    sections.forEach(section => {
        observer.observe(section);
    });

    setTimeout(function () {
        document.body.classList.add('loaded');
    }, 1000);
});