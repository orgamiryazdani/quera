const caesarShift = (char, n) => {
  const base = char >= 'a' ? 97 : 65;
  const mod = (a, b) => ((a % b) + b) % b;
  return String.fromCharCode(mod(char.charCodeAt(0) - base + n, 26) + base);
};

function encrypt(str, n) {
  return str.replace(/[a-zA-Z]/g, char => caesarShift(char, n));
}

function decrypt(str, n) {
  return str.replace(/[a-zA-Z]/g, char => caesarShift(char, -n));
}

export { encrypt, decrypt };