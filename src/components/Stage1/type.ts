import { PairDTO } from 'redux/models';

export type handlerPropsType = {
  pairsList: PairDTO[];
  autoOrder: boolean;
};

export type headerPropsType = {
  title: string;
  saved: boolean;
};
