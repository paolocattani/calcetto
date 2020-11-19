import { TournamentProgress, UserRole } from '../@common/dto';
import { RootState,initialState } from '../@common/models';

export const performAdminLogin = (): RootState => {
  initialState.authState = adminSession;
  initialState.tournamentState = {
    ...initialState.tournamentState,
    tournament,
    tournamentsList,
  };
  return initialState;
};

export const performUserLogin = (): RootState => {
  initialState.authState = userSession;
  initialState.tournamentState = {
    ...initialState.tournamentState,
    tournament,
    tournamentsList,
  };
  return initialState;
};

export const tournamentsList = [
  {
    id: 12,
    name: 'hFarm2',
    date: new Date('2020-09-05T08:53:36.000Z'),
    progress: TournamentProgress.New,
    public: true,
    autoOrder: true,
    label: 'hFarm2 @ New',
    ownerId: 1,
  },
  {
    id: 10,
    name: '10',
    date: new Date('2020-08-26T13:43:08.795Z'),
    progress: TournamentProgress.Stage2,
    public: true,
    autoOrder: true,
    label: '10 @ Stage2',
    ownerId: null,
  },
  {
    id: 9,
    name: '9',
    date: new Date('2020-08-26T13:43:08.789Z'),
    progress: TournamentProgress.New,
    public: true,
    autoOrder: false,
    label: '9 @ New',
    ownerId: null,
  },
  {
    id: 8,
    name: '8',
    date: new Date('2020-08-26T13:43:08.785Z'),
    progress: TournamentProgress.New,
    public: true,
    autoOrder: false,
    label: '8 @ New',
    ownerId: null,
  },
  {
    id: 7,
    name: '7',
    date: new Date('2020-08-26T13:43:08.780Z'),
    progress: TournamentProgress.New,
    public: true,
    autoOrder: false,
    label: '7 @ New',
    ownerId: null,
  },
  {
    id: 6,
    name: '6',
    date: new Date('2020-08-26T13:43:08.776Z'),
    progress: TournamentProgress.New,
    public: true,
    autoOrder: false,
    label: '6 @ New',
    ownerId: null,
  },
  {
    id: 5,
    name: '5',
    date: new Date('2020-08-26T13:43:08.770Z'),
    progress: TournamentProgress.New,
    public: true,
    autoOrder: false,
    label: '5 @ New',
    ownerId: null,
  },
  {
    id: 4,
    name: '4',
    date: new Date('2020-08-26T13:43:08.766Z'),
    progress: TournamentProgress.New,
    public: true,
    autoOrder: false,
    label: '4 @ New',
    ownerId: null,
  },
  {
    id: 3,
    name: '3',
    date: new Date('2020-08-26T13:43:08.759Z'),
    progress: TournamentProgress.New,
    public: true,
    autoOrder: false,
    label: '3 @ New',
    ownerId: null,
  },
  {
    id: 2,
    name: '2',
    date: new Date('2020-08-26T13:43:08.750Z'),
    progress: TournamentProgress.New,
    public: true,
    autoOrder: false,
    label: '2 @ New',
    ownerId: null,
  },
  {
    id: 1,
    name: '1',
    date: new Date('2020-08-26T13:43:08.703Z'),
    progress: TournamentProgress.New,
    public: true,
    autoOrder: false,
    label: '1 @ New',
    ownerId: null,
  },
  {
    id: 11,
    name: 'hFarm',
    date: new Date('2020-08-20T08:49:50.000Z'),
    progress: TournamentProgress.New,
    public: true,
    autoOrder: true,
    label: 'hFarm @ New',
    ownerId: 1,
  },
];

export const tournament = {
  id: 12,
  name: 'hFarm2',
  date: new Date('2020-09-05T08:53:36.000Z'),
  progress: TournamentProgress.New,
  public: true,
  autoOrder: true,
  label: 'hFarm2 @ New',
  ownerId: 1,
};

export const adminSession = {
  user: {
    id: 1,
    username: 'Admin',
    name: 'Admin',
    surname: 'Admin',
    email: 'admin@admin.it',
    phone: '3472545771',
    birthday: new Date('2020-08-26T14:00:27.743Z'),
    label: 'Admin Admin',
    role: UserRole.Admin,
  },
  isAuthenticated: true,
  isAdmin: true,
  isLoading: false,
};

export const userSession = {
  user: {
    id: 1,
    username: 'User',
    name: 'User',
    surname: 'User',
    email: 'user@user.it',
    phone: '3472545770',
    birthday: new Date('2020-08-26T14:00:27.743Z'),
    label: 'User user',
    role: UserRole.User,
  },
  isAuthenticated: true,
  isAdmin: false,
  isLoading: false,
};
