export const getRandomIntInclusive = (min: number, max: number): number =>
  Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min);

export async function asyncForEach<T>(
  array: Array<T>,
  callback: (element: T, index: number, array: Array<T>) => void
): Promise<void> {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

export const logEntity = (entity: any) => JSON.stringify(entity, null, 2);

export function getBaseLog(x: number, y: number) {
  return Math.log(y) / Math.log(x);
}
