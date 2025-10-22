export function showSuccess(input) {
  // Убираем класс inValid
  input.classList.remove("invalid");

  // Добавляем класс valid
  input.classList.add("valid");

  //  Находим родителя .form-field
  const parent = input.closest(".form-field");
  // Находим сообщение об ошибке (если оно есть)
  const errorMessage = parent.querySelector(".error-message");

  // Если нашли сообщение то удаляем его
  if (errorMessage) {
    errorMessage.remove();
  }
}

export function showError(input, message) {
  input.classList.remove("valid");
  input.classList.add("invalid");

  //  Находим родителя .form-field
  const parent = input.closest(".form-field");
  //  Ищем ошибку внутри родителя
  let errorMessage = parent.querySelector(".error-message");

  if (!errorMessage) {
    // Создаем новую ошибку
    errorMessage = document.createElement("span");
    errorMessage.classList.add("error-message");
    parent.append(errorMessage);
  }

  // Обновляем текст
  errorMessage.textContent = message;
}

export function resetFieldState(input) {
  // Убираем класс valid и invalid
  input.classList.remove("valid", "invalid");

  //  Находим родителя .form-field
  const parent = input.closest(".form-field");
  // Находим и удаляем сообщение об ошибке если оно есть
  const errorMessage = parent.querySelector(".error-message");
  if (errorMessage) {
    errorMessage.remove();
  }
}
