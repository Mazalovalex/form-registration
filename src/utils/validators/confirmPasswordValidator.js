export function confirmPasswordValidator(passwordInput, passwordConfirmInput) {
  const password = passwordInput.value;
  const confirmPassword = passwordConfirmInput.value;

  // Проверка на пустое поле
  if (confirmPassword === "") {
    return {
      isValid: false,
      message: "Подтвердите пароль ",
    };
  }

  // Совпадение паролей
  if (password !== confirmPassword) {
    return {
      isValid: false,
      message: "Пароли не совпадают",
    };
  }

  //Пароли совпадают
  return {
    isValid: true,
    message: "",
  };
}
