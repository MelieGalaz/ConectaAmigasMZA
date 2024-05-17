const nuevaAmiga = document.getElementById("nuevaAmiga");
const nuevoPerfil = document.querySelector(".nuevoPerfil");
const cerrarNuevoPerfil = document.querySelectorAll(".cerrar-nuevo-perfil");
const nuevoPerfilForm = document.getElementById("nuevoPerfil-form");
const confirmarNuevoPerfil = document.getElementById("confirmar-nuevo-perfil");
const errorMensaje = document.getElementById("error-mensaje");

const mostrarError = (mensaje) => {
  errorMensaje.textContent = mensaje;
  errorMensaje.style.display = "block";
  errorMensaje.style.color = "red";
};

const ocultarError = () => {
  errorMensaje.textContent = "";
  errorMensaje.style.display = "none";
};

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
    setTimeout(() => {
      ocultarSpinner();
      nuevoPerfil.style.display = "none";
      contenedorTarjetas.style.display = "block";
      nuevoPerfilForm.reset();
      ocultarError();
    }, 2000);
  });
});

nuevoPerfilForm.addEventListener("submit", (event) => {
  event.preventDefault();
  ocultarError();

  const nombre = document.getElementById("nuevo-perfil-nombre").value;
  const foto = document.getElementById("nuevo-perfil-foto").value;
  const descripcion = document.getElementById("nuevo-perfil-descripcion").value;
  const hobbies = document.getElementById("hobbies-nuevo-perfil").value;
  const edad = document.getElementById("edad-nuevo-perfil").value;
  const departamento = document.getElementById(
    "Departamento-nuevo-perfil"
  ).value;

  if (!nombre || !foto || !descripcion || !hobbies || !edad || !departamento) {
    mostrarError("Complete todos los espacios");
    return;
  }

  const nuevaAmiga = {
    name: nombre,
    urlImagen: foto,
    description: descripcion,
    hobbies: hobbies,
    age: edad,
    department: departamento,
  };

  fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(nuevaAmiga),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Error al crear la nueva amiga");
      }
    })
    .then((data) => {
      mostrarSpinner();
      setTimeout(() => {
        ocultarSpinner();
        console.log("Amiga creada con éxito:", data);
        nuevoPerfil.style.display = "none";
        nuevoPerfilForm.reset();
        ocultarError();
        getAmigas(baseUrl, {});
        contenedorTarjetas.style.display = "block";
      }, 2000);
    })
    .catch((error) => {
      console.error("Error en la solicitud POST:", error);
      mostrarError("Error en la solicitud POST: " + error.message);
    });
});
