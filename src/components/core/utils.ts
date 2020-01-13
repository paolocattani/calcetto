export function getTodayDate(): string {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = today.getFullYear();

  return `${yyyy}-${mm}-${dd}`;
}

export const productsGenerator = (quantity = 5) => {
  // if (callback) return Array.from({ length: quantity }, callback);

  // if no given callback, retrun default product format.
  return Array.from({ length: quantity }, (value, index) => ({
    id: index,
    name: `Item name ${index}`,
    price: 2100 + index
  }));
};

export const PairsGenerator = (quantity = 5) => {
  return Array.from({ length: quantity }, (value, index) => ({
    id: index,
    pair1: {
      id: `1!${index}`,
      alias: `Alias1 ${index}`,
      name: `Name1 ${index}`,
      surname: `Surname1 ${index}`
    },
    pair2: {
      id: `2!${index}`,
      alias: `Alias2 ${index}`,
      name: `Name2 ${index}`,
      surname: `Surname2 ${index}`
    }
  }));
};
