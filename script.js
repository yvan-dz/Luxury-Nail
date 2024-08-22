// Import Firebase dependencies
import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBD9qK_e5HiU3DT_80YVLs9Sux_g6lWp6A",
  authDomain: "nails-bc51a.firebaseapp.com",
  projectId: "nails-bc51a",
  storageBucket: "nails-bc51a.appspot.com",
  messagingSenderId: "96414301953",
  appId: "1:96414301953:web:6effbbd0d91c71d2556500",
  measurementId: "G-N2CJZQLFY6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', () => {
  const usernameModal = new bootstrap.Modal(document.getElementById('usernameModal'));
  const saveUsernameBtn = document.getElementById('saveUsernameBtn');
  const usernameInput = document.getElementById('usernameInput');

  // Show modal on page load
  usernameModal.show();

  saveUsernameBtn.addEventListener('click', async () => {
    const username = usernameInput.value.trim();
    if (username) {
      try {
        // Sign in anonymously
        const userCredential = await signInAnonymously(auth);
        const user = userCredential.user;

        // Save the username in Firestore
        await setDoc(doc(db, "users", user.uid), {
          username: username
        });

        // Hide the modal
        usernameModal.hide();

        // You can now use the username for further identification
        console.log(`User signed in as: ${username}`);
      } catch (error) {
        console.error("Error signing in anonymously or saving username:", error);
      }
    } else {
      alert("Please enter a username.");
    }
  });
});


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