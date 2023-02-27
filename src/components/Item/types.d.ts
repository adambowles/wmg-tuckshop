export interface Props {
  /**
   * Name of item
   */
  name: string;
  /**
   * Stock photo
   */
  image: string;
  /**
   * Remaining stock of this item
   */
  stockRemaining: number;
  /**
   * Cost of this item in pence
   */
  cost: number;
  /**
   * Whether this item is in the basket for checkout
   * 
   * @default false
   */
  inBasket?: boolean;
}

export interface State {
  /**
   * Number of item added to basket
   * 
   * @default 1
   */
  quantitySelected: number;
}

export default {
  Props,
  State
}

