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
