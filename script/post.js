const nuevaAmiga = document.getElementById("nuevaAmiga");
const nuevoPerfil = document.querySelector(".nuevoPerfil");
const cerrarNuevoPerfil = document.querySelectorAll(".cerrar-nuevo-perfil");
const nuevoPerfilForm = document.getElementById("nuevoPerfil-form");
const confirmarNuevoPerfil = document.getElementById("confirmar-nuevo-perfil");

nuevaAmiga.addEventListener("click", () => {
  mostrarSpinner();
  setTimeout(() => {
    ocultarSpinner();
    nuevoPerfil.style.display = "block";
    contenedorTarjetas.style.display = "none";
    modalInfoCard.style.display = "none";
  }, 2000);
});
cerrarNuevoPerfil.forEach((boton) => {
  boton.addEventListener("click", (e) => {
    e.preventDefault();
    mostrarSpinner();
    setInterval(() => {
      ocultarSpinner();
      nuevoPerfil.style.display = "none";
      contenedorTarjetas.style.display = "block";
      nuevoPerfilForm.reset();
      const mensajesError = document.querySelectorAll(".mensaje-error");
      mensajesError.forEach((mensaje) => mensaje.remove());
    }, 2000);
  });
});

confirmarNuevoPerfil.addEventListener("click", (e) => {
  e.preventDefault();

  const nuevoPerfilNombre = document.getElementById("nuevo-perfil-nombre");
  const nuevoPerfilFoto = document.getElementById("nuevo-perfil-foto");
  const nuevoPerfilDescripcion = document.getElementById(
    "nuevo-perfil-descripcion"
  );
  const hobbiesNuevoPerfil = document.getElementById("hobbies-nuevo-perfil");
  const edadNuevoPerfil = document.getElementById("edad-nuevo-perfil");
  const departamentoNuevoPerfil = document.getElementById(
    "Departamento-nuevo-perfil"
  );

  const inputs = [
    { elemento: nuevoPerfilNombre, valor: nuevoPerfilNombre.value.trim() },
    { elemento: nuevoPerfilFoto, valor: nuevoPerfilFoto.value.trim() },
    {
      elemento: nuevoPerfilDescripcion,
      valor: nuevoPerfilDescripcion.value.trim(),
    },
    { elemento: hobbiesNuevoPerfil, valor: hobbiesNuevoPerfil.value.trim() },
    { elemento: edadNuevoPerfil, valor: edadNuevoPerfil.value.trim() },
    {
      elemento: departamentoNuevoPerfil,
      valor: departamentoNuevoPerfil.value.trim(),
    },
  ];
  let formValido = true;

  inputs.forEach((input) => {
    const { elemento, valor } = input;
    const mensajeError = document.createElement("p");
    mensajeError.textContent = "Complete este campo";
    mensajeError.classList.add("mensaje-error");
    mensajeError.style.color = "red";
    if (valor === "") {
      formValido = false;
      if (
        !elemento.nextElementSibling ||
        !elemento.nextElementSibling.classList.contains("mensaje-error")
      ) {
        elemento.parentNode.insertBefore(
          mensajeError,
          elemento.nextElementSibling
        );
      }
    } else {
      const mensajeErrorExistente = elemento.nextElementSibling;
      if (
        mensajeErrorExistente &&
        mensajeErrorExistente.classList.contains("mensaje-error")
      ) {
        mensajeErrorExistente.remove();
      }
    }
  });

  if (formValido) {
    mostrarSpinner();
    setTimeout(() => {
      ocultarSpinner();
      nuevoPerfil.style.display = "none";
      contenedorTarjetas.style.display = "block";
      nuevoPerfilForm.reset();
    }, 2000);
  }
});

nuevoPerfilForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const nuevoPerfilNombre = document
    .getElementById("nuevo-perfil-nombre")
    .value.trim();
  const nuevoPerfilFoto = document
    .getElementById("nuevo-perfil-foto")
    .value.trim();
  const nuevoPerfilDescripcion = document
    .getElementById("nuevo-perfil-descripcion")
    .value.trim();
  const hobbiesNuevoPerfil = document
    .getElementById("hobbies-nuevo-perfil")
    .value.trim();
  const edadNuevoPerfil = document
    .getElementById("edad-nuevo-perfil")
    .value.trim();
  const departamentoNuevoPerfil = document
    .getElementById("Departamento-nuevo-perfil")
    .value.trim();

  const inputs = [
    nuevoPerfilNombre,
    nuevoPerfilFoto,
    nuevoPerfilDescripcion,
    hobbiesNuevoPerfil,
    edadNuevoPerfil,
    departamentoNuevoPerfil,
  ];
  const inputsId = [
    "nuevo-perfil-nombre",
    "nuevo-perfil-foto",
    "nuevo-perfil-descripcion",
    "hobbies-nuevo-perfil",
    "edad-nuevo-perfil",
    "Departamento-nuevo-perfil",
  ];

  let formValido = true;

  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    const inputId = inputsId[i];
    const elemento = document.getElementById(inputId);

    if (input === "") {
      formValido = false;
      elemento.style.borderColor = "red";
    } else {
      elemento.style.borderColor = "";
    }
  }

  if (formValido) {
    const amigaNueva = {
      name: nuevoPerfilNombre,
      urlImagen: nuevoPerfilFoto,
      description: nuevoPerfilDescripcion,
      hobbies: hobbiesNuevoPerfil,
      age: edadNuevoPerfil,
      department: departamentoNuevoPerfil,
    };

    fetch(`${baseUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(amigaNueva),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("La respuesta de la red no fue correcta");
        }
      })
      .then((data) => {
        getAmigas(baseUrl);
      })
      .catch((err) => {
        alert("Lo sentimos, ocurrió un error. Vuelva a intentarlo más tarde.");
      });
  } else {
    const mensajeError = document.createElement("p");
    mensajeError.textContent = "Llene todos los campos";
    mensajeError.style.color = "red";
    nuevoPerfilForm.appendChild(mensajeError);
  }
});
