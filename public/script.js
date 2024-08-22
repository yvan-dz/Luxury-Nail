let testimonialIndex = 0;

function showTestimonial(n) {
    const testimonials = document.querySelectorAll('.testimonial');
    testimonialIndex = (n + testimonials.length) % testimonials.length;
    testimonials.forEach((testimonial, index) => {
        testimonial.classList.remove('active');
        if (index === testimonialIndex) {
            testimonial.classList.add('active');
        }
    });
}

function changeTestimonial(n) {
    showTestimonial(testimonialIndex + n);
}
 // Attacher un événement de clic à tous les liens de la navbar
 document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1); // Obtenir l'ID de la section cible
        const targetSection = document.getElementById(targetId);
        
        // Cacher toutes les sections
        document.querySelectorAll('section').forEach(section => {
            section.classList.remove('active-section');
        });
        
        // Afficher la section cible
        targetSection.classList.add('active-section');
    });
});

// Afficher la première section par défaut
document.getElementById('home').classList.add('active-section');