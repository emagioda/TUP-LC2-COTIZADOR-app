const btn = document.getElementById('formBotonEnviar');


document.getElementById('formulario')
  .addEventListener('submit', function (event) {
    event.preventDefault();
    btn.value = 'Enviando...';

    // Identificadores del servicio de EmailJS
    const serviceID = 'default_service';
    const templateID = 'template_9bxqdxa';

    // Envía el formulario utilizando EmailJS
    emailjs.sendForm(serviceID, templateID, this)
      .then(() => {
        // Envío exitoso.
        btn.value = 'Enviar';
        mostrarAlerta('Email enviado con éxito!', 'success');
      }, (err) => {
        // Error de envío.
        btn.value = 'Enviar';
        mostrarAlerta('Error al enviar el Email', 'error');
      });
  });
