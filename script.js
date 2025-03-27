// Sidemenu Handling 
var sidemen = document.getElementById("sidemenu");
var menuToggle = document.querySelector(".fa-bars");
var closeMenuBtn = document.querySelector(".fa-xmark");
var menuLinks = document.querySelectorAll("#sidemenu a");

function openmenu() {
    if (window.innerWidth <= 768) {
        sidemen.style.right = "0";
        sidemen.style.display = "block";
        menuToggle.style.display = "none";
        closeMenuBtn.style.display = "block";
        document.body.style.overflow = "hidden";
        sidemen.classList.add("active");
    }
}

function closemenu() {
    if (window.innerWidth <= 768) {
        sidemen.style.right = "-100%";
        document.body.style.overflow = "";
        sidemen.classList.remove("active");
        menuToggle.style.display = "block";
        closeMenuBtn.style.display = "none";
    }
}

menuLinks.forEach(link => link.addEventListener("click", closemenu));
document.addEventListener("click", function (event) {
    if (!sidemen.contains(event.target) && !menuToggle.contains(event.target)) closemenu();
});
if (menuToggle) menuToggle.addEventListener("click", openmenu);
if (closeMenuBtn) closeMenuBtn.addEventListener("click", closemenu);



// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.nav-container');
    const toggle = document.querySelector('.fa-bars');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(0,0,0,0.95)';
        nav.style.padding = '10px 5%';
        toggle.style.top = '15px';
    } else {
        nav.style.background = 'rgba(0,0,0,0.8)';
        nav.style.padding = '20px 5%';
        toggle.style.top = '25px';
    }
});

// Audio Player Functionality
let currentAudio = null;
let currentProgressBar = null;

function togglePlay(audioId) {
    const audio = document.getElementById(audioId);
    const playBtn = audio.nextElementSibling;
    const progressBar = playBtn.nextElementSibling.querySelector('.progress');
    
    // If there's another audio playing, stop it
    if (currentAudio && currentAudio !== audio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentProgressBar.style.width = '0%';
        currentAudio.previousElementSibling.querySelector('i').className = 'fas fa-play';
    }
    
    // Toggle current audio
    if (audio.paused) {
        audio.play();
        playBtn.querySelector('i').className = 'fas fa-pause';
        currentAudio = audio;
        currentProgressBar = progressBar;
    } else {
        audio.pause();
        playBtn.querySelector('i').className = 'fas fa-play';
        currentAudio = null;
        currentProgressBar = null;
    }
    
    // Update progress bar
    audio.addEventListener('timeupdate', () => {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = `${progress}%`;
    });
}

// Add click event to progress bars
document.querySelectorAll('.progress-bar').forEach(bar => {
    bar.addEventListener('click', (e) => {
        const progressBar = e.currentTarget;
        const audio = progressBar.previousElementSibling.previousElementSibling;
        const rect = progressBar.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / progressBar.offsetWidth;
        audio.currentTime = pos * audio.duration;
    });
});

// Scroll Animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Add active class to child elements with animation classes
            entry.target.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in').forEach(el => {
                el.classList.add('active');
            });
        }
    });
}, observerOptions);

// Observe all sections and animated elements
document.querySelectorAll('section, .section-title, .about-container, .awards-container, .music-grid, .events-container, .contact-left, .contact-right').forEach(el => {
    observer.observe(el);
});

// Add animation classes to elements
document.querySelectorAll('.award-card').forEach(el => el.classList.add('fade-in'));
document.querySelectorAll('.music-card').forEach(el => el.classList.add('scale-in'));
document.querySelectorAll('.event-card').forEach(el => el.classList.add('slide-in-left'));
document.querySelector('.about-image').classList.add('slide-in-right');
document.querySelector('.about-text').classList.add('slide-in-left');

// Add scroll progress indicator
const scrollProgress = document.createElement('div');
scrollProgress.className = 'scroll-progress';
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.setProperty('--scroll', `${scrolled}%`);
});

// Add hover animations to cards
document.querySelectorAll('.award-card, .music-card, .event-card').forEach(el => {
    el.classList.add('hover-lift');
});

// Add continuous animations
document.querySelectorAll('.social-icons a').forEach(el => {
    el.classList.add('hover-scale');
});