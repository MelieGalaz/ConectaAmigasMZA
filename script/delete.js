const botonEliminar = document.querySelector(".boton-eliminar");
const contenedorModalEliminar = document.querySelector(
  ".contenedor-modal-eliminar"
);
const confirmarEliminar = document.getElementById("confirmar-eliminar");
botonEliminar.addEventListener("click", () => {
  contenedorModalEliminar.style.display = "block";
  modalInfoCard.style.display = "none";
});

document.getElementById("cancelar-eliminar").addEventListener("click", () => {
  mostrarSpinner();
  setTimeout(() => {
    ocultarSpinner();
    contenedorModalEliminar.style.display = "none";
    modalInfoCard.style.display = "block";
  }, 2000);
});
document.getElementById("confirmar-eliminar").addEventListener("click", () => {
  const amigaId = document.getElementById("editar-amigas").dataset.amigaId;
  mostrarSpinner();
  fetch(`${baseUrl}/${amigaId}`, {
    method: "DELETE",
  }).then((res) =>
    setTimeout(() => {
      modalInfoCard.style.display = "none";
      contenedorModalEliminar.style.display = "none";
      contenedorTarjetas.style.display = "block";
      res
        .json()
        .then((data) => {
          getAmigas(baseUrl);
        })
        .catch((err) => console.log(err));
    }, 2000)
  );
});
