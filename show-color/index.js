const color_input = document.querySelector("#color_input");
const color_preview = document.querySelector("#color_preview");
const hexRegex = /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

color_input.addEventListener("input", (e) => {
  const color = e.target.value.trim();

  if (hexRegex.test(color)) {
    color_preview.style.backgroundColor = color.startsWith("#") ? color : `#${color}`;
  } else {
    color_preview.style.backgroundColor = "black";
  }
});