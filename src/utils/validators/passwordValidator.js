export function validatePassword(input) {
  const value = input.value;

  // 1. Проверяем длинну пароля
  if (value.length < 8) {
    return {
      isValid: false,
      message: "Пароль должен содержать 8 и более символов",
    };
  }

  // 2. Проверяем минимум одну заглавную буквую с помощью регулярного выражения
  const passwordRegexAZ = /[A-Z]/;
  if (!passwordRegexAZ.test(value)) {
    return {
      isValid: false,
      message: "Пароль должен содержать минимум одну заглавную букву",
    };
  }

  // 3. Проверяем минимум одну строчкную букву
  const passwordRegexaz = /[a-z]/;
  if (!passwordRegexaz.test(value)) {
    return {
      isValid: false,
      message: "Пароль должен содержать минимум одну строчную букву",
    };
  }

  // 4. Проверяем минимум одну цифру
  const passwordRegex09 = /[0-9]/;
  if (!passwordRegex09.test(value)) {
    return {
      isValid: false,
      message: "Пароль должен содержать минимум одну цифру",
    };
  }

  // Если все проверки пройждены, то
  return {
    isValid: true,
    message: "",
  };
}
