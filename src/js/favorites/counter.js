export function countPage() {
  return window.innerWidth < 768 ? 9 : 12;
}

export function groupArrayIntoChunks(array, chunkSize) {
  const groupedChunks = {};
  for (let i = 0; i < array.length; i += chunkSize) {
    const chunkNumber = Math.floor(i / chunkSize) + 1;
    groupedChunks[chunkNumber] = array.slice(i, i + chunkSize);
  }
  return groupedChunks;
}
