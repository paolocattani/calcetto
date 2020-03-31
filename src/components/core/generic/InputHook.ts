import { useState } from 'react';

// FIXME:
// https://rangle.io/blog/simplifying-controlled-inputs-with-hooks/
export const useInput = (initialValue: any) => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    setValue,
    reset: () => setValue(''),
    bind: {
      value,
      onChange: (event: any) => {
        setValue(event.target.value);
      }
    }
  };
};
