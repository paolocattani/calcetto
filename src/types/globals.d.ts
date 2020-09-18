import '@testing-library/jest-dom/extend-expect';

declare module '*.json' {
  const value: any;
  export default value;
}
