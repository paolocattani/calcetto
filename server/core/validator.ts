export function stringValidator(value: any, notEmpty: boolean): string {
  if (typeof value !== 'string') return `Invalid type : ${typeof value}`;
  if (notEmpty && value === '') return 'String is empty';
  return '';
}
