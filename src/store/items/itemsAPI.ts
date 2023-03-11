import { Item } from 'store/items/types';

export function fetchItemsFromAPI() {
  return new Promise<{ data: Item[] }>((resolve, reject) =>
    fetch(`${process.env.REACT_APP_API_URL}/items`)
      .then((response) => {
        response.json().then((response) => {
          const data = response.data as any[];

          let items = data.map((item) => {
            return {
              _id: item._id,
              name: item.name,
              category: item.category,
              price: item.price,
              stockRemaining: item.stockRemaining,
              imageURL: item.imageURL,
            };
          });

          resolve({ data: items });
        });
      })
      .catch(reject),
  );
}
