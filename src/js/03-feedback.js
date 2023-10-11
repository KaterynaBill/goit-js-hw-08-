import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('[name="email"]');
const messageInput = form.querySelector('[name="message"]');

const LOCAL_STORAGE_KEY = 'feedback-form-state';

const saveToLocalStorage = () => {
  const formData = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
};

const loadFromLocalStorage = () => {
  const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (savedData) {
    const formData = JSON.parse(savedData);
    emailInput.value = formData.email;
    messageInput.value = formData.message;
  }
};

const throttledSave = throttle(saveToLocalStorage, 500);

emailInput.addEventListener('input', throttledSave);
messageInput.addEventListener('input', throttledSave);

window.addEventListener('load', loadFromLocalStorage);

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = {
    email: emailInput.value,
    message: messageInput.value,
  };

  console.log(formData);

  localStorage.removeItem(LOCAL_STORAGE_KEY);

  emailInput.value = '';
  messageInput.value = '';
});

