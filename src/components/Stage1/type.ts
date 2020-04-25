import { PairDTO } from 'models';

export type handlerPropsType = {
  pairsList: PairDTO[];
};

export type headerPropsType = {
  title: string;
  saved: boolean;
};
