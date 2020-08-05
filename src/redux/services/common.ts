import { toast } from 'react-toastify';

export const handleError = (error: any, message: string): void => {
  console.error(`${message}`, error);
  toast.error(message);
  throw new Error(`Something went wrong : ${message}`);
};
