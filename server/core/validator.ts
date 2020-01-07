// TODO: sanitize string
export function stringValidator(value: any, notEmpty: boolean): string {
  if (typeof value !== 'string') return 'Invalid Type';
  if (value === '') return 'String is empty';
  // TODO: escape
  return '';
}
