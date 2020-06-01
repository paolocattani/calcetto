import { useState } from 'react';

// Hook per facilitare la gestione dei campi di una form nei componenti funzionali
// FIXME: usare generics
// https://rangle.io/blog/simplifying-controlled-inputs-with-hooks/
export const useInput = (initialValue: any) => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    setValue,
    reset: () => setValue(''),
    bind: {
      value,
      onChange: (event: React.FormEvent<HTMLSelectElement>) => {
        setValue(event.currentTarget.value);
      },
    },
  };
};
