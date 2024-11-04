// document.addEventListener("DOMContentLoaded", loadTestimonials); 

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href'); // Get the href attribute value
        const target = document.querySelector(targetId); // Select the target element

        // Check if target is valid
        if (target) {
            e.preventDefault();
            const navbarHeight = document.querySelector('.navbar').offsetHeight; // Get the height of the navbar
            const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight; // Calculate position minus navbar height

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});


// Testimonial Function coding 

function addTestimonial() {
            const name = document.getElementById('name').value;
            const review = document.getElementById('review').value;

            if (name && review) {
                const testimonial = { id: Date.now(), name, review };

                // Retrieve existing testimonials from local storage or initialize as empty array
                const testimonials = JSON.parse(localStorage.getItem('testimonials')) || [];
                testimonials.push(testimonial); // Add new testimonial
                localStorage.setItem('testimonials', JSON.stringify(testimonials)); // Save back to local storage

                displayTestimonial(testimonial); // Display the new testimonial
                document.getElementById('confirmation-message').style.display = 'block'; // Show confirmation
                document.getElementById('testimonialForm').reset(); // Reset the form
            } else {
                alert('Please fill in all fields.');
            }
        }

        // Function to display a testimonial
function displayTestimonial(testimonial) {
    const testimonialCard = `
        <div class="col-md-4 testimonial-card-container" id="testimonial-${testimonial.id}">
            <div class="card mb-4 shadow-sm testimonial-card">
                <div class="card-body">
                    <h5 class="card-title">${testimonial.name}</h5>
                    <p class="card-text">${testimonial.review}</p>
                    <button class="btn btn-danger" onclick="deleteTestimonial(${testimonial.id})">Delete</button>
                </div>
            </div>
        </div>
    `;
    document.getElementById('testimonial-list').innerHTML += testimonialCard; // Add the testimonial to the list
}

        // Function to delete a testimonial
function deleteTestimonial(id) {
    let testimonials = JSON.parse(localStorage.getItem('testimonials')) || [];
    testimonials = testimonials.filter(testimonial => testimonial.id !== id); // Remove the testimonial by id
    localStorage.setItem('testimonials', JSON.stringify(testimonials)); // Save updated list to local storage

    const testimonialElement = document.getElementById(`testimonial-${id}`);
    if (testimonialElement) {
        testimonialElement.remove(); // Remove from the DOM
    }
}

        // Function to load testimonials from local storage on page load
function loadTestimonials() {
    const testimonials = JSON.parse(localStorage.getItem('testimonials')) || [];
    testimonials.forEach(displayTestimonial); // Display each testimonial
}

window.onload = loadTestimonials; 

//  Form Controll Function
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form[action="https://formspree.io/f/xrbgpdne"]');
    const successMessage = document.getElementById("success-message");
    const errorMessage = document.getElementById("error-message");
    const confirmationMessageDiv = document.getElementById("contact-conform-message");
  
    form.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevents the default form submission
  
      // Fetch the form's action URL and prepare form data
      const formData = new FormData(form);
      const action = form.getAttribute('action');
      
      // Send form data using fetch
      fetch(action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      }).then(response => {
        confirmationMessageDiv.style.display = 'block';
        
        if (response.ok) {
          successMessage.style.display = 'block';
          errorMessage.style.display = 'none';
          form.reset(); 
        } else {
          successMessage.style.display = 'none';
          errorMessage.style.display = 'block';
        }
      }).catch(error => {
  
        // Show confirmation div with error message
        confirmationMessageDiv.style.display = 'block';
        successMessage.style.display = 'none';
        errorMessage.style.display = 'block';
      });
    });
  });


// ===============scroll reveal js===============

const sr = ScrollReveal({
    origin:'top',
    distance: '60px',
    duration: 2500,
    delay:400,
})
sr.reveal('.hero-left, .footer-add, .footer-links, .footer-social-links, .copyright')
sr.reveal('.profile-image, .msg-btn',{delay :700, origin: 'bottom'})
sr.reveal('.navbar-brand, .nav-item, .project-card-container, .testimonial-card-container, .testi-frm-btn, .msg-inp-top',{interval:100})
sr.reveal('.header, .left-skills, .education-item, .testi-frm-left-inp, .msg-inp-left',{origin:'left'})
sr.reveal('.right-skills, .testi-frm-right-inp, .msg-inp-right',{origin:'right'})
  