import React from 'react';
import { Button, Card, ListItem, Stepper } from 'konsta/react';

import { useAppSelector, useAppDispatch } from 'store/hooks';
import { decrement, increment, selectCount } from 'store/counter/counterSlice';
import formatPrice from 'utils/format-price';

import 'components/Item/style.css';

function Item({
  price = 100,
  imageURL = '',
  inBasket = false,
  name = '',
  stockRemaining = 1,
}) {
  const quantitySelected = useAppSelector(selectCount);
  const dispatch = useAppDispatch();

  const incrementQuantitySelected = () => {
    if (quantitySelected < stockRemaining) {
      return dispatch(increment());
    }
  };

  const decrementQuantitySelected = () => {
    if (quantitySelected === 1) {
      //TODO remove from basket
    } else {
      return dispatch(decrement());
    }
  };

  if (stockRemaining) {
    let displayPrice: number;
    if (inBasket) {
      displayPrice = price * quantitySelected;
    } else {
      displayPrice = price;
    }

    if (!inBasket) {
      return (
        <Card
          className="m-0"
          outline
          header={
            <div className="flex justify-between items-center">
              <div>{name}</div>
              <div>{formatPrice(displayPrice)}</div>
            </div>
          }
          footer={
            <div className="flex justify-between items-center">
              <div className="text-gray-500">
                {`${stockRemaining} left in stock`}
              </div>
            </div>
          }
        >
          <div
            className="ios:-m-4 material:-my-4 p-3 h-48 flex items-end justify-end bg-white bg-center bg-no-repeat bg-contain material:rounded-xl text-[16px] text-blue"
            style={{
              backgroundImage: `url(${process.env.REACT_APP_API_URL}/${imageURL})`,
            }}
          >
            <Button inline largeIos roundedMaterial raised>
              Add
            </Button>
          </div>
        </Card>
      );
    }

    return (
      <ListItem
        chevron={false}
        title={name}
        subtitle={formatPrice(displayPrice)}
        text={`${stockRemaining} left in stock`}
        after={
          <Stepper
            value={quantitySelected}
            onPlus={incrementQuantitySelected}
            onMinus={decrementQuantitySelected}
          />
        }
        media={
          <img
            className="ios:rounded-lg material:rounded-lg"
            src={`${process.env.REACT_APP_API_URL}/${imageURL}`}
            width="64"
            alt={name}
          />
        }
      />
    );
  }

  return <></>;
}

export default Item;
