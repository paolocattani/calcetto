import {
   Component,
   FormEvent,
   ReactNode,
   ReactElement,
   MouseEvent,
   Ref
} from 'react';
import React from 'react';
import { inspect } from 'util';
import { getTodayDate } from './core/utils';
import { Form, Button, Dropdown } from 'react-bootstrap';

type formState = {
   tournamentList: string[];
   nome: string;
};

// FIXME:
type formProps = any;

type test = {
   children: ReactElement | ReactElement[];
   onClick: MouseEvent<HTMLButtonElement>;
};

// FIXME:
// eslint-disable-next-line
const Forward = React.forwardRef((_props, ref: React.Ref<HTMLDivElement>) => (
   <div ref={ref} style={{ width: '100%' }} />
));

export default class TournamentForm extends Component<formProps, formState> {
   constructor(props: formProps) {
      super(props);
      this.state = {
         nome: getTodayDate(),
         tournamentList: []
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
   }

   public async componentDidMount(): Promise<void> {
      // Fetch data from db
      const response = await fetch('/api/tournament/list', {
         method: 'GET',
         headers: { 'Content-Type': 'application/json' }
      });
      const result = await response.json();
      console.log(result);
      const tmp: string[] = [];
      result.forEach((e: { name: string }) => tmp.push(e.name));
      this.setState({ tournamentList: tmp });
      console.log(this.state.tournamentList);
   }

   public async handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
      const model = {
         name: this.state.nome,
         ownerId: 1,
         progress: 'WIP',
         public: true
      };
      console.log(inspect(model));
      const response = await fetch('/api/tournament', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(model)
      });
      const res = await response.json();
      console.log(res);
      if (res.message) console.log(res.message);
      event.preventDefault();
   }

   public handleChange = (event: React.FormEvent<HTMLInputElement>) => {
      this.setState(({
         [event.currentTarget.name]: event.currentTarget.value
      } as unknown) as formState);
   };

   public render(): JSX.Element {
      // Load element to render in dropdownn
      const menuElements: ReactNode[] = [];
      this.state.tournamentList.forEach((value: string, index: number) =>
         menuElements.push(
            <Dropdown.Item href={`#/action-${index}`}>{value}</Dropdown.Item>
         )
      );

      // render
      return (
         <div>
            <br />
            <Dropdown>
               <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Seleziona un torneo
               </Dropdown.Toggle>
               <Dropdown.Menu>{menuElements}</Dropdown.Menu>
            </Dropdown>

            <Form onSubmit={this.handleSubmit}>
               <Form.Group controlId={'tournamentForm'}>
                  <Form.Label>Nome del torneo</Form.Label>
                  <Form.Control
                     key="nome"
                     name="nome"
                     type="text"
                     value={this.state.nome}
                     placeholder="nome torneo"
                     onChange={this.handleChange}
                  />
               </Form.Group>
               <Button type="submit">Continua</Button>
            </Form>
         </div>
      );
   }
}
