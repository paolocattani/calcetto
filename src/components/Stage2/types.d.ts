export interface IStage2 extends Component {
  elements?: ICell[][];
}

export interface ICell {
  id: number;
  parentId: number;
  name: string;
  winner: boolean;
}
