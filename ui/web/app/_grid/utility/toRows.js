export default function toRows(parentObject) {
  const returnArray = [];
  for (let objectKey in parentObject) {
    const currentRow = { id: objectKey, ...parentObject[objectKey] };
    for (let documentName in parentObject[objectKey]) {
      currentRow[documentName] = parentObject[objectKey][documentName];
    }
    returnArray.push(currentRow);
  }
  return returnArray;
}
