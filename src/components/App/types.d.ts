export interface User {
  name: string;
  rank: string;
  number: string;
}

export interface Props {}

export interface State {
  theme: 'ios' | 'material';
  users: Array<User>;
}

export default {
  Props,
  State,
};
