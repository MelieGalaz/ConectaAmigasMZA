document.getElementById("filtrosBuscar").addEventListener("click", () => {
  const filtroDepartamento = document.getElementById(
    "filtro-departamento"
  ).value;
  const filtroEdad = document.getElementById("filtro-edad").value;
  const filtroHobbies = document.getElementById("filtro-hobbies").value;

  const filters = {};
  if (filtroDepartamento) filters.department = filtroDepartamento;
  if (filtroEdad) filters.age = filtroEdad;
  if (filtroHobbies) filters.hobbies = filtroHobbies;

  getAmigas(baseUrl, filters);
});

document.getElementById("limpiarFiltros").addEventListener("click", () => {
  document.getElementById("filtro-departamento").value = "";
  document.getElementById("filtro-edad").value = "";
  document.getElementById("filtro-hobbies").value = "";

  getAmigas(baseUrl, {});
});
