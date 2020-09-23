import '@testing-library/jest-dom/extend-expect';
import 'jest-fetch-mock';

declare module '*.json' {
  const value: any;
  export default value;
}
