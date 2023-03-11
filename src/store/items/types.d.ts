export interface Item {
  _id: string;
  name: string;
  category: {
    id: string;
    name: string;
  };
  price: number; // in pence
  stockRemaining: number;
  imageURL: string;
}
