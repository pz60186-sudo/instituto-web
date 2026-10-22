'use strict';

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('formRegistro');
  const message = document.getElementById('mensajeRegistro');
  const phone = document.getElementById('telefono');

  if (!form || !message) return;

  // Validate the optional phone only when the user fills it.
  phone.addEventListener('input', function () {
    if (phone.value.trim() === '') {
      phone.setCustomValidity('');
      phone.classList.remove('is-invalid');
      return;
    }
    const phonePattern = /^[0-9+() -]{7,15}$/;
    phone.setCustomValidity(phonePattern.test(phone.value.trim()) ? '' : 'Formato de teléfono no válido.');
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    event.stopPropagation();
    message.classList.add('d-none');
    message.classList.remove('alert-success', 'alert-danger');

    // The browser checks required fields, email syntax, and the optional phone pattern.
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      message.textContent = 'Revisa los campos marcados y corrige la información antes de continuar.';
      message.classList.add('alert-danger');
      message.classList.remove('d-none');
      const firstInvalid = form.querySelector(':invalid');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // Academic demo: do not send or store personal data because there is no backend.
    form.classList.add('was-validated');
    message.textContent = 'Validación correcta. Este registro es una simulación: tus datos no se enviaron ni se guardaron.';
    message.classList.add('alert-success');
    message.classList.remove('d-none');
  });

  form.addEventListener('reset', function () {
    window.setTimeout(function () {
      form.classList.remove('was-validated');
      message.textContent = '';
      message.classList.add('d-none');
      message.classList.remove('alert-success', 'alert-danger');
      phone.setCustomValidity('');
    }, 0);
  });

  // Close the mobile navigation after choosing a section.
  document.querySelectorAll('#menuPrincipal .nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      const menu = document.getElementById('menuPrincipal');
      if (menu && menu.classList.contains('show') && window.bootstrap) {
        window.bootstrap.Collapse.getOrCreateInstance(menu).hide();
      }
    });
  });
});
