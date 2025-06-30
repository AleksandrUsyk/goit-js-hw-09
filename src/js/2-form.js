const STORAGE_KEY = 'feedback-form-state';

const formData = {
  email: '',
  message: '',
};

const form = document.querySelector('.feedback-form');

function loadFormData() {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (!savedData) return;

    const parsedData = JSON.parse(savedData);

    formData.email = parsedData.email ?? '';
    formData.message = parsedData.message ?? '';

    form.email.value = formData.email;
    form.message.value = formData.message;
  } catch (error) {
    console.error('Помилка при завантаженні даних з localStorage:', error);
  }
}

function saveFormData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onInput(event) {
  const target = event.target;

  formData[target.name] = target.value.trim();

  saveFormData();
}

function onSubmit(event) {
  event.preventDefault();

  if (formData.email === '' || formData.message === '') {
    alert('Fill please all fields');
    return;
  }

  console.log('Submitted form data:', formData);

  localStorage.removeItem(STORAGE_KEY);

  form.reset();

  formData.email = '';
  formData.message = '';
}

loadFormData();

form.addEventListener('input', onInput);
form.addEventListener('submit', onSubmit);
