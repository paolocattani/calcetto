import { toast } from 'react-toastify';
import { GenericReponse, UserMessageType } from '@common/models/common.models';
import { HTTPStatusCode } from '@common/models/HttpStatusCode';

export const handleError = (error: any, message: string): void => {
  console.error(`${message}`, error);
  toast.error(message);
  throw new Error(`Something went wrong : ${message}`);
};
