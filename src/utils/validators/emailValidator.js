export function validateEmail(input) {
  const value = input.value.trim();

  // 1. Проверяем на пустое поле
  if (value === "") {
    return {
      isValid: false,
      message: "Email должен быть заполнен",
    };
  }

  // 2. Проверка формата Email через регульрное выражение
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(value)) {
    return {
      isValid: false,
      message: "Введите корректный email (например: user@example.com)",
    };
  }

  // Если все проверки пройдены, то
  return {
    isValid: true,
    message: "",
  };
}
