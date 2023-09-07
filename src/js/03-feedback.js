import throttle from 'lodash.throttle';

const feedbackForm = document.querySelector('.feedback-form');
const emailInput = feedbackForm.querySelector('input[name="email"]');
const messageInput = feedbackForm.querySelector('textarea[name="message"]');

function loadFormDataFromLocalStorage() {
  if (localStorage.getItem('feedback-form-state')) {
    const { email, message } = JSON.parse(localStorage.getItem('feedback-form-state'));
    emailInput.value = email;
    messageInput.value = message;
  }
}

function saveFormDataToLocalStorage() {
  const currentState = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(currentState));
}
loadFormDataFromLocalStorage();
emailInput.addEventListener('input', throttle(saveFormDataToLocalStorage, 500));
messageInput.addEventListener('input', throttle(saveFormDataToLocalStorage, 500));

feedbackForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (emailInput.value && messageInput.value) {
    emailInput.value = '';
    messageInput.value = '';
    localStorage.removeItem('feedback-form-state');
    console.log('Submitted data:', {
      email: emailInput.value,
      message: messageInput.value,
    });
  }
});


feedbackForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (emailInput.value && messageInput.value) {
    const submittedData = {
      email: emailInput.value,
      message: messageInput.value,
    };

    emailInput.value = '';
    messageInput.value = '';
    localStorage.removeItem('feedback-form-state');

    console.log('Submitted data:', submittedData);
  }
});
