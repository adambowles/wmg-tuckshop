//TODO move to centralised types store
export interface User {
  name: string;
  rank: string;
  number: string;
}

export interface Item {
  name: string;
  image: string;
  stockRemaining: number;
  cost: number; // in pence
}

// export interface Props {}

// export interface State {
//   theme: 'ios' | 'material';
//   users: Array<User>;
// }

// export default {
//   Props,
//   State,
// };
