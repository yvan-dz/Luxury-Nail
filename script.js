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
