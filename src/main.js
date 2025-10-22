import "./styles/style.css";

import { validateName } from "./utils/validators/nameValidator";
import { showSuccess, showError, resetFieldState } from "./utils/ui/fieldState";
import { validateEmail } from "./utils/validators/emailValidator";
import { validatePassword } from "./utils/validators/passwordValidator";
import { passwordToggle } from "./utils/ui/passwordToggle";
import { confirmPasswordValidator } from "./utils/validators/confirmPasswordValidator";
import { validateAge } from "./utils/validators/ageValidator";

/**
 * Элементы в DOM
 */
// Форма
const form = document.querySelector(".formRegistrations");

// Поле ввода имени и фамилии
const firstNameInput = document.querySelector("#firstName");
const lastNameInput = document.querySelector("#lastName");

// Поле ввода email
const emailInput = document.querySelector("#email");

// Поле ввода пароля
const passwordInput = document.querySelector("#password");
const passwordToggleButton = document.querySelector("#password-toggle");

// Поле подтверждения пароля
const confirmPasswordInput = document.querySelector("#confirmPassword");
const confirmPasswordToggleButton = document.querySelector("#confirm-password-toggle");

// Поле даты рождения
const ageInput = document.querySelector("#birthDay");

// Кнопка отправки
const submitButton = document.querySelector(".buttonSubmit");

/**
 * Валидация даты рождения в реальном времени
 */
ageInput.addEventListener("input", () => {
  handleValidation(ageInput, validateAge);
});

/**
 * Проверка требований пароля в реальном времени
 */
passwordInput.addEventListener("input", () => {
  const value = passwordInput.value;

  // Проверяем каждое условие и меняем класс
  document.querySelector("#request-length").classList.toggle("valid", value.length >= 8);
  document.querySelector("#request-upper").classList.toggle("valid", /[A-Z]/.test(value));
  document.querySelector("#request-lower").classList.toggle("valid", /[a-z]/.test(value));
  document.querySelector("#request-number").classList.toggle("valid", /[0-9]/.test(value));

  // Перепроверяем подтверждение пароля если оно заполнено
  if (confirmPasswordInput.value !== "") {
    checkPassword();
  }
});

/**
 * Показ/скрытие пароля
 */
passwordToggle(passwordInput, passwordToggleButton);
passwordToggle(confirmPasswordInput, confirmPasswordToggleButton);

/**
 * Функция для проверки совпадения паролей
 */
function checkPassword() {
  const result = confirmPasswordValidator(passwordInput, confirmPasswordInput);

  if (result.isValid) {
    showSuccess(confirmPasswordInput);
  } else {
    showError(confirmPasswordInput, result.message);
  }

  checkFormValidity();
}

/**
 * Валидация при уходе с поля подтверждения пароля
 */
confirmPasswordInput.addEventListener("blur", () => {
  checkPassword();
});

/**
 * Обработчик валидации
 */
function handleValidation(input, validator) {
  const result = validator(input);

  if (result.isValid) {
    showSuccess(input);
  } else {
    showError(input, result.message);
  }

  checkFormValidity();
}

/**
 * Слушаем события blur на полях
 */
// Имя
firstNameInput.addEventListener("blur", () => {
  handleValidation(firstNameInput, validateName);
});

// Фамилия
lastNameInput.addEventListener("blur", () => {
  handleValidation(lastNameInput, validateName);
});

// Email
emailInput.addEventListener("blur", () => {
  handleValidation(emailInput, validateEmail);
});

// Пароль
passwordInput.addEventListener("blur", () => {
  handleValidation(passwordInput, validatePassword);
});

/**
 * Проверка валидности всей формы
 */
function checkFormValidity() {
  const isFirstNameValid = validateName(firstNameInput).isValid;
  const isLastNameValid = validateName(lastNameInput).isValid;
  const isEmailValid = validateEmail(emailInput).isValid;
  const isPasswordValid = validatePassword(passwordInput).isValid;
  const isConfirmPasswordValid = confirmPasswordValidator(passwordInput, confirmPasswordInput).isValid;
  const isAgeValid = validateAge(ageInput).isValid;

  const allValid =
    isFirstNameValid && isLastNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid && isAgeValid;

  submitButton.disabled = !allValid;
}

// Начальная проверка при загрузке
checkFormValidity();

/**
 * Обработка отправки формы
 */
form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!submitButton.disabled) {
    // Собираем данные формы
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Выводим в консоль
    console.log("📤 Данные для отправки на сервер:");
    console.log(data);

    // Уведомляем пользователя
    alert("✅ Регистрация успешна!\n\nДанные отправлены (проверьте консоль)");

    // Очищаем форму
    form.reset();

    // Сбрасываем состояние всех полей
    [firstNameInput, lastNameInput, emailInput, passwordInput, confirmPasswordInput, ageInput].forEach((input) => {
      resetFieldState(input);
    });

    // Сбрасываем галочки требований пароля
    document.querySelectorAll(".password-requirements li").forEach((li) => {
      li.classList.remove("valid");
    });

    // Обновляем состояние кнопки
    checkFormValidity();
  } else {
    alert("❌ Пожалуйста, заполните все поля правильно");
  }
});
