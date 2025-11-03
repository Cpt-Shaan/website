// Light / Dark mode
(function() {
    const themeToggle = document.getElementById('theme-toggle');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    const localTheme = localStorage.getItem('theme');

    // Set the correct theme on initial page load
    function setInitialTheme() {
        if (localTheme) {
            document.documentElement.setAttribute('data-theme', localTheme);
            if (themeToggle) {
                themeToggle.checked = (localTheme === 'dark');
            }
        } else if (systemPrefersDark.matches) {
            document.documentElement.setAttribute('data-theme', 'dark');
            if (themeToggle) {
                themeToggle.checked = true;
            }
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            if (themeToggle) {
                themeToggle.checked = false;
            }
        }
    }

    // Handle theme change when toggle is clicked
    function handleThemeToggle() {
        if (themeToggle.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', handleThemeToggle);
    }

    // Run the initial theme setting
    setInitialTheme();
})();


// Toggle
(function() {
    const nav = document.querySelector('.site-nav');
    const navToggle = document.querySelector('.mobile-nav-toggle');

    if (navToggle && nav) {
        navToggle.addEventListener('click', () => {
            nav.classList.toggle('nav-open');
        });
    }
    
    // Close mobile nav when a link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (nav && nav.classList.contains('nav-open')) {
                nav.classList.remove('nav-open');
            }
        });
    });
})();


// Scroll
(function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    if (sections.length === 0 || navLinks.length === 0) return;

    const observerOptions = {
        root: null, // observes intersections relative to the viewport
        rootMargin: '0px',
        threshold: 0.5 // 50% of the section must be visible
    };

    function observerCallback(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);

                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to the intersecting link
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
})();


// Modal logic for projects in grid
(function() {
    // Store project data in an array for easy updates
    const projects =[
        {   
            id: 1,
            title: "Project One: Document Analyzer",
            description:"YoLO based document-anlayzer, for segmentation of different sections.",
            features:"Resourceful at its very best",
            githubLink: "https://github.com/Cpt-Shaan/YOLO_DocSegmentation",
            liveLink: "https://yolodocsegmentation-es8sgqcljerv9ei2wgukq9.streamlit.app/"  
        },
        {
            id: 2,
            title: "Project Two: Image Super Resolution",
            description: "CNN (Convolutonal Neural Network) based model to convert low-resolution to high-resolution images.",
            features:"Robust, Effective and Optimal",
            githubLink: "https://github.com/Cpt-Shaan/FSRCNN",
            liveLink: "#"  
        },
        {
            id: 3,
            title: "Project Three: Expense Tracking System",
            description: "A raw implementation of a database from scratch using B-Tress to manage monthly and categorical family expenses.",
            features:"Easily Manageable, and interactive in use",
            githubLink: "https://github.com/Cpt-Shaan/Expense-Tracking-System",
            liveLink: "#"  
        }
    ];

    const modalOverlay = document.getElementById('project-modal-overlay');
    const modalBody = document.querySelector('.modal-body');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (!modalOverlay ||!modalBody ||!modalCloseBtn || projectCards.length === 0) return;

    function openModal(projectId) {
        const project = projects.find(p => p.id == projectId);
        if (!project) return; // Exit if project not found

        modalBody.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            
            <div class="modal-links">
                <a href="${project.githubLink}" class="btn btn-secondary" target="_blank" rel="noopener noreferrer">View on GitHub</a>
            </div>
        `;
        
        // Show the modal
        modalOverlay.classList.add('active');
    }

    function closeModal() {
        modalOverlay.classList.remove('active');
    }

    // Add click listeners to all project cards
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            openModal(card.dataset.projectId);
        });
    });

    // Add listeners for closing the modal
    modalCloseBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        // Close only if the overlay itself (the dark background) is clicked
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
})(); // End of Project Modal IIFE


// Newsletter
(function() {
    const newsletterForm = document.getElementById('newsletter-form');
    const formStatus = document.getElementById('form-status');

    if (!newsletterForm) return;

    newsletterForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(event.target);

        const data = Object.fromEntries(formData.entries());

        console.log("Form Submitted. Data:", data);

        if (formStatus) {
            formStatus.textContent = "Thank you! Your submission has been received (and logged to console).";
            formStatus.style.color = "green";
        }

        event.target.reset();

        setTimeout(() => {
            if (formStatus) formStatus.textContent = "";
        }, 5000);
    });
})();

// Fade-in on Scroll Animation
(function() {
    const elementsToFadeIn = document.querySelectorAll('.fade-in-element');
    if (!elementsToFadeIn) return;

    const observerOptions = {
        root: null,
        threshold: 0.1, // Start animation when 10% of the element is visible
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    elementsToFadeIn.forEach(el => {
        observer.observe(el);
    });
})();