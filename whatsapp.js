(function () {
  "use strict";

  // ⚙️ КОНФИГУРАЦИЯ
  const CONFIG = {
    whatsappNumber: "996556301515",
    notificationDuration: 1500,
    formSelector: ".contact-form form",
  };

  // 📱 Инициализация обработчика формы
  function initWhatsAppHandler() {
    const contactForm = document.querySelector(CONFIG.formSelector);

    if (!contactForm) {
      console.warn("⚠️ WhatsApp Handler: Форма не найдена");
      return;
    }

    contactForm.addEventListener("submit", handleFormSubmit);
  }

  // 📝 Обработка отправки формы
  function handleFormSubmit(e) {
    e.preventDefault();

    // Получение данных формы
    const formData = getFormData(this);

    // Формирование сообщения
    const message = formatWhatsAppMessage(formData);

    // Создание ссылки WhatsApp
    const whatsappURL = createWhatsAppURL(message);

    setTimeout(() => {
      window.open(whatsappURL, "_blank");
      resetForm(this);
    }, CONFIG.notificationDuration);
  }

  // 📊 Получение данных из формы
  function getFormData(form) {
    return {
      name: form.querySelector('input[type="text"]')?.value.trim() || "",
      phone: form.querySelector('input[type="tel"]')?.value.trim() || "",
      email: form.querySelector('input[type="email"]')?.value.trim() || "",
      message: form.querySelector("textarea")?.value.trim() || "",
    };
  }

  // ✅ Валидация данных
  function validateFormData(data) {
    return data.name && data.phone;
  }

  // 💬 Форматирование сообщения для WhatsApp
  function formatWhatsAppMessage(data) {
    return `Заявка с сайта

  ${data.name}
  Email: ${data.email || "Не указан"}

${data.message || "Не указано"}`;
  }

  // 🔗 Создание WhatsApp URL
  function createWhatsAppURL(message) {
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${CONFIG.whatsappNumber}?text=${encodedMessage}`;
  }

  // 🔔 Показ уведомления
  function showNotification(text, color) {
    // Удаление предыдущего уведомления
    const existingNotification = document.querySelector(
      ".whatsapp-notification"
    );
    if (existingNotification) {
      existingNotification.remove();
    }

    // Создание нового уведомления
    const notification = document.createElement("div");
    notification.className = "whatsapp-notification";
    notification.textContent = text;

    // Стили
    Object.assign(notification.style, {
      position: "fixed",
      bottom: "20px",
      right: "20px",
      background: color,
      color: "#fff",
      padding: "12px 24px",
      borderRadius: "8px",
      fontWeight: "600",
      fontSize: "14px",
      zIndex: "9999",
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      animation: "slideIn 0.3s ease-out",
    });

    document.body.appendChild(notification);

    // Автоудаление через 3 секунды
    setTimeout(() => {
      notification.style.animation = "slideOut 0.3s ease-in";
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  // 🔄 Сброс формы
  function resetForm(form) {
    form.reset();
  }

  // 🚀 Запуск при загрузке DOM
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initWhatsAppHandler);
  } else {
    initWhatsAppHandler();
  }

  // 🎨 Добавление CSS анимаций
  const style = document.createElement("style");
  style.textContent = `
    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    @keyframes slideOut {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(100%);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
})();
