export function validateName(input) {
  const value = input.value.trim();

  // 1. Проверка на пустое значение
  if (value === "") {
    return {
      isValid: false,
      message: "Поле не может быть пустым",
    };
  }

  // 2. Проверка минимальной длины
  if (value.length < 2) {
    return {
      isValid: false,
      message: "Минимум 2 символа",
    };
  }

  // 3. Проверка максимальной длины
  if (value.length > 50) {
    return {
      isValid: false,
      message: "Максимум 50 символов",
    };
  }

  // 4. Проверка на допустимые символы
  const nameRegex = /^[а-яА-ЯёЁa-zA-Z\-]+$/;
  if (!nameRegex.test(value)) {
    return {
      isValid: false,
      message: "Только буквы и дефис",
    };
  }

  //Все проверки пройдены
  return {
    isValid: true,
    message: "",
  };
}
