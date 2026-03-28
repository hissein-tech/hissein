// Effet de texte dynamique
const typedTextElement = document.getElementById('typed-text');
const texts = ['Hissein Ousman', 'Développeur Web', 'Créateur Digital'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typedTextElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedTextElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
        return;
    }
    
    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(typeEffect, 500);
        return;
    }
    
    setTimeout(typeEffect, isDeleting ? 100 : 200);
}

// Démarrer l'effet de texte
if (typedTextElement) {
    typeEffect();
}

// Menu burger pour mobile
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    burger.classList.toggle('active');
});

// Fermer le menu mobile lors du clic sur un lien
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        burger.classList.remove('active');
    });
});

// Animation des barres de compétences au scroll
const skillBars = document.querySelectorAll('.skill-progress');

function animateSkills() {
    skillBars.forEach(bar => {
        const barPosition = bar.getBoundingClientRect().top;
        const screenPosition = window.innerHeight;
        
        if (barPosition < screenPosition) {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        }
    });
}

// Animation au scroll
window.addEventListener('scroll', () => {
    animateSkills();
    
    // Navigation active
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});

// Portfolio dynamique
const projects = [
    {
        title: 'Application E-commerce',
        description: 'Plateforme de vente en ligne complète avec panier et paiement',
        image: 'https://via.placeholder.com/300x200/4CAF50/ffffff?text=E-commerce',
        tech: ['React', 'Node.js', 'MongoDB']
    },
    {
        title: 'Dashboard Analytics',
        description: 'Tableau de bord interactif pour visualisation de données',
        image: 'https://via.placeholder.com/300x200/2196F3/ffffff?text=Dashboard',
        tech: ['Vue.js', 'D3.js', 'Express']
    },
    {
        title: 'Application Mobile',
        description: 'Application de gestion de tâches multiplateforme',
        image: 'https://via.placeholder.com/300x200/FF9800/ffffff?text=Mobile',
        tech: ['React Native', 'Firebase', 'Redux']
    }
];

function createPortfolioItems() {
    const portfolioGrid = document.getElementById('portfolio-grid');
    if (!portfolioGrid) return;
    
    projects.forEach(project => {
        const portfolioItem = document.createElement('div');
        portfolioItem.className = 'portfolio-item';
        
        portfolioItem.innerHTML = `
            <img src="${project.image}" alt="${project.title}">
            <div class="portfolio-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="portfolio-tech">
                    ${project.tech.map(tech => `<span>${tech}</span>`).join('')}
                </div>
            </div>
        `;
        
        portfolioGrid.appendChild(portfolioItem);
    });
}

// Formulaire de contact
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // Simulation d'envoi de formulaire
        formMessage.innerHTML = '<p style="color: green;">Message envoyé avec succès !</p>';
        formMessage.style.color = 'green';
        
        // Réinitialiser le formulaire
        contactForm.reset();
        
        // Effacer le message après 5 secondes
        setTimeout(() => {
            formMessage.innerHTML = '';
        }, 5000);
    });
}

// Téléchargement du CV
const downloadBtn = document.getElementById('download-cv');
if (downloadBtn) {
    downloadBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Création d'un CV virtuel en PDF
        const cvContent = `
            CV de John Doe
            Développeur Full Stack
            
            Expérience professionnelle :
            - 5+ ans en développement web
            - Expert React, Node.js, Python
            - Projets internationaux
            
            Formation :
            - Master Informatique
            - Certifications Google, AWS
            
            Contact : john.doe@email.com
        `;
        
        const blob = new Blob([cvContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'CV_John_Doe.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });
}

// Smooth scroll pour les liens d'ancrage
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Effet de révélation au scroll
const revealElements = document.querySelectorAll('.skill-item, .portfolio-item, .timeline-item');

function revealOnScroll() {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('revealed');
        }
    });
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    createPortfolioItems();
    animateSkills();
    revealOnScroll();
    
    // Ajout de styles pour l'animation de révélation
    const style = document.createElement('style');
    style.textContent = `
        .skill-item, .portfolio-item, .timeline-item {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .skill-item.revealed, .portfolio-item.revealed, .timeline-item.revealed {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
});

window.addEventListener('scroll', revealOnScroll);