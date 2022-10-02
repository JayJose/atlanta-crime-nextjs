export function toTitleCase(str) {
  return str
    .toLowerCase()
    .split(' ')
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}

export function formatNumbers(str) {
  let val = str;
  return Number(val).toLocaleString();
}
