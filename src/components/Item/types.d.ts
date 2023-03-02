export interface Props {
  name: string;
  category: string;
  image: string;
  stockRemaining: number;
  cost: number; // in pence
  inBasket?: boolean;
}

export interface State {
  quantitySelected: number;
}

export default {
  Props,
  State,
};
