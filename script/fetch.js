const card = document.querySelector(".contenedor-card");
const modalInfoCard = document.querySelector(".contenedor-modal");
const cerrarBoton = document.querySelector(".cerrar");
const contenedorTarjetas = document.querySelector(".contenedor-tarjetas");
const mainContenedor = document.getElementById("mainContenedor");
const spinnerContenedor = document.getElementById("spinnerContenedor");
const baseUrl = "https://6621b66027fcd16fa6c7be3b.mockapi.io/amigas/amigas";

const mostrarSpinner = () => {
  if (spinnerContenedor) {
    spinnerContenedor.style.display = "block";
    mainContenedor.style.display = "none";
  }
};

const ocultarSpinner = () => {
  if (spinnerContenedor) {
    spinnerContenedor.style.display = "none";
    mainContenedor.style.display = "block";
  }
};

const getAmigas = (fetchUrl, filters) => {
  mostrarSpinner();
  const urlParams = new URLSearchParams(filters);
  fetch(`${fetchUrl}?${urlParams.toString()}`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        card.innerHTML = "No se encontraron amigas";
      }
    })
    .then((data) => {
      setTimeout(() => {
        ocultarSpinner();
        generarCard(data);
      }, 2000);
    })
    .catch((err) => console.log(err));
};

const generarCard = (data) => {
  card.innerHTML = data
    .map((amiga) => {
      return `
          <div class="card" id="${amiga.id}">
            <h2 class="nombre">${amiga.name}</h2>
            <div class="contenedor-imagen">
              <img src=${amiga.urlImagen} alt="foto chica" />
            </div>
            <h3>${amiga.description}</h3>
            <div class="datos">
              <p>${amiga.hobbies}</p>
              <p>${amiga.age} años</p>
              <p>${amiga.department}</p>
            </div>
             <div class="contenedor-card-botones">
              <button class="boton-info" >Ver más</button>
            </div>
            
          </div> `;
    })
    .join("");

  document.querySelectorAll(".boton-info").forEach((button) => {
    button.addEventListener("click", (event) => {
      const cardId = event.target.closest(".card").id;

      const selectedAmiga = data.find((amiga) => amiga.id === cardId);
      fillEditForm(selectedAmiga);
    });
  });
};
getAmigas(baseUrl);

const abrirModal = (amiga) => {
  const modalNombre = document.querySelector(".modal-nombre");
  const modalImagen = document.querySelector(".modal-contenedor-imagen img");
  const modalH3 = document.querySelector(".modal-info-card h3");
  const modalDatos = document.querySelector(".modal-datos");
  const botonEditar = document.querySelector(".boton-editar");
  const botonEliminar = document.querySelector(".boton-eliminar");
  modalNombre.textContent = amiga.name;
  modalImagen.src = amiga.urlImagen;
  modalH3.textContent = amiga.description;
  modalDatos.innerHTML = `
    <p>${amiga.hobbies}</p>
    <p>${amiga.age} años</p>
    <p>${amiga.department}</p>
  `;

  modalInfoCard.style.display = "block";
  contenedorTarjetas.style.display = "none";
};

card.addEventListener("click", (event) => {
  const botonInfo = event.target.closest(".boton-info");
  if (botonInfo) {
    const idAmiga = botonInfo.closest(".card").id;
    mostrarSpinner();
    contenedorTarjetas.style.display = "none";
    fetch(`${baseUrl}/${idAmiga}`)
      .then((res) => res.json())
      .then((amiga) => {
        setTimeout(() => {
          ocultarSpinner();
          abrirModal(amiga);
        }, 2000);
      })
      .catch((error) => console.error("Error al obtener la amiga:", error));
  }
});

cerrarBoton.addEventListener("click", () => {
  mostrarSpinner();
  setTimeout(() => {
    ocultarSpinner();
    modalInfoCard.style.display = "none";
    modal.style.display = "none";
    contenedorTarjetas.style.display = "block";
  }, 2000);
});
