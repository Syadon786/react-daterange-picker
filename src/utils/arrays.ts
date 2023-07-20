export function arrayify<T>(item?: T | T[] | null | undefined) {
  if (Array.isArray(item)) {
    return item;
  }

  if (item) {
    return [item];
  }

  return [];
}
