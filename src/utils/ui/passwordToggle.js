export function passwordToggle(passwordInput, button) {
  const passwordClose = button.querySelector(".btn-closed");
  const passwordOpen = button.querySelector(".btn-open");

  button.addEventListener("click", () => {
    // Переключаем тип поля
    const isPassword = passwordInput.type === "password";
    passwordInput.type = isPassword ? "text" : "password";

    // Переключаем иконку
    passwordClose.style.display = isPassword ? "none" : "block";
    passwordOpen.style.display = isPassword ? "block" : "none";

    // меняем Aria label у кнопки
    button.setAttribute("aria-label", isPassword ? "Скрыть пароль" : "Показать пароль");
  });
}
