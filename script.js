const bestiario = {
  bestia: {
    nombres: ["Lobo feroz", "Oso rúnico", "Jabalí colmilludo", "Pantera lunar"],
    rasgos: ["olfato sobrenatural", "embestida", "instinto de manada", "garras aceradas"],
    base: { pv: 25, ataque: 8, defensa: 6, velocidad: 9 }
  },
  no_muerto: {
    nombres: ["Esqueleto guardián", "Sombra hambrienta", "Caballero espectral", "Necrófago"],
    rasgos: ["resistencia al dolor", "aura de miedo", "toque helado", "regeneración oscura"],
    base: { pv: 30, ataque: 9, defensa: 7, velocidad: 6 }
  },
  elemental: {
    nombres: ["Núcleo ígneo", "Eco de tormenta", "Guardián de piedra", "Flujo abisal"],
    rasgos: ["forma cambiante", "explosión elemental", "armadura natural", "resonancia mágica"],
    base: { pv: 28, ataque: 10, defensa: 8, velocidad: 7 }
  },
  feerico: {
    nombres: ["Duende cuchillero", "Dama del rocío", "Trampero del seto", "Ciervo estelar"],
    rasgos: ["ilusión menor", "paso brumoso", "encanto feérico", "suerte caprichosa"],
    base: { pv: 22, ataque: 7, defensa: 7, velocidad: 10 }
  }
};

const tipoSelect = document.querySelector("#tipo");
const nivelInput = document.querySelector("#nivel");
const nivelValor = document.querySelector("#nivelValor");
const nombreInput = document.querySelector("#nombre");
const generarBtn = document.querySelector("#generar");

const ui = {
  nombre: document.querySelector("#criaturaNombre"),
  descripcion: document.querySelector("#criaturaDescripcion"),
  pv: document.querySelector("#pv"),
  ataque: document.querySelector("#ataque"),
  defensa: document.querySelector("#defensa"),
  velocidad: document.querySelector("#velocidad"),
  habilidades: document.querySelector("#habilidades")
};

function rnd(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function calcularStat(base, nivel, variacion = 0.2) {
  const multiplicador = 1 + nivel * 0.12;
  const ruido = 1 + (Math.random() * 2 - 1) * variacion;
  return Math.round(base * multiplicador * ruido);
}

function generar() {
  const tipo = tipoSelect.value;
  const nivel = Number(nivelInput.value);
  const data = bestiario[tipo];

  const nombre = nombreInput.value.trim() || rnd(data.nombres);
  const habilidad1 = rnd(data.rasgos);
  let habilidad2 = rnd(data.rasgos);
  if (habilidad2 === habilidad1) {
    habilidad2 = rnd(data.rasgos.filter((h) => h !== habilidad1));
  }

  ui.nombre.textContent = nombre;
  ui.descripcion.textContent = `Criatura de tipo ${tipo.replace("_", " ")} (ND ${nivel}).`;
  ui.pv.textContent = calcularStat(data.base.pv, nivel, 0.15);
  ui.ataque.textContent = calcularStat(data.base.ataque, nivel, 0.1);
  ui.defensa.textContent = calcularStat(data.base.defensa, nivel, 0.1);
  ui.velocidad.textContent = calcularStat(data.base.velocidad, nivel, 0.08);

  ui.habilidades.innerHTML = "";
  [habilidad1, habilidad2].forEach((h) => {
    const li = document.createElement("li");
    li.textContent = h;
    ui.habilidades.append(li);
  });
}

function poblarTipos() {
  Object.keys(bestiario).forEach((tipo) => {
    const option = document.createElement("option");
    option.value = tipo;
    option.textContent = tipo.replace("_", " ");
    tipoSelect.append(option);
  });
}

nivelInput.addEventListener("input", () => {
  nivelValor.textContent = nivelInput.value;
});

generarBtn.addEventListener("click", generar);

poblarTipos();
generar();
