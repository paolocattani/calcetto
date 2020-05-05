import { PairDTO } from 'models';

export type handlerPropsType = {
  pairsList: PairDTO[];
  autoOrder: boolean;
};

export type headerPropsType = {
  title: string;
  saved: boolean;
};
