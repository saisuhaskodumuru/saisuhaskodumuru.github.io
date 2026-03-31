/**
* Modern Form Handling for Static Sites (Formspree Integration)
* Replaces the old PHP-dependent validate.js
*/
(function () {
  "use strict";

  let forms = document.querySelectorAll('.php-email-form');

  forms.forEach( function(e) {
    e.addEventListener('submit', function(event) {
      event.preventDefault();

      let thisForm = this;
      let action = thisForm.getAttribute('action');
      
      if( ! action || action.includes('contact.php') ) {
        displayError(thisForm, 'Please set a valid form endpoint (e.g., Formspree ID) to receive emails.');
        return;
      }

      thisForm.querySelector('.loading').classList.add('d-block');
      thisForm.querySelector('.error-message').classList.remove('d-block');
      thisForm.querySelector('.sent-message').classList.remove('d-block');

      let formData = new FormData( thisForm );

      fetch(action, {
        method: 'POST',
        body: formData,
        headers: {'Accept': 'application/json'}
      })
      .then(response => {
        if( response.ok ) {
          return response.json();
        } else {
          return response.json().then(data => {
            if (Object.hasOwn(data, 'errors')) {
              throw new Error(data["errors"].map(error => error["message"]).join(", "));
            } else {
              throw new Error('Form submission failed. Please try again.');
            }
          })
        }
      })
      .then(data => {
        thisForm.querySelector('.loading').classList.remove('d-block');
        thisForm.querySelector('.sent-message').classList.add('d-block');
        thisForm.reset(); 
      })
      .catch((error) => {
        displayError(thisForm, error);
      });
    });
  });

  function displayError(thisForm, error) {
    thisForm.querySelector('.loading').classList.remove('d-block');
    thisForm.querySelector('.error-message').innerHTML = error;
    thisForm.querySelector('.error-message').classList.add('d-block');
  }

})();
