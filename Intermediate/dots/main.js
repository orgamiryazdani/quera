function getCharPosition(text, index) {
  if (index === 0) return 'FIRST';
  if (index === text.length - 1) return 'LAST';
  return 'MIDDLE';
}

document.querySelector(".btn").addEventListener("click", () => {
  const inputValue = document.querySelector('.input').value;
  const result = document.querySelector('.result');
  const separateWords = inputValue.split(' ');
  let totalDots = 0;

  separateWords.forEach(word => {
    const chars = Array.from(word);

    chars.forEach((char, index) => {
      let dots = parseInt(obj[char] || "0");

      if (char === 'ی') {
        const position = getCharPosition(word, index);
        if (position === 'MIDDLE' || position === 'FIRST' && chars.length > 1) {
          dots = 2;
        } else {
          dots = 0;
        }
      }

      totalDots += dots;
    });
  });

  result.textContent = totalDots;
});
