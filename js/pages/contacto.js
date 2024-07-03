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
        // Si el envío es exitoso, cambiar el valor del botón a "Enviar"
        btn.value = 'Enviar';
        // Muestra una alerta indicando que el correo fue enviado con éxito.
        alert('Email enviado con éxito!');
      }, (err) => {
        // Si ocurre un error, cambiar el valor del botón a "Enviar"
        btn.value = 'Enviar';
        // Muestra una alerta con el error.
        alert(JSON.stringify(err));
      });
  });
