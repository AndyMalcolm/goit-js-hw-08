import throttle from 'lodash.throttle';

const feedbackForm = document.querySelector('.feedback-form');
const emailInput = feedbackForm.querySelector('input[name="email"]');
const messageInput = feedbackForm.querySelector('textarea[name="message"]');

window.addEventListener('load', () => {
  const storedState = localStorage.getItem('feedback-form-state');
  if (storedState) {
    const { email, message } = JSON.parse(storedState);
    emailInput.value = email;
    messageInput.value = message;
  }
});

const saveStateThrottled = throttle(() => {
  const currentState = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(currentState));
}, 500);

emailInput.addEventListener('input', saveStateThrottled);
messageInput.addEventListener('input', saveStateThrottled);

feedbackForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (emailInput.value && messageInput.value) {
    localStorage.removeItem('feedback-form-state');
    emailInput.value = '';
    messageInput.value = '';
    console.log('Submitted data:', {
      email: emailInput.value,
      message: messageInput.value,
    });
  }
});