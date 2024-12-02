export function validateForm(event) {
    event.preventDefault(); // Prevenir el envío del formulario para validarlo primero
    
    // Resetear los mensajes de error
    document.getElementById("nombre-error").classList.add("hidden");
    document.getElementById("email-error").classList.add("hidden");
    document.getElementById("mensaje-error").classList.add("hidden");
    
    let isValid = true;
    
    // Validación de nombre: debe empezar con mayúscula y el resto en minúsculas
    const nombre = document.getElementById("nombre").value.trim();
    const nombrePattern = /^[A-Z][a-z]*$/;  // Primera letra mayúscula, el resto en minúsculas
    if (!nombre) {
      isValid = false;
      document.getElementById("nombre-error").textContent = "El nombre no puede estar vacío.";
      document.getElementById("nombre-error").classList.remove("hidden");
    } else if (!nombrePattern.test(nombre)) {
      isValid = false;
      document.getElementById("nombre-error").textContent = "El nombre debe empezar con mayúscula y el resto en minúsculas.";
      document.getElementById("nombre-error").classList.remove("hidden");
    }

    // Validación de email
    const email = document.getElementById("email").value.trim();
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) {
      isValid = false;
      document.getElementById("email-error").textContent = "El correo electrónico no puede estar vacío.";
      document.getElementById("email-error").classList.remove("hidden");
    } else if (!emailPattern.test(email)) {
      isValid = false;
      document.getElementById("email-error").textContent = "Por favor, ingresa un correo electrónico válido.";
      document.getElementById("email-error").classList.remove("hidden");
    }

    // Validación de mensaje: debe tener al menos 20 caracteres
    const mensaje = document.getElementById("mensaje").value.trim();
    if (!mensaje) {
      isValid = false;
      document.getElementById("mensaje-error").textContent = "El mensaje no puede estar vacío.";
      document.getElementById("mensaje-error").classList.remove("hidden");
    } else if (mensaje.length < 20) {
      isValid = false;
      document.getElementById("mensaje-error").textContent = "El mensaje debe tener al menos 20 caracteres.";
      document.getElementById("mensaje-error").classList.remove("hidden");
    }

    // Si todo es válido, se permite el envío
    if (isValid) {
      alert("Formulario enviado correctamente");
      // Aquí puedes agregar el código para enviar el formulario si es necesario
      // Por ejemplo, usando fetch o un envío normal
    }

    return isValid; // Retorna si el formulario es válido o no
}


