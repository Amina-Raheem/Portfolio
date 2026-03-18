document.addEventListener('DOMContentLoaded', () => {
    // Mapping of navigation link text to their respective section classes or tags
    const navMapping = {
        'Amina Raheem': '.first',
        'About': '.second',
        'Education': '.third',
        'Tools & Tech': '.fourth',
        'Projects': '.fifth',
        'Certifications': '.sixth',
        'Contact': 'footer'
    };

    // Select all the navigation links
    const navLinks = document.querySelectorAll('header nav ul li a');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent jump to #

            const linkText = link.textContent.trim();
            const targetSelector = navMapping[linkText];

            if (targetSelector) {
                const targetSection = document.querySelector(targetSelector);

                if (targetSection) {
                    // Remove the show class to force a replay of the animation upon arrival
                    targetSection.classList.remove('scroll-show');
                    
                    // Smoothly scroll to the target section
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // --- Typing Animation ---
    const introTextElement = document.querySelector('#text h5');
    if (introTextElement) {
        const originalHtml = introTextElement.innerHTML.trim().replace(/\s+/g, ' ');
        introTextElement.innerHTML = '';

        const style = document.createElement('style');
        style.textContent = `
            .typing-cursor { font-weight: bold; color: #00ff00; }
            .typing-cursor.blinking { animation: blink 1s step-end infinite; }
            @keyframes blink { 50% { opacity: 0; } }
        `;
        document.head.appendChild(style);

        let i = 0;
        let isTag = false;
        let currentText = '';

        function typeWriter() {
            if (i < originalHtml.length) {
                const char = originalHtml.charAt(i);

                if (char === '<') isTag = true;

                currentText += char;
                introTextElement.innerHTML = currentText + '<span class="typing-cursor">|</span>';
                i++;

                if (char === '>') {
                    isTag = false;
                    typeWriter();
                    return;
                }

                if (isTag) typeWriter();
                else setTimeout(typeWriter, 50);
            } else {
                introTextElement.innerHTML = currentText + '<span class="typing-cursor blinking">|</span>';
            }
        }

        setTimeout(typeWriter, 500);
    }

    // --- Scroll Reveal Animation ---
    // Select all sections (except first/second) and the footer to animate
    const revealElements = document.querySelectorAll('section:not(.first):not(.second), footer');
    
    // Add the hidden class to all of them initially
    revealElements.forEach(el => {
        el.classList.add('scroll-hide');
    });

    // Create an intersection observer
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // When the element enters the viewport, add the show class
                entry.target.classList.add('scroll-show');
            } else {
                // Remove the show class when it leaves the viewport so the animation can replay
                entry.target.classList.remove('scroll-show');
            }
        });
    }, {
        root: null, 
        threshold: 0.15, // Trigger when 15% is visible
        rootMargin: "0px" 
    });

    // Start observing the elements
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
});
