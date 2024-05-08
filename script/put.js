const fillEditForm = (amiga) => {
  const editarNombreInput = document.getElementById("editar-nombre");
  const editarFotoInput = document.getElementById("editar-foto");
  const editarDescripcionInput = document.getElementById("editar-descripcion");
  const editarHobbiesSelect = document.getElementById("editar-hobbies");
  const editarEdadSelect = document.getElementById("editar-edad");
  const editarDepartamentoSelect = document.getElementById(
    "editar-departamento"
  );
  document.getElementById("editar-amigas").dataset.amigaId = amiga.id;

  editarNombreInput.value = amiga.name;
  editarFotoInput.value = amiga.urlImagen;
  editarDescripcionInput.value = amiga.description;
  editarHobbiesSelect.value = amiga.hobbies;
  editarEdadSelect.value = amiga.age;
  editarDepartamentoSelect.value = amiga.department;
};
const editarAmiga = (amigaId, newData) => {
  mostrarSpinner();

  fetch(`${baseUrl}/${amigaId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  })
    .then((res) => {
      setTimeout(() => {
        ocultarSpinner();
        if (res.ok) {
          const cardToUpdate = document.getElementById(amigaId);
          const newCardHtml = `
          <div class="card" id="${amigaId}">
            <h2 class="nombre">${newData.name}</h2>
            <div class="contenedor-imagen">
              <img src=${newData.urlImagen} alt="foto chica" />
            </div>
            <h3>${newData.description}</h3>
            <div class="datos">
              <p>${newData.hobbies}</p>
              <p>${newData.age} años</p>
              <p>${newData.department}</p>
            </div>
            <div class="contenedor-card-botones">
              <button class="boton-info" >Ver más</button>
            </div>
          </div>`;
          cardToUpdate.outerHTML = newCardHtml;
        } else {
          console.log("Error al actualizar la tarjeta");
        }
      }, 5000);
    })
    .catch((err) => console.log(err));
};

document.getElementById("editar-amigas").addEventListener("submit", (event) => {
  event.preventDefault();

  const amigaId = document.getElementById("editar-amigas").dataset.amigaId;
  const newData = {
    name: document.getElementById("editar-nombre").value,
    urlImagen: document.getElementById("editar-foto").value,
    description: document.getElementById("editar-descripcion").value,
    hobbies: document.getElementById("editar-hobbies").value,
    age: document.getElementById("editar-edad").value,
    department: document.getElementById("editar-departamento").value,
  };

  editarAmiga(amigaId, newData);
  modal.style.display = "none";

  abrirModal(newData);
});
const modal = document.querySelector(".editar");
document.querySelectorAll(".boton-editar").forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    modal.style.display = "block";
  });
});

document.querySelectorAll(".cancelar-editar").forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    modal.style.display = "none";
  });
});
