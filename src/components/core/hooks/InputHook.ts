import { useState } from 'react';
import { FormEventType } from '../types';

// Hook per facilitare la gestione dei campi di una form nei componenti funzionali
// https://rangle.io/blog/simplifying-controlled-inputs-with-hooks/
export const useInput = <T extends any>(initialValue: T) => {
  const [value, setValue] = useState<T>(initialValue);
  return {
    value,
    setValue,
    reset: () => setValue(initialValue),
    bind: {
      value,
      onChange: (event: React.ChangeEvent<FormEventType>) => setValue(event.currentTarget.value as T),
    },
  };
};
