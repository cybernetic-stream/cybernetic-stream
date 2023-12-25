export const toDataGridRows = (obj) =>
  Object.entries(obj).map(([id, data]) => ({ id, ...data }));
