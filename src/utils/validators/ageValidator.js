export function validateAge(input) {
  const birthDateValue = input.value;

  if (birthDateValue === "") {
    return { isValid: false, message: "Укажите дату рождения" };
  }

  const birthDate = new Date(birthDateValue);
  const today = new Date();

  // Создаем дату "18 лет назад от сегодня"
  const minDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

  // Сравниваем: если родился ПОСЛЕ минимальной даты → меньше 18
  if (birthDate > minDate) {
    return { isValid: false, message: "Вам должно быть минимум 18 лет" };
  }

  return { isValid: true, message: "" };
}
