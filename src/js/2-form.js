const STORAGE_KEY = 'feedback-form-state';

// Початковий об'єкт для збереження даних
const formData = {
  email: '',
  message: '',
};

const form = document.querySelector('.feedback-form');

// Завантажуємо збережені дані, якщо є, і заповнюємо форму + formData
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

// Зберігаємо у localStorage актуальний стан formData
function saveFormData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

// Обробник input події - оновлюємо formData і зберігаємо у localStorage
function onInput(event) {
  const target = event.target;

  // Очищаємо пробіли по краях під час вводу
  formData[target.name] = target.value.trim();

  saveFormData();
}

// Обробник сабміту форми
function onSubmit(event) {
  event.preventDefault();

  // Перевірка, чи всі поля заповнені
  if (formData.email === '' || formData.message === '') {
    alert('Fill please all fields');
    return;
  }

  console.log('Submitted form data:', formData);

  // Очищаємо локальне сховище і форму
  localStorage.removeItem(STORAGE_KEY);

  form.reset();

  // Очищаємо formData
  formData.email = '';
  formData.message = '';
}

// Ініціалізація
loadFormData();

form.addEventListener('input', onInput);
form.addEventListener('submit', onSubmit);
