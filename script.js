// Importation des modules Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-firestore.js";

// Configuration Firebase
const firebaseConfig = {
    apiKey: "AIzaSyB357nifyW9KUS9TcdPVmP0wazOflHuF6w",
    authDomain: "doudou-de285.firebaseapp.com",
    projectId: "doudou-de285",
    storageBucket: "doudou-de285.appspot.com",
    messagingSenderId: "939779729339",
    appId: "1:939779729339:web:198b90d80837f2d2a8069e",
    measurementId: "G-B1PNMF0DHT"
  };

// Initialisation Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Initialisation AOS
AOS.init();

// DOMContentLoaded Event Listener
document.addEventListener('DOMContentLoaded', function () {
    // Navbar Collapse on Link Click (for mobile)
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 992) {
                document.querySelector('.navbar-collapse').classList.remove('show');
            }
        });
    });

    // Testimonial Slider Initialization
    initTestimonialSlider();

    // Star Rating Initialization
    initStarRating();

    // Comment Form Submission
    document.getElementById('commentForm').addEventListener('submit', submitComment);

    // Load Existing Comments
    loadComments();
});

//Testimonials

function initTestimonialSlider() {
    let testimonialIndex = 0;
    const testimonials = document.querySelectorAll('.testimonial');
    const totalTestimonials = testimonials.length;

    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.classList.toggle('active', i === index);
        });
    }

    window.changeTestimonial = function(n) {
        testimonialIndex = (testimonialIndex + n + totalTestimonials) % totalTestimonials;
        showTestimonial(testimonialIndex);
    };

    // Auto-slide every 5 seconds
    setInterval(() => {
        changeTestimonial(1);
    }, 3000);
}


// Star Rating Functions
function initStarRating() {
    const stars = document.querySelectorAll('#starRating i');
    const ratingInput = document.getElementById('userRating');
    let selectedRating = 0;

    stars.forEach(star => {
        star.addEventListener('click', function () {
            selectedRating = this.getAttribute('data-value');
            ratingInput.value = selectedRating;
            highlightStars(selectedRating);
        });

        star.addEventListener('mouseover', function () {
            highlightStars(this.getAttribute('data-value'));
        });

        star.addEventListener('mouseout', function () {
            highlightStars(selectedRating);
        });
    });

    function highlightStars(rating) {
        stars.forEach(star => {
            if (star.getAttribute('data-value') <= rating) {
                star.classList.add('fas');
                star.classList.remove('far');
                star.classList.add('text-warning');
            } else {
                star.classList.add('far');
                star.classList.remove('fas');
                star.classList.remove('text-warning');
            }
        });
    }
}

// Submit Comment Function
async function submitComment(event) {
    event.preventDefault();

    const name = document.getElementById('userName').value.trim();
    const comment = document.getElementById('userComment').value.trim();
    const rating = document.getElementById('userRating').value;

    if (!name || !comment || !rating) {
        alert('Please fill in all fields and provide a rating.');
        return;
    }

    try {
        // Add comment to Firestore
        await addDoc(collection(db, "comments"), {
            name: name,
            comment: comment,
            rating: parseInt(rating),
            timestamp: new Date()
        });

        // Reset form
        document.getElementById('commentForm').reset();
        document.getElementById('userRating').value = '';
        highlightStars(0);

        // Reload comments
        loadComments();
    } catch (error) {
        console.error("Error adding comment: ", error);
    }
}

// Load Comments Function
async function loadComments() {
    const commentsList = document.getElementById('commentsList');
    commentsList.innerHTML = ''; // Clear existing comments

    try {
        const querySnapshot = await getDocs(collection(db, "comments"));
        querySnapshot.forEach((doc) => {
            const data = doc.data();

            const commentItem = document.createElement('div');
            commentItem.classList.add('comment-item', 'mb-4', 'p-3', 'border', 'rounded');

            const commentHeader = document.createElement('div');
            commentHeader.classList.add('d-flex', 'justify-content-between', 'mb-2');

            const commentAuthor = document.createElement('h5');
            commentAuthor.textContent = data.name;

            const commentRating = document.createElement('div');
            commentRating.innerHTML = getStarRatingHTML(data.rating);

            const commentText = document.createElement('p');
            commentText.textContent = data.comment;

            commentHeader.appendChild(commentAuthor);
            commentHeader.appendChild(commentRating);
            commentItem.appendChild(commentHeader);
            commentItem.appendChild(commentText);

            commentsList.appendChild(commentItem);
        });
    } catch (error) {
        console.error("Error loading comments: ", error);
    }
}

// Generate Star Rating HTML
function getStarRatingHTML(rating) {
    let starsHTML = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            starsHTML += '<i class="fas fa-star text-warning"></i>';
        } else {
            starsHTML += '<i class="far fa-star text-warning"></i>';
        }
    }
    return starsHTML;
}

// Highlight Stars (Used in both initStarRating and after submitting comment)
function highlightStars(rating) {
    const stars = document.querySelectorAll('#starRating i');
    stars.forEach(star => {
        if (star.getAttribute('data-value') <= rating) {
            star.classList.add('fas');
            star.classList.remove('far');
            star.classList.add('text-warning');
        } else {
            star.classList.add('far');
            star.classList.remove('fas');
            star.classList.remove('text-warning');
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('commentForm').addEventListener('submit', submitComment);
});
